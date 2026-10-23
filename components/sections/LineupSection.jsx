"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useScrollReveal from "@/lib/motion/useScrollReveal";
import usePrefersReducedMotion from "@/lib/motion/usePrefersReducedMotion";
import SectionLabel from "@/components/common/SectionLabel";
import { LINEUP, ARTIST_ASPECT_RATIO } from "@/data/lineup";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Editorial artist rail built on native horizontal scroll + scroll-snap,
 * so touch swipe, trackpad and keyboard all work without a carousel
 * engine. Prev/next buttons, arrow keys and mouse drag simply move the
 * native scroll position. Lineup order and the official artist posters
 * come straight from data/lineup.js.
 */
export default function LineupSection() {
  const rootRef = useRef(null);
  const railRef = useRef(null);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useScrollReveal(rootRef, "[data-reveal]", { stagger: 0.06 });

  const getStep = useCallback(() => {
    const rail = railRef.current;
    const first = rail?.querySelector("[data-artist]");
    if (!first) return 1;
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0;
    return first.getBoundingClientRect().width + gap;
  }, []);

  // Track the current card from the scroll position (rAF-throttled).
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    let frame = 0;

    const update = () => {
      frame = 0;
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
      // Near the end the last cards can't snap to the start edge, so the
      // final position counts as the last artist.
      const index = atEnd
        ? LINEUP.length - 1
        : Math.round(rail.scrollLeft / getStep());
      setActive(Math.min(LINEUP.length - 1, Math.max(0, index)));
      setEdges({ start: rail.scrollLeft <= 4, end: atEnd });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [getStep]);

  const scrollToIndex = useCallback(
    (index) => {
      const rail = railRef.current;
      if (!rail) return;
      const clamped = Math.min(LINEUP.length - 1, Math.max(0, index));
      rail.scrollTo({
        left: clamped * getStep(),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    },
    [getStep, reducedMotion],
  );

  // Steps from the real scroll position (not the displayed index, which
  // is pinned to the last artist once the rail reaches its end).
  const step = useCallback(
    (direction) => {
      const rail = railRef.current;
      if (!rail) return;
      scrollToIndex(Math.round(rail.scrollLeft / getStep()) + direction);
    },
    [getStep, scrollToIndex],
  );

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(LINEUP.length - 1);
    }
  };

  // Mouse drag-to-scroll for desktop. Touch and pen keep native scrolling.
  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const rail = railRef.current;
    dragRef.current = {
      active: true,
      moved: false,
      startX: event.clientX,
      startLeft: rail.scrollLeft,
    };
    rail.style.scrollSnapType = "none";
  };
  const onPointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    railRef.current.scrollLeft = drag.startLeft - delta;
  };
  const endDrag = () => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    const rail = railRef.current;
    rail.style.scrollSnapType = "";
    scrollToIndex(Math.round(rail.scrollLeft / getStep()));
  };
  // Swallow the click that ends a drag so it isn't read as a selection.
  const onClickCapture = (event) => {
    if (dragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  return (
    <section
      ref={rootRef}
      id="lineup"
      aria-labelledby="lineup-heading"
      className="relative overflow-hidden bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionLabel index="03" label="THE LINEUP" />
            <h2
              id="lineup-heading"
              data-reveal
              className="mt-6 font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.85] text-white"
            >
              THE ARTISTS
            </h2>
          </div>

          <div data-reveal className="flex items-center gap-6">
            <p
              className="font-mono text-sm tracking-[0.3em] text-chrome-light"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="text-white">{pad(active + 1)}</span>
              <span className="text-chrome-dark"> / {pad(LINEUP.length)}</span>
              <span className="sr-only">: {LINEUP[active].name}</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                disabled={edges.start}
                aria-label="Previous artist"
                className="flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span aria-hidden="true">&larr;</span>
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                disabled={edges.end}
                aria-label="Next artist"
                className="flex h-12 w-12 items-center justify-center border border-white/25 text-white transition-colors hover:border-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-8 h-px w-full bg-white/10" aria-hidden="true">
          <div
            className="h-px bg-ember transition-[width] duration-500"
            style={{ width: `${((active + 1) / LINEUP.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Rail — aligned to the content column, bleeding off the right edge. */}
      <ol
        ref={railRef}
        data-reveal
        data-lenis-prevent-horizontal
        tabIndex={0}
        aria-label="Lineup — use left and right arrow keys to browse"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 sm:gap-6 sm:scroll-px-10 sm:px-10 lg:scroll-px-[max(4rem,calc((100vw-1500px)/2+4rem))] lg:px-[max(4rem,calc((100vw-1500px)/2+4rem))] lg:cursor-grab lg:active:cursor-grabbing"
      >
        {LINEUP.map((artist, index) => (
          <li
            key={artist.name}
            data-artist
            aria-current={index === active ? "true" : undefined}
            className="group w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[min(22vw,300px)]"
          >
            <div
              className="relative w-full overflow-hidden bg-graphite"
              style={{ aspectRatio: ARTIST_ASPECT_RATIO }}
            >
              <Image
                src={artist.image}
                alt={`${artist.name} — official lineup portrait`}
                fill
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 44vw, 300px"
                className={`photo-zoom pointer-events-none select-none object-cover transition-[filter] duration-700 ${
                  index === active ? "" : "lg:brightness-75"
                }`}
                draggable={false}
              />
            </div>
            {/* The posters carry the artist name, so the label is screen-reader only. */}
            <div className="sr-only">
              <span className="font-mono text-xs tracking-[0.2em] text-ember">
                {pad(artist.index)}
              </span>
              <h3 className="font-display text-3xl leading-none tracking-wide text-white sm:text-4xl">
                {artist.name}
              </h3>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-6 max-w-[1500px] px-4 font-mono text-[11px] uppercase tracking-[0.3em] text-chrome-dark sm:px-10 lg:px-16">
        Swipe · Drag · Arrow keys
      </p>
    </section>
  );
}
