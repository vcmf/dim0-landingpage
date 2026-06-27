"use client";

import { useEffect, useRef, useState } from "react";

type Note = {
  id: number;
  label: string;
  color: string;
  x: number;
  y: number;
  heldBy: number | null;
};

type Phase = "roam" | "toNote" | "carry" | "marquee";

type Cursor = {
  id: number;
  name: string;
  color: string;
  x: number;
  y: number;
  tx: number;
  ty: number;
  speed: number;
  phase: Phase;
  targetNote: number | null;
  held: number | null;
};

type Marquee = {
  active: boolean;
  owner: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const NOTE_DEFS = [
  { label: "kickoff", color: "var(--sidebar-icon-1)" },
  { label: "research", color: "var(--sidebar-icon-2)" },
  { label: "user flows", color: "var(--sidebar-icon-3)" },
  { label: "todo", color: "var(--sidebar-icon-4)" },
  { label: "ship it", color: "var(--sidebar-icon-2)" },
];

const PEER_DEFS = [
  { name: "Maya", color: "var(--sidebar-icon-4)" },
  { name: "Sam", color: "var(--sidebar-icon-1)" },
  { name: "You", color: "var(--sidebar-icon-3)" },
];

// A live multiplayer board: named cursors roam, grab sticky notes, drag them
// around, and occasionally marquee-select. Demonstrates the collaboration
// claims (presence, shared activity, concurrent edits) literally.
export function CollabCanvas() {
  const ref = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);
  const notesRef = useRef<Note[]>([]);
  const cursorsRef = useRef<Cursor[]>([]);
  const marqueeRef = useRef<Marquee>({ active: false, owner: 0, x1: 0, y1: 0, x2: 0, y2: 0 });
  const [size, setSize] = useState({ w: 1120, h: 640 });
  const [, tick] = useState(0);

  // Place notes + cursors once we know the box size.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const w = r.width;
    const h = r.height;
    setSize({ w, h });
    const rx = () => 70 + Math.random() * (w - 140);
    const ry = () => 60 + Math.random() * (h - 120);
    notesRef.current = NOTE_DEFS.map((n, i) => ({
      id: i,
      label: n.label,
      color: n.color,
      x: rx(),
      y: ry(),
      heldBy: null,
    }));
    cursorsRef.current = PEER_DEFS.map((p, i) => ({
      id: i,
      name: p.name,
      color: p.color,
      x: rx(),
      y: ry(),
      tx: rx(),
      ty: ry(),
      speed: 0.04 + Math.random() * 0.02,
      phase: "roam",
      targetNote: null,
      held: null,
    }));
    tick((x) => x + 1);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // static frame
    if (size.w < 720) return; // mobile: static frame, skip the rAF

    const notes = notesRef.current;
    const cursors = cursorsRef.current;
    const mq = marqueeRef.current;
    if (!cursors.length) return;

    const rx = () => 70 + Math.random() * (size.w - 140);
    const ry = () => 60 + Math.random() * (size.h - 120);

    let running = true;
    const el = ref.current;
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                running = e.isIntersecting;
                if (running && raf.current == null) raf.current = requestAnimationFrame(loop);
              });
            },
            { threshold: 0.05 },
          )
        : null;

    const loop = () => {
      if (!running) {
        raf.current = null;
        return;
      }
      for (const c of cursors) {
        const dx = c.tx - c.x;
        const dy = c.ty - c.y;
        c.x += dx * c.speed;
        c.y += dy * c.speed;
        if (c.held != null) {
          const n = notes[c.held];
          n.x = c.x + 4;
          n.y = c.y + 22;
        }
        if (c.phase === "marquee" && mq.active && mq.owner === c.id) {
          mq.x2 = c.x;
          mq.y2 = c.y;
        }
        if (Math.hypot(dx, dy) < 5) {
          if (c.phase === "toNote") {
            const n = c.targetNote != null ? notes[c.targetNote] : null;
            if (n && n.heldBy == null) {
              n.heldBy = c.id;
              c.held = n.id;
              c.tx = rx();
              c.ty = ry();
              c.phase = "carry";
            } else {
              c.tx = rx();
              c.ty = ry();
              c.phase = "roam";
            }
          } else if (c.phase === "carry") {
            if (c.held != null) {
              notes[c.held].heldBy = null;
              c.held = null;
            }
            c.tx = rx();
            c.ty = ry();
            c.phase = "roam";
          } else if (c.phase === "marquee") {
            mq.active = false;
            c.tx = rx();
            c.ty = ry();
            c.phase = "roam";
          } else {
            const free = notes.filter((n) => n.heldBy == null);
            const r = Math.random();
            if (c.id === 0 && r < 0.28 && !mq.active) {
              mq.active = true;
              mq.owner = c.id;
              mq.x1 = c.x;
              mq.y1 = c.y;
              mq.x2 = c.x;
              mq.y2 = c.y;
              c.tx = Math.min(size.w - 50, c.x + 90 + Math.random() * 120);
              c.ty = Math.min(size.h - 50, c.y + 60 + Math.random() * 90);
              c.phase = "marquee";
            } else if (free.length && r < 0.85) {
              const n = free[Math.floor(Math.random() * free.length)];
              c.targetNote = n.id;
              c.tx = n.x;
              c.ty = n.y;
              c.phase = "toNote";
            } else {
              c.tx = rx();
              c.ty = ry();
              c.phase = "roam";
            }
          }
        }
      }
      tick((x) => (x + 1) % 1_000_000);
      raf.current = requestAnimationFrame(loop);
    };

    if (el && io) io.observe(el);
    raf.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
      if (io && el) io.disconnect();
    };
  }, [size.w, size.h]);

  const notes = notesRef.current;
  const cursors = cursorsRef.current;
  const mq = marqueeRef.current;
  const owner = cursors[mq.owner];

  return (
    <div className="collab-canvas" ref={ref} aria-hidden="true">
      <div className="collab-dots" />
      {mq.active && owner && (
        <div
          className="collab-marquee"
          style={{
            left: Math.min(mq.x1, mq.x2),
            top: Math.min(mq.y1, mq.y2),
            width: Math.abs(mq.x2 - mq.x1),
            height: Math.abs(mq.y2 - mq.y1),
            borderColor: owner.color,
            background: `color-mix(in oklab, ${owner.color} 9%, transparent)`,
          }}
        />
      )}
      {notes.map((n) => (
        <div
          key={n.id}
          className={`collab-note ${n.heldBy != null ? "held" : ""}`}
          style={{
            left: n.x,
            top: n.y,
            background: `color-mix(in oklab, ${n.color} 20%, var(--card))`,
            borderColor: `color-mix(in oklab, ${n.color} 45%, transparent)`,
          }}
        >
          {n.label}
        </div>
      ))}
      {cursors.map((c) => (
        <div key={c.id} className="collab-cursor" style={{ left: c.x, top: c.y }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 3 L4 16 L7.5 12.6 L10 18 L12 17 L9.5 11.7 L14.5 11.7 Z"
              fill={c.color}
              stroke="white"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
          </svg>
          <span className="collab-cursor-label" style={{ background: c.color }}>
            {c.name}
          </span>
        </div>
      ))}
    </div>
  );
}
