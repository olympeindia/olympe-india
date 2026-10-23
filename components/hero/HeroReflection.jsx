"use client";

import Image from "next/image";
import { WING_ASPECT } from "./wingLayout";

const FLOOR_HEIGHT = "18vh";

function ReflectionWing({ side }) {
  const isLeft = side === "left";

  return (
    <div
      className={`absolute bottom-0 w-[44%] overflow-hidden ${
        isLeft ? "left-[2%]" : "right-[2%]"
      }`}
      style={{ height: FLOOR_HEIGHT }}
    >
      {/*
        The full wing, mirrored top-to-bottom and pinned to the top of
        this (much shorter) clipping box — overflow:hidden then shows
        only its own lowest slice, reflected, which reads as "the floor
        reflecting the wing" rather than a second full wing hanging
        underneath. Faded and blurred so it dissolves into the void
        instead of ending on a hard edge or looking like a literal
        duplicate.
      */}
      <div
        className="absolute left-0 top-0 w-full opacity-[0.14] blur-[3px]"
        style={{
          aspectRatio: WING_ASPECT,
          transform: isLeft ? "scaleY(-1)" : "scale(-1,-1)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      >
        <Image
          src="/assets/olympe/hero/wing.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 46vw, 26vw"
          className="select-none object-contain"
        />
      </div>
    </div>
  );
}

/**
 * The dark glossy floor's wing echo — a separate, static layer, not
 * nested inside the Emblem: it stays anchored to the environment
 * regardless of what the emblem does on scroll, and reuses the same
 * width/centering rule as the Emblem (see Emblem.jsx) purely so the
 * reflection lines up horizontally with whatever's above it, without
 * needing to read the Emblem's actual rendered position. Sits above
 * HeroBackground's floor gradient and below the emblem in DOM order.
 */
export default function HeroReflection() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[min(80vw,54vh)] -translate-x-1/2 sm:w-[min(64vw,56vh)] lg:w-[min(42vw,58vh)] max-w-[600px]"
      aria-hidden="true"
    >
      <ReflectionWing side="left" />
      <ReflectionWing side="right" />
    </div>
  );
}
