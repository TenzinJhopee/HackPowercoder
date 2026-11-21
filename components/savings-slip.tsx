"use client";

import type { Cut, OverviewKeepsake, OverviewRow, PlanKeepsake } from "@/lib/savings-plan";
import { swiss } from "./format";
import type { KeptSlip } from "./keepsake";

/** Torn paper edge: a soft zigzag, drawn in the slip's own white. */
function Edge({ flip }: { flip?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 120 6" preserveAspectRatio="none" className={`block h-[7px] w-full ${flip ? "rotate-180" : ""}`}>
      <path
        d="M0 6 L0 3 5 0 10 3 15 0 20 3 25 0 30 3 35 0 40 3 45 0 50 3 55 0 60 3 65 0 70 3 75 0 80 3 85 0 90 3 95 0 100 3 105 0 110 3 115 0 120 3 120 6 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

/** Perforation between the stub and the lines, with the two punched notches of a ticket. */
function Perforation() {
  return (
    <div aria-hidden className="relative my-4 h-0">
      <span className="absolute -left-8 -top-2 h-4 w-4 rounded-full bg-canvas" />
      <span className="absolute -right-8 -top-2 h-4 w-4 rounded-full bg-canvas" />
      <div className="border-t-2 border-dotted border-line" />
    </div>
  );
}

const marks = (count: number, tone: string) =>
  Array.from({ length: count }, (_, i) => <span key={i} className={`block h-3.5 w-[3px] rounded-full ${tone}`} />);

/** Her usual purchases as tally marks: the ones she keeps in groups of five, the ones she skips set apart and struck through in green. */
function Tally({ cut }: { cut: Cut }) {
  const kept = cut.usualPerMonth - cut.fewer;
  return (
    <span aria-hidden className="flex flex-wrap items-center gap-x-2 gap-y-1">
      {Array.from({ length: Math.ceil(kept / 5) }, (_, group) => (
        <span key={group} className="flex gap-[3px]">
          {marks(Math.min(5, kept - group * 5), "bg-soft/60")}
        </span>
      ))}
      <span className="relative ml-1 flex gap-[3px] px-0.5">
        {marks(cut.fewer, "bg-saved/30")}
        <span className="slip-strike absolute -left-0.5 -right-0.5 top-1/2 block h-[2px] -translate-y-1/2 origin-left rounded-full bg-saved" />
      </span>
    </span>
  );
}

function CutLine({ cut, name }: { cut: Cut; name: string }) {
  const cancel = cut.kind === "cancel";
  return (
    <li
      className="slip-line py-2.5"
      aria-label={cancel ? `${name}: saves ${cut.saves} francs a month` : `${cut.fewer} fewer ${name} a month, of ${cut.usualPerMonth}: saves ${cut.saves} francs`}
    >
      <div className="flex items-baseline gap-2">
        <span className="inline-block text-sm font-medium text-ink first-letter:uppercase">{name}</span>
        <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-faint/40" />
        <span className="text-base font-semibold tabular-nums text-saved-ink">+{swiss(cut.saves)}</span>
      </div>
      {cancel ? (
        <p className="mt-1.5 text-[11px] text-faint">Subscription, the full amount</p>
      ) : (
        <div className="mt-1.5 flex items-center gap-3">
          <Tally cut={cut} />
          <span className="text-[11px] tabular-nums text-faint">
            −{cut.fewer} of {cut.usualPerMonth}
          </span>
        </div>
      )}
    </li>
  );
}

function OverviewLine({ row }: { row: OverviewRow }) {
  const saved = row.tone === "saved";
  return (
    <li className="slip-line flex items-baseline gap-2 py-1.5" aria-label={`${row.label}: ${saved ? "saves" : "costs"} ${row.value} francs a ${row.per}`}>
      <span className="text-sm font-medium text-ink">{row.label}</span>
      <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-faint/40" />
      {row.also && (
        <span className="text-[11px] tabular-nums text-faint">
          {swiss(row.also.value)} a {row.also.per}
        </span>
      )}
      <span className={`text-base font-semibold tabular-nums ${saved ? "text-saved-ink" : "text-spend-ink"}`}>
        {saved && "+"}
        {swiss(row.value)}
        <span className="ml-0.5 text-[11px] font-normal text-faint">/{row.per === "month" ? "mo" : "yr"}</span>
      </span>
    </li>
  );
}

/** "How can I save money?": one captioned group per spoken beat. */
function OverviewBody({ keepsake, revealed }: { keepsake: OverviewKeepsake; revealed: number }) {
  return (
    <div className="space-y-3">
      {keepsake.groups.slice(0, revealed).map((group) => (
        <div key={group.caption} className="slip-line">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-faint">{group.caption}</p>
          <ul className="divide-y divide-dashed divide-line">
            {group.rows.map((row) => (
              <OverviewLine key={row.label} row={row} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** A savings answer as a paper slip she keeps: it stays until she closes it (or starts over). */
export function SavingsSlip({ slip, onClose }: { slip: KeptSlip; onClose: () => void }) {
  const { keepsake } = slip;
  const overview = keepsake.kind === "overview";
  const title = overview ? "Ways to save" : "Savings plan";

  return (
    <section
      aria-label={overview ? "Ways to save" : "Your savings plan"}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
      }}
      className="slip-settle mx-auto w-full max-w-sm drop-shadow-[0_6px_14px_rgba(20,34,56,0.08)]"
    >
      <Edge />
      <div className="overflow-hidden bg-white px-6 pb-4 pt-2">
        <div className="flex items-start justify-between gap-3">
          <div className="pt-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-faint">{title}</p>
            {keepsake.kind === "savings" ? (
              <p className="mt-1 text-sm tabular-nums text-soft">
                Goal <span className="font-semibold text-ink">CHF {swiss(keepsake.plan.target)}</span> a month
              </p>
            ) : (
              <p className="mt-1 text-sm text-soft">From your 2025</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title.toLowerCase()}`}
            className="-mr-3 grid h-11 w-11 shrink-0 place-items-center rounded-full text-faint transition-colors hover:bg-canvas hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ink"
          >
            <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <Perforation />

        {keepsake.kind === "overview" ? <OverviewBody keepsake={keepsake} revealed={slip.revealed} /> : <PlanBody keepsake={keepsake} revealed={slip.revealed} />}
      </div>
      <Edge flip />
    </section>
  );
}

/** "How can I save X a month?": the cuts, then the total. */
function PlanBody({ keepsake, revealed }: { keepsake: PlanKeepsake; revealed: number }) {
  const { plan, names } = keepsake;
  const cuts = plan.cuts.slice(0, revealed);
  const totalShown = revealed > plan.cuts.length;
  const short = plan.shortfall > 0;
  return (
    <>
        <ul className="divide-y divide-dashed divide-line">
          {cuts.map((cut, i) => (
            <CutLine key={cut.merchant} cut={cut} name={names[i] ?? cut.merchant} />
          ))}
        </ul>

        {totalShown && (
          <div className="slip-line mt-2 border-t-2 border-double border-line pt-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-faint">{short ? "These changes give" : "Saved a month"}</p>
            <p className="mt-1 text-5xl font-semibold tabular-nums leading-none text-saved-ink">
              <span className="mr-1.5 align-top text-base font-medium text-saved-ink/80">CHF</span>
              {swiss(short ? plan.reachable : plan.monthly)}
            </p>
            {short ? (
              <p className="mt-2 text-sm tabular-nums text-soft">
                of {swiss(plan.target)} · <span className="font-medium text-coral-ink">{swiss(plan.shortfall)} missing</span>
              </p>
            ) : (
              <p className="mt-2 text-sm tabular-nums text-soft">{swiss(plan.yearly)} a year</p>
            )}
          </div>
        )}
    </>
  );
}
