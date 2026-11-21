"use client";

import { useEffect, useMemo, useState } from "react";
import type { Transaction } from "@/lib/models";

interface TransactionResponse {
  count: number;
  accounts: string[];
  currencies: string[];
  transactions: Transaction[];
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency,
    maximumFractionDigits: 2
  }).format(amount);
}

export default function HomePage() {
  const [data, setData] = useState<TransactionResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/transactions", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("The transaction database could not be loaded.");
        return response.json() as Promise<TransactionResponse>;
      })
      .then(setData)
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Database error"));
  }, []);

  const summary = useMemo(() => {
    if (!data) return null;
    const income = data.transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + item.amount, 0);
    const expenses = data.transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + Math.abs(item.amount), 0);
    const transfers = data.transactions.filter((item) => item.type === "transfer").reduce((sum, item) => sum + Math.abs(item.amount), 0);
    return { income, expenses, transfers };
  }, [data]);

  return (
    <main className="min-h-screen bg-[#f4f6f8] px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-600">PostFinance data</p>
            <h1 className="mt-2 text-3xl font-semibold">Transaction database</h1>
          </div>
          {data && <p className="text-sm text-slate-500">{data.count} transactions · 2025</p>}
        </header>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</div>}
        {!data && !error && <p className="text-sm text-slate-500">Loading the local database…</p>}

        {data && summary && (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Income</p>
                <p className="mt-3 text-2xl font-semibold text-emerald-700">{formatMoney(summary.income, "CHF")}</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Expenses</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{formatMoney(summary.expenses, "CHF")}</p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Account transfers</p>
                <p className="mt-3 text-2xl font-semibold text-slate-900">{formatMoney(summary.transfers, "CHF")}</p>
              </article>
            </section>

            <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="font-semibold">Imported transactions</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400">
                    <tr>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Description</th>
                      <th className="px-5 py-3">Account</th>
                      <th className="px-5 py-3">Category</th>
                      <th className="px-5 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.transactions.slice().reverse().slice(0, 100).map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-slate-50/70">
                        <td className="whitespace-nowrap px-5 py-3 text-slate-500">{transaction.date}</td>
                        <td className="max-w-[360px] px-5 py-3 font-medium">{transaction.description}</td>
                        <td className="px-5 py-3 text-slate-500">{transaction.account}</td>
                        <td className="px-5 py-3 text-slate-500">{transaction.category}</td>
                        <td className={`whitespace-nowrap px-5 py-3 text-right font-semibold ${transaction.amount < 0 ? "text-slate-900" : "text-emerald-700"}`}>
                          {formatMoney(transaction.amount, transaction.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
