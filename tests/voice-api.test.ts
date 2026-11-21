import assert from "node:assert/strict";
import test from "node:test";
import { POST as respond } from "../app/api/agent/respond/route";
import { GET as status } from "../app/api/agent/status/route";
import { POST as speak } from "../app/api/voice/speak/route";
import { POST as transcribe } from "../app/api/voice/transcribe/route";
import { speakWithElevenLabs, transcribeWithElevenLabs, wordsFromAlignment } from "../lib/elevenlabs";
import { explainFinancialToolResult } from "../lib/llm/provider";

const voiceEnvKeys = ["ELEVENLABS_API_KEY", "ELEVENLABS_VOICE_ID", "OLLAMA_BASE_URL", "OLLAMA_MODEL"] as const;
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

test("agent endpoint requires explicit consent and uses the local model", async () => {
  await withEnv({}, async () => {
    const body = { consent: true, question: "How much did I spend?", tool: "get_monthly_spending", toolResult: JSON.stringify({ month: "2026-10", expenses: 80 }) };
    const missingConsent = await respond(new Request("http://localhost/api/agent/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, consent: false })
    }));
    const restoreFetch = mockFetch(async () => Response.json({
      message: { content: "Your latest-month spending is shown in the verified calculation." },
      done: true
    }));
    const localResponse = await respond(new Request("http://localhost/api/agent/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }));
    try {
      assert.equal(missingConsent.status, 400);
      assert.equal(localResponse.status, 200);
      assert.equal((await localResponse.json()).provider, "ollama");
    } finally {
      restoreFetch();
    }
  });
});

test("agent endpoint handles provider failures with a visible error response", async () => {
  await withEnv({}, async () => {
    const restoreFetch = mockFetch(async () => new Response("unavailable", { status: 503 }));
    try {
      const response = await respond(new Request("http://localhost/api/agent/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent: true, question: "How much did I spend?", tool: "get_monthly_spending", toolResult: JSON.stringify({ expenses: 80 }) })
      }));
      assert.equal(response.status, 502);
      assert.match((await response.json()).error, /Ollama is unavailable/i);
    } finally {
      restoreFetch();
    }
  });
});

test("agent endpoint sends verified context to local Ollama and accepts narrative-only output", async () => {
  await withEnv({ OLLAMA_BASE_URL: "http://127.0.0.1:11434", OLLAMA_MODEL: "test-model" }, async () => {
    let requestBody = "";
    const restoreFetch = mockFetch(async (input, init) => {
      assert.equal(String(input), "http://127.0.0.1:11434/api/chat");
      assert.equal(new Headers(init?.headers).get("authorization"), null);
      requestBody = String(init?.body);
      return Response.json({ message: { content: "The recorded pattern is summarized in the verified figures below." }, done: true });
    });
    try {
      const response = await respond(new Request("http://localhost/api/agent/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent: true, question: "How much did I spend?", tool: "get_monthly_spending", toolResult: JSON.stringify({ month: "2026-10", expenses: 80 }) })
      }));
      const result = await response.json();
      assert.equal(response.status, 200);
      assert.equal(result.provider, "ollama");
      assert.match(result.explanation, /verified figures/);
      const ollamaRequest = JSON.parse(requestBody);
      assert.equal(ollamaRequest.model, "test-model");
      assert.equal(ollamaRequest.stream, false);
      assert.match(ollamaRequest.messages[1].content, /get_monthly_spending/);
      assert.match(ollamaRequest.messages[1].content, /2026-10/);
    } finally {
      restoreFetch();
    }
  });
});

test("Ollama defaults to the requested local Apertus model without an API key", async () => {
  await withEnv({ OLLAMA_MODEL: "", OLLAMA_BASE_URL: "" }, async () => {
    let requestBody = "";
    const restoreFetch = mockFetch(async (input, init) => {
      assert.equal(String(input), "http://localhost:11434/api/chat");
      assert.equal(new Headers(init?.headers).get("authorization"), null);
      requestBody = String(init?.body);
      return Response.json({ message: { content: "Try a vegetable soup or a bean-based meal using pantry staples." }, done: true });
    });
    try {
      const explanation = await explainFinancialToolResult(
        "Brainstorm cheap food and budget ideas",
        "get_savings_opportunities",
        JSON.stringify([])
      );
      const request = JSON.parse(requestBody);
      assert.equal(request.model, "MichelRosselli/apertus:latest");
      assert.match(request.messages[0].content, /affordable meal ideas/i);
      assert.match(explanation ?? "", /vegetable soup/i);
    } finally {
      restoreFetch();
    }
  });
});

test("Ollama refuses cloud endpoints", async () => {
  await withEnv({ OLLAMA_BASE_URL: "https://example.com", OLLAMA_MODEL: "MichelRosselli/apertus:latest" }, async () => {
    let requested = false;
    const restoreFetch = mockFetch(async () => {
      requested = true;
      return Response.json({});
    });
    try {
      await assert.rejects(
        explainFinancialToolResult("Summarize my spending", "get_financial_summary", "{}"),
        /local Ollama provider/
      );
      assert.equal(requested, false);
    } finally {
      restoreFetch();
    }
  });
});

test("Ollama status requires both a reachable server and the configured model", async () => {
  await withEnv({ OLLAMA_BASE_URL: "http://localhost:11434", OLLAMA_MODEL: "MichelRosselli/apertus:latest" }, async () => {
    const restoreFetch = mockFetch(async (input) => {
      assert.equal(String(input), "http://localhost:11434/api/tags");
      return Response.json({ models: [{ name: "MichelRosselli/apertus:latest" }] });
    });
    try {
      const response = await status();
      assert.deepEqual(await response.json(), { connected: true, model: "MichelRosselli/apertus:latest" });
    } finally {
      restoreFetch();
    }
  });
});
