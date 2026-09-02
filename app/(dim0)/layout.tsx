import {
  Architects_Daughter,
  Atkinson_Hyperlegible_Next,
  Inconsolata,
  Shantell_Sans,
} from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";

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

const TITLE = "Dim0: Open-source collaborative AI canvas. Notes, mini-apps, agents.";
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
        url: "/home-screenshot-2.png",
        width: 4139,
        height: 2452,
        alt: "A real Dim0 board with live collaborators: nested research, sticky notes, code, charts, and a board-aware AI agent on one canvas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/home-screenshot-2.png"],
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
      {children}
    </div>
  );
}
