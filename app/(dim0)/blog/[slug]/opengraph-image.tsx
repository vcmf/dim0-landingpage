import { ImageResponse } from "next/og";
import { getPost, getSlugs } from "../posts";

export const alt = "Dim0 comparison";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

// Bold, saturated brand color per competitor - reads well as a social card.
const BG: Record<string, string> = {
  Notion: "#2a2a2f",
  Miro: "#f2c024",
  Excalidraw: "#6a5cf0",
  Obsidian: "#6c4cd6",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const competitor = post?.competitor ?? "";
  const bg = BG[competitor] ?? "#c2603f";
  const onLight = competitor === "Miro";
  const fg = onLight ? "#1c1c1c" : "#ffffff";
  const dim = onLight ? "rgba(28,28,28,0.72)" : "rgba(255,255,255,0.82)";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: bg,
          color: fg,
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
            color: dim,
          }}
        >
          {`DIM0   vs   ${competitor.toUpperCase()}`}
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
          {post?.title ?? "Dim0 comparison"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 27,
            color: dim,
          }}
        >
          <div style={{ display: "flex", fontWeight: 700, color: fg }}>
            dim0.net
          </div>
          <div style={{ display: "flex" }}>
            Open-source · self-hostable · AI-native
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
