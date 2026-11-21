import { z } from "zod";
import { financialAgentSystemPrompt } from "@/lib/agent-prompt";
import type { FinancialToolName } from "@/lib/financial-agent";

const chatResponseSchema = z.object({
  message: z.object({ content: z.string().max(4000) })
});
const tagsResponseSchema = z.object({
  models: z.array(z.object({ name: z.string() }))
});

const localProviderHosts = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);
const defaultModel = "MichelRosselli/apertus:latest";

export class LlmProviderError extends Error {
  constructor() {
    super("The local Ollama provider could not complete the request.");
    this.name = "LlmProviderError";
  }
}

function getOllamaConfig() {
  const baseUrl = process.env.OLLAMA_BASE_URL?.trim() || "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL?.trim() || defaultModel;
  try {
    const base = new URL(baseUrl);
    if (base.protocol !== "http:" || !localProviderHosts.has(base.hostname) || base.username || base.password) {
      throw new Error("Ollama must be configured on this device.");
    }
    base.pathname = "/";
    base.search = "";
    base.hash = "";
    return { base, model };
  } catch {
    throw new LlmProviderError();
  }
}

export async function getOllamaConnectionStatus() {
  const { base, model } = getOllamaConfig();
  try {
    const response = await fetch(new URL("/api/tags", base), {
      signal: AbortSignal.timeout(2500),
      cache: "no-store"
    });
    if (!response.ok) return { connected: false, model };
    const parsed = tagsResponseSchema.safeParse(await response.json());
    return {
      connected: parsed.success && parsed.data.models.some((item) => item.name === model),
      model
    };
  } catch {
    return { connected: false, model };
  }
}

export async function explainFinancialToolResult(question: string, tool: FinancialToolName, toolResult: string): Promise<string> {
  const { base, model } = getOllamaConfig();
  let response: Response;
  try {
    response = await fetch(new URL("/api/chat", base), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        stream: false,
        options: { temperature: 0.2 },
        messages: [
          { role: "system", content: financialAgentSystemPrompt },
          { role: "user", content: `User question: ${question}\nSelected deterministic tool: ${tool}\nTool result (verified, JSON): ${toolResult}` }
        ]
      }),
      signal: AbortSignal.timeout(120_000),
      cache: "no-store"
    });
  } catch {
    throw new LlmProviderError();
  }
  if (!response.ok) throw new LlmProviderError();

  let content: string;
  try {
    const parsed = chatResponseSchema.safeParse(await response.json());
    content = parsed.success ? parsed.data.message.content.trim() : "";
  } catch {
    throw new LlmProviderError();
  }
  if (!content || content.length > 2000) throw new LlmProviderError();

  const isBrainstorm = /\b(brainstorm|ideas?|suggest(?:ion)?s?|meal|recipe|food)\b/i.test(question);
  const hasFinancialFigure = /(?:\b(?:CHF|EUR|USD)\s*[\d,.]+|[\d,.]+\s*\b(?:CHF|EUR|USD|francs?|euros?|dollars?)\b|[$€£]\s*[\d,.]+|%|percent|(?:save|savings|spend|spending|cost|price|budget|income|expense|profit|loss|return)\b.{0,40}\d|\d.{0,40}\b(?:save|savings|spend|spending|cost|price|budget|income|expense|profit|loss|return)\b)/i.test(content);
  const hasUnverifiedNumber = /\d|%|CHF|EUR|USD|francs?|euros?|dollars?|\b(one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand|million|percent)\b/i.test(content);
  if (hasFinancialFigure || (!isBrainstorm && hasUnverifiedNumber)) {
    return "I’ve calculated this from your imported financial data. See the verified figures below.";
  }
  return content;
}
