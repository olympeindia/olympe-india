import Image from "next/image";
import { WING_ASPECT } from "./wingLayout";

/**
 * One wing of the emblem, positioned entirely in percentages of its
 * parent — the Emblem box (see Emblem.jsx) — not the viewport. Both
 * sides render the same supplied high-resolution asset, mirrored for
 * the right side, which guarantees identical geometry and lighting on
 * both halves rather than relying on two independently-tuned images.
 * The asset's own alpha is a tight crop with no internal padding
 * (verified directly against the source pixels), so these percentages
 * describe the visible wing shape itself, not a loose bounding box.
 */
export default function Wing({ side }) {
  const isLeft = side === "left";

  return (
    <div
      className={`pointer-events-none absolute top-[8%] w-[44%] ${
        isLeft ? "left-[2%]" : "right-[2%]"
      }`}
      style={{ aspectRatio: WING_ASPECT }}
    >
      <div
        className="relative h-full w-full"
        style={{ transform: isLeft ? undefined : "scaleX(-1)" }}
      >
        <Image
          src="/assets/olympe/hero/wing.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 46vw, 26vw"
          className="select-none object-contain"
        />
      </div>
    </div>
  );
}
