import { getMerchantTags, getTransactions, getUserNotes } from "@/lib/database";
import { buildFacts } from "@/lib/facts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** The facts summary the agent narrates from. */
export async function GET(request: Request) {
  const currency = new URL(request.url).searchParams.get("currency") || "CHF";
  const [transactions, tags, notes] = await Promise.all([getTransactions(), getMerchantTags(), getUserNotes()]);
  return Response.json(buildFacts(transactions, currency, tags, notes), { headers: { "Cache-Control": "no-store" } });
}
