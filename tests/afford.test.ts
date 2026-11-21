import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { AFFORD_ASK_AMOUNT_LINE, SIDE_ANSWERS } from "../content/scripts";
import { measureAgainstSurplus, parseAmount, parseMonth, replayPurchase } from "../lib/afford";
import { cardAccounts, cardPayments } from "../lib/card-cycle";
import { getBalanceSeries } from "../lib/intelligence";
import { loadAccountCsv } from "../lib/load-accounts";

const load = (file: string) => loadAccountCsv(fs.readFileSync(`data/${file}`, "utf8"), file).transactions;
const transactions = [...load("Account1.csv"), ...load("Account3.csv")];
const daily = getBalanceSeries(transactions, "CHF", 0, cardAccounts(transactions).privateAccount).daily;
const payments = cardPayments(transactions).map((p) => p.date);
const year = { yearNet: 8816.36, extraSalary: 7464, months: 12 };

test("three tiers against what was kept last year", () => {
  const small = measureAgainstSurplus(300, year);
  assert.deepEqual([small.tier, small.ordinarySurplus, small.monthlySurplus, small.monthsOfSurplus], [1, 1352.36, 112.7, 3]);
  const laptop = measureAgainstSurplus(3000, year);
  assert.deepEqual([laptop.tier, laptop.monthsOfSurplus, laptop.leftOfYearNet, laptop.aboveYearNet], [2, 27, 5816.36, 0]);
  const big = measureAgainstSurplus(12000, year);
  assert.deepEqual([big.tier, big.leftOfYearNet, big.aboveYearNet], [3, 0, 3183.64]);
});

test("zero or negative ordinary surplus does not divide by zero", () => {
  const none = measureAgainstSurplus(500, { yearNet: 7464, extraSalary: 7464, months: 12 });
  assert.deepEqual([none.tier, none.monthlySurplus, none.monthsOfSurplus], [2, 0, null]);
  const negative = measureAgainstSurplus(500, { yearNet: 7000, extraSalary: 7464, months: 12 });
  assert.deepEqual([negative.tier, negative.monthsOfSurplus], [2, null]);
  assert.equal(measureAgainstSurplus(500, { yearNet: 0, extraSalary: 0, months: 0 }).tier, 3);
});

test("replay: 3,000 paid in June lowers last year's balance until December", () => {
  const r = replayPurchase(daily, 3000, 6, payments);
  assert.equal(r.paidOn, "2025-06-23");
  assert.deepEqual(r.newLowest, { date: "2025-10-21", balance: -10681.45 });
});

test("parsing and the prepared answer", () => {
  for (const q of ["3,000", "3000 francs", "3'000", "3k francs"]) assert.equal(parseAmount(q), 3000, q);
  assert.equal(parseAmount("Can I afford a laptop?"), null);
  assert.equal(parseMonth("in June"), 6);
  assert.equal(parseMonth("a laptop"), null);
  assert.equal(parseMonth("May I afford 3,000 francs? It may be too much."), null);
  assert.equal(parseMonth("Can I afford 3,000 francs in May?"), 5);
  assert.equal(parseMonth("May I buy it next May?"), 5);
  const afford = SIDE_ANSWERS.find((a) => a.id === "afford")!;
  const script = (q: string) => (typeof afford.script === "function" ? afford.script(q) : afford.script).map((b) => b.say);
  assert.deepEqual(script("Can I afford a laptop?"), [AFFORD_ASK_AMOUNT_LINE]);
  assert.deepEqual(script("Can I afford a 3,000 franc laptop?"), [
    "In these accounts, 3,000 francs is about 27 ordinary months of what you kept, 113 a month.",
    "With December's thirteenth salary it is covered, and 5,816 francs of the year's surplus remain.",
    "Bought before December, it would lower your balance until the thirteenth salary arrives."
  ]);
  assert.equal(script("Can I afford 3,000 francs in June?")[2], "Paid in June, it would have taken last year's balance to 10,681 francs below its start by October.");
  assert.equal(script("Can I afford 3k in December?").length, 2);
  assert.match(script("Can I afford 300 francs?")[1], /about 3 ordinary months/);
  assert.match(script("Can I afford 12,000 francs?")[1], /3,184 francs more than everything you kept/);
});
