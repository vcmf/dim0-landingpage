import {
  Architects_Daughter,
  Atkinson_Hyperlegible_Next,
  Inconsolata,
  Lora,
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

const lora = Lora({
  variable: "--font-serif",
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

const TITLE = "Dim0 — AI thinking canvas. Notes, code, agents, open source";
const DESCRIPTION =
  "An infinite AI canvas where notes, sketches, code, and agents work on one board. Open source, MIT, 8 models. Free to try — your work stays yours.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Dim0",
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI canvas",
    "thinking canvas",
    "infinite canvas",
    "AI whiteboard",
    "open source whiteboard",
    "AI agent workspace",
    "AI mindmap generator",
    "Notion alternative",
    "Excalidraw alternative",
    "self-hosted AI canvas",
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
      className={`dim0-page ${atkinson.variable} ${lora.variable} ${inconsolata.variable} ${architectsDaughter.variable} ${shantellSans.variable}`}
    >
      <StructuredData />
      {children}
    </div>
  );
}
