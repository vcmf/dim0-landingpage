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

export const metadata: Metadata = {
  title: "canvas-harness — the engine behind Dim0",
  description:
    "canvas-harness is a tiny headless engine for pannable, zoomable node-graph interfaces. It owns viewport math, hit-testing, virtualization, and history — and stays out of your way for everything else. MIT, zero deps, ts-first. Powers Dim0.",
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
