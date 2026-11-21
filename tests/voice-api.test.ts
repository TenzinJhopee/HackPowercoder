import assert from "node:assert/strict";
import test from "node:test";
import { POST as speak } from "../app/api/voice/speak/route";
import { POST as transcribe } from "../app/api/voice/transcribe/route";
import { speakWithElevenLabs, transcribeWithElevenLabs, wordsFromAlignment } from "../lib/elevenlabs";

const voiceEnvKeys = ["ELEVENLABS_API_KEY", "ELEVENLABS_VOICE_ID"] as const;
type EnvKey = (typeof voiceEnvKeys)[number];

async function withEnv(values: Partial<Record<EnvKey, string>>, action: () => Promise<void>) {
  const previous = new Map(voiceEnvKeys.map((key) => [key, process.env[key]]));
  for (const key of voiceEnvKeys) {
    if (values[key] === undefined) delete process.env[key];
    else process.env[key] = values[key];
  }
  try {
    await action();
  } finally {
    for (const key of voiceEnvKeys) {
      const value = previous.get(key);
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

function mockFetch(action: typeof fetch) {
  const original = globalThis.fetch;
  globalThis.fetch = action;
  return () => { globalThis.fetch = original; };
}

test("transcription helper sends audio to ElevenLabs with scribe_v3", async () => {
  const audio = new Blob([new Uint8Array([1, 2, 3])], { type: "audio/webm" });
  let endpoint = "";
  const text = await transcribeWithElevenLabs(audio, "test-secret", async (input, init) => {
    endpoint = String(input);
    assert.equal(new Headers(init?.headers).get("xi-api-key"), "test-secret");
    assert.ok(init?.body instanceof FormData);
    const form = init.body;
    assert.equal(form.get("model_id"), "scribe_v3");
    assert.ok(form.get("file") instanceof File);
    return Response.json({ text: "How much did I spend?" });
  });
  assert.equal(endpoint, "https://api.elevenlabs.io/v1/speech-to-text");
  assert.equal(text, "How much did I spend?");
});

function timestampsPayload(text: string) {
  const characters = [...text];
  return {
    audio_base64: Buffer.from([1, 2, 3]).toString("base64"),
    alignment: {
      characters,
      character_start_times_seconds: characters.map((_, i) => i * 0.1),
      character_end_times_seconds: characters.map((_, i) => i * 0.1 + 0.1)
    },
    normalized_alignment: null
  };
}

test("wordsFromAlignment splits on spaces, strips edge punctuation and keeps char indices", () => {
  const words = wordsFromAlignment(timestampsPayload("Hello, world!").alignment);
  assert.deepEqual(words.map((w) => w.word), ["Hello", "world"]);
  assert.deepEqual([words[0].charStart, words[0].charEnd, words[1].charStart, words[1].charEnd], [0, 6, 7, 13]);
  assert.equal(words[0].start, 0);
  assert.ok(Math.abs(words[0].end - 0.6) < 1e-9);
});

test("wordsFromAlignment skips pure punctuation and handles empty input", () => {
  assert.deepEqual(wordsFromAlignment(timestampsPayload("a - b").alignment).map((w) => w.word), ["a", "b"]);
  assert.deepEqual(wordsFromAlignment({ characters: [], character_start_times_seconds: [], character_end_times_seconds: [] }), []);
});

test("speech helper requests multilingual audio with timestamps", async () => {
  let endpoint = "";
  let requestBody = "";
  const speech = await speakWithElevenLabs("Hello world.", "voice-1", "test-secret", async (input, init) => {
    endpoint = String(input);
    requestBody = String(init?.body);
    assert.equal(new Headers(init?.headers).get("xi-api-key"), "test-secret");
    return Response.json(timestampsPayload("Hello world."));
  });
  assert.match(endpoint, /\/v1\/text-to-speech\/voice-1\/with-timestamps\?output_format=mp3_44100_128$/);
  assert.deepEqual(JSON.parse(requestBody), { text: "Hello world.", model_id: "eleven_multilingual_v2" });
  assert.equal(speech.mimeType, "audio/mpeg");
  assert.equal(speech.audioBase64, Buffer.from([1, 2, 3]).toString("base64"));
  assert.deepEqual(speech.words.map((w) => w.word), ["Hello", "world"]);
});

test("speech API uses the default voice when only an API key is configured", async () => {
  await withEnv({ ELEVENLABS_API_KEY: "test-secret" }, async () => {
    let endpoint = "";
    const restoreFetch = mockFetch(async (input) => {
      endpoint = String(input);
      return Response.json(timestampsPayload("Hello"));
    });
    try {
      const response = await speak(new Request("http://localhost/api/voice/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "Hello" })
      }));
      assert.equal(response.status, 200);
      assert.match(endpoint, /\/21m00Tcm4TlvDq8ikWAM\/with-timestamps\?/);
      const body = await response.json();
      assert.equal(body.mimeType, "audio/mpeg");
      assert.equal(typeof body.audioBase64, "string");
      assert.equal(body.words[0].word, "Hello");
      assert.equal(body.alignment.characters.length, 5);
    } finally {
      restoreFetch();
    }
  });
});

test("voice API routes report missing ElevenLabs credentials without failing text use", async () => {
  await withEnv({}, async () => {
    const transcription = await transcribe(new Request("http://localhost/api/voice/transcribe", { method: "POST" }));
    const speech = await speak(new Request("http://localhost/api/voice/speak", { method: "POST" }));
    assert.equal(transcription.status, 503);
    assert.equal(speech.status, 503);
  });
});

test("voice routes validate payloads and surface upstream failures", async () => {
  await withEnv({ ELEVENLABS_API_KEY: "test-secret", ELEVENLABS_VOICE_ID: "voice-1" }, async () => {
    const invalidSpeech = await speak(new Request("http://localhost/api/voice/speak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: " " })
    }));
    assert.equal(invalidSpeech.status, 400);

    const restoreFetch = mockFetch(async () => Response.json({
      detail: { message: "Free users cannot use library voices via the API. Please upgrade your subscription to use this voice." }
    }, { status: 402 }));
    try {
      const speechFailure = await speak(new Request("http://localhost/api/voice/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "Hello" })
      }));
      const form = new FormData();
      form.append("file", new Blob([new Uint8Array([1])], { type: "audio/webm" }), "voice.webm");
      const transcriptionFailure = await transcribe(new Request("http://localhost/api/voice/transcribe", { method: "POST", body: form }));
      assert.equal(speechFailure.status, 502);
      assert.match((await speechFailure.json()).error, /upgrade your subscription/i);
      assert.equal(transcriptionFailure.status, 502);
    } finally {
      restoreFetch();
    }
  });
});
