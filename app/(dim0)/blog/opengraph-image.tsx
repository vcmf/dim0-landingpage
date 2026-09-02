import { ImageResponse } from "next/og";

export const alt = "Dim0 Blog - honest comparisons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#c2603f",
          color: "#ffffff",
          padding: 76,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 4,
            fontWeight: 700,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          DIM0 BLOG
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          Honest comparisons: Dim0 vs Notion, Miro, Excalidraw & Obsidian
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 27,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          dim0.net · open-source collaborative AI canvas
        </div>
      </div>
    ),
    { ...size },
  );
}
