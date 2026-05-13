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
  AtIcon,
  CaretDownIcon,
  CheckIcon,
  CommandIcon,
  EyeIcon,
  GithubLogoIcon,
  GraphIcon,
  HouseIcon,
  LockKeyIcon,
  MagnifyingGlassIcon,
  PaperclipIcon,
  PenNibIcon,
  ShieldCheckIcon,
  SparkleIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { GraphBackground } from "./components/graph-background";
import {
  ArtAgent,
  ArtFragmentation,
  ArtGesture,
  ArtMedia,
  ArtSpatial,
} from "./components/illustrations";
import { SiteFooter, SiteNav } from "./components/site-chrome";

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
          aria-label="A user asks a question on the Dim0 canvas; the agent answers with a mindmap."
        >
          <source src="/video-query-to-mindmap.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-video-caption">
        <span className="hero-video-dot" />
        <span>Ask a question · the agent builds a mindmap right on your canvas</span>
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
          Your canvas <em>thinks back.</em>
        </h1>
        <p className="hero-subtitle">
          An infinite canvas where notes, sketches, code, and AI agents work together on one board.
        </p>
        <Composer />
        <div className="hero-microcopy">
          <span className="hero-microcopy-dot" />
          <span>Free to start</span>
          <span className="hero-microcopy-sep">·</span>
          <span>No training on your work</span>
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
        <span>— A real Dim0 board</span>
      </div>
      <a
        className="product-shot-frame"
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Dim0"
      >
        <Image
          src="/board-worldmodel-light.png"
          alt="A Dim0 board showing nested research, sticky notes, code, charts, and an AI agent panel"
          className="product-shot-img"
          width={2400}
          height={1500}
          sizes="(max-width: 1240px) 100vw, 1240px"
        />
        <span className="product-shot-tag">
          <span className="product-shot-dot" />
          <span>Open in</span>
          <span className="mono">app.dim0.net</span>
        </span>
      </a>
      <p className="product-shot-caption">
        Sticky notes, code, math, charts, sketches, and an AI agent — all on one board.
      </p>
    </section>
  );
}

