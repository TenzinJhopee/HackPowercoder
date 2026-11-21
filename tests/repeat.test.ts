import assert from "node:assert/strict";
import test from "node:test";
import type { DirectorResponse, Script } from "../lib/contracts";
import { isRepeatRequest } from "../client/conversation/intent";
import { Conversation } from "../client/conversation/state";
import { splitWords, type Speaker, type WordListener } from "../client/player/voice";
import { StubWorld } from "../client/world/stub-world";

class InstantVoice implements Speaker {
  constructor(private log: string[]) {}
  speak(text: string, onWord?: WordListener): Promise<boolean> {
    this.log.push(`say:${text}`);
    splitWords(text).forEach((w, i) => onWord?.(i, w.word));
    return Promise.resolve(true);
  }
  stop(): void {}
}

test("repeat requests are recognised", () => {
  for (const q of ["Can you repeat your advice", "repeat that please", "Say that again?", "What was your advice?", "sorry, what did you just say", "Come again?"]) {
    assert.ok(isRepeatRequest(q), q);
  }
  for (const q of ["How can I save 100 francs next month?", "Why is September so high?", "Tell me about my flexible spending"]) {
    assert.ok(!isRepeatRequest(q), q);
  }
});

test("'can you repeat your advice' replays the last answer without asking the director", async () => {
  const log: string[] = [];
  const answer: Script = [
    { say: "Each month, 3,081 francs are fixed and 3,988 flexible.", scene: { type: "pools", focus: "Fixed" } },
    { say: "After the fixed costs, 4,383 francs are left each month.", scene: { type: "pools", focus: "Left over" } },
    { say: "The canteen cost 1,616 francs this year.", scene: { type: "pools", focus: "Food and drink" } }
  ];
  let calls = 0;
  const fetcher = (async (input: RequestInfo | URL) => {
    if (String(input).includes("/api/director")) calls++;
    const body: DirectorResponse = calls <= 1 ? { script: answer, source: "model" } : { script: [{ say: "A different, partial answer." }], source: "model" };
    return new Response(JSON.stringify(body), { status: 200 });
  }) as typeof fetch;
  const talk = new Conversation({ world: new StubWorld({ log }), voice: new InstantVoice(log), main: [{ say: "Your year.", scene: { type: "galaxy" } }], fetch: fetcher, backup: false });

  await talk.ask("How can I save 100 francs next month?");
  assert.equal(calls, 1);
  const mark = log.length;
  await talk.ask("Can you repeat your advice");
  const replay = log.slice(mark).filter((l) => l.startsWith("say:"));
  assert.equal(calls, 1, "the director is not called again");
  for (const beat of answer) assert.ok(replay.includes(`say:${beat.say}`), `replayed: ${beat.say}`);
  assert.ok(!replay.includes("say:A different, partial answer."));
  assert.equal(talk.mode, "waiting");
});
