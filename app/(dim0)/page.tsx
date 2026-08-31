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
  ChatCircleIcon,
  CheckIcon,
  CodeIcon,
  CoffeeIcon,
  CommandIcon,
  InfinityIcon,
  NotebookIcon,
  TreeStructureIcon,
  GithubLogoIcon,
  HouseIcon,
  LockKeyIcon,
  PaperclipIcon,
  PenNibIcon,
  PlayIcon,
  ShieldCheckIcon,
  SparkleIcon,
  StarIcon,
  UsersThreeIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  ChatGLM,
  Claude,
  DeepSeek,
  Gemini,
  Kimi,
  Mistral,
  OpenAI,
  Qwen,
} from "@lobehub/icons";
import Link from "next/link";
import { CollabCanvas } from "../components/collab-canvas";
import { GraphBackground } from "../components/graph-background";
import { SiteFooter, SiteNav } from "../components/site-chrome";

const APP_URL = "https://app.dim0.net/signin";
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
    window.open(APP_URL, "_blank", "noopener,noreferrer");
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
          Claude Sonnet 4.6
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
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const autoPlayed = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (v.ended || (v.duration && v.currentTime >= v.duration)) v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.75 && !autoPlayed.current) {
            autoPlayed.current = true;
            videoRef.current?.play().catch(() => {});
          }
        });
      },
      { threshold: [0, 0.5, 0.75, 1] },
    );
    obs.observe(wrap);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="hero-video-wrap" ref={wrapRef}>
      <div
        className={`hero-video-frame ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={
          playing
            ? "Pause the Dim0 tour"
            : ended
              ? "Replay the Dim0 tour"
              : "Play the Dim0 tour"
        }
      >
        <video
          ref={videoRef}
          className="hero-video"
          muted
          playsInline
          preload="metadata"
          poster="/home-screenshot-2.png"
          onPlay={() => {
            setPlaying(true);
            setEnded(false);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setEnded(true);
          }}
        >
          <source src="/compressed-full-demo-dark-theme.mp4" type="video/mp4" />
        </video>
        {!playing && (
          <div className="hero-video-poster">
            <Image
              src="/home-screenshot-2.png"
              alt="A Dim0 board with nested research, notes, code, charts, and an AI agent on one canvas"
              fill
              sizes="(max-width: 1320px) 100vw, 1320px"
              className="hero-video-poster-img"
              priority
            />
            <span className="hero-video-play">
              <PlayIcon size={26} weight="fill" />
            </span>
            <span className="hero-video-hint">
              {ended ? "Replay the tour" : "Watch the tour"}
            </span>
          </div>
        )}
      </div>
      <div className="hero-video-caption">
        <span>A real Dim0 board · everything on one canvas</span>
      </div>
      <p className="hero-video-engine">
        Rendered with <Link href="/canvas-harness">canvas-harness</Link>, our
        open-source canvas engine.
      </p>
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
          <a className="hero-badge" href={GH_URL} target="_blank" rel="noreferrer">
            <GithubLogoIcon size={12} />
            <span>Open source · MIT</span>
          </a>
          <Link className="hero-badge" href="/privacy">
            <ShieldCheckIcon size={12} />
            <span>Privacy-first</span>
          </Link>
        </div>
        <h1 className="hero-headline">
          Your canvas <em>thinks back.</em> Together.
          <span className="visually-hidden">
            {" "}The open-source, real-time collaborative AI canvas with notes, mini-apps, and agents on one infinite board.
          </span>
        </h1>
        <p className="hero-tagline">
          Notes, mini-apps, and agents on one infinite board — the AI reads your
          board <em>before</em> it acts.
        </p>
        <p className="hero-subtitle">
          Open-source, real-time collaborative. Solo or with your team.
        </p>
        <Composer />
        <div className="hero-microcopy">
          <span>AI mini-apps</span>
          <span className="hero-microcopy-sep">·</span>
          <span>Real-time collab</span>
          <span className="hero-microcopy-sep">·</span>
          <span>Open source</span>
          <span className="hero-microcopy-sep">·</span>
          <span>8 AI models</span>
        </div>
      </div>
      <HeroVideo />
    </section>
  );
}

type VsCard = {
  name: string;
  cap: string;
  gap: string;
  Icon: ComponentType<{ size?: number }>;
};

function WhySection() {
  const sources: VsCard[] = [
    { name: "Notion", cap: "Rich notes", gap: "no canvas", Icon: NotebookIcon },
    { name: "Excalidraw", cap: "Infinite canvas", gap: "no notes or AI", Icon: PenNibIcon },
    { name: "ChatGPT", cap: "AI answers", gap: "no spatial workspace", Icon: ChatCircleIcon },
  ];

  return (
    <section className="section" id="why">
      <div className="section-eyebrow">The problem</div>
      <h2 className="section-title">One idea, <em>five tabs.</em></h2>
      <p className="section-lede">
        Browse, note, sketch, ask AI, paste back. By the time you move forward, your
        thinking is spread across tools that never talk to each other. Dim0 is all
        three on one canvas — and the agent reads the whole board before it acts.
      </p>

      <div className="vs-grid">
        {sources.map((s) => (
          <div className="vs-card" key={s.name}>
            <div className="vs-card-icon"><s.Icon size={22} /></div>
            <h3 className="vs-card-name">{s.name}</h3>
            <p className="vs-card-cap">{s.cap}</p>
            <p className="vs-card-gap">but {s.gap}</p>
          </div>
        ))}
      </div>

      <div className="vs-result">
        <span className="vs-result-mark">
          <Image src="/dim0.svg" alt="" width={24} height={24} />
        </span>
        <div>
          <div className="vs-result-name">Dim0</div>
          <p className="vs-result-copy">
            All three on one surface — notes, an infinite canvas, and a board-aware
            agent. Nothing to copy-paste between, nothing that loses your context.
          </p>
        </div>
      </div>
    </section>
  );
}

type BentoSmall = {
  Icon: ComponentType<{ size?: number }>;
  title: string;
  body: string;
};

const BENTO_SMALL: BentoSmall[] = [
  {
    Icon: InfinityIcon,
    title: "Infinite canvas",
    body: "Notes, code, math, and shapes on one endless surface. Nested boards keep big projects structured without losing the view.",
  },
  {
    Icon: TreeStructureIcon,
    title: "Mapify",
    body: "Select any notes and turn them into mind maps, schemas, or diagrams in one gesture. Mapify. Drawify. Schemify.",
  },
  {
    Icon: PenNibIcon,
    title: "Freehand sketch",
    body: "Excalidraw-style shapes, flows, and system diagrams, drawn by you or generated. The agent reads them as context.",
  },
  {
    Icon: CodeIcon,
    title: "Code, charts & docs",
    body: "Sandboxed code nodes, live widgets, and uploaded documents, all connected to the thinking that produced them.",
  },
];

function CapabilitiesSection() {
  return (
    <section className="section" id="features">
      <div className="section-eyebrow">What you can do</div>
      <h2 className="section-title">
        One board. <em>Everything on it.</em>
      </h2>
      <p className="section-lede">
        Most tools bolt AI onto a doc. Dim0 is built the other way around, so the
        canvas is the interface and every kind of node lives on it.
      </p>

      <div className="bento">
        <article className="bento-card bento-big">
          <div className="bento-media">
            <Image
              src="/board-ai-benchmarks.png"
              alt="A Dim0 board where the AI agent has produced benchmark charts and annotated research as nodes"
              width={1200}
              height={760}
              sizes="(max-width: 900px) 100vw, 560px"
            />
          </div>
          <div className="bento-body">
            <div className="bento-tag">Board-aware AI</div>
            <h3 className="bento-title">Reads first. Acts second.</h3>
            <p className="bento-desc">
              The agent reads your whole board before it acts, then searches, runs
              code, and writes results back as nodes you can edit and connect.
            </p>
          </div>
        </article>

        <article className="bento-card bento-big">
          <div className="bento-media">
            <Image
              src="/mini-app.png"
              alt="An AI-generated interactive mini-app running as a node on a Dim0 canvas"
              width={1795}
              height={1933}
              sizes="(max-width: 900px) 100vw, 560px"
            />
          </div>
          <div className="bento-body">
            <div className="bento-tag">Mini-apps</div>
            <h3 className="bento-title">Spin up a little app, right on the canvas.</h3>
            <p className="bento-desc">
              Describe a calculator, chart, or quiz and Dim0 drops a real,
              interactive React app on your board, reading the notes next to it.
              Open it, edit it, export it.
            </p>
          </div>
        </article>

        <article className="bento-card bento-wide">
          <div className="bento-media">
            <LazyVideo
              src="/video-rich-canvas-notes.mp4"
              poster="/note-visual-thinking.png"
              ariaLabel="A rich Dim0 note with tags, math, toggles, and AI editing on a canvas"
            />
          </div>
          <div className="bento-body">
            <div className="bento-tag">Rich notes</div>
            <h3 className="bento-title">Notion-grade notes, drawn on the canvas.</h3>
            <p className="bento-desc">
              Tags, math, toggles, sub-pages, code, sitting wherever you put them.
              Edit by hand, or ask AI to draft and revise the note in place.
            </p>
          </div>
        </article>

        {BENTO_SMALL.map((c) => (
          <article className="bento-card bento-small" key={c.title}>
            <div className="bento-body">
              <span className="bento-icon"><c.Icon size={22} /></span>
              <h3 className="bento-title bento-title-sm">{c.title}</h3>
              <p className="bento-desc">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CollaborationSection() {
  return (
    <section className="section section-collab" id="collaboration">
      <CollabCanvas />
      <div className="collab-vignette" aria-hidden="true" />
      <div className="collab-content">
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
      </div>
    </section>
  );
}

function MidCTA() {
  return (
    <section className="mid-cta" aria-label="Start using Dim0">
      <div className="mid-cta-inner">
        <div className="mid-cta-text">
          <span className="mid-cta-title">Convinced? Start on the canvas.</span>
          <span className="mid-cta-sub">
            Free to start · nothing to set up · your data stays yours
          </span>
        </div>
        <a className="btn btn-sienna mid-cta-btn" href={APP_URL}>
          Start free <ArrowRightIcon size={14} />
        </a>
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
              <span className="theme-dots" aria-hidden="true">
                <span className="theme-dot" style={{ background: t.light.bg }} />
                <span className="theme-dot" style={{ background: t.light.accent }} />
                <span className="theme-dot" style={{ background: t.light.text }} />
                <span className="theme-dot-sep" />
                <span className="theme-dot" style={{ background: t.dark.bg }} />
                <span className="theme-dot" style={{ background: t.dark.accent }} />
                <span className="theme-dot" style={{ background: t.dark.text }} />
              </span>
              <span className="theme-card-modes">light · dark</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type ModelChip = { name: string; vendor: string; Icon: ComponentType<{ size?: number }> };

function ModelsSection() {
  const models: ModelChip[] = [
    { name: "Claude", vendor: "Anthropic", Icon: Claude.Color },
    { name: "GPT", vendor: "OpenAI", Icon: OpenAI },
    { name: "Gemini", vendor: "Google", Icon: Gemini.Color },
    { name: "Mistral", vendor: "Mistral", Icon: Mistral.Color },
    { name: "DeepSeek", vendor: "DeepSeek", Icon: DeepSeek.Color },
    { name: "Qwen", vendor: "Alibaba", Icon: Qwen.Color },
    { name: "Kimi", vendor: "Moonshot", Icon: Kimi },
    { name: "GLM", vendor: "Z.ai", Icon: ChatGLM.Color },
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
            <m.Icon size={16} />
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

const NEVERS = [
  "Train on your content",
  "Sell your data",
  "Profile you for ads",
  "Run session replay on your canvas",
  "Lock your boards in",
];

type TrustCard = {
  Icon: ComponentType<{ size?: number }>;
  title: string;
  body: string;
};

function TrustSection() {
  const cards: TrustCard[] = [
    {
      Icon: LockKeyIcon,
      title: "Encrypted, always",
      body: "TLS on the wire, at-rest encryption on the database and uploads. No plaintext on the network, none on disk.",
    },
    {
      Icon: ShieldCheckIcon,
      title: "Never trained on",
      body: "Your boards aren't training data. Prompts go only to the provider you pick, for the request you sent, and no telemetry watches your canvas.",
    },
    {
      Icon: HouseIcon,
      title: "Run it yourself",
      body: "MIT-licensed and self-hostable. Local Postgres, local vector DB, your own model keys, nothing leaves your infrastructure.",
    },
    {
      Icon: ArrowSquareOutIcon,
      title: "Take it with you",
      body: "Notes are pure Markdown, boards export cleanly. No proprietary format, no lock-in. Walk away anytime with everything.",
    },
  ];

  return (
    <section className="section" id="trust">
      <div className="section-eyebrow">Open source · Private · MIT</div>
      <h2 className="section-title">
        Yours. <em>And it stays yours.</em>
      </h2>
      <p className="section-lede">
        The codebase is public and self-hostable, and the cloud respects you the same
        way. Encrypted, never trained on, no behavioral telemetry. Walk away anytime
        with everything you made.
      </p>

      <div className="trust-grid">
        {cards.map((c) => (
          <div className="trio-card" key={c.title}>
            <div className="trio-icon"><c.Icon size={22} /></div>
            <h3 className="trio-title">{c.title}</h3>
            <p className="trio-body">{c.body}</p>
          </div>
        ))}
      </div>

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

      <div className="oss-actions">
        <a className="btn btn-ghost" href={GH_URL} target="_blank" rel="noreferrer">
          <StarIcon size={15} weight="fill" style={{ color: "var(--sidebar-icon-3)" }} /> Star on GitHub
        </a>
        <a className="btn btn-sienna" href={APP_URL}>
          Start with Dim0 Cloud <ArrowRightIcon size={14} />
        </a>
      </div>

      <p className="privacy-footnote">
        <Link className="faq-link" href="/privacy">Read the full privacy policy →</Link>
      </p>
    </section>
  );
}

type Testimonial = {
  handle: string;
  role?: string;
  quote: string;
  stars?: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    handle: "@shopiahomedesign",
    quote:
      "Placing agent output directly on the board as nodes instead of a chat sidebar is the detail that sells this. Spatial context survives, chat history doesn't.",
  },
  {
    handle: "@omribenshoham",
    quote:
      "The spatial design of this canvas is really elegant. Being able to place AI outputs directly as nodes instead of chat history is a clever insight.",
  },
  {
    handle: "@m2721",
    quote: "I am a poweruser of Miro and must say very well done :-)!",
  },
  {
    handle: "Christian Carestia",
    quote: "Great idea, definitely something missing in the market.",
  },
  {
    handle: "@erdemgulen",
    stars: 5,
    quote: "Great design and ease to use, collaboration makes it more productive.",
  },
  {
    handle: "@supahmation",
    quote: "Great product!",
  },
  {
    handle: "cerebrixos",
    quote: "Good for visualising.",
  },
  {
    handle: "Tomas Jones",
    quote:
      "The “everything on one canvas” angle is compelling, and making the AI write directly as nodes feels native rather than bolted on. Open source is a good trust signal.",
  },
  {
    handle: "lianbo zhou",
    quote:
      "The interface is beautiful and elegant. The canvas-based approach makes the tools truly useful.",
  },
  {
    handle: "@viciousse",
    stars: 5,
    quote: "I like the idea, the multiplayer and the design!",
  },
  {
    handle: "Jacky zeng",
    role: "NextJS Developer",
    quote: "This tool is very nice.",
  },
  {
    handle: "@WurtApp",
    quote: "Brilliant work right here, keep it up.",
  },
  {
    handle: "Jnanesh Bekal",
    quote: "Very good overall.",
  },
];

function TestimonialAvatar({ handle }: { handle: string }) {
  const letter = handle.replace(/^@/, "").charAt(0).toUpperCase();
  return <span className="tm-avatar" aria-hidden="true">{letter}</span>;
}

function Stars({ n }: { n: number }) {
  return (
    <span className="tm-stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <StarIcon key={i} size={12} weight="fill" />
      ))}
    </span>
  );
}

function TestimonialChip({ t }: { t: Testimonial }) {
  return (
    <figure className="tm-chip">
      {t.stars ? <Stars n={t.stars} /> : null}
      <blockquote>{t.quote}</blockquote>
      <figcaption>
        <TestimonialAvatar handle={t.handle} />
        <span className="tm-meta">
          <span className="tm-handle">{t.handle}</span>
          {t.role && <span className="tm-role">{t.role}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: Testimonial[];
  reverse?: boolean;
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="tm-row">
      <div
        className={`tm-track ${reverse ? "tm-track-rev" : ""}`}
        style={{ "--tm-dur": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((t, i) => (
          <TestimonialChip key={`${t.handle}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const row1 = TESTIMONIALS.slice(0, 7);
  const row2 = TESTIMONIALS.slice(7);
  return (
    <section className="section section-testimonials" id="testimonials">
      <div className="section-eyebrow">Loved by early users</div>
      <h2 className="section-title">What people are saying.</h2>
      <p className="section-lede">
        Real, unedited comments from public AI directories and GitHub — the detail
        people keep pointing at: AI output lands on the board as nodes, not in a
        throwaway chat thread.
      </p>

      <div className="tm-marquee">
        <MarqueeRow items={row1} duration={64} />
        <MarqueeRow items={row2} reverse duration={56} />
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
  // playful price anchor: rendered as "≈ {pre} ☕ coffee {post}"
  handNote?: { pre: string; post: string };
};

const PLANS: Plan[] = [
  {
    name: "Free",
    tagline: "For personal exploration",
    price: "€0",
    period: "forever",
    features: [
      "50 AI requests / day",
      "750 AI requests / month",
      "5 boards",
      "Up to 5 collaborators / board",
      "3 documents / board",
      "10 mini-apps / board",
      "Lite models only",
      "Community support",
    ],
    cta: { label: "Start free", href: APP_URL, variant: "sienna" },
    note: "Free is limited while we run on a small budget. We’re making it more usable over time.",
  },
  {
    name: "Basic",
    tagline: "For steady, everyday use",
    price: "€6.99",
    period: "/ month",
    features: [
      "150 AI requests / day",
      "3,000 AI requests / month",
      "Unlimited boards",
      "Up to 10 collaborators / board",
      "10 documents / board",
      "20 mini-apps / board",
      "Lite models (no top-tier AI)",
      "Standard support",
    ],
    cta: { label: "Start free", href: APP_URL, variant: "sienna" },
    handNote: { pre: "one", post: "every 2 weeks" },
  },
  {
    name: "Plus",
    tagline: "For active daily workflows",
    price: "€11.99",
    period: "/ month",
    features: [
      "Unlimited AI requests",
      "Unlimited boards",
      "Up to 20 collaborators / board",
      "25 documents / board",
      "100 mini-apps / board",
      "Frontier models: GPT, Claude, Gemini, and more",
      "Priority support",
    ],
    cta: { label: "Start free", href: APP_URL, variant: "primary" },
    note: "Upgrade any time from your account. No card needed to start.",
    featured: true,
    handNote: { pre: "one", post: "a week" },
  },
  {
    name: "Self-host",
    tagline: "Run it yourself, own everything",
    price: "Free",
    period: "MIT licensed",
    features: [
      "Full source on GitHub",
      "Your infrastructure, your data",
      "Bring your own model keys",
      "Unlimited collaborators",
      "No caps, no lock-in",
    ],
    cta: { label: "Get the code", href: GH_URL, variant: "ghost", external: true },
  },
];

function PricingSection() {
  return (
    <section className="section" id="pricing">
      <div className="section-eyebrow">Pricing</div>
      <h2 className="section-title">
        Start free. <em>Upgrade if you love it.</em>
      </h2>
      <p className="section-lede">
        Run it yourself for free, or use the cloud with nothing to set up. No card
        required to start, and you can upgrade any time from your account.
      </p>

      <p className="pricing-anchor">
        Miro, Notion, and ChatGPT on one canvas, from <strong>€6.99</strong> a month.{" "}
        <strong>Plus</strong> still costs less than a single ChatGPT Plus seat.
      </p>

      <div className="pricing-grid">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`price-card ${plan.featured ? "price-card-featured" : ""}`}
          >
            {plan.featured && <div className="price-card-tag">Most popular</div>}
            <div className="price-card-head">
              <h3 className="price-card-name">{plan.name}</h3>
              <p className="price-card-tagline">{plan.tagline}</p>
            </div>
            <div className="price-card-price-wrap">
              <div className="price-card-price">
                <span className="price-amount">{plan.price}</span>
                <span className="price-period">{plan.period}</span>
              </div>
              {plan.handNote && (
                <p className="price-hand-note">
                  ≈ {plan.handNote.pre}{" "}
                  <CoffeeIcon size={15} weight="fill" className="price-hand-icon" />{" "}
                  {plan.handNote.post}
                </p>
              )}
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
      <WhySection />
      <CapabilitiesSection />
      <CollaborationSection />
      <MidCTA />
      <ThemesSection />
      <ModelsSection />
      <TrustSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQ />
      <CTA />
    </>
  );
}
