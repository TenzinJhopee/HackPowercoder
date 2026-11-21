import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { loadAccountCsv } from "@/lib/load-accounts";
import { ruleTags, type MerchantTag, type Necessity, type SpendingGroup } from "@/lib/merchant-tags";
import type { Transaction } from "@/lib/models";

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
      PRAGMA busy_timeout = 5000;
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
      CREATE TABLE IF NOT EXISTS merchant_tags (
        merchant TEXT PRIMARY KEY,
        necessity TEXT NOT NULL CHECK (necessity IN ('compulsory', 'reducible', 'discretionary')),
        grp TEXT NOT NULL,
        source TEXT NOT NULL CHECK (source IN ('rule', 'manual'))
      );
    `);
  }
  return database;
}

function readSeedTransactions() {
  const files = ["Account1.csv", "Account3.csv"];
  const transactions: Transaction[] = [];
  for (const file of files) {
    const text = fs.readFileSync(path.join(dataDirectory, file), "utf8");
    transactions.push(...loadAccountCsv(text, file).transactions);
  }
  return transactions;
}

/** Deletes and rebuilds the database from the CSV files (`npm run db:seed`). */
/** Inserts rule tags; existing rows (including manual corrections) are kept. */
function seedMerchantTags(db: DatabaseSync) {
  const insert = db.prepare("INSERT OR IGNORE INTO merchant_tags (merchant, necessity, grp, source) VALUES (?, ?, ?, 'rule')");
  for (const tag of ruleTags()) insert.run(tag.merchant, tag.necessity, tag.group);
}

export async function getMerchantTags(): Promise<MerchantTag[]> {
  await initializeDatabase();
  const rows = getDatabase().prepare("SELECT merchant, necessity, grp, source FROM merchant_tags").all() as Array<{ merchant: string; necessity: Necessity; grp: SpendingGroup; source: "rule" | "manual" }>;
  return rows.map((row) => ({ merchant: row.merchant, necessity: row.necessity, group: row.grp, source: row.source }));
}

/** User correction of a tag; wins over rules and survives reseeding. */
export async function setMerchantTag(merchant: string, necessity: Necessity, group: SpendingGroup) {
  await initializeDatabase();
  getDatabase()
    .prepare("INSERT INTO merchant_tags (merchant, necessity, grp, source) VALUES (?, ?, ?, 'manual') ON CONFLICT(merchant) DO UPDATE SET necessity = excluded.necessity, grp = excluded.grp, source = 'manual'")
    .run(merchant, necessity, group);
}

export async function reseedDatabase() {
  getDatabase().exec("DELETE FROM transactions; DELETE FROM merchant_tags WHERE source = 'rule';");
  initialized = undefined;
  await initializeDatabase();
  // Fold any old WAL content into the main file so the repo only needs finance.sqlite.
  getDatabase().exec("PRAGMA wal_checkpoint(TRUNCATE);");
}

export async function initializeDatabase() {
  if (!initialized) {
    initialized = (async () => {
      const db = getDatabase();
      seedMerchantTags(db);
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
