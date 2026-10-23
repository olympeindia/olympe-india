"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import useScrollReveal from "@/lib/motion/useScrollReveal";
import SectionLabel from "@/components/common/SectionLabel";
import Lightbox from "@/components/common/Lightbox";
import { MEDIA_CAPTION, galleryImages, eventVideos } from "@/data/media";

// Grid spans per tile size. Mobile is a 2-column grid; desktop is 4.
const SPANS = {
  large: "col-span-2 row-span-2",
  tall: "row-span-2",
  wide: "col-span-2",
  base: "",
};

export default function GallerySection() {
  const rootRef = useRef(null);
  const videoRefs = useRef([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [started, setStarted] = useState(() => eventVideos.map(() => false));

  useScrollReveal(rootRef, "[data-reveal]", { stagger: 0.05, y: 20 });

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Click-to-play; only one clip plays at a time.
  const playVideo = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });
    setStarted((prev) => prev.map((value, i) => (i === index ? true : value)));
    videoRefs.current[index]?.play().catch(() => {});
  };
  const onVideoPlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) video.pause();
    });
  };

  return (
    <section
      ref={rootRef}
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel index="04" label="THE NIGHTS" />
            <h2
              id="gallery-heading"
              data-reveal
              className="mt-6 font-display text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.85] text-white"
            >
              NIGHTS THAT
              <span className="block text-chrome">STAY WITH YOU.</span>
            </h2>
          </div>
          <div data-reveal className="lg:col-span-4 lg:text-right">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-ember">
              Music / People / Moments / Movement
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-chrome-dark">
              {MEDIA_CAPTION}
            </p>
          </div>
        </div>

        {/* Photo grid */}
        <ul className="mt-14 grid grid-flow-dense grid-cols-2 auto-rows-[46vw] gap-2 sm:auto-rows-[34vw] sm:gap-3 lg:grid-cols-4 lg:auto-rows-[clamp(220px,19vw,320px)]">
          {galleryImages.map((image, index) => (
            <li key={image.src} data-reveal className={SPANS[image.size]}>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Open photo ${index + 1} of ${galleryImages.length}: ${image.alt}`}
                className="group relative block h-full w-full overflow-hidden bg-graphite"
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes={
                    image.size === "large" || image.size === "wide"
                      ? "(max-width: 1024px) 100vw, 50vw"
                      : "(max-width: 1024px) 50vw, 25vw"
                  }
                  className="photo-zoom object-cover"
                  style={{ objectPosition: image.position }}
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15"
                  aria-hidden="true"
                />
                <span
                  className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.25em] text-white/0 transition-colors duration-500 group-hover:text-white/80 group-focus-visible:text-white/80"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")} &nbsp;VIEW
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Video clips — never autoplay; the visitor starts each one. */}
        <div className="mt-20 sm:mt-28">
          <div data-reveal className="flex items-end justify-between gap-6 border-t border-white/10 pt-6">
            <h3 className="font-display text-4xl leading-none text-white sm:text-5xl">
              IN MOTION
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-chrome-dark">
              Tap to play · Sound on
            </p>
          </div>

          <ul className="no-scrollbar mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
            {eventVideos.map((video, index) => (
              <li
                key={video.src}
                data-reveal
                className="relative aspect-[9/16] w-[64vw] shrink-0 snap-start overflow-hidden bg-graphite sm:w-[38vw] lg:w-auto"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={`${video.src}#t=0.1`}
                  preload="metadata"
                  playsInline
                  controls={started[index]}
                  onPlay={() => onVideoPlay(index)}
                  aria-label={`OLYMPE event video, ${video.label}`}
                  className="h-full w-full object-cover"
                />
                {!started[index] && (
                  <button
                    type="button"
                    onClick={() => playVideo(index)}
                    aria-label={`Play ${video.label}`}
                    className="group absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-ink/80 via-transparent to-ink/30 p-4 text-left"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/80">
                      {video.label}
                    </span>
                    <span className="flex h-14 w-14 items-center justify-center border border-white/40 text-white transition-colors duration-300 group-hover:border-ember group-hover:bg-ember">
                      <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d="M7 4.5v15l13-7.5z" />
                      </svg>
                    </span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        index={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
        caption={MEDIA_CAPTION}
      />
    </section>
  );
}
