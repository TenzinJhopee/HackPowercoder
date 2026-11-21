/* eslint-disable @next/next/no-img-element */

/**
 * TellHorn logo: the apple with the arrow, then the wordmark with its sound-wave badge, and (from tablets up) the
 * tagline. The images are the brand logo cut out on a transparent background, so they sit on the yellow header.
 */
export function Logo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <img src="/brand/tellhorn-mark.png" alt="" width={245} height={240} className="h-9 w-auto shrink-0 sm:h-10" />
      <div className="min-w-0">
        <img src="/brand/tellhorn-wordmark.png" alt="TellHorn" width={720} height={105} className="h-5 w-auto sm:h-6" />
        <p className="mt-1 hidden text-[11px] font-medium leading-none tracking-wide text-on-sun/80 md:block">The William Tell of your finances</p>
      </div>
    </div>
  );
}
