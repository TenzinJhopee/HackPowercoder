import assert from "node:assert/strict";
import test from "node:test";
import {
  analyzeTransactions,
  calculateBudget,
  classifyTransaction,
  deduplicateTransactions,
  forecastCashFlow,
  getBalanceSeries,
  getLatestMonth,
  generateSavingsOpportunities,
  suggestBudgetLimits
} from "../lib/intelligence";
import type { Budget, Transaction } from "../lib/models";

function transaction(overrides: Partial<Transaction> = {}): Transaction {
  return {
    id: "tx-1",
    date: "2025-01-15",
    description: "Purchase",
    amount: -100,
    originalAmount: 100,
    currency: "CHF",
    category: "Other",
    categorySource: "rule",
    type: "expense",
    account: "Main account",
    merchant: "Example merchant",
    isRecurring: false,
    confidence: 1,
    ...overrides
  };
}

test("classifies common merchants and respects configurable keyword rules", () => {
  assert.equal(classifyTransaction(transaction({ merchant: "Migros" })), "Food");
  assert.equal(classifyTransaction(transaction({ description: "Dinner at a restaurant" })), "Restaurants");
  assert.equal(classifyTransaction(transaction({ description: "Monthly pay", type: "income" })), "Income");
  assert.equal(classifyTransaction(transaction({ type: "transfer" })), "Transfers");
  assert.equal(classifyTransaction(transaction({ merchant: "Local market" }), [{
    id: "rule-1",
    keyword: "local market",
    category: "Food",
    matchOn: "merchant",
    enabled: true
  }]), "Food");
});


test("calculates income, net expenses, savings, and cash flow without counting transfers", () => {
  const rows = [
    transaction({ id: "income", amount: 4000, originalAmount: 4000, type: "income", category: "Income", date: "2025-01-02" }),
    transaction({ id: "expense", amount: -1200, originalAmount: 1200, date: "2025-01-04" }),
    transaction({ id: "refund", amount: 100, originalAmount: 100, type: "refund", category: "Income", date: "2025-01-07" }),
    transaction({ id: "investment", amount: 200, originalAmount: 200, type: "investment", category: "Investments", date: "2025-01-08" }),
    transaction({ id: "transfer", amount: 5000, originalAmount: 5000, type: "transfer", category: "Transfers", date: "2025-01-09" })
  ];
  const result = analyzeTransactions(rows, "CHF");
  assert.equal(result.totalIncome, 4000);
  assert.equal(result.totalExpenses, 1100);
  assert.equal(result.netCashFlow, 2700);
  assert.equal(result.monthlySavings, 2900);
  assert.equal(result.savingsRate, 0.725);
});

test("deduplicates matching imported transactions but retains distinct transactions", () => {
  const original = transaction({ id: "first" });
  const copy = transaction({ id: "copy", sourceFile: "another.csv" });
  const different = transaction({ id: "different", amount: -105, originalAmount: 105 });
  const sameActivityOtherAccount = transaction({ id: "other-account", account: "Savings account" });
  const result = deduplicateTransactions([original, copy, different, sameActivityOtherAccount]);
  assert.equal(result.duplicates, 1);
  assert.deepEqual(result.transactions.map((item) => item.id), ["first", "different", "other-account"]);
});

test("calculates savings rate and average monthly spending from observed months", () => {
  const rows = [
    transaction({ id: "jan-income", date: "2025-01-25", amount: 1000, originalAmount: 1000, type: "income", category: "Income" }),
    transaction({ id: "jan-expense", date: "2025-01-10", amount: -700, originalAmount: 700 }),
    transaction({ id: "feb-income", date: "2025-02-25", amount: 1000, originalAmount: 1000, type: "income", category: "Income" }),
    transaction({ id: "feb-expense", date: "2025-02-10", amount: -700, originalAmount: 700 })
  ];
  const result = analyzeTransactions(rows, "CHF");
  assert.equal(result.monthCount, 2);
  assert.equal(result.averageMonthlySpending, 700);
  assert.equal(result.monthlySavings, 300);
  assert.equal(result.savingsRate, 0.3);
});

test("calculates budgets and suggests a limit from observed historical months", () => {
  const budget: Budget = { id: "Food", category: "Food", monthlyLimit: 200, actualSpending: 240 };
  const result = calculateBudget(budget.monthlyLimit, budget.actualSpending);
  assert.equal(result.isOverBudget, true);
  assert.equal(result.overspent, 40);
  assert.equal(result.remaining, -40);
  const suggestions = suggestBudgetLimits([
    transaction({ id: "jan", date: "2025-01-10", amount: -100, originalAmount: 100, category: "Food" }),
    transaction({ id: "feb", date: "2025-02-10", amount: -200, originalAmount: 200, category: "Food" }),
    transaction({ id: "mar", date: "2025-03-10", amount: -300, originalAmount: 300, category: "Food" })
  ], "CHF", 3);
  assert.equal(suggestions[0].historicalAverage, 200);
  assert.equal(suggestions[0].monthlyLimit, 220);
  assert.equal(suggestions[0].actualSpending, 300);
});

