import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter, SiteNav } from "../../../components/site-chrome";
import { getAllPosts } from "../posts";
import { VersusCover } from "../versus-cover";

const SITE = "https://dim0.net";
const APP_URL = "https://app.dim0.net/signin";
const GH_URL = "https://github.com/vcmf/dim0";

const TITLE =
  "The open-source alternative to Notion, Miro, Excalidraw & Obsidian";
const DESC =
  "Dim0 combines rich documents, an infinite whiteboard, and a board-aware AI agent on one open-source, self-hostable canvas. Here is how it compares to Notion, Miro, Excalidraw, and Obsidian, and when to reach for each.";

export const metadata: Metadata = {
  title: { absolute: `${TITLE} | Dim0` },
  description: DESC,
  alternates: { canonical: "/blog/alternatives" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: `${SITE}/blog/alternatives`,
    type: "article",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

function PillarJsonLd({ posts }: { posts: { slug: string; title: string }[] }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Overview",
        item: `${SITE}/blog/alternatives`,
      },
    ],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: TITLE,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE}/blog/${p.slug}`,
      name: p.title,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([breadcrumb, itemList]),
      }}
    />
  );
}

// Honest capability matrix. "Limited" / "Basic" / "Local only" flag real
// caveats rather than pretending the other tools do nothing.
const ROWS: [string, string, string, string, string, string][] = [
  ["Infinite spatial canvas", "Yes", "No", "Yes", "Yes", "Basic"],
  ["Rich documents & notes", "Yes", "Yes", "No", "No", "Yes"],
  ["AI that acts on the board", "Yes", "Doc-only", "Limited", "No", "Plugins"],
  ["Real-time collaboration", "Yes", "Yes", "Yes", "Yes", "Paid add-on"],
  ["Open source", "Yes", "No", "No", "Yes", "No"],
  ["Self-hostable", "Yes", "No", "No", "Yes", "Local only"],
  ["Portable Markdown", "Yes", "Export", "No", "No", "Yes"],
];
const COLS = ["Capability", "Dim0", "Notion", "Miro", "Excalidraw", "Obsidian"];

export default function AlternativesPillar() {
  const posts = getAllPosts();
  return (
    <>
      <PillarJsonLd posts={posts} />
      <SiteNav />

      <article className="section article">
        <Link href="/blog" className="article-back">
          <ArrowLeftIcon size={13} weight="bold" /> All comparisons
        </Link>
        <h1 className="article-title">{TITLE}</h1>
        <p className="article-desc">{DESC}</p>

        <div className="article-body">
          <p>
            Most teams end up paying for a stack: a doc tool, a whiteboard, a
            notes app, and a separate AI assistant that cannot see any of them.
            Dim0 puts all four jobs on one board. Rich documents like Notion,
            an infinite canvas like Miro and Excalidraw, portable Markdown notes
            like Obsidian, and an AI agent that reads the surrounding board
            before it acts. It is open source, so you can inspect it, fork it,
            and self-host it with your own model keys.
          </p>
          <p>
            None of the tools below are bad. Each is excellent at part of this.
            The point of Dim0 is that you stop switching between them, and that
            the AI works on real content in context instead of in a detached
            chat window.
          </p>

          <h2>How Dim0 compares at a glance</h2>
          <table>
            <thead>
              <tr>
                {COLS.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r[0]}>
                  {r.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="compare-note">
            &ldquo;Basic&rdquo;, &ldquo;Limited&rdquo; and &ldquo;Local
            only&rdquo; mark real caveats, not zeroes. The full trade-offs live
            in each comparison below.
          </p>

          <h2>Instead of Notion</h2>
          <p>
            Notion is the best doc-and-database workspace there is, but it
            thinks in pages and lists, not in space, and its AI stays inside a
            document. Dim0 keeps the rich docs and adds an infinite canvas plus
            an agent that can act on everything around it.{" "}
            <Link href="/blog/dim0-vs-notion">Read Dim0 vs Notion</Link>.
          </p>

          <h2>Instead of Miro or Excalidraw</h2>
          <p>
            Miro and Excalidraw are whiteboards: great for shapes, arrows, and
            sticky notes, but the objects on them are not real documents and
            there is no agent that understands the board. Dim0 is a whiteboard
            where a node can be a live document, a chart, or a mini-app, and the
            AI works on them in place. Excalidraw and Dim0 are both open source;
            Miro is not.{" "}
            <Link href="/blog/dim0-vs-miro">Dim0 vs Miro</Link> and{" "}
            <Link href="/blog/dim0-vs-excalidraw">Dim0 vs Excalidraw</Link>.
          </p>

          <h2>Instead of Obsidian</h2>
          <p>
            Obsidian is local-first Markdown knowledge, private and portable,
            but it is an empty box: real-time collaboration is a paid add-on,
            and it does not help you think spatially out of the box. Dim0 keeps
            the Markdown portability and adds a shared canvas, real-time
            multiplayer, and AI on the same surface.{" "}
            <Link href="/blog/dim0-vs-obsidian">Read Dim0 vs Obsidian</Link>.
          </p>

          <p>
            Dim0 is the only option that is all of the above at once, and open
            source you can run yourself.
          </p>
        </div>
      </article>

      <section className="section article-more">
        <div className="section-eyebrow">The full comparisons</div>
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
      </section>

      <section className="section pillar-cta">
        <h2 className="section-title">One canvas instead of four tools</h2>
        <p className="section-lede">
          Free during early access. Open source, self-hostable, bring your own
          model keys.
        </p>
        <div className="pillar-cta-row">
          <a className="btn btn-sienna" href={APP_URL}>
            Open Dim0
          </a>
          <a
            className="btn btn-ghost"
            href={GH_URL}
            target="_blank"
            rel="noreferrer"
          >
            View the source
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
