"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/**
 * Full-screen image viewer for the gallery. Controlled by the parent via
 * `index` (null = closed). Handles Escape / arrow keys, touch swipe, a
 * focus trap across its own controls, page-scroll lock, and returning
 * focus to whatever opened it. Portalled to <body> so it sits above the
 * fixed header and tickets control rather than inside <main>'s stacking
 * context.
 */
export default function Lightbox({ images, index, onClose, onNavigate, caption }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchRef = useRef(null);
  const open = index !== null && index !== undefined;
  const total = images.length;

  const go = useCallback(
    (direction) => onNavigate((index + direction + total) % total),
    [index, onNavigate, total],
  );

  // Scroll lock + focus management for the lifetime of an open dialog.
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      root.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Tab") {
        // Only buttons actually rendered at this breakpoint.
        const focusable = [
          ...(dialogRef.current?.querySelectorAll("button") ?? []),
        ].filter((el) => el.offsetParent !== null);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, go, onClose]);

  if (!open) return null;
  const image = images[index];

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}`}
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex flex-col bg-ink animate-[lightbox-in_300ms_ease-out]"
      onTouchStart={(event) => {
        touchRef.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchRef.current === null) return;
        const delta = event.changedTouches[0].clientX - touchRef.current;
        touchRef.current = null;
        if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <p className="font-mono text-xs tracking-[0.3em] text-chrome-light">
          {String(index + 1).padStart(2, "0")}
          <span className="text-chrome-dark"> / {String(total).padStart(2, "0")}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-12 items-center gap-3 px-2 font-mono text-xs uppercase tracking-[0.3em] text-chrome-light transition-colors hover:text-white"
        >
          Close
          <span aria-hidden="true" className="text-xl leading-none">&times;</span>
        </button>
      </div>

      <div
        className="relative flex-1"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <figure className="pointer-events-none absolute inset-x-4 inset-y-0 sm:inset-x-24">
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-contain animate-[lightbox-in_400ms_ease-out]"
          />
        </figure>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:border-white sm:flex"
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/20 text-white transition-colors hover:border-white sm:flex"
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <p className="max-w-xl text-sm text-chrome">{image.alt}</p>
        <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.3em] text-chrome-dark sm:block">
          {caption}
        </p>
        {/* Mobile prev/next — swipe also works. */}
        <div className="flex shrink-0 gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="flex h-12 w-12 items-center justify-center border border-white/20 text-white"
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="flex h-12 w-12 items-center justify-center border border-white/20 text-white"
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
