import { cardStatusAsOf } from "@/lib/card-cycle";
import { detectRecurringPayments, forecastCashFlow } from "@/lib/intelligence";
import type { Transaction } from "@/lib/models";
import { seriesNames, totalOf, type Series } from "./series";

/**
 * The director's tools, provider-neutral. Every tool runs in code so the model never computes a number itself;
 * every number a tool returns may be spoken (it lands in `toolResults`).
 *
 * `recurring_payments` and `forecast` wrap `detectRecurringPayments` and `forecastCashFlow` (lib/intelligence.ts).
 * Their detector requires regular gaps and stable amounts and marks stopped flows inactive, so one-off or stopped
 * shopping (a bike, a store she no longer uses) is not reported as a fixed cost.
 */

export interface DirectorToolContext {
  series: Series;
  transactions: Transaction[];
  currency: string;
  /** Last transaction date in the data (the data is historical; never "today"). */
  asOf: string;
}

export interface DirectorToolDefinition {
  name: string;
  description: string;
  input_schema: { type: "object"; properties: Record<string, unknown>; required?: string[] };
}

export interface DirectorToolResult {
  text: string;
  numbers: number[];
  isError: boolean;
}

const DATE = { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" };

export const directorTools: DirectorToolDefinition[] = [
  {
    name: "total",
    description: "Adds up the chosen months of a series. Use it whenever you need a total of months.",
    input_schema: {
      type: "object",
      properties: {
        series: { type: "string", enum: [...seriesNames] },
        months: { type: "array", items: { type: "integer", minimum: 1, maximum: 12 } }
      },
      required: ["series", "months"]
    }
  },
  {
    name: "find_transactions",
    description:
      "Net spending (expenses minus refunds) matching a merchant name part, a date range and/or a minimum amount. Returns count, net_total, first/last date, top merchants and largest purchases. At least one filter.",
    input_schema: {
      type: "object",
      properties: {
        merchant: { type: "string", description: "Case-insensitive part of the merchant name." },
        from: { ...DATE, description: "First day, YYYY-MM-DD." },
        to: { ...DATE, description: "Last day, YYYY-MM-DD." },
        min_amount: { type: "number", minimum: 0, description: "Only bookings of at least this many francs." }
      }
    }
  },
  {
    name: "card_status",
    description: "Credit card cycle on a date: spent so far in that cycle, the monthly card budget, what is left (or over), the day it was crossed and the payment date.",
    input_schema: { type: "object", properties: { date: { ...DATE, description: "YYYY-MM-DD." } }, required: ["date"] }
  },
  {
    name: "recurring_payments",
    description:
      "Regular payments (same merchant, regular dates, stable amount), largest first: name, cadence, typical amount, count, total paid in the data, last_date and whether it is still active.",
    input_schema: { type: "object", properties: {} }
  },
  {
    name: "forecast",
    description:
      "Estimate for the next 30 and 90 days from the active regular payments and the last three months of other spending (net of refunds): income, expenses, net. An estimate, not a promise.",
    input_schema: { type: "object", properties: {} }
  }
];

const isDate = (value: unknown): value is string => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
const fail = (text: string): DirectorToolResult => ({ text: `Invalid input: ${text}`, numbers: [], isError: true });

/** Every finite number in a value (dates stay strings, so they are not included). */
function collectNumbers(value: unknown, into: number[] = []): number[] {
  if (typeof value === "number" && Number.isFinite(value)) into.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectNumbers(item, into));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => collectNumbers(item, into));
  return into;
}

const ok = (result: unknown): DirectorToolResult => ({ text: JSON.stringify(result), numbers: collectNumbers(result), isError: false });

function runTotal(args: Record<string, unknown>, ctx: DirectorToolContext): DirectorToolResult {
  const name = seriesNames.find((candidate) => candidate === args.series);
  const total = name && Array.isArray(args.months) ? totalOf(ctx.series, name, args.months as number[]) : null;
  if (total === null) return fail('"series" must be monthly_spending or card_bill and "months" a list of integers 1-12.');
  return { text: String(total), numbers: [total], isError: false };
}

