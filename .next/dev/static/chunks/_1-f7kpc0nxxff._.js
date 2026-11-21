(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/conversation/intent.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classify",
    ()=>classify,
    "isRepeatRequest",
    ()=>isRepeatRequest,
    "matchAnswer",
    ()=>matchAnswer,
    "monthIn",
    ()=>monthIn,
    "refersToCurrent",
    ()=>refersToCurrent,
    "stripFiller",
    ()=>stripFiller,
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
const CONTINUE_START = /^(continue|go on|go ahead|carry on|ok|okay|sure|got it|yes|yeah|yep|yup|resume|keep going|next|alright|all right|fine|let'?s (continue|go on|move on|keep going))\b/;
const CONTINUE_SHORT = /\b(continue|go on|go ahead|carry on|keep going|resume|next|move on)\b/;
/** Unmistakable "go on" words count anywhere once no question was found: "thanks, that's clear, go on". */ const CONTINUE_ANY = /\b(continue|go on|carry on|keep going|move on|resume|proceed)\b/;
const WAIT_START = /^(wait|stop|pause|hold on|hang on|one more|another question|(i have|i've got|quick|a quick) (a )?(quick )?question|can i ask( you)?( something| a question)?|just a (moment|second|sec|minute)|one (moment|second|sec|minute)|a (moment|second|sec))\b/;
const WAIT_SHORT = /\b(wait|stop|pause|hold on|hang on)\b/;
const END_START = /^(enough|end|quit|that'?s all|that'?s it|finish|i'?m done|we'?re done|bye|goodbye)\b/;
const END_ANY = /\b(that'?s all|i'?m done|we'?re done|goodbye|bye for now)\b/;
/** Polite acknowledgements; an utterance made only of these means "go on". */ const ACK = /^(thanks|thank you|thanks a lot|great|perfect|good|nice|cool|got it|ok|okay|alright|all right|clear|that'?s clear|understood|i see|makes sense|that makes sense|fine|that'?s fine|no that'?s fine|yes please|sounds good|right|sure)$/;
/** Openers that carry no intent of their own: "one second, why ...", "sorry, ...", "okay so ...". */ const LEADING_FILLER = /^((um+|uh+|erm|hmm+|hey|so|well|sorry|excuse me|one second|one sec|just a second|okay so|ok so|right so|oh)[\s,.!-]+)+/;
function stripFiller(text) {
    const rest = text.replace(LEADING_FILLER, "").trim();
    return rest || text;
}
function classify(text, targets = []) {
    const full = lower(text).trim().replace(/[.!,;]+$/, "");
    const t = stripFiller(full);
    const categoryIn = targets.some((x)=>typeof x === "string") && targetIn(t, targets.filter((x)=>typeof x === "string")) !== null;
    const isQuestion = /\?/.test(t) || monthIn(t) !== null || categoryIn || /\b(why|how|what|which|when|explain)\b/.test(t);
    if (isQuestion) return "question";
    const short = t.split(/\s+/).filter(Boolean).length <= 4;
    if (WAIT_START.test(t) || short && WAIT_SHORT.test(t) || /\b(one more|another|a quick) question\b/.test(t)) return "wait";
    if (t !== full && WAIT_START.test(full)) return "wait"; // "one second" alone
    if (END_START.test(t) || END_ANY.test(t)) return "end";
    if (CONTINUE_START.test(t) || short && CONTINUE_SHORT.test(t) || CONTINUE_ANY.test(t)) return "continue";
    const parts = t.split(/\s*(?:,|\band\b|\bthen\b)\s*/).filter(Boolean);
    if (parts.length && parts.every((p)=>ACK.test(p))) return "continue";
    return "question";
}
/**
 * "Can you repeat your advice?", "say that again", "what did you just say?": the user wants the last answer again.
 * The engine replays it word for word instead of asking the director, which has no memory of what it said.
 */ const REPEAT = /\b(repeat|say (that|it|this) (again|once more)|once more|one more time|come again|again please|(what|which) (was|were) (your|the|that) (advice|answer|tip|suggestion|point)s?|what did you (just )?(say|suggest|recommend)|tell me (that|it) again|(go|run) (through|over) (that|it) again)\b/;
function isRepeatRequest(text) {
    const t = stripFiller(lower(text).trim().replace(/[.!?,;]+$/, ""));
    return REPEAT.test(t);
}
function matchAnswer(text, answers) {
    const t = stripFiller(lower(text).trim().replace(/[.!?,;]+$/, ""));
    if (/\b(wait|hold on|hang on|one second|just a (second|moment))\b/.test(t)) return null;
    const exact = answers.find((a)=>lower(a.label) === t || a.id === t);
    if (exact) return exact;
    const no = /^(no|nope|nah|not really|never|none|i don'?t|i do not|it wasn'?t|it was not|i haven'?t|i have not)\b/.test(t);
    const yes = /^(yes|yeah|yep|yup|sure|correct|right|exactly|indeed|of course|i do|it was|i have)\b/.test(t) || /\b(elsewhere|another (bank|account)|other (bank|account)|different (bank|account)|separate account)\b/.test(t);
    const kind = no ? "no" : yes ? "yes" : null;
    return kind ? answers.find((a)=>a.kind === kind) ?? null : null;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/content/scripts.ts [app-client] (ecmascript) <locals>");
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
;
/** Lead-ins before an answer is replayed on "can you repeat that?". */ const REPEAT_LEADS = [
    "Of course, once more.",
    "Sure, here it is again."
];
const isScript = (value)=>Array.isArray(value) && value.length > 0 && value.every((b)=>b && typeof b === "object" && typeof b.say === "string" && b.say.trim() !== "");
class Conversation {
    player;
    world;
    main;
    backup;
    prepared;
    fetcher;
    directorUrl;
    notesUrl;
    directorTimeoutMs;
    visible;
    questionPauseMs;
    events = new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$events$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Emitter"]();
    directorAbort = null;
    /** The running pause after a question beat; ended early whenever another flow starts. */ pause = null;
    /** Every question asked since the start, answered or not, plus the remembered ones (shown as open points). */ points = [];
    /** Known answers by subject: loaded from the notes endpoint or given in this session. Survives start over. */ remembered = new Map();
    notesWaitMs;
    /** The saved answers' load (never rejects); `notesSettled` once it is done either way. */ notesLoad;
    notesSettled = false;
    /** Bumped by forget(): a load still on its way is then ignored. */ forgets = 0;
    mode = "idle";
    /** Saved at interruption; one level deep. */ snapshot = null;
    /** The main beat playing (or last played). */ mainIndex = 0;
    /** The main script played to its end (a later "continue" has nothing to resume). */ mainDone = false;
    /** Main beat index whose question waits for an answer (mode `answering`). */ asking = null;
    /** The user already has what the offer is for: offer beats are skipped. */ skipOffer = false;
    /** The offer card was tapped while a line played: say the confirmation once that flow ends. */ confirmPending = false;
    /** Next filler line; rotates so consecutive questions sound different. */ fillerIndex = 0;
    /** The last side answer played, so "can you repeat that?" replays it instead of asking the director again. */ lastSide = null;
    /** Rotation position per fixed line list (lead-ins, closings, re-entries, invitations). */ turns = new Map();
    constructor(options){
        this.world = options.world;
        this.main = options.main;
        this.prepared = options.prepared ?? [];
        this.backup = options.backup ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBackupMode"])();
        this.fetcher = options.fetch ?? ((input, init)=>fetch(input, init));
        this.directorUrl = options.directorUrl ?? "/api/director";
        this.notesUrl = options.notesUrl ?? "/api/notes";
        this.directorTimeoutMs = options.directorTimeoutMs ?? 12000;
        this.visible = options.visible;
        this.questionPauseMs = options.questionPauseMs ?? 3500;
        this.notesWaitMs = options.notesWaitMs ?? 300;
        this.player = new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$player$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Player"]({
            world: options.world,
            voice: options.voice,
            emit: this.events.emit
        });
        this.notesLoad = this.loadNotes().finally(()=>{
            this.notesSettled = true;
        });
    }
    /** Subscribe to engine events (captions, figure, offer, mode, snapshot). Returns unsubscribe. */ on(listener) {
        return this.events.on(listener);
    }
    /**
   * Start (or start over) the main script from beat 1. Remembered answers stay as answered open points; a load of the
   * saved answers still on its way is waited for at most `notesWaitMs`.
   */ async start() {
        this.setSnapshot(null);
        this.setAsking(null);
        this.mainIndex = 0;
        this.points = this.main.flatMap((beat)=>beat.question && this.remembered.has(beat.question.subject) ? [
                this.pointFor(beat.question)
            ] : []);
        this.refreshSkipOffer();
        this.emitPoints();
        if (this.notesSettled) return this.playMain(0);
        const my = this.player.begin();
        await this.waitForNotes();
        if (!this.player.isCurrent(my)) return;
        return this.playMain(0, my);
    }
    /**
   * "Forget my answers": deletes the saved answers of the listed points (best effort, one DELETE per subject) and turns
   * them back into unanswered points. Playback goes on; a question beat not reached yet is asked again.
   */ async forget() {
        const subjects = [
            ...new Set([
                ...this.points.map((p)=>p.subject),
                ...this.remembered.keys()
            ])
        ];
        this.forgets++;
        this.remembered.clear();
        this.points = this.points.map((p)=>p.answer !== null ? {
                ...p,
                answer: null
            } : p);
        this.refreshSkipOffer();
        this.emitPoints();
        await Promise.all(subjects.map((subject)=>this.fetcher(`${this.notesUrl}?subject=${encodeURIComponent(subject)}`, {
                method: "DELETE"
            }).then(()=>undefined, ()=>undefined)));
    }
    /**
   * Answer to a question: save it (best effort) and mark its open point answered. Without `subject` (or with the
   * subject being asked right now, during its pause) the presentation goes on at once; any other open point is only recorded.
   */ answer(id, subject) {
        const index = this.asking;
        const asked = index !== null ? this.main[index]?.question : undefined;
        const key = subject ?? asked?.subject;
        const point = this.points.find((p)=>p.subject === key);
        const chosen = point?.answers.find((a)=>a.id === id);
        if (!point || !chosen) return Promise.resolve();
        this.remembered.set(point.subject, chosen.id);
        this.points = this.points.map((p)=>p === point ? {
                ...p,
                answer: chosen.id
            } : p);
        this.refreshSkipOffer();
        this.emitPoints();
        void this.fetcher(this.notesUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subject: point.subject,
                answer: chosen.id,
                text: chosen.label
            })
        }).catch(()=>undefined);
        if (index === null || asked?.subject !== point.subject || this.mode !== "answering") return Promise.resolve();
        this.setAsking(null);
        return this.playMain(index + 1);
    }
    /**
   * Stop button / mic pressed / "wait": fade the voice out and listen. `invite` (the Stop button only, never the mic)
   * adds a very short "Yes?". In `listening` it just silences that invitation, so nothing talks over the mic.
   */ interrupt(invite = false) {
        if (this.mode === "listening") {
            this.player.cancel();
            return;
        }
        if (this.mode === "answering") {
            // Mic or "wait" during a question's pause: stop the clock, so the presentation waits for her reply.
            this.cancel();
            return;
        }
        if (this.mode === "presenting" || this.mode === "returning") this.setSnapshot(this.takeSnapshot());
        if (this.mode === "presenting" || this.mode === "returning" || this.mode === "side") {
            this.cancel(true);
            this.setMode("listening");
            if (invite) {
                const my = this.player.begin();
                void this.player.speak(this.pick(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["INVITE_LINES"]), my, "filler");
            }
        }
    }
    /** Any typed or transcribed input: classify and act. Returns the intent it acted on. */ input(text) {
        const asked = this.mode === "answering" && this.asking !== null ? this.main[this.asking]?.question : undefined;
        const reply = asked ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$intent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchAnswer"])(text, asked.answers) : null;
        if (reply) {
            void this.answer(reply.id);
            return "continue";
        }
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
        // "Can you repeat your advice?": replay the last answer word for word. The director has no memory of it,
        // so asking it again would produce a different, often partial answer.
        if (this.lastSide && (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$intent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isRepeatRequest"])(question)) {
            const script = this.lastSide;
            this.events.emit({
                type: "script",
                kind: "side",
                script,
                source: "prepared"
            });
            if (!await this.player.speak(this.pick(REPEAT_LEADS), my, "filler")) return;
            if (!await this.playSide(script, my)) return;
            return this.finishSide(my, script);
        }
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
        const preparedScript = prepared && (typeof prepared.script === "function" ? prepared.script(question) : prepared.script);
        const playPrepared = async (script, withLead)=>{
            this.events.emit({
                type: "script",
                kind: "side",
                script,
                source: "prepared"
            });
            const keepsake = prepared?.keep?.(question);
            if (keepsake) this.events.emit({
                type: "keep",
                keepsake
            });
            // A person reacts first: a short lead-in that names the topic, while the zoom above already runs.
            if (withLead && prepared?.lead?.length && !await this.player.speak(this.pick(prepared.lead), my, "filler")) return;
            if (!await this.playSide(script, my)) return;
            return this.finishSide(my, script);
        };
        // A question more specific than the fixed answer goes to the live director; the fixed answer stays as the fallback.
        let liveFirst = false;
        try {
            liveFirst = !this.backup && !!prepared?.live?.(question);
        } catch  {
            liveFirst = false;
        }
        if (preparedScript && !liveFirst) return playPrepared(preparedScript, true);
        if (this.backup) {
            if (!await this.player.speak(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["BACKUP_NO_ANSWER_LINE"], my, "failure")) return;
            return this.finishSide(my);
        }
        const request = {
            question,
            screen: this.screen(),
            mode: "side"
        };
        const answer = this.callDirector(request);
        if (!await this.player.speak(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILLER_LINES"][this.fillerIndex++ % __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILLER_LINES"].length], my, "filler")) return;
        const response = await answer;
        if (!this.player.isCurrent(my)) return;
        // The filler line was already spoken, so the fallback starts without its lead-in.
        if (preparedScript && (!response || !isScript(response.script) || response.source === "fallback")) return playPrepared(preparedScript, false);
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
        return this.finishSide(my, response.script);
    }
    /** "OK, let's continue": restore the snapshot, speak the bridge, replay the interrupted beat. */ async resume() {
        const s = this.snapshot;
        if (!s && this.asking !== null) {
            // "Continue" without an answer: move past the question.
            const next = this.asking + 1;
            this.setAsking(null);
            return this.playMain(next);
        }
        if (!s) {
            if (this.mainDone) return this.setMode("finished");
            return this.playMain(this.mode === "idle" ? 0 : this.mainIndex);
        }
        const my = this.player.begin();
        this.setSnapshot(null);
        this.mainIndex = s.mainIndex;
        this.setMode("returning");
        this.restore(s);
        // Re-entry, then the beat's bridge as a short recap, then on with the presentation.
        if (!await this.player.speak(this.pick(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["REENTRY_LINES"]), my, "bridge")) return;
        const beat = this.main[s.mainIndex];
        if (!await this.player.speak(beat?.bridge ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BRIDGE"], my, "bridge")) return;
        // Heard nearly to its end: go on with the next beat instead of repeating it (question and offer beats replay).
        const words = beat ? beat.say.split(/\s+/).filter(Boolean).length : 0;
        const heard = beat && !beat.question && !beat.offer && words > 0 && s.wordsSpoken >= words - 2;
        return this.playMain(heard ? s.mainIndex + 1 : s.mainIndex, my);
    }
    /** "That's all": stop everything. */ end() {
        this.cancel();
        this.setSnapshot(null);
        this.setAsking(null);
        this.setMode("finished");
    }
    /** The offer card was touch-confirmed (never by voice). */ confirmOffer(jar, figure) {
        this.world.fillJar?.(jar);
        if (figure) this.player.setFigure(figure);
        // Spoken only when nothing else is talking, so it never cuts into a line.
        if (this.mode === "finished" || this.mode === "waiting" || this.mode === "listening" || this.mode === "idle") {
            const my = this.player.begin();
            void this.player.speak(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["OFFER_CONFIRMED_LINE"], my, "side");
        } else {
            this.confirmPending = true;
        }
    }
    /** Says the offer confirmation that was tapped while a line was playing. False if `my` went stale. */ async sayConfirmed(my) {
        if (!this.confirmPending) return this.player.isCurrent(my);
        this.confirmPending = false;
        return this.player.speak(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["OFFER_CONFIRMED_LINE"], my, "side");
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
        this.endPause();
        const my = token !== undefined && this.player.isCurrent(token) ? token : this.player.begin();
        this.setMode("presenting");
        this.mainDone = false;
        if (from === 0) this.events.emit({
            type: "script",
            kind: "main",
            script: this.main.map((_, i)=>this.spokenBeat(i))
        });
        for(let i = from; i < this.main.length; i++){
            const beat = this.main[i];
            if (beat.offer && this.skipOffer) continue;
            this.mainIndex = i;
            // A known answer is never asked again: the beat says its recall line instead (same cues, no pause).
            const ok = await this.player.playBeat(this.spokenBeat(i), my, {
                kind: "main",
                beatIndex: i,
                beatCount: this.main.length
            });
            if (!ok) return;
            if (beat.question) {
                // Asked once, never blocking: a short pause for a reply, then on by itself; the point stays open on screen.
                const point = this.addPoint(beat.question);
                if (point.answer !== null) continue;
                this.setAsking(i);
                this.setMode("answering");
                if (!await this.hold(this.questionPauseMs, my)) return;
                this.setAsking(null);
                this.setMode("presenting");
            }
        }
        if (!await this.sayConfirmed(my)) return;
        this.mainDone = true;
        this.setMode("finished");
    }
    async playSide(script, my) {
        this.lastSide = script;
        for(let i = 0; i < script.length; i++){
            if (script[i].offer && this.skipOffer) continue;
            const ok = await this.player.playBeat(script[i], my, {
                kind: "side",
                beatIndex: i,
                beatCount: script.length
            });
            if (!ok) return false;
        }
        return true;
    }
    /** Ends a side answer: hands the choice back out loud (unless it ended asking, or with the offer), then waits. */ async finishSide(my, script) {
        if (!await this.sayConfirmed(my)) return;
        const last = script ? [
            ...script
        ].reverse().find((b)=>!(b.offer && this.skipOffer)) : undefined;
        const handedBack = !!last && (last.offer || /\?\s*$/.test(last.say));
        const nothingLeft = !this.snapshot && this.asking === null && this.mainDone;
        if (!handedBack && !nothingLeft && !await this.player.speak(this.pick(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CLOSING_LINES"]), my, "bridge")) return;
        this.setMode("waiting");
    }
    /** Next line of a rotating list, so the same one is not heard twice in a row. */ pick(lines) {
        const i = this.turns.get(lines) ?? 0;
        this.turns.set(lines, i + 1);
        return lines[i % lines.length];
    }
    /** Waits `ms`, or less when another flow starts (endPause). True while `my` is still the current flow. */ async hold(ms, my) {
        this.endPause();
        await new Promise((done)=>{
            const timer = setTimeout(()=>{
                this.pause = null;
                done();
            }, ms);
            this.pause = {
                timer,
                done
            };
        });
        return this.player.isCurrent(my);
    }
    /** Ends a running question pause now (its flow then finds its token stale and stops). */ endPause() {
        const pause = this.pause;
        if (!pause) return;
        this.pause = null;
        clearTimeout(pause.timer);
        pause.done();
    }
    /** Adds an asked question to the open points (once per subject; a replayed question keeps its answer). */ addPoint(question) {
        const known = this.points.find((p)=>p.subject === question.subject);
        if (known) return known;
        const point = this.pointFor(question);
        this.points = [
            ...this.points,
            point
        ];
        this.emitPoints();
        return point;
    }
    pointFor(question) {
        const answer = this.remembered.get(question.subject) ?? null;
        return {
            subject: question.subject,
            label: question.label,
            assume: question.assume,
            answers: question.answers,
            answer
        };
    }
    /** Main beat `i` as spoken: with its question's answer known, the recall line replaces the question sentence. */ spokenBeat(i) {
        const beat = this.main[i];
        const known = beat?.question ? this.remembered.get(beat.question.subject) : undefined;
        const recall = known !== undefined ? beat.question?.answers.find((a)=>a.id === known)?.recall : undefined;
        return recall ? {
            ...beat,
            say: recall
        } : beat;
    }
    refreshSkipOffer() {
        this.skipOffer = this.points.some((p)=>p.answers.some((a)=>a.id === p.answer && a.skipOffer));
    }
    /**
   * Best effort: GET the saved answers and treat them as given in this session. Anything else (offline, an error, a
   * strange body, a forget() meanwhile) means no notes. Never rejects.
   */ async loadNotes() {
        const forgets = this.forgets;
        try {
            const res = await this.fetcher(this.notesUrl, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                },
                cache: "no-store"
            });
            if (!res.ok) return;
            const notes = await res.json();
            if (!Array.isArray(notes) || forgets !== this.forgets) return;
            const questions = this.main.flatMap((beat)=>beat.question ? [
                    beat.question
                ] : []);
            for (const note of notes){
                const question = questions.find((q)=>q.subject === note?.subject);
                // An answer given in this session wins over the saved one.
                if (!question || this.remembered.has(question.subject) || !question.answers.some((a)=>a.id === note.answer)) continue;
                this.remembered.set(question.subject, note.answer);
            }
            // Merge into the list in script order: known points get their answer, the others are added as answered.
            let points = this.points.map((p)=>p.answer === null && this.remembered.has(p.subject) ? {
                    ...p,
                    answer: this.remembered.get(p.subject)
                } : p);
            for (const question of questions){
                if (this.remembered.has(question.subject) && !points.some((p)=>p.subject === question.subject)) points = [
                    ...points,
                    this.pointFor(question)
                ];
            }
            this.points = points;
            this.refreshSkipOffer();
            this.emitPoints();
        } catch  {
        // No notes.
        }
    }
    /** Resolves when the saved answers are in, or after `notesWaitMs`, whichever is first. */ waitForNotes() {
        return new Promise((done)=>{
            const timer = setTimeout(done, this.notesWaitMs);
            void this.notesLoad.then(()=>{
                clearTimeout(timer);
                done();
            });
        });
    }
    emitPoints() {
        this.events.emit({
            type: "openPoints",
            points: this.points
        });
    }
    setAsking(index) {
        if (index === this.asking) return;
        this.asking = index;
        this.events.emit({
            type: "question",
            question: index !== null ? this.main[index]?.question ?? null : null
        });
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
    cancel(soft = false) {
        this.player.cancel(soft);
        this.endPause();
        this.directorAbort?.abort();
        this.directorAbort = null;
    }
    takeSnapshot() {
        const beat = this.main[this.mainIndex] ? this.spokenBeat(this.mainIndex) : undefined;
        return {
            scene: this.world.currentScene() ?? beat?.scene?.type ?? "galaxy",
            focus: this.world.currentFocus(),
            figure: this.player.figure ?? {
                label: "",
                value: 0
            },
            mainIndex: this.mainIndex,
            sentence: beat?.say ?? "",
            // Only counts when the beat itself was playing (not a re-entry or bridge line).
            wordsSpoken: this.mode === "presenting" && this.player.lastLine === beat?.say ? this.player.wordsSpoken : 0
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
    /** Invalidates every running flow and stops the voice now. */ /** `soft` fades the voice out where the voice can (interruptions). */ cancel(soft = false) {
        this.run++;
        this.voice.stop(soft);
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
    "pickBrowserVoice",
    ()=>pickBrowserVoice,
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
    // No timings at all: estimated starts, so cues do not all fire at t=0.
    if (!timings.length) return estimateTimings(words.map((w)=>w.word).join(" ")).map((t)=>t.start);
    // Different word counts: keep the measured times, matched by character offset.
    const starts = [];
    let last = 0;
    for (const w of words){
        const hit = timings.find((t)=>t.charEnd > w.charStart && t.charStart < w.charEnd);
        last = hit ? hit.start : last;
        starts.push(last);
    }
    return starts;
}
/** Watchdog for a started line: expected length plus a margin, in ms. */ const watchdogMs = (expectedSeconds)=>(Math.max(expectedSeconds, 1) * 1.5 + 3) * 1000;
/** A tiny silent WAV, played once inside the Start tap to unlock the shared audio element (iOS Safari). */ const SILENT_WAV = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=";
const raf = typeof requestAnimationFrame === "function" ? (cb)=>requestAnimationFrame(cb) : (cb)=>setTimeout(cb, 16);
const now = ()=>typeof performance !== "undefined" ? performance.now() : Date.now();
class Voice {
    opts;
    fetcher;
    manifest = null;
    line = 0;
    audio = null;
    /** One element for every line (created in unlock(), inside the user's tap), so iOS keeps the permission. */ shared = null;
    /** Silences the current line without ending it (Sound off mid-line). */ silence = null;
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
        // Sound off mid-line: the line keeps its clock (captions and cues continue). Sound on applies from the next line.
        if (muted) this.silence?.();
        this.update({
            muted
        });
    }
    /**
   * Call synchronously inside the Start tap handler. Creates and unlocks the shared audio element and primes
   * speechSynthesis, so later lines (started after awaited fetches) may still play on iOS Safari.
   */ unlock() {
        if (typeof Audio !== "undefined" && !this.shared) {
            const el = new Audio();
            el.src = SILENT_WAV;
            el.play().then(()=>el.pause(), ()=>undefined);
            this.shared = el;
        }
        if (this.state.browser) {
            try {
                const primer = new SpeechSynthesisUtterance("");
                primer.volume = 0;
                window.speechSynthesis.speak(primer);
            } catch  {
            // Priming is best effort.
            }
        }
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
    stop(soft = false) {
        this.line++;
        this.liveAbort?.abort();
        this.liveAbort = null;
        this.silence = null;
        if (this.audio) {
            const audio = this.audio;
            audio.onended = null;
            audio.onerror = null;
            this.audio = null;
            if (soft && !audio.paused && !audio.muted) this.fadeOut(audio);
            else {
                audio.pause();
                if (audio !== this.shared) audio.src = "";
            }
        }
        // Speech synthesis has no volume control once speaking: it can only be cancelled.
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
                    const played = await this.playAudio(line, clip.src, starts, end, fireUpTo, finishAll);
                    if (played !== null) return this.used("pregen", played);
                    if (!alive()) return false;
                }
                const clockEnd = end || (starts.length ? starts[starts.length - 1] + 0.5 : 0.3);
                return this.used("silent", await this.runClock(line, starts, clockEnd, fireUpTo, finishAll));
            }
            // (b) Live TTS, never in backup mode.
            if (!this.state.backup && !this.state.muted && this.state.live !== false) {
                const payload = await this.fetchLive(text);
                if (!alive()) return false;
                if (payload?.audioBase64) {
                    const src = `data:${payload.mimeType ?? "audio/mpeg"};base64,${payload.audioBase64}`;
                    const timings = payload.words ?? [];
                    const starts = wordStarts(words, timings);
                    const end = timings.length ? timings[timings.length - 1].end : estimateTimings(text).at(-1)?.end ?? 0;
                    const played = await this.playAudio(line, src, starts, end, fireUpTo, finishAll);
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
    /** Ends a running fade now: paused, volume restored. */ endFade = null;
    /** Ramps the volume to zero over ~200 ms, then pauses. A new line ends the fade at once. */ fadeOut(audio) {
        this.endFade?.();
        const start = audio.volume;
        const began = Date.now();
        const finish = ()=>{
            clearInterval(timer);
            if (this.endFade === finish) this.endFade = null;
            audio.pause();
            audio.volume = start;
            if (audio !== this.shared) audio.src = "";
        };
        const timer = setInterval(()=>{
            const k = (Date.now() - began) / 200;
            if (k >= 1) finish();
            else audio.volume = Math.max(0, start * (1 - k));
        }, 20);
        this.endFade = finish;
    }
    /** Resolves true/false like speak(); null when the audio could not start (caller falls back). */ playAudio(line, src, starts, end, fireUpTo, finishAll) {
        if (typeof Audio === "undefined") return Promise.resolve(null);
        this.endFade?.();
        const audio = this.shared ?? new Audio();
        // Sound may have been switched off while the clip was being fetched.
        audio.muted = this.state.muted;
        audio.src = src;
        this.audio = audio;
        return new Promise((resolve)=>{
            let started = false;
            let done = false;
            let watchdog;
            const finish = (value)=>{
                if (done) return;
                done = true;
                clearTimeout(watchdog);
                if (this.silence === silence) this.silence = null;
                if (this.settle === settle) this.settle = null;
                resolve(value);
            };
            // A started line always ends: a stalled clip, an error after start or a missing `ended` settle as completed.
            const complete = ()=>{
                if (this.line !== line) return;
                finishAll();
                if (this.audio === audio) {
                    audio.pause();
                    this.audio = null;
                }
                finish(true);
            };
            const silence = ()=>{
                audio.muted = true;
            };
            this.silence = silence;
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
            audio.onended = complete;
            audio.onerror = ()=>{
                if (this.line !== line) return;
                if (started) complete();
                else finish(null);
            };
            audio.play().then(()=>{
                if (done || this.line !== line) return;
                started = true;
                watchdog = setTimeout(complete, watchdogMs(end || (starts.length ? starts[starts.length - 1] : 0)));
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
    /** Test hook / UI: the browser voice that would be used. */ static browserVoiceName() {
        if (("TURBOPACK compile-time value", "object") === "undefined" || !window.speechSynthesis) return null;
        return pickBrowserVoice(window.speechSynthesis.getVoices())?.name ?? null;
    }
    speakBrowser(line, text, words, fireUpTo, finishAll) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        const voice = pickBrowserVoice(synth.getVoices());
        if (voice) utterance.voice = voice;
        // Calm advisor pace; the default rate sounds rushed.
        utterance.rate = 0.9;
        // Some voices never send boundary events: an estimated clock drives the words until one arrives.
        // The estimate is for rate 1, so it is stretched to the slower speaking rate.
        const estimate = estimateTimings(text).map((t)=>t.start / utterance.rate);
        return new Promise((resolve)=>{
            let done = false;
            let started = false;
            let boundaries = false;
            let t0 = 0;
            let muted = false;
            let endWatchdog;
            const finish = (value)=>{
                if (done) return;
                done = true;
                clearTimeout(watchdog);
                clearTimeout(endWatchdog);
                if (this.silence === silence) this.silence = null;
                if (this.settle === settle) this.settle = null;
                resolve(value);
            };
            const settle = (completed)=>finish(completed);
            this.settle = settle;
            const expected = (estimateTimings(text).at(-1)?.end ?? 0.3) / utterance.rate;
            const complete = ()=>{
                if (done || this.line !== line) return;
                finishAll();
                finish(true);
            };
            // Sound off mid-line: cancel the speech, keep the estimated clock running to the end of the line.
            const silence = ()=>{
                if (done || muted) return;
                muted = true;
                const ticking = started && !boundaries;
                if (!started) t0 = now();
                started = true;
                boundaries = false;
                if (!ticking) raf(tick);
                synth.cancel();
                clearTimeout(endWatchdog);
                endWatchdog = setTimeout(complete, Math.max(0, (expected + 0.3) * 1000 - (now() - t0)));
            };
            this.silence = silence;
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
                if (muted) return;
                started = true;
                t0 = now();
                endWatchdog = setTimeout(complete, watchdogMs(expected));
                raf(tick);
            };
            utterance.onboundary = (event)=>{
                if (muted || this.line !== line || event.name && event.name !== "word") return;
                boundaries = true;
                let i = -1;
                while(i + 1 < words.length && words[i + 1].charStart <= event.charIndex)i++;
                fireUpTo(i);
            };
            utterance.onend = ()=>{
                if (!muted) complete();
            };
            utterance.onerror = (event)=>{
                if (muted) return;
                if (this.line !== line || event.error === "interrupted" || event.error === "canceled") return finish(false);
                if (started) finishAll();
                finish(started ? true : null);
            };
            synth.speak(utterance);
        });
    }
}
function pickBrowserVoice(voices) {
    const english = voices.filter((v)=>v.lang.toLowerCase().startsWith("en"));
    const score = (v)=>{
        const name = v.name.toLowerCase();
        if (/natural|neural|online/.test(name)) return 4;
        if (/google uk english female|google us english/.test(name)) return 3;
        if (/samantha|serena|karen|moira|aria|jenny/.test(name)) return 2;
        return v.lang.toLowerCase() === "en-gb" || v.lang.toLowerCase() === "en-us" ? 1 : 0;
    };
    return [
        ...english
    ].sort((a, b)=>score(b) - score(a))[0];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/choreo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FOCUS_SOFTEN",
    ()=>FOCUS_SOFTEN,
    "SETTLE",
    ()=>SETTLE,
    "entranceTiming",
    ()=>entranceTiming,
    "focal",
    ()=>focal,
    "labelStagger",
    ()=>labelStagger,
    "pickChoreo",
    ()=>pickChoreo,
    "pickFocusStyle",
    ()=>pickFocusStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
;
const SETTLE = {
    gather: 1700,
    "unwind-rain": 2300,
    rain: 1900,
    swirl: 2000,
    rise: 2000,
    pour: 2100,
    rewind: 1150
};
function entranceTiming(entrance, g, s, e) {
    const n1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 41);
    const n2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 42);
    switch(entrance.name){
        case "gather":
            return {
                dur: 1300 + 450 * n1,
                delay: 520 * s.order + 160 * n2,
                spiral: {
                    x: s.cx ?? e.width / 2,
                    y: s.cy ?? e.height / 2,
                    turn: 0.9
                },
                ease: "inOutSine"
            };
        case "unwind-rain":
        case "rain":
            {
                const fall = {
                    x: s.x + (n1 - 0.5) * 6,
                    y: Math.min(g.y, s.y) - e.height * 0.32
                };
                const pivot = entrance.name === "unwind-rain" ? entrance.pivot ?? {
                    x: e.width / 2,
                    y: e.height / 2
                } : null;
                return {
                    dur: 950 + 300 * n1 + (pivot ? 300 : 0),
                    delay: 1050 * s.order + 70 * n2,
                    via: fall,
                    spiral: pivot ? {
                        x: pivot.x,
                        y: pivot.y,
                        turn: 1.5
                    } : undefined,
                    ease: "inOutQuad"
                };
            }
        case "swirl":
            return {
                dur: 1250 + 450 * n1,
                delay: 760 * s.group / Math.max(1, s.groups) + 280 * n2,
                spiral: {
                    x: s.cx ?? s.x,
                    y: s.cy ?? s.y,
                    turn: (s.group % 2 ? 1 : -1) * (1.1 + 0.4 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(s.group, 43))
                },
                ease: "inOutSine",
                dip: 0.5
            };
        case "rise":
            return {
                dur: 780 + 220 * n1,
                delay: 1150 * s.order + 40 * n2,
                via: {
                    x: s.x,
                    y: s.base ?? s.y
                },
                ease: "inOutCubic"
            };
        case "pour":
            return {
                dur: 1250 + 350 * n1,
                delay: 950 * s.order + 120 * n2,
                via: {
                    x: e.width / 2 + (n1 - 0.5) * e.width * 0.08,
                    y: -e.height * 0.12
                },
                ease: "inOutSine"
            };
        case "rewind":
            return {
                dur: 700 + 200 * n1,
                delay: 600 * (1 - s.order) + 60 * n2,
                bend: 0.05,
                ease: "outCubic"
            };
    }
}
function labelStagger(entrance, i, n) {
    if (!entrance || n <= 1) return 0;
    const f = i / (n - 1);
    switch(entrance.name){
        case "rain":
        case "unwind-rain":
        case "rise":
            return -1000 * (1 - f);
        case "swirl":
            return -700 * (1 - f);
        case "rewind":
            return -500 * f;
        default:
            return 0;
    }
}
function pickChoreo(from, to, seen, last) {
    const own = to === "galaxy" ? "gather" : to === "monthly" ? from === "galaxy" ? "unwind-rain" : "rain" : to === "level" ? "rise" : to === "jars" ? "pour" : "swirl";
    const candidates = from !== null && from !== to && seen.has(to) ? [
        "rewind",
        own
    ] : [
        own
    ];
    return candidates.find((c)=>c !== last) ?? candidates[0];
}
const STYLES = [
    "zoom",
    "spotlight",
    "ripple",
    "lift"
];
function pickFocusStyle(key, count, last, reduced) {
    const pool = (reduced ? STYLES.slice(0, 2) : STYLES).filter((s)=>s !== last);
    return pool[Math.floor((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hashKey"])(key), 900 + count) * pool.length)];
}
function focal(style, hit) {
    if (hit === null) return {
        dim: 1,
        lift: 0
    };
    if (hit) return {
        dim: 1,
        lift: style === "lift" ? 1 : 0
    };
    switch(style){
        case "spotlight":
            return {
                dim: 0.85,
                lift: 0
            };
        case "ripple":
            return {
                dim: 0.5,
                lift: 0
            };
        case "lift":
            return {
                dim: 0.45,
                lift: -1
            };
        default:
            return {
                dim: 0.32,
                lift: 0
            };
    }
}
const FOCUS_SOFTEN = {
    zoom: 1,
    spotlight: 0.5,
    ripple: 0.8,
    lift: 0.65
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/engine.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Engine",
    ()=>Engine,
    "clamp",
    ()=>clamp,
    "easeInOutCubic",
    ()=>easeInOutCubic,
    "easeOutCubic",
    ()=>easeOutCubic,
    "hashKey",
    ()=>hashKey,
    "noise",
    ()=>noise,
    "palette",
    ()=>palette,
    "rgb",
    ()=>rgb,
    "setRgb",
    ()=>setRgb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$notes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/notes.ts [app-client] (ecmascript)");
;
;
const rgb = (hex)=>{
    const n = parseInt(hex.slice(1), 16);
    return [
        n >> 16 & 255,
        n >> 8 & 255,
        n & 255
    ];
};
const palette = {
    paper: rgb(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper),
    spend: rgb(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend),
    coral: rgb(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral),
    saved: rgb(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved),
    faint: rgb(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint),
    brand: rgb(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].brand)
};
function setRgb(target, hex) {
    const c = rgb(hex);
    const t = target;
    t[0] = c[0];
    t[1] = c[1];
    t[2] = c[2];
}
function noise(id, salt = 0) {
    let h = Math.imul(id ^ 0x5bd1e995, 0x85ebca6b) ^ Math.imul(salt + 0x27d4eb2f, 0xc2b2ae35);
    h ^= h >>> 16;
    h = Math.imul(h, 0x7feb352d);
    h ^= h >>> 15;
    h = Math.imul(h, 0x846ca68b);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
}
function hashKey(key) {
    let h = 0x811c9dc5;
    for (const ch of String(key))h = Math.imul(h ^ ch.codePointAt(0), 0x01000193) >>> 0;
    return h;
}
const easeInOutCubic = (t)=>t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t)=>1 - (1 - t) * (1 - t) * (1 - t);
const clamp = (v, lo, hi)=>Math.min(hi, Math.max(lo, v));
const EASES = [
    "inOutCubic",
    "inOutSine",
    "outCubic",
    "inOutQuad"
];
function ease(code, t) {
    switch(code){
        case 1:
            return 0.5 - 0.5 * Math.cos(Math.PI * t);
        case 2:
            return easeOutCubic(t);
        case 3:
            return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
        default:
            return easeInOutCubic(t);
    }
}
const near = (a, b)=>Math.abs(a - b) < 0.5;
const sameColor = (a, b)=>a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
const fillOf = (c)=>`rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
const TAU = Math.PI * 2;
const SPARKS = 9;
function sameMotion(a, b) {
    if (!a || !b) return a === b;
    if (a.kind === "orbit" && b.kind === "orbit") return near(a.cx, b.cx) && near(a.cy, b.cy) && near(a.radius, b.radius);
    if (a.kind === "flow" && b.kind === "flow") return near(a.x, b.x) && near(a.top, b.top) && near(a.bottom, b.bottom);
    if (a.kind === "wander" && b.kind === "wander") return near(a.x, b.x) && near(a.y, b.y) && Math.abs(a.amp - b.amp) < 0.1;
    return false;
}
const point = {
    x: 0,
    y: 0,
    fade: 1
};
function motionPoint(m, now) {
    const t = (now - m.since) / 1000;
    if (m.kind === "orbit") {
        const angle = m.angle + m.speed * t;
        point.x = m.cx + Math.cos(angle) * m.radius;
        point.y = m.cy + Math.sin(angle) * m.radius;
        point.fade = 1;
    } else if (m.kind === "wander") {
        const w = m.speed * t;
        const p = m.phase;
        point.x = m.x + m.amp * (0.7 * Math.sin(w + p) + 0.3 * Math.sin(2.3 * w + 1.9 * p));
        point.y = m.y + m.amp * (0.7 * Math.sin(1.31 * w + 2.7 * p) + 0.3 * Math.sin(1.9 * w + 0.6 * p));
        point.fade = 1;
    } else {
        const span = m.bottom - m.top;
        const y = ((m.offset + m.speed * t) % span + span) % span;
        point.y = m.top + y;
        point.x = m.x + Math.sin(point.y * 0.035 + m.offset) * m.spread;
        point.fade = clamp(Math.min(y, span - y) / (span * 0.12), 0, 1);
    }
    return point;
}
/** Pixels a label may move down (+) or up (-) to find a free spot, nearest first. */ const LABEL_SHIFTS = [
    0,
    13,
    -13,
    26,
    -26,
    39,
    -39,
    52,
    -52
];
class Engine {
    grains = [];
    width = 0;
    height = 0;
    cam = {
        x: 0,
        y: 0,
        s: 1
    };
    camTo = {
        x: 0,
        y: 0,
        s: 1
    };
    /** What is drawn this frame: the camera plus the transient breath (zoom out and back). */ view = {
        x: 0,
        y: 0,
        s: 1
    };
    layer = null;
    reduced = false;
    /** Banknote look (notes.ts); null = round dots (`?units=dots`). */ notes = new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$notes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NoteRenderer"]();
    /** Soft radial vignette around a world point (focus "spotlight"). */ spot = {
        x: 0,
        y: 0,
        r: 0,
        a: 0,
        aTo: 0
    };
    /** A ring travelling out through a cluster (focus "ripple"). */ ripple = {
        on: false,
        x: 0,
        y: 0,
        R: 0,
        t0: 0,
        dur: 1300
    };
    labelQueue = [];
    labelWidths = new Map();
    /**
   * Hand zoom/pan over the scene's camera, in screen space: screen' = s * screen + (x, y). Gestures write `user`
   * directly; `userTo` is only used while easing back to none. Folded into `view`, so notes, labels and overlays follow.
   */ user = {
        x: 0,
        y: 0,
        s: 1
    };
    userTo = null;
    /** Called when the hand view starts or stops differing from the scene's own view (the reset button). */ onUserChange = null;
    userActive = false;
    breath = {
        t0: 0,
        dur: 0,
        amount: 0
    };
    sparks = Array.from({
        length: SPARKS
    }, ()=>({
            on: false,
            sx: 0,
            sy: 0,
            cx: 0,
            cy: 0,
            ex: 0,
            ey: 0,
            t0: 0,
            dur: 1,
            r: 2,
            fill: ""
        }));
    spotGradient = null;
    canvas = null;
    ctx = null;
    raf = 0;
    dpr = 1;
    last = 0;
    motionQuery = null;
    /** Frame time while a frame is being computed (chained flights start exactly when the previous one lands). */ frameNow = -1;
    /** Creates the grains, scattered invisibly over the canvas so the first scene gathers them. */ createGrains(categories) {
        this.grains = categories.map((category, id)=>{
            const x = noise(id, 1) * (this.width || 300);
            const y = noise(id, 2) * (this.height || 200);
            return {
                id,
                category,
                jx: noise(id, 3) * 2 - 1,
                jy: noise(id, 4) * 2 - 1,
                x,
                y,
                a: 0,
                r: 1.5,
                color: [
                    ...palette.paper
                ],
                fill: fillOf(palette.paper),
                fade: 1,
                sx: x,
                sy: y,
                cx: x,
                cy: y,
                tx: x,
                ty: y,
                t0: 0,
                dur: 1,
                moving: false,
                flights: 0,
                c0: palette.paper,
                c1: palette.paper,
                a0: 0,
                a1: 0,
                r0: 1.5,
                r1: 1.5,
                dim: 1,
                dimTo: 1,
                lift: 0,
                liftTo: 0,
                motion: null,
                ease: 0,
                spiral: false,
                px: 0,
                py: 0,
                pr0: 0,
                pr1: 0,
                pth0: 0,
                pdth: 0,
                dip: 0,
                next: null
            };
        });
    }
    attach(canvas) {
        if (this.canvas === canvas && this.raf) return;
        this.detach();
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.spotGradient = null;
        this.motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") ?? null;
        this.reduced = !!this.motionQuery?.matches;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$notes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wantsNotes"])()) this.notes = null;
        this.last = performance.now();
        const loop = (now)=>{
            this.raf = requestAnimationFrame(loop);
            this.tick(now);
        };
        this.raf = requestAnimationFrame(loop);
    }
    detach() {
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = 0;
        this.canvas = null;
        this.ctx = null;
    }
    /** Returns true when the size changed. */ resize(width, height) {
        if (!this.canvas || width <= 0 || height <= 0) return false;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.canvas.width = Math.round(width * this.dpr);
        this.canvas.height = Math.round(height * this.dpr);
        const first = this.width === 0;
        const changed = width !== this.width || height !== this.height;
        this.width = width;
        this.height = height;
        if (changed) this.resetUser(true);
        if (first) {
            this.cam = {
                x: width / 2,
                y: height / 2,
                s: 1
            };
            this.camTo = {
                ...this.cam
            };
            this.view = {
                ...this.cam
            };
            for (const g of this.grains){
                g.x = g.sx = g.tx = noise(g.id, 1) * width;
                g.y = g.sy = g.ty = noise(g.id, 2) * height;
            }
        }
        return changed;
    }
    /** Moves a grain from wherever it is now (mid-flight included). No-op if already headed there. */ place(g, p, t) {
        const color = p.color ?? g.c1;
        const alpha = p.alpha ?? g.a1;
        const r = p.r ?? g.r1;
        if (p.dim !== undefined) g.dimTo = p.dim;
        if (p.lift !== undefined) g.liftTo = this.reduced ? 0 : p.lift;
        const motion = p.motion ?? null;
        const keepMotion = sameMotion(g.motion, motion);
        const samePos = keepMotion && (motion !== null || near(g.tx, p.x) && near(g.ty, p.y));
        if (samePos && sameColor(g.c1, color) && Math.abs(g.a1 - alpha) < 0.01 && Math.abs(g.r1 - r) < 0.02) return;
        const now = this.frameNow >= 0 ? this.frameNow : performance.now();
        g.sx = g.x;
        g.sy = g.y;
        g.c0 = [
            g.color[0],
            g.color[1],
            g.color[2]
        ];
        g.a0 = g.a;
        g.r0 = g.r;
        g.c1 = color;
        g.a1 = alpha;
        g.r1 = r;
        if (!keepMotion) g.motion = motion;
        g.tx = p.x;
        g.ty = p.y;
        g.t0 = now + (this.reduced ? 0 : t.delay ?? 0);
        g.dur = Math.max(1, t.dur * (this.reduced ? 0.25 : 1));
        g.flights++;
        g.ease = Math.max(0, EASES.indexOf(t.ease ?? "inOutCubic"));
        g.dip = this.reduced ? 0 : t.dip ?? 0;
        g.next = t.then ?? null;
        if (t.via) {
            g.cx = t.via.x;
            g.cy = t.via.y;
        } else {
            const bend = (t.bend ?? 0.22) * (noise(g.id, 100 + g.flights) * 2 - 1);
            const dx = p.x - g.x;
            const dy = p.y - g.y;
            g.cx = (g.x + p.x) / 2 - dy * bend;
            g.cy = (g.y + p.y) / 2 + dx * bend;
        }
        g.spiral = !!t.spiral && !this.reduced;
        if (t.spiral) {
            const { x: px, y: py, turn } = t.spiral;
            g.px = px;
            g.py = py;
            g.pr0 = Math.hypot(g.x - px, g.y - py);
            g.pr1 = Math.hypot(p.x - px, p.y - py);
            g.pth0 = Math.atan2(g.y - py, g.x - px);
            let d = Math.atan2(p.y - py, p.x - px) - g.pth0;
            d = ((d + Math.PI) % TAU + TAU) % TAU - Math.PI;
            g.pdth = d + turn;
        }
        g.moving = true;
    }
    /** Orbit/flow speed, honouring reduced motion (no rotation). */ speed(value) {
        return this.reduced ? 0 : value;
    }
    /** Point the camera at a world point with zoom `s` (1.0-2.6). At zoom 1 it stays home; zoomed, it may show the night edge. */ lookAt(x, y, s) {
        this.resetUser();
        const zoom = clamp(s, 1, 2.6);
        const slack = 1 - 1 / zoom; // how far the centre may move from home, as a share of the half size
        const w2 = this.width / 2;
        const h2 = this.height / 2;
        this.camTo = {
            x: clamp(x, w2 - w2 * slack * 1.4, w2 + w2 * slack * 1.4),
            y: clamp(y, h2 - h2 * slack * 1.4, h2 + h2 * slack * 1.4),
            s: zoom
        };
    }
    /** Fit a world box into the view. `soften` (0-1) keeps only that share of the zoom above 1. */ frame(box, opts = {}) {
        const pad = opts.pad ?? 0.12;
        const s = Math.min(this.width * (1 - pad) / Math.max(box.w, 1), this.height * (1 - pad) / Math.max(box.h, 1));
        const zoom = clamp(s, opts.min ?? 1, opts.max ?? 2.6);
        this.lookAt(box.x + box.w / 2, box.y + box.h / 2, 1 + (zoom - 1) * (opts.soften ?? 1));
    }
    home() {
        this.lookAt(this.width / 2, this.height / 2, 1);
    }
    /** The camera pulls back by `amount` and returns (uzaklaşma), over `dur` ms. */ breathe(amount, dur) {
        if (this.reduced) return;
        this.breath.t0 = performance.now();
        this.breath.dur = dur;
        this.breath.amount = amount;
    }
    /** A ring expands from a world point through a cluster of radius R, swelling the grains it passes. */ startRipple(x, y, R, delay = 250) {
        if (this.reduced) return;
        const r = this.ripple;
        r.on = true;
        r.x = x;
        r.y = y;
        r.R = Math.max(R, 12);
        r.t0 = performance.now() + delay;
    }
    /**
   * The look changed (light/dark): every grain colour that equals a `from` colour becomes its `to` colour, so the
   * grains change at once without flying anywhere. Colours a scene sets later come from the (already updated) palette.
   */ recolor(pairs) {
        this.spotGradient = null;
        const swap = (c)=>{
            for (const [from, to] of pairs){
                if (c[0] === from[0] && c[1] === from[1] && c[2] === from[2]) {
                    const t = c;
                    t[0] = to[0];
                    t[1] = to[1];
                    t[2] = to[2];
                    return true;
                }
            }
            return false;
        };
        for (const g of this.grains){
            if (swap(g.color)) g.fill = fillOf(g.color);
            swap(g.c0);
        }
    }
    /** Taşıma: a few sparks leave a world cluster and travel to the top centre of the stage (where the big figure sits). */ carry(x, y, R, color, count = 7) {
        if (this.reduced || !this.width) return;
        const now = performance.now();
        const ex = this.width / 2;
        const ey = this.height * 0.02;
        const fill = fillOf(color);
        let n = 0;
        for(let i = 0; i < SPARKS && n < count; i++){
            const s = this.sparks[i];
            if (s.on && now < s.t0 + s.dur) continue;
            const a = noise(i + n * 13, Math.round(x + y)) * TAU;
            const d = R * 0.55 * Math.sqrt(noise(n, 77 + Math.round(R)));
            const [sx, sy] = this.toScreen(x + Math.cos(a) * d, y + Math.sin(a) * d);
            s.on = true;
            s.sx = sx;
            s.sy = sy;
            s.ex = ex + (noise(n, 61) - 0.5) * 24;
            s.ey = ey;
            s.cx = sx * 0.55 + ex * 0.45 + (noise(n, 62) - 0.5) * 120;
            s.cy = ey + (sy - ey) * 0.25;
            s.t0 = now + 180 + n * 70;
            s.dur = 1050 + 350 * noise(n, 63);
            s.r = 2 + noise(n, 64);
            s.fill = fill;
            n++;
        }
    }
    toScreen(x, y) {
        const { x: cx, y: cy, s } = this.view;
        return [
            (x - cx) * s + this.width / 2,
            (y - cy) * s + this.height / 2
        ];
    }
    /** Draw in world coordinates; `unit` is one screen pixel in world units (for line widths and dashes). */ inWorld(ctx, draw) {
        const { x, y, s } = this.view;
        const d = this.dpr;
        ctx.save();
        ctx.setTransform(d * s, 0, 0, d * s, d * (this.width / 2 - x * s), d * (this.height / 2 - y * s));
        draw(1 / s);
        ctx.restore();
    }
    /** Text at a world point, drawn in screen space so it stays readable at any zoom. */ /**
   * Queues a text label for this frame (world position, optional offset). Nothing is drawn here: flushLabels() places
   * all labels together so they never overlap each other, stay inside the canvas and read over the grains.
   * Labels sharing the same anchor (a name and its value) move as one.
   */ label(ctx, text, x, y, o = {}) {
        const alpha = o.alpha ?? 1;
        if (alpha < 0.01) return;
        const [sx, sy] = this.toScreen(x, y);
        const size = o.size ?? 11;
        const weight = o.weight ?? 400;
        const align = o.align ?? "center";
        this.labelQueue.push({
            text,
            x: sx,
            y: sy + (o.dy ?? 0),
            key: `${Math.round(sx)}:${Math.round(sy)}:${align}`,
            color: o.color ?? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint,
            alpha,
            size,
            weight,
            align,
            baseline: o.baseline ?? "alphabetic",
            font: `${weight} ${size}px Inter, Arial, sans-serif`
        });
    }
    textWidth(ctx, item) {
        const key = `${item.font}|${item.text}`;
        let w = this.labelWidths.get(key);
        if (w === undefined) {
            ctx.font = item.font;
            w = ctx.measureText(item.text).width;
            if (this.labelWidths.size > 400) this.labelWidths.clear();
            this.labelWidths.set(key, w);
        }
        return w;
    }
    /** Where a label sits on screen after moving it `shift` px down; the box is what other labels must keep clear of. */ labelBox(ctx, item, shift) {
        const w = this.textWidth(ctx, item);
        const x = item.align === "center" ? item.x - w / 2 : item.align === "right" || item.align === "end" ? item.x - w : item.x;
        const top = item.baseline === "alphabetic" ? item.y + shift - item.size : item.baseline === "middle" ? item.y + shift - item.size / 2 : item.y + shift;
        return {
            x,
            y: top,
            w,
            h: item.size * 1.25
        };
    }
    /** Draws the queued labels: most important first, each moved up or down to the nearest free spot. */ flushLabels(ctx) {
        const items = this.labelQueue;
        this.labelQueue = [];
        if (!items.length) return;
        const W = this.width;
        const H = this.height;
        const groups = new Map();
        for (const item of items){
            const group = groups.get(item.key);
            if (group) group.push(item);
            else groups.set(item.key, [
                item
            ]);
        }
        const rank = (g)=>Math.max(...g.map((i)=>i.weight / 100 + i.alpha * 5));
        const order = [
            ...groups.values()
        ].sort((a, b)=>rank(b) - rank(a));
        const pad = 3;
        const overlaps = (a, b)=>a.x < b.x + b.w + pad && b.x < a.x + a.w + pad && a.y < b.y + b.h + pad && b.y < a.y + a.h + pad;
        const inside = (b)=>b.y >= 2 && b.y + b.h <= H - 2;
        const placed = [];
        const [sr, sg, sb] = rgb(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].surface);
        const halo = `rgba(${sr},${sg},${sb},0.9)`;
        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        ctx.lineJoin = "round";
        for (const group of order){
            const visible = Math.max(...group.map((i)=>i.alpha)) >= 0.35;
            let shift = 0;
            if (visible) {
                const free = LABEL_SHIFTS.find((d)=>group.every((item)=>{
                        const box = this.labelBox(ctx, item, d);
                        return inside(box) && !placed.some((p)=>overlaps(box, p));
                    }));
                if (free !== undefined) shift = free;
                else {
                    // No free spot: at least keep it inside the canvas.
                    const tops = group.map((item)=>this.labelBox(ctx, item, 0));
                    const up = Math.min(...tops.map((b)=>b.y)) - 2;
                    const down = H - 2 - Math.max(...tops.map((b)=>b.y + b.h));
                    shift = up < 0 ? -up : down < 0 ? down : 0;
                }
            }
            for (const item of group){
                const box = this.labelBox(ctx, item, shift);
                // Keep the text inside the canvas sideways too.
                const dx = box.x < 4 ? 4 - box.x : box.x + box.w > W - 4 ? W - 4 - (box.x + box.w) : 0;
                if (visible) placed.push({
                    ...box,
                    x: box.x + dx
                });
                ctx.font = item.font;
                ctx.textAlign = item.align;
                ctx.textBaseline = item.baseline;
                ctx.globalAlpha = item.alpha;
                // A soft outline in the stage colour keeps the text readable where it crosses grains.
                ctx.strokeStyle = halo;
                ctx.lineWidth = 3.4;
                ctx.strokeText(item.text, item.x + dx, item.y + shift);
                ctx.fillStyle = item.color;
                ctx.fillText(item.text, item.x + dx, item.y + shift);
            }
        }
        ctx.globalAlpha = 1;
    }
    /** Rest-angle spread for the banknotes of the scene being entered (radians): tidy columns, scattered pools. */ setScatter(radians) {
        this.resetUser();
        if (this.notes) this.notes.scatterTo = radians;
    }
    /** Zoom the hand view by `factor` around a canvas point (CSS px), clamped to 1x-6x. */ zoomUser(factor, px, py) {
        const u = this.user;
        const s = clamp(u.s * factor, 1, 6);
        const f = s / u.s;
        u.x = px - (px - u.x) * f;
        u.y = py - (py - u.y) * f;
        u.s = s;
        this.clampUser();
    }
    panUser(dx, dy) {
        this.user.x += dx;
        this.user.y += dy;
        this.clampUser();
    }
    /** Ease the hand view back to none (snaps under reduced motion or when `snap`). */ resetUser(snap = false) {
        if (!this.userActive) return;
        if (snap || this.reduced) {
            this.user.x = this.user.y = 0;
            this.user.s = 1;
            this.userTo = null;
            this.setUserActive(false);
        } else this.userTo = {
            x: 0,
            y: 0,
            s: 1
        };
    }
    /** The scaled scene view always covers the canvas, so the notes cannot be lost. */ clampUser() {
        const u = this.user;
        this.userTo = null;
        u.x = clamp(u.x, this.width * (1 - u.s), 0);
        u.y = clamp(u.y, this.height * (1 - u.s), 0);
        this.setUserActive(u.s > 1.001 || u.x < -0.5 || u.y < -0.5);
    }
    setUserActive(active) {
        if (active === this.userActive) return;
        this.userActive = active;
        this.onUserChange?.(active);
    }
    tick(now) {
        const ctx = this.ctx;
        if (!ctx || !this.width) return;
        const dt = Math.min(64, now - this.last);
        this.last = now;
        this.reduced = !!this.motionQuery?.matches;
        const reduced = this.reduced;
        // camera
        const k = 1 - Math.exp(-dt / (reduced ? 60 : 320));
        this.cam.x += (this.camTo.x - this.cam.x) * k;
        this.cam.y += (this.camTo.y - this.cam.y) * k;
        this.cam.s += (this.camTo.s - this.cam.s) * k;
        const b = this.breath;
        const bp = b.dur > 0 ? (now - b.t0) / b.dur : 1;
        const breath = bp > 0 && bp < 1 && !reduced ? b.amount * Math.sin(Math.PI * bp) : 0;
        this.view.x = this.cam.x;
        this.view.y = this.cam.y;
        this.view.s = this.cam.s * (1 - breath);
        const u = this.user;
        const ut = this.userTo;
        if (ut) {
            const ku = 1 - Math.exp(-dt / 280);
            u.x += (ut.x - u.x) * ku;
            u.y += (ut.y - u.y) * ku;
            u.s += (ut.s - u.s) * ku;
            if (u.s - 1 < 0.002 && u.x > -0.3 && u.y > -0.3) {
                u.x = u.y = 0;
                u.s = 1;
                this.userTo = null;
                this.setUserActive(false);
            }
        }
        if (this.userActive) {
            // screen' = us * ((p - c) * s + W/2) + uo  ==  (p - c') * (us * s) + W/2
            const vs = this.view.s;
            this.view.s = vs * u.s;
            this.view.x += (this.width / 2 * (1 - u.s) - u.x) / this.view.s;
            this.view.y += (this.height / 2 * (1 - u.s) - u.y) / this.view.s;
        }
        this.spot.a += (this.spot.aTo - this.spot.a) * (1 - Math.exp(-dt / 380));
        // grains
        const kd = 1 - Math.exp(-dt / 260);
        for (const g of this.grains){
            g.dim += (g.dimTo - g.dim) * kd;
            g.lift += (g.liftTo - g.lift) * kd;
            let tx = g.tx;
            let ty = g.ty;
            g.fade = 1;
            if (g.motion) {
                const m = motionPoint(g.motion, now);
                tx = m.x;
                ty = m.y;
                g.fade = m.fade;
            }
            if (g.moving) {
                const p = (now - g.t0) / g.dur;
                if (p <= 0) {
                    g.x = g.sx;
                    g.y = g.sy;
                } else if (p >= 1) {
                    g.moving = false;
                    g.x = tx;
                    g.y = ty;
                    g.a = g.a1;
                    g.r = g.r1;
                    g.color[0] = g.c1[0];
                    g.color[1] = g.c1[1];
                    g.color[2] = g.c1[2];
                    g.fill = fillOf(g.color);
                    if (g.next) {
                        const n = g.next;
                        g.next = null;
                        this.frameNow = now;
                        this.place(g, n.place, n.timing);
                        this.frameNow = -1;
                    }
                } else {
                    const e = ease(g.ease, p);
                    const u = 1 - e;
                    let x = u * u * g.sx + 2 * u * e * g.cx + e * e * tx;
                    let y = u * u * g.sy + 2 * u * e * g.cy + e * e * ty;
                    if (g.spiral) {
                        const th = g.pth0 + g.pdth * e;
                        const rr = g.pr0 + (g.pr1 - g.pr0) * e;
                        const w = e * e;
                        x = (1 - w) * (g.px + Math.cos(th) * rr) + w * x;
                        y = (1 - w) * (g.py + Math.sin(th) * rr) + w * y;
                    }
                    g.x = x;
                    g.y = y;
                    g.a = (g.a0 + (g.a1 - g.a0) * e) * (1 - g.dip * Math.sin(Math.PI * p));
                    g.r = g.r0 + (g.r1 - g.r0) * e;
                    if (!sameColor(g.c0, g.c1)) {
                        const ce = clamp((e - 0.2) / 0.8, 0, 1);
                        g.color[0] = g.c0[0] + (g.c1[0] - g.c0[0]) * ce;
                        g.color[1] = g.c0[1] + (g.c1[1] - g.c0[1]) * ce;
                        g.color[2] = g.c0[2] + (g.c1[2] - g.c0[2]) * ce;
                        g.fill = fillOf(g.color);
                    }
                }
            } else if (g.motion) {
                g.x = tx;
                g.y = ty;
            }
        }
        // render
        const { width: w, height: h } = this;
        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        this.layer?.drawUnder?.(ctx, now);
        const { x: cx, y: cy, s } = this.view;
        const ox = w / 2 - cx * s;
        const oy = h / 2 - cy * s;
        const rp = this.ripple;
        let ringR = -1;
        let ringFade = 0;
        if (rp.on) {
            const q = (now - rp.t0) / rp.dur;
            if (q >= 1 || reduced) rp.on = false;
            else if (q > 0) {
                ringR = rp.R * 1.25 * easeOutCubic(q);
                ringFade = 1 - q;
            }
        }
        const ringW = Math.max(rp.R * 0.12, 3);
        // Resting drift: a very slow breathing of the whole field (~11 s period), tiny amplitude.
        const t1 = now * 0.00057;
        const t2 = now * 0.00049;
        let fill = "";
        const notes = this.notes;
        const base = this.dpr;
        let rotated = false;
        notes?.begin(ctx, this.grains.length, now, dt, base, reduced);
        for (const g of this.grains){
            let a = g.a * g.dim * g.fade;
            if (a < 0.01) continue;
            let gx = g.x;
            let gy = g.y;
            let gr = g.r;
            if (!reduced && !g.moving && !g.motion) {
                const amp = gr * 0.28;
                gx += Math.sin(t1 + g.jx * 3.1 + g.id * 0.37) * amp;
                gy += Math.cos(t2 + g.jy * 3.1 + g.id * 0.23) * amp;
                a *= 0.94 + 0.06 * Math.sin(t2 * 1.3 + g.id);
            }
            if (g.lift > 0.01 || g.lift < -0.01) {
                gy -= g.lift * (g.lift > 0 ? gr * 2.2 : gr * 0.6);
                if (g.lift > 0) {
                    gr *= 1 + 0.2 * g.lift;
                    a = Math.min(1, a * (1 + 0.3 * g.lift));
                }
            }
            if (ringR > 0) {
                const dx = gx - rp.x;
                const dy = gy - rp.y;
                const off = (Math.sqrt(dx * dx + dy * dy) - ringR) / ringW;
                if (off > -3 && off < 3) {
                    const bump = Math.exp(-off * off) * ringFade;
                    gr *= 1 + 0.25 * bump;
                    a = Math.min(1, a + 0.25 * bump);
                }
            }
            const r = gr * s;
            const x = gx * s + ox;
            const y = gy * s + oy;
            const hw = notes ? notes.halfWidth(g, r) : 0;
            const reach = Math.max(r, hw);
            if (x < -reach || y < -reach || x > w + reach || y > h + reach) continue;
            if (g.fill !== fill) ctx.fillStyle = fill = g.fill;
            if (notes && hw >= __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$notes$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MIN_HALF_WIDTH"]) {
                notes.draw(ctx, g, x, y, hw, a, s);
                rotated = true;
                continue;
            }
            if (rotated) {
                ctx.setTransform(base, 0, 0, base, 0, 0);
                rotated = false;
            }
            ctx.globalAlpha = a;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, TAU);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        if (rotated) ctx.setTransform(base, 0, 0, base, 0, 0);
        if (ringR > 0) this.drawRing(ctx, ringR, ringFade);
        if (this.spot.a > 0.01) this.drawSpot(ctx);
        this.drawSparks(ctx, now);
        this.layer?.drawOver?.(ctx, now);
        this.flushLabels(ctx);
    }
    /** One radial gradient over the whole view, cached while the spot stays put. */ drawSpot(ctx) {
        const sp = this.spot;
        let cache = this.spotGradient;
        if (!cache || cache.x !== sp.x || cache.y !== sp.y || cache.r !== sp.r) {
            const g = ctx.createRadialGradient(sp.x, sp.y, sp.r * 0.8, sp.x, sp.y, sp.r * 2.6);
            // The vignette fades towards the stage colour, whichever look is active.
            const [sr, sg, sb] = rgb(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].surface);
            g.addColorStop(0, `rgba(${sr},${sg},${sb},0)`);
            g.addColorStop(1, `rgba(${sr},${sg},${sb},0.8)`);
            cache = this.spotGradient = {
                g,
                x: sp.x,
                y: sp.y,
                r: sp.r
            };
        }
        const grad = cache.g;
        const { x, y, s } = this.view;
        this.inWorld(ctx, ()=>{
            ctx.globalAlpha = sp.a;
            ctx.fillStyle = grad;
            ctx.fillRect(x - this.width / s, y - this.height / s, 2 * this.width / s, 2 * this.height / s);
            ctx.globalAlpha = 1;
        });
    }
    drawRing(ctx, R, fade) {
        const rp = this.ripple;
        this.inWorld(ctx, (unit)=>{
            ctx.globalAlpha = 0.32 * fade;
            ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper;
            ctx.lineWidth = unit;
            ctx.beginPath();
            ctx.arc(rp.x, rp.y, R, 0, TAU);
            ctx.stroke();
            ctx.globalAlpha = 1;
        });
    }
    drawSparks(ctx, now) {
        for (const sp of this.sparks){
            if (!sp.on) continue;
            const p = (now - sp.t0) / sp.dur;
            if (p >= 1) {
                sp.on = false;
                continue;
            }
            if (p <= 0) continue;
            const e = 0.5 - 0.5 * Math.cos(Math.PI * p);
            const u = 1 - e;
            const x = u * u * sp.sx + 2 * u * e * sp.cx + e * e * sp.ex;
            const y = u * u * sp.sy + 2 * u * e * sp.cy + e * e * sp.ey;
            ctx.globalAlpha = 0.9 * Math.min(1, p * 6) * Math.pow(1 - p, 0.8);
            ctx.fillStyle = sp.fill;
            ctx.beginPath();
            ctx.arc(x, y, sp.r * (1 - 0.5 * e), 0, TAU);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/grain-world.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GrainWorld",
    ()=>GrainWorld
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/choreo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$galaxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/galaxy.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$jars$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/jars.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$level$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/level.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$monthly$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/monthly.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$pools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/pools.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const ALIASES = {
    Housing: [
        "rent",
        "electricity",
        "flat",
        "apartment",
        "bkw"
    ],
    Electronics: [
        "apple",
        "digitec",
        "galaxus",
        "phone",
        "computer"
    ],
    Travel: [
        "trip",
        "trips",
        "flight",
        "flights",
        "plane",
        "holiday",
        "holidays",
        "hotel"
    ],
    Health: [
        "insurance",
        "krankenkasse",
        "doctor"
    ],
    Bike: [
        "bicycle",
        "veloshop"
    ],
    "Online shopping": [
        "amazon",
        "online"
    ],
    Clothing: [
        "clothes",
        "fashion"
    ],
    Transport: [
        "train",
        "sbb",
        "fuel"
    ],
    "Food and drink": [
        "food",
        "restaurant",
        "restaurants",
        "drink",
        "drinks"
    ],
    Tax: [
        "taxes"
    ],
    "Left over": [
        "left",
        "saved",
        "leftover"
    ]
};
const LEFT_OVER = "Left over";
/** How scattered resting banknotes lie per scene (radians): tidy in columns and jars, loose in pools and the galaxy. */ const NOTE_SCATTER = {
    galaxy: 0.38,
    monthly: 0.05,
    level: 0.05,
    jars: 0.07,
    pools: 0.26
};
class GrainWorld {
    engine = new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Engine"]();
    env = null;
    filled = new Set();
    type = null;
    scene = null;
    /** performance.now() when the current entrance has landed; state changes before it wait (cue words often come early). */ settleAt = 0;
    pending = null;
    entered = false;
    loading = null;
    // Variety guard (pfagent.md 7): the last choreography and focus look, so neither repeats immediately.
    seen = new Set();
    lastChoreo = null;
    lastFocus = null;
    focusCount = 0;
    choreo = null;
    effectLog = [];
    /** Which group is fixed / adjustable / flexible, from /api/facts (loaded once, read-only). */ necessity = null;
    currentScene() {
        return this.type;
    }
    currentFocus() {
        return this.scene?.focusKey ?? null;
    }
    focusTargets() {
        return this.scene?.targets() ?? [];
    }
    /** Month whose column is open (for the director's screen context); not part of World. */ openMonth() {
        return this.scene?.openMonth() ?? null;
    }
    /** Effects played so far, newest last (debugging and the backup recording); not part of World. */ effects() {
        return this.effectLog;
    }
    enter(type) {
        const from = this.type ? sceneOf(this.type) : null;
        const to = sceneOf(type);
        this.choreo = this.lastChoreo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickChoreo"])(from, to, this.seen, this.lastChoreo);
        this.seen.add(to);
        this.note(`enter:${to}:${this.choreo}`);
        this.type = type;
        this.scene = this.env ? this.make(type, this.env) : null;
        this.entered = false;
        this.run("enter");
    }
    focus(target) {
        const scene = this.scene;
        if (!scene) return;
        const before = scene.focusKey;
        if (!scene.setFocus(target)) return;
        const key = scene.focusKey;
        if (key !== null && key !== before) {
            scene.focusStyle = this.lastFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickFocusStyle"])(key, this.focusCount++, this.lastFocus, this.engine.reduced);
            scene.focusFx = true;
            this.note(`focus:${key}:${scene.focusStyle}`);
        }
        this.run("update");
    }
    unfocus() {
        if (!this.scene || this.scene.focusKey === null) return;
        this.scene.clearFocus();
        this.run("update");
    }
    breakdown(b) {
        if (this.scene?.setBreakdown(b)) this.run("update");
    }
    collapse() {
        if (this.scene?.clearBreakdown()) this.run("update");
    }
    ghost(target) {
        if (this.scene?.setGhost(target)) {
            this.note(`iris:${target}`);
            this.run("update");
        }
    }
    fillJar(jar) {
        const name = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$jars$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jarName"])(jar);
        if (!name) return;
        this.filled.add(name);
        if (this.scene?.fillJar(name)) {
            this.note(`transform:${name}`);
            this.run("update");
        }
    }
    /** Not part of World: the look changed; recolour the grains already on screen (see skin.ts). */ recolor(pairs) {
        this.engine.recolor(pairs);
    }
    /** Not part of World: clear demo state (filled jars, focus, breakdown) when the presentation starts over. No cut. */ reset() {
        this.filled.clear();
        if (this.type) this.enter(this.type);
    }
    /** Host the engine on a canvas (stage-canvas.tsx). Loads facts.json once. */ attach(canvas) {
        this.engine.attach(canvas);
        // Development only: lets the browser check read the effect log.
        if ("TURBOPACK compile-time truthy", 1) window.__grainWorld = this;
        void this.load();
    }
    detach() {
        this.engine.detach();
    }
    /** Called by the resize observer: re-lays out the current scene, keeping focus and breakdown. */ resize(width, height) {
        const changed = this.engine.resize(width, height);
        if (!this.entered) this.run("enter");
        else if (changed) this.run("resize");
    }
    /** Same as resize without a size change (World users may call it after layout shifts). */ relayout() {
        this.run("resize");
    }
    /** Fills `necessity` from /api/profile (groups[].necessity, byNecessity); failures leave the necessity targets unknown. */ loadNecessity() {
        fetch("/api/profile").then((res)=>res.ok ? res.json() : Promise.reject(new Error(`profile: ${res.status}`))).then((profile)=>{
            const names = {
                compulsory: "Fixed",
                reducible: "Adjustable",
                discretionary: "Flexible"
            };
            const monthly = {
                Fixed: 0,
                Adjustable: 0,
                Flexible: 0
            };
            for (const [name, key] of Object.entries(names))monthly[key] = profile.byNecessity?.[name]?.monthly ?? 0;
            const groups = {};
            for (const g of profile.groups ?? [])if (names[g.necessity]) groups[g.group] = names[g.necessity];
            this.necessity = {
                groups,
                monthly
            };
            if (this.scene instanceof __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$pools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoolsScene"]) this.scene.setNecessityData(this.necessity);
        }).catch((error)=>console.warn("Grain world: could not load necessity data", error));
    }
    load() {
        this.loadNecessity();
        this.loading ??= fetch("/facts.json").then((res)=>{
            if (!res.ok) throw new Error(`facts.json: ${res.status}`);
            return res.json();
        }).then((facts)=>{
            const categories = toCategories(facts);
            const grains = [];
            categories.forEach((c, i)=>{
                for(let k = 0; k < c.count; k++)grains.push(i);
            });
            this.engine.createGrains(grains);
            this.env = {
                engine: this.engine,
                facts,
                categories,
                filled: this.filled
            };
            if (this.type && !this.scene) this.scene = this.make(this.type, this.env);
            this.run("enter");
        }).catch((error)=>{
            this.loading = null;
            console.warn("Grain world: could not load facts.json", error);
        });
        return this.loading;
    }
    note(effect) {
        this.effectLog.push(effect);
        if (this.effectLog.length > 40) this.effectLog.shift();
    }
    make(type, env) {
        const scene = this.makeScene(type, env);
        if (scene instanceof __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$pools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoolsScene"]) scene.setNecessityData(this.necessity);
        scene.entrance = this.choreo ? {
            name: this.choreo,
            pivot: null
        } : null;
        return scene;
    }
    makeScene(type, env) {
        this.engine.setScatter(NOTE_SCATTER[sceneOf(type)] ?? 0.2);
        switch(type){
            case "galaxy":
                return new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$galaxy$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GalaxyScene"](env);
            case "monthly":
                return new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$monthly$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MonthlyScene"](env);
            case "level":
                return new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$level$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LevelScene"](env);
            case "jars":
                return new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$jars$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JarsScene"](env);
            default:
                return new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$pools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PoolsScene"](env);
        }
    }
    run(kind) {
        const scene = this.scene;
        if (!scene || !this.env || this.engine.width === 0) return;
        if (!this.entered) {
            kind = "enter";
            this.entered = true;
        }
        const now = performance.now();
        // A focus, breakdown or ghost during an entrance would re-place grains still flying in and point the camera at
        // something not formed yet: apply it once the entrance lands. The state is already set, so one later run covers all.
        if (kind === "update" && now < this.settleAt) {
            this.pending ??= setTimeout(()=>{
                this.pending = null;
                this.run("update");
            }, this.settleAt - now);
            return;
        }
        if (this.pending && kind !== "resize") {
            clearTimeout(this.pending);
            this.pending = null;
        }
        if (kind === "enter") this.settleAt = now + (this.engine.reduced ? 300 : scene.entrance ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLE"][scene.entrance.name] : __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLE_MS"].enter);
        this.engine.layer = scene;
        scene.apply(kind);
    }
}
/** Scene that actually draws a type (river and travel borrow pools). */ const sceneOf = (type)=>type === "galaxy" || type === "monthly" || type === "level" || type === "jars" ? type : "pools";
function toCategories(facts) {
    const spending = Object.entries(facts.categories_yearly_net_of_refunds).map(([name, value])=>({
            name,
            value,
            count: Math.round(value / 100),
            saved: false,
            aliases: ALIASES[name] ?? []
        })).filter((c)=>c.count > 0).sort((a, b)=>b.value - a.value);
    const left = facts.year_end_net_vs_start;
    return [
        ...spending,
        {
            name: LEFT_OVER,
            value: left,
            count: Math.max(0, Math.round(left / 100)),
            saved: true,
            aliases: ALIASES[LEFT_OVER]
        }
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/layout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GOLDEN_ANGLE",
    ()=>GOLDEN_ANGLE,
    "assignColumns",
    ()=>assignColumns,
    "clusterRadius",
    ()=>clusterRadius,
    "columnGrid",
    ()=>columnGrid,
    "largestRemainder",
    ()=>largestRemainder,
    "packClusters",
    ()=>packClusters,
    "phyllotaxis",
    ()=>phyllotaxis,
    "pick",
    ()=>pick
]);
const GOLDEN_ANGLE = 2.39996;
function phyllotaxis(k, c, cx, cy) {
    const angle = k * GOLDEN_ANGLE;
    const r = c * Math.sqrt(k + 0.5);
    return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r
    };
}
const clusterRadius = (n, c)=>c * Math.sqrt(Math.max(n, 1) + 0.5);
function largestRemainder(values, total) {
    const clean = values.map((v)=>Math.max(0, v));
    const sum = clean.reduce((a, b)=>a + b, 0);
    if (sum <= 0 || total <= 0) return values.map(()=>0);
    const exact = clean.map((v)=>v / sum * total);
    const counts = exact.map(Math.floor);
    let left = total - counts.reduce((a, b)=>a + b, 0);
    const order = exact.map((v, i)=>({
            i,
            rest: v - Math.floor(v)
        })).sort((a, b)=>b.rest - a.rest || a.i - b.i);
    for(let k = 0; left > 0; k = (k + 1) % order.length, left--)counts[order[k].i]++;
    return counts;
}
function pick(list, text) {
    const q = String(text).trim().toLowerCase();
    if (!q) return null;
    const names = (item)=>[
            item.name,
            ...(item.aliases ?? []).filter((a)=>a.length >= 3)
        ].map((n)=>n.toLowerCase());
    return list.find((item)=>names(item).includes(q)) ?? list.find((item)=>names(item).some((n)=>q.includes(n) || q.length >= 3 && n.includes(q))) ?? null;
}
function packClusters(counts, region, opts) {
    const steps = 10;
    let best = null;
    for(let step = 0; step <= steps; step++){
        const c = opts.cMax - (opts.cMax - opts.cMin) * step / steps;
        const result = packOnce(counts, c, opts.labelGap, opts.pad ?? c * 1.2, region.w / Math.max(region.h, 1));
        best = {
            c,
            ...result
        };
        if (result.box.w <= region.w && result.box.h <= region.h) break;
    }
    const { c, centres, box } = best;
    const scale = Math.min(1, region.w / Math.max(box.w, 1), region.h / Math.max(box.h, 1));
    const ox = region.x + region.w / 2;
    const oy = region.y + region.h / 2;
    const bx = box.x + box.w / 2;
    const by = box.y + box.h / 2;
    return {
        c: c * scale,
        circles: centres.map((p, i)=>({
                x: ox + (p.x - bx) * scale,
                y: oy + (p.y - by) * scale,
                r: clusterRadius(counts[i], c * scale)
            }))
    };
}
function packOnce(counts, c, labelGap, pad, aspect) {
    // Footprint = cluster circle grown downwards by the label gap.
    const foot = counts.map((n)=>clusterRadius(n, c) + labelGap / 2);
    const order = counts.map((_, i)=>i).sort((a, b)=>foot[b] - foot[a] || a - b);
    const placed = [];
    const ax = Math.sqrt(Math.max(0.3, Math.min(aspect, 4)));
    const ay = 1 / ax;
    const step = Math.max(c * 0.6, 0.5);
    for (const i of order){
        let x = 0;
        let y = 0;
        for(let t = 0; t < 6000; t++){
            const angle = t * 0.45;
            const rad = step * t * 0.12;
            x = Math.cos(angle) * rad * ax;
            y = Math.sin(angle) * rad * ay;
            const ok = placed.every((p)=>Math.hypot(p.x - x, p.y - y) >= foot[p.i] + foot[i] + pad);
            if (ok) break;
        }
        placed.push({
            i,
            x,
            y
        });
    }
    const centres = counts.map(()=>({
            x: 0,
            y: 0
        }));
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const p of placed){
        // footprint centre sits labelGap/2 below the cluster centre
        const cy = p.y - labelGap / 2;
        centres[p.i] = {
            x: p.x,
            y: cy
        };
        const r = clusterRadius(counts[p.i], c);
        minX = Math.min(minX, p.x - r);
        maxX = Math.max(maxX, p.x + r);
        minY = Math.min(minY, cy - r);
        maxY = Math.max(maxY, cy + r + labelGap);
    }
    return {
        centres,
        box: {
            x: minX,
            y: minY,
            w: maxX - minX,
            h: maxY - minY
        }
    };
}
function columnGrid(width, height, rowsUp, rowsDown) {
    const top = 16;
    const bottom = 22;
    const gap = rowsDown > 0 ? 6 : 0;
    const margin = Math.max(8, width * 0.03);
    const colW = (width - margin * 2) / 12;
    const pitch = Math.max(1.5, Math.min(colW * 0.8 / 4, (height - top - bottom - gap) / Math.max(rowsUp + rowsDown, 1)));
    const used = (rowsUp + rowsDown) * pitch + gap;
    const plotTop = top + Math.max(0, height - top - bottom - used) * (rowsDown > 0 ? 0.5 : 1);
    const baseY = plotTop + rowsUp * pitch + gap / 2;
    const colX = (i)=>margin + colW * (i + 0.5);
    /** Slot k of column i; dir 1 = up from the base line, -1 = down. */ const slot = (i, k, dir, g)=>{
        const row = Math.floor(k / 4);
        const jitter = g ? pitch * 0.09 : 0;
        return {
            x: colX(i) + (k % 4 - 1.5) * pitch + (g ? g.jx * jitter : 0),
            y: baseY - dir * ((row + 0.5) * pitch + gap / 2) + (g ? g.jy * jitter : 0)
        };
    };
    /** World box of column i holding n grains. */ const columnBox = (i, n, dir)=>{
        const rows = Math.max(1, Math.ceil(n / 4));
        const h = rows * pitch + gap / 2;
        return {
            x: colX(i) - 2 * pitch,
            y: dir > 0 ? baseY - h : baseY,
            w: 4 * pitch,
            h
        };
    };
    return {
        top,
        bottom,
        margin,
        colW,
        pitch,
        baseY,
        plotTop,
        colX,
        slot,
        columnBox,
        labelY: height - 7
    };
}
function assignColumns(grains, counts) {
    const need = counts.reduce((a, b)=>a + b, 0);
    const visible = grains.filter((g)=>g.a1 > 0.02);
    const hidden = grains.filter((g)=>g.a1 <= 0.02);
    const pool = visible.length >= need ? visible : visible.concat(hidden.slice(0, need - visible.length));
    pool.sort((a, b)=>a.x - b.x || a.id - b.id);
    const chosen = [];
    const used = new Set();
    for(let i = 0; i < need && i < pool.length; i++){
        const g = pool[Math.floor(i * pool.length / need)];
        chosen.push(g);
        used.add(g.id);
    }
    const columns = [];
    let offset = 0;
    for (const n of counts){
        const chunk = chosen.slice(offset, offset + n).sort((a, b)=>b.y - a.y || a.x - b.x);
        for(let k = 0; k < chunk.length; k += 4){
            const row = chunk.slice(k, k + 4).sort((a, b)=>a.x - b.x);
            chunk.splice(k, row.length, ...row);
        }
        columns.push(chunk);
        offset += n;
    }
    return {
        columns,
        rest: grains.filter((g)=>!used.has(g.id))
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/logo.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOGO_GAP",
    ()=>LOGO_GAP,
    "inLogo",
    ()=>inLogo,
    "inLogoGap",
    ()=>inLogoGap,
    "logoPoints",
    ()=>logoPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/layout.ts [app-client] (ecmascript)");
;
/**
 * The PostFinance mark as geometry (no image asset): a bold plus cut by a diagonal gap into two interlocking hooks.
 * Unit coordinates, centre (0, 0), y down, the plus spanning about -1..1. The upper hook is the top arm turning into the
 * left arm, the lower hook the bottom arm turning into the right arm; each hook has a rounded concave inner corner.
 * Pure functions, no canvas.
 */ /** Half the thickness of each arm. */ const W = 0.36;
/** Half the length of the horizontal arms (the mark is slightly taller than wide). */ const HX = 0.95;
/** Radius of the rounded concave corner inside each hook. */ const FILLET = 0.32;
const LOGO_GAP = 0.04;
/** Sideways bow of the gap (a soft S, like the mark's cut). */ const BOW = 0.045;
const L = W * Math.SQRT2;
/** Signed offset from the gap's centre line (negative = upper hook side); the gap runs from (W, -W) to (-W, W). */ function gapOffset(x, y) {
    const u = (x - y) / Math.SQRT2;
    const v = (x + y) / Math.SQRT2;
    const centre = Math.abs(u) < L ? BOW * Math.sin(Math.PI * u / L) : 0;
    return v - centre;
}
/** True inside the plus with its two rounded hook corners, ignoring the gap. */ function inPlus(x, y) {
    if (Math.abs(x) <= W && Math.abs(y) <= 1) return true;
    if (Math.abs(y) <= W && Math.abs(x) <= HX) return true;
    // Concave fillets at the hooks' inner corners: upper-left (-W, -W) and lower-right (W, W).
    for (const s of [
        -1,
        1
    ]){
        const dx = s * x - W;
        const dy = s * y - W;
        if (dx >= 0 && dx <= FILLET && dy >= 0 && dy <= FILLET && Math.hypot(FILLET - dx, FILLET - dy) >= FILLET) return true;
    }
    return false;
}
function inLogoGap(x, y) {
    return Math.abs(x) <= W + LOGO_GAP && Math.abs(y) <= W + LOGO_GAP && Math.abs(gapOffset(x, y)) < LOGO_GAP;
}
function inLogo(x, y) {
    return inPlus(x, y) && !inLogoGap(x, y);
}
const RING = Array.from({
    length: 12
}, (_, i)=>[
        Math.cos(i * Math.PI / 6),
        Math.sin(i * Math.PI / 6)
    ]);
/** Inside with at least `m` of room all around (sampled on a ring), so a note wandering by up to `m` stays inside. */ function insideBy(x, y, m) {
    if (!inLogo(x, y)) return false;
    for (const [cx, cy] of RING)if (!inLogo(x + cx * m, y + cy * m)) return false;
    return true;
}
function sunflower(c, room, max) {
    const out = [];
    const reach = Math.hypot(HX, 1) + c;
    for(let k = 0; out.length <= max; k++){
        const r = c * Math.sqrt(k + 0.5);
        if (r > reach) break;
        const x = Math.cos(k * __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOLDEN_ANGLE"]) * r;
        const y = Math.sin(k * __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GOLDEN_ANGLE"]) * r;
        if (insideBy(x, y, room * c)) out.push({
            x,
            y
        });
    }
    return out;
}
function logoPoints(n, room = 0.5) {
    const key = `${n}:${room}`;
    const hit = cache.get(key);
    if (hit) return hit;
    let lo = 0.001;
    let hi = 0.5;
    let best = sunflower(hi, room, n);
    let bestC = hi;
    for(let i = 0; i < 40 && best.length !== n; i++){
        const c = (lo + hi) / 2;
        const pts = sunflower(c, room, n);
        if (pts.length >= n) {
            lo = c;
            best = pts;
            bestC = c;
        } else hi = c;
    }
    if (best.length < n) best = sunflower(lo, room, n);
    const result = {
        points: best.slice(0, n),
        c: bestC
    };
    cache.set(key, result);
    return result;
}
const cache = new Map();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/notes.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MIN_HALF_WIDTH",
    ()=>MIN_HALF_WIDTH,
    "NoteRenderer",
    ()=>NoteRenderer,
    "wantsNotes",
    ()=>wantsNotes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
;
/**
 * Banknote look for the grain world: each unit (CHF 100) is drawn as a small stylised paper note instead of a dot.
 * Not a real banknote: only the block layout and palettes of the Swiss notes are echoed (a body colour, a deeper block
 * at the left, a band low across the middle, a pale strip at the right end). No text, numerals, artwork, cross,
 * globe, security patterns or signatures. Each unit colour maps to one note's palette so the meaning stays readable:
 * paper/neutral = the 100 (blue), amber spending = the 10 (yellow/orange), coral missing = the 20 (red),
 * green saved = the 50 (yellow-green). In-between colours (mid-flight) blend the palettes; colours far from every
 * anchor fall back to the same layout tinted in their own colour.
 * Each look is a small sprite cached per quantised colour (colours interpolate in flight) and drawn with drawImage;
 * below DETAIL_FROM half-width a simpler sprite (body + band) is used.
 *
 * Motion on top of the engine's positions (positions themselves are untouched, so every scene and choreography works):
 * - at rest a note lies at a small seeded angle; `scatter` (radians, per scene) decides how tidy that is;
 * - in flight it tilts towards its direction of travel and flutters (one axis foreshortened: turning in the air);
 * - orbiting (galaxy) it sways slowly; in the jars' stream it falls like paper, tilting with its side-to-side swing;
 * - with prefers-reduced-motion: no flutter, no tilt, no sway.
 * Per-note state lives in typed arrays indexed by grain id: drawing a frame allocates nothing.
 */ const TAU = Math.PI * 2;
const HALF_PI = Math.PI / 2;
/** Note half-width as a share of the grain radius, and its aspect (height / width). */ const WIDTH_PER_R = 1.2;
const ASPECT = 0.5;
const MIN_HALF_WIDTH = 2.5;
/** Notes this close to the minimum are raised to it (neighbours overlap a little, like a loose pile of paper). */ const RAISE_FROM = 1.5;
/** Stream notes (jars) are tiny dots in the dot look; as notes they get this minimum half-width. */ const STREAM_HALF_WIDTH = 2.6;
/** Below this half-width only the body and the band are drawn (simpler, crisper sprite). */ const DETAIL_FROM = 4;
const SPRITE_W = 64;
const SMALL_W = 16;
/** New sprites made per frame (a colour transition fills the cache over a few frames; misses draw a plain rect). */ const NEW_PER_FRAME = 24;
const MAX_SPRITES = 1536;
/** Colours within this RGB distance of an anchor colour blend towards that note's palette. */ const REACH = 110;
const hex = (h)=>[
        parseInt(h.slice(1, 3), 16),
        parseInt(h.slice(3, 5), 16),
        parseInt(h.slice(5, 7), 16)
    ];
const NOTES = [
    // 100: blue body, deeper blue block, yellow-to-orange band, pale blue-white strip.
    {
        at: hex(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper),
        pal: [
            [
                64,
                136,
                194
            ],
            [
                40,
                94,
                150
            ],
            [
                240,
                184,
                72
            ],
            [
                232,
                116,
                60
            ],
            [
                226,
                235,
                240
            ]
        ]
    },
    // 10: yellow/orange body, warm orange block and band ending grey-blue, pale cream strip.
    {
        at: hex(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].spend),
        pal: [
            [
                238,
                164,
                36
            ],
            [
                220,
                112,
                28
            ],
            [
                242,
                128,
                44
            ],
            [
                150,
                162,
                180
            ],
            [
                250,
                238,
                206
            ]
        ]
    },
    // 20: red/coral body, deeper red block, pink-to-violet band, pale pink strip.
    {
        at: hex(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral),
        pal: [
            [
                234,
                94,
                86
            ],
            [
                204,
                56,
                60
            ],
            [
                246,
                168,
                176
            ],
            [
                150,
                110,
                190
            ],
            [
                250,
                228,
                226
            ]
        ]
    },
    // 50: yellow-green body, deeper green block, pale green to red-orange band, pale green strip.
    {
        at: hex(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved),
        pal: [
            [
                118,
                178,
                70
            ],
            [
                64,
                136,
                72
            ],
            [
                200,
                230,
                152
            ],
            [
                232,
                98,
                60
            ],
            [
                232,
                242,
                214
            ]
        ]
    }
];
const EDGE_STYLE = "rgba(11,13,18,0.3)";
/** Colours within this RGB distance of `theme.brand` (PostFinance yellow) get a teal edge, so yellow reads on white. */ const BRAND_REACH = 70;
const BRAND = [
    parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].brand.slice(1, 3), 16),
    parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].brand.slice(3, 5), 16),
    parseInt(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].brand.slice(5, 7), 16)
];
const mixTo = (a, b, t, out)=>{
    out[0] = a[0] + (b[0] - a[0]) * t;
    out[1] = a[1] + (b[1] - a[1]) * t;
    out[2] = a[2] + (b[2] - a[2]) * t;
    return out;
};
const css = (c)=>`rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
const WHITE = [
    255,
    255,
    255
];
const BLACK = [
    0,
    0,
    0
];
/** One note sprite: block colours blended from the nearby notes' palettes, the rest the unit's own colour tinted. */ function paintNote(r, g, b, small) {
    const W = small ? SMALL_W : SPRITE_W;
    const H = W / 2;
    const cv = document.createElement("canvas");
    cv.width = W;
    cv.height = H;
    const x = cv.getContext("2d");
    if (!x) return cv;
    const c = [
        r,
        g,
        b
    ];
    const w = NOTES.map((n)=>Math.max(0, 1 - Math.sqrt((r - n.at[0]) ** 2 + (g - n.at[1]) ** 2 + (b - n.at[2]) ** 2) / REACH));
    const sum = w.reduce((a, v)=>a + v, 0);
    if (sum > 1) for(let i = 0; i < w.length; i++)w[i] /= sum;
    const own = Math.max(0, 1 - sum);
    /** Colour of block `k`: the tinted fallback weighted by `own`, plus each palette by its weight. */ const col = (tint, k)=>{
        const o = [
            tint[0] * own,
            tint[1] * own,
            tint[2] * own
        ];
        for(let i = 0; i < NOTES.length; i++){
            const pc = NOTES[i].pal[k];
            o[0] += pc[0] * w[i];
            o[1] += pc[1] * w[i];
            o[2] += pc[2] * w[i];
        }
        return css(o);
    };
    const t = [
        0,
        0,
        0
    ];
    const db = Math.sqrt((r - BRAND[0]) ** 2 + (g - BRAND[1]) ** 2 + (b - BRAND[2]) ** 2);
    const q = Math.max(0, Math.min(1, 1 - db / BRAND_REACH));
    /** Teal (#004B5A) outline fading in near brand yellow; on the small sprite it is the only edge. */ const brandEdge = (w)=>{
        if (q <= 0) return;
        x.strokeStyle = `rgba(0,75,90,${(0.5 * q).toFixed(3)})`;
        x.lineWidth = w;
        x.strokeRect(w / 2, w / 2, W - w, H - w);
    };
    const block = (fill, x0, y0, x1, y1)=>{
        x.fillStyle = fill;
        x.fillRect(x0 * W, y0 * H, (x1 - x0) * W, (y1 - y0) * H);
    };
    block(col(c, 0), 0, 0, 1, 1);
    if (small) {
        block(col(mixTo(c, WHITE, 0.4, t), 2), 0.34, 0.56, 0.78, 0.9);
        brandEdge(1);
        return cv;
    }
    block(col(mixTo(c, BLACK, 0.2, t), 1), 0, 0.56, 0.31, 1);
    const band = x.createLinearGradient(0.34 * W, 0, 0.78 * W, 0);
    band.addColorStop(0, col(mixTo(c, WHITE, 0.45, t), 2));
    band.addColorStop(1, col(mixTo(c, WHITE, 0.25, t), 3));
    x.fillStyle = band;
    x.fillRect(0.34 * W, 0.56 * H, 0.44 * W, 0.34 * H);
    block(col(mixTo(c, WHITE, 0.72, t), 4), 0.79, 0, 1, 1);
    x.strokeStyle = EDGE_STYLE;
    x.lineWidth = 1;
    x.strokeRect(0.5, 0.5, W - 1, H - 1);
    brandEdge(2);
    return cv;
}
/** Rectangles are symmetric under a half turn: shortest angle difference modulo pi. */ const wrapHalf = (d)=>((d + HALF_PI) % Math.PI + Math.PI) % Math.PI - HALF_PI;
function seed(id, salt) {
    let h = Math.imul(id + 0x9e3779b9, 0x85ebca6b) ^ Math.imul(salt + 0x165667b1, 0xc2b2ae35);
    h ^= h >>> 15;
    h = Math.imul(h, 0x2c1b3c6d);
    h ^= h >>> 12;
    return (h >>> 0) / 4294967296;
}
class NoteRenderer {
    /** Rest-angle spread the current scene asks for (radians); the drawn spread eases towards it. */ scatterTo = 0.3;
    scatter = 0.3;
    size = 0;
    rest = new Float32Array(0);
    phase = new Float32Array(0);
    freq = new Float32Array(0);
    rot = new Float32Array(0);
    lx = new Float32Array(0);
    ly = new Float32Array(0);
    vx = new Float32Array(0);
    vy = new Float32Array(0);
    seen = new Int32Array(0);
    frame = 1;
    now = 0;
    dt = 16;
    dpr = 1;
    reduced = false;
    sprites = new Map();
    made = 0;
    ensure(n) {
        if (n <= this.size) return;
        this.size = n;
        this.rest = new Float32Array(n);
        this.phase = new Float32Array(n);
        this.freq = new Float32Array(n);
        this.rot = new Float32Array(n);
        this.lx = new Float32Array(n);
        this.ly = new Float32Array(n);
        this.vx = new Float32Array(n);
        this.vy = new Float32Array(n);
        this.seen = new Int32Array(n);
        for(let i = 0; i < n; i++){
            this.rest[i] = seed(i, 1) * 2 - 1;
            this.phase[i] = seed(i, 2) * TAU;
            this.freq[i] = 0.8 + 0.4 * seed(i, 3);
        }
    }
    /** Once per frame, before the grains are drawn. */ begin(ctx, count, now, dt, dpr, reduced) {
        this.ensure(count);
        this.frame++;
        this.now = now;
        this.dt = Math.max(1, dt);
        this.dpr = dpr;
        this.reduced = reduced;
        this.scatter += (this.scatterTo - this.scatter) * (1 - Math.exp(-this.dt / 600));
        this.made = 0;
        ctx.imageSmoothingEnabled = true;
    }
    /** Cached sprite for colour `c` (quantised to 5 bits per channel); null when this frame's budget is spent. */ sprite(c, small) {
        const r = Math.max(0, Math.min(255, c[0])) >> 3;
        const g = Math.max(0, Math.min(255, c[1])) >> 3;
        const b = Math.max(0, Math.min(255, c[2])) >> 3;
        const key = (r << 10 | g << 5 | b) * 2 + (small ? 1 : 0);
        const hit = this.sprites.get(key);
        if (hit) return hit;
        if (this.made >= NEW_PER_FRAME || typeof document === "undefined") return null;
        this.made++;
        if (this.sprites.size >= MAX_SPRITES) this.sprites.clear();
        const img = paintNote((r << 3) + 4, (g << 3) + 4, (b << 3) + 4, small);
        this.sprites.set(key, img);
        return img;
    }
    /** On-screen half-width of grain `g` drawn with radius `r` (screen px); below MIN_HALF_WIDTH it stays a dot. */ halfWidth(g, r) {
        const hw = r * WIDTH_PER_R;
        if (g.motion?.kind === "flow" && hw > 1) return Math.max(hw, STREAM_HALF_WIDTH);
        return hw >= RAISE_FROM && hw < MIN_HALF_WIDTH ? MIN_HALF_WIDTH : hw;
    }
    /** Draws one note centred at screen point (x, y). Leaves a rotated transform behind: the caller resets it. */ draw(ctx, g, x, y, hw, alpha, zoom) {
        const id = g.id;
        const now = this.now;
        const dt = this.dt;
        const rest = this.rest[id] * this.scatter;
        // Velocity from the engine's own positions (world units / ms), reset when the note was not drawn last frame.
        if (this.seen[id] !== this.frame - 1) {
            this.lx[id] = g.x;
            this.ly[id] = g.y;
            this.vx[id] = 0;
            this.vy[id] = 0;
            this.rot[id] = rest;
        }
        this.seen[id] = this.frame;
        const kv = 1 - Math.exp(-dt / 90);
        this.vx[id] += ((g.x - this.lx[id]) / dt - this.vx[id]) * kv;
        this.vy[id] += ((g.y - this.ly[id]) / dt - this.vy[id]) * kv;
        this.lx[id] = g.x;
        this.ly[id] = g.y;
        let target = rest;
        let flutter = 0;
        let settle = 260;
        if (!this.reduced) {
            const m = g.motion;
            if (g.moving && now > g.t0) {
                const p = (now - g.t0) / g.dur;
                if (p < 1) {
                    const vx = this.vx[id];
                    const vy = this.vy[id];
                    const speed = Math.sqrt(vx * vx + vy * vy) * zoom; // screen px per ms
                    const w = Math.min(1, speed / 0.35) * 0.6;
                    if (w > 0.01) target = rest + wrapHalf(Math.atan2(vy, vx) - rest) * w;
                    flutter = Math.sin(Math.PI * p);
                    settle = 120;
                }
            } else if (m?.kind === "orbit" || m?.kind === "wander") {
                target = rest + 0.12 * Math.sin(now * 0.0005 + this.phase[id]);
            } else if (m?.kind === "flow") {
                // Same swing as the engine's flow path: x = m.x + sin(y * 0.035 + offset) * spread. Tilt with its slope.
                const slope = Math.cos(g.y * 0.035 + m.offset) * 0.035 * m.spread;
                target = rest * 0.4 + Math.max(-0.5, Math.min(0.5, slope * 2.6));
                flutter = 0.45;
            }
        }
        const rot = this.rot[id] += wrapHalf(target - this.rot[id]) * (1 - Math.exp(-dt / settle));
        let angle = rot;
        let fy = 1;
        if (flutter > 0.001) {
            const ph = now * 0.0072 * this.freq[id] + this.phase[id];
            fy = 1 - flutter * 0.62 * (1 - Math.abs(Math.cos(ph)));
            angle += flutter * 0.16 * Math.sin(ph * 0.5 + 1.3);
            alpha *= 0.82 + 0.18 * fy;
        }
        const hh = hw * ASPECT;
        const c = Math.cos(angle) * this.dpr;
        const s = Math.sin(angle) * this.dpr;
        ctx.globalAlpha = alpha;
        ctx.setTransform(c, s, -s * fy, c * fy, x * this.dpr, y * this.dpr);
        const img = this.sprite(g.color, hw < DETAIL_FROM);
        if (img) ctx.drawImage(img, -hw, -hh, hw * 2, hh * 2);
        else ctx.fillRect(-hw, -hh, hw * 2, hh * 2);
    }
}
function wantsNotes() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return new URLSearchParams(window.location.search).get("units") !== "dots";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/scenes/base.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MONTHS",
    ()=>MONTHS,
    "SETTLE_MS",
    ()=>SETTLE_MS,
    "Scene",
    ()=>Scene,
    "drawGhost",
    ()=>drawGhost,
    "ghostFor",
    ()=>ghostFor,
    "timing",
    ()=>timing,
    "toMonth",
    ()=>toMonth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/choreo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/layout.ts [app-client] (ecmascript)");
;
;
;
;
;
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
function toMonth(target) {
    if (typeof target === "number") return Number.isInteger(target) && target >= 1 && target <= 12 ? target : null;
    const t = target.trim().toLowerCase();
    if (/^\d{1,2}$/.test(t)) return toMonth(Number(t));
    if (t.length < 3) return null;
    const i = MONTHS.findIndex((m)=>m.toLowerCase().startsWith(t) || t === m.toLowerCase());
    return i >= 0 ? i + 1 : null;
}
function timing(kind, g, index = 0, count = 1) {
    if (kind === "resize") return {
        dur: 420,
        delay: 0,
        bend: 0.05
    };
    if (kind === "enter") return {
        dur: 1000 + 550 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 11),
        delay: 420 * (index / Math.max(1, count)) + 140 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 12)
    };
    return {
        dur: 1000 + 420 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 13),
        delay: 280 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 14)
    };
}
const SETTLE_MS = {
    enter: 1500,
    update: 1250,
    resize: 0
};
class Scene {
    env;
    focusKey;
    labelsAt;
    /** When the last state change lands (labels that depend on focus or breakdown fade in after it). */ changedAt;
    enteredAt;
    /** How grains arrive on `enter` (set by the world from the scene pair). */ entrance;
    /** Current focus look (set by the world on every new focus). */ focusStyle;
    /** A new focus just happened: play its one-shot effects (ripple, carry) on the next layout. */ focusFx;
    constructor(env){
        this.env = env;
        this.focusKey = null;
        this.labelsAt = 0;
        this.changedAt = 0;
        this.enteredAt = 0;
        this.entrance = null;
        this.focusStyle = "zoom";
        this.focusFx = false;
    }
    get engine() {
        return this.env.engine;
    }
    apply(kind) {
        const now = performance.now();
        const enterMs = this.entrance ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SETTLE"][this.entrance.name] : SETTLE_MS.enter;
        const settle = now + (this.engine.reduced ? 300 : kind === "enter" ? enterMs : SETTLE_MS.update);
        if (kind === "enter") {
            this.labelsAt = settle;
            this.enteredAt = now;
            if (this.entrance?.name === "rewind") this.engine.breathe(0.07, 1300);
        }
        if (kind !== "resize") this.changedAt = settle;
        // Focus overlays are re-declared by focusCamera() during layout; anything not re-declared fades out.
        this.engine.spot.aTo = 0;
        this.layout(kind);
        this.focusFx = false;
    }
    /** Entrance choreography on `enter`, the calm default otherwise. */ flight(kind, g, slot, index = 0, count = 1) {
        if (kind === "enter" && this.entrance) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["entranceTiming"])(this.entrance, g, slot, this.engine);
        return timing(kind, g, index, count);
    }
    /** Dim and lift for a focused (hit) or other grain; null when nothing is focused. */ focal(hit) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["focal"])(this.focusStyle, hit);
    }
    /**
   * Frame the focused item in the current look; on a new focus also play its one-shot effect and carry sparks.
   * `fx` = where the effect sits when it differs from the framed box (a segment inside a framed column).
   */ focusCamera(box, opts = {}, color = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].paper, carry = true, fx = box) {
        const e = this.engine;
        const style = this.focusStyle;
        e.frame(box, {
            ...opts,
            soften: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUS_SOFTEN"][style]
        });
        const x = fx.x + fx.w / 2;
        const y = fx.y + fx.h / 2;
        const R = Math.max(fx.w, fx.h) / 2;
        if (style === "spotlight") {
            e.spot.x = x;
            e.spot.y = y;
            e.spot.r = R * 0.9 + 6;
            e.spot.aTo = 1;
        }
        if (!this.focusFx) return;
        if (style === "ripple") e.startRipple(x, y, R);
        if (carry) e.carry(x, y, R, color);
    }
    /** Label i of n fades in as its grains arrive (follows the entrance order). */ labelAt(now, i, n) {
        return this.labelAlpha(now, (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["labelStagger"])(this.entrance, i, n));
    }
    /** Returns false (no-op) for an unknown target. */ setFocus(target) {
        const key = this.resolve(target);
        if (key === null) return false;
        this.focusKey = key;
        return true;
    }
    clearFocus() {
        this.focusKey = null;
    }
    setBreakdown(_b) {
        return false;
    }
    clearBreakdown() {
        return false;
    }
    setGhost(_target) {
        return false;
    }
    fillJar(_jar) {
        return false;
    }
    /** Month whose column is broken down (monthly only). */ openMonth() {
        return null;
    }
    /** Scene labels (month names, category names): fade in once after the grains first arrive. */ labelAlpha(now, delay = 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((now - this.labelsAt - delay) / 450, 0, 1);
    }
    /** Labels that depend on focus or breakdown: fade in after the latest change lands. */ changeAlpha(now, delay = 0) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((now - this.changedAt - delay) / 450, 0, 1);
    }
    /** Grains this scene does not use fade out where they are; the next scene picks them up from there. */ park(grains) {
        for (const g of grains)this.engine.place(g, {
            x: g.x,
            y: g.y,
            alpha: 0,
            dim: 1
        }, {
            dur: 700,
            delay: 120 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 15)
        });
    }
}
function drawGhost(engine, ctx, x, y, n, c, age, text, fade = 1) {
    if (fade < 0.01 || age < 0) return;
    if (engine.reduced) age += 2000;
    const outer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clusterRadius"])(n, c) + c * 0.9;
    const iris = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(age / 1100, 0, 1);
    const alpha = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((age - 450) / 650, 0, 1) * fade;
    engine.inWorld(ctx, (unit)=>{
        ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral;
        ctx.lineWidth = unit;
        if (iris < 1) {
            ctx.globalAlpha = 0.85 * Math.pow(1 - iris, 1.3) * Math.min(1, iris * 8) * fade;
            ctx.setLineDash([
                4 * unit,
                4 * unit
            ]);
            ctx.lineDashOffset = -age * 0.01 * unit;
            ctx.beginPath();
            ctx.arc(x, y, outer * (0.1 + 1.5 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeOutCubic"])(iris)), 0, Math.PI * 2);
            ctx.stroke();
            ctx.lineDashOffset = 0;
        }
        if (alpha < 0.01) {
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
            return;
        }
        ctx.globalAlpha = alpha;
        ctx.setLineDash([
            3 * unit,
            3 * unit
        ]);
        ctx.beginPath();
        ctx.arc(x, y, outer, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        for(let k = 0; k < n; k++){
            const ring = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((age - 650 - k * 45) / 300, 0, 1) * fade;
            if (ring < 0.01) break;
            ctx.globalAlpha = ring * 0.75;
            const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["phyllotaxis"])(k, c, x, y);
            ctx.beginPath();
            ctx.arc(p.x, p.y, c * 0.36, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    });
    engine.label(ctx, text, x, y - outer, {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral,
        alpha,
        dy: -5,
        size: 11
    });
}
function ghostFor(facts, month) {
    const gap = facts.gaps?.find((g)=>g.month === month && g.usual_amount);
    const usual = gap?.usual_amount ?? 1000;
    return {
        n: Math.max(1, Math.round(usual / 100)),
        text: `usually ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(usual)}?`
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/scenes/galaxy.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GalaxyScene",
    ()=>GalaxyScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$logo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/logo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/base.ts [app-client] (ecmascript)");
;
;
;
/** Room (in sunflower spacings) each note keeps from the mark's edge and gap; it wanders within most of it. */ const ROOM = 0.7;
const WANDER = 0.6;
class GalaxyScene extends __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    type = "galaxy";
    order = [];
    targets() {
        return [];
    }
    resolve() {
        return null;
    }
    layout(kind) {
        const e = this.engine;
        const n = Math.min(e.grains.length, Math.round(this.env.facts.yearly_income_incl_13th_salary / 100));
        const cx = e.width / 2;
        const cy = e.height / 2;
        const min = Math.min(e.width, e.height);
        // Unit size of the mark: about as tall as the old disc was wide.
        const S = min * 0.46;
        // Note size as before (the disc's spacing).
        const r = min * 0.44 / Math.sqrt(n + 0.5) * 0.42;
        const { points, c } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$logo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoPoints"])(n, ROOM);
        const slots = points.map((p)=>({
                x: cx + p.x * S,
                y: cy + p.y * S
            }));
        if (kind === "enter" || this.order.length === 0) {
            // Already standing in this mark (idle screen → Start): every note keeps its slot, so nothing moves.
            // Otherwise grains nearest the centre take the inner slots (points come centre first): no crossing paths.
            this.order = this.kept(slots) ?? e.grains.map((g)=>g.id).sort((a, b)=>{
                const ga = e.grains[a];
                const gb = e.grains[b];
                return Math.hypot(ga.x - cx, ga.y - cy) - Math.hypot(gb.x - cx, gb.y - cy) || a - b;
            });
            this.park(this.order.slice(n).map((id)=>e.grains[id]));
        }
        const amp = c * S * WANDER;
        this.order.slice(0, n).forEach((id, k)=>{
            const g = e.grains[id];
            const { x, y } = slots[k];
            const motion = {
                kind: "wander",
                x,
                y,
                amp,
                phase: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 21) * Math.PI * 2,
                // Calm: one slow loop every 9-16 s; held still under reduced motion.
                speed: e.speed(0.4 + 0.3 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 22)),
                since: 0
            };
            this.engine.place(g, {
                x,
                y,
                color: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].brand,
                alpha: 0.82 + 0.18 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 20),
                r,
                dim: 1,
                motion
            }, this.flight(kind, g, {
                order: k / n,
                group: 0,
                groups: 1,
                x,
                y,
                cx,
                cy
            }, k, n));
        });
        e.home();
    }
    /** Grain order when every slot is already held by a note wandering there; null otherwise. */ kept(slots) {
        const key = (x, y)=>`${x.toFixed(1)},${y.toFixed(1)}`;
        const index = new Map(slots.map((p, k)=>[
                key(p.x, p.y),
                k
            ]));
        const order = new Array(slots.length);
        const rest = [];
        let held = 0;
        for (const g of this.engine.grains){
            const k = g.motion?.kind === "wander" ? index.get(key(g.motion.x, g.motion.y)) : undefined;
            if (k !== undefined && order[k] === undefined) {
                order[k] = g.id;
                held++;
            } else rest.push(g.id);
        }
        return held === slots.length ? [
            ...order,
            ...rest
        ] : null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/scenes/jars.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JarsScene",
    ()=>JarsScene,
    "jarName",
    ()=>jarName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/base.ts [app-client] (ecmascript)");
;
;
;
;
;
const JARS = [
    {
        name: "3a",
        title: "Pillar 3a",
        aliases: [
            "pillar",
            "pillar 3a",
            "third pillar",
            "3rd pillar"
        ]
    },
    {
        name: "Savings",
        title: "Savings",
        aliases: [
            "saving",
            "savings account"
        ]
    }
];
const FILL = 24;
class JarsScene extends __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    type = "jars";
    jars = [];
    filledAt = new Map();
    /** Jars filled by fillJar() while this scene is on screen: they play the transformation (re-entries just show them full). */ fresh = new Set();
    /** Grains already sent through the transformation chain (left alone while it plays). */ chained = new Map();
    targets() {
        return JARS.map((j)=>j.name);
    }
    resolve(target) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pick"])(JARS, target)?.name ?? null;
    }
    fillJar(jar) {
        const name = jarName(jar);
        if (!name) return false;
        if (!this.filledAt.has(name)) {
            this.filledAt.set(name, performance.now());
            this.fresh.add(name);
        }
        return true;
    }
    layout(kind) {
        const e = this.engine;
        const { width: w, height: h } = e;
        const jw = Math.min(w * 0.2, 96);
        const jh = Math.min(h * 0.5, 150);
        const bottom = h * 0.86;
        this.jars = JARS.map((j, i)=>({
                ...j,
                x: w * (i === 0 ? 0.22 : 0.78) - jw / 2,
                y: bottom - jh,
                w: jw,
                h: jh
            }));
        const filled = JARS.filter((j)=>this.env.filled.has(j.name));
        for (const j of filled)if (!this.filledAt.has(j.name)) this.filledAt.set(j.name, performance.now());
        // Fill grains: "Left over" grains first (that is the money that could go in), then any.
        const leftover = this.env.categories.findIndex((c)=>c.saved);
        const pool = [
            ...e.grains
        ].sort((a, b)=>Number(b.category === leftover) - Number(a.category === leftover) || a.id - b.id);
        const inJar = new Map();
        filled.forEach((j, n)=>{
            const jar = this.jars.find((x)=>x.name === j.name);
            pool.slice(n * FILL, (n + 1) * FILL).forEach((g, k)=>inJar.set(g.id, {
                    jar,
                    k
                }));
        });
        const bandW = Math.min(w * 0.16, 80);
        const now = performance.now();
        const total = e.grains.length;
        // Pour: the grains highest on screen now are poured first.
        const byHeight = kind === "enter" ? new Map([
            ...e.grains
        ].sort((a, b)=>a.y - b.y || a.id - b.id).map((g, r)=>[
                g.id,
                r / total
            ])) : null;
        const look = this.focal(this.focusKey ? false : null);
        e.grains.forEach((g, i)=>{
            const slot = inJar.get(g.id);
            if (slot) {
                const { jar, k } = slot;
                const pitch = jar.w * 0.78 / 6;
                const x = jar.x + jar.w / 2 + (k % 6 - 2.5) * pitch + g.jx * pitch * 0.08;
                const y = jar.y + jar.h - pitch * 0.9 - Math.floor(k / 6) * pitch + g.jy * pitch * 0.08;
                const final = {
                    x,
                    y,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].saved,
                    alpha: 0.95,
                    r: pitch * 0.4,
                    dim: 1,
                    lift: 0
                };
                const started = this.chained.get(g.id);
                if (started !== undefined && kind !== "resize" && now - started < 5200) return; // transformation still playing
                if (this.fresh.has(jar.name) && kind === "update" && started === undefined) {
                    this.chained.set(g.id, now);
                    e.place(g, ...transformation(jar, k, pitch, final, g));
                } else e.place(g, final, {
                    dur: 1300,
                    delay: kind === "resize" ? 0 : 60 * k,
                    bend: 0.35
                });
                return;
            }
            const top = -8;
            const bottomY = h + 8;
            const motion = {
                kind: "flow",
                x: w / 2 + g.jx * bandW * 0.5,
                spread: 2 + 3 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 30),
                top,
                bottom: bottomY,
                offset: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 31) * (bottomY - top),
                speed: e.speed(9 + 8 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 32)),
                since: now
            };
            const current = g.motion?.kind === "flow" && g.motion.speed === motion.speed ? g.motion : motion;
            const span = bottomY - top;
            const y = top + ((current.offset + current.speed * ((now - current.since) / 1000)) % span + span) % span;
            const order = byHeight?.get(g.id) ?? 0;
            e.place(g, {
                x: motion.x,
                y,
                color: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].spend,
                alpha: 0.5,
                r: 1.3,
                ...look,
                motion
            }, this.flight(kind, g, {
                order,
                group: 0,
                groups: 1,
                x: motion.x,
                y
            }, i, total));
        });
        const focused = this.jars.find((j)=>j.name === this.focusKey);
        if (focused) this.focusCamera({
            x: focused.x - focused.w * 0.4,
            y: focused.y - 30,
            w: focused.w * 1.8,
            h: focused.h + 50
        }, {
            min: 1.2,
            max: 2.4
        }, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].saved);
        else e.home();
    }
    drawOver(ctx, now) {
        const e = this.engine;
        const a = this.labelAlpha(now);
        for (const jar of this.jars){
            const filledAt = this.filledAt.get(jar.name);
            const full = filledAt !== undefined && this.env.filled.has(jar.name);
            // A transformed fill lands later: the outline turns green once the grains are in.
            const fill = full ? Math.min(1, Math.max(0, now - filledAt - (this.fresh.has(jar.name) && !e.reduced ? 2900 : 0)) / 1800) : 0;
            const hit = jar.name === this.focusKey;
            const pulse = hit && !e.reduced ? 0.7 + 0.3 * Math.sin(now / 520) : 1;
            e.inWorld(ctx, (unit)=>{
                ctx.lineWidth = 1.5 * unit;
                ctx.strokeStyle = full && fill >= 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral;
                ctx.globalAlpha = (this.focusKey && !hit ? 0.45 : 0.9) * pulse * Math.max(a, 0.25);
                ctx.setLineDash(full && fill >= 1 ? [] : [
                    5 * unit,
                    4 * unit
                ]);
                jarPath(ctx, jar);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.globalAlpha = 1;
            });
            e.label(ctx, jar.title, jar.x + jar.w / 2, jar.y, {
                color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper,
                alpha: a,
                dy: -8,
                weight: hit ? 600 : 400
            });
            e.label(ctx, full ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(FILL * 100) : "empty", jar.x + jar.w / 2, jar.y + jar.h, {
                color: full ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral,
                alpha: a * (full ? fill : 0.8),
                dy: 16,
                size: 10
            });
        }
    }
}
/**
 * Dönüşüm: the fill grains first gather above the jar's mouth as coral "missing" dots, turn green one after another,
 * then drop into the jar.
 */ function transformation(jar, k, pitch, final, g) {
    const mouth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["phyllotaxis"])(k, pitch * 0.62, jar.x + jar.w / 2, jar.y - pitch * 3.2);
    const dot = {
        ...mouth,
        r: pitch * 0.36,
        alpha: 0.95,
        dim: 1,
        lift: 0
    };
    const drop = {
        dur: 900 + 200 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 71),
        delay: 20 * k,
        via: {
            x: final.x,
            y: jar.y - pitch
        },
        ease: "inOutQuad"
    };
    const green = {
        dur: 520,
        delay: 200 + 25 * k,
        bend: 0,
        ease: "inOutSine",
        then: {
            place: final,
            timing: drop
        }
    };
    const gather = {
        dur: 1000 + 200 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 72),
        delay: 25 * k,
        bend: 0.3,
        ease: "inOutSine",
        then: {
            place: {
                ...dot,
                color: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].saved,
                r: pitch * 0.48
            },
            timing: green
        }
    };
    return [
        {
            ...dot,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].coral
        },
        gather
    ];
}
/** An open-topped jar with a slight lip and rounded base. */ function jarPath(ctx, j) {
    const r = j.w * 0.28;
    const lip = j.w * 0.06;
    ctx.beginPath();
    ctx.moveTo(j.x - lip, j.y);
    ctx.quadraticCurveTo(j.x, j.y, j.x, j.y + lip * 2);
    ctx.lineTo(j.x, j.y + j.h - r);
    ctx.quadraticCurveTo(j.x, j.y + j.h, j.x + r, j.y + j.h);
    ctx.lineTo(j.x + j.w - r, j.y + j.h);
    ctx.quadraticCurveTo(j.x + j.w, j.y + j.h, j.x + j.w, j.y + j.h - r);
    ctx.lineTo(j.x + j.w, j.y + lip * 2);
    ctx.quadraticCurveTo(j.x + j.w, j.y, j.x + j.w + lip, j.y);
}
const jarName = (text)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pick"])(JARS, text)?.name ?? null;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/scenes/level.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LevelScene",
    ()=>LevelScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/base.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$monthly$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/monthly.ts [app-client] (ecmascript)");
