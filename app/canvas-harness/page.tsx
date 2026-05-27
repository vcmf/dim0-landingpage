"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useState } from "react";
import { HeroCanvas } from "./hero-canvas";
import {
  BuiltOnDim0,
  MiniHistory,
  MiniHit,
  MiniRender,
  MiniSelect,
  MiniViewport,
  MiniVirtual,
} from "./illustrations";

const REPO_URL = "https://github.com/winlp4ever/canvas-harness";

function CHNav() {
  return (
    <nav className="ch-nav">
      <div>
        <a href="#top" className="ch-brand">
          <Image
            src="/canvas-harness-icon.png"
            alt=""
            width={26}
            height={26}
            className="ch-brand-mark"
          />
          <span className="ch-brand-name">canvas-harness</span>
          <span className="ch-brand-version">v0.1</span>
        </a>
      </div>
      <div className="ch-nav-right">
        <a href="#what">what</a>
        <a href="#start">quick start</a>
        <a href="#api">api</a>
        <a href="#built-on">built on it</a>
        <Link href="/" className="ch-nav-back">← dim0</Link>
        <a
          className="ch-nav-cta"
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span className="ch-nav-cta-glyph">★</span>
          github
        </a>
      </div>
    </nav>
  );
}

function CHHero() {
  return (
    <section className="ch-hero" id="top">
      <div>
        <div className="ch-eyebrow">— a canvas engine for React</div>
        <h1 className="ch-hero-title">
          Canvas performance, <em>zero style opinions.</em>
        </h1>
        <p className="ch-hero-lede">
          <strong>canvas-harness</strong> is a node-graph library for React that renders
          on a canvas instead of the DOM — so 10k nodes pan at ~80fps. It owns the hard
          parts — camera, hit-testing, history, spatial queries — and ships no UI and no
          styles. Every color, font, and corner radius is yours.
        </p>
        <div className="ch-hero-cta-row">
          <a className="ch-btn ch-btn-ink" href="#start">read the quick start</a>
          <a
            className="ch-btn ch-btn-ghost"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
          >
            github →
          </a>
        </div>
        <div className="ch-hero-meta">
          <span><i className="ch-dot" /> MIT</span>
          <span><i className="ch-dot" /> canvas-rendered</span>
          <span><i className="ch-dot" /> headless + styleless</span>
          <span><i className="ch-dot" /> ts-first</span>
        </div>
      </div>
      <div>
        <HeroCanvas />
        <div className="ch-hero-visual-caption">
          live · real canvas rendering — every node painted, none in the DOM
        </div>
      </div>
    </section>
  );
}

