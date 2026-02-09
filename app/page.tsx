 "use client";

import Image from "next/image";
import { type ComponentType, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import {
  Claude,
  DeepSeek,
  Gemini,
  Kimi,
  Mistral,
  OpenAI,
  Qwen,
} from "@lobehub/icons";
import { GitHubIcon } from "./components/github-icon";

type ProofCard = {
  title: string;
  image: string;
  alt: string;
  bullets: string[];
  supportImage?: string;
  supportAlt?: string;
};

type PreviewImage = {
  src: string;
  alt: string;
};

type ModelBadge = {
  name: string;
  provider: string;
  Icon: ComponentType<{ size?: number | string; className?: string }>;
};

const proofCards: ProofCard[] = [
  {
    title: "Powerful Whiteboard Foundation",
    image: "/richgraph-light.png",
    alt: "dim0 rich graph canvas with formatted text nodes and diagram shapes",
    bullets: [
      "Infinite canvas for non-linear thinking and large visual maps.",
      "Rough-style shapes and rich text blocks in every node.",
      "Native support for LaTeX math and code snippets.",
      "Designed to evolve from rough sketch to clear structure.",
    ],
  },
  {
    title: "Text to Visual, Instantly",
    image: "/drawify-light.png",
    alt: "dim0 AI action menu with drawify, mapify, and schemify options",
    bullets: [
      "Convert notes into mindmaps and schemas in one step.",
      "Keep editing generated visuals directly on the canvas.",
      "Use AI actions to expand, regroup, and improve structure.",
      "Spend less time diagramming by hand.",
    ],
  },
  {
    title: "First-Class Agent Assistant",
    image: "/assistant-light.png",
    alt: "dim0 AI assistant panel with web search and reasoning steps",
    bullets: [
      "ReAct-style multi-step reasoning with visible tool steps.",
      "Strong tool calling for search and context-aware workflows.",
      "Keeps context from your board and conversation state.",
      "Agent outputs are directly usable on the canvas, not just chat text.",
    ],
  },
  {
    title: "Document Intelligence",
    image: "/document-mindmap-light.png",
    alt: "dim0 document map with generated summary and linked concepts",
    bullets: [
      "Upload documents directly into your working board.",
      "AI analyzes content and builds a visual mindmap automatically.",
      "Chat with the document using built-in retrieval (RAG).",
      "Keep document context and outputs connected in one place.",
    ],
  },
];

const modelBadges: ModelBadge[] = [
  { name: "GPT", provider: "OpenAI", Icon: OpenAI },
  { name: "Claude", provider: "Anthropic", Icon: Claude },
  { name: "Gemini", provider: "Google", Icon: Gemini },
  { name: "Mistral", provider: "Mistral", Icon: Mistral },
  { name: "Kimi", provider: "Moonshot", Icon: Kimi },
  { name: "DeepSeek", provider: "DeepSeek", Icon: DeepSeek },
  { name: "Qwen", provider: "Alibaba", Icon: Qwen },
];

export default function Home() {
  const [preview, setPreview] = useState<PreviewImage | null>(null);

  useEffect(() => {
    if (!preview) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreview(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [preview]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="stars-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(125,211,252,0.06),transparent_36%),radial-gradient(circle_at_84%_10%,rgba(96,165,250,0.05),transparent_42%),radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.02),transparent_55%)] [mask-image:linear-gradient(to_bottom,black_0%,transparent_25%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_25%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7">
        <a href="#" className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-foreground/95">
          <Image src="/dim0.svg" alt="dim0 logo" width={24} height={24} />
          <span>
            <strong>DIM0</strong>
          </span>
        </a>
        <a
          href="https://github.com/pxtio/topix"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
          title="GitHub repository"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-transparent text-foreground backdrop-blur-md transition hover:border-border hover:bg-accent/10"
        >
          <GitHubIcon className="h-5 w-5 fill-current" />
        </a>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-6">
        <section className="text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-3 px-1 py-1">
            <Image src="/dim0.svg" alt="dim0 icon" width={56} height={56} />
            <span className="bg-gradient-to-r from-[#e6c5a8] via-[#f7a936] to-white bg-clip-text font-sans text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              <strong>DIM0</strong>
            </span>
          </div>
          <h1 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-semibold tracking-tight sm:text-6xl">
            Your thoughts, your docs,
            <span className="font-informal block bg-gradient-to-r from-secondary via-foreground/95 to-secondary bg-clip-text text-transparent">
              your agents. One workspace.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            <strong>dim0</strong> (read &quot;dee-moh&quot;) unifies rich canvas
            thinking, document understanding, and first-class AI agents so you
            can move from insight to results in minutes, not hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#cta"
              className="rounded-full border border-secondary/70 bg-secondary/20 px-6 py-3 text-sm font-semibold text-secondary backdrop-blur-md transition hover:bg-secondary/30"
            >
              Try <strong>dim0</strong> Cloud
            </a>
            <a
              href="https://github.com/pxtio/topix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-card"
            >
              <GitHubIcon className="h-4 w-4 fill-current" />
              Explore Open Source
            </a>
          </div>
        </section>

        <section id="product" className="mx-auto mt-14 max-w-6xl">
          <div className="relative overflow-hidden rounded-xl border border-border/70 bg-card/70 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_35px_90px_-45px_rgba(34,211,238,0.8)] backdrop-blur-sm">
            <Image
              src="/app-main-screen.png"
              alt="dim0 application main screen"
              width={1920}
              height={1080}
              priority
              className="block h-auto w-full"
            />
            <div className="font-informal pointer-events-none absolute left-10 top-10 rounded-full border border-secondary/80 bg-secondary/20 px-3 py-1.5 text-xs font-medium text-secondary backdrop-blur-md sm:left-14 sm:top-14">
              Board Canvas
            </div>
            <div className="font-informal pointer-events-none absolute right-10 top-8 rounded-full border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md sm:right-14 sm:top-12">
              Board Copilot
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Sketch ideas, think visually, and act in one flow.
          </p>
        </section>

        <section className="mx-auto mt-14 max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                color="var(--secondary)"
                strokeWidth={2}
              />
              Knowledge work is fragmented today
            </span>
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Research happens in chat apps and search engines. Notes live in
            docs. Visual thinking in whiteboards. <strong>dim0</strong> brings
            it all together into one continuous flow, with AI helping at every
            step.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground sm:text-sm">
            <span className="rounded-full border border-border bg-card/70 px-3 py-1.5">
              Search + reasoning
            </span>
            <span className="rounded-full border border-border bg-card/70 px-3 py-1.5">
              Rich notes + docs
            </span>
            <span className="rounded-full border border-border bg-card/70 px-3 py-1.5">
              Visual mapping + execution
            </span>
          </div>
        </section>

        <section id="features" className="mt-16">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                color="var(--secondary)"
                strokeWidth={2}
              />
              Core Features
            </span>
          </h2>
          <div className="mt-6 space-y-5">
            {proofCards.map((card, index) => {
              const reverse = index % 2 === 1;

              return (
                <article
                  key={card.title}
                  className="grid gap-5 py-2 md:grid-cols-2 md:items-center"
                >
                  <div className={reverse ? "md:order-2" : ""}>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {card.title}
                    </h3>
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-[15px] leading-7">
                          <span className="mt-2 inline-block h-1 w-1 rounded-full bg-secondary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    {card.supportImage ? (
                      <button
                        type="button"
                        aria-label={`Open full image: ${card.title} support`}
                        onClick={() =>
                          setPreview({
                            src: card.supportImage as string,
                            alt: card.supportAlt || card.title,
                          })
                        }
                        className="mt-4 aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-border transition-colors duration-300"
                      >
                        <Image
                          src={card.supportImage}
                          alt={card.supportAlt || ""}
                          width={1200}
                          height={700}
                          className="h-full w-full object-cover transition-transform duration-300 ease-out md:hover:scale-[1.05]"
                        />
                      </button>
                    ) : null}
                  </div>
                  <div className={reverse ? "md:order-1" : ""}>
                    <button
                      type="button"
                      aria-label={`Open full image: ${card.title}`}
                      onClick={() => setPreview({ src: card.image, alt: card.alt })}
                      className="aspect-[16/10] w-full overflow-hidden rounded-2xl border-2 border-border/70 transition-colors duration-300 hover:border-border"
                    >
                      <Image
                        src={card.image}
                        alt={card.alt}
                        width={1400}
                        height={900}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out md:hover:scale-[1.05]"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                color="var(--secondary)"
                strokeWidth={2}
              />
              Works With Everything
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose the right model for each task: GPTs, Claudes, Google models,
            Mistral, Kimi, DeepSeek, and more.
          </p>
          <div className="model-marquee group mt-5">
            <div className="model-marquee-track group-hover:[animation-play-state:paused]">
              {[...modelBadges, ...modelBadges].map((model, index) => {
                const Icon = (model.Icon as ComponentType<{ size?: number | string; className?: string }> & {
                  Color?: ComponentType<{ size?: number | string; className?: string }>;
                }).Color || model.Icon;

                return (
                  <span
                    key={`${model.name}-${index}`}
                    className="inline-flex items-center gap-2 rounded-full border border-secondary/55 bg-secondary/8 px-4 py-2.5 text-sm text-muted-foreground backdrop-blur-sm"
                  >
                    <Icon size={18} />
                    <span className="font-semibold text-foreground/95">{model.name}</span>
                    <span className="text-muted-foreground/90">· {model.provider}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section id="cta" className="mt-16">
          <div className="rounded-3xl border border-border bg-gradient-to-r from-card via-accent/80 to-card px-6 py-10 sm:px-9">
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
              <span className="inline-flex items-center gap-2">
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={24}
                  color="var(--secondary)"
                  strokeWidth={2}
                />
                Build in one agent-native workspace
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Stop moving between tools to complete one thought. Start in{" "}
              <strong>dim0</strong> and keep the entire workflow connected from
              question to action.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-full border border-secondary/70 bg-secondary/20 px-6 py-3 text-sm font-semibold text-secondary backdrop-blur-md transition hover:bg-secondary/30"
              >
                Join Waitlist
              </a>
              <a
                href="#"
                className="rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-card"
              >
                Read Docs
              </a>
            </div>
          </div>
        </section>
      </main>

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setPreview(null)}
        >
          <div className="relative max-h-[92vh] max-w-[95vw]" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute -right-2 -top-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-foreground transition hover:bg-accent"
              aria-label="Close image preview"
            >
              ×
            </button>
            <Image
              src={preview.src}
              alt={preview.alt}
              width={2200}
              height={1400}
              className="h-auto max-h-[90vh] w-auto max-w-[95vw] rounded-xl border border-border"
              priority
            />
          </div>
        </div>
      ) : null}

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8 text-xs text-muted-foreground">
        © {new Date().getFullYear()} <strong>dim0</strong>
      </footer>
    </div>
  );
}
