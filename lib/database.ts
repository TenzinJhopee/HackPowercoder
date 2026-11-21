import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import Papa from "papaparse";
import { deduplicateTransactions } from "@/lib/intelligence";
import { detectColumnMapping, normalizeRows } from "@/lib/csv";
import type { ParsedCsvFile, Transaction } from "@/lib/models";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "finance.sqlite");

let database: DatabaseSync | undefined;
let initialized: Promise<void> | undefined;

function getDatabase() {
  if (!database) {
    fs.mkdirSync(dataDirectory, { recursive: true });
    database = new DatabaseSync(databasePath);
    database.exec(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        description TEXT NOT NULL,
        amount REAL NOT NULL,
        original_amount REAL NOT NULL,
        currency TEXT NOT NULL,
        category TEXT NOT NULL,
        category_source TEXT,
        type TEXT NOT NULL,
        account TEXT NOT NULL,
        merchant TEXT NOT NULL,
        is_recurring INTEGER NOT NULL,
        confidence REAL NOT NULL,
        source_file TEXT
      );
      CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
      CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account);
    `);
  }
  return database;
}

function readSeedTransactions() {
  const files = [
    path.join(dataDirectory, "Account1.csv"),
    path.join(dataDirectory, "Account3.csv")
  ];
  const transactions: Transaction[] = [];
  for (const filePath of files) {
    const text = fs.readFileSync(filePath, "utf8");
    const result = Papa.parse<Record<string, unknown>>(text, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (header) => header.trim()
    });
    const parsedFile: ParsedCsvFile = {
      id: path.basename(filePath),
      name: path.basename(filePath),
      headers: result.meta.fields ?? [],
      rows: result.data,
      mapping: detectColumnMapping(result.meta.fields ?? []),
      parseWarnings: result.errors.map((error) => `Row ${error.row ?? "?"}: ${error.message}`)
    };
    transactions.push(...normalizeRows(parsedFile).transactions);
  }
  return deduplicateTransactions(transactions).transactions;
}

export async function initializeDatabase() {
  if (!initialized) {
    initialized = (async () => {
      const db = getDatabase();
      const count = db.prepare("SELECT COUNT(*) AS count FROM transactions").get() as { count: number };
      if (count.count === 0) {
        const transactions = readSeedTransactions();
        const insert = db.prepare(`
          INSERT OR REPLACE INTO transactions (
            id, date, description, amount, original_amount, currency, category,
            category_source, type, account, merchant, is_recurring, confidence, source_file
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        db.exec("BEGIN");
        try {
          for (const transaction of transactions) {
            insert.run(
              transaction.id,
              transaction.date,
              transaction.description,
              transaction.amount,
              transaction.originalAmount,
              transaction.currency,
              transaction.category,
              transaction.categorySource ?? null,
              transaction.type,
              transaction.account,
              transaction.merchant,
              transaction.isRecurring ? 1 : 0,
              transaction.confidence,
              transaction.sourceFile ?? null
            );
          }
          db.exec("COMMIT");
        } catch (error) {
          db.exec("ROLLBACK");
          throw error;
        }
      }
    })();
  }
  await initialized;
}

export async function getTransactions(): Promise<Transaction[]> {
  await initializeDatabase();
  const rows = getDatabase().prepare(`
    SELECT id, date, description, amount, original_amount, currency, category,
           category_source, type, account, merchant, is_recurring, confidence, source_file
    FROM transactions
    ORDER BY date ASC
  `).all() as Array<{
    id: string;
    date: string;
    description: string;
    amount: number;
    original_amount: number;
    currency: string;
    category: Transaction["category"];
    category_source: "rule" | "manual" | null;
    type: Transaction["type"];
    account: string;
    merchant: string;
    is_recurring: number;
    confidence: number;
    source_file: string | null;
  }>;

  return rows.map((row) => ({
    id: row.id,
    date: row.date,
    description: row.description,
    amount: row.amount,
    originalAmount: row.original_amount,
    currency: row.currency,
    category: row.category,
    categorySource: row.category_source ?? undefined,
    type: row.type,
    account: row.account,
    merchant: row.merchant,
    isRecurring: Boolean(row.is_recurring),
    confidence: row.confidence,
    sourceFile: row.source_file ?? undefined
  }));
}
