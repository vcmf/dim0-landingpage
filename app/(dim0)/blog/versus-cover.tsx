"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Notion, Obsidian } from "@lobehub/icons";

type Conf = { color: string; fg: string; icon: (px: number) => ReactNode };

// Solid brand color per competitor + how the competitor's logo is drawn.
const CONF: Record<string, Conf> = {
  Notion: {
    color: "#2a2a2f",
    fg: "#ffffff",
    icon: (px) => <Notion size={px} />,
  },
  Miro: {
    color: "#ffd23f",
    fg: "#1c1c1c",
    icon: (px) => <Image src="/miro.png" alt="" width={px} height={px} />,
  },
  Excalidraw: {
    color: "#6a5cf0",
    fg: "#ffffff",
    icon: (px) => <Image src="/excalidraw.png" alt="" width={px} height={px} />,
  },
  Obsidian: {
    color: "#6c4cd6",
    fg: "#ffffff",
    icon: (px) => <Obsidian.Color size={px} />,
  },
};

export function VersusCover({
  competitor,
  size = "card",
}: {
  competitor: string;
  size?: "card" | "hero";
}) {
  const c =
    CONF[competitor] ?? {
      color: "#c2603f",
      fg: "#ffffff",
      icon: () => <span className="cover-mono">{competitor.charAt(0)}</span>,
    };
  const px = size === "hero" ? 46 : 36;

  return (
    <div
      className={`cover cover-${size}`}
      style={{ "--cover": c.color, "--cover-fg": c.fg } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className="cover-chip">
        <Image src="/dim0.svg" alt="" width={px} height={px} />
      </span>
      <span className="cover-vs">vs</span>
      <span className="cover-chip">{c.icon(px)}</span>
    </div>
  );
}
