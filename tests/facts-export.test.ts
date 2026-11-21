import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { AFFORD_EXAMPLE, MAIN, SIDE_ANSWERS, allLines, FIXED_LINES, sideScripts } from "../content/scripts";
import { cardStatusAsOf } from "../lib/card-cycle";
import { audioKey } from "../lib/contracts";
import { allowedNumbers, buildFacts, type FactsSummary } from "../lib/facts";
import { buildFactsExport } from "../lib/facts-export";
import { loadAccountCsv } from "../lib/load-accounts";

const load = (file: string) => loadAccountCsv(fs.readFileSync(`data/${file}`, "utf8"), file).transactions;
const transactions = [...load("Account1.csv"), ...load("Account3.csv")];
const facts = buildFactsExport(transactions, "CHF");

test("plan section 5 acceptance numbers", () => {
  assert.equal(facts.yearly_income_incl_13th_salary, 97032);
  assert.equal(facts.year_end_net_vs_start, 8816);
  assert.equal(facts.without_13th_salary, 1352);
  assert.equal(facts.month_end_balance_vs_start_jan_dec[8], -5640);
  assert.deepEqual(facts.monthly_spending_jan_dec, [5994, 7063, 6028, 6626, 6435, 10365, 12363, 4565, 14363, 3845, 7390, 3342]);
  assert.equal(facts.total_spending, 88379);
  const c = facts.categories_yearly_net_of_refunds;
  assert.deepEqual([c.Housing, c.Electronics, c.Travel, c.Health, c.Bike], [22462, 13160, 12938, 12335, 11523]);
  assert.deepEqual([c["Online shopping"], c.Clothing, c.Transport, c["Food and drink"], c.Tax], [5691, 4597, 2619, 2180, 630]);
  const parts = (m: number) => Object.fromEntries(facts.monthly_breakdown_parts[String(m)].map((p) => [p.name, p.value]));
  assert.deepEqual(parts(9), { "Plane tickets": 7458, Apple: 2273, "Rent and electricity": 2030, "Health insurance": 982, Other: 1620 });
  assert.deepEqual(parts(7), { Bike: 5329, Rent: 1820, "London trip": 1746, Clothing: 1136, "Health insurance": 982, Other: 1350 });
  assert.equal(facts.refunds.merchants.find((m) => m.merchant === "Abercrombie & Fitch")?.net, 906);
  assert.ok(facts.gaps.some((g) => g.id === "missing_payment:Krankenkasse:2025-02" && g.month === 2 && g.usual_amount === 982));
  assert.ok(facts.gaps.some((g) => g.id === "no_pillar_3a") && facts.gaps.some((g) => g.id === "no_savings"));
  assert.deepEqual(facts.offer, { product: "pillar 3a", monthly: 200, after_one_year: 2400 });
  // The 100 franc example cancels Netflix first, then cuts two habits.
  assert.deepEqual(facts.savings.example.cuts.map((c) => [c.kind, c.merchant, c.saves]), [["cancel", "Netflix", 21], ["habit", "Orell Fuessli", 73], ["habit", "Kantine AG", 13]]);
  assert.deepEqual([facts.savings.example.monthly, facts.savings.example.yearly, facts.savings.example.reachable], [107, 1284, 161]);
});

test("every month's parts add up to the month's spending", () => {
  for (let m = 1; m <= 12; m++) {
    const sum = facts.monthly_breakdown_parts[String(m)].reduce((s, p) => s + p.value, 0);
    assert.equal(sum, facts.monthly_spending_jan_dec[m - 1], `month ${m}`);
  }
  const trips = Object.values(facts.travel_breakdown).reduce((a, b) => a + b, 0);
  assert.equal(trips, facts.categories_yearly_net_of_refunds.Travel);
});

test("card cycle: budget about 3,600, four statements crossed, live view", () => {
  assert.equal(facts.card_budget_monthly, 3600);
  const crossed = facts.card_cycles.filter((c) => c.crossed_on);
  assert.deepEqual(crossed.map((c) => c.statement), [6125, 9036, 10019, 3916]);
  // The statement equals the net card spending since the previous payment (mean deviation about 100).
  const deviation = facts.card_cycles.reduce((s, c) => s + Math.abs((c.statement ?? 0) - c.spent), 0) / facts.card_cycles.length;
  assert.ok(deviation < 150, `mean deviation ${deviation}`);
  const live = cardStatusAsOf(transactions, "2025-09-18");
  assert.equal(live.crossedOn, "2025-09-18");
  assert.ok(live.budgetLeft < 0);
  const early = cardStatusAsOf(transactions, "2025-09-01");
  assert.equal(early.crossedOn, null);
  assert.ok(early.budgetLeft > 0);
  assert.ok(buildFacts(transactions, "CHF").insights.some((i) => i.id === "card_cycle"));
});

