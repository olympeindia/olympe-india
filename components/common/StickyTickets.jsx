"use client";

import { useEffect, useRef, useState } from "react";
import { EVENT } from "@/data/event";

/**
 * The persistent booking control — collapsed to a small copper-lined
 * pill by default, expanding into the two city links on click (and on
 * hover for pointer devices, so desktop doesn't need the extra tap).
 * Closes on an outside click or after a link is chosen. Kept as inert
 * plain markup, not a modal/portal — there is nothing here that needs
 * to trap focus or block the page.
 */
export default function StickyTickets() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function onPointerDown(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed right-4 z-50 flex flex-col items-end gap-2 sm:right-6"
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && (
        <div className="flex w-56 flex-col gap-1 border border-copper/40 bg-ink/95 p-3 shadow-[0_0_30px_-8px_rgba(166,91,60,0.35)] backdrop-blur-sm">
          <p className="mb-1 px-1 font-mono text-[9px] uppercase tracking-[0.35em] text-chrome-dark">
            Get Tickets
          </p>
          {EVENT.dates.map((entry) => (
            <a
              key={entry.city}
              href={entry.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between gap-3 px-1 py-2 font-mono text-xs uppercase tracking-[0.2em] text-chrome-light transition-colors hover:text-copper"
            >
              <span>
                {entry.date} &middot; {entry.city}
              </span>
              <span
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 border border-copper/50 bg-ink/90 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-light shadow-[0_0_24px_-10px_rgba(166,91,60,0.5)] transition-colors hover:border-copper hover:text-copper"
      >
        Get Tickets
        <span aria-hidden="true">&#8599;</span>
      </button>
    </div>
  );
}
