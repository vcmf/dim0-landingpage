import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter, SiteNav } from "../../components/site-chrome";
import { getAllPosts } from "./posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Honest, up-to-date comparisons of Dim0 against the tools you already use: Notion, Miro, Excalidraw, and Obsidian. Where each wins, and which to pick.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Dim0 Blog: comparisons & guides",
    description:
      "Honest comparisons of Dim0 vs Notion, Miro, Excalidraw, and Obsidian.",
    url: "https://dim0.net/blog",
    type: "website",
    images: ["/home-screenshot-2.png"],
  },
};

const HUES: Record<string, string> = {
  Notion: "#8a8378",
  Miro: "#e0b23f",
  Excalidraw: "#8b82e0",
  Obsidian: "#9a7fd8",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <SiteNav />
      <main className="section blog-index">
        <div className="section-eyebrow">Blog</div>
        <h1 className="section-title">
          Comparisons, <em>honestly done.</em>
        </h1>
        <p className="section-lede">
          Up-to-date comparisons of Dim0 against the tools you already use. Where
          we win, where they win, and which one to reach for.
        </p>

        <div className="blog-grid">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="blog-card"
              style={{ "--hue": HUES[p.competitor] ?? "#c2603f" } as React.CSSProperties}
            >
              <div className="blog-card-tag">Dim0 vs {p.competitor}</div>
              <h2 className="blog-card-title">{p.title}</h2>
              <p className="blog-card-desc">{p.description}</p>
              <div className="blog-card-meta">
                <span>{p.readingMinutes} min read</span>
                <span className="blog-card-arrow">
                  Read <ArrowRightIcon size={13} weight="bold" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
