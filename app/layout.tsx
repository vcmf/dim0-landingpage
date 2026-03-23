import {
  Gochi_Hand,
  Instrument_Sans,
  Shantell_Sans,
  Source_Serif_4,
  Ubuntu_Mono,
} from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const shantellSans = Shantell_Sans({
  variable: "--font-handwriting",
  subsets: ["latin"],
});

const gochiHand = Gochi_Hand({
  variable: "--font-informal",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dim0.net"),
  title: {
    default: "Dim0 | AI Thinking Canvas for Notes, Code, Widgets, and Agents",
    template: "%s | Dim0",
  },
  description:
    "Dim0 is an agent-native AI thinking canvas for visual reasoning, notes, documents, code, widgets, and board-aware agents working together on one surface.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI thinking canvas",
    "agent-native canvas",
    "visual reasoning workspace",
    "board-native AI agent",
    "knowledge graph canvas",
    "spatial workspace",
    "AI whiteboard",
    "notes code widgets",
  ],
  openGraph: {
    title: "Dim0 | AI Thinking Canvas for Notes, Code, Widgets, and Agents",
    description:
      "Dim0 is an agent-native AI thinking canvas for visual reasoning, notes, documents, code, widgets, and board-aware agents working together on one surface.",
    url: "https://dim0.net",
    siteName: "Dim0",
    type: "website",
    images: [
      {
        url: "/app-main-screen.png",
        width: 1920,
        height: 1080,
        alt: "Dim0 agent-native thinking canvas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dim0 | AI Thinking Canvas for Notes, Code, Widgets, and Agents",
    description:
      "Dim0 is an agent-native AI thinking canvas for visual reasoning, notes, documents, code, widgets, and board-aware agents working together on one surface.",
    images: ["/app-main-screen.png"],
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
        className={`${instrumentSans.variable} ${sourceSerif.variable} ${ubuntuMono.variable} ${shantellSans.variable} ${gochiHand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