function findTransactions(args: Record<string, unknown>, ctx: DirectorToolContext): DirectorToolResult {
  const { merchant, from, to, min_amount: minAmount } = args;
  if (merchant !== undefined && (typeof merchant !== "string" || !merchant.trim())) return fail('"merchant" must be a non-empty string.');
  if (from !== undefined && !isDate(from)) return fail('"from" must be YYYY-MM-DD.');
  if (to !== undefined && !isDate(to)) return fail('"to" must be YYYY-MM-DD.');
  if (minAmount !== undefined && (typeof minAmount !== "number" || !Number.isFinite(minAmount) || minAmount < 0)) return fail('"min_amount" must be a number >= 0.');
  if (merchant === undefined && from === undefined && to === undefined && minAmount === undefined) return fail("give at least one of merchant, from, to, min_amount.");

  const needle = typeof merchant === "string" ? merchant.trim().toLowerCase() : undefined;
  // Same sign convention as buildSeries: expenses are negative, refunds positive, net spending = -amount.
  const matches = ctx.transactions
    .filter((t) => t.currency === ctx.currency && (t.type === "expense" || t.type === "refund"))
    .filter((t) => !needle || (t.merchant || t.description).toLowerCase().includes(needle))
    .filter((t) => (from === undefined || t.date >= from) && (to === undefined || t.date <= to))
    .filter((t) => minAmount === undefined || Math.abs(t.amount) >= minAmount)
    .sort((a, b) => a.date.localeCompare(b.date));
  if (!matches.length) return ok({ count: 0 });

  const merchants = new Map<string, { count: number; net: number }>();
  for (const t of matches) {
    const name = t.merchant || t.description;
    const entry = merchants.get(name) ?? { count: 0, net: 0 };
    entry.count += 1;
    entry.net -= t.amount;
    merchants.set(name, entry);
  }
  return ok({
    count: matches.length,
    net_total: Math.round(matches.reduce((sum, t) => sum - t.amount, 0)),
    first_date: matches[0].date,
    last_date: matches.at(-1)!.date,
    by_merchant: [...merchants.entries()]
      .map(([name, entry]) => ({ name, count: entry.count, net: Math.round(entry.net) }))
      .sort((a, b) => b.net - a.net)
      .slice(0, 8),
    largest: matches
      .filter((t) => t.type === "expense")
      .sort((a, b) => a.amount - b.amount)
      .slice(0, 8)
      .map((t) => ({ date: t.date, merchant: t.merchant || t.description, amount: Math.round(-t.amount) }))
  });
}

function cardStatus(args: Record<string, unknown>, ctx: DirectorToolContext): DirectorToolResult {
  const first = ctx.transactions.reduce((min, t) => (t.date < min ? t.date : min), ctx.asOf);
  if (!isDate(args.date) || args.date < first || args.date > ctx.asOf) return fail(`"date" must be YYYY-MM-DD between ${first} and ${ctx.asOf}.`);
  const status = cardStatusAsOf(ctx.transactions.filter((t) => t.currency === ctx.currency), args.date);
  return ok({
    date: status.asOf,
    cycle: status.cycle,
    spent: status.spent,
    budget: status.budget,
    ...(status.budgetLeft >= 0 ? { left: status.budgetLeft } : { over: -status.budgetLeft }),
    crossed_on: status.crossedOn,
    payment_date: status.paymentDate
  });
}

function recurringPayments(_args: Record<string, unknown>, ctx: DirectorToolContext): DirectorToolResult {
  return ok(
    detectRecurringPayments(ctx.transactions, ctx.currency)
      .slice(0, 12)
      .map((flow) => ({
        name: flow.name,
        cadence: flow.cadence,
        typical_amount: Math.round(flow.typicalAmount),
        count: flow.occurrenceCount,
        total_paid: Math.round(flow.totalAmount),
        last_date: flow.lastDate,
        active: flow.active
      }))
  );
}

function forecast(_args: Record<string, unknown>, ctx: DirectorToolContext): DirectorToolResult {
  const result = forecastCashFlow(ctx.transactions, [], ctx.currency, new Date(`${ctx.asOf}T00:00:00Z`));
  const horizon = (index: 0 | 1) => ({
    income: Math.round(result.horizons[index].projectedIncome),
    expenses: Math.round(result.horizons[index].projectedExpenses),
    net: Math.round(result.horizons[index].projectedNetFlow)
  });
  return ok({
    as_of: result.asOfDate,
    days_30: horizon(0),
    days_90: horizon(1),
    regular_expenses_monthly: Math.round(result.recurringExpensesMonthly),
    variable_expenses_monthly: Math.round(result.averageVariableExpensesMonthly)
  });
}

const executors: Record<string, (args: Record<string, unknown>, ctx: DirectorToolContext) => DirectorToolResult> = {
  total: runTotal,
  find_transactions: findTransactions,
  card_status: cardStatus,
  recurring_payments: recurringPayments,
  forecast
};

/** Runs one tool call. `input` may be the parsed object or a JSON string (OpenAI-style arguments). Never throws. */
export function runDirectorTool(name: string, input: unknown, ctx: DirectorToolContext): DirectorToolResult {
  const executor = executors[name];
  if (!executor) return { text: `Unknown tool ${name}.`, numbers: [], isError: true };
  let args: unknown = input;
  if (typeof input === "string") {
    try {
      args = JSON.parse(input || "{}");
    } catch {
      return fail("arguments must be JSON.");
    }
  }
  if (typeof args !== "object" || args === null || Array.isArray(args)) return fail("arguments must be an object.");
  try {
    return executor(args as Record<string, unknown>, ctx);
  } catch {
    return { text: `Tool ${name} failed.`, numbers: [], isError: true };
  }
}
