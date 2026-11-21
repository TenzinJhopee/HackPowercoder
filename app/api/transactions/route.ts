import { getTransactions, initializeDatabase } from "@/lib/database";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await initializeDatabase();
  const transactions = await getTransactions();
  return Response.json({
    count: transactions.length,
    accounts: [...new Set(transactions.map((transaction) => transaction.account))].sort(),
    currencies: [...new Set(transactions.map((transaction) => transaction.currency))].sort(),
    transactions
  }, { headers: { "Cache-Control": "no-store" } });
}
