module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/voice/transcribe/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/elevenlabs.ts [app-route] (ecmascript)");
;
const runtime = "nodejs";
const acceptedAudioTypes = new Set([
    "audio/webm",
    "audio/webm;codecs=opus",
    "audio/ogg",
    "audio/ogg;codecs=opus",
    "audio/mp4",
    "audio/mpeg",
    "audio/wav",
    "audio/x-wav",
    "audio/aac"
]);
async function POST(request) {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) return Response.json({
        error: "Voice transcription is not configured. You can type your question instead."
    }, {
        status: 503
    });
    let form;
    try {
        form = await request.formData();
    } catch  {
        return Response.json({
            error: "Send an audio recording as multipart form data."
        }, {
            status: 400
        });
    }
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({
        error: "An audio file is required."
    }, {
        status: 400
    });
    if (!acceptedAudioTypes.has(file.type.toLowerCase())) return Response.json({
        error: "Use a supported audio format (WebM, Ogg, MP4, WAV, MP3, or AAC)."
    }, {
        status: 415
    });
    if (!file.size || file.size > __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_VOICE_UPLOAD_BYTES"]) return Response.json({
        error: "Audio must be between 1 byte and 10 MB."
    }, {
        status: 413
    });
    try {
        const text = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transcribeWithElevenLabs"])(file, apiKey);
        return Response.json({
            text
        }, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch  {
        return Response.json({
            error: "Transcription failed. Please try again or type your question."
        }, {
            status: 502
        });
    }
}
}),
"[project]/lib/elevenlabs.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_VOICE_UPLOAD_BYTES",
    ()=>MAX_VOICE_UPLOAD_BYTES,
    "speakWithElevenLabs",
    ()=>speakWithElevenLabs,
    "transcribeWithElevenLabs",
    ()=>transcribeWithElevenLabs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .string>");
;
const MAX_VOICE_UPLOAD_BYTES = 10 * 1024 * 1024;
const transcriptionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1).max(10_000)
});
const MAX_SPEECH_RESPONSE_BYTES = 15 * 1024 * 1024;
async function transcribeWithElevenLabs(audio, apiKey, fetcher = fetch) {
    if (!audio.size || audio.size > MAX_VOICE_UPLOAD_BYTES) {
        throw new Error("Audio must be between 1 byte and 10 MB.");
    }
    const form = new FormData();
    const extension = audio.type.toLowerCase().includes("mp4") ? "mp4" : audio.type.toLowerCase().includes("ogg") ? "ogg" : "webm";
    form.append("file", audio, `recording.${extension}`);
    form.append("model_id", "scribe_v3");
    const response = await fetcher("https://api.elevenlabs.io/v1/speech-to-text", {
        method: "POST",
        headers: {
            "xi-api-key": apiKey
        },
        body: form,
        signal: AbortSignal.timeout(45_000)
    });
    if (!response.ok) throw new Error("ElevenLabs transcription failed.");
    const parsed = transcriptionSchema.safeParse(await response.json());
    if (!parsed.success) throw new Error("ElevenLabs returned an invalid transcription.");
    return parsed.data.text;
}
async function speakWithElevenLabs(text, voiceId, apiKey, fetcher = fetch) {
    const response = await fetcher(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`, {
        method: "POST",
        headers: {
            "xi-api-key": apiKey,
            "Content-Type": "application/json",
            Accept: "audio/mpeg"
        },
        body: JSON.stringify({
            text,
            model_id: "eleven_multilingual_v2"
        }),
        signal: AbortSignal.timeout(45_000)
    });
    if (!response.ok) {
        let detail = "";
        try {
            const payload = await response.json();
            detail = typeof payload.detail === "string" ? payload.detail : payload.detail?.message || "";
        } catch  {
        // Keep the generic provider error when ElevenLabs does not return JSON.
        }
        throw new Error(detail ? `ElevenLabs speech generation failed: ${detail}` : "ElevenLabs speech generation failed.");
    }
    if (!response.headers.get("content-type")?.toLowerCase().startsWith("audio/")) {
        throw new Error("ElevenLabs returned an unsupported audio format.");
    }
    const contentLength = Number(response.headers.get("content-length") ?? 0);
    if (contentLength > MAX_SPEECH_RESPONSE_BYTES) throw new Error("Generated speech is larger than the allowed response size.");
    const audio = await response.arrayBuffer();
    if (!audio.byteLength || audio.byteLength > MAX_SPEECH_RESPONSE_BYTES) throw new Error("ElevenLabs returned invalid audio.");
    return audio;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1gmvdz77gh4l-._.js.map