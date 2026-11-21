import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_BRIDGE, FILLER_LINE, type DirectorResponse, type Script } from "../lib/contracts";
import { classify, matchAnswer, monthIn } from "../client/conversation/intent";
import { CLOSING_LINES, REENTRY_LINES } from "../content/scripts";
import { Conversation } from "../client/conversation/state";
import { splitWords, type Speaker, type WordListener } from "../client/player/voice";
import { StubWorld } from "../client/world/stub-world";

const MAIN: Script = [
  { say: "Here is your whole year at a glance.", scene: { type: "galaxy" } },
  { say: "Every month, month by month, from January to December.", scene: { type: "monthly" } },
  { say: "June was your biggest month, mostly the trip to Copenhagen.", scene: { type: "monthly", focus: 6 }, bridge: "Back to June." },
  { say: "The rest of the year stayed close to your average.", scene: { type: "monthly" } },
];

/** Speaks instantly, except lines `hold` says to keep open until stop(). Logs "say:<text>". */
class FakeVoice implements Speaker {
  private pending: ((completed: boolean) => void) | null = null;
  constructor(private log: string[], private hold: (text: string) => boolean) {}
  speak(text: string, onWord?: WordListener): Promise<boolean> {
    this.log.push(`say:${text}`);
    if (this.hold(text)) {
      return new Promise((resolve) => {
        this.pending = resolve;
      });
    }
    splitWords(text).forEach((w, i) => onWord?.(i, w.word));
    return Promise.resolve(true);
  }
  stop(): void {
    const pending = this.pending;
    this.pending = null;
    pending?.(false);
  }
}

const tick = () => new Promise((resolve) => setTimeout(resolve, 0));
async function until(check: () => boolean) {
  for (let i = 0; i < 200 && !check(); i++) await tick();
  assert.ok(check(), "condition not reached");
}

test("interrupt, ask, resume: fast path focus, bridge, replay of the interrupted beat", async () => {
  const log: string[] = [];
  const world = new StubWorld({ log });
  let held = false;
  const voice = new FakeVoice(log, (text) => {
    if (text === MAIN[2].say && !held) return (held = true);
    return false;
  });
  const fetcher = (async (input: RequestInfo | URL) => {
    log.push(`fetch:${String(input)}`);
    const body: DirectorResponse = { script: [{ say: "September had the tax bill and the dentist." }], source: "model" };
    return new Response(JSON.stringify(body), { status: 200 });
  }) as typeof fetch;
  const talk = new Conversation({ world, voice, main: MAIN, fetch: fetcher, backup: false });

  void talk.start();
  await until(() => log.includes(`say:${MAIN[2].say}`));
  talk.interrupt();
  assert.equal(talk.mode, "listening");
  assert.equal(talk.snapshot?.mainIndex, 2);
  assert.equal(talk.snapshot?.focus, 6);

  await talk.ask("Wait, why is September so high?");
  assert.equal(talk.mode, "waiting");
  const focus9 = log.indexOf("focus:9");
  const fetched = log.indexOf("fetch:/api/director");
  assert.ok(focus9 >= 0 && fetched > focus9, "fast path focuses September before the director call");
  assert.ok(log.indexOf(`say:${FILLER_LINE}`) > focus9);
  assert.equal(talk.snapshot?.mainIndex, 2, "snapshot kept through the side answer");

  const mark = log.length;
  await talk.resume();
  const after = log.slice(mark);
  const restored = after.indexOf("focus:6");
  const bridge = after.indexOf("say:Back to June.");
  const replay = after.indexOf(`say:${MAIN[2].say}`);
  assert.ok(restored >= 0 && bridge > restored && replay > bridge, `restore, bridge, replay in order: ${after.join(" | ")}`);
  assert.ok(!after.includes(`say:${DEFAULT_BRIDGE}`));
  assert.ok(after.includes(`say:${MAIN[3].say}`));
  assert.equal(talk.mode, "finished");
});

