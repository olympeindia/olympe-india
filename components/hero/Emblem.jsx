"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { EVENT } from "@/data/event";
import Wing from "./Wing";

/**
 * Wings + logo as ONE coordinate system, per the brief: every position
 * inside this box is a percentage of THIS box, never of the viewport.
 * That's the actual fix for "the emblem doesn't look centered" — the
 * previous version sized the wings in viewport-width units (vw) and
 * positioned the logo in viewport-height units (vh/%), two units that
 * only happen to agree at one specific viewport aspect ratio and
 * quietly drift apart at every other one. A single square box, sized
 * once, removes that whole class of bug: wing geometry and logo
 * position are locked to each other by construction, at any size.
 *
 * The box itself doesn't center itself — its flex parent (HeroCenter)
 * does that — so "is the complete emblem centered" reduces to "is this
 * one box centered," not three independently-placed pieces that each
 * have to land on the same center by coincidence.
 *
 * The logo's own placement (top-[19%], width 34%) comes from measuring
 * the supplied reference artwork's actual wing-to-wordmark relationship
 * (the wordmark sits in the open gap just below where the wings' inner
 * curves begin, well above the point further down where they cross) and
 * re-expressing that as a fraction of the wing's own height — not eyeballed
 * against a screenshot, and not the viewport-relative percentage this
 * project got visibly wrong twice before.
 *
 * The box is `aspect-square`, so its height always equals its own width
 * in real pixels — sizing that width from viewport WIDTH alone (`vw`)
 * reintroduces the exact bug this component exists to remove, just one
 * level up: on any short/wide window the resulting box is taller than
 * the viewport itself and the whole emblem runs off-screen. Each width
 * below is `min(vw-based, vh-based)`, so the box is also bounded by
 * available height and can never outgrow the viewport regardless of
 * its aspect ratio.
 */
const Emblem = forwardRef(function Emblem({ logoRef }, ref) {
  return (
    <div
      ref={ref}
      className="relative aspect-square w-[min(80vw,54vh)] sm:w-[min(64vw,56vh)] lg:w-[min(42vw,58vh)] max-w-[600px]"
    >
      <Wing side="left" />
      <Wing side="right" />
      <div
        ref={logoRef}
        className="absolute left-1/2 top-[19%] w-[34%] -translate-x-1/2"
      >
        <Image
          src="/assets/olympe/hero/wordmark.webp"
          alt={EVENT.title}
          width={2258}
          height={457}
          priority
          className="h-auto w-full select-none"
        />
      </div>
    </div>
  );
});

export default Emblem;
