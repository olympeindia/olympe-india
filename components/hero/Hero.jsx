"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import usePrefersReducedMotion from "@/lib/motion/usePrefersReducedMotion";
import { EVENT } from "@/data/event";
import { heroImage } from "@/data/media";

const LOGO = "/assets/olympe/hero/olympe-india.png";

/**
 * Image-led opening viewport. The supplied performance photograph fills
 * the frame; a left/bottom gradient carries the type. The intro is one
 * short reveal (image settles from a slight scale while the copy fades
 * up) — nothing blocks the visitor from scrolling straight on, and under
 * reduced motion everything is simply present.
 */
export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let ctx;
    const play = () => {
      ctx = gsap.context(() => {
        if (reducedMotion) {
          gsap.set([imageRef.current, ...copyRef.current.children], {
            clearProps: "all",
          });
          return;
        }

        gsap.fromTo(
          imageRef.current,
          { scale: 1.12, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2.2, ease: "power3.out" },
        );
        gsap.fromTo(
          copyRef.current.children,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.09,
            delay: 0.35,
          },
        );

        // Gentle drift as the hero leaves — a single scrubbed tween on one
        // element, no per-frame scroll listener.
        gsap.to(imageRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, root);
    };

    // While the logo intro is covering the page, hold the entrance until
    // the intro starts lifting (IntroOverlay dispatches the event), so it
    // plays as the hero is revealed rather than unseen underneath.
    if (document.documentElement.dataset.intro === "play") {
      window.addEventListener("olympe:intro-reveal", play, { once: true });
      return () => {
        window.removeEventListener("olympe:intro-reveal", play);
        ctx?.revert();
      };
    }

    play();
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      id="top"
      aria-label="OLYMPE INDIA × SIDEJOU INVITES"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Photograph — the top ~two-thirds on phones (keeps the subject
          clear of the type), full-bleed from lg up. */}
      <div ref={imageRef} className="absolute inset-x-0 top-0 -z-20 h-[68svh] lg:inset-0 lg:h-auto">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: heroImage.position }}
        />
      </div>

      {/* Contrast: bottom fade for mobile, left fade for wide screens. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink from-35% via-ink/50 via-55% to-ink/10 lg:bg-gradient-to-r lg:from-ink/95 lg:from-0% lg:via-ink/55 lg:via-45% lg:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent"
        aria-hidden="true"
      />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay" aria-hidden="true" />

      <div
        ref={copyRef}
        className="relative mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-end px-4 pb-24 pt-28 sm:px-10 sm:pb-28 lg:justify-center lg:px-16 lg:pb-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-chrome-light sm:text-xs">
          {EVENT.presenter}
        </p>

        {/* The logo file carries wide black padding around the wordmark;
            the wrapper crops to the wordmark itself (measured from the
            2105×747 source) so it aligns with the type column. */}
        <h1 className="relative mt-5 aspect-[1.706] w-[min(84vw,600px)] overflow-hidden">
          <span className="sr-only">{EVENT.title}</span>
          <Image
            src={LOGO}
            alt=""
            width={2105}
            height={747}
            preload
            sizes="(max-width: 1024px) 200vw, 1400px"
            className="-ml-[62.8%] -mt-[14%] h-auto w-[232.6%] max-w-none mix-blend-screen"
          />
        </h1>

        <p className="mt-4 max-w-md font-display text-2xl leading-none tracking-wide text-chrome-light sm:text-3xl">
          A HIGHER FREQUENCY
        </p>

        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 sm:mt-10">
          {EVENT.dates.map((entry) => (
            <div key={entry.city} className="flex flex-col">
              <dt className="font-mono text-[11px] uppercase tracking-[0.35em] text-chrome">
                {entry.city}
              </dt>
              <dd className="font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.9] text-white">
                {entry.date}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-9 flex flex-wrap items-center gap-4 sm:mt-11">
          <a
            href="#tickets"
            className="group inline-flex min-h-12 items-center gap-4 bg-ember px-7 py-4 font-mono text-xs uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-ember-dark"
          >
            Get Tickets
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>
          <a
            href="#lineup"
            className="inline-flex min-h-12 items-center border border-white/25 px-6 py-4 font-mono text-xs uppercase tracking-[0.3em] text-chrome-light transition-colors duration-300 hover:border-white hover:text-white"
          >
            Lineup
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#event"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-chrome sm:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-white/15" aria-hidden="true">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-white/70" />
        </span>
      </a>
    </section>
  );
}
