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
"[project]/app/api/agent/status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$llm$2f$provider$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/llm/provider.ts [app-route] (ecmascript)");
;
const runtime = "nodejs";
async function GET() {
    try {
        const status = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$llm$2f$provider$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getOllamaConnectionStatus"])();
        return Response.json(status, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch  {
        return Response.json({
            connected: false,
            model: process.env.OLLAMA_MODEL?.trim() || "qwen2.5:3b"
        }, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    }
}
}),
"[project]/lib/agent-prompt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "financialAgentSystemPrompt",
    ()=>financialAgentSystemPrompt
]);
const financialAgentSystemPrompt = `You are the PostFinance Financial Intelligence Agent, a friendly and careful financial information assistant for an independent prototype. You are not a licensed financial adviser.

Use only the deterministic tool result included with the current question for personal financial facts. Do not infer or invent transactions, amounts, account balances, investment prices, returns, or performance. Internal transfers are excluded from income and spending. Refunds are not earned income. Currency totals are separate unless the tool explicitly says otherwise. Forecasts are estimates, never guaranteed balances.

Write in natural, fluent conversational English and answer the user's question directly. Avoid robotic or canned introductions, and do not mention tools, models, or that figures are shown elsewhere. Explain the result in plain language, name important assumptions and uncertainty, and suggest practical next steps without pressure. Never offer to execute financial actions, move money, or change an account; the application cannot do those things. For brainstorming requests such as affordable meal ideas, offer a few practical options using common ingredients, use unnumbered bullets, omit prices and financial estimates, and ask about dietary needs when relevant. Treat these ideas as general suggestions, not facts about the user's purchases. If required information is absent, say so and ask a concise clarifying question when useful.

The application separately displays the exact verified figures from its local calculation. In your response, provide a short explanation of what those figures mean; do not repeat or create numbers, currencies, percentages, dates, merchant names, or performance claims.`;
}),
"[project]/lib/llm/provider.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LlmProviderError",
    ()=>LlmProviderError,
    "explainFinancialToolResult",
    ()=>explainFinancialToolResult,
    "getOllamaConnectionStatus",
    ()=>getOllamaConnectionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .array>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agent$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/agent-prompt.ts [app-route] (ecmascript)");
;
;
const chatResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    message: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().max(4000)
    })
});
const tagsResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    models: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string()
    }))
});
const localProviderHosts = new Set([
    "localhost",
    "127.0.0.1",
    "[::1]",
    "::1"
]);
const defaultModel = "qwen2.5:3b";
class LlmProviderError extends Error {
    constructor(){
        super("The local Ollama provider could not complete the request.");
        this.name = "LlmProviderError";
    }
}
function getOllamaConfig() {
    const baseUrl = process.env.OLLAMA_BASE_URL?.trim() || "http://localhost:11434";
    const model = process.env.OLLAMA_MODEL?.trim() || defaultModel;
    try {
        const base = new URL(baseUrl);
        if (base.protocol !== "http:" || !localProviderHosts.has(base.hostname) || base.username || base.password) {
            throw new Error("Ollama must be configured on this device.");
        }
        base.pathname = "/";
        base.search = "";
        base.hash = "";
        return {
            base,
            model
        };
    } catch  {
        throw new LlmProviderError();
    }
}
async function getOllamaConnectionStatus() {
    const { base, model } = getOllamaConfig();
    try {
        const response = await fetch(new URL("/api/tags", base), {
            signal: AbortSignal.timeout(2500),
            cache: "no-store"
        });
        if (!response.ok) return {
            connected: false,
            model
        };
        const parsed = tagsResponseSchema.safeParse(await response.json());
        return {
            connected: parsed.success && parsed.data.models.some((item)=>item.name === model),
            model
        };
    } catch  {
        return {
            connected: false,
            model
        };
    }
}
async function explainFinancialToolResult(question, tool, toolResult) {
    const { base, model } = getOllamaConfig();
    let response;
    try {
        response = await fetch(new URL("/api/chat", base), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                stream: false,
                options: {
                    temperature: 0.2
                },
                messages: [
                    {
                        role: "system",
                        content: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$agent$2d$prompt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["financialAgentSystemPrompt"]
                    },
                    {
                        role: "user",
                        content: `User question: ${question}\nSelected deterministic tool: ${tool}\nTool result (verified, JSON): ${toolResult}`
                    }
                ]
            }),
            signal: AbortSignal.timeout(120_000),
            cache: "no-store"
        });
    } catch  {
        throw new LlmProviderError();
    }
    if (!response.ok) throw new LlmProviderError();
    let content;
    try {
        const parsed = chatResponseSchema.safeParse(await response.json());
        content = parsed.success ? parsed.data.message.content.trim() : "";
    } catch  {
        throw new LlmProviderError();
    }
    if (!content || content.length > 2000) throw new LlmProviderError();
    const numberWords = "one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|million";
    const measurableUnits = "days?|weeks?|months?|years?|transactions?|categories|payments?|subscriptions?|percent(?:age)?|per cent|francs?|euros?|dollars?";
    const unsupportedFigure = new RegExp(`(?:\\d|%|\\b(?:CHF|EUR|USD|francs?|euros?|dollars?)\\b|\\b(?:${numberWords})\\s+(?:\\w+\\s+){0,2}(?:${measurableUnits})\\b)`, "i");
    const unsupportedActionOffer = /\b(?:would you like|do you want|shall i)\b.*\b(?:set up|transfer|move|change|cancel|manage|pay)\b|^\s*if so,?\s*(?:i can|i will|i'll)\b/i;
    const safeNarrative = content.split(/(?<=[.!?])\s+/).filter((sentence)=>!unsupportedFigure.test(sentence) && !unsupportedActionOffer.test(sentence)).join(" ").trim();
    return safeNarrative || "Here’s what your records show.";
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__031a982ningbj._.js.map