import Papa from "papaparse";
import { classifyTransaction } from "@/lib/intelligence";
import type { Transaction, TransactionType } from "@/lib/models";

/**
 * Loader for the hackathon export format (one CSV per account):
 * name,type,source_id,source_label,target_id,target_label,transaction_date,value_date,
 * amount,currency,status,exchange_rate,base_amount,base_currency,description
 *
 * Amounts are always positive; direction comes from `type` and from which side the
 * file's own account is on. A transfer between own accounts appears in both files,
 * so each file only contributes its own side of it (no double counting).
 */
interface ExportRow {
  name: string;
  type: string;
  source_id: string;
  source_label: string;
  target_id: string;
  target_label: string;
  transaction_date: string;
  amount: string;
  currency: string;
  exchange_rate: string;
  base_amount: string;
  base_currency: string;
}

export interface LoadedAccountFile {
  accountId: string;
  accountLabel: string;
  transactions: Transaction[];
  /** Rows whose currency differs from base_currency but exchange_rate is 1.0 (rate not trustworthy). */
  suspectRateRows: number;
}

const isOwnAccountId = (id: string) => /^Account\d+$/i.test(id);
const round = (value: number) => Math.round(value * 100) / 100;

function ownAccount(rows: ExportRow[]) {
  const counts = new Map<string, { label: string; count: number }>();
  for (const row of rows) {
    for (const [id, label] of [[row.source_id, row.source_label], [row.target_id, row.target_label]]) {
      if (!isOwnAccountId(id)) continue;
      const entry = counts.get(id) ?? { label, count: 0 };
      entry.count += 1;
      counts.set(id, entry);
    }
  }
  const [id, entry] = [...counts.entries()].sort((a, b) => b[1].count - a[1].count)[0] ?? [];
  if (!id || !entry) throw new Error("No own account (AccountN) found in file.");
  return { accountId: id, accountLabel: entry.label };
}

export function loadAccountCsv(text: string, sourceFile: string): LoadedAccountFile {
  const parsed = Papa.parse<ExportRow>(text, { header: true, skipEmptyLines: "greedy", transformHeader: (h) => h.trim() });
  const rows = parsed.data.filter((row) => row.transaction_date && row.type);
  const { accountId, accountLabel } = ownAccount(rows);

  // A merchant that also receives our payments is refunding us when it sends money back.
  const paidMerchants = new Set(rows.filter((row) => row.type === "expense" && row.source_id === accountId).map((row) => row.target_id));

  let suspectRateRows = 0;
  const transactions: Transaction[] = rows.map((row, index) => {
    const outgoing = row.source_id === accountId;
    const counterpartyId = outgoing ? row.target_id : row.source_id;
    const counterpartyLabel = outgoing ? row.target_label : row.source_label;
    const value = Math.abs(Number(row.base_amount || row.amount));
    if (!Number.isFinite(value)) throw new Error(`${sourceFile} row ${index + 2}: invalid amount.`);
    if (row.currency !== row.base_currency && Number(row.exchange_rate) === 1) suspectRateRows += 1;

    let type: TransactionType;
    if (row.type === "transfer" || isOwnAccountId(counterpartyId)) type = "transfer";
    else if (outgoing) type = "expense";
    else type = paidMerchants.has(counterpartyId) || /refund/i.test(row.name) ? "refund" : "income";

    const base = {
      type,
      description: row.name,
      merchant: isOwnAccountId(counterpartyId) ? counterpartyLabel : counterpartyLabel || row.name
    };
    return {
      id: `${accountId}:${index + 2}`,
      date: row.transaction_date,
      description: row.name,
      amount: round(outgoing ? -value : value),
      originalAmount: round(Math.abs(Number(row.amount))),
      currency: row.base_currency || row.currency,
      category: classifyTransaction(base),
      categorySource: "rule" as const,
      type,
      account: accountLabel,
      merchant: base.merchant,
      isRecurring: false,
      confidence: 1,
      sourceFile
    };
  });

  return { accountId, accountLabel, transactions, suspectRateRows };
}
