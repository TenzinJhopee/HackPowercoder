"use client";

export function OfferCard({ confirmed, onConfirm }: { confirmed: boolean; onConfirm: () => void }) {
  return (
    <section aria-label="Offer" className="rounded-2xl border border-saved/40 bg-white p-5 shadow-card">
      <p className="text-base font-semibold tracking-tight text-ink">CHF 200 a month, into pillar 3a</p>
      {confirmed ? (
        <p className="mt-2 text-sm text-saved-ink">Confirmed. In this demo no real money moved.</p>
      ) : (
        <>
          <button
            type="button"
            onClick={onConfirm}
            className="mt-3 w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-sun shadow-sm shadow-brand/20 transition-colors hover:bg-[#c42833] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Tap to confirm
          </button>
          <p className="mt-2 text-xs text-faint">This demo moves no real money.</p>
        </>
      )}
    </section>
  );
}