;
;
;
;
;
;
class LevelScene extends __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    type = "level";
    columns = [];
    grid = null;
    ghosts = new Map();
    thirteenth = null;
    get values() {
        return this.env.facts.month_end_balance_vs_start_jan_dec;
    }
    get counts() {
        return this.values.map((v)=>Math.round(Math.abs(v) / 100));
    }
    /** Grains of December that are the 13th salary (the rest is what is left without it). */ get paperCount() {
        const dec = this.counts[11];
        return this.values[11] > 0 ? Math.max(0, dec - Math.max(0, Math.round(this.env.facts.without_13th_salary / 100))) : 0;
    }
    targets() {
        return [
            ...Array.from({
                length: 12
            }, (_, i)=>i + 1),
            "13"
        ];
    }
    resolve(target) {
        const t = String(target).trim().toLowerCase();
        if (t === "13" || t.includes("13th") || t.includes("thirteenth")) return "13";
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMonth"])(target);
    }
    setGhost(target) {
        const month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMonth"])(target);
        if (!month) return false;
        this.ghosts.set(month, performance.now());
        return true;
    }
    layout(kind) {
        const e = this.engine;
        const counts = this.counts;
        const up = Math.max(1, ...counts.filter((_, i)=>this.values[i] > 0).map((n)=>Math.ceil(n / 4)));
        const down = Math.max(1, ...counts.filter((_, i)=>this.values[i] < 0).map((n)=>Math.ceil(n / 4)));
        const grid = this.grid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["columnGrid"])(e.width, e.height, up, down);
        if (kind === "enter" || this.columns.length === 0) {
            const { columns, rest } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assignColumns"])(e.grains, counts);
            this.columns = columns;
            if (kind === "enter") this.park(rest);
        }
        const focus = this.focusKey;
        const out = focus === "13";
        const paper = this.paperCount;
        const green = counts[11] - paper;
        const c = grid.pitch;
        // Where the 13th salary flies to: the empty space above the line over the autumn months.
        this.thirteenth = {
            x: grid.colX(9),
            y: grid.baseY - Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clusterRadius"])(paper, c) + 8, up * grid.pitch / 2),
            c,
            n: paper
        };
        const r = grid.pitch * 0.38;
        const total = counts.reduce((a, b)=>a + b, 0);
        let index = 0;
        this.columns.forEach((column, i)=>{
            const value = this.values[i];
            const dir = value >= 0 ? 1 : -1;
            const month = i + 1;
            const look = this.focal(typeof focus === "number" ? month === focus : out ? month === 12 : null);
            column.forEach((g, k)=>{
                const isPaper = month === 12 && k >= green;
                let pos = grid.slot(i, k, dir, g);
                if (isPaper && out) pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["phyllotaxis"])(k - green, c, this.thirteenth.x, this.thirteenth.y);
                const color = isPaper ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].paper : dir > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].saved : __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].coral;
                // Time flow: January first, each column from the start-of-year line outwards.
                const slot = {
                    order: (i + 0.6 * k / Math.max(1, column.length)) / 12,
                    group: i,
                    groups: 12,
                    x: pos.x,
                    y: pos.y,
                    base: grid.baseY
                };
                e.place(g, {
                    ...pos,
                    color,
                    alpha: 0.92,
                    r,
                    ...look
                }, this.flight(kind, g, slot, index++, total));
            });
        });
        if (typeof focus === "number") {
            const n = counts[focus - 1];
            const dir = this.values[focus - 1] >= 0 ? 1 : -1;
            const box = grid.columnBox(focus - 1, n, dir);
            let framed = {
                x: box.x - grid.colW * 0.6,
                y: box.y - 18,
                w: box.w + grid.colW * 1.2,
                h: box.h + 36
            };
            if (this.ghosts.has(focus)) framed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$monthly$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["union"])(framed, this.ghostBox(grid, focus));
            this.focusCamera(framed, {
                min: 1.15,
                max: 2.6
            }, dir > 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].saved : __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].coral);
        } else if (out && this.thirteenth) {
            const dec = grid.columnBox(11, counts[11], 1);
            const R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clusterRadius"])(paper, c);
            const t = this.thirteenth;
            this.focusCamera((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$monthly$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["union"])(dec, {
                x: t.x - R,
                y: t.y - R - 18,
                w: 2 * R,
                h: 2 * R + 36
            }), {
                pad: 0.1
            }, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].paper);
        } else {
            e.home();
        }
    }
    ghostSpot(grid, month) {
        const { n, text } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ghostFor"])(this.env.facts, month);
        const c = grid.pitch;
        const R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clusterRadius"])(n, c) + c;
        const dir = this.values[month - 1] >= 0 ? 1 : -1;
        const box = grid.columnBox(month - 1, this.counts[month - 1], dir);
        const y = dir > 0 ? box.y - R - c : box.y + box.h + R + c;
        return {
            x: grid.colX(month - 1),
            y,
            R,
            n,
            c,
            text
        };
    }
    ghostBox(grid, month) {
        const s = this.ghostSpot(grid, month);
        return {
            x: s.x - s.R,
            y: s.y - s.R - 16,
            w: 2 * s.R,
            h: 2 * s.R + 16
        };
    }
    drawUnder(ctx, now) {
        const grid = this.grid;
        if (!grid) return;
        const e = this.engine;
        // On a time-flow entrance the start-of-year line is drawn left to right as the months arrive.
        const drawn = this.entrance?.name === "rise" && !e.reduced ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["easeInOutCubic"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((now - this.enteredAt) / 1500, 0, 1)) : 1;
        if (drawn <= 0) return;
        e.inWorld(ctx, (unit)=>{
            ctx.globalAlpha = 0.6;
            ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint;
            ctx.lineWidth = unit;
            ctx.beginPath();
            ctx.moveTo(grid.margin * 0.5, grid.baseY);
            ctx.lineTo(grid.margin * 0.5 + (e.width - grid.margin) * drawn, grid.baseY);
            ctx.stroke();
            ctx.globalAlpha = 1;
        });
    }
    drawOver(ctx, now) {
        const grid = this.grid;
        if (!grid) return;
        const e = this.engine;
        const a = this.labelAlpha(now);
        const focus = this.focusKey;
        const focusMonth = typeof focus === "number" ? focus : focus === "13" ? 12 : null;
        const short = grid.colW * e.cam.s < 26;
        e.label(ctx, "Start of year", grid.margin * 0.5, grid.baseY, {
            alpha: a * 0.9,
            dy: 13,
            align: "left",
            size: 10
        });
        for(let i = 0; i < 12; i++){
            const month = i + 1;
            const hit = month === focusMonth;
            const name = short ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MONTHS"][i][0] : __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MONTHS"][i].slice(0, 3);
            e.label(ctx, name, grid.colX(i), grid.labelY, {
                color: hit ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint,
                alpha: this.labelAt(now, i, 12) * (focusMonth && !hit ? 0.45 : 1),
                weight: hit ? 600 : 400
            });
        }
        if (typeof focus === "number") {
            const value = this.values[focus - 1];
            const dir = value >= 0 ? 1 : -1;
            const box = grid.columnBox(focus - 1, this.counts[focus - 1], dir);
            const y = dir > 0 ? box.y : box.y + box.h;
            e.label(ctx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(value), grid.colX(focus - 1), y, {
                color: value < 0 ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].coral : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved,
                alpha: this.changeAlpha(now, -500),
                dy: dir > 0 ? -6 : 14,
                weight: 600
            });
        }
        if (focus === "13" && this.thirteenth) {
            const t = this.thirteenth;
            const R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clusterRadius"])(t.n, t.c);
            const salary = this.values[11] - this.env.facts.without_13th_salary;
            const ta = this.changeAlpha(now);
            e.label(ctx, "13th salary", t.x, t.y + R, {
                color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper,
                alpha: ta,
                dy: 13,
                weight: 600
            });
            e.label(ctx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(salary), t.x, t.y + R, {
                alpha: ta,
                dy: 26,
                size: 10
            });
        }
        for (const [month, at] of this.ghosts){
            const s = this.ghostSpot(grid, month);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawGhost"])(e, ctx, s.x, s.y, s.n, s.c, now - at, s.text);
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/scenes/monthly.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MonthlyScene",
    ()=>MonthlyScene,
    "roundRect",
    ()=>roundRect,
    "union",
    ()=>union
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/choreo.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/segments.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/base.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
class MonthlyScene extends __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    type = "monthly";
    columns = [];
    grid = null;
    open = null;
    opened = null;
    ghosts = new Map();
    openedAt = 0;
    /** Month whose parts the last layout showed (to tell a breakdown or a collapse from other updates). */ shownOpen = null;
    /** Month whose column shows its composition (set by focusing a month, kept while one of its parts is focused). */ segMonth = null;
    shownSplit = null;
    split = null;
    splitAt = 0;
    /** Columns beside a split column ease aside to give its legend a clear lane: world x offset per column (from → to). */ shiftFrom = new Float64Array(12);
    shiftTo = new Float64Array(12);
    shiftAt = 0;
    /** Legend row baselines (screen px), reused every frame. */ rowY = new Float64Array(16);
    get counts() {
        return this.env.facts.monthly_spending_jan_dec.map((v)=>Math.max(0, Math.round(v / 100)));
    }
    /** The parts a month's column is made of (the open breakdown's when it is that month). */ partsOf(month) {
        if (this.open?.b.month === month) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderParts"])(this.open.b.parts);
        const f = this.env.facts;
        const parts = f.monthly_breakdown_parts?.[String(month)];
        if (parts?.length) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderParts"])(parts);
        const cats = f.monthly_breakdown_by_category?.[String(month)];
        return cats ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["partsFromCategories"])(cats) : [];
    }
    /** Parts the focus can name right now: the open breakdown's, else the split column's. */ namedParts() {
        if (this.open) return this.open.b.parts;
        return this.segMonth ? this.partsOf(this.segMonth) : null;
    }
    targets() {
        const months = Array.from({
            length: 12
        }, (_, i)=>i + 1);
        return [
            ...months,
            ...(this.namedParts() ?? []).map((p)=>p.name)
        ];
    }
    openMonth() {
        return this.open?.b.month ?? null;
    }
    resolve(target) {
        const parts = this.namedParts();
        if (parts) {
            const part = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pick"])(parts, target);
            if (part) return part.name;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMonth"])(target);
    }
    setFocus(target) {
        const key = this.resolve(target);
        if (key === null) return false;
        if (typeof key === "number") {
            // Focusing another month closes the open column first.
            if (this.open && this.open.b.month !== key) this.open = null;
            this.segMonth = key;
        }
        this.focusKey = key;
        return true;
    }
    clearFocus() {
        this.focusKey = null;
        this.segMonth = this.open?.b.month ?? null;
    }
    setBreakdown(b) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMonth"])(b.month) || !b.parts.length) return false;
        this.open = {
            b
        };
        this.openedAt = performance.now();
        this.segMonth = b.month;
        if (typeof this.focusKey === "string") this.focusKey = b.month;
        return true;
    }
    clearBreakdown() {
        if (!this.open) return false;
        const month = this.open.b.month;
        this.open = null;
        if (typeof this.focusKey === "string") this.focusKey = month;
        return true;
    }
    setGhost(target) {
        const month = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toMonth"])(target);
        if (!month) return false;
        this.ghosts.set(month, performance.now());
        return true;
    }
    layout(kind) {
        const e = this.engine;
        const counts = this.counts;
        const maxRows = Math.ceil(Math.max(...counts) / 4);
        const grid = this.grid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["columnGrid"])(e.width, e.height, maxRows, 0);
        if (kind === "enter" || this.columns.length === 0) {
            const { columns, rest } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["assignColumns"])(e.grains, counts);
            this.columns = columns;
            if (kind === "enter") this.park(rest);
        }
        const opened = this.opened = this.open ? this.layoutOpen(grid) : null;
        const was = this.shownOpen;
        const openingNow = kind === "update" && opened !== null && opened.month !== was;
        const closing = kind === "update" && was !== null && opened?.month !== was ? was : null;
        this.shownOpen = opened?.month ?? null;
        // The composition shows in the column while its month is focused and not opened into clusters.
        const splitMonth = opened ? null : this.segMonth;
        const split = this.split = splitMonth ? this.layoutSplit(grid, splitMonth) : null;
        const wasSplit = this.shownSplit;
        this.shownSplit = splitMonth;
        const splitting = kind === "update" && splitMonth !== null && wasSplit !== splitMonth && closing !== splitMonth;
        const unsplit = kind === "update" && wasSplit !== null && wasSplit !== splitMonth && opened?.month !== wasSplit ? wasSplit : null;
        if (splitting || split && closing === splitMonth || split && this.splitAt === 0) this.splitAt = performance.now();
        const lane = split ? this.legendLane(grid, split) : null;
        this.setShift(split && lane ? split.month : null, lane?.shift ?? 0);
        const colFocus = opened?.month ?? splitMonth;
        const focusPart = typeof this.focusKey === "string" ? this.focusKey : null;
        const r = grid.pitch * 0.38;
        const total = counts.reduce((a, b)=>a + b, 0);
        let index = 0;
        this.columns.forEach((column, i)=>{
            const month = i + 1;
            const isOpen = opened?.month === month;
            const isSplit = split?.month === month;
            const look = opened ? {
                dim: isOpen ? 1 : 0.1,
                lift: 0
            } : this.focal(colFocus ? month === colFocus : null);
            let part = 0;
            let inPart = 0;
            column.forEach((g, k)=>{
                let pos = grid.slot(i, k, 1, g);
                if (this.shiftTo[i]) pos = {
                    x: pos.x + this.shiftTo[i],
                    y: pos.y
                };
                let grainLook = look;
                let color = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].spend;
                let gr = r;
                let t = null;
                if (isOpen && opened) {
                    while(part < opened.parts.length - 1 && inPart >= opened.parts[part].count){
                        part++;
                        inPart = 0;
                    }
                    const p = opened.parts[part];
                    pos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["phyllotaxis"])(inPart, opened.c, p.x, p.y);
                    gr = opened.c * 0.4;
                    color = p.color;
                    grainLook = this.focal(focusPart ? p.name === focusPart : null);
                    // Breakdown: each segment slides out and whirls in around its part's centre, one part after another.
                    if (openingNow) t = {
                        dur: 1100 + 300 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 51),
                        delay: 150 * part + 9 * inPart,
                        spiral: {
                            x: p.x,
                            y: p.y,
                            turn: (part % 2 ? 1 : -1) * 1.2
                        },
                        ease: "inOutSine"
                    };
                    inPart++;
                } else if (isSplit && split) {
                    const at = split.pos[k];
                    const seg = split.segs[at.s];
                    pos = {
                        x: at.x + g.jx * grid.pitch * 0.09,
                        y: at.y + g.jy * grid.pitch * 0.09
                    };
                    color = seg.color;
                    if (focusPart) grainLook = this.focal(seg.name === focusPart);
                    // The bar shows what it is made of: segment by segment, bottom up, each swaying out to one side and back.
                    if (splitting) {
                        const side = at.s % 2 ? 1 : -1;
                        t = {
                            dur: 850 + 220 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 53),
                            delay: 170 * at.s + 12 * Math.floor(k / 4),
                            via: {
                                x: pos.x + side * grid.pitch * 2.4,
                                y: (g.y + pos.y) / 2
                            },
                            ease: "inOutSine"
                        };
                    }
                }
                if (!t && closing === month) {
                    // Collapse: a short rewind back into the column (still coloured while the month is focused), top rows first.
                    t = {
                        dur: 760 + 200 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 52),
                        delay: 320 * (1 - k / Math.max(1, column.length)),
                        bend: 0.05,
                        ease: "outCubic"
                    };
                } else if (!t && unsplit === month) {
                    // Back to plain amber: top rows first, a gentle settle.
                    t = {
                        dur: 800 + 160 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["noise"])(g.id, 54),
                        delay: 280 * (1 - k / Math.max(1, column.length)),
                        bend: 0.06,
                        ease: "inOutCubic"
                    };
                }
                const slot = {
                    order: (i + k / Math.max(1, column.length)) / 12,
                    group: i,
                    groups: 12,
                    x: pos.x,
                    y: pos.y,
                    base: grid.baseY
                };
                e.place(g, {
                    ...pos,
                    color,
                    alpha: 0.92,
                    r: gr,
                    ...grainLook
                }, t ?? this.flight(kind, g, slot, index, total));
                index++;
            });
        });
        // camera
        if (opened) {
            const focused = focusPart ? opened.parts.find((p)=>p.name === focusPart) : null;
            if (focused) {
                const span = focused.r * 2.6 + 30;
                this.focusCamera({
                    x: focused.x - span / 2,
                    y: focused.y - span / 2,
                    w: span,
                    h: span + 14
                }, {
                    max: 2.6,
                    min: 1.2
                }, focused.color);
            } else {
                // Frame the part clusters with their labels; the emptied column is only an outline now.
                const xs = opened.parts.flatMap((p)=>[
                        p.x - p.r,
                        p.x + p.r
                    ]);
                const ys = opened.parts.flatMap((p)=>[
                        p.y - p.r,
                        p.y + p.r + 20
                    ]);
                const box = {
                    x: Math.min(...xs),
                    y: Math.min(...ys),
                    w: Math.max(...xs) - Math.min(...xs),
                    h: Math.max(...ys) - Math.min(...ys)
                };
                e.frame(box, {
                    pad: 0.14,
                    max: 2.6
                });
            }
        } else if (split) {
            const m = split.month;
            const col = {
                x: grid.colX(m - 1) - 2 * grid.pitch,
                y: split.top,
                w: 4 * grid.pitch,
                h: grid.baseY - split.top
            };
            const box = this.splitBox(grid, split, lane.w);
            const seg = focusPart ? split.segs.find((sg)=>sg.name === focusPart) : null;
            this.focusCamera(box, {
                min: this.splitMin(box),
                max: 2.6,
                pad: 0.1
            }, seg?.color ?? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].spend, true, seg?.box ?? col);
        } else {
            e.home();
        }
    }
    /** Camera box for a split column with a legend lane `legend` wide (world) on its open side (left for July-December). */ splitBox(grid, split, legend) {
        const m = split.month;
        const x = grid.colX(m - 1);
        const half = 2 * grid.pitch;
        const side = Math.max(grid.colW * 0.5, legend + grid.pitch * 0.4);
        const far = grid.colW * 0.5;
        const left = m >= 7;
        let box = {
            x: x - half - (left ? side : far),
            y: split.top - 16,
            w: 2 * half + side + far,
            h: grid.baseY - split.top + 34
        };
        if (this.ghosts.has(m)) box = union(box, this.ghostBox(grid, m));
        return box;
    }
    /**
   * The legend's lane beside a split column: its width in world units at the zoom the camera settles at (the user's
   * hand zoom only zooms in, so the lane never gets tighter), and how far the columns on that side ease aside to clear it.
   */ legendLane(grid, split) {
        const e = this.engine;
        let chars = 5;
        for (const sg of split.segs)if (sg.count > 0) chars = Math.max(chars, sg.name.length, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(sg.value).length);
        // Dot, gaps and text (11px Inter, about 6.4px a character), plus a clear margin before the next notes.
        const px = 16 + chars * 6.4 + 12;
        const reach = grid.pitch * 0.7; // from the column's edge to the dot
        const soften = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUS_SOFTEN"][this.focusStyle];
        let w = grid.colW * 2.4;
        let s = 1;
        for(let it = 0; it < 3; it++){
            const box = this.splitBox(grid, split, w);
            const fit = Math.min(e.width * 0.9 / Math.max(box.w, 1), e.height * 0.9 / Math.max(box.h, 1));
            // frame() clamps to 1.15-2.6, the focus style softens it, a camera breath pulls back up to 7%.
            s = (1 + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(fit, this.splitMin(box), 2.6) - 1) * soften) * 0.93;
            w = reach + px / s;
        }
        // The next column's notes reach about 2 pitches out from its centre.
        const shift = Math.max(0, 2 * grid.pitch + w + 2 * grid.pitch - grid.colW);
        return {
            w,
            shift
        };
    }
    /** Least zoom for a split column: 1.15, or less when the column with its total would not fit the stage's height. */ splitMin(box) {
        const fitH = this.engine.height * 0.9 / Math.max(box.h, 1);
        if (fitH >= 1.15) return 1.15;
        // The focus style softens the zoom towards 1 (1 + (z - 1) * soften), so below 1 aim lower to still land at fitH.
        return fitH >= 1 ? fitH : 1 + (fitH - 1) / __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$choreo$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FOCUS_SOFTEN"][this.focusStyle];
    }
    /** Ease the columns on the legend side of `month` aside by `shift` (or all back home for null). */ setShift(month, shift) {
        const now = performance.now();
        let changed = false;
        for(let i = 0; i < 12; i++){
            const to = month === null ? 0 : month >= 7 ? i < month - 1 ? -shift : 0 : i > month - 1 ? shift : 0;
            if (Math.abs(to - this.shiftTo[i]) > 0.01) changed = true;
        }
        if (!changed) return;
        for(let i = 0; i < 12; i++){
            this.shiftFrom[i] = this.shiftShown(i, now);
            this.shiftTo[i] = month === null ? 0 : month >= 7 ? i < month - 1 ? -shift : 0 : i > month - 1 ? shift : 0;
        }
        this.shiftAt = now;
    }
    /** Current offset of column i, eased like the grains' own calm update flight. */ shiftShown(i, now) {
        const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((now - this.shiftAt - 140) / 1200, 0, 1);
        const k = 0.5 - 0.5 * Math.cos(Math.PI * t);
        return this.shiftFrom[i] + (this.shiftTo[i] - this.shiftFrom[i]) * k;
    }
    /** Segment slots for a focused column: each part starts on a fresh row, a small gap between parts. */ layoutSplit(grid, month) {
        const n = this.columns[month - 1]?.length ?? 0;
        const segs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["segment"])(this.partsOf(month), n);
        const pitch = grid.pitch;
        const gapW = pitch * 0.55;
        const rows = segs.reduce((a, sg)=>a + Math.ceil(sg.count / 4), 0);
        const room = grid.baseY - grid.top - 2;
        // Squeeze rows a little when the extra part rows and gaps would not fit under the top.
        const vp = Math.max(pitch * 0.6, Math.min(pitch, (room - gapW * Math.max(0, segs.length - 1)) / Math.max(1, rows)));
        const x0 = grid.colX(month - 1);
        const pos = [];
        let before = 0;
        let top = grid.baseY;
        const out = segs.map((sg, s)=>{
            const segRows = Math.ceil(sg.count / 4);
            const lift = s * gapW;
            for(let j = 0; j < sg.count; j++){
                const row = Math.floor(j / 4);
                const inRow = row === segRows - 1 ? sg.count - row * 4 : 4;
                pos.push({
                    x: x0 + (j % 4 - (inRow - 1) / 2) * pitch,
                    y: grid.baseY - (before + row + 0.5) * vp - lift,
                    s
                });
            }
            const bottom = grid.baseY - before * vp - lift;
            before += segRows;
            const segTop = grid.baseY - before * vp - lift;
            if (sg.count > 0) top = Math.min(top, segTop);
            return {
                ...sg,
                box: {
                    x: x0 - 2 * pitch,
                    y: segTop,
                    w: 4 * pitch,
                    h: Math.max(bottom - segTop, pitch)
                }
            };
        });
        return {
            month,
            segs: out,
            pos,
            top
        };
    }
    layoutOpen(grid) {
        const e = this.engine;
        const b = this.open.b;
        const month = b.month;
        const n = this.counts[month - 1];
        // Same parts, order and counts as the split column, so each segment slides out whole.
        const segs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["segment"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["orderParts"])(b.parts), n);
        const x = grid.colX(month - 1);
        const width = Math.min(e.width * 0.46, grid.colW * 6);
        const gap = grid.colW * 0.8;
        const left = month >= 7;
        const rx = Math.max(grid.margin, Math.min(e.width - grid.margin - width, left ? x - gap - width : x + gap));
        const region = {
            x: rx,
            y: grid.top + 4,
            w: width,
            h: grid.baseY - grid.top - 16
        };
        const packed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["packClusters"])(segs.map((sg)=>sg.count), region, {
            cMax: grid.pitch * 1.1,
            cMin: grid.pitch * 0.45,
            labelGap: 24
        });
        return {
            month,
            region,
            c: packed.c,
            parts: segs.map((p, i)=>({
                    ...p,
                    x: packed.circles[i].x,
                    y: packed.circles[i].y,
                    r: packed.circles[i].r
                }))
        };
    }
    ghostBox(grid, month) {
        const { x, y, R } = this.ghostSpot(grid, month);
        return {
            x: x - R,
            y: y - R - 16,
            w: 2 * R,
            h: 2 * R + 16
        };
    }
    ghostSpot(grid, month) {
        const { n, text } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ghostFor"])(this.env.facts, month);
        const c = grid.pitch;
        const R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clusterRadius"])(n, c) + c;
        const colTop = this.split?.month === month ? this.split.top : grid.columnBox(month - 1, this.counts[month - 1], 1).y;
        const colY = Math.min(colTop, grid.columnBox(month - 1, this.counts[month - 1], 1).y);
        let x = grid.colX(month - 1);
        let y = colY - R - grid.pitch * 0.6;
        if (y - R - 14 < grid.top) {
            // No room above: sit beside the column instead (opposite the legend).
            y = Math.max(grid.top + R + 14, colY + R);
            x += (month >= 7 ? 1 : -1) * (2 * grid.pitch + R + grid.pitch);
        }
        return {
            x,
            y,
            R,
            n,
            c,
            text
        };
    }
    drawUnder(ctx, now) {
        const grid = this.grid;
        const opened = this.opened;
        if (!grid || !opened) return;
        // Dashed outline where the open column was.
        const box = grid.columnBox(opened.month - 1, this.counts[opened.month - 1], 1);
        const alpha = Math.min(1, (now - this.openedAt) / 600) * 0.8;
        this.engine.inWorld(ctx, (unit)=>{
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint;
            ctx.lineWidth = unit;
            ctx.setLineDash([
                3 * unit,
                3 * unit
            ]);
            const pad = grid.pitch * 0.3;
            roundRect(ctx, box.x - pad, box.y - pad, box.w + pad * 2, box.h + pad, grid.pitch * 0.8);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
        });
    }
    drawOver(ctx, now) {
        const grid = this.grid;
        if (!grid) return;
        const e = this.engine;
        const spending = this.env.facts.monthly_spending_jan_dec;
        const opened = this.opened;
        const split = this.split;
        const focusMonth = opened?.month ?? split?.month ?? null;
        const focusPart = typeof this.focusKey === "string" ? this.focusKey : null;
        const short = grid.colW * e.cam.s < 26;
        for(let i = 0; i < 12; i++){
            const month = i + 1;
            const hit = month === focusMonth;
            const faded = focusMonth && !hit ? 0.45 : 1;
            const name = short ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MONTHS"][i][0] : __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MONTHS"][i].slice(0, 3);
            const a = this.labelAt(now, i, 12);
            e.label(ctx, name, grid.colX(i) + this.shiftShown(i, now), grid.baseY, {
                color: hit ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint,
                alpha: a * faded,
                dy: 13,
                weight: hit ? 600 : 400
            });
        }
        if (split) {
            e.label(ctx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(spending[split.month - 1]), grid.colX(split.month - 1), split.top, {
                color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper,
                alpha: this.changeAlpha(now, -500),
                dy: -6,
                weight: 600
            });
            this.drawLegend(ctx, now, split, focusPart);
        }
        if (opened) {
            const pa = Math.min(1, Math.max(0, (now - this.openedAt - (this.engine.reduced ? 300 : 1400)) / 450));
            for (const p of opened.parts){
                const dim = focusPart && p.name !== focusPart ? 0.4 : 1;
                const strong = p.name === focusPart;
                e.label(ctx, p.name, p.x, p.y + p.r, {
                    color: strong ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].soft,
                    alpha: pa * dim,
                    dy: 12,
                    weight: strong ? 600 : 400
                });
                e.label(ctx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(p.value), p.x, p.y + p.r, {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint,
                    alpha: pa * dim,
                    dy: 25,
                    size: 10
                });
            }
        }
        for (const [month, at] of this.ghosts){
            const spot = this.ghostSpot(grid, month);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawGhost"])(e, ctx, spot.x, spot.y, spot.n, spot.c, now - at, spot.text, opened && opened.month !== month ? 0.2 : 1);
        }
    }
    /** Compact legend beside the split column: colour dot, part name, value; each fades in as its segment settles. */ drawLegend(ctx, now, split, focusPart) {
        const e = this.engine;
        const grid = this.grid;
        const v = e.view;
        const left = split.month >= 7;
        const [edge] = e.toScreen(grid.colX(split.month - 1) + (left ? -1 : 1) * 2.7 * grid.pitch, 0);
        const dotX = edge + (left ? -8 : 8);
        const textX = dotX + (left ? -8 : 8);
        const settle = e.reduced ? 300 : 650;
        const [segEdge] = e.toScreen(grid.colX(split.month - 1) + (left ? -1 : 1) * 2.1 * grid.pitch, 0);
        // Rows sit at their segment's middle; close segments push rows apart (upwards, like the segments stack), and a
        // second pass keeps the top row inside the stage. Rows are 25px tall (name + amount).
        const rows = this.rowY;
        const n = Math.min(split.segs.length, rows.length);
        let lastY = Infinity;
        for(let s = 0; s < n; s++){
            const sg = split.segs[s];
            if (sg.count === 0) continue;
            const [, mid] = e.toScreen(0, sg.box.y + sg.box.h / 2);
            rows[s] = Math.min(mid + 4, lastY - 25);
            lastY = rows[s];
        }
        let floor = 16;
        for(let s = n - 1; s >= 0; s--){
            if (split.segs[s].count === 0) continue;
            rows[s] = Math.max(rows[s], floor);
            floor = rows[s] + 25;
        }
        for(let s = 0; s < n; s++){
            const sg = split.segs[s];
            if (sg.count === 0) continue;
            const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])((now - this.splitAt - settle - 170 * s) / 420, 0, 1) * this.labelAlpha(now);
            const y = rows[s];
            if (a < 0.01) continue;
            const [, mid] = e.toScreen(0, sg.box.y + sg.box.h / 2);
            const hit = sg.name === focusPart;
            const dim = focusPart && !hit ? 0.45 : 1;
            const fill = `rgb(${sg.color[0]},${sg.color[1]},${sg.color[2]})`;
            if (Math.abs(y - 4 - mid) > 3) {
                // Leader from the segment to its displaced row.
                ctx.globalAlpha = a * dim * 0.55;
                ctx.strokeStyle = fill;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(segEdge, mid);
                ctx.lineTo(dotX + (left ? 5 : -5), y - 4);
                ctx.stroke();
            }
            ctx.globalAlpha = a * dim;
            ctx.fillStyle = fill;
            ctx.beginPath();
            ctx.arc(dotX, y - 4, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
            // Legend rows are laid out in screen space; e.label takes world coordinates.
            const wx = (textX - e.width / 2) / v.s + v.x;
            const wy = (y - e.height / 2) / v.s + v.y;
            const align = left ? "right" : "left";
            e.label(ctx, sg.name, wx, wy, {
                color: hit ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].soft,
                alpha: a * dim,
                align,
                size: 11,
                weight: hit ? 600 : 500
            });
            e.label(ctx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(sg.value), wx, wy, {
                color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint,
                alpha: a * dim,
                align,
                size: 10,
                dy: 12
            });
        }
    }
}
function union(a, b) {
    const x = Math.min(a.x, b.x);
    const y = Math.min(a.y, b.y);
    return {
        x,
        y,
        w: Math.max(a.x + a.w, b.x + b.w) - x,
        h: Math.max(a.y + a.h, b.y + b.h) - y
    };
}
function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/scenes/pools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NECESSITY_KEYS",
    ()=>NECESSITY_KEYS,
    "PoolsScene",
    ()=>PoolsScene,
    "toNecessity",
    ()=>toNecessity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/layout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/scenes/base.ts [app-client] (ecmascript)");
