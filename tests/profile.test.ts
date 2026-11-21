import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { loadAccountCsv } from "../lib/load-accounts";
import { getSpendingProfile } from "../lib/profile";

const load = (file: string) => loadAccountCsv(fs.readFileSync(`data/${file}`, "utf8"), file).transactions;
const transactions = [...load("Account1.csv"), ...load("Account3.csv")];

test("loader: card payment nets to zero across accounts, Netflix is an expense", () => {
  const transfers = transactions.filter((t) => t.type === "transfer").reduce((sum, t) => sum + t.amount, 0);
  assert.equal(Math.round(transfers), 0);
  assert.ok(transactions.filter((t) => t.merchant === "Netflix").every((t) => t.type === "expense"));
  const privateNet = transactions.filter((t) => t.account === "Privatkonto").reduce((sum, t) => sum + t.amount, 0);
  assert.equal(Math.round(privateNet), 8816);
});

test("profile matches the verified facts for Jeanine 2025", () => {
  const profile = getSpendingProfile(transactions, "CHF");
  const group = (name: string) => profile.groups.find((g) => g.group === name)?.net;
  assert.equal(group("Housing"), 22462);
  assert.equal(group("Health"), 12335);
  assert.equal(profile.merchants.find((m) => m.merchant === "Abercrombie & Fitch")?.net, 906.14);
  assert.equal(profile.income.baseMonthly, 7464);
  assert.equal(profile.income.aboveBase, 7464);
  assert.deepEqual(profile.unreviewedMerchants, []);
  assert.ok(profile.levers.oneOffs.some((o) => o.merchant === "Veloshop" && o.total === 6000));
});
