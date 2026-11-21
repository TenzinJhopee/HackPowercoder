import assert from "node:assert/strict";
import test from "node:test";
import { getMerchantTags, getTransactions, getUserNotes } from "../lib/database";
import { runDirector } from "../lib/director/run";
import { stageScript } from "../lib/director/staging";
import { savingsAmounts, validateScript } from "../lib/director/validate";
import type { Beat } from "../lib/contracts";

// What the model really returned for "I need to save 100 francs": the current screen copied into every beat.
const modelScript = {
  script: [
    { say: "To save, we look at your fixed costs of 3,081 francs, adjustable of 297, and flexible 3,988.", scene: { type: "pools", focus: "Electronics" } },
    { say: "After fixed costs, you have at most 4,383 francs left each month for other spending.", scene: { type: "pools", focus: "Electronics" } },
    { say: "You could save 73 francs by buying fewer books at Orell Fuessli, and 40 at Kantine AG.", scene: { type: "pools", focus: "Electronics" } },
    { say: "If you like, 200 francs a month into pillar 3a, which is 2,400 francs after a year.", scene: { type: "jars", focus: "3a" }, offer: true }
  ]
};

const key = (beat: Beat) => `${beat.scene?.type}|${beat.scene?.focus ?? ""}`;

test("a saving answer drops invented savings amounts and moves the stage on every beat", async () => {
  const response = await runDirector({
    request: { question: "I need to save 100 francs", mode: "side", screen: { scene: "pools", focus: "Electronics", lastSentence: "", openBar: null } },
    transactions: await getTransactions(),
    tags: await getMerchantTags(),
    notes: await getUserNotes(),
    apiKey: "test",
    generate: async () => ({ json: modelScript, toolResults: [] })
  });
  assert.equal(response.source, "model");
  const script = response.script;

  // 73 and 40 are savings the model computed itself: the beat is gone.
  assert.ok(script.every((beat) => !/\b73\b|\b40\b|Orell/.test(beat.say)), JSON.stringify(script));
  assert.equal(script.length, 3);

  // The screen is Pools / Electronics: no beat repeats the one before it (the first is compared with the screen).
  let before = "pools|Electronics";
  for (const beat of script) {
    assert.notEqual(key(beat), before, `repeated view for: ${beat.say}`);
    before = key(beat);
    assert.ok(beat.figure && Number.isFinite(beat.figure.value) && beat.figure.label, `no figure for: ${beat.say}`);
    for (const cue of beat.cues ?? []) assert.ok(beat.say.toLowerCase().includes(cue.word.toLowerCase()));
    assert.ok((beat.cues?.length ?? 0) <= 2);
  }

  assert.equal(script[0].scene?.focus, "Fixed");
  assert.deepEqual(script[0].figure, { label: "Fixed costs / month", value: 3081 });
  assert.equal(script[1].figure?.value, 4383);
  assert.equal(script[1].figure?.label, "Left after fixed costs");
  assert.deepEqual(script[2].scene, { type: "jars", focus: "3a" });
  assert.equal(script[2].offer, true);
});

test("savings amounts are found and only her own target or the offer pass", () => {
  assert.deepEqual(savingsAmounts("You could save 73 francs by buying fewer books"), [73]);
  assert.deepEqual(savingsAmounts("Cutting the canteen by 300 francs a year"), [300]);
  assert.deepEqual(savingsAmounts("To save, we look at your fixed costs of 3,081 francs"), []);
  assert.deepEqual(savingsAmounts("100 francs a month is within reach, saving 100 is fine"), [100]);
});

test("staging picks a focus from a merchant or a necessity word and never repeats a view", () => {
  const script: Beat[] = [
    { say: "Orell Fuessli cost 1,747 francs this year.", scene: { type: "pools", focus: "Electronics" } },
    { say: "The canteen, Kantine AG, was 1,616 francs.", scene: { type: "pools", focus: "Food and drink" } },
    { say: "Nothing here names a place to look at." }
  ];
  const staged = stageScript(script, { currentScene: "pools", currentFocus: "Electronics", tags: [] });
  assert.equal(staged[0].scene?.focus, "Online shopping");
  assert.deepEqual(staged[0].figure, { label: "Orell Fuessli this year", value: 1747 });
  assert.deepEqual(staged[0].cues, [{ word: "Fuessli", target: "Online shopping" }]);
  // A model beat that already moved is left alone.
  assert.equal(staged[1].scene?.focus, "Food and drink");
  assert.notEqual(key(staged[2]), key(staged[1]));
});

test("a flexible-spending answer that pastes the screen into every beat is staged group by group", async () => {
  const screen = { type: "pools", focus: "Electronics" };
  const model = {
    script: [
      { say: "Your flexible spending is 3,988 francs a month, the part where you choose.", scene: screen },
      { say: "Electronics took 13,160 francs this year, mostly Digitec Galaxus.", scene: screen },
      { say: "Travel came to 12,938 francs, with the trip to the USA the biggest part.", scene: screen },
      { say: "Clothing was 4,597 francs and online shopping 5,691 francs.", scene: screen }
    ]
  };
  const response = await runDirector({
    request: { question: "Tell me about my flexible spendings", mode: "side", screen: { scene: "pools", focus: "Electronics", lastSentence: "", openBar: null } },
    transactions: await getTransactions(),
    tags: await getMerchantTags(),
    notes: await getUserNotes(),
    apiKey: "test",
    generate: async () => ({ json: model, toolResults: [] })
  });
  assert.equal(response.source, "model", response.error);
  const focuses = response.script.map((beat) => String(beat.scene?.focus));
  assert.deepEqual(focuses, ["Flexible", "Electronics", "Travel", "Clothing"]);
  assert.deepEqual(
    response.script.map((beat) => beat.figure),
    [
      { label: "Flexible costs / month", value: 3988 },
      { label: "Electronics this year", value: 13160 },
      { label: "Travel this year", value: 12938 },
      { label: "Clothing this year", value: 4597 }
    ]
  );
  // A group that opens its sentence cannot be a cue word (never first); the focus still moves, and cues that exist are real words.
  assert.deepEqual(response.script[1].cues, [{ word: "Digitec", target: "Electronics" }]);
  for (const beat of response.script) for (const cue of beat.cues ?? []) assert.ok(beat.say.includes(cue.word));
});

test("from the opening view the first beat may go straight to the scene the answer needs", () => {
  const script: Beat[] = [
    { say: "Flexible spending is about 3,988 francs a month.", scene: { type: "pools", focus: "Flexible" } },
    { say: "Electronics cost 13,160 francs this year.", scene: { type: "pools", focus: "Electronics" } }
  ];
  const fromGalaxy = validateScript({ script }, { currentScene: "galaxy", allowed: new Set([3988, 13160]), monthTotals: Array(12).fill(20000) });
  assert.ok(fromGalaxy.ok);
  if (fromGalaxy.ok) assert.deepEqual(fromGalaxy.script[0].scene, { type: "pools", focus: "Flexible" });

  const fromMonthly = validateScript({ script }, { currentScene: "monthly", allowed: new Set([3988, 13160]), monthTotals: Array(12).fill(20000) });
  assert.ok(fromMonthly.ok);
  if (fromMonthly.ok) assert.equal(fromMonthly.script[0].scene?.type, "monthly");
});
