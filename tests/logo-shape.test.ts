import assert from "node:assert/strict";
import { test } from "node:test";
import { inLogo, inLogoGap, logoPoints } from "../client/world/logo";

test("logoPoints fills the mark with exactly n points, none in the gap", () => {
  const { points } = logoPoints(970, 0.7);
  assert.equal(points.length, 970);
  for (const p of points) {
    assert.ok(inLogo(p.x, p.y), `outside: ${p.x},${p.y}`);
    assert.ok(!inLogoGap(p.x, p.y), `in gap: ${p.x},${p.y}`);
  }
  // The centre lies in the gap; the empty corners (top-right, bottom-left) are outside.
  assert.ok(inLogoGap(0, 0) && !inLogo(0, 0));
  assert.ok(!inLogo(0.7, -0.7) && !inLogo(-0.7, 0.7));
});
