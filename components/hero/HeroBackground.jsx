"use client";

import { forwardRef } from "react";

// Fixed, hand-placed star positions rather than Math.random() at render
// time — a randomized field would mismatch between server and client
// render and cause a hydration error. Sparse and irregular on purpose:
// "discovered rather than noticed," per the reference.
const STARS = [
  { x: 6, y: 24, s: 1.6, o: 0.55 },
  { x: 11, y: 9, s: 1, o: 0.4 },
  { x: 15, y: 46, s: 1.2, o: 0.5 },
  { x: 22, y: 61, s: 1, o: 0.35 },
  { x: 9, y: 71, s: 1.4, o: 0.45 },
  { x: 27, y: 14, s: 1, o: 0.3 },
  { x: 34, y: 32, s: 1.8, o: 0.6 },
  { x: 18, y: 84, s: 1, o: 0.3 },
  { x: 41, y: 8, s: 1, o: 0.35 },
  { x: 46, y: 22, s: 1.3, o: 0.45 },
  { x: 38, y: 55, s: 1, o: 0.3 },
  { x: 58, y: 18, s: 1.2, o: 0.4 },
  { x: 63, y: 44, s: 1.6, o: 0.55 },
  { x: 71, y: 10, s: 1, o: 0.35 },
  { x: 76, y: 33, s: 1, o: 0.3 },
  { x: 82, y: 58, s: 1.4, o: 0.5 },
  { x: 88, y: 20, s: 1, o: 0.35 },
  { x: 93, y: 41, s: 1.8, o: 0.6 },
  { x: 90, y: 68, s: 1, o: 0.3 },
  { x: 96, y: 13, s: 1, o: 0.3 },
  { x: 52, y: 63, s: 1, o: 0.3 },
  { x: 68, y: 72, s: 1.2, o: 0.4 },
  { x: 30, y: 76, s: 1, o: 0.3 },
  { x: 79, y: 82, s: 1, o: 0.3 },
];

/**
 * The void the wings float in. Two independent depth layers, on
 * purpose: the forwarded ref covers only the stars + soft light arc
 * ("atmosphere," per the brief), which Hero.jsx drifts slowly on scroll
 * for parallax depth — while the dark glossy floor at the bottom is a
 * plain sibling underneath that, never touched by any transform, since
 * the brief is explicit that the reflection/floor "remains anchored to
 * the environment" regardless of what everything above it does.
 */
const HeroBackground = forwardRef(function HeroBackground(_props, ref) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div ref={ref} className="absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          {STARS.map((star, i) => (
            <circle
              key={i}
              cx={`${star.x}%`}
              cy={`${star.y}%`}
              r={star.s}
              fill="#e9eae7"
              opacity={star.o}
            />
          ))}
        </svg>

        {/* Soft ring of light, centered above the frame — only its lower
            arc is visible, echoing the reference's partial halo. */}
        <div
          className="absolute left-1/2 aspect-square w-[46vh] -translate-x-1/2 rounded-full"
          style={{
            top: "-34vh",
            border: "1px solid rgba(230,225,215,0.22)",
            boxShadow: "0 0 60px 10px rgba(200,180,150,0.06)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 w-px -translate-x-1/2"
          style={{
            top: "0",
            height: "34vh",
            background:
              "linear-gradient(to bottom, rgba(230,225,215,0.28), rgba(230,225,215,0))",
          }}
          aria-hidden="true"
        />
      </div>

      {/*
        Dark glossy floor — understated on purpose (no bright mirror, no
        hard horizon line): a gradual darkening, a faint horizontal
        sheen suggesting a reflective surface catching ambient light,
        and a dim echo of the central vertical light line reaching down
        into it, as if reflected. The wings' own reflections
        (HeroReflection) sit on top of this and are what actually show
        wing shapes. Deliberately outside the ref above — this layer
        never moves.
      */}
      <div
        className="absolute inset-x-0 bottom-0 h-[19vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(8,8,9,0.5) 45%, rgba(14,13,13,0.8) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[19vh] opacity-60"
        style={{
          background:
            "linear-gradient(to top, rgba(60,58,56,0.14) 0%, rgba(60,58,56,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[15vh] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(196,122,85,0.09), rgba(0,0,0,0) 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 bottom-0 w-px -translate-x-1/2"
        style={{
          height: "16vh",
          background:
            "linear-gradient(to top, rgba(230,225,215,0.16), rgba(230,225,215,0))",
        }}
        aria-hidden="true"
      />
    </div>
  );
});

export default HeroBackground;
