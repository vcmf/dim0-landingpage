"use client";

import Image from "next/image";
import {
  type ComponentType,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ArrowRightIcon,
  ArrowSquareOutIcon,
  ArrowUpIcon,
  ArrowsClockwiseIcon,
  AtIcon,
  CaretDownIcon,
  CheckIcon,
  CommandIcon,
  EyeIcon,
  EyeSlashIcon,
  GithubLogoIcon,
  GraphIcon,
  HouseIcon,
  LockKeyIcon,
  MagnifyingGlassIcon,
  PaperclipIcon,
  PenNibIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UsersThreeIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { GraphBackground } from "../components/graph-background";
import {
  ArtAgent,
  ArtFragmentation,
  ArtGesture,
  ArtMedia,
  ArtSpatial,
} from "../components/illustrations";
import { SiteFooter, SiteNav } from "../components/site-chrome";

const APP_URL = "https://app.dim0.net";
const GH_URL = "https://github.com/vcmf/dim0";

const PROMPTS = [
  "Explain how nuclear fusion works",
  "Map the major schools of Greek philosophy",
  "Create a visual explainer on how a transformer learns",
  "Show me a chart of CO₂ since 1850",
  "What caused the fall of the Roman Empire",
  "How do mRNA vaccines actually work",
  "Compare V-JEPA 2.1 against state-of-the-art",
  "Sketch the architecture of a rate-limited API",
];

function useTypewriter(prompts: string[], paused: boolean) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (paused) return;
    const target = prompts[idx];
    let t: ReturnType<typeof setTimeout> | undefined;
    if (phase === "typing") {
      if (text.length < target.length) {
        const delay = 32 + Math.random() * 55;
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), delay);
      } else {
        t = setTimeout(() => setPhase("holding"), 1500);
      }
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), 900);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        t = setTimeout(() => setText(text.slice(0, -1)), 18);
      } else {
        setIdx((i) => (i + 1) % prompts.length);
        setPhase("typing");
      }
    }
    return () => {
      if (t) clearTimeout(t);
    };
  }, [text, phase, idx, prompts, paused]);

  return text;
}

function Composer({ size = "default" }: { size?: "default" | "large" }) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const prompts = useMemo(() => PROMPTS, []);
  const paused = focused || value.length > 0;
  const typewriter = useTypewriter(prompts, paused);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submit = (e?: FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    const q = value.trim();
    const url = q ? `${APP_URL}/?q=${encodeURIComponent(q)}` : APP_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const showPlaceholder = !focused && value.length === 0;

  return (
    <form
      className={`composer composer-form ${size === "large" ? "composer-large" : ""}`}
      onSubmit={submit}
    >
      <div className="composer-steps">
        <span className="check"><CheckIcon size={8} weight="bold" /></span>
        <span>1 step</span>
        <span className="sep">·</span>
        <span>search the web</span>
        <span className="sep" style={{ marginLeft: "auto" }}>steps</span>
        <CaretDownIcon size={10} style={{ color: "var(--muted-foreground)" }} />
      </div>
      <div className="composer-input-row">
        <div className="composer-chip"><SparkleIcon size={15} weight="bold" /></div>
        <span className="composer-context">@board</span>
        <div className="composer-input-wrap">
          <input
            ref={inputRef}
            className="composer-input-real"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder=""
            aria-label="Ask anything"
            spellCheck={false}
            autoComplete="off"
          />
          {showPlaceholder && (
            <div className="composer-typewriter" aria-hidden="true">
              <span className="tw-text">{typewriter}</span>
              <span className="tw-caret">_</span>
            </div>
          )}
        </div>
      </div>
      <div className="composer-actions">
        <button type="button" className="composer-btn" title="Attach" tabIndex={-1}><PaperclipIcon size={14} /></button>
        <button type="button" className="composer-btn" title="Mention" tabIndex={-1}><AtIcon size={14} /></button>
        <button type="button" className="composer-btn" title="Slash command" tabIndex={-1}><CommandIcon size={14} /></button>
        <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 11 }}>
          Claude Sonnet 4.5
        </span>
        <CaretDownIcon size={9} style={{ marginLeft: 2 }} />
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span className="mono" style={{ fontSize: 10.5 }}>⌘↵</span>
          <button type="submit" className="composer-send" title="Open Dim0">
            <ArrowUpIcon size={14} weight="bold" />
          </button>
        </div>
      </div>
    </form>
  );
}

