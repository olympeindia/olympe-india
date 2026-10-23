import Hero from "@/components/hero/Hero";
import EventSection from "@/components/sections/EventSection";
import LineupSection from "@/components/sections/LineupSection";
import GallerySection from "@/components/sections/GallerySection";
import BrandSection from "@/components/sections/BrandSection";
import TicketsSection from "@/components/sections/TicketsSection";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import StickyTickets from "@/components/common/StickyTickets";
import IntroOverlay, { INTRO_GATE_SCRIPT } from "@/components/intro/IntroOverlay";

export default function Home() {
  return (
    <>
      {/* Flags the intro as playing before first paint, so the hero
          waits for it instead of animating unseen underneath. */}
      <script dangerouslySetInnerHTML={{ __html: INTRO_GATE_SCRIPT }} />
      <noscript>
        <style>{`#olympe-intro{display:none}`}</style>
      </noscript>
      <IntroOverlay />

      <a
        href="#event"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.3em] focus:text-white"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main className="relative z-0 overflow-x-clip bg-ink">
        <Hero />
        <EventSection />
        <LineupSection />
        <GallerySection />
        <BrandSection />
        <TicketsSection />
      </main>

      <SiteFooter />
      <StickyTickets />
    </>
  );
}
