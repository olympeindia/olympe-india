"use client";

import { useEffect, useState } from "react";

function getInitialPreference() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Tracks the user's `prefers-reduced-motion` preference live, so the
 * cinematic hero can drop straight into its resolved state instead of
 * running the full intro/rotation/parallax sequence.
 */
export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(getInitialPreference);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReduced(event.matches);
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