test("adds a qualified optional savings review when recurring evidence yields fewer than three actions", () => {
  const rows: Transaction[] = [];
  for (const month of ["01", "02", "03"]) {
    rows.push(transaction({ id: `income-${month}`, date: `2025-${month}-25`, amount: 5000, originalAmount: 5000, type: "income", category: "Income", merchant: "Employer" }));
    rows.push(transaction({ id: `insurance-${month}`, date: `2025-${month}-05`, amount: -100, originalAmount: 100, category: "Insurance", merchant: "Insurer" }));
    rows.push(transaction({ id: `subscription-${month}`, date: `2025-${month}-10`, amount: -20, originalAmount: 20, category: "Subscriptions", merchant: "Stream service" }));
    rows.push(transaction({ id: `shopping-${month}`, date: `2025-${month}-15`, amount: -200, originalAmount: 200, category: "Shopping", merchant: `Store ${month}` }));
  }
  const opportunities = generateSavingsOpportunities(rows, "CHF");
  assert.equal(opportunities.length, 3);
  const optionalReview = opportunities.find((item) => item.title.includes("Optional 5% review"));
  assert.ok(optionalReview);
  assert.equal(optionalReview.monthlySavings, 10);
  assert.match(optionalReview.assumption, /Illustrative savings/);
  assert.ok(optionalReview.confidence < 0.6);
});

test("forecasts net flows using recurring payments, variable spending, and known bills", () => {
  const rows: Transaction[] = [];
  for (const [month, day] of [["01", "25"], ["02", "25"], ["03", "25"]]) {
    rows.push(transaction({ id: `income-${month}`, date: `2025-${month}-${day}`, amount: 4000, originalAmount: 4000, type: "income", category: "Income", merchant: "Employer" }));
    rows.push(transaction({ id: `rent-${month}`, date: `2025-${month}-01`, amount: -1000, originalAmount: 1000, type: "expense", category: "Housing", merchant: "Rent" }));
    rows.push(transaction({ id: `food-${month}`, date: `2025-${month}-12`, amount: -50, originalAmount: 50, type: "expense", category: "Food", merchant: `Market ${month}` }));
  }
  const forecast = forecastCashFlow(rows, [{
    id: "bill-1",
    name: "Electricity",
    amount: 100,
    currency: "CHF",
    dueDate: "2025-04-20"
  }], "CHF", new Date("2025-04-01T00:00:00.000Z"));
  assert.equal(forecast.recurringIncomeMonthly, 4000);
  assert.equal(forecast.recurringExpensesMonthly, 1000);
  assert.equal(forecast.averageVariableExpensesMonthly, 50);
  assert.equal(forecast.horizons[0].knownBills, 100);
  assert.ok(forecast.horizons[0].projectedNetFlow < forecast.horizons[1].projectedNetFlow);
  assert.ok(forecast.assumptions.some((item) => item.includes("no starting balance")));
});

test("balance series is a running total from a given opening balance and finds the lowest points", () => {
  const rows = [
    transaction({ id: "a", date: "2025-08-31", amount: 100, originalAmount: 100, type: "income" }),
    transaction({ id: "b", date: "2025-09-10", amount: -300, originalAmount: 300 }),
    transaction({ id: "c", date: "2025-09-30", amount: -50, originalAmount: 50 }),
    transaction({ id: "d", date: "2025-10-05", amount: 1000, originalAmount: 1000, type: "income" }),
    transaction({ id: "e", date: "2025-10-06", amount: -5, originalAmount: 5, currency: "EUR" })
  ];
  const series = getBalanceSeries(rows, "CHF", 200);
  assert.deepEqual(series.monthEnd, [
    { date: "2025-08-31", balance: 300 },
    { date: "2025-09-30", balance: -50 },
    { date: "2025-10-05", balance: 950 }
  ]);
  assert.deepEqual(series.lowestMonthEnd, { date: "2025-09-30", balance: -50 });
  assert.deepEqual(series.lowestDay, { date: "2025-09-30", balance: -50 });
  assert.equal(series.closingBalance, 950);
  assert.equal(getBalanceSeries(rows, "CHF").openingBalanceIsAssumed, true);
});
