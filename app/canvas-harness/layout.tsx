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
    "canvas-harness is a canvas-rendered, headless, styleless node-graph library for React — canvas performance (10k nodes at ~80fps) with zero style opinions. It owns camera, hit-testing, history, and spatial queries, and ships no UI. MIT, ts-first. Powers Dim0.",
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
