(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/csv-importer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CsvImporter",
    ()=>CsvImporter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as LoaderCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/csv.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const maxCsvFileBytes = 25 * 1024 * 1024;
const fieldLabels = [
    {
        key: "date",
        label: "Transaction date",
        required: true
    },
    {
        key: "description",
        label: "Description"
    },
    {
        key: "amount",
        label: "Amount"
    },
    {
        key: "debit",
        label: "Debit / outflow"
    },
    {
        key: "credit",
        label: "Credit / inflow"
    },
    {
        key: "type",
        label: "Transaction type"
    },
    {
        key: "currency",
        label: "Currency"
    },
    {
        key: "account",
        label: "Account"
    },
    {
        key: "merchant",
        label: "Merchant / counterparty"
    },
    {
        key: "source",
        label: "Source account"
    },
    {
        key: "target",
        label: "Destination account"
    }
];
function CsvImporter({ onClose, onImport }) {
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingFiles, setLoadingFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [importing, setImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    async function handleFiles(fileList) {
        if (!fileList?.length) return;
        setError("");
        setNotice("");
        setLoadingFiles(true);
        const results = await Promise.all(Array.from(fileList).map(async (file)=>{
            if (file.size > maxCsvFileBytes) {
                return {
                    error: `${file.name}: files must be 25 MB or smaller.`
                };
            }
            try {
                return {
                    parsed: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCsvFile"])(file)
                };
            } catch (reason) {
                return {
                    error: reason instanceof Error ? reason.message : `${file.name}: the file could not be read.`
                };
            }
        }));
        const parsed = results.flatMap((result)=>"parsed" in result && result.parsed ? [
                result.parsed
            ] : []);
        setFiles((current)=>{
            const knownIds = new Set(current.map((file)=>file.id));
            const additions = [];
            parsed.forEach((file)=>{
                if (knownIds.has(file.id)) return;
                knownIds.add(file.id);
                additions.push(file);
            });
            return [
                ...current,
                ...additions
            ];
        });
        const errors = results.flatMap((result)=>"error" in result ? [
                result.error
            ] : []);
        if (errors.length) setError(errors.join(" "));
        setLoadingFiles(false);
        if (inputRef.current) inputRef.current.value = "";
    }
    function updateMapping(fileId, key, value) {
        setFiles((current)=>current.map((file)=>file.id === fileId ? {
                    ...file,
                    mapping: {
                        ...file.mapping,
                        [key]: value
                    }
                } : file));
        setError("");
        setNotice("");
    }
    async function importFiles() {
        setError("");
        setNotice("");
        setImporting(true);
        try {
            const normalized = files.map((file)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeRows"])(file));
            const parsedTransactions = normalized.flatMap((result)=>result.transactions);
            const deduplicated = new Map();
            parsedTransactions.forEach((item)=>deduplicated.set(item.id, item));
            const all = [
                ...deduplicated.values()
            ];
            if (all.length === 0) throw new Error("No usable transactions were found. Check the column mapping and file contents.");
            const result = await onImport(all);
            const invalid = normalized.reduce((count, result)=>count + result.errors.length, 0);
            const duplicates = parsedTransactions.length - all.length + result.duplicates;
            setNotice(`${result.added} transactions added${duplicates ? `, ${duplicates} duplicates skipped` : ""}${invalid ? `, ${invalid} invalid rows skipped` : ""}. Your saved data now powers your analysis, savings plan, and local AI assistant.`);
            setFiles([]);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The CSV files could not be imported.");
        } finally{
            setImporting(false);
        }
    }
    const directionIsAmbiguous = files.some(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasAmbiguousDirection"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 px-6 py-8 text-center transition hover:border-brand/50 hover:bg-rose-50/30",
                onDragOver: (event)=>event.preventDefault(),
                onDrop: (event)=>{
                    event.preventDefault();
                    void handleFiles(event.dataTransfer.files);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        type: "file",
                        accept: ".csv,text/csv",
                        multiple: true,
                        className: "hidden",
                        onChange: (event)=>void handleFiles(event.target.files)
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm",
                        children: loadingFiles ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                            className: "animate-spin",
                            size: 22
                        }, void 0, false, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 121,
                            columnNumber: 27
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                            size: 21
                        }, void 0, false, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 121,
                            columnNumber: 81
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-semibold text-ink",
                        children: "Drop your CSV files here"
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-muted",
                        children: "Files stay in this browser and are never uploaded to a server."
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-slate-300 hover:bg-slate-50",
                        onClick: ()=>inputRef.current?.click(),
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/csv-importer.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this),
                            " Choose CSV files"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-importer.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            files.map((file)=>{
                const mappedAmount = Boolean(file.mapping.amount || file.mapping.debit || file.mapping.credit);
                const directionIsUnclear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasAmbiguousDirection"])(file);
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-2xl border border-line bg-white p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-start justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-brand",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"], {
                                                size: 19
                                            }, void 0, false, {
                                                fileName: "[project]/components/csv-importer.tsx",
                                                lineNumber: 141,
                                                columnNumber: 111
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-importer.tsx",
                                            lineNumber: 141,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "max-w-[230px] truncate text-sm font-semibold text-ink",
                                                    children: file.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/csv-importer.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-0.5 text-xs text-muted",
                                                    children: [
                                                        file.rows.length,
                                                        " rows · ",
                                                        file.headers.length,
                                                        " columns"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/csv-importer.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/csv-importer.tsx",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    "aria-label": `Remove ${file.name}`,
                                    className: "rounded-lg p-2 text-muted hover:bg-slate-100 hover:text-ink",
                                    onClick: ()=>setFiles((current)=>current.filter((item)=>item.id !== file.id)),
                                    type: "button",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/csv-importer.tsx",
                                        lineNumber: 147,
                                        columnNumber: 229
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 147,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 139,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
                            children: fieldLabels.map(({ key, label, required })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mb-1.5 block text-xs font-medium text-slate-600",
                                            children: [
                                                label,
                                                required ? " *" : ""
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/csv-importer.tsx",
                                            lineNumber: 152,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative block",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: "w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-8 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10",
                                                    value: file.mapping[key],
                                                    onChange: (event)=>updateMapping(file.id, key, event.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Not mapped"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/csv-importer.tsx",
                                                            lineNumber: 159,
                                                            columnNumber: 23
                                                        }, this),
                                                        file.headers.map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: header,
                                                                children: header
                                                            }, header, false, {
                                                                fileName: "[project]/components/csv-importer.tsx",
                                                                lineNumber: 160,
                                                                columnNumber: 53
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/csv-importer.tsx",
                                                    lineNumber: 154,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "pointer-events-none absolute right-3 top-2.5 text-slate-400",
                                                    size: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/components/csv-importer.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/csv-importer.tsx",
                                            lineNumber: 153,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 151,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this),
                        (!file.mapping.date || !mappedAmount) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 flex items-center gap-2 text-xs text-amber-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 167,
                                    columnNumber: 122
                                }, this),
                                " Map a transaction date and at least one amount column to continue."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 167,
                            columnNumber: 55
                        }, this),
                        directionIsUnclear && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 flex items-center gap-2 text-xs text-amber-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 168,
                                    columnNumber: 103
                                }, this),
                                " Positive amounts need a recognizable income/expense type or debit/credit columns so direction is not guessed."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 168,
                            columnNumber: 36
                        }, this),
                        file.parseWarnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-xs text-amber-700",
                            children: [
                                file.parseWarnings.length,
                                " CSV parsing warning(s); review your file before importing."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 169,
                            columnNumber: 47
                        }, this)
                    ]
                }, file.id, true, {
                    fileName: "[project]/components/csv-importer.tsx",
                    lineNumber: 138,
                    columnNumber: 11
                }, this);
            }),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "alert",
                className: "flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        className: "mt-0.5 shrink-0",
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 174,
                        columnNumber: 142
                    }, this),
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-importer.tsx",
                lineNumber: 174,
                columnNumber: 17
            }, this),
            notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                role: "status",
                className: "flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 175,
                        columnNumber: 157
                    }, this),
                    notice
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-importer.tsx",
                lineNumber: 175,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs leading-5 text-muted",
                        children: "Transactions are validated and saved locally in IndexedDB."
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2",
                        children: [
                            onClose && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100",
                                onClick: onClose,
                                type: "button",
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/components/csv-importer.tsx",
                                lineNumber: 180,
                                columnNumber: 23
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50",
                                disabled: !files.length || importing || loadingFiles || files.some((file)=>!file.mapping.date || !(file.mapping.amount || file.mapping.debit || file.mapping.credit)) || directionIsAmbiguous,
                                onClick: ()=>void importFiles(),
                                type: "button",
                                children: [
                                    importing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                                        className: "animate-spin",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/csv-importer.tsx",
                                        lineNumber: 187,
                                        columnNumber: 26
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/csv-importer.tsx",
                                        lineNumber: 187,
                                        columnNumber: 80
                                    }, this),
                                    importing ? "Importing…" : "Import transactions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/csv-importer.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-importer.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/csv-importer.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(CsvImporter, "oWvaSTse/dvWeEPcAhVdgTIC+jA=");
