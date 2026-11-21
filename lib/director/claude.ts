import Anthropic from "@anthropic-ai/sdk";
import { totalOf, seriesNames, type Series } from "./series";

/** Server-side only: reads ANTHROPIC_API_KEY. Never import from client code. */

export const DEFAULT_MODEL = "claude-sonnet-5-5";
export const DIRECTOR_TIMEOUT_MS = 15_000;
const MAX_TURNS = 4;
const MAX_TOKENS = 4000;

export class DirectorError extends Error {
  constructor(public readonly code: string, message?: string) {
    super(message ?? code);
  }
}

/** Plan 9.1: the one tool. Executed in code, so the model never adds up numbers itself. */
const totalTool: Anthropic.Tool = {
  name: "total",
  description: "Adds up the chosen months of a series. Use it whenever you need a total.",
  input_schema: {
    type: "object",
    properties: {
      series: { type: "string", enum: [...seriesNames] },
      months: { type: "array", items: { type: "integer", minimum: 1, maximum: 12 } }
    },
    required: ["series", "months"]
  }
};

export interface GenerateInput {
  instructions: string;
  /** Facts + series; marked for prompt caching. */
  dataBlock: string;
  userMessage: string;
  series: Series;
}

export interface GenerateOutput {
  /** The parsed final JSON (`{"script":[...]}`), not yet validated. */
  json: unknown;
  /** Every `total` result produced while answering (these numbers may be spoken). */
  toolResults: number[];
}

let client: Anthropic | undefined;
function getClient(apiKey: string) {
  client ??= new Anthropic({ apiKey, maxRetries: 0 });
  return client;
}

/** The first `{ ... }` of the text, tolerating a stray code fence. */
export function parseJsonObject(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) throw new DirectorError("no_json", "The model returned no JSON.");
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    throw new DirectorError("invalid_json", "The model returned invalid JSON.");
  }
}

function runTotal(input: unknown, series: Series): { text: string; value?: number } {
  const args = (typeof input === "object" && input !== null ? input : {}) as { series?: unknown; months?: unknown };
  const name = seriesNames.find((candidate) => candidate === args.series);
  const total = name && Array.isArray(args.months) ? totalOf(series, name, args.months as number[]) : null;
  if (total === null || !name) return { text: 'Invalid input: "series" must be monthly_spending or card_bill and "months" a list of integers 1-12.' };
  return { text: String(total), value: total };
}

/** Calls Claude with the facts block cached, executes `total` calls, and returns the final JSON. */
export async function generateScript(input: GenerateInput, apiKey: string, model = process.env.CLAUDE_MODEL || DEFAULT_MODEL): Promise<GenerateOutput> {
  const anthropic = getClient(apiKey);
  const deadline = Date.now() + DIRECTOR_TIMEOUT_MS;
  const toolResults: number[] = [];
  const messages: Anthropic.MessageParam[] = [{ role: "user", content: input.userMessage }];
  // Side answers are short and latency matters; CLAUDE_EFFORT=off disables the parameter for models without effort support.
  const effort = (process.env.CLAUDE_EFFORT || "low") as "low" | "medium" | "high" | "off";

  for (let turn = 0; turn < MAX_TURNS; turn += 1) {
    const remaining = deadline - Date.now();
    if (remaining < 500) throw new DirectorError("timeout", "The director ran out of time.");

    const response = await anthropic.messages.create(
      {
        model,
        max_tokens: MAX_TOKENS,
        system: [
          { type: "text", text: input.instructions },
          { type: "text", text: input.dataBlock, cache_control: { type: "ephemeral" } }
        ],
        tools: [totalTool],
        messages,
        ...(effort === "off" ? {} : { output_config: { effort } })
      },
      { timeout: remaining, maxRetries: 0 }
    );

    if (response.stop_reason === "refusal") throw new DirectorError("refusal", "The model declined to answer.");
    if (response.stop_reason === "max_tokens") throw new DirectorError("max_tokens", "The model ran out of tokens.");

    if (response.stop_reason === "tool_use") {
      // Pass the whole content back (thinking blocks included), answer all tool calls in one user message.
      messages.push({ role: "assistant", content: response.content });
      const results: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        const result = block.name === "total" ? runTotal(block.input, input.series) : { text: `Unknown tool ${block.name}.` };
        if (result.value !== undefined) toolResults.push(result.value);
        results.push({ type: "tool_result", tool_use_id: block.id, content: result.text, ...(result.value === undefined ? { is_error: true } : {}) });
      }
      messages.push({ role: "user", content: results });
      continue;
    }

    const text = response.content.flatMap((block) => (block.type === "text" ? [block.text] : [])).join("\n");
    return { json: parseJsonObject(text), toolResults };
  }
  throw new DirectorError("too_many_turns", "The model kept calling tools.");
}

/** A short machine-readable reason for logs and the `error` field. */
export function describeError(error: unknown): string {
  if (error instanceof DirectorError) return error.code;
  if (error instanceof Anthropic.APIConnectionTimeoutError) return "timeout";
  if (error instanceof Anthropic.AuthenticationError) return "auth_failed";
  if (error instanceof Anthropic.RateLimitError) return "rate_limited";
  if (error instanceof Anthropic.APIError) return `api_error_${error.status ?? "unknown"}`;
  return "unexpected_error";
}
