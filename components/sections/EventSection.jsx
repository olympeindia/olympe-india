"use client";

import { useRef } from "react";
import Image from "next/image";
import useScrollReveal from "@/lib/motion/useScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";
import {
  MEDIA_CAPTION,
  introImages,
  delhiEventImage,
  bengaluruEventImage,
} from "@/data/media";

// Chapter copy per city. Ticket URLs are NOT repeated here — they are
// read from the scoped event data so data/event.js stays the single source.
const CHAPTERS = {
  DELHI: {
    chapter: "01",
    fullDate: "27 NOVEMBER 2026",
    statement: "ONE NIGHT. ONE FREQUENCY.",
    image: delhiEventImage,
  },
  BENGALURU: {
    chapter: "02",
    fullDate: "28 NOVEMBER 2026",
    statement: "THE FREQUENCY CONTINUES.",
    image: bengaluruEventImage,
  },
};

export default function EventSection({ event }) {
  const introRef = useRef(null);
  const panelsRef = useRef(null);
  useScrollReveal(introRef, "[data-reveal]", { stagger: 0.1 });
  useScrollReveal(panelsRef, "[data-reveal]", { stagger: 0.12 });

  return (
    <section id="event" className="relative bg-ink text-white">
      {/* ── Introduction ─────────────────────────────────────────── */}
      <div
        ref={introRef}
        className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-4 py-24 sm:px-10 sm:py-32 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-40"
      >
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <SectionLabel index="02" label="THE EVENT" />
            <p
              data-reveal
              className="mt-10 font-mono text-xs uppercase tracking-[0.5em] text-ember"
            >
              A HIGHER FREQUENCY
            </p>
            <h2
              data-reveal
              className="mt-6 font-display text-[clamp(3.5rem,8.5vw,8.5rem)] leading-[0.86] text-white"
            >
              {event.dates.length > 1 ? "TWO CITIES." : "ONE CITY."}
              <span className="block text-chrome">
                {event.dates.length > 1 ? "TWO NIGHTS." : "ONE NIGHT."}
              </span>
              <span className="block">ONE FREQUENCY.</span>
            </h2>
          </div>

          <p
            data-reveal
            className="mt-10 max-w-md text-base leading-8 text-chrome lg:mt-16"
          >
            {event.presenter} brings {event.title} to India for{" "}
            {event.dates.length > 1 ? "two nights" : "one night"} of
            uncompromising electronic music —{" "}
            {event.dates.map((entry) => entry.city).join(" and ")}, November
            2026.
          </p>
        </div>

        {/* Asymmetric image pair */}
        <div className="relative lg:col-span-7">
          <figure
            data-reveal
            className="relative ml-auto aspect-[4/5] w-full overflow-hidden bg-graphite sm:w-[82%]"
          >
            <Image
              src={introImages.primary.src}
              alt={introImages.primary.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 82vw, 48vw"
              className="object-cover"
              style={{ objectPosition: introImages.primary.position }}
            />
            <figcaption className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
              {MEDIA_CAPTION}
            </figcaption>
          </figure>

          <figure
            data-reveal
            className="relative -mt-24 aspect-[4/5] w-[52%] overflow-hidden border-[6px] border-ink bg-graphite sm:absolute sm:bottom-[-3rem] sm:left-0 sm:mt-0 sm:w-[38%]"
          >
            <Image
              src={introImages.secondary.src}
              alt={introImages.secondary.alt}
              fill
              sizes="(max-width: 640px) 52vw, 28vw"
              className="object-cover"
              style={{ objectPosition: introImages.secondary.position }}
            />
          </figure>
        </div>
      </div>

      {/* ── City chapters ────────────────────────────────────────── */}
      <div
        ref={panelsRef}
        className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 px-4 pb-24 sm:px-10 md:grid-cols-2 md:gap-6 lg:px-16 lg:pb-32"
      >
        {event.dates.map((entry, index) => {
          const chapter = CHAPTERS[entry.city];
          return (
            <article
              key={entry.city}
              data-reveal
              className={`@container group relative isolate flex min-h-[78svh] flex-col justify-between overflow-hidden bg-graphite p-6 sm:p-10 md:min-h-[86vh] ${
                index === 1 ? "md:mt-24" : ""
              }`}
            >
              <div className="absolute inset-0 -z-20 overflow-hidden">
                <Image
                  src={chapter.image.src}
                  alt={chapter.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="photo-zoom object-cover"
                  style={{ objectPosition: chapter.image.position }}
                />
              </div>
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/30"
                aria-hidden="true"
              />

              <header className="flex items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.35em] text-chrome-light">
                <span className="whitespace-nowrap">Chapter {chapter.chapter}</span>
                <span className="text-right text-white/60">{MEDIA_CAPTION}</span>
              </header>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-chrome-light">
                  {event.presenter}
                </p>
                <h3 className="mt-3 font-display text-[clamp(3.5rem,26cqw,11rem)] leading-[0.82] text-white">
                  {entry.city}
                </h3>
                <p className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-white">
                  {chapter.fullDate}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.18em] text-chrome">
                  {chapter.statement}
                </p>

                <a
                  href={entry.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Get tickets for ${entry.city}, ${chapter.fullDate} (opens in a new tab)`}
                  className="mt-8 inline-flex min-h-12 items-center gap-4 bg-white px-7 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ink transition-colors duration-300 hover:bg-ember hover:text-white"
                >
                  Get Tickets — {entry.city}
                  <span aria-hidden="true">&#8599;</span>
                </a>

                {entry.directionsUrl && (
                  <a
                    href={entry.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to the ${entry.city} venue (opens in a new tab)`}
                    className="mt-3 flex w-fit min-h-12 items-center gap-4 border border-white/40 px-7 py-4 font-mono text-xs uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:border-ember hover:text-ember"
                  >
                    Get Directions
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
