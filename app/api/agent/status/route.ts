import { getOllamaConnectionStatus } from "@/lib/llm/provider";

export const runtime = "nodejs";

export async function GET() {
  try {
    const status = await getOllamaConnectionStatus();
    return Response.json(status, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({
      connected: false,
      model: process.env.OLLAMA_MODEL?.trim() || "MichelRosselli/apertus:latest"
    }, { headers: { "Cache-Control": "no-store" } });
  }
}
