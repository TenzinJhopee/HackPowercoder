import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildFactsExport } from "../lib/facts-export";
import { loadAccountCsv } from "../lib/load-accounts";

/** `npm run facts:export` → public/facts.json, computed from data/*.csv (no server needed). */
async function main() {
  const files = ["Account1.csv", "Account3.csv"];
  const loaded = await Promise.all(files.map(async (file) => loadAccountCsv(await readFile(path.join("data", file), "utf8"), file).transactions));
  const transactions = loaded.flat();
  const facts = buildFactsExport(transactions, "CHF");
  await mkdir("public", { recursive: true });
  await writeFile(path.join("public", "facts.json"), `${JSON.stringify(facts, null, 2)}\n`);
  console.log(`public/facts.json written: ${transactions.length} transactions, spending ${facts.total_spending}, card budget ${facts.card_budget_monthly}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
