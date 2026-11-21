import assert from "node:assert/strict";
import test from "node:test";
import { MAIN } from "../content/scripts";
import { keyPhrase, splitFigures } from "../lib/takeaway";

test("the clause with the figure is the key phrase", () => {
  assert.equal(keyPhrase("September is your tallest bar at 14,363 francs; let me open it."), "September is your tallest bar at 14,363 francs");
  assert.equal(keyPhrase("Here is every month of spending, twelve columns that together add up to 88,379 francs."), "Twelve columns that together add up to 88,379 francs");
});

test("a bare year is not news", () => {
  assert.equal(keyPhrase("This is your 2025, Jeanine: 97,032 francs came in, and each grain is a hundred francs."), "97,032 francs came in");
});

test("without a figure the first clause is used, and questions keep their mark", () => {
  assert.equal(keyPhrase("Do you have a 3a account at another bank, or perhaps pay elsewhere?"), "Do you have a 3a account at another bank");
  assert.equal(keyPhrase("Was it paid elsewhere?"), "Was it paid elsewhere?");
});

test("long phrases are cut at ten words with an ellipsis", () => {
  const phrase = keyPhrase("In February I don't see your 982 francs health insurance payment in the account at all; was it paid elsewhere?");
  assert.ok(phrase.endsWith("…"));
  assert.equal(phrase.replace("…", "").split(" ").length, 10);
});

test("empty and punctuation-only input gives nothing", () => {
  assert.equal(keyPhrase(""), "");
  assert.equal(keyPhrase("  ... "), "");
});

test("figures are separated so they can be highlighted; years are not", () => {
  assert.deepEqual(splitFigures("Spent 14'363 in 2025"), [
    { text: "Spent ", figure: false },
    { text: "14'363", figure: true },
    { text: " in ", figure: false },
    { text: "2025", figure: false }
  ]);
});

test("every main beat gets a short, non-empty banner", () => {
  for (const beat of MAIN) {
    const phrase = keyPhrase(beat.say);
    assert.ok(phrase.length > 0, `beat "${beat.say.slice(0, 30)}" has a phrase`);
    assert.ok(phrase.split(" ").length <= 11, `"${phrase}" is short`);
  }
});