test("buildFacts allows the offer figures", () => {
  const allowed = allowedNumbers(buildFacts(transactions, "CHF"));
  for (const n of [200, 2400, 3600]) assert.ok(allowed.has(n), String(n));
});

const words = (text: string) => text.split(/\s+/).filter(Boolean);
const bare = (word: string) => word.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "").toLocaleLowerCase("en");
const numbersIn = (text: string) =>
  (text.replace(/\b\d+(st|nd|rd|th|a)\b/gi, "").match(/\d[\d,']*(?:\.\d+)?/g) ?? []).map((t) => Number(t.replace(/[,']/g, "")));

test("scripts: shape, tone limits and bridges", () => {
  assert.equal(MAIN.length, 10);
  assert.ok(MAIN.every((b) => b.bridge), "every main beat has a bridge");
  assert.equal(MAIN.at(-1)?.offer, true);
  assert.equal(MAIN.filter((b) => b.offer).length, 1);
  const mainText = MAIN.map((b) => b.say).join(" ");
  for (const month of ["June", "July", "October", "December"]) assert.ok(mainText.includes(month), month);
  assert.ok(!/sept/i.test(MAIN.map((b) => `${b.say} ${b.bridge}`).join(" ")), "main script must not mention September");
  assert.equal(MAIN[3].bridge, "We were talking about your summer months.");
  const beats = [...MAIN, ...SIDE_ANSWERS.flatMap((a) => sideScripts(a).flat())];
  for (const beat of beats) {
    assert.ok(words(beat.say).length <= 18, `too long: ${beat.say}`);
    assert.ok((beat.cues?.length ?? 0) <= 2, beat.say);
    assert.ok(!/\d+(,\d{3})?\s*CHF|CHF/.test(beat.say), `say "francs", not CHF: ${beat.say}`);
    for (const cue of beat.cues ?? []) {
      const spoken = words(beat.say).map(bare);
      const index = spoken.indexOf(bare(cue.word));
      assert.ok(index > 0, `cue word "${cue.word}" must appear and not be first in: ${beat.say}`);
    }
  }
  for (const script of SIDE_ANSWERS.flatMap(sideScripts)) assert.ok(script.length >= 2 && script.length <= 4);
  assert.equal(SIDE_ANSWERS.find((a) => a.match(AFFORD_EXAMPLE))?.id, "afford");
  assert.equal(SIDE_ANSWERS.find((a) => a.match("Can I afford it in June?"))?.id, "afford");
  assert.ok(SIDE_ANSWERS.find((a) => a.id === "september")?.match("Wait, why is September so high?"));
  assert.ok(SIDE_ANSWERS.find((a) => a.id === "november")?.match("Why was November high?"));
  assert.ok(!SIDE_ANSWERS.some((a) => a.match("what about my savings?")));
});

test("scripts: every number exists in facts.json", () => {
  // The daily balance series is input for lib/afford.ts, not something the advisor says.
  const allowed = allowedNumbers({ ...facts, private_balance_daily: [] } as unknown as FactsSummary);
  const texts = [...allLines()];
  for (const beat of [...MAIN, ...SIDE_ANSWERS.flatMap((a) => sideScripts(a).flat())]) {
    for (const cue of beat.cues ?? []) if (cue.figure) assert.ok(allowed.has(cue.figure.value), `cue figure ${cue.figure.value}`);
    if (beat.figure) assert.ok(allowed.has(beat.figure.value), `figure ${beat.figure.value}`);
    for (const part of beat.scene?.breakdown?.parts ?? []) assert.ok(allowed.has(part.value));
  }
  for (const text of texts) for (const n of numbersIn(text)) assert.ok(allowed.has(n), `"${n}" in: ${text}`);
});

test("scripts: lines are unique and have distinct audio keys", () => {
  const lines = allLines();
  assert.equal(new Set(lines.map(audioKey)).size, lines.length);
  for (const line of FIXED_LINES) assert.ok(lines.includes(line));
});