function HeroVideo() {
  return (
    <div className="hero-video-wrap">
      <div className="hero-video-frame">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/board-mindmap-deaging.png"
          aria-label="A walkthrough of Dim0: notes, mini-apps, sketches, and an AI agent working together on one canvas."
        >
          <source src="/compressed-full-demo-dark-theme.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-video-caption">
        <span className="hero-video-dot" />
        <span>A quick tour · everything on one canvas</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <GraphBackground />
      <div className="hero-vignette" />
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="dot" />
          <span>Dim0 · the thinking canvas</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <a
            href={GH_URL}
            target="_blank"
            rel="noreferrer"
            className="hero-eyebrow-link"
          >
            <GithubLogoIcon size={11} />
            <span className="mono">MIT · v0.3 · privacy-first</span>
          </a>
        </div>
        <h1 className="hero-headline">
          Your canvas <em>thinks back.</em> Together.
          <span className="visually-hidden">
            {" "}The open-source, real-time collaborative AI canvas with notes, mini-apps, and agents on one infinite board.
          </span>
        </h1>
        <p className="hero-tagline">
          Notes, mini-apps, and agents on one infinite board.
        </p>
        <p className="hero-subtitle">
          Open-source, real-time collaborative. Solo or with your team.
        </p>
        <Composer />
        <div className="hero-microcopy">
          <span className="hero-microcopy-dot" />
          <span>AI mini-apps</span>
          <span className="hero-microcopy-sep">·</span>
          <span>Real-time collab</span>
          <span className="hero-microcopy-sep">·</span>
          <span>Open source</span>
          <span className="hero-microcopy-sep">·</span>
          <span>8 AI models</span>
        </div>
        <HeroVideo />
      </div>
    </section>
  );
}

function ProductShot() {
  return (
    <section className="product-shot-section" id="product">
      <div className="product-shot-eyebrow">
        <span>A real Dim0 board</span>
      </div>
      <a
        className="product-shot-frame"
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Dim0"
      >
        <Image
          src="/home-screenshot-2.png"
          alt="A Dim0 board showing nested research, sticky notes, code, charts, and an AI agent panel"
          className="product-shot-img"
          width={1919}
          height={974}
          sizes="(max-width: 1240px) 100vw, 1240px"
        />
        <span className="product-shot-tag">
          <span className="product-shot-dot" />
          <span>Open in</span>
          <span className="mono">app.dim0.net</span>
        </span>
      </a>
      <p className="product-shot-caption">
        Sticky notes, code, mini-apps, math, charts, sketches, and an AI agent. All on one board.
      </p>
      <p className="product-shot-engine">
        Rendered with <a href="/canvas-harness">canvas-harness</a>, our open-source canvas engine.
      </p>
    </section>
  );
}

function WhySection() {
  return (
    <section className="section" id="why">
      <div className="section-eyebrow">The problem</div>
      <h2 className="section-title">One idea, five tabs.</h2>
      <p className="section-lede">
        Browse, note, sketch, ask AI, paste back. By the time you move forward, your thinking is spread across tools that never talk to each other.
      </p>
      <div className="fragment-hero">
        <ArtFragmentation />
      </div>
    </section>
  );
}

function HowSection() {
  return (
    <section className="section" id="how">
      <div className="section-eyebrow">How it works</div>
      <h2 className="section-title">One prompt, work on the canvas.</h2>
      <p className="section-lede">
        The agent reads what&apos;s on your board, goes out and does the work, and drops the result where you&apos;re already thinking.
      </p>

      <div className="steps">
        <div className="step">
          <div className="step-num">01 · Read</div>
          <div className="step-icon"><GraphIcon size={20} /></div>
          <h3 className="step-title">Reads the board</h3>
          <p className="step-body">Starts from your actual workspace, not a blank chat thread.</p>
        </div>
        <div className="step">
          <div className="step-num">02 · Act</div>
          <div className="step-icon"><MagnifyingGlassIcon size={20} /></div>
          <h3 className="step-title">Searches, synthesizes, runs code</h3>
          <p className="step-body">Parallel reasoning across sources. No tab switching.</p>
        </div>
        <div className="step">
          <div className="step-num">03 · Write</div>
          <div className="step-icon"><PenNibIcon size={20} /></div>
          <h3 className="step-title">Builds on your board</h3>
          <p className="step-body">Nodes appear next to your notes. Editable, connected, live.</p>
        </div>
      </div>
    </section>
  );
}

type Pillar = {
  tag: string;
  title: string;
  body: string;
  Art: ComponentType;
};

