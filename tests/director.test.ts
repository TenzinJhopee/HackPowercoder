import assert from "node:assert/strict";
import test from "node:test";
import { getTransactions } from "../lib/database";
import { buildSeries, totalOf } from "../lib/director/series";
import { extractNumbers, validateScript, type ValidationContext } from "../lib/director/validate";

const monthlySpending = [5994, 7063, 6028, 6626, 6435, 10365, 12363, 4565, 14363, 3845, 7390, 3342];
// Series values the facts/series would provide; 14363 is September's spending.
const ctx = (overrides: Partial<ValidationContext> = {}): ValidationContext => ({
  currentScene: "monthly",
  allowed: new Set([...monthlySpending, 2273, 7458, 982]),
  monthTotals: monthlySpending,
  ...overrides
});

test("series helper returns the 12 monthly spending values", async () => {
  const series = buildSeries(await getTransactions(), "CHF", 2025);
  assert.deepEqual(series.monthlySpending, monthlySpending);
  assert.equal(series.cardBill.length, 12);
  assert.equal(totalOf(series, "monthly_spending", [1, 2]), 5994 + 7063);
  assert.equal(totalOf(series, "monthly_spending", [13]), null);
});

test("validator drops a beat with an invented number, accepts 14363 and 14,363", () => {
  const result = validateScript(
    {
      script: [
        { say: "September cost 9,876 francs.", scene: { type: "monthly", focus: 9 } },
        { say: "September cost 14,363 francs.", scene: { type: "monthly", focus: 9 } },
        { say: "That is 14363 francs in September.", cues: [{ word: "francs" }] }
      ]
    },
    ctx()
  );
  assert.ok(result.ok);
  assert.equal(result.script.length, 2);
  assert.equal(result.script[0].say, "September cost 14,363 francs.");
  assert.equal(result.dropped.length, 1);
  assert.deepEqual(extractNumbers("About 14,363 or 14'363 in month 9"), [14363, 14363, 9]);
});

test("validator accepts a sum from the total tool and rounding to the nearest 100", () => {
  const ok = validateScript([{ say: "June and July together are 22,728 francs." }, { say: "That is about 14,400 francs." }], ctx({ toolResults: [22728] }));
  assert.ok(ok.ok);
  assert.equal(ok.script.length, 2);
  const bad = validateScript([{ say: "June and July together are 22,728 francs." }], ctx());
  assert.equal(bad.ok, false);
});

test("validator truncates say, forces the first scene and checks cues", () => {
  const long = `Spending ${"word ".repeat(80)}ends`;
  const result = validateScript(
    [{ say: long, scene: { type: "galaxy" }, cues: [{ word: "Spending" }, { word: "missing" }, { word: "word" }, { word: "ends" }, { word: "word" }] }, { say: "Next.", scene: { type: "nope" } }],
    ctx()
  );
  assert.ok(result.ok);
  assert.ok(result.script[0].say.length <= 260);
  assert.deepEqual(result.script[0].scene, { type: "monthly" });
  // The first word, the missing word, the truncated-away word and the duplicate are dropped.
  assert.deepEqual(result.script[0].cues?.map((c) => c.word), ["word"]);
  assert.equal(result.script[1].scene?.type, "monthly");
});

test("breakdown: 3 % rule, Other remainder, invented values", () => {
  const withParts = (parts: { name: string; value: number }[]) =>
    validateScript([{ say: "September is high because of tickets.", scene: { type: "monthly", focus: 9, breakdown: { month: 9, parts } } }], ctx());

  const normal = withParts([{ name: "Plane tickets", value: 7458 }, { name: "Apple", value: 2273 }, { name: "Health insurance", value: 982 }]);
  assert.ok(normal.ok);
  const parts = normal.script[0].scene!.breakdown!.parts;
  assert.deepEqual(parts.at(-1), { name: "Other", value: 14363 - 7458 - 2273 - 982 });

  const tooBig = withParts([{ name: "Plane tickets", value: 7458 }, { name: "Apple", value: 7458 }, { name: "Health insurance", value: 982 }]);
  assert.ok(tooBig.ok);
  assert.equal(tooBig.script[0].scene!.breakdown, undefined);

  const invented = withParts([{ name: "Plane tickets", value: 7777 }]);
  assert.equal(invented.ok, false);
});

test("no beat left means failure", () => {
  assert.equal(validateScript({ script: [{ scene: { type: "monthly" } }] }, ctx()).ok, false);
  assert.equal(validateScript("nope", ctx()).ok, false);
});