_c = CsvImporter;
var _c;
__turbopack_context__.k.register(_c, "CsvImporter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/financial-agent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinancialAgent",
    ()=>FinancialAgent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$audio$2d$lines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioLines$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/audio-lines.js [app-client] (ecmascript) <export default as AudioLines>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-up.js [app-client] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as LoaderCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-client] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$financial$2d$answer$2d$visual$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/financial-answer-visual.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2d$analysis$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/assistant-analysis-context.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/financial-tools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$agent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/financial-agent.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/finance.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$visualization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/financial-visualization.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$voice$2d$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/voice-errors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const suggestedQuestions = [
    "How much did I spend this month?",
    "What are my three biggest spending categories?",
    "How much could I save each month?",
    "Forecast my cash flow for the next three months."
];
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function numberValue(value) {
    return typeof value === "number" && Number.isFinite(value) ? value : 0;
}
function stringValue(value, fallback = "") {
    return typeof value === "string" ? value : fallback;
}
function listValue(value) {
    return Array.isArray(value) ? value : [];
}
function formatToolAnswer(tool, value, currency) {
    if (tool === "get_recurring_payments" || tool === "get_savings_opportunities") {
        const items = listValue(value).filter(isRecord);
        if (!items.length) return tool === "get_recurring_payments" ? "No recurring-payment pattern met the minimum evidence threshold in the imported transactions." : "No savings opportunity met the current evidence thresholds. Importing more history may reveal additional patterns.";
        return items.slice(0, 4).map((item)=>{
            if (tool === "get_recurring_payments") {
                return `${stringValue(item.name, "Payment")}: about ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.monthlyAmount), currency)} per month (${stringValue(item.cadence)} pattern, ${numberValue(item.occurrenceCount)} observations).`;
            }
            return `${stringValue(item.title, "Opportunity")}: estimated ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.monthlySavings), currency)} per month. Assumption: ${stringValue(item.assumption, "Illustrative only.")}`;
        }).join("\n");
    }
    const data = isRecord(value) ? value : {};
    switch(tool){
        case "get_financial_summary":
            return `Across ${numberValue(data.monthsAnalyzed)} imported month(s), recorded income was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.income), currency)}, expenses were ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.expenses), currency)}, and net cash flow was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.netCashFlow), currency)}. Average monthly savings were ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.monthlySavings), currency)} (${Math.round(numberValue(data.savingsRate) * 100)}%). A confirmed account balance is not available from transaction data.`;
        case "get_monthly_spending":
            return `${stringValue(data.month, "The latest imported month")}: net consumer expenses were ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.netExpenses), currency)} after ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.refunds), currency)} in refunds. Recorded income was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.income), currency)}; transfers are excluded.`;
        case "get_spending_by_category":
            {
                const categories = listValue(data.categories).filter(isRecord).slice(0, 3);
                return categories.length ? `Spending by category for ${stringValue(data.month, "the latest imported month")}:\n${categories.map((item)=>`${stringValue(item.name, "Other")}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.value), currency)}`).join("\n")}` : "There is no category-level expense data for the latest imported month.";
            }
        case "create_budget":
            {
                const budgets = listValue(data.budgets).filter(isRecord);
                if (!budgets.length) return `There are no new category limits to create for ${stringValue(data.targetMonth, "next month")}. Existing limits are left unchanged.`;
                return `I saved a suggested budget for ${stringValue(data.targetMonth, "next month")}:\n${budgets.map((item)=>`${stringValue(item.category, "Other")}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.monthlyLimit), currency)} monthly`).join("\n")}\n${stringValue(data.assumptions)}`;
            }
        case "get_budget_status":
            {
                const statuses = listValue(data.budgets).filter(isRecord);
                return statuses.length ? `Budget status for ${stringValue(data.month, "the latest imported month")}:\n${statuses.map((item)=>`${stringValue(item.category, "Category")}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.actualSpending), currency)} of ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.monthlyLimit), currency)}${item.isOverBudget === true ? `, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.overspent), currency)} over` : `, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.remaining), currency)} remaining`}`).join("\n")}` : "No saved budget limits are available for this currency.";
            }
        case "get_cashflow_forecast":
            {
                const horizons = listValue(data.horizons).filter(isRecord);
                if (!horizons.length) return "There is not enough imported information to produce a cash-flow estimate.";
                return `Estimated net flow (not a balance):\n${horizons.map((item)=>`${numberValue(item.days)} days: income ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.projectedIncome), currency)}, expenses ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.projectedExpenses), currency)}, net ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.projectedNetFlow), currency)}; known bills ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(item.knownBills), currency)}.`).join("\n")}\n${listValue(data.assumptions).filter((item)=>typeof item === "string").join(" ")}`;
            }
        case "get_investment_portfolio":
        case "calculate_investment_performance":
            return `Manually priced portfolio in ${currency}: invested ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.totalInvested), currency)}, current entered value ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.currentValue), currency)}, unrealised change ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(numberValue(data.unrealizedProfitLoss), currency)} (${numberValue(data.returnPercent).toFixed(2)}%). These values use user-entered prices, not live market data.`;
    }
}
function minimizeForProvider(value) {
    if (Array.isArray(value)) return value.map(minimizeForProvider);
    if (!isRecord(value)) return value;
    return Object.fromEntries(Object.entries(value).filter(([key])=>![
            "id",
            "transactionIds",
            "account",
            "sourceFile"
        ].includes(key)).map(([key, child])=>[
            key,
            minimizeForProvider(child)
        ]));
}
function FinancialAgent({ transactions, currency, budgets, investments, bills, savingsTarget, onCreateBudgets, onOpenImport }) {
    _s();
    const [question, setQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: "welcome",
            role: "assistant",
            text: "Hello. I’m the PostFinance Financial Intelligence Agent, an independent prototype. I can answer with calculations from your imported activity. Local Ollama is used for model assistance; exact figures stay on this device."
        }
    ]);
    const [sharingConsent, setSharingConsent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [ollamaStatus, setOllamaStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recording, setRecording] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [transcribing, setTranscribing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voiceBusy, setVoiceBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [aiVoiceEnabled, setAiVoiceEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const recorderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioChunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const audioUrls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const chatEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioElements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinancialAgent.useEffect": ()=>{
            chatEndRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }
    }["FinancialAgent.useEffect"], [
        messages,
        busy,
        transcribing
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinancialAgent.useEffect": ()=>{
            let active = true;
            const refreshStatus = {
                "FinancialAgent.useEffect.refreshStatus": async ()=>{
                    try {
                        const response = await fetch("/api/agent/status", {
                            cache: "no-store"
                        });
                        if (!response.ok) throw new Error("Status request failed.");
                        const status = await response.json();
                        if (active) setOllamaStatus(status);
                    } catch  {
                        if (active) setOllamaStatus({
                            connected: false,
                            model: "qwen2.5:3b"
                        });
                    }
                }
            }["FinancialAgent.useEffect.refreshStatus"];
            void refreshStatus();
            const interval = window.setInterval({
                "FinancialAgent.useEffect.interval": ()=>void refreshStatus()
            }["FinancialAgent.useEffect.interval"], 30_000);
            return ({
                "FinancialAgent.useEffect": ()=>{
                    active = false;
                    window.clearInterval(interval);
                }
            })["FinancialAgent.useEffect"];
        }
    }["FinancialAgent.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinancialAgent.useEffect": ()=>({
                "FinancialAgent.useEffect": ()=>{
                    if (recorderRef.current?.state === "recording") {
                        recorderRef.current.onstop = null;
                        recorderRef.current.stop();
                    }
                    streamRef.current?.getTracks().forEach({
                        "FinancialAgent.useEffect": (track)=>track.stop()
                    }["FinancialAgent.useEffect"]);
                    audioUrls.current.forEach({
                        "FinancialAgent.useEffect": (url)=>URL.revokeObjectURL(url)
                    }["FinancialAgent.useEffect"]);
                }
            })["FinancialAgent.useEffect"]
    }["FinancialAgent.useEffect"], []);
    async function submitQuestion(rawQuestion, fromVoice = false) {
        const prompt = rawQuestion.trim().slice(0, 1000);
        if (!prompt || busy) return;
        setBusy(true);
        setError("");
        setQuestion("");
        const userMessage = {
            id: crypto.randomUUID(),
            role: "user",
            text: prompt
        };
        const responseId = crypto.randomUUID();
        setMessages((current)=>[
                ...current,
                userMessage
            ]);
        try {
            const tool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$agent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectFinancialTool"])(prompt);
            const context = {
                transactions,
                currency,
                budgets,
                investments,
                bills
            };
            let result;
            if (tool === "create_budget") {
                const draft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create_budget"])(transactions, currency, budgets);
                result = draft;
                await onCreateBudgets(draft.budgets);
            } else result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$agent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["executeFinancialTool"])(tool, context);
            const verifiedAnswer = formatToolAnswer(tool, result, currency);
            const visualization = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$visualization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createFinancialVisualization"])(tool, result, currency);
            let explanation = "Here’s what I found.";
            if (sharingConsent) {
                try {
                    const response = await fetch("/api/agent/respond", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            consent: true,
                            question: prompt,
                            tool,
                            toolResult: JSON.stringify(minimizeForProvider(result)),
                            analysisContext: JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$assistant$2d$analysis$2d$context$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAssistantAnalysisContext"])({
                                transactions,
                                currency,
                                budgets,
                                investments,
                                bills,
                                savingsTarget
                            }))
                        })
                    });
                    const payload = await response.json();
                    if (!response.ok) throw new Error(payload.error || "The language model is unavailable.");
                    explanation = payload.explanation || explanation;
                } catch (reason) {
                    setError(reason instanceof Error ? `${reason.message} Using the verified local answer instead.` : "The language model is unavailable. Using the verified local answer instead.");
                }
            }
            const assistantMessage = {
                id: responseId,
                role: "assistant",
                text: explanation,
                verifiedAnswer,
                visualization,
                tool
            };
            setMessages((current)=>[
                    ...current,
                    assistantMessage
                ]);
            if (fromVoice || aiVoiceEnabled) void synthesizeSpeech(responseId, `${explanation} ${verifiedAnswer}`, true);
        } catch (reason) {
            setMessages((current)=>[
                    ...current,
                    {
                        id: responseId,
                        role: "assistant",
                        text: reason instanceof Error ? `I couldn’t complete that action: ${reason.message}` : "I couldn’t complete that action. Please try again."
                    }
                ]);
        } finally{
            setBusy(false);
        }
    }
    async function transcribeRecording(blob) {
        setTranscribing(true);
        setError("");
        try {
            const form = new FormData();
            form.append("file", blob, "recording.webm");
            const response = await fetch("/api/voice/transcribe", {
                method: "POST",
                body: form
            });
            const payload = await response.json();
            if (!response.ok || !payload.text) throw new Error(payload.error || "Transcription failed.");
            setQuestion(payload.text);
            await submitQuestion(payload.text, true);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "Voice transcription failed. You can type your question instead.");
        } finally{
            setTranscribing(false);
        }
    }
    async function startRecording() {
        setError("");
        if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
            setError("Audio recording is not supported in this browser. You can type your question instead.");
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
            streamRef.current = stream;
            audioChunks.current = [];
            const mimeType = [
                "audio/webm;codecs=opus",
                "audio/webm",
                "audio/mp4"
            ].find((type)=>MediaRecorder.isTypeSupported(type));
            const recorder = new MediaRecorder(stream, mimeType ? {
                mimeType
            } : undefined);
            recorderRef.current = recorder;
            recorder.ondataavailable = (event)=>{
                if (event.data.size) audioChunks.current.push(event.data);
            };
            recorder.onstop = ()=>{
                stream.getTracks().forEach((track)=>track.stop());
                streamRef.current = null;
                const audio = new Blob(audioChunks.current, {
                    type: recorder.mimeType || "audio/webm"
                });
                if (audio.size > 10 * 1024 * 1024) {
                    setError("This recording is over the 10 MB limit. Please record a shorter question.");
                    return;
                }
                void transcribeRecording(audio);
            };
            recorder.start();
            setRecording(true);
        } catch (reason) {
            streamRef.current?.getTracks().forEach((track)=>track.stop());
            streamRef.current = null;
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$voice$2d$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["microphoneErrorMessage"])(reason));
        }
    }
    function stopRecording() {
        if (recorderRef.current?.state === "recording") recorderRef.current.stop();
        setRecording(false);
    }
    async function synthesizeSpeech(messageId, text, autoPlay = false) {
        setVoiceBusy(true);
        setError("");
        try {
            const response = await fetch("/api/voice/speak", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text.slice(0, 4000)
                })
            });
            if (!response.ok) {
                let payloadMessage = "Speech generation failed.";
                try {
                    const payload = await response.json();
                    payloadMessage = payload.error || payloadMessage;
                } catch  {
                // Use the generic message if the provider route did not return JSON.
                }
                if ("speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(text.slice(0, 4000));
                    utterance.lang = navigator.language || "en-GB";
                    utterance.onend = ()=>setVoiceBusy(false);
                    utterance.onerror = ()=>{
                        setError(`Browser speech could not start. ${payloadMessage} The text response is still available.`);
                        setVoiceBusy(false);
                    };
                    window.speechSynthesis.speak(utterance);
                    setError(`ElevenLabs TTS unavailable: ${payloadMessage} Using your browser's voice instead.`);
                    if (!autoPlay) setVoiceBusy(false);
                    return;
                }
                throw new Error(payloadMessage);
            }
            const url = URL.createObjectURL(await response.blob());
            audioUrls.current.push(url);
            setMessages((current)=>current.map((message)=>message.id === messageId ? {
                        ...message,
                        audioUrl: url
                    } : message));
            if (autoPlay) {
                window.setTimeout(()=>{
                    void audioElements.current.get(messageId)?.play().catch(()=>{
                        setError("Audio is ready. Press Play to hear the response.");
                    });
                }, 100);
            }
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "Speech generation failed. The text response is still available.");
        } finally{
            setVoiceBusy(false);
        }
    }
    function submitForm(event) {
        event.preventDefault();
        void submitQuestion(question);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "ai-assistant-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "relative z-10 flex h-[68px] shrink-0 items-center justify-between border-b border-white/5 px-4 sm:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-400/10 text-violet-200",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$audio$2d$lines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioLines$3e$__["AudioLines"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 366,
                                    columnNumber: 142
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-agent.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-semibold tracking-wide text-white",
                                children: [
                                    "luma",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-violet-300",
                                        children: "."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-agent.tsx",
                                        lineNumber: 367,
                                        columnNumber: 80
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-agent.tsx",
                                lineNumber: 367,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden text-sm text-white/45 sm:inline",
                                children: "Financial assistant"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-agent.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-agent.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "aria-live": "polite",
                            className: "flex max-w-[174px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-white/70 sm:max-w-none sm:px-3 sm:text-[11px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `h-1.5 w-1.5 shrink-0 rounded-full ${ollamaStatus?.connected ? "bg-emerald-300 shadow-[0_0_10px_2px_rgba(110,255,181,0.4)]" : "bg-rose-300"}`
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 372,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block font-semibold",
                                            children: ollamaStatus ? ollamaStatus.connected ? "Connected" : "Disconnected" : "Checking Ollama"
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-agent.tsx",
                                            lineNumber: 374,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block truncate text-[8px] text-white/45 sm:text-[9px]",
                                            children: ollamaStatus?.model ?? "qwen2.5:3b"
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-agent.tsx",
                                            lineNumber: 375,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 373,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 371,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-agent.tsx",
                        lineNumber: 370,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-agent.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "relative z-10 flex min-h-0 flex-1 flex-col",
                children: messages.length === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 flex-col items-center justify-center px-4 pb-8 pt-4 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "aria-hidden": "true",
                            className: "ai-assistant-orb mb-8 sm:mb-10"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 384,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-2 text-sm text-violet-200/65",
                            children: "Hello"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 385,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "max-w-2xl text-2xl font-light leading-tight tracking-tight text-white/85 sm:text-4xl",
                            children: "How can I assist you with your finances today?"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 386,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 max-w-lg text-xs leading-5 text-white/40 sm:text-sm",
                            children: "Ask about your spending, budgets, savings, or investments. Your exact figures come from local calculations."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 387,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-7 grid w-full max-w-[560px] grid-cols-1 gap-3 sm:mt-9 sm:grid-cols-2",
                            children: suggestedQuestions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "min-h-12 rounded-xl border border-violet-400/50 bg-black/20 px-4 py-3 text-left text-xs text-white/80 transition hover:border-violet-200 hover:bg-violet-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 sm:text-sm",
                                    disabled: busy || transcribing,
                                    onClick: ()=>void submitQuestion(item),
                                    type: "button",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "mr-2 inline text-violet-300",
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-agent.tsx",
                                            lineNumber: 389,
                                            columnNumber: 436
                                        }, this),
                                        item
                                    ]
                                }, item, true, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 389,
                                    columnNumber: 51
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 388,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-agent.tsx",
                    lineNumber: 383,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-live": "polite",
                    className: "mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-6 sm:py-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-5",
                        children: [
                            messages.filter((message)=>message.id !== "welcome").map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: `max-w-[94%] rounded-2xl px-4 py-3 sm:max-w-[88%] ${message.role === "user" ? "rounded-br-md border border-violet-300/20 bg-violet-500/15 text-white" : "rounded-bl-md border border-white/5 bg-white/[0.04] text-white/85"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-1.5 flex items-center gap-2 text-[10px] font-semibold text-white/45",
                                                children: message.role === "user" ? "You" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                            size: 12
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/financial-agent.tsx",
                                                            lineNumber: 397,
                                                            columnNumber: 148
                                                        }, this),
                                                        " Luma"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-agent.tsx",
                                                    lineNumber: 397,
                                                    columnNumber: 146
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-agent.tsx",
                                                lineNumber: 397,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "whitespace-pre-line text-sm leading-6",
                                                children: message.text
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-agent.tsx",
                                                lineNumber: 398,
                                                columnNumber: 23
                                            }, this),
                                            message.visualization && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$financial$2d$answer$2d$visual$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FinancialAnswerVisual"], {
                                                currency: currency,
                                                visualization: message.visualization
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-agent.tsx",
                                                lineNumber: 399,
                                                columnNumber: 49
                                            }, this),
                                            message.verifiedAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 whitespace-pre-line rounded-xl border border-emerald-300/15 bg-emerald-300/[0.05] p-3 text-xs leading-5 text-white/75",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-200",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/financial-agent.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 299
                                                            }, this),
                                                            " Verified local calculation · ",
                                                            message.tool?.replaceAll("_", " ")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/financial-agent.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 190
                                                    }, this),
                                                    message.verifiedAnswer
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-agent.tsx",
                                                lineNumber: 400,
                                                columnNumber: 50
                                            }, this),
                                            message.role === "assistant" && message.verifiedAnswer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3",
                                                children: message.audioUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                                                    className: "h-9 max-w-full",
                                                    controls: true,
                                                    preload: "none",
                                                    ref: (element)=>{
                                                        if (element) audioElements.current.set(message.id, element);
                                                        else audioElements.current.delete(message.id);
                                                    },
                                                    src: message.audioUrl
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-agent.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 31
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/55 transition hover:text-violet-200 disabled:opacity-50",
                                                    disabled: voiceBusy,
                                                    onClick: ()=>void synthesizeSpeech(message.id, `${message.text} ${message.verifiedAnswer}`),
                                                    type: "button",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                            size: 14
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/financial-agent.tsx",
                                                            lineNumber: 405,
                                                            columnNumber: 307
                                                        }, this),
                                                        " ",
                                                        voiceBusy ? "Preparing audio…" : "Play response"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-agent.tsx",
                                                    lineNumber: 405,
                                                    columnNumber: 31
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-agent.tsx",
                                                lineNumber: 402,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-agent.tsx",
                                        lineNumber: 396,
                                        columnNumber: 21
                                    }, this)
                                }, message.id, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 395,
                                    columnNumber: 19
                                }, this)),
                            (busy || transcribing) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3 text-xs text-white/55",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                                            className: "animate-spin text-violet-300",
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-agent.tsx",
                                            lineNumber: 411,
                                            columnNumber: 202
                                        }, this),
                                        transcribing ? "Transcribing audio…" : "Thinking through your finances…"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 411,
                                    columnNumber: 80
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-agent.tsx",
                                lineNumber: 411,
                                columnNumber: 44
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: chatEndRef
                            }, void 0, false, {
                                fileName: "[project]/components/financial-agent.tsx",
                                lineNumber: 412,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-agent.tsx",
                        lineNumber: 393,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/financial-agent.tsx",
                    lineNumber: 392,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-agent.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "relative z-10 shrink-0 px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 sm:px-6 sm:pb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-3xl",
                    children: [
                        showSuggestions && messages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 flex flex-wrap gap-2",
                            children: suggestedQuestions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] text-white/65 transition hover:border-violet-300/40 hover:text-white disabled:opacity-50",
                                    disabled: busy || transcribing,
                                    onClick: ()=>{
                                        setShowSuggestions(false);
                                        void submitQuestion(item);
                                    },
                                    type: "button",
                                    children: item
                                }, item, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 419,
                                    columnNumber: 131
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 419,
                            columnNumber: 54
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-3 rounded-lg border border-amber-200/15 bg-amber-300/[0.08] px-3 py-2 text-xs leading-5 text-amber-100/85",
                            role: "alert",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 420,
                            columnNumber: 21
                        }, this),
                        recording && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            "aria-live": "polite",
                            className: "mb-2 flex items-center gap-2 text-xs font-medium text-rose-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-2 w-2 animate-pulse rounded-full bg-rose-400"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 421,
                                    columnNumber: 122
                                }, this),
                                " Listening · tap Stop to send your question"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 421,
                            columnNumber: 25
                        }, this),
                        transcribing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            "aria-live": "polite",
                            className: "mb-2 text-center text-xs text-violet-200/75",
                            children: "Transcribing your question…"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 422,
                            columnNumber: 28
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            className: "flex items-center gap-2 rounded-2xl border border-white/10 bg-[#15141c]/95 p-2 shadow-[0_14px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl focus-within:border-violet-300/45",
                            onSubmit: submitForm,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    "aria-expanded": showSuggestions,
                                    "aria-label": showSuggestions ? "Hide quick questions" : "Show quick questions",
                                    className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-violet-300 transition hover:bg-white/5 hover:text-violet-100",
                                    onClick: ()=>setShowSuggestions((current)=>!current),
                                    type: "button",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-agent.tsx",
                                        lineNumber: 424,
                                        columnNumber: 345
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    "aria-label": "Upload transaction CSV files",
                                    className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-violet-300 transition hover:bg-white/5 hover:text-violet-100 disabled:opacity-40",
                                    disabled: busy || transcribing || recording,
                                    onClick: onOpenImport,
                                    title: "Upload transaction CSV files",
                                    type: "button",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-agent.tsx",
                                        lineNumber: 425,
                                        columnNumber: 343
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 425,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    "aria-label": "Ask the financial assistant",
                                    className: "h-10 min-w-0 flex-1 bg-transparent px-1 text-sm text-white outline-none placeholder:text-white/40 disabled:opacity-50",
                                    disabled: busy || transcribing || recording,
                                    maxLength: 1000,
                                    onChange: (event)=>setQuestion(event.target.value),
                                    onKeyDown: (event)=>{
                                        if (event.key === "Enter" && !event.shiftKey) {
                                            event.preventDefault();
                                            void submitQuestion(question);
                                        }
                                    },
                                    placeholder: recording ? "Listening…" : "Type your question here",
                                    value: question
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 426,
                                    columnNumber: 13
                                }, this),
                                question.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    "aria-label": "Send question",
                                    className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#17131e] transition hover:bg-violet-100 disabled:opacity-40",
                                    disabled: busy || transcribing,
                                    type: "submit",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        size: 17
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-agent.tsx",
                                        lineNumber: 428,
                                        columnNumber: 250
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 428,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    "aria-label": recording ? "Finish voice question" : "Ask by voice",
                                    "aria-pressed": recording,
                                    className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${recording ? "bg-rose-400 text-white" : "bg-white text-violet-600 hover:bg-violet-100"} disabled:opacity-40`,
                                    disabled: busy || transcribing,
                                    onClick: ()=>{
                                        if (recording) stopRecording();
                                        else void startRecording();
                                    },
                                    title: recording ? "Tap to send your question" : "Ask by voice",
                                    type: "button",
                                    children: recording ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                        size: 15,
                                        fill: "currentColor"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-agent.tsx",
                                        lineNumber: 429,
                                        columnNumber: 517
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                        size: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-agent.tsx",
                                        lineNumber: 429,
                                        columnNumber: 560
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 429,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-center text-[10px] text-white/40",
                            children: recording ? "Tap Stop when you’ve finished speaking." : "Tap the microphone to ask by voice. Your answer will be spoken aloud."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 431,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                            className: "group mt-3 text-[10px] text-white/45",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                    className: "cursor-pointer list-none text-center transition hover:text-white/70",
                                    children: "Voice & assistant settings"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 433,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 grid gap-2 rounded-xl border border-white/10 bg-[#111018]/95 p-3 sm:grid-cols-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-start gap-2 leading-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    checked: aiVoiceEnabled,
                                                    className: "mt-0.5 accent-violet-400",
                                                    id: "agent-ai-voice",
                                                    onChange: (event)=>{
                                                        const enabled = event.target.checked;
                                                        setAiVoiceEnabled(enabled);
                                                        if (!enabled && "speechSynthesis" in window) window.speechSynthesis.cancel();
                                                    },
                                                    type: "checkbox"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-agent.tsx",
                                                    lineNumber: 436,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-white/75",
                                                            children: "AI voice"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/financial-agent.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 23
                                                        }, this),
                                                        " — uses ElevenLabs TTS when available, with a browser voice fallback."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-agent.tsx",
                                                    lineNumber: 437,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-agent.tsx",
                                            lineNumber: 435,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-start gap-2 leading-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    checked: sharingConsent,
                                                    className: "mt-0.5 accent-violet-400",
                                                    id: "agent-sharing-consent",
                                                    onChange: (event)=>setSharingConsent(event.target.checked),
                                                    type: "checkbox"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-agent.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-white/75",
                                                            children: "Use local Ollama"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/financial-agent.tsx",
                                                            lineNumber: 441,
                                                            columnNumber: 23
                                                        }, this),
                                                        " — send your question, its calculation, and an aggregate summary of your saved finances to Qwen on this device. Raw rows, account IDs, and files are not sent."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-agent.tsx",
                                                    lineNumber: 441,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-agent.tsx",
                                            lineNumber: 439,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-agent.tsx",
                                    lineNumber: 434,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-center text-[9px] text-white/30",
                            children: "Financial information only · Not financial advice · Ollama runs on this device"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-agent.tsx",
                            lineNumber: 445,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-agent.tsx",
                    lineNumber: 418,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-agent.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-agent.tsx",
        lineNumber: 363,
        columnNumber: 5
    }, this);
}
_s(FinancialAgent, "RRkWtwXckfUb7wW9CE1BrSLNkF8=");
_c = FinancialAgent;
var _c;
__turbopack_context__.k.register(_c, "FinancialAgent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/financial-answer-visual.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinancialAnswerVisual",
    ()=>FinancialAnswerVisual
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/finance.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$visualization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/financial-visualization.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function ChartTooltip({ active, payload, label, currency }) {
    if (!active || !payload?.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-white/10 bg-[#15141c] px-3 py-2.5 shadow-lg",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-1.5 text-xs font-semibold text-white/60",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/financial-answer-visual.tsx",
                lineNumber: 19,
                columnNumber: 17
            }, this),
            payload.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "flex items-center gap-2 text-xs leading-5 text-white/85",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-2 w-2 rounded-full",
                            style: {
                                backgroundColor: item.color
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/financial-answer-visual.tsx",
                            lineNumber: 22,
                            columnNumber: 11
                        }, this),
                        item.name,
                        ": ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(Number(item.value ?? 0), currency)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-answer-visual.tsx",
                            lineNumber: 23,
                            columnNumber: 24
                        }, this)
                    ]
                }, item.name, true, {
                    fileName: "[project]/components/financial-answer-visual.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-answer-visual.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = ChartTooltip;
function Chart({ chart, currency }) {
    if (chart.type === "pie") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-label": `${chart.title} chart`,
                    className: "h-48 w-full",
                    role: "img",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                        height: "100%",
                        width: "100%",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                    data: chart.points,
                                    dataKey: "value",
                                    nameKey: "label",
                                    innerRadius: 48,
                                    outerRadius: 78,
                                    paddingAngle: 3,
                                    stroke: "none",
                                    children: chart.points.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                            fill: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$visualization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["financialChartColors"][index % __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$visualization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["financialChartColors"].length]
                                        }, point.label, false, {
                                            fileName: "[project]/components/financial-answer-visual.tsx",
                                            lineNumber: 39,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-answer-visual.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                    formatter: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(Number(value), currency)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-answer-visual.tsx",
                                    lineNumber: 42,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-answer-visual.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/financial-answer-visual.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2",
                    children: chart.points.map((point, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "flex min-w-0 items-center gap-2 text-[11px] text-white/65",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-2 w-2 shrink-0 rounded-full",
                                    style: {
                                        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$visualization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["financialChartColors"][index % __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$visualization$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["financialChartColors"].length]
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-answer-visual.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "min-w-0 flex-1 truncate",
                                    children: point.label
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-answer-visual.tsx",
                                    lineNumber: 50,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    className: "shrink-0 text-white/85",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(Number(point.value), currency)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-answer-visual.tsx",
                                    lineNumber: 51,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, point.label, true, {
                            fileName: "[project]/components/financial-answer-visual.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/financial-answer-visual.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-answer-visual.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-label": `${chart.title} chart`,
        className: "h-[220px] w-full",
        role: "img",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
            height: "100%",
            width: "100%",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                data: chart.points,
                layout: "vertical",
                margin: {
                    top: 4,
                    right: 12,
                    bottom: 0,
                    left: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                        horizontal: false,
                        stroke: "#ffffff18"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                        axisLine: false,
                        domain: [
                            "auto",
                            "auto"
                        ],
                        tick: {
                            fill: "#a9a4b8",
                            fontSize: 10
                        },
                        tickFormatter: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(value, currency, true),
                        tickLine: false,
                        type: "number"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                        axisLine: false,
                        dataKey: "label",
                        tick: {
                            fill: "#d0cbd9",
                            fontSize: 10
                        },
                        tickLine: false,
                        type: "category",
                        width: 104
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                            currency: currency
                        }, void 0, false, {
                            fileName: "[project]/components/financial-answer-visual.tsx",
                            lineNumber: 66,
                            columnNumber: 29
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    chart.series.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                        iconType: "circle",
                        iconSize: 7,
                        wrapperStyle: {
                            color: "#c5bfd0",
                            fontSize: 10
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 67,
                        columnNumber: 39
                    }, this),
                    chart.series.map((series)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                            dataKey: series.key,
                            fill: series.color,
                            name: series.label,
                            radius: 4
                        }, series.key, false, {
                            fileName: "[project]/components/financial-answer-visual.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-answer-visual.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/financial-answer-visual.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-answer-visual.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c1 = Chart;
function FinancialAnswerVisual({ currency, visualization }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": `${visualization.title} statistics`,
        className: "mt-3 rounded-xl border border-violet-200/10 bg-black/20 p-3 sm:p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-xs font-semibold text-white/85",
                children: visualization.title
            }, void 0, false, {
                fileName: "[project]/components/financial-answer-visual.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            visualization.stats.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
                children: visualization.stats.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 rounded-lg border border-white/5 bg-white/[0.03] p-2.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "truncate text-[10px] text-white/50",
                                children: stat.label
                            }, void 0, false, {
                                fileName: "[project]/components/financial-answer-visual.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "mt-1 truncate text-sm font-semibold text-white/90",
                                children: stat.value
                            }, void 0, false, {
                                fileName: "[project]/components/financial-answer-visual.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this)
                        ]
                    }, stat.label, true, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 87,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/financial-answer-visual.tsx",
                lineNumber: 85,
                columnNumber: 9
            }, this),
            visualization.chart && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 border-t border-white/5 pt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "mb-2 text-[11px] font-medium text-white/70",
                        children: visualization.chart.title
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Chart, {
                        chart: visualization.chart,
                        currency: currency
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this),
                    visualization.chart.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-[10px] leading-4 text-white/45",
                        children: visualization.chart.note
                    }, void 0, false, {
                        fileName: "[project]/components/financial-answer-visual.tsx",
                        lineNumber: 98,
                        columnNumber: 40
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-answer-visual.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this),
            visualization.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-[10px] leading-4 text-white/45",
                children: visualization.note
            }, void 0, false, {
                fileName: "[project]/components/financial-answer-visual.tsx",
                lineNumber: 101,
                columnNumber: 30
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-answer-visual.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_c2 = FinancialAnswerVisual;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ChartTooltip");
__turbopack_context__.k.register(_c1, "Chart");
__turbopack_context__.k.register(_c2, "FinancialAnswerVisual");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/financial-app.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinancialApp",
    ()=>FinancialApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-left.js [app-client] (ecmascript) <export default as ArrowDownLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left-right.js [app-client] (ecmascript) <export default as ArrowLeftRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$audio$2d$lines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioLines$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/audio-lines.js [app-client] (ecmascript) <export default as AudioLines>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2d$business$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseBusiness$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase-business.js [app-client] (ecmascript) <export default as BriefcaseBusiness>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock-3.js [app-client] (ecmascript) <export default as Clock3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-up.js [app-client] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart-pulse.js [app-client] (ecmascript) <export default as HeartPulse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as LoaderCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-down.js [app-client] (ecmascript) <export default as TrendingDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-client] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/ComposedChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Legend.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/csv-importer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$financial$2d$agent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/financial-agent.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$market$2d$watchlist$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/market-watchlist.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/demo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/finance.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intelligence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
const navigation = [
    {
        name: "Overview",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
    },
    {
        name: "My Accounts",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
    },
    {
        name: "Smart Savings",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"]
    },
    {
        name: "Budget Planner",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"]
    },
    {
        name: "Investments",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
    },
    {
        name: "Financial Forecast",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"]
    },
    {
        name: "AI Assistant",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"]
    }
];
const chartColors = [
    "#d92e3a",
    "#5475ba",
    "#50a88a",
    "#e7a544",
    "#9276c6",
    "#78a6af",
    "#ef8190"
];
function Logo() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$audio$2d$lines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioLines$3e$__["AudioLines"], {
                    size: 20,
                    strokeWidth: 2.2
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 47,
                    columnNumber: 169
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 47,
                columnNumber: 51
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[17px] font-bold tracking-tight text-ink",
                        children: [
                            "luma",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-brand",
                                children: "."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 47,
                                columnNumber: 288
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 47,
                        columnNumber: 223
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "-mt-0.5 text-[10px] font-medium tracking-wide text-slate-400",
                        children: "MONEY, IN FOCUS"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 47,
                        columnNumber: 329
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 47,
                columnNumber: 218
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 47,
        columnNumber: 10
    }, this);
}
_c = Logo;
function CurrencySelect({ currencies, value, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                "aria-label": "Select currency",
                className: "appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm font-semibold text-ink outline-none focus:border-brand",
                onChange: (event)=>onChange(event.target.value),
                value: value,
                children: currencies.map((currency)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: currency,
                        children: currency
                    }, currency, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 54,
                        columnNumber: 39
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                className: "pointer-events-none absolute right-2.5 top-2.5 text-slate-400",
                size: 14
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c1 = CurrencySelect;
function SummaryCard({ title, value, detail, icon: Icon, tone = "slate", badge }) {
    const tones = {
        slate: "bg-slate-100 text-slate-600",
        red: "bg-rose-50 text-brand",
        green: "bg-emerald-50 text-emerald-700"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-medium text-slate-500",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 67,
                            columnNumber: 96
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-end justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[26px] font-semibold tracking-tight text-ink",
                        children: value
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mb-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700",
                        children: badge
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 71,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-xs leading-5 text-slate-400",
                children: detail
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_c2 = SummaryCard;
function SectionTitle({ eyebrow, title, description, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-6 flex flex-wrap items-end justify-between gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    eyebrow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-brand",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 79,
                        columnNumber: 96
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold tracking-tight text-ink sm:text-[28px]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 79,
                        columnNumber: 191
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-sm text-slate-500",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 79,
                        columnNumber: 297
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 79,
                columnNumber: 79
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 79,
        columnNumber: 10
    }, this);
}
_c3 = SectionTitle;
function Onboarding({ error, onImported, onDemo }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#f7f8fa] px-5 py-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-5xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {}, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 86,
                            columnNumber: 63
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-medium text-slate-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                    size: 13,
                                    className: "text-emerald-600"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 86,
                                    columnNumber: 219
                                }, this),
                                " Private by design"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 86,
                            columnNumber: 71
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "alert",
                    className: "mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 87,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mx-auto max-w-2xl pb-12 pt-12 text-center sm:pt-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-brand",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                size: 25
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 89,
                                columnNumber: 114
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand",
                            children: "A clearer view of your finances"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "mt-3 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-[42px]",
                            children: [
                                "Your money has a story.",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                    className: "hidden sm:block"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 91,
                                    columnNumber: 131
                                }, this),
                                " Let's make it make sense."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base",
                            children: "Bring your transactions together to discover spending patterns, plan with confidence, and find room to save. Your data stays on this device."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 88,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "mx-auto max-w-3xl rounded-3xl border border-line bg-white p-5 shadow-[0_18px_70px_rgba(20,34,56,0.07)] sm:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-5 flex items-center justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-base font-semibold text-ink",
                                            children: "Start with your transaction history"
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 95,
                                            columnNumber: 78
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-slate-500",
                                            children: "Upload one or more account exports in CSV format."
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 95,
                                            columnNumber: 167
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 95,
                                    columnNumber: 73
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 sm:flex",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                        size: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 95,
                                        columnNumber: 378
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 95,
                                    columnNumber: 269
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CsvImporter"], {
                            onImport: onImported
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-slate-100 pt-5 text-[11px] text-slate-400",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            size: 13
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 98,
                                            columnNumber: 62
                                        }, this),
                                        " Stored locally in your browser"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:block",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 98,
                                    columnNumber: 125
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Nothing is sent to a bank or server"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 98,
                                    columnNumber: 167
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:block",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 98,
                                    columnNumber: 215
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "CSV files only"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 98,
                                    columnNumber: 257
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto mt-5 flex max-w-3xl items-center justify-between gap-3 px-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] leading-5 text-slate-400",
                            children: "Independent hackathon prototype. Not affiliated with or endorsed by PostFinance."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "shrink-0 text-xs font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-ink",
                            onClick: onDemo,
                            type: "button",
                            children: "Explore demo data"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 101,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3",
                    children: [
                        [
                            "Understand",
                            "See where your money goes."
                        ],
                        [
                            "Plan",
                            "Build budgets that feel realistic."
                        ],
                        [
                            "Look ahead",
                            "Spot patterns before they surprise you."
                        ]
                    ].map(([title, copy], index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-2xl border border-slate-200/80 bg-white/70 p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold text-brand",
                                    children: [
                                        "0",
                                        index + 1
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 106,
                                    columnNumber: 280
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm font-semibold text-ink",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 106,
                                    columnNumber: 346
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-slate-500",
                                    children: copy
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 106,
                                    columnNumber: 408
                                }, this)
                            ]
                        }, title, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 106,
                            columnNumber: 196
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c4 = Onboarding;
function ChartTooltip({ active, payload, label, currency }) {
    if (!active || !payload?.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-100 bg-white px-3 py-2.5 shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-2 text-xs font-semibold text-slate-500",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 115,
                columnNumber: 93
            }, this),
            payload.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "flex items-center gap-2 text-xs leading-5 text-ink",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-2 w-2 rounded-full",
                            style: {
                                backgroundColor: item.color
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 115,
                            columnNumber: 266
                        }, this),
                        item.name,
                        ": ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value ?? 0, currency)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 115,
                            columnNumber: 360
                        }, this)
                    ]
                }, item.name, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 115,
                    columnNumber: 184
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 115,
        columnNumber: 10
    }, this);
}
_c5 = ChartTooltip;
function Insights({ transactions, currency }) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateFinancialInsights"])(transactions.filter((item)=>item.currency === currency), currency).slice(0, 5);
}
_c6 = Insights;
function Dashboard({ transactions, currency, onCurrency, onNavigate, onImport }) {
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const latest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["summarizeMonth"])(transactions.filter((item)=>item.currency === currency), latestMonth);
    const summaries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlySummaries"])(transactions.filter((item)=>item.currency === currency), currency, latestMonth);
    const periodMonths = new Set(summaries.map((item)=>item.key));
    const periodCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && periodMonths.has(item.date.slice(0, 7))));
    const categoryChart = periodCategories.length > 7 ? [
        ...periodCategories.slice(0, 6),
        {
            name: "Other categories",
            value: periodCategories.slice(6).reduce((sum, item)=>sum + item.value, 0)
        }
    ] : periodCategories;
    const recent = [
        ...transactions
    ].filter((item)=>item.currency === currency && item.type !== "transfer").sort((a, b)=>b.date.localeCompare(a.date)).slice(0, 6);
    const insights = Insights({
        transactions,
        currency
    });
    const recurring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectRecurring"])(transactions.filter((item)=>item.currency === currency));
    const savingsRate = latest.income ? latest.savings / latest.income : 0;
    const totalOutflow = summaries.reduce((sum, item)=>sum + item.expenses, 0);
    const periodIncome = summaries.reduce((sum, item)=>sum + item.income, 0);
    const periodSavings = summaries.reduce((sum, item)=>sum + item.savings, 0);
    const periodStart = summaries[0]?.key ?? latestMonth;
    const periodEnd = summaries.at(-1)?.key ?? latestMonth;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Your financial snapshot",
                title: `Good ${new Date().getHours() < 12 ? "morning" : "afternoon"}.`,
                description: `Here’s your money at a glance for ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(latestMonth)}.`,
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrencySelect, {
                            currencies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(transactions),
                            value: currency,
                            onChange: onCurrency
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 145,
                            columnNumber: 254
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "inline-flex items-center gap-2 rounded-lg bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700",
                            onClick: onImport,
                            type: "button",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 145,
                                    columnNumber: 542
                                }, this),
                                " Import CSV"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 145,
                            columnNumber: 352
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 145,
                    columnNumber: 213
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            transactions.some((item)=>item.description.includes("DEMO DATA")) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800",
                children: "DEMO DATA · Synthetic transactions are shown for preview only."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 146,
                columnNumber: 79
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Income",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(latest.income, currency),
                        detail: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(latestMonth),
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__["ArrowDownLeft"],
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Expenses",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(latest.expenses, currency),
                        detail: "Consumer spending, net of refunds",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"],
                        tone: "red"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Available cash balance",
                        value: "Not available",
                        detail: "No confirmed balance in uploaded files",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Monthly savings",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(latest.savings, currency),
                        detail: "Income less consumer spending · calculated",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Savings rate",
                        value: `${Math.round(savingsRate * 100)}%`,
                        detail: "Of latest month’s recorded income",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"],
                        tone: "red",
                        badge: savingsRate >= 0.2 ? "On track" : undefined
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "12-month financial summary",
                className: "mt-4 grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-card sm:grid-cols-3 sm:p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-medium text-slate-500",
                                children: "Income · last 12 calendar months"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 156,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-lg font-semibold text-ink",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(periodIncome, currency)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 156,
                                columnNumber: 104
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-medium text-slate-500",
                                children: "Consumer expenses · net of refunds"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 157,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-lg font-semibold text-ink",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(totalOutflow, currency)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 157,
                                columnNumber: 106
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-medium text-slate-500",
                                children: [
                                    "Calculated savings · ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(periodStart),
                                    "–",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(periodEnd)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 158,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-lg font-semibold text-ink",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(periodSavings, currency)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 158,
                                columnNumber: 142
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-5 xl:grid-cols-[1.7fr_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-5 flex flex-wrap items-start justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: "Income vs. expenses"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 163,
                                                columnNumber: 87
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: [
                                                    "Monthly activity · ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(periodStart),
                                                    "–",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(periodEnd)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 163,
                                                columnNumber: 150
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 163,
                                        columnNumber: 82
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-500",
                                        children: "Last 12 months"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 163,
                                        columnNumber: 271
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-[265px] w-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                    width: "100%",
                                    height: "100%",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComposedChart"], {
                                        data: summaries,
                                        margin: {
                                            top: 8,
                                            right: 2,
                                            left: -18,
                                            bottom: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                                stroke: "#eef1f4",
                                                strokeDasharray: "3 5",
                                                vertical: false
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                                dataKey: "month",
                                                axisLine: false,
                                                tickLine: false,
                                                tick: {
                                                    fill: "#91a0b2",
                                                    fontSize: 11
                                                },
                                                dy: 9
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                                axisLine: false,
                                                tickLine: false,
                                                tick: {
                                                    fill: "#91a0b2",
                                                    fontSize: 10
                                                },
                                                tickFormatter: (value)=>value === 0 ? "0" : `${Math.round(value / 1000)}k`
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                                    currency: currency
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 35
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 170,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Legend$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Legend"], {
                                                verticalAlign: "top",
                                                align: "right",
                                                iconType: "circle",
                                                iconSize: 7,
                                                wrapperStyle: {
                                                    fontSize: 11,
                                                    paddingBottom: 15
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 171,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "income",
                                                name: "Income",
                                                stroke: "#52a88c",
                                                fill: "#e2f4ed",
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 172,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                                type: "monotone",
                                                dataKey: "expenses",
                                                name: "Expenses",
                                                stroke: "#d92e3a",
                                                fill: "#fbe8e9",
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 173,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 165,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-semibold text-ink",
                                        children: "Spending by category"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 179,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-500",
                                        children: "Gross consumer expenses · last 12 months"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 179,
                                        columnNumber: 97
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            periodCategories.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-[262px] items-center gap-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-[210px] w-[54%]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                                            width: "100%",
                                            height: "100%",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                                                        data: categoryChart,
                                                        dataKey: "value",
                                                        nameKey: "name",
                                                        innerRadius: 62,
                                                        outerRadius: 88,
                                                        paddingAngle: 3,
                                                        stroke: "none",
                                                        children: categoryChart.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: chartColors[index % chartColors.length]
                                                            }, entry.name, false, {
                                                                fileName: "[project]/components/financial-app.tsx",
                                                                lineNumber: 183,
                                                                columnNumber: 194
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 35
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        formatter: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(Number(value), currency)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 183,
                                                        columnNumber: 274
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 183,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 182,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1 space-y-3",
                                        children: periodCategories.slice(0, 5).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "h-2 w-2 shrink-0 rounded-full",
                                                        style: {
                                                            backgroundColor: chartColors[index % chartColors.length]
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 163
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 truncate text-[11px] text-slate-500",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 282
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-semibold text-ink",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value, currency, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 186,
                                                        columnNumber: 369
                                                    }, this)
                                                ]
                                            }, item.name, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 186,
                                                columnNumber: 106
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 180,
                                columnNumber: 38
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "Category insights appear as transactions are categorized."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 187,
                                columnNumber: 20
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-slate-100 pt-3 text-xs text-slate-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-ink",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(totalOutflow, currency)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 188,
                                        columnNumber: 82
                                    }, this),
                                    " total recorded outflow in the chart period"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-5 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex flex-wrap items-start justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-semibold text-ink",
                                        children: "Cash flow over 12 months"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 193,
                                        columnNumber: 85
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-500",
                                        children: "Monthly net flow; transfers between accounts excluded"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 193,
                                        columnNumber: 153
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 193,
                                columnNumber: 80
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-[11px] text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 w-2 rounded-full bg-brand"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 193,
                                        columnNumber: 337
                                    }, this),
                                    " Net flow"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 193,
                                columnNumber: 259
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[195px] w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: "100%",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AreaChart"], {
                                data: summaries,
                                margin: {
                                    top: 12,
                                    right: 3,
                                    left: -18,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                            id: "cashFlowFill",
                                            x1: "0",
                                            x2: "0",
                                            y1: "0",
                                            y2: "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "0%",
                                                    stopColor: "#d92e3a",
                                                    stopOpacity: 0.18
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 240
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "100%",
                                                    stopColor: "#d92e3a",
                                                    stopOpacity: 0.01
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 194,
                                                    columnNumber: 299
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 194,
                                            columnNumber: 178
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 194,
                                        columnNumber: 172
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        stroke: "#eef1f4",
                                        strokeDasharray: "3 5",
                                        vertical: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 194,
                                        columnNumber: 384
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "month",
                                        axisLine: false,
                                        tickLine: false,
                                        tick: {
                                            fill: "#91a0b2",
                                            fontSize: 11
                                        },
                                        dy: 8
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 194,
                                        columnNumber: 457
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                        axisLine: false,
                                        tickLine: false,
                                        tick: {
                                            fill: "#91a0b2",
                                            fontSize: 10
                                        },
                                        tickFormatter: (value)=>`${Math.round(value / 1000)}k`
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 194,
                                        columnNumber: 564
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                            currency: currency
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 194,
                                            columnNumber: 732
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 194,
                                        columnNumber: 714
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                        type: "monotone",
                                        dataKey: "cashFlow",
                                        name: "Net flow",
                                        stroke: "#d92e3a",
                                        strokeWidth: 2.5,
                                        fill: "url(#cashFlowFill)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 194,
                                        columnNumber: 772
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 194,
                                columnNumber: 91
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 194,
                            columnNumber: 43
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: "Recent transactions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 199,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "Latest activity across selected currency"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 199,
                                                columnNumber: 135
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 199,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs font-semibold text-brand hover:text-rose-700",
                                        onClick: ()=>onNavigate("My Accounts"),
                                        type: "button",
                                        children: "View all"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 199,
                                        columnNumber: 228
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            recent.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-slate-100",
                                children: recent.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                                        currency: currency,
                                        item: item
                                    }, item.id, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 200,
                                        columnNumber: 93
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 200,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "No transactions are available in this currency."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 200,
                                columnNumber: 168
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 203,
                                            columnNumber: 156
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 203,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: "A few things we noticed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 203,
                                                columnNumber: 190
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-400",
                                                children: "Based on your uploaded history"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 203,
                                                columnNumber: 257
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 203,
                                        columnNumber: 185
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: insights.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "rounded-xl border border-slate-100 p-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-semibold text-ink",
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 192
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "shrink-0 rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-semibold text-slate-500",
                                                        children: [
                                                            item.confidenceLabel,
                                                            " · ",
                                                            Math.round(item.confidence * 100),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 254
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 204,
                                                columnNumber: 136
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[11px] leading-[1.55] text-slate-500",
                                                children: item.explanation
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 204,
                                                columnNumber: 432
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[10px] leading-[1.5] text-slate-400",
                                                children: item.evidence
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 204,
                                                columnNumber: 516
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[10px] font-medium text-ink",
                                                children: [
                                                    item.impactLabel,
                                                    ": ",
                                                    item.impactLabel === "No cash impact calculated" ? "—" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.financialImpact, currency)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 204,
                                                columnNumber: 596
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-[10px] font-medium text-ink",
                                                children: item.suggestedAction
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 204,
                                                columnNumber: 775
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 204,
                                        columnNumber: 62
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-rose-700",
                                onClick: ()=>onNavigate("AI Assistant"),
                                type: "button",
                                children: [
                                    "Ask your money assistant ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 205,
                                        columnNumber: 202
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-5 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: "Financial health"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 211,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "A simple read on your latest month"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 211,
                                                columnNumber: 132
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 211,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"], {
                                        className: "text-brand",
                                        size: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 211,
                                        columnNumber: 219
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4 rounded-xl bg-slate-50 p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[5px] border-slate-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-bold text-ink",
                                            children: [
                                                Math.round(savingsRate * 100),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 212,
                                            columnNumber: 200
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 212,
                                        columnNumber: 79
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-ink",
                                                children: savingsRate >= 0.2 ? "Good savings momentum" : savingsRate > 0 ? "Room to grow your buffer" : "Keep an eye on cash flow"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 212,
                                                columnNumber: 295
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs leading-5 text-slate-500",
                                                children: "Savings rate is based on recorded income and eligible spending. It is not a credit or solvency score."
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 212,
                                                columnNumber: 467
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 212,
                                        columnNumber: 290
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex items-center justify-between text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500",
                                        children: "Confirmed account balance"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 213,
                                        columnNumber: 75
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-slate-500",
                                        children: "Not included in CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 213,
                                        columnNumber: 140
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: "Upcoming recurring payments"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 216,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "Possible patterns from repeat transactions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 216,
                                                columnNumber: 143
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 216,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__["Clock3"], {
                                        className: "text-slate-400",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 216,
                                        columnNumber: 238
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this),
                            recurring.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: recurring.slice(0, 3).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-3 rounded-xl px-2 py-3 hover:bg-slate-50",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex min-w-0 items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                            size: 16
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/financial-app.tsx",
                                                            lineNumber: 217,
                                                            columnNumber: 361
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 254
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "truncate text-sm font-medium text-ink",
                                                                children: item.merchant || item.description
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/financial-app.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 417
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-0.5 text-xs text-slate-400",
                                                                children: [
                                                                    "Observed ",
                                                                    item.occurrenceCount,
                                                                    " times · estimate"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/financial-app.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 509
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 392
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 217,
                                                columnNumber: 205
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "shrink-0 text-sm font-semibold text-ink",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.averageAmount, currency),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-normal text-slate-400",
                                                        children: " / avg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 719
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 217,
                                                columnNumber: 618
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 217,
                                        columnNumber: 95
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 217,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "Repeat payments will appear after at least three matching transactions."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 217,
                                columnNumber: 813
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_c7 = Dashboard;
function TransactionRow({ item, currency }) {
    const positive = item.type === "income" || item.type === "refund";
    const initials = (item.merchant || item.description).trim().slice(0, 1).toUpperCase();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-3 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${positive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`,
                children: initials
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 227,
                columnNumber: 56
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-sm font-medium text-ink",
                        children: item.merchant || item.description
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 227,
                        columnNumber: 287
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-0.5 text-xs text-slate-400",
                        children: [
                            new Date(`${item.date}T12:00:00`).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short"
                            }),
                            " · ",
                            item.category
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 227,
                        columnNumber: 379
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 227,
                columnNumber: 255
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-sm font-semibold ${positive ? "text-emerald-700" : "text-ink"}`,
                children: [
                    positive ? "+" : "−",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(Math.abs(item.amount), currency)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 227,
                columnNumber: 551
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 227,
        columnNumber: 10
    }, this);
}
_c8 = TransactionRow;
function InsightCard({ icon: Icon, title, copy, tone }) {
    const tones = {
        green: "bg-emerald-50 text-emerald-700",
        amber: "bg-amber-50 text-amber-700",
        blue: "bg-blue-50 text-blue-700",
        violet: "bg-violet-50 text-violet-700"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 rounded-xl border border-slate-100 p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${tones[tone] ?? tones.blue}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 232,
                    columnNumber: 194
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 232,
                columnNumber: 77
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-ink",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 232,
                        columnNumber: 224
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] leading-[1.55] text-slate-500",
                        children: copy
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 232,
                        columnNumber: 281
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 232,
                columnNumber: 219
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 232,
        columnNumber: 10
    }, this);
}
_c9 = InsightCard;
function EmptyState({ text }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-[130px] items-center justify-center rounded-xl bg-slate-50 px-5 text-center text-xs leading-5 text-slate-400",
        children: text
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 236,
        columnNumber: 10
    }, this);
}
_c10 = EmptyState;
function LegacyAccountsPage({ transactions, currency, onCurrency, onImport }) {
    _s();
    const accounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "LegacyAccountsPage.useMemo[accounts]": ()=>[
                ...new Set(transactions.filter({
                    "LegacyAccountsPage.useMemo[accounts]": (item)=>item.currency === currency
                }["LegacyAccountsPage.useMemo[accounts]"]).map({
                    "LegacyAccountsPage.useMemo[accounts]": (item)=>item.account
                }["LegacyAccountsPage.useMemo[accounts]"]))
            ]
    }["LegacyAccountsPage.useMemo[accounts]"], [
        transactions,
        currency
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Connected activity",
                title: "My accounts",
                description: "A unified view of the transactions you have imported.",
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrencySelect, {
                            currencies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(transactions),
                            value: currency,
                            onChange: onCurrency
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 256,
                            columnNumber: 179
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "inline-flex items-center gap-2 rounded-lg bg-brand px-3.5 py-2.5 text-sm font-semibold text-white",
                            onClick: onImport,
                            type: "button",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 256,
                                    columnNumber: 428
                                }, this),
                                " Import CSV"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 256,
                            columnNumber: 277
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 256,
                    columnNumber: 151
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 256,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: accounts.map((account)=>{
                    const rows = transactions.filter((item)=>item.account === account && item.currency === currency);
                    const count = rows.length;
                    const netFlow = rows.filter((item)=>item.type === "income" || item.type === "expense" || item.type === "refund" || item.type === "investment").reduce((sum, item)=>sum + (item.type === "expense" || item.type === "investment" ? -Math.abs(item.amount) : Math.abs(item.amount)), 0);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-line bg-white p-6 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-brand",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                            size: 19
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 256,
                                            columnNumber: 1197
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 256,
                                        columnNumber: 1103
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700",
                                        children: "Activity imported"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 256,
                                        columnNumber: 1224
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 256,
                                columnNumber: 1053
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-5 text-lg font-semibold text-ink",
                                children: account
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 256,
                                columnNumber: 1354
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-slate-500",
                                children: [
                                    count,
                                    " transactions · ",
                                    currency
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 256,
                                columnNumber: 1420
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 flex justify-between border-t border-slate-100 pt-4 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500",
                                        children: "Recorded net flow"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 256,
                                        columnNumber: 1582
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-ink",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(netFlow, currency)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 256,
                                        columnNumber: 1639
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 256,
                                columnNumber: 1500
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-[11px] leading-5 text-slate-400",
                                children: "Calculated from imported activity only; not a current or confirmed account balance."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 256,
                                columnNumber: 1725
                            }, this)
                        ]
                    }, account, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 256,
                        columnNumber: 966
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 256,
                columnNumber: 476
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 rounded-2xl border border-line bg-white p-5 shadow-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 font-semibold text-ink",
                        children: "Latest account activity"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 256,
                        columnNumber: 1963
                    }, this),
                    transactions.filter((item)=>item.currency === currency).sort((a, b)=>b.date.localeCompare(a.date)).slice(0, 10).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                            currency: currency,
                            item: item
                        }, item.id, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 256,
                            columnNumber: 2166
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 256,
                columnNumber: 1885
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 256,
        columnNumber: 10
    }, this);
}
_s(LegacyAccountsPage, "XO3rZRQbsHqfzAUrjjM24XMr218=");
_c11 = LegacyAccountsPage;
function LegacySavingsPage({ transactions, currency }) {
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && item.date.slice(0, 4) === latestMonth.slice(0, 4)));
    const recurring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["detectRecurring"])(transactions.filter((item)=>item.currency === currency));
    const top = categories[0];
    const monthlyAverage = top ? top.value / Math.max(1, new Set(transactions.filter((item)=>item.currency === currency).map((item)=>item.date.slice(0, 7))).size) : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Small changes, real momentum",
                title: "Smart savings",
                description: "Practical ideas from your actual transaction history. No promises, just patterns."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 265,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-brand/10 bg-gradient-to-br from-rose-50 to-white p-6 md:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 265,
                                    columnNumber: 440
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 338
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 text-xs font-bold uppercase tracking-widest text-brand",
                                children: "A place to start"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 469
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 max-w-lg text-xl font-semibold text-ink",
                                children: top ? `Review your ${top.name.toLowerCase()} spending` : "Import more transactions to find your savings opportunities"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 564
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 max-w-lg text-sm leading-6 text-slate-500",
                                children: top ? `${top.name} is your largest spending category at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(top.value, currency)} in ${latestMonth.slice(0, 4)}. Even a modest 5% reduction would free up about ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(top.value * 0.05, currency)} over that period, if it fits your needs.` : "Your finances stay private on this device. Once activity is imported, we will highlight spending patterns and possible recurring costs."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 750
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 265,
                        columnNumber: 228
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-line bg-white p-6 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-slate-500",
                                children: "Possible recurring payments"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 1291
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-3xl font-semibold text-ink",
                                children: recurring.length
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 1372
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-5 text-slate-400",
                                children: "Patterns from repeated transactions; confirm these yourself before acting."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 1446
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 265,
                        columnNumber: 1218
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 265,
                columnNumber: 185
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-5 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-6 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Spending opportunities"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 1714
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: "Illustrative savings only; based on recorded spending"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 1780
                            }, this),
                            categories.slice(0, 5).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mb-2 flex justify-between text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-ink",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 2014
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-500",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value, currency),
                                                        " · 5% = ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value * 0.05, currency)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 2071
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 265,
                                            columnNumber: 1963
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-2 overflow-hidden rounded-full bg-slate-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-full rounded-full",
                                                style: {
                                                    width: `${Math.max(4, 100 - index * 16)}%`,
                                                    backgroundColor: chartColors[index]
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 265,
                                                columnNumber: 2265
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 265,
                                            columnNumber: 2202
                                        }, this)
                                    ]
                                }, item.name, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 265,
                                    columnNumber: 1925
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 265,
                        columnNumber: 1637
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-6 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Repeat payments to review"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 2497
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: "Automatically spotted after three similar expenses"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 2566
                            }, this),
                            recurring.length ? recurring.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-ink",
                                                    children: item.merchant || item.description
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 2833
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-slate-400",
                                                    children: [
                                                        item.occurrenceCount,
                                                        " times in imported history"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 2916
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 265,
                                            columnNumber: 2828
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-ink",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.averageAmount, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 265,
                                            columnNumber: 3017
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 265,
                                    columnNumber: 2707
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "No repeat-payment patterns yet. These are suggestions, not payment predictions."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 265,
                                    columnNumber: 3142
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 265,
                                columnNumber: 3120
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 265,
                        columnNumber: 2420
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 265,
                columnNumber: 1589
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 265,
        columnNumber: 10
    }, this);
}
_c12 = LegacySavingsPage;
function LegacyBudgetPage({ transactions, currency, budgets, onSaveBudget }) {
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && item.date.startsWith(latestMonth)));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Plan with intention",
                title: "Budget planner",
                description: `Set your own monthly limits. Actuals reflect ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(latestMonth)}.`
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 271,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs leading-5 text-blue-800",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                        className: "mt-0.5 shrink-0",
                        size: 16
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 271,
                        columnNumber: 299
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Budget limits are your own planning targets. No limits are assumed; add the amounts that make sense for you."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 271,
                        columnNumber: 350
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 271,
                columnNumber: 170
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-[1fr_110px_100px] gap-3 border-b border-slate-100 pb-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400 sm:grid-cols-[1fr_150px_150px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Category"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 271,
                                columnNumber: 738
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Actual"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 271,
                                columnNumber: 759
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Monthly limit"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 271,
                                columnNumber: 778
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 271,
                        columnNumber: 555
                    }, this),
                    categories.length ? categories.map((item)=>{
                        const budget = budgets.find((entry)=>entry.category === item.name);
                        const limit = budget?.monthlyLimit ?? 0;
                        const progress = limit ? Math.min(100, item.value / limit * 100) : 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-slate-100 py-4 last:border-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[1fr_110px_100px] items-center gap-3 sm:grid-cols-[1fr_150px_150px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "truncate text-sm font-semibold text-ink",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 1248
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2 h-1.5 max-w-[240px] overflow-hidden rounded-full bg-slate-100",
                                                    children: limit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `h-full rounded-full ${progress >= 100 ? "bg-brand" : "bg-emerald-500"}`,
                                                        style: {
                                                            width: `${progress}%`
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 271,
                                                        columnNumber: 1416
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 1318
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 271,
                                            columnNumber: 1223
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-slate-600",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 271,
                                            columnNumber: 1555
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            "aria-label": `${item.name} monthly budget`,
                                            className: "w-full rounded-lg border border-slate-200 px-2.5 py-2 text-sm text-ink outline-none focus:border-brand",
                                            min: "0",
                                            onChange: (event)=>onSaveBudget({
                                                    id: item.name,
                                                    category: item.name,
                                                    monthlyLimit: Number(event.target.value),
                                                    actualSpending: item.value
                                                }),
                                            placeholder: "Set limit",
                                            type: "number",
                                            value: budget?.monthlyLimit || ""
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 271,
                                            columnNumber: 1638
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 271,
                                    columnNumber: 1123
                                }, this),
                                limit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `mt-2 pl-1 text-[11px] ${item.value > limit ? "text-brand" : "text-emerald-700"}`,
                                    children: item.value > limit ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value - limit, currency)} over limit` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(limit - item.value, currency)} remaining`
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 271,
                                    columnNumber: 2051
                                }, this)
                            ]
                        }, item.name, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 271,
                            columnNumber: 1045
                        }, this);
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "There is no spending in this month to plan against."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 271,
                            columnNumber: 2326
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 271,
                        columnNumber: 2304
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 271,
                columnNumber: 471
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 271,
        columnNumber: 10
    }, this);
}
_c13 = LegacyBudgetPage;
function LegacyInvestmentsPage({ transactions, currency }) {
    const investmentRows = transactions.filter((item)=>item.currency === currency && item.type === "investment");
    const holdings = [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Long-term picture",
                title: "Investments",
                description: "A thoughtful overview of what has been imported, without guessing at market values."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 277,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Imported investment activity",
                        value: String(investmentRows.length),
                        detail: "Transactions explicitly identified as investments",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 277,
                        columnNumber: 217
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Portfolio value",
                        value: "Not available",
                        detail: "No holdings or live market prices imported",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2d$business$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseBusiness$3e$__["BriefcaseBusiness"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 277,
                        columnNumber: 384
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Investment return",
                        value: "Not calculated",
                        detail: "Purchase lots and current valuations are needed",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 277,
                        columnNumber: 522
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 277,
                columnNumber: 174
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 rounded-2xl border border-line bg-white p-6 shadow-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-ink",
                        children: "Your holdings"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 277,
                        columnNumber: 747
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Holdings model is ready; there is no holdings CSV importer yet."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 277,
                        columnNumber: 804
                    }, this),
                    holdings.length ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "Investment holdings need a dedicated CSV with ticker, quantity, purchase price, and purchase date. We won’t infer a portfolio value from transaction history."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 277,
                            columnNumber: 962
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 277,
                        columnNumber: 940
                    }, this),
                    investmentRows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 border-t border-slate-100 pt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-sm font-medium text-ink",
                                children: "Identified investment activity"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 277,
                                columnNumber: 1231
                            }, this),
                            investmentRows.slice(0, 8).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                                    currency: currency,
                                    item: item
                                }, item.id, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 277,
                                    columnNumber: 1356
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 277,
                        columnNumber: 1178
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 277,
                columnNumber: 669
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 277,
        columnNumber: 10
    }, this);
}
_c14 = LegacyInvestmentsPage;
function LegacyForecastPage({ transactions, currency }) {
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const months = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlySummaries"])(transactions.filter((item)=>item.currency === currency), currency, latestMonth).filter((item)=>item.income || item.expenses);
    const lastThree = months.slice(-3);
    const average = lastThree.length ? lastThree.reduce((sum, item)=>sum + item.cashFlow, 0) / lastThree.length : 0;
    const consistency = lastThree.length >= 3 && lastThree.every((item)=>item.cashFlow >= 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "A simple look ahead",
                title: "Financial forecast",
                description: "A transparent estimate from your latest activity, not a promise or a bank forecast."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 286,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Average monthly net flow",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(average, currency),
                        detail: `Based on ${lastThree.length} latest month${lastThree.length === 1 ? "" : "s"}`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                        tone: average >= 0 ? "green" : "red"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 286,
                        columnNumber: 226
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Next 3 months · estimate",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(average * 3, currency),
                        detail: "Assumes recent monthly net flow continues",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 286,
                        columnNumber: 458
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Recorded balance",
                        value: "Not available",
                        detail: "A forecast cannot establish available cash",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 286,
                        columnNumber: 620
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 286,
                columnNumber: 183
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-5 rounded-2xl border border-line bg-white p-6 shadow-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-ink",
                        children: "Recent net flow and simple estimate"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 286,
                        columnNumber: 836
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Recorded values are historical; dotted values are a straight-line estimate."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 286,
                        columnNumber: 915
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 h-[290px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                            width: "100%",
                            height: "100%",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$ComposedChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ComposedChart"], {
                                data: [
                                    ...lastThree.map((item)=>({
                                            month: item.month,
                                            net: item.cashFlow
                                        })),
                                    ...Array.from({
                                        length: 3
                                    }, (_, index)=>({
                                            month: `+${index + 1} mo`,
                                            estimate: average
                                        }))
                                ],
                                margin: {
                                    top: 12,
                                    right: 8,
                                    left: -15,
                                    bottom: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        stroke: "#eef1f4",
                                        strokeDasharray: "3 5",
                                        vertical: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 286,
                                        columnNumber: 1362
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                                        dataKey: "month",
                                        axisLine: false,
                                        tickLine: false,
                                        tick: {
                                            fill: "#91a0b2",
                                            fontSize: 11
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 286,
                                        columnNumber: 1435
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                                        axisLine: false,
                                        tickLine: false,
                                        tick: {
                                            fill: "#91a0b2",
                                            fontSize: 10
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 286,
                                        columnNumber: 1535
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                            currency: currency
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 286,
                                            columnNumber: 1637
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 286,
                                        columnNumber: 1619
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                        type: "monotone",
                                        dataKey: "net",
                                        name: "Recorded net flow",
                                        stroke: "#5475ba",
                                        fill: "#e9effb",
                                        strokeWidth: 2,
                                        connectNulls: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 286,
                                        columnNumber: 1677
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Area"], {
                                        type: "monotone",
                                        dataKey: "estimate",
                                        name: "Simple estimate",
                                        stroke: "#d92e3a",
                                        strokeDasharray: "5 5",
                                        fill: "#fbe8e9",
                                        strokeWidth: 2,
                                        connectNulls: true
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 286,
                                        columnNumber: 1801
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 286,
                                columnNumber: 1117
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 286,
                            columnNumber: 1069
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 286,
                        columnNumber: 1037
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 rounded-xl p-4 text-xs leading-5 ${consistency ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`,
                        children: consistency ? "All three latest months show positive net flow. Future results may differ; unexpected expenses and missing records are not included." : "This estimate has limited history or inconsistent monthly results. Treat it as a rough illustration, not a prediction."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 286,
                        columnNumber: 1994
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 286,
                columnNumber: 754
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 286,
        columnNumber: 10
    }, this);
}
_c15 = LegacyForecastPage;
function AccountsPage({ transactions, currency, onCurrency, onImport, onCategoryChange, rules, onSaveRule, onDeleteRule }) {
    _s1();
    const [keyword, setKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Other");
    const [matchOn, setMatchOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("both");
    const accountAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeTransactions"])(transactions, currency);
    const accounts = [
        ...new Set(transactions.filter((item)=>item.currency === currency).map((item)=>item.account))
    ];
    const recent = transactions.filter((item)=>item.currency === currency).sort((a, b)=>b.date.localeCompare(a.date)).slice(0, 20);
    function addRule(event) {
        event.preventDefault();
        const value = keyword.trim();
        if (!value) return;
        onSaveRule({
            id: crypto.randomUUID(),
            keyword: value,
            category,
            matchOn,
            enabled: true
        });
        setKeyword("");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Connected activity",
                title: "My accounts",
                description: "A unified view of imported transactions. Category corrections are saved locally.",
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrencySelect, {
                            currencies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(transactions),
                            value: currency,
                            onChange: onCurrency
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 313,
                            columnNumber: 199
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "inline-flex items-center gap-2 rounded-lg bg-brand px-3.5 py-2.5 text-sm font-semibold text-white",
                            onClick: onImport,
                            type: "button",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 313,
                                    columnNumber: 448
                                }, this),
                                " Import CSV"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 313,
                            columnNumber: 297
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 313,
                    columnNumber: 171
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 313,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Total income",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(accountAnalysis.totalIncome, currency),
                        detail: `${accountAnalysis.monthCount} observed months`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__["ArrowDownLeft"],
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 315,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Net expenses",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(accountAnalysis.totalExpenses, currency),
                        detail: "After recorded refunds; transfers excluded",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"],
                        tone: "red"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 316,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Net cash flow",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(accountAnalysis.netCashFlow, currency),
                        detail: "Calculated from imported transaction activity",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__["ArrowLeftRight"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 317,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Average monthly spending",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(accountAnalysis.averageMonthlySpending, currency),
                        detail: "Observed calendar months",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 318,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 314,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 grid gap-5 lg:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Largest recorded expenses"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 321,
                                columnNumber: 84
                            }, this),
                            accountAnalysis.largestExpenses.length ? accountAnalysis.largestExpenses.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "truncate text-sm font-medium text-ink",
                                                    children: item.merchant || item.description
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 382
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[11px] text-slate-400",
                                                    children: [
                                                        item.date,
                                                        " · ",
                                                        item.category
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 321,
                                                    columnNumber: 474
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 321,
                                            columnNumber: 357
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-ink",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(Math.abs(item.amount), currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 321,
                                            columnNumber: 560
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 321,
                                    columnNumber: 241
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "No eligible expenses recorded."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 321,
                                    columnNumber: 694
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 321,
                                columnNumber: 672
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 321,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Monthly expenditure changes"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 322,
                                columnNumber: 84
                            }, this),
                            accountAnalysis.expenditureChanges.slice(-6).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between border-b border-slate-100 py-3 last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-slate-600",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(item.month)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 322,
                                            columnNumber: 328
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-sm font-semibold ${item.change > 0 ? "text-brand" : "text-emerald-700"}`,
                                            children: [
                                                item.change > 0 ? "+" : "",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.change, currency),
                                                item.changeRate === null ? "" : ` (${Math.round(item.changeRate * 100)}%)`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 322,
                                            columnNumber: 400
                                        }, this)
                                    ]
                                }, item.month, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 322,
                                    columnNumber: 215
                                }, this)),
                            accountAnalysis.expenditureChanges.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "Import more than one month to compare expenditure."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 322,
                                    columnNumber: 726
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 322,
                                columnNumber: 704
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 322,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 320,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-5 xl:grid-cols-[1.4fr_0.8fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-semibold text-ink",
                                        children: "Recent transactions"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 326,
                                        columnNumber: 31
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-500",
                                        children: "Choose a category to correct it; manual categories are protected from automatic rules."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 326,
                                        columnNumber: 94
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 326,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-slate-100",
                                children: recent.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-[1fr_125px] items-center gap-3 py-3 sm:grid-cols-[1fr_150px_110px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "truncate text-sm font-medium text-ink",
                                                        children: item.merchant || item.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 36
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 truncate text-[11px] text-slate-400",
                                                        children: [
                                                            item.date,
                                                            " · ",
                                                            item.account
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 128
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 328,
                                                columnNumber: 11
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                "aria-label": `Category for ${item.merchant || item.description}`,
                                                className: "w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-ink",
                                                onChange: (event)=>onCategoryChange(item, event.target.value),
                                                value: item.category,
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionCategories"].map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: option,
                                                        children: option
                                                    }, option, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 323
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 329,
                                                columnNumber: 11
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `hidden text-right text-xs font-semibold sm:block ${item.type === "income" || item.type === "refund" ? "text-emerald-700" : "text-ink"}`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.amount, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 330,
                                                columnNumber: 11
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 327,
                                        columnNumber: 74
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 327,
                                columnNumber: 9
                            }, this),
                            recent.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "No transactions in this currency."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 332,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 325,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Custom classification rules"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 335,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-5 text-slate-500",
                                children: "Enabled rules categorize matching merchants or descriptions. Manual corrections always take precedence."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 336,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "mt-4 space-y-3",
                                onSubmit: addRule,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        "aria-label": "Rule keyword",
                                        className: "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand",
                                        onChange: (event)=>setKeyword(event.target.value),
                                        placeholder: "Keyword, e.g. local café",
                                        value: keyword
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 338,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                "aria-label": "Rule category",
                                                className: "min-w-0 rounded-lg border border-slate-200 px-2 py-2 text-xs",
                                                onChange: (event)=>setCategory(event.target.value),
                                                value: category,
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionCategories"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: item
                                                    }, item, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 252
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 340,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                "aria-label": "Rule match field",
                                                className: "min-w-0 rounded-lg border border-slate-200 px-2 py-2 text-xs",
                                                onChange: (event)=>setMatchOn(event.target.value),
                                                value: matchOn,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "both",
                                                        children: "Merchant + description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 220
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "merchant",
                                                        children: "Merchant"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 272
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "description",
                                                        children: "Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 314
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 341,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 339,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full rounded-lg bg-ink px-3 py-2.5 text-xs font-semibold text-white hover:bg-slate-700",
                                        type: "submit",
                                        children: "Add classification rule"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 343,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 337,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 divide-y divide-slate-100",
                                children: rules.map((rule)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 py-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex min-w-0 flex-1 items-center gap-2 text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        checked: rule.enabled,
                                                        onChange: ()=>onSaveRule({
                                                                ...rule,
                                                                enabled: !rule.enabled
                                                            }),
                                                        type: "checkbox"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 204
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: rule.keyword
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/financial-app.tsx",
                                                                lineNumber: 345,
                                                                columnNumber: 344
                                                            }, this),
                                                            " → ",
                                                            rule.category
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 345,
                                                        columnNumber: 317
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 345,
                                                columnNumber: 138
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                "aria-label": `Delete ${rule.keyword} rule`,
                                                className: "text-xs text-slate-400 hover:text-brand",
                                                onClick: ()=>onDeleteRule(rule.id),
                                                type: "button",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    size: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 563
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 345,
                                                columnNumber: 408
                                            }, this)
                                        ]
                                    }, rule.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 345,
                                        columnNumber: 78
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 345,
                                columnNumber: 9
                            }, this),
                            rules.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xs text-slate-400",
                                children: "No custom rules yet."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 346,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 334,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 324,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-5 md:grid-cols-2",
                children: accounts.map((account)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-brand",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 350,
                                            columnNumber: 256
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 350,
                                        columnNumber: 162
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: account
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 350,
                                                columnNumber: 288
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: [
                                                    transactions.filter((item)=>item.account === account && item.currency === currency).length,
                                                    " transactions · ",
                                                    currency
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 350,
                                                columnNumber: 341
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 350,
                                        columnNumber: 283
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 350,
                                columnNumber: 121
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-[11px] leading-5 text-slate-400",
                                children: "Activity only; not a current or confirmed account balance."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 350,
                                columnNumber: 515
                            }, this)
                        ]
                    }, account, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 350,
                        columnNumber: 34
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 349,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 312,
        columnNumber: 10
    }, this);
}
_s1(AccountsPage, "9V+fyFzNIr6zROtIGL0s/YgteXw=");
_c16 = AccountsPage;
function SavingsPage({ transactions, currency, target, onSaveTarget }) {
    _s2();
    const plan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSavingsPlan"])(transactions, currency, target);
    const opportunities = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSavingsOpportunities"])(transactions, currency);
    const recurring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeTransactions"])(transactions, currency).recurringPayments;
    const [targetValue, setTargetValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(target?.currency === currency ? target.monthlyAmount : plan.targetMonthlySavings || ""));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Small changes, real momentum",
                title: "Smart savings",
                description: "Evidence-based opportunities from your history. Estimates use explicit assumptions and are not guarantees."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 361,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-brand/10 bg-gradient-to-br from-rose-50 to-white p-6 md:col-span-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold uppercase tracking-widest text-brand",
                                children: "Personal savings plan"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 363,
                                columnNumber: 117
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 grid gap-4 sm:grid-cols-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: "Monthly income"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 363,
                                                columnNumber: 265
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg font-semibold text-ink",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(plan.monthlyIncome, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 363,
                                                columnNumber: 321
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 363,
                                        columnNumber: 260
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: "Current monthly savings"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 363,
                                                columnNumber: 430
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg font-semibold text-ink",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(plan.currentMonthlySavings, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 363,
                                                columnNumber: 495
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 363,
                                        columnNumber: 425
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: "Potential from listed actions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 363,
                                                columnNumber: 612
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg font-semibold text-emerald-700",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(plan.estimatedOpportunity, currency),
                                                    " / mo"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 363,
                                                columnNumber: 683
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 363,
                                        columnNumber: 607
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 363,
                                columnNumber: 212
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "mt-5 flex flex-wrap items-end gap-2",
                                onSubmit: (event)=>{
                                    event.preventDefault();
                                    onSaveTarget({
                                        currency,
                                        monthlyAmount: Math.max(0, Number(targetValue) || 0)
                                    });
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-medium text-slate-600",
                                        children: [
                                            "Monthly savings target",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                "aria-label": "Monthly savings target",
                                                className: "mt-1 block w-44 rounded-lg border border-slate-200 px-3 py-2 text-sm",
                                                min: "0",
                                                onChange: (event)=>setTargetValue(event.target.value),
                                                type: "number",
                                                value: targetValue
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 363,
                                                columnNumber: 1072
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 363,
                                        columnNumber: 996
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white",
                                        type: "submit",
                                        children: "Save target"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 363,
                                        columnNumber: 1305
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(plan.targetGap, currency),
                                            " gap to target"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 363,
                                        columnNumber: 1424
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 363,
                                columnNumber: 813
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 363,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-line bg-white p-6 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium text-slate-500",
                                children: "Recurring patterns detected"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 364,
                                columnNumber: 80
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-3xl font-semibold text-ink",
                                children: recurring.length
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 364,
                                columnNumber: 161
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-5 text-slate-400",
                                children: "At least three similar dated transactions; confirm before acting."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 364,
                                columnNumber: 235
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 364,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 362,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-5 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-ink",
                        children: "Savings opportunities"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 366,
                        columnNumber: 94
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Estimated monthly amounts are illustrative, not promised savings."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 366,
                        columnNumber: 159
                    }, this),
                    opportunities.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 divide-y divide-slate-100",
                        children: opportunities.slice(0, 3).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "py-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-start justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "max-w-3xl",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-sm font-semibold text-ink",
                                                    children: item.title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 253
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs leading-5 text-slate-500",
                                                    children: item.explanation
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 317
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-[11px] leading-5 text-slate-400",
                                                    children: [
                                                        "Assumption: ",
                                                        item.assumption
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 392
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[10px] text-slate-400",
                                                    children: [
                                                        "Confidence: ",
                                                        Math.round(item.confidence * 100),
                                                        "% · ",
                                                        item.transactionIds.length,
                                                        " supporting transaction(s)"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 482
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 367,
                                            columnNumber: 226
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "whitespace-nowrap rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700",
                                            children: [
                                                "~",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.monthlySavings, currency),
                                                " / mo"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 367,
                                            columnNumber: 644
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 367,
                                    columnNumber: 160
                                }, this)
                            }, item.id, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 367,
                                columnNumber: 120
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 367,
                        columnNumber: 31
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "No specific savings opportunities meet the current evidence thresholds. Import more history or review your budget."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 367,
                            columnNumber: 860
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 367,
                        columnNumber: 838
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 366,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-5 rounded-2xl border border-line bg-white p-5 shadow-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-ink",
                        children: "Recurring payments"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 369,
                        columnNumber: 87
                    }, this),
                    recurring.length ? recurring.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-medium text-ink",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 369,
                                            columnNumber: 315
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-slate-400",
                                            children: [
                                                item.occurrenceCount,
                                                " matches · ",
                                                item.cadence,
                                                " pattern · ",
                                                Math.round(item.confidence * 100),
                                                "% confidence"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 369,
                                            columnNumber: 374
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 369,
                                    columnNumber: 310
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-ink",
                                    children: [
                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.monthlyAmount, currency),
                                        " / mo"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 369,
                                    columnNumber: 532
                                }, this)
                            ]
                        }, item.key, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 369,
                            columnNumber: 193
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "No recurring payment pattern is supported by at least three transactions."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 369,
                            columnNumber: 662
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 369,
                        columnNumber: 640
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 369,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 360,
        columnNumber: 10
    }, this);
}
_s2(SavingsPage, "qgUhrDbR81On7Dybu76grAzMiHU=");
_c17 = SavingsPage;
function BudgetPage({ transactions, currency, budgets, onSaveBudget, target, onSaveTarget }) {
    _s3();
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suggestBudgetLimits"])(transactions, currency);
    const suggestedTotal = suggestions.reduce((sum, item)=>sum + item.monthlyLimit, 0);
    const categories = [
        ...new Set([
            ...suggestions.map((item)=>item.category),
            ...budgets.filter((item)=>item.id.startsWith(`${currency}:`)).map((item)=>item.category)
        ])
    ];
    const [targetValue, setTargetValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(String(target?.currency === currency ? target.monthlyAmount : ""));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Plan with intention",
                title: "Budget planner",
                description: `Suggested limits use recent history. Actual spending reflects ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(latestMonth)}.`
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 380,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-xl text-xs leading-5 text-blue-800",
                                children: "Suggested limits are 110% of average observed spending over the latest three available months. Edit any limit; budgets are personal targets, not financial advice."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 382,
                                columnNumber: 74
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] font-medium text-blue-700",
                                                children: "Suggested monthly total"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 382,
                                                columnNumber: 342
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-blue-950",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(suggestedTotal, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 382,
                                                columnNumber: 422
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 382,
                                        columnNumber: 337
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50",
                                        disabled: !suggestions.length,
                                        onClick: ()=>suggestions.forEach((item)=>onSaveBudget({
                                                    id: `${currency}:${item.category}`,
                                                    category: item.category,
                                                    monthlyLimit: item.monthlyLimit,
                                                    actualSpending: item.actualSpending
                                                })),
                                        type: "button",
                                        children: "Apply suggested limits"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 382,
                                        columnNumber: 522
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 382,
                                columnNumber: 296
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 382,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "flex items-end gap-2",
                        onSubmit: (event)=>{
                            event.preventDefault();
                            onSaveTarget({
                                currency,
                                monthlyAmount: Math.max(0, Number(targetValue) || 0)
                            });
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-[11px] font-medium text-blue-900",
                                children: [
                                    "Monthly savings goal",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        "aria-label": "Monthly savings goal",
                                        className: "mt-1 block w-36 rounded-lg border border-blue-200 bg-white px-2.5 py-2 text-sm",
                                        min: "0",
                                        onChange: (event)=>setTargetValue(event.target.value),
                                        placeholder: "Optional",
                                        type: "number",
                                        value: targetValue
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 383,
                                        columnNumber: 252
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 383,
                                columnNumber: 175
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "rounded-lg bg-ink px-3 py-2.5 text-xs font-semibold text-white",
                                type: "submit",
                                children: "Save goal"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 383,
                                columnNumber: 516
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 383,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 381,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-[1fr_90px_110px] gap-2 border-b border-slate-100 pb-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:grid-cols-[1fr_130px_150px_150px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Category"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 385,
                                columnNumber: 277
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "Actual"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 385,
                                columnNumber: 298
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "Limit"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 385,
                                columnNumber: 340
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:block",
                                children: "Budget status"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 385,
                                columnNumber: 381
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 385,
                        columnNumber: 89
                    }, this),
                    categories.length ? categories.map((name)=>{
                        const suggestion = suggestions.find((item)=>item.category === name);
                        const id = `${currency}:${name}`;
                        const budget = budgets.find((item)=>item.id === id);
                        const actual = transactions.filter((item)=>item.currency === currency && item.type === "expense" && item.category === name && item.date.startsWith(latestMonth)).reduce((sum, item)=>sum + Math.abs(item.amount), 0);
                        const limit = budget?.monthlyLimit ?? 0;
                        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateBudget"])(limit, actual);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-slate-100 py-4 last:border-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[1fr_90px_110px] items-center gap-2 sm:grid-cols-[1fr_130px_150px_150px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "truncate text-sm font-semibold text-ink",
                                                    children: name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 219
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[10px] text-slate-400",
                                                    children: suggestion ? `Suggested ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(suggestion.monthlyLimit, currency)} · ${suggestion.monthsUsed} month(s)` : "No history-based suggestion"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 284
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 393,
                                            columnNumber: 194
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right text-xs text-slate-600",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(actual, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 393,
                                            columnNumber: 485
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            "aria-label": `${name} monthly budget`,
                                            className: "w-full rounded-lg border border-slate-200 px-2 py-2 text-xs text-ink outline-none focus:border-brand",
                                            min: "0",
                                            onChange: (event)=>onSaveBudget({
                                                    id,
                                                    category: name,
                                                    monthlyLimit: Math.max(0, Number(event.target.value) || 0),
                                                    actualSpending: actual
                                                }),
                                            placeholder: suggestion?.monthlyLimit ? String(suggestion.monthlyLimit) : "Set limit",
                                            type: "number",
                                            value: budget?.monthlyLimit || ""
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 393,
                                            columnNumber: 575
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden sm:block",
                                            children: limit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1.5 overflow-hidden rounded-full bg-slate-100",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `h-full ${result.isOverBudget ? "bg-brand" : "bg-emerald-500"}`,
                                                    style: {
                                                        width: `${Math.min(100, result.progressPercent ?? 0)}%`
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 1134
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 393,
                                                columnNumber: 1069
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 393,
                                            columnNumber: 1022
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 393,
                                    columnNumber: 89
                                }, this),
                                limit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `mt-2 text-[11px] ${result.isOverBudget ? "text-brand" : "text-emerald-700"}`,
                                    children: result.isOverBudget ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(result.overspent, currency)} over budget` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(result.remaining, currency)} remaining`
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 394,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, name, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 393,
                            columnNumber: 16
                        }, this);
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "Import more expenses to receive historical budget suggestions."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 396,
                            columnNumber: 34
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 396,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 385,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 379,
        columnNumber: 10
    }, this);
}
_s3(BudgetPage, "f+v7dXjthf8S7j+wEGRr98SefVA=");
_c18 = BudgetPage;
function InvestmentsPage({ transactions, currency, investments, onSaveInvestment, onRemoveInvestment }) {
    _s4();
    const [ticker, setTicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [purchasePrice, setPurchasePrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [currentPrice, setCurrentPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [purchaseDate, setPurchaseDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePortfolio"])(investments, currency);
    const investmentRows = transactions.filter((item)=>item.currency === currency && item.type === "investment");
    function addHolding(event) {
        event.preventDefault();
        if (!ticker.trim() || !name.trim() || !purchaseDate) return;
        onSaveInvestment({
            id: crypto.randomUUID(),
            ticker: ticker.trim().toUpperCase(),
            name: name.trim(),
            quantity: Number(quantity),
            purchasePrice: Number(purchasePrice),
            currentPrice: Number(currentPrice),
            currency,
            purchaseDate,
            priceSource: "manual"
        });
        setTicker("");
        setName("");
        setQuantity("");
        setPurchasePrice("");
        setCurrentPrice("");
        setPurchaseDate("");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Long-term picture",
                title: "Investments",
                description: "Track holdings, browse market quotes, and compare historical risk scenarios. No return is guaranteed."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 417,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Total invested",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(portfolio.totalInvested, currency),
                        detail: "Quantity × entered purchase price",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2d$business$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseBusiness$3e$__["BriefcaseBusiness"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 418,
                        columnNumber: 48
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Current portfolio value",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(portfolio.currentValue, currency),
                        detail: "Quantity × manually entered current price",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 418,
                        columnNumber: 209
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Unrealised profit / loss",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(portfolio.unrealizedProfitLoss, currency),
                        detail: `${portfolio.returnPercent.toFixed(2)}% return on entered cost`,
                        icon: portfolio.unrealizedProfitLoss >= 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"],
                        tone: portfolio.unrealizedProfitLoss >= 0 ? "green" : "red"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 418,
                        columnNumber: 375
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 418,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Holdings and allocation"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 420,
                                columnNumber: 84
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: [
                                    "Allocation is calculated only within ",
                                    currency,
                                    "; different currencies are never converted."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 420,
                                columnNumber: 151
                            }, this),
                            portfolio.allocation.map((holding)=>{
                                const source = investments.find((item)=>item.id === holding.id);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[1fr_90px_90px_28px] items-center gap-2 border-b border-slate-100 py-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "truncate text-sm font-semibold text-ink",
                                                    children: [
                                                        holding.name,
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-400",
                                                            children: holding.ticker
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/financial-app.tsx",
                                                            lineNumber: 421,
                                                            columnNumber: 339
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 269
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[10px] text-slate-400",
                                                    children: [
                                                        source.quantity,
                                                        " units · ",
                                                        holding.sharePercent.toFixed(1),
                                                        "% allocation · MANUAL PRICE"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 421,
                                                    columnNumber: 407
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 421,
                                            columnNumber: 244
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right text-xs text-slate-600",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(holding.value, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 421,
                                            columnNumber: 550
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            "aria-label": `Update current price for ${holding.ticker}`,
                                            className: "w-full rounded-lg border border-slate-200 px-2 py-2 text-xs",
                                            min: "0",
                                            onBlur: (event)=>{
                                                const value = Number(event.target.value);
                                                if (Number.isFinite(value) && value >= 0 && value !== source.currentPrice) onSaveInvestment({
                                                    ...source,
                                                    currentPrice: value,
                                                    priceSource: "manual"
                                                });
                                            },
                                            type: "number",
                                            defaultValue: source.currentPrice
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 421,
                                            columnNumber: 647
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "aria-label": `Remove ${holding.ticker}`,
                                            className: "text-slate-400 hover:text-brand",
                                            onClick: ()=>onRemoveInvestment(holding.id),
                                            type: "button",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                size: 15
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 421,
                                                columnNumber: 1211
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 421,
                                            columnNumber: 1058
                                        }, this)
                                    ]
                                }, holding.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 421,
                                    columnNumber: 124
                                }, this);
                            }),
                            !portfolio.allocation.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "Add a stock or ETF holding to calculate manually priced portfolio value and asset allocation."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 422,
                                    columnNumber: 64
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 422,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-[10px] text-slate-400",
                                children: "Current prices are user-entered estimates, not live data or investment advice."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 423,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 420,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Add a holding"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 425,
                                columnNumber: 84
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "mt-4 grid grid-cols-2 gap-3",
                                onSubmit: addHolding,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] text-slate-500",
                                        children: [
                                            "Ticker",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink",
                                                onChange: (event)=>setTicker(event.target.value),
                                                required: true,
                                                value: ticker
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 426,
                                                columnNumber: 61
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 426,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] text-slate-500",
                                        children: [
                                            "Name",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink",
                                                onChange: (event)=>setName(event.target.value),
                                                required: true,
                                                value: name
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 427,
                                                columnNumber: 59
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 427,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] text-slate-500",
                                        children: [
                                            "Quantity",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink",
                                                min: "0.000001",
                                                onChange: (event)=>setQuantity(event.target.value),
                                                required: true,
                                                step: "any",
                                                type: "number",
                                                value: quantity
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 428,
                                                columnNumber: 63
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 428,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] text-slate-500",
                                        children: [
                                            "Purchase price (",
                                            currency,
                                            ")",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink",
                                                min: "0",
                                                onChange: (event)=>setPurchasePrice(event.target.value),
                                                required: true,
                                                step: "any",
                                                type: "number",
                                                value: purchasePrice
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 429,
                                                columnNumber: 82
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 429,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] text-slate-500",
                                        children: [
                                            "Current price (",
                                            currency,
                                            ")",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink",
                                                min: "0",
                                                onChange: (event)=>setCurrentPrice(event.target.value),
                                                required: true,
                                                step: "any",
                                                type: "number",
                                                value: currentPrice
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 430,
                                                columnNumber: 81
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 430,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[11px] text-slate-500",
                                        children: [
                                            "Purchase date",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                className: "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink",
                                                onChange: (event)=>setPurchaseDate(event.target.value),
                                                required: true,
                                                type: "date",
                                                value: purchaseDate
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 431,
                                                columnNumber: 68
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 431,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "col-span-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white",
                                        type: "submit",
                                        children: "Add manually priced holding"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 432,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 425,
                                columnNumber: 141
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 425,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 419,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$market$2d$watchlist$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarketWatchlist"], {
                holdings: investments
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 435,
                columnNumber: 5
            }, this),
            investmentRows.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-5 rounded-2xl border border-line bg-white p-5 shadow-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-2 font-semibold text-ink",
                        children: "Imported investment activity"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 436,
                        columnNumber: 117
                    }, this),
                    investmentRows.slice(0, 8).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                            currency: currency,
                            item: item
                        }, item.id, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 436,
                            columnNumber: 236
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 436,
                columnNumber: 35
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 416,
        columnNumber: 10
    }, this);
}
_s4(InvestmentsPage, "DAyNVQd/ZGk+vNd5a5o8GXmf1ds=");
_c19 = InvestmentsPage;
function ForecastPage({ transactions, currency, bills, onSaveBill, onRemoveBill }) {
    _s5();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [dueDate, setDueDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const forecast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forecastCashFlow"])(transactions, bills, currency);
    function addBill(event) {
        event.preventDefault();
        if (!name.trim() || !dueDate || Number(amount) <= 0) return;
        onSaveBill({
            id: crypto.randomUUID(),
            name: name.trim(),
            amount: Number(amount),
            currency,
            dueDate
        });
        setName("");
        setAmount("");
        setDueDate("");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "A simple look ahead",
                title: "Financial forecast",
                description: "Transparent estimated net flow. These are projections, not balances or guaranteed future outcomes."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 452,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2",
                children: forecast.horizons.map((horizon)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-ink",
                                        children: [
                                            "Next ",
                                            horizon.days,
                                            " days · estimate"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 453,
                                        columnNumber: 227
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                        className: "text-brand",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 453,
                                        columnNumber: 312
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 453,
                                columnNumber: 176
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 grid grid-cols-2 gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-500",
                                                children: "Recurring income"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 453,
                                                columnNumber: 417
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-emerald-700",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(horizon.projectedIncome, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 453,
                                                columnNumber: 479
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 453,
                                        columnNumber: 412
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-500",
                                                children: "Projected expenses incl. bills"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 453,
                                                columnNumber: 601
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-ink",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(horizon.projectedExpenses, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 453,
                                                columnNumber: 677
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 453,
                                        columnNumber: 596
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-500",
                                                children: "Known upcoming bills"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 453,
                                                columnNumber: 793
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-ink",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(horizon.knownBills, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 453,
                                                columnNumber: 859
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 453,
                                        columnNumber: 788
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-500",
                                                children: "Projected net flow"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 453,
                                                columnNumber: 968
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `mt-1 text-sm font-semibold ${horizon.projectedNetFlow >= 0 ? "text-emerald-700" : "text-brand"}`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(horizon.projectedNetFlow, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 453,
                                                columnNumber: 1032
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 453,
                                        columnNumber: 963
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 453,
                                columnNumber: 367
                            }, this)
                        ]
                    }, horizon.days, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 453,
                        columnNumber: 84
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 453,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-5 rounded-2xl border border-line bg-white p-5 shadow-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-ink",
                        children: "Forecast assumptions"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 454,
                        columnNumber: 87
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: [
                            "As of ",
                            forecast.asOfDate,
                            " · confidence indicator ",
                            Math.round(forecast.confidence * 100),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 454,
                        columnNumber: 151
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-3 list-disc space-y-2 pl-5 text-xs leading-5 text-slate-600",
                        children: forecast.assumptions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: item
                            }, item, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 454,
                                columnNumber: 402
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 454,
                        columnNumber: 287
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 grid gap-4 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold text-ink",
                                        children: "Recurring income included"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 454,
                                        columnNumber: 488
                                    }, this),
                                    forecast.recurringIncomeFlows.map((flow)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-slate-500",
                                            children: [
                                                flow.name,
                                                ": ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(flow.monthlyAmount, currency),
                                                " / month"
                                            ]
                                        }, flow.key, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 454,
                                            columnNumber: 610
                                        }, this)),
                                    !forecast.recurringIncomeFlows.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-slate-400",
                                        children: "No recurring income pattern detected."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 454,
                                        columnNumber: 780
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 454,
                                columnNumber: 483
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold text-ink",
                                        children: "Recurring expenses included"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 454,
                                        columnNumber: 876
                                    }, this),
                                    forecast.recurringExpenseFlows.map((flow)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-slate-500",
                                            children: [
                                                flow.name,
                                                ": ",
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(flow.monthlyAmount, currency),
                                                " / month"
                                            ]
                                        }, flow.key, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 454,
                                            columnNumber: 1001
                                        }, this)),
                                    !forecast.recurringExpenseFlows.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-slate-400",
                                        children: "No recurring expense pattern detected."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 454,
                                        columnNumber: 1172
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 454,
                                columnNumber: 871
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 454,
                        columnNumber: 435
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 454,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Add a known bill"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 455,
                                columnNumber: 142
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: "Bills inside a horizon are added unless they match an identified recurring expense."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 455,
                                columnNumber: 202
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "mt-4 space-y-3",
                                onSubmit: addBill,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        "aria-label": "Bill name",
                                        className: "w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm",
                                        onChange: (event)=>setName(event.target.value),
                                        placeholder: "Bill name",
                                        required: true,
                                        value: name
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 455,
                                        columnNumber: 384
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                "aria-label": "Bill amount",
                                                className: "min-w-0 rounded-lg border border-slate-200 px-3 py-2.5 text-sm",
                                                min: "0.01",
                                                onChange: (event)=>setAmount(event.target.value),
                                                placeholder: `Amount (${currency})`,
                                                required: true,
                                                step: "any",
                                                type: "number",
                                                value: amount
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 455,
                                                columnNumber: 626
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                "aria-label": "Bill due date",
                                                className: "min-w-0 rounded-lg border border-slate-200 px-2 py-2.5 text-sm",
                                                min: new Date().toISOString().slice(0, 10),
                                                onChange: (event)=>setDueDate(event.target.value),
                                                required: true,
                                                type: "date",
                                                value: dueDate
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 455,
                                                columnNumber: 884
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 455,
                                        columnNumber: 586
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white",
                                        type: "submit",
                                        children: "Add bill"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 455,
                                        columnNumber: 1135
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 455,
                                columnNumber: 332
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 455,
                        columnNumber: 65
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-line bg-white p-5 shadow-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: [
                                    "Upcoming bills · ",
                                    currency
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 455,
                                columnNumber: 1352
                            }, this),
                            bills.filter((bill)=>bill.currency === currency).sort((a, b)=>a.dueDate.localeCompare(b.dueDate)).map((bill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-ink",
                                                    children: bill.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 1661
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-slate-400",
                                                    children: [
                                                        "Due ",
                                                        bill.dueDate
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 1720
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 455,
                                            columnNumber: 1656
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-semibold text-ink",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(bill.amount, currency)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 1832
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    "aria-label": `Remove ${bill.name}`,
                                                    className: "text-slate-400 hover:text-brand",
                                                    onClick: ()=>onRemoveBill(bill.id),
                                                    type: "button",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 2063
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 1924
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 455,
                                            columnNumber: 1791
                                        }, this)
                                    ]
                                }, bill.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 455,
                                    columnNumber: 1540
                                }, this)),
                            !bills.some((bill)=>bill.currency === currency) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "No bills entered yet."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 455,
                                    columnNumber: 2177
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 455,
                                columnNumber: 2155
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 455,
                        columnNumber: 1275
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 455,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 451,
        columnNumber: 10
    }, this);
}
_s5(ForecastPage, "jod8d47KE1wmFZiWFkOc+0i/gEM=");
_c20 = ForecastPage;
function AssistantPage({ transactions, currency }) {
    _s6();
    const month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const latest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["summarizeMonth"])(transactions.filter((item)=>item.currency === currency), month);
    const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && item.date.slice(0, 4) === month.slice(0, 4)))[0];
    const [question, setQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            role: "assistant",
            text: "Hi, I’m your private money assistant. Ask about your spending, savings, or recurring transactions. I only use the data you imported into this browser."
        }
    ]);
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [speechError, setSpeechError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const speechRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    function ask(value) {
        const prompt = value.trim();
        if (!prompt) return;
        const lower = prompt.toLowerCase();
        let response;
        if (/save|saving|spend less|reduce/.test(lower)) {
            response = category ? `${category.name} is your largest spending category in ${month.slice(0, 4)} at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(category.value, currency)}. A 5% reduction would be approximately ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(category.value * 0.05, currency)} over the recorded year; that is an illustration, not a guaranteed saving.` : "Import more transaction history and I can surface a category-level savings opportunity.";
        } else if (/income|earn|salary/.test(lower)) {
            response = `Your recorded income in ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(month)} is ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(latest.income, currency)}. This includes only transactions classified as income; refunds and internal transfers are kept separate.`;
        } else if (/balance|cash/.test(lower)) {
            response = "I can’t confirm your available cash balance from these CSVs. They contain transactions but no verified opening or current balance. Your net cash flow is not the same as a bank balance.";
        } else if (/budget|category|spend/.test(lower) && category) {
            response = `Your largest recorded spending category in ${month.slice(0, 4)} is ${category.name} at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(category.value, currency)}. You can set a personal monthly limit in Budget Planner.`;
        } else {
            response = `For ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["monthLabel"])(month)}, recorded income was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(latest.income, currency)} and eligible spending was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(latest.expenses, currency)}. Transfers are excluded. Ask me about a category, saving, or your balance.`;
        }
        setMessages((current)=>[
                ...current,
                {
                    role: "user",
                    text: prompt
                },
                {
                    role: "assistant",
                    text: response
                }
            ]);
        setQuestion("");
    }
    function startVoice() {
        const speechWindow = window;
        const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
        if (!Recognition) {
            setSpeechError("Voice input is not supported in this browser. You can type your question instead.");
            return;
        }
        setSpeechError("");
        const recognizer = new Recognition();
        recognizer.lang = "en-CH";
        recognizer.interimResults = false;
        recognizer.onresult = (event)=>{
            const transcript = event.results[0]?.[0]?.transcript;
            if (transcript) {
                setQuestion(transcript);
                setListening(false);
            }
        };
        recognizer.onerror = ()=>{
            setListening(false);
            setSpeechError("We couldn’t hear that clearly. Try again or type your question.");
        };
        speechRef.current = recognizer;
        setListening(true);
        recognizer.start();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "A little help, whenever you need it",
                title: "AI assistant",
                description: "Private, local financial answers from your uploaded transaction data."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 520,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-3xl overflow-hidden rounded-2xl border border-line bg-white shadow-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                    size: 19
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 520,
                                    columnNumber: 464
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 520,
                                columnNumber: 374
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-ink",
                                        children: "Luma assistant"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 520,
                                        columnNumber: 493
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-slate-400",
                                        children: "Your data stays on this device · Not financial advice"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 520,
                                        columnNumber: 557
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 520,
                                columnNumber: 488
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-1.5 w-1.5 rounded-full bg-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 520,
                                        columnNumber: 796
                                    }, this),
                                    " Private session"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 520,
                                columnNumber: 662
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 520,
                        columnNumber: 282
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-[440px] min-h-[280px] space-y-4 overflow-y-auto p-5 sm:p-6",
                        children: messages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "rounded-br-md bg-ink text-white" : "rounded-bl-md bg-slate-100 text-ink"}`,
                                    children: message.text
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 520,
                                    columnNumber: 1098
                                }, this)
                            }, index, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 520,
                                columnNumber: 1001
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 520,
                        columnNumber: 885
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-slate-100 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        "aria-label": listening ? "Stop voice input" : "Start voice input",
                                        className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${listening ? "border-brand bg-rose-50 text-brand" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`,
                                        onClick: ()=>{
                                            if (listening) speechRef.current?.stop();
                                            else startVoice();
                                            setListening(false);
                                        },
                                        type: "button",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                            size: 17
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 520,
                                            columnNumber: 1759
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 520,
                                        columnNumber: 1381
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-brand",
                                        onChange: (event)=>setQuestion(event.target.value),
                                        onKeyDown: (event)=>{
                                            if (event.key === "Enter") ask(question);
                                        },
                                        placeholder: listening ? "Listening…" : "Ask about your spending, saving, or budget",
                                        value: question
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 520,
                                        columnNumber: 1785
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-white hover:bg-rose-700",
                                        onClick: ()=>ask(question),
                                        type: "button",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 520,
                                            columnNumber: 2290
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 520,
                                        columnNumber: 2125
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 520,
                                columnNumber: 1353
                            }, this),
                            speechError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-amber-700",
                                children: speechError
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 520,
                                columnNumber: 2339
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 flex flex-wrap gap-2",
                                children: [
                                    "Where could I save?",
                                    "How much did I earn?",
                                    "Can you confirm my balance?"
                                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-full border border-slate-200 px-3 py-1.5 text-[11px] text-slate-500 hover:border-slate-300 hover:text-ink",
                                        onClick: ()=>ask(item),
                                        type: "button",
                                        children: item
                                    }, item, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 520,
                                        columnNumber: 2537
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 520,
                                columnNumber: 2400
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 520,
                        columnNumber: 1306
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 520,
                columnNumber: 179
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 520,
        columnNumber: 10
    }, this);
}
_s6(AssistantPage, "M2D/J0wpHADGSTb9A0a/3XbUD0s=");
_c21 = AssistantPage;
function SettingsModal({ transactions, onClose, onClear, onImport }) {
    _s7();
    const [clearing, setClearing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/35 p-4 backdrop-blur-sm",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl",
            onClick: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold text-ink",
                                    children: "Privacy & data"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 525,
                                    columnNumber: 301
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-slate-500",
                                    children: "Your transaction data lives in this browser."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 525,
                                    columnNumber: 367
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 525,
                            columnNumber: 296
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            "aria-label": "Close settings",
                            className: "rounded-lg p-2 text-slate-400 hover:bg-slate-100",
                            onClick: onClose,
                            type: "button",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 17
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 525,
                                columnNumber: 593
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 525,
                            columnNumber: 464
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 525,
                    columnNumber: 246
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-5 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between rounded-xl bg-slate-50 p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm text-slate-600",
                                    children: "Stored transactions"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 525,
                                    columnNumber: 733
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold text-ink",
                                    children: transactions.length
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 525,
                                    columnNumber: 800
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 525,
                            columnNumber: 655
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-xs leading-5 text-emerald-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                    className: "mt-0.5 shrink-0",
                                    size: 15
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 525,
                                    columnNumber: 1013
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "CSV files are processed in your browser and stored in IndexedDB. This prototype does not connect to a bank or send transaction data to a server."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 525,
                                    columnNumber: 1066
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 525,
                            columnNumber: 883
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-ink hover:bg-slate-50",
                            onClick: onImport,
                            type: "button",
                            children: "Import more CSV files"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 525,
                            columnNumber: 1223
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full rounded-xl border border-red-100 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50",
                            disabled: !transactions.length || clearing,
                            onClick: async ()=>{
                                if (window.confirm("Remove all imported transactions from this browser? This cannot be undone.")) {
                                    setClearing(true);
                                    await onClear();
                                    setClearing(false);
                                }
                            },
                            type: "button",
                            children: clearing ? "Removing…" : "Delete all local data"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 525,
                            columnNumber: 1407
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 525,
                    columnNumber: 623
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 525,
            columnNumber: 128
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 525,
        columnNumber: 10
    }, this);
}
_s7(SettingsModal, "oKwWRXMu3ImEqF+0UoU9UcufOzQ=");
_c22 = SettingsModal;
function ImportModal({ onClose, onImport }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/35 p-3 backdrop-blur-sm sm:p-5",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            "aria-labelledby": "import-dialog-title",
            "aria-modal": "true",
            className: "my-auto w-full max-w-4xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7",
            onClick: (event)=>event.stopPropagation(),
            role: "dialog",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-5 flex items-start justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-bold uppercase tracking-widest text-brand",
                                    children: "Private import"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 534,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-1 text-xl font-semibold text-ink",
                                    id: "import-dialog-title",
                                    children: "Add transactions"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 535,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-slate-500",
                                    children: "Select the matching columns for each file before import."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 536,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 533,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            "aria-label": "Close import dialog",
                            className: "rounded-lg p-2 text-slate-400 hover:bg-slate-100",
                            onClick: onClose,
                            type: "button",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 538,
                                columnNumber: 145
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 538,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 532,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CsvImporter"], {
                    onClose: onClose,
                    onImport: onImport
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 540,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 531,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 530,
        columnNumber: 5
    }, this);
}
_c23 = ImportModal;
function FinancialApp() {
    _s8();
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [section, setSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("AI Assistant");
    const [currency, setCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("CHF");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [importOpen, setImportOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenu, setMobileMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [budgets, setBudgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [investments, setInvestments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [bills, setBills] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [categoryRules, setCategoryRules] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [savingsTargets, setSavingsTargets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinancialApp.useEffect": ()=>{
            let mounted = true;
            Promise.all([
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTransactions"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readBudgets"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readInvestments"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readBills"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readCategoryRules"])(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readSavingsTargets"])()
            ]).then({
                "FinancialApp.useEffect": ([items, savedBudgets, savedInvestments, savedBills, savedRules, savedTargets])=>{
                    if (mounted) {
                        setTransactions((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyClassificationRules"])(items, savedRules));
                        setBudgets(savedBudgets);
                        setInvestments(savedInvestments);
                        setBills(savedBills);
                        setCategoryRules(savedRules);
                        setSavingsTargets(savedTargets);
                        if (items.length) setCurrency(items.some({
                            "FinancialApp.useEffect": (item)=>item.currency === "CHF"
                        }["FinancialApp.useEffect"]) ? "CHF" : items[0].currency);
                    }
                }
            }["FinancialApp.useEffect"]).catch({
                "FinancialApp.useEffect": (reason)=>setError(reason instanceof Error ? reason.message : "Your local data could not be loaded.")
            }["FinancialApp.useEffect"]).finally({
                "FinancialApp.useEffect": ()=>{
                    if (mounted) setLoading(false);
                }
            }["FinancialApp.useEffect"]);
            return ({
                "FinancialApp.useEffect": ()=>{
                    mounted = false;
                }
            })["FinancialApp.useEffect"];
        }
    }["FinancialApp.useEffect"], []);
    async function handleImport(items) {
        const classified = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyClassificationRules"])(items, categoryRules);
        const existing = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTransactions"])();
        const existingIds = new Set(existing.map((item)=>item.id));
        const unique = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deduplicateTransactions"])([
            ...existing,
            ...classified
        ]).transactions.filter((item)=>!existingIds.has(item.id));
        const added = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addTransactions"])(unique);
        const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTransactions"])();
        setTransactions(saved);
        const currencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(saved);
        if (!currencies.includes(currency) && currencies.length) setCurrency(currencies.includes("CHF") ? "CHF" : currencies[0]);
        setError("");
        return {
            added,
            duplicates: items.length - added
        };
    }
    function showDemo() {
        setTransactions((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$demo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDemoTransactions"])());
        setCurrency("CHF");
        setSection("AI Assistant");
        setError("");
    }
    async function handleClear() {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearTransactions"])();
        setTransactions([]);
        setInvestments([]);
        setBills([]);
        setCategoryRules([]);
        setSavingsTargets([]);
        setSettingsOpen(false);
        setSection("AI Assistant");
        setBudgets([]);
    }
    function importFromSettings() {
        setSettingsOpen(false);
        setImportOpen(true);
    }
    async function saveBudget(budget) {
        try {
            if (budget.monthlyLimit > 0) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBudget"])(budget);
            else await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeBudget"])(budget.id);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The budget could not be saved.");
            return;
        }
        setBudgets((current)=>{
            const next = current.filter((item)=>item.id !== budget.id);
            return budget.monthlyLimit > 0 ? [
                ...next,
                budget
            ] : next;
        });
    }
    async function createBudgets(values) {
        try {
            await Promise.all(values.map((budget)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBudget"])(budget)));
            setBudgets((current)=>[
                    ...current.filter((item)=>!values.some((value)=>value.id === item.id)),
                    ...values
                ]);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The suggested budgets could not be saved.");
            throw reason;
        }
    }
    async function saveInvestment(investment) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeInvestment"])(investment);
            setInvestments((current)=>[
                    ...current.filter((item)=>item.id !== investment.id),
                    investment
                ]);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The holding could not be saved.");
        }
    }
    async function deleteInvestment(id) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeInvestment"])(id);
            setInvestments((current)=>current.filter((item)=>item.id !== id));
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The holding could not be removed.");
        }
    }
    async function saveBill(bill) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeBill"])(bill);
            setBills((current)=>[
                    ...current.filter((item)=>item.id !== bill.id),
                    bill
                ]);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The bill could not be saved.");
        }
    }
    async function deleteBill(id) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeBill"])(id);
            setBills((current)=>current.filter((item)=>item.id !== id));
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The bill could not be removed.");
        }
    }
    async function saveTarget(target) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeSavingsTarget"])(target);
            setSavingsTargets((current)=>[
                    ...current.filter((item)=>item.currency !== target.currency),
                    target
                ]);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The savings target could not be saved.");
        }
    }
    async function saveCategoryRule(rule) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["writeCategoryRule"])(rule);
            const nextRules = [
                ...categoryRules.filter((item)=>item.id !== rule.id),
                rule
            ];
            setCategoryRules(nextRules);
            const updated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyClassificationRules"])(transactions, nextRules);
            await Promise.all(updated.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTransaction"])(item)));
            setTransactions(updated);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The classification rule could not be saved.");
        }
    }
    async function deleteCategoryRule(id) {
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeCategoryRule"])(id);
            const nextRules = categoryRules.filter((item)=>item.id !== id);
            setCategoryRules(nextRules);
            const updated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyClassificationRules"])(transactions, nextRules);
            await Promise.all(updated.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTransaction"])(item)));
            setTransactions(updated);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The classification rule could not be removed.");
        }
    }
    async function changeTransactionCategory(transaction, category) {
        const updated = {
            ...transaction,
            category,
            categorySource: "manual"
        };
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTransaction"])(updated);
            setTransactions((current)=>current.map((item)=>item.id === updated.id ? updated : item));
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The transaction category could not be saved.");
        }
    }
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen items-center justify-center bg-canvas",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3 text-sm text-slate-500",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                    className: "animate-spin text-brand",
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 723,
                    columnNumber: 160
                }, this),
                "Opening your AI assistant…"
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 723,
            columnNumber: 96
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 723,
        columnNumber: 23
    }, this);
    if (!transactions.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Onboarding, {
        error: error,
        onDemo: showDemo,
        onImported: handleImport
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 724,
        columnNumber: 36
    }, this);
    const currencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(transactions);
    const selectedCurrency = currencies.includes(currency) ? currency : currencies[0] ?? "CHF";
    const MainIcon = navigation.find((item)=>item.name === section)?.icon ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"];
    if (section === "AI Assistant") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$financial$2d$agent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FinancialAgent"], {
                    bills: bills,
                    budgets: budgets,
                    currency: selectedCurrency,
                    investments: investments,
                    onCreateBudgets: createBudgets,
                    onOpenImport: ()=>setImportOpen(true),
                    savingsTarget: savingsTargets.find((item)=>item.currency === selectedCurrency),
                    transactions: transactions
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 733,
                    columnNumber: 9
                }, this),
                importOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImportModal, {
                    onClose: ()=>setImportOpen(false),
                    onImport: handleImport
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 734,
                    columnNumber: 24
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 732,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-canvas",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: `fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-line bg-white px-4 py-6 transition-transform duration-200 lg:translate-x-0 ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {}, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 742,
                                columnNumber: 65
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                "aria-label": "Close navigation",
                                className: "rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden",
                                onClick: ()=>setMobileMenu(false),
                                type: "button",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 742,
                                    columnNumber: 233
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 742,
                                columnNumber: 73
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 742,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400",
                        children: "Your workspace"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 743,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mt-3 space-y-1",
                        children: navigation.map(({ name, icon: Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium transition ${section === name ? "bg-rose-50 text-brand" : "text-slate-500 hover:bg-slate-50 hover:text-ink"}`,
                                onClick: ()=>{
                                    setSection(name);
                                    setMobileMenu(false);
                                },
                                type: "button",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 17,
                                        strokeWidth: section === name ? 2.2 : 1.8
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 744,
                                        columnNumber: 384
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: name
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 744,
                                        columnNumber: 445
                                    }, this),
                                    name === "AI Assistant" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto rounded-md bg-violet-50 px-1.5 py-0.5 text-[9px] font-semibold text-violet-600",
                                        children: "NEW"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 744,
                                        columnNumber: 492
                                    }, this)
                                ]
                            }, name, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 744,
                                columnNumber: 83
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 744,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 rounded-2xl bg-[#f7f8fa] p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-8 w-8 items-center justify-center rounded-lg bg-white text-brand shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 746,
                                            columnNumber: 161
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 746,
                                        columnNumber: 62
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs font-semibold text-ink",
                                        children: "Private by design"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 746,
                                        columnNumber: 192
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[10px] leading-4 text-slate-500",
                                        children: "Your financial data stays on this device."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 746,
                                        columnNumber: 264
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 746,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-slate-500 hover:bg-slate-50 hover:text-ink",
                                onClick: ()=>setSettingsOpen(true),
                                type: "button",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                        size: 17
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 747,
                                        columnNumber: 209
                                    }, this),
                                    " Privacy & settings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 747,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 px-3 text-[9px] leading-4 text-slate-400",
                                children: "Independent prototype · Not affiliated with PostFinance"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 748,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 745,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 741,
                columnNumber: 7
            }, this),
            mobileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "Close menu overlay",
                className: "fixed inset-0 z-30 bg-ink/30 lg:hidden",
                onClick: ()=>setMobileMenu(false),
                type: "button"
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 751,
                columnNumber: 22
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:pl-[248px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "sticky top-0 z-20 flex h-[68px] items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur-md sm:px-7 lg:px-9",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        "aria-label": "Open navigation",
                                        className: "rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden",
                                        onClick: ()=>setMobileMenu(true),
                                        type: "button",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                            size: 19
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 755,
                                            columnNumber: 210
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 755,
                                        columnNumber: 52
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden items-center gap-2 text-xs text-slate-400 sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Workspace"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 755,
                                                columnNumber: 311
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "/"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 755,
                                                columnNumber: 333
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-ink",
                                                children: section
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 755,
                                                columnNumber: 347
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 755,
                                        columnNumber: 237
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sm:hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {}, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 755,
                                            columnNumber: 437
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 755,
                                        columnNumber: 410
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 755,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 sm:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700 sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-1.5 w-1.5 rounded-full bg-emerald-500"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 756,
                                                columnNumber: 199
                                            }, this),
                                            " Local & secure"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 756,
                                        columnNumber: 61
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        "aria-label": "Privacy and settings",
                                        className: "rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-50",
                                        onClick: ()=>setSettingsOpen(true),
                                        type: "button",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__["Settings2"], {
                                            size: 17
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 756,
                                            columnNumber: 459
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 756,
                                        columnNumber: 281
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-8 w-8 items-center justify-center rounded-full bg-[#edf0f5] text-xs font-semibold text-slate-600",
                                        children: "JD"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 756,
                                        columnNumber: 491
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 756,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 754,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "mx-auto max-w-[1450px] px-4 py-6 sm:px-7 sm:py-8 lg:px-9",
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-5 flex items-center justify-between rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 759,
                                        columnNumber: 151
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        "aria-label": "Dismiss error",
                                        onClick: ()=>setError(""),
                                        type: "button",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 759,
                                            columnNumber: 249
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 759,
                                        columnNumber: 171
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 759,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fade-up",
                                children: [
                                    section === "Overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dashboard, {
                                        currency: selectedCurrency,
                                        onCurrency: setCurrency,
                                        onImport: ()=>setImportOpen(true),
                                        onNavigate: setSection,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 761,
                                        columnNumber: 40
                                    }, this),
                                    section === "My Accounts" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountsPage, {
                                        currency: selectedCurrency,
                                        onCategoryChange: changeTransactionCategory,
                                        onCurrency: setCurrency,
                                        onDeleteRule: deleteCategoryRule,
                                        onImport: ()=>setImportOpen(true),
                                        onSaveRule: saveCategoryRule,
                                        rules: categoryRules,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 762,
                                        columnNumber: 43
                                    }, this),
                                    section === "Smart Savings" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SavingsPage, {
                                        currency: selectedCurrency,
                                        onSaveTarget: saveTarget,
                                        target: savingsTargets.find((item)=>item.currency === selectedCurrency),
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 763,
                                        columnNumber: 45
                                    }, this),
                                    section === "Budget Planner" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BudgetPage, {
                                        budgets: budgets,
                                        currency: selectedCurrency,
                                        onSaveBudget: saveBudget,
                                        onSaveTarget: saveTarget,
                                        target: savingsTargets.find((item)=>item.currency === selectedCurrency),
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 764,
                                        columnNumber: 46
                                    }, this),
                                    section === "Investments" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InvestmentsPage, {
                                        currency: selectedCurrency,
                                        investments: investments,
                                        onRemoveInvestment: deleteInvestment,
                                        onSaveInvestment: saveInvestment,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 765,
                                        columnNumber: 43
                                    }, this),
                                    section === "Financial Forecast" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ForecastPage, {
                                        bills: bills,
                                        currency: selectedCurrency,
                                        onRemoveBill: deleteBill,
                                        onSaveBill: saveBill,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 766,
                                        columnNumber: 50
                                    }, this)
                                ]
                            }, section, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 760,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                className: "mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-4 text-[10px] leading-4 text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Informational tool only · Not financial advice"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 768,
                                        columnNumber: 158
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Prototype independent from PostFinance · Calculations use imported records only"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 768,
                                        columnNumber: 217
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 768,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 758,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 753,
                columnNumber: 7
            }, this),
            importOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImportModal, {
                onClose: ()=>setImportOpen(false),
                onImport: handleImport
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 772,
                columnNumber: 22
            }, this),
            settingsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsModal, {
                onClear: handleClear,
                onClose: ()=>setSettingsOpen(false),
                onImport: importFromSettings,
                transactions: transactions
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 773,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 740,
        columnNumber: 5
    }, this);
}
_s8(FinancialApp, "E6xybI5GBP1J3bKLz4yjj/2Cj6I=");
_c24 = FinancialApp;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23, _c24;
__turbopack_context__.k.register(_c, "Logo");
__turbopack_context__.k.register(_c1, "CurrencySelect");
__turbopack_context__.k.register(_c2, "SummaryCard");
__turbopack_context__.k.register(_c3, "SectionTitle");
__turbopack_context__.k.register(_c4, "Onboarding");
__turbopack_context__.k.register(_c5, "ChartTooltip");
__turbopack_context__.k.register(_c6, "Insights");
__turbopack_context__.k.register(_c7, "Dashboard");
__turbopack_context__.k.register(_c8, "TransactionRow");
__turbopack_context__.k.register(_c9, "InsightCard");
__turbopack_context__.k.register(_c10, "EmptyState");
__turbopack_context__.k.register(_c11, "LegacyAccountsPage");
__turbopack_context__.k.register(_c12, "LegacySavingsPage");
__turbopack_context__.k.register(_c13, "LegacyBudgetPage");
__turbopack_context__.k.register(_c14, "LegacyInvestmentsPage");
__turbopack_context__.k.register(_c15, "LegacyForecastPage");
__turbopack_context__.k.register(_c16, "AccountsPage");
__turbopack_context__.k.register(_c17, "SavingsPage");
__turbopack_context__.k.register(_c18, "BudgetPage");
__turbopack_context__.k.register(_c19, "InvestmentsPage");
__turbopack_context__.k.register(_c20, "ForecastPage");
__turbopack_context__.k.register(_c21, "AssistantPage");
__turbopack_context__.k.register(_c22, "SettingsModal");
__turbopack_context__.k.register(_c23, "ImportModal");
__turbopack_context__.k.register(_c24, "FinancialApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/market-watchlist.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MarketWatchlist",
    ()=>MarketWatchlist
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$market$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/market-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function formatPrice(quote) {
    return new Intl.NumberFormat("en-CH", {
        style: "currency",
        currency: quote.currency,
        maximumFractionDigits: quote.assetType === "crypto" ? 6 : 2
    }).format(quote.price);
}
function formatScenario(value) {
    return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}
function scenarioFor(quote, observations) {
    return quote.historicalScenarios.find((scenario)=>scenario.horizonObservations === observations);
}
function MarketWatchlist({ holdings }) {
    _s();
    const [customSymbols, setCustomSymbols] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [quotes, setQuotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchError, setSearchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const symbolKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MarketWatchlist.useMemo[symbolKey]": ()=>[
                ...new Set([
                    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$market$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featuredMarketSymbols"].map({
                        "MarketWatchlist.useMemo[symbolKey]": (item)=>item.symbol
                    }["MarketWatchlist.useMemo[symbolKey]"]),
                    ...holdings.map({
                        "MarketWatchlist.useMemo[symbolKey]": (item)=>item.ticker
                    }["MarketWatchlist.useMemo[symbolKey]"]),
                    ...customSymbols
                ].map({
                    "MarketWatchlist.useMemo[symbolKey]": (symbol)=>symbol.trim().toUpperCase()
                }["MarketWatchlist.useMemo[symbolKey]"]).filter(Boolean))
            ].join(",")
    }["MarketWatchlist.useMemo[symbolKey]"], [
        holdings,
        customSymbols
    ]);
    const refreshQuotes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MarketWatchlist.useCallback[refreshQuotes]": async ()=>{
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`/api/markets?symbols=${encodeURIComponent(symbolKey)}`, {
                    cache: "no-store"
                });
                const payload = await response.json();
                if (!response.ok && !payload.errors?.length) throw new Error(payload.error || "Market data is unavailable.");
                setQuotes(payload.quotes ?? []);
                setErrors(payload.errors ?? []);
            } catch (reason) {
                setError(reason instanceof Error ? reason.message : "Market data is unavailable. Try again later.");
            } finally{
                setLoading(false);
            }
        }
    }["MarketWatchlist.useCallback[refreshQuotes]"], [
        symbolKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MarketWatchlist.useEffect": ()=>{
            void refreshQuotes();
        }
    }["MarketWatchlist.useEffect"], [
        refreshQuotes
    ]);
    async function searchMarkets(event) {
        event.preventDefault();
        const query = searchQuery.trim();
        if (!query || query.length > 80) {
            setSearchError("Enter a company, ticker, or crypto name to search.");
            return;
        }
        setSearching(true);
        setSearchError("");
        setSearchResults([]);
        try {
            const response = await fetch(`/api/markets/search?q=${encodeURIComponent(query)}`, {
                cache: "no-store"
            });
            const payload = await response.json();
            if (!response.ok) throw new Error(payload.error || "Yahoo Finance search is unavailable.");
            setSearchResults(payload.results ?? []);
            if (!payload.results?.length) setSearchError("No matching stock, ETF, or cryptocurrency was found.");
        } catch (reason) {
            setSearchError(reason instanceof Error ? reason.message : "Yahoo Finance search is unavailable.");
        } finally{
            setSearching(false);
        }
    }
    function addSymbol(symbol) {
        const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$market$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeMarketSymbol"])(symbol);
        if (!normalized) {
            setSearchError("Yahoo Finance returned an invalid ticker.");
            return;
        }
        setCustomSymbols((current)=>[
                ...new Set([
                    ...current,
                    normalized
                ])
            ]);
        setSearchResults((current)=>current.filter((result)=>result.symbol !== normalized));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-5 rounded-2xl border border-line bg-white p-5 shadow-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold text-ink",
                                children: "Market watchlist and historical scenarios"
                            }, void 0, false, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-5 text-slate-500",
                                children: "Popular Swiss stocks, major crypto, your holdings, and searchable Yahoo Finance listings."
                            }, void 0, false, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/market-watchlist.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50",
                        disabled: loading,
                        onClick: ()=>void refreshQuotes(),
                        type: "button",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: loading ? "animate-spin" : "",
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            " Refresh quotes"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/market-watchlist.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "mt-4 flex gap-2",
                onSubmit: searchMarkets,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "sr-only",
                        htmlFor: "market-symbol",
                        children: "Search Yahoo Finance listings"
                    }, void 0, false, {
                        fileName: "[project]/components/market-watchlist.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand",
                        id: "market-symbol",
                        maxLength: 80,
                        onChange: (event)=>setSearchQuery(event.target.value),
                        placeholder: "Search any stock, crypto, company, or ticker",
                        value: searchQuery
                    }, void 0, false, {
                        fileName: "[project]/components/market-watchlist.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50",
                        disabled: searching || !searchQuery.trim(),
                        type: "submit",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 131,
                                columnNumber: 219
                            }, this),
                            " ",
                            searching ? "Searching…" : "Search"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/market-watchlist.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            searchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-xs text-amber-700",
                role: "alert",
                children: searchError
            }, void 0, false, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 134,
                columnNumber: 23
            }, this),
            searchResults.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 max-h-56 overflow-y-auto rounded-xl border border-slate-100",
                children: searchResults.map((result)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3 border-b border-slate-100 px-3 py-2 last:border-b-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-xs font-semibold text-ink",
                                        children: result.name
                                    }, void 0, false, {
                                        fileName: "[project]/components/market-watchlist.tsx",
                                        lineNumber: 137,
                                        columnNumber: 36
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-slate-400",
                                        children: [
                                            result.symbol,
                                            " · ",
                                            result.exchange,
                                            " · ",
                                            result.assetType
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/market-watchlist.tsx",
                                        lineNumber: 137,
                                        columnNumber: 108
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "shrink-0 rounded-md border border-slate-200 px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-50",
                                onClick: ()=>addSymbol(result.symbol),
                                type: "button",
                                children: "Add"
                            }, void 0, false, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, result.symbol, true, {
                        fileName: "[project]/components/market-watchlist.tsx",
                        lineNumber: 136,
                        columnNumber: 40
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 135,
                columnNumber: 36
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-xs text-amber-700",
                role: "alert",
                children: error
            }, void 0, false, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 142,
                columnNumber: 17
            }, this),
            errors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-xs text-amber-700",
                role: "status",
                children: errors.map((item)=>`${item.symbol}: ${item.message}`).join(" ")
            }, void 0, false, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 143,
                columnNumber: 29
            }, this),
            quotes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3",
                children: quotes.map((quote)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "rounded-xl border border-slate-100 bg-slate-50/60 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-sm font-semibold text-ink",
                                                children: quote.name
                                            }, void 0, false, {
                                                fileName: "[project]/components/market-watchlist.tsx",
                                                lineNumber: 151,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-0.5 text-[10px] font-medium text-slate-400",
                                                children: [
                                                    quote.symbol,
                                                    " · ",
                                                    quote.assetType === "crypto" ? "Crypto" : quote.assetType === "equity" ? "Equity" : "Market asset"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/market-watchlist.tsx",
                                                lineNumber: 152,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/market-watchlist.tsx",
                                        lineNumber: 150,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "shrink-0 text-sm font-semibold text-ink",
                                        children: formatPrice(quote)
                                    }, void 0, false, {
                                        fileName: "[project]/components/market-watchlist.tsx",
                                        lineNumber: 154,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 149,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-[10px] text-slate-400",
                                children: [
                                    "Quote time: ",
                                    new Date(quote.asOf).toLocaleString("en-CH"),
                                    " · ",
                                    quote.observations,
                                    " daily observations"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 156,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 border-t border-slate-200 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500",
                                        children: "Past rolling returns · 5th / median / 95th percentile"
                                    }, void 0, false, {
                                        fileName: "[project]/components/market-watchlist.tsx",
                                        lineNumber: 158,
                                        columnNumber: 19
                                    }, this),
                                    [
                                        30,
                                        90
                                    ].map((horizon)=>{
                                        const scenario = scenarioFor(quote, horizon);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "flex justify-between gap-2 text-[10px] leading-5 text-slate-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        horizon,
                                                        " observations",
                                                        scenario ? ` · ${scenario.sampleCount} periods` : ""
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/market-watchlist.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium",
                                                    children: scenario ? `${formatScenario(scenario.lowPercent)} / ${formatScenario(scenario.medianPercent)} / ${formatScenario(scenario.highPercent)}` : "Not enough history"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/market-watchlist.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, horizon, true, {
                                            fileName: "[project]/components/market-watchlist.tsx",
                                            lineNumber: 161,
                                            columnNumber: 28
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/market-watchlist.tsx",
                                lineNumber: 157,
                                columnNumber: 17
                            }, this)
                        ]
                    }, quote.symbol, true, {
                        fileName: "[project]/components/market-watchlist.tsx",
                        lineNumber: 148,
                        columnNumber: 15
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 146,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "py-8 text-center text-xs text-slate-500",
                children: loading ? "Loading market quotes…" : "Market quotes will appear here when available."
            }, void 0, false, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 170,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-[10px] leading-4 text-slate-400",
                children: "Yahoo Finance search returns matching listings, not a complete list displayed all at once; search by company or ticker to add more. Data is unofficial and may be delayed or unavailable. Scenario ranges describe historical rolling returns, not price predictions or guaranteed profit. Swissquote’s tested public feed returned FX quotes, not the equity or crypto symbols shown here."
            }, void 0, false, {
                fileName: "[project]/components/market-watchlist.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/market-watchlist.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(MarketWatchlist, "2EbcWUG5TfogQvRcA1NSQocBRsE=");
_c = MarketWatchlist;
var _c;
__turbopack_context__.k.register(_c, "MarketWatchlist");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/assistant-analysis-context.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildAssistantAnalysisContext",
    ()=>buildAssistantAnalysisContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intelligence.ts [app-client] (ecmascript)");
;
function buildAssistantAnalysisContext({ transactions, currency, budgets, investments, bills, savingsTarget, asOf = new Date() }) {
    const selectedTransactions = transactions.filter((item)=>item.currency === currency);
    const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeTransactions"])(selectedTransactions, currency);
    const plan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSavingsPlan"])(selectedTransactions, currency, savingsTarget);
    const month = analysis.periodEnd;
    const latestCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(selectedTransactions.filter((item)=>item.date.startsWith(month) && item.type === "expense")).slice(0, 6);
    const forecast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forecastCashFlow"])(selectedTransactions, bills, currency, asOf);
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePortfolio"])(investments, currency);
    return {
        currency,
        importedTransactionCount: selectedTransactions.length,
        period: {
            start: analysis.periodStart,
            end: analysis.periodEnd,
            monthsAnalyzed: analysis.monthCount
        },
        averages: {
            monthlyIncome: analysis.totalIncome / Math.max(analysis.monthCount, 1),
            monthlyExpenses: analysis.averageMonthlySpending,
            monthlySavings: analysis.monthlySavings,
            savingsRate: analysis.savingsRate
        },
        recentMonthlyTrend: analysis.monthlySummaries.slice(-6).map((item)=>({
                month: item.key,
                income: item.income,
                expenses: item.expenses,
                netCashFlow: item.cashFlow
            })),
        latestMonthCategories: latestCategories.map(({ name, value })=>({
                category: name,
                spending: value
            })),
        recurringPaymentPatterns: analysis.recurringPayments.slice(0, 5).map((item)=>({
                category: item.category,
                monthlyAmount: item.monthlyAmount,
                cadence: item.cadence,
                observations: item.occurrenceCount
            })),
        savingsPlan: {
            monthlyIncome: plan.monthlyIncome,
            currentMonthlySavings: plan.currentMonthlySavings,
            targetMonthlySavings: plan.targetMonthlySavings,
            targetGap: plan.targetGap,
            estimatedOpportunity: plan.estimatedOpportunity,
            actions: plan.actions.map(({ category, monthlySavings, assumption, confidence })=>({
                    category,
                    estimatedMonthlySavings: monthlySavings,
                    assumption,
                    confidence
                }))
        },
        budgetLimits: budgets.filter((item)=>item.id.startsWith(`${currency}:`)).map(({ category, monthlyLimit })=>({
                category,
                monthlyLimit
            })),
        cashFlowForecast: {
            recurringIncomeMonthly: forecast.recurringIncomeMonthly,
            recurringExpensesMonthly: forecast.recurringExpensesMonthly,
            averageVariableExpensesMonthly: forecast.averageVariableExpensesMonthly,
            horizons: forecast.horizons
        },
        portfolio: {
            totalInvested: portfolio.totalInvested,
            currentValue: portfolio.currentValue,
            unrealizedProfitLoss: portfolio.unrealizedProfitLoss,
            returnPercent: portfolio.returnPercent
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/csv.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intelligence.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-client] (ecmascript)");
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
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].parse(text, {
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
            category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classifyTransaction"])({
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
        const validated = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionSchema"].safeParse(candidate);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addTransactions",
    ()=>addTransactions,
    "clearTransactions",
    ()=>clearTransactions,
    "readBills",
    ()=>readBills,
    "readBudgets",
    ()=>readBudgets,
    "readCategoryRules",
    ()=>readCategoryRules,
    "readInvestments",
    ()=>readInvestments,
    "readSavingsTargets",
    ()=>readSavingsTargets,
    "readTransactions",
    ()=>readTransactions,
    "removeBill",
    ()=>removeBill,
    "removeBudget",
    ()=>removeBudget,
    "removeCategoryRule",
    ()=>removeCategoryRule,
    "removeInvestment",
    ()=>removeInvestment,
    "replaceTransactions",
    ()=>replaceTransactions,
    "updateTransaction",
    ()=>updateTransaction,
    "updateTransactions",
    ()=>updateTransactions,
    "writeBill",
    ()=>writeBill,
    "writeBudget",
    ()=>writeBudget,
    "writeCategoryRule",
    ()=>writeCategoryRule,
    "writeInvestment",
    ()=>writeInvestment,
    "writeSavingsTarget",
    ()=>writeSavingsTarget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/idb/build/index.js [app-client] (ecmascript)");
;
let databasePromise;
function getDatabase() {
    if (!databasePromise) {
        databasePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openDB"])("luma-finance", 2, {
            upgrade (database, oldVersion) {
                if (oldVersion < 1) {
                    const transactions = database.createObjectStore("transactions", {
                        keyPath: "id"
                    });
                    transactions.createIndex("by-date", "date");
                    transactions.createIndex("by-currency", "currency");
                }
                if (oldVersion < 2) {
                    database.createObjectStore("budgets", {
                        keyPath: "id"
                    });
                    const investments = database.createObjectStore("investments", {
                        keyPath: "id"
                    });
                    investments.createIndex("by-currency", "currency");
                    const bills = database.createObjectStore("bills", {
                        keyPath: "id"
                    });
                    bills.createIndex("by-currency", "currency");
                    bills.createIndex("by-due-date", "dueDate");
                    database.createObjectStore("categoryRules", {
                        keyPath: "id"
                    });
                    database.createObjectStore("savingsTargets", {
                        keyPath: "currency"
                    });
                }
            }
        });
    }
    return databasePromise;
}
async function readTransactions() {
    const db = await getDatabase();
    return db.getAll("transactions");
}
async function addTransactions(transactions) {
    const db = await getDatabase();
    const tx = db.transaction("transactions", "readwrite");
    let added = 0;
    for (const transaction of transactions){
        if (!await tx.store.get(transaction.id)) {
            await tx.store.add(transaction);
            added += 1;
        }
    }
    await tx.done;
    return added;
}
async function updateTransaction(transaction) {
    const db = await getDatabase();
    await db.put("transactions", transaction);
}
async function updateTransactions(transactions) {
    const db = await getDatabase();
    const tx = db.transaction("transactions", "readwrite");
    for (const transaction of transactions)await tx.store.put(transaction);
    await tx.done;
}
async function replaceTransactions(transactions) {
    const db = await getDatabase();
    const tx = db.transaction("transactions", "readwrite");
    await tx.store.clear();
    for (const transaction of transactions)await tx.store.put(transaction);
    await tx.done;
}
async function readBudgets() {
    const db = await getDatabase();
    return db.getAll("budgets");
}
async function writeBudget(budget) {
    const db = await getDatabase();
    await db.put("budgets", budget);
}
async function removeBudget(id) {
    const db = await getDatabase();
    await db.delete("budgets", id);
}
async function readInvestments() {
    const db = await getDatabase();
    return db.getAll("investments");
}
async function writeInvestment(investment) {
    const db = await getDatabase();
    await db.put("investments", investment);
}
async function removeInvestment(id) {
    const db = await getDatabase();
    await db.delete("investments", id);
}
async function readBills() {
    const db = await getDatabase();
    return db.getAll("bills");
}
async function writeBill(bill) {
    const db = await getDatabase();
    await db.put("bills", bill);
}
async function removeBill(id) {
    const db = await getDatabase();
    await db.delete("bills", id);
}
async function readCategoryRules() {
    const db = await getDatabase();
    return db.getAll("categoryRules");
}
async function writeCategoryRule(rule) {
    const db = await getDatabase();
    await db.put("categoryRules", rule);
}
async function removeCategoryRule(id) {
    const db = await getDatabase();
    await db.delete("categoryRules", id);
}
async function readSavingsTargets() {
    const db = await getDatabase();
    return db.getAll("savingsTargets");
}
async function writeSavingsTarget(target) {
    const db = await getDatabase();
    await db.put("savingsTargets", target);
}
async function clearTransactions() {
    const db = await getDatabase();
    const tx = db.transaction([
        "transactions",
        "budgets",
        "investments",
        "bills",
        "categoryRules",
        "savingsTargets"
    ], "readwrite");
    await Promise.all([
        tx.objectStore("transactions").clear(),
        tx.objectStore("budgets").clear(),
        tx.objectStore("investments").clear(),
        tx.objectStore("bills").clear(),
        tx.objectStore("categoryRules").clear(),
        tx.objectStore("savingsTargets").clear()
    ]);
    await tx.done;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/demo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDemoTransactions",
    ()=>createDemoTransactions
]);
const merchants = [
    [
        "Rent",
        "Housing",
        1850
    ],
    [
        "Coop City",
        "Food",
        86
    ],
    [
        "SBB Mobile",
        "Transport",
        42
    ],
    [
        "Netflix",
        "Subscriptions",
        19.9
    ],
    [
        "Café Miro",
        "Restaurants",
        24
    ],
    [
        "Health insurance",
        "Insurance",
        328
    ],
    [
        "Digitec Galaxus",
        "Shopping",
        129
    ]
];
function createDemoTransactions() {
    const transactions = [];
    const now = new Date();
    for(let month = 0; month < 12; month += 1){
        const date = new Date(now.getFullYear(), now.getMonth() - 12 + month, 1);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const monthTransactions = [
            {
                id: `demo-salary-${monthKey}`,
                date: `${monthKey}-25`,
                description: "Monthly salary · DEMO DATA",
                amount: 7450 + month % 3 * 80,
                originalAmount: 7450 + month % 3 * 80,
                currency: "CHF",
                category: "Income",
                type: "income",
                account: "Demo account",
                merchant: "Demo employer",
                isRecurring: true,
                confidence: 1
            }
        ];
        merchants.forEach(([merchant, category, baseline], index)=>{
            const amount = baseline * (0.82 + (month + index) % 5 * 0.08);
            monthTransactions.push({
                id: `demo-${month}-${index}`,
                date: `${monthKey}-${String(3 + index * 3).padStart(2, "0")}`,
                description: `${merchant} · DEMO DATA`,
                amount: -amount,
                originalAmount: amount,
                currency: "CHF",
                category,
                type: "expense",
                account: "Demo account",
                merchant,
                isRecurring: index === 0 || index === 3 || index === 5,
                confidence: 1
            });
        });
        transactions.push(...monthTransactions);
    }
    return transactions;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/finance.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectRecurring",
    ()=>detectRecurring,
    "formatMoney",
    ()=>formatMoney,
    "monthLabel",
    ()=>monthLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intelligence.ts [app-client] (ecmascript)");
;
;
function detectRecurring(transactions) {
    const currencies = [
        ...new Set(transactions.map((item)=>item.currency))
    ];
    return currencies.flatMap((currency)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectRecurringPayments"])(transactions, currency).map((flow)=>({
                ...flow,
                id: flow.key,
                merchant: flow.name,
                description: flow.name,
                isRecurring: true,
                averageAmount: flow.averageAmount
            }))).slice(0, 4);
}
function formatMoney(value, currency, compact = false) {
    return new Intl.NumberFormat("en-CH", {
        style: "currency",
        currency,
        notation: compact ? "compact" : "standard",
        maximumFractionDigits: compact ? 1 : 0
    }).format(value);
}
function monthLabel(key) {
    if (!key) return "your latest month";
    const [year, month] = key.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/financial-agent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "executeFinancialTool",
    ()=>executeFinancialTool,
    "financialToolNames",
    ()=>financialToolNames,
    "selectFinancialTool",
    ()=>selectFinancialTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/financial-tools.ts [app-client] (ecmascript)");
;
const financialToolNames = [
    "get_financial_summary",
    "get_monthly_spending",
    "get_spending_by_category",
    "get_recurring_payments",
    "get_savings_opportunities",
    "create_budget",
    "get_budget_status",
    "get_cashflow_forecast",
    "get_investment_portfolio",
    "calculate_investment_performance"
];
function selectFinancialTool(question) {
    const text = question.toLowerCase();
    if (/investment|portfolio|holding|stock|etf|share/.test(text)) {
        if (/return|performance|profit|loss|gain|how (?:did|has)/.test(text)) return "calculate_investment_performance";
        return "get_investment_portfolio";
    }
    if (/\bcreate\b|\bset up\b|\bmake\b/.test(text) && /budget/.test(text)) return "create_budget";
    if (/budget/.test(text) && /status|over|remaining|left|limit|spent/.test(text)) return "get_budget_status";
    if (/forecast|predict|projection|in \d+ days|next month|enough money|cash ?flow/.test(text)) return "get_cashflow_forecast";
    if (/recurring|subscription|repeat payment|regular payment/.test(text)) return "get_recurring_payments";
    if (/cheap|affordable|low[- ]cost|grocer|food|meal|recipe|brainstorm/.test(text)) return "get_savings_opportunities";
    if (/save|saving|reduce|cut back|optimis|optimize/.test(text)) return "get_savings_opportunities";
    if (/category|categories|where does|where is|most of my|breakdown/.test(text)) return "get_spending_by_category";
    if (/this month|monthly spending|how much (?:did|do) i spend|expenses this month|spent/.test(text)) return "get_monthly_spending";
    return "get_financial_summary";
}
function executeFinancialTool(name, context) {
    switch(name){
        case "get_financial_summary":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get_financial_summary"])(context.transactions, context.currency);
        case "get_monthly_spending":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get_monthly_spending"])(context.transactions, context.currency);
        case "get_spending_by_category":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get_spending_by_category"])(context.transactions, context.currency);
        case "get_recurring_payments":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get_recurring_payments"])(context.transactions, context.currency);
        case "get_savings_opportunities":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get_savings_opportunities"])(context.transactions, context.currency);
        case "create_budget":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create_budget"])(context.transactions, context.currency, context.budgets);
        case "get_budget_status":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get_budget_status"])(context.transactions, context.currency, context.budgets);
        case "get_cashflow_forecast":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get_cashflow_forecast"])(context.transactions, context.bills, context.currency);
        case "get_investment_portfolio":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get_investment_portfolio"])(context.investments, context.currency);
        case "calculate_investment_performance":
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$financial$2d$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculate_investment_performance"])(context.investments, context.currency);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/financial-tools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculate_investment_performance",
    ()=>calculate_investment_performance,
    "create_budget",
    ()=>create_budget,
    "get_budget_status",
    ()=>get_budget_status,
    "get_cashflow_forecast",
    ()=>get_cashflow_forecast,
    "get_financial_summary",
    ()=>get_financial_summary,
    "get_investment_portfolio",
    ()=>get_investment_portfolio,
    "get_monthly_spending",
    ()=>get_monthly_spending,
    "get_recurring_payments",
    ()=>get_recurring_payments,
    "get_savings_opportunities",
    ()=>get_savings_opportunities,
    "get_spending_by_category",
    ()=>get_spending_by_category
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intelligence.ts [app-client] (ecmascript)");
;
function get_financial_summary(transactions, currency) {
    const analysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeTransactions"])(transactions, currency);
    return {
        currency,
        periodStart: analysis.periodStart,
        periodEnd: analysis.periodEnd,
        monthsAnalyzed: analysis.monthCount,
        income: analysis.totalIncome,
        expenses: analysis.totalExpenses,
        refunds: analysis.totalRefunds,
        investmentPurchases: analysis.totalInvestments,
        monthlySavings: analysis.monthlySavings,
        savingsRate: analysis.savingsRate,
        netCashFlow: analysis.netCashFlow,
        averageMonthlySpending: analysis.averageMonthlySpending,
        confirmedBalance: null
    };
}
function get_monthly_spending(transactions, currency, month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency))) {
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["summarizeMonth"])(transactions.filter((item)=>item.currency === currency), month);
    return {
        month,
        currency,
        income: summary.income,
        grossExpenses: summary.grossExpenses,
        refunds: summary.refunds,
        netExpenses: summary.expenses,
        savings: summary.savings,
        investmentPurchases: summary.investmentPurchases,
        netCashFlow: summary.cashFlow
    };
}
function get_spending_by_category(transactions, currency, month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency))) {
    const monthTransactions = transactions.filter((item)=>item.currency === currency && item.date.startsWith(month));
    return {
        month,
        currency,
        categories: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(monthTransactions)
    };
}
function get_recurring_payments(transactions, currency) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeTransactions"])(transactions, currency).recurringPayments;
}
function get_savings_opportunities(transactions, currency) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSavingsOpportunities"])(transactions, currency);
}
function create_budget(transactions, currency, existing = [], asOf = new Date()) {
    const targetMonth = nextMonth(asOf.toISOString().slice(0, 7));
    const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suggestBudgetLimits"])(transactions, currency);
    const budgets = suggestions.map((suggestion)=>({
            id: `${currency}:${suggestion.category}`,
            category: suggestion.category,
            monthlyLimit: suggestion.monthlyLimit,
            actualSpending: 0
        }));
    const existingCategories = new Set(existing.filter((item)=>item.id.startsWith(`${currency}:`)).map((item)=>item.category));
    return {
        currency,
        targetMonth,
        budgets: budgets.filter((budget)=>!existingCategories.has(budget.category)),
        updatedBudgets: budgets.filter((budget)=>existingCategories.has(budget.category)),
        assumptions: "Suggested limits are 110% of average observed category spending across up to the latest three available months. Existing budgets are returned separately for review."
    };
}
function get_budget_status(transactions, currency, budgets) {
    const month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    return {
        month,
        currency,
        budgets: budgets.filter((budget)=>budget.id.startsWith(`${currency}:`)).map((budget)=>{
            const actualSpending = transactions.filter((item)=>item.currency === currency && item.type === "expense" && item.category === budget.category && item.date.startsWith(month)).reduce((sum, item)=>sum + Math.abs(item.amount), 0);
            return {
                category: budget.category,
                ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateBudget"])(budget.monthlyLimit, actualSpending)
            };
        })
    };
}
function get_cashflow_forecast(transactions, bills, currency, asOf = new Date()) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forecastCashFlow"])(transactions, bills, currency, asOf);
}
function get_investment_portfolio(investments, currency) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePortfolio"])(investments, currency);
}
function calculate_investment_performance(investments, currency) {
    const portfolio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculatePortfolio"])(investments, currency);
    return {
        ...portfolio,
        pricesAreManual: true,
        note: "Performance uses manually entered purchase and current prices; it is not live market data."
    };
}
function nextMonth(month) {
    if (!month) return "";
    const [year, value] = month.split("-").map(Number);
    const next = new Date(year, value, 1);
    return `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/financial-visualization.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createFinancialVisualization",
    ()=>createFinancialVisualization,
    "financialChartColors",
    ()=>financialChartColors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lib/finance.ts [app-client] (ecmascript) <locals>");
;
const financialChartColors = [
    "#a78bfa",
    "#34d399",
    "#60a5fa",
    "#fbbf24",
    "#fb7185",
    "#22d3ee"
];
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function records(value) {
    return Array.isArray(value) ? value.filter(isRecord) : [];
}
function finiteNumber(value) {
    return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
function moneyStat(label, value, currency) {
    const amount = finiteNumber(value);
    return amount === undefined ? undefined : {
        label,
        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(amount, currency)
    };
}
function percentageStat(label, value) {
    const rate = finiteNumber(value);
    return rate === undefined ? undefined : {
        label,
        value: `${rate.toFixed(1)}%`
    };
}
function barChart(title, points, series, note) {
    return points.length && series.length ? {
        type: "bar",
        title,
        points,
        series,
        note
    } : undefined;
}
function pieChart(title, points, note) {
    return points.length ? {
        type: "pie",
        title,
        points,
        series: [
            {
                key: "value",
                label: "Value",
                color: financialChartColors[0]
            }
        ],
        note
    } : undefined;
}
function withStats(title, stats, chart, note) {
    const validStats = stats.filter((stat)=>stat !== undefined);
    return validStats.length || chart ? {
        title,
        stats: validStats,
        chart,
        note
    } : undefined;
}
function createFinancialVisualization(tool, value, currency) {
    if (tool === "get_recurring_payments" || tool === "get_savings_opportunities") {
        const items = records(value).flatMap((item)=>{
            const amount = finiteNumber(tool === "get_recurring_payments" ? item.monthlyAmount : item.monthlySavings);
            const label = typeof (tool === "get_recurring_payments" ? item.name : item.title) === "string" ? String(tool === "get_recurring_payments" ? item.name : item.title) : "";
            return amount !== undefined && label ? [
                {
                    label,
                    value: amount
                }
            ] : [];
        }).sort((a, b)=>b.value - a.value);
        if (!items.length) return undefined;
        const total = items.reduce((sum, item)=>sum + item.value, 0);
        const isSavings = tool === "get_savings_opportunities";
        const points = items.slice(0, 5).map((item)=>({
                label: item.label,
                value: item.value
            }));
        return withStats(isSavings ? "Potential savings" : "Recurring payments", [
            {
                label: isSavings ? "Estimated monthly savings" : "Monthly recurring total",
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(total, currency)
            },
            {
                label: isSavings ? "Ideas" : "Payments",
                value: String(items.length)
            }
        ], barChart(isSavings ? "Estimated monthly savings by idea" : "Estimated monthly amount by payment", points, [
            {
                key: "value",
                label: isSavings ? "Estimated savings" : "Monthly amount",
                color: financialChartColors[0]
            }
        ], items.length > 5 ? "Showing the five largest items." : undefined), isSavings ? "Illustrative estimates, not guaranteed savings." : "Based on recurring patterns in imported transactions.");
    }
    if (!isRecord(value)) return undefined;
    switch(tool){
        case "get_financial_summary":
            {
                const income = finiteNumber(value.income);
                const expenses = finiteNumber(value.expenses);
                const netCashFlow = finiteNumber(value.netCashFlow);
                const points = [
                    {
                        label: "Imported period",
                        ...income === undefined ? {} : {
                            income
                        },
                        ...expenses === undefined ? {} : {
                            expenses
                        },
                        ...netCashFlow === undefined ? {} : {
                            netCashFlow
                        }
                    }
                ];
                return withStats("Financial snapshot", [
                    moneyStat("Recorded income", income, currency),
                    moneyStat("Consumer expenses", expenses, currency),
                    moneyStat("Net cash flow", netCashFlow, currency),
                    percentageStat("Savings rate", value.savingsRate)
                ], barChart("Income, expenses and net cash flow", points, [
                    {
                        key: "income",
                        label: "Income",
                        color: financialChartColors[1]
                    },
                    {
                        key: "expenses",
                        label: "Expenses",
                        color: "#fb7185"
                    },
                    {
                        key: "netCashFlow",
                        label: "Net cash flow",
                        color: financialChartColors[2]
                    }
                ]), "Net cash flow is not a confirmed account balance.");
            }
        case "get_monthly_spending":
            {
                const measures = [
                    {
                        label: "Income",
                        key: "income",
                        color: financialChartColors[1]
                    },
                    {
                        label: "Net expenses",
                        key: "netExpenses",
                        color: "#fb7185"
                    },
                    {
                        label: "Net cash flow",
                        key: "netCashFlow",
                        color: financialChartColors[2]
                    }
                ];
                const points = measures.flatMap((measure)=>{
                    const amount = finiteNumber(value[measure.key]);
                    return amount === undefined ? [] : [
                        {
                            label: measure.label,
                            value: amount
                        }
                    ];
                });
                return withStats("Monthly snapshot", [
                    moneyStat("Income", value.income, currency),
                    moneyStat("Net expenses", value.netExpenses, currency),
                    moneyStat("Net cash flow", value.netCashFlow, currency)
                ], barChart("Income, expenses and net cash flow", points, [
                    {
                        key: "value",
                        label: "Amount",
                        color: financialChartColors[0]
                    }
                ]), typeof value.month === "string" ? `For ${value.month}; transfers are excluded.` : undefined);
            }
        case "get_spending_by_category":
            {
                const categories = records(value.categories).flatMap((item)=>{
                    const amount = finiteNumber(item.value);
                    return amount !== undefined && typeof item.name === "string" ? [
                        {
                            label: item.name,
                            value: amount
                        }
                    ] : [];
                }).sort((a, b)=>b.value - a.value);
                if (!categories.length) return undefined;
                const visible = categories.slice(0, 5).map((item)=>({
                        label: item.label,
                        value: item.value
                    }));
                if (categories.length > 5) {
                    visible.push({
                        label: "Other categories",
                        value: categories.slice(5).reduce((sum, item)=>sum + item.value, 0)
                    });
                }
                const total = categories.reduce((sum, item)=>sum + item.value, 0);
                return withStats("Spending by category", [
                    {
                        label: "Total expenses",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(total, currency)
                    },
                    {
                        label: "Categories",
                        value: String(categories.length)
                    }
                ], pieChart("Expense breakdown", visible), typeof value.month === "string" ? `For ${value.month}.` : undefined);
            }
        case "create_budget":
            {
                const budgets = records(value.budgets).flatMap((item)=>{
                    const limit = finiteNumber(item.monthlyLimit);
                    return limit !== undefined && typeof item.category === "string" ? [
                        {
                            label: item.category,
                            value: limit
                        }
                    ] : [];
                }).sort((a, b)=>b.value - a.value);
                if (!budgets.length) return undefined;
                const total = budgets.reduce((sum, item)=>sum + item.value, 0);
                return withStats("Suggested budgets", [
                    {
                        label: "Categories",
                        value: String(budgets.length)
                    },
                    {
                        label: "Combined monthly limits",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(total, currency)
                    }
                ], barChart("Suggested monthly limit by category", budgets.slice(0, 6), [
                    {
                        key: "value",
                        label: "Monthly limit",
                        color: financialChartColors[0]
                    }
                ], budgets.length > 6 ? "Showing the six largest suggested limits." : undefined), typeof value.targetMonth === "string" ? `Suggested for ${value.targetMonth}.` : undefined);
            }
        case "get_budget_status":
            {
                const budgets = records(value.budgets).flatMap((item)=>{
                    const actualSpending = finiteNumber(item.actualSpending);
                    const monthlyLimit = finiteNumber(item.monthlyLimit);
                    return actualSpending !== undefined && monthlyLimit !== undefined && typeof item.category === "string" ? [
                        {
                            label: item.category,
                            actualSpending,
                            monthlyLimit,
                            over: item.isOverBudget === true || actualSpending > monthlyLimit
                        }
                    ] : [];
                });
                if (!budgets.length) return undefined;
                const overCount = budgets.filter((item)=>item.over).length;
                return withStats("Budget status", [
                    {
                        label: "Categories",
                        value: String(budgets.length)
                    },
                    {
                        label: "Over limit",
                        value: String(overCount)
                    }
                ], barChart("Actual spending vs. monthly limit", budgets.slice(0, 6).map(({ label, actualSpending, monthlyLimit })=>({
                        label,
                        actual: actualSpending,
                        limit: monthlyLimit
                    })), [
                    {
                        key: "actual",
                        label: "Actual",
                        color: financialChartColors[0]
                    },
                    {
                        key: "limit",
                        label: "Limit",
                        color: financialChartColors[2]
                    }
                ], budgets.length > 6 ? "Showing the first six categories." : undefined), typeof value.month === "string" ? `For ${value.month}.` : undefined);
            }
        case "get_cashflow_forecast":
            {
                const horizons = records(value.horizons).flatMap((item)=>{
                    const days = finiteNumber(item.days);
                    const income = finiteNumber(item.projectedIncome);
                    const expenses = finiteNumber(item.projectedExpenses);
                    const netFlow = finiteNumber(item.projectedNetFlow);
                    return days !== undefined && income !== undefined && expenses !== undefined && netFlow !== undefined ? [
                        {
                            days,
                            income,
                            expenses,
                            netFlow,
                            knownBills: finiteNumber(item.knownBills)
                        }
                    ] : [];
                });
                if (!horizons.length) return undefined;
                const stats = horizons.flatMap((item)=>moneyStat(`${item.days}-day net flow`, item.netFlow, currency) ?? []);
                return withStats("Cash flow forecast", [
                    ...stats,
                    moneyStat("Known bills · 90 days", horizons.find((item)=>item.days === 90)?.knownBills, currency)
                ], barChart("Projected cash flow", horizons.map((item)=>({
                        label: `${item.days} days`,
                        income: item.income,
                        expenses: item.expenses,
                        netFlow: item.netFlow
                    })), [
                    {
                        key: "income",
                        label: "Income",
                        color: financialChartColors[1]
                    },
                    {
                        key: "expenses",
                        label: "Expenses",
                        color: "#fb7185"
                    },
                    {
                        key: "netFlow",
                        label: "Net flow",
                        color: financialChartColors[2]
                    }
                ]), "An estimate of net transaction flow, not an account balance or guarantee.");
            }
        case "get_investment_portfolio":
        case "calculate_investment_performance":
            {
                const allocations = records(value.allocation).flatMap((item)=>{
                    const amount = finiteNumber(item.value);
                    return amount !== undefined && amount > 0 && typeof item.name === "string" ? [
                        {
                            label: item.name,
                            value: amount
                        }
                    ] : [];
                }).sort((a, b)=>b.value - a.value);
                const visible = allocations.slice(0, 5).map((item)=>({
                        label: item.label,
                        value: item.value
                    }));
                if (allocations.length > 5) {
                    visible.push({
                        label: "Other holdings",
                        value: allocations.slice(5).reduce((sum, item)=>sum + item.value, 0)
                    });
                }
                const returnPercent = finiteNumber(value.returnPercent);
                return withStats("Portfolio snapshot", [
                    moneyStat("Invested", value.totalInvested, currency),
                    moneyStat("Current entered value", value.currentValue, currency),
                    moneyStat("Unrealized change", value.unrealizedProfitLoss, currency),
                    returnPercent === undefined ? undefined : {
                        label: "Return",
                        value: `${returnPercent.toFixed(2)}%`
                    }
                ], pieChart("Current allocation", visible, allocations.length > 5 ? "The five largest holdings are shown; the rest are grouped." : undefined), "Uses manually entered prices, not live market data.");
            }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/intelligence.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeTransactions",
    ()=>analyzeTransactions,
    "applyClassificationRules",
    ()=>applyClassificationRules,
    "buildBudgetRecord",
    ()=>buildBudgetRecord,
    "calculateBudget",
    ()=>calculateBudget,
    "calculatePortfolio",
    ()=>calculatePortfolio,
    "classifyTransaction",
    ()=>classifyTransaction,
    "createSavingsPlan",
    ()=>createSavingsPlan,
    "deduplicateTransactions",
    ()=>deduplicateTransactions,
    "detectRecurringPayments",
    ()=>detectRecurringPayments,
    "forecastCashFlow",
    ()=>forecastCashFlow,
    "generateFinancialInsights",
    ()=>generateFinancialInsights,
    "generateSavingsOpportunities",
    ()=>generateSavingsOpportunities,
    "getCategoryTotals",
    ()=>getCategoryTotals,
    "getCurrencies",
    ()=>getCurrencies,
    "getLatestMonth",
    ()=>getLatestMonth,
    "getMonthlySummaries",
    ()=>getMonthlySummaries,
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
function legacyCategory(category) {
    const aliases = {
        salary: "Income",
        "other income": "Income",
        refunds: "Income",
        transfers: "Transfers",
        investments: "Investments",
        "food & dining": "Food",
        restaurants: "Restaurants",
        "health & insurance": "Healthcare",
        "online payments": "Other",
        bills: "Utilities"
    };
    if (category in aliases) return aliases[category];
    return isTransactionCategory(category) ? category : undefined;
}
function isTransactionCategory(value) {
    return [
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
    ].includes(value);
}
function applyClassificationRules(transactions, rules = []) {
    return transactions.map((transaction)=>{
        if (transaction.categorySource === "manual") {
            return {
                ...transaction,
                category: legacyCategory(transaction.category) ?? classifyTransaction(transaction, rules),
                categorySource: "manual"
            };
        }
        return {
            ...transaction,
            category: classifyTransaction(transaction, rules),
            categorySource: "rule"
        };
    });
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
function getCurrencies(transactions) {
    return [
        ...new Set(transactions.map((transaction)=>transaction.currency))
    ].sort();
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
function getMonthlySummaries(transactions, currency, endMonth) {
    if (!endMonth) return [];
    return Array.from({
        length: 12
    }, (_, index)=>createMonthlySummary(transactions, currency, addMonths(endMonth, index - 11)));
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
function createSavingsPlan(transactions, currency, target) {
    const analysis = analyzeTransactions(transactions, currency);
    const months = Math.max(1, analysis.monthCount);
    const monthlyIncome = analysis.totalIncome / months;
    const currentMonthlySavings = analysis.monthlySavings;
    const targetMonthlySavings = target?.currency === currency ? target.monthlyAmount : monthlyIncome * 0.2;
    const opportunities = generateSavingsOpportunities(transactions, currency);
    const actions = opportunities.slice(0, 3);
    const uniqueCategoryPotential = new Map();
    actions.forEach((item)=>uniqueCategoryPotential.set(item.category, Math.max(uniqueCategoryPotential.get(item.category) ?? 0, item.monthlySavings)));
    const estimatedOpportunity = [
        ...uniqueCategoryPotential.values()
    ].reduce((sum, amount)=>sum + amount, 0);
    return {
        monthlyIncome,
        currentMonthlySavings,
        targetMonthlySavings,
        targetGap: Math.max(0, targetMonthlySavings - currentMonthlySavings),
        estimatedOpportunity,
        actions
    };
}
function confidenceLabel(confidence) {
    if (confidence >= 0.8) return "High";
    if (confidence >= 0.6) return "Medium";
    return "Low";
}
function generateFinancialInsights(transactions, currency) {
    const selected = transactions.filter((item)=>item.currency === currency && item.type !== "transfer");
    if (!selected.length) return [];
    const analysis = analyzeTransactions(selected, currency);
    const insights = [];
    const savingsRate = analysis.savingsRate;
    insights.push({
        id: "cash-flow",
        title: analysis.netCashFlow >= 0 ? "Recorded cash flow is positive" : "Recorded cash flow is negative",
        explanation: `Across ${analysis.monthCount} calendar month${analysis.monthCount === 1 ? "" : "s"}, eligible inflows and outflows produced ${analysis.netCashFlow.toFixed(2)} ${currency} net cash flow.`,
        evidence: `${analysis.totalIncome.toFixed(2)} income + ${analysis.totalRefunds.toFixed(2)} refunds − ${analysis.totalExpenses.toFixed(2)} expenses − ${analysis.totalInvestments.toFixed(2)} investment purchases.`,
        financialImpact: analysis.netCashFlow,
        impactLabel: "Recorded net cash flow",
        suggestedAction: "Use this as transaction activity only; reconcile it against a confirmed account balance.",
        confidence: 0.94,
        confidenceLabel: "High",
        transactionIds: selected.map((item)=>item.id)
    });
    insights.push({
        id: "savings-rate",
        title: savingsRate >= 0.2 ? "Savings are at or above a 20% benchmark" : "There may be room to grow savings",
        explanation: `Recorded savings are ${Math.round(savingsRate * 100)}% of recorded income for the imported period.`,
        evidence: `${analysis.monthlySavings.toFixed(2)} ${currency} average monthly savings / ${(analysis.totalIncome / Math.max(1, analysis.monthCount)).toFixed(2)} ${currency} average monthly income.`,
        financialImpact: analysis.monthlySavings,
        impactLabel: "Average monthly savings",
        suggestedAction: savingsRate >= 0.2 ? "Keep reviewing the plan as new months are imported." : "Choose a monthly target that fits your priorities and available cash.",
        confidence: analysis.monthCount >= 3 ? 0.86 : 0.58,
        confidenceLabel: confidenceLabel(analysis.monthCount >= 3 ? 0.86 : 0.58),
        transactionIds: selected.filter((item)=>item.type === "income" || item.type === "expense" || item.type === "refund").map((item)=>item.id)
    });
    const categoryTotals = getCategoryTotals(selected);
    const topCategory = categoryTotals[0];
    if (topCategory) {
        insights.push({
            id: "largest-category",
            title: `${topCategory.name} is the largest recorded spending category`,
            explanation: `${topCategory.name} accounts for ${Math.round(topCategory.value / Math.max(analysis.totalExpenses, 1) * 100)}% of classified expense transactions.`,
            evidence: `${topCategory.value.toFixed(2)} ${currency} from ${selected.filter((item)=>item.type === "expense" && item.category === topCategory.name).length} transactions.`,
            financialImpact: topCategory.value,
            impactLabel: "Recorded category spend",
            suggestedAction: "Review the transactions in this category and set a limit only if it supports your goals.",
            confidence: 0.82,
            confidenceLabel: "High",
            transactionIds: selected.filter((item)=>item.type === "expense" && item.category === topCategory.name).map((item)=>item.id)
        });
    }
    const largest = analysis.largestExpenses[0];
    if (largest) {
        insights.push({
            id: "largest-expense",
            title: "Largest individual purchase in the imported history",
            explanation: `${largest.merchant || largest.description} was the largest single consumer outflow found.`,
            evidence: `${largest.date} · ${Math.abs(largest.amount).toFixed(2)} ${currency} · ${largest.category}.`,
            financialImpact: Math.abs(largest.amount),
            impactLabel: "Single expense",
            suggestedAction: "Check that the merchant and category are correct; manually recategorize if needed.",
            confidence: 0.96,
            confidenceLabel: "High",
            transactionIds: [
                largest.id
            ]
        });
    }
    const latestChange = analysis.expenditureChanges.at(-1);
    if (latestChange) {
        insights.push({
            id: "monthly-change",
            title: latestChange.change > 0 ? "Monthly spending increased" : "Monthly spending decreased",
            explanation: `Recorded expenditure changed ${latestChange.change >= 0 ? "by" : "by"} ${latestChange.change.toFixed(2)} ${currency} in ${monthName(latestChange.month)} compared with the prior month.`,
            evidence: `${latestChange.previous.toFixed(2)} → ${latestChange.current.toFixed(2)} ${currency}${latestChange.changeRate === null ? "" : ` (${Math.round(latestChange.changeRate * 100)}%)`}.`,
            financialImpact: Math.abs(latestChange.change),
            impactLabel: "Month-over-month change",
            suggestedAction: latestChange.change > 0 ? "Review the category breakdown to see whether this is a one-off or a continuing change." : "Confirm that the reduction reflects your intended plan.",
            confidence: analysis.monthCount >= 3 ? 0.79 : 0.55,
            confidenceLabel: confidenceLabel(analysis.monthCount >= 3 ? 0.79 : 0.55),
            transactionIds: selected.filter((item)=>monthKey(item.date) === latestChange.month).map((item)=>item.id)
        });
    }
    const recurring = analysis.recurringPayments[0];
    if (recurring) {
        insights.push({
            id: "recurring-payment",
            title: `${recurring.name} appears to be a recurring payment`,
            explanation: `There are ${recurring.occurrenceCount} matching payments with an estimated ${recurring.cadence} cadence.`,
            evidence: `Average payment ${recurring.averageAmount.toFixed(2)} ${currency}; estimated monthly amount ${recurring.monthlyAmount.toFixed(2)} ${currency}.`,
            financialImpact: recurring.monthlyAmount,
            impactLabel: "Estimated monthly commitment",
            suggestedAction: "Confirm the schedule and amount with the biller before changing or cancelling it.",
            confidence: recurring.confidence,
            confidenceLabel: confidenceLabel(recurring.confidence),
            transactionIds: recurring.transactionIds
        });
    }
    const templates = [
        {
            id: "history-coverage",
            title: "Imported history spans multiple months",
            explanation: `The analysis covers ${analysis.monthCount} calendar month${analysis.monthCount === 1 ? "" : "s"} and ${selected.length} non-transfer transactions.`,
            evidence: `Coverage: ${analysis.periodStart} through ${analysis.periodEnd}.`,
            financialImpact: 0,
            impactLabel: "No cash impact calculated",
            suggestedAction: analysis.monthCount < 3 ? "Import more history to make trend and recurring-payment findings stronger." : "Keep importing monthly to maintain a current view.",
            confidence: 0.88,
            transactionIds: selected.map((item)=>item.id)
        },
        {
            id: "refunds",
            title: "Refunds are kept distinct from earned income",
            explanation: `${analysis.totalRefunds.toFixed(2)} ${currency} in refund or reversal transactions were identified and not counted as salary or ordinary income.`,
            evidence: `${selected.filter((item)=>item.type === "refund").length} refund/reversal transaction(s).`,
            financialImpact: analysis.totalRefunds,
            impactLabel: "Refunds recorded",
            suggestedAction: "Check that refunds have matched the intended purchases; review unmatched credits separately.",
            confidence: 0.8,
            transactionIds: selected.filter((item)=>item.type === "refund").map((item)=>item.id)
        },
        {
            id: "transaction-coverage",
            title: "Analysis is based on imported transactions",
            explanation: `${selected.length} non-transfer records in ${currency} were included; records outside the imported files are not visible.`,
            evidence: `${selected.filter((item)=>item.type === "expense").length} expenses, ${selected.filter((item)=>item.type === "income").length} incomes, ${selected.filter((item)=>item.type === "refund").length} refunds, and ${selected.filter((item)=>item.type === "investment").length} investments.`,
            financialImpact: 0,
            impactLabel: "No cash impact calculated",
            suggestedAction: "Import all relevant accounts and date ranges before using the results to make decisions.",
            confidence: 0.99,
            transactionIds: selected.map((item)=>item.id)
        }
    ];
    templates.forEach((insight)=>insights.push({
            ...insight,
            confidenceLabel: confidenceLabel(insight.confidence)
        }));
    return insights.slice(0, 8);
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
function calculatePortfolio(investments, currency) {
    const selected = investments.filter((investment)=>investment.currency === currency);
    const totalInvested = selected.reduce((sum, investment)=>sum + investment.quantity * investment.purchasePrice, 0);
    const currentValue = selected.reduce((sum, investment)=>sum + investment.quantity * investment.currentPrice, 0);
    const positions = selected.map((investment)=>({
            id: investment.id,
            name: investment.name,
            ticker: investment.ticker,
            value: investment.quantity * investment.currentPrice,
            sharePercent: currentValue ? investment.quantity * investment.currentPrice / currentValue * 100 : 0
        })).sort((a, b)=>b.value - a.value);
    return {
        currency,
        totalInvested,
        currentValue,
        unrealizedProfitLoss: currentValue - totalInvested,
        returnPercent: totalInvested ? (currentValue - totalInvested) / totalInvested * 100 : 0,
        allocation: positions
    };
}
function buildBudgetRecord(category, monthlyLimit, actualSpending, id = category) {
    return {
        id,
        category,
        monthlyLimit: Math.max(0, monthlyLimit),
        actualSpending: Math.max(0, actualSpending)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/market-data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .number>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .array>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$unknown$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .unknown>");
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
const yahooResultSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    meta: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        symbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional(),
        currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional(),
        instrumentType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional(),
        shortName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().nullable().optional(),
        longName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().nullable().optional(),
        regularMarketPrice: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite().nullable().optional(),
        regularMarketTime: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite().nullable().optional()
    }).passthrough(),
    timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite()).optional(),
    indicators: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        quote: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
            close: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite().nullable()).optional()
        }).passthrough()).optional()
    }).passthrough()
}).passthrough();
const yahooResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    chart: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        result: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(yahooResultSchema).nullable().optional(),
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$unknown$3e$__["z"].unknown().optional()
    }).passthrough()
}).passthrough();
const yahooSearchResponseSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    quotes: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
        symbol: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string(),
        quoteType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional(),
        shortname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().nullable().optional(),
        longname: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().nullable().optional(),
        exchange: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional()
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/models.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .number>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z .boolean>");
;
const transactionTypeSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
    "income",
    "expense",
    "transfer",
    "refund",
    "investment"
]);
const transactionCategorySchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
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
const transactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string(),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite(),
    originalAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite(),
    currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    category: transactionCategorySchema,
    categorySource: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "rule",
        "manual"
    ]).optional(),
    type: transactionTypeSchema,
    account: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    merchant: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string(),
    isRecurring: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__["z"].boolean(),
    confidence: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().min(0).max(1),
    sourceFile: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().optional()
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/voice-errors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "microphoneErrorMessage",
    ()=>microphoneErrorMessage
]);
function microphoneErrorMessage(reason) {
    const name = typeof reason === "object" && reason !== null && "name" in reason ? String(reason.name) : "";
    if (name === "NotAllowedError" || name === "SecurityError") {
        return "Microphone permission was denied. Allow microphone access or type your question.";
    }
    return "The microphone could not be started. You can type your question instead.";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0zwtluack8mkm._.js.map