import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

marked.setOptions({ gfm: true });

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  competitor: string;
  keyword: string;
  order: number;
  date: string;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function readMatter(slug: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  return matter(raw);
}

function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

function toMeta(slug: string): PostMeta {
  const { data, content } = readMatter(slug);
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    competitor: String(data.competitor),
    keyword: String(data.keyword),
    order: typeof data.order === "number" ? data.order : 99,
    date: String(data.date),
    readingMinutes: readingMinutes(content),
  };
}

export function getSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map(toMeta)
    .sort((a, b) => a.order - b.order);
}

export function getPost(slug: string): Post | null {
  try {
    const { content } = readMatter(slug);
    const html = marked.parse(content) as string;
    return { ...toMeta(slug), html };
  } catch {
    return null;
  }
}
