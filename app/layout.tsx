import {
  Architects_Daughter,
  Atkinson_Hyperlegible_Next,
  Inconsolata,
  Lora,
  Shantell_Sans,
} from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://dim0.net"),
  title: {
    default: "Dim0 — Your canvas thinks back.",
    template: "%s | Dim0",
  },
  description:
    "An infinite canvas where notes, sketches, code, and AI agents work together on one board. Open source, multi-model.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI canvas",
    "thinking canvas",
    "visual workspace",
    "AI whiteboard",
    "infinite canvas",
    "agent canvas",
    "notes diagrams code",
  ],
  openGraph: {
    title: "Dim0 — Your canvas thinks back.",
    description:
      "An infinite canvas where notes, sketches, code, and AI agents work together on one board. Open source, multi-model.",
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
    title: "Dim0 — Your canvas thinks back.",
    description:
      "An infinite canvas where notes, sketches, code, and AI agents work together on one board.",
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${atkinson.variable} ${lora.variable} ${inconsolata.variable} ${architectsDaughter.variable} ${shantellSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
