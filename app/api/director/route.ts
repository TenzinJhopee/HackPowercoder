import { z } from "zod";
import { sceneTypes, type DirectorRequest } from "@/lib/contracts";
import { getMerchantTags, getTransactions, getUserNotes } from "@/lib/database";
import { generateScriptOpenRouter } from "@/lib/director/openrouter";
import { fallbackResponse, runDirector } from "@/lib/director/run";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const requestSchema = z.object({
  question: z.string().trim().min(1).max(500),
  mode: z.enum(["side", "answer"]),
  screen: z.object({
    scene: z.enum(sceneTypes as readonly [string, ...string[]]),
    focus: z.union([z.string(), z.number(), z.null()]),
    lastSentence: z.string().max(600),
    visible: z.unknown().optional(),
    openBar: z.number().int().min(1).max(12).nullable()
  })
});

const headers = { "Cache-Control": "no-store" };

/** POST /api/director {question, screen, mode} -> {script, source, error?}. Failures are 200 with a fallback line so the UI can continue. */
export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Invalid director request.", issues: parsed.error.issues }, { status: 400, headers });

  // OpenRouter (e.g. Gemini) when OPENROUTER_API_KEY is set, otherwise Claude via ANTHROPIC_API_KEY.
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const apiKey = openRouterKey || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return Response.json(fallbackResponse("not_configured"), { headers });

  const [transactions, tags, notes] = await Promise.all([getTransactions(), getMerchantTags(), getUserNotes()]);
  const response = await runDirector({
    request: parsed.data as DirectorRequest,
    transactions,
    tags,
    notes,
    apiKey,
    generate: openRouterKey ? generateScriptOpenRouter : undefined
  });
  return Response.json(response, { headers });
}
