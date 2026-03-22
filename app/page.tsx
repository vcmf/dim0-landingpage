 "use client";

import Image from "next/image";
import { type ComponentType, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Chart01Icon,
  ChatBotIcon,
  CloudIcon,
  CodeIcon,
  File01Icon,
  NoteIcon,
  PaintBoardIcon,
  SparklesIcon,
  SearchVisualIcon,
} from "@hugeicons/core-free-icons";
import {
  Claude,
  DeepSeek,
  Gemini,
  Kimi,
  Mistral,
  OpenAI,
  Qwen,
  ZAI,
} from "@lobehub/icons";
import { GitHubIcon } from "./components/github-icon";

type ProofCard = {
  title: string;
  image: string;
  alt: string;
  markerIcon: unknown;
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

type SignalItem = {
  label: string;
  accentClass?: string;
};

type ArchitectureItem = {
  title: string;
  description: string;
  bullets: string[];
  icon: unknown;
};

type FragmentStep = {
  label: string;
  accentClass?: string;
};

type ConvergenceNode = {
  label: string;
  className: string;
  icon: unknown;
};

const proofCards: ProofCard[] = [
  {
    title: "Spatial Thinking, Native To The Board",
    image: "/richgraph-light.png",
    alt: "dim0 rich graph canvas with formatted text nodes and diagram shapes",
    markerIcon: PaintBoardIcon,
    bullets: [
      "Shape nodes and rich notes live together on one infinite canvas.",
      "Sketch relationships, structure ideas, and keep context visible as the board grows.",
      "Rich text nodes support slash commands, math, code blocks, and checklists.",
      "Move from rough visual thinking to clear structure without changing tools.",
    ],
  },
  {
    title: "From Notes To Structure In One Step",
    image: "/drawify-light.png",
    alt: "dim0 AI action menu with drawify, mapify, and schemify options",
    markerIcon: SparklesIcon,
    bullets: [
      "Turn notes into diagrams, maps, and structured visuals with AI.",
      "Refine generated output directly on the same canvas instead of exporting elsewhere.",
      "Ask the board to expand, regroup, or simplify as ideas evolve.",
      "Keep the visual result editable, spatial, and connected to surrounding context.",
    ],
  },
  {
    title: "A Board-Aware Agent, Not A Sidebar Bot",
    image: "/assistant-light.png",
    alt: "dim0 AI assistant panel with web search and reasoning steps",
    markerIcon: ChatBotIcon,
    bullets: [
      "Not a chatbot, but a board-native agent that reasons in multiple steps and uses tools in parallel.",
      "Reads live board context and selected nodes instead of working blind.",
      "Uses tools like web search, code execution, and canvas editing in one workflow.",
      "Places results back onto the board as usable outputs, not just chat text.",
      "Helps research, synthesize, generate widgets, and act directly inside the canvas.",
    ],
  },
  {
    title: "Documents, Code, And Widgets On One Surface",
    image: "/document-mindmap-light.png",
    alt: "dim0 document map with generated summary and linked concepts",
    markerIcon: File01Icon,
    bullets: [
      "Upload documents directly into the board and keep their context connected.",
      "Run code inside graph nodes with sandboxed execution when needed.",
      "Generate live HTML and JS widgets as part of the canvas itself.",
      "Keep documents, outputs, code, and interactive views together in one working surface.",
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
  { name: "GLM", provider: "Z.ai", Icon: ZAI },
];

const heroSignals: SignalItem[] = [
  { label: "Docs" },
  { label: "Code Nodes", accentClass: "rough-underline-cyan" },
  { label: "Widgets", accentClass: "rough-underline-violet" },
  { label: "Semantic Search" },
  { label: "Board-Native Agent", accentClass: "rough-underline-pink" },
];

const architectureItems: ArchitectureItem[] = [
  {
    title: "A Canvas That Thinks Spatially",
    icon: PaintBoardIcon,
    description:
      "Dim0 is built around the board as the unit of work, not a chat sidebar or disconnected document stack.",
    bullets: [
      "Shape nodes for sketching and mapping ideas",
      "Sticky notes with rich text, slash commands, math, code blocks, and checklists",
      "A spatial graph where relationships stay visible while you work",
    ],
  },
  {
    title: "A Board-Native Agent That Can Act",
    icon: ChatBotIcon,
    description:
      "The assistant reads live board context, reasons across tools, and writes results directly back onto the canvas.",
    bullets: [
      "Memory and context tools grounded in your actual board state",
      "Create and edit tools that place and modify nodes directly",
      "Web search, code execution, and widget generation in one workflow",
    ],
  },
  {
    title: "Documents, Code, and Widgets on One Surface",
    icon: CodeIcon,
    description:
      "Thinking and execution happen together, so insight does not get trapped in separate tools.",
    bullets: [
      "Upload documents and keep summaries connected to the board",
      "Run code inside graph nodes with sandboxed execution",
      "Generate live HTML and JS widgets as part of the board itself",
    ],
  },
  {
    title: "Semantic Search Across the Knowledge Graph",
    icon: SearchVisualIcon,
    description:
      "Retrieval is meaning-based across nodes and links, not just keyword search inside isolated files.",
    bullets: [
      "Search across notes, documents, and relationships",
      "Keep spatial and relational context attached to retrieved results",
      "Support deeper multi-step agent workflows on top of the board graph",
    ],
  },
];

const fragmentedWorkflow: FragmentStep[] = [
  { label: "Browse" },
  { label: "Notes", accentClass: "rough-underline-cyan" },
  { label: "Diagram" },
  { label: "Ask AI", accentClass: "rough-underline-violet" },
  { label: "Paste Back", accentClass: "rough-underline-pink" },
];

const convergenceNodes: ConvergenceNode[] = [
  { label: "Notes", className: "convergence-node-notes", icon: NoteIcon },
  { label: "Documents", className: "convergence-node-documents", icon: File01Icon },
  { label: "Code", className: "convergence-node-code", icon: CodeIcon },
  { label: "Charts", className: "convergence-node-charts", icon: Chart01Icon },
  { label: "Agents", className: "convergence-node-agents", icon: ChatBotIcon },
];

const faqItems = [
  {
    question: "What is dim0, exactly?",
    answer:
      "dim0 is an agent-native thinking canvas where documents, code, widgets, and AI agents work together on one board.",
  },
  {
    question: "Is dim0 open source?",
    answer:
      "Yes. dim0 has an open-source codebase so you can inspect, fork, and contribute to the product.",
  },
  {
    question: "Can I self-host dim0?",
    answer:
      "Yes. You can run dim0 in your own environment for more control over infrastructure and data handling.",
  },
  {
    question: "Which AI models can I use?",
    answer:
      "dim0 supports multiple providers, including OpenAI, Anthropic, Google, Mistral, Moonshot (Kimi), DeepSeek, and Qwen, with more coming.",
  },
  {
    question: "How does text-to-visual work?",
    answer:
      "dim0 can transform notes into mind maps and visual structures with AI, then you can keep refining the generated output directly on the same canvas.",
  },
  {
    question: "How does document chat work?",
    answer:
      "Upload a document to your board, then dim0 indexes it for retrieval so the assistant can answer with document-aware context and place outputs back onto the board.",
  },
  {
    question: "How is this different from using separate chat, docs, and whiteboard tools?",
    answer:
      "Most tools bolt AI onto a doc or whiteboard. dim0 is built so the canvas itself is the interface, and the agent can read and write directly inside that surface.",
  },
  {
    question: "Why canvas-first instead of chat-first?",
    answer:
      "Complex work is spatial. A canvas keeps structure, relationships, and partial ideas visible at once, while the agent helps transform that context into new nodes, summaries, code, and widgets.",
  },
  {
    question: "What can the agent actually do on the board?",
    answer:
      "The agent can search, read selected context, synthesize information, create and edit nodes, run code when needed, and generate widgets that appear directly on the board.",
  },
  {
    question: "Who is dim0 for right now?",
    answer:
      "dim0 is built for researchers, founders, students, and teams who work through complex problems and want one canvas for thinking, synthesis, and execution.",
  },
  {
    question: "Can I export my work?",
    answer:
      "Yes. Your boards and outputs are portable, so you are not locked into one workflow forever.",
  },
  {
    question: "How does dim0 use my data?",
    answer:
      "dim0 does not sell your data and does not use your content for ads or model training. Your content is processed only to provide the features you explicitly request.",
  },
  {
    question: "What about model providers in cloud mode?",
    answer:
      "In cloud mode, prompts and relevant context are sent to model providers to generate responses. Provider handling is governed by their own terms and policies.",
  },
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
              your agents. One canvas.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            <strong>dim0</strong> (read &quot;dee-moh&quot;) is an agent-native
            thinking canvas where visual reasoning, documents, code, and AI
            agents work together on one board, so insight can become execution
            in minutes.
          </p>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground sm:text-base">
            {heroSignals.map((item, index) => (
              <span key={item.label} className="inline-flex items-center gap-3">
                <span className={item.accentClass ? `rough-underline ${item.accentClass}` : undefined}>
                  {item.label}
                </span>
                {index < heroSignals.length - 1 ? <span className="text-muted-foreground/45">·</span> : null}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full border border-secondary/70 bg-secondary/20 px-6 py-3 text-sm font-semibold text-secondary backdrop-blur-md transition hover:bg-secondary/30"
            >
              <HugeiconsIcon icon={CloudIcon} size={17} color="currentColor" strokeWidth={2} />
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
            Think visually, reason semantically, and let the board become executable.
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
              Knowledge work is fragmented by design
            </span>
          </h2>
          <div className="mt-7 rounded-[2rem] border border-border/70 bg-card/45 px-5 py-6 backdrop-blur-sm sm:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base text-foreground/88 sm:text-[1.1rem]">
              {fragmentedWorkflow.map((step, index) => (
                <span key={step.label} className="inline-flex items-center gap-3">
                  <span className={step.accentClass ? `rough-underline ${step.accentClass}` : undefined}>
                    {step.label}
                  </span>
                  {index < fragmentedWorkflow.length - 1 ? (
                    <span className="font-informal text-lg text-secondary/85 sm:text-xl">-&gt;</span>
                  ) : null}
                </span>
              ))}
            </div>
            <p className="mt-5 text-xl font-semibold tracking-tight text-card-foreground sm:text-2xl">
              One idea, five context switches.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              <strong>This is not just a productivity problem.</strong> It is
              an architectural problem. <strong>dim0</strong> collapses
              research, documents, visual reasoning, code, and agents into one
              continuous canvas.
            </p>
            <div className="convergence-diagram mt-8">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 900 360"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <ellipse
                  cx="450"
                  cy="180"
                  rx="270"
                  ry="108"
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.22)"
                  strokeWidth="1.6"
                  strokeDasharray="6 10"
                />
                <path
                  d="M170 112 C 250 126, 326 146, 396 168"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.55)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="7 9"
                />
                <path
                  d="M246 58 C 316 92, 366 126, 414 160"
                  fill="none"
                  stroke="rgba(125, 211, 252, 0.42)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="7 9"
                />
                <path
                  d="M720 110 C 648 122, 584 144, 504 170"
                  fill="none"
                  stroke="rgba(167, 139, 250, 0.58)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="7 9"
                />
                <path
                  d="M700 254 C 626 236, 564 214, 500 190"
                  fill="none"
                  stroke="rgba(244, 114, 182, 0.58)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeDasharray="7 9"
                />
                <path
                  d="M220 272 C 288 238, 348 214, 404 192"
                  fill="none"
                  stroke="rgba(226, 232, 240, 0.34)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeDasharray="7 9"
                />
              </svg>
              {convergenceNodes.map((node) => (
                <span
                  key={node.label}
                  className={`convergence-node ${node.className}`}
                >
                  <HugeiconsIcon
                    icon={node.icon as never}
                    size={16}
                    strokeWidth={2}
                    color="currentColor"
                  />
                  {node.label}
                </span>
              ))}
              <div className="convergence-center">
                <span className="font-informal text-sm uppercase tracking-[0.22em] text-secondary/90">
                  One Canvas
                </span>
                <div className="mt-2 text-2xl font-semibold tracking-tight text-card-foreground sm:text-3xl">
                  dim0
                </div>
              </div>
            </div>
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
              What Lives On The Canvas
            </span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            The board is the unit of work. Dim0 combines the pieces that are
            usually spread across separate tools and makes them usable by both
            you and the agent in the same surface.
          </p>
          <div className="mt-6 space-y-14">
            {proofCards.map((card, index) => {
              const reverse = index % 2 === 1;
              const imageTiltClass = reverse
                ? "md:-rotate-[1.1deg] md:translate-y-1"
                : "md:rotate-[1.1deg] md:-translate-y-1";

              return (
                <article
                  key={card.title}
                  className="grid gap-8 py-2 md:grid-cols-2 md:items-center md:gap-20"
                >
                  <div className={reverse ? "md:order-2" : ""}>
                    <div className="mb-1 inline-flex items-center text-secondary">
                      <HugeiconsIcon
                        icon={card.markerIcon as never}
                        size={42}
                        strokeWidth={2}
                        color="var(--secondary)"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground">
                      {card.title}
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 leading-7">
                          <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-secondary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    {card.supportImage ? (
                      <div
                        className={`mt-4 rounded-3xl border border-border/80 bg-card/45 p-2 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.55)] transition duration-300 ${imageTiltClass}`}
                      >
                        <button
                          type="button"
                          aria-label={`Open full image: ${card.title} support`}
                          onClick={() =>
                            setPreview({
                              src: card.supportImage as string,
                              alt: card.supportAlt || card.title,
                            })
                          }
                          className="block aspect-[16/10] w-full overflow-hidden rounded-2xl"
                        >
                          <Image
                            src={card.supportImage}
                            alt={card.supportAlt || ""}
                            width={1200}
                            height={700}
                            className="block h-full w-full rounded-2xl object-cover transition-transform duration-300 ease-out md:hover:scale-[1.05]"
                          />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className={reverse ? "md:order-1" : ""}>
                    <div
                      className={`rounded-3xl border border-border/80 bg-card/45 p-2 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.55)] transition duration-300 hover:border-border ${imageTiltClass}`}
                    >
                      <button
                        type="button"
                        aria-label={`Open full image: ${card.title}`}
                        onClick={() => setPreview({ src: card.image, alt: card.alt })}
                        className="block aspect-[16/10] w-full overflow-hidden rounded-2xl"
                      >
                        <Image
                          src={card.image}
                          alt={card.alt}
                          width={1400}
                          height={900}
                          className="block h-full w-full rounded-2xl object-cover transition-transform duration-300 ease-out md:hover:scale-[1.05]"
                        />
                      </button>
                    </div>
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
              Why Dim0 Is Different
            </span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            The point is not adding a chatbot to a whiteboard. The point is
            building the board itself as an agent-native system.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {architectureItems.map((item) => (
              <article
                key={item.title}
                className="group rounded-3xl border border-border bg-card/65 p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-secondary/45 hover:bg-card/85 hover:shadow-[0_20px_55px_-40px_rgba(34,211,238,0.32)]"
              >
                <h3 className="flex items-center gap-3 text-lg font-semibold text-card-foreground">
                  <HugeiconsIcon
                    icon={item.icon as never}
                    size={22}
                    strokeWidth={2}
                    color="var(--secondary)"
                    className="transition duration-300 group-hover:scale-110 group-hover:-rotate-3"
                  />
                  <span className="transition duration-300 group-hover:text-foreground">
                    {item.title}
                  </span>
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground transition duration-300 group-hover:text-muted-foreground/95">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 leading-7 transition duration-300 group-hover:translate-x-1"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-secondary transition duration-300 group-hover:scale-125 group-hover:bg-[#8fe6ff]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
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
              Bring The Models You Already Use
            </span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Dim0 is architecture-first, not model-locked. Choose the right
            model for each task and keep the canvas workflow consistent.
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

        <section className="mt-16">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                color="var(--secondary)"
                strokeWidth={2}
              />
              Open Source By Design
            </span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            <strong>dim0</strong> is built to be transparent and portable.
            Choose cloud for speed and simplicity, or self-host for full
            control over infrastructure and data handling.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-card-foreground">Transparent code</p>
              <p className="mt-1 text-sm text-muted-foreground">Inspect implementation details and contribute directly.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-card-foreground">Cloud or self-host</p>
              <p className="mt-1 text-sm text-muted-foreground">Choose the deployment model that matches your team.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-card-foreground">No lock-in</p>
              <p className="mt-1 text-sm text-muted-foreground">Keep your workflows portable as your stack evolves.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/pxtio/topix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-card"
            >
              <GitHubIcon className="h-4 w-4 fill-current" />
              View Open Source Repo
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full border border-secondary/70 bg-secondary/20 px-5 py-2.5 text-sm font-semibold text-secondary backdrop-blur-md transition hover:bg-secondary/30"
            >
              <HugeiconsIcon icon={CloudIcon} size={17} color="currentColor" strokeWidth={2} />
              Start with <strong>dim0</strong> Cloud
            </a>
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
              FAQ
            </span>
          </h2>
          <div className="mt-5 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-border bg-card/60 px-5 py-4 backdrop-blur-sm"
              >
                <summary className="flex cursor-pointer list-none items-center gap-2 pr-2 text-sm font-semibold text-card-foreground sm:text-base">
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={18}
                    color="var(--secondary)"
                    strokeWidth={2}
                    className="shrink-0 transition-transform duration-200 group-open:rotate-90"
                  />
                  <span>{item.question}</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
              </details>
            ))}
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
                Get Started
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Explore the open-source repo today, then try the cloud experience
              as the launch path expands.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-full border border-secondary/70 bg-secondary/20 px-6 py-3 text-sm font-semibold text-secondary backdrop-blur-md transition hover:bg-secondary/30"
              >
                <HugeiconsIcon icon={CloudIcon} size={17} color="currentColor" strokeWidth={2} />
                Join <strong>dim0</strong> Cloud
              </a>
              <a
                href="https://github.com/pxtio/topix#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-card"
              >
                <GitHubIcon className="h-4 w-4 fill-current" />
                Read GitHub README
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

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8 pt-6">
        <div className="flex flex-col gap-3 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} <strong>dim0</strong> · Open-source agent-native thinking canvas
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href="#cta" className="transition hover:text-foreground">
              Cloud Demo
            </a>
            <a
              href="https://github.com/pxtio/topix"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://github.com/pxtio/topix#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              README
            </a>
            <a
              href="https://github.com/pxtio/topix/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              Contact
            </a>
            <span className="text-muted-foreground/70">Privacy (soon)</span>
            <span className="text-muted-foreground/70">Terms (soon)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
