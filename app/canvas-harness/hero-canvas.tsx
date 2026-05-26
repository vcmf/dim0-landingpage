"use client";

import {
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type NodeKind = "note" | "tag" | "code";

type DemoNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: NodeKind;
  title?: string;
  body: string;
};

type DragState =
  | { kind: "pan"; startX: number; startY: number; origin: { x: number; y: number } }
  | { kind: "node"; id: string; startX: number; startY: number; origin: { x: number; y: number } };

const DEMO_NODES: DemoNode[] = [
  { id: "n1", x: -160, y: -90, w: 180, h: 96, kind: "note", title: "harness", body: "primitives for an infinite canvas" },
  { id: "n2", x: 80, y: -110, w: 156, h: 80, kind: "tag", body: "headless" },
  { id: "n3", x: 110, y: -10, w: 178, h: 70, kind: "tag", body: "framework-agnostic" },
  { id: "n4", x: -190, y: 40, w: 200, h: 110, kind: "code", body: "viewport.zoom(1.4)\nviewport.pan(dx, dy)" },
  { id: "n5", x: 70, y: 80, w: 168, h: 80, kind: "tag", body: "60fps · 5k nodes" },
];

const EDGES: [string, string][] = [
  ["n1", "n2"],
  ["n1", "n4"],
  ["n2", "n3"],
  ["n4", "n5"],
];

export function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const [nodes, setNodes] = useState<DemoNode[]>(DEMO_NODES);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [hover, setHover] = useState<string | null>(null);

  // wheel-zoom (manual listener so we can preventDefault)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = e.clientY - rect.top - rect.height / 2;
      setView((v) => {
        const factor = e.deltaY < 0 ? 1.1 : 1 / 1.1;
        const k = Math.max(0.4, Math.min(2.4, v.k * factor));
        // zoom around cursor: world point under cursor stays put
        const wx = (cx - v.x) / v.k;
        const wy = (cy - v.y) / v.k;
        const x = cx - wx * k;
        const y = cy - wy * k;
        return { x, y, k };
      });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDownSurface = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture?.(e.pointerId);
      setDrag({
        kind: "pan",
        startX: e.clientX,
        startY: e.clientY,
        origin: { x: view.x, y: view.y },
      });
    },
    [view.x, view.y],
  );

  const onPointerDownNode = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, id: string) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture?.(e.pointerId);
      const n = nodes.find((nn) => nn.id === id);
      if (!n) return;
      setDrag({
        kind: "node",
        id,
        startX: e.clientX,
        startY: e.clientY,
        origin: { x: n.x, y: n.y },
      });
    },
    [nodes],
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;
      if (drag.kind === "pan") {
        setView((v) => ({ ...v, x: drag.origin.x + dx, y: drag.origin.y + dy }));
      } else {
        setNodes((ns) =>
          ns.map((n) =>
            n.id === drag.id
              ? { ...n, x: drag.origin.x + dx / view.k, y: drag.origin.y + dy / view.k }
              : n,
          ),
        );
      }
    },
    [drag, view.k],
  );

  const onPointerUp = useCallback(() => setDrag(null), []);

  const resetView = () => setView({ x: 0, y: 0, k: 1 });
  const zoom = (factor: number) =>
    setView((v) => {
      const k = Math.max(0.4, Math.min(2.4, v.k * factor));
      return { ...v, k };
    });

  const gridSize = 32 * view.k;
  const cursor =
    drag?.kind === "pan" ? "grabbing" : drag?.kind === "node" ? "grabbing" : "grab";

  return (
    <div className="ch-hero-canvas">
      <div
        ref={wrapRef}
        className="ch-hero-canvas-surface"
        onPointerDown={onPointerDownSurface}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ cursor }}
      >
        <div
          className="ch-hero-canvas-grid"
          style={{
            backgroundSize: `${gridSize}px ${gridSize}px`,
            backgroundPosition: `calc(50% + ${view.x % gridSize}px) calc(50% + ${view.y % gridSize}px)`,
          }}
        />

        <div
          className="ch-hero-canvas-world"
          style={{
            transform: `translate(calc(50% + ${view.x}px), calc(50% + ${view.y}px)) scale(${view.k})`,
          }}
        >
          <svg
            className="ch-hero-canvas-edges"
            width="800"
            height="600"
            viewBox="-400 -300 800 600"
          >
            {EDGES.map(([a, b]) => {
              const A = nodes.find((n) => n.id === a);
              const B = nodes.find((n) => n.id === b);
              if (!A || !B) return null;
              const ax = A.x + A.w / 2;
              const ay = A.y + A.h / 2;
              const bx = B.x + B.w / 2;
              const by = B.y + B.h / 2;
              return (
                <path
                  key={a + b}
                  d={`M ${ax} ${ay} C ${ax + (bx - ax) / 2} ${ay}, ${ax + (bx - ax) / 2} ${by}, ${bx} ${by}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeDasharray="3 4"
                  opacity="0.35"
                />
              );
            })}
          </svg>

          {nodes.map((n) => (
            <div
              key={n.id}
              className={`ch-hc-node ch-hc-node-${n.kind}`}
              style={{
                left: n.x,
                top: n.y,
                width: n.w,
                height: n.h,
                outline: hover === n.id ? "1.5px solid var(--ch-accent)" : undefined,
              }}
              onPointerDown={(e) => onPointerDownNode(e, n.id)}
              onPointerEnter={() => setHover(n.id)}
              onPointerLeave={() => setHover(null)}
            >
              {n.kind === "note" && (
                <>
                  <div className="ch-hc-node-title">{n.title}</div>
                  <div className="ch-hc-node-body">{n.body}</div>
                  <div className="ch-hc-node-handles">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </>
              )}
              {n.kind === "tag" && <div className="ch-hc-node-tag">{n.body}</div>}
              {n.kind === "code" && <pre className="ch-hc-node-code">{n.body}</pre>}
            </div>
          ))}
        </div>

        <div className="ch-hero-canvas-chrome">
          <div className="ch-hcc-zoom">
            <button
              type="button"
              onClick={() => zoom(1 / 1.2)}
              aria-label="zoom out"
            >
              −
            </button>
            <span>{Math.round(view.k * 100)}%</span>
            <button type="button" onClick={() => zoom(1.2)} aria-label="zoom in">
              +
            </button>
            <button type="button" className="ch-hcc-reset" onClick={resetView}>
              reset
            </button>
          </div>
          <div className="ch-hcc-hint">drag to pan · scroll to zoom · grab a card</div>
        </div>
      </div>
    </div>
  );
}
