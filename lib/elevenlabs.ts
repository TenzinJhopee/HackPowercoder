import { z } from "zod";

export const MAX_VOICE_UPLOAD_BYTES = 10 * 1024 * 1024;
const transcriptionSchema = z.object({ text: z.string().trim().min(1).max(10_000) });
const MAX_SPEECH_RESPONSE_BYTES = 15 * 1024 * 1024;

export async function transcribeWithElevenLabs(audio: Blob, apiKey: string, fetcher: typeof fetch = fetch): Promise<string> {
  if (!audio.size || audio.size > MAX_VOICE_UPLOAD_BYTES) {
    throw new Error("Audio must be between 1 byte and 10 MB.");
  }
  const form = new FormData();
  const extension = audio.type.toLowerCase().includes("mp4") ? "mp4" : audio.type.toLowerCase().includes("ogg") ? "ogg" : "webm";
  form.append("file", audio, `recording.${extension}`);
  form.append("model_id", "scribe_v3");
  const response = await fetcher("https://api.elevenlabs.io/v1/speech-to-text", {
    method: "POST",
    headers: { "xi-api-key": apiKey },
    body: form,
    signal: AbortSignal.timeout(45_000)
  });
  if (!response.ok) throw new Error("ElevenLabs transcription failed.");
  const parsed = transcriptionSchema.safeParse(await response.json());
  if (!parsed.success) throw new Error("ElevenLabs returned an invalid transcription.");
  return parsed.data.text;
}

export const DEFAULT_MODEL_ID = "eleven_multilingual_v2";

const alignmentSchema = z.object({
  characters: z.array(z.string()),
  character_start_times_seconds: z.array(z.number()),
  character_end_times_seconds: z.array(z.number())
});
const timestampsSchema = z.object({
  audio_base64: z.string().min(1),
  alignment: alignmentSchema.nullable(),
  normalized_alignment: alignmentSchema.nullable().optional()
});

export type Alignment = z.infer<typeof alignmentSchema>;
export type SpokenWord = { word: string; start: number; end: number; charStart: number; charEnd: number };
export type SpeechResult = { audioBase64: string; mimeType: "audio/mpeg"; words: SpokenWord[]; alignment: Alignment };

/** Splits character-level alignment into whitespace-separated words; `word` has edge punctuation stripped. charEnd is exclusive. */
export function wordsFromAlignment(alignment: Alignment): SpokenWord[] {
  const { characters, character_start_times_seconds: starts, character_end_times_seconds: ends } = alignment;
  const words: SpokenWord[] = [];
  let first = -1;
  const flush = (endExclusive: number) => {
    if (first < 0) return;
    const raw = characters.slice(first, endExclusive).join("");
    const word = raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
    if (word) words.push({ word, start: starts[first], end: ends[endExclusive - 1], charStart: first, charEnd: endExclusive });
    first = -1;
  };
  for (let i = 0; i < characters.length; i++) {
    if (/^\s+$/.test(characters[i])) flush(i);
    else if (first < 0) first = i;
  }
  flush(characters.length);
  return words;
}

const envNumber = (name: string, fallback: number) => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && process.env[name] !== "" && process.env[name] !== undefined ? value : fallback;
};

/**
 * Calm, trustworthy advisor delivery: slightly slower than default, steady intonation, no dramatised style.
 * Tunable per voice via ELEVENLABS_SPEED (0.7–1.2), ELEVENLABS_STABILITY (0–1), ELEVENLABS_SIMILARITY (0–1).
 */
export function voiceSettings() {
  return {
    speed: Math.min(1.2, Math.max(0.7, envNumber("ELEVENLABS_SPEED", 0.9))),
    stability: envNumber("ELEVENLABS_STABILITY", 0.6),
    similarity_boost: envNumber("ELEVENLABS_SIMILARITY", 0.75),
    style: 0,
    use_speaker_boost: true
  };
}

export async function speakWithElevenLabs(
  text: string,
  voiceId: string,
  apiKey: string,
  fetcher: typeof fetch = fetch,
  modelId: string = DEFAULT_MODEL_ID
): Promise<SpeechResult> {
  let response: Response;
  try {
    response = await fetcher(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}/with-timestamps?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: modelId, voice_settings: voiceSettings() }),
      signal: AbortSignal.timeout(45_000)
    });
  } catch (error) {
    // Network-level failure ("fetch failed"): surface the low-level cause (e.g. ENOTFOUND, ECONNREFUSED, a proxy or TLS error).
    const cause = (error as { cause?: { code?: string; message?: string } })?.cause;
    const detail = cause?.code || cause?.message || (error instanceof Error ? error.message : "unknown");
    console.error("[elevenlabs] network error:", detail);
    throw new Error(`Could not reach ElevenLabs (${detail}).`);
  }
  if (!response.ok) {
    let detail = "";
    try {
      const payload = await response.json() as { detail?: { message?: string } | string };
      detail = typeof payload.detail === "string" ? payload.detail : payload.detail?.message || "";
    } catch {
      // Keep the generic provider error when ElevenLabs does not return JSON.
    }
    throw new Error(detail ? `ElevenLabs speech generation failed: ${detail}` : "ElevenLabs speech generation failed.");
  }
  const contentLength = Number(response.headers.get("content-length") ?? 0);
  if (contentLength > MAX_SPEECH_RESPONSE_BYTES * 2) throw new Error("Generated speech is larger than the allowed response size.");
  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error("ElevenLabs returned an invalid speech response.");
  }
  const parsed = timestampsSchema.safeParse(json);
  if (!parsed.success || !parsed.data.alignment) throw new Error("ElevenLabs returned an invalid speech response.");
  if (parsed.data.audio_base64.length > MAX_SPEECH_RESPONSE_BYTES * 2) throw new Error("Generated speech is larger than the allowed response size.");
  const { alignment } = parsed.data;
  return { audioBase64: parsed.data.audio_base64, mimeType: "audio/mpeg", words: wordsFromAlignment(alignment), alignment };
}
