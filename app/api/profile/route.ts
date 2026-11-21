import { z } from "zod";
import { getMerchantTags, getTransactions, setMerchantTag } from "@/lib/database";
import { necessities, spendingGroups } from "@/lib/merchant-tags";
import { getSpendingProfile } from "@/lib/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const currency = new URL(request.url).searchParams.get("currency") || "CHF";
  const [transactions, tags] = await Promise.all([getTransactions(), getMerchantTags()]);
  return Response.json(getSpendingProfile(transactions, currency, tags), { headers: { "Cache-Control": "no-store" } });
}

const tagSchema = z.object({
  merchant: z.string().trim().min(1).max(200),
  necessity: z.enum(necessities),
  group: z.enum(spendingGroups)
}).strict();

/** User corrects a merchant tag ("this is not flexible, it's my commute"). */
export async function PUT(request: Request) {
  const parsed = tagSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Send merchant, necessity and group." }, { status: 400 });
  await setMerchantTag(parsed.data.merchant, parsed.data.necessity, parsed.data.group);
  return Response.json({ ok: true });
}
