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
  title: "Dim0 | The Agent-Native Thinking Canvas",
  description:
    "Dim0 is an agent-native thinking canvas that unifies visual reasoning, documents, code, widgets, and AI agents on one board.",
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