function FeaturesSection() {
  const pillars: Pillar[] = [
    {
      tag: "Infinite canvas",
      title: "Thinking, laid out in space.",
      body: "Notes, code, math, and shapes on one infinite canvas. Nested boards keep big projects structured without losing the view.",
      Art: ArtSpatial,
    },
    {
      tag: "Mapify",
      title: "Notes become structure.",
      body: "Select any notes and turn them into mind maps, schemas, or diagrams in one gesture. Mapify. Drawify. Schemify.",
      Art: ArtGesture,
    },
    {
      tag: "Board-aware AI",
      title: "Reads first. Acts second.",
      body: "The agent reads your board before it acts. Searches, runs code, writes results back as nodes you can edit and connect.",
      Art: ArtAgent,
    },
    {
      tag: "Code, charts, docs",
      title: "Every kind of node, one canvas.",
      body: "Sandboxed code nodes. Live widgets. Uploaded documents. Everything stays connected to the thinking that produced it.",
      Art: ArtMedia,
    },
  ];

  return (
    <section className="section" id="features">
      <div className="section-eyebrow">Features</div>
      <h2 className="section-title">Built canvas-first. Agent native.</h2>
      <p className="section-lede">
        Most tools bolt AI onto a doc. Dim0 is built the other way around — the canvas is the interface.
      </p>

      <div className="pillars">
        {pillars.map((p) => (
          <article className="pillar" key={p.tag}>
            <div className="pillar-art"><p.Art /></div>
            <div className="pillar-tag">
              <span className="bar" /> {p.tag}
            </div>
            <h3 className="pillar-title">{p.title}</h3>
            <p className="pillar-body">{p.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const MINIAPP_EXAMPLES = [
  "a tip calculator",
  "a chart from your data",
  "a sorting visualizer",
  "a flashcard quiz",
  "a regex tester",
  "a pros & cons weigher",
];

function MiniAppsShowcase() {
  return (
    <section className="section section-narrow" id="mini-apps">
      <div className="section-eyebrow">Mini-apps</div>
      <h2 className="section-title">
        Spin up a <em>little app.</em> Right on the canvas.
      </h2>
      <p className="section-lede">
        Describe a calculator, a chart, a visualizer, a quiz — Dim0 conjures a
        real, interactive app and drops it on your board in seconds. Focused,
        instant, and wired to the notes around it. Made to think with, not to ship.
      </p>

      <div className="miniapp-layout">
        <div className="miniapp-copy">
          <ul className="miniapp-points">
            <li>
              <span className="miniapp-mark" />
              Lives on the board, not buried in a chat thread.
            </li>
            <li>
              <span className="miniapp-mark" />
              Reads the notes and data sitting right next to it.
            </li>
            <li>
              <span className="miniapp-mark" />
              Your whole team uses it live, on the same board.
            </li>
            <li>
              <span className="miniapp-mark" />
              Real React: open it, edit it, export it.
            </li>
          </ul>

          <div className="miniapp-chips">
            {MINIAPP_EXAMPLES.map((ex) => (
              <span className="miniapp-chip" key={ex}>
                <span className="miniapp-chip-caret">›</span> {ex}
              </span>
            ))}
          </div>

          <p className="miniapp-note">
            Best for focused, single-purpose tools. Spun up in seconds, as fast
            as a sentence.
          </p>
        </div>

        <div className="miniapp-shot">
          <Image
            src="/mini-app.png"
            alt="An AI-generated interactive mini-app running as a node on a Dim0 canvas"
            width={1795}
            height={1933}
            sizes="(max-width: 820px) 100vw, 460px"
          />
        </div>
      </div>
    </section>
  );
}

function CollaborationSection() {
  return (
    <section className="section section-narrow" id="collaboration">
      <div className="section-eyebrow">Collaboration</div>
      <h2 className="section-title">
        Now <em>multiplayer.</em>
      </h2>
      <p className="section-lede">
        Bring your team onto the same board. Real-time cursors, shared agents, edits that
        sync without merge conflicts. The canvas works the same for one person or fifty.
        It&apos;s the open-source Miro alternative you can actually run yourself.
      </p>

      <div className="trio">
        <div className="trio-card">
          <div className="trio-icon"><UsersThreeIcon size={22} /></div>
          <h3 className="trio-title">Live cursors & presence</h3>
          <p className="trio-body">
            See who&apos;s on the board, what they&apos;re selecting, where they&apos;re
            looking. Names, avatars, colors. The room feels alive.
          </p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><SparkleIcon size={22} /></div>
          <h3 className="trio-title">Shared agents</h3>
          <p className="trio-body">
            One person prompts, everyone watches the agent build, anyone refines. The
            board-aware AI works for the room, not just the prompter.
          </p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><ArrowsClockwiseIcon size={22} /></div>
          <h3 className="trio-title">No merge conflicts</h3>
          <p className="trio-body">
            Two people can edit the same note or shape at the same time. Operational
            transforms with last-write-wins, the same approach Figma and Excalidraw use.
            No refresh dance, no &quot;reload to see changes&quot;.
          </p>
        </div>
      </div>
    </section>
  );
}

function LazyVideo({
  src,
  poster,
  ariaLabel,
}: {
  src: string;
  poster: string;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (!("IntersectionObserver" in window)) {
      v.play().catch(() => {});
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(v);
    return () => observer.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-label={ariaLabel}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function RichNotesShowcase() {
  return (
    <section className="section section-narrow" id="rich-notes">
      <div className="section-eyebrow">Rich notes</div>
      <h2 className="section-title">Notion-grade notes. Drawn on a canvas.</h2>
      <p className="section-lede">
        Tags, math, toggles, sub-pages, references, code. Edit by hand, or ask AI to draft and revise the note in place.
      </p>
      <div className="rich-video-frame">
        <LazyVideo
          src="/video-rich-canvas-notes.mp4"
          poster="/note-visual-thinking.png"
          ariaLabel="A rich Dim0 note with tags, math, toggles, and AI editing on a canvas"
        />
      </div>
    </section>
  );
}

type UseCase = {
  tag: string;
  title: string;
  body: string;
  img: string;
  alt: string;
};

function UseCasesSection() {
  const cases: UseCase[] = [
    {
      tag: "Learn",
      title: "Turn a question into a map you can walk.",
      body: "Ask anything. The AI mindmap generator builds a structured map on your canvas. Follow threads, keep your map, never lose where you were.",
      img: "/board-mindmap-deaging.png",
      alt: "AI-generated mindmap on a Dim0 board — branching topics about brain aging research, connected sticky notes, and explorable subtopics on one infinite canvas",
    },
    {
      tag: "Research",
      title: "Pull benchmarks. Chart them. Annotate.",
      body: "Bring sources, run code, render charts. Compare results side by side without juggling tabs.",
      img: "/board-ai-benchmarks.png",
      alt: "Dim0 collaborative AI canvas showing model benchmark charts, comparison tables, and annotated research notes arranged side by side",
    },
    {
      tag: "Sketch",
      title: "Rough shapes that the AI understands.",
      body: "Excalidraw-style freehand shapes, system diagrams, flows, drawn by you or generated. The agent reads them as context.",
      img: "/board-api-architecture.png",
      alt: "Hand-drawn API architecture diagram on a Dim0 board — Excalidraw-style freehand shapes, system flows, and components the AI agent can read as context",
    },
    {
      tag: "Write",
      title: "Long-form notes, spatially arranged.",
      body: "Notion-grade rich notes (math, code, tags, toggles, sub-pages) sitting wherever you put them on the board.",
      img: "/note-visual-thinking.png",
      alt: "Long-form rich notes on a Dim0 board — Notion-grade text with code blocks, math, tags, and sub-pages arranged spatially across the canvas",
    },
  ];

  return (
    <section className="section" id="use-cases">
      <div className="section-eyebrow">Use cases</div>
      <h2 className="section-title">What it feels like to think on Dim0.</h2>
      <p className="section-lede">
        Four shapes of work that get faster the moment your tools share a canvas.
      </p>
      <div className="use-cases">
        {cases.map((c) => (
          <article className="use-case" key={c.tag}>
            <div className="use-case-img">
              <Image
                src={c.img}
                alt={c.alt}
                width={1200}
                height={760}
                sizes="(max-width: 820px) 100vw, 540px"
              />
            </div>
            <div className="use-case-tag">
              <span className="bar" /> {c.tag}
            </div>
            <h3 className="use-case-title">{c.title}</h3>
            <p className="use-case-body">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

type ThemePalette = {
  bg: string;
  surface: string;
  text: string;
  accent: string;
  border: string;
};

type Theme = {
  name: string;
  light: ThemePalette;
  dark: ThemePalette;
};

const THEMES: Theme[] = [
  {
    name: "Parchment",
    light: { bg: "#f5efe6", surface: "#fff9ef", text: "#3a2e23", accent: "#c66b3a", border: "#e2d5c0" },
    dark:  { bg: "#2b231b", surface: "#3b2f25", text: "#efe0c8", accent: "#d97548", border: "#4a3c30" },
  },
  {
    name: "Matcha",
    light: { bg: "#f8f5ec", surface: "#fcfaf3", text: "#293027", accent: "#357a3a", border: "#d8d8cf" },
    dark:  { bg: "#1d241e", surface: "#28302a", text: "#e3e2d9", accent: "#9ecd8e", border: "#434a44" },
  },
  {
    name: "Noir",
    light: { bg: "#f6f7f8", surface: "#fbfcfc", text: "#191b1c", accent: "#a34945", border: "#d9dbdd" },
    dark:  { bg: "#202224", surface: "#2d2e30", text: "#e7e8ea", accent: "#b14e49", border: "#46484a" },
  },
  {
    name: "Catppuccin",
    light: { bg: "#eff1f5", surface: "#e6e9ef", text: "#4c4f69", accent: "#8839ef", border: "#dce0e8" },
    dark:  { bg: "#1e1e2e", surface: "#313244", text: "#cdd6f4", accent: "#cba6f7", border: "#45475a" },
  },
  {
    name: "Tokyo Night",
    light: { bg: "#d5d6db", surface: "#cbccd1", text: "#343b58", accent: "#34548a", border: "#b7c5d3" },
    dark:  { bg: "#1a1b26", surface: "#24283b", text: "#c0caf5", accent: "#7aa2f7", border: "#414868" },
  },
  {
    name: "Gruvbox",
    light: { bg: "#fbf1c7", surface: "#ebdbb2", text: "#3c3836", accent: "#d65d0e", border: "#d5c4a1" },
    dark:  { bg: "#282828", surface: "#3c3836", text: "#ebdbb2", accent: "#fe8019", border: "#504945" },
  },
  {
    name: "Monokai Pro",
    light: { bg: "#fafafa", surface: "#f0eee6", text: "#2c292d", accent: "#ff6188", border: "#dfdbd2" },
    dark:  { bg: "#2d2a2e", surface: "#403e41", text: "#fcfcfa", accent: "#ff6188", border: "#5b595c" },
  },
  {
    name: "Rosé Pine",
    light: { bg: "#faf4ed", surface: "#f2e9e1", text: "#575279", accent: "#b4637a", border: "#dfdad9" },
    dark:  { bg: "#232136", surface: "#2a273f", text: "#e0def4", accent: "#ea9a97", border: "#393552" },
  },
];

function ThemeMockup({ palette }: { palette: ThemePalette }) {
  const style = {
    "--th-bg": palette.bg,
    "--th-surface": palette.surface,
    "--th-text": palette.text,
    "--th-accent": palette.accent,
    "--th-border": palette.border,
  } as React.CSSProperties;
  return (
    <div className="theme-half" style={style}>
      <div className="theme-mock-card">
        <span className="theme-mock-dot" />
        <span className="theme-mock-bar" />
        <span className="theme-mock-bar theme-mock-bar-short" />
      </div>
    </div>
  );
}

function ThemesSection() {
  return (
    <section className="section" id="themes">
      <div className="section-eyebrow">Themes</div>
      <h2 className="section-title">Eight themes. Light and dark.</h2>
      <p className="section-lede">
        Parchment, Matcha, Noir, Catppuccin, Tokyo Night, Gruvbox, Monokai Pro, Rosé Pine. Pick the one that makes you want to open the app.
      </p>
      <div className="themes-grid">
        {THEMES.map((t) => (
          <article className="theme-card" key={t.name}>
            <div className="theme-preview">
              <ThemeMockup palette={t.light} />
              <ThemeMockup palette={t.dark} />
            </div>
            <div className="theme-card-meta">
              <span className="theme-card-name">{t.name}</span>
              <span className="theme-card-modes">light · dark</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ModelsSection() {
  const models = [
    { name: "Claude", vendor: "Anthropic", c: "var(--sidebar-icon-3)" },
    { name: "GPT", vendor: "OpenAI", c: "var(--sidebar-icon-2)" },
    { name: "Gemini", vendor: "Google", c: "var(--sidebar-icon-1)" },
    { name: "Mistral", vendor: "Mistral", c: "var(--sidebar-icon-4)" },
    { name: "DeepSeek", vendor: "DeepSeek", c: "var(--sidebar-icon-1)" },
    { name: "Qwen", vendor: "Alibaba", c: "var(--sidebar-icon-3)" },
    { name: "Kimi", vendor: "Moonshot", c: "var(--sidebar-icon-2)" },
    { name: "GLM", vendor: "Z.ai", c: "var(--sidebar-icon-4)" },
  ];

  return (
    <section className="section section-narrow" id="models">
      <div className="section-eyebrow">Models</div>
      <h2 className="section-title">Your model. Your choice.</h2>
      <p className="section-lede">
        Bring whichever you trust. Switch as the landscape shifts. The workflow stays the same.
      </p>
      <div className="models">
        {models.map((m) => (
          <span key={m.name} className="model-chip">
            <span className="dot" style={{ background: m.c }} />
            {m.name} <span style={{ color: "var(--border)" }}>·</span>
            <span style={{ color: "color-mix(in oklab, var(--muted-foreground) 80%, transparent)" }}>
              {m.vendor}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}

function OssSection() {
  return (
    <section className="section section-narrow">
      <div className="section-eyebrow">Open source · MIT · self-hostable</div>
      <h2 className="section-title">Nothing is trapped.</h2>
      <p className="section-lede">
        An open-source AI whiteboard you can self-host. The codebase is public. Run it yourself. Walk away anytime with everything you made.
      </p>

      <div className="trio">
        <div className="trio-card">
          <div className="trio-icon"><EyeIcon size={22} /></div>
          <h3 className="trio-title">See how it works</h3>
          <p className="trio-body">Full codebase is public. No black boxes.</p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><HouseIcon size={22} /></div>
          <h3 className="trio-title">Run it yourself</h3>
          <p className="trio-body">Self-host for full control over your data.</p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><ArrowSquareOutIcon size={22} /></div>
          <h3 className="trio-title">Take it with you</h3>
          <p className="trio-body">Notes are pure Markdown. Boards export cleanly. No proprietary format.</p>
        </div>
      </div>

      <div className="oss-actions">
        <a className="btn btn-ghost" href={GH_URL} target="_blank" rel="noreferrer">
          <GithubLogoIcon size={15} /> View on GitHub
        </a>
        <a className="btn btn-sienna" href={APP_URL}>
          Start with Dim0 Cloud <ArrowRightIcon size={14} />
        </a>
      </div>
    </section>
  );
}

type PlanFeature = string;
type Plan = {
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: PlanFeature[];
  cta: { label: string; href: string; variant: "ghost" | "primary" | "sienna"; external?: boolean };
  note?: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Self-host",
    tagline: "Run it yourself, own everything",
    price: "Free",
    period: "MIT licensed",
    features: [
      "Full source on GitHub",
      "Your infrastructure, your data",
      "Bring your own model keys",
      "Notes in plain Markdown",
      "Unlimited live collaborators",
      "No caps, no lock-in",
    ],
    cta: { label: "Get the code", href: GH_URL, variant: "ghost", external: true },
  },
  {
    name: "Free",
    tagline: "For personal exploration",
    price: "€0",
    period: "forever",
    features: [
      "40 AI requests / day",
      "5 boards",
      "Up to 5 live collaborators / board",
      "1 document upload / board",
      "Basic AI actions + a few mini-apps",
      "Community support",
    ],
    cta: { label: "Start free", href: APP_URL, variant: "primary" },
    note: "Free is limited while we run on a small budget. We’re making it more usable over time.",
    featured: true,
  },
  {
    name: "Plus",
    tagline: "For active daily workflows",
    price: "€11.99",
    period: "/ month",
    features: [
      "Unlimited AI requests",
      "Unlimited boards",
      "Up to 20 live collaborators / board",
      "Unlimited document uploads",
      "Unlimited mini-apps",
      "Frontier models: GPT, Claude, Gemini, and more",
      "Priority support",
    ],
    cta: { label: "Start free", href: APP_URL, variant: "sienna" },
    note: "Upgrade any time from your account. No card needed to start.",
  },
];

function PricingSection() {
  return (
    <section className="section section-narrow" id="pricing">
      <div className="section-eyebrow">Pricing</div>
      <h2 className="section-title">
        Start free. <em>Upgrade if you love it.</em>
      </h2>
      <p className="section-lede">
        Run it yourself for free, or use the cloud with nothing to set up. No card
        required to start, and you can upgrade any time from your account.
      </p>

      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`price-card ${plan.featured ? "price-card-featured" : ""}`}
          >
            {plan.featured && <div className="price-card-tag">Start here</div>}
            <div className="price-card-head">
              <h3 className="price-card-name">{plan.name}</h3>
              <p className="price-card-tagline">{plan.tagline}</p>
            </div>
            <div className="price-card-price">
              <span className="price-amount">{plan.price}</span>
              <span className="price-period">{plan.period}</span>
            </div>
            <ul className="price-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <CheckIcon className="price-check" size={14} weight="bold" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <a
              className={`btn btn-${plan.cta.variant} price-cta`}
              href={plan.cta.href}
              {...(plan.cta.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {plan.cta.variant === "ghost" && <GithubLogoIcon size={15} />}
              {plan.cta.label}
              {plan.cta.variant !== "ghost" && <ArrowRightIcon size={14} />}
            </a>
            {plan.note && <p className="price-note">{plan.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

const NEVERS = [
  "Train on your content",
  "Sell your data",
  "Profile you for ads",
  "Run session replay on your canvas",
  "Lock your boards in",
];

function PrivacySection() {
  return (
    <section className="section section-narrow" id="privacy">
      <div className="section-eyebrow">Privacy</div>
      <h2 className="section-title">
        Your data <em>stays yours.</em>
      </h2>
      <p className="section-lede">
        Cloud Dim0 is private by design, not just because you can self-host. Encrypted in
        transit and at rest, never trained on, no behavioral telemetry. The hosted product
        respects you the same way the open-source code does.
      </p>

      <div className="trio">
        <div className="trio-card">
          <div className="trio-icon"><LockKeyIcon size={22} /></div>
          <h3 className="trio-title">Encrypted in transit and at rest</h3>
          <p className="trio-body">
            TLS for everything on the wire. At-rest encryption on the database and uploads.
            No plaintext on the network, no plaintext on disk.
          </p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><ShieldCheckIcon size={22} /></div>
          <h3 className="trio-title">Never trained on</h3>
          <p className="trio-body">
            Your boards are not training data. We don&apos;t use your content to train
            models, ours or anyone else&apos;s. Prompts go only to the provider you pick,
            for the request you sent.
          </p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><EyeSlashIcon size={22} /></div>
          <h3 className="trio-title">No telemetry, no profile</h3>
          <p className="trio-body">
            No session replay, no behavioral analytics inside the canvas, no record of what
            you click or where you linger. We make a thinking tool, not an ad business.
          </p>
        </div>
      </div>

      <p className="privacy-footnote">
        Want absolute custody? Dim0 is MIT and self-hostable: local Postgres, local vector
        DB, your own model keys, nothing leaves your infrastructure.{" "}
        <Link className="faq-link" href="/privacy">Read the full policy →</Link>
      </p>

      <div className="never-strip">
        <div className="never-strip-eyebrow">What Dim0 will never do</div>
        <ul className="never-strip-list">
          {NEVERS.map((n) => (
            <li key={n}>
              <span className="never-icon"><XIcon size={11} weight="bold" /></span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "What is Dim0, exactly?",
    a: "A thinking canvas where notes, docs, code, widgets, and AI agents live on one board together. Rich notes like Notion, freehand shapes like Excalidraw, agents that act on the board, all on the same surface.",
  },
  {
    q: "Is Dim0 a Notion or Excalidraw alternative?",
    a: "Yes. Dim0 is a Notion alternative and an Excalidraw alternative on one canvas, with a board-aware AI agent on top. Notion has rich notes but no canvas. Excalidraw has a canvas but no notes or AI. ChatGPT Canvas has AI but no spatial workspace. Dim0 has all three on one board, and the agent reads the surrounding context before it acts.",
  },
  {
    q: "Is it free?",
    a: "Yes, free to use during early access at app.dim0.net. The product is also open source: fork it, self-host it, bring your own model keys.",
  },
  {
    q: "Is it open source?",
    a: "Yes. Inspect it, fork it, self-host it. It’s all on GitHub.",
  },
  {
    q: "Which AI models?",
    a: "Claude, GPT, Gemini, Mistral, DeepSeek, Qwen, Kimi, GLM. Pick what you trust; switch anytime.",
  },
  {
    q: "Can I collaborate with others in real time?",
    a: "Yes. Real-time multi-user collaboration is live: live cursors, presence, edits that sync without merge conflicts, and shared AI agents that work on the same board. Bring your team or work solo; the canvas works the same either way.",
  },
  {
    q: "How does real-time collaboration work under the hood?",
    a: "Operational transforms with last-write-wins for conflicts, the same approach Figma and Excalidraw use, not CRDT. Every edit becomes a typed operation, transformed against any concurrent edits, applied on the server, then broadcast to everyone live on the board. The canvas engine underneath (canvas-harness) is sync-agnostic: it exposes typed ops with previous-value slices, so OT, CRDT, or any custom protocol all fit.",
  },
  {
    q: "Is there a desktop or mobile app?",
    a: "Dim0 runs in the browser today. Tablets work well; phones are read-friendly. Native apps may follow.",
  },
  {
    q: "Why canvas-first instead of chat-first?",
    a: "Complex thinking is spatial. A canvas keeps structure, relationships, and partial ideas visible at once. Chat buries context.",
  },
  {
    q: "What can the agent actually do?",
    a: "Read selected context, search the web, run code, and generate nodes, widgets, charts, or summaries directly on the board.",
  },
  {
    q: "Can Dim0 generate interactive apps, like ChatGPT apps or Claude artifacts?",
    a: "Yes, we call them mini-apps. Describe what you want and Dim0 generates a real, interactive React app right on your canvas. Unlike an artifact trapped in a chat thread, a mini-app is a node on your board: it persists, your team can use it live, it can read the notes and data next to it, and you can open the code, edit it, or export it. They work best as focused, single-purpose tools like calculators, charts, visualizers, and quizzes, spun up in seconds.",
  },
  {
    q: "How big can boards get?",
    a: (
      <>
        Thousands. We built our own canvas engine,{" "}
        <a className="faq-link" href="/canvas-harness">canvas-harness</a>: 10k
        visible nodes pan at ~80 fps on an M1, idle stays at ~120 fps. Same league as
        Excalidraw and tldraw. Most boards live in the hundreds; the ceiling is there
        if you need it.
      </>
    ),
  },
  {
    q: "How is my data used?",
    a: "On the cloud at app.dim0.net: prompts and board context are sent only to the model provider that produces the answer (Anthropic, OpenAI, Google, etc.) under their terms. We don’t train on your content, we don’t sell data, we don’t profile you for ads, and we run no behavioral telemetry on your boards. Self-host: everything stays on your infrastructure. Local Postgres and vector DB, your own model keys, no calls back to us.",
  },
  {
    q: "What format are my notes stored in?",
    a: "Pure Markdown. Download any note and paste it into any other editor: Obsidian, VS Code, plain text. Boards export cleanly too. No proprietary blocks, no vendor format you can’t walk away from.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-narrow" id="faq">
      <div className="section-eyebrow">FAQ</div>
      <h2 className="section-title">Questions, short answers.</h2>

      <div className="faq-list">
        {FAQS.map((f, i) => (
          <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
            <button
              className="faq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>{f.q}</span>
              <CaretDownIcon className="chev" size={14} />
            </button>
            <div className="faq-a">{f.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="cta">
      <div className="cta-canvas">
        <div className="cta-canvas-grid" aria-hidden="true" />
        <div className="cta-canvas-floats" aria-hidden="true">
          <span className="cta-canvas-float cta-canvas-float-a">phase transitions</span>
          <span className="cta-canvas-float cta-canvas-float-b">#mindmap</span>
          <span className="cta-canvas-float cta-canvas-float-c">sources</span>
          <span className="cta-canvas-float cta-canvas-float-d">def solve()</span>
        </div>
        <div className="cta-canvas-inner">
          <div className="cta-canvas-line">
            <span className="cta-canvas-text">Your turn</span>
            <span className="cta-canvas-caret" aria-hidden="true">_</span>
          </div>
          <div className="cta-canvas-composer">
            <Composer size="large" />
          </div>
          <div className="cta-canvas-hint">
            <span className="cta-canvas-dot" />
            <span>Free to start</span>
            <span className="cta-canvas-sep">·</span>
            <span>Open source</span>
            <span className="cta-canvas-sep">·</span>
            <span>Your data stays yours</span>
            <span className="cta-canvas-sep">·</span>
            <span className="mono">app.dim0.net</span>
          </div>
        </div>
      </div>
      <SiteFooter />
    </section>
  );
}

export default function Page() {
  return (
    <>
      <SiteNav />
      <Hero />
      <ProductShot />
      <WhySection />
      <HowSection />
      <FeaturesSection />
      <MiniAppsShowcase />
      <CollaborationSection />
      <RichNotesShowcase />
      <UseCasesSection />
      <ThemesSection />
      <ModelsSection />
      <PrivacySection />
      <OssSection />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}
