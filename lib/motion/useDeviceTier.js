"use client";

import { useEffect, useState } from "react";

function computeTier() {
  if (typeof window === "undefined") return "high";

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const smallViewport = window.innerWidth < 768;
  const fewCores =
    typeof navigator !== "undefined" &&
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  const isLow = coarsePointer && (smallViewport || fewCores);
  return isLow ? "low" : "high";
}

/**
 * Coarse device-capability heuristic used to scale the hero scene down
 * gracefully on phones/low-power hardware: fewer sculpture segments, no
 * reflective floor, no postprocessing — while keeping the object itself
 * always visible, so the identity never disappears, only simplifies.
 * Re-evaluated on resize/orientation-change.
 */
export default function useDeviceTier() {
  const [tier, setTier] = useState(computeTier);

  useEffect(() => {
    const handleResize = () => setTier(computeTier());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return tier;
}
