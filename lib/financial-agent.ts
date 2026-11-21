import type { Budget, Transaction, UpcomingBill } from "@/lib/models";
import {
  create_budget,
  get_balance_series,
  get_budget_status,
  get_cashflow_forecast,
  get_financial_summary,
  get_monthly_spending,
  get_recurring_payments,
  get_savings_opportunities,
  get_spending_by_category,
  get_spending_profile
} from "@/lib/financial-tools";
import type { MerchantTag } from "@/lib/merchant-tags";

export const financialToolNames = [
  "get_financial_summary",
  "get_monthly_spending",
  "get_spending_by_category",
  "get_recurring_payments",
  "get_savings_opportunities",
  "create_budget",
  "get_budget_status",
  "get_cashflow_forecast",
  "get_balance_series",
  "get_spending_profile"
] as const;

export type FinancialToolName = (typeof financialToolNames)[number];

export interface FinancialAgentContext {
  transactions: Transaction[];
  currency: string;
  budgets: Budget[];
  bills: UpcomingBill[];
  /** Known balance before the first transaction; never invented by code (defaults to 0). */
  openingBalance?: number;
  /** Merchant tags from the database; falls back to the seeded rules. */
  merchantTags?: MerchantTag[];
}

// Fallback keyword router (English + Turkish). The LLM tool-call path is primary.
export function selectFinancialTool(question: string): FinancialToolName {
  const text = question.toLocaleLowerCase("tr-TR");
  if (/balance|overdraft|overdrawn|lowest|bakiye|eksi\b|ay sonu|kontostand|saldo|hesapta ne kadar/.test(text)) return "get_balance_series";
  if (/\bcreate\b|\bset up\b|\bmake\b|oluştur|hazırla/.test(text) && /budget|bütçe/.test(text)) return "create_budget";
  if (/budget|bütçe/.test(text) && /status|over|remaining|left|limit|spent|durum|kaldı|aştı/.test(text)) return "get_budget_status";
  if (/forecast|predict|projection|in \d+ days|next month|enough money|cash ?flow|önümüzdeki ay|gelecek ay|tahmin/.test(text)) return "get_cashflow_forecast";
  if (/recurring|subscription|repeat payment|regular payment|abonelik|düzenli ödeme/.test(text)) return "get_recurring_payments";
  if (/cheap|affordable|low[- ]cost|grocer|food|meal|recipe|brainstorm|ucuz|yemek/.test(text)) return "get_savings_opportunities";
  if (/save|saving|reduce|cut back|optimis|optimize|tasarruf|biriktir|profil|sabit gider|esnek|zorunlu/.test(text)) return "get_spending_profile";
  if (/category|categories|where does|where is|most of my|breakdown|kategori|nereye (?:gidiyor|gitti)/.test(text)) return "get_spending_by_category";
  if (/this month|monthly spending|how much (?:did|do) i spend|expenses this month|spent|bu ay|harcadım|harcama/.test(text)) return "get_monthly_spending";
  return "get_financial_summary";
}

export function executeFinancialTool(name: FinancialToolName, context: FinancialAgentContext) {
  switch (name) {
    case "get_financial_summary":
      return get_financial_summary(context.transactions, context.currency);
    case "get_monthly_spending":
      return get_monthly_spending(context.transactions, context.currency);
    case "get_spending_by_category":
      return get_spending_by_category(context.transactions, context.currency);
    case "get_recurring_payments":
      return get_recurring_payments(context.transactions, context.currency);
    case "get_savings_opportunities":
      return get_savings_opportunities(context.transactions, context.currency);
    case "create_budget":
      return create_budget(context.transactions, context.currency, context.budgets);
    case "get_budget_status":
      return get_budget_status(context.transactions, context.currency, context.budgets);
    case "get_cashflow_forecast":
      return get_cashflow_forecast(context.transactions, context.bills, context.currency);
    case "get_balance_series":
      return get_balance_series(context.transactions, context.currency, context.openingBalance ?? 0);
    case "get_spending_profile":
      return get_spending_profile(context.transactions, context.currency, context.merchantTags);
  }
}
