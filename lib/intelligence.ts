import type { CategoryRule, Transaction, TransactionCategory, UpcomingBill } from "@/lib/models";

export interface MonthlySummary {
  key: string;
  month: string;
  income: number;
  expenses: number;
  refunds: number;
  investmentPurchases: number;
  savings: number;
  cashFlow: number;
}

export interface RecurringFlow {
  key: string;
  name: string;
  category: TransactionCategory;
  type: "income" | "expense";
  currency: string;
  occurrenceCount: number;
  averageAmount: number;
  monthlyAmount: number;
  cadence: "weekly" | "monthly" | "quarterly";
  confidence: number;
  transactionIds: string[];
}

export interface AccountAnalysis {
  currency: string;
  periodStart: string;
  periodEnd: string;
  monthCount: number;
  totalIncome: number;
  totalExpenses: number;
  totalRefunds: number;
  totalInvestments: number;
  netCashFlow: number;
  monthlySavings: number;
  savingsRate: number;
  averageMonthlySpending: number;
  largestExpenses: Transaction[];
  recurringPayments: RecurringFlow[];
  monthlySummaries: MonthlySummary[];
  expenditureChanges: { month: string; previous: number; current: number; change: number; changeRate: number | null }[];
}

export interface BudgetSuggestion {
  category: TransactionCategory;
  monthlyLimit: number;
  historicalAverage: number;
  monthsUsed: number;
  actualSpending: number;
}

export interface BudgetCalculation {
  monthlyLimit: number;
  actualSpending: number;
  remaining: number;
  overspent: number;
  progressPercent: number | null;
  isOverBudget: boolean;
}

export interface SavingsOpportunity {
  id: string;
  title: string;
  explanation: string;
  category: TransactionCategory;
  monthlySavings: number;
  assumption: string;
  confidence: number;
  transactionIds: string[];
}

export interface ForecastHorizon {
  days: 30 | 90;
  projectedIncome: number;
  projectedExpenses: number;
  projectedNetFlow: number;
  knownBills: number;
}

export interface CashFlowForecast {
  currency: string;
  asOfDate: string;
  recurringIncomeMonthly: number;
  recurringExpensesMonthly: number;
  averageVariableExpensesMonthly: number;
  recurringIncomeFlows: RecurringFlow[];
  recurringExpenseFlows: RecurringFlow[];
  horizons: [ForecastHorizon, ForecastHorizon];
  assumptions: string[];
  confidence: number;
}

const categoryKeywords: Record<Exclude<TransactionCategory, "Income" | "Transfers" | "Investments" | "Other">, string[]> = {
  Housing: ["rent", "mortgage", "landlord", "miete", "mietzins", "housing", "wohnung", "home loan"],
  Insurance: ["insurance", "versicherung", "krankenkasse", "health plan", "premium", "assurance"],
  Healthcare: ["doctor", "medical", "healthcare", "pharmacy", "apotheke", "dentist", "hospital", "clinic", "optik"],
  Transport: ["sbb", "train", "rail", "bus", "tram", "transport", "fuel", "benz", "tankstelle", "parking", "taxi", "uber", "ö v abo", "öV abo"],
  Restaurants: ["restaurant", "ristorante", "cafe", "café", "coffee shop", "takeaway", "take away", "deliveroo", "ubereats", "eat.ch", "kantine", "lunch", "mittagessen", "dining"],
  Food: ["grocery", "groceries", "supermarket", "coop", "migros", "denner", "aldi", "lidl", "food", "bakery", "bäckerei"],
  Shopping: ["shopping", "amazon", "digitec", "galaxus", "zalando", "h&m", "manor", "orell", "veloshop", "fashion", "store", "nike", "apple online", "bestellung"],
  Entertainment: ["cinema", "movie", "theatre", "theater", "concert", "ticketcorner", "netflix", "spotify", "steam", "game", "museum", "event"],
  Utilities: ["utility", "utilities", "electric", "electricity", "ewz", "water bill", "heating", "internet", "swisscom", "salt", "sunrise", "phone bill"],
  Subscriptions: ["subscription", "monthly plan", "membership", "icloud", "microsoft 365", "adobe", "youtube premium", "recurring"]
};

