"use client";

import Image from "next/image";
import Link from "next/link";
import { type ComponentType, type ReactNode, useEffect, useRef, useState } from "react";
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
  PresentationBarChart01Icon,
  SparklesIcon,
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
  video?: string;
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

type FragmentStep = {
  label: string;
  accentClass?: string;
};

type ConvergenceNode = {
  label: string;
  className: string;
  icon: unknown;
};

type WorkflowStep = {
  label: string;
  title: string;
  description: string;
};

const proofCards: ProofCard[] = [
  {
    title: "Spatial Thinking, Native To The Board",
    image: "/richgraph-light.png",
    video: "/note-shapes.mp4",
    alt: "dim0 rich graph canvas with formatted text nodes and diagram shapes",
    markerIcon: PaintBoardIcon,
    bullets: [
      "Everything lives together: shapes, rich notes, code blocks, and math on one infinite canvas.",
      "Nested boards keep large projects structured without losing the spatial view.",
      "Relationships stay visible as the board grows, so context never gets buried.",
    ],
  },
  {
    title: "Notes Become Structure In One Gesture",
    image: "/drawify-light.png",
    alt: "dim0 AI action menu with drawify, mapify, and schemify options",
    markerIcon: SparklesIcon,
    bullets: [
      "Select any notes and turn them into mind maps, schemas, or diagrams with a single action.",
      "Generated output lands on the same canvas, editable, connected, and ready to extend.",
      "Drawify, Mapify, and Schemify let you reshape thinking without leaving the board.",
    ],
  },
  {
    title: "A Board-Aware Agent, Not A Sidebar Bot",
    image: "/assistant-light.png",
    alt: "dim0 AI assistant panel with web search and reasoning steps",
    markerIcon: ChatBotIcon,
    bullets: [
      "Reads your actual board state before it acts, not a blank chat thread.",
      "Searches the web, runs code, and writes results directly back onto the canvas in one workflow.",
      "Outputs are nodes, not messages: live on the board, ready to edit and connect.",
    ],
  },
  {
    title: "Documents, Code, And Widgets In One Surface",
    image: "/doc-code-widget.png",
    alt: "dim0 board with documents, code, and live widgets on one surface",
    markerIcon: File01Icon,
    bullets: [
      "Upload documents directly onto the board and keep their context connected to your thinking.",
      "Run code inside graph nodes with sandboxed execution, no external environment needed.",
      "Generate live HTML and JS widgets that sit on the canvas alongside everything else.",
    ],
  },
  {
    title: "Present Directly From The Canvas",
    image: "/present-mode.png",
    video: "/present-mode.mp4",
    alt: "dim0 presentation mode with framed board content",
    markerIcon: PresentationBarChart01Icon,
    bullets: [
      "Frame the parts that matter and present without rebuilding anything in slides.",
      "Notes, widgets, code, and visuals all present from the same surface you worked on.",
      "The board you think on is the board you present from.",
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
  { label: "Nested Boards" },
  { label: "Code Nodes", accentClass: "rough-underline-cyan" },
  { label: "Widgets", accentClass: "rough-underline-violet" },
  { label: "Presentation Mode" },
  { label: "Board-Native Agent", accentClass: "rough-underline-pink" },
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

const workflowSteps: WorkflowStep[] = [
  {
    label: "Agent reads the board",
    title: "It knows what is already there before it acts.",
    description: "Board context comes first, so the agent starts from your actual workspace instead of a blank chat thread.",
  },
  {
    label: "Searches the web",
    title: "Pulls current information without you switching tabs.",
    description: "Research happens inside the same flow, so you do not have to break context to gather sources.",
  },
  {
    label: "Synthesizes findings",
    title: "Reasons across sources in multiple steps, in parallel.",
    description: "The agent can compare, connect, and organize findings before turning them into something usable.",
  },
  {
    label: "Builds on the canvas",
    title: "Generates a widget, diagram, or summary directly on your board.",
    description: "The result appears where you are already working, ready to edit, connect, or expand.",
  },
  {
    label: "You keep going",
    title: "Edit, connect, frame, and present from the same surface.",
    description: "The work stays live on the canvas, so there is no handoff to another tool just to move forward.",
  },
];

const faqItems = [
  {
    question: "What is Dim0, exactly?",
    answer:
      "Dim0 is a thinking canvas where documents, code, widgets, and AI agents work together on one board.",
  },
  {
    question: "Is Dim0 open source?",
    answer:
      "Yes. Dim0 has an open-source codebase so you can inspect it, fork it, and run it yourself.",
  },
  {
    question: "Can I self-host Dim0?",
    answer:
      "Yes. You can run Dim0 in your own environment for more control over infrastructure and data handling.",
  },
  {
    question: "Which AI models can I use?",
    answer:
      "Dim0 supports multiple providers, including OpenAI, Anthropic, Google, Mistral, Moonshot (Kimi), DeepSeek, and Qwen, with more coming.",
  },
  {
    question: "How does text-to-visual work?",
    answer:
      "Dim0 can turn notes into visual structures with tools like Drawify, Mapify, and Schemify, then let you keep refining the result directly on the same canvas.",
  },
  {
    question: "How does document chat work?",
    answer:
      "Upload a document to your board, then Dim0 indexes it for retrieval so the assistant can answer with document-aware context and place outputs back onto the board.",
  },
  {
    question: "How is this different from using separate chat, docs, and whiteboard tools?",
    answer:
      "Most tools bolt AI onto a doc or whiteboard. Dim0 is built so the canvas itself is the interface, and the agent can read and write directly inside that surface.",
  },
  {
    question: "Why canvas-first instead of chat-first?",
    answer:
      "Complex work is spatial. A canvas keeps structure, relationships, and partial ideas visible at once, while the agent helps transform that context into new nodes, summaries, code, and widgets. Chat buries context. Canvas keeps it.",
  },
  {
    question: "What can the agent actually do on the board?",
    answer:
      "The agent can search, read selected context, synthesize information, create and edit nodes, run code when needed, and generate widgets that appear directly on the board.",
  },
  {
    question: "How does the canvas handle larger boards?",
    answer:
      "Dim0 is built to stay smooth with 300+ active nodes in view, while supporting boards with 1,000+ total nodes.",
  },
  {
    question: "Who is Dim0 for right now?",
    answer:
      "Dim0 is built for researchers, founders, students, and teams who work through complex problems and want one canvas for thinking, synthesis, and execution.",
  },
  {
    question: "Can I export my work?",
    answer:
      "Yes. Your boards and outputs are portable, so you can take your work with you whenever you need to.",
  },
  {
    question: "How does Dim0 use my data?",
    answer:
      "Dim0 does not sell your data and does not use your content for ads or model training. Your content is processed only to provide the features you explicitly request.",
  },
  {
    question: "What about model providers in cloud mode?",
    answer:
      "In cloud mode, prompts and relevant context are sent to model providers to generate responses. Provider handling is governed by their own terms and policies.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://dim0.net/#organization",
      name: "Dim0",
      url: "https://dim0.net",
      logo: "https://dim0.net/dim0.svg",
      sameAs: ["https://github.com/vcmf/dim0"],
    },
    {
      "@type": "WebSite",
      "@id": "https://dim0.net/#website",
      url: "https://dim0.net",
      name: "Dim0",
      publisher: {
        "@id": "https://dim0.net/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://dim0.net/#software",
      name: "Dim0",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://dim0.net",
      description:
        "Dim0 is an agent-native AI thinking canvas for visual reasoning, notes, documents, code, widgets, and board-aware agents working together on one surface.",
      publisher: {
        "@id": "https://dim0.net/#organization",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      softwareHelp: "https://github.com/vcmf/dim0#readme",
    },
  ],
};

function InteractiveVideoPoster({
  poster,
  videoSrc,
  alt,
  containerClassName,
  videoClassName,
  playButtonClassName,
  overlay,
}: {
  poster: string;
  videoSrc: string;
  alt: string;
  containerClassName: string;
  videoClassName: string;
  playButtonClassName: string;
  overlay?: ReactNode;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      if (video.ended) {
        video.currentTime = 0;
      }
      void video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    video.currentTime = 0;
    video.load();
    setIsPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={togglePlayback}
      className={containerClassName}
      aria-label={isPlaying ? `Pause video: ${alt}` : `Play video: ${alt}`}
    >
      <video
        ref={videoRef}
        poster={poster}
        preload="metadata"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(event) => {
          event.currentTarget.currentTime = 0;
          event.currentTarget.load();
          setIsPlaying(false);
        }}
        className={videoClassName}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {!isPlaying ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className={playButtonClassName}>
            <span className="ml-1 h-0 w-0 border-b-[12px] border-l-[18px] border-t-[12px] border-b-transparent border-l-current border-t-transparent sm:border-b-[14px] sm:border-l-[22px] sm:border-t-[14px]" />
          </span>
        </span>
      ) : null}
      {!isPlaying && overlay ? overlay : null}
    </button>
  );
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="stars-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(125,211,252,0.06),transparent_36%),radial-gradient(circle_at_84%_10%,rgba(96,165,250,0.05),transparent_42%),radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.02),transparent_55%)] [mask-image:linear-gradient(to_bottom,black_0%,transparent_25%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,transparent_25%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-foreground/95">
          <Image src="/dim0.svg" alt="dim0 logo" width={24} height={24} />
          <span>
            <strong>DIM0</strong>
          </span>
        </Link>
        <a
          href="https://github.com/vcmf/dim0"
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
            Your canvas thinks back.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            <strong>Dim0</strong> (read &quot;dee-moh&quot;) is where you map
            ideas, let AI work directly on the canvas, and turn the result into
            documents, diagrams, or code without switching tools.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Built for <strong className="text-foreground">researchers</strong>,{" "}
            <strong className="text-foreground">founders</strong>,{" "}
            and <strong className="text-foreground">builders</strong> who think
            visually and move fast.
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
              href="https://app.dim0.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-secondary/70 bg-secondary/20 px-6 py-3 text-sm font-semibold text-secondary backdrop-blur-md transition hover:bg-secondary/30"
            >
              <HugeiconsIcon icon={CloudIcon} size={17} color="currentColor" strokeWidth={2} />
              Try <strong>Dim0</strong> Cloud
            </a>
            <a
              href="https://github.com/vcmf/dim0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-card"
            >
              <GitHubIcon className="h-4 w-4 fill-current" />
              Explore Open Source
            </a>
          </div>
        </section>

        <section id="product" className="mx-auto mt-18 max-w-6xl">
          <div className="relative overflow-hidden rounded-xl border border-border/70 bg-card/70 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_35px_90px_-45px_rgba(34,211,238,0.8)] backdrop-blur-sm">
            <InteractiveVideoPoster
              poster="/app-main-screen.png"
              videoSrc="/demo.mp4"
              alt="dim0 application main demo"
              containerClassName="group relative block aspect-[16/9] w-full cursor-pointer overflow-hidden"
              videoClassName="absolute left-1/2 top-1/2 block h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)] -translate-x-1/2 -translate-y-1/2 object-cover"
              playButtonClassName="flex h-20 w-20 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.75)] backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:bg-black/55 sm:h-24 sm:w-24"
              overlay={
                <>
                  <div className="font-informal pointer-events-none absolute left-10 top-10 rounded-full border border-secondary/80 bg-secondary/20 px-3 py-1.5 text-xs font-medium text-secondary backdrop-blur-md sm:left-14 sm:top-14">
                    Board Canvas
                  </div>
                  <div className="font-informal pointer-events-none absolute right-10 top-8 rounded-full border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur-md sm:right-14 sm:top-12">
                    Board Agent
                  </div>
                </>
              }
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Think, generate, and present from the same canvas.
          </p>
        </section>

        <section className="mx-auto mt-20 max-w-4xl text-center">
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
            <p className="mx-auto max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              A single line of thinking gets scattered fast. You open tabs to
              research, switch tools to sketch, jump into chat to ask for help,
              then paste the result back somewhere else and try to reconnect the
              context.
            </p>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              By the time you are ready to move forward, the idea is split
              across tabs, threads, notes, and screenshots.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base text-foreground/88 sm:text-[1.1rem]">
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
              The problem is not the tools. It is that none of them share a
              surface. <strong>Dim0</strong> keeps research, documents, visual
              reasoning, code, and agents on one continuous, presentable
              canvas.
            </p>
            <div className="convergence-diagram mt-8">
              <svg
                className="convergence-diagram-lines pointer-events-none absolute inset-0 h-full w-full"
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
                  Dim0
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-5xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                color="var(--secondary)"
                strokeWidth={2}
              />
              See It Work
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            One prompt. The agent searches, synthesizes, and builds directly on
            your board.
          </p>
          <div className="mt-6 rounded-3xl border border-border bg-card/60 px-5 py-5 text-left backdrop-blur-sm sm:px-7">
            <p className="text-xs font-semibold tracking-[0.18em] text-secondary/85">
              EXAMPLE PROMPT
            </p>
            <p className="mt-3 font-serif text-xl leading-8 text-card-foreground sm:text-2xl">
              &quot;Research the latest on fusion energy and create a visual
              summary on my board.&quot;
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {workflowSteps.map((step, index) => (
              <div
                key={step.label}
                className="rounded-2xl border border-border bg-card/55 px-4 py-4 text-left backdrop-blur-sm"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-secondary/85">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm font-semibold leading-7 text-card-foreground">
                  {step.label}
                </p>
                <p className="mt-1 text-sm leading-7 text-card-foreground/92">
                  {step.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="mt-20">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                color="var(--secondary)"
                strokeWidth={2}
              />
              What Makes Dim0 Different
            </span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Most tools bolt AI onto a canvas. <strong>Dim0</strong> is built
            the other way around: the canvas is designed for an agent that can
            read context, use tools, and write results directly back into the
            workspace.
          </p>
          <div className="mt-6 rounded-3xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-[0.18em] text-secondary/85">
              REAL WORKFLOW
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              Ask Dim0 to research a topic, compare sources, generate a chart
              or widget, and place the result on the board beside your notes.
              The output stays connected to the thinking that produced it,
              instead of disappearing into a chat thread.
            </p>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Dim0 is built to stay smooth with 300+ active nodes in view, while
            supporting boards with 1,000+ total nodes.
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
                      {card.bullets.map((bullet, bulletIndex) => (
                        <li key={`${card.title}-${bulletIndex}`} className="flex items-start gap-2 leading-7">
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
                      {card.video ? (
                        <InteractiveVideoPoster
                          poster={card.image}
                          videoSrc={card.video}
                          alt={card.alt}
                          containerClassName="group relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl"
                          videoClassName="absolute left-1/2 top-1/2 block h-[calc(100%+0.35rem)] w-[calc(100%+0.35rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl object-cover"
                          playButtonClassName="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white shadow-[0_18px_40px_-20px_rgba(0,0,0,0.75)] backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:bg-black/55"
                        />
                      ) : (
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
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                color="var(--secondary)"
                strokeWidth={2}
              />
              Your models, your choice.
            </span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Dim0 works with the models you already trust. Switch anytime as the
            landscape evolves and keep the canvas workflow the same.
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
                    className="inline-flex items-center gap-2.5 px-2 py-1 text-base text-muted-foreground/82 transition duration-300 hover:-translate-y-0.5 hover:text-foreground"
                  >
                    <Icon size={22} />
                    <span className="font-semibold text-foreground/95">{model.name}</span>
                    <span className="text-muted-foreground/80">· {model.provider}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
            <span className="inline-flex items-center gap-2">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={24}
                color="var(--secondary)"
                strokeWidth={2}
              />
              Open source, no strings attached.
            </span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            The codebase is public because you should be able to see what you
            are building on. Cloud for convenience, self-hosted for full
            control.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-card-foreground">See how it works</p>
              <p className="mt-1 text-sm text-muted-foreground">The full codebase is public. No black boxes.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-card-foreground">Run it yourself</p>
              <p className="mt-1 text-sm text-muted-foreground">Self-host on your own infrastructure if you need full control over your data.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-card-foreground">Nothing is trapped</p>
              <p className="mt-1 text-sm text-muted-foreground">Your boards and outputs are portable. Walk away anytime.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://github.com/vcmf/dim0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-card"
            >
              <GitHubIcon className="h-4 w-4 fill-current" />
              View Open Source Repo
            </a>
            <a
              href="https://app.dim0.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-secondary/70 bg-secondary/20 px-5 py-2.5 text-sm font-semibold text-secondary backdrop-blur-md transition hover:bg-secondary/30"
            >
              <HugeiconsIcon icon={CloudIcon} size={17} color="currentColor" strokeWidth={2} />
              Start with <strong>Dim0</strong> Cloud
            </a>
          </div>
        </section>

        <section className="mt-20">
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

        <section id="cta" className="mt-20">
          <div className="rounded-3xl border border-border bg-gradient-to-r from-card via-accent/80 to-card px-6 py-10 sm:px-9">
            <p className="font-informal text-sm tracking-[0.18em] text-secondary/85 sm:text-base">
              Dim0 · The Thinking Canvas
            </p>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground">
              <span className="mt-3 inline-flex items-center gap-2">
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={24}
                  color="var(--secondary)"
                  strokeWidth={2}
                />
                Your canvas is waiting.
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Try Dim0 Cloud now, or explore the open-source repo and run it
              your way.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://app.dim0.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-secondary/70 bg-secondary/20 px-6 py-3 text-sm font-semibold text-secondary backdrop-blur-md transition hover:bg-secondary/30"
              >
                <HugeiconsIcon icon={CloudIcon} size={17} color="currentColor" strokeWidth={2} />
                Try <strong>Dim0</strong> Cloud
              </a>
              <a
                href="https://github.com/vcmf/dim0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-card"
              >
                <GitHubIcon className="h-4 w-4 fill-current" />
                View on GitHub
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
            © {new Date().getFullYear()} <strong>Dim0</strong> · The Thinking Canvas
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a
              href="https://app.dim0.net"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              Cloud Demo
            </a>
            <a
              href="https://github.com/vcmf/dim0"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              GitHub
            </a>
            <a
              href="https://github.com/vcmf/dim0#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground"
            >
              README
            </a>
            <a
              href="https://github.com/vcmf/dim0/issues"
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
