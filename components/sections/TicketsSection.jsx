"use client";

import { useRef } from "react";
import Image from "next/image";
import useScrollReveal from "@/lib/motion/useScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";
import { EVENT } from "@/data/event";
import { delhiEventImage, bengaluruEventImage } from "@/data/media";

const FULL_DATES = {
  DELHI: "27 NOVEMBER 2026",
  BENGALURU: "28 NOVEMBER 2026",
};

const IMAGES = {
  DELHI: delhiEventImage,
  BENGALURU: bengaluruEventImage,
};

/**
 * The closing conversion block. Each city is one large, fully clickable
 * panel linking to its exact supplied booking destination (from
 * data/event.js), opened in a new tab. No prices or availability claims.
 */
export default function TicketsSection() {
  const rootRef = useRef(null);
  useScrollReveal(rootRef, "[data-reveal]", { stagger: 0.1 });

  return (
    <section
      ref={rootRef}
      id="tickets"
      aria-labelledby="tickets-heading"
      className="relative bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-10 lg:px-16">
        <SectionLabel index="06" label="TICKETS" />
        <h2
          id="tickets-heading"
          data-reveal
          className="mt-6 font-display text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.85] text-white"
        >
          YOUR NIGHT.
          <span className="block text-ember">YOUR FREQUENCY.</span>
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {EVENT.dates.map((entry) => (
            <li key={entry.city} data-reveal>
              {/* The ticket link is stretched over the whole panel; the
                  directions link sits above it (links can't be nested). */}
              <div
                className="@container group relative isolate flex min-h-[340px] flex-col justify-between overflow-hidden border border-white/10 p-6 transition-colors duration-500 hover:border-ember sm:min-h-[420px] sm:p-10"
              >
                <div className="absolute inset-0 -z-20 overflow-hidden">
                  <Image
                    src={IMAGES[entry.city].src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="photo-zoom object-cover opacity-35 grayscale transition-[opacity,filter] duration-700 group-hover:opacity-55 group-hover:grayscale-0"
                    style={{ objectPosition: IMAGES[entry.city].position }}
                  />
                </div>
                <div
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/40"
                  aria-hidden="true"
                />

                <p className="font-mono text-xs uppercase tracking-[0.35em] text-chrome-light">
                  {FULL_DATES[entry.city]}
                </p>

                <div>
                  <p className="font-display text-[clamp(3rem,26cqw,8rem)] leading-[0.85] text-white">
                    {entry.city}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={entry.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Get tickets for ${entry.city}, ${FULL_DATES[entry.city]} (opens in a new tab)`}
                      className="inline-flex min-h-12 items-center gap-4 bg-ember px-7 py-4 font-mono text-xs uppercase tracking-[0.3em] text-white transition-colors duration-300 after:absolute after:inset-0 after:content-[''] group-hover:bg-white group-hover:text-ink"
                    >
                      Get Tickets
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &#8599;
                      </span>
                    </a>

                    {entry.directionsUrl && (
                      <a
                        href={entry.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Get directions to the ${entry.city} venue (opens in a new tab)`}
                        className="relative z-10 inline-flex min-h-12 items-center gap-4 border border-white/40 bg-ink/40 px-7 py-4 font-mono text-xs uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:border-ember hover:text-ember"
                      >
                        Get Directions
                        <span aria-hidden="true">&#8599;</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p
          data-reveal
          className="mt-12 font-mono text-[11px] uppercase tracking-[0.4em] text-chrome-dark"
        >
          {EVENT.title} × {EVENT.presenter}
        </p>
      </div>
    </section>
  );
}