function normalizedText(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function ruleMatches(rule: CategoryRule, merchant: string, description: string) {
  if (!rule.enabled || !rule.keyword.trim()) return false;
  const keyword = normalizedText(rule.keyword);
  const source = rule.matchOn === "merchant" ? merchant : rule.matchOn === "description" ? description : `${merchant} ${description}`;
  return normalizedText(source).includes(keyword);
}

export function classifyTransaction(
  transaction: Pick<Transaction, "type" | "description" | "merchant">,
  rules: CategoryRule[] = []
): TransactionCategory {
  if (transaction.type === "income" || transaction.type === "refund") return "Income";
  if (transaction.type === "transfer") return "Transfers";
  if (transaction.type === "investment") return "Investments";

  const merchant = transaction.merchant ?? "";
  const description = transaction.description ?? "";
  const customRule = rules.find((rule) => ruleMatches(rule, merchant, description));
  if (customRule) return customRule.category;

  const text = normalizedText(`${merchant} ${description}`);
  const order: Exclude<TransactionCategory, "Income" | "Transfers" | "Investments" | "Other">[] = [
    "Housing",
    "Insurance",
    "Healthcare",
    "Transport",
    "Restaurants",
    "Food",
    "Shopping",
    "Entertainment",
    "Utilities",
    "Subscriptions"
  ];
  return order.find((category) => categoryKeywords[category].some((keyword) => text.includes(normalizedText(keyword)))) ?? "Other";
}

export function deduplicateTransactions(transactions: Transaction[]) {
  const seenIds = new Set<string>();
  const seenSignatures = new Set<string>();
  const unique: Transaction[] = [];
  let duplicates = 0;
  for (const transaction of transactions) {
    const signature = [
      transaction.date,
      transaction.type,
      Math.round(Math.abs(transaction.originalAmount ?? transaction.amount) * 100),
      transaction.currency.toUpperCase(),
      normalizedText(transaction.description),
      normalizedText(transaction.merchant),
      normalizedText(transaction.account)
    ].join("|");
    if (seenIds.has(transaction.id) || seenSignatures.has(signature)) {
      duplicates += 1;
      continue;
    }
    seenIds.add(transaction.id);
    seenSignatures.add(signature);
    unique.push(transaction);
  }
  return { transactions: unique, duplicates };
}

function monthKey(date: string) {
  return date.slice(0, 7);
}

function monthName(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-GB", { month: "short" });
}

function addMonths(key: string, offset: number) {
  const [year, month] = key.split("-").map(Number);
  const date = new Date(year, month - 1 + offset, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function sumAbsolute(transactions: Transaction[]) {
  return transactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
}

export function getLatestMonth(transactions: Transaction[]) {
  return transactions.reduce((latest, item) => monthKey(item.date) > latest ? monthKey(item.date) : latest, "");
}

export function summarizeMonth(transactions: Transaction[], month: string) {
  const monthTransactions = transactions.filter((item) => monthKey(item.date) === month);
  const income = sumAbsolute(monthTransactions.filter((item) => item.type === "income"));
  const refunds = sumAbsolute(monthTransactions.filter((item) => item.type === "refund"));
  const grossExpenses = sumAbsolute(monthTransactions.filter((item) => item.type === "expense"));
  const investmentPurchases = sumAbsolute(monthTransactions.filter((item) => item.type === "investment"));
  const expenses = Math.max(0, grossExpenses - refunds);
  const savings = income + refunds - grossExpenses;
  return {
    income,
    expenses,
    refunds,
    grossExpenses,
    savings,
    cashFlow: savings - investmentPurchases,
    investmentPurchases,
    transactions: monthTransactions
  };
}

function createMonthlySummary(transactions: Transaction[], currency: string, key: string): MonthlySummary {
  const summary = summarizeMonth(transactions.filter((item) => item.currency === currency), key);
  return {
    key,
    month: monthName(key),
    income: summary.income,
    expenses: summary.expenses,
    refunds: summary.refunds,
    investmentPurchases: summary.investmentPurchases,
    savings: summary.savings,
    cashFlow: summary.cashFlow
  };
}

function getFullMonthlySummaries(transactions: Transaction[], currency: string) {
  const dates = transactions.filter((item) => item.currency === currency && item.type !== "transfer").map((item) => monthKey(item.date)).sort();
  if (!dates.length) return [];
  const first = dates[0];
  const last = dates[dates.length - 1];
  const monthCount = (Number(last.slice(0, 4)) - Number(first.slice(0, 4))) * 12 + Number(last.slice(5, 7)) - Number(first.slice(5, 7));
  return Array.from({ length: monthCount + 1 }, (_, index) => createMonthlySummary(transactions, currency, addMonths(first, index)));
}

export function getCategoryTotals(transactions: Transaction[]) {
  const totals = new Map<string, number>();
  for (const item of transactions) {
    if (item.type !== "expense") continue;
    totals.set(item.category, (totals.get(item.category) ?? 0) + Math.abs(item.amount));
  }
  return [...totals.entries()]
    .map(([name, value]) => ({ name: name as TransactionCategory, value }))
    .sort((a, b) => b.value - a.value);
}

function average(values: number[]) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function median(values: number[]) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function dayDifference(first: string, second: string) {
  const firstDate = new Date(`${first}T00:00:00Z`).getTime();
  const secondDate = new Date(`${second}T00:00:00Z`).getTime();
  return Math.round((secondDate - firstDate) / 86_400_000);
}

function recurringName(transaction: Transaction) {
  return normalizedText(transaction.merchant || transaction.description);
}

function flowGroups(transactions: Transaction[], type: "income" | "expense", currency: string): RecurringFlow[] {
  const groups = new Map<string, Transaction[]>();
  for (const transaction of transactions) {
    if (transaction.type !== type || transaction.currency !== currency) continue;
    const key = `${recurringName(transaction)}|${transaction.category}|${currency}`;
    groups.set(key, [...(groups.get(key) ?? []), transaction]);
  }

  return [...groups.entries()].flatMap(([key, entries]) => {
    const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
    if (sorted.length < 3) return [];
    const gaps = sorted.slice(1).map((item, index) => dayDifference(sorted[index].date, item.date));
    const typicalGap = median(gaps);
    const cadence: RecurringFlow["cadence"] | undefined =
      typicalGap >= 6 && typicalGap <= 10 ? "weekly"
        : typicalGap >= 20 && typicalGap <= 40 ? "monthly"
          : typicalGap >= 75 && typicalGap <= 105 ? "quarterly"
            : undefined;
    if (!cadence) return [];
    const averageAmount = average(sorted.map((item) => Math.abs(item.amount)));
    const monthlyFactor = cadence === "weekly" ? 4.345 : cadence === "quarterly" ? 1 / 3 : 1;
    const consistentGapCount = gaps.filter((gap) => Math.abs(gap - typicalGap) <= typicalGap * 0.35).length;
    const confidence = Math.min(0.98, 0.55 + sorted.length * 0.06 + consistentGapCount / gaps.length * 0.15);
    return [{
      key,
      name: sorted[0].merchant || sorted[0].description,
      category: sorted[0].category,
      type,
      currency,
      occurrenceCount: sorted.length,
      averageAmount,
      monthlyAmount: averageAmount * monthlyFactor,
      cadence,
      confidence,
      transactionIds: sorted.map((item) => item.id)
    }];
  }).sort((a, b) => b.monthlyAmount - a.monthlyAmount);
}

export function detectRecurringPayments(transactions: Transaction[], currency: string) {
  return flowGroups(transactions, "expense", currency);
}

export function analyzeTransactions(transactions: Transaction[], currency: string): AccountAnalysis {
  const selected = transactions.filter((item) => item.currency === currency && item.type !== "transfer");
  const monthlySummaries = getFullMonthlySummaries(transactions, currency);
  const totalIncome = monthlySummaries.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = monthlySummaries.reduce((sum, item) => sum + item.expenses, 0);
  const totalRefunds = monthlySummaries.reduce((sum, item) => sum + item.refunds, 0);
  const totalInvestments = monthlySummaries.reduce((sum, item) => sum + item.investmentPurchases, 0);
  const totalSavings = monthlySummaries.reduce((sum, item) => sum + item.savings, 0);
  const netCashFlow = monthlySummaries.reduce((sum, item) => sum + item.cashFlow, 0);
  const monthCount = monthlySummaries.length;
  const expenditureChanges = monthlySummaries.slice(1).map((item, index) => {
    const previous = monthlySummaries[index].expenses;
    const change = item.expenses - previous;
    return {
      month: item.key,
      previous,
      current: item.expenses,
      change,
      changeRate: previous ? change / previous : null
    };
  });
  const expenses = selected.filter((item) => item.type === "expense").sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
  return {
    currency,
    periodStart: monthlySummaries[0]?.key ?? "",
    periodEnd: monthlySummaries.at(-1)?.key ?? "",
    monthCount,
    totalIncome,
    totalExpenses,
    totalRefunds,
    totalInvestments,
    netCashFlow,
    monthlySavings: monthCount ? totalSavings / monthCount : 0,
    savingsRate: totalIncome ? totalSavings / totalIncome : 0,
    averageMonthlySpending: monthCount ? totalExpenses / monthCount : 0,
    largestExpenses: expenses.slice(0, 5),
    recurringPayments: detectRecurringPayments(transactions, currency),
    monthlySummaries,
    expenditureChanges
  };
}

export function calculateBudget(monthlyLimit: number, actualSpending: number): BudgetCalculation {
  const limit = Math.max(0, Number.isFinite(monthlyLimit) ? monthlyLimit : 0);
  const actual = Math.max(0, Number.isFinite(actualSpending) ? actualSpending : 0);
  return {
    monthlyLimit: limit,
    actualSpending: actual,
    remaining: limit - actual,
    overspent: Math.max(0, actual - limit),
    progressPercent: limit > 0 ? actual / limit * 100 : null,
    isOverBudget: limit > 0 && actual > limit
  };
}

export function suggestBudgetLimits(transactions: Transaction[], currency: string, lookbackMonths = 3): BudgetSuggestion[] {
  const latest = getLatestMonth(transactions.filter((item) => item.currency === currency && item.type !== "transfer"));
  if (!latest) return [];
  const keys = Array.from({ length: Math.max(1, lookbackMonths) }, (_, index) => addMonths(latest, index - Math.max(1, lookbackMonths) + 1));
  const selected = transactions.filter((item) => item.currency === currency && item.type !== "transfer");
  const availableKeys = keys.filter((key) => selected.some((item) => monthKey(item.date) === key));
  const categories = [...new Set(transactions.filter((item) => item.currency === currency && item.type === "expense").map((item) => item.category))];
  return categories.map((category) => {
    const monthTotals = availableKeys.map((key) => sumAbsolute(transactions.filter((item) => item.currency === currency && item.type === "expense" && item.category === category && monthKey(item.date) === key)));
    const historicalAverage = average(monthTotals);
    const suggestedLimit = Math.ceil(Math.round(historicalAverage * 1.1 * 100) / 1000) * 10;
    const actualSpending = sumAbsolute(transactions.filter((item) => item.currency === currency && item.type === "expense" && item.category === category && monthKey(item.date) === latest));
    return { category, monthlyLimit: suggestedLimit, historicalAverage, monthsUsed: monthTotals.filter((value) => value > 0).length, actualSpending };
  }).sort((a, b) => b.historicalAverage - a.historicalAverage);
}

function countCalendarMonths(keys: string[]) {
  if (!keys.length) return 1;
  const unique = [...new Set(keys)].sort();
  const first = unique[0];
  const last = unique.at(-1) ?? first;
  return Math.max(1, (Number(last.slice(0, 4)) - Number(first.slice(0, 4))) * 12 + Number(last.slice(5, 7)) - Number(first.slice(5, 7)) + 1);
}

function recurringDuplicateOpportunities(transactions: Transaction[], currency: string): SavingsOpportunity[] {
  const groups = new Map<string, Transaction[]>();
  for (const transaction of transactions) {
    if (transaction.currency !== currency || transaction.type !== "expense") continue;
    const key = recurringName(transaction);
    groups.set(key, [...(groups.get(key) ?? []), transaction]);
  }
  return [...groups.entries()].flatMap(([key, entries]) => {
    const perMonth = new Map<string, Transaction[]>();
    entries.forEach((entry) => perMonth.set(monthKey(entry.date), [...(perMonth.get(monthKey(entry.date)) ?? []), entry]));
    const duplicateMonths = [...perMonth.entries()].filter(([, monthEntries]) => {
      if (monthEntries.length < 2) return false;
      const amounts = monthEntries.map((item) => Math.abs(item.amount));
      return amounts.some((amount, index) => amounts.slice(index + 1).some((other) => Math.abs(amount - other) / Math.max(amount, other, 1) <= 0.05));
    });
    if (duplicateMonths.length < 2) return [];
    const monthlyAmounts = duplicateMonths.map(([, items]) => {
      const amounts = items.map((item) => Math.abs(item.amount)).sort((a, b) => b - a);
      return amounts.slice(1).reduce((sum, amount) => sum + amount, 0);
    });
    const transactionIds = duplicateMonths.flatMap(([, items]) => items.map((item) => item.id));
    return [{
      id: `duplicate-${key}`,
      title: `Review possible duplicate ${entries[0].merchant || "merchant"} charges`,
      explanation: `Similar charges from ${entries[0].merchant || "the same merchant"} appear more than once in ${duplicateMonths.length} separate months.`,
      category: entries[0].category,
      monthlySavings: average(monthlyAmounts),
      assumption: "Potential savings assume one of the repeated monthly charges is unintended and can be refunded or cancelled.",
      confidence: 0.55,
      transactionIds
    }];
  });
}

export function generateSavingsOpportunities(transactions: Transaction[], currency: string): SavingsOpportunity[] {
  const selected = transactions.filter((item) => item.currency === currency);
  const recurring = detectRecurringPayments(selected, currency);
  const opportunities: SavingsOpportunity[] = recurring
    .filter((flow) => flow.type === "expense" && (flow.category === "Subscriptions" || flow.category === "Insurance" || flow.category === "Utilities"))
    .map((flow) => ({
      id: `review-${flow.key}`,
      title: `Review ${flow.name}`,
      explanation: `${flow.name} appears ${flow.occurrenceCount} times with a typical ${flow.cadence} pattern.`,
      category: flow.category,
      monthlySavings: flow.monthlyAmount * 0.2,
      assumption: "Potential savings assume a 20% lower price after cancelling, downgrading, or renegotiating; action is optional.",
      confidence: flow.confidence,
      transactionIds: flow.transactionIds
    }));

  opportunities.push(...recurringDuplicateOpportunities(selected, currency));

  const latest = getLatestMonth(selected);
  if (latest) {
    const keys = Array.from({ length: 4 }, (_, index) => addMonths(latest, index - 3));
    const restaurantSpend = keys.map((key) => sumAbsolute(selected.filter((item) => item.type === "expense" && item.category === "Restaurants" && monthKey(item.date) === key)));
    const previousAverage = average(restaurantSpend.slice(0, 2));
    const recentAverage = average(restaurantSpend.slice(2));
    const increase = recentAverage - previousAverage;
    if (previousAverage > 0 && increase > Math.max(10, previousAverage * 0.15)) {
      const ids = selected.filter((item) => item.type === "expense" && item.category === "Restaurants" && keys.slice(2).includes(monthKey(item.date))).map((item) => item.id);
      opportunities.push({
        id: "restaurant-spend-increase",
        title: "Restaurant spending has increased",
        explanation: `Average restaurant spending rose from ${previousAverage.toFixed(0)} to ${recentAverage.toFixed(0)} ${currency} per month in the last two observed months.`,
        category: "Restaurants",
        monthlySavings: increase * 0.2,
        assumption: "Potential savings assume reducing the recent increase by 20%; it is not a spending recommendation.",
        confidence: 0.76,
        transactionIds: ids
      });
    }
  }

  const analysis = analyzeTransactions(selected, currency);
  const discretionaryCategories: TransactionCategory[] = ["Restaurants", "Shopping", "Entertainment"];
  const discretionarySpending = sumAbsolute(selected.filter((item) => item.type === "expense" && discretionaryCategories.includes(item.category))) / Math.max(1, analysis.monthCount);
  const averageIncome = analysis.totalIncome / Math.max(1, analysis.monthCount);
  if (averageIncome > 0 && discretionarySpending / averageIncome >= 0.35) {
    opportunities.push({
      id: "discretionary-spending",
      title: "Set a flexible discretionary spending guardrail",
      explanation: `Restaurants, shopping, and entertainment average ${Math.round(discretionarySpending / averageIncome * 100)}% of recorded monthly income.`,
      category: "Shopping",
      monthlySavings: discretionarySpending * 0.1,
      assumption: "Potential savings assume a 10% reduction in discretionary spending while keeping the categories in your budget.",
      confidence: 0.72,
      transactionIds: selected.filter((item) => item.type === "expense" && discretionaryCategories.includes(item.category)).map((item) => item.id)
    });
  }

  if (opportunities.length < 3 && analysis.monthCount >= 2) {
    const category = getCategoryTotals(selected.filter((item) =>
      item.type === "expense" && ["Food", "Restaurants", "Shopping", "Entertainment"].includes(item.category)
    )).find((item) => !opportunities.some((opportunity) => opportunity.category === item.name));
    if (category) {
      const monthlyAverage = category.value / analysis.monthCount;
      opportunities.push({
        id: `optional-review-${category.name.toLowerCase()}`,
        title: `Optional 5% review: ${category.name}`,
        explanation: `${category.name} spending averaged ${monthlyAverage.toFixed(2)} ${currency} per month in the imported period; this is a possible review, not evidence that spending is excessive.`,
        category: category.name,
        monthlySavings: monthlyAverage * 0.05,
        assumption: "Illustrative savings assume 5% of this category's average spending is avoidable and you choose to reduce it.",
        confidence: 0.45,
        transactionIds: selected.filter((item) => item.type === "expense" && item.category === category.name).map((item) => item.id)
      });
    }
  }
  return opportunities.sort((a, b) => b.monthlySavings - a.monthlySavings);
}

function recurringFlowIncludesBill(flow: RecurringFlow, billName: string) {
  const bill = normalizedText(billName);
  const name = normalizedText(flow.name);
  return bill.length > 2 && (name.includes(bill) || bill.includes(name));
}

function billsForHorizon(bills: UpcomingBill[], currency: string, startDate: string, endDate: string, recurring: RecurringFlow[]) {
  return bills.filter((bill) =>
    bill.currency === currency &&
    bill.dueDate >= startDate &&
    bill.dueDate <= endDate &&
    !recurring.some((flow) => recurringFlowIncludesBill(flow, bill.name))
  );
}

export function forecastCashFlow(
  transactions: Transaction[],
  bills: UpcomingBill[],
  currency: string,
  asOf = new Date()
): CashFlowForecast {
  const asOfDate = asOf.toISOString().slice(0, 10);
  const selected = transactions.filter((item) => item.currency === currency && item.date <= asOfDate);
  const recurringIncomeFlows = flowGroups(selected, "income", currency);
  const recurringExpenseFlows = flowGroups(selected, "expense", currency);
  const recurringExpenseIds = new Set(recurringExpenseFlows.flatMap((flow) => flow.transactionIds));
  const recentMonths = [...new Set(selected.filter((item) => item.type === "expense").map((item) => monthKey(item.date)))].sort().slice(-3);
  const variableTransactions = selected.filter((item) => item.type === "expense" && !recurringExpenseIds.has(item.id));
  const variableTotals = recentMonths.map((key) =>
    sumAbsolute(variableTransactions.filter((item) => monthKey(item.date) === key))
  );
  const averageVariableExpensesMonthly = average(variableTotals);
  const recurringIncomeMonthly = recurringIncomeFlows.reduce((sum, flow) => sum + flow.monthlyAmount, 0);
  const recurringExpensesMonthly = recurringExpenseFlows.reduce((sum, flow) => sum + flow.monthlyAmount, 0);
  const dateForDays = (days: number) => {
    const date = new Date(asOf);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  };
  const makeHorizon = (days: 30 | 90): ForecastHorizon => {
    const factor = days / 30.4375;
    const horizonBills = billsForHorizon(bills, currency, asOfDate, dateForDays(days), recurringExpenseFlows);
    const knownBillTotal = horizonBills.reduce((sum, bill) => sum + bill.amount, 0);
    const projectedIncome = recurringIncomeMonthly * factor;
    const projectedExpenses = (recurringExpensesMonthly + averageVariableExpensesMonthly) * factor + knownBillTotal;
    return {
      days,
      projectedIncome,
      projectedExpenses,
      projectedNetFlow: projectedIncome - projectedExpenses,
      knownBills: knownBillTotal
    };
  };
  const horizons: [ForecastHorizon, ForecastHorizon] = [makeHorizon(30), makeHorizon(90)];
  const assumptions = [
    `Recurring inflows/outflows use the average amount of at least three observed transactions at a weekly, monthly, or quarterly cadence.`,
    `Variable spending uses the average of ${recentMonths.length} latest calendar month(s) with expense history, excluding identified recurring transactions.`,
    `Known bills are added only when their due dates fall inside the projection window and their names do not match an identified recurring payment.`,
    `Projection is net transaction flow in ${currency}; no starting balance, currency conversion, market prices, or future guarantees are assumed.`
  ];
  return {
    currency,
    asOfDate,
    recurringIncomeMonthly,
    recurringExpensesMonthly,
    averageVariableExpensesMonthly,
    recurringIncomeFlows,
    recurringExpenseFlows,
    horizons,
    assumptions,
    confidence: Math.min(0.9, 0.35 + recentMonths.length * 0.08 + Math.min(recurringIncomeFlows.length + recurringExpenseFlows.length, 3) * 0.08)
  };
}


export interface BalancePoint {
  date: string;
  balance: number;
}

export interface BalanceSeries {
  currency: string;
  openingBalance: number;
  openingBalanceIsAssumed: boolean;
  daily: BalancePoint[];
  monthEnd: BalancePoint[];
  lowestDay: BalancePoint | null;
  lowestMonthEnd: BalancePoint | null;
  closingBalance: number;
}

const roundMoney = (value: number) => Math.round(value * 100) / 100;

/**
 * Running balance from signed transaction amounts. The opening balance is a parameter:
 * the code never invents one (default 0 means "balance relative to the start of the data").
 * Daily points exist only for days with transactions; month-end points use the last day's balance of each month.
 */
/** Pass `account` to follow one account: merging the private account and the card double counts the card payment. */
export function getBalanceSeries(transactions: Transaction[], currency: string, openingBalance = 0, account?: string): BalanceSeries {
  const selected = transactions
    .filter((item) => item.currency === currency && (!account || item.account === account))
    .sort((a, b) => a.date.localeCompare(b.date));
  const byDate = new Map<string, number>();
  for (const item of selected) byDate.set(item.date, (byDate.get(item.date) ?? 0) + item.amount);
  const daily: BalancePoint[] = [];
  let running = openingBalance;
  for (const [date, delta] of [...byDate.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    running += delta;
    daily.push({ date, balance: roundMoney(running) });
  }
  const lastOfMonth = new Map<string, BalancePoint>();
  for (const point of daily) lastOfMonth.set(monthKey(point.date), point);
  const monthEnd = [...lastOfMonth.values()];
  const lowest = (points: BalancePoint[]) => points.reduce<BalancePoint | null>((min, point) => (!min || point.balance < min.balance ? point : min), null);
  return {
    currency,
    openingBalance,
    openingBalanceIsAssumed: openingBalance === 0,
    daily,
    monthEnd,
    lowestDay: lowest(daily),
    lowestMonthEnd: lowest(monthEnd),
    closingBalance: daily.at(-1)?.balance ?? openingBalance
  };
}
