"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { EVENT } from "@/data/event";

/**
 * The peripheral editorial marks only — corner labels, tagline, scroll
 * cue, and the small bottom-left mark. SIDEJOU INVITES, the Emblem, and
 * the dates row live in HeroCenter now, as one vertically-centered
 * group; these pieces stay pinned to the frame's edges regardless of
 * how tall that centered group ends up being.
 */
const HeroTypography = forwardRef(function HeroTypography(_props, ref) {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-20 text-chrome-light"
    >
      {/* Corner labels */}
      <div className="absolute left-[4%] top-[5%] flex flex-col items-start gap-3 sm:left-[2%]">
        <p className="font-mono text-[9px] uppercase leading-[1.6] tracking-[0.25em] text-chrome sm:text-[10px]">
          {EVENT.cornerLabelLeft.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <span className="h-12 w-px bg-gradient-to-b from-chrome-dark/60 to-transparent sm:h-16" />
      </div>

      <div className="absolute right-[4%] top-[5%] flex flex-col items-end gap-3 sm:right-[2%]">
        <p className="text-right font-mono text-[9px] uppercase leading-[1.6] tracking-[0.25em] text-chrome sm:text-[10px]">
          {EVENT.cornerLabelRight.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <span className="h-12 w-px bg-gradient-to-b from-chrome-dark/60 to-transparent sm:h-16" />
      </div>

      {/* Scroll cue — anchored to the bottom edge itself rather than a
          top-% value, so it can never collide with the centered
          SIDEJOU/Emblem/dates/tagline group above regardless of how
          tall that group renders. */}
      <div className="absolute bottom-[2%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-chrome-dark">
          Scroll
        </span>
        <span className="h-6 w-px bg-gradient-to-b from-chrome-dark to-transparent" />
      </div>

      {/* Bottom-left mark */}
      <div className="absolute bottom-[4%] left-[4%] h-5 w-5 opacity-80 sm:left-[2%]">
        <Image
          src="/assets/olympe/logo/blood2.PNG"
          alt=""
          width={200}
          height={200}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
});

export default HeroTypography;
