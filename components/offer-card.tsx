"use client";

export function OfferCard({ confirmed, onConfirm }: { confirmed: boolean; onConfirm: () => void }) {
  return (
    <section aria-label="Offer" className="rounded-2xl border border-saved/40 bg-panel p-4">
      <p className="text-base font-medium text-paper">CHF 200 a month, into pillar 3a</p>
      {confirmed ? (
        <p className="mt-2 text-sm text-saved">Confirmed. In this demo no real money moved.</p>
      ) : (
        <>
          <button
            type="button"
            onClick={onConfirm}
            className="mt-3 w-full rounded-xl bg-saved px-4 py-3 text-sm font-semibold text-night transition-opacity hover:opacity-90"
          >
            Tap to confirm
          </button>
          <p className="mt-2 text-xs text-faint">This demo moves no real money.</p>
        </>
      )}
    </section>
  );
}
