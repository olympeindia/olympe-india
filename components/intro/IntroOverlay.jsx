"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

// The layered chrome lockup used by the original hero: one wing artwork,
// mirrored for the right side, plus the two-line OLYMPE INDIA wordmark
// placed between the wing tips exactly as that hero did. Both files have
// real transparency, so the light sweep follows their silhouettes.
const WING = "/assets/olympe/hero/wing.webp";
const WORDMARK = "/assets/olympe/hero/olympe-india.png";

// Runs before first paint (inlined by app/page.js): marks the page as
// playing the intro so the hero holds its own entrance until the overlay
// lifts. The intro plays on every page load.
export const INTRO_GATE_SCRIPT = `document.documentElement.setAttribute("data-intro","play")`;

// Hand-placed (not random) so server and client render identically.
const PARTICLES = [
  { x: 12, y: 22, s: 2, d: 0, m: false },
  { x: 24, y: 70, s: 1.5, d: 1.2, m: true },
  { x: 33, y: 14, s: 1, d: 0.6, m: false },
  { x: 41, y: 82, s: 1.5, d: 2.1, m: false },
  { x: 58, y: 18, s: 1, d: 1.6, m: true },
  { x: 66, y: 76, s: 2, d: 0.3, m: false },
  { x: 74, y: 30, s: 1, d: 2.4, m: false },
  { x: 86, y: 64, s: 1.5, d: 0.9, m: true },
  { x: 91, y: 16, s: 1, d: 1.9, m: false },
  { x: 8, y: 54, s: 1, d: 2.8, m: false },
  { x: 50, y: 90, s: 1, d: 1.1, m: false },
  { x: 18, y: 40, s: 1, d: 3.2, m: false },
];

// Specular sweep: a brightened copy of the *same* artwork, visible only
// through a narrow moving gradient mask. The highlight therefore follows
// the exact chrome silhouette (no rectangles) and is the metal itself
// catching light — cool silver from the artwork's own blue-whites, warm
// champagne from its own copper tones. The filter is static (rasterised
// once); only the mask position, via --sweep, and opacity animate.
//
// --sweep maps to mask-position-x with a 300%-wide mask whose bright
// stripe sits at its middle: 80% puts the stripe at the element's left
// edge, 20% at its right edge.
const SWEEP_MASK =
  "linear-gradient(100deg, transparent 42%, rgba(0,0,0,0.55) 47%, #000 50%, rgba(0,0,0,0.55) 53%, transparent 58%)";

function Sweep({ src, bandRef }) {
  const sweep = (
    // Plain <img>: identical pixels to the base artwork underneath.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={bandRef}
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain opacity-0"
      style={{
        filter: "brightness(2.1) contrast(1.15)",
        WebkitMaskImage: SWEEP_MASK,
        maskImage: SWEEP_MASK,
        WebkitMaskSize: "300% 100%",
        maskSize: "300% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "var(--sweep, 100%) 0",
        maskPosition: "var(--sweep, 100%) 0",
      }}
    />
  );
  return sweep;
}

