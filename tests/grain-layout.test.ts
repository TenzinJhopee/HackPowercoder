import assert from "node:assert/strict";
import test from "node:test";
import { largestRemainder, pick } from "../client/world/layout";

test("largest remainder: September parts sum to the column (144 grains)", () => {
  const counts = largestRemainder([7458, 2273, 2030, 982, 1620], 144);
  assert.equal(counts.reduce((a, b) => a + b, 0), 144);
  assert.deepEqual(counts, [75, 23, 20, 10, 16]);
  assert.deepEqual(largestRemainder([5, -3, 5], 3), [2, 0, 1]);
});

test("pick matches names and aliases both ways, ignoring short aliases", () => {
  const parts = [
    { name: "Plane tickets", aliases: ["flights"] },
    { name: "Rent and electricity", aliases: ["ev"] },
    { name: "Health insurance" }
  ];
  assert.equal(pick(parts, "plane tickets")?.name, "Plane tickets");
  assert.equal(pick(parts, "insurance")?.name, "Health insurance");
  assert.equal(pick(parts, "the flights in September")?.name, "Plane tickets");
  assert.equal(pick(parts, "devam"), null);
  assert.equal(pick(parts, "Bike"), null);
});
