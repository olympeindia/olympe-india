import { Bebas_Neue, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { EVENT } from "@/data/event";

// Condensed editorial display face — large artist/wordmark-scale type.
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

// Body/UI grotesque — deliberately not Inter.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Mono for index numbers, dates, and small editorial labels.
const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: `${EVENT.title} — ${EVENT.presenter}`,
  description:
    "OLYMPE INDIA × Sidejou Invites — 27 Nov Delhi, 28 Nov Bengaluru.",
};

export const viewport = {
  themeColor: "#050505",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the intro gate script in EventSite sets
    // data-intro on <html> before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${archivo.variable} ${plexMono.variable} h-full bg-ink antialiased`}
    >
      <body className="min-h-full bg-ink font-body text-chrome-light">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