;
;
;
;
;
const NECESSITY_KEYS = [
    "Fixed",
    "Adjustable",
    "Flexible"
];
function toNecessity(target) {
    if (typeof target !== "string") return null;
    const t = target.trim().toLowerCase();
    return NECESSITY_KEYS.find((k)=>t === k.toLowerCase() || t === `${k.toLowerCase()} costs`) ?? null;
}
/** Gathering of the lit groups toward their common centre (fraction of the distance). */ const GATHER = 0.14;
class PoolsScene extends __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$scenes$2f$base$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"] {
    type = "pools";
    pools = [];
    necessity = null;
    lit = null;
    /** Set by the world once /api/facts has loaded; without it the necessity targets are unknown. */ setNecessityData(data) {
        this.necessity = data;
    }
    targets() {
        return [
            ...this.env.categories.map((c)=>c.name),
            ...this.necessity ? NECESSITY_KEYS : []
        ];
    }
    resolve(target) {
        const necessity = toNecessity(target);
        if (necessity) return this.necessity ? necessity : null;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pick"])(this.env.categories, target)?.name ?? null;
    }
    /** True when the pool is lit by the current focus (its group, or every group of the focused necessity). */ isHit(pool) {
        const key = this.focusKey;
        if (key === null) return false;
        const necessity = toNecessity(key);
        return necessity ? this.necessity?.groups[pool.name] === necessity : pool.name === key;
    }
    layout(kind) {
        const e = this.engine;
        const cats = this.env.categories;
        const byCat = cats.map(()=>[]);
        for (const g of e.grains)byCat[g.category]?.push(g);
        const margin = 10;
        const region = {
            x: margin,
            y: margin,
            w: e.width - margin * 2,
            h: e.height - margin * 2
        };
        const short = Math.min(e.width, e.height);
        const packed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["packClusters"])(byCat.map((list)=>list.length), region, {
            cMax: short * 0.03,
            cMin: short * 0.012,
            labelGap: 16
        });
        const c = packed.c;
        this.pools = cats.map((cat, i)=>({
                name: cat.name,
                value: cat.value,
                saved: cat.saved,
                grains: byCat[i],
                ...packed.circles[i]
            }));
        const total = e.grains.length;
        let index = 0;
        const groups = this.pools.length;
        // A necessity focus: the lit groups gather slightly toward each other.
        this.lit = null;
        const lit = this.focusKey !== null && toNecessity(this.focusKey) ? this.pools.filter((p)=>this.isHit(p)) : [];
        if (lit.length) {
            const mx = lit.reduce((sum, p)=>sum + p.x, 0) / lit.length;
            const my = lit.reduce((sum, p)=>sum + p.y, 0) / lit.length;
            for (const p of lit){
                p.x += (mx - p.x) * GATHER;
                p.y += (my - p.y) * GATHER;
            }
            const x0 = Math.min(...lit.map((p)=>p.x - p.r));
            const y0 = Math.min(...lit.map((p)=>p.y - p.r));
            this.lit = {
                x: x0,
                y: y0,
                w: Math.max(...lit.map((p)=>p.x + p.r)) - x0,
                h: Math.max(...lit.map((p)=>p.y + p.r)) - y0
            };
        }
        this.pools.forEach((pool, gi)=>{
            const look = this.focal(this.focusKey !== null ? this.isHit(pool) : null);
            // Nearest grains take the inner positions of their cluster (stable on update/resize: same order).
            if (kind === "enter") pool.grains.sort((a, b)=>Math.hypot(a.x - pool.x, a.y - pool.y) - Math.hypot(b.x - pool.x, b.y - pool.y) || a.id - b.id);
            else pool.grains.sort((a, b)=>(this.rank.get(a.id) ?? 0) - (this.rank.get(b.id) ?? 0));
            const n = pool.grains.length;
            pool.grains.forEach((g, k)=>{
                this.rank.set(g.id, k);
                const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["phyllotaxis"])(k, c, pool.x, pool.y);
                const slot = {
                    order: (gi + k / Math.max(1, n)) / groups,
                    group: gi,
                    groups,
                    x: p.x,
                    y: p.y,
                    cx: pool.x,
                    cy: pool.y
                };
                e.place(g, {
                    ...p,
                    color: pool.saved ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].saved : __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].spend,
                    alpha: 0.9,
                    r: c * 0.4,
                    ...look
                }, this.flight(kind, g, slot, index++, total));
            });
        });
        const focused = this.pools.find((p)=>p.name === this.focusKey);
        if (this.lit) {
            const box = {
                x: this.lit.x - 12,
                y: this.lit.y - 28,
                w: this.lit.w + 24,
                h: this.lit.h + 52
            };
            this.focusCamera(box, {
                min: 1,
                max: 1.8
            }, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].spend);
        } else if (focused) {
            const span = focused.r * 2.4 + 24;
            this.focusCamera({
                x: focused.x - span / 2,
                y: focused.y - span / 2,
                w: span,
                h: span + 20
            }, {
                min: 1.2,
                max: 2.6
            }, focused.saved ? __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].saved : __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].spend);
        } else e.home();
    }
    rank = new Map();
    drawOver(ctx, now) {
        const e = this.engine;
        this.pools.forEach((p, i)=>{
            const a = this.labelAt(now, i, this.pools.length);
            const hit = this.isHit(p);
            if (!hit && p.grains.length < 10) return;
            const dim = this.focusKey !== null && !hit ? 0.4 : 1;
            e.label(ctx, p.name, p.x, p.y + p.r, {
                color: hit ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper : p.saved ? __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].saved : __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].soft,
                alpha: a * dim,
                dy: 12,
                weight: hit ? 600 : 400
            });
            if (hit || e.cam.s < 1.1) e.label(ctx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(p.value), p.x, p.y + p.r, {
                color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].faint,
                alpha: a * dim,
                dy: 24,
                size: 10
            });
        });
        const necessity = this.focusKey !== null ? toNecessity(this.focusKey) : null;
        if (necessity && this.lit && this.necessity) {
            const text = `${necessity} · ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(Math.round(this.necessity.monthly[necessity]))} / month`;
            e.label(ctx, text, this.lit.x + this.lit.w / 2, this.lit.y, {
                color: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"].paper,
                alpha: this.changeAlpha(now),
                dy: -10,
                size: 13,
                weight: 600
            });
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/segments.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applySegmentColors",
    ()=>applySegmentColors,
    "orderParts",
    ()=>orderParts,
    "partsFromCategories",
    ()=>partsFromCategories,
    "segment",
    ()=>segment,
    "segmentColors",
    ()=>segmentColors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/layout.ts [app-client] (ecmascript)");
;
;
const mutable = ()=>[
        0,
        0,
        0
    ];
const SKY = mutable();
const INDIGO = mutable();
const ORCHID = mutable();
const STEEL = mutable();
const MIST = mutable();
/** The hues for the light stage (the Luma/TellHorn look) and for the dark stage (see the table above). */ const HUES = {
    light: {
        sky: "#549de5",
        indigo: "#2b519c",
        orchid: "#ae60a0",
        steel: "#7d889b",
        mist: "#bcc3ce"
    },
    dark: {
        sky: "#4d97de",
        indigo: "#4d5aac",
        orchid: "#b466a6",
        steel: "#a3aab8",
        mist: "#5b6271"
    }
};
function applySegmentColors(dark) {
    const h = dark ? HUES.dark : HUES.light;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRgb"])(SKY, h.sky);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRgb"])(INDIGO, h.indigo);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRgb"])(ORCHID, h.orchid);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRgb"])(STEEL, h.steel);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRgb"])(MIST, h.mist);
}
applySegmentColors(false);
const segmentColors = ()=>[
        SKY,
        INDIGO,
        ORCHID,
        STEEL,
        MIST
    ];
