"use client";

import { forwardRef } from "react";
import { EVENT } from "@/data/event";
import Emblem from "./Emblem";

/**
 * SIDEJOU INVITES + the Emblem + the dates, grouped as one vertically-
 * centered flex column instead of three independently top-%'d pieces.
 * Centering the group is then just `justify-center` on this block's
 * parent (Hero.jsx) — the dates sit "beneath the emblem with deliberate
 * spacing" by construction (flex `gap`), not by guessing a top-% that
 * happens to land below wherever the emblem currently ends.
 *
 * `groupRef` carries the outer scroll-driven lift/fade so the whole
 * group recedes together; `emblemRef`/`logoRef` (forwarded further in)
 * carry their own additional scale for depth, nested inside this one.
 */
const HeroCenter = forwardRef(function HeroCenter({ emblemRef, logoRef }, groupRef) {
  return (
    <div
      ref={groupRef}
      className="absolute inset-0 flex flex-col items-center justify-center gap-[1.5vh] px-6"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-chrome sm:text-xs">
        {EVENT.presenter}
      </p>

      <Emblem ref={emblemRef} logoRef={logoRef} />

      <div className="flex items-center gap-5 sm:gap-8">
        {EVENT.dates.map((entry, index) => (
          <div key={entry.city} className="flex items-center gap-5 sm:gap-8">
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-display text-lg tracking-wide text-chrome-light sm:text-xl">
                {entry.date}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-copper sm:text-xs">
                {entry.city}
              </span>
            </div>
            {index < EVENT.dates.length - 1 && (
              <span className="h-8 w-px bg-graphite-2" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      <p className="mt-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.4em] text-chrome-dark sm:text-[10px]">
        {EVENT.tagline}
      </p>
    </div>
  );
});

export default HeroCenter;
