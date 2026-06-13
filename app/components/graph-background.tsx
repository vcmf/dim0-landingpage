"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type NodeType = "note" | "idea" | "shape" | "chip" | "code" | "dot";

type Archetype = {
  type: NodeType;
  color: string;
  w: number;
  h: number;
  label: string;
};

type GraphNodeData = Archetype & {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  rot: number;
};

const ARCHETYPES: Archetype[] = [
  { type: "note", color: "var(--sidebar-icon-3)", w: 88, h: 58, label: "phase\ntransitions" },
  { type: "note", color: "var(--sidebar-icon-2)", w: 96, h: 62, label: "sources" },
  { type: "note", color: "var(--sidebar-icon-1)", w: 90, h: 56, label: "working\nhypothesis" },
  { type: "note", color: "var(--sidebar-icon-4)", w: 92, h: 60, label: "next steps" },
  { type: "note", color: "var(--sidebar-icon-3)", w: 82, h: 54, label: "toy model" },
  { type: "idea", color: "var(--sidebar-icon-1)", w: 110, h: 54, label: "key insight" },
  { type: "shape", color: "var(--sidebar-icon-2)", w: 70, h: 70, label: "" },
  { type: "shape", color: "var(--sidebar-icon-4)", w: 56, h: 56, label: "" },
  { type: "chip", color: "var(--sidebar-icon-1)", w: 60, h: 28, label: "#ml" },
  { type: "chip", color: "var(--sidebar-icon-3)", w: 78, h: 28, label: "#attention" },
  { type: "code", color: "var(--sidebar-icon-2)", w: 96, h: 58, label: "def solve()" },
  { type: "dot", color: "var(--sidebar-icon-4)", w: 10, h: 10, label: "" },
  { type: "dot", color: "var(--sidebar-icon-1)", w: 8, h: 8, label: "" },
  { type: "dot", color: "var(--sidebar-icon-3)", w: 10, h: 10, label: "" },
];

