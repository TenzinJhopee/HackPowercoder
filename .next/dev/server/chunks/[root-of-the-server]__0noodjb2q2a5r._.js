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
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

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
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/app/api/transactions/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/database.ts [app-route] (ecmascript)");
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
async function GET() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initializeDatabase"])();
    const transactions = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTransactions"])();
    return Response.json({
        count: transactions.length,
        accounts: [
            ...new Set(transactions.map((transaction)=>transaction.account))
        ].sort(),
        currencies: [
            ...new Set(transactions.map((transaction)=>transaction.currency))
        ].sort(),
        transactions
    }, {
        headers: {
            "Cache-Control": "no-store"
        }
    });
}
}),
"[project]/lib/csv.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectColumnMapping",
    ()=>detectColumnMapping,
    "hasAmbiguousDirection",
    ()=>hasAmbiguousDirection,
    "normalizeRows",
    ()=>normalizeRows,
    "parseCsvFile",
    ()=>parseCsvFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intelligence.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-route] (ecmascript)");
;
;
;
const emptyMapping = {
    date: "",
    description: "",
    amount: "",
    debit: "",
    credit: "",
    type: "",
    currency: "",
    account: "",
    merchant: "",
    source: "",
    target: ""
};
const aliases = {
    date: [
        "date",
        "transaction_date",
        "booking_date",
        "bookingdate",
        "value_date",
        "valuedate",
        "trans_date",
        "datum"
    ],
    description: [
        "description",
        "name",
        "details",
        "memo",
        "purpose",
        "text",
        "verwendungszweck",
        "buchungstext"
    ],
    amount: [
        "amount",
        "value",
        "sum",
        "betrag",
        "transaction_amount"
    ],
    debit: [
        "debit",
        "withdrawal",
        "outflow",
        "belastung",
        "soll"
    ],
    credit: [
        "credit",
        "deposit",
        "inflow",
        "gutschrift",
        "haben"
    ],
    type: [
        "type",
        "transaction_type",
        "booking_type",
        "direction",
        "art"
    ],
    currency: [
        "currency",
        "ccy",
        "währung",
        "waehrung"
    ],
    account: [
        "account",
        "account_name",
        "account_label",
        "konto"
    ],
    merchant: [
        "merchant",
        "counterparty",
        "payee",
        "recipient"
    ],
    source: [
        "source",
        "source_id",
        "source_label",
        "from"
    ],
    target: [
        "target",
        "target_id",
        "target_label",
        "to"
    ]
};
function normalizedHeader(value) {
    return value.trim().toLowerCase().replace(/[\s-]+/g, "_");
}
function detectColumnMapping(headers) {
    const mapping = {
        ...emptyMapping
    };
    for (const field of Object.keys(aliases)){
        const found = headers.find((header)=>aliases[field].includes(normalizedHeader(header)));
        if (found) mapping[field] = found;
    }
    return mapping;
}
async function parseCsvFile(file) {
    const text = await file.text();
    return new Promise((resolve, reject)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(text, {
            header: true,
            skipEmptyLines: "greedy",
            transformHeader: (header)=>header.trim(),
            complete (result) {
                const headers = result.meta.fields ?? [];
                if (headers.length === 0) {
                    reject(new Error(`${file.name}: no column headers were found.`));
                    return;
                }
                resolve({
                    id: `${file.name}-${file.size}-${file.lastModified}`,
                    name: file.name,
                    headers,
                    rows: result.data,
                    mapping: detectColumnMapping(headers),
                    parseWarnings: result.errors.map((error)=>`Row ${error.row ?? "?"}: ${error.message}`)
                });
            },
            error (error) {
                reject(new Error(`${file.name}: ${error.message}`));
            }
        });
    });
}
function cell(row, key) {
    if (!key) return "";
    const value = row[key];
    return value === null || value === undefined ? "" : String(value).trim();
}
function parseAmount(value) {
    if (!value) return undefined;
    let normalized = value.replace(/[’']/g, "").replace(/\s/g, "");
    const parenthesesNegative = /^\(.*\)$/.test(normalized);
    normalized = normalized.replace(/[()]/g, "").replace(/[^\d,.-]/g, "");
    if (normalized.includes(",") && normalized.includes(".")) {
        normalized = normalized.lastIndexOf(",") > normalized.lastIndexOf(".") ? normalized.replace(/\./g, "").replace(",", ".") : normalized.replace(/,/g, "");
    } else if (normalized.includes(",")) {
        const decimals = normalized.split(",").at(-1)?.length ?? 0;
        normalized = decimals > 0 && decimals <= 2 ? normalized.replace(",", ".") : normalized.replace(/,/g, "");
    }
    const amount = Number(normalized);
    if (!Number.isFinite(amount)) return undefined;
    return parenthesesNegative ? -Math.abs(amount) : amount;
}
function hasAmbiguousDirection(file) {
    const { mapping } = file;
    if (mapping.debit || mapping.credit || !mapping.amount) return false;
    const positiveRows = file.rows.filter((row)=>(parseAmount(cell(row, mapping.amount)) ?? 0) > 0);
    if (!positiveRows.length || file.rows.some((row)=>(parseAmount(cell(row, mapping.amount)) ?? 0) < 0)) return false;
    const directionPattern = /income|credit|deposit|salary|payroll|gutschrift|haben|expense|debit|payment|purchase|belastung|soll|transfer|übertrag|uebertrag|investment|security|refund|reversal|chargeback/i;
    return positiveRows.some((row)=>!mapping.type || !directionPattern.test(cell(row, mapping.type)));
}
function normalizeDate(value) {
    const raw = value.trim();
    const iso = raw.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    let normalized;
    if (iso) {
        normalized = `${iso[1]}-${iso[2].padStart(2, "0")}-${iso[3].padStart(2, "0")}`;
    } else {
        const european = raw.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
        if (european) {
            normalized = `${european[3]}-${european[2].padStart(2, "0")}-${european[1].padStart(2, "0")}`;
        } else {
            const parsed = new Date(raw);
            if (Number.isNaN(parsed.getTime())) return undefined;
            normalized = `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
        }
    }
    const [year, month, day] = normalized.split("-").map(Number);
    const validated = new Date(Date.UTC(year, month - 1, day));
    if (validated.getUTCFullYear() !== year || validated.getUTCMonth() !== month - 1 || validated.getUTCDate() !== day) return undefined;
    return normalized;
}
function transactionKind(rawType, amount, description, source, target) {
    const type = rawType.toLowerCase();
    const detail = description.toLowerCase();
    const ownAccounts = /^account\d+$/i.test(source) && /^account\d+$/i.test(target);
    if (/transfer|own account|internal|übertrag|uebertrag|kreditkarten-zahlung/.test(type) || ownAccounts || /own account|internal transfer|transfer between accounts|account-to-account|kreditkarten-zahlung/.test(detail)) return "transfer";
    if (/investment|security|securities|etf|share purchase|stock/.test(`${type} ${detail}`)) return "investment";
    if (/refund|reversal|chargeback|erstattung|rückerstattung/.test(`${type} ${description.toLowerCase()}`)) return "refund";
    if (/credit.?card.?payment|debit.?card.?payment/.test(type)) return "expense";
    if (/income|credit|deposit|salary|payroll|gutschrift|haben/.test(type)) return "income";
    if (/expense|debit|payment|purchase|belastung|soll/.test(type)) return "expense";
    return amount < 0 ? "expense" : "income";
}
function stableId(values) {
    const text = values.map((value)=>value.trim().toLowerCase()).join("|");
    let hash = 2166136261;
    for(let index = 0; index < text.length; index += 1){
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16);
}
function pairedLabel(row, key) {
    if (!key) return "";
    const base = key.replace(/_(id|code)$/i, "");
    return cell(row, `${base}_label`) || cell(row, `${base}_name`) || cell(row, key);
}
function normalizeRows(file, rules = []) {
    const { mapping } = file;
    const hasAmount = Boolean(mapping.amount || mapping.debit || mapping.credit);
    if (!mapping.date || !hasAmount) {
        throw new Error(`${file.name}: map at least a date column and an amount, debit, or credit column.`);
    }
    const transactions = [];
    const errors = [];
    file.rows.forEach((row, index)=>{
        const date = normalizeDate(cell(row, mapping.date));
        const description = cell(row, mapping.description) || "Unlabelled transaction";
        const amountRaw = parseAmount(cell(row, mapping.amount));
        const debitRaw = parseAmount(cell(row, mapping.debit));
        const creditRaw = parseAmount(cell(row, mapping.credit));
        let originalAmount;
        if (debitRaw !== undefined || creditRaw !== undefined) {
            if (debitRaw && creditRaw) {
                errors.push(`${file.name}, row ${index + 2}: skipped because both debit and credit amounts are present.`);
                return;
            }
            originalAmount = Math.abs(creditRaw ?? 0) - Math.abs(debitRaw ?? 0);
        } else {
            originalAmount = amountRaw;
        }
        if (!date || originalAmount === undefined || originalAmount === 0) {
            errors.push(`${file.name}, row ${index + 2}: skipped because its date or non-zero amount could not be read.`);
            return;
        }
        const rawType = cell(row, mapping.type);
        const source = cell(row, mapping.source);
        const target = cell(row, mapping.target);
        const kind = transactionKind(rawType, originalAmount, description, source, target);
        const amount = kind === "expense" ? -Math.abs(originalAmount) : Math.abs(originalAmount);
        const sourceLabel = pairedLabel(row, mapping.source);
        const targetLabel = pairedLabel(row, mapping.target);
        const merchant = cell(row, mapping.merchant) || (kind === "expense" ? targetLabel : kind === "income" || kind === "refund" ? sourceLabel : sourceLabel || targetLabel);
        const sourceAccount = /^account\d+$/i.test(source) ? sourceLabel : "";
        const targetAccount = /^account\d+$/i.test(target) ? targetLabel : "";
        const account = cell(row, mapping.account) || sourceAccount || targetAccount || "Unspecified account";
        const rawCurrency = cell(row, mapping.currency).toUpperCase();
        const currency = /^[A-Z]{3}$/.test(rawCurrency) ? rawCurrency : "XXX";
        const id = stableId([
            date,
            description,
            String(originalAmount),
            currency,
            rawType || kind,
            source,
            target,
            account
        ]);
        const candidate = {
            id,
            date,
            description,
            amount,
            originalAmount,
            currency,
            category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["classifyTransaction"])({
                type: kind,
                description,
                merchant
            }, rules),
            categorySource: "rule",
            type: kind,
            account,
            merchant,
            isRecurring: false,
            confidence: rawType ? 0.96 : mapping.amount ? 0.82 : 0.75,
            sourceFile: file.name
        };
        const validated = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transactionSchema"].safeParse(candidate);
        if (!validated.success) {
            errors.push(`${file.name}, row ${index + 2}: ${validated.error.issues[0]?.message ?? "invalid transaction"}.`);
            return;
        }
        transactions.push(validated.data);
    });
    return {
        transactions,
        errors
    };
}
}),
"[project]/lib/database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTransactions",
    ()=>getTransactions,
    "initializeDatabase",
    ()=>initializeDatabase
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__url__external__node$3a$sqlite__ = __turbopack_context__.x("node:sqlite", ()=>require("node:sqlite"), true);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intelligence.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/csv.ts [app-route] (ecmascript)");
;
;
;
;
;
;
const dataDirectory = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data");
const databasePath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dataDirectory, "finance.sqlite");
let database;
let initialized;
function getDatabase() {
    if (!database) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].mkdirSync(dataDirectory, {
            recursive: true
        });
        database = new __TURBOPACK__url__external__node$3a$sqlite__["DatabaseSync"](databasePath);
        database.exec(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        original_amount REAL NOT NULL,
        currency TEXT NOT NULL,
        category TEXT NOT NULL,
        category_source TEXT,
        type TEXT NOT NULL,
        account TEXT NOT NULL,
        merchant TEXT NOT NULL,
        is_recurring INTEGER NOT NULL,
        confidence REAL NOT NULL,
        source_file TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
      CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account);
    `);
    }
    return database;
}
function readSeedTransactions() {
    const files = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dataDirectory, "Account1.csv"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dataDirectory, "Account3.csv")
    ];
    const transactions = [];
    for (const filePath of files){
        const text = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(filePath, "utf8");
        const result = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].parse(text, {
            header: true,
            skipEmptyLines: "greedy",
            transformHeader: (header)=>header.trim()
        });
        const parsedFile = {
            id: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(filePath),
            name: __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].basename(filePath),
            headers: result.meta.fields ?? [],
            rows: result.data,
            mapping: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["detectColumnMapping"])(result.meta.fields ?? []),
            parseWarnings: result.errors.map((error)=>`Row ${error.row ?? "?"}: ${error.message}`)
        };
        transactions.push(...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalizeRows"])(parsedFile).transactions);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deduplicateTransactions"])(transactions).transactions;
}
async function initializeDatabase() {
    if (!initialized) {
        initialized = (async ()=>{
            const db = getDatabase();
            const count = db.prepare("SELECT COUNT(*) AS count FROM transactions").get();
            if (count.count === 0) {
                const transactions = readSeedTransactions();
                const insert = db.prepare(`
          INSERT OR REPLACE INTO transactions (
            id, date, description, amount, original_amount, currency, category,
            category_source, type, account, merchant, is_recurring, confidence, source_file
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
                db.exec("BEGIN");
                try {
                    for (const transaction of transactions){
                        insert.run(transaction.id, transaction.date, transaction.description, transaction.amount, transaction.originalAmount, transaction.currency, transaction.category, transaction.categorySource ?? null, transaction.type, transaction.account, transaction.merchant, transaction.isRecurring ? 1 : 0, transaction.confidence, transaction.sourceFile ?? null);
                    }
                    db.exec("COMMIT");
                } catch (error) {
                    db.exec("ROLLBACK");
                    throw error;
                }
            }
        })();
    }
    await initialized;
}
async function getTransactions() {
    await initializeDatabase();
    const rows = getDatabase().prepare(`
    SELECT id, date, description, amount, original_amount, currency, category,
           category_source, type, account, merchant, is_recurring, confidence, source_file
    FROM transactions
    ORDER BY date ASC
  `).all();
    return rows.map((row)=>({
            id: row.id,
            date: row.date,
            description: row.description,
            amount: row.amount,
            originalAmount: row.original_amount,
            currency: row.currency,
            category: row.category,
            categorySource: row.category_source ?? undefined,
            type: row.type,
            account: row.account,
            merchant: row.merchant,
            isRecurring: Boolean(row.is_recurring),
            confidence: row.confidence,
            sourceFile: row.source_file ?? undefined
        }));
}
}),
"[project]/lib/intelligence.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeTransactions",
    ()=>analyzeTransactions,
    "calculateBudget",
    ()=>calculateBudget,
    "classifyTransaction",
    ()=>classifyTransaction,
    "deduplicateTransactions",
    ()=>deduplicateTransactions,
    "detectRecurringPayments",
    ()=>detectRecurringPayments,
    "forecastCashFlow",
    ()=>forecastCashFlow,
    "generateSavingsOpportunities",
    ()=>generateSavingsOpportunities,
    "getBalanceSeries",
    ()=>getBalanceSeries,
    "getCategoryTotals",
    ()=>getCategoryTotals,
    "getLatestMonth",
    ()=>getLatestMonth,
    "suggestBudgetLimits",
    ()=>suggestBudgetLimits,
    "summarizeMonth",
    ()=>summarizeMonth
]);
const categoryKeywords = {
    Housing: [
        "rent",
        "mortgage",
        "landlord",
        "miete",
        "mietzins",
        "housing",
        "wohnung",
        "home loan"
    ],
    Insurance: [
        "insurance",
        "versicherung",
        "krankenkasse",
        "health plan",
        "premium",
        "assurance"
    ],
    Healthcare: [
        "doctor",
        "medical",
        "healthcare",
        "pharmacy",
        "apotheke",
        "dentist",
        "hospital",
        "clinic",
        "optik"
    ],
    Transport: [
        "sbb",
        "train",
        "rail",
        "bus",
        "tram",
        "transport",
        "fuel",
        "benz",
        "tankstelle",
        "parking",
        "taxi",
        "uber",
        "ö v abo",
        "öV abo"
    ],
    Restaurants: [
        "restaurant",
        "ristorante",
        "cafe",
        "café",
        "coffee shop",
        "takeaway",
        "take away",
        "deliveroo",
        "ubereats",
        "eat.ch",
        "kantine",
        "lunch",
        "mittagessen",
        "dining"
    ],
    Food: [
        "grocery",
        "groceries",
        "supermarket",
        "coop",
        "migros",
        "denner",
        "aldi",
        "lidl",
        "food",
        "bakery",
        "bäckerei"
    ],
    Shopping: [
        "shopping",
        "amazon",
        "digitec",
        "galaxus",
        "zalando",
        "h&m",
        "manor",
        "orell",
        "veloshop",
        "fashion",
        "store",
        "nike",
        "apple online",
        "bestellung"
    ],
    Entertainment: [
        "cinema",
        "movie",
        "theatre",
        "theater",
        "concert",
        "ticketcorner",
        "netflix",
        "spotify",
        "steam",
        "game",
        "museum",
        "event"
    ],
    Utilities: [
        "utility",
        "utilities",
        "electric",
        "electricity",
        "ewz",
        "water bill",
        "heating",
        "internet",
        "swisscom",
        "salt",
        "sunrise",
        "phone bill"
    ],
    Subscriptions: [
        "subscription",
        "monthly plan",
        "membership",
        "icloud",
        "microsoft 365",
        "adobe",
        "youtube premium",
        "recurring"
    ]
};
function normalizedText(value) {
    return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
function ruleMatches(rule, merchant, description) {
    if (!rule.enabled || !rule.keyword.trim()) return false;
    const keyword = normalizedText(rule.keyword);
    const source = rule.matchOn === "merchant" ? merchant : rule.matchOn === "description" ? description : `${merchant} ${description}`;
    return normalizedText(source).includes(keyword);
}
function classifyTransaction(transaction, rules = []) {
    if (transaction.type === "income" || transaction.type === "refund") return "Income";
    if (transaction.type === "transfer") return "Transfers";
    if (transaction.type === "investment") return "Investments";
    const merchant = transaction.merchant ?? "";
    const description = transaction.description ?? "";
    const customRule = rules.find((rule)=>ruleMatches(rule, merchant, description));
    if (customRule) return customRule.category;
    const text = normalizedText(`${merchant} ${description}`);
    const order = [
        "Housing",
        "Insurance",
        "Healthcare",
        "Transport",
        "Restaurants",
        "Food",
        "Shopping",
        "Entertainment",
        "Utilities",
        "Subscriptions"
    ];
    return order.find((category)=>categoryKeywords[category].some((keyword)=>text.includes(normalizedText(keyword)))) ?? "Other";
}
function deduplicateTransactions(transactions) {
    const seenIds = new Set();
    const seenSignatures = new Set();
    const unique = [];
    let duplicates = 0;
    for (const transaction of transactions){
        const signature = [
            transaction.date,
            transaction.type,
            Math.round(Math.abs(transaction.originalAmount ?? transaction.amount) * 100),
            transaction.currency.toUpperCase(),
            normalizedText(transaction.description),
            normalizedText(transaction.merchant),
            normalizedText(transaction.account)
        ].join("|");
        if (seenIds.has(transaction.id) || seenSignatures.has(signature)) {
            duplicates += 1;
            continue;
        }
        seenIds.add(transaction.id);
        seenSignatures.add(signature);
        unique.push(transaction);
    }
    return {
        transactions: unique,
        duplicates
    };
}
function monthKey(date) {
    return date.slice(0, 7);
}
function monthName(key) {
    const [year, month] = key.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("en-GB", {
        month: "short"
    });
}
function addMonths(key, offset) {
    const [year, month] = key.split("-").map(Number);
    const date = new Date(year, month - 1 + offset, 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
function sumAbsolute(transactions) {
    return transactions.reduce((sum, transaction)=>sum + Math.abs(transaction.amount), 0);
}
function getLatestMonth(transactions) {
    return transactions.reduce((latest, item)=>monthKey(item.date) > latest ? monthKey(item.date) : latest, "");
}
function summarizeMonth(transactions, month) {
    const monthTransactions = transactions.filter((item)=>monthKey(item.date) === month);
    const income = sumAbsolute(monthTransactions.filter((item)=>item.type === "income"));
    const refunds = sumAbsolute(monthTransactions.filter((item)=>item.type === "refund"));
    const grossExpenses = sumAbsolute(monthTransactions.filter((item)=>item.type === "expense"));
    const investmentPurchases = sumAbsolute(monthTransactions.filter((item)=>item.type === "investment"));
    const expenses = Math.max(0, grossExpenses - refunds);
    const savings = income + refunds - grossExpenses;
    return {
        income,
        expenses,
        refunds,
        grossExpenses,
        savings,
        cashFlow: savings - investmentPurchases,
        investmentPurchases,
        transactions: monthTransactions
    };
}
function createMonthlySummary(transactions, currency, key) {
    const summary = summarizeMonth(transactions.filter((item)=>item.currency === currency), key);
    return {
        key,
        month: monthName(key),
        income: summary.income,
        expenses: summary.expenses,
        refunds: summary.refunds,
        investmentPurchases: summary.investmentPurchases,
        savings: summary.savings,
        cashFlow: summary.cashFlow
    };
}
function getFullMonthlySummaries(transactions, currency) {
    const dates = transactions.filter((item)=>item.currency === currency && item.type !== "transfer").map((item)=>monthKey(item.date)).sort();
    if (!dates.length) return [];
    const first = dates[0];
    const last = dates[dates.length - 1];
    const monthCount = (Number(last.slice(0, 4)) - Number(first.slice(0, 4))) * 12 + Number(last.slice(5, 7)) - Number(first.slice(5, 7));
    return Array.from({
        length: monthCount + 1
    }, (_, index)=>createMonthlySummary(transactions, currency, addMonths(first, index)));
}
function getCategoryTotals(transactions) {
    const totals = new Map();
    for (const item of transactions){
        if (item.type !== "expense") continue;
        totals.set(item.category, (totals.get(item.category) ?? 0) + Math.abs(item.amount));
    }
    return [
        ...totals.entries()
    ].map(([name, value])=>({
            name: name,
            value
        })).sort((a, b)=>b.value - a.value);
}
function average(values) {
    return values.length ? values.reduce((sum, value)=>sum + value, 0) / values.length : 0;
}
function median(values) {
    if (!values.length) return 0;
    const sorted = [
        ...values
    ].sort((a, b)=>a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
function dayDifference(first, second) {
    const firstDate = new Date(`${first}T00:00:00Z`).getTime();
    const secondDate = new Date(`${second}T00:00:00Z`).getTime();
    return Math.round((secondDate - firstDate) / 86_400_000);
}
function recurringName(transaction) {
    return normalizedText(transaction.merchant || transaction.description);
}
function flowGroups(transactions, type, currency) {
    const groups = new Map();
    for (const transaction of transactions){
        if (transaction.type !== type || transaction.currency !== currency) continue;
        const key = `${recurringName(transaction)}|${transaction.category}|${currency}`;
        groups.set(key, [
            ...groups.get(key) ?? [],
            transaction
        ]);
    }
    return [
        ...groups.entries()
    ].flatMap(([key, entries])=>{
        const sorted = [
            ...entries
        ].sort((a, b)=>a.date.localeCompare(b.date));
        if (sorted.length < 3) return [];
        const gaps = sorted.slice(1).map((item, index)=>dayDifference(sorted[index].date, item.date));
        const typicalGap = median(gaps);
        const cadence = typicalGap >= 6 && typicalGap <= 10 ? "weekly" : typicalGap >= 20 && typicalGap <= 40 ? "monthly" : typicalGap >= 75 && typicalGap <= 105 ? "quarterly" : undefined;
        if (!cadence) return [];
        const averageAmount = average(sorted.map((item)=>Math.abs(item.amount)));
        const monthlyFactor = cadence === "weekly" ? 4.345 : cadence === "quarterly" ? 1 / 3 : 1;
        const consistentGapCount = gaps.filter((gap)=>Math.abs(gap - typicalGap) <= typicalGap * 0.35).length;
        const confidence = Math.min(0.98, 0.55 + sorted.length * 0.06 + consistentGapCount / gaps.length * 0.15);
        return [
            {
                key,
                name: sorted[0].merchant || sorted[0].description,
                category: sorted[0].category,
                type,
                currency,
                occurrenceCount: sorted.length,
                averageAmount,
                monthlyAmount: averageAmount * monthlyFactor,
                cadence,
                confidence,
                transactionIds: sorted.map((item)=>item.id)
            }
        ];
    }).sort((a, b)=>b.monthlyAmount - a.monthlyAmount);
}
function detectRecurringPayments(transactions, currency) {
    return flowGroups(transactions, "expense", currency);
}
function analyzeTransactions(transactions, currency) {
    const selected = transactions.filter((item)=>item.currency === currency && item.type !== "transfer");
    const monthlySummaries = getFullMonthlySummaries(transactions, currency);
    const totalIncome = monthlySummaries.reduce((sum, item)=>sum + item.income, 0);
    const totalExpenses = monthlySummaries.reduce((sum, item)=>sum + item.expenses, 0);
    const totalRefunds = monthlySummaries.reduce((sum, item)=>sum + item.refunds, 0);
    const totalInvestments = monthlySummaries.reduce((sum, item)=>sum + item.investmentPurchases, 0);
    const totalSavings = monthlySummaries.reduce((sum, item)=>sum + item.savings, 0);
    const netCashFlow = monthlySummaries.reduce((sum, item)=>sum + item.cashFlow, 0);
    const monthCount = monthlySummaries.length;
    const expenditureChanges = monthlySummaries.slice(1).map((item, index)=>{
        const previous = monthlySummaries[index].expenses;
        const change = item.expenses - previous;
        return {
            month: item.key,
            previous,
            current: item.expenses,
            change,
            changeRate: previous ? change / previous : null
        };
    });
    const expenses = selected.filter((item)=>item.type === "expense").sort((a, b)=>Math.abs(b.amount) - Math.abs(a.amount));
    return {
        currency,
        periodStart: monthlySummaries[0]?.key ?? "",
        periodEnd: monthlySummaries.at(-1)?.key ?? "",
        monthCount,
        totalIncome,
        totalExpenses,
        totalRefunds,
        totalInvestments,
        netCashFlow,
        monthlySavings: monthCount ? totalSavings / monthCount : 0,
        savingsRate: totalIncome ? totalSavings / totalIncome : 0,
        averageMonthlySpending: monthCount ? totalExpenses / monthCount : 0,
        largestExpenses: expenses.slice(0, 5),
        recurringPayments: detectRecurringPayments(transactions, currency),
        monthlySummaries,
        expenditureChanges
    };
}
function calculateBudget(monthlyLimit, actualSpending) {
    const limit = Math.max(0, Number.isFinite(monthlyLimit) ? monthlyLimit : 0);
    const actual = Math.max(0, Number.isFinite(actualSpending) ? actualSpending : 0);
    return {
        monthlyLimit: limit,
        actualSpending: actual,
        remaining: limit - actual,
        overspent: Math.max(0, actual - limit),
        progressPercent: limit > 0 ? actual / limit * 100 : null,
        isOverBudget: limit > 0 && actual > limit
    };
}
function suggestBudgetLimits(transactions, currency, lookbackMonths = 3) {
    const latest = getLatestMonth(transactions.filter((item)=>item.currency === currency && item.type !== "transfer"));
    if (!latest) return [];
    const keys = Array.from({
        length: Math.max(1, lookbackMonths)
    }, (_, index)=>addMonths(latest, index - Math.max(1, lookbackMonths) + 1));
    const selected = transactions.filter((item)=>item.currency === currency && item.type !== "transfer");
    const availableKeys = keys.filter((key)=>selected.some((item)=>monthKey(item.date) === key));
    const categories = [
        ...new Set(transactions.filter((item)=>item.currency === currency && item.type === "expense").map((item)=>item.category))
    ];
    return categories.map((category)=>{
        const monthTotals = availableKeys.map((key)=>sumAbsolute(transactions.filter((item)=>item.currency === currency && item.type === "expense" && item.category === category && monthKey(item.date) === key)));
        const historicalAverage = average(monthTotals);
        const suggestedLimit = Math.ceil(Math.round(historicalAverage * 1.1 * 100) / 1000) * 10;
        const actualSpending = sumAbsolute(transactions.filter((item)=>item.currency === currency && item.type === "expense" && item.category === category && monthKey(item.date) === latest));
        return {
            category,
            monthlyLimit: suggestedLimit,
            historicalAverage,
            monthsUsed: monthTotals.filter((value)=>value > 0).length,
            actualSpending
        };
    }).sort((a, b)=>b.historicalAverage - a.historicalAverage);
}
function countCalendarMonths(keys) {
    if (!keys.length) return 1;
    const unique = [
        ...new Set(keys)
    ].sort();
    const first = unique[0];
    const last = unique.at(-1) ?? first;
    return Math.max(1, (Number(last.slice(0, 4)) - Number(first.slice(0, 4))) * 12 + Number(last.slice(5, 7)) - Number(first.slice(5, 7)) + 1);
}
function recurringDuplicateOpportunities(transactions, currency) {
    const groups = new Map();
    for (const transaction of transactions){
        if (transaction.currency !== currency || transaction.type !== "expense") continue;
        const key = recurringName(transaction);
        groups.set(key, [
            ...groups.get(key) ?? [],
            transaction
        ]);
    }
    return [
        ...groups.entries()
    ].flatMap(([key, entries])=>{
        const perMonth = new Map();
        entries.forEach((entry)=>perMonth.set(monthKey(entry.date), [
                ...perMonth.get(monthKey(entry.date)) ?? [],
                entry
            ]));
        const duplicateMonths = [
            ...perMonth.entries()
        ].filter(([, monthEntries])=>{
            if (monthEntries.length < 2) return false;
            const amounts = monthEntries.map((item)=>Math.abs(item.amount));
            return amounts.some((amount, index)=>amounts.slice(index + 1).some((other)=>Math.abs(amount - other) / Math.max(amount, other, 1) <= 0.05));
        });
        if (duplicateMonths.length < 2) return [];
        const monthlyAmounts = duplicateMonths.map(([, items])=>{
            const amounts = items.map((item)=>Math.abs(item.amount)).sort((a, b)=>b - a);
            return amounts.slice(1).reduce((sum, amount)=>sum + amount, 0);
        });
        const transactionIds = duplicateMonths.flatMap(([, items])=>items.map((item)=>item.id));
        return [
            {
                id: `duplicate-${key}`,
                title: `Review possible duplicate ${entries[0].merchant || "merchant"} charges`,
                explanation: `Similar charges from ${entries[0].merchant || "the same merchant"} appear more than once in ${duplicateMonths.length} separate months.`,
                category: entries[0].category,
                monthlySavings: average(monthlyAmounts),
                assumption: "Potential savings assume one of the repeated monthly charges is unintended and can be refunded or cancelled.",
                confidence: 0.55,
                transactionIds
            }
        ];
    });
}
function generateSavingsOpportunities(transactions, currency) {
    const selected = transactions.filter((item)=>item.currency === currency);
    const recurring = detectRecurringPayments(selected, currency);
    const opportunities = recurring.filter((flow)=>flow.type === "expense" && (flow.category === "Subscriptions" || flow.category === "Insurance" || flow.category === "Utilities")).map((flow)=>({
            id: `review-${flow.key}`,
            title: `Review ${flow.name}`,
            explanation: `${flow.name} appears ${flow.occurrenceCount} times with a typical ${flow.cadence} pattern.`,
            category: flow.category,
            monthlySavings: flow.monthlyAmount * 0.2,
            assumption: "Potential savings assume a 20% lower price after cancelling, downgrading, or renegotiating; action is optional.",
            confidence: flow.confidence,
            transactionIds: flow.transactionIds
        }));
    opportunities.push(...recurringDuplicateOpportunities(selected, currency));
    const latest = getLatestMonth(selected);
    if (latest) {
        const keys = Array.from({
            length: 4
        }, (_, index)=>addMonths(latest, index - 3));
        const restaurantSpend = keys.map((key)=>sumAbsolute(selected.filter((item)=>item.type === "expense" && item.category === "Restaurants" && monthKey(item.date) === key)));
        const previousAverage = average(restaurantSpend.slice(0, 2));
        const recentAverage = average(restaurantSpend.slice(2));
        const increase = recentAverage - previousAverage;
        if (previousAverage > 0 && increase > Math.max(10, previousAverage * 0.15)) {
            const ids = selected.filter((item)=>item.type === "expense" && item.category === "Restaurants" && keys.slice(2).includes(monthKey(item.date))).map((item)=>item.id);
            opportunities.push({
                id: "restaurant-spend-increase",
                title: "Restaurant spending has increased",
                explanation: `Average restaurant spending rose from ${previousAverage.toFixed(0)} to ${recentAverage.toFixed(0)} ${currency} per month in the last two observed months.`,
                category: "Restaurants",
                monthlySavings: increase * 0.2,
                assumption: "Potential savings assume reducing the recent increase by 20%; it is not a spending recommendation.",
                confidence: 0.76,
                transactionIds: ids
            });
        }
    }
    const analysis = analyzeTransactions(selected, currency);
    const discretionaryCategories = [
        "Restaurants",
        "Shopping",
        "Entertainment"
    ];
    const discretionarySpending = sumAbsolute(selected.filter((item)=>item.type === "expense" && discretionaryCategories.includes(item.category))) / Math.max(1, analysis.monthCount);
    const averageIncome = analysis.totalIncome / Math.max(1, analysis.monthCount);
    if (averageIncome > 0 && discretionarySpending / averageIncome >= 0.35) {
        opportunities.push({
            id: "discretionary-spending",
            title: "Set a flexible discretionary spending guardrail",
            explanation: `Restaurants, shopping, and entertainment average ${Math.round(discretionarySpending / averageIncome * 100)}% of recorded monthly income.`,
            category: "Shopping",
            monthlySavings: discretionarySpending * 0.1,
            assumption: "Potential savings assume a 10% reduction in discretionary spending while keeping the categories in your budget.",
            confidence: 0.72,
            transactionIds: selected.filter((item)=>item.type === "expense" && discretionaryCategories.includes(item.category)).map((item)=>item.id)
        });
    }
    if (opportunities.length < 3 && analysis.monthCount >= 2) {
        const category = getCategoryTotals(selected.filter((item)=>item.type === "expense" && [
                "Food",
                "Restaurants",
                "Shopping",
                "Entertainment"
            ].includes(item.category))).find((item)=>!opportunities.some((opportunity)=>opportunity.category === item.name));
        if (category) {
            const monthlyAverage = category.value / analysis.monthCount;
            opportunities.push({
                id: `optional-review-${category.name.toLowerCase()}`,
                title: `Optional 5% review: ${category.name}`,
                explanation: `${category.name} spending averaged ${monthlyAverage.toFixed(2)} ${currency} per month in the imported period; this is a possible review, not evidence that spending is excessive.`,
                category: category.name,
                monthlySavings: monthlyAverage * 0.05,
                assumption: "Illustrative savings assume 5% of this category's average spending is avoidable and you choose to reduce it.",
                confidence: 0.45,
                transactionIds: selected.filter((item)=>item.type === "expense" && item.category === category.name).map((item)=>item.id)
            });
        }
    }
    return opportunities.sort((a, b)=>b.monthlySavings - a.monthlySavings);
}
function recurringFlowIncludesBill(flow, billName) {
    const bill = normalizedText(billName);
    const name = normalizedText(flow.name);
    return bill.length > 2 && (name.includes(bill) || bill.includes(name));
}
function billsForHorizon(bills, currency, startDate, endDate, recurring) {
    return bills.filter((bill)=>bill.currency === currency && bill.dueDate >= startDate && bill.dueDate <= endDate && !recurring.some((flow)=>recurringFlowIncludesBill(flow, bill.name)));
}
function forecastCashFlow(transactions, bills, currency, asOf = new Date()) {
    const asOfDate = asOf.toISOString().slice(0, 10);
    const selected = transactions.filter((item)=>item.currency === currency && item.date <= asOfDate);
    const recurringIncomeFlows = flowGroups(selected, "income", currency);
    const recurringExpenseFlows = flowGroups(selected, "expense", currency);
    const recurringExpenseIds = new Set(recurringExpenseFlows.flatMap((flow)=>flow.transactionIds));
    const recentMonths = [
        ...new Set(selected.filter((item)=>item.type === "expense").map((item)=>monthKey(item.date)))
    ].sort().slice(-3);
    const variableTransactions = selected.filter((item)=>item.type === "expense" && !recurringExpenseIds.has(item.id));
    const variableTotals = recentMonths.map((key)=>sumAbsolute(variableTransactions.filter((item)=>monthKey(item.date) === key)));
    const averageVariableExpensesMonthly = average(variableTotals);
    const recurringIncomeMonthly = recurringIncomeFlows.reduce((sum, flow)=>sum + flow.monthlyAmount, 0);
    const recurringExpensesMonthly = recurringExpenseFlows.reduce((sum, flow)=>sum + flow.monthlyAmount, 0);
    const dateForDays = (days)=>{
        const date = new Date(asOf);
        date.setDate(date.getDate() + days);
        return date.toISOString().slice(0, 10);
    };
    const makeHorizon = (days)=>{
        const factor = days / 30.4375;
        const horizonBills = billsForHorizon(bills, currency, asOfDate, dateForDays(days), recurringExpenseFlows);
        const knownBillTotal = horizonBills.reduce((sum, bill)=>sum + bill.amount, 0);
        const projectedIncome = recurringIncomeMonthly * factor;
        const projectedExpenses = (recurringExpensesMonthly + averageVariableExpensesMonthly) * factor + knownBillTotal;
        return {
            days,
            projectedIncome,
            projectedExpenses,
            projectedNetFlow: projectedIncome - projectedExpenses,
            knownBills: knownBillTotal
        };
    };
    const horizons = [
        makeHorizon(30),
        makeHorizon(90)
    ];
    const assumptions = [
        `Recurring inflows/outflows use the average amount of at least three observed transactions at a weekly, monthly, or quarterly cadence.`,
        `Variable spending uses the average of ${recentMonths.length} latest calendar month(s) with expense history, excluding identified recurring transactions.`,
        `Known bills are added only when their due dates fall inside the projection window and their names do not match an identified recurring payment.`,
        `Projection is net transaction flow in ${currency}; no starting balance, currency conversion, market prices, or future guarantees are assumed.`
    ];
    return {
        currency,
        asOfDate,
        recurringIncomeMonthly,
        recurringExpensesMonthly,
        averageVariableExpensesMonthly,
        recurringIncomeFlows,
        recurringExpenseFlows,
        horizons,
        assumptions,
        confidence: Math.min(0.9, 0.35 + recentMonths.length * 0.08 + Math.min(recurringIncomeFlows.length + recurringExpenseFlows.length, 3) * 0.08)
    };
}
const roundMoney = (value)=>Math.round(value * 100) / 100;
function getBalanceSeries(transactions, currency, openingBalance = 0, account) {
    const selected = transactions.filter((item)=>item.currency === currency && (!account || item.account === account)).sort((a, b)=>a.date.localeCompare(b.date));
    const byDate = new Map();
    for (const item of selected)byDate.set(item.date, (byDate.get(item.date) ?? 0) + item.amount);
    const daily = [];
    let running = openingBalance;
    for (const [date, delta] of [
        ...byDate.entries()
    ].sort(([a], [b])=>a.localeCompare(b))){
        running += delta;
        daily.push({
            date,
            balance: roundMoney(running)
        });
    }
    const lastOfMonth = new Map();
    for (const point of daily)lastOfMonth.set(monthKey(point.date), point);
    const monthEnd = [
        ...lastOfMonth.values()
    ];
    const lowest = (points)=>points.reduce((min, point)=>!min || point.balance < min.balance ? point : min, null);
    return {
        currency,
        openingBalance,
        openingBalanceIsAssumed: openingBalance === 0,
        daily,
        monthEnd,
        lowestDay: lowest(daily),
        lowestMonthEnd: lowest(monthEnd),
        closingBalance: daily.at(-1)?.balance ?? openingBalance
    };
}
}),
"[project]/lib/models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "transactionCategories",
    ()=>transactionCategories,
    "transactionCategorySchema",
    ()=>transactionCategorySchema,
    "transactionSchema",
    ()=>transactionSchema,
    "transactionTypeSchema",
    ()=>transactionTypeSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .number>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .boolean>");
;
const transactionTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
    "income",
    "expense",
    "transfer",
    "refund",
    "investment"
]);
const transactionCategorySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
    "Income",
    "Housing",
    "Food",
    "Restaurants",
    "Transport",
    "Healthcare",
    "Insurance",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Subscriptions",
    "Investments",
    "Transfers",
    "Other"
]);
const transactionCategories = transactionCategorySchema.options;
const transactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string(),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite(),
    originalAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite(),
    currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    category: transactionCategorySchema,
    categorySource: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "rule",
        "manual"
    ]).optional(),
    type: transactionTypeSchema,
    account: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    merchant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string(),
    isRecurring: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__["z"].boolean(),
    confidence: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().min(0).max(1),
    sourceFile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional()
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0noodjb2q2a5r._.js.map