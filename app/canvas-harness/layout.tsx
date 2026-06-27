import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, JetBrains_Mono, Newsreader } from "next/font/google";
import "./canvas-harness.css";

const geist = Geist({
  variable: "--ch-font-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--ch-font-serif",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--ch-font-mono",
  subsets: ["latin"],
});

const CH_TITLE = "canvas-harness: the engine behind Dim0";
const CH_DESCRIPTION =
  "canvas-harness is a canvas-rendered, headless, styleless node-graph library for React, canvas performance (10k nodes at ~80fps) with zero style opinions. It owns camera, hit-testing, history, and spatial queries, and ships no UI. MIT, ts-first. Powers Dim0.";

export const metadata: Metadata = {
  title: CH_TITLE,
  description: CH_DESCRIPTION,
  alternates: { canonical: "/canvas-harness" },
  openGraph: {
    title: CH_TITLE,
    description:
      "Canvas-rendered React node-graph library. 10k nodes at ~80fps. Camera, hit-testing, history, presence, headless and styleless. MIT.",
    url: "https://dim0.net/canvas-harness",
    siteName: "canvas-harness",
    type: "website",
    images: [
      {
        url: "/canvas-harness-icon.png",
        width: 180,
        height: 180,
        alt: "canvas-harness logo, a small tree, a sturdy trunk",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: CH_TITLE,
    description:
      "Canvas-rendered React node-graph library. 10k nodes at ~80fps. Headless, styleless, MIT.",
    images: ["/canvas-harness-icon.png"],
  },
  // Favicons are auto-detected from app/canvas-harness/icon.png and apple-icon.png
  // (Next.js Metadata Files API). No need to declare them manually.
};

export default function EngineLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`canvas-harness-page ${geist.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      {children}
    </div>
  );
}
