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
"[project]/app/api/markets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$market$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/market-data.ts [app-route] (ecmascript)");
;
const runtime = "nodejs";
const MAX_MARKET_SYMBOLS = 25;
async function GET(request) {
    const url = new URL(request.url);
    const requestedSymbols = url.searchParams.has("symbols") ? (url.searchParams.get("symbols") ?? "").split(",") : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$market$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["featuredMarketSymbols"].map((item)=>item.symbol);
    const normalizedSymbols = requestedSymbols.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$market$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeMarketSymbol"]);
    if (!normalizedSymbols.length || normalizedSymbols.some((symbol)=>symbol === null)) {
        return Response.json({
            error: "Provide valid ticker symbols separated by commas."
        }, {
            status: 400
        });
    }
    const symbols = [
        ...new Set(normalizedSymbols.filter((symbol)=>symbol !== null))
    ];
    if (symbols.length > MAX_MARKET_SYMBOLS) {
        return Response.json({
            error: `Request no more than ${MAX_MARKET_SYMBOLS} market symbols at once.`
        }, {
            status: 400
        });
    }
    const results = await Promise.all(symbols.map(async (symbol)=>{
        try {
            return {
                quote: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$market$2d$data$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchYahooQuote"])(symbol)
            };
        } catch (reason) {
            return {
                error: {
                    symbol,
                    message: reason instanceof Error ? reason.message : `Could not load ${symbol}.`
                }
            };
        }
    }));
    const quotes = results.flatMap((result)=>"quote" in result ? [
            result.quote
        ] : []);
    const errors = results.flatMap((result)=>"error" in result ? [
            result.error
        ] : []);
    const headers = {
        "Cache-Control": "no-store"
    };
    if (!quotes.length) {
        return Response.json({
            error: "No market quotes could be retrieved.",
            quotes,
            errors
        }, {
            status: 502,
            headers
        });
    }
    return Response.json({
        quotes,
        errors
    }, {
        headers
    });
}
}),
"[project]/lib/market-data.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateHistoricalReturnScenarios",
    ()=>calculateHistoricalReturnScenarios,
    "featuredMarketSymbols",
    ()=>featuredMarketSymbols,
    "fetchYahooQuote",
    ()=>fetchYahooQuote,
    "normalizeMarketSymbol",
    ()=>normalizeMarketSymbol,
    "searchYahooMarkets",
    ()=>searchYahooMarkets
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .number>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .array>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$unknown$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .unknown>");
;
const featuredMarketSymbols = [
    {
        symbol: "NESN.SW",
        name: "Nestle",
        group: "Swiss stocks"
    },
    {
        symbol: "NOVN.SW",
        name: "Novartis",
        group: "Swiss stocks"
    },
    {
        symbol: "UBSG.SW",
        name: "UBS",
        group: "Swiss stocks"
    },
    {
        symbol: "ABBN.SW",
        name: "ABB",
        group: "Swiss stocks"
    },
    {
        symbol: "ZURN.SW",
        name: "Zurich Insurance",
        group: "Swiss stocks"
    },
    {
        symbol: "CFR.SW",
        name: "Richemont",
        group: "Swiss stocks"
    },
    {
        symbol: "BTC-USD",
        name: "Bitcoin",
        group: "Crypto"
    },
    {
        symbol: "ETH-USD",
        name: "Ethereum",
        group: "Crypto"
    },
    {
        symbol: "SOL-USD",
        name: "Solana",
        group: "Crypto"
    },
    {
        symbol: "XRP-USD",
        name: "XRP",
        group: "Crypto"
    },
    {
        symbol: "BNB-USD",
        name: "BNB",
        group: "Crypto"
    }
];
const symbolPattern = /^[A-Z0-9.^=-]{1,24}$/;
function normalizeMarketSymbol(value) {
    const symbol = value.trim().toUpperCase();
    return symbolPattern.test(symbol) ? symbol : null;
}
const yahooResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    meta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        symbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional(),
        currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional(),
        instrumentType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional(),
        shortName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().nullable().optional(),
        longName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().nullable().optional(),
        regularMarketPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite().nullable().optional(),
        regularMarketTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite().nullable().optional()
    }).passthrough(),
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite()).optional(),
    indicators: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        quote: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
            close: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite().nullable()).optional()
        }).passthrough()).optional()
    }).passthrough()
}).passthrough();
const yahooResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    chart: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(yahooResultSchema).nullable().optional(),
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$unknown$3e$__["z"].unknown().optional()
    }).passthrough()
}).passthrough();
const yahooSearchResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    quotes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        symbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string(),
        quoteType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional(),
        shortname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().nullable().optional(),
        longname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().nullable().optional(),
        exchange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional()
    }).passthrough()).optional()
}).passthrough();
function percentile(sortedValues, fraction) {
    const position = (sortedValues.length - 1) * fraction;
    const lowerIndex = Math.floor(position);
    const upperIndex = Math.ceil(position);
    if (lowerIndex === upperIndex) return sortedValues[lowerIndex];
    const weight = position - lowerIndex;
    return sortedValues[lowerIndex] * (1 - weight) + sortedValues[upperIndex] * weight;
}
function calculateHistoricalReturnScenarios(history) {
    const scenarios = [];
    for (const horizonObservations of [
        30,
        90
    ]){
        const returns = [];
        for(let start = 0; start + horizonObservations < history.length; start += 1){
            const startClose = history[start].close;
            const endClose = history[start + horizonObservations].close;
            if (startClose > 0 && endClose > 0) returns.push((endClose / startClose - 1) * 100);
        }
        if (returns.length < 10) continue;
        returns.sort((a, b)=>a - b);
        scenarios.push({
            horizonObservations,
            sampleCount: returns.length,
            lowPercent: percentile(returns, 0.05),
            medianPercent: percentile(returns, 0.5),
            highPercent: percentile(returns, 0.95)
        });
    }
    return scenarios;
}
async function fetchYahooQuote(symbol, fetcher = fetch) {
    const normalizedSymbol = normalizeMarketSymbol(symbol);
    if (!normalizedSymbol) throw new Error("Use a valid Yahoo Finance ticker symbol.");
    const endpoint = new URL(`/v8/finance/chart/${encodeURIComponent(normalizedSymbol)}`, "https://query1.finance.yahoo.com");
    endpoint.searchParams.set("range", "1y");
    endpoint.searchParams.set("interval", "1d");
    const response = await fetcher(endpoint, {
        headers: {
            "User-Agent": "Mozilla/5.0 LumaFinancialAgent/1.0"
        },
        signal: AbortSignal.timeout(12_000)
    });
    if (!response.ok) throw new Error(`Yahoo Finance returned HTTP ${response.status} for ${normalizedSymbol}.`);
    let payload;
    try {
        payload = await response.json();
    } catch  {
        throw new Error(`Yahoo Finance returned invalid data for ${normalizedSymbol}.`);
    }
    const parsed = yahooResponseSchema.safeParse(payload);
    if (!parsed.success) throw new Error(`Yahoo Finance returned an unsupported quote format for ${normalizedSymbol}.`);
    const result = parsed.data.chart.result?.[0];
    if (!result) throw new Error(`Yahoo Finance has no quote history for ${normalizedSymbol}.`);
    const currency = result.meta.currency;
    if (!currency || !/^[A-Z]{3}$/.test(currency)) throw new Error(`Yahoo Finance did not provide a currency for ${normalizedSymbol}.`);
    const timestamps = result.timestamp ?? [];
    const closes = result.indicators.quote?.[0]?.close ?? [];
    const history = timestamps.flatMap((timestamp, index)=>{
        const close = closes[index];
        if (typeof close !== "number" || !Number.isFinite(close) || close <= 0) return [];
        return [
            {
                date: new Date(timestamp * 1000).toISOString().slice(0, 10),
                close
            }
        ];
    });
    const lastHistoryPoint = history.at(-1);
    const price = result.meta.regularMarketPrice ?? lastHistoryPoint?.close;
    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
        throw new Error(`Yahoo Finance did not provide a current price for ${normalizedSymbol}.`);
    }
    const marketTime = result.meta.regularMarketTime;
    const asOf = typeof marketTime === "number" ? new Date(marketTime * 1000).toISOString() : lastHistoryPoint ? `${lastHistoryPoint.date}T00:00:00.000Z` : "";
    if (!asOf) throw new Error(`Yahoo Finance did not provide a quote time for ${normalizedSymbol}.`);
    return {
        symbol: result.meta.symbol || normalizedSymbol,
        name: result.meta.longName || result.meta.shortName || normalizedSymbol,
        currency,
        assetType: result.meta.instrumentType === "CRYPTOCURRENCY" ? "crypto" : result.meta.instrumentType === "EQUITY" ? "equity" : "other",
        price,
        asOf,
        observations: history.length,
        historicalScenarios: calculateHistoricalReturnScenarios(history)
    };
}
async function searchYahooMarkets(query, fetcher = fetch) {
    const searchTerm = query.trim();
    if (!searchTerm || searchTerm.length > 80) throw new Error("Search text must contain between 1 and 80 characters.");
    const endpoint = new URL("/v1/finance/search", "https://query1.finance.yahoo.com");
    endpoint.searchParams.set("q", searchTerm);
    endpoint.searchParams.set("quotesCount", "25");
    endpoint.searchParams.set("newsCount", "0");
    endpoint.searchParams.set("enableFuzzyQuery", "true");
    const response = await fetcher(endpoint, {
        headers: {
            "User-Agent": "Mozilla/5.0 LumaFinancialAgent/1.0"
        },
        signal: AbortSignal.timeout(12_000)
    });
    if (!response.ok) throw new Error(`Yahoo Finance search returned HTTP ${response.status}.`);
    let payload;
    try {
        payload = await response.json();
    } catch  {
        throw new Error("Yahoo Finance returned invalid search data.");
    }
    const parsed = yahooSearchResponseSchema.safeParse(payload);
    if (!parsed.success) throw new Error("Yahoo Finance returned an unsupported search format.");
    const results = [];
    const seenSymbols = new Set();
    for (const result of parsed.data.quotes ?? []){
        const symbol = normalizeMarketSymbol(result.symbol);
        if (!symbol || seenSymbols.has(symbol)) continue;
        const assetType = result.quoteType === "CRYPTOCURRENCY" ? "crypto" : result.quoteType === "EQUITY" ? "equity" : result.quoteType === "ETF" ? "etf" : null;
        if (!assetType) continue;
        seenSymbols.add(symbol);
        results.push({
            symbol,
            name: result.longname || result.shortname || symbol,
            exchange: result.exchange || "Yahoo Finance",
            assetType
        });
    }
    return results;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__13vrxfrzmo1f_._.js.map