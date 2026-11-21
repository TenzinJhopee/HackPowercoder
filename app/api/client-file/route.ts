import { renderClientFile } from "@/lib/client-file";
import { getMerchantTags, getTransactions, getUserNotes } from "@/lib/database";
import { buildFacts } from "@/lib/facts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** "What the bank knows about me" as Markdown. */
export async function GET() {
  const [transactions, tags, notes] = await Promise.all([getTransactions(), getMerchantTags(), getUserNotes()]);
  return new Response(renderClientFile(buildFacts(transactions, "CHF", tags, notes)), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "no-store" }
  });
}
