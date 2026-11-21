module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[project]/app/api/voice/speak/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/elevenlabs.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
const requestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    text: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().trim().min(1).max(4000)
}).strict();
async function POST(request) {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    const voiceId = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";
    const modelId = process.env.ELEVENLABS_MODEL_ID || undefined;
    if (!apiKey) return Response.json({
        error: "Speech generation is not configured. The text response is still available."
    }, {
        status: 503
    });
    let input;
    try {
        input = await request.json();
    } catch  {
        return Response.json({
            error: "Send a JSON body containing text."
        }, {
            status: 400
        });
    }
    const parsed = requestSchema.safeParse(input);
    if (!parsed.success) return Response.json({
        error: "Text must contain between 1 and 4,000 characters."
    }, {
        status: 400
    });
    try {
        const speech = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$elevenlabs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["speakWithElevenLabs"])(parsed.data.text, voiceId, apiKey, fetch, modelId);
        return Response.json(speech, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch (reason) {
        const message = reason instanceof Error ? reason.message : "Speech generation failed.";
        return Response.json({
            error: `${message} The text response is still available.`
        }, {
            status: 502
        });
    }
}
}),
"[project]/lib/elevenlabs.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_MODEL_ID",
    ()=>DEFAULT_MODEL_ID,
    "MAX_VOICE_UPLOAD_BYTES",
    ()=>MAX_VOICE_UPLOAD_BYTES,
    "speakWithElevenLabs",
    ()=>speakWithElevenLabs,
    "transcribeWithElevenLabs",
    ()=>transcribeWithElevenLabs,
    "wordsFromAlignment",
    ()=>wordsFromAlignment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .array>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .number>");
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
const DEFAULT_MODEL_ID = "eleven_multilingual_v2";
const alignmentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    characters: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string()),
    character_start_times_seconds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number()),
    character_end_times_seconds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number())
});
const timestampsSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    audio_base64: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    alignment: alignmentSchema.nullable(),
    normalized_alignment: alignmentSchema.nullable().optional()
});
function wordsFromAlignment(alignment) {
    const { characters, character_start_times_seconds: starts, character_end_times_seconds: ends } = alignment;
    const words = [];
    let first = -1;
    const flush = (endExclusive)=>{
        if (first < 0) return;
        const raw = characters.slice(first, endExclusive).join("");
        const word = raw.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
        if (word) words.push({
            word,
            start: starts[first],
            end: ends[endExclusive - 1],
            charStart: first,
            charEnd: endExclusive
        });
        first = -1;
    };
    for(let i = 0; i < characters.length; i++){
        if (/^\s+$/.test(characters[i])) flush(i);
        else if (first < 0) first = i;
    }
    flush(characters.length);
    return words;
}
async function speakWithElevenLabs(text, voiceId, apiKey, fetcher = fetch, modelId = DEFAULT_MODEL_ID) {
    const response = await fetcher(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}/with-timestamps?output_format=mp3_44100_128`, {
        method: "POST",
        headers: {
            "xi-api-key": apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text,
            model_id: modelId
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
    const contentLength = Number(response.headers.get("content-length") ?? 0);
    if (contentLength > MAX_SPEECH_RESPONSE_BYTES * 2) throw new Error("Generated speech is larger than the allowed response size.");
    let json;
    try {
        json = await response.json();
    } catch  {
        throw new Error("ElevenLabs returned an invalid speech response.");
    }
    const parsed = timestampsSchema.safeParse(json);
    if (!parsed.success || !parsed.data.alignment) throw new Error("ElevenLabs returned an invalid speech response.");
    if (parsed.data.audio_base64.length > MAX_SPEECH_RESPONSE_BYTES * 2) throw new Error("Generated speech is larger than the allowed response size.");
    const { alignment } = parsed.data;
    return {
        audioBase64: parsed.data.audio_base64,
        mimeType: "audio/mpeg",
        words: wordsFromAlignment(alignment),
        alignment
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1izfxm0dl9ksg._.js.map