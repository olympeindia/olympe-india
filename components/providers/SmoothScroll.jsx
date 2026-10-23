"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Wires Lenis into GSAP's ticker so ScrollTrigger and Lenis share a single
 * animation frame clock (the documented integration pattern). Disabled
 * entirely under prefers-reduced-motion — the browser's native scroll
 * takes over and ScrollTrigger still works fine against it.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    const handleScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleScroll);

    function raf(time) {
      // gsap.ticker reports time in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
