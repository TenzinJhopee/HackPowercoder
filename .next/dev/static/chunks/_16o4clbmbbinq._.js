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
        try {
            const parsed = await Promise.all(Array.from(fileList).map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseCsvFile"]));
            setFiles((current)=>[
                    ...current,
                    ...parsed.filter((file)=>!current.some((item)=>item.id === file.id))
                ]);
        } catch (reason) {
            setError(reason instanceof Error ? reason.message : "The selected file could not be read.");
        } finally{
            setLoadingFiles(false);
            if (inputRef.current) inputRef.current.value = "";
        }
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
            setNotice(`${result.added} transactions added${duplicates ? `, ${duplicates} duplicates skipped` : ""}${invalid ? `, ${invalid} invalid rows skipped` : ""}.`);
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
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm",
                        children: loadingFiles ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                            className: "animate-spin",
                            size: 22
                        }, void 0, false, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 103,
                            columnNumber: 27
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                            size: 21
                        }, void 0, false, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 103,
                            columnNumber: 81
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-semibold text-ink",
                        children: "Drop your CSV files here"
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-muted",
                        children: "Files stay in this browser and are never uploaded to a server."
                    }, void 0, false, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 106,
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
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            " Choose CSV files"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-importer.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            files.map((file)=>{
                const hasDirection = Boolean(file.mapping.type || file.mapping.debit || file.mapping.credit);
                const mappedAmount = Boolean(file.mapping.amount || file.mapping.debit || file.mapping.credit);
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
                                                lineNumber: 123,
                                                columnNumber: 111
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-importer.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "max-w-[230px] truncate text-sm font-semibold text-ink",
                                                    children: file.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/csv-importer.tsx",
                                                    lineNumber: 125,
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
                                                    lineNumber: 126,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/csv-importer.tsx",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 122,
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
                                        lineNumber: 129,
                                        columnNumber: 229
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 129,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 121,
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
                                            lineNumber: 134,
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
                                                            lineNumber: 141,
                                                            columnNumber: 23
                                                        }, this),
                                                        file.headers.map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: header,
                                                                children: header
                                                            }, header, false, {
                                                                fileName: "[project]/components/csv-importer.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 53
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/csv-importer.tsx",
                                                    lineNumber: 136,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                    className: "pointer-events-none absolute right-3 top-2.5 text-slate-400",
                                                    size: 15
                                                }, void 0, false, {
                                                    fileName: "[project]/components/csv-importer.tsx",
                                                    lineNumber: 144,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/csv-importer.tsx",
                                            lineNumber: 135,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 133,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this),
                        (!file.mapping.date || !mappedAmount) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 flex items-center gap-2 text-xs text-amber-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 149,
                                    columnNumber: 122
                                }, this),
                                " Map a transaction date and at least one amount column to continue."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 149,
                            columnNumber: 55
                        }, this),
                        !hasDirection && file.mapping.amount && directionIsAmbiguous && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 flex items-center gap-2 text-xs text-amber-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-importer.tsx",
                                    lineNumber: 150,
                                    columnNumber: 145
                                }, this),
                                " Amounts are positive and no type column is mapped. Map a type column or debit/credit columns so income and expenses are not guessed."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 150,
                            columnNumber: 78
                        }, this),
                        file.parseWarnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-xs text-amber-700",
                            children: [
                                file.parseWarnings.length,
                                " CSV parsing warning(s); review your file before importing."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-importer.tsx",
                            lineNumber: 151,
                            columnNumber: 47
                        }, this)
                    ]
                }, file.id, true, {
                    fileName: "[project]/components/csv-importer.tsx",
                    lineNumber: 120,
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
                        lineNumber: 156,
                        columnNumber: 142
                    }, this),
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-importer.tsx",
                lineNumber: 156,
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
                        lineNumber: 157,
                        columnNumber: 157
                    }, this),
                    notice
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-importer.tsx",
                lineNumber: 157,
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
                        lineNumber: 160,
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
                                lineNumber: 162,
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
                                        lineNumber: 169,
                                        columnNumber: 26
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/csv-importer.tsx",
                                        lineNumber: 169,
                                        columnNumber: 80
                                    }, this),
                                    importing ? "Importing…" : "Import transactions"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/csv-importer.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/csv-importer.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-importer.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/csv-importer.tsx",
        lineNumber: 85,
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
                    lineNumber: 45,
                    columnNumber: 169
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 45,
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
                                lineNumber: 45,
                                columnNumber: 288
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 45,
                        columnNumber: 223
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "-mt-0.5 text-[10px] font-medium tracking-wide text-slate-400",
                        children: "MONEY, IN FOCUS"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 45,
                        columnNumber: 329
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 45,
                columnNumber: 218
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 45,
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
                        lineNumber: 52,
                        columnNumber: 39
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                className: "pointer-events-none absolute right-2.5 top-2.5 text-slate-400",
                size: 14
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 50,
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
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 65,
                            columnNumber: 96
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 63,
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
                        lineNumber: 68,
                        columnNumber: 9
                    }, this),
                    badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mb-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700",
                        children: badge
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 69,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-xs leading-5 text-slate-400",
                children: detail
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 62,
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
                        lineNumber: 77,
                        columnNumber: 96
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold tracking-tight text-ink sm:text-[28px]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 77,
                        columnNumber: 191
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-sm text-slate-500",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 77,
                        columnNumber: 297
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 77,
                columnNumber: 79
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 77,
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
                            lineNumber: 84,
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
                                    lineNumber: 84,
                                    columnNumber: 219
                                }, this),
                                " Private by design"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 84,
                            columnNumber: 71
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "alert",
                    className: "mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 85,
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
                                lineNumber: 87,
                                columnNumber: 114
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand",
                            children: "A clearer view of your finances"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 88,
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
                                    lineNumber: 89,
                                    columnNumber: 131
                                }, this),
                                " Let's make it make sense."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base",
                            children: "Bring your transactions together to discover spending patterns, plan with confidence, and find room to save. Your data stays on this device."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 86,
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
                                            lineNumber: 93,
                                            columnNumber: 78
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-slate-500",
                                            children: "Upload one or more account exports in CSV format."
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 93,
                                            columnNumber: 167
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 93,
                                    columnNumber: 73
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 sm:flex",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                        size: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 93,
                                        columnNumber: 378
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 93,
                                    columnNumber: 269
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CsvImporter"], {
                            onImport: onImported
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 94,
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
                                            lineNumber: 96,
                                            columnNumber: 62
                                        }, this),
                                        " Stored locally in your browser"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:block",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 96,
                                    columnNumber: 125
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Nothing is sent to a bank or server"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 96,
                                    columnNumber: 167
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:block",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 96,
                                    columnNumber: 215
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "CSV files only"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 96,
                                    columnNumber: 257
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 95,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 92,
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
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "shrink-0 text-xs font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-ink",
                            onClick: onDemo,
                            type: "button",
                            children: "Explore demo data"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 99,
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
                                    lineNumber: 104,
                                    columnNumber: 280
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm font-semibold text-ink",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 104,
                                    columnNumber: 346
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-slate-500",
                                    children: copy
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 104,
                                    columnNumber: 408
                                }, this)
                            ]
                        }, title, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 104,
                            columnNumber: 196
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 83,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 82,
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
                lineNumber: 113,
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
                            lineNumber: 113,
                            columnNumber: 266
                        }, this),
                        item.name,
                        ": ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value ?? 0, currency)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 113,
                            columnNumber: 360
                        }, this)
                    ]
                }, item.name, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 113,
                    columnNumber: 184
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 113,
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
    const annualCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && item.date.slice(0, 4) === latestMonth.slice(0, 4)));
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
    const currentYear = latestMonth.slice(0, 4);
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
                            lineNumber: 133,
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
                                    lineNumber: 133,
                                    columnNumber: 542
                                }, this),
                                " Import CSV"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 133,
                            columnNumber: 352
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 133,
                    columnNumber: 213
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            transactions.some((item)=>item.description.includes("DEMO DATA")) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800",
                children: "DEMO DATA · Synthetic transactions are shown for preview only."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 134,
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
                        lineNumber: 136,
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
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Available cash balance",
                        value: "Not available",
                        detail: "No confirmed balance in uploaded files",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 138,
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
                        lineNumber: 139,
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
                        lineNumber: 140,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 135,
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
                                                lineNumber: 145,
                                                columnNumber: 87
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: [
                                                    "Monthly cash flow · ",
                                                    currentYear
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 145,
                                                columnNumber: 150
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 145,
                                        columnNumber: 82
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-500",
                                        children: "Last 12 months"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 145,
                                        columnNumber: 236
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 145,
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
                                                lineNumber: 149,
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
                                                lineNumber: 150,
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
                                                lineNumber: 151,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                                    currency: currency
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 35
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 152,
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
                                                lineNumber: 153,
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
                                                lineNumber: 154,
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
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 148,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 144,
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
                                        lineNumber: 161,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-500",
                                        children: [
                                            "Recorded expenses in ",
                                            currentYear
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 161,
                                        columnNumber: 97
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            annualCategories.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        data: annualCategories.slice(0, 7),
                                                        dataKey: "value",
                                                        nameKey: "name",
                                                        innerRadius: 62,
                                                        outerRadius: 88,
                                                        paddingAngle: 3,
                                                        stroke: "none",
                                                        children: annualCategories.slice(0, 7).map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                                                fill: chartColors[index % chartColors.length]
                                                            }, entry.name, false, {
                                                                fileName: "[project]/components/financial-app.tsx",
                                                                lineNumber: 165,
                                                                columnNumber: 224
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 35
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        formatter: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(Number(value), currency)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 304
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 165,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1 space-y-3",
                                        children: annualCategories.slice(0, 5).map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "h-2 w-2 shrink-0 rounded-full",
                                                        style: {
                                                            backgroundColor: chartColors[index % chartColors.length]
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 163
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 truncate text-[11px] text-slate-500",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 282
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-semibold text-ink",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value, currency, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 369
                                                    }, this)
                                                ]
                                            }, item.name, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 168,
                                                columnNumber: 106
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 162,
                                columnNumber: 38
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "Category insights appear as transactions are categorized."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 169,
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
                                        lineNumber: 170,
                                        columnNumber: 82
                                    }, this),
                                    " total recorded outflow in the chart period"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 143,
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
                                        lineNumber: 175,
                                        columnNumber: 85
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-500",
                                        children: "Monthly net flow; transfers between accounts excluded"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 175,
                                        columnNumber: 153
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 175,
                                columnNumber: 80
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-[11px] text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 w-2 rounded-full bg-brand"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 175,
                                        columnNumber: 337
                                    }, this),
                                    " Net flow"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 175,
                                columnNumber: 259
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 175,
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
                                                    lineNumber: 176,
                                                    columnNumber: 240
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "100%",
                                                    stopColor: "#d92e3a",
                                                    stopOpacity: 0.01
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 299
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 176,
                                            columnNumber: 178
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 176,
                                        columnNumber: 172
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        stroke: "#eef1f4",
                                        strokeDasharray: "3 5",
                                        vertical: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 176,
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
                                        lineNumber: 176,
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
                                        lineNumber: 176,
                                        columnNumber: 564
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                            currency: currency
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 176,
                                            columnNumber: 732
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 176,
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
                                        lineNumber: 176,
                                        columnNumber: 772
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 176,
                                columnNumber: 91
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 176,
                            columnNumber: 43
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 174,
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
                                                lineNumber: 181,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "Latest activity across selected currency"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 181,
                                                columnNumber: 135
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 181,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs font-semibold text-brand hover:text-rose-700",
                                        onClick: ()=>onNavigate("My Accounts"),
                                        type: "button",
                                        children: "View all"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 181,
                                        columnNumber: 228
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            recent.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-slate-100",
                                children: recent.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                                        currency: currency,
                                        item: item
                                    }, item.id, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 182,
                                        columnNumber: 93
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 182,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "No transactions are available in this currency."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 182,
                                columnNumber: 168
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 180,
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
                                            lineNumber: 185,
                                            columnNumber: 156
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 185,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: "A few things we noticed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 185,
                                                columnNumber: 190
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-400",
                                                children: "Based on your uploaded history"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 185,
                                                columnNumber: 257
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 185,
                                        columnNumber: 185
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 185,
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
                                                        lineNumber: 186,
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
                                                        lineNumber: 186,
                                                        columnNumber: 254
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 186,
                                                columnNumber: 136
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[11px] leading-[1.55] text-slate-500",
                                                children: item.explanation
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 186,
                                                columnNumber: 432
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-[10px] leading-[1.5] text-slate-400",
                                                children: item.evidence
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 186,
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
                                                lineNumber: 186,
                                                columnNumber: 596
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-[10px] font-medium text-ink",
                                                children: item.suggestedAction
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 186,
                                                columnNumber: 775
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 186,
                                        columnNumber: 62
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 186,
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
                                        lineNumber: 187,
                                        columnNumber: 202
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 179,
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
                                                lineNumber: 193,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "A simple read on your latest month"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 193,
                                                columnNumber: 132
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 193,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"], {
                                        className: "text-brand",
                                        size: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 193,
                                        columnNumber: 219
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 193,
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
                                            lineNumber: 194,
                                            columnNumber: 200
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 194,
                                        columnNumber: 79
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-ink",
                                                children: savingsRate >= 0.2 ? "Good savings momentum" : savingsRate > 0 ? "Room to grow your buffer" : "Keep an eye on cash flow"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 194,
                                                columnNumber: 295
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs leading-5 text-slate-500",
                                                children: "Savings rate is based on recorded income and eligible spending. It is not a credit or solvency score."
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 194,
                                                columnNumber: 467
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 194,
                                        columnNumber: 290
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 194,
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
                                        lineNumber: 195,
                                        columnNumber: 75
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-slate-500",
                                        children: "Not included in CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 195,
                                        columnNumber: 140
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 192,
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
                                                lineNumber: 198,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "Possible patterns from repeat transactions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 198,
                                                columnNumber: 143
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 198,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__["Clock3"], {
                                        className: "text-slate-400",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 198,
                                        columnNumber: 238
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 198,
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
                                                            lineNumber: 199,
                                                            columnNumber: 361
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 199,
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
                                                                lineNumber: 199,
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
                                                                lineNumber: 199,
                                                                columnNumber: 509
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 392
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 199,
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
                                                        lineNumber: 199,
                                                        columnNumber: 719
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 199,
                                                columnNumber: 618
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 199,
                                        columnNumber: 95
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 199,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "Repeat payments will appear after at least three matching transactions."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 199,
                                columnNumber: 813
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 132,
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
                lineNumber: 209,
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
                        lineNumber: 209,
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
                        lineNumber: 209,
                        columnNumber: 379
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 209,
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
                lineNumber: 209,
                columnNumber: 551
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 209,
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
                    lineNumber: 214,
                    columnNumber: 194
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 214,
                columnNumber: 77
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-ink",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 214,
                        columnNumber: 224
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] leading-[1.55] text-slate-500",
                        children: copy
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 214,
                        columnNumber: 281
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 214,
                columnNumber: 219
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 214,
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
        lineNumber: 218,
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
                            lineNumber: 238,
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
                                    lineNumber: 238,
                                    columnNumber: 428
                                }, this),
                                " Import CSV"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 238,
                            columnNumber: 277
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 238,
                    columnNumber: 151
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 238,
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
                                            lineNumber: 238,
                                            columnNumber: 1197
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 238,
                                        columnNumber: 1103
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700",
                                        children: "Activity imported"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 238,
                                        columnNumber: 1224
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 238,
                                columnNumber: 1053
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-5 text-lg font-semibold text-ink",
                                children: account
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 238,
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
                                lineNumber: 238,
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
                                        lineNumber: 238,
                                        columnNumber: 1582
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-ink",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(netFlow, currency)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 238,
                                        columnNumber: 1639
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 238,
                                columnNumber: 1500
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-[11px] leading-5 text-slate-400",
                                children: "Calculated from imported activity only; not a current or confirmed account balance."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 238,
                                columnNumber: 1725
                            }, this)
                        ]
                    }, account, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 238,
                        columnNumber: 966
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 238,
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
                        lineNumber: 238,
                        columnNumber: 1963
                    }, this),
                    transactions.filter((item)=>item.currency === currency).sort((a, b)=>b.date.localeCompare(a.date)).slice(0, 10).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                            currency: currency,
                            item: item
                        }, item.id, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 238,
                            columnNumber: 2166
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 238,
                columnNumber: 1885
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 238,
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
                lineNumber: 247,
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
                                    lineNumber: 247,
                                    columnNumber: 440
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
                                columnNumber: 338
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 text-xs font-bold uppercase tracking-widest text-brand",
                                children: "A place to start"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
                                columnNumber: 469
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 max-w-lg text-xl font-semibold text-ink",
                                children: top ? `Review your ${top.name.toLowerCase()} spending` : "Import more transactions to find your savings opportunities"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
                                columnNumber: 564
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 max-w-lg text-sm leading-6 text-slate-500",
                                children: top ? `${top.name} is your largest spending category at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(top.value, currency)} in ${latestMonth.slice(0, 4)}. Even a modest 5% reduction would free up about ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(top.value * 0.05, currency)} over that period, if it fits your needs.` : "Your finances stay private on this device. Once activity is imported, we will highlight spending patterns and possible recurring costs."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
                                columnNumber: 750
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 247,
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
                                lineNumber: 247,
                                columnNumber: 1291
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-3xl font-semibold text-ink",
                                children: recurring.length
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
                                columnNumber: 1372
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-5 text-slate-400",
                                children: "Patterns from repeated transactions; confirm these yourself before acting."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
                                columnNumber: 1446
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 247,
                        columnNumber: 1218
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 247,
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
                                lineNumber: 247,
                                columnNumber: 1714
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: "Illustrative savings only; based on recorded spending"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
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
                                                    lineNumber: 247,
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
                                                    lineNumber: 247,
                                                    columnNumber: 2071
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 247,
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
                                                lineNumber: 247,
                                                columnNumber: 2265
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 247,
                                            columnNumber: 2202
                                        }, this)
                                    ]
                                }, item.name, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 247,
                                    columnNumber: 1925
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 247,
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
                                lineNumber: 247,
                                columnNumber: 2497
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: "Automatically spotted after three similar expenses"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
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
                                                    lineNumber: 247,
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
                                                    lineNumber: 247,
                                                    columnNumber: 2916
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 247,
                                            columnNumber: 2828
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-ink",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.averageAmount, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 247,
                                            columnNumber: 3017
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 247,
                                    columnNumber: 2707
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "No repeat-payment patterns yet. These are suggestions, not payment predictions."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 247,
                                    columnNumber: 3142
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 247,
                                columnNumber: 3120
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 247,
                        columnNumber: 2420
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 247,
                columnNumber: 1589
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 247,
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
                lineNumber: 253,
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
                        lineNumber: 253,
                        columnNumber: 299
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Budget limits are your own planning targets. No limits are assumed; add the amounts that make sense for you."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 253,
                        columnNumber: 350
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 253,
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
                                lineNumber: 253,
                                columnNumber: 738
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Actual"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 253,
                                columnNumber: 759
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Monthly limit"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 253,
                                columnNumber: 778
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 253,
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
                                                    lineNumber: 253,
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
                                                        lineNumber: 253,
                                                        columnNumber: 1416
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 253,
                                                    columnNumber: 1318
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 253,
                                            columnNumber: 1223
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-slate-600",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 253,
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
                                            lineNumber: 253,
                                            columnNumber: 1638
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 253,
                                    columnNumber: 1123
                                }, this),
                                limit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `mt-2 pl-1 text-[11px] ${item.value > limit ? "text-brand" : "text-emerald-700"}`,
                                    children: item.value > limit ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.value - limit, currency)} over limit` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(limit - item.value, currency)} remaining`
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 253,
                                    columnNumber: 2051
                                }, this)
                            ]
                        }, item.name, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 253,
                            columnNumber: 1045
                        }, this);
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "There is no spending in this month to plan against."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 253,
                            columnNumber: 2326
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 253,
                        columnNumber: 2304
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 253,
                columnNumber: 471
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 253,
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
                lineNumber: 259,
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
                        lineNumber: 259,
                        columnNumber: 217
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Portfolio value",
                        value: "Not available",
                        detail: "No holdings or live market prices imported",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2d$business$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseBusiness$3e$__["BriefcaseBusiness"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 259,
                        columnNumber: 384
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Investment return",
                        value: "Not calculated",
                        detail: "Purchase lots and current valuations are needed",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 259,
                        columnNumber: 522
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 259,
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
                        lineNumber: 259,
                        columnNumber: 747
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Holdings model is ready; there is no holdings CSV importer yet."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 259,
                        columnNumber: 804
                    }, this),
                    holdings.length ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "Investment holdings need a dedicated CSV with ticker, quantity, purchase price, and purchase date. We won’t infer a portfolio value from transaction history."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 259,
                            columnNumber: 962
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 259,
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
                                lineNumber: 259,
                                columnNumber: 1231
                            }, this),
                            investmentRows.slice(0, 8).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                                    currency: currency,
                                    item: item
                                }, item.id, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 259,
                                    columnNumber: 1356
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 259,
                        columnNumber: 1178
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 259,
                columnNumber: 669
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 259,
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
                lineNumber: 268,
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
                        lineNumber: 268,
                        columnNumber: 226
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Next 3 months · estimate",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(average * 3, currency),
                        detail: "Assumes recent monthly net flow continues",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 268,
                        columnNumber: 458
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Recorded balance",
                        value: "Not available",
                        detail: "A forecast cannot establish available cash",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 268,
                        columnNumber: 620
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 268,
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
                        lineNumber: 268,
                        columnNumber: 836
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Recorded values are historical; dotted values are a straight-line estimate."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 268,
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
                                        lineNumber: 268,
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
                                        lineNumber: 268,
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
                                        lineNumber: 268,
                                        columnNumber: 1535
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                            currency: currency
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 268,
                                            columnNumber: 1637
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 268,
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
                                        lineNumber: 268,
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
                                        lineNumber: 268,
                                        columnNumber: 1801
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 268,
                                columnNumber: 1117
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 268,
                            columnNumber: 1069
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 268,
                        columnNumber: 1037
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 rounded-xl p-4 text-xs leading-5 ${consistency ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`,
                        children: consistency ? "All three latest months show positive net flow. Future results may differ; unexpected expenses and missing records are not included." : "This estimate has limited history or inconsistent monthly results. Treat it as a rough illustration, not a prediction."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 268,
                        columnNumber: 1994
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 268,
                columnNumber: 754
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 268,
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
                            lineNumber: 295,
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
                                    lineNumber: 295,
                                    columnNumber: 448
                                }, this),
                                " Import CSV"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 295,
                            columnNumber: 297
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 295,
                    columnNumber: 171
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 295,
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
                        lineNumber: 297,
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
                        lineNumber: 298,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Net cash flow",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(accountAnalysis.netCashFlow, currency),
                        detail: "Calculated from imported transaction activity",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeftRight$3e$__["ArrowLeftRight"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 299,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Average monthly spending",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(accountAnalysis.averageMonthlySpending, currency),
                        detail: "Observed calendar months",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingDown$3e$__["TrendingDown"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 300,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 296,
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
                                lineNumber: 303,
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
                                                    lineNumber: 303,
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
                                                    lineNumber: 303,
                                                    columnNumber: 474
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 303,
                                            columnNumber: 357
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-ink",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(Math.abs(item.amount), currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 303,
                                            columnNumber: 560
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 303,
                                    columnNumber: 241
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "No eligible expenses recorded."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 303,
                                    columnNumber: 694
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 303,
                                columnNumber: 672
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 303,
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
                                lineNumber: 304,
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
                                            lineNumber: 304,
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
                                            lineNumber: 304,
                                            columnNumber: 400
                                        }, this)
                                    ]
                                }, item.month, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 304,
                                    columnNumber: 215
                                }, this)),
                            accountAnalysis.expenditureChanges.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "Import more than one month to compare expenditure."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 304,
                                    columnNumber: 726
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 304,
                                columnNumber: 704
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 304,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 302,
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
                                        lineNumber: 308,
                                        columnNumber: 31
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-500",
                                        children: "Choose a category to correct it; manual categories are protected from automatic rules."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 308,
                                        columnNumber: 94
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 308,
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
                                                        lineNumber: 310,
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
                                                        lineNumber: 310,
                                                        columnNumber: 128
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 310,
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
                                                        lineNumber: 311,
                                                        columnNumber: 323
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 311,
                                                columnNumber: 11
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `hidden text-right text-xs font-semibold sm:block ${item.type === "income" || item.type === "refund" ? "text-emerald-700" : "text-ink"}`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(item.amount, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 312,
                                                columnNumber: 11
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 309,
                                        columnNumber: 74
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 309,
                                columnNumber: 9
                            }, this),
                            recent.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "No transactions in this currency."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 314,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 307,
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
                                lineNumber: 317,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-5 text-slate-500",
                                children: "Enabled rules categorize matching merchants or descriptions. Manual corrections always take precedence."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 318,
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
                                        lineNumber: 320,
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
                                                        lineNumber: 322,
                                                        columnNumber: 252
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 322,
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
                                                        lineNumber: 323,
                                                        columnNumber: 220
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "merchant",
                                                        children: "Merchant"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 272
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "description",
                                                        children: "Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 323,
                                                        columnNumber: 314
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 323,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 321,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full rounded-lg bg-ink px-3 py-2.5 text-xs font-semibold text-white hover:bg-slate-700",
                                        type: "submit",
                                        children: "Add classification rule"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 325,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 319,
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
                                                        lineNumber: 327,
                                                        columnNumber: 204
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: rule.keyword
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/financial-app.tsx",
                                                                lineNumber: 327,
                                                                columnNumber: 344
                                                            }, this),
                                                            " → ",
                                                            rule.category
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 317
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 327,
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
                                                    lineNumber: 327,
                                                    columnNumber: 563
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 327,
                                                columnNumber: 408
                                            }, this)
                                        ]
                                    }, rule.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 327,
                                        columnNumber: 78
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 327,
                                columnNumber: 9
                            }, this),
                            rules.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-xs text-slate-400",
                                children: "No custom rules yet."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 328,
                                columnNumber: 32
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 316,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 306,
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
                                            lineNumber: 332,
                                            columnNumber: 256
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 332,
                                        columnNumber: 162
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: account
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 332,
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
                                                lineNumber: 332,
                                                columnNumber: 341
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 332,
                                        columnNumber: 283
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 332,
                                columnNumber: 121
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-[11px] leading-5 text-slate-400",
                                children: "Activity only; not a current or confirmed account balance."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 332,
                                columnNumber: 515
                            }, this)
                        ]
                    }, account, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 332,
                        columnNumber: 34
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 331,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 294,
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
                lineNumber: 343,
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
                                lineNumber: 345,
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
                                                lineNumber: 345,
                                                columnNumber: 265
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg font-semibold text-ink",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(plan.monthlyIncome, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 345,
                                                columnNumber: 321
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 345,
                                        columnNumber: 260
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: "Current monthly savings"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 345,
                                                columnNumber: 430
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-lg font-semibold text-ink",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(plan.currentMonthlySavings, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 345,
                                                columnNumber: 495
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 345,
                                        columnNumber: 425
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-slate-500",
                                                children: "Potential from listed actions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 345,
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
                                                lineNumber: 345,
                                                columnNumber: 683
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 345,
                                        columnNumber: 607
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 345,
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
                                                lineNumber: 345,
                                                columnNumber: 1072
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 345,
                                        columnNumber: 996
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white",
                                        type: "submit",
                                        children: "Save target"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 345,
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
                                        lineNumber: 345,
                                        columnNumber: 1424
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 345,
                                columnNumber: 813
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 345,
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
                                lineNumber: 346,
                                columnNumber: 80
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-3xl font-semibold text-ink",
                                children: recurring.length
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 346,
                                columnNumber: 161
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-5 text-slate-400",
                                children: "At least three similar dated transactions; confirm before acting."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 346,
                                columnNumber: 235
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 346,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 344,
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
                        lineNumber: 348,
                        columnNumber: 94
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Estimated monthly amounts are illustrative, not promised savings."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 348,
                        columnNumber: 159
                    }, this),
                    opportunities.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 divide-y divide-slate-100",
                        children: opportunities.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
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
                                                    lineNumber: 349,
                                                    columnNumber: 241
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs leading-5 text-slate-500",
                                                    children: item.explanation
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 305
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-[11px] leading-5 text-slate-400",
                                                    children: [
                                                        "Assumption: ",
                                                        item.assumption
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 380
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
                                                    lineNumber: 349,
                                                    columnNumber: 470
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 349,
                                            columnNumber: 214
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
                                            lineNumber: 349,
                                            columnNumber: 632
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 349,
                                    columnNumber: 148
                                }, this)
                            }, item.id, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 349,
                                columnNumber: 108
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 349,
                        columnNumber: 31
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "No specific savings opportunities meet the current evidence thresholds. Import more history or review your budget."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 349,
                            columnNumber: 848
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 349,
                        columnNumber: 826
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 348,
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
                        lineNumber: 351,
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
                                            lineNumber: 351,
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
                                            lineNumber: 351,
                                            columnNumber: 374
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 351,
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
                                    lineNumber: 351,
                                    columnNumber: 532
                                }, this)
                            ]
                        }, item.key, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 351,
                            columnNumber: 193
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "No recurring payment pattern is supported by at least three transactions."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 351,
                            columnNumber: 662
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 351,
                        columnNumber: 640
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 351,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 342,
        columnNumber: 10
    }, this);
}
_s2(SavingsPage, "qgUhrDbR81On7Dybu76grAzMiHU=");
_c17 = SavingsPage;
function BudgetPage({ transactions, currency, budgets, onSaveBudget, target, onSaveTarget }) {
    _s3();
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const suggestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["suggestBudgetLimits"])(transactions, currency);
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
                lineNumber: 361,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 flex flex-wrap items-end justify-between gap-4 rounded-xl border border-blue-100 bg-blue-50/70 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "max-w-xl text-xs leading-5 text-blue-800",
                        children: "Suggested limits are 110% of average observed spending over the latest three available months. Edit any limit; budgets are personal targets, not financial advice."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 363,
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
                                        lineNumber: 364,
                                        columnNumber: 252
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 364,
                                columnNumber: 175
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "rounded-lg bg-ink px-3 py-2.5 text-xs font-semibold text-white",
                                type: "submit",
                                children: "Save goal"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 364,
                                columnNumber: 516
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
                className: "rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-[1fr_90px_110px] gap-2 border-b border-slate-100 pb-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:grid-cols-[1fr_130px_150px_150px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Category"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 366,
                                columnNumber: 277
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "Actual"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 366,
                                columnNumber: 298
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-right",
                                children: "Limit"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 366,
                                columnNumber: 340
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:block",
                                children: "Budget status"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 366,
                                columnNumber: 381
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 366,
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
                                                    lineNumber: 374,
                                                    columnNumber: 219
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-[10px] text-slate-400",
                                                    children: suggestion ? `Suggested ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(suggestion.monthlyLimit, currency)} · ${suggestion.monthsUsed} month(s)` : "No history-based suggestion"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 284
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 374,
                                            columnNumber: 194
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right text-xs text-slate-600",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(actual, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 374,
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
                                            lineNumber: 374,
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
                                                    lineNumber: 374,
                                                    columnNumber: 1134
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 374,
                                                columnNumber: 1069
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 374,
                                            columnNumber: 1022
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 374,
                                    columnNumber: 89
                                }, this),
                                limit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `mt-2 text-[11px] ${result.isOverBudget ? "text-brand" : "text-emerald-700"}`,
                                    children: result.isOverBudget ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(result.overspent, currency)} over budget` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(result.remaining, currency)} remaining`
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 375,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, name, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 374,
                            columnNumber: 16
                        }, this);
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "Import more expenses to receive historical budget suggestions."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 377,
                            columnNumber: 34
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 377,
                        columnNumber: 12
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 366,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 360,
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
                description: "Portfolio values use prices you enter manually; no live market data is fetched or inferred."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 398,
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
                        lineNumber: 399,
                        columnNumber: 48
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Current portfolio value",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(portfolio.currentValue, currency),
                        detail: "Quantity × manually entered current price",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 399,
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
                        lineNumber: 399,
                        columnNumber: 375
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 399,
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
                                lineNumber: 401,
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
                                lineNumber: 401,
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
                                                            lineNumber: 402,
                                                            columnNumber: 339
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 402,
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
                                                    lineNumber: 402,
                                                    columnNumber: 407
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 402,
                                            columnNumber: 244
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-right text-xs text-slate-600",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(holding.value, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 402,
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
                                            lineNumber: 402,
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
                                                lineNumber: 402,
                                                columnNumber: 1211
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 402,
                                            columnNumber: 1058
                                        }, this)
                                    ]
                                }, holding.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 402,
                                    columnNumber: 124
                                }, this);
                            }),
                            !portfolio.allocation.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "Add a stock or ETF holding to calculate manually priced portfolio value and asset allocation."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 403,
                                    columnNumber: 64
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 403,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-[10px] text-slate-400",
                                children: "Current prices are user-entered estimates, not live data or investment advice."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 404,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 401,
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
                                lineNumber: 406,
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
                                                lineNumber: 407,
                                                columnNumber: 61
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 407,
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
                                                lineNumber: 408,
                                                columnNumber: 59
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 408,
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
                                                lineNumber: 409,
                                                columnNumber: 63
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 409,
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
                                                lineNumber: 410,
                                                columnNumber: 82
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 410,
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
                                                lineNumber: 411,
                                                columnNumber: 81
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 411,
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
                                                lineNumber: 412,
                                                columnNumber: 68
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 412,
                                        columnNumber: 9
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "col-span-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white",
                                        type: "submit",
                                        children: "Add manually priced holding"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 413,
                                        columnNumber: 9
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 406,
                                columnNumber: 141
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 406,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 400,
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
                        lineNumber: 416,
                        columnNumber: 117
                    }, this),
                    investmentRows.slice(0, 8).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                            currency: currency,
                            item: item
                        }, item.id, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 416,
                            columnNumber: 236
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 416,
                columnNumber: 35
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 397,
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
                lineNumber: 432,
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
                                        lineNumber: 433,
                                        columnNumber: 227
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"], {
                                        className: "text-brand",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 433,
                                        columnNumber: 312
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 433,
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
                                                lineNumber: 433,
                                                columnNumber: 417
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-emerald-700",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(horizon.projectedIncome, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 433,
                                                columnNumber: 479
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 433,
                                        columnNumber: 412
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-500",
                                                children: "Projected expenses incl. bills"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 433,
                                                columnNumber: 601
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-ink",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(horizon.projectedExpenses, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 433,
                                                columnNumber: 677
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 433,
                                        columnNumber: 596
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-500",
                                                children: "Known upcoming bills"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 433,
                                                columnNumber: 793
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm font-semibold text-ink",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(horizon.knownBills, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 433,
                                                columnNumber: 859
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 433,
                                        columnNumber: 788
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-500",
                                                children: "Projected net flow"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 433,
                                                columnNumber: 968
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `mt-1 text-sm font-semibold ${horizon.projectedNetFlow >= 0 ? "text-emerald-700" : "text-brand"}`,
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatMoney"])(horizon.projectedNetFlow, currency)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 433,
                                                columnNumber: 1032
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 433,
                                        columnNumber: 963
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 433,
                                columnNumber: 367
                            }, this)
                        ]
                    }, horizon.days, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 433,
                        columnNumber: 84
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 433,
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
                        lineNumber: 434,
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
                        lineNumber: 434,
                        columnNumber: 151
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-3 list-disc space-y-2 pl-5 text-xs leading-5 text-slate-600",
                        children: forecast.assumptions.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: item
                            }, item, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 434,
                                columnNumber: 402
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 434,
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
                                        lineNumber: 434,
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
                                            lineNumber: 434,
                                            columnNumber: 610
                                        }, this)),
                                    !forecast.recurringIncomeFlows.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-slate-400",
                                        children: "No recurring income pattern detected."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 434,
                                        columnNumber: 780
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 434,
                                columnNumber: 483
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-xs font-semibold text-ink",
                                        children: "Recurring expenses included"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 434,
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
                                            lineNumber: 434,
                                            columnNumber: 1001
                                        }, this)),
                                    !forecast.recurringExpenseFlows.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-slate-400",
                                        children: "No recurring expense pattern detected."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 434,
                                        columnNumber: 1172
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 434,
                                columnNumber: 871
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 434,
                        columnNumber: 435
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 434,
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
                                lineNumber: 435,
                                columnNumber: 142
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: "Bills inside a horizon are added unless they match an identified recurring expense."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 435,
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
                                        lineNumber: 435,
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
                                                lineNumber: 435,
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
                                                lineNumber: 435,
                                                columnNumber: 884
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 435,
                                        columnNumber: 586
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white",
                                        type: "submit",
                                        children: "Add bill"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 435,
                                        columnNumber: 1135
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 435,
                                columnNumber: 332
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 435,
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
                                lineNumber: 435,
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
                                                    lineNumber: 435,
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
                                                    lineNumber: 435,
                                                    columnNumber: 1720
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 435,
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
                                                    lineNumber: 435,
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
                                                        lineNumber: 435,
                                                        columnNumber: 2063
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 1924
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 435,
                                            columnNumber: 1791
                                        }, this)
                                    ]
                                }, bill.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 435,
                                    columnNumber: 1540
                                }, this)),
                            !bills.some((bill)=>bill.currency === currency) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "No bills entered yet."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 435,
                                    columnNumber: 2177
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 435,
                                columnNumber: 2155
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 435,
                        columnNumber: 1275
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 435,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 431,
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
                lineNumber: 500,
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
                                    lineNumber: 500,
                                    columnNumber: 464
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 500,
                                columnNumber: 374
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-ink",
                                        children: "Luma assistant"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 500,
                                        columnNumber: 493
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-slate-400",
                                        children: "Your data stays on this device · Not financial advice"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 500,
                                        columnNumber: 557
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 500,
                                columnNumber: 488
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-1.5 w-1.5 rounded-full bg-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 500,
                                        columnNumber: 796
                                    }, this),
                                    " Private session"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 500,
                                columnNumber: 662
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 500,
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
                                    lineNumber: 500,
                                    columnNumber: 1098
                                }, this)
                            }, index, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 500,
                                columnNumber: 1001
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 500,
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
                                            lineNumber: 500,
                                            columnNumber: 1759
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 500,
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
                                        lineNumber: 500,
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
                                            lineNumber: 500,
                                            columnNumber: 2290
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 500,
                                        columnNumber: 2125
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 500,
                                columnNumber: 1353
                            }, this),
                            speechError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-amber-700",
                                children: speechError
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 500,
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
                                        lineNumber: 500,
                                        columnNumber: 2537
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 500,
                                columnNumber: 2400
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 500,
                        columnNumber: 1306
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 500,
                columnNumber: 179
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 500,
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
                                    lineNumber: 505,
                                    columnNumber: 301
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-slate-500",
                                    children: "Your transaction data lives in this browser."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 505,
                                    columnNumber: 367
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 505,
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
                                lineNumber: 505,
                                columnNumber: 593
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 505,
                            columnNumber: 464
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 505,
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
                                    lineNumber: 505,
                                    columnNumber: 733
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold text-ink",
                                    children: transactions.length
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 505,
                                    columnNumber: 800
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 505,
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
                                    lineNumber: 505,
                                    columnNumber: 1013
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "CSV files are processed in your browser and stored in IndexedDB. This prototype does not connect to a bank or send transaction data to a server."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 505,
                                    columnNumber: 1066
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 505,
                            columnNumber: 883
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-ink hover:bg-slate-50",
                            onClick: onImport,
                            type: "button",
                            children: "Import more CSV files"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 505,
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
                            lineNumber: 505,
                            columnNumber: 1407
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 505,
                    columnNumber: 623
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 505,
            columnNumber: 128
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 505,
        columnNumber: 10
    }, this);
}
_s7(SettingsModal, "oKwWRXMu3ImEqF+0UoU9UcufOzQ=");
_c22 = SettingsModal;
function FinancialApp() {
    _s8();
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [section, setSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Overview");
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
        setSection("Overview");
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
        setSection("Overview");
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
                    lineNumber: 675,
                    columnNumber: 160
                }, this),
                "Opening your private workspace…"
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 675,
            columnNumber: 96
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 675,
        columnNumber: 23
    }, this);
    if (!transactions.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Onboarding, {
        error: error,
        onDemo: showDemo,
        onImported: handleImport
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 676,
        columnNumber: 36
    }, this);
    const currencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intelligence$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(transactions);
    const selectedCurrency = currencies.includes(currency) ? currency : currencies[0] ?? "CHF";
    const MainIcon = navigation.find((item)=>item.name === section)?.icon ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"];
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
                                lineNumber: 685,
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
                                    lineNumber: 685,
                                    columnNumber: 233
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 685,
                                columnNumber: 73
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 685,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400",
                        children: "Your workspace"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 686,
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
                                        lineNumber: 687,
                                        columnNumber: 384
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: name
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 687,
                                        columnNumber: 445
                                    }, this),
                                    name === "AI Assistant" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto rounded-md bg-violet-50 px-1.5 py-0.5 text-[9px] font-semibold text-violet-600",
                                        children: "NEW"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 687,
                                        columnNumber: 492
                                    }, this)
                                ]
                            }, name, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 687,
                                columnNumber: 83
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 687,
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
                                            lineNumber: 689,
                                            columnNumber: 161
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 689,
                                        columnNumber: 62
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs font-semibold text-ink",
                                        children: "Private by design"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 689,
                                        columnNumber: 192
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[10px] leading-4 text-slate-500",
                                        children: "Your financial data stays on this device."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 689,
                                        columnNumber: 264
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 689,
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
                                        lineNumber: 690,
                                        columnNumber: 209
                                    }, this),
                                    " Privacy & settings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 690,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 px-3 text-[9px] leading-4 text-slate-400",
                                children: "Independent prototype · Not affiliated with PostFinance"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 691,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 688,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 684,
                columnNumber: 7
            }, this),
            mobileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "Close menu overlay",
                className: "fixed inset-0 z-30 bg-ink/30 lg:hidden",
                onClick: ()=>setMobileMenu(false),
                type: "button"
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 694,
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
                                            lineNumber: 698,
                                            columnNumber: 210
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 698,
                                        columnNumber: 52
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden items-center gap-2 text-xs text-slate-400 sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Workspace"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 698,
                                                columnNumber: 311
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "/"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 698,
                                                columnNumber: 333
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-ink",
                                                children: section
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 698,
                                                columnNumber: 347
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 698,
                                        columnNumber: 237
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sm:hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {}, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 698,
                                            columnNumber: 437
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 698,
                                        columnNumber: 410
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 698,
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
                                                lineNumber: 699,
                                                columnNumber: 199
                                            }, this),
                                            " Local & secure"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 699,
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
                                            lineNumber: 699,
                                            columnNumber: 459
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 699,
                                        columnNumber: 281
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-8 w-8 items-center justify-center rounded-full bg-[#edf0f5] text-xs font-semibold text-slate-600",
                                        children: "JD"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 699,
                                        columnNumber: 491
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 699,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 697,
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
                                        lineNumber: 702,
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
                                            lineNumber: 702,
                                            columnNumber: 249
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 702,
                                        columnNumber: 171
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 702,
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
                                        lineNumber: 704,
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
                                        lineNumber: 705,
                                        columnNumber: 43
                                    }, this),
                                    section === "Smart Savings" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SavingsPage, {
                                        currency: selectedCurrency,
                                        onSaveTarget: saveTarget,
                                        target: savingsTargets.find((item)=>item.currency === selectedCurrency),
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 706,
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
                                        lineNumber: 707,
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
                                        lineNumber: 708,
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
                                        lineNumber: 709,
                                        columnNumber: 50
                                    }, this),
                                    section === "AI Assistant" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssistantPage, {
                                        currency: selectedCurrency,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 710,
                                        columnNumber: 44
                                    }, this)
                                ]
                            }, section, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 703,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                className: "mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-4 text-[10px] leading-4 text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Informational tool only · Not financial advice"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 712,
                                        columnNumber: 158
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Prototype independent from PostFinance · Calculations use imported records only"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 712,
                                        columnNumber: 217
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 712,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 701,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 696,
                columnNumber: 7
            }, this),
            importOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-ink/35 p-3 backdrop-blur-sm sm:p-5",
                onClick: ()=>setImportOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "my-auto w-full max-w-4xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7",
                    onClick: (event)=>event.stopPropagation(),
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
                                            lineNumber: 716,
                                            columnNumber: 376
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-1 text-xl font-semibold text-ink",
                                            children: "Add transactions"
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 716,
                                            columnNumber: 464
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-slate-500",
                                            children: "Select the matching columns for each file before import."
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 716,
                                            columnNumber: 537
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 716,
                                    columnNumber: 371
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    "aria-label": "Close import dialog",
                                    className: "rounded-lg p-2 text-slate-400 hover:bg-slate-100",
                                    onClick: ()=>setImportOpen(false),
                                    type: "button",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 716,
                                        columnNumber: 799
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 716,
                                    columnNumber: 646
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 716,
                            columnNumber: 316
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CsvImporter"], {
                            onClose: ()=>setImportOpen(false),
                            onImport: handleImport
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 716,
                            columnNumber: 829
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 716,
                    columnNumber: 182
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 716,
                columnNumber: 22
            }, this),
            settingsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsModal, {
                onClear: handleClear,
                onClose: ()=>setSettingsOpen(false),
                onImport: importFromSettings,
                transactions: transactions
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 717,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 683,
        columnNumber: 5
    }, this);
}
_s8(FinancialApp, "eWRSC2yM9AH0aIpT+suKQrgKuHA=");
_c23 = FinancialApp;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22, _c23;
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
__turbopack_context__.k.register(_c23, "FinancialApp");
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
    if (mapping.type || mapping.debit || mapping.credit || !mapping.amount) return false;
    const amounts = file.rows.map((row)=>parseAmount(cell(row, mapping.amount))).filter((amount)=>amount !== undefined);
    return amounts.some((amount)=>amount > 0) && amounts.every((amount)=>amount >= 0);
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
            originalAmount = (creditRaw ?? 0) - Math.abs(debitRaw ?? 0);
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
    for(let month = 0; month < 12; month += 1){
        const date = new Date(2025, month, 1);
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
]);

//# sourceMappingURL=_16o4clbmbbinq._.js.map