function WhySection() {
  return (
    <section className="section" id="why">
      <div className="section-eyebrow">— The problem</div>
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
      <div className="section-eyebrow">— How it works</div>
      <h2 className="section-title">One prompt, work on the canvas.</h2>
      <p className="section-lede">
        The agent reads what&apos;s on your board, goes out and does the work, and drops the result where you&apos;re already thinking.
      </p>

      <div className="steps">
        <div className="step">
          <div className="step-num">01 · READ</div>
          <div className="step-icon"><GraphIcon size={20} /></div>
          <h3 className="step-title">Reads the board</h3>
          <p className="step-body">Starts from your actual workspace, not a blank chat thread.</p>
        </div>
        <div className="step">
          <div className="step-num">02 · ACT</div>
          <div className="step-icon"><MagnifyingGlassIcon size={20} /></div>
          <h3 className="step-title">Searches, synthesizes, runs code</h3>
          <p className="step-body">Parallel reasoning across sources. No tab switching.</p>
        </div>
        <div className="step">
          <div className="step-num">03 · WRITE</div>
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
      <div className="section-eyebrow">— Features</div>
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
      <div className="section-eyebrow">— Rich notes</div>
      <h2 className="section-title">Notion-grade notes. Drawn on a canvas.</h2>
      <p className="section-lede">
        Tags, math, toggles, sub-pages, references, code. Edit by hand — or ask AI to draft and revise the note in place.
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
};

function UseCasesSection() {
  const cases: UseCase[] = [
    {
      tag: "Learn",
      title: "Turn a question into a map you can walk.",
      body: "Ask anything. Get a structured mindmap on your canvas. Follow threads, keep your map, never lose where you were.",
      img: "/board-mindmap-deaging.png",
    },
    {
      tag: "Research",
      title: "Pull benchmarks. Chart them. Annotate.",
      body: "Bring sources, run code, render charts. Compare results side by side without juggling tabs.",
      img: "/board-ai-benchmarks.png",
    },
    {
      tag: "Sketch",
      title: "Rough shapes that the AI understands.",
      body: "Excalidraw-style freehand shapes, system diagrams, flows — drawn by you or generated. The agent reads them as context.",
      img: "/board-api-architecture.png",
    },
    {
      tag: "Write",
      title: "Long-form notes, spatially arranged.",
      body: "Notion-grade rich notes — math, code, tags, toggles, sub-pages — sitting wherever you put them on the board.",
      img: "/note-visual-thinking.png",
    },
  ];

  return (
    <section className="section" id="use-cases">
      <div className="section-eyebrow">— Use cases</div>
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
                alt={c.title}
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

function ThemesSection() {
  return (
    <section className="section section-narrow" id="themes">
      <div className="section-eyebrow">— Themes</div>
      <h2 className="section-title">Twelve themes. Pick your aesthetic.</h2>
      <p className="section-lede">
        Parchment, cappuccino, bengali, bayoux. Whatever makes you want to open the app.
      </p>
      <div className="themes-frame">
        <Image
          src="/themes-grid.png"
          alt="A grid of twelve themes available in Dim0"
          width={2400}
          height={1500}
          sizes="(max-width: 1120px) 100vw, 1120px"
        />
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
      <div className="section-eyebrow">— Models</div>
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
      <div className="section-eyebrow">— Open source</div>
      <h2 className="section-title">Nothing is trapped.</h2>
      <p className="section-lede">
        The codebase is public. Run it yourself. Walk away anytime with everything you made.
      </p>

      <div className="trio">
        <div className="trio-card">
          <div className="trio-icon"><EyeIcon size={22} /></div>
          <h4 className="trio-title">See how it works</h4>
          <p className="trio-body">Full codebase is public. No black boxes.</p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><HouseIcon size={22} /></div>
          <h4 className="trio-title">Run it yourself</h4>
          <p className="trio-body">Self-host for full control over your data.</p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><ArrowSquareOutIcon size={22} /></div>
          <h4 className="trio-title">Take it with you</h4>
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

const NEVERS = [
  "Train on your content",
  "Sell your data",
  "Profile you for ads",
  "Lock your boards in",
];

function PrivacySection() {
  return (
    <section className="section section-narrow" id="privacy">
      <div className="section-eyebrow">— Privacy</div>
      <h2 className="section-title">Your work is yours.</h2>
      <p className="section-lede">
        Use the cloud with nothing to configure, or run it yourself. Either way, your content stays yours.
      </p>

      <div className="trio">
        <div className="trio-card">
          <div className="trio-icon"><LockKeyIcon size={22} /></div>
          <h4 className="trio-title">No training on your boards</h4>
          <p className="trio-body">Your prompts, notes, and content are never used to train models — ours or anyone else&apos;s.</p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><ShieldCheckIcon size={22} /></div>
          <h4 className="trio-title">No ads. No profiling. No telemetry.</h4>
          <p className="trio-body">We don&apos;t sell data, we don&apos;t track your activity, we don&apos;t mine your work to target you. We make a thinking tool, not an ad business.</p>
        </div>
        <div className="trio-card">
          <div className="trio-icon"><HouseIcon size={22} /></div>
          <h4 className="trio-title">Self-host for total control</h4>
          <p className="trio-body">Open source, MIT licensed. Notes in pure Markdown. One-command Docker. Bring your own model keys if you want.</p>
        </div>
      </div>

      <div className="never-strip">
        <div className="never-strip-eyebrow">— What Dim0 will never do</div>
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
    a: "A thinking canvas where notes, docs, code, widgets, and AI agents live on one board together. Rich notes like Notion, freehand shapes like Excalidraw, agents that act on the board — same surface.",
  },
  {
    q: "How is this different from Notion, Excalidraw, or ChatGPT Canvas?",
    a: "Notion has rich notes but no canvas. Excalidraw has a canvas but no notes or AI. ChatGPT has AI but no spatial workspace. Dim0 has all three on one board — and the agent is board-aware, so it reads the surrounding context before it acts.",
  },
  {
    q: "Is it free?",
    a: "Yes, free to use during early access at app.dim0.net. The product is also open source — fork it, self-host it, bring your own model keys.",
  },
  {
    q: "Is it open source?",
    a: "Yes. Inspect it, fork it, self-host it — it’s all on GitHub.",
  },
  {
    q: "Which AI models?",
    a: "Claude, GPT, Gemini, Mistral, DeepSeek, Qwen, Kimi, GLM. Pick what you trust; switch anytime.",
  },
  {
    q: "Can I collaborate with others?",
    a: "Today Dim0 is built for single-user thinking. Real-time multi-user collaboration is on the roadmap.",
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
    q: "How big can boards get?",
    a: "300+ active nodes in view stay smooth, with 1,000+ total supported per board.",
  },
  {
    q: "How is my data used?",
    a: "On the cloud at app.dim0.net: prompts and board context are sent only to the model provider that produces the answer (Anthropic, OpenAI, Google, etc.) under their terms. We don’t train on your content, we don’t sell data, we don’t profile you for ads, and we run no behavioral telemetry on your boards. Self-host: everything stays on your infrastructure — local Postgres and vector DB, your own model keys, no calls back to us.",
  },
  {
    q: "What format are my notes stored in?",
    a: "Pure Markdown. Download any note and paste it into any other editor — Obsidian, VS Code, plain text. Boards export cleanly too. No proprietary blocks, no vendor format you can’t walk away from.",
  },
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-narrow" id="faq">
      <div className="section-eyebrow">— FAQ</div>
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
      <RichNotesShowcase />
      <UseCasesSection />
      <ThemesSection />
      <ModelsSection />
      <OssSection />
      <PrivacySection />
      <FAQ />
      <CTA />
    </>
  );
}
