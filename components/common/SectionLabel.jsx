/**
 * The small "N°02 — LINEUP" marker at the top of each section below the
 * hero. Reused everywhere on purpose: it's what makes the sections read
 * as chapters of one campaign instead of independently designed blocks.
 */
export default function SectionLabel({ index, label, className = "" }) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.4em] text-chrome-dark sm:text-xs ${className}`}
      data-reveal
    >
      N&deg;{index} — {label}
    </p>
  );
}