const FIXED = {
    Housing: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].spend,
    Travel: SKY,
    Electronics: INDIGO,
    Bike: ORCHID,
    Health: STEEL,
    Other: MIST
};
const FREE = [
    INDIGO,
    SKY,
    ORCHID,
    __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"].spend
];
const WORDS = [
    [
        "Other",
        /^other$/
    ],
    [
        "Housing",
        /hous|rent|electric|flat|apartment/
    ],
    [
        "Travel",
        /travel|trip|flight|plane|ticket|hotel|london|holiday/
    ],
    [
        "Electronics",
        /electronic|apple|digitec|galaxus|iphone|laptop|phone|computer/
    ],
    [
        "Bike",
        /bike|bicycle|velo/
    ],
    [
        "Health",
        /health|insurance|krankenkasse|doctor/
    ]
];
function entityOf(s) {
    const names = [
        s.name,
        ...s.aliases ?? []
    ].map((n)=>n.toLowerCase());
    for (const [entity, re] of WORDS)if (names.some((n)=>re.test(n))) return entity;
    return null;
}
/** Colours for one month's parts: fixed hues first, then the first free hue for the rest. */ function colorsFor(parts) {
    const out = parts.map(()=>null);
    const used = new Set();
    parts.forEach((p, i)=>{
        const e = entityOf(p);
        const c = e ? FIXED[e] : null;
        if (c && !used.has(c)) {
            out[i] = c;
            used.add(c);
        }
    });
    parts.forEach((_, i)=>{
        if (out[i]) return;
        const c = FREE.find((x)=>!used.has(x)) ?? MIST;
        out[i] = c;
        used.add(c);
    });
    return out;
}
function orderParts(parts) {
    const isOther = (p)=>p.name.toLowerCase() === "other";
    return [
        ...parts.filter((p)=>!isOther(p)).sort((a, b)=>b.value - a.value),
        ...parts.filter(isOther)
    ];
}
function partsFromCategories(categories) {
    const list = Object.entries(categories).filter(([name, v])=>v > 0 && name.toLowerCase() !== "other").map(([name, value])=>({
            name,
            value
        })).sort((a, b)=>b.value - a.value);
    const rest = list.slice(5).reduce((s, p)=>s + p.value, 0) + Math.max(0, categories.Other ?? 0);
    return rest > 0 ? [
        ...list.slice(0, 5),
        {
            name: "Other",
            value: rest
        }
    ] : list.slice(0, 5);
}
function segment(parts, n) {
    const colors = colorsFor(parts);
    const counts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$layout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["largestRemainder"])(parts.map((p)=>p.value), n);
    return parts.map((p, i)=>({
            ...p,
            count: counts[i],
            color: colors[i]
        }));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/world/skin.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applySkin",
    ()=>applySkin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/engine.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/segments.ts [app-client] (ecmascript)");
