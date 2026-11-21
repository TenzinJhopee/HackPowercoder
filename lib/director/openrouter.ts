import { DIRECTOR_TIMEOUT_MS, DirectorError, parseJsonObject, type GenerateInput, type GenerateOutput } from "./claude";
import { directorTools, runDirectorTool } from "./tools";

/**
 * Director via OpenRouter's OpenAI-compatible Chat Completions API (e.g. Gemini 3.1 Flash Lite).
 * Server-side only: reads OPENROUTER_API_KEY. Same contract as the Claude path, so validation is unchanged.
 */

export const DEFAULT_OPENROUTER_MODEL = "google/gemini-3.1-flash-lite";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const MAX_TURNS = 4;
const MAX_TOKENS = 4000;

type ToolCall = { id: string; type: "function"; function: { name: string; arguments: string } };
type ChatMessage =
  | { role: "system" | "user"; content: string }
  | { role: "assistant"; content: string | null; tool_calls?: ToolCall[] }
  | { role: "tool"; tool_call_id: string; content: string };
type ChatResponse = {
  choices?: { finish_reason?: string; message?: { content?: string | null; tool_calls?: ToolCall[] } }[];
  error?: { code?: number | string; message?: string };
};

const openRouterTools = directorTools.map((tool) => ({
  type: "function",
  function: { name: tool.name, description: tool.description, parameters: tool.input_schema }
}));

export async function generateScriptOpenRouter(
  input: GenerateInput,
  apiKey: string,
  model = process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_MODEL
): Promise<GenerateOutput> {
  const deadline = Date.now() + DIRECTOR_TIMEOUT_MS;
  const toolResults: number[] = [];
  const messages: ChatMessage[] = [
    { role: "system", content: `${input.instructions}\n\n${input.dataBlock}` },
    { role: "user", content: input.userMessage }
  ];

  for (let turn = 0; turn < MAX_TURNS; turn += 1) {
    const remaining = deadline - Date.now();
    if (remaining < 500) throw new DirectorError("timeout", "The director ran out of time.");

    let response: Response;
    try {
      response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "X-Title": "Pfagent" },
        body: JSON.stringify({ model, max_tokens: MAX_TOKENS, temperature: 0.2, tools: openRouterTools, messages }),
        signal: AbortSignal.timeout(remaining),
        cache: "no-store"
      });
    } catch (error) {
      throw new DirectorError(error instanceof DOMException && error.name === "TimeoutError" ? "timeout" : "network_error");
    }
    if (response.status === 401 || response.status === 403) throw new DirectorError("auth_failed");
    if (response.status === 429) throw new DirectorError("rate_limited");
    if (!response.ok) throw new DirectorError(`api_error_${response.status}`);

    const payload = (await response.json().catch(() => ({}))) as ChatResponse;
    if (payload.error) throw new DirectorError(`api_error_${payload.error.code ?? "unknown"}`, payload.error.message);
    const choice = payload.choices?.[0];
    const message = choice?.message;
    if (!message) throw new DirectorError("no_json", "The model returned no message.");
    if (choice.finish_reason === "length") throw new DirectorError("max_tokens", "The model ran out of tokens.");

    if (message.tool_calls?.length) {
      messages.push({ role: "assistant", content: message.content ?? null, tool_calls: message.tool_calls });
      for (const call of message.tool_calls) {
        const result = runDirectorTool(call.function?.name ?? "", call.function?.arguments ?? "{}", input);
        toolResults.push(...result.numbers);
        messages.push({ role: "tool", tool_call_id: call.id, content: result.text });
      }
      continue;
    }

    return { json: parseJsonObject(message.content ?? ""), toolResults };
  }
  throw new DirectorError("too_many_turns", "The model kept calling tools.");
}
