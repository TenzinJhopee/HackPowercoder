import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { AFFORD_ASK_AMOUNT_LINE, SIDE_ANSWERS } from "../content/scripts";
import { parseAmount, parseMonth, replayPurchase, roomBeforeLowest } from "../lib/afford";
import { cardAccounts, cardPayments } from "../lib/card-cycle";
import { getBalanceSeries } from "../lib/intelligence";
import { loadAccountCsv } from "../lib/load-accounts";

const load = (file: string) => loadAccountCsv(fs.readFileSync(`data/${file}`, "utf8"), file).transactions;
const transactions = [...load("Account1.csv"), ...load("Account3.csv")];
const daily = getBalanceSeries(transactions, "CHF", 0, cardAccounts(transactions).privateAccount).daily;
const payments = cardPayments(transactions).map((p) => p.date);

test("3,000 in June: paid on 23 June, goes 3,000 below the lowest point, room from December", () => {
  const r = replayPurchase(daily, 3000, 6, payments);
  assert.equal(r.paidOn, "2025-06-23");
  assert.deepEqual(r.actualLowest, { date: "2025-10-21", balance: -7681.45 });
  assert.deepEqual(r.newLowest, { date: "2025-10-21", balance: -10681.45 });
  assert.equal(r.belowActualLowest, 3000);
  assert.equal(r.earliestOkMonth, 12);
});

test("after the lowest point a purchase can still dip below it; December leaves room", () => {
  const oct = replayPurchase(daily, 3000, 10, payments);
  assert.equal(oct.newLowest.date, "2025-12-21");
  assert.equal(oct.belowActualLowest, 119.74);
  const dec = replayPurchase(daily, 3000, 12, payments);
  assert.equal(dec.belowActualLowest, 0);
  const room = roomBeforeLowest(daily, payments);
  assert.equal(room[5].room, 0);
  assert.ok(room[11].room > 3000);
});

test("parsing and the prepared answer", () => {
  for (const q of ["3,000", "3000 francs", "3'000", "3k francs"]) assert.equal(parseAmount(q), 3000, q);
  assert.equal(parseAmount("Can I afford a laptop?"), null);
  assert.equal(parseMonth("in June", new Date("2026-03-10")), 6);
  assert.equal(parseMonth("a laptop", new Date("2026-12-10")), 1);
  const afford = SIDE_ANSWERS.find((a) => a.id === "afford")!;
  const script = (q: string) => (typeof afford.script === "function" ? afford.script(q) : afford.script);
  assert.deepEqual(script("Can I afford a laptop?").map((b) => b.say), [AFFORD_ASK_AMOUNT_LINE]);
  const june = script("Can I afford 3,000 francs in June?").map((b) => b.say);
  assert.equal(june[0], "Replaying last year, bought in June, that takes you to 10,681 francs below the year's start by October.");
  assert.equal(june.length, 3);
  assert.equal(script("Can I afford 3k in December?").length, 2);
});
