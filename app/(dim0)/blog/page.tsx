import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter, SiteNav } from "../../components/site-chrome";
import { getAllPosts } from "./posts";
import { VersusCover } from "./versus-cover";

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
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <>
      <SiteNav />
      <main className="section blog-index">
        <h1 className="section-title">Blog</h1>

        <div className="blog-grid">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
              <VersusCover competitor={p.competitor} />
              <div className="blog-card-body">
                <h2 className="blog-card-title">{p.title}</h2>
                <p className="blog-card-desc">{p.description}</p>
                <div className="blog-card-meta">
                  <span>{p.readingMinutes} min read</span>
                  <span className="blog-card-arrow">
                    Read <ArrowRightIcon size={13} weight="bold" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
