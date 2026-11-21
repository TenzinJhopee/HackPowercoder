import assert from "node:assert/strict";
import test from "node:test";
import { DEFAULT_BRIDGE, FILLER_LINE, type DirectorResponse, type Script } from "../lib/contracts";
import { classify, monthIn } from "../client/conversation/intent";
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

test("intent rules", () => {
  assert.equal(classify("OK, let's continue"), "continue");
  assert.equal(classify("why was November high?"), "question");
  assert.equal(monthIn("why was November high?"), 11);
  assert.equal(monthIn("May I ask something"), null);
  assert.equal(monthIn("what happened in May"), 5);
});
