import assert from "node:assert/strict";
import test from "node:test";
import { SAVE_EXAMPLE, SIDE_ANSWERS, saveScript } from "../content/scripts";
import { savingsPlan, type Cancellable, type Habit } from "../lib/savings-plan";

const habits: Habit[] = [
  { merchant: "Bookshop", group: "Online shopping", yearly: 1747.4, purchases: 24 },
  { merchant: "Canteen", group: "Food and drink", yearly: 1616.15, purchases: 121 },
  { merchant: "Monthly", group: "Electronics", yearly: 250.8, purchases: 12 },
  { merchant: "Stopped", group: "Electronics", yearly: 4461.75, purchases: 36 }
];

test("savings plan: cuts are sized to the target, at most half of a habit", () => {
  const plan = savingsPlan(100, habits, 12, ["Stopped"]);
  assert.deepEqual(plan.cuts.map((c) => [c.merchant, c.fewer, c.saves]), [["Bookshop", 1, 73], ["Canteen", 3, 40]]);
  assert.equal(plan.monthly, 113);
  assert.equal(plan.yearly, 1356);
  assert.equal(plan.shortfall, 0);
});

test("savings plan: a target beyond her habits reports what is reachable", () => {
  const plan = savingsPlan(500, habits, 12, ["Stopped"]);
  assert.equal(plan.monthly, plan.reachable);
  assert.equal(plan.shortfall, 500 - plan.reachable);
  assert.ok(!plan.cuts.some((c) => c.merchant === "Monthly" || c.merchant === "Stopped"));
});

test("savings plan: a cancellation comes before habit cuts and is counted once", () => {
  const stream: Cancellable = { merchant: "Stream", name: "Stream", group: "Electronics", savesMonthly: 50, savesYearly: 600 };
  const withStream = [...habits, { merchant: "Stream", group: "Electronics", yearly: 600, purchases: 24 }];
  const plan = savingsPlan(100, withStream, 12, ["Stopped"], [stream]);
  assert.deepEqual(plan.cuts.map((c) => [c.kind, c.merchant, c.saves]), [["cancel", "Stream", 50], ["habit", "Bookshop", 73]]);
  assert.equal(plan.monthly, 123);
  // Stream counts once (50), not again as a habit: 50 + Bookshop 73 + Canteen 67.
  assert.equal(plan.reachable, 190);
});

test("a savings question with an amount gets the concrete plan, without one the general answer", () => {
  assert.equal(SIDE_ANSWERS.find((a) => a.match("Tell me how can I save 100 frank next month"))?.id, "save-target");
  assert.equal(SIDE_ANSWERS.find((a) => a.match(SAVE_EXAMPLE))?.id, "save-target");
  assert.equal(SIDE_ANSWERS.find((a) => a.match("How can I save money?"))?.id, "save");
  assert.equal(SIDE_ANSWERS.find((a) => a.match("How can I save with 3a?"))?.id, "save");
  assert.ok([...saveScript(100), ...saveScript(500)].every((beat) => beat.say.split(/\s+/).length <= 18));
  assert.match(saveScript(100)[0].say, /^Cancelling Netflix/);
  // Out of reach: the switch lever comes before the big purchases, with no saving figure.
  const far = saveScript(500).map((beat) => beat.say);
  const compare = far.findIndex((say) => /comparing/.test(say));
  assert.ok(compare > 0 && compare < far.findIndex((say) => /big purchases/.test(say)) && !/sav/.test(far[compare]));
});