const QUESTION_SCRIPT: Script = [
  { say: "Here is your whole year at a glance.", scene: { type: "galaxy" } },
  {
    say: "Do you keep a pillar 3a account elsewhere?",
    scene: { type: "jars" },
    question: {
      subject: "no_pillar_3a",
      label: "Pillar 3a and savings",
      assume: "Until you tell me, I keep the pillar 3a option in the plan.",
      answers: [
        { id: "has_elsewhere", label: "Yes, at another bank", kind: "yes", skipOffer: true, recall: "You told me your pillar 3a is at another bank." },
        { id: "none", label: "No, I have none", kind: "no", recall: "You told me you have no pillar 3a yet." },
      ],
    },
  },
  { say: "If you like, 200 francs a month into pillar 3a.", scene: { type: "jars" }, offer: true },
  { say: "That was your year.", scene: { type: "galaxy" } },
];

/** A notes endpoint that is offline: logs each POST, then fails (the GET of saved answers fails too). */
const offlineNotes = (notes: string[]) =>
  (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (init?.method === "POST") notes.push(`${String(input)} ${String(init?.body)}`);
    throw new TypeError("offline");
  }) as typeof fetch;

/** A notes endpoint holding `saved`: GET returns them (or fails with `getStatus`); logs "METHOD url". */
const savedNotes = (saved: { subject: string; answer: string }[], calls: string[], getStatus = 200) =>
  (async (input: RequestInfo | URL, init?: RequestInit) => {
    const method = init?.method ?? "GET";
    calls.push(`${method} ${String(input)}`);
    if (method === "GET") return new Response(JSON.stringify(saved.map((n) => ({ ...n, text: "", createdAt: "" }))), { status: getStatus });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as typeof fetch;

/** Runs QUESTION_SCRIPT to its end against `fetcher`; records modes, question events and the points at the first line. */
async function runRemembered(fetcher: typeof fetch, questionPauseMs = 60_000) {
  const log: string[] = [];
  const talk = new Conversation({ world: new StubWorld({ log }), voice: new FakeVoice(log, () => false), main: QUESTION_SCRIPT, fetch: fetcher, backup: true, questionPauseMs });
  const seen = { modes: [] as string[], asked: 0, offers: 0, points: [] as import("../client/events").OpenPoint[], atFirstLine: null as import("../client/events").OpenPoint[] | null };
  talk.on((event) => {
    if (event.type === "mode") seen.modes.push(event.mode);
    if (event.type === "question" && event.question) seen.asked++;
    if (event.type === "offer") seen.offers++;
    if (event.type === "openPoints") seen.points = event.points;
    if (event.type === "line" && !seen.atFirstLine) seen.atFirstLine = seen.points;
  });
  await talk.start();
  return { talk, log, seen };
}

test("remembered answer: recall line instead of the question, no pause, point answered from the start", async () => {
  const calls: string[] = [];
  const { talk, log, seen } = await runRemembered(savedNotes([{ subject: "no_pillar_3a", answer: "none" }], calls));
  assert.equal(talk.mode, "finished");
  assert.ok(log.includes("say:You told me you have no pillar 3a yet.") && !log.includes(`say:${QUESTION_SCRIPT[1].say}`));
  assert.ok(!seen.modes.includes("answering") && seen.asked === 0, "no pause, no chips");
  assert.deepEqual(seen.atFirstLine?.map((p) => [p.subject, p.answer]), [["no_pillar_3a", "none"]]);
  assert.ok(log.includes(`say:${QUESTION_SCRIPT[2].say}`) && seen.offers === 1, "'none' keeps the offer");
  assert.deepEqual(calls, ["GET /api/notes"]);

  // Start over keeps the remembered point and does not ask again.
  await talk.start();
  assert.equal(log.filter((l) => l === "say:You told me you have no pillar 3a yet.").length, 2);
  assert.deepEqual(seen.points.map((p) => p.answer), ["none"]);
});

test("remembered has_elsewhere skips the offer", async () => {
  const { log, seen } = await runRemembered(savedNotes([{ subject: "no_pillar_3a", answer: "has_elsewhere" }], []));
  assert.ok(log.includes("say:You told me your pillar 3a is at another bank."));
  assert.ok(!log.includes(`say:${QUESTION_SCRIPT[2].say}`) && seen.offers === 0);
  assert.ok(log.includes(`say:${QUESTION_SCRIPT[3].say}`));
});

test("forget deletes the saved answers and turns the points unanswered; the question is asked again", async () => {
  const calls: string[] = [];
  const { talk, log, seen } = await runRemembered(savedNotes([{ subject: "no_pillar_3a", answer: "has_elsewhere" }], calls), 5);
  await talk.forget();
  assert.ok(calls.includes("DELETE /api/notes?subject=no_pillar_3a"), calls.join(" | "));
  assert.deepEqual(seen.points.map((p) => [p.subject, p.answer]), [["no_pillar_3a", null]]);
  assert.equal(talk.mode, "finished", "forget does not touch playback");
  await talk.start();
  assert.ok(log.includes(`say:${QUESTION_SCRIPT[1].say}`) && seen.asked === 1, "asked again after forget");
  assert.ok(log.includes(`say:${QUESTION_SCRIPT[2].say}`), "the offer is back");
});

test("a failing load of saved answers behaves like no notes", async () => {
  for (const fetcher of [savedNotes([{ subject: "no_pillar_3a", answer: "has_elsewhere" }], [], 500), offlineNotes([])]) {
    const { log, seen } = await runRemembered(fetcher, 5);
    assert.ok(log.includes(`say:${QUESTION_SCRIPT[1].say}`) && seen.asked === 1 && seen.modes.includes("answering"));
    assert.deepEqual(seen.points.map((p) => p.answer), [null]);
    assert.ok(seen.offers === 1);
  }
});

test("recall lines in MAIN follow the script rules and keep the beat's cues", async () => {
  const { MAIN: SCRIPT } = await import("../content/scripts");
  const { cueWordIndices } = await import("../client/player/player");
  const numbers = (text: string) => text.match(/\d[\d,']*/g) ?? [];
  const beats = SCRIPT.filter((b) => b.question);
  assert.equal(beats.length, 4);
  for (const beat of beats) {
    for (const answer of beat.question!.answers) {
      const recall = answer.recall ?? "";
      assert.ok(recall && recall.split(/\s+/).length <= 18 && /you told me/i.test(recall) && !/CHF/.test(recall), `${answer.id}: ${recall}`);
      assert.ok(cueWordIndices(recall, beat.cues).every((i) => i > 0), `cues in: ${recall}`);
      for (const n of numbers(recall)) assert.ok(beat.say.includes(n), `${n} not in the beat: ${recall}`);
    }
  }
});

test("question beat: pause, answer, save note (offline), continue, offer skipped", async () => {
  const log: string[] = [];
  const world = new StubWorld({ log });
  const voice = new FakeVoice(log, () => false);
  const notes: string[] = [];
  const offline = offlineNotes(notes);
  const script = QUESTION_SCRIPT;
  // A long pause: the answer, not the clock, moves the presentation on.
  const talk = new Conversation({ world, voice, main: script, fetch: offline, backup: true, questionPauseMs: 60_000 });
  const offers: unknown[] = [];
  talk.on((event) => event.type === "offer" && offers.push(event));

  void talk.start();
  await until(() => talk.mode === "answering");
  assert.ok(!log.includes(`say:${script[2].say}`));

  assert.equal(talk.input("Yes, from my other account"), "continue");
  await until(() => talk.mode === "finished");
  assert.equal(notes.length, 1);
  assert.ok(notes[0].startsWith("/api/notes ") && notes[0].includes('"subject":"no_pillar_3a"') && notes[0].includes('"answer":"has_elsewhere"'));
  assert.ok(!log.includes(`say:${script[2].say}`), "offer beat skipped");
  assert.equal(offers.length, 0, "no offer card");
  assert.ok(log.includes(`say:${script[3].say}`));

  // "No" keeps the offer.
  const again = new Conversation({ world, voice, main: script, fetch: offline, backup: true, questionPauseMs: 60_000 });
  void again.start();
  await until(() => again.mode === "answering");
  again.input("No");
  await until(() => again.mode === "finished");
  assert.ok(log.filter((l) => l === `say:${script[2].say}`).length === 1, "offer beat played after no");
});

test("unanswered question: the presentation goes on by itself; the open point is answered later without replaying", async () => {
  const log: string[] = [];
  const notes: string[] = [];
  const talk = new Conversation({ world: new StubWorld({ log }), voice: new FakeVoice(log, () => false), main: QUESTION_SCRIPT, fetch: offlineNotes(notes), backup: true, questionPauseMs: 5 });
  let points: import("../client/events").OpenPoint[] = [];
  let offers = 0;
  talk.on((event) => {
    if (event.type === "openPoints") points = event.points;
    if (event.type === "offer") offers++;
  });

  await talk.start();
  assert.equal(talk.mode, "finished");
  assert.deepEqual(points.map((p) => [p.subject, p.label, p.answer]), [["no_pillar_3a", "Pillar 3a and savings", null]]);
  assert.ok(log.includes(`say:${QUESTION_SCRIPT[2].say}`) && offers === 1, "unanswered: the offer beat plays");
  assert.ok(log.includes(`say:${QUESTION_SCRIPT[3].say}`));
  assert.equal(notes.length, 0);

  const spoken = log.filter((l) => l.startsWith("say:")).length;
  await talk.answer("has_elsewhere", "no_pillar_3a");
  assert.equal(notes.length, 1);
  assert.ok(notes[0].includes('"subject":"no_pillar_3a"') && notes[0].includes('"answer":"has_elsewhere"'));
  assert.equal(points[0].answer, "has_elsewhere");
  assert.equal(talk.mode, "finished");
  assert.equal(log.filter((l) => l.startsWith("say:")).length, spoken, "recording an answer says nothing");
});

test("intent rules", () => {
  assert.equal(classify("OK, let's continue"), "continue");
  assert.equal(classify("I'm not sure about this"), "question");
  assert.equal(classify("yeah"), "continue");
  assert.equal(classify("yep"), "continue");
  assert.equal(classify("next"), "continue");
  assert.equal(classify("go ahead"), "continue");
  assert.equal(classify("stop please"), "wait");
  assert.equal(classify("hang on"), "wait");
  assert.equal(classify("pause"), "wait");
  assert.equal(classify("Wait, why is September so high?"), "question");
  assert.equal(classify("why was November high?"), "question");
  assert.equal(monthIn("why was November high?"), 11);
  assert.equal(monthIn("May I ask something"), null);
  assert.equal(monthIn("what happened in May"), 5);
});

test("intent rules: how people cut in and answer", () => {
  assert.equal(classify("one second, why was June so high"), "question");
  assert.equal(classify("sorry, quick question about September"), "question");
  assert.equal(classify("thanks, that's clear, go on"), "continue");
  assert.equal(classify("okay got it, carry on"), "continue");
  assert.equal(classify("no that's fine, continue"), "continue");
  assert.equal(classify("yes please continue"), "continue");
  assert.equal(classify("thanks, go on"), "continue");
  assert.equal(classify("thanks, that's clear"), "continue");
  assert.equal(classify("that's all, thank you"), "end");
  assert.equal(classify("hmm, wait"), "wait");
  assert.equal(classify("one second"), "wait");
  assert.equal(classify("sorry, quick question"), "wait");
  assert.equal(classify("um, okay"), "continue");
  assert.equal(classify("hey, why is rent so high"), "question");
  const answers = [
    { id: "y", label: "Yes, from another account", kind: "yes" as const },
    { id: "n", label: "No, it was missed", kind: "no" as const },
  ];
  assert.equal(matchAnswer("um, yes", answers)?.id, "y");
  assert.equal(matchAnswer("sorry, no", answers)?.id, "n");
  assert.equal(matchAnswer("no wait", answers), null);
});

test("side answer: lead-in, answer, spoken hand-back; return skips a beat heard to its end", async () => {
  const log: string[] = [];
  const voice = new FakeVoice(log, () => false);
  const prepared = [{ match: (q: string) => /june/i.test(q), lead: ["Sure, let's look at June."], script: [{ say: "June had the bike." }] }];
  const talk = new Conversation({ world: new StubWorld({ log }), voice, main: MAIN, prepared, backup: true });
  let stopAt: string | null = MAIN[2].say;
  talk.on((e) => {
    if (e.type === "word" && stopAt && log.at(-1) === `say:${stopAt}` && e.index === splitWords(stopAt).length - 1) {
      stopAt = null;
      talk.interrupt();
    }
  });
  void talk.start();
  await until(() => talk.mode === "listening");
  await talk.ask("one second, why was June so high?");
  assert.equal(talk.mode, "waiting");
  const says = log.filter((l) => l.startsWith("say:")).map((l) => l.slice(4));
  const i = says.indexOf("Sure, let's look at June.");
  assert.ok(i > 0 && says[i + 1] === "June had the bike." && (CLOSING_LINES as readonly string[]).includes(says[i + 2]), says.join(" | "));
  const mark = log.length;
  await talk.resume();
  const after = log.slice(mark).filter((l) => l.startsWith("say:")).map((l) => l.slice(4));
  assert.ok((REENTRY_LINES as readonly string[]).includes(after[0]), after.join(" | "));
  assert.equal(after[1], "Back to June.");
  assert.equal(after[2], MAIN[3].say, "beat heard to its end is not repeated");
});

test("the savings answer emits its plan; the slip reveals a line per beat and stays after the answer", async () => {
  const { SIDE_ANSWERS, SAVE_EXAMPLE } = await import("../content/scripts");
  const { keepReducer } = await import("../components/keepsake");
  const log: string[] = [];
  const talk = new Conversation({ world: new StubWorld({ log }), voice: new FakeVoice(log, () => false), main: MAIN, prepared: SIDE_ANSWERS, backup: true });
  const events: import("../client/events").EngineEvent[] = [];
  talk.on((event) => events.push(event));

  await talk.ask(SAVE_EXAMPLE);
  const keep = events.findIndex((e) => e.type === "keep");
  const firstLine = events.findIndex((e) => e.type === "line");
  assert.ok(keep >= 0 && keep < firstLine, "plan arrives before the first beat");
  const event = events[keep];
  assert.ok(event.type === "keep");
  const { plan, names } = event.keepsake;
  assert.equal(plan.shortfall, 0);
  assert.equal(names.length, plan.cuts.length);
  assert.ok(names.includes("canteen lunches"));

  let slip = null as ReturnType<typeof keepReducer>;
  const revealed: number[] = [];
  for (const e of events) {
    slip = keepReducer(slip, e);
    if (e.type === "line" && e.kind === "side") revealed.push(slip!.revealed);
  }
  assert.deepEqual(revealed, [...plan.cuts.map((_, i) => i + 1), plan.cuts.length + 1]);
  assert.equal(slip?.live, false);
  for (const e of [{ type: "mode", mode: "presenting", previous: "waiting" }, { type: "line", text: "x", words: ["x"], cueIndices: [], kind: "side", beatIndex: 0, beatCount: 1 }] satisfies import("../client/events").EngineEvent[]) {
    slip = keepReducer(slip, e);
  }
  assert.equal(slip?.revealed, plan.cuts.length + 1, "later answers leave the slip alone");
});

test("a specific month question goes to the director first; the fixed answer is the fallback", async () => {
  const prepared = [{ match: (q: string) => /june/i.test(q), live: (q: string) => /digitec/i.test(q), lead: ["Sure, June."], script: [{ say: "June had the bike." }] }];
  const run = async (question: string, response: unknown) => {
    const log: string[] = [];
    const fetcher = (async (input: RequestInfo | URL) => {
      log.push(`fetch:${String(input)}`);
      return new Response(JSON.stringify(response), { status: 200 });
    }) as typeof fetch;
    const talk = new Conversation({ world: new StubWorld({ log }), voice: new FakeVoice(log, () => false), main: MAIN, prepared, fetch: fetcher, backup: false });
    await talk.ask(question);
    return log;
  };
  const model = await run("How much at Digitec in June?", { script: [{ say: "Digitec came to a small sum." }], source: "model" });
  assert.ok(model.includes("fetch:/api/director") && model.includes("say:Digitec came to a small sum.") && !model.includes("say:June had the bike."));
  const failed = await run("How much at Digitec in June?", { script: [{ say: "x" }], source: "fallback", error: "timeout" });
  assert.ok(failed.includes("fetch:/api/director") && failed.includes("say:June had the bike.") && !failed.includes("say:Sure, June."));
  const story = await run("Why was June so high?", { script: [{ say: "never" }], source: "model" });
  assert.ok(!story.includes("fetch:/api/director") && story.includes("say:Sure, June.") && story.includes("say:June had the bike."));
});
