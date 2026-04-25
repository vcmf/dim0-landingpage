"use client";

import Image from "next/image";
import { type ComponentType, useEffect, useMemo, useState } from "react";
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
  MagnifyingGlassIcon,
  PaperclipIcon,
  PenNibIcon,
  SparkleIcon,
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

const PROMPTS = [
  "Explain how nuclear fusion works",
  "Why is the sky blue at noon but red at sunset",
  "Create a visual explainer on how a transformer learns",
  "Show me a chart of CO₂ since 1850",
  "What caused the fall of the Roman Empire",
  "How do mRNA vaccines actually work",
  "Map the major schools of Greek philosophy",
  "Why do we dream, in plain language",
  "Show me how compound interest grows over 30 years",
  "What is dark matter and how do we know it exists",
  "Create a timeline of the Scientific Revolution",
  "Explain the Riemann hypothesis like I’m curious",
];

function TypewriterPrompt({ onTextChange }: { onTextChange: (text: string) => void }) {
  const prompts = useMemo(() => PROMPTS, []);
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
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
  }, [text, phase, idx, prompts]);

  useEffect(() => {
    onTextChange(text);
  }, [text, onTextChange]);

  return (
    <div className="composer-input typewriter" aria-live="polite">
      <span className="tw-text">{text}</span>
      <span className="tw-caret" aria-hidden="true">_</span>
    </div>
  );
}

function Composer() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const goToApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const q = currentPrompt.trim();
    const url = q ? `${APP_URL}/?q=${encodeURIComponent(q)}` : APP_URL;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="composer-wrap">
      <a
        href={APP_URL}
        onClick={goToApp}
        target="_blank"
        rel="noopener noreferrer"
        className="composer composer-cta"
      >
        <span className="composer-tooltip" aria-hidden="true">
          <span className="composer-tooltip-dot" />
          <span>Try it in Dim0</span>
          <span className="composer-tooltip-sep">·</span>
          <span className="mono">app.dim0.net</span>
        </span>
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
          <TypewriterPrompt onTextChange={setCurrentPrompt} />
        </div>
        <div className="composer-actions">
          <span className="composer-btn" title="Attach"><PaperclipIcon size={14} /></span>
          <span className="composer-btn" title="Mention"><AtIcon size={14} /></span>
          <span className="composer-btn" title="Slash command"><CommandIcon size={14} /></span>
          <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 11 }}>
            Claude Sonnet 4.5
          </span>
          <CaretDownIcon size={9} style={{ marginLeft: 2 }} />
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span className="mono" style={{ fontSize: 10.5 }}>⌘↵</span>
            <span className="composer-send" title="Open Dim0">
              <ArrowUpIcon size={14} weight="bold" />
            </span>
          </div>
        </div>
      </a>
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
          <span className="mono" style={{ fontSize: 11 }}>v0.9 · open source</span>
        </div>
        <h1 className="hero-headline">
          Your canvas <em>thinks back.</em>
        </h1>
        <p className="hero-subtitle">
          Research visually. Think spatially. Build with AI.
        </p>
        <p className="hero-tagline">
          Your thoughts deserve more than a chat window.
        </p>
        <Composer />
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
          src="/app-screenshot.png"
          alt="A Dim0 board showing nested research, sticky notes, code widgets, charts, and the AI agent panel"
          className="product-shot-img"
          width={2400}
          height={1500}
          sizes="(max-width: 1240px) 100vw, 1240px"
          priority
        />
        <span className="product-shot-tag">
          <span className="product-shot-dot" />
          <span>Open in</span>
          <span className="mono">app.dim0.net</span>
        </span>
      </a>
      <p className="product-shot-caption">
        Notes, sticky shapes, code, charts, and an AI agent — all on one board. Click to try it.
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
      tag: "Spatial",
      title: "Thinking, laid out in space.",
      body: "Notes, code, math, and shapes on one infinite canvas. Nested boards keep big projects structured without losing the view.",
      Art: ArtSpatial,
    },
    {
      tag: "Gesture",
      title: "Notes become structure.",
      body: "Select any notes and turn them into mind maps, schemas, or diagrams in one gesture. Mapify. Drawify. Schemify.",
      Art: ArtGesture,
    },
    {
      tag: "Agent",
      title: "Board-aware, not bolted on.",
      body: "Reads your board before it acts. Searches, runs code, writes results back as nodes you can edit and connect.",
      Art: ArtAgent,
    },
    {
      tag: "Media",
      title: "Code, docs, widgets — all here.",
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
          <p className="trio-body">Boards and outputs export cleanly. Portable by default.</p>
        </div>
      </div>

      <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a className="btn btn-ghost" href="https://github.com/vcmf/dim0" target="_blank" rel="noreferrer">
          <GithubLogoIcon size={15} /> View repo
        </a>
        <a className="btn btn-sienna" href={APP_URL}>
          Start with Dim0 Cloud <ArrowRightIcon size={14} />
        </a>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "What is Dim0, exactly?", a: "A thinking canvas where notes, docs, code, widgets, and AI agents live on one board together." },
  { q: "Is it open source?", a: "Yes. Inspect it, fork it, self-host it — it’s all on GitHub." },
  { q: "Which AI models?", a: "Claude, GPT, Gemini, Mistral, DeepSeek, Qwen, Kimi, GLM. Pick what you trust; switch anytime." },
  { q: "Why canvas-first instead of chat-first?", a: "Complex thinking is spatial. A canvas keeps structure, relationships, and partial ideas visible at once. Chat buries context." },
  { q: "What can the agent actually do?", a: "Read selected context, search the web, run code, and generate nodes, widgets, charts, or summaries directly on the board." },
  { q: "How big can boards get?", a: "300+ active nodes in view stay smooth, with 1,000+ total supported per board." },
  { q: "How is my data used?", a: "We don’t sell data or train on your content. Prompts go only to the model provider you choose, per their terms." },
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
      <a
        className="cta-canvas"
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open a new board on Dim0"
      >
        <div className="cta-canvas-grid" aria-hidden="true" />
        <div className="cta-canvas-inner">
          <div className="cta-canvas-line">
            <span className="cta-canvas-text">Your turn</span>
            <span className="cta-canvas-caret" aria-hidden="true">_</span>
          </div>
          <div className="cta-canvas-hint">
            <span className="cta-canvas-dot" />
            <span>Open a board</span>
            <span className="cta-canvas-sep">·</span>
            <span className="mono">app.dim0.net</span>
          </div>
        </div>
      </a>
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
      <ModelsSection />
      <OssSection />
      <FAQ />
      <CTA />
    </>
  );
}
