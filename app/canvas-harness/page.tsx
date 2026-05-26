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
        <div className="ch-eyebrow">— a tiny engine</div>
        <h1 className="ch-hero-title">
          The infinite canvas, <em>without the canvas.</em>
        </h1>
        <p className="ch-hero-lede">
          <strong>canvas-harness</strong> is a headless scaffold for building pannable,
          zoomable, node-graph interfaces. It owns the math — viewport, hit-testing,
          virtualization, undo — and stays out of your way for everything else.
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
          <span><i className="ch-dot" /> 11 kB gzipped</span>
          <span><i className="ch-dot" /> zero deps</span>
          <span><i className="ch-dot" /> ts-first</span>
        </div>
      </div>
      <div>
        <HeroCanvas />
        <div className="ch-hero-visual-caption">
          live · this is the engine running, no React renderer attached
        </div>
      </div>
    </section>
  );
}

function CHWhy() {
  const rows = [
    { n: "01", h: "Coordinate spaces", b: "Screen, world, and node-local — translated correctly under any zoom and any pan." },
    { n: "02", h: "Hit testing", b: "R-tree index, sub-pixel correct, with marquee, lasso, and rotated-bounds support." },
    { n: "03", h: "Render virtualization", b: "Only the nodes intersecting the viewport ever mount. 5,000-node graphs stay at 60fps." },
    { n: "04", h: "Gesture choreography", b: "Pinch, wheel-zoom, trackpad pan, drag-to-select, drag-to-move — already detangled." },
    { n: "05", h: "History", b: "Operational, not snapshot. Coalesces, branches, and survives concurrent edits." },
    { n: "06", h: "Renderer-agnostic", b: "Mount nodes as DOM, SVG, Canvas2D, or WebGL. The harness doesn't paint anything." },
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
    { tag: "viewport", title: "The viewport, as a value.", body: "A 3-number state — x, y, k — with helpers for pan, zoom-to-fit, zoom-to-cursor, animated transitions, and frame-perfect screen↔world conversion.", mini: <MiniViewport /> },
    { tag: "hit", title: "Hit-test anything.", body: "Spatial index built on rbush. Point, ray, marquee, and lasso queries all return in sub-millisecond on 10k nodes.", mini: <MiniHit /> },
    { tag: "virtual", title: "Render only what's visible.", body: "Subscribe to the visible-set stream and mount components on demand. The same primitive powers minimaps.", mini: <MiniVirtual /> },
    { tag: "select", title: "Selection, the boring parts done.", body: "Multi-select, shift-add, marquee, group-bounds, transform handles, keyboard nudging, and clipboard — all framework-agnostic.", mini: <MiniSelect /> },
    { tag: "history", title: "History that doesn't bite.", body: "Operational transforms, automatic coalescing, named checkpoints, branch and replay. Wire your own persistence at either end.", mini: <MiniHistory /> },
    { tag: "render", title: "Pick your paint.", body: "Reference renderers for DOM, SVG, Canvas2D, and a Pixi-flavored WebGL one for the day you actually need it.", mini: <MiniRender /> },
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
          <CodeBlock lang="bash">{`npm i canvas-harness
# or  pnpm add canvas-harness`}</CodeBlock>
        </div>
        <div className="ch-qs-step">
          <div className="ch-qs-step-num">02 · MOUNT</div>
          <CodeBlock>{`import { createHarness } from "canvas-harness";

const harness = createHarness({
  container: document.querySelector("#stage"),
  nodes: [
    { id: "a", x: 0,   y: 0,   w: 180, h: 100, type: "note" },
    { id: "b", x: 240, y: 60,  w: 200, h: 120, type: "note" },
  ],
});`}</CodeBlock>
        </div>
        <div className="ch-qs-step">
          <div className="ch-qs-step-num">03 · PAINT</div>
          <CodeBlock>{`harness.onVisible((nodes, viewport) => {
  // mount however you like — React, Svelte, vanilla
  for (const n of nodes) renderNode(n, viewport);
});

harness.viewport.zoomToFit();`}</CodeBlock>
        </div>
        <div className="ch-qs-step">
          <div className="ch-qs-step-num">04 · INTERACT</div>
          <CodeBlock>{`harness.on("select", ({ ids }) => store.set("selection", ids));
harness.on("commit", (op)  => history.push(op));
harness.gesture.bind("space+drag", "pan");`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}

function CHApi() {
  const rows: [string, string, string][] = [
    ["createHarness(opts)", "Harness", "construct an instance bound to a container"],
    ["harness.viewport", "Viewport", "{ x, y, k }, plus pan / zoom / fit / animate"],
    ["harness.nodes", "NodeStore", "crud, query, batch ops, observable diffs"],
    ["harness.hit(point | rect)", "Node[]", "spatial query — point, rect, lasso"],
    ["harness.onVisible(fn)", "Unsub", "subscribe to the visible-node stream"],
    ["harness.gesture.bind(combo, op)", "void", "remap pan / zoom / select / draw"],
    ["harness.history", "History", "undo, redo, checkpoint, branch"],
    ["harness.destroy()", "void", "tear down listeners, observers, raf"],
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
      a: "No. The core is plain TypeScript with zero dependencies. Adapters for React, Svelte, and Vue ship as separate packages — they're each ~40 lines and you can write your own in an afternoon.",
    },
    {
      q: "How does it differ from React Flow / tldraw / Excalidraw?",
      a: "Those are products — opinionated UI, baked-in renderers, baked-in node types. canvas-harness is the scaffold underneath one. If you're building a tldraw, this is what you'd build on first.",
    },
    {
      q: "Does it ship a renderer?",
      a: "It ships four reference ones — DOM, SVG, Canvas2D, WebGL — but the engine doesn't depend on any of them. Subscribe to the visible-set stream and paint however you want.",
    },
    {
      q: "Server-side rendering?",
      a: "Yes. The viewport/hit/history modules are pure and run in Node. Spatial queries against a 50k-node graph take ~12 ms cold start.",
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