function CHWhy() {
  const rows = [
    { n: "01", h: "Coordinate spaces", b: "Screen, world, and node-local coordinates, converted correctly at any zoom or pan." },
    { n: "02", h: "Hit testing", b: "A uniform-grid spatial index backs querySpatial — point, rect, and marquee hits without walking the node list." },
    { n: "03", h: "Render virtualization", b: "Visibility culling paints only the nodes in view — 10k visible nodes pan at ~80fps on an M1." },
    { n: "04", h: "Gesture choreography", b: "Pan, zoom, marquee-select, and drag-to-move come wired, switchable through the canvas tool prop." },
    { n: "05", h: "History", b: "Undo and redo over a typed operation log — the same log that drives collaboration through a SyncAdapter." },
    { n: "06", h: "Canvas-rendered, styleless", b: "It paints every node to a canvas — bitmap-cached, with motion-based LOD — and ships zero styles, so the look is entirely yours." },
  ];
  return (
    <section className="ch-band" id="why">
      <div className="ch-band-head">
        <div className="ch-eyebrow">— why a harness</div>
        <h2>
          Every canvas-shaped product re-solves the same six problems.
          <em> Stop re-solving them.</em>
        </h2>
      </div>
      <div className="ch-why-grid">
        {rows.map((r) => (
          <div key={r.n} className="ch-why-row">
            <span className="ch-why-num">{r.n}</span>
            <div>
              <h4>{r.h}</h4>
              <p>{r.b}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CHWhat() {
  const cards: { tag: string; title: string; body: string; mini: ReactNode }[] = [
    { tag: "camera", title: "The camera, as a value.", body: "A 3-number state — x, y, z — with helpers for pan, zoom-to-fit, zoom-to-cursor, animated transitions, and frame-perfect screen↔world conversion.", mini: <MiniViewport /> },
    { tag: "hit", title: "Hit-test anything.", body: "A uniform-grid spatial index. Point, rect, and marquee queries run through querySpatial without walking the node list.", mini: <MiniHit /> },
    { tag: "virtual", title: "Render only what's visible.", body: "Visibility culling paints only the nodes in view — 10k visible nodes pan at ~80fps. The same index powers the Minimap.", mini: <MiniVirtual /> },
    { tag: "select", title: "Selection, the boring parts done.", body: "Multi-select, shift-add, marquee, group-bounds, transform handles, keyboard nudging, and clipboard — all driven from the store and surfaced through React hooks.", mini: <MiniSelect /> },
    { tag: "history", title: "History that doesn't bite.", body: "Undo and redo over a typed operation log, with coalescing. The same log syncs to collaborators through a SyncAdapter.", mini: <MiniHistory /> },
    { tag: "styleless", title: "Bring your own look.", body: "Nodes paint to a canvas with bitmap caching and LOD. Styling is theme tokens you define — there's no bundled UI to fight.", mini: <MiniRender /> },
  ];
  return (
    <section className="ch-band ch-band-paper" id="what">
      <div className="ch-band-head">
        <div className="ch-eyebrow">— what&apos;s in the box</div>
        <h2>Six primitives. <em>Compose to taste.</em></h2>
      </div>
      <div className="ch-what-grid">
        {cards.map((c, i) => (
          <article key={c.tag} className="ch-what-card">
            <div className="ch-what-card-mini">{c.mini}</div>
            <div className="ch-what-card-body">
              <div className="ch-what-card-tag">
                <span className="ch-what-card-num">{String(i + 1).padStart(2, "0")}</span>
                <code>{c.tag}</code>
              </div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CodeBlock({ children, lang = "ts" }: { children: string; lang?: string }) {
  return (
    <div className="ch-code">
      <div className="ch-code-head">
        <span className="ch-code-dots"><i /><i /><i /></span>
        <span className="ch-code-lang">{lang}</span>
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}

function CHQuickStart() {
  return (
    <section className="ch-band" id="start">
      <div className="ch-band-head">
        <div className="ch-eyebrow">— quick start</div>
        <h2>Hello, infinite canvas.</h2>
      </div>
      <div className="ch-qs">
        <div className="ch-qs-step">
          <div className="ch-qs-step-num">01 · INSTALL</div>
          <CodeBlock lang="bash">{`pnpm add @canvas-harness/core @canvas-harness/react
# or  npm i @canvas-harness/core @canvas-harness/react`}</CodeBlock>
        </div>
        <div className="ch-qs-step">
          <div className="ch-qs-step-num">02 · CREATE A STORE</div>
          <CodeBlock>{`import { createCanvasStore } from "@canvas-harness/core";

const store = createCanvasStore();
store.addNode({ id: "a", x: 0,   y: 0,  w: 180, h: 100, type: "note" });
store.addNode({ id: "b", x: 240, y: 60, w: 200, h: 120, type: "note" });`}</CodeBlock>
        </div>
        <div className="ch-qs-step">
          <div className="ch-qs-step-num">03 · RENDER</div>
          <CodeBlock>{`import { CanvasProvider, Canvas } from "@canvas-harness/react";

export function Board() {
  return (
    <CanvasProvider store={store}>
      <Canvas tool="select" />
    </CanvasProvider>
  );
}`}</CodeBlock>
        </div>
        <div className="ch-qs-step">
          <div className="ch-qs-step-num">04 · REACT TO IT</div>
          <CodeBlock>{`import { useSelection, useCamera, useCanUndo } from "@canvas-harness/react";

const selection = useSelection();  // selected node ids
const camera    = useCamera();     // { x, y, z }  z = zoom factor
const canUndo   = useCanUndo();    // store.undo() / store.redo() to step`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}

function CHApi() {
  const rows: [string, string, string][] = [
    ["createCanvasStore(opts?)", "CanvasStore", "create the store holding nodes, edges, camera, and selection"],
    ["<CanvasProvider store={...}>", "JSX", "put a store in context for the canvas and hooks below it"],
    ["<Canvas tool=\"select\" />", "JSX", "the canvas surface — paints nodes, handles pan / zoom / tools"],
    ["useSelection()", "string[]", "the selected node ids, reactive"],
    ["useCamera()", "Camera", "the live camera — position and zoom"],
    ["useCanUndo() / useCanRedo()", "boolean", "whether undo / redo is currently available"],
    ["store.undo() / store.redo()", "void", "step history backward or forward"],
    ["store.querySpatial(rect)", "Node[]", "spatial query against the uniform-grid index"],
  ];
  return (
    <section className="ch-band ch-band-paper" id="api">
      <div className="ch-band-head">
        <div className="ch-eyebrow">— api at a glance</div>
        <h2>The whole surface fits on one page.</h2>
      </div>
      <div className="ch-api-table">
        {rows.map(([sig, ret, doc], i) => (
          <div key={i} className="ch-api-row">
            <code className="ch-api-sig">{sig}</code>
            <code className="ch-api-ret">{ret}</code>
            <span className="ch-api-doc">{doc}</span>
          </div>
        ))}
      </div>
      <p className="ch-api-foot">
        Full reference, types, and an interactive playground live on the{" "}
        <a href={REPO_URL} target="_blank" rel="noreferrer">repo readme</a>.
      </p>
    </section>
  );
}

function CHBuiltOn() {
  return (
    <section className="ch-band" id="built-on">
      <div className="ch-band-head">
        <div className="ch-eyebrow">— built on it</div>
        <h2>You&apos;ve probably already used canvas-harness.</h2>
      </div>
      <div className="ch-built-on-row">
        <a className="ch-built-card" href="https://dim0.net" target="_blank" rel="noreferrer">
          <div className="ch-built-card-tile">
            <BuiltOnDim0 />
          </div>
          <div className="ch-built-card-meta">
            <div className="ch-built-card-name">dim0.net</div>
            <div className="ch-built-card-blurb">
              an infinite canvas where notes, sketches, and references gather into one
              room — and the canvas <em>thinks back</em>.
            </div>
            <div className="ch-built-card-link">dim0.net ↗</div>
          </div>
        </a>
        <div className="ch-built-card ch-built-card-empty">
          <div className="ch-built-card-tile ch-built-card-tile-empty">
            <span>your project?</span>
            <span className="ch-built-card-empty-sub">open a PR with a screenshot</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CHFaq() {
  const items = [
    {
      q: "Is canvas-harness a React library?",
      a: "Yes. The state core (@canvas-harness/core) is framework-neutral, but rendering and the hooks live in @canvas-harness/react, which lists React ≥18 as a peer dependency. React is the supported target today.",
    },
    {
      q: "How does it differ from React Flow / tldraw / Excalidraw?",
      a: "React Flow is headless and styleless too — but it renders nodes as DOM elements, so it gets sluggish around 1–2k. tldraw and Excalidraw render to a canvas and stay fast, but they hand you their UI and node types: you take their look or fight it. canvas-harness fills the corner that was empty — a canvas renderer that is also headless and styleless. 10k nodes pan at ~80fps, and there's no built-in UI to override. tldraw's performance ceiling, React Flow's freedom.",
    },
    {
      q: "Does it ship a renderer?",
      a: "Yes — that's the whole library. It renders to a canvas with bitmap caching and motion-based level-of-detail. It's styleless, not renderer-agnostic: you own every style token, but the paint path is the canvas, and that's where the speed comes from.",
    },
    {
      q: "Server-side rendering?",
      a: "The store is plain, serializable state, so you can build and hydrate it on the server. The canvas itself paints on the client — like any canvas, there's nothing to rasterize until it mounts in the browser.",
    },
    {
      q: "License?",
      a: "MIT. Use it commercially, fork it, ship it. A star on the repo is appreciated but not required.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="ch-band" id="faq">
      <div className="ch-band-head">
        <div className="ch-eyebrow">— frequently asked</div>
        <h2>Common questions.</h2>
      </div>
      <div className="ch-faq">
        {items.map((it, i) => (
          <div key={i} className={`ch-faq-item ${open === i ? "ch-open" : ""}`}>
            <button
              type="button"
              className="ch-faq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span className="ch-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ch-faq-q-text">{it.q}</span>
              <span className="ch-faq-q-chev">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="ch-faq-a">{it.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function CHFooter() {
  return (
    <footer className="ch-footer">
      <div className="ch-footer-grid">
        <div className="ch-footer-brand">
          <Image
            src="/canvas-harness-icon.png"
            alt=""
            width={44}
            height={44}
            className="ch-footer-mark"
          />
          <div>
            <div className="ch-footer-name">canvas-harness</div>
            <div className="ch-footer-tag">a small tree, a sturdy trunk.</div>
          </div>
        </div>
        <div className="ch-footer-col">
          <div className="ch-footer-col-head">repo</div>
          <a href={REPO_URL} target="_blank" rel="noreferrer">source</a>
          <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">releases</a>
          <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer">issues</a>
        </div>
        <div className="ch-footer-col">
          <div className="ch-footer-col-head">learn</div>
          <a href="#start">quick start</a>
          <a href="#api">api</a>
          <a href="#faq">faq</a>
        </div>
        <div className="ch-footer-col">
          <div className="ch-footer-col-head">made by</div>
          <Link href="/">dim0</Link>
          <a href="https://github.com/winlp4ever" target="_blank" rel="noreferrer">@winlp4ever</a>
        </div>
      </div>
      <div className="ch-footer-rule" />
      <div className="ch-footer-bottom">
        <span>MIT · 2026</span>
        <span><code>npm i canvas-harness</code></span>
      </div>
    </footer>
  );
}

export default function EnginePage() {
  return (
    <>
      <CHNav />
      <main>
        <CHHero />
        <CHWhy />
        <CHWhat />
        <CHQuickStart />
        <CHApi />
        <CHBuiltOn />
        <CHFaq />
      </main>
      <CHFooter />
    </>
  );
}
