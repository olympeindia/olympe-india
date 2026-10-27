"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import usePrefersReducedMotion from "@/lib/motion/usePrefersReducedMotion";
import useScrollReveal from "@/lib/motion/useScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";
import { brandImages } from "@/data/media";

const WORDS = [
  { word: "MUSIC", number: "01", align: "justify-start" },
  { word: "ART", number: "02", align: "justify-end", accent: true },
  { word: "CULTURE", number: "03", align: "justify-start lg:pl-[12%]" },
  { word: "BEYOND", number: "04", align: "justify-end" },
];

/**
 * The OLYMPE language: four words set as oversized editorial type, with
 * a supplied brand photograph tucked into the composition. Motion is
 * the shared fade-up reveal plus a small scrubbed horizontal drift on the
 * words — no looping animation.
 */
export default function BrandSection({ event }) {
  const rootRef = useRef(null);
  const wordsRef = useRef([]);
  const reducedMotion = usePrefersReducedMotion();

  useScrollReveal(rootRef, "[data-reveal]", { stagger: 0.1, y: 36 });

  useEffect(() => {
    if (!rootRef.current || reducedMotion) return undefined;

    const ctx = gsap.context(() => {
      wordsRef.current.forEach((word, index) => {
        if (!word) return;
        gsap.fromTo(
          word,
          { xPercent: index % 2 === 0 ? -4 : 4 },
          {
            xPercent: index % 2 === 0 ? 4 : -4,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      aria-labelledby="brand-heading"
      className="relative isolate overflow-hidden bg-void py-24 sm:py-32 lg:py-40"
    >
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" aria-hidden="true" />

      <div className="mx-auto max-w-[1500px] px-4 sm:px-10 lg:px-16">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="05" label="OLYMPE LANGUAGE" />
          <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.3em] text-chrome-dark">
            {event.dates.map((entry) => entry.city).join(" / ")}
          </p>
        </div>
        <h2 id="brand-heading" className="sr-only">
          Music, Art, Culture, Beyond
        </h2>

        <div className="relative mt-12 sm:mt-16">
          {/* Brand photograph, set into the type on wide screens. */}
          <figure
            data-reveal
            className="relative z-0 mx-auto mb-10 aspect-[4/5] w-[70%] overflow-hidden bg-graphite sm:w-[46%] lg:absolute lg:right-[30%] lg:top-[4%] lg:mb-0 lg:w-[22%]"
          >
            <Image
              src={brandImages.detail.src}
              alt={brandImages.detail.alt}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 46vw, 22vw"
              className="object-cover grayscale-[35%]"
              style={{ objectPosition: brandImages.detail.position }}
            />
          </figure>

          <ul className="relative z-10">
            {WORDS.map((item, index) => (
              <li key={item.word} data-reveal className={`flex ${item.align}`}>
                <div
                  ref={(el) => {
                    wordsRef.current[index] = el;
                  }}
                  className="flex items-start gap-3 sm:gap-5"
                >
                  <span className="mt-[0.6em] font-mono text-xs tracking-[0.3em] text-chrome-dark">
                    {item.number}
                  </span>
                  <span
                    className={`font-display text-[clamp(4.5rem,17vw,15rem)] leading-[0.84] ${
                      item.accent ? "text-ember" : "text-chrome-light"
                    }`}
                  >
                    {item.word}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-chrome-dark sm:flex-row sm:justify-between">
          <p>
            {event.dates
              .map((entry) => `${entry.date} — ${entry.city}`)
              .join(" · ")}
          </p>
          <p>OLYMPE INDIA · 2026</p>
        </div>
      </div>
    </section>
  );
}
