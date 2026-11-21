import { DIRECTOR_FAILURE_LINE, type DirectorRequest, type DirectorResponse } from "@/lib/contracts";
import { allowedNumbers, buildFacts, type UserNote } from "@/lib/facts";
import type { MerchantTag } from "@/lib/merchant-tags";
import type { Transaction } from "@/lib/models";
import { describeError, generateScript, type GenerateOutput } from "./claude";
import { buildDataBlock, buildUserMessage, DIRECTOR_INSTRUCTIONS } from "./prompt";
import { buildSeries, seriesNumbers } from "./series";
import { stageScript } from "./staging";
import { extractNumbers, validateScript } from "./validate";

export function fallbackResponse(error: string): DirectorResponse {
  return { script: [{ say: DIRECTOR_FAILURE_LINE }], source: "fallback", error };
}

/** Numbers visible on screen (sent by our own client) are legitimate too. */
function numbersIn(value: unknown, into: number[] = [], depth = 0): number[] {
  if (typeof value === "number" && Number.isFinite(value)) into.push(value);
  else if (depth < 6 && Array.isArray(value)) value.forEach((item) => numbersIn(item, into, depth + 1));
  else if (depth < 6 && value && typeof value === "object") Object.values(value).forEach((item) => numbersIn(item, into, depth + 1));
  return into;
}

export interface DirectorInput {
  request: DirectorRequest;
  transactions: Transaction[];
  tags: MerchantTag[];
  notes: UserNote[];
  apiKey: string;
  /** Injectable for tests; defaults to the Claude call. */
  generate?: typeof generateScript;
}

/** Facts -> prompt -> model (with the tools in ./tools) -> validated script, or the fallback line. Never throws. */
export async function runDirector(input: DirectorInput): Promise<DirectorResponse> {
  try {
    const facts = buildFacts(input.transactions, "CHF", input.tags, input.notes);
    const currency = "CHF";
    const series = buildSeries(input.transactions, currency, Number(facts.periodStart.slice(0, 4)));
    // The data is historical: tools work "as of" its last booking, never today.
    const asOf = input.transactions.reduce((last, t) => (t.currency === currency && t.date > last ? t.date : last), "");
    const generate = input.generate ?? generateScript;
    const output: GenerateOutput = await generate(
      {
        instructions: DIRECTOR_INSTRUCTIONS,
        dataBlock: buildDataBlock(facts, series),
        userMessage: buildUserMessage(input.request),
        series,
        transactions: input.transactions,
        currency,
        asOf
      },
      input.apiKey
    );

    const allowed = allowedNumbers(facts);
    // Numbers she says herself ("I need to save 100 francs") may be repeated back, and are the only savings amount besides the offer.
    const questionNumbers = extractNumbers(input.request.question);
    for (const value of questionNumbers) allowed.add(value);
    for (const value of [...seriesNumbers(series), ...numbersIn(input.request.screen.visible)]) {
      allowed.add(value);
      allowed.add(Math.round(value));
    }
    // Shares are stored as fractions (0.35); allow the spoken percentage too.
    for (const value of [...allowed]) if (value > 0 && value < 1) allowed.add(Math.round(value * 100));

    const result = validateScript(output.json, {
      currentScene: input.request.screen.scene,
      allowed,
      monthTotals: series.monthlySpending,
      toolResults: output.toolResults,
      savingsAllowed: [...questionNumbers, facts.offer.monthly, facts.offer.after_one_year],
      allowOffer: !facts.insights.some((i) => i.id === "no_pillar_3a" && i.mode === "resolved" && i.userAnswer === "has_elsewhere")
    });
    if (!result.ok) return fallbackResponse(result.error);
    const script = stageScript(result.script, {
      currentScene: input.request.screen.scene,
      currentFocus: input.request.screen.focus,
      tags: input.tags,
      userNumbers: questionNumbers
    });
    return { script, source: "model" };
  } catch (error) {
    return fallbackResponse(describeError(error));
  }
}
