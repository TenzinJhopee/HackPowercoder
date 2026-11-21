import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { allowedNumbers, buildFacts } from "../lib/facts";
import { loadAccountCsv } from "../lib/load-accounts";

const load = (file: string) => loadAccountCsv(fs.readFileSync(`data/${file}`, "utf8"), file).transactions;
const transactions = [...load("Account1.csv"), ...load("Account3.csv")];
const byId = (facts: ReturnType<typeof buildFacts>, id: string) => facts.insights.find((i) => i.id === id);

test("detectors reproduce the verified findings", () => {
  const facts = buildFacts(transactions, "CHF");
  assert.equal(byId(facts, "year_end_buffer")?.figures.yearNetWithoutExtra, 1352.36);
  assert.equal(byId(facts, "lowest_balance")?.figures.lowestMonthEnd, -5639.8);
  assert.equal(byId(facts, "statement_shock")?.figures.largestStatement, 10018.53);
  assert.equal(byId(facts, "missing_payment:Krankenkasse:2025-02")?.mode, "ask");
  assert.equal(byId(facts, "double_charge:Mondrian London:2025-07-08")?.mode, "ask");
  assert.equal(byId(facts, "refund_heavy:Abercrombie & Fitch")?.figures.net, 906.14);
  assert.ok(byId(facts, "habit_stopped:Digitec Galaxus"));
  assert.ok(!facts.insights.some((i) => i.id.startsWith("double_charge:Swiss")), "group flight bookings are not double charges");
  assert.ok(allowedNumbers(facts).has(1352));
});

test("a user answer resolves the question and updates the pot", () => {
  const facts = buildFacts(transactions, "CHF", undefined, [
    { subject: "double_charge:Mondrian London:2025-07-08", answer: "duplicate", text: "Only one room.", createdAt: "2025-12-31" }
  ]);
  assert.equal(byId(facts, "double_charge:Mondrian London:2025-07-08")?.mode, "resolved");
  assert.ok(!facts.openQuestions.some((q) => q.subject.startsWith("double_charge:")));
  // Without the duplicate the Mondrian stay (743.20) is below the one-off threshold, so it leaves the pot.
  assert.equal(byId(facts, "one_off_pot")?.figures.monthlyPot, 1921.17);
});

test("completeness and tax are asked, then resolved by a note", () => {
  const facts = buildFacts(transactions, "CHF");
  assert.equal(byId(facts, "accounts_complete")?.mode, "ask");
  assert.deepEqual(byId(facts, "accounts_complete")?.answers, ["has_other", "complete"]);
  const tax = byId(facts, "tax_provision");
  assert.equal(tax?.mode, "ask");
  assert.deepEqual([tax?.figures.taxPayments, tax?.figures.taxPaid, tax?.figures.yearlyIncome], [3, 630, 97032]);
  assert.ok(facts.assumptions.some((a) => a.includes("upper bound")));
  assert.equal(facts.affordReplay?.example[5].belowLowestPoint, 3000);
  const answered = buildFacts(transactions, "CHF", undefined, [
    { subject: "accounts_complete", answer: "complete", text: "No, this is everything", createdAt: "2025-12-31" },
    { subject: "tax_provision", answer: "not_yet", text: "No, not yet", createdAt: "2025-12-31" }
  ]);
  assert.equal(byId(answered, "accounts_complete")?.mode, "resolved");
  assert.equal(byId(answered, "tax_provision")?.userAnswer, "not_yet");
  assert.ok(!answered.openQuestions.some((q) => q.subject === "tax_provision" || q.subject === "accounts_complete"));
  assert.ok(!answered.assumptions.some((a) => a.includes("upper bound")));
});
