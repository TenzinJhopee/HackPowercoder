import { z } from "zod";

const responseSchema = z.object({
  output_audio: z.object({
    data: z.string().min(1)
  })
});
const MAX_SPEECH_RESPONSE_BYTES = 15 * 1024 * 1024;

export async function speakWithGemini(text: string, apiKey: string, fetcher: typeof fetch = fetch): Promise<ArrayBuffer> {
  const model = process.env.GEMINI_TTS_MODEL?.trim() || "gemini-3.8-flash-lite-tts";
  const voice = process.env.GEMINI_TTS_VOICE?.trim() || "Kore";
  const response = await fetcher("https://generativelanguage.googleapis.com/v1beta/interactions", {
    method: "POST",
    headers: {
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      input: [{
        type: "user_input",
        content: [{ type: "text", text }]
      }],
      response_format: { type: "audio" },
      generation_config: { speech_config: [{ voice }] }
    }),
    signal: AbortSignal.timeout(45_000),
    cache: "no-store"
  });
  if (!response.ok) throw new Error("Gemini speech generation failed.");

  const parsed = responseSchema.safeParse(await response.json());
  if (!parsed.success) throw new Error("Gemini returned an invalid speech response.");
  const audio = Buffer.from(parsed.data.output_audio.data, "base64");
  if (
    !audio.length ||
    audio.length > MAX_SPEECH_RESPONSE_BYTES ||
    audio.toString("ascii", 0, 4) !== "RIFF" ||
    audio.toString("ascii", 8, 12) !== "WAVE"
  ) {
    throw new Error("Gemini returned an unsupported or invalid audio format.");
  }
  return audio.buffer.slice(audio.byteOffset, audio.byteOffset + audio.byteLength);
}
