/**
 * The takeaway banner: the gist of the sentence the advisor is speaking, shown whole the moment the sentence
 * starts (the caption reveals it word by word). No model is involved: the sentence is split into clauses and the
 * clause that carries the news is picked.
 */

/** A bare year such as 2025 is a date, not news. */
const isYear = (value: string) => /^(19|20)\d{2}$/.test(value);

/** Numbers in a clause as written ("97,032", "14'363", "3,000", "50"). */
const numbersIn = (clause: string) => clause.match(/\d[\d',.]*\d|\d/g) ?? [];

const hasNews = (clause: string) => numbersIn(clause).some((n) => !isYear(n));

/** Splits a sentence into its natural parts: semicolons, colons, dashes and commas. */
function clausesOf(sentence: string): string[] {
  return sentence
    .split(/;\s+|:\s+|\s+[—–-]\s+|,\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

/**
 * The key phrase of a sentence: the first clause that contains a figure (not just a year), otherwise the first
 * clause; at most `maxWords` words; first letter capital; no closing full stop.
 */
export function keyPhrase(sentence: string, maxWords = 10): string {
  const clean = sentence.replace(/\s+/g, " ").trim().replace(/[.!]+$/, "");
  if (!clean) return "";
  const clauses = clausesOf(clean);
  let pick = clauses.find(hasNews) ?? clauses[0] ?? clean;
  const words = pick.split(" ");
  if (words.length > maxWords) pick = `${words.slice(0, maxWords).join(" ")}…`;
  return pick.charAt(0).toUpperCase() + pick.slice(1);
}

/** Splits a phrase into plain text and the figures in it, so the figures can be highlighted. */
export function splitFigures(phrase: string): { text: string; figure: boolean }[] {
  return phrase
    .split(/(\d[\d',.]*\d|\d)/g)
    .filter((part) => part !== "")
    .map((part) => ({ text: part, figure: /^\d/.test(part) && !isYear(part) }));
}
