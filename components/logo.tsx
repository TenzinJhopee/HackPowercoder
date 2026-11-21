/** Luma logo and wordmark, as in the first prototype. */
export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm shadow-brand/20">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 10v3" />
          <path d="M6 6v11" />
          <path d="M10 3v18" />
          <path d="M14 8v7" />
          <path d="M18 5v13" />
          <path d="M22 10v3" />
        </svg>
      </span>
      <div>
        <p className="text-[17px] font-bold leading-tight tracking-tight text-ink">
          luma<span className="text-brand">.</span>
        </p>
        <p className="-mt-0.5 text-[10px] font-medium tracking-wide text-slate-400">MONEY, IN FOCUS</p>
      </div>
    </div>
  );
}