export function GraphBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const nodesRef = useRef<GraphNodeData[]>([]);
  const edgesRef = useRef<[number, number][]>([]);
  const dragRef = useRef<{ id: number; x: number; y: number } | null>(null);
  const [, forceUpdate] = useState(0);
  const [size, setSize] = useState({ w: 1200, h: 760 });

  // Build initial graph
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    setSize({ w, h });

    // Mobile: render only the dot grid, skip the animated nodes.
    if (w < 720) {
      nodesRef.current = [];
      edgesRef.current = [];
      forceUpdate((x) => x + 1);
      return;
    }

    const cx = w / 2;
    const cy = h / 2;
    const avoidW = Math.min(560, w * 0.55);
    const avoidH = 340;
    const inAvoid = (x: number, y: number) =>
      Math.abs(x - cx) < avoidW / 2 && Math.abs(y - cy) < avoidH / 2;

    const placed: GraphNodeData[] = ARCHETYPES.map((a, i) => {
      let x = 0;
      let y = 0;
      let tries = 0;
      do {
        x = 60 + Math.random() * (w - 120);
        y = 40 + Math.random() * (h - 80);
        tries++;
      } while (inAvoid(x, y) && tries < 40);
      return {
        id: i,
        ...a,
        x,
        y,
        vx: 0,
        vy: 0,
        homeX: x,
        homeY: y,
        rot: (Math.random() - 0.5) * 6,
      };
    });
    nodesRef.current = placed;

    // Build sparse edges: each node connects to 1-2 nearby
    const edges: [number, number][] = [];
    placed.forEach((n, i) => {
      const others = placed
        .map((m, j) => ({ j, d: (n.x - m.x) ** 2 + (n.y - m.y) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      others.forEach((o) => {
        if (o.j > i && Math.random() > 0.35) edges.push([i, o.j]);
      });
    });
    edgesRef.current = edges;
    forceUpdate((x) => x + 1);
  }, []);

  // Resize handler
  useEffect(() => {
    const handle = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  // Animation loop
  useEffect(() => {
    const tick = () => {
      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const drag = dragRef.current;

      nodes.forEach((n, i) => {
        if (drag && drag.id === n.id) {
          n.x = drag.x;
          n.y = drag.y;
          n.vx = 0;
          n.vy = 0;
          return;
        }
        const kHome = 0.002;
        n.vx += (n.homeX - n.x) * kHome;
        n.vy += (n.homeY - n.y) * kHome;

        edges.forEach(([a, b]) => {
          if (a !== i && b !== i) return;
          const other = nodes[a === i ? b : a];
          const dx = other.x - n.x;
          const dy = other.y - n.y;
          const dist = Math.hypot(dx, dy);
          const rest = 180;
          const k = 0.0008;
          if (dist > 0) {
            const f = (dist - rest) * k;
            n.vx += (dx / dist) * f;
            n.vy += (dy / dist) * f;
          }
        });

        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x += n.vx;
        n.y += n.vy;
      });

      forceUpdate((v) => (v + 1) % 1_000_000);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, id: number) => {
      e.preventDefault();
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      dragRef.current = {
        id,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      const node = nodesRef.current.find((n) => n.id === id);
      if (node) {
        node.vx = 0;
        node.vy = 0;
      }

      const onMove = (ev: PointerEvent) => {
        if (!dragRef.current) return;
        const c = containerRef.current;
        if (!c) return;
        const r = c.getBoundingClientRect();
        dragRef.current.x = ev.clientX - r.left;
        dragRef.current.y = ev.clientY - r.top;
      };
      const onUp = () => {
        const draggedId = dragRef.current?.id;
        if (draggedId !== undefined) {
          const n = nodesRef.current.find((x) => x.id === draggedId);
          if (n) {
            n.vx = (Math.random() - 0.5) * 4;
            n.vy = (Math.random() - 0.5) * 4;
          }
        }
        dragRef.current = null;
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [],
  );

  const nodes = nodesRef.current;
  const edges = edgesRef.current;
  const { w, h } = size;
  const drag = dragRef.current;

  return (
    <div className="graph-bg" ref={containerRef}>
      <svg
        width={w}
        height={h}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <defs>
          <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" opacity="0.42" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" color="var(--border)" />

        {edges.map(([a, b], i) => {
          const n1 = nodes[a];
          const n2 = nodes[b];
          if (!n1 || !n2) return null;
          const mx = (n1.x + n2.x) / 2;
          const my = (n1.y + n2.y) / 2;
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const len = Math.hypot(dx, dy) || 1;
          const nx = -dy / len;
          const ny = dx / len;
          const wobble = Math.sin((a + b) * 1.3) * 14;
          const cpx = mx + nx * wobble;
          const cpy = my + ny * wobble;
          return (
            <path
              key={i}
              d={`M ${n1.x} ${n1.y} Q ${cpx} ${cpy} ${n2.x} ${n2.y}`}
              stroke="var(--muted-foreground)"
              strokeOpacity="0.33"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {nodes.map((n) => (
        <GraphNode
          key={n.id}
          node={n}
          isDragging={drag?.id === n.id}
          onPointerDown={(e) => onPointerDown(e, n.id)}
        />
      ))}
    </div>
  );
}

type GraphNodeProps = {
  node: GraphNodeData;
  isDragging: boolean;
  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void;
};

function GraphNode({ node, isDragging, onPointerDown }: GraphNodeProps) {
  const { type, color, w: nw, h: nh, label, x, y, rot } = node;
  const baseStyle: CSSProperties = {
    left: x,
    top: y,
    transform: `translate(-50%, -50%) rotate(${rot}deg)`,
    opacity: 0.72,
  };
  const cls = `graph-node ${isDragging ? "dragging" : ""}`;

  if (type === "dot") {
    return (
      <div
        className={cls}
        style={{
          ...baseStyle,
          width: nw,
          height: nh,
          borderRadius: "50%",
          background: color,
          opacity: 0.7,
        }}
        onPointerDown={onPointerDown}
      />
    );
  }
  if (type === "shape") {
    return (
      <div
        className={cls}
        style={{
          ...baseStyle,
          width: nw,
          height: nh,
          borderRadius: label === "" && nw === nh ? "16px" : "12px",
          background: "transparent",
          border: `1.5px solid ${color}`,
          opacity: 0.62,
        }}
        onPointerDown={onPointerDown}
      />
    );
  }
  if (type === "chip") {
    return (
      <div
        className={cls}
        style={{
          ...baseStyle,
          padding: "4px 10px",
          borderRadius: "999px",
          background: `color-mix(in oklab, ${color} 20%, var(--card))`,
          color,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          border: `1px solid color-mix(in oklab, ${color} 46%, var(--border))`,
          opacity: 0.88,
        }}
        onPointerDown={onPointerDown}
      >
        {label}
      </div>
    );
  }
  if (type === "code") {
    return (
      <div
        className={cls}
        style={{
          ...baseStyle,
          width: nw,
          height: nh,
          borderRadius: 10,
          background: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
          padding: "8px 10px",
          opacity: 0.92,
        }}
        onPointerDown={onPointerDown}
      >
        <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: "var(--sidebar-icon-4)" }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, background: "var(--sidebar-icon-3)" }} />
          <div style={{ width: 6, height: 6, borderRadius: 3, background: "var(--sidebar-icon-2)" }} />
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--muted-foreground)" }}>
          {label}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color, marginLeft: 8 }}>
          return x
        </div>
      </div>
    );
  }
  if (type === "idea") {
    return (
      <div
        className={cls}
        style={{
          ...baseStyle,
          padding: "10px 16px",
          borderRadius: 999,
          background: "var(--card)",
          border: `1.5px dashed ${color}`,
          boxShadow: "var(--shadow-sm)",
          fontFamily: "var(--font-handwriting)",
          fontSize: 14,
          color,
          opacity: 0.92,
        }}
        onPointerDown={onPointerDown}
      >
        {label}
      </div>
    );
  }
  // note (sticky paper)
  return (
    <div
      className={cls}
      style={{
        ...baseStyle,
        width: nw,
        height: nh,
        borderRadius: 6,
        background: `color-mix(in oklab, ${color} 26%, var(--card))`,
        border: `1px solid color-mix(in oklab, ${color} 54%, transparent)`,
        boxShadow: "0 4px 10px -4px hsl(32 28% 30% / 0.18)",
        padding: "8px 10px",
        opacity: 0.9,
      }}
      onPointerDown={onPointerDown}
    >
      <div
        style={{
          fontFamily: "var(--font-handwriting)",
          fontSize: 11.5,
          color,
          lineHeight: 1.25,
          whiteSpace: "pre-line",
        }}
      >
        {label}
      </div>
    </div>
  );
}
