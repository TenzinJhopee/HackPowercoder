import { getTransactions, reseedDatabase } from "@/lib/database";

async function main() {
await reseedDatabase();
const transactions = await getTransactions();
const summary = new Map<string, { count: number; sum: number }>();
for (const t of transactions) {
  const key = `${t.account} ${t.type}`;
  const entry = summary.get(key) ?? { count: 0, sum: 0 };
  entry.count += 1;
  entry.sum += t.amount;
  summary.set(key, entry);
}
console.log(`data/finance.sqlite rebuilt: ${transactions.length} transactions`);
for (const [key, { count, sum }] of [...summary.entries()].sort()) console.log(`  ${key.padEnd(24)} ${String(count).padStart(4)}  ${sum.toFixed(2)}`);
}

void main();
