"use client";

import Image from "next/image";

const INSTAGRAM_LINKS = {
  olympe: "https://www.instagram.com/olympeindia/",
  sidejou: "https://www.instagram.com/sid_ejou/",
};

const LINKTREE = "https://linktr.ee/olympeindia";

export default function SiteFooter({ event }) {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      {/* Top divider */}
      <div className="h-px w-full bg-white/[0.08]" />

      {/* Background emblem — the chrome wing lockup (same artwork as the
          intro), large and faint behind the footer content. */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-[1.75/1] w-[min(140vw,1300px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] sm:w-[min(110vw,1300px)]"
        aria-hidden="true"
      >
        <div className="absolute inset-y-0 left-0 w-[49%]">
          <Image
            src="/assets/olympe/hero/wing.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 70vw, 640px"
            className="object-contain"
          />
        </div>
        <div className="absolute inset-y-0 right-0 w-[49%] -scale-x-100">
          <Image
            src="/assets/olympe/hero/wing.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 70vw, 640px"
            className="object-contain"
          />
        </div>
        <div className="absolute left-1/2 top-[34%] w-[50%] -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/assets/olympe/hero/olympe-india.png"
            alt=""
            width={2105}
            height={747}
            sizes="(max-width: 640px) 70vw, 650px"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        {/* Main footer */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          {/* Brand */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] text-[#a85b35]">
              {event.title} × {event.presenter}
            </p>

            <h2 className="mt-7 font-sans text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.78] tracking-[-0.07em] text-white/90">
              OLYMPE
              <span className="block">INDIA</span>
            </h2>

            <p className="mt-8 max-w-md text-xs uppercase leading-6 tracking-[0.18em] text-white/35">
              MUSIC / ART / CULTURE / BEYOND
            </p>
          </div>

          {/* Events */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/30">
              THE NIGHTS
            </p>

            <div className="mt-7 space-y-6">
              {event.dates.map((entry) => (
                <div key={entry.city}>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-white/70">
                    {entry.date} — {entry.city}
                  </p>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
                    {event.title} × {event.presenter}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Follow */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-white/30">
              FOLLOW
            </p>

            <div className="mt-7 flex flex-col items-start gap-4">
              <a
                href={INSTAGRAM_LINKS.olympe}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow OLYMPE INDIA on Instagram"
                className="group inline-flex items-center gap-4 border-b border-white/[0.12] pb-3 transition-colors duration-300 hover:border-[#a85b35]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-[#a85b35]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 transition-colors duration-300 group-hover:text-white">
                  OLYMPE INDIA
                </span>

                <span className="text-xs text-[#a85b35] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href={INSTAGRAM_LINKS.sidejou}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SIDEJOU on Instagram"
                className="group inline-flex items-center gap-4 border-b border-white/[0.12] pb-3 transition-colors duration-300 hover:border-[#a85b35]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-[#a85b35]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  </svg>
                </span>

                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/60 transition-colors duration-300 group-hover:text-white">
                  SIDEJOU
                </span>

                <span className="text-xs text-[#a85b35] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href={LINKTREE}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="All OLYMPE INDIA links on Linktree"
                className="group inline-flex items-center gap-4 border-b border-white/[0.12] pb-3 transition-colors duration-300 hover:border-[#a85b35]"
              >
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 text-xs text-white/70 transition-colors duration-300 group-hover:border-[#a85b35]"
                  aria-hidden="true"
                >
                  ✳
                </span>

                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/70 transition-colors duration-300 group-hover:text-white">
                  ALL LINKS
                </span>

                <span className="text-xs text-[#a85b35] transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom metadata */}
        <div className="mt-20 border-t border-white/[0.08] pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
              {event.dates
                .map((entry) => `${entry.date} 2026 — ${entry.city}`)
                .join(" / ")}
            </p>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new Event("olympe:intro-replay"))
                }
                className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.35em] text-white/40 transition-colors duration-300 hover:text-white"
              >
                Replay intro
              </button>

              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                2026 — OLYMPE INDIA
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}