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
            const normalized = files.map(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeRows"]);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$audio$2d$lines$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AudioLines$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/audio-lines.js [app-client] (ecmascript) <export default as AudioLines>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2d$business$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseBusiness$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase-business.js [app-client] (ecmascript) <export default as BriefcaseBusiness>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-days.js [app-client] (ecmascript) <export default as CalendarDays>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-client] (ecmascript) <export default as CircleHelp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock-3.js [app-client] (ecmascript) <export default as Clock3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-up.js [app-client] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart-pulse.js [app-client] (ecmascript) <export default as HeartPulse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-client] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as LoaderCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings-2.js [app-client] (ecmascript) <export default as Settings2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/finance.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
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
                    lineNumber: 34,
                    columnNumber: 169
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 34,
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
                                lineNumber: 34,
                                columnNumber: 288
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 34,
                        columnNumber: 223
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "-mt-0.5 text-[10px] font-medium tracking-wide text-slate-400",
                        children: "MONEY, IN FOCUS"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 34,
                        columnNumber: 329
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 34,
                columnNumber: 218
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 34,
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
                        lineNumber: 41,
                        columnNumber: 39
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                className: "pointer-events-none absolute right-2.5 top-2.5 text-slate-400",
                size: 14
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 39,
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
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `flex h-9 w-9 items-center justify-center rounded-xl ${tones[tone]}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 17
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 54,
                            columnNumber: 96
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 52,
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
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    badge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mb-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700",
                        children: badge
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 58,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-xs leading-5 text-slate-400",
                children: detail
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 51,
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
                        lineNumber: 66,
                        columnNumber: 96
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-semibold tracking-tight text-ink sm:text-[28px]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 66,
                        columnNumber: 191
                    }, this),
                    description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-sm text-slate-500",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 66,
                        columnNumber: 297
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 66,
                columnNumber: 79
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 66,
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
                            lineNumber: 73,
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
                                    lineNumber: 73,
                                    columnNumber: 219
                                }, this),
                                " Private by design"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 73,
                            columnNumber: 71
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    role: "alert",
                    className: "mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 74,
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
                                lineNumber: 76,
                                columnNumber: 114
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand",
                            children: "A clearer view of your finances"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 77,
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
                                    lineNumber: 78,
                                    columnNumber: 131
                                }, this),
                                " Let's make it make sense."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-base",
                            children: "Bring your transactions together to discover spending patterns, plan with confidence, and find room to save. Your data stays on this device."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 75,
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
                                            lineNumber: 82,
                                            columnNumber: 78
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-slate-500",
                                            children: "Upload one or more account exports in CSV format."
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 82,
                                            columnNumber: 167
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 82,
                                    columnNumber: 73
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 sm:flex",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                        size: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 82,
                                        columnNumber: 378
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 82,
                                    columnNumber: 269
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CsvImporter"], {
                            onImport: onImported
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 83,
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
                                            lineNumber: 85,
                                            columnNumber: 62
                                        }, this),
                                        " Stored locally in your browser"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:block",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 85,
                                    columnNumber: 125
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Nothing is sent to a bank or server"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 85,
                                    columnNumber: 167
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden sm:block",
                                    children: "·"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 85,
                                    columnNumber: 215
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "CSV files only"
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 85,
                                    columnNumber: 257
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 81,
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
                            lineNumber: 89,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "shrink-0 text-xs font-semibold text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-ink",
                            onClick: onDemo,
                            type: "button",
                            children: "Explore demo data"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 88,
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
                                    lineNumber: 93,
                                    columnNumber: 280
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm font-semibold text-ink",
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 93,
                                    columnNumber: 346
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-slate-500",
                                    children: copy
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 93,
                                    columnNumber: 408
                                }, this)
                            ]
                        }, title, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 93,
                            columnNumber: 196
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 71,
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
                lineNumber: 102,
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
                            lineNumber: 102,
                            columnNumber: 266
                        }, this),
                        item.name,
                        ": ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(item.value ?? 0, currency)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 102,
                            columnNumber: 360
                        }, this)
                    ]
                }, item.name, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 102,
                    columnNumber: 184
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 102,
        columnNumber: 10
    }, this);
}
_c5 = ChartTooltip;
function Insights({ transactions, currency, latestMonth }) {
    const summaries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlySummaries"])(transactions, currency, latestMonth).filter((item)=>item.income || item.expenses);
    const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["summarizeMonth"])(transactions.filter((item)=>item.currency === currency), latestMonth);
    const recurring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectRecurring"])(transactions.filter((item)=>item.currency === currency));
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency));
    const rate = current.income ? current.savings / current.income : 0;
    const tips = [];
    if (current.income && rate >= 0.2) {
        tips.push({
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
            title: "You’re building a healthy buffer",
            copy: `You kept ${Math.round(rate * 100)}% of income in ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monthLabel"])(latestMonth)}. Keep that steady rhythm going.`,
            tone: "green"
        });
    } else if (current.income && rate > 0) {
        tips.push({
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"],
            title: "A little more breathing room",
            copy: `Your ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monthLabel"])(latestMonth)} savings rate was ${Math.round(rate * 100)}%. A small recurring transfer could make saving more consistent.`,
            tone: "amber"
        });
    }
    const largest = categories[0];
    if (largest) {
        tips.push({
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"],
            title: `${largest.name} is your biggest spend`,
            copy: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(largest.value, currency)} across the latest 12 months. Consider a monthly cap that still feels comfortable.`,
            tone: "blue"
        });
    }
    const regular = recurring[0];
    if (regular) {
        tips.push({
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__["Clock3"],
            title: `${regular.merchant || regular.description} looks recurring`,
            copy: `Seen ${regular.occurrenceCount} times, averaging ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(regular.averageAmount, currency)}. Review it if it no longer fits.`,
            tone: "violet"
        });
    }
    if (summaries.length < 3) {
        tips.unshift({
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__["CircleHelp"],
            title: "More history makes insights stronger",
            copy: "Import a few more months of activity to make patterns and recurring payments easier to spot.",
            tone: "blue"
        });
    }
    return tips.slice(0, 3);
}
_c6 = Insights;
function Dashboard({ transactions, currency, onCurrency, onNavigate, onImport }) {
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const latest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["summarizeMonth"])(transactions.filter((item)=>item.currency === currency), latestMonth);
    const summaries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlySummaries"])(transactions.filter((item)=>item.currency === currency), currency, latestMonth);
    const annualCategories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && item.date.slice(0, 4) === latestMonth.slice(0, 4)));
    const recent = [
        ...transactions
    ].filter((item)=>item.currency === currency && item.type !== "transfer").sort((a, b)=>b.date.localeCompare(a.date)).slice(0, 6);
    const insights = Insights({
        transactions,
        currency,
        latestMonth
    });
    const recurring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectRecurring"])(transactions.filter((item)=>item.currency === currency));
    const savingsRate = latest.income ? latest.savings / latest.income : 0;
    const totalOutflow = summaries.reduce((sum, item)=>sum + item.expenses, 0);
    const currentYear = latestMonth.slice(0, 4);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Your financial snapshot",
                title: `Good ${new Date().getHours() < 12 ? "morning" : "afternoon"}.`,
                description: `Here’s your money at a glance for ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monthLabel"])(latestMonth)}.`,
                action: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrencySelect, {
                            currencies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(transactions),
                            value: currency,
                            onChange: onCurrency
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 144,
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
                                    lineNumber: 144,
                                    columnNumber: 542
                                }, this),
                                " Import CSV"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 144,
                            columnNumber: 352
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 144,
                    columnNumber: 213
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            transactions.some((item)=>item.description.includes("DEMO DATA")) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800",
                children: "DEMO DATA · Synthetic transactions are shown for preview only."
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 145,
                columnNumber: 79
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Income",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(latest.income, currency),
                        detail: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monthLabel"])(latestMonth),
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__["ArrowDownLeft"],
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Expenses",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(latest.expenses, currency),
                        detail: "Consumer spending, net of refunds",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"],
                        tone: "red"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Available cash balance",
                        value: "Not available",
                        detail: "No confirmed balance in uploaded files",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Monthly savings",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(latest.savings, currency),
                        detail: "Income less consumer spending · calculated",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 150,
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
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 146,
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
                                                lineNumber: 156,
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
                                                lineNumber: 156,
                                                columnNumber: 150
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 156,
                                        columnNumber: 82
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-500",
                                        children: "Last 12 months"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 156,
                                        columnNumber: 236
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 156,
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
                                                lineNumber: 160,
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
                                                lineNumber: 161,
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
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                                    currency: currency
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 35
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 163,
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
                                                lineNumber: 164,
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
                                                lineNumber: 165,
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
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 155,
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
                                        lineNumber: 172,
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
                                        lineNumber: 172,
                                        columnNumber: 97
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 172,
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
                                                                lineNumber: 176,
                                                                columnNumber: 224
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 35
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                        formatter: (value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(Number(value), currency)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 176,
                                                        columnNumber: 304
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 175,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 174,
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
                                                        lineNumber: 179,
                                                        columnNumber: 163
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "min-w-0 flex-1 truncate text-[11px] text-slate-500",
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 282
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] font-semibold text-ink",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(item.value, currency, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 179,
                                                        columnNumber: 369
                                                    }, this)
                                                ]
                                            }, item.name, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 179,
                                                columnNumber: 106
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 173,
                                columnNumber: 38
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "Category insights appear as transactions are categorized."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 180,
                                columnNumber: 20
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-slate-100 pt-3 text-xs text-slate-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-ink",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(totalOutflow, currency)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 181,
                                        columnNumber: 82
                                    }, this),
                                    " total recorded outflow in the chart period"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 154,
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
                                        lineNumber: 186,
                                        columnNumber: 85
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs text-slate-500",
                                        children: "Monthly net flow; transfers between accounts excluded"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 186,
                                        columnNumber: 153
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 186,
                                columnNumber: 80
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1.5 text-[11px] text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-2 w-2 rounded-full bg-brand"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 186,
                                        columnNumber: 337
                                    }, this),
                                    " Net flow"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 186,
                                columnNumber: 259
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 186,
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
                                                    lineNumber: 187,
                                                    columnNumber: 240
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "100%",
                                                    stopColor: "#d92e3a",
                                                    stopOpacity: 0.01
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 299
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 187,
                                            columnNumber: 178
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 187,
                                        columnNumber: 172
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                                        stroke: "#eef1f4",
                                        strokeDasharray: "3 5",
                                        vertical: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 187,
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
                                        lineNumber: 187,
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
                                        lineNumber: 187,
                                        columnNumber: 564
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                            currency: currency
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 187,
                                            columnNumber: 732
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 187,
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
                                        lineNumber: 187,
                                        columnNumber: 772
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 187,
                                columnNumber: 91
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 187,
                            columnNumber: 43
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 185,
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
                                                lineNumber: 192,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "Latest activity across selected currency"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 192,
                                                columnNumber: 135
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 192,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs font-semibold text-brand hover:text-rose-700",
                                        onClick: ()=>onNavigate("My Accounts"),
                                        type: "button",
                                        children: "View all"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 192,
                                        columnNumber: 228
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            recent.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-slate-100",
                                children: recent.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                                        currency: currency,
                                        item: item
                                    }, item.id, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 193,
                                        columnNumber: 93
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 193,
                                columnNumber: 28
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "No transactions are available in this currency."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 193,
                                columnNumber: 168
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 191,
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
                                            lineNumber: 196,
                                            columnNumber: 156
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 196,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-ink",
                                                children: "A few things we noticed"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 196,
                                                columnNumber: 190
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-400",
                                                children: "Based on your uploaded history"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 196,
                                                columnNumber: 257
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 196,
                                        columnNumber: 185
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: insights.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InsightCard, {
                                        ...item
                                    }, item.title, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 197,
                                        columnNumber: 62
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 197,
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
                                        lineNumber: 198,
                                        columnNumber: 202
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 190,
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
                                                lineNumber: 204,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "A simple read on your latest month"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 204,
                                                columnNumber: 132
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 204,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$pulse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartPulse$3e$__["HeartPulse"], {
                                        className: "text-brand",
                                        size: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 204,
                                        columnNumber: 219
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 204,
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
                                            lineNumber: 205,
                                            columnNumber: 200
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 205,
                                        columnNumber: 79
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-ink",
                                                children: savingsRate >= 0.2 ? "Good savings momentum" : savingsRate > 0 ? "Room to grow your buffer" : "Keep an eye on cash flow"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 205,
                                                columnNumber: 295
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs leading-5 text-slate-500",
                                                children: "Savings rate is based on recorded income and eligible spending. It is not a credit or solvency score."
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 205,
                                                columnNumber: 467
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 205,
                                        columnNumber: 290
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 205,
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
                                        lineNumber: 206,
                                        columnNumber: 75
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-slate-500",
                                        children: "Not included in CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 206,
                                        columnNumber: 140
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 203,
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
                                                lineNumber: 209,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-slate-500",
                                                children: "Possible patterns from repeat transactions"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 209,
                                                columnNumber: 143
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 209,
                                        columnNumber: 67
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__["Clock3"], {
                                        className: "text-slate-400",
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 209,
                                        columnNumber: 238
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 209,
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
                                                            lineNumber: 210,
                                                            columnNumber: 361
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 210,
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
                                                                lineNumber: 210,
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
                                                                lineNumber: 210,
                                                                columnNumber: 509
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 392
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 210,
                                                columnNumber: 205
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "shrink-0 text-sm font-semibold text-ink",
                                                children: [
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(item.averageAmount, currency),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-normal text-slate-400",
                                                        children: " / avg"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/financial-app.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 719
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 210,
                                                columnNumber: 618
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 210,
                                        columnNumber: 95
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 210,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                text: "Repeat payments will appear after at least three matching transactions."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 210,
                                columnNumber: 813
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 143,
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
                lineNumber: 220,
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
                        lineNumber: 220,
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
                        lineNumber: 220,
                        columnNumber: 379
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 220,
                columnNumber: 255
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-sm font-semibold ${positive ? "text-emerald-700" : "text-ink"}`,
                children: [
                    positive ? "+" : "−",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(Math.abs(item.amount), currency)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 220,
                columnNumber: 551
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 220,
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
                    lineNumber: 225,
                    columnNumber: 194
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 225,
                columnNumber: 77
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold text-ink",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 225,
                        columnNumber: 224
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] leading-[1.55] text-slate-500",
                        children: copy
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 225,
                        columnNumber: 281
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 225,
                columnNumber: 219
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 225,
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
        lineNumber: 229,
        columnNumber: 10
    }, this);
}
_c10 = EmptyState;
function AccountsPage({ transactions, currency, onCurrency, onImport }) {
    _s();
    const accounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountsPage.useMemo[accounts]": ()=>[
                ...new Set(transactions.filter({
                    "AccountsPage.useMemo[accounts]": (item)=>item.currency === currency
                }["AccountsPage.useMemo[accounts]"]).map({
                    "AccountsPage.useMemo[accounts]": (item)=>item.account
                }["AccountsPage.useMemo[accounts]"]))
            ]
    }["AccountsPage.useMemo[accounts]"], [
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
                            currencies: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(transactions),
                            value: currency,
                            onChange: onCurrency
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 249,
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
                                    lineNumber: 249,
                                    columnNumber: 428
                                }, this),
                                " Import CSV"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 249,
                            columnNumber: 277
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 249,
                    columnNumber: 151
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 249,
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
                                            lineNumber: 249,
                                            columnNumber: 1197
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 249,
                                        columnNumber: 1103
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700",
                                        children: "Activity imported"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 249,
                                        columnNumber: 1224
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 249,
                                columnNumber: 1053
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-5 text-lg font-semibold text-ink",
                                children: account
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 249,
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
                                lineNumber: 249,
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
                                        lineNumber: 249,
                                        columnNumber: 1582
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-ink",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(netFlow, currency)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 249,
                                        columnNumber: 1639
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 249,
                                columnNumber: 1500
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-[11px] leading-5 text-slate-400",
                                children: "Calculated from imported activity only; not a current or confirmed account balance."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 249,
                                columnNumber: 1725
                            }, this)
                        ]
                    }, account, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 249,
                        columnNumber: 966
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 249,
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
                        lineNumber: 249,
                        columnNumber: 1963
                    }, this),
                    transactions.filter((item)=>item.currency === currency).sort((a, b)=>b.date.localeCompare(a.date)).slice(0, 10).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                            currency: currency,
                            item: item
                        }, item.id, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 249,
                            columnNumber: 2166
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 249,
                columnNumber: 1885
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 249,
        columnNumber: 10
    }, this);
}
_s(AccountsPage, "XO3rZRQbsHqfzAUrjjM24XMr218=");
_c11 = AccountsPage;
function SavingsPage({ transactions, currency }) {
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && item.date.slice(0, 4) === latestMonth.slice(0, 4)));
    const recurring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectRecurring"])(transactions.filter((item)=>item.currency === currency));
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
                lineNumber: 258,
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
                                    lineNumber: 258,
                                    columnNumber: 440
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
                                columnNumber: 338
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 text-xs font-bold uppercase tracking-widest text-brand",
                                children: "A place to start"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
                                columnNumber: 469
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-2 max-w-lg text-xl font-semibold text-ink",
                                children: top ? `Review your ${top.name.toLowerCase()} spending` : "Import more transactions to find your savings opportunities"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
                                columnNumber: 564
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 max-w-lg text-sm leading-6 text-slate-500",
                                children: top ? `${top.name} is your largest spending category at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(top.value, currency)} in ${latestMonth.slice(0, 4)}. Even a modest 5% reduction would free up about ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(top.value * 0.05, currency)} over that period, if it fits your needs.` : "Your finances stay private on this device. Once activity is imported, we will highlight spending patterns and possible recurring costs."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
                                columnNumber: 750
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 258,
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
                                lineNumber: 258,
                                columnNumber: 1291
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-3 text-3xl font-semibold text-ink",
                                children: recurring.length
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
                                columnNumber: 1372
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs leading-5 text-slate-400",
                                children: "Patterns from repeated transactions; confirm these yourself before acting."
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
                                columnNumber: 1446
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 258,
                        columnNumber: 1218
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 258,
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
                                lineNumber: 258,
                                columnNumber: 1714
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: "Illustrative savings only; based on recorded spending"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
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
                                                    lineNumber: 258,
                                                    columnNumber: 2014
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-slate-500",
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(item.value, currency),
                                                        " · 5% = ",
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(item.value * 0.05, currency)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 2071
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 258,
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
                                                lineNumber: 258,
                                                columnNumber: 2265
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 258,
                                            columnNumber: 2202
                                        }, this)
                                    ]
                                }, item.name, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 258,
                                    columnNumber: 1925
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 258,
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
                                lineNumber: 258,
                                columnNumber: 2497
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-slate-500",
                                children: "Automatically spotted after three similar expenses"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
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
                                                    lineNumber: 258,
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
                                                    lineNumber: 258,
                                                    columnNumber: 2916
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 258,
                                            columnNumber: 2828
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-ink",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(item.averageAmount, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 258,
                                            columnNumber: 3017
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 258,
                                    columnNumber: 2707
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                                    text: "No repeat-payment patterns yet. These are suggestions, not payment predictions."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 258,
                                    columnNumber: 3142
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 258,
                                columnNumber: 3120
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 258,
                        columnNumber: 2420
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 258,
                columnNumber: 1589
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 258,
        columnNumber: 10
    }, this);
}
_c12 = SavingsPage;
function BudgetPage({ transactions, currency, budgets, onSaveBudget }) {
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && item.date.startsWith(latestMonth)));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                eyebrow: "Plan with intention",
                title: "Budget planner",
                description: `Set your own monthly limits. Actuals reflect ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monthLabel"])(latestMonth)}.`
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 264,
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
                        lineNumber: 264,
                        columnNumber: 299
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Budget limits are your own planning targets. No limits are assumed; add the amounts that make sense for you."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 264,
                        columnNumber: 350
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 264,
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
                                lineNumber: 264,
                                columnNumber: 738
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Actual"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 264,
                                columnNumber: 759
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Monthly limit"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 264,
                                columnNumber: 778
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 264,
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
                                                    lineNumber: 264,
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
                                                        lineNumber: 264,
                                                        columnNumber: 1416
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/financial-app.tsx",
                                                    lineNumber: 264,
                                                    columnNumber: 1318
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 264,
                                            columnNumber: 1223
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-slate-600",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(item.value, currency)
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 264,
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
                                            lineNumber: 264,
                                            columnNumber: 1638
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 264,
                                    columnNumber: 1123
                                }, this),
                                limit > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: `mt-2 pl-1 text-[11px] ${item.value > limit ? "text-brand" : "text-emerald-700"}`,
                                    children: item.value > limit ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(item.value - limit, currency)} over limit` : `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(limit - item.value, currency)} remaining`
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 264,
                                    columnNumber: 2051
                                }, this)
                            ]
                        }, item.name, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 264,
                            columnNumber: 1045
                        }, this);
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "There is no spending in this month to plan against."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 264,
                            columnNumber: 2326
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 264,
                        columnNumber: 2304
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 264,
                columnNumber: 471
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 264,
        columnNumber: 10
    }, this);
}
_c13 = BudgetPage;
function InvestmentsPage({ transactions, currency }) {
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
                lineNumber: 270,
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
                        lineNumber: 270,
                        columnNumber: 217
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Portfolio value",
                        value: "Not available",
                        detail: "No holdings or live market prices imported",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2d$business$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BriefcaseBusiness$3e$__["BriefcaseBusiness"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 270,
                        columnNumber: 384
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Investment return",
                        value: "Not calculated",
                        detail: "Purchase lots and current valuations are needed",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 270,
                        columnNumber: 522
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 270,
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
                        lineNumber: 270,
                        columnNumber: 747
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Holdings model is ready; there is no holdings CSV importer yet."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 270,
                        columnNumber: 804
                    }, this),
                    holdings.length ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            text: "Investment holdings need a dedicated CSV with ticker, quantity, purchase price, and purchase date. We won’t infer a portfolio value from transaction history."
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 270,
                            columnNumber: 962
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 270,
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
                                lineNumber: 270,
                                columnNumber: 1231
                            }, this),
                            investmentRows.slice(0, 8).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TransactionRow, {
                                    currency: currency,
                                    item: item
                                }, item.id, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 270,
                                    columnNumber: 1356
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 270,
                        columnNumber: 1178
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 270,
                columnNumber: 669
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 270,
        columnNumber: 10
    }, this);
}
_c14 = InvestmentsPage;
function ForecastPage({ transactions, currency }) {
    const latestMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const months = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMonthlySummaries"])(transactions.filter((item)=>item.currency === currency), currency, latestMonth).filter((item)=>item.income || item.expenses);
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
                lineNumber: 279,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Average monthly net flow",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(average, currency),
                        detail: `Based on ${lastThree.length} latest month${lastThree.length === 1 ? "" : "s"}`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
                        tone: average >= 0 ? "green" : "red"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 279,
                        columnNumber: 226
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Next 3 months · estimate",
                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(average * 3, currency),
                        detail: "Assumes recent monthly net flow continues",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$days$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarDays$3e$__["CalendarDays"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 279,
                        columnNumber: 458
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                        title: "Recorded balance",
                        value: "Not available",
                        detail: "A forecast cannot establish available cash",
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 279,
                        columnNumber: 620
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 279,
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
                        lineNumber: 279,
                        columnNumber: 836
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs text-slate-500",
                        children: "Recorded values are historical; dotted values are a straight-line estimate."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 279,
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
                                        lineNumber: 279,
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
                                        lineNumber: 279,
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
                                        lineNumber: 279,
                                        columnNumber: 1535
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChartTooltip, {
                                            currency: currency
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 279,
                                            columnNumber: 1637
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 279,
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
                                        lineNumber: 279,
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
                                        lineNumber: 279,
                                        columnNumber: 1801
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 279,
                                columnNumber: 1117
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 279,
                            columnNumber: 1069
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 279,
                        columnNumber: 1037
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `mt-4 rounded-xl p-4 text-xs leading-5 ${consistency ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`,
                        children: consistency ? "All three latest months show positive net flow. Future results may differ; unexpected expenses and missing records are not included." : "This estimate has limited history or inconsistent monthly results. Treat it as a rough illustration, not a prediction."
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 279,
                        columnNumber: 1994
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 279,
                columnNumber: 754
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 279,
        columnNumber: 10
    }, this);
}
_c15 = ForecastPage;
function AssistantPage({ transactions, currency }) {
    _s1();
    const month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLatestMonth"])(transactions.filter((item)=>item.currency === currency));
    const latest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["summarizeMonth"])(transactions.filter((item)=>item.currency === currency), month);
    const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCategoryTotals"])(transactions.filter((item)=>item.currency === currency && item.date.slice(0, 4) === month.slice(0, 4)))[0];
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
            response = category ? `${category.name} is your largest spending category in ${month.slice(0, 4)} at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(category.value, currency)}. A 5% reduction would be approximately ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(category.value * 0.05, currency)} over the recorded year; that is an illustration, not a guaranteed saving.` : "Import more transaction history and I can surface a category-level savings opportunity.";
        } else if (/income|earn|salary/.test(lower)) {
            response = `Your recorded income in ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monthLabel"])(month)} is ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(latest.income, currency)}. This includes only transactions classified as income; refunds and internal transfers are kept separate.`;
        } else if (/balance|cash/.test(lower)) {
            response = "I can’t confirm your available cash balance from these CSVs. They contain transactions but no verified opening or current balance. Your net cash flow is not the same as a bank balance.";
        } else if (/budget|category|spend/.test(lower) && category) {
            response = `Your largest recorded spending category in ${month.slice(0, 4)} is ${category.name} at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(category.value, currency)}. You can set a personal monthly limit in Budget Planner.`;
        } else {
            response = `For ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["monthLabel"])(month)}, recorded income was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(latest.income, currency)} and eligible spending was ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMoney"])(latest.expenses, currency)}. Transfers are excluded. Ask me about a category, saving, or your balance.`;
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
                lineNumber: 343,
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
                                    lineNumber: 343,
                                    columnNumber: 464
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 343,
                                columnNumber: 374
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-ink",
                                        children: "Luma assistant"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 343,
                                        columnNumber: 493
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] text-slate-400",
                                        children: "Your data stays on this device · Not financial advice"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 343,
                                        columnNumber: 557
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 343,
                                columnNumber: 488
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-1.5 w-1.5 rounded-full bg-emerald-500"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 343,
                                        columnNumber: 796
                                    }, this),
                                    " Private session"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 343,
                                columnNumber: 662
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 343,
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
                                    lineNumber: 343,
                                    columnNumber: 1098
                                }, this)
                            }, index, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 343,
                                columnNumber: 1001
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 343,
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
                                            lineNumber: 343,
                                            columnNumber: 1759
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 343,
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
                                        lineNumber: 343,
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
                                            lineNumber: 343,
                                            columnNumber: 2290
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 343,
                                        columnNumber: 2125
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 343,
                                columnNumber: 1353
                            }, this),
                            speechError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-amber-700",
                                children: speechError
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 343,
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
                                        lineNumber: 343,
                                        columnNumber: 2537
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 343,
                                columnNumber: 2400
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 343,
                        columnNumber: 1306
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 343,
                columnNumber: 179
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 343,
        columnNumber: 10
    }, this);
}
_s1(AssistantPage, "M2D/J0wpHADGSTb9A0a/3XbUD0s=");
_c16 = AssistantPage;
function SettingsModal({ transactions, onClose, onClear, onImport }) {
    _s2();
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
                                    lineNumber: 348,
                                    columnNumber: 301
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-slate-500",
                                    children: "Your transaction data lives in this browser."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 348,
                                    columnNumber: 367
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 348,
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
                                lineNumber: 348,
                                columnNumber: 593
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 348,
                            columnNumber: 464
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 348,
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
                                    lineNumber: 348,
                                    columnNumber: 733
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-sm font-semibold text-ink",
                                    children: transactions.length
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 348,
                                    columnNumber: 800
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 348,
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
                                    lineNumber: 348,
                                    columnNumber: 1013
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "CSV files are processed in your browser and stored in IndexedDB. This prototype does not connect to a bank or send transaction data to a server."
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 348,
                                    columnNumber: 1066
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 348,
                            columnNumber: 883
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-ink hover:bg-slate-50",
                            onClick: onImport,
                            type: "button",
                            children: "Import more CSV files"
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 348,
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
                            lineNumber: 348,
                            columnNumber: 1407
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 348,
                    columnNumber: 623
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 348,
            columnNumber: 128
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 348,
        columnNumber: 10
    }, this);
}
_s2(SettingsModal, "oKwWRXMu3ImEqF+0UoU9UcufOzQ=");
_c17 = SettingsModal;
function FinancialApp() {
    _s3();
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [section, setSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Overview");
    const [currency, setCurrency] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("CHF");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [importOpen, setImportOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settingsOpen, setSettingsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenu, setMobileMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [budgets, setBudgets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FinancialApp.useEffect": ()=>{
            let mounted = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTransactions"])().then({
                "FinancialApp.useEffect": (items)=>{
                    if (mounted) {
                        setTransactions(items);
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
        const added = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addTransactions"])(items);
        const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readTransactions"])();
        setTransactions(saved);
        const currencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(saved);
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
        setSettingsOpen(false);
        setSection("Overview");
        setBudgets([]);
    }
    function importFromSettings() {
        setSettingsOpen(false);
        setImportOpen(true);
    }
    function saveBudget(budget) {
        setBudgets((current)=>{
            const next = current.filter((item)=>item.id !== budget.id);
            return budget.monthlyLimit > 0 ? [
                ...next,
                budget
            ] : next;
        });
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
                    lineNumber: 413,
                    columnNumber: 160
                }, this),
                "Opening your private workspace…"
            ]
        }, void 0, true, {
            fileName: "[project]/components/financial-app.tsx",
            lineNumber: 413,
            columnNumber: 96
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 413,
        columnNumber: 23
    }, this);
    if (!transactions.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Onboarding, {
        error: error,
        onDemo: showDemo,
        onImported: handleImport
    }, void 0, false, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 414,
        columnNumber: 36
    }, this);
    const currencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$finance$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrencies"])(transactions);
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
                                lineNumber: 423,
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
                                    lineNumber: 423,
                                    columnNumber: 233
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 423,
                                columnNumber: 73
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 423,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400",
                        children: "Your workspace"
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 424,
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
                                        lineNumber: 425,
                                        columnNumber: 384
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: name
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 425,
                                        columnNumber: 445
                                    }, this),
                                    name === "AI Assistant" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto rounded-md bg-violet-50 px-1.5 py-0.5 text-[9px] font-semibold text-violet-600",
                                        children: "NEW"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 425,
                                        columnNumber: 492
                                    }, this)
                                ]
                            }, name, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 425,
                                columnNumber: 83
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 425,
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
                                            lineNumber: 427,
                                            columnNumber: 161
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 427,
                                        columnNumber: 62
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-xs font-semibold text-ink",
                                        children: "Private by design"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 427,
                                        columnNumber: 192
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-[10px] leading-4 text-slate-500",
                                        children: "Your financial data stays on this device."
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 427,
                                        columnNumber: 264
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 427,
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
                                        lineNumber: 428,
                                        columnNumber: 209
                                    }, this),
                                    " Privacy & settings"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 px-3 text-[9px] leading-4 text-slate-400",
                                children: "Independent prototype · Not affiliated with PostFinance"
                            }, void 0, false, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 422,
                columnNumber: 7
            }, this),
            mobileMenu && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "Close menu overlay",
                className: "fixed inset-0 z-30 bg-ink/30 lg:hidden",
                onClick: ()=>setMobileMenu(false),
                type: "button"
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 432,
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
                                            lineNumber: 436,
                                            columnNumber: 210
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 436,
                                        columnNumber: 52
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden items-center gap-2 text-xs text-slate-400 sm:flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Workspace"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 436,
                                                columnNumber: 311
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "/"
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 436,
                                                columnNumber: 333
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-ink",
                                                children: section
                                            }, void 0, false, {
                                                fileName: "[project]/components/financial-app.tsx",
                                                lineNumber: 436,
                                                columnNumber: 347
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 436,
                                        columnNumber: 237
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sm:hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Logo, {}, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 436,
                                            columnNumber: 437
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 436,
                                        columnNumber: 410
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 436,
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
                                                lineNumber: 437,
                                                columnNumber: 199
                                            }, this),
                                            " Local & secure"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 437,
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
                                            lineNumber: 437,
                                            columnNumber: 459
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 437,
                                        columnNumber: 281
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-8 w-8 items-center justify-center rounded-full bg-[#edf0f5] text-xs font-semibold text-slate-600",
                                        children: "JD"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 437,
                                        columnNumber: 491
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 437,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 435,
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
                                        lineNumber: 440,
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
                                            lineNumber: 440,
                                            columnNumber: 249
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 440,
                                        columnNumber: 171
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 440,
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
                                        lineNumber: 442,
                                        columnNumber: 40
                                    }, this),
                                    section === "My Accounts" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountsPage, {
                                        currency: selectedCurrency,
                                        onCurrency: setCurrency,
                                        onImport: ()=>setImportOpen(true),
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 443,
                                        columnNumber: 43
                                    }, this),
                                    section === "Smart Savings" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SavingsPage, {
                                        currency: selectedCurrency,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 444,
                                        columnNumber: 45
                                    }, this),
                                    section === "Budget Planner" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BudgetPage, {
                                        budgets: budgets,
                                        currency: selectedCurrency,
                                        onSaveBudget: saveBudget,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 445,
                                        columnNumber: 46
                                    }, this),
                                    section === "Investments" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InvestmentsPage, {
                                        currency: selectedCurrency,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 446,
                                        columnNumber: 43
                                    }, this),
                                    section === "Financial Forecast" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ForecastPage, {
                                        currency: selectedCurrency,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 447,
                                        columnNumber: 50
                                    }, this),
                                    section === "AI Assistant" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AssistantPage, {
                                        currency: selectedCurrency,
                                        transactions: transactions
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 448,
                                        columnNumber: 44
                                    }, this)
                                ]
                            }, section, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                                className: "mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/70 pt-4 text-[10px] leading-4 text-slate-400",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Informational tool only · Not financial advice"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 450,
                                        columnNumber: 158
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Prototype independent from PostFinance · Calculations use imported records only"
                                    }, void 0, false, {
                                        fileName: "[project]/components/financial-app.tsx",
                                        lineNumber: 450,
                                        columnNumber: 217
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/financial-app.tsx",
                                lineNumber: 450,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/financial-app.tsx",
                        lineNumber: 439,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 434,
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
                                            lineNumber: 454,
                                            columnNumber: 376
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-1 text-xl font-semibold text-ink",
                                            children: "Add transactions"
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 454,
                                            columnNumber: 464
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-slate-500",
                                            children: "Select the matching columns for each file before import."
                                        }, void 0, false, {
                                            fileName: "[project]/components/financial-app.tsx",
                                            lineNumber: 454,
                                            columnNumber: 537
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 454,
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
                                        lineNumber: 454,
                                        columnNumber: 799
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/financial-app.tsx",
                                    lineNumber: 454,
                                    columnNumber: 646
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 454,
                            columnNumber: 316
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$importer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CsvImporter"], {
                            onClose: ()=>setImportOpen(false),
                            onImport: handleImport
                        }, void 0, false, {
                            fileName: "[project]/components/financial-app.tsx",
                            lineNumber: 454,
                            columnNumber: 829
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/financial-app.tsx",
                    lineNumber: 454,
                    columnNumber: 182
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 454,
                columnNumber: 22
            }, this),
            settingsOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SettingsModal, {
                onClear: handleClear,
                onClose: ()=>setSettingsOpen(false),
                onImport: importFromSettings,
                transactions: transactions
            }, void 0, false, {
                fileName: "[project]/components/financial-app.tsx",
                lineNumber: 455,
                columnNumber: 24
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/financial-app.tsx",
        lineNumber: 421,
        columnNumber: 5
    }, this);
}
_s3(FinancialApp, "vH5vt3QBLApiDLPcSPU/dPd65SM=");
_c18 = FinancialApp;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18;
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
__turbopack_context__.k.register(_c11, "AccountsPage");
__turbopack_context__.k.register(_c12, "SavingsPage");
__turbopack_context__.k.register(_c13, "BudgetPage");
__turbopack_context__.k.register(_c14, "InvestmentsPage");
__turbopack_context__.k.register(_c15, "ForecastPage");
__turbopack_context__.k.register(_c16, "AssistantPage");
__turbopack_context__.k.register(_c17, "SettingsModal");
__turbopack_context__.k.register(_c18, "FinancialApp");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$models$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/models.ts [app-client] (ecmascript)");
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
function inferCategory(description, kind) {
    if (kind === "refund") return "Refunds";
    if (kind === "transfer") return "Transfers";
    if (kind === "investment") return "Investments";
    if (kind === "income") return /salary|salär|payroll|wage/i.test(description) ? "Salary" : "Other income";
    const value = description.toLowerCase();
    if (/rent|miet|home|housing|wohnung/.test(value)) return "Housing";
    if (/krankenkasse|insurance|versicherung|health|medical|doctor|pharmacy|apotheke|optik/.test(value)) return "Health & insurance";
    if (/airline|airlines|flight|hotel|airbnb|travel|mondrian|london|las vegas|yellowstone|kopenhagen/.test(value)) return "Travel";
    if (/train|sbb|ö?v[- ]?abo|public transport|bus|transport|fuel|benz[in]|parking|tankstelle|uber|taxi/.test(value)) return "Transport";
    if (/restaurant|ristorante|lunch|mittag|food|grocery|coop|migros|denner|kantine|café|cafe|bakery|bäckerei/.test(value)) return "Food & dining";
    if (/netflix|spotify|subscription|mobile|phone|itunes|microsoft|icloud/.test(value)) return "Subscriptions";
    if (/amazon|digitec|galaxus|shopping|store|h&m|manor|fashion|veloshop|bestellung|orell|zalando|nike|hilfiger|apple online|heiniger|superdry/.test(value)) return "Shopping";
    if (/tax|steuer|bill|utility|electric|internet/.test(value)) return "Bills";
    if (/paypal/.test(value)) return "Online payments";
    return "Other";
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
function normalizeRows(file) {
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
            target
        ]);
        const candidate = {
            id,
            date,
            description,
            amount,
            originalAmount,
            currency,
            category: inferCategory(description, kind),
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
    "readTransactions",
    ()=>readTransactions,
    "replaceTransactions",
    ()=>replaceTransactions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/idb/build/index.js [app-client] (ecmascript)");
;
let databasePromise;
function getDatabase() {
    if (!databasePromise) {
        databasePromise = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openDB"])("luma-finance", 1, {
            upgrade (database) {
                const store = database.createObjectStore("transactions", {
                    keyPath: "id"
                });
                store.createIndex("by-date", "date");
                store.createIndex("by-currency", "currency");
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
async function replaceTransactions(transactions) {
    const db = await getDatabase();
    const tx = db.transaction("transactions", "readwrite");
    await tx.store.clear();
    for (const transaction of transactions)await tx.store.put(transaction);
    await tx.done;
}
async function clearTransactions() {
    const db = await getDatabase();
    await db.clear("transactions");
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
        "Food & dining",
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
        "Food & dining",
        24
    ],
    [
        "Health insurance",
        "Health & insurance",
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
                category: "Salary",
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
"[project]/lib/finance.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectRecurring",
    ()=>detectRecurring,
    "formatMoney",
    ()=>formatMoney,
    "getCategoryTotals",
    ()=>getCategoryTotals,
    "getCurrencies",
    ()=>getCurrencies,
    "getLatestMonth",
    ()=>getLatestMonth,
    "getMonthlySummaries",
    ()=>getMonthlySummaries,
    "monthLabel",
    ()=>monthLabel,
    "summarizeMonth",
    ()=>summarizeMonth
]);
function getCurrencies(transactions) {
    return [
        ...new Set(transactions.map((transaction)=>transaction.currency))
    ].sort();
}
function getLatestMonth(transactions) {
    return transactions.reduce((latest, item)=>item.date.slice(0, 7) > latest ? item.date.slice(0, 7) : latest, "");
}
function summarizeMonth(transactions, month) {
    const monthTransactions = transactions.filter((item)=>item.date.startsWith(month));
    const income = monthTransactions.filter((item)=>item.type === "income").reduce((sum, item)=>sum + Math.abs(item.amount), 0);
    const refunds = monthTransactions.filter((item)=>item.type === "refund").reduce((sum, item)=>sum + Math.abs(item.amount), 0);
    const spending = monthTransactions.filter((item)=>item.type === "expense").reduce((sum, item)=>sum + Math.abs(item.amount), 0);
    const investmentPurchases = monthTransactions.filter((item)=>item.type === "investment").reduce((sum, item)=>sum + Math.abs(item.amount), 0);
    const expenses = Math.max(0, spending - refunds);
    const savings = income - expenses;
    return {
        income,
        expenses,
        savings,
        cashFlow: savings - investmentPurchases,
        investmentPurchases,
        transactions: monthTransactions
    };
}
function getMonthlySummaries(transactions, currency, endMonth) {
    if (!endMonth) return [];
    const [year, month] = endMonth.split("-").map(Number);
    return Array.from({
        length: 12
    }, (_, index)=>{
        const date = new Date(year, month - 1 - (11 - index), 1);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const summary = summarizeMonth(transactions.filter((item)=>item.currency === currency), key);
        return {
            key,
            month: date.toLocaleDateString("en-GB", {
                month: "short"
            }),
            income: summary.income,
            expenses: summary.expenses,
            savings: summary.savings,
            cashFlow: summary.cashFlow
        };
    });
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
            name,
            value
        })).sort((a, b)=>b.value - a.value);
}
function detectRecurring(transactions) {
    const groups = new Map();
    for (const transaction of transactions){
        if (transaction.type !== "expense") continue;
        const key = `${transaction.merchant.toLowerCase() || transaction.description.toLowerCase()}|${transaction.currency}`;
        groups.set(key, [
            ...groups.get(key) ?? [],
            transaction
        ]);
    }
    return [
        ...groups.values()
    ].filter((group)=>group.length >= 3).map((group)=>{
        const sorted = [
            ...group
        ].sort((a, b)=>a.date.localeCompare(b.date));
        return {
            ...sorted[sorted.length - 1],
            isRecurring: true,
            occurrenceCount: group.length,
            averageAmount: group.reduce((sum, item)=>sum + Math.abs(item.amount), 0) / group.length
        };
    }).sort((a, b)=>b.averageAmount - a.averageAmount).slice(0, 4);
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
"[project]/lib/models.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
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
const transactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string(),
    amount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite(),
    originalAmount: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$number$3e$__["z"].number().finite(),
    currency: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
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

//# sourceMappingURL=_0jqd5qex_dgzf._.js.map