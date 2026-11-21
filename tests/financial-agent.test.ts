import assert from "node:assert/strict";
import test from "node:test";
import { executeFinancialTool, selectFinancialTool } from "../lib/financial-agent";
import { create_budget, get_monthly_spending, get_spending_by_category } from "../lib/financial-tools";
import { microphoneErrorMessage } from "../lib/voice-errors";
import type { Budget, Transaction } from "../lib/models";

function transaction(overrides: Partial<Transaction> = {}): Transaction {
  return {
    id: "agent-tx",
    date: "2026-10-12",
    description: "Market purchase",
    amount: -80,
    originalAmount: 80,
    currency: "CHF",
    category: "Food",
    type: "expense",
    account: "Main",
    merchant: "Market",
    isRecurring: false,
    confidence: 1,
    ...overrides
  };
}

test("selects a deterministic financial tool for each supported intent", () => {
  assert.equal(selectFinancialTool("How much did I spend this month?"), "get_monthly_spending");
  assert.equal(selectFinancialTool("What are my three biggest spending categories?"), "get_spending_by_category");
  assert.equal(selectFinancialTool("Where does most of my money go?"), "get_spending_by_category");
  assert.equal(selectFinancialTool("How can I save CHF 500 monthly?"), "get_savings_opportunities");
  assert.equal(selectFinancialTool("How much could I save each month?"), "get_savings_opportunities");
  assert.equal(selectFinancialTool("Brainstorm cheap food and budget ideas"), "get_savings_opportunities");
  assert.equal(selectFinancialTool("Can you create a monthly budget based on my actual transactions?"), "create_budget");
  assert.equal(selectFinancialTool("What is my budget status?"), "get_budget_status");
  assert.equal(selectFinancialTool("Forecast my cash flow for the next three months"), "get_cashflow_forecast");
  assert.equal(selectFinancialTool("Will I have enough money in 30 days?"), "get_cashflow_forecast");
  assert.equal(selectFinancialTool("Which recurring payments should I review?"), "get_recurring_payments");
  assert.equal(selectFinancialTool("Explain my investment portfolio"), "get_investment_portfolio");
  assert.equal(selectFinancialTool("What is my investment return?"), "calculate_investment_performance");
  assert.equal(selectFinancialTool("Give me an account summary"), "get_financial_summary");
});

test("financial tools calculate selected-currency spending without mixing currencies", () => {
  const rows = [
    transaction(),
    transaction({ id: "eur", currency: "EUR", amount: -900, originalAmount: 900 }),
    transaction({ id: "refund", type: "refund", category: "Income", amount: 10, originalAmount: 10 })
  ];
  assert.deepEqual(get_monthly_spending(rows, "CHF"), {
    month: "2026-10",
    currency: "CHF",
    income: 0,
    grossExpenses: 80,
    refunds: 10,
    netExpenses: 70,
    savings: -70,
    investmentPurchases: 0,
    netCashFlow: -70
  });
  assert.equal(get_spending_by_category(rows, "CHF").categories[0].value, 80);
});

test("create-budget requests return historical suggestions and preserve existing limits", () => {
  const rows = [
    transaction({ id: "one", date: "2026-08-12", amount: -100, originalAmount: 100 }),
    transaction({ id: "two", date: "2026-09-12", amount: -200, originalAmount: 200 }),
    transaction({ id: "three", date: "2026-10-12", amount: -300, originalAmount: 300 })
  ];
  const existing: Budget[] = [{ id: "CHF:Food", category: "Food", monthlyLimit: 250, actualSpending: 0 }];
  const result = create_budget(rows, "CHF", existing, new Date("2026-10-20T00:00:00.000Z"));
  assert.equal(result.targetMonth, "2026-11");
  assert.equal(result.budgets.length, 0);
  assert.equal(result.updatedBudgets[0].monthlyLimit, 220);
});

test("microphone permission denial has a text-only recovery message", () => {
  assert.match(microphoneErrorMessage({ name: "NotAllowedError" }), /permission was denied/i);
  assert.match(microphoneErrorMessage(new Error("unsupported")), /type your question/i);
});