;
;
;
/**
 * Applies a look (light or dark) to everything the canvas derived from the theme: the shared `theme` strings,
 * the palette entries and the segment hues. Returns [from, to] pairs of every colour that changed,
 * so the grains already on screen can be recoloured in place (GrainWorld.recolor).
 */ const PALETTE_KEYS = [
    "paper",
    "spend",
    "coral",
    "saved",
    "faint"
];
const copy = (c)=>[
        c[0],
        c[1],
        c[2]
    ];
function applySkin(name) {
    const entries = ()=>[
            ...PALETTE_KEYS.map((key)=>__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"][key]),
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["segmentColors"])()
        ];
    const before = entries().map(copy);
    Object.assign(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEMES"][name]);
    for (const key of PALETTE_KEYS)(0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setRgb"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$engine$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["palette"][key], __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["theme"][key]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$segments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applySegmentColors"])(name === "dark");
    const after = entries().map(copy);
    return before.map((from, i)=>[
            from,
            after[i]
        ]).filter(([from, to])=>from[0] !== to[0] || from[1] !== to[1] || from[2] !== to[2]);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/controls.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$offer$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/offer-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$open$2d$points$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/open-points.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$savings$2d$slip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/savings-slip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/stage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$transcript$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/transcript.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$use$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/use-advisor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$welcome$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/welcome.tsx [app-client] (ecmascript)");
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
;
function AdvisorShell() {
    _s();
    const advisor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$use$2d$advisor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdvisor"])();
    const input = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInputFocus"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-canvas md:flex md:h-dvh md:min-h-[35rem] md:flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatusBar"], {}, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "mx-auto w-full max-w-2xl px-4 pb-8 pt-5 md:flex md:min-h-0 md:max-w-3xl md:flex-1 md:flex-col md:px-6 md:pb-5 md:pt-4 lg:max-w-6xl lg:px-8 lg:pb-6 lg:pt-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 md:grid md:min-h-0 md:flex-1 md:grid-rows-[minmax(0,3fr)_minmax(0,2fr)] md:gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Stage"], {
                            world: advisor.world,
                            figure: advisor.figure,
                            pausedAt: pausedAt,
                            status: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgressPill"], {
                                mode: advisor.mode,
                                backup: availability.backup,
                                main: advisor.mainStep,
                                side: advisor.sideStep
                            }, void 0, false, {
                                fileName: "[project]/components/advisor-shell.tsx",
                                lineNumber: 43,
                                columnNumber: 92
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/advisor-shell.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-w-0 flex-col gap-4 md:min-h-0 md:gap-3",
                            children: [
                                advisor.mode === "idle" && advisor.log.length === 0 && !advisor.line ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$welcome$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Welcome"], {
                                    onSay: advisor.say,
                                    onStart: advisor.start
                                }, void 0, false, {
                                    fileName: "[project]/components/advisor-shell.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$transcript$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Transcript"], {
                                            log: advisor.log,
                                            line: advisor.line,
                                            lineKind: advisor.lineKind
                                        }, void 0, false, {
                                            fileName: "[project]/components/advisor-shell.tsx",
                                            lineNumber: 49,
                                            columnNumber: 17
                                        }, this),
                                        advisor.points.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:max-h-44 md:shrink-0 md:overflow-y-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$open$2d$points$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OpenPoints"], {
                                                points: advisor.points,
                                                onAnswer: advisor.answer,
                                                onForget: advisor.forget
                                            }, void 0, false, {
                                                fileName: "[project]/components/advisor-shell.tsx",
                                                lineNumber: 52,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/advisor-shell.tsx",
                                            lineNumber: 51,
                                            columnNumber: 19
                                        }, this),
                                        advisor.slip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:max-h-56 md:shrink-0 md:overflow-y-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$savings$2d$slip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SavingsSlip"], {
                                                slip: advisor.slip,
                                                onClose: advisor.closeSlip
                                            }, void 0, false, {
                                                fileName: "[project]/components/advisor-shell.tsx",
                                                lineNumber: 57,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/advisor-shell.tsx",
                                            lineNumber: 56,
                                            columnNumber: 19
                                        }, this),
                                        advisor.offer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$offer$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OfferCard"], {
                                            confirmed: advisor.offerConfirmed,
                                            onConfirm: advisor.confirmOffer
                                        }, void 0, false, {
                                            fileName: "[project]/components/advisor-shell.tsx",
                                            lineNumber: 60,
                                            columnNumber: 35
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chips"], {
                                            mode: advisor.mode,
                                            canContinue: snapshot !== null,
                                            question: advisor.question,
                                            onAnswer: advisor.answer,
                                            onStart: advisor.start,
                                            onSay: advisor.say,
                                            onResume: advisor.resume,
                                            onMore: ()=>{
                                                advisor.interrupt();
                                                input.focus();
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/advisor-shell.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/advisor-shell.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$controls$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InputRow"], {
                                    mode: advisor.mode,
                                    micSupported: mic.supported,
                                    micActive: mic.listening,
                                    text: input.text,
                                    onText: input.setText,
                                    onSubmit: advisor.say,
                                    onStop: ()=>advisor.interrupt(true),
                                    onMicDown: ()=>{
                                        advisor.interrupt();
                                        mic.start();
                                    },
                                    onMicUp: mic.stop,
                                    inputRef: input.ref
                                }, void 0, false, {
                                    fileName: "[project]/components/advisor-shell.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs leading-5 text-faint md:shrink-0",
                                    children: [
                                        liveText,
                                        " · ",
                                        advisor.availability.voiceLine,
                                        " · ",
                                        micText
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/advisor-shell.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this),
                                advisor.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-coral-ink",
                                    children: advisor.error
                                }, void 0, false, {
                                    fileName: "[project]/components/advisor-shell.tsx",
                                    lineNumber: 94,
                                    columnNumber: 31
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/advisor-shell.tsx",
                            lineNumber: 44,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/advisor-shell.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/advisor-shell.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/advisor-shell.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(AdvisorShell, "R+VqTle3C49fyfCia+wwqDA2+60=", false, function() {
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
"[project]/components/controls.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Chips",
    ()=>Chips,
    "InputRow",
    ()=>InputRow,
    "ProgressPill",
    ()=>ProgressPill,
    "StatusBar",
    ()=>StatusBar,
    "useInputFocus",
    ()=>useInputFocus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/content/scripts.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$welcome$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/welcome.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme-toggle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const modeText = {
    idle: "Ready",
    presenting: "Presenting your year",
    listening: "Listening…",
    side: "Answering your question",
    waiting: "Shall we continue?",
    answering: "Answer if you like",
    returning: "Picking up where we left off",
    finished: "Finished"
};
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const buttonBase = `rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink shadow-sm transition-colors hover:border-brand/40 aria-pressed:border-brand aria-pressed:bg-sun-soft ${focusRing}`;
const primaryBase = `bg-brand text-on-brand shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark ${focusRing}`;
function StatusBar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-20 border-b border-sun-deep bg-sun",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex h-[68px] w-full max-w-2xl items-center justify-between gap-2 px-4 md:max-w-3xl md:px-6 lg:max-w-6xl lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Logo"], {}, void 0, false, {
                    fileName: "[project]/components/controls.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex shrink-0 gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2d$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeToggle"], {
                        className: `${buttonBase} flex items-center justify-center px-2.5`
                    }, void 0, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 32,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/controls.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/controls.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = StatusBar;
/** The dot in front of the status: what kind of moment this is. */ const modeDot = {
    presenting: "bg-brand",
    returning: "bg-brand",
    side: "bg-saved",
    listening: "bg-coral",
    answering: "bg-sun-deep"
};
function ProgressPill({ mode, backup, main, side }) {
    const step = mode === "side" ? side : mode === "presenting" || mode === "returning" || mode === "answering" ? main : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "inline-flex min-w-0 max-w-full items-center gap-2 rounded-full bg-sun-soft px-3 py-1 text-xs font-medium text-ink",
        "aria-live": "polite",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: `h-1.5 w-1.5 shrink-0 rounded-full ${modeDot[mode] ?? "bg-faint"}`
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "truncate",
                children: modeText[mode]
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            step && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0 font-semibold tabular-nums text-brand",
                children: `${step.index + 1}/${step.count}`
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 60,
                columnNumber: 16
            }, this),
            backup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "shrink-0 text-faint",
                children: "\u00b7 backup"
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 61,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c1 = ProgressPill;
/**
 * Suggested questions in one drop-down instead of a column of buttons: a single small button, the list opens
 * upwards over the conversation, closes on a choice, a click outside or Escape.
 */ function QuestionMenu({ questions }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const root = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "QuestionMenu.useEffect": ()=>{
            if (!open) return;
            const onDown = {
                "QuestionMenu.useEffect.onDown": (event)=>{
                    if (!root.current?.contains(event.target)) setOpen(false);
                }
            }["QuestionMenu.useEffect.onDown"];
            const onKey = {
                "QuestionMenu.useEffect.onKey": (event)=>{
                    if (event.key === "Escape") setOpen(false);
                }
            }["QuestionMenu.useEffect.onKey"];
            document.addEventListener("mousedown", onDown);
            document.addEventListener("keydown", onKey);
            return ({
                "QuestionMenu.useEffect": ()=>{
                    document.removeEventListener("mousedown", onDown);
                    document.removeEventListener("keydown", onKey);
                }
            })["QuestionMenu.useEffect"];
        }
    }["QuestionMenu.useEffect"], [
        open
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: root,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-haspopup": "menu",
                "aria-expanded": open,
                onClick: ()=>setOpen((value)=>!value),
                className: `flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand/40 hover:bg-sun-soft ${focusRing}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Suggested questions"
                    }, void 0, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2.4",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        "aria-hidden": "true",
                        className: `transition-transform ${open ? "rotate-180" : ""}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "m6 15 6-6 6 6"
                        }, void 0, false, {
                            fileName: "[project]/components/controls.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                role: "menu",
                className: "absolute bottom-full left-0 z-30 mb-2 max-h-72 w-[min(24rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-xl shadow-ink/10",
                children: questions.map((question)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        role: "none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            role: "menuitem",
                            onClick: ()=>{
                                setOpen(false);
                                question.run();
                            },
                            className: "w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:bg-sun-soft focus-visible:bg-sun-soft focus-visible:outline-none",
                            children: question.label
                        }, void 0, false, {
                            fileName: "[project]/components/controls.tsx",
                            lineNumber: 111,
                            columnNumber: 15
                        }, this)
                    }, question.label, false, {
                        fileName: "[project]/components/controls.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 108,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(QuestionMenu, "2S6zhuLFCMgt5pCpD4VSQpSaVVc=");
_c2 = QuestionMenu;
function Chips({ mode, canContinue, question, onStart, onSay, onResume, onMore, onAnswer }) {
    const ask = (text)=>({
            label: text,
            run: ()=>onSay(text),
            kind: "question"
        });
    const action = (label, run, primary = false)=>({
            label,
            run,
            kind: "action",
            primary
        });
    const cont = action("OK, let's continue", onResume, true);
    // Without a paused presentation "continue" would restart it, so offer other questions instead.
    const more = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$welcome$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STARTER_QUESTIONS"].map((q)=>ask(q.text));
    const walk = action("Walk me through my year", onStart, true);
    const chips = {
        idle: [
            action("Start the presentation", onStart, true)
        ],
        presenting: [
            ask("Wait, why is September so high?"),
            ask("Wait, how can I save money?"),
            ask("Wait, what am I looking at?")
        ],
        listening: [
            ask("Why is September so high?"),
            ask("Why was November high?"),
            ask(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SAVE_EXAMPLE"]),
            ask("What are my spending habits?"),
            ask(__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AFFORD_EXAMPLE"]),
            ...canContinue ? [
                cont
            ] : []
        ],
        side: canContinue ? [
            cont
        ] : [],
        waiting: canContinue ? [
            cont,
            action("One more question", onMore)
        ] : [
            ...more,
            walk
        ],
        answering: (question?.answers ?? []).map((a, i)=>action(a.label, ()=>onAnswer?.(a.id), i === 0)),
        returning: [],
        finished: [
            action("Start over", onStart, true)
        ]
    };
    const list = chips[mode];
    const questions = list.filter((chip)=>chip.kind === "question");
    const actions = list.filter((chip)=>chip.kind === "action");
    if (!list.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap items-center gap-2 md:shrink-0",
        children: [
            questions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuestionMenu, {
                questions: questions
            }, mode, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 153,
                columnNumber: 32
            }, this),
            actions.map((chip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: chip.run,
                    className: chip.primary ? `rounded-full px-5 py-2.5 text-left text-sm font-semibold ${primaryBase}` : `rounded-full border border-line bg-surface px-4 py-2 text-left text-sm font-medium text-ink shadow-sm transition-colors hover:border-brand/40 hover:bg-sun-soft ${focusRing}`,
                    children: chip.label
                }, chip.label, false, {
                    fileName: "[project]/components/controls.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_c3 = Chips;
/** The logo's sound wave: seven rounded bars that move while the microphone listens. */ function Waveform() {
    const bars = [
        6,
        12,
        18,
        24,
        18,
        12,
        6
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "26",
        height: "26",
        viewBox: "0 0 26 26",
        fill: "currentColor",
        "aria-hidden": "true",
        children: bars.map((h, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                className: "wave-bar",
                x: 1.5 + i * 3.4,
                y: 13 - h / 2,
                width: "2",
                height: h,
                rx: "1",
                style: {
                    animationDelay: `${i * 110}ms`
                }
            }, i, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 189,
        columnNumber: 5
    }, this);
}
_c4 = Waveform;
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
    const small = `h-11 shrink-0 rounded-xl border border-line bg-surface px-3 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-brand/40 disabled:opacity-40 ${focusRing}`;
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
                className: "h-11 min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted focus:border-brand focus:outline-none"
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: !props.micSupported,
                "aria-label": props.micActive ? "Listening: release or tap to finish" : "Tap or hold to talk",
                title: props.micSupported ? "Tap or hold to talk" : "Speech input is not available in this browser",
                onPointerDown: (event)=>{
                    event.preventDefault();
                    props.onMicDown();
                },
                onPointerUp: props.onMicUp,
                onPointerLeave: props.onMicUp,
                onPointerCancel: props.onMicUp,
                onContextMenu: (event)=>event.preventDefault(),
                className: `flex h-11 w-12 shrink-0 select-none touch-none items-center justify-center rounded-xl shadow-sm transition-colors disabled:opacity-40 ${focusRing} ${props.micActive ? "wave-active bg-sun text-on-sun ring-2 ring-brand" : "bg-brand text-on-brand hover:bg-brand-dark"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Waveform, {}, void 0, false, {
                    fileName: "[project]/components/controls.tsx",
                    lineNumber: 235,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 220,
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
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: submit,
                disabled: !props.text.trim(),
                className: `h-11 shrink-0 rounded-xl px-4 text-sm font-semibold disabled:opacity-40 ${primaryBase}`,
                children: "Ask"
            }, void 0, false, {
                fileName: "[project]/components/controls.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/controls.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_c5 = InputRow;
function useInputFocus() {
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    return {
        ref,
        text,
        setText,
        focus: ()=>ref.current?.focus()
    };
}
_s1(useInputFocus, "BcjXds8Yo2P6lAnTzg5HwWZR3dU=");
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "StatusBar");
__turbopack_context__.k.register(_c1, "ProgressPill");
__turbopack_context__.k.register(_c2, "QuestionMenu");
__turbopack_context__.k.register(_c3, "Chips");
__turbopack_context__.k.register(_c4, "Waveform");
__turbopack_context__.k.register(_c5, "InputRow");
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
"[project]/components/keepsake.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keepReducer",
    ()=>keepReducer,
    "slipLines",
    ()=>slipLines
]);
const slipLines = (keepsake)=>keepsake.plan.cuts.length + 1;
function keepReducer(slip, event) {
    if (event.type === "keep") return {
        keepsake: event.keepsake,
        revealed: 0,
        live: true
    };
    if (!slip?.live) return slip;
    if (event.type === "line" && event.kind === "side" && event.beatIndex !== null) {
        return {
            ...slip,
            revealed: Math.max(slip.revealed, Math.min(event.beatIndex + 1, slipLines(slip.keepsake)))
        };
    }
    // The answer ended or was cut short: show the whole plan, it is hers to keep.
    if (event.type === "mode" && event.previous === "side") return {
        ...slip,
        revealed: slipLines(slip.keepsake),
        live: false
    };
    return slip;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @next/next/no-img-element */ /**
 * TellHorn logo: the apple with the arrow, then the wordmark with its sound-wave badge, and (from tablets up) the
 * tagline. The images are the brand logo cut out on a transparent background, so they sit on the yellow header.
 */ __turbopack_context__.s([
    "Logo",
    ()=>Logo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Logo() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-w-0 items-center gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: "/brand/tellhorn-mark.png",
                alt: "",
                width: 245,
                height: 240,
                className: "h-9 w-auto shrink-0 sm:h-10"
            }, void 0, false, {
                fileName: "[project]/components/logo.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/brand/tellhorn-wordmark.png",
                        alt: "TellHorn",
                        width: 720,
                        height: 105,
                        className: "h-5 w-auto sm:h-6"
                    }, void 0, false, {
                        fileName: "[project]/components/logo.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 hidden text-[11px] font-medium leading-none tracking-wide text-on-sun/80 md:block",
                        children: "The William Tell of your finances"
                    }, void 0, false, {
                        fileName: "[project]/components/logo.tsx",
                        lineNumber: 13,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/logo.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/logo.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_c = Logo;
var _c;
__turbopack_context__.k.register(_c, "Logo");
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
        className: "rounded-2xl border border-saved/40 bg-surface p-5 shadow-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-base font-semibold tracking-tight text-ink",
                children: "CHF 200 a month, into pillar 3a"
            }, void 0, false, {
                fileName: "[project]/components/offer-card.tsx",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            confirmed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-saved-ink",
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
                        className: "mt-3 w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-on-brand shadow-sm shadow-brand/20 transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
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
"[project]/components/open-points.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenPoints",
    ()=>OpenPoints
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
function Check() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": true,
        viewBox: "0 0 16 16",
        className: "h-3.5 w-3.5 shrink-0",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3.5 8.5l3 3 6-7",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round"
        }, void 0, false, {
            fileName: "[project]/components/open-points.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/open-points.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = Check;
/** One open point. Collapsed: its name and the assumption on one line. Open: the full assumption and the answers. */ function Row({ point, open, onToggle, onAnswer }) {
    const chosen = point.answer !== null ? point.answers.find((a)=>a.id === point.answer) : undefined;
    if (chosen) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
            className: "flex flex-wrap items-baseline justify-between gap-x-3 py-2 first:pt-0 last:pb-0",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-medium text-ink",
                    children: point.label
                }, void 0, false, {
                    fileName: "[project]/components/open-points.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "flex items-center gap-1.5 text-xs font-medium text-saved-ink",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Check, {}, void 0, false, {
                            fileName: "[project]/components/open-points.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        chosen.label
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/open-points.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/open-points.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "py-2 first:pt-0 last:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-expanded": open,
                onClick: onToggle,
                className: `block w-full rounded-md text-left ${focusRing}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2 text-sm font-medium text-ink",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": true,
                                className: "h-2 w-2 shrink-0 rounded-full border border-faint"
                            }, void 0, false, {
                                fileName: "[project]/components/open-points.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            point.label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/open-points.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `mt-0.5 block text-xs leading-4 text-soft ${open ? "" : "truncate"}`,
                        children: point.assume
                    }, void 0, false, {
                        fileName: "[project]/components/open-points.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/open-points.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 flex flex-wrap gap-1.5",
                children: point.answers.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onAnswer(a.id, point.subject),
                        className: `min-h-8 rounded-full border border-line bg-surface px-2.5 py-1 text-left text-xs font-medium text-ink shadow-sm transition-colors hover:border-brand/40 ${focusRing}`,
                        children: a.label
                    }, a.id, false, {
                        fileName: "[project]/components/open-points.tsx",
                        lineNumber: 42,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/open-points.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/open-points.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c1 = Row;
function OpenPoints({ points, onAnswer, onForget }) {
    _s();
    // A manual choice holds until the next question is asked (the list grows) or the chosen point is answered.
    const [picked, setPicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const unanswered = points.filter((p)=>p.answer === null);
    const pickHolds = picked !== null && picked.count === points.length && (picked.subject === null || unanswered.some((p)=>p.subject === picked.subject));
    const openSubject = pickHolds ? picked.subject : unanswered.at(-1)?.subject ?? null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Open points",
        className: "rounded-2xl border border-line bg-surface px-5 py-4 shadow-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] font-bold uppercase tracking-[0.15em] text-faint",
                        children: "What I can't see in these accounts"
                    }, void 0, false, {
                        fileName: "[project]/components/open-points.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    unanswered.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "shrink-0 text-[11px] font-medium text-faint",
                        children: [
                            unanswered.length,
                            " open"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/open-points.tsx",
                        lineNumber: 73,
                        columnNumber: 35
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/open-points.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-2.5 divide-y divide-line",
                children: points.map((point)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        point: point,
                        open: point.subject === openSubject,
                        onToggle: ()=>setPicked({
                                subject: point.subject === openSubject ? null : point.subject,
                                count: points.length
                            }),
                        onAnswer: onAnswer
                    }, point.subject, false, {
                        fileName: "[project]/components/open-points.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/open-points.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            onForget && unanswered.length < points.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onForget,
                className: `mt-2.5 rounded-md text-[11px] font-medium text-faint underline-offset-2 transition-colors hover:text-soft hover:underline ${focusRing}`,
                children: "Forget my answers"
            }, void 0, false, {
                fileName: "[project]/components/open-points.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/open-points.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(OpenPoints, "lIm5NpQK79iPPy9AT8jagYU3+5c=");
_c2 = OpenPoints;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Check");
__turbopack_context__.k.register(_c1, "Row");
__turbopack_context__.k.register(_c2, "OpenPoints");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/savings-slip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SavingsSlip",
    ()=>SavingsSlip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/format.ts [app-client] (ecmascript)");
"use client";
;
;
/** Torn paper edge: a soft zigzag, drawn in the slip's own white. */ function Edge({ flip }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": true,
        viewBox: "0 0 120 6",
        preserveAspectRatio: "none",
        className: `block h-[7px] w-full ${flip ? "rotate-180" : ""}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M0 6 L0 3 5 0 10 3 15 0 20 3 25 0 30 3 35 0 40 3 45 0 50 3 55 0 60 3 65 0 70 3 75 0 80 3 85 0 90 3 95 0 100 3 105 0 110 3 115 0 120 3 120 6 Z",
            fill: "#ffffff"
        }, void 0, false, {
            fileName: "[project]/components/savings-slip.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/savings-slip.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = Edge;
/** Perforation between the stub and the lines, with the two punched notches of a ticket. */ function Perforation() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": true,
        className: "relative my-4 h-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute -left-8 -top-2 h-4 w-4 rounded-full bg-canvas"
            }, void 0, false, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute -right-8 -top-2 h-4 w-4 rounded-full bg-canvas"
            }, void 0, false, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t-2 border-dotted border-line"
            }, void 0, false, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/savings-slip.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c1 = Perforation;
const marks = (count, tone)=>Array.from({
        length: count
    }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `block h-3.5 w-[3px] rounded-full ${tone}`
        }, i, false, {
            fileName: "[project]/components/savings-slip.tsx",
            lineNumber: 31,
            columnNumber: 43
        }, ("TURBOPACK compile-time value", void 0)));
/** Her usual purchases as tally marks: the ones she keeps in groups of five, the ones she skips set apart and struck through in green. */ function Tally({ cut }) {
    const kept = cut.usualPerMonth - cut.fewer;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        "aria-hidden": true,
        className: "flex flex-wrap items-center gap-x-2 gap-y-1",
        children: [
            Array.from({
                length: Math.ceil(kept / 5)
            }, (_, group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex gap-[3px]",
                    children: marks(Math.min(5, kept - group * 5), "bg-soft/60")
                }, group, false, {
                    fileName: "[project]/components/savings-slip.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative ml-1 flex gap-[3px] px-0.5",
                children: [
                    marks(cut.fewer, "bg-saved/30"),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "slip-strike absolute -left-0.5 -right-0.5 top-1/2 block h-[2px] -translate-y-1/2 origin-left rounded-full bg-saved"
                    }, void 0, false, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/savings-slip.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c2 = Tally;
function CutLine({ cut, name }) {
    const cancel = cut.kind === "cancel";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "slip-line py-2.5",
        "aria-label": cancel ? `${name}: saves ${cut.saves} francs a month` : `${cut.fewer} fewer ${name} a month, of ${cut.usualPerMonth}: saves ${cut.saves} francs`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-block text-sm font-medium text-ink first-letter:uppercase",
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": true,
                        className: "mb-1 flex-1 border-b border-dotted border-faint/40"
                    }, void 0, false, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-base font-semibold tabular-nums text-saved-ink",
                        children: [
                            "+",
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(cut.saves)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            cancel ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 text-[11px] text-faint",
                children: "Subscription, the full amount"
            }, void 0, false, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 64,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1.5 flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Tally, {
                        cut: cut
                    }, void 0, false, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[11px] tabular-nums text-faint",
                        children: [
                            "−",
                            cut.fewer,
                            " of ",
                            cut.usualPerMonth
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/savings-slip.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_c3 = CutLine;
function SavingsSlip({ slip, onClose }) {
    const { plan, names } = slip.keepsake;
    const cuts = plan.cuts.slice(0, slip.revealed);
    const totalShown = slip.revealed > plan.cuts.length;
    const short = plan.shortfall > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Your savings plan",
        onKeyDown: (event)=>{
            if (event.key === "Escape") onClose();
        },
        className: "slip-settle mx-auto w-full max-w-sm drop-shadow-[0_6px_14px_rgba(20,34,56,0.08)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Edge, {}, void 0, false, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden bg-white px-6 pb-4 pt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] font-bold uppercase tracking-[0.18em] text-faint",
                                        children: "Savings plan"
                                    }, void 0, false, {
                                        fileName: "[project]/components/savings-slip.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm tabular-nums text-soft",
                                        children: [
                                            "Goal ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-ink",
                                                children: [
                                                    "CHF ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(plan.target)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/savings-slip.tsx",
                                                lineNumber: 98,
                                                columnNumber: 20
                                            }, this),
                                            " a month"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/savings-slip.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/savings-slip.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                "aria-label": "Close savings plan",
                                className: "-mr-3 grid h-11 w-11 shrink-0 place-items-center rounded-full text-faint transition-colors hover:bg-canvas hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    "aria-hidden": true,
                                    viewBox: "0 0 16 16",
                                    className: "h-4 w-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3.5 3.5l9 9M12.5 3.5l-9 9",
                                        stroke: "currentColor",
                                        strokeWidth: "1.6",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/components/savings-slip.tsx",
                                        lineNumber: 108,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/savings-slip.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/savings-slip.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Perforation, {}, void 0, false, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "divide-y divide-dashed divide-line",
                        children: cuts.map((cut, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CutLine, {
                                cut: cut,
                                name: names[i] ?? cut.merchant
                            }, cut.merchant, false, {
                                fileName: "[project]/components/savings-slip.tsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    totalShown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "slip-line mt-2 border-t-2 border-double border-line pt-4 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[11px] font-bold uppercase tracking-[0.18em] text-faint",
                                children: short ? "These changes give" : "Saved a month"
                            }, void 0, false, {
                                fileName: "[project]/components/savings-slip.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-5xl font-semibold tabular-nums leading-none text-saved-ink",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mr-1.5 align-top text-base font-medium text-saved-ink/80",
                                        children: "CHF"
                                    }, void 0, false, {
                                        fileName: "[project]/components/savings-slip.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(short ? plan.reachable : plan.monthly)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/savings-slip.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this),
                            short ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm tabular-nums text-soft",
                                children: [
                                    "of ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(plan.target),
                                    " · ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-coral-ink",
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(plan.shortfall),
                                            " missing"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/savings-slip.tsx",
                                        lineNumber: 130,
                                        columnNumber: 43
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/savings-slip.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm tabular-nums text-soft",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(plan.yearly),
                                    " a year"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/savings-slip.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/savings-slip.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Edge, {
                flip: true
            }, void 0, false, {
                fileName: "[project]/components/savings-slip.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/savings-slip.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c4 = SavingsSlip;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Edge");
__turbopack_context__.k.register(_c1, "Perforation");
__turbopack_context__.k.register(_c2, "Tally");
__turbopack_context__.k.register(_c3, "CutLine");
__turbopack_context__.k.register(_c4, "SavingsSlip");
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
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const DOUBLE_TAP_MS = 320;
const TAP_SLOP = 8;
function StageCanvas({ world }) {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [zoomed, setZoomed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // The engine is private to GrainWorld; the hand view lives on it so every scene's camera call can reset it.
    const engine = world.engine;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StageCanvas.useEffect": ()=>{
            const canvas = ref.current;
            if (!canvas) return;
            world.attach(canvas);
            const resize = {
                "StageCanvas.useEffect.resize": ()=>{
                    const rect = canvas.getBoundingClientRect();
                    world.resize(rect.width, rect.height);
                }
            }["StageCanvas.useEffect.resize"];
            const observer = new ResizeObserver(resize);
            observer.observe(canvas);
            resize();
            engine.onUserChange = setZoomed;
            const pointers = new Map();
            let pinch = 0;
            let lastTap = 0;
            let downAt = {
                x: 0,
                y: 0
            };
            const local = {
                "StageCanvas.useEffect.local": (e)=>{
                    const r = canvas.getBoundingClientRect();
                    return {
                        x: e.clientX - r.left,
                        y: e.clientY - r.top
                    };
                }
            }["StageCanvas.useEffect.local"];
            const spread = {
                "StageCanvas.useEffect.spread": ()=>{
                    const [a, b] = [
                        ...pointers.values()
                    ];
                    return {
                        d: Math.hypot(a.x - b.x, a.y - b.y),
                        x: (a.x + b.x) / 2,
                        y: (a.y + b.y) / 2
                    };
                }
            }["StageCanvas.useEffect.spread"];
            const onWheel = {
                "StageCanvas.useEffect.onWheel": (e)=>{
                    if (!e.ctrlKey && !e.metaKey) return;
                    e.preventDefault();
                    const p = local(e);
                    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
                    engine.zoomUser(Math.exp(-dy * 0.0022), p.x, p.y);
                }
            }["StageCanvas.useEffect.onWheel"];
            const onDown = {
                "StageCanvas.useEffect.onDown": (e)=>{
                    if (e.pointerType === "mouse" && e.button !== 0) return;
                    canvas.setPointerCapture(e.pointerId);
                    const p = local(e);
                    pointers.set(e.pointerId, p);
                    if (pointers.size === 1) downAt = p;
                    if (pointers.size === 2) pinch = spread().d;
                }
            }["StageCanvas.useEffect.onDown"];
            const onMove = {
                "StageCanvas.useEffect.onMove": (e)=>{
                    const prev = pointers.get(e.pointerId);
                    if (!prev) return;
                    const p = local(e);
                    if (pointers.size >= 2) {
                        const before = spread();
                        pointers.set(e.pointerId, p);
                        const after = spread();
                        engine.panUser(after.x - before.x, after.y - before.y);
                        if (pinch > 0 && after.d > 0) engine.zoomUser(after.d / pinch, after.x, after.y);
                        pinch = after.d;
                    } else {
                        pointers.set(e.pointerId, p);
                        engine.panUser(p.x - prev.x, p.y - prev.y);
                    }
                }
            }["StageCanvas.useEffect.onMove"];
            const onUp = {
                "StageCanvas.useEffect.onUp": (e)=>{
                    const p = pointers.get(e.pointerId);
                    if (!p) return;
                    pointers.delete(e.pointerId);
                    pinch = 0;
                    if (e.type !== "pointerup" || pointers.size > 0 || e.pointerType === "mouse") return;
                    // Double tap (touch/pen); a mouse uses dblclick.
                    if (Math.hypot(p.x - downAt.x, p.y - downAt.y) > TAP_SLOP) return;
                    const now = performance.now();
                    if (now - lastTap < DOUBLE_TAP_MS) {
                        engine.resetUser();
                        lastTap = 0;
                    } else lastTap = now;
                }
            }["StageCanvas.useEffect.onUp"];
            const onDouble = {
                "StageCanvas.useEffect.onDouble": ()=>engine.resetUser()
            }["StageCanvas.useEffect.onDouble"];
            canvas.addEventListener("wheel", onWheel, {
                passive: false
            });
            canvas.addEventListener("pointerdown", onDown);
            canvas.addEventListener("pointermove", onMove);
            canvas.addEventListener("pointerup", onUp);
            canvas.addEventListener("pointercancel", onUp);
            canvas.addEventListener("dblclick", onDouble);
            return ({
                "StageCanvas.useEffect": ()=>{
                    canvas.removeEventListener("wheel", onWheel);
                    canvas.removeEventListener("pointerdown", onDown);
                    canvas.removeEventListener("pointermove", onMove);
                    canvas.removeEventListener("pointerup", onUp);
                    canvas.removeEventListener("pointercancel", onUp);
                    canvas.removeEventListener("dblclick", onDouble);
                    if (engine.onUserChange === setZoomed) engine.onUserChange = null;
                    engine.resetUser(true);
                    observer.disconnect();
                    world.detach();
                }
            })["StageCanvas.useEffect"];
        }
    }["StageCanvas.useEffect"], [
        world,
        engine
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-full w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: ref,
                className: `block h-full w-full select-none ${zoomed ? "touch-none cursor-grab active:cursor-grabbing" : "touch-pan-y"}`,
                role: "img",
                "aria-label": "Whiteboard: banknotes of CHF 100 arranged for the current scene. Drag to pan, pinch or Ctrl + scroll to zoom."
            }, void 0, false, {
                fileName: "[project]/components/stage-canvas.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>engine.resetUser(),
                "aria-label": "Reset view",
                "aria-hidden": !zoomed,
                tabIndex: zoomed ? 0 : -1,
                className: `absolute right-2 top-2 inline-flex min-h-11 items-center gap-1.5 rounded-full border border-black/5 bg-white/90 px-4 text-xs font-semibold text-ink shadow-[0_4px_16px_rgba(20,34,56,0.12)] backdrop-blur transition-[opacity,transform] duration-500 ease-out hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none ${zoomed ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        "aria-hidden": "true",
                        viewBox: "0 0 20 20",
                        className: "h-4 w-4 text-faint",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "1.8",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M3.5 7.5V3.5h4M16.5 12.5v4h-4M3.5 3.5l4.5 4.5M16.5 16.5L12 12"
                        }, void 0, false, {
                            fileName: "[project]/components/stage-canvas.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/stage-canvas.tsx",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this),
                    "Reset view"
                ]
            }, void 0, true, {
                fileName: "[project]/components/stage-canvas.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/stage-canvas.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_s(StageCanvas, "ILB3DzapfYwp86jputEpj9bcYWc=");
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
    const negative = change !== null && change.to.value < 0;
    const tone = negative ? "text-coral-ink" : "text-ink";
    // Re-keyed on every change so the marker sweep, the label and the landing thump play again.
    const seq = change?.seq ?? 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-[5.25rem] lg:min-h-[7.25rem]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "fig-label min-h-[1.25rem] text-[11px] font-bold uppercase tracking-[0.15em] text-faint",
                children: change?.to.label ?? " "
            }, `label-${seq}`, false, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `fig-pop text-5xl font-semibold tabular-nums leading-tight sm:text-6xl lg:text-7xl ${tone}`,
                "aria-live": "off",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative inline-block",
                    children: [
                        shown !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "aria-hidden": "true",
                            className: `fig-marker absolute inset-x-0 -bottom-[0.05em] h-[0.12em] rounded-full ${negative ? "bg-coral/45" : "bg-sun"}`
                        }, void 0, false, {
                            fileName: "[project]/components/stage.tsx",
                            lineNumber: 57,
                            columnNumber: 30
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative",
                            children: shown === null ? "\u2013" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swiss"])(shown)
                        }, void 0, false, {
                            fileName: "[project]/components/stage.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/stage.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            }, `number-${seq}`, false, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/stage.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_s(FigureCounter, "PNPeSC97ppWRpkQTI/ETjUlX3iY=");
_c = FigureCounter;
function Stage({ world, figure, pausedAt, status }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Stage",
        className: "rounded-2xl border border-line bg-surface p-5 shadow-card md:flex md:h-full md:min-h-0 md:flex-col md:p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FigureCounter, {
                change: figure
            }, void 0, false, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 h-60 w-full overflow-hidden sm:h-80 md:h-auto md:min-h-0 md:flex-1",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$stage$2d$canvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StageCanvas"], {
                    world: world
                }, void 0, false, {
                    fileName: "[project]/components/stage.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex min-h-[1.75rem] shrink-0 items-center justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "shrink-0 text-xs text-faint",
                        children: "1 note = CHF 100"
                    }, void 0, false, {
                        fileName: "[project]/components/stage.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-w-0 flex-wrap items-center justify-end gap-2",
                        children: [
                            pausedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full bg-saved/10 px-3 py-1 text-xs font-medium text-saved-ink",
                                children: `↩ Paused at ${pausedAt}`
                            }, void 0, false, {
                                fileName: "[project]/components/stage.tsx",
                                lineNumber: 75,
                                columnNumber: 24
                            }, this),
                            status
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/stage.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/stage.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/stage.tsx",
        lineNumber: 67,
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
"[project]/components/theme-toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeToggle",
    ()=>ThemeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ThemeToggle({ className }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("light");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeToggle.useEffect": ()=>setMode((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentTheme"])())
    }["ThemeToggle.useEffect"], []);
    const toggle = ()=>{
        const next = mode === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
            window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_STORAGE_KEY"], next);
        } catch  {
        // Private mode or blocked storage: the look still switches for this visit.
        }
        setMode(next);
        window.dispatchEvent(new CustomEvent(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_EVENT"], {
            detail: next
        }));
    };
    const dark = mode === "dark";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: className,
        "aria-pressed": dark,
        "aria-label": dark ? "Switch to the light look" : "Switch to the dark look, for projectors",
        title: dark ? "Light look" : "Dark look (projector)",
        onClick: toggle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: dark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "12",
                        cy: "12",
                        r: "4"
                    }, void 0, false, {
                        fileName: "[project]/components/theme-toggle.tsx",
                        lineNumber: 32,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                    }, void 0, false, {
                        fileName: "[project]/components/theme-toggle.tsx",
                        lineNumber: 33,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/theme-toggle.tsx",
                lineNumber: 31,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11z"
            }, void 0, false, {
                fileName: "[project]/components/theme-toggle.tsx",
                lineNumber: 36,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/theme-toggle.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/theme-toggle.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(ThemeToggle, "qqGqSz4bBmczl08gomeJvvpne7Y=");
_c = ThemeToggle;
var _c;
__turbopack_context__.k.register(_c, "ThemeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Colours shared by canvas drawing (CSS uses the same values through the --c-* variables in app/globals.css).
 * TellHorn brand: sun yellow (#ffcc00) and deep teal (#004b5a), taken from the logo.
 * Brand colours are chrome only (header, buttons, progress, neutral grains); data keeps its own meaning:
 * amber = spending, coral = only missing/negative, green = only saved/left over.
 *
 * Two looks: "light" (white stage, teal grains) and "dark" (deep teal stage, cream grains) for projectors.
 * `theme` is mutable on purpose: the canvas reads it every frame, so switching the look needs no reload
 * (client/world/skin.ts applies a look to everything that was derived from it).
 */ __turbopack_context__.s([
    "THEMES",
    ()=>THEMES,
    "THEME_EVENT",
    ()=>THEME_EVENT,
    "THEME_STORAGE_KEY",
    ()=>THEME_STORAGE_KEY,
    "currentTheme",
    ()=>currentTheme,
    "readTheme",
    ()=>readTheme,
    "theme",
    ()=>theme
]);
const THEMES = {
    light: {
        canvas: "#fbf8ec",
        surface: "#ffffff",
        paper: "#004b5a",
        soft: "#3f6670",
        faint: "#5c7c84",
        spend: "#e08d12",
        coral: "#ec615c",
        saved: "#2fa36b",
        sun: "#ffcc00",
        brand: "#ffcc00"
    },
    dark: {
        canvas: "#00262e",
        surface: "#00323d",
        paper: "#f3efdc",
        soft: "#b5cdd1",
        faint: "#8fb0b6",
        spend: "#f0a43a",
        coral: "#ff7a73",
        saved: "#43c48a",
        sun: "#ffcc00",
        brand: "#ffcc00"
    }
};
const theme = {
    ...THEMES.light
};
const THEME_STORAGE_KEY = "tellhorn-theme";
const THEME_EVENT = "tellhorn-theme";
function readTheme() {
    try {
        return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
    } catch  {
        return "light";
    }
}
function currentTheme() {
    return typeof document !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/transcript.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Transcript",
    ()=>Transcript
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
/** Short connecting lines ("Let me check.", "Back to the start") read quieter than real answers. */ const QUIET = [
    "filler",
    "bridge",
    "failure"
];
function AdvisorLine({ kind, words, cueIndices, spoken, live }) {
    const cues = new Set(cueIndices);
    const quiet = QUIET.includes(kind);
    // A finished line shows only what was actually said, and a dots mark when it was cut short.
    const interrupted = !live && spoken < words.length;
    const shown = live ? words : words.slice(0, Math.max(spoken, 1));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: quiet ? "pl-3 text-sm italic leading-6 text-faint" : "border-l-2 border-sun-deep pl-3 text-[15px] leading-6 text-ink sm:text-base sm:leading-7",
        children: [
            shown.map((word, index)=>{
                const reached = !live || index < spoken;
                const color = !reached ? "text-faint/55" : cues.has(index) && !quiet ? "text-spend-ink" : "";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `transition-colors duration-150 ${color}`,
                    children: [
                        word,
                        " "
                    ]
                }, index, true, {
                    fileName: "[project]/components/transcript.tsx",
                    lineNumber: 29,
                    columnNumber: 11
                }, this);
            }),
            interrupted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-faint",
                children: "…"
            }, void 0, false, {
                fileName: "[project]/components/transcript.tsx",
                lineNumber: 34,
                columnNumber: 23
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/transcript.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_c = AdvisorLine;
function Transcript({ log, line, lineKind }) {
    _s();
    const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const follow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Transcript.useEffect": ()=>{
            const el = box.current;
            if (el && follow.current) el.scrollTo({
                top: el.scrollHeight
            });
        }
    }["Transcript.useEffect"], [
        log.length,
        line?.spoken,
        line?.words
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Conversation",
        className: "rounded-2xl border border-line bg-surface shadow-card md:flex md:min-h-0 md:flex-1 md:flex-col",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: box,
            role: "log",
            "aria-live": "polite",
            onScroll: (event)=>{
                const el = event.currentTarget;
                follow.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
            },
            className: "max-h-[17rem] min-h-[7rem] space-y-3 overflow-y-auto px-4 py-4 md:max-h-none md:min-h-0 md:flex-1",
            children: [
                log.map((entry)=>entry.role === "user" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "max-w-[85%] rounded-2xl rounded-br-md bg-sun px-3.5 py-2 text-sm font-medium leading-5 text-on-sun",
                            children: entry.text
                        }, void 0, false, {
                            fileName: "[project]/components/transcript.tsx",
                            lineNumber: 67,
                            columnNumber: 15
                        }, this)
                    }, entry.id, false, {
                        fileName: "[project]/components/transcript.tsx",
                        lineNumber: 66,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdvisorLine, {
                        kind: entry.kind,
                        words: entry.words,
                        cueIndices: entry.cueIndices,
                        spoken: entry.spoken,
                        live: false
                    }, entry.id, false, {
                        fileName: "[project]/components/transcript.tsx",
                        lineNumber: 70,
                        columnNumber: 13
                    }, this)),
                line && lineKind && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AdvisorLine, {
                    kind: lineKind,
                    words: line.words,
                    cueIndices: line.cueIndices,
                    spoken: line.spoken,
                    live: true
                }, void 0, false, {
                    fileName: "[project]/components/transcript.tsx",
                    lineNumber: 73,
                    columnNumber: 30
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/transcript.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/transcript.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(Transcript, "SLBV+YXydGAwMxo3K7E/HUUBRGU=");
_c1 = Transcript;
var _c, _c1;
__turbopack_context__.k.register(_c, "AdvisorLine");
__turbopack_context__.k.register(_c1, "Transcript");
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
 * The world is the grain world (client/world); <StageCanvas> in stage.tsx hosts its canvas.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/client/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$conversation$2f$state$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/conversation/state.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$player$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/player/voice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/content/scripts.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$grain$2d$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/grain-world.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$skin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/world/skin.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$keepsake$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/keepsake.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
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
    lineKind: null,
    log: [],
    seq: 0,
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
    question: null,
    points: [],
    slip: null,
    error: null
};
/** Moves the line being spoken into the log (interrupted lines keep how far they got). */ function archived(state) {
    if (!state.line || !state.lineKind) return {
        log: state.log,
        seq: state.seq,
        line: null,
        lineKind: null
    };
    const entry = {
        id: state.seq,
        role: "advisor",
        kind: state.lineKind,
        words: state.line.words,
        cueIndices: state.line.cueIndices,
        spoken: state.line.spoken
    };
    return {
        log: [
            ...state.log,
            entry
        ],
        seq: state.seq + 1,
        line: null,
        lineKind: null
    };
}
function reducer(state, action) {
    // Starting over keeps the conversation on screen: only the presentation state is reset.
    if (action.type === "reset") return {
        ...initialState,
        ...archived(state),
        figure: {
            seq: state.figure.seq + 1,
            from: null,
            to: OPENING_FIGURE
        }
    };
    if (action.type === "user") {
        const done = archived(state);
        return {
            ...state,
            ...done,
            log: [
                ...done.log,
                {
                    id: done.seq,
                    role: "user",
                    text: action.text
                }
            ],
            seq: done.seq + 1
        };
    }
    if (action.type === "confirmed") return {
        ...state,
        offerConfirmed: true
    };
    if (action.type === "closeSlip") return {
        ...state,
        slip: null
    };
    const event = action.event;
    const slip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$keepsake$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keepReducer"])(state.slip, event);
    if (slip !== state.slip) state = {
        ...state,
        slip
    };
    switch(event.type){
        case "line":
            {
                const step = event.beatIndex !== null && event.beatCount !== null ? {
                    index: event.beatIndex,
                    count: event.beatCount
                } : null;
                return {
                    ...state,
                    ...archived(state),
                    line: {
                        words: event.words,
                        cueIndices: event.cueIndices,
                        spoken: 0
                    },
                    lineKind: event.kind,
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
        case "question":
            return {
                ...state,
                question: event.question
            };
        case "openPoints":
            return {
                ...state,
                points: event.points
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
        "useAdvisor.useMemo[world]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$grain$2d$world$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GrainWorld"]()
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
    // The canvas keeps its own colours: apply the saved look once, then follow the toggle (no reload, grains recolour in place).
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdvisor.useEffect": ()=>{
            world.recolor((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$skin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applySkin"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currentTheme"])()));
            const onTheme = {
                "useAdvisor.useEffect.onTheme": (event)=>world.recolor((0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$world$2f$skin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applySkin"])(event.detail))
            }["useAdvisor.useEffect.onTheme"];
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_EVENT"], onTheme);
            return ({
                "useAdvisor.useEffect": ()=>window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["THEME_EVENT"], onTheme)
            })["useAdvisor.useEffect"];
        }
    }["useAdvisor.useEffect"], [
        world
    ]);
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
            const recalls = __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAIN"].flatMap({
                "useAdvisor.useEffect.recalls": (beat)=>beat.question?.answers.flatMap({
                        "useAdvisor.useEffect.recalls": (a)=>a.recall ? [
                                a.recall
                            ] : []
                    }["useAdvisor.useEffect.recalls"]) ?? []
            }["useAdvisor.useEffect.recalls"]);
            void speaker.preload([
                ...__TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["MAIN"].map({
                    "useAdvisor.useEffect": (beat)=>beat.say
                }["useAdvisor.useEffect"]),
                ...recalls
            ]).then({
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
            // Synchronously inside the tap: unlock audio and speech for iOS Safari before any await.
            voice.current?.unlock();
            world.reset();
            dispatch({
                type: "reset"
            });
            void engine.current?.start();
        }
    }["useAdvisor.useCallback[start]"], [
        world
    ]);
    /** `invite`: the Stop button (never the mic) may say a short "Yes?". */ const interrupt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[interrupt]": (invite)=>engine.current?.interrupt(invite === true)
    }["useAdvisor.useCallback[interrupt]"], []);
    /** Any typed, spoken or chip text; the engine classifies it (continue / wait / end / question). */ const say = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[say]": (text)=>{
            dispatch({
                type: "user",
                text
            });
            void engine.current?.input(text);
        }
    }["useAdvisor.useCallback[say]"], []);
    const resume = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[resume]": ()=>{
            dispatch({
                type: "user",
                text: "OK, let's continue"
            });
            void engine.current?.resume();
        }
    }["useAdvisor.useCallback[resume]"], []);
    const question = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    question.current = state.question;
    /** Without `subject`: the question being asked now. With it: any open point, recorded without touching playback. */ const answer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[answer]": (id, subject)=>{
            // Only the question being asked now is written into the conversation; open points show their answer in their own card.
            if (!subject) {
                const label = question.current?.answers.find({
                    "useAdvisor.useCallback[answer]": (a)=>a.id === id
                }["useAdvisor.useCallback[answer]"])?.label;
                if (label) dispatch({
                    type: "user",
                    text: label
                });
            }
            void engine.current?.answer(id, subject);
        }
    }["useAdvisor.useCallback[answer]"], []);
    /** "Forget my answers": deletes the saved answers; the points turn unanswered. Playback goes on. */ const forget = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[forget]": ()=>void engine.current?.forget()
    }["useAdvisor.useCallback[forget]"], []);
    const confirmOffer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[confirmOffer]": ()=>{
            engine.current?.confirmOffer(OFFER_JAR, OFFER_FIGURE);
            dispatch({
                type: "confirmed"
            });
        }
    }["useAdvisor.useCallback[confirmOffer]"], []);
    const closeSlip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[closeSlip]": ()=>dispatch({
                type: "closeSlip"
            })
    }["useAdvisor.useCallback[closeSlip]"], []);
    const setSound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useAdvisor.useCallback[setSound]": (on)=>{
            setSoundState(on);
            voice.current?.setMuted(!on);
        }
    }["useAdvisor.useCallback[setSound]"], []);
    return {
        mode: state.mode,
        line: state.line,
        lineKind: state.lineKind,
        log: state.log,
        figure: state.figure,
        mainStep: state.main,
        sideStep: state.side,
        snapshot: state.snapshot,
        playing: state.playing,
        offer: state.offer,
        offerConfirmed: state.offerConfirmed,
        question: state.question,
        points: state.points,
        slip: state.slip,
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
        answer,
        forget,
        confirmOffer,
        closeSlip,
        setSound
    };
}
_s(useAdvisor, "mLRcyzCsHH3np298BO1RytdQg60=");
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
"[project]/components/welcome.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STARTER_QUESTIONS",
    ()=>STARTER_QUESTIONS,
    "Welcome",
    ()=>Welcome
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/content/scripts.ts [app-client] (ecmascript) <locals>");
"use client";
;
;
const STARTER_QUESTIONS = [
    {
        text: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["SAVE_EXAMPLE"],
        hint: "A plan you can keep, step by step",
        icon: "save"
    },
    {
        text: "What are my spending habits?",
        hint: "The patterns in your year",
        icon: "habits"
    },
    {
        text: "Why is September so high?",
        hint: "The tallest month, opened up",
        icon: "month"
    },
    {
        text: __TURBOPACK__imported__module__$5b$project$5d2f$content$2f$scripts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["AFFORD_EXAMPLE"],
        hint: "Replays last year with it",
        icon: "buy"
    }
];
const icons = {
    save: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 3v18"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M17 7.5c0-1.9-2.2-3-5-3s-5 1.1-5 3 2 2.6 5 3.2 5 1.3 5 3.3-2.2 3-5 3-5-1.1-5-3"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/welcome.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    habits: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 20V10"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 20V4"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 20v-7"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M22 20H2"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/welcome.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    month: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3.5",
                y: "5",
                width: "17",
                height: "15",
                rx: "2.5"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.5 10h17"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 3v4M16 3v4"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/welcome.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)),
    buy: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 7h14l-1.6 8.2a2 2 0 0 1-2 1.6H9.4a2 2 0 0 1-2-1.6L5.5 4H3"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10",
                cy: "20",
                r: "1.2"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "17",
                cy: "20",
                r: "1.2"
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/welcome.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0))
};
function Icon({ name }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.9",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: icons[name]
    }, void 0, false, {
        fileName: "[project]/components/welcome.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_c = Icon;
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
function Welcome({ onSay, onStart }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "aria-label": "Welcome",
        className: "flex min-h-0 flex-col gap-4 md:flex-1 md:overflow-y-auto md:pr-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold leading-tight tracking-tight text-ink md:text-[1.7rem]",
                        children: "What would you like to know?"
                    }, void 0, false, {
                        fileName: "[project]/components/welcome.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 text-sm leading-6 text-soft",
                        children: "Ask by voice or text. I answer from your own bookings, and every number comes from your data."
                    }, void 0, false, {
                        fileName: "[project]/components/welcome.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "grid gap-2.5 sm:grid-cols-2",
                children: STARTER_QUESTIONS.map((question)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onSay(question.text),
                            className: `group flex h-full w-full items-start gap-3 rounded-2xl border border-line bg-surface p-3.5 text-left shadow-card transition-colors hover:border-brand/40 hover:bg-sun-soft ${focusRing}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sun text-on-sun transition-transform group-hover:scale-105",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        name: question.icon
                                    }, void 0, false, {
                                        fileName: "[project]/components/welcome.tsx",
                                        lineNumber: 78,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/welcome.tsx",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-semibold leading-5 text-ink",
                                            children: question.text
                                        }, void 0, false, {
                                            fileName: "[project]/components/welcome.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mt-0.5 block text-xs leading-4 text-faint",
                                            children: question.hint
                                        }, void 0, false, {
                                            fileName: "[project]/components/welcome.tsx",
                                            lineNumber: 82,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/welcome.tsx",
                                    lineNumber: 80,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/welcome.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this)
                    }, question.text, false, {
                        fileName: "[project]/components/welcome.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-x-4 gap-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onStart,
                        className: `rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand shadow-sm shadow-brand/25 transition-colors hover:bg-brand-dark ${focusRing}`,
                        children: "Walk me through my year"
                    }, void 0, false, {
                        fileName: "[project]/components/welcome.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-faint",
                        children: "or tap the microphone and just ask"
                    }, void 0, false, {
                        fileName: "[project]/components/welcome.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/welcome.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/welcome.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c1 = Welcome;
var _c, _c1;
__turbopack_context__.k.register(_c, "Icon");
__turbopack_context__.k.register(_c1, "Welcome");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/content/scripts.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AFFORD_ASK_AMOUNT_LINE",
    ()=>AFFORD_ASK_AMOUNT_LINE,
    "AFFORD_EXAMPLE",
    ()=>AFFORD_EXAMPLE,
    "BACKUP_NO_ANSWER_LINE",
    ()=>BACKUP_NO_ANSWER_LINE,
    "CLOSING_LINES",
    ()=>CLOSING_LINES,
    "FINISHED_LINE",
    ()=>FINISHED_LINE,
    "FIXED_LINES",
    ()=>FIXED_LINES,
    "INVITE_LINES",
    ()=>INVITE_LINES,
    "MAIN",
    ()=>MAIN,
    "NOT_UNDERSTOOD_LINE",
    ()=>NOT_UNDERSTOOD_LINE,
    "OFFER_CONFIRMED_LINE",
    ()=>OFFER_CONFIRMED_LINE,
    "REENTRY_LINES",
    ()=>REENTRY_LINES,
    "SAVE_EXAMPLE",
    ()=>SAVE_EXAMPLE,
    "SIDE_ANSWERS",
    ()=>SIDE_ANSWERS,
    "affordExampleScripts",
    ()=>affordExampleScripts,
    "affordScript",
    ()=>affordScript,
    "allLines",
    ()=>allLines,
    "saveKeepsake",
    ()=>saveKeepsake,
    "saveScript",
    ()=>saveScript,
    "sideScripts",
    ()=>sideScripts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$afford$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/afford.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$savings$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/savings-plan.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/contracts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$facts$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/public/facts.json.[json].cjs [app-client] (ecmascript)");
;
;
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
        say: "This is your 2025, Jeanine: 97,032 francs came in, and each banknote is a hundred francs.",
        scene: {
            type: "galaxy"
        },
        figure: {
            label: "Income in 2025",
            value: 97032
        },
        bridge: "We had just started with your year as a whole."
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
        bridge: "We were looking at your twelve months of spending."
    },
    {
        say: "I see no groceries or cash withdrawals here; do you shop from another account or card?",
        scene: {
            type: "monthly"
        },
        cues: [
            {
                word: "groceries"
            },
            {
                word: "account"
            }
        ],
        bridge: "I had asked whether these accounts are everything.",
        question: {
            subject: "accounts_complete",
            label: "Other accounts or cards",
            assume: "I treat what's left each month as an upper bound, since some spending may be paid another way.",
            answers: [
                {
                    id: "has_other",
                    label: "Yes, I have another account",
                    kind: "yes",
                    recall: "I see no groceries or cash withdrawals here, and you told me you use another account."
                },
                {
                    id: "complete",
                    label: "No, this is everything",
                    kind: "no",
                    recall: "I see no groceries or cash withdrawals here, and you told me this account covers everything."
                }
            ]
        }
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
        bridge: "We were talking about your summer months."
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
        bridge: "We were looking at where the money went."
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
        bridge: "We were following the balance of your account."
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
        bridge: "We were at the February payment I could not find.",
        question: {
            subject: "missing_payment:Krankenkasse:2025-02",
            label: "February health insurance",
            assume: "I don't count it as missed; February simply shows no payment here.",
            answers: [
                {
                    id: "paid_elsewhere",
                    label: "Yes, from another account",
                    kind: "yes",
                    recall: "February's 982 francs health insurance is not in these accounts; you told me another account paid it."
                },
                {
                    id: "missed",
                    label: "No, it was missed",
                    kind: "no",
                    recall: "February's 982 francs health insurance is not in these accounts; you told me it was missed."
                }
            ]
        }
    },
    {
        say: "I see three tax payments, 630 francs in all; is tax taken from your salary or paid elsewhere?",
        scene: {
            type: "pools"
        },
        cues: [
            {
                word: "tax",
                target: "Tax",
                figure: {
                    label: "Tax paid in 2025",
                    value: 630
                }
            }
        ],
        bridge: "I had asked about your tax payments.",
        question: {
            subject: "tax_provision",
            label: "How tax is paid",
            assume: "I only count the tax payments I can see and never estimate what you owe.",
            answers: [
                {
                    id: "handled_elsewhere",
                    label: "Yes, it is handled elsewhere",
                    kind: "yes",
                    recall: "I see three tax payments, 630 francs in all; you told me your tax is handled elsewhere."
                },
                {
                    id: "not_yet",
                    label: "No, not yet",
                    kind: "no",
                    recall: "I see three tax payments, 630 francs in all; you told me it is not settled yet."
                }
            ]
        }
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
        bridge: "We were looking at what did not start this year.",
        question: {
            subject: "no_pillar_3a",
            label: "Pillar 3a and savings",
            assume: "Until you tell me, I keep the pillar 3a option in the plan.",
            answers: [
                {
                    id: "has_elsewhere",
                    label: "Yes, at another bank",
                    kind: "yes",
                    skipOffer: true,
                    recall: "I see no pillar 3a payment or savings transfer; you told me they are at another bank."
                },
                {
                    id: "none",
                    label: "No, I have none",
                    kind: "no",
                    recall: "I see no pillar 3a payment or savings transfer; you told me you have none yet."
                }
            ]
        }
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
        bridge: "I was about to show you one option."
    }
];
const asks = (pattern)=>(question)=>pattern.test(question.toLocaleLowerCase("en"));
/**
 * A month question the fixed month story does not answer: an amount, a merchant ("at Digitec"), a day, the card bill,
 * a category, saving or what comes next. "Why was June so high?" stays with the fixed story.
 */ const beyondMonthStory = asks(/\bhow\s+(much|many|often)\b|(?<!\blook\s)\bat\s+(?!all\b)\w|\bon\s+(the\s+)?\d|\b(between|before|after|until|since|when|compared?|versus|vs|card|bill|statement|budget|forecast|next|subscriptions?|recurring|regular|fixed|sav(e|ing|ings)|cut|afford|refund(s|ed)?|travel|trips?|flights?|cloth(es|ing)|food|restaurants?|rent|insurance|tax(es)?)\b/);
const AFFORD_EXAMPLE = "Can I afford a 3,000 franc laptop?";
const AFFORD_ASK_AMOUNT_LINE = "How much is it?";
const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const daily = facts.private_balance_daily.map(([date, balance])=>({
        date,
        balance
    }));
const francs = (value)=>Math.round(Math.abs(value)).toLocaleString("en-US");
function affordScript(amount, month = null) {
    const kept = facts.afford_example;
    if (!kept) return [
        {
            say: AFFORD_ASK_AMOUNT_LINE,
            scene: {
                type: "level"
            }
        }
    ];
    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$afford$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureAgainstSurplus"])(amount, kept);
    const price = francs(amount);
    const perMonth = francs(m.monthlySurplus);
    const ordinaryMonths = m.monthsOfSurplus === null ? null : m.monthsOfSurplus < 1 ? "less than one ordinary month" : m.monthsOfSurplus === 1 ? "about one ordinary month" : `about ${m.monthsOfSurplus} ordinary months`;
    const thirteenth = {
        word: "thirteenth",
        target: "13"
    };
    let script;
    if (m.tier === 1) {
        script = [
            {
                say: `In these accounts you kept about ${perMonth} francs a month last year, without the thirteenth salary.`,
                scene: {
                    type: "level"
                }
            },
            {
                say: `So ${price} francs is ${ordinaryMonths} of that, and it fits without December's extra salary.`,
                scene: {
                    type: "level"
                }
            }
        ];
    } else if (m.tier === 2) {
        script = [
            ordinaryMonths === null ? {
                say: "In these accounts, ordinary months left nothing over last year; only the thirteenth salary did.",
                scene: {
                    type: "level"
                },
                cues: [
                    thirteenth
                ]
            } : {
                say: `In these accounts, ${price} francs is ${ordinaryMonths} of what you kept, ${perMonth} a month.`,
                scene: {
                    type: "level"
                }
            },
            {
                say: `With December's thirteenth salary it is covered, and ${francs(m.leftOfYearNet)} francs of the year's surplus remain.`,
                scene: {
                    type: "level",
                    focus: 12
                },
                cues: [
                    thirteenth
                ]
            }
        ];
    } else {
        script = [
            {
                say: `In these accounts, the whole of last year left you ${francs(kept.yearNet)} francs, thirteenth salary included.`,
                scene: {
                    type: "level"
                }
            },
            {
                say: `So ${price} francs is ${francs(m.aboveYearNet)} francs more than everything you kept last year.`,
                scene: {
                    type: "level"
                }
            }
        ];
    }
    if (month === null) {
        if (m.tier === 2) script.push({
            say: "Bought before December, it would lower your balance until the thirteenth salary arrives.",
            scene: {
                type: "level",
                focus: 12
            }
        });
        return script;
    }
    if (month < 12) {
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$afford$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replayPurchase"])(daily, amount, month, facts.card_payment_dates);
        const lowMonth = Number(r.newLowest.date.slice(5, 7));
        const bought = MONTH_NAMES[month - 1];
        if (r.newLowest.balance < 0) {
            script.push({
                say: `Paid in ${bought}, it would have taken last year's balance to ${francs(r.newLowest.balance)} francs below its start by ${MONTH_NAMES[lowMonth - 1]}.`,
                scene: {
                    type: "level",
                    focus: lowMonth
                },
                cues: [
                    {
                        word: bought,
                        target: month
                    },
                    {
                        word: francs(r.newLowest.balance),
                        target: lowMonth,
                        figure: {
                            label: "Lowest point with the purchase, compared with the start",
                            value: Math.round(r.newLowest.balance)
                        }
                    }
                ]
            });
        }
    }
    return script;
}
const affordAnswer = {
    id: "afford",
    lead: [
        "Let's test that against your year."
    ],
    examples: ()=>affordExampleScripts(),
    match: (question)=>/\b(afford|can i (buy|spend))\b/i.test(question) || /^\s*(about\s+)?[\d.,'’]+\s*(k|thousand)?\s*(francs?|chf)?\s*[.?!]?\s*$/i.test(question),
    script: (question)=>{
        const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$afford$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAmount"])(question);
        if (amount === null) return [
            {
                say: AFFORD_ASK_AMOUNT_LINE,
                scene: {
                    type: "level"
                }
            }
        ];
        return affordScript(amount, (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$afford$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMonth"])(question));
    }
};
const affordExampleScripts = ()=>[
        affordScript((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$afford$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAmount"])(AFFORD_EXAMPLE))
    ];
const sideScripts = (answer)=>typeof answer.script === "function" ? answer.examples?.() ?? [] : [
        answer.script
    ];
const SAVE_EXAMPLE = "How can I save 100 francs a month?";
const SAVE_QUESTION = /\b(save|saving|spend\s+less|cut|reduce|lower|put\s+aside|set\s+aside)\b/i;
/** What one purchase is called, singular and plural; other merchants are named as they are. */ const PURCHASE_NAMES = {
    "Kantine AG": [
        "canteen lunch",
        "canteen lunches"
    ],
    "Orell Fuessli": [
        "Orell Fuessli purchase",
        "Orell Fuessli purchases"
    ]
};
const oneOffs = facts.insights.find((i)=>i.id === "one_off_pot")?.figures;
/** A target that is really an amount of money: "3a" and tiny numbers are not. */ function saveTarget(question) {
    const amount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$afford$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAmount"])(question.replace(/\b3a\b/gi, ""));
    return amount !== null && amount >= 20 ? amount : null;
}
const purchaseName = (merchant)=>PURCHASE_NAMES[merchant] ?? [
        `${merchant} purchase`,
        `${merchant} purchases`
    ];
/** Subscriptions she could cancel and payments worth comparing, from the recurring payments and the merchant tags (lib/facts.ts). */ const cancellable = facts.savings.cancel ?? [];
const switchable = facts.savings.switch ?? [];
/** Below this a cancellation is called small, plainly. */ const SMALL_MONTHLY = 50;
const capital = (text)=>text.charAt(0).toUpperCase() + text.slice(1);
const cancelName = (merchant)=>cancellable.find((c)=>c.merchant === merchant)?.name ?? merchant;
const planFor = (target)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$savings$2d$plan$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savingsPlan"])(target, facts.savings.habits, facts.savings.months, facts.savings.excluded, cancellable);
function saveKeepsake(target) {
    const plan = planFor(target);
    return {
        kind: "savings",
        plan,
        names: plan.cuts.map((cut)=>cut.kind === "cancel" ? `Cancel ${cancelName(cut.merchant)}` : purchaseName(cut.merchant)[1])
    };
}
function saveScript(target) {
    const plan = planFor(target);
    const script = plan.cuts.map((cut)=>{
        if (cut.kind === "cancel") {
            const name = cancelName(cut.merchant);
            return {
                say: `Cancelling ${name}, if you rarely use it, saves ${francs(cut.saves)} francs a month${cut.saves < SMALL_MONTHLY ? ": small, but one decision" : ""}.`,
                scene: {
                    type: "pools",
                    focus: cut.group
                },
                cues: [
                    {
                        word: name.split(" ")[0],
                        target: cut.group,
                        figure: {
                            label: `Saved a month: cancel ${name}`,
                            value: cut.saves
                        }
                    }
                ]
            };
        }
        const [one, many] = purchaseName(cut.merchant);
        const cueWord = (cut.fewer === 1 ? one : many).split(" ")[0];
        return {
            say: `${cut.fewer} fewer ${cut.fewer === 1 ? one : many} a month, of your usual ${cut.usualPerMonth}, saves about ${francs(cut.saves)} francs.`,
            scene: {
                type: "pools",
                focus: cut.group
            },
            cues: [
                {
                    word: cueWord,
                    target: cut.group,
                    figure: {
                        label: `Saved a month: ${one}`,
                        value: cut.saves
                    }
                }
            ]
        };
    });
    if (plan.cuts.length && plan.shortfall === 0) {
        script.push({
            say: `Together that is about ${francs(plan.monthly)} francs a month, or ${francs(plan.yearly)} over a year.`,
            scene: {
                type: "pools"
            },
            cues: [
                {
                    word: "month",
                    figure: {
                        label: "Saved a month",
                        value: plan.monthly
                    }
                }
            ]
        });
        return script;
    }
    script.push({
        say: `These changes give about ${francs(plan.reachable)} francs a month at most, not ${francs(target)}.`,
        scene: {
            type: "pools"
        },
        cues: [
            {
                word: "changes",
                figure: {
                    label: "From these changes, a month",
                    value: plan.reachable
                }
            }
        ]
    });
    const compare = switchable[0];
    if (compare) {
        // We do not know market prices: what it costs, never what switching would save.
        script.push({
            say: `Beyond that, your ${compare.name} at ${francs(compare.costsMonthly)} francs a month is worth comparing for a cheaper option.`,
            scene: {
                type: "pools",
                focus: compare.group
            },
            cues: [
                {
                    word: compare.name.split(" ")[0],
                    target: compare.group,
                    figure: {
                        label: `${capital(compare.name)} a month`,
                        value: compare.costsMonthly
                    }
                }
            ]
        });
    }
    if (oneOffs?.oneOffTotal && oneOffs.purchases) {
        script.push({
            say: `The rest would come from big purchases: ${oneOffs.purchases} of them cost ${francs(oneOffs.oneOffTotal)} francs last year.`,
            scene: {
                type: "monthly"
            },
            cues: [
                {
                    word: "purchases",
                    figure: {
                        label: "Big one-off purchases in 2025",
                        value: Math.round(oneOffs.oneOffTotal)
                    }
                }
            ]
        });
    }
    return script;
}
/**
 * "How can I save money?": something she could do first, never statistics. The cancel and switch beats are built
 * from facts.savings (the largest subscription, then up to two payments worth comparing, largest first; never a
 * saving figure for a switch), then the repeated habits, then the one option, last.
 */ function saveAdviceScript() {
    const script = [];
    const drop = cancellable[0];
    if (drop) {
        script.push({
            say: `If you rarely use ${drop.name}, cancelling it saves ${francs(drop.savesMonthly)} francs a month, ${francs(drop.savesYearly)} a year${drop.savesMonthly < SMALL_MONTHLY ? ": small, but simple" : ""}.`,
            scene: {
                type: "pools",
                focus: drop.group
            },
            cues: [
                {
                    word: drop.name.split(" ")[0],
                    target: drop.group,
                    figure: {
                        label: `${capital(drop.name)} a month`,
                        value: drop.savesMonthly
                    }
                },
                {
                    word: francs(drop.savesYearly),
                    figure: {
                        label: `Saved a year: cancel ${drop.name}`,
                        value: drop.savesYearly
                    }
                }
            ]
        });
    }
    const [first, second] = switchable;
    if (first) {
        const lead = {
            word: first.name.split(" ")[0],
            target: first.group,
            figure: {
                label: `${capital(first.name)} a month`,
                value: first.costsMonthly
            }
        };
        script.push(second ? {
            say: `Your ${first.name} costs ${francs(first.costsMonthly)} francs a month, your ${second.name} ${francs(second.costsMonthly)}; comparing offers could lower both.`,
            scene: {
                type: "pools",
                focus: first.group
            },
            cues: [
                lead,
                {
                    word: second.name.split(" ")[0],
                    target: second.group,
                    figure: {
                        label: `${capital(second.name)} a month`,
                        value: second.costsMonthly
                    }
                }
            ]
        } : {
            say: `Your ${first.name} costs ${francs(first.costsMonthly)} francs a month; ${first.how} could bring that down.`,
            scene: {
                type: "pools",
                focus: first.group
            },
            cues: [
                lead
            ]
        });
    }
    script.push({
        say: "You could also cut back a little: the canteen cost 1,616 francs, Orell Fuessli 1,747 this year.",
        scene: {
            type: "pools",
            focus: "Food and drink"
        },
        cues: [
            {
                word: "canteen",
                target: "Food and drink",
                figure: {
                    label: "Canteen in 2025",
                    value: 1616
                }
            },
            {
                word: "Orell",
                target: "Online shopping",
                figure: {
                    label: "Orell Fuessli in 2025",
                    value: 1747
                }
            }
        ]
    }, {
        say: "If you have no 3a yet, 200 francs a month into pillar 3a makes 2,400 in a year.",
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
        offer: true
    });
    return script;
}
const saveTargetAnswer = {
    id: "save-target",
    lead: [
        "Let's see where that could come from."
    ],
    match: (question)=>SAVE_QUESTION.test(question) && saveTarget(question) !== null,
    script: (question)=>saveScript(saveTarget(question)),
    examples: ()=>[
            saveScript(saveTarget(SAVE_EXAMPLE))
        ],
    keep: (question)=>saveKeepsake(saveTarget(question))
};
const SIDE_ANSWERS = [
    affordAnswer,
    saveTargetAnswer,
    {
        id: "june",
        lead: [
            "Sure, let's look at June.",
            "June, yes, good question."
        ],
        match: asks(/\bjun(e)?\b/),
        live: beyondMonthStory,
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
                say: "The bike alone took your card past its monthly budget of 3,600 francs.",
                scene: {
                    type: "monthly",
                    focus: 6
                },
                cues: [
                    {
                        word: "card",
                        target: "Bike",
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
        lead: [
            "Sure, let's look at July.",
            "July, yes, let me show you."
        ],
        match: asks(/\bjul(y)?\b/),
        live: beyondMonthStory,
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
                say: "Then clothing added 1,136 francs, and health insurance 982.",
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
        lead: [
            "Ah, September, the tall one.",
            "Good eye, let's look at September."
        ],
        match: asks(/\bsep(t|tember)?\b/),
        live: beyondMonthStory,
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
        lead: [
            "Sure, let's look at November.",
            "November, yes, let me show you."
        ],
        match: asks(/\bnov(ember)?\b/),
        live: beyondMonthStory,
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
                say: "The largest part was Apple, with 3,189 francs.",
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
    },
    {
        // Savings advice: a subscription to cancel, payments worth comparing, the habits, then the one option (touch-confirmed).
        id: "save",
        lead: [
            "Happy to, let's look for room together."
        ],
        match: asks(/\bhow\s+(can|could|do|should|would)\s+i\s+(save|spend\s+less|cut|put\s+aside|set\s+aside)|\b(save|saving)\s+(more\s+|some\s+)?money\b|\bwhere\s+(can|could|should)\s+i\s+(cut|save|spend\s+less|reduce)|\bwhat\s+(can|could|should)\s+i\s+do\s+(better|differently)|\b(cut|reduce|lower)\s+(down\s+)?(my\s+)?(spending|costs|expenses)\b|\bspend\s+less\b/),
        script: saveAdviceScript()
    },
    {
        // Habits: what the list hides, what changed, the big one-offs and an honest small item. No offer.
        id: "habits",
        lead: [
            "Let's look at how you tend to spend."
        ],
        match: asks(/\bhabits?\b|\bpatterns?\b|\bwhat\s+do\s+you\s+think\s+(of|about)\s+my\s+(spending|money|finances)\b/),
        script: [
            {
                say: "Abercrombie & Fitch shows 3,397 francs in purchases, but 2,491 came back; the real cost is 906.",
                scene: {
                    type: "pools"
                },
                cues: [
                    {
                        word: "real",
                        target: "Clothing",
                        figure: {
                            label: "Abercrombie & Fitch, real cost",
                            value: 906
                        }
                    }
                ]
            },
            {
                say: "Digitec was a habit: 18 purchases, 4,462 francs, then nothing after June.",
                scene: {
                    type: "pools"
                },
                cues: [
                    {
                        word: "habit",
                        target: "Electronics",
                        figure: {
                            label: "Digitec until June",
                            value: 4462
                        }
                    }
                ]
            },
            {
                say: "Six big one-off purchases cost 24,540 francs; they are behind your tallest months.",
                scene: {
                    type: "monthly"
                },
                cues: [
                    {
                        word: "24,540",
                        figure: {
                            label: "Big one-off purchases",
                            value: 24540
                        }
                    }
                ]
            },
            {
                say: "The canteen is a small item at 1,616 francs, nothing to worry about.",
                scene: {
                    type: "pools"
                },
                cues: [
                    {
                        word: "canteen",
                        target: "Food and drink"
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
const CLOSING_LINES = [
    "Does that answer it, or shall I stay here a little longer?",
    "Shall I go on with your year?",
    "Is that clearer now, or shall we dig a little deeper?"
];
const REENTRY_LINES = [
    "Alright, back to your year.",
    "Good, where were we?",
    "Okay, let's pick up again."
];
const INVITE_LINES = [
    "Yes?",
    "Go ahead."
];
const FIXED_LINES = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FILLER_LINES"],
    ...CLOSING_LINES,
    ...REENTRY_LINES,
    ...INVITE_LINES,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BRIDGE"],
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contracts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DIRECTOR_FAILURE_LINE"],
    OFFER_CONFIRMED_LINE,
    BACKUP_NO_ANSWER_LINE,
    NOT_UNDERSTOOD_LINE,
    FINISHED_LINE,
    AFFORD_ASK_AMOUNT_LINE
];
function allLines() {
    const lines = [
        ...MAIN.flatMap((beat)=>[
                beat.say,
                beat.bridge ?? ""
            ]),
        ...SIDE_ANSWERS.flatMap((answer)=>[
                ...answer.lead ?? [],
                ...sideScripts(answer).flat().map((beat)=>beat.say)
            ]),
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
"[project]/lib/afford.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * "Can I afford this?" measured against what she KEPT last year, not a forecast: the private account's year net, how
 * much of it was the extra (13th) salary, and the ordinary surplus without it. A second, optional measure replays last
 * year's daily balance with one extra card purchase, to say how low the balance would have gone before December.
 * Pure: no I/O, so the server (facts) and the client (backup answers) share it.
 */ __turbopack_context__.s([
    "measureAgainstSurplus",
    ()=>measureAgainstSurplus,
    "parseAmount",
    ()=>parseAmount,
    "parseMonth",
    ()=>parseMonth,
    "replayPurchase",
    ()=>replayPurchase
]);
const round = (value)=>Math.round(value * 100) / 100;
const pad = (n)=>String(n).padStart(2, "0");
function measureAgainstSurplus(amount, { yearNet, extraSalary, months }) {
    const ordinarySurplus = round(yearNet - extraSalary);
    const monthlySurplus = months > 0 ? round(ordinarySurplus / months) : 0;
    const tier = amount <= ordinarySurplus ? 1 : amount <= yearNet ? 2 : 3;
    return {
        amount,
        tier,
        ordinarySurplus,
        monthlySurplus,
        monthsOfSurplus: monthlySurplus > 0 ? Math.round(amount / monthlySurplus) : null,
        leftOfYearNet: round(Math.max(0, yearNet - amount)),
        aboveYearNet: round(Math.max(0, amount - yearNet))
    };
}
/** The month's card payment date, or the 23rd when the data has none for that month. */ function paymentDate(year, month, paymentDates) {
    return paymentDates.find((d)=>d.slice(0, 7) === `${year}-${pad(month)}`) ?? `${year}-${pad(month)}-23`;
}
const lowest = (points)=>points.reduce((min, p)=>p.balance < min.balance ? p : min);
function replayPurchase(daily, amount, month, paymentDates = []) {
    const paidOn = paymentDate(daily[0].date.slice(0, 4), month, paymentDates);
    const newLowest = lowest(daily.map((p)=>p.date >= paidOn ? {
            date: p.date,
            balance: round(p.balance - amount)
        } : p));
    return {
        amount,
        month,
        paidOn,
        newLowest
    };
}
function parseAmount(question) {
    const match = question.match(/(\d{1,3}(?:[,'’]\d{3})+|\d+(?:\.\d+)?)\s*(k\b|thousand\b)?/i);
    if (!match) return null;
    const value = Number(match[1].replace(/[,'’]/g, "")) * (match[2] ? 1000 : 1);
    return value > 0 ? value : null;
}
const MONTHS = [
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
/** "may" is also a verb ("May I buy...", "it may be"), so it counts as the month only after a word like "in" or "next". */ const MAY_AS_MONTH = /\b(in|by|on|this|next|last|until|till|before|after|during|from|of|early|mid|late|end)\s+may\b/;
function parseMonth(question) {
    const text = question.toLocaleLowerCase("en");
    const named = MONTHS.findIndex((name)=>name === "may" ? MAY_AS_MONTH.test(text) : new RegExp(`\\b(${name}|${name.slice(0, 3)})\\b`).test(text));
    return named >= 0 ? named + 1 : null;
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
    "FILLER_LINES",
    ()=>FILLER_LINES,
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
const FILLER_LINES = [
    "Good question, give me a second.",
    "Hmm, let me look into that for you.",
    "Let me look at your numbers.",
    "Right, let me pull that up.",
    "Let me see what your year says about that."
];
const FILLER_LINE = FILLER_LINES[0];
const DEFAULT_BRIDGE = "Where were we.";
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/savings-plan.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * "How can I save X a month?": concrete changes sized to the target. Cancelling an optional subscription comes
 * first (one decision, the full amount), then cuts from her repeated habits. Only habits she repeats at least twice
 * a month count, and at most half of a habit is cut, so every step is something she could really do.
 * Pure: no I/O, shared by the server (facts) and the client (backup answers).
 */ __turbopack_context__.s([
    "savingsPlan",
    ()=>savingsPlan
]);
const MIN_PER_MONTH = 2;
/** A purchase cheaper than this is not worth naming as a cut. */ const MIN_EACH = 5;
function savingsPlan(target, habits, months, exclude = [], cancellable = []) {
    const subscriptions = cancellable.filter((c)=>c.savesMonthly > 0 && !exclude.includes(c.merchant)).sort((a, b)=>b.savesMonthly - a.savesMonthly);
    const cancelled = new Set(subscriptions.map((c)=>c.merchant));
    const candidates = habits.filter((h)=>!exclude.includes(h.merchant) && !cancelled.has(h.merchant) && h.purchases > 0 && months > 0 && h.purchases / months >= MIN_PER_MONTH).map((h)=>({
            ...h,
            perMonth: h.purchases / months,
            each: h.yearly / h.purchases
        })).filter((h)=>h.each >= MIN_EACH)// The dearest single purchase first: fewest changes for the same saving.
    .sort((a, b)=>b.each - a.each);
    const limit = (c)=>Math.floor(c.perMonth / 2);
    const reachable = subscriptions.reduce((sum, c)=>sum + c.savesMonthly, 0) + candidates.reduce((sum, c)=>sum + Math.round(limit(c) * c.each), 0);
    const cuts = [];
    let left = target;
    for (const c of subscriptions){
        if (left <= 0) break;
        cuts.push({
            kind: "cancel",
            merchant: c.merchant,
            group: c.group,
            fewer: 1,
            usualPerMonth: 1,
            each: c.savesMonthly,
            saves: c.savesMonthly
        });
        left -= c.savesMonthly;
    }
    for (const c of candidates){
        if (left <= 0) break;
        const fewer = Math.min(limit(c), Math.ceil(left / c.each));
        if (fewer < 1) continue;
        const saves = Math.round(fewer * c.each);
        cuts.push({
            kind: "habit",
            merchant: c.merchant,
            group: c.group,
            fewer,
            usualPerMonth: Math.round(c.perMonth),
            each: Math.round(c.each),
            saves
        });
        left -= saves;
    }
    const monthly = cuts.reduce((sum, c)=>sum + c.saves, 0);
    return {
        target,
        cuts,
        monthly,
        yearly: monthly * 12,
        reachable,
        shortfall: Math.max(0, target - monthly)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/public/facts.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = JSON.parse("{\"year\":2025,\"currency\":\"CHF\",\"salary_monthly\":7464,\"payday\":23,\"yearly_income_incl_13th_salary\":97032,\"year_end_net_vs_start\":8816,\"without_13th_salary\":1352,\"total_spending\":88379,\"categories_yearly_net_of_refunds\":{\"Housing\":22462,\"Electronics\":13160,\"Travel\":12938,\"Health\":12335,\"Bike\":11523,\"Online shopping\":5691,\"Clothing\":4597,\"Transport\":2619,\"Food and drink\":2180,\"Tax\":630,\"Other\":243},\"travel_breakdown\":{\"USA_approx\":8000,\"London_July\":1631,\"Copenhagen_May\":1409,\"London_Cologne_April\":1395,\"Other\":503},\"month_end_balance_vs_start_jan_dec\":[1971,1883,4034,4442,5140,2563,-2407,480,-5640,-2720,-2594,8816],\"monthly_spending_jan_dec\":[5994,7063,6028,6626,6435,10365,12363,4565,14363,3845,7390,3342],\"card_bill_jan_dec\":[1355,2570,559,3187,2134,6125,9036,1313,10019,1349,3916,288],\"monthly_breakdown_by_category\":{\"1\":{\"Housing\":2012,\"Food and drink\":602,\"Online shopping\":920,\"Electronics\":1278,\"Transport\":37,\"Health\":982,\"Clothing\":164},\"2\":{\"Housing\":1820,\"Electronics\":985,\"Food and drink\":123,\"Clothing\":195,\"Online shopping\":348,\"Transport\":1774,\"Health\":1533,\"Travel\":286},\"3\":{\"Housing\":2040,\"Food and drink\":140,\"Online shopping\":219,\"Transport\":136,\"Electronics\":1311,\"Clothing\":990,\"Health\":982,\"Tax\":210},\"4\":{\"Housing\":1820,\"Food and drink\":195,\"Electronics\":1479,\"Transport\":64,\"Online shopping\":770,\"Clothing\":-78,\"Health\":982,\"Travel\":1395},\"5\":{\"Housing\":1820,\"Travel\":1409,\"Food and drink\":127,\"Online shopping\":302,\"Electronics\":642,\"Transport\":52,\"Health\":982,\"Clothing\":1042,\"Bike\":59},\"6\":{\"Housing\":1820,\"Food and drink\":135,\"Transport\":61,\"Electronics\":784,\"Online shopping\":276,\"Health\":982,\"Clothing\":306,\"Bike\":6000},\"7\":{\"Housing\":1820,\"Food and drink\":143,\"Online shopping\":584,\"Other\":232,\"Electronics\":353,\"Transport\":38,\"Health\":982,\"Clothing\":1136,\"Travel\":1746,\"Bike\":5329},\"8\":{\"Housing\":1820,\"Food and drink\":145,\"Online shopping\":479,\"Electronics\":46,\"Transport\":81,\"Health\":982,\"Bike\":135,\"Clothing\":332,\"Travel\":545},\"9\":{\"Housing\":2030,\"Food and drink\":130,\"Online shopping\":447,\"Transport\":73,\"Electronics\":2321,\"Health\":982,\"Tax\":210,\"Travel\":7454,\"Clothing\":717},\"10\":{\"Housing\":1820,\"Food and drink\":137,\"Electronics\":627,\"Transport\":106,\"Online shopping\":434,\"Health\":982,\"Clothing\":-363,\"Travel\":102},\"11\":{\"Housing\":1820,\"Food and drink\":139,\"Electronics\":3291,\"Online shopping\":546,\"Health\":982,\"Transport\":97,\"Tax\":210,\"Clothing\":306},\"12\":{\"Housing\":1820,\"Food and drink\":166,\"Transport\":102,\"Electronics\":45,\"Online shopping\":365,\"Health\":982,\"Other\":11,\"Clothing\":-149}},\"monthly_breakdown_parts\":{\"1\":[{\"name\":\"Housing\",\"value\":2012},{\"name\":\"Electronics\",\"value\":1278},{\"name\":\"Health\",\"value\":982},{\"name\":\"Online shopping\",\"value\":920},{\"name\":\"Other\",\"value\":802}],\"2\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Transport\",\"value\":1774},{\"name\":\"Health\",\"value\":1533},{\"name\":\"Electronics\",\"value\":985},{\"name\":\"Other\",\"value\":951}],\"3\":[{\"name\":\"Housing\",\"value\":2040},{\"name\":\"Electronics\",\"value\":1311},{\"name\":\"Clothing\",\"value\":990},{\"name\":\"Health\",\"value\":982},{\"name\":\"Other\",\"value\":705}],\"4\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Electronics\",\"value\":1479},{\"name\":\"Travel\",\"value\":1395},{\"name\":\"Health\",\"value\":982},{\"name\":\"Other\",\"value\":950}],\"5\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Travel\",\"value\":1409},{\"name\":\"Clothing\",\"value\":1042},{\"name\":\"Health\",\"value\":982},{\"name\":\"Other\",\"value\":1182}],\"6\":[{\"name\":\"Bike\",\"value\":6000,\"aliases\":[\"bicycle\",\"veloshop\"]},{\"name\":\"Rent\",\"value\":1820,\"aliases\":[\"housing\"]},{\"name\":\"Health insurance\",\"value\":982,\"aliases\":[\"insurance\",\"health\"]},{\"name\":\"Digitec\",\"value\":742,\"aliases\":[\"galaxus\",\"electronics\"]},{\"name\":\"Other\",\"value\":821}],\"7\":[{\"name\":\"Bike\",\"value\":5329,\"aliases\":[\"bicycle\",\"veloshop\"]},{\"name\":\"Rent\",\"value\":1820,\"aliases\":[\"housing\"]},{\"name\":\"London trip\",\"value\":1746,\"aliases\":[\"london\",\"travel\",\"hotel\"]},{\"name\":\"Clothing\",\"value\":1136,\"aliases\":[\"clothes\",\"fashion\"]},{\"name\":\"Health insurance\",\"value\":982,\"aliases\":[\"insurance\",\"health\"]},{\"name\":\"Other\",\"value\":1350}],\"8\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Health\",\"value\":982},{\"name\":\"Travel\",\"value\":545},{\"name\":\"Online shopping\",\"value\":479},{\"name\":\"Other\",\"value\":739}],\"9\":[{\"name\":\"Plane tickets\",\"value\":7458,\"aliases\":[\"flights\",\"flight\",\"tickets\",\"swiss\",\"plane\"]},{\"name\":\"Apple\",\"value\":2273,\"aliases\":[\"iphone\",\"laptop\"]},{\"name\":\"Rent and electricity\",\"value\":2030,\"aliases\":[\"rent\",\"electricity\",\"housing\"]},{\"name\":\"Health insurance\",\"value\":982,\"aliases\":[\"insurance\",\"health\"]},{\"name\":\"Other\",\"value\":1620}],\"10\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Health\",\"value\":982},{\"name\":\"Electronics\",\"value\":627},{\"name\":\"Other\",\"value\":416}],\"11\":[{\"name\":\"Apple\",\"value\":3189,\"aliases\":[\"iphone\",\"laptop\"]},{\"name\":\"Rent\",\"value\":1820,\"aliases\":[\"housing\"]},{\"name\":\"Health insurance\",\"value\":982,\"aliases\":[\"insurance\",\"health\"]},{\"name\":\"Other\",\"value\":1399}],\"12\":[{\"name\":\"Housing\",\"value\":1820},{\"name\":\"Health\",\"value\":982},{\"name\":\"Online shopping\",\"value\":365},{\"name\":\"Food and drink\",\"value\":166},{\"name\":\"Other\",\"value\":9}]},\"notable_items\":{\"6\":[\"23 June bike shop 6000\"],\"7\":[\"London hotel 1566\",\"23 July bike shop 5329\"],\"9\":[\"Apple 2273\",\"18 September plane tickets 7458\"],\"11\":[\"Apple 3189\"]},\"gaps\":[{\"id\":\"missing_payment:Krankenkasse:2025-02\",\"mode\":\"ask\",\"label\":\"Krankenkasse payment missing in 2025-02\",\"merchant\":\"Krankenkasse\",\"month\":2,\"usual_amount\":982,\"months_paid\":11},{\"id\":\"no_pillar_3a\",\"mode\":\"ask\",\"label\":\"No pillar 3a payment\",\"yearly_amount\":0,\"limit\":7258},{\"id\":\"no_savings\",\"mode\":\"ask\",\"label\":\"No savings transfer\",\"yearly_amount\":0},{\"id\":\"tax_provision\",\"mode\":\"ask\",\"label\":\"Tax paid so far\",\"paid\":630,\"payments\":3},{\"id\":\"accounts_complete\",\"mode\":\"ask\",\"label\":\"No groceries or cash withdrawals\"}],\"refunds\":{\"total\":4590,\"merchants\":[{\"merchant\":\"Abercrombie & Fitch\",\"bought\":3397,\"refunded\":2491,\"net\":906}]},\"card_budget_monthly\":3600,\"card_cycles\":[{\"cycle\":1,\"start\":\"2025-01-01\",\"payment_date\":\"2025-01-23\",\"statement\":1355,\"spent\":1402,\"budget_left\":2198,\"crossed_on\":null,\"cumulative\":[[\"2025-01-01\",200],[\"2025-01-04\",464],[\"2025-01-05\",559],[\"2025-01-07\",654],[\"2025-01-08\",670],[\"2025-01-10\",993],[\"2025-01-11\",993],[\"2025-01-13\",1217],[\"2025-01-14\",1268],[\"2025-01-20\",1318],[\"2025-01-22\",1402]]},{\"cycle\":2,\"start\":\"2025-01-24\",\"payment_date\":\"2025-02-23\",\"statement\":2570,\"spent\":2337,\"budget_left\":1263,\"crossed_on\":null,\"cumulative\":[[\"2025-01-24\",69],[\"2025-01-26\",117],[\"2025-01-28\",360],[\"2025-01-30\",455],[\"2025-02-03\",463],[\"2025-02-08\",481],[\"2025-02-12\",2031],[\"2025-02-16\",2317],[\"2025-02-20\",2320],[\"2025-02-22\",2337]]},{\"cycle\":3,\"start\":\"2025-02-24\",\"payment_date\":\"2025-03-23\",\"statement\":559,\"spent\":658,\"budget_left\":2942,\"crossed_on\":null,\"cumulative\":[[\"2025-02-24\",123],[\"2025-02-28\",198],[\"2025-03-02\",307],[\"2025-03-03\",359],[\"2025-03-05\",360],[\"2025-03-06\",469],[\"2025-03-07\",472],[\"2025-03-08\",473],[\"2025-03-12\",486],[\"2025-03-13\",495],[\"2025-03-14\",510],[\"2025-03-18\",655],[\"2025-03-20\",658]]},{\"cycle\":4,\"start\":\"2025-03-24\",\"payment_date\":\"2025-04-23\",\"statement\":3187,\"spent\":3187,\"budget_left\":413,\"crossed_on\":null,\"cumulative\":[[\"2025-03-24\",109],[\"2025-03-26\",347],[\"2025-03-28\",625],[\"2025-03-30\",765],[\"2025-03-31\",814],[\"2025-04-02\",889],[\"2025-04-03\",1826],[\"2025-04-05\",1827],[\"2025-04-08\",1868],[\"2025-04-10\",1961],[\"2025-04-11\",1977],[\"2025-04-13\",1599],[\"2025-04-15\",1460],[\"2025-04-18\",1503],[\"2025-04-19\",2633],[\"2025-04-20\",2899],[\"2025-04-21\",3052],[\"2025-04-22\",3187]]},{\"cycle\":5,\"start\":\"2025-04-24\",\"payment_date\":\"2025-05-23\",\"statement\":2134,\"spent\":2187,\"budget_left\":1413,\"crossed_on\":null,\"cumulative\":[[\"2025-04-25\",70],[\"2025-04-26\",320],[\"2025-04-28\",384],[\"2025-05-02\",1041],[\"2025-05-04\",1147],[\"2025-05-05\",1328],[\"2025-05-06\",1917],[\"2025-05-08\",1918],[\"2025-05-10\",2023],[\"2025-05-11\",1918],[\"2025-05-12\",1977],[\"2025-05-13\",2002],[\"2025-05-14\",2039],[\"2025-05-16\",2080],[\"2025-05-17\",2120],[\"2025-05-19\",2186],[\"2025-05-20\",2187]]},{\"cycle\":6,\"start\":\"2025-05-24\",\"payment_date\":\"2025-06-23\",\"statement\":6125,\"spent\":6179,\"budget_left\":-2579,\"crossed_on\":\"2025-06-23\",\"cumulative\":[[\"2025-06-01\",136],[\"2025-06-17\",179],[\"2025-06-23\",6179]]},{\"cycle\":7,\"start\":\"2025-06-24\",\"payment_date\":\"2025-07-23\",\"statement\":9036,\"spent\":9060,\"budget_left\":-5460,\"crossed_on\":\"2025-07-23\",\"cumulative\":[[\"2025-06-24\",175],[\"2025-06-26\",177],[\"2025-06-27\",191],[\"2025-06-28\",270],[\"2025-07-01\",346],[\"2025-07-03\",416],[\"2025-07-04\",472],[\"2025-07-05\",473],[\"2025-07-07\",543],[\"2025-07-08\",2260],[\"2025-07-10\",2520],[\"2025-07-11\",2635],[\"2025-07-15\",2576],[\"2025-07-18\",3089],[\"2025-07-20\",3489],[\"2025-07-22\",3500],[\"2025-07-23\",9060]]},{\"cycle\":8,\"start\":\"2025-07-24\",\"payment_date\":\"2025-08-23\",\"statement\":1313,\"spent\":1211,\"budget_left\":2389,\"crossed_on\":null,\"cumulative\":[[\"2025-07-24\",23],[\"2025-07-27\",166],[\"2025-07-29\",175],[\"2025-08-05\",311],[\"2025-08-08\",357],[\"2025-08-10\",284],[\"2025-08-11\",286],[\"2025-08-13\",321],[\"2025-08-16\",313],[\"2025-08-18\",391],[\"2025-08-19\",946],[\"2025-08-22\",1211]]},{\"cycle\":9,\"start\":\"2025-08-24\",\"payment_date\":\"2025-09-23\",\"statement\":10019,\"spent\":10206,\"budget_left\":-6606,\"crossed_on\":\"2025-09-18\",\"cumulative\":[[\"2025-08-26\",74],[\"2025-08-29\",264],[\"2025-09-01\",266],[\"2025-09-05\",1002],[\"2025-09-08\",1003],[\"2025-09-11\",1017],[\"2025-09-13\",971],[\"2025-09-14\",1097],[\"2025-09-16\",2615],[\"2025-09-18\",9540],[\"2025-09-20\",10043],[\"2025-09-22\",10206]]},{\"cycle\":10,\"start\":\"2025-09-24\",\"payment_date\":\"2025-10-23\",\"statement\":1349,\"spent\":1389,\"budget_left\":2211,\"crossed_on\":null,\"cumulative\":[[\"2025-09-25\",288],[\"2025-09-26\",383],[\"2025-09-27\",405],[\"2025-09-28\",505],[\"2025-09-29\",548],[\"2025-09-30\",857],[\"2025-10-01\",898],[\"2025-10-03\",719],[\"2025-10-11\",723],[\"2025-10-15\",768],[\"2025-10-16\",992],[\"2025-10-19\",1154],[\"2025-10-20\",1221],[\"2025-10-23\",1389]]},{\"cycle\":11,\"start\":\"2025-10-24\",\"payment_date\":\"2025-11-23\",\"statement\":3916,\"spent\":3767,\"budget_left\":-167,\"crossed_on\":\"2025-11-22\",\"cumulative\":[[\"2025-10-26\",-303],[\"2025-10-28\",-127],[\"2025-10-30\",-106],[\"2025-10-31\",119],[\"2025-11-02\",174],[\"2025-11-07\",305],[\"2025-11-09\",236],[\"2025-11-10\",237],[\"2025-11-11\",439],[\"2025-11-12\",830],[\"2025-11-16\",869],[\"2025-11-21\",1018],[\"2025-11-22\",3767]]},{\"cycle\":12,\"start\":\"2025-11-24\",\"payment_date\":\"2025-12-23\",\"statement\":288,\"spent\":431,\"budget_left\":3169,\"crossed_on\":null,\"cumulative\":[[\"2025-11-24\",149],[\"2025-11-29\",319],[\"2025-12-01\",395],[\"2025-12-04\",252],[\"2025-12-06\",257],[\"2025-12-11\",258],[\"2025-12-15\",288],[\"2025-12-19\",292],[\"2025-12-20\",385],[\"2025-12-21\",431]]}],\"offer\":{\"product\":\"pillar 3a\",\"monthly\":200,\"after_one_year\":2400},\"insights\":[{\"id\":\"year_end_buffer\",\"kind\":\"what_happened\",\"mode\":\"assert\",\"summary\":\"The private account ended the year 8'816 CHF higher than it started. Without the extra salary payment of 7'464 CHF it would have been 1'352 CHF.\",\"figures\":{\"yearNet\":8816.36,\"extraSalary\":7464,\"yearNetWithoutExtra\":1352.36,\"baseMonthlySalary\":7464}},{\"id\":\"lowest_balance\",\"kind\":\"what_happened\",\"mode\":\"assert\",\"summary\":\"Measured from the start of the year, the private account was lowest at the end of 2025-09 (-5'640 CHF) and on 2025-10-21 (-7'681 CHF).\",\"figures\":{\"lowestMonthEnd\":-5639.8,\"lowestMonthEndMonth\":\"2025-09\",\"lowestDay\":-7681.45,\"lowestDayDate\":\"2025-10-21\"}},{\"id\":\"statement_shock\",\"kind\":\"what_happened\",\"mode\":\"assert\",\"summary\":\"The largest card statement was 10'019 CHF in 2025-09; 2 statement(s) were larger than the monthly salary of 7'464 CHF.\",\"figures\":{\"largestStatement\":10018.53,\"largestStatementMonth\":\"2025-09\",\"statementsAboveSalary\":2,\"smallestStatement\":287.95,\"baseMonthlySalary\":7464}},{\"id\":\"card_cycle\",\"kind\":\"insight\",\"mode\":\"assert\",\"summary\":\"The monthly card budget is 3'600 CHF (salary minus average account spending). 4 of 12 card cycles went over it; the largest, ending 2025-09-23, reached 10'206 CHF and crossed the budget on 2025-09-18.\",\"figures\":{\"cardBudgetMonthly\":3600,\"cyclesOverBudget\":4,\"cycles\":12,\"worstCycleSpent\":10206,\"worstCycleEnd\":\"2025-09-23\",\"worstCycleCrossedOn\":\"2025-09-18\"}},{\"id\":\"missing_payment:Krankenkasse:2025-02\",\"kind\":\"what_is_missing\",\"mode\":\"ask\",\"summary\":\"Krankenkasse was paid in 11 of 12 months, usually 982 CHF; there is no payment in 2025-02.\",\"figures\":{\"merchant\":\"Krankenkasse\",\"missingMonth\":\"2025-02\",\"usualAmount\":982,\"monthsPaid\":11},\"question\":\"I don't see your Krankenkasse payment for 2025-02. Was it paid from another account?\",\"answers\":[\"paid_elsewhere\",\"missed\"]},{\"id\":\"no_pillar_3a\",\"kind\":\"what_is_missing\",\"mode\":\"ask\",\"summary\":\"There is no 3a payment or savings transfer in 2025. The 3a maximum for employees with a pension fund is 7'258 CHF.\",\"figures\":{\"pillar3aLimit\":7258,\"savingsTransfers\":0},\"question\":\"I don't see any 3a or savings payments this year. Do you have a 3a account at another bank?\",\"answers\":[\"has_elsewhere\",\"none\"]},{\"id\":\"accounts_complete\",\"kind\":\"what_is_missing\",\"mode\":\"ask\",\"summary\":\"The 2 accounts show no grocery shopping and no cash withdrawals in 2025, so some everyday spending may be paid another way.\",\"figures\":{\"accounts\":2,\"groceryPayments\":0,\"cashWithdrawals\":0},\"question\":\"I see no groceries or cash withdrawals here. Do you have another account, or pay daily shopping another way?\",\"answers\":[\"has_other\",\"complete\"]},{\"id\":\"tax_provision\",\"kind\":\"what_is_missing\",\"mode\":\"ask\",\"summary\":\"3 tax payments of 630 CHF in total were found against 97'032 CHF of income.\",\"figures\":{\"taxPayments\":3,\"taxPaid\":630,\"yearlyIncome\":97032},\"question\":\"I see a few tax payments. Is tax taken from your salary, or paid from another account?\",\"answers\":[\"handled_elsewhere\",\"not_yet\"]},{\"id\":\"double_charge:Mondrian London:2025-07-08\",\"kind\":\"insight\",\"mode\":\"ask\",\"summary\":\"Mondrian London charged 743 CHF twice on 2025-07-08 and nothing was refunded.\",\"figures\":{\"merchant\":\"Mondrian London\",\"date\":\"2025-07-08\",\"amount\":743.2,\"charges\":2},\"question\":\"Mondrian London charged you 743.20 CHF twice on 2025-07-08. Was that two bookings, or should we dispute one?\",\"answers\":[\"legit\",\"duplicate\"]},{\"id\":\"refund_heavy:Abercrombie & Fitch\",\"kind\":\"insight\",\"mode\":\"assert\",\"summary\":\"Abercrombie & Fitch shows 3'397 CHF in 21 purchases, but 2'491 CHF came back; the real cost is 906 CHF.\",\"figures\":{\"merchant\":\"Abercrombie & Fitch\",\"gross\":3397.45,\"refunds\":2491.31,\"net\":906.14,\"purchases\":21}},{\"id\":\"habit_stopped:Digitec Galaxus\",\"kind\":\"insight\",\"mode\":\"assert\",\"summary\":\"18 purchases at Digitec Galaxus (4'462 CHF) until 2025-06, then none.\",\"figures\":{\"merchant\":\"Digitec Galaxus\",\"purchases\":18,\"net\":4461.75,\"lastMonth\":\"2025-06\"}},{\"id\":\"one_off_pot\",\"kind\":\"advice\",\"mode\":\"assert\",\"summary\":\"6 big one-off purchases cost 24'540 CHF this year. Setting aside 2'045 CHF a month would cover them without a statement shock.\",\"figures\":{\"oneOffTotal\":24540.4,\"monthlyPot\":2045.03,\"purchases\":6}},{\"id\":\"tag:Libero-Tarifverbund\",\"kind\":\"insight\",\"mode\":\"ask\",\"summary\":\"Libero-Tarifverbund is tagged as fixed (Annual public transport pass.), but this is uncertain.\",\"figures\":{\"merchant\":\"Libero-Tarifverbund\",\"necessity\":\"compulsory\"},\"question\":\"Do you use the Libero pass for commuting to work?\",\"answers\":[\"yes\",\"no\"]}],\"profile\":{\"byNecessity\":[{\"necessity\":\"compulsory\",\"label\":\"fixed\",\"yearly\":36968,\"monthly\":3080.67,\"share\":0.42},{\"necessity\":\"reducible\",\"label\":\"adjustable\",\"yearly\":3558.15,\"monthly\":296.51,\"share\":0.04},{\"necessity\":\"discretionary\",\"label\":\"flexible\",\"yearly\":47853.12,\"monthly\":3987.76,\"share\":0.54}],\"monthlyRoomAfterCompulsory\":4383.33,\"levers\":{\"adjustable\":[{\"merchant\":\"Kantine AG\",\"yearly\":1616.15},{\"merchant\":\"Coop Tankstelle Talgut Zentrum\",\"yearly\":764.55},{\"merchant\":\"Netflix\",\"yearly\":250.8},{\"merchant\":\"Mobile Provider\",\"yearly\":238.8},{\"merchant\":\"iTunes.com\",\"yearly\":63.6}],\"flexibleHabits\":[{\"merchant\":\"Digitec Galaxus\",\"yearly\":4461.75,\"purchases\":18},{\"merchant\":\"Orell Fuessli\",\"yearly\":1747.4,\"purchases\":24},{\"merchant\":\"Paypal\",\"yearly\":1591.8,\"purchases\":17},{\"merchant\":\"Amazon\",\"yearly\":1217.15,\"purchases\":12},{\"merchant\":\"Abercrombie & Fitch\",\"yearly\":906.14,\"purchases\":21},{\"merchant\":\"Tommy Hilfiger\",\"yearly\":810,\"purchases\":6}]}},\"private_balance_daily\":[[\"2025-01-01\",-1820],[\"2025-01-03\",-1881.1],[\"2025-01-05\",-2176.75],[\"2025-01-06\",-2191.55],[\"2025-01-08\",-2245.9],[\"2025-01-09\",-2257.75],[\"2025-01-10\",-2298.55],[\"2025-01-12\",-2312.25],[\"2025-01-14\",-2348.75],[\"2025-01-15\",-2360.3],[\"2025-01-18\",-2662.35],[\"2025-01-21\",-2678.1],[\"2025-01-23\",3182.45],[\"2025-01-24\",3170.25],[\"2025-01-27\",3157.1],[\"2025-01-29\",2175.1],[\"2025-01-30\",1971.35],[\"2025-02-01\",-124.05],[\"2025-02-02\",-278.3],[\"2025-02-05\",-289.4],[\"2025-02-08\",-386.15],[\"2025-02-09\",-468.7],[\"2025-02-10\",-509.5],[\"2025-02-11\",-734.9],[\"2025-02-14\",-747],[\"2025-02-16\",-2248],[\"2025-02-17\",-2355.1],[\"2025-02-20\",-2370.55],[\"2025-02-23\",2318.22],[\"2025-02-25\",1951.17],[\"2025-02-26\",1935.52],[\"2025-02-28\",1882.67],[\"2025-03-01\",-46.58],[\"2025-03-04\",-61.58],[\"2025-03-05\",-146.58],[\"2025-03-06\",-493.48],[\"2025-03-07\",-507.48],[\"2025-03-10\",-559.28],[\"2025-03-13\",-570.98],[\"2025-03-14\",-923.08],[\"2025-03-16\",-1105.33],[\"2025-03-19\",-1181.13],[\"2025-03-22\",-1192.98],[\"2025-03-23\",5620.24],[\"2025-03-25\",5609.24],[\"2025-03-28\",5596.59],[\"2025-03-29\",4614.59],[\"2025-03-30\",4184.59],[\"2025-03-31\",4034.29],[\"2025-04-01\",2214.29],[\"2025-04-03\",2124.09],[\"2025-04-06\",2112.94],[\"2025-04-09\",2099.19],[\"2025-04-10\",1931.79],[\"2025-04-12\",1917.14],[\"2025-04-15\",1903.29],[\"2025-04-18\",1890.49],[\"2025-04-20\",1842.54],[\"2025-04-21\",1830.94],[\"2025-04-23\",5686.3],[\"2025-04-24\",5670.6],[\"2025-04-27\",5567.2],[\"2025-04-28\",5485.2],[\"2025-04-29\",4503.2],[\"2025-04-30\",4441.75],[\"2025-05-01\",2621.75],[\"2025-05-02\",1747.75],[\"2025-05-03\",1733.35],[\"2025-05-06\",1720.85],[\"2025-05-08\",1665.35],[\"2025-05-09\",1654.45],[\"2025-05-10\",1613.65],[\"2025-05-11\",1530.45],[\"2025-05-12\",1464.4],[\"2025-05-15\",1107.7],[\"2025-05-18\",1092.7],[\"2025-05-21\",1081],[\"2025-05-22\",900.75],[\"2025-05-23\",6230.99],[\"2025-05-24\",6216.74],[\"2025-05-26\",6145.04],[\"2025-05-27\",6133.59],[\"2025-05-29\",5151.59],[\"2025-05-30\",5140.24],[\"2025-06-01\",3320.24],[\"2025-06-02\",3307.69],[\"2025-06-05\",3291.94],[\"2025-06-07\",3008.79],[\"2025-06-08\",2997.04],[\"2025-06-10\",2956.24],[\"2025-06-11\",2943.09],[\"2025-06-14\",2928.24],[\"2025-06-17\",2816.44],[\"2025-06-20\",2434.29],[\"2025-06-23\",3716.39],[\"2025-06-26\",3703.74],[\"2025-06-27\",3556.64],[\"2025-06-29\",2563.29],[\"2025-07-01\",743.29],[\"2025-07-02\",728.39],[\"2025-07-04\",643.79],[\"2025-07-05\",628.09],[\"2025-07-08\",615.44],[\"2025-07-09\",383.44],[\"2025-07-10\",342.64],[\"2025-07-11\",328.54],[\"2025-07-14\",314.94],[\"2025-07-15\",276.84],[\"2025-07-16\",219.19],[\"2025-07-17\",204.24],[\"2025-07-20\",188.84],[\"2025-07-23\",-1394.26],[\"2025-07-26\",-1409.61],[\"2025-07-29\",-2407.06],[\"2025-08-01\",-4242.41],[\"2025-08-04\",-4352.16],[\"2025-08-07\",-4364.01],[\"2025-08-10\",-4418.56],[\"2025-08-13\",-4526.31],[\"2025-08-15\",-4607.06],[\"2025-08-16\",-4619.91],[\"2025-08-19\",-4633.86],[\"2025-08-22\",-4648.91],[\"2025-08-23\",1501.68],[\"2025-08-25\",1487.33],[\"2025-08-28\",1475.98],[\"2025-08-29\",493.98],[\"2025-08-31\",479.93],[\"2025-09-01\",-1340.07],[\"2025-09-03\",-1406.37],[\"2025-09-06\",-1420.27],[\"2025-09-09\",-1501.12],[\"2025-09-10\",-1541.92],[\"2025-09-12\",-1554.02],[\"2025-09-15\",-1566.42],[\"2025-09-18\",-1579.87],[\"2025-09-21\",-1595.12],[\"2025-09-23\",-4149.65],[\"2025-09-24\",-4160.8],[\"2025-09-27\",-4174.1],[\"2025-09-29\",-5156.1],[\"2025-09-30\",-5639.8],[\"2025-10-01\",-7459.8],[\"2025-10-03\",-7472.65],[\"2025-10-06\",-7487.7],[\"2025-10-09\",-7502.6],[\"2025-10-10\",-7625],[\"2025-10-12\",-7638.05],[\"2025-10-15\",-7651.35],[\"2025-10-18\",-7666.8],[\"2025-10-21\",-7681.45],[\"2025-10-23\",-1566.61],[\"2025-10-24\",-1581.41],[\"2025-10-27\",-1666.86],[\"2025-10-29\",-2648.86],[\"2025-10-30\",-2660.16],[\"2025-10-31\",-2719.51],[\"2025-11-01\",-4539.51],[\"2025-11-02\",-4554.51],[\"2025-11-05\",-4569.96],[\"2025-11-08\",-4584.06],[\"2025-11-10\",-4624.86],[\"2025-11-11\",-4638.46],[\"2025-11-14\",-4711.16],[\"2025-11-17\",-4726.21],[\"2025-11-20\",-4740.16],[\"2025-11-23\",-1203.99],[\"2025-11-26\",-1313.09],[\"2025-11-29\",-2306.89],[\"2025-11-30\",-2593.79],[\"2025-12-01\",-4413.79],[\"2025-12-02\",-4427.69],[\"2025-12-05\",-4439.99],[\"2025-12-08\",-4511.59],[\"2025-12-10\",-4552.39],[\"2025-12-11\",-4566.69],[\"2025-12-14\",-4578.99],[\"2025-12-17\",-4594.09],[\"2025-12-19\",-4634.09],[\"2025-12-20\",-4744.04],[\"2025-12-21\",-4801.19],[\"2025-12-23\",9825.41],[\"2025-12-26\",9813.66],[\"2025-12-29\",8816.36]],\"card_payment_dates\":[\"2025-01-23\",\"2025-02-23\",\"2025-03-23\",\"2025-04-23\",\"2025-05-23\",\"2025-06-23\",\"2025-07-23\",\"2025-08-23\",\"2025-09-23\",\"2025-10-23\",\"2025-11-23\",\"2025-12-23\"],\"afford_example\":{\"yearNet\":8816.36,\"extraSalary\":7464,\"ordinarySurplus\":1352.36,\"monthlySurplus\":112.7,\"months\":12,\"example\":{\"amount\":3000,\"tier\":2,\"ordinarySurplus\":1352.36,\"monthlySurplus\":112.7,\"monthsOfSurplus\":27,\"leftOfYearNet\":5816.36,\"aboveYearNet\":0}},\"savings\":{\"habits\":[{\"merchant\":\"Kantine AG\",\"group\":\"Food and drink\",\"yearly\":1616.15,\"purchases\":121},{\"merchant\":\"Coop Tankstelle Talgut Zentrum\",\"group\":\"Transport\",\"yearly\":764.55,\"purchases\":12},{\"merchant\":\"Netflix\",\"group\":\"Electronics\",\"yearly\":250.8,\"purchases\":12},{\"merchant\":\"Mobile Provider\",\"group\":\"Electronics\",\"yearly\":238.8,\"purchases\":12},{\"merchant\":\"iTunes.com\",\"group\":\"Electronics\",\"yearly\":63.6,\"purchases\":33},{\"merchant\":\"Digitec Galaxus\",\"group\":\"Electronics\",\"yearly\":4461.75,\"purchases\":18},{\"merchant\":\"Orell Fuessli\",\"group\":\"Online shopping\",\"yearly\":1747.4,\"purchases\":24},{\"merchant\":\"Paypal\",\"group\":\"Online shopping\",\"yearly\":1591.8,\"purchases\":17},{\"merchant\":\"Amazon\",\"group\":\"Online shopping\",\"yearly\":1217.15,\"purchases\":12},{\"merchant\":\"Abercrombie & Fitch\",\"group\":\"Clothing\",\"yearly\":906.14,\"purchases\":21},{\"merchant\":\"Tommy Hilfiger\",\"group\":\"Clothing\",\"yearly\":810,\"purchases\":6}],\"excluded\":[\"Abercrombie & Fitch\",\"Digitec Galaxus\"],\"example\":{\"target\":100,\"cuts\":[{\"kind\":\"cancel\",\"merchant\":\"Netflix\",\"group\":\"Electronics\",\"fewer\":1,\"usualPerMonth\":1,\"each\":21,\"saves\":21},{\"kind\":\"habit\",\"merchant\":\"Orell Fuessli\",\"group\":\"Online shopping\",\"fewer\":1,\"usualPerMonth\":2,\"each\":73,\"saves\":73},{\"kind\":\"habit\",\"merchant\":\"Kantine AG\",\"group\":\"Food and drink\",\"fewer\":1,\"usualPerMonth\":10,\"each\":13,\"saves\":13}],\"monthly\":107,\"yearly\":1284,\"reachable\":161,\"shortfall\":0},\"cancel\":[{\"merchant\":\"Netflix\",\"name\":\"Netflix\",\"group\":\"Electronics\",\"savesMonthly\":21,\"savesYearly\":251}],\"switch\":[{\"merchant\":\"Krankenkasse\",\"name\":\"health insurance\",\"group\":\"Health\",\"costsMonthly\":982,\"how\":\"comparing insurers\"},{\"merchant\":\"Mobile Provider\",\"name\":\"mobile plan\",\"group\":\"Electronics\",\"costsMonthly\":20,\"how\":\"a cheaper plan\"}],\"months\":12}}");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1-f7kpc0nxxff._.js.map