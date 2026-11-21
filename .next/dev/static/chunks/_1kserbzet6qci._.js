(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/conversation/intent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classify",
    ()=>classify,
    "monthIn",
    ()=>monthIn,
    "refersToCurrent",
    ()=>refersToCurrent,
    "targetIn",
    ()=>targetIn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/player/voice.ts [app-client] (ecmascript)");
;
const MONTH_NAMES = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
];
const MONTH_SHORT = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    sept: 9,
    oct: 10,
    nov: 11,
    dec: 12
};
/** "May" counts as the month only with a preposition before it, a possessive, or a day/year number next to it. */ const MAY_AS_MONTH = [
    /\b(in|of|during|since|until|till|through|last|early|late|mid|end of|start of)\s+may\b/,
    /\bmay'?s\b(?!\s+i\b)/,
    /\bmay\s+\d{1,4}(st|nd|rd|th)?\b/,
    /\b\d{1,2}(st|nd|rd|th)?\s+(of\s+)?may\b/
];
const lower = (text)=>text.toLocaleLowerCase("en").replace(/[’‘]/g, "'");
function monthIn(text) {
    const t = lower(text);
    for(let i = 0; i < MONTH_NAMES.length; i++){
        if (i === 4) {
            if (MAY_AS_MONTH.some((r)=>r.test(t)) && !/^may\s+(i|we)\b/.test(t)) return 5;
            continue;
        }
        if (new RegExp(`\\b${MONTH_NAMES[i]}\\b`).test(t)) return i + 1;
    }
    for (const [short, month] of Object.entries(MONTH_SHORT)){
        if (new RegExp(`\\b${short}\\b\\.?`).test(t)) return month;
    }
    return null;
}
function refersToCurrent(text) {
    return /\b(this|that)\s+(month|bar|column|one|category|part|pool|jar)\b/.test(lower(text));
}
function targetIn(text, targets, current = null) {
    const month = monthIn(text);
    if (month !== null && targets.includes(month)) return month;
    const words = text.split(/\s+/).map(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeWord"]).filter(Boolean);
    let best = null;
    let bestLength = 0;
    for (const target of targets){
        if (typeof target === "number" && target >= 1 && target <= 12) continue;
        const parts = String(target).split(/\s+/).map(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeWord"]).filter(Boolean);
        if (!parts.length) continue;
        for(let i = 0; i + parts.length <= words.length; i++){
            const match = parts.every((p, k)=>{
                const w = words[i + k];
                return w === p || k === parts.length - 1 && (w === p + "s" || w + "s" === p);
            });
            if (match && parts.join(" ").length > bestLength) {
                best = target;
                bestLength = parts.join(" ").length;
            }
        }
    }
    if (best !== null) return best;
    if (current !== null && refersToCurrent(text)) return current;
    return null;
}
function classify(text, targets = []) {
    const t = lower(text).trim().replace(/[.!,;]+$/, "");
    const categoryIn = targets.some((x)=>typeof x === "string") && targetIn(t, targets.filter((x)=>typeof x === "string")) !== null;
    const isQuestion = /\?/.test(t) || monthIn(t) !== null || categoryIn || /\b(why|how|what|which|when|explain)\b/.test(t);
    if (!isQuestion && /\b(continue|go on|carry on|ok|okay|sure|got it|yes|resume|keep going)\b/.test(t)) return "continue";
    if (!isQuestion && /(one more|another question|i have a question|^wait|^stop$|hold on)/.test(t)) return "wait";
    if (!isQuestion && /^(enough|end|quit|that'?s all|finish)/.test(t)) return "end";
    return "question";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/conversation/state.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Conversation",
    ()=>Conversation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/events.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$player$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/player/player.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/player/voice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$intent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/conversation/intent.ts [app-client] (ecmascript)");
;
;
;
;
;
const isScript = (value)=>Array.isArray(value) && value.length > 0 && value.every((b)=>b && typeof b === "object" && typeof b.say === "string" && b.say.trim() !== "");
class Conversation {
    player;
    world;
    main;
    backup;
    prepared;
    fetcher;
    directorUrl;
    directorTimeoutMs;
    visible;
    events = new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]();
    directorAbort = null;
    mode = "idle";
    /** Saved at interruption; one level deep. */ snapshot = null;
    /** The main beat playing (or last played). */ mainIndex = 0;
    /** The main script played to its end (a later "continue" has nothing to resume). */ mainDone = false;
    constructor(options){
        this.world = options.world;
        this.main = options.main;
        this.prepared = options.prepared ?? [];
        this.backup = options.backup ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBackupMode"])();
        this.fetcher = options.fetch ?? ((input, init)=>fetch(input, init));
        this.directorUrl = options.directorUrl ?? "/api/director";
        this.directorTimeoutMs = options.directorTimeoutMs ?? 12000;
        this.visible = options.visible;
        this.player = new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$player$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Player"]({
            world: options.world,
            voice: options.voice,
            emit: this.events.emit
        });
    }
    /** Subscribe to engine events (captions, figure, offer, mode, snapshot). Returns unsubscribe. */ on(listener) {
        return this.events.on(listener);
    }
    /** Start (or start over) the main script from beat 1. */ start() {
        this.setSnapshot(null);
        return this.playMain(0);
    }
    /** Stop button / mic pressed / "wait": stop now and listen. */ interrupt() {
        if (this.mode === "presenting" || this.mode === "returning") this.setSnapshot(this.takeSnapshot());
        if (this.mode === "presenting" || this.mode === "returning" || this.mode === "side") {
            this.cancel();
            this.setMode("listening");
        }
    }
    /** Any typed or transcribed input: classify and act. Returns the intent it acted on. */ input(text) {
        const intent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$intent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["classify"])(text, this.world.focusTargets());
        if (intent === "continue") void this.resume();
        else if (intent === "wait") this.interrupt();
        else if (intent === "end") this.end();
        else void this.ask(text);
        return intent;
    }
    /** Side answer (plan 8.2). Ends in `waiting` unless interrupted. */ async ask(question) {
        this.interrupt();
        const my = this.player.begin();
        this.setMode("side");
        // Fast path, before any network call.
        const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$intent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["targetIn"])(question, this.world.focusTargets(), this.world.currentFocus());
        if (target !== null && target !== this.world.currentFocus()) this.world.focus(target);
        const prepared = this.prepared.find((p)=>{
            try {
                return p.match(question);
            } catch  {
                return false;
            }
        });
        if (prepared) {
            this.events.emit({
                type: "script",
                kind: "side",
                script: prepared.script,
                source: "prepared"
            });
            if (!await this.playSide(prepared.script, my)) return;
            return this.finishSide(my);
        }
        if (this.backup) {
            if (!await this.player.speak(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIRECTOR_FAILURE_LINE"], my, "failure")) return;
            return this.finishSide(my);
        }
        const request = {
            question,
            screen: this.screen(),
            mode: "side"
        };
        const answer = this.callDirector(request);
        if (!await this.player.speak(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILLER_LINE"], my, "filler")) return;
        const response = await answer;
        if (!this.player.isCurrent(my)) return;
        if (!response || !isScript(response.script)) {
            if (response?.error) this.events.emit({
                type: "error",
                message: response.error
            });
            if (!await this.player.speak(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIRECTOR_FAILURE_LINE"], my, "failure")) return;
            return this.finishSide(my);
        }
        this.events.emit({
            type: "script",
            kind: "side",
            script: response.script,
            source: response.source
        });
        if (!await this.playSide(response.script, my)) return;
        this.finishSide(my);
    }
    /** "OK, let's continue": restore the snapshot, speak the bridge, replay the interrupted beat. */ async resume() {
        const s = this.snapshot;
        if (!s) {
            if (this.mainDone) return this.setMode("finished");
            return this.playMain(this.mode === "idle" ? 0 : this.mainIndex);
        }
        const my = this.player.begin();
        this.setSnapshot(null);
        this.mainIndex = s.mainIndex;
        this.setMode("returning");
        this.restore(s);
        const bridge = this.main[s.mainIndex]?.bridge ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BRIDGE"];
        if (!await this.player.speak(bridge, my, "bridge")) return;
        return this.playMain(s.mainIndex, my);
    }
    /** "That's all": stop everything. */ end() {
        this.cancel();
        this.setSnapshot(null);
        this.setMode("finished");
    }
    /** The offer card was touch-confirmed (never by voice). */ confirmOffer(jar, figure) {
        this.world.fillJar?.(jar);
        if (figure) this.player.setFigure(figure);
    }
    /** What the director is told about the screen. */ screen() {
        return {
            scene: this.world.currentScene() ?? this.snapshot?.scene ?? this.main[this.mainIndex]?.scene?.type ?? "galaxy",
            focus: this.world.currentFocus(),
            lastSentence: this.snapshot?.sentence ?? this.player.lastLine,
            visible: this.visible?.(),
            openBar: this.player.openBar
        };
    }
    // ---------- internals ----------
    async playMain(from, token) {
        const my = token !== undefined && this.player.isCurrent(token) ? token : this.player.begin();
        this.setMode("presenting");
        this.mainDone = false;
        if (from === 0) this.events.emit({
            type: "script",
            kind: "main",
            script: this.main
        });
        for(let i = from; i < this.main.length; i++){
            this.mainIndex = i;
            const ok = await this.player.playBeat(this.main[i], my, {
                kind: "main",
                beatIndex: i,
                beatCount: this.main.length
            });
            if (!ok) return;
        }
        if (!this.player.isCurrent(my)) return;
        this.mainDone = true;
        this.setMode("finished");
    }
    async playSide(script, my) {
        for(let i = 0; i < script.length; i++){
            const ok = await this.player.playBeat(script[i], my, {
                kind: "side",
                beatIndex: i,
                beatCount: script.length
            });
            if (!ok) return false;
        }
        return true;
    }
    finishSide(my) {
        if (this.player.isCurrent(my)) this.setMode("waiting");
    }
    async callDirector(request) {
        const abort = new AbortController();
        this.directorAbort = abort;
        const timer = setTimeout(()=>abort.abort(), this.directorTimeoutMs);
        try {
            const res = await this.fetcher(this.directorUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request),
                signal: abort.signal
            });
            if (!res.ok) return null;
            return await res.json();
        } catch  {
            return null;
        } finally{
            clearTimeout(timer);
            if (this.directorAbort === abort) this.directorAbort = null;
        }
    }
    cancel() {
        this.player.cancel();
        this.directorAbort?.abort();
        this.directorAbort = null;
    }
    takeSnapshot() {
        const beat = this.main[this.mainIndex];
        return {
            scene: this.world.currentScene() ?? beat?.scene?.type ?? "galaxy",
            focus: this.world.currentFocus(),
            figure: this.player.figure ?? {
                label: "",
                value: 0
            },
            mainIndex: this.mainIndex,
            sentence: beat?.say ?? "",
            wordsSpoken: this.player.wordsSpoken
        };
    }
    /** Plan 8.1: scene, collapse breakdown, focus, figure. */ restore(s) {
        if (this.world.currentScene() !== s.scene) this.world.enter(s.scene);
        else this.player.collapse();
        this.player.openBar = null;
        if (s.focus != null) this.world.focus(s.focus);
        else this.world.unfocus();
        if (s.figure.label || s.figure.value) this.player.setFigure(s.figure);
    }
    setMode(mode) {
        if (mode === this.mode) return;
        const previous = this.mode;
        this.mode = mode;
        this.events.emit({
            type: "mode",
            mode,
            previous
        });
    }
    setSnapshot(snapshot) {
        if (snapshot === this.snapshot) return;
        this.snapshot = snapshot;
        this.events.emit({
            type: "snapshot",
            snapshot
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/events.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Emitter",
    ()=>Emitter
]);
class Emitter {
    listeners = new Set();
    on(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    emit = (event)=>{
        for (const listener of Array.from(this.listeners)){
            try {
                listener(event);
            } catch (reason) {
                console.error("Engine listener failed", reason);
            }
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/events.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/player/voice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$player$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/player/player.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$intent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/conversation/intent.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/conversation/state.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$stub$2d$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/stub-world.ts [app-client] (ecmascript)");
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/player/player.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Player",
    ()=>Player,
    "cueWordIndices",
    ()=>cueWordIndices
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/player/voice.ts [app-client] (ecmascript)");
;
function cueWordIndices(say, cues = []) {
    const words = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitWords"])(say).map((w)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeWord"])(w.word));
    let from = 1;
    return cues.map((cue)=>{
        const parts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitWords"])(cue.word).map((w)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeWord"])(w.word)).filter(Boolean);
        if (!parts.length) return -1;
        const find = (start)=>{
            for(let i = start; i + parts.length <= words.length; i++){
                if (parts.every((p, k)=>words[i + k] === p)) return i;
            }
            return -1;
        };
        const index = [
            find(from),
            find(1),
            find(0)
        ].find((i)=>i >= 0) ?? -1;
        if (index >= 0) from = index + 1;
        return index;
    });
}
class Player {
    world;
    voice;
    emit;
    run = 0;
    /** The big number currently on screen. */ figure = null;
    /** Month whose column is broken down, if any (for ScreenContext.openBar). */ openBar = null;
    /** Words of the current line reached so far. */ wordsSpoken = 0;
    /** Text of the last line started. */ lastLine = "";
    constructor(options){
        this.world = options.world;
        this.voice = options.voice;
        this.emit = options.emit ?? (()=>undefined);
    }
    /** Invalidates every running flow and stops the voice now. */ cancel() {
        this.run++;
        this.voice.stop();
    }
    /** Cancels whatever runs and returns a fresh token for a new flow. */ begin() {
        this.cancel();
        return this.run;
    }
    isCurrent(token) {
        return token === this.run;
    }
    /** Sets the big number (the UI animates from -> to). */ setFigure(figure) {
        const from = this.figure;
        if (from && from.label === figure.label && from.value === figure.value) return;
        this.figure = figure;
        this.emit({
            type: "figure",
            from,
            to: figure
        });
    }
    breakdown(b) {
        this.world.breakdown(b);
        this.openBar = b.month;
    }
    collapse() {
        this.world.collapse();
        this.openBar = null;
    }
    /** Applies a beat's scene setup without speaking (plan 7.1 order). */ setup(beat) {
        const scene = beat.scene;
        if (scene) {
            if (this.world.currentScene() === scene.type) {
                if (scene.focus == null) this.world.unfocus();
            } else {
                this.world.enter(scene.type);
                this.openBar = null;
            }
            const deferred = beat.cues?.some((c)=>c.action === "breakdown");
            if (scene.breakdown && !deferred) this.breakdown(scene.breakdown);
            if (scene.focus != null) this.world.focus(scene.focus);
        }
        if (beat.figure) this.setFigure(beat.figure);
        if (beat.offer) this.emit({
            type: "offer",
            beat
        });
    }
    /** Plays one beat: setup, then speech with cues at their words. Resolves false if `token` went stale. */ async playBeat(beat, token, options = {}) {
        if (!this.isCurrent(token)) return false;
        this.setup(beat);
        const cues = beat.cues ?? [];
        const at = cueWordIndices(beat.say, cues);
        const byWord = new Map();
        at.forEach((index, i)=>byWord.set(Math.max(index, 0), [
                ...byWord.get(Math.max(index, 0)) ?? [],
                cues[i]
            ]));
        return this.speakLine(beat.say, token, options, byWord, beat);
    }
    /** Speaks a bare line (bridge, filler, failure) with captions. Resolves false if `token` went stale. */ speak(text, token, kind) {
        return this.speakLine(text, token, {
            kind
        });
    }
    async speakLine(text, token, options, cues = new Map(), beat) {
        if (!this.isCurrent(token)) return false;
        const words = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitWords"])(text);
        this.lastLine = text;
        this.wordsSpoken = 0;
        this.emit({
            type: "line",
            text,
            words: words.map((w)=>w.word),
            cueIndices: Array.from(cues.keys()).sort((a, b)=>a - b),
            kind: options.kind ?? "main",
            beatIndex: options.beatIndex ?? null,
            beatCount: options.beatCount ?? null
        });
        const completed = await this.voice.speak(text, (index, word)=>{
            if (!this.isCurrent(token)) return;
            this.wordsSpoken = index + 1;
            const hits = cues.get(index);
            this.emit({
                type: "word",
                index,
                word,
                cue: !!hits
            });
            for (const cue of hits ?? [])this.fire(cue, index, beat);
        });
        const ok = completed && this.isCurrent(token);
        this.emit({
            type: "lineEnd",
            completed: ok
        });
        return ok;
    }
    fire(cue, wordIndex, beat) {
        if (cue.action === "breakdown") {
            const b = beat?.scene?.breakdown;
            if (b) this.breakdown(b);
        } else if (cue.action === "ghost") {
            if (cue.target != null) this.world.ghost?.(cue.target);
        } else if (cue.target != null) {
            this.world.focus(cue.target);
        }
        if (cue.figure) this.setFigure(cue.figure);
        this.emit({
            type: "cue",
            cue,
            wordIndex
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/player/voice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Voice",
    ()=>Voice,
    "estimateTimings",
    ()=>estimateTimings,
    "isBackupMode",
    ()=>isBackupMode,
    "normalizeWord",
    ()=>normalizeWord,
    "splitWords",
    ()=>splitWords,
    "wordStarts",
    ()=>wordStarts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/contracts.ts [app-client] (ecmascript)");
;
function isBackupMode(search) {
    const query = search ?? (typeof location !== "undefined" ? location.search : "");
    const value = new URLSearchParams(query).get("backup");
    return value !== null && value !== "0" && value !== "false";
}
function normalizeWord(word) {
    return word.toLocaleLowerCase("en").replace(/['’‘`]/g, "").replace(/[^\p{L}\p{N}]+/gu, "");
}
function splitWords(text) {
    const words = [];
    const pattern = /\S+/g;
    let match;
    while(match = pattern.exec(text)){
        if (!/[\p{L}\p{N}]/u.test(match[0])) continue;
        words.push({
            word: match[0],
            charStart: match.index,
            charEnd: match.index + match[0].length
        });
    }
    return words;
}
function estimateTimings(text, msPerChar = 60) {
    let t = 0.15;
    return splitWords(text).map((w)=>{
        let weight = 0;
        for (const char of w.word)weight += /\d/.test(char) ? 3.5 : /[\p{L}]/u.test(char) ? 1 : 0.5;
        const duration = weight * msPerChar / 1000;
        const timing = {
            word: w.word,
            start: t,
            end: t + duration,
            charStart: w.charStart,
            charEnd: w.charEnd
        };
        t += duration + msPerChar / 1000;
        return timing;
    });
}
function wordStarts(words, timings) {
    if (timings.length === words.length) return timings.map((t)=>t.start);
    const starts = [];
    let last = 0;
    for (const w of words){
        const hit = timings.find((t)=>t.charEnd > w.charStart && t.charStart < w.charEnd);
        last = hit ? hit.start : last;
        starts.push(last);
    }
    return starts;
}
const raf = typeof requestAnimationFrame === "function" ? (cb)=>requestAnimationFrame(cb) : (cb)=>setTimeout(cb, 16);
const now = ()=>typeof performance !== "undefined" ? performance.now() : Date.now();
class Voice {
    opts;
    fetcher;
    manifest = null;
    line = 0;
    audio = null;
    settle = null;
    liveAbort = null;
    state;
    constructor(options = {}){
        const baseUrl = options.baseUrl ?? "/voice";
        this.opts = {
            backup: options.backup ?? isBackupMode(),
            muted: options.muted ?? false,
            baseUrl,
            manifestUrl: options.manifestUrl ?? `${baseUrl}/manifest.json`,
            speakUrl: options.speakUrl ?? "/api/voice/speak",
            leadSeconds: options.leadSeconds ?? 0,
            liveTimeoutMs: options.liveTimeoutMs ?? 8000,
            onStatus: options.onStatus
        };
        this.fetcher = options.fetch ?? ((input, init)=>fetch(input, init));
        this.state = {
            backup: this.opts.backup,
            muted: this.opts.muted,
            pregen: null,
            live: this.opts.backup ? false : null,
            browser: ("TURBOPACK compile-time value", "object") !== "undefined" && "speechSynthesis" in window,
            lastPath: null
        };
    }
    status() {
        return {
            ...this.state
        };
    }
    /** Fine-print text, e.g. "Voice: pre-generated · live voice off (backup mode)". */ statusLine() {
        const s = this.state;
        const parts = [
            s.muted ? "sound off" : s.pregen ? "pre-generated audio" : s.pregen === false ? "no pre-generated audio" : "pre-generated audio unchecked",
            s.backup ? "live voice off (backup mode)" : s.live === false ? "live voice unavailable" : s.live ? "live voice" : "live voice untried",
            s.browser ? "browser voice" : "no browser voice"
        ];
        return `Voice: ${parts.join(" · ")}${s.lastPath ? ` · last: ${s.lastPath}` : ""}`;
    }
    /** Sound button: muted lines still run the clock (with measured timings when pre-generated). */ setMuted(muted) {
        if (muted) this.stop();
        this.update({
            muted
        });
    }
    /** Loads the manifest and warms the HTTP cache for the given lines. Same-origin static files only. */ async preload(texts) {
        const manifest = await this.loadManifest();
        await Promise.all(texts.map(async (text)=>{
            const entry = manifest[(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audioKey"])(text)];
            if (!entry) return;
            await Promise.all([
                this.fetcher(this.fileUrl(entry.audio, ".mp3")),
                this.fetcher(this.fileUrl(entry.timings, ".json"))
            ]).catch(()=>undefined);
        }));
    }
    stop() {
        this.line++;
        this.liveAbort?.abort();
        this.liveAbort = null;
        if (this.audio) {
            this.audio.pause();
            this.audio.src = "";
            this.audio = null;
        }
        if (this.state.browser) window.speechSynthesis.cancel();
        const settle = this.settle;
        this.settle = null;
        settle?.(false);
    }
    async speak(rawText, onWord) {
        this.stop();
        const line = this.line;
        const alive = ()=>this.line === line;
        const text = rawText.trim();
        const words = splitWords(text);
        let fired = -1;
        const fireUpTo = (index)=>{
            while(fired < index && fired < words.length - 1){
                fired++;
                onWord?.(fired, words[fired].word);
            }
        };
        const finishAll = ()=>fireUpTo(words.length - 1);
        try {
            // (a) Pre-generated audio.
            const clip = await this.pregenClip(text);
            if (!alive()) return false;
            if (clip) {
                const starts = wordStarts(words, clip.timings);
                const end = clip.timings.length ? clip.timings[clip.timings.length - 1].end : 0;
                if (!this.state.muted) {
                    const played = await this.playAudio(line, clip.src, starts, fireUpTo, finishAll);
                    if (played !== null) return this.used("pregen", played);
                    if (!alive()) return false;
                }
                return this.used("silent", await this.runClock(line, starts, end, fireUpTo, finishAll));
            }
            // (b) Live TTS, never in backup mode.
            if (!this.state.backup && !this.state.muted && this.state.live !== false) {
                const payload = await this.fetchLive(text);
                if (!alive()) return false;
                if (payload?.audioBase64) {
                    const src = `data:${payload.mimeType ?? "audio/mpeg"};base64,${payload.audioBase64}`;
                    const starts = wordStarts(words, payload.words);
                    const played = await this.playAudio(line, src, starts, fireUpTo, finishAll);
                    if (played !== null) return this.used("live", played);
                    if (!alive()) return false;
                }
            }
            // (c) Browser speechSynthesis.
            if (this.state.browser && !this.state.muted) {
                const spoken = await this.speakBrowser(line, text, words, fireUpTo, finishAll);
                if (spoken !== null) return this.used("browser", spoken);
                if (!alive()) return false;
            }
            // (d) Silent clock.
            const timings = estimateTimings(text);
            const end = timings.length ? timings[timings.length - 1].end : 0.3;
            return this.used("silent", await this.runClock(line, timings.map((t)=>t.start), end, fireUpTo, finishAll));
        } catch (reason) {
            console.error("Voice failed", reason);
            if (alive()) finishAll();
            return alive();
        }
    }
    // ---------- internals ----------
    used(path, completed) {
        if (this.state.lastPath !== path) this.update({
            lastPath: path
        });
        return completed;
    }
    update(patch) {
        this.state = {
            ...this.state,
            ...patch
        };
        this.opts.onStatus?.(this.status());
    }
    fileUrl(file, ext) {
        if (/^(https?:)?\//.test(file)) return file;
        return `${this.opts.baseUrl}/${/\.[a-z0-9]+$/i.test(file) ? file : file + ext}`;
    }
    loadManifest() {
        if (!this.manifest) {
            this.manifest = this.fetcher(this.opts.manifestUrl).then((res)=>res.ok ? res.json() : {}).catch(()=>({})).then((manifest)=>{
                this.update({
                    pregen: Object.keys(manifest).length > 0
                });
                return manifest;
            });
        }
        return this.manifest;
    }
    async pregenClip(text) {
        const entry = (await this.loadManifest())[(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audioKey"])(text)];
        if (!entry || entry.text.trim() !== text) return null;
        try {
            const res = await this.fetcher(this.fileUrl(entry.timings, ".json"));
            if (!res.ok) return null;
            const data = await res.json();
            const timings = Array.isArray(data) ? data : data.words ?? [];
            return {
                src: this.fileUrl(entry.audio, ".mp3"),
                timings
            };
        } catch  {
            return null;
        }
    }
    async fetchLive(text) {
        const abort = new AbortController();
        this.liveAbort = abort;
        const timer = setTimeout(()=>abort.abort(), this.opts.liveTimeoutMs);
        try {
            const res = await this.fetcher(this.opts.speakUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text
                }),
                signal: abort.signal
            });
            if (res.status === 503) {
                this.update({
                    live: false
                });
                return null;
            }
            if (!res.ok) return null;
            const payload = await res.json();
            if (this.state.live !== true) this.update({
                live: true
            });
            return payload;
        } catch  {
            return null;
        } finally{
            clearTimeout(timer);
            if (this.liveAbort === abort) this.liveAbort = null;
        }
    }
    /** Resolves true/false like speak(); null when the audio could not start (caller falls back). */ playAudio(line, src, starts, fireUpTo, finishAll) {
        if (typeof Audio === "undefined") return Promise.resolve(null);
        const audio = new Audio(src);
        this.audio = audio;
        return new Promise((resolve)=>{
            let started = false;
            let done = false;
            const finish = (value)=>{
                if (done) return;
                done = true;
                if (this.settle === settle) this.settle = null;
                resolve(value);
            };
            const settle = (completed)=>finish(completed);
            this.settle = settle;
            const tick = ()=>{
                if (done || this.line !== line) return;
                const t = audio.currentTime + this.opts.leadSeconds;
                let i = -1;
                while(i + 1 < starts.length && starts[i + 1] <= t)i++;
                fireUpTo(i);
                raf(tick);
            };
            audio.onended = ()=>{
                if (this.line !== line) return;
                finishAll();
                if (this.audio === audio) this.audio = null;
                finish(true);
            };
            audio.onerror = ()=>{
                if (this.line === line && !started) finish(null);
            };
            audio.play().then(()=>{
                started = true;
                raf(tick);
            }).catch(()=>{
                if (this.audio === audio) this.audio = null;
                finish(this.line === line ? null : false);
            });
        });
    }
    runClock(line, starts, end, fireUpTo, finishAll) {
        return new Promise((resolve)=>{
            const t0 = now();
            let done = false;
            const settle = (completed)=>{
                if (done) return;
                done = true;
                if (this.settle === settle) this.settle = null;
                resolve(completed);
            };
            this.settle = settle;
            const tick = ()=>{
                if (done || this.line !== line) return;
                const t = (now() - t0) / 1000 + this.opts.leadSeconds;
                let i = -1;
                while(i + 1 < starts.length && starts[i + 1] <= t)i++;
                fireUpTo(i);
                if (t >= end + 0.15) {
                    finishAll();
                    settle(true);
                    return;
                }
                raf(tick);
            };
            raf(tick);
        });
    }
    speakBrowser(line, text, words, fireUpTo, finishAll) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        const english = synth.getVoices().find((v)=>v.lang.toLowerCase().startsWith("en"));
        if (english) utterance.voice = english;
        // Some voices never send boundary events: an estimated clock drives the words until one arrives.
        const estimate = estimateTimings(text).map((t)=>t.start);
        return new Promise((resolve)=>{
            let done = false;
            let started = false;
            let boundaries = false;
            let t0 = 0;
            const finish = (value)=>{
                if (done) return;
                done = true;
                clearTimeout(watchdog);
                if (this.settle === settle) this.settle = null;
                resolve(value);
            };
            const settle = (completed)=>finish(completed);
            this.settle = settle;
            // Chrome sometimes never starts an utterance; fall through to the clock.
            const watchdog = setTimeout(()=>{
                if (!started && this.line === line) {
                    synth.cancel();
                    finish(null);
                }
            }, 1500);
            const tick = ()=>{
                if (done || boundaries || this.line !== line) return;
                const t = (now() - t0) / 1000;
                let i = -1;
                while(i + 1 < estimate.length && estimate[i + 1] <= t)i++;
                fireUpTo(i);
                raf(tick);
            };
            utterance.onstart = ()=>{
                started = true;
                t0 = now();
                raf(tick);
            };
            utterance.onboundary = (event)=>{
                if (this.line !== line || event.name && event.name !== "word") return;
                boundaries = true;
                let i = -1;
                while(i + 1 < words.length && words[i + 1].charStart <= event.charIndex)i++;
                fireUpTo(i);
            };
            utterance.onend = ()=>{
                if (this.line !== line) return;
                finishAll();
                finish(true);
            };
            utterance.onerror = (event)=>{
                if (this.line !== line || event.error === "interrupted" || event.error === "canceled") return finish(false);
                if (started) finishAll();
                finish(started ? true : null);
            };
            synth.speak(utterance);
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/stub-world.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StubWorld",
    ()=>StubWorld
]);
const MONTHS = Array.from({
    length: 12
}, (_, i)=>i + 1);
class StubWorld {
    calls = [];
    log;
    scene = null;
    focused = null;
    openBreakdown = null;
    ghosts = [];
    filled = [];
    targets;
    constructor(options = {}){
        this.targets = {
            monthly: MONTHS,
            ...options.targets
        };
        this.log = options.log ?? [];
    }
    record(method, ...args) {
        this.calls.push({
            method,
            args
        });
        this.log.push(args.length ? `${method}:${args.map((a)=>typeof a === "object" ? JSON.stringify(a) : String(a)).join(",")}` : method);
    }
    currentScene() {
        return this.scene;
    }
    currentFocus() {
        return this.focused;
    }
    focusTargets() {
        if (!this.scene) return [];
        const base = this.targets[this.scene] ?? [];
        const parts = this.scene === "monthly" && this.openBreakdown ? this.openBreakdown.parts.map((p)=>p.name) : [];
        return [
            ...base,
            ...parts
        ];
    }
    enter(scene) {
        this.record("enter", scene);
        this.scene = scene;
        this.focused = null;
        this.openBreakdown = null;
        this.ghosts = [];
    }
    focus(target) {
        this.record("focus", target);
        this.focused = target;
    }
    unfocus() {
        this.record("unfocus");
        this.focused = null;
    }
    breakdown(b) {
        this.record("breakdown", b.month);
        this.openBreakdown = b;
    }
    collapse() {
        this.record("collapse");
        this.openBreakdown = null;
    }
    ghost(target) {
        this.record("ghost", target);
        this.ghosts.push(target);
    }
    fillJar(jar) {
        this.record("fillJar", jar);
        this.filled.push(jar);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/advisor-shell.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdvisorShell",
    ()=>AdvisorShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$caption$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/caption.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/controls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$offer$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/offer-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$script$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/script-panel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/stage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$use$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/use-advisor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$use$2d$speech$2d$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/use-speech-input.ts [app-client] (ecmascript)");
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
function AdvisorShell() {
    _s();
    const advisor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$use$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdvisor"])();
    const input = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputFocus"])();
    const [scriptOpen, setScriptOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const mic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$use$2d$speech$2d$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechInput"])({
        "AdvisorShell.useSpeechInput[mic]": (text, final)=>{
            if (final) {
                input.setText("");
                if (text) advisor.say(text);
            } else {
                input.setText(text);
            }
        }
    }["AdvisorShell.useSpeechInput[mic]"]);
    const { snapshot, mainStep, availability } = advisor;
    const pausedAt = snapshot ? `${snapshot.mainIndex + 1}/${mainStep?.count ?? 8}` : null;
    const micText = mic.supported ? "mic: hold the button to talk" : "mic: not supported in this browser, type instead";
    const liveText = availability.live ? "live answers: on" : availability.backup ? "live answers: off (backup mode)" : "live answers: off (offline)";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "mx-auto flex min-h-screen w-full max-w-xl flex-col gap-4 px-4 py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBar"], {
                mode: advisor.mode,
                backup: availability.backup,
                sound: advisor.sound,
                scriptOpen: scriptOpen,
                onSound: ()=>advisor.setSound(!advisor.sound),
                onScript: ()=>setScriptOpen((open)=>!open)
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StepBar"], {
                main: advisor.mainStep,
                side: advisor.sideStep,
                mode: advisor.mode
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stage"], {
                world: advisor.world,
                figure: advisor.figure,
                pausedAt: pausedAt
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$caption$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Caption"], {
                line: advisor.line
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            advisor.offer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$offer$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfferCard"], {
                confirmed: advisor.offerConfirmed,
                onConfirm: advisor.confirmOffer
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 44,
                columnNumber: 25
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chips"], {
                mode: advisor.mode,
                onStart: advisor.start,
                onSay: advisor.say,
                onResume: advisor.resume,
                onMore: ()=>{
                    advisor.interrupt();
                    input.focus();
                }
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputRow"], {
                mode: advisor.mode,
                micSupported: mic.supported,
                micActive: mic.listening,
                text: input.text,
                onText: input.setText,
                onSubmit: advisor.say,
                onStop: advisor.interrupt,
                onMicDown: ()=>{
                    advisor.interrupt();
                    mic.start();
                },
                onMicUp: mic.stop,
                inputRef: input.ref
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs leading-5 text-faint",
                children: [
                    liveText,
                    " · ",
                    advisor.availability.voiceLine,
                    " · ",
                    micText
                ]
            }, void 0, true, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            advisor.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-coral",
                children: advisor.error
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 73,
                columnNumber: 25
            }, this),
            scriptOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$script$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScriptPanel"], {
                snapshot: advisor.snapshot,
                playing: advisor.playing
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 74,
                columnNumber: 22
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/advisor-shell.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(AdvisorShell, "OLTBGovj1oZxpKFvZaEe2asiCGs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$use$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdvisor"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputFocus"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$use$2d$speech$2d$input$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpeechInput"]
    ];
});
_c = AdvisorShell;
var _c;
__turbopack_context__.k.register(_c, "AdvisorShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/caption.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Caption",
    ()=>Caption
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Caption({ line }) {
    const cues = new Set(line?.cueIndices ?? []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "h-[4.5rem] overflow-hidden text-base leading-6 sm:h-[5.25rem] sm:text-lg sm:leading-7",
        "aria-live": "polite",
        children: line?.words.map((word, index)=>{
            const spoken = index < line.spoken;
            const color = !spoken ? "text-faint" : cues.has(index) ? "text-spend" : "text-paper";
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `transition-colors duration-150 ${color}`,
                children: [
                    word,
                    " "
                ]
            }, index, true, {
                fileName: "[project]/components/caption.tsx",
                lineNumber: 17,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/components/caption.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Caption;
var _c;
__turbopack_context__.k.register(_c, "Caption");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/controls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chips",
    ()=>Chips,
    "InputRow",
    ()=>InputRow,
    "StatusBar",
    ()=>StatusBar,
    "StepBar",
    ()=>StepBar,
    "useInputFocus",
    ()=>useInputFocus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const modeText = {
    idle: "Ready",
    presenting: "Presenting your year",
    listening: "Listening…",
    side: "Answering your question",
    waiting: "Shall we continue?",
    returning: "Picking up where we left off",
    finished: "Finished"
};
const buttonBase = "rounded-full border border-edge px-3 py-1.5 text-xs text-paper transition-colors hover:border-faint focus-visible:outline focus-visible:outline-1 focus-visible:outline-paper";
function StatusBar(props) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "flex items-center justify-between gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "min-w-0 truncate text-sm text-paper",
                "aria-live": "polite",
                children: [
                    modeText[props.mode],
                    props.backup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2 text-xs text-faint",
                        children: "backup mode"
                    }, void 0, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 23,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex shrink-0 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: buttonBase,
                        "aria-pressed": props.sound,
                        onClick: props.onSound,
                        children: props.sound ? "Sound on" : "Sound off"
                    }, void 0, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: buttonBase,
                        "aria-pressed": props.scriptOpen,
                        onClick: props.onScript,
                        children: "Script"
                    }, void 0, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c = StatusBar;
function StepBar({ main, side, mode }) {
    const mainCount = main?.count ?? 8;
    const finished = mode === "finished";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1.5",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1",
                children: Array.from({
                    length: mainCount
                }, (_, i)=>{
                    const done = finished || main !== null && i < main.index;
                    const current = !finished && main !== null && i === main.index;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `h-1 flex-1 rounded-full ${done ? "bg-spend/60" : current ? "bg-spend" : "bg-edge"}`
                    }, i, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 49,
                        columnNumber: 18
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-1 gap-1",
                children: side && Array.from({
                    length: side.count
                }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `h-1 flex-1 rounded-full ${i < side.index ? "bg-saved/60" : i === side.index ? "bg-saved" : "bg-edge"}`
                    }, i, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 55,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c1 = StepBar;
function Chips({ mode, onStart, onSay, onResume, onMore }) {
    const ask = (text)=>({
            label: text,
            run: ()=>onSay(text)
        });
    const cont = {
        label: "OK, let's continue",
        run: onResume
    };
    const chips = {
        idle: [
            {
                label: "Start the presentation",
                run: onStart
            }
        ],
        presenting: [
            ask("Wait, why is September so high?"),
            ask("Wait, what am I looking at?")
        ],
        listening: [
            ask("Why is September so high?"),
            ask("Why was November high?"),
            cont
        ],
        side: [
            cont
        ],
        waiting: [
            cont,
            {
                label: "One more question",
                run: onMore
            }
        ],
        returning: [],
        finished: [
            {
                label: "Start over",
                run: onStart
            }
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-[4.5rem] flex-wrap content-start gap-2",
        children: chips[mode].map((chip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: chip.run,
                className: "rounded-full border border-edge bg-panel px-4 py-2 text-left text-sm text-paper transition-colors hover:border-faint focus-visible:outline focus-visible:outline-1 focus-visible:outline-paper",
                children: chip.label
            }, chip.label, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
_c2 = Chips;
function InputRow(props) {
    const canStop = props.mode === "presenting" || props.mode === "returning" || props.mode === "side";
    const submit = ()=>{
        const value = props.text.trim();
        if (!value) return;
        props.onSubmit(value);
        props.onText("");
    };
    const onKey = (event)=>{
        if (event.key === "Enter") submit();
    };
    const small = "h-11 shrink-0 rounded-xl border border-edge px-3 text-sm text-paper transition-colors hover:border-faint disabled:opacity-40 focus-visible:outline focus-visible:outline-1 focus-visible:outline-paper";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: props.inputRef,
                value: props.text,
                onChange: (event)=>props.onText(event.target.value),
                onKeyDown: onKey,
                placeholder: "Ask about what is on screen",
                "aria-label": "Your question",
                className: "h-11 min-w-0 flex-1 rounded-xl border border-edge bg-panel px-3 text-sm text-paper placeholder:text-faint focus:border-faint focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: !props.micSupported,
                "aria-label": "Hold to talk",
                title: props.micSupported ? "Hold to talk" : "Speech input is not available in this browser",
                onPointerDown: (event)=>{
                    event.preventDefault();
                    props.onMicDown();
                },
                onPointerUp: props.onMicUp,
                onPointerLeave: props.onMicUp,
                onPointerCancel: props.onMicUp,
                onContextMenu: (event)=>event.preventDefault(),
                className: `${small} select-none touch-none ${props.micActive ? "border-spend text-spend" : ""}`,
                children: props.micActive ? "● Mic" : "Mic"
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: !canStop,
                onClick: props.onStop,
                className: small,
                children: "Stop"
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: submit,
                disabled: !props.text.trim(),
                className: `${small} bg-paper text-night hover:bg-paper/90`,
                children: "Ask"
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_c3 = InputRow;
function useInputFocus() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    return {
        ref,
        text,
        setText,
        focus: ()=>ref.current?.focus()
    };
}
_s(useInputFocus, "BcjXds8Yo2P6lAnTzg5HwWZR3dU=");
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "StatusBar");
__turbopack_context__.k.register(_c1, "StepBar");
__turbopack_context__.k.register(_c2, "Chips");
__turbopack_context__.k.register(_c3, "InputRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/format.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Swiss number format used on screen: 14'363, negatives with a real minus sign. */ __turbopack_context__.s([
    "swiss",
    ()=>swiss
]);
function swiss(value) {
    const rounded = Math.round(Math.abs(value));
    const grouped = String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    return value < 0 && rounded !== 0 ? `−${grouped}` : grouped;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/offer-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OfferCard",
    ()=>OfferCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function OfferCard({ confirmed, onConfirm }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Offer",
        className: "rounded-2xl border border-saved/40 bg-panel p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base font-medium text-paper",
                children: "CHF 200 a month, into pillar 3a"
            }, void 0, false, {
                fileName: "[project]/components/offer-card.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            confirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-saved",
                children: "Confirmed. In this demo no real money moved."
            }, void 0, false, {
                fileName: "[project]/components/offer-card.tsx",
                lineNumber: 8,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onConfirm,
                        className: "mt-3 w-full rounded-xl bg-saved px-4 py-3 text-sm font-semibold text-night transition-opacity hover:opacity-90",
                        children: "Tap to confirm"
                    }, void 0, false, {
                        fileName: "[project]/components/offer-card.tsx",
                        lineNumber: 11,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-faint",
                        children: "This demo moves no real money."
                    }, void 0, false, {
                        fileName: "[project]/components/offer-card.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/offer-card.tsx",
                lineNumber: 10,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/offer-card.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = OfferCard;
var _c;
__turbopack_context__.k.register(_c, "OfferCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/placeholder-world.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlaceholderWorld",
    ()=>PlaceholderWorld
]);
const targetsByScene = {
    galaxy: [],
    river: [],
    pools: [
        "Housing",
        "Electronics",
        "Travel",
        "Health",
        "Left over"
    ],
    travel: [
        "USA",
        "London",
        "Copenhagen",
        "Other"
    ],
    jars: [
        "3a",
        "Savings"
    ],
    level: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        "13"
    ],
    monthly: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12
    ]
};
class PlaceholderWorld {
    view = {
        scene: null,
        focus: null,
        breakdown: null,
        ghost: null,
        filledJars: [],
        changedAt: 0
    };
    listeners = new Set();
    subscribe(listener) {
        this.listeners.add(listener);
        return ()=>this.listeners.delete(listener);
    }
    set(patch) {
        this.view = {
            ...this.view,
            ...patch
        };
        this.listeners.forEach((listener)=>listener());
    }
    currentScene() {
        return this.view.scene;
    }
    currentFocus() {
        return this.view.focus;
    }
    focusTargets() {
        const { scene, breakdown } = this.view;
        if (breakdown) return breakdown.parts.map((part)=>part.name);
        return scene ? targetsByScene[scene] : [];
    }
    enter(scene) {
        if (scene === this.view.scene) return;
        this.set({
            scene,
            focus: null,
            breakdown: null,
            ghost: null,
            changedAt: typeof performance !== "undefined" ? performance.now() : 0
        });
    }
    focus(target) {
        this.set({
            focus: target
        });
    }
    unfocus() {
        this.set({
            focus: null
        });
    }
    breakdown(b) {
        this.set({
            breakdown: b
        });
    }
    collapse() {
        this.set({
            breakdown: null
        });
    }
    ghost(target) {
        this.set({
            ghost: target
        });
    }
    fillJar(jar) {
        if (!this.view.filledJars.includes(jar)) this.set({
            filledJars: [
                ...this.view.filledJars,
                jar
            ]
        });
    }
    /** Not part of World: clear the demo state when the presentation starts over. */ reset() {
        this.set({
            scene: null,
            focus: null,
            breakdown: null,
            ghost: null,
            filledJars: []
        });
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/script-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScriptPanel",
    ()=>ScriptPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ScriptPanel({ snapshot, playing }) {
    const block = "max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-night p-3 text-xs text-paper";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Script",
        className: "rounded-2xl border border-edge bg-panel p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xs uppercase tracking-wide text-faint",
                children: "Saved snapshot"
            }, void 0, false, {
                fileName: "[project]/components/script-panel.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: `mt-2 ${block}`,
                children: snapshot ? JSON.stringify(snapshot, null, 2) : "null"
            }, void 0, false, {
                fileName: "[project]/components/script-panel.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-4 text-xs uppercase tracking-wide text-faint",
                children: playing ? `Playing script (${playing.kind}${playing.source ? `, ${playing.source}` : ""})` : "Playing script"
            }, void 0, false, {
                fileName: "[project]/components/script-panel.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: `mt-2 ${block}`,
                children: playing ? JSON.stringify(playing.script, null, 2) : "null"
            }, void 0, false, {
                fileName: "[project]/components/script-panel.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/script-panel.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = ScriptPanel;
var _c;
__turbopack_context__.k.register(_c, "ScriptPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/stage-canvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StageCanvas",
    ()=>StageCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
/**
 * The ONLY component that draws the world. Until the real grain world exists it draws the scene name,
 * focus and breakdown parts as simple shapes. Swap this component (and the World the hook creates) later.
 */ const monthlySpending = [
    5994,
    7063,
    6028,
    6626,
    6435,
    10365,
    12363,
    4565,
    14363,
    3845,
    7390,
    3342
];
const balance = [
    -120,
    -700,
    -1500,
    -2300,
    -3100,
    -4000,
    -4700,
    -5200,
    -5640,
    -3000,
    500,
    8816
];
const pools = [
    {
        name: "Housing",
        grains: 225,
        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend,
        x: 0.22,
        y: 0.42
    },
    {
        name: "Electronics",
        grains: 132,
        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend,
        x: 0.5,
        y: 0.3
    },
    {
        name: "Travel",
        grains: 129,
        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend,
        x: 0.78,
        y: 0.45
    },
    {
        name: "Health",
        grains: 123,
        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend,
        x: 0.38,
        y: 0.72
    },
    {
        name: "Left over",
        grains: 88,
        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved,
        x: 0.72,
        y: 0.76
    }
];
const trips = [
    {
        name: "USA",
        grains: 80,
        x: 0.25,
        y: 0.5
    },
    {
        name: "London",
        grains: 30,
        x: 0.52,
        y: 0.35
    },
    {
        name: "Copenhagen",
        grains: 20,
        x: 0.75,
        y: 0.55
    },
    {
        name: "Other",
        grains: 10,
        x: 0.5,
        y: 0.78
    }
];
const same = (a, b)=>a !== null && String(a).toLowerCase() === String(b).toLowerCase();
function cluster(ctx, cx, cy, count, r, color, alpha) {
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    for(let k = 0; k < count; k++){
        const angle = k * 2.39996;
        const dist = r * 1.9 * Math.sqrt(k + 0.5);
        ctx.beginPath();
        ctx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, r, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}
function label(ctx, text, x, y, color = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint, align = "center") {
    ctx.fillStyle = color;
    ctx.font = "11px Inter, Arial, sans-serif";
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
}
function column(ctx, x, baseY, grains, pitch, color, alpha, up = true) {
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    for(let k = 0; k < grains; k++){
        const row = Math.floor(k / 4);
        const col = k % 4;
        const y = up ? baseY - row * pitch : baseY + row * pitch;
        ctx.beginPath();
        ctx.arc(x + (col - 1.5) * pitch, y, pitch * 0.38, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}
function drawWorld(ctx, w, h, view, now) {
    ctx.clearRect(0, 0, w, h);
    if (!view.scene) {
        label(ctx, "The whiteboard is empty", w / 2, h / 2);
        return;
    }
    const fade = Math.min(1, (now - view.changedAt) / 400);
    ctx.globalAlpha = fade;
    const { scene, focus, breakdown } = view;
    const unit = Math.min(w / 12, (h - 34) / 38);
    const dim = (match)=>focus === null || match ? 0.95 : 0.2;
    if (scene === "galaxy") {
        cluster(ctx, w / 2, h / 2, 420, Math.min(w, h) * 0.014, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper, 0.55);
    } else if (scene === "river") {
        for(let wave = 0; wave < 13; wave++){
            ctx.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend;
            ctx.globalAlpha = fade * 0.6;
            for(let k = 0; k < 24; k++){
                const t = k / 23;
                const x = w * (0.92 - 0.85 * t) + wave * 3;
                const y = h * (0.12 + 0.7 * t) + Math.sin(t * 6 + wave * 0.5) * 8 + wave * 2.5;
                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = fade;
    } else if (scene === "pools") {
        for (const p of pools){
            cluster(ctx, w * p.x, h * p.y, p.grains / 2.2, Math.min(w, h) * 0.011, p.color, dim(same(focus, p.name)));
            label(ctx, p.name, w * p.x, h * p.y + Math.min(w, h) * 0.16, same(focus, p.name) ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint);
        }
    } else if (scene === "travel") {
        for (const trip of trips){
            cluster(ctx, w * trip.x, h * trip.y, trip.grains / 1.5, Math.min(w, h) * 0.012, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend, dim(same(focus, trip.name)));
            label(ctx, trip.name, w * trip.x, h * trip.y + Math.min(w, h) * 0.13, same(focus, trip.name) ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint);
        }
    } else if (scene === "jars") {
        const jars = [
            {
                name: "Pillar 3a",
                key: "3a",
                x: 0.32
            },
            {
                name: "Savings",
                key: "Savings",
                x: 0.68
            }
        ];
        for (const jar of jars){
            const jx = w * jar.x - 38;
            const jy = h * 0.4;
            const filled = view.filledJars.includes(jar.key);
            ctx.strokeStyle = filled ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral;
            ctx.globalAlpha = fade * dim(same(focus, jar.key));
            ctx.lineWidth = 1.5;
            ctx.setLineDash(filled ? [] : [
                5,
                5
            ]);
            ctx.strokeRect(jx, jy, 76, h * 0.45);
            ctx.setLineDash([]);
            if (filled) cluster(ctx, jx + 38, jy + h * 0.45 - 22, 24, 3.2, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved, 0.95);
            label(ctx, jar.name, jx + 38, jy - 8, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper);
        }
        ctx.globalAlpha = fade;
        cluster(ctx, w / 2, h * 0.14, 40, 2.4, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend, 0.6);
    } else if (scene === "level") {
        const baseY = h * 0.45;
        ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint;
        ctx.globalAlpha = fade * 0.6;
        ctx.beginPath();
        ctx.moveTo(0, baseY);
        ctx.lineTo(w, baseY);
        ctx.stroke();
        balance.forEach((value, i)=>{
            const x = (i + 0.5) * (w / 12);
            const grains = Math.round(Math.abs(value) / 100);
            ctx.globalAlpha = fade;
            column(ctx, x, baseY + (value < 0 ? 6 : -6), Math.min(grains, 60), unit * 0.55, value < 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved, dim(same(focus, i + 1)), value >= 0);
        });
    } else {
        const baseY = h - 22;
        monthlySpending.forEach((value, i)=>{
            const x = (i + 0.5) * (w / 12);
            const hit = same(focus, i + 1);
            const open = breakdown?.month === i + 1;
            const alpha = breakdown ? open ? 0.1 : 0.12 : dim(hit);
            column(ctx, x, baseY, Math.round(value / 100), unit * 0.55, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend, alpha);
            label(ctx, String(i + 1), x, h - 6, hit || open ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint);
            if (open && breakdown) {
                ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint;
                ctx.setLineDash([
                    4,
                    4
                ]);
                ctx.strokeRect(x - unit * 1.2, baseY - Math.round(value / 100 / 4) * unit * 0.55 - 4, unit * 2.4, Math.round(value / 100 / 4) * unit * 0.55 + 8);
                ctx.setLineDash([]);
                const left = i >= 6;
                breakdown.parts.slice(0, 5).forEach((part, k)=>{
                    const side = unit * (3 + k % 2 * 5);
                    const px = Math.min(w * 0.9, Math.max(w * 0.1, left ? x - side : x + side));
                    const py = h * 0.18 + k * (h * 0.15);
                    const part_focus = same(focus, part.name);
                    cluster(ctx, px, py, Math.max(3, Math.round(part.value / 100)), Math.max(2, unit * 0.2), __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend, focus === null || part_focus ? 0.95 : 0.3);
                    label(ctx, `${part.name}`, px, py + unit * 1.4, part_focus ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint);
                });
            }
        });
    }
    ctx.globalAlpha = 1;
    label(ctx, `scene: ${scene}${focus !== null ? ` · focus: ${focus}` : ""}${breakdown ? ` · open: month ${breakdown.month}` : ""}${view.ghost !== null ? ` · missing: ${view.ghost}` : ""}`, 8, 14, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint, "left");
}
function StageCanvas({ world }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StageCanvas.useEffect": ()=>{
            const canvas = ref.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            let width = 0;
            let height = 0;
            let raf = 0;
            const render = {
                "StageCanvas.useEffect.render": ()=>{
                    raf = 0;
                    if (!width || !height) return;
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    ctx.scale(dpr, dpr);
                    drawWorld(ctx, width, height, world.view, performance.now());
                    if (world.view.scene && performance.now() - world.view.changedAt < 450) schedule();
                }
            }["StageCanvas.useEffect.render"];
            const schedule = {
                "StageCanvas.useEffect.schedule": ()=>{
                    if (!raf) raf = requestAnimationFrame(render);
                }
            }["StageCanvas.useEffect.schedule"];
            const resize = {
                "StageCanvas.useEffect.resize": ()=>{
                    const rect = canvas.getBoundingClientRect();
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    width = rect.width;
                    height = rect.height;
                    canvas.width = Math.round(width * dpr);
                    canvas.height = Math.round(height * dpr);
                    schedule();
                }
            }["StageCanvas.useEffect.resize"];
            const observer = new ResizeObserver(resize);
            observer.observe(canvas);
            const off = world.subscribe(schedule);
            resize();
            return ({
                "StageCanvas.useEffect": ()=>{
                    observer.disconnect();
                    off();
                    if (raf) cancelAnimationFrame(raf);
                }
            })["StageCanvas.useEffect"];
        }
    }["StageCanvas.useEffect"], [
        world
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: ref,
        className: "block h-full w-full",
        role: "img",
        "aria-label": "Whiteboard showing the current scene"
    }, void 0, false, {
        fileName: "[project]/components/stage-canvas.tsx",
        lineNumber: 209,
        columnNumber: 10
    }, this);
}
_s(StageCanvas, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = StageCanvas;
var _c;
__turbopack_context__.k.register(_c, "StageCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/stage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Stage",
    ()=>Stage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stage$2d$canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/stage-canvas.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const DURATION_MS = 1100;
const easeOutCubic = (t)=>1 - Math.pow(1 - t, 3);
/** Big number: animates old -> new in ~1.1 s, ease-out cubic. */ function FigureCounter({ change }) {
    _s();
    const [shown, setShown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(change ? change.to.value : null);
    const current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(shown);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FigureCounter.useEffect": ()=>{
            if (!change) {
                current.current = null;
                setShown(null);
                return;
            }
            const from = change.from?.value ?? current.current ?? change.to.value;
            const to = change.to.value;
            const reduced = ("TURBOPACK compile-time value", "object") !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
            if (reduced || from === to) {
                current.current = to;
                setShown(to);
                return;
            }
            const startedAt = performance.now();
            let raf = 0;
            const tick = {
                "FigureCounter.useEffect.tick": (now)=>{
                    const t = Math.min(1, (now - startedAt) / DURATION_MS);
                    const value = from + (to - from) * easeOutCubic(t);
                    current.current = value;
                    setShown(value);
                    if (t < 1) raf = requestAnimationFrame(tick);
                }
            }["FigureCounter.useEffect.tick"];
            raf = requestAnimationFrame(tick);
            return ({
                "FigureCounter.useEffect": ()=>cancelAnimationFrame(raf)
            })["FigureCounter.useEffect"];
        }
    }["FigureCounter.useEffect"], [
        change
    ]);
    const tone = change && change.to.value < 0 ? "text-coral" : "text-paper";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-[5.25rem]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "min-h-[1.25rem] text-xs uppercase tracking-wide text-faint",
                children: change?.to.label ?? " "
            }, void 0, false, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `text-5xl font-semibold tabular-nums leading-tight sm:text-6xl ${tone}`,
                "aria-live": "off",
                children: shown === null ? "–" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(shown)
            }, void 0, false, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/stage.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(FigureCounter, "PNPeSC97ppWRpkQTI/ETjUlX3iY=");
_c = FigureCounter;
function Stage({ world, figure, pausedAt }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Stage",
        className: "rounded-2xl border border-edge bg-panel p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FigureCounter, {
                change: figure
            }, void 0, false, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 h-56 w-full overflow-hidden rounded-xl bg-night sm:h-72",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stage$2d$canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StageCanvas"], {
                    world: world
                }, void 0, false, {
                    fileName: "[project]/components/stage.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex min-h-[1.75rem] items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-faint",
                        children: "1 grain = CHF 100"
                    }, void 0, false, {
                        fileName: "[project]/components/stage.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    pausedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-saved/15 px-3 py-1 text-xs font-medium text-saved",
                        children: `↩ Paused at ${pausedAt}`
                    }, void 0, false, {
                        fileName: "[project]/components/stage.tsx",
                        lineNumber: 66,
                        columnNumber: 22
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/stage.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c1 = Stage;
var _c, _c1;
__turbopack_context__.k.register(_c, "FigureCounter");
__turbopack_context__.k.register(_c1, "Stage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Colours shared by canvas drawing (CSS uses the same values through tailwind.config.ts). */ __turbopack_context__.s([
    "theme",
    ()=>theme
]);
const theme = {
    night: "#0b0d12",
    paper: "#e8eaf0",
    faint: "#5b6272",
    spend: "#e8a33d",
    coral: "#e5655b",
    saved: "#5fbf8a"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/use-advisor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OFFER_FIGURE",
    ()=>OFFER_FIGURE,
    "OFFER_JAR",
    ()=>OFFER_JAR,
    "useAdvisor",
    ()=>useAdvisor
]);
/**
 * ALL engine wiring lives in this file. The UI shell only reads what this hook returns.
 * To switch to the real grain world, replace `new PlaceholderWorld()` and the <StageCanvas> in stage.tsx.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/client/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/conversation/state.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/player/voice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/content/scripts.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$placeholder$2d$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/placeholder-world.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const OFFER_JAR = "3a";
const OFFER_FIGURE = {
    label: "In pillar 3a after one year",
    value: 2400
};
const OPENING_FIGURE = {
    label: "Income in 2025",
    value: 97032
};
const initialState = {
    mode: "idle",
    line: null,
    main: null,
    side: null,
    figure: {
        seq: 0,
        from: null,
        to: OPENING_FIGURE
    },
    snapshot: null,
    playing: null,
    offer: null,
    offerConfirmed: false,
    error: null
};
function reducer(state, action) {
    if (action.type === "reset") return {
        ...initialState,
        figure: {
            seq: state.figure.seq + 1,
            from: null,
            to: OPENING_FIGURE
        }
    };
    if (action.type === "confirmed") return {
        ...state,
        offerConfirmed: true
    };
    const event = action.event;
    switch(event.type){
        case "line":
            {
                const step = event.beatIndex !== null && event.beatCount !== null ? {
                    index: event.beatIndex,
                    count: event.beatCount
                } : null;
                return {
                    ...state,
                    line: {
                        words: event.words,
                        cueIndices: event.cueIndices,
                        spoken: 0
                    },
                    main: event.kind === "main" && step ? step : state.main,
                    side: event.kind === "side" && step ? step : event.kind === "main" ? null : state.side
                };
            }
        case "word":
            return state.line ? {
                ...state,
                line: {
                    ...state.line,
                    spoken: event.index + 1
                }
            } : state;
        case "lineEnd":
            return event.completed && state.line ? {
                ...state,
                line: {
                    ...state.line,
                    spoken: state.line.words.length
                }
            } : state;
        case "figure":
            return {
                ...state,
                figure: {
                    seq: state.figure.seq + 1,
                    from: event.from,
                    to: event.to
                }
            };
        case "offer":
            return {
                ...state,
                offer: event.beat,
                offerConfirmed: false
            };
        case "mode":
            return {
                ...state,
                mode: event.mode
            };
        case "snapshot":
            return {
                ...state,
                snapshot: event.snapshot
            };
        case "script":
            return {
                ...state,
                playing: {
                    kind: event.kind,
                    script: event.script,
                    source: event.source
                }
            };
        case "error":
            return {
                ...state,
                error: event.message
            };
        default:
            return state;
    }
}
function useAdvisor() {
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(reducer, initialState);
    const [backup, setBackup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sound, setSoundState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [voiceLine, setVoiceLine] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Voice: checking…");
    const [online, setOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const world = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useAdvisor.useMemo[world]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$placeholder$2d$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlaceholderWorld"]()
    }["useAdvisor.useMemo[world]"], []);
    const engine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const voice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdvisor.useEffect": ()=>{
            setBackup((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBackupMode"])());
            setOnline(navigator.onLine);
            const update = {
                "useAdvisor.useEffect.update": ()=>setOnline(navigator.onLine)
            }["useAdvisor.useEffect.update"];
            window.addEventListener("online", update);
            window.addEventListener("offline", update);
            return ({
                "useAdvisor.useEffect": ()=>{
                    window.removeEventListener("online", update);
                    window.removeEventListener("offline", update);
                }
            })["useAdvisor.useEffect"];
        }
    }["useAdvisor.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdvisor.useEffect": ()=>{
            if (backup === null) return;
            const speaker = new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Voice"]({
                backup,
                onStatus: {
                    "useAdvisor.useEffect": (_status)=>setVoiceLine(speaker.statusLine())
                }["useAdvisor.useEffect"]
            });
            const conversation = new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Conversation"]({
                world,
                voice: speaker,
                main: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAIN"],
                prepared: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SIDE_ANSWERS"],
                backup
            });
            engine.current = conversation;
            voice.current = speaker;
            world.enter("galaxy");
            setVoiceLine(speaker.statusLine());
            const off = conversation.on({
                "useAdvisor.useEffect.off": (event)=>dispatch({
                        type: "engine",
                        event
                    })
            }["useAdvisor.useEffect.off"]);
            void speaker.preload(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAIN"].map({
                "useAdvisor.useEffect": (beat)=>beat.say
            }["useAdvisor.useEffect"])).then({
                "useAdvisor.useEffect": ()=>setVoiceLine(speaker.statusLine())
            }["useAdvisor.useEffect"], {
                "useAdvisor.useEffect": ()=>undefined
            }["useAdvisor.useEffect"]);
            return ({
                "useAdvisor.useEffect": ()=>{
                    off();
                    conversation.end();
                    engine.current = null;
                    voice.current = null;
                }
            })["useAdvisor.useEffect"];
        }
    }["useAdvisor.useEffect"], [
        backup,
        world
    ]);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[start]": ()=>{
            world.reset();
            dispatch({
                type: "reset"
            });
            void engine.current?.start();
        }
    }["useAdvisor.useCallback[start]"], [
        world
    ]);
    const interrupt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[interrupt]": ()=>engine.current?.interrupt()
    }["useAdvisor.useCallback[interrupt]"], []);
    /** Any typed, spoken or chip text; the engine classifies it (continue / wait / end / question). */ const say = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[say]": (text)=>void engine.current?.input(text)
    }["useAdvisor.useCallback[say]"], []);
    const resume = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[resume]": ()=>void engine.current?.resume()
    }["useAdvisor.useCallback[resume]"], []);
    const confirmOffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[confirmOffer]": ()=>{
            engine.current?.confirmOffer(OFFER_JAR, OFFER_FIGURE);
            dispatch({
                type: "confirmed"
            });
        }
    }["useAdvisor.useCallback[confirmOffer]"], []);
    const setSound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[setSound]": (on)=>{
            setSoundState(on);
            voice.current?.setMuted(!on);
        }
    }["useAdvisor.useCallback[setSound]"], []);
    return {
        mode: state.mode,
        line: state.line,
        figure: state.figure,
        mainStep: state.main,
        sideStep: state.side,
        snapshot: state.snapshot,
        playing: state.playing,
        offer: state.offer,
        offerConfirmed: state.offerConfirmed,
        error: state.error,
        world,
        sound,
        availability: {
            backup: backup === true,
            live: backup === false && online,
            voiceLine
        },
        start,
        interrupt,
        say,
        resume,
        confirmOffer,
        setSound
    };
}
_s(useAdvisor, "Q0xAF19tBEhy7Xnz8ZzaURZoWhg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/use-speech-input.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useSpeechInput",
    ()=>useSpeechInput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function getCtor() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const w = window;
    return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
function useSpeechInput(onText) {
    _s();
    const [supported, setSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [listening, setListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const recognition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const callback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onText);
    callback.current = onText;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSpeechInput.useEffect": ()=>{
            setSupported(getCtor() !== null);
            return ({
                "useSpeechInput.useEffect": ()=>recognition.current?.abort()
            })["useSpeechInput.useEffect"];
        }
    }["useSpeechInput.useEffect"], []);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechInput.useCallback[start]": ()=>{
            const Ctor = getCtor();
            if (!Ctor || recognition.current) return;
            const rec = new Ctor();
            rec.lang = "en-US";
            rec.interimResults = true;
            rec.continuous = false;
            rec.onresult = ({
                "useSpeechInput.useCallback[start]": (event)=>{
                    let text = "";
                    let final = false;
                    for(let i = event.resultIndex; i < event.results.length; i++){
                        text += event.results[i][0].transcript;
                        if (event.results[i].isFinal) final = true;
                    }
                    callback.current(text.trim(), final);
                }
            })["useSpeechInput.useCallback[start]"];
            const done = {
                "useSpeechInput.useCallback[start].done": ()=>{
                    recognition.current = null;
                    setListening(false);
                }
            }["useSpeechInput.useCallback[start].done"];
            rec.onend = done;
            rec.onerror = done;
            recognition.current = rec;
            try {
                rec.start();
                setListening(true);
            } catch  {
                done();
            }
        }
    }["useSpeechInput.useCallback[start]"], []);
    const stop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useSpeechInput.useCallback[stop]": ()=>recognition.current?.stop()
    }["useSpeechInput.useCallback[stop]"], []);
    return {
        supported,
        listening,
        start,
        stop
    };
}
_s(useSpeechInput, "DzNrSkGiGEDpdjGS4m7u8iW3PZ0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/content/scripts.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BACKUP_NO_ANSWER_LINE",
    ()=>BACKUP_NO_ANSWER_LINE,
    "FINISHED_LINE",
    ()=>FINISHED_LINE,
    "FIXED_LINES",
    ()=>FIXED_LINES,
    "MAIN",
    ()=>MAIN,
    "NOT_UNDERSTOOD_LINE",
    ()=>NOT_UNDERSTOOD_LINE,
    "OFFER_CONFIRMED_LINE",
    ()=>OFFER_CONFIRMED_LINE,
    "SIDE_ANSWERS",
    ()=>SIDE_ANSWERS,
    "allLines",
    ()=>allLines
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$facts$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/facts.json.[json].cjs [app-client] (ecmascript)");
;
;
/**
 * The advisor's words (docs/IMPLEMENTATION_PLAN.md section 10).
 *
 * Rules: every number comes from public/facts.json (checked in tests/facts-export.test.ts); `say` is one sentence of at
 * most 18 words with at most 2 cues, cue words appear verbatim and never first; speech says "francs"; calm, no shaming;
 * missing payments are asked, never asserted; one option at most. MAIN deliberately never mentions September (the tallest
 * bar) so that is the natural moment for the audience to interrupt.
 */ const facts = __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$facts$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
/** Breakdown for a month, taken from facts.json so the parts always add up to the month's spending. */ const breakdown = (month)=>({
        month,
        parts: facts.monthly_breakdown_parts[String(month)]
    });
const MAIN = [
    {
        say: "This is your 2025, Jeanine: 97,032 francs came in, and each grain is a hundred francs.",
        scene: {
            type: "galaxy"
        },
        figure: {
            label: "Income in 2025",
            value: 97032
        },
        bridge: "Back to the start of your year."
    },
    {
        say: "Here is every month of spending, twelve columns that together add up to 88,379 francs.",
        scene: {
            type: "monthly"
        },
        cues: [
            {
                word: "88,379",
                figure: {
                    label: "Spent in 2025",
                    value: 88379
                }
            }
        ],
        bridge: "Back to the twelve months of spending."
    },
    {
        say: "The summer was heavy: June cost 10,365 francs, July 12,363, largely the bike and London.",
        scene: {
            type: "monthly"
        },
        cues: [
            {
                word: "June",
                target: 6,
                figure: {
                    label: "June",
                    value: 10365
                }
            },
            {
                word: "July",
                target: 7,
                figure: {
                    label: "July",
                    value: 12363
                }
            }
        ],
        bridge: "Picking up where we left off: the summer months."
    },
    {
        say: "Four things took most: housing 22,462 francs, electronics 13,160, travel 12,938 and health 12,335.",
        scene: {
            type: "pools"
        },
        cues: [
            {
                word: "housing",
                target: "Housing",
                figure: {
                    label: "Housing",
                    value: 22462
                }
            },
            {
                word: "electronics",
                target: "Electronics",
                figure: {
                    label: "Electronics",
                    value: 13160
                }
            }
        ],
        bridge: "Back to where the money went."
    },
    {
        say: "By October you sat 2,720 francs below the start; December's thirteenth salary lifts you to 8,816, otherwise 1,352.",
        scene: {
            type: "level"
        },
        cues: [
            {
                word: "October",
                target: 10,
                figure: {
                    label: "October, compared with the start of the year",
                    value: -2720
                }
            },
            {
                word: "thirteenth",
                target: "13",
                figure: {
                    label: "Year end, compared with the start",
                    value: 8816
                }
            }
        ],
        bridge: "Picking up with the balance of your account."
    },
    {
        say: "In February I don't see your 982 francs health insurance payment; was it paid elsewhere?",
        scene: {
            type: "monthly",
            focus: 2
        },
        cues: [
            {
                word: "insurance",
                target: 2,
                action: "ghost",
                figure: {
                    label: "Health insurance, usually",
                    value: 982
                }
            }
        ],
        bridge: "Back to the February payment."
    },
    {
        say: "I also see no pillar 3a payment and no savings transfer this year; do you keep them elsewhere?",
        scene: {
            type: "jars"
        },
        cues: [
            {
                word: "pillar",
                target: "3a"
            },
            {
                word: "savings",
                target: "Savings"
            }
        ],
        bridge: "Back to what never started this year."
    },
    {
        say: "If you like, 200 francs a month into pillar 3a adds up to 2,400 francs in a year.",
        scene: {
            type: "jars",
            focus: "3a"
        },
        cues: [
            {
                word: "pillar",
                target: "3a"
            },
            {
                word: "2,400",
                figure: {
                    label: "In pillar 3a after one year",
                    value: 2400
                }
            }
        ],
        offer: true,
        bridge: "Back to the one option I wanted to show you."
    }
];
const asks = (pattern)=>(question)=>pattern.test(question.toLocaleLowerCase("en"));
const SIDE_ANSWERS = [
    {
        id: "june",
        match: asks(/\bjun(e)?\b/),
        script: [
            {
                say: "Let me open June: the bike alone cost 6,000 francs.",
                scene: {
                    type: "monthly",
                    focus: 6,
                    breakdown: breakdown(6)
                },
                cues: [
                    {
                        word: "open",
                        action: "breakdown"
                    },
                    {
                        word: "6,000",
                        target: "Bike",
                        figure: {
                            label: "Bike",
                            value: 6000
                        }
                    }
                ]
            },
            {
                say: "Rent was 1,820 francs, health insurance 982, and Digitec orders another 742.",
                scene: {
                    type: "monthly",
                    focus: 6
                },
                cues: [
                    {
                        word: "insurance",
                        target: "Health insurance"
                    },
                    {
                        word: "Digitec",
                        target: "Digitec"
                    }
                ]
            },
            {
                say: "Together that took your card past its monthly budget of 3,600 francs.",
                scene: {
                    type: "monthly",
                    focus: 6
                },
                cues: [
                    {
                        word: "card",
                        figure: {
                            label: "Card budget per month",
                            value: 3600
                        }
                    }
                ]
            }
        ]
    },
    {
        id: "july",
        match: asks(/\bjul(y)?\b/),
        script: [
            {
                say: "July reached 12,363 francs; let me open the column.",
                scene: {
                    type: "monthly",
                    focus: 7,
                    breakdown: breakdown(7)
                },
                cues: [
                    {
                        word: "12,363",
                        figure: {
                            label: "July",
                            value: 12363
                        }
                    },
                    {
                        word: "open",
                        action: "breakdown"
                    }
                ]
            },
            {
                say: "The bike came to 5,329 francs, and the London trip, hotel included, 1,746.",
                scene: {
                    type: "monthly",
                    focus: 7
                },
                cues: [
                    {
                        word: "bike",
                        target: "Bike"
                    },
                    {
                        word: "London",
                        target: "London trip"
                    }
                ]
            },
            {
                say: "Then clothing added 1,136 francs, and health insurance 982 as every month.",
                scene: {
                    type: "monthly",
                    focus: 7
                },
                cues: [
                    {
                        word: "clothing",
                        target: "Clothing"
                    },
                    {
                        word: "insurance",
                        target: "Health insurance"
                    }
                ]
            },
            {
                say: "The London hotel charged 743.20 francs twice on one day; were those two rooms?",
                scene: {
                    type: "monthly",
                    focus: 7
                },
                cues: [
                    {
                        word: "hotel",
                        target: "London trip"
                    }
                ]
            }
        ]
    },
    {
        id: "september",
        match: asks(/\bsep(t|tember)?\b/),
        script: [
            {
                say: "September is your tallest bar at 14,363 francs; let me open it.",
                scene: {
                    type: "monthly",
                    focus: 9,
                    breakdown: breakdown(9)
                },
                cues: [
                    {
                        word: "14,363",
                        figure: {
                            label: "September",
                            value: 14363
                        }
                    },
                    {
                        word: "open",
                        action: "breakdown"
                    }
                ]
            },
            {
                say: "Four plane tickets bought on one day came to 7,458 francs.",
                scene: {
                    type: "monthly",
                    focus: 9
                },
                cues: [
                    {
                        word: "tickets",
                        target: "Plane tickets",
                        figure: {
                            label: "Plane tickets",
                            value: 7458
                        }
                    }
                ]
            },
            {
                say: "Then Apple added 2,273 francs, rent and electricity 2,030, health insurance 982.",
                scene: {
                    type: "monthly",
                    focus: 9
                },
                cues: [
                    {
                        word: "Apple",
                        target: "Apple"
                    },
                    {
                        word: "electricity",
                        target: "Rent and electricity"
                    }
                ]
            },
            {
                say: "That is why the card statement came to 10,019 francs, above your monthly card budget of 3,600.",
                scene: {
                    type: "monthly",
                    focus: 9
                }
            }
        ]
    },
    {
        id: "november",
        match: asks(/\bnov(ember)?\b/),
        script: [
            {
                say: "November came to 7,390 francs; let me open it.",
                scene: {
                    type: "monthly",
                    focus: 11,
                    breakdown: breakdown(11)
                },
                cues: [
                    {
                        word: "7,390",
                        figure: {
                            label: "November",
                            value: 7390
                        }
                    },
                    {
                        word: "open",
                        action: "breakdown"
                    }
                ]
            },
            {
                say: "Most of it was Apple, with 3,189 francs.",
                scene: {
                    type: "monthly",
                    focus: 11
                },
                cues: [
                    {
                        word: "Apple",
                        target: "Apple",
                        figure: {
                            label: "Apple",
                            value: 3189
                        }
                    }
                ]
            },
            {
                say: "Rent was 1,820 francs and health insurance 982, as in other months.",
                scene: {
                    type: "monthly",
                    focus: 11
                },
                cues: [
                    {
                        word: "insurance",
                        target: "Health insurance"
                    }
                ]
            }
        ]
    }
];
;
const OFFER_CONFIRMED_LINE = "Thank you. This is a demo, so no money has moved.";
const BACKUP_NO_ANSWER_LINE = "In this mode I only have prepared answers: try June, July, September or November.";
const NOT_UNDERSTOOD_LINE = "I did not catch that. Could you ask again?";
const FINISHED_LINE = "That was your year. Ask me about any month, or start over whenever you like.";
const FIXED_LINES = [
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILLER_LINE"],
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BRIDGE"],
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIRECTOR_FAILURE_LINE"],
    OFFER_CONFIRMED_LINE,
    BACKUP_NO_ANSWER_LINE,
    NOT_UNDERSTOOD_LINE,
    FINISHED_LINE
];
function allLines() {
    const lines = [
        ...MAIN.flatMap((beat)=>[
                beat.say,
                beat.bridge ?? ""
            ]),
        ...SIDE_ANSWERS.flatMap((answer)=>answer.script.map((beat)=>beat.say)),
        ...FIXED_LINES
    ].filter(Boolean);
    return [
        ...new Set(lines)
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/contracts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared contracts (docs/IMPLEMENTATION_PLAN.md sections 3-4). Frozen: change only with the whole team.
 * Imported by the server (director, validation), the client engine (player, conversation) and scripts.
 */ // ---------- 3.1 Script ----------
/** The big number on screen. */ __turbopack_context__.s([
    "DEFAULT_BRIDGE",
    ()=>DEFAULT_BRIDGE,
    "DIRECTOR_FAILURE_LINE",
    ()=>DIRECTOR_FAILURE_LINE,
    "FILLER_LINE",
    ()=>FILLER_LINE,
    "audioKey",
    ()=>audioKey,
    "sceneTypes",
    ()=>sceneTypes
]);
const sceneTypes = [
    "galaxy",
    "river",
    "pools",
    "travel",
    "jars",
    "level",
    "monthly"
];
function audioKey(text) {
    let hash = 0x811c9dc5;
    for (const char of text.trim()){
        hash ^= char.codePointAt(0);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(16).padStart(8, "0");
}
const DIRECTOR_FAILURE_LINE = "I could not put an answer together right now.";
const FILLER_LINE = "Let me check.";
const DEFAULT_BRIDGE = "Where were we.";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/facts.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"year\":2025,\"currency\":\"CHF\",\"salary_monthly\":7464,\"payday\":23,\"yearly_income_incl_13th_salary\":97032,\"year_end_net_vs_start\":8816,\"without_13th_salary\":1352,\"total_spending\":88379,\"categories_yearly_net_of_refunds\":{\"Housing\":22462,\"Electronics\":13160,\"Travel\":12938,\"Health\":12335,\"Bike\":11523,\"Online shopping\":5691,\"Clothing\":4597,\"Transport\":2619,\"Food and drink\":2180,\"Tax\":630,\"Other\":243},\"travel_breakdown\":{\"USA_approx\":8000,\"London_July\":1631,\"Copenhagen_May\":1409,\"London_Cologne_April\":1395,\"Other\":503},\"month_end_balance_vs_start_jan_dec\":[1971,1883,4034,4442,5140,2563,-2407,480,-5640,-2720,-2594,8816],\"monthly_spending_jan_dec\":[5994,7063,6028,6626,6435,10365,12363,4565,14363,3845,7390,3342],\"card_bill_jan_dec\":[1355,2570,559,3187,2134,6125,9036,1313,10019,1349,3916,288],\"monthly_breakdown_by_category\":{\"1\":{\"Housing\":2012,\"Food and drink\":602,\"Online shopping\":920,\"Electronics\":1278,\"Transport\":37,\"Health\":982,\"Clothing\":164},\"2\":{\"Housing\":1820,\"Electronics\":985,\"Food and drink\":123,\"Clothing\":195,\"Online shopping\":348,\"Transport\":1774,\"Health\":1533,\"Travel\":286},\"3\":{\"Housing\":2040,\"Food and drink\":140,\"Online shopping\":219,\"Transport\":136,\"Electronics\":1311,\"Clothing\":990,\"Health\":982,\"Tax\":210},\"4\":{\"Housing\":1820,\"Food and drink\":195,\"Electronics\":1479,\"Transport\":64,\"Online shopping\":770,\"Clothing\":-78,\"Health\":982,\"Travel\":1395},\"5\":{\"Housing\":1820,\"Travel\":1409,\"Food and drink\":127,\"Online shopping\":302,\"Electronics\":642,\"Transport\":52,\"Health\":982,\"Clothing\":1042,\"Bike\":59},\"6\":{\"Housing\":1820,\"Food and drink\":135,\"Transport\":61,\"Electronics\":784,\"Online shopping\":276,\"Health\":982,\"Clothing\":306,\"Bike\":6000},\"7\":{\"Housing\":1820,\"Food and drink\":143,\"Online shopping\":584,\"Other\":232,\"Electronics\":353,\"Transport\":38,\"Health\":982,\"Clothing\":1136,\"Travel\":1746,\"Bike\":5329},\"8\":{\"Housing\":1820,\"Food and drink\":145,\"Online shopping\":479,\"Electronics\":46,\"Transport\":81,\"Health\":982,\"Bike\":135,\"Clothing\":332,\"Travel\":545},\"9\":{\"Housing\":2030,\"Food and drink\":130,\"Online shopping\":447,\"Transport\":73,\"Electronics\":2321,\"Health\":982,\"Tax\":210,\"Travel\":7454,\"Clothing\":717},\"10\":{\"Housing\":1820,\"Food and drink\":137,\"Electronics\":627,\"Transport\":106,\"Online shopping\":434,\"Health\":982,\"Clothing\":-363,\"Travel\":102},\"11\":{\"Housing\":1820,\"Food and drink\":139,\"Electronics\":3291,\"Online shopping\":546,\"Health\":982,\"Transport\":97,\"Tax\":210,\"Clothing\":306},\"12\":{\"Housing\":1820,\"Food and drink\":166,\"Transport\":102,\"Electronics\":45,\"Online shopping\":365,\"Health\":982,\"Other\":11,\"Clothing\":-149}},\"monthly_breakdown_parts\":{\"1\":[{\"name\":\"Housing\",\"value\":2012},{\"name\":\"Electronics\",\"value\":1278},{\"name\":\"Health\",\"value\":982},{\"name\":\"Online shopping\",\"value\":920},{\"name\":\"Other\",\"value\":802}],\"2\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Transport\",\"value\":1774},{\"name\":\"Health\",\"value\":1533},{\"name\":\"Electronics\",\"value\":985},{\"name\":\"Other\",\"value\":951}],\"3\":[{\"name\":\"Housing\",\"value\":2040},{\"name\":\"Electronics\",\"value\":1311},{\"name\":\"Clothing\",\"value\":990},{\"name\":\"Health\",\"value\":982},{\"name\":\"Other\",\"value\":705}],\"4\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Electronics\",\"value\":1479},{\"name\":\"Travel\",\"value\":1395},{\"name\":\"Health\",\"value\":982},{\"name\":\"Other\",\"value\":950}],\"5\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Travel\",\"value\":1409},{\"name\":\"Clothing\",\"value\":1042},{\"name\":\"Health\",\"value\":982},{\"name\":\"Other\",\"value\":1182}],\"6\":[{\"name\":\"Bike\",\"value\":6000,\"aliases\":[\"bicycle\",\"veloshop\"]},{\"name\":\"Rent\",\"value\":1820,\"aliases\":[\"housing\"]},{\"name\":\"Health insurance\",\"value\":982,\"aliases\":[\"insurance\",\"health\"]},{\"name\":\"Digitec\",\"value\":742,\"aliases\":[\"galaxus\",\"electronics\"]},{\"name\":\"Other\",\"value\":821}],\"7\":[{\"name\":\"Bike\",\"value\":5329,\"aliases\":[\"bicycle\",\"veloshop\"]},{\"name\":\"Rent\",\"value\":1820,\"aliases\":[\"housing\"]},{\"name\":\"London trip\",\"value\":1746,\"aliases\":[\"london\",\"travel\",\"hotel\"]},{\"name\":\"Clothing\",\"value\":1136,\"aliases\":[\"clothes\",\"fashion\"]},{\"name\":\"Health insurance\",\"value\":982,\"aliases\":[\"insurance\",\"health\"]},{\"name\":\"Other\",\"value\":1350}],\"8\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Health\",\"value\":982},{\"name\":\"Travel\",\"value\":545},{\"name\":\"Online shopping\",\"value\":479},{\"name\":\"Other\",\"value\":739}],\"9\":[{\"name\":\"Plane tickets\",\"value\":7458,\"aliases\":[\"flights\",\"flight\",\"tickets\",\"swiss\",\"plane\"]},{\"name\":\"Apple\",\"value\":2273,\"aliases\":[\"iphone\",\"laptop\"]},{\"name\":\"Rent and electricity\",\"value\":2030,\"aliases\":[\"rent\",\"electricity\",\"housing\"]},{\"name\":\"Health insurance\",\"value\":982,\"aliases\":[\"insurance\",\"health\"]},{\"name\":\"Other\",\"value\":1620}],\"10\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Health\",\"value\":982},{\"name\":\"Electronics\",\"value\":627},{\"name\":\"Other\",\"value\":416}],\"11\":[{\"name\":\"Apple\",\"value\":3189,\"aliases\":[\"iphone\",\"laptop\"]},{\"name\":\"Rent\",\"value\":1820,\"aliases\":[\"housing\"]},{\"name\":\"Health insurance\",\"value\":982,\"aliases\":[\"insurance\",\"health\"]},{\"name\":\"Other\",\"value\":1399}],\"12\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Health\",\"value\":982},{\"name\":\"Online shopping\",\"value\":365},{\"name\":\"Food and drink\",\"value\":166},{\"name\":\"Other\",\"value\":9}]},\"notable_items\":{\"6\":[\"23 June bike shop 6000\"],\"7\":[\"London hotel 1566\",\"23 July bike shop 5329\"],\"9\":[\"Apple 2273\",\"18 September plane tickets 7458\"],\"11\":[\"Apple 3189\"]},\"gaps\":[{\"id\":\"missing_payment:Krankenkasse:2025-02\",\"mode\":\"ask\",\"label\":\"Krankenkasse payment missing in 2025-02\",\"merchant\":\"Krankenkasse\",\"month\":2,\"usual_amount\":982,\"months_paid\":11},{\"id\":\"no_pillar_3a\",\"mode\":\"ask\",\"label\":\"No pillar 3a payment\",\"yearly_amount\":0,\"limit\":7258},{\"id\":\"no_savings\",\"mode\":\"ask\",\"label\":\"No savings transfer\",\"yearly_amount\":0},{\"id\":\"tax_provision\",\"mode\":\"ask\",\"label\":\"Tax paid so far\",\"paid\":630,\"payments\":3}],\"refunds\":{\"total\":4590,\"merchants\":[{\"merchant\":\"Abercrombie & Fitch\",\"bought\":3397,\"refunded\":2491,\"net\":906}]},\"card_budget_monthly\":3600,\"card_cycles\":[{\"cycle\":1,\"start\":\"2025-01-01\",\"payment_date\":\"2025-01-23\",\"statement\":1355,\"spent\":1402,\"budget_left\":2198,\"crossed_on\":null,\"cumulative\":[[\"2025-01-01\",200],[\"2025-01-04\",464],[\"2025-01-05\",559],[\"2025-01-07\",654],[\"2025-01-08\",670],[\"2025-01-10\",993],[\"2025-01-11\",993],[\"2025-01-13\",1217],[\"2025-01-14\",1268],[\"2025-01-20\",1318],[\"2025-01-22\",1402]]},{\"cycle\":2,\"start\":\"2025-01-24\",\"payment_date\":\"2025-02-23\",\"statement\":2570,\"spent\":2337,\"budget_left\":1263,\"crossed_on\":null,\"cumulative\":[[\"2025-01-24\",69],[\"2025-01-26\",117],[\"2025-01-28\",360],[\"2025-01-30\",455],[\"2025-02-03\",463],[\"2025-02-08\",481],[\"2025-02-12\",2031],[\"2025-02-16\",2317],[\"2025-02-20\",2320],[\"2025-02-22\",2337]]},{\"cycle\":3,\"start\":\"2025-02-24\",\"payment_date\":\"2025-03-23\",\"statement\":559,\"spent\":658,\"budget_left\":2942,\"crossed_on\":null,\"cumulative\":[[\"2025-02-24\",123],[\"2025-02-28\",198],[\"2025-03-02\",307],[\"2025-03-03\",359],[\"2025-03-05\",360],[\"2025-03-06\",469],[\"2025-03-07\",472],[\"2025-03-08\",473],[\"2025-03-12\",486],[\"2025-03-13\",495],[\"2025-03-14\",510],[\"2025-03-18\",655],[\"2025-03-20\",658]]},{\"cycle\":4,\"start\":\"2025-03-24\",\"payment_date\":\"2025-04-23\",\"statement\":3187,\"spent\":3187,\"budget_left\":413,\"crossed_on\":null,\"cumulative\":[[\"2025-03-24\",109],[\"2025-03-26\",347],[\"2025-03-28\",625],[\"2025-03-30\",765],[\"2025-03-31\",814],[\"2025-04-02\",889],[\"2025-04-03\",1826],[\"2025-04-05\",1827],[\"2025-04-08\",1868],[\"2025-04-10\",1961],[\"2025-04-11\",1977],[\"2025-04-13\",1599],[\"2025-04-15\",1460],[\"2025-04-18\",1503],[\"2025-04-19\",2633],[\"2025-04-20\",2899],[\"2025-04-21\",3052],[\"2025-04-22\",3187]]},{\"cycle\":5,\"start\":\"2025-04-24\",\"payment_date\":\"2025-05-23\",\"statement\":2134,\"spent\":2187,\"budget_left\":1413,\"crossed_on\":null,\"cumulative\":[[\"2025-04-25\",70],[\"2025-04-26\",320],[\"2025-04-28\",384],[\"2025-05-02\",1041],[\"2025-05-04\",1147],[\"2025-05-05\",1328],[\"2025-05-06\",1917],[\"2025-05-08\",1918],[\"2025-05-10\",2023],[\"2025-05-11\",1918],[\"2025-05-12\",1977],[\"2025-05-13\",2002],[\"2025-05-14\",2039],[\"2025-05-16\",2080],[\"2025-05-17\",2120],[\"2025-05-19\",2186],[\"2025-05-20\",2187]]},{\"cycle\":6,\"start\":\"2025-05-24\",\"payment_date\":\"2025-06-23\",\"statement\":6125,\"spent\":6179,\"budget_left\":-2579,\"crossed_on\":\"2025-06-23\",\"cumulative\":[[\"2025-06-01\",136],[\"2025-06-17\",179],[\"2025-06-23\",6179]]},{\"cycle\":7,\"start\":\"2025-06-24\",\"payment_date\":\"2025-07-23\",\"statement\":9036,\"spent\":9060,\"budget_left\":-5460,\"crossed_on\":\"2025-07-23\",\"cumulative\":[[\"2025-06-24\",175],[\"2025-06-26\",177],[\"2025-06-27\",191],[\"2025-06-28\",270],[\"2025-07-01\",346],[\"2025-07-03\",416],[\"2025-07-04\",472],[\"2025-07-05\",473],[\"2025-07-07\",543],[\"2025-07-08\",2260],[\"2025-07-10\",2520],[\"2025-07-11\",2635],[\"2025-07-15\",2576],[\"2025-07-18\",3089],[\"2025-07-20\",3489],[\"2025-07-22\",3500],[\"2025-07-23\",9060]]},{\"cycle\":8,\"start\":\"2025-07-24\",\"payment_date\":\"2025-08-23\",\"statement\":1313,\"spent\":1211,\"budget_left\":2389,\"crossed_on\":null,\"cumulative\":[[\"2025-07-24\",23],[\"2025-07-27\",166],[\"2025-07-29\",175],[\"2025-08-05\",311],[\"2025-08-08\",357],[\"2025-08-10\",284],[\"2025-08-11\",286],[\"2025-08-13\",321],[\"2025-08-16\",313],[\"2025-08-18\",391],[\"2025-08-19\",946],[\"2025-08-22\",1211]]},{\"cycle\":9,\"start\":\"2025-08-24\",\"payment_date\":\"2025-09-23\",\"statement\":10019,\"spent\":10206,\"budget_left\":-6606,\"crossed_on\":\"2025-09-18\",\"cumulative\":[[\"2025-08-26\",74],[\"2025-08-29\",264],[\"2025-09-01\",266],[\"2025-09-05\",1002],[\"2025-09-08\",1003],[\"2025-09-11\",1017],[\"2025-09-13\",971],[\"2025-09-14\",1097],[\"2025-09-16\",2615],[\"2025-09-18\",9540],[\"2025-09-20\",10043],[\"2025-09-22\",10206]]},{\"cycle\":10,\"start\":\"2025-09-24\",\"payment_date\":\"2025-10-23\",\"statement\":1349,\"spent\":1389,\"budget_left\":2211,\"crossed_on\":null,\"cumulative\":[[\"2025-09-25\",288],[\"2025-09-26\",383],[\"2025-09-27\",405],[\"2025-09-28\",505],[\"2025-09-29\",548],[\"2025-09-30\",857],[\"2025-10-01\",898],[\"2025-10-03\",719],[\"2025-10-11\",723],[\"2025-10-15\",768],[\"2025-10-16\",992],[\"2025-10-19\",1154],[\"2025-10-20\",1221],[\"2025-10-23\",1389]]},{\"cycle\":11,\"start\":\"2025-10-24\",\"payment_date\":\"2025-11-23\",\"statement\":3916,\"spent\":3767,\"budget_left\":-167,\"crossed_on\":\"2025-11-22\",\"cumulative\":[[\"2025-10-26\",-303],[\"2025-10-28\",-127],[\"2025-10-30\",-106],[\"2025-10-31\",119],[\"2025-11-02\",174],[\"2025-11-07\",305],[\"2025-11-09\",236],[\"2025-11-10\",237],[\"2025-11-11\",439],[\"2025-11-12\",830],[\"2025-11-16\",869],[\"2025-11-21\",1018],[\"2025-11-22\",3767]]},{\"cycle\":12,\"start\":\"2025-11-24\",\"payment_date\":\"2025-12-23\",\"statement\":288,\"spent\":431,\"budget_left\":3169,\"crossed_on\":null,\"cumulative\":[[\"2025-11-24\",149],[\"2025-11-29\",319],[\"2025-12-01\",395],[\"2025-12-04\",252],[\"2025-12-06\",257],[\"2025-12-11\",258],[\"2025-12-15\",288],[\"2025-12-19\",292],[\"2025-12-20\",385],[\"2025-12-21\",431]]}],\"offer\":{\"product\":\"pillar 3a\",\"monthly\":200,\"after_one_year\":2400},\"insights\":[{\"id\":\"year_end_buffer\",\"kind\":\"what_happened\",\"mode\":\"assert\",\"summary\":\"The private account ended the year 8'816 CHF higher than it started. Without the extra salary payment of 7'464 CHF it would have been 1'352 CHF.\",\"figures\":{\"yearNet\":8816.36,\"extraSalary\":7464,\"yearNetWithoutExtra\":1352.36,\"baseMonthlySalary\":7464}},{\"id\":\"lowest_balance\",\"kind\":\"what_happened\",\"mode\":\"assert\",\"summary\":\"Measured from the start of the year, the private account was lowest at the end of 2025-09 (-5'640 CHF) and on 2025-10-21 (-7'681 CHF).\",\"figures\":{\"lowestMonthEnd\":-5639.8,\"lowestMonthEndMonth\":\"2025-09\",\"lowestDay\":-7681.45,\"lowestDayDate\":\"2025-10-21\"}},{\"id\":\"statement_shock\",\"kind\":\"what_happened\",\"mode\":\"assert\",\"summary\":\"The largest card statement was 10'019 CHF in 2025-09; 2 statement(s) were larger than the monthly salary of 7'464 CHF.\",\"figures\":{\"largestStatement\":10018.53,\"largestStatementMonth\":\"2025-09\",\"statementsAboveSalary\":2,\"smallestStatement\":287.95,\"baseMonthlySalary\":7464}},{\"id\":\"card_cycle\",\"kind\":\"insight\",\"mode\":\"assert\",\"summary\":\"The monthly card budget is 3'600 CHF (salary minus average account spending). 4 of 12 card cycles went over it; the largest, ending 2025-09-23, reached 10'206 CHF and crossed the budget on 2025-09-18.\",\"figures\":{\"cardBudgetMonthly\":3600,\"cyclesOverBudget\":4,\"cycles\":12,\"worstCycleSpent\":10206,\"worstCycleEnd\":\"2025-09-23\",\"worstCycleCrossedOn\":\"2025-09-18\"}},{\"id\":\"missing_payment:Krankenkasse:2025-02\",\"kind\":\"what_is_missing\",\"mode\":\"ask\",\"summary\":\"Krankenkasse was paid in 11 of 12 months, usually 982 CHF; there is no payment in 2025-02.\",\"figures\":{\"merchant\":\"Krankenkasse\",\"missingMonth\":\"2025-02\",\"usualAmount\":982,\"monthsPaid\":11},\"question\":\"I don't see your Krankenkasse payment for 2025-02. Was it paid from another account?\",\"answers\":[\"paid_elsewhere\",\"missed\"]},{\"id\":\"no_pillar_3a\",\"kind\":\"what_is_missing\",\"mode\":\"ask\",\"summary\":\"There is no 3a payment or savings transfer in 2025. The 3a maximum for employees with a pension fund is 7'258 CHF.\",\"figures\":{\"pillar3aLimit\":7258,\"savingsTransfers\":0},\"question\":\"I don't see any 3a or savings payments this year. Do you have a 3a account at another bank?\",\"answers\":[\"has_elsewhere\",\"none\"]},{\"id\":\"double_charge:Mondrian London:2025-07-08\",\"kind\":\"insight\",\"mode\":\"ask\",\"summary\":\"Mondrian London charged 743 CHF twice on 2025-07-08 and nothing was refunded.\",\"figures\":{\"merchant\":\"Mondrian London\",\"date\":\"2025-07-08\",\"amount\":743.2,\"charges\":2},\"question\":\"Mondrian London charged you 743.20 CHF twice on 2025-07-08. Was that two bookings, or should we dispute one?\",\"answers\":[\"legit\",\"duplicate\"]},{\"id\":\"refund_heavy:Abercrombie & Fitch\",\"kind\":\"insight\",\"mode\":\"assert\",\"summary\":\"Abercrombie & Fitch shows 3'397 CHF in 21 purchases, but 2'491 CHF came back; the real cost is 906 CHF.\",\"figures\":{\"merchant\":\"Abercrombie & Fitch\",\"gross\":3397.45,\"refunds\":2491.31,\"net\":906.14,\"purchases\":21}},{\"id\":\"habit_stopped:Digitec Galaxus\",\"kind\":\"insight\",\"mode\":\"assert\",\"summary\":\"18 purchases at Digitec Galaxus (4'462 CHF) until 2025-06, then none.\",\"figures\":{\"merchant\":\"Digitec Galaxus\",\"purchases\":18,\"net\":4461.75,\"lastMonth\":\"2025-06\"}},{\"id\":\"one_off_pot\",\"kind\":\"advice\",\"mode\":\"assert\",\"summary\":\"6 big one-off purchases cost 24'540 CHF this year. Setting aside 2'045 CHF a month would cover them without a statement shock.\",\"figures\":{\"oneOffTotal\":24540.4,\"monthlyPot\":2045.03,\"purchases\":6}},{\"id\":\"tag:Libero-Tarifverbund\",\"kind\":\"insight\",\"mode\":\"ask\",\"summary\":\"Libero-Tarifverbund is tagged as fixed (Annual public transport pass.), but this is uncertain.\",\"figures\":{\"merchant\":\"Libero-Tarifverbund\",\"necessity\":\"compulsory\"},\"question\":\"Do you use the Libero pass for commuting to work?\",\"answers\":[\"yes\",\"no\"]}]}");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1kserbzet6qci._.js.map