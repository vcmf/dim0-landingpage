import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { SiteFooter, SiteNav } from "../../../components/site-chrome";
import { getAllPosts, getPost, getSlugs } from "../posts";
import { VersusCover } from "../versus-cover";

type Params = { params: Promise<{ slug: string }> };

const SITE = "https://dim0.net";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | Dim0` },
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const DATE_FMT = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : DATE_FMT.format(d);
}

function BreadcrumbJsonLd({ slug, title }: { slug: string; title: string }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${SITE}/blog/${slug}`,
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

function BlogPostingJsonLd({
  slug,
  title,
  description,
  date,
}: {
  slug: string;
  title: string;
  description: string;
  date: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: { "@type": "Organization", name: "Dim0", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "Dim0",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/dim0.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/blog/${slug}` },
    image: `${SITE}/home-screenshot-2.png`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getAllPosts().filter((p) => p.slug !== slug);

  return (
    <>
      <BlogPostingJsonLd
        slug={post.slug}
        title={post.title}
        description={post.description}
        date={post.date}
      />
      <BreadcrumbJsonLd slug={post.slug} title={post.title} />
      <SiteNav />

      <article className="section article">
        <Link href="/blog" className="article-back">
          <ArrowLeftIcon size={13} weight="bold" /> All comparisons
        </Link>
        <VersusCover competitor={post.competitor} size="hero" />
        <h1 className="article-title">{post.title}</h1>
        <p className="article-desc">{post.description}</p>
        <div className="article-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      {others.length > 0 && (
        <section className="section article-more">
          <div className="section-eyebrow">Keep comparing</div>
          <div className="blog-grid">
            {others.map((p) => (
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
      )}

      <SiteFooter />
    </>
  );
}
