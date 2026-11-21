import type { FactsSummary } from "@/lib/facts";

/**
 * "What the bank knows about me": the advisor's client file, shown to the user as a page.
 * Built from the facts summary, so it never says more than the agent knows.
 */
export function renderClientFile(facts: FactsSummary): string {
  const chf = (value: number) => `${Math.round(value).toLocaleString("de-CH")} CHF`;
  const lines: string[] = [];
  lines.push("# What the bank knows about me", "");
  lines.push(`Period: ${facts.periodStart} to ${facts.periodEnd}. Every figure is calculated from your transactions.`, "");

  lines.push("## Income and spending", "");
  lines.push(`- Monthly salary: ${chf(facts.income.baseMonthly)}${facts.income.aboveBase > 0 ? `, plus ${chf(facts.income.aboveBase)} in extra payments this year` : ""}`);
  lines.push(`- Spending after refunds: ${chf(facts.spending.net)} (refunds: ${chf(facts.spending.refunds)})`);
  for (const n of facts.byNecessity) lines.push(`- ${capitalize(n.label)}: ${chf(n.monthly)} a month (${Math.round(n.share * 100)}%)`);
  lines.push(`- Left each month after fixed costs: ${chf(facts.monthlyRoomAfterCompulsory)}`, "");

  lines.push("## Where the money goes", "");
  for (const g of facts.topGroups) lines.push(`- ${g.label}: ${chf(g.net)} (${facts.labels.necessity[g.necessity as keyof typeof facts.labels.necessity]})`);
  lines.push("");

  const asserted = facts.insights.filter((i) => i.mode === "assert");
  if (asserted.length) {
    lines.push("## What we noticed", "");
    for (const i of asserted) lines.push(`- ${i.summary}`);
    lines.push("");
  }

  if (facts.openQuestions.length) {
    lines.push("## Open questions", "");
    for (const q of facts.openQuestions) lines.push(`- ${q.question}`);
    lines.push("");
  }

  if (facts.notes.length) {
    lines.push("## What you told us", "");
    for (const note of facts.notes) {
      const insight = facts.insights.find((i) => i.id === note.subject);
      lines.push(`- ${insight?.question ?? note.subject} — ${note.text || note.answer}`);
    }
    lines.push("");
  }

  lines.push("_Not financial advice. For complex questions we connect you with a human advisor._");
  return lines.join("\n");
}

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
