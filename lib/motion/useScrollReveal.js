"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/**
 * The one reveal pattern used across every section below the hero: a
 * restrained fade-up as content enters view, staggered across the
 * selector's matches. Kept as a single shared implementation so every
 * section moves the same way instead of each inventing its own timing —
 * that consistency is what makes the page read as one experience rather
 * than a set of independently animated sections.
 *
 * `containerRef` is the section root; `selector` picks the direct
 * elements to stagger (e.g. "[data-reveal]"). Respects reduced motion by
 * setting the final state immediately with no animation.
 */
export default function useScrollReveal(containerRef, selector = "[data-reveal]", options = {}) {
  const reducedMotion = usePrefersReducedMotion();
  const { stagger = 0.08, y = 28, start = "top 82%" } = options;

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return undefined;

    const targets = root.querySelectorAll(selector);
    if (!targets.length) return undefined;

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: root,
          start,
          toggleActions: "play none none reverse",
        },
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);
}
