import {
  Architects_Daughter,
  Atkinson_Hyperlegible_Next,
  Inconsolata,
  Shantell_Sans,
} from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { StructuredData } from "./structured-data";

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-sans",
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  variable: "--font-mono",
  subsets: ["latin"],
});

const architectsDaughter = Architects_Daughter({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: "400",
});

const shantellSans = Shantell_Sans({
  variable: "--font-informal",
  subsets: ["latin"],
});

const TITLE = "Dim0 — Open-source collaborative AI canvas. Notes, mini-apps, agents.";
const DESCRIPTION =
  "Open-source, real-time collaborative AI canvas. Notes, AI mini-apps, and agents on one infinite board. MIT, self-hostable, 8 models. Free to start.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Dim0",
  },
  description: DESCRIPTION,
  // Canonical defaults to "/" for the home page; /privacy and /terms
  // override with their own `alternates.canonical` so they're indexed
  // as distinct documents instead of being consolidated to /.
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI canvas",
    "collaborative AI canvas",
    "real-time collaborative whiteboard",
    "multiplayer canvas",
    "open source Miro alternative",
    "Miro alternative",
    "FigJam alternative",
    "Notion alternative",
    "Excalidraw alternative",
    "infinite canvas",
    "AI whiteboard",
    "open source whiteboard",
    "AI agent workspace",
    "AI mindmap generator",
    "self-hosted collaborative whiteboard",
    "thinking canvas",
    "AI mini-apps",
    "generative UI",
    "AI app generator",
    "AI-generated React apps",
    "Claude artifacts alternative",
    "ChatGPT Canvas alternative",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://dim0.net",
    siteName: "Dim0",
    type: "website",
    images: [
      {
        url: "/board-mindmap-deaging.png",
        width: 1920,
        height: 1080,
        alt: "A Dim0 board showing a mindmap generated from a question, with sticky notes, code, charts, and an AI agent panel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/board-mindmap-deaging.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/dim0.svg",
  },
};

export default function Dim0Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`dim0-page ${atkinson.variable} ${inconsolata.variable} ${architectsDaughter.variable} ${shantellSans.variable}`}
    >
      <StructuredData />
      {children}
    </div>
  );
}