function Wing({ side, wingRef, bandRef }) {
  return (
    <div
      className={`absolute inset-y-0 w-[49%] ${side === "left" ? "left-0" : "right-0 -scale-x-100"}`}
    >
      <div
        ref={wingRef}
        className="relative h-full w-full opacity-0"
        style={{ transformOrigin: "100% 85%" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- exact
            original pixels, same file is reused for the sweep */}
        <img
          src={WING}
          alt=""
          draggable={false}
          decoding="async"
          className="h-full w-full select-none object-contain"
        />
        <Sweep src={WING} bandRef={bandRef} />
      </div>
    </div>
  );
}

/**
 * Cinematic logo intro shown over the homepage on every page load.
 *
 *   0.0–0.6  void: faint centre glow, a few particles
 *   0.6–1.6  wings emerge symmetrically from the centre outward
 *   1.4–2.3  narrow silver sweep across the chrome
 *   2.0–2.8  wordmark rises into focus
 *   2.8–3.8  hold, slow push-in, second sweep
 *   3.8–4.6  overlay lifts, revealing the hero (which starts its own
 *            entrance on "olympe:intro-reveal")
 *
 * Phones run the same sequence ~25% faster. Reduced motion gets a short
 * fade of the finished logo. Skip button / Escape end it at any time; the
 * page behind is inert and unscrollable only while it is showing.
 */
export default function IntroOverlay() {
  // "active" = rendered (server render, playing or replaying);
  // "done" = unmounted.
  const [phase, setPhase] = useState("active");
  const [runId, setRunId] = useState(0);
  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const particlesRef = useRef(null);
  const stageRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftBandRef = useRef(null);
  const rightBandRef = useRef(null);
  const wordmarkRef = useRef(null);
  const wordBandRef = useRef(null);
  const skipRef = useRef(null);
  const tlRef = useRef(null);
  const finishingRef = useRef(false);
  // Restores the page behind (inert, scroll, key listener). Called when
  // the intro finishes — the component stays mounted rendering null, so
  // effect cleanup alone would not run — and again (no-op) on cleanup.
  const releaseRef = useRef(null);

  // Footer "Replay intro" link.
  useEffect(() => {
    const replay = () => {
      document.documentElement.dataset.intro = "replay";
      window.scrollTo(0, 0);
      finishingRef.current = false;
      setPhase("active");
      setRunId((n) => n + 1);
    };
    window.addEventListener("olympe:intro-replay", replay);
    return () => window.removeEventListener("olympe:intro-replay", replay);
  }, []);

  const finish = useCallback(() => {
    const html = document.documentElement;
    releaseRef.current?.();
    html.dataset.intro = "done";
    window.dispatchEvent(new Event("olympe:intro-done"));
    setPhase("done");
  }, []);

  // Lift the overlay: tells the hero to begin, fades out, then unmounts.
  const reveal = useCallback(
    (duration) => {
      if (finishingRef.current) return;
      finishingRef.current = true;
      window.dispatchEvent(new Event("olympe:intro-reveal"));
      gsap.to(rootRef.current, {
        opacity: 0,
        duration,
        ease: "power2.inOut",
        onComplete: finish,
      });
    },
    [finish],
  );

  const skip = useCallback(() => {
    tlRef.current?.kill();
    reveal(0.35);
  }, [reveal]);

  useEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;

    // First mount: the gate script has already decided. When the intro
    // should not play the overlay is already display:none via CSS; just
    // unmount it on the next frame.
    if (runId === 0 && html.dataset.intro !== "play") {
      html.dataset.intro = "done";
      const frame = requestAnimationFrame(() => setPhase("done"));
      return () => cancelAnimationFrame(frame);
    }
    if (!root) return undefined;

    // Block the page behind while the intro covers it.
    const siblings = [...root.parentElement.children].filter(
      (el) => el !== root && el.tagName !== "SCRIPT",
    );
    siblings.forEach((el) => el.setAttribute("inert", ""));
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    skipRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") skip();
    };
    window.addEventListener("keydown", onKeyDown);

    releaseRef.current = () => {
      releaseRef.current = null;
      window.removeEventListener("keydown", onKeyDown);
      siblings.forEach((el) => el.removeAttribute("inert"));
      html.style.overflow = previousOverflow;
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const wings = [leftRef.current, rightRef.current];
    const wingBands = [leftBandRef.current, rightBandRef.current];

    const ctx = gsap.context(() => {
      gsap.set(root, { opacity: 1 });

      if (reduced) {
        gsap.set([glowRef.current, ...wings, wordmarkRef.current], { opacity: 0 });
        tlRef.current = gsap
          .timeline()
          .to([glowRef.current, ...wings, wordmarkRef.current], {
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          })
          .add(() => reveal(0.4), "+=0.45");
        return;
      }

      const k = small ? 0.75 : 1; // phones: same story, shorter
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current = tl;

      // Initial states.
      gsap.set(stageRef.current, { scale: 1 });
      gsap.set(wings, { opacity: 0, scale: 0.94, clipPath: "inset(0% 0% 0% 100%)" });
      gsap.set(wordmarkRef.current, { opacity: 0, y: 14, filter: "blur(6px)" });
      gsap.set([...wingBands, wordBandRef.current], { opacity: 0 });

      // Scene 1 — the void.
      tl.fromTo(glowRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 * k, ease: "sine.out" }, 0);
      tl.fromTo(particlesRef.current, { opacity: 0 }, { opacity: 1, duration: 1 * k, ease: "sine.out" }, 0.15 * k);

      // Scene 2 — wings emerge from the centre outward, symmetric
      // (the right wing is the mirrored element, so one tween serves both).
      tl.to(
        wings,
        { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.0 * k, ease: "power2.out" },
        0.6 * k,
      );

      // Scene 3 — narrow light sweep, centre → wing tips.
      // (The right wing is mirrored, so 20%→80% runs centre → tips on both.)
      tl.fromTo(
        wingBands,
        { "--sweep": "18%", opacity: 1 },
        { "--sweep": "82%", duration: 0.9 * k, ease: "power2.inOut" },
        1.4 * k,
      ).set(wingBands, { opacity: 0 });

      // Scene 4 — wordmark into focus.
      tl.to(
        wordmarkRef.current,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 * k },
        2.0 * k,
      );

      // Scene 5 — hold: slow push-in plus a final sweep over everything.
      tl.to(stageRef.current, { scale: 1.025, duration: 1.8 * k, ease: "none" }, 2.8 * k);
      tl.fromTo(
        wingBands,
        { "--sweep": "82%", opacity: 0.7 },
        { "--sweep": "18%", duration: 0.85 * k, ease: "power1.inOut" },
        2.9 * k,
      ).set(wingBands, { opacity: 0 });
      tl.fromTo(
        wordBandRef.current,
        { "--sweep": "82%", opacity: 0.9 },
        { "--sweep": "18%", duration: 0.8 * k, ease: "power1.inOut" },
        3.0 * k,
      ).set(wordBandRef.current, { opacity: 0 });

      // Scene 6 — lift into the homepage.
      tl.add(() => reveal(0.8 * k), 3.8 * k);
    }, root);

    return () => {
      tlRef.current?.kill();
      ctx.revert();
      releaseRef.current?.();
    };
  }, [runId, reveal, skip]);

  if (phase === "done") return null;

  return (
    <div
      ref={rootRef}
      id="olympe-intro"
      data-lenis-prevent
      aria-label="OLYMPE INDIA"
      role="region"
      className="fixed inset-0 z-[200] overflow-hidden bg-black"
    >
      {/* Ambient centre glow — a static radial gradient, only its opacity animates. */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{
          background:
            "radial-gradient(circle, rgba(200,205,215,0.10) 0%, rgba(160,150,140,0.04) 35%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div ref={particlesRef} className="pointer-events-none absolute inset-0 opacity-0" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full bg-[#e8e9ec] ${p.m ? "" : "hidden sm:block"}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.s,
              height: p.s,
              animation: `intro-particle 6s ease-in-out ${p.d}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Logo stage — the same proportions as the original hero lockup,
          sized so both wing tips always keep a margin. */}
      <div className="absolute inset-0 flex items-center justify-center px-[4vw]">
        <div
          ref={stageRef}
          className="relative aspect-[1.75/1] w-[min(92vw,1000px,calc(80svh*1.75))]"
        >
          <Wing side="left" wingRef={leftRef} bandRef={leftBandRef} />
          <Wing side="right" wingRef={rightRef} bandRef={rightBandRef} />

          <div
            ref={wordmarkRef}
            className="absolute left-1/2 top-[34%] w-[50%] -translate-x-1/2 -translate-y-1/2 opacity-0"
          >
            <div className="relative aspect-[2105/747]">
              {/* eslint-disable-next-line @next/next/no-img-element -- exact
                  original pixels, same file is reused for the sweep */}
              <img
                src={WORDMARK}
                alt="OLYMPE INDIA"
                draggable={false}
                decoding="async"
                className="h-full w-full select-none object-contain"
              />
              <Sweep src={WORDMARK} bandRef={wordBandRef} />
            </div>
          </div>
        </div>
      </div>

      <button
        ref={skipRef}
        type="button"
        onClick={skip}
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 inline-flex min-h-11 items-center gap-3 px-3 font-mono text-[11px] uppercase tracking-[0.35em] text-white/50 transition-colors hover:text-white sm:right-8"
      >
        Skip intro
        <span aria-hidden="true">&rarr;</span>
      </button>
    </div>
  );
}
