"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { EVENT } from "@/data/event";

const LINKS = [
  { href: "#event", label: "Events" },
  { href: "#lineup", label: "Lineup" },
  { href: "#gallery", label: "Gallery" },
  { href: "#tickets", label: "Tickets" },
];

/**
 * Slim fixed navigation. Transparent over the hero, gaining a solid ink
 * backdrop once the page has scrolled. Section links are hidden on small
 * screens, where the hero CTA and the floating tickets control already
 * cover the main journeys.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled ? "bg-ink/90 backdrop-blur-sm" : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-4 py-3 sm:px-10 lg:px-16"
      >
        <a href="#top" className="flex min-h-12 items-center gap-3" aria-label={`${EVENT.title} — back to top`}>
          <Image
            src="/assets/olympe/logo/blood2.PNG"
            alt=""
            width={240}
            height={240}
            className="h-10 w-10 object-contain mix-blend-screen"
          />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.35em] text-chrome-light sm:inline">
            {EVENT.title}
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.3em] text-chrome transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#tickets"
          className="inline-flex min-h-11 items-center border border-ember px-5 font-mono text-[11px] uppercase tracking-[0.3em] text-white transition-colors hover:bg-ember"
        >
          Get Tickets
        </a>
      </nav>
    </header>
  );
}
