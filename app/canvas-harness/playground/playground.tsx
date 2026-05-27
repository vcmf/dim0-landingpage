"use client";

import {
  type CanvasBackground,
  type CanvasStore,
  type EdgeId,
  type NodeId,
  asNodeId,
  createCanvasStore,
} from "@canvas-harness/core";
import {
  type ArrowToolDefaults,
  type CanvasCreateDragEvent,
  type CanvasPointerEvent,
  Canvas,
  CanvasProvider,
  useCanRedo,
  useCanUndo,
  useCanvasStore,
} from "@canvas-harness/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { StylePanel } from "./style-panel";

// Shape tools map 1:1 to built-in node types. "Edge" is the library's
// built-in arrow tool; select/pan/text are handled below.
type ShapeTool = "rect" | "ellipse" | "diamond";
type Tool = "select" | "pan" | ShapeTool | "arrow" | "text";

const SHAPE_TOOLS = new Set<Tool>(["rect", "ellipse", "diamond"]);

const TOOLS: { id: Tool; label: string; key: string }[] = [
  { id: "select", label: "Select", key: "V" },
  { id: "pan", label: "Pan", key: "H" },
  { id: "rect", label: "Square", key: "R" },
  { id: "ellipse", label: "Circle", key: "O" },
  { id: "diamond", label: "Diamond", key: "D" },
  { id: "arrow", label: "Edge", key: "A" },
  { id: "text", label: "Text", key: "T" },
];

const KEY_TO_TOOL: Record<string, Tool> = {
  v: "select",
  h: "pan",
  r: "rect",
  o: "ellipse",
  d: "diamond",
  a: "arrow",
  t: "text",
};

// Cold-palette defaults so new shapes match the rest of the site.
const NODE_STROKE = "#0F1B2D";
const ACCENT = "#2F8FB5";
const DEFAULT_NODE_STYLE = {
  backgroundColor: "#dbeafe",
  strokeColor: NODE_STROKE,
  strokeWidth: 2,
  roughness: 0,
};
const ARROW_DEFAULTS: ArrowToolDefaults = {
  pathStyle: "bezier",
  style: {
    strokeColor: NODE_STROKE,
    strokeWidth: 2,
    roughness: 0,
    targetArrowhead: "arrow-filled",
  },
};
const BACKGROUND: CanvasBackground = { color: "#F6F9FC", pattern: "dots", gap: 22 };

export function Playground() {
  // One store for the lifetime of the page.
  const storeRef = useRef<CanvasStore | null>(null);
  if (!storeRef.current) storeRef.current = createCanvasStore();
  const store = storeRef.current;

  const [tool, setTool] = useState<Tool>("select");

  return (
    <CanvasProvider store={store}>
      <div className="ch-pg">
        <PlaygroundBar tool={tool} onTool={setTool} />
        <div className="ch-pg-stage">
          <Stage tool={tool} setTool={setTool} />
          <StylePanel />
          <div className="ch-pg-hint">
            drag to add · scroll to zoom · space-drag to pan
          </div>
          <a
            className="ch-pg-credit"
            href="https://dim0.net"
            target="_blank"
            rel="noreferrer"
          >
            engine behind <span>dim0.net ↗</span>
          </a>
        </div>
      </div>
    </CanvasProvider>
  );
}

function Stage({ tool, setTool }: { tool: Tool; setTool: (t: Tool) => void }) {
  const store = useCanvasStore();

  const createShape = useCallback(
    (type: ShapeTool, x: number, y: number, w: number, h: number) => {
      store.addNode({
        id: asNodeId(store.generateId()),
        type,
        x,
        y,
        w,
        h,
        angle: 0,
        groups: [],
        style: { ...DEFAULT_NODE_STYLE },
      });
    },
    [store],
  );

  // Tap with a shape tool → default-size shape centered on the click.
  // Tap with the text tool → empty text node in edit mode.
  const handleClick = useCallback(
    (e: CanvasPointerEvent) => {
      const t = e.tool as Tool;
      if (SHAPE_TOOLS.has(t)) {
        const w = 120;
        const h = 80;
        createShape(t as ShapeTool, e.world.x - w / 2, e.world.y - h / 2, w, h);
        return;
      }
      if (t === "text") {
        const id = asNodeId(store.generateId());
        store.addNode({
          id,
          type: "text",
          x: e.world.x - 100,
          y: e.world.y - 16,
          w: 200,
          h: 32,
          angle: 0,
          groups: [],
          content: "",
          style: { fontSize: "M", textAlign: "left", textColor: NODE_STROKE },
        });
        store.beginEdit(id);
      }
    },
    [store, createShape],
  );

  // Drag with a shape tool → shape sized to the dragged rect.
  const handleCreateDrag = useCallback(
    (e: CanvasCreateDragEvent) => {
      const t = e.tool as Tool;
      if (!SHAPE_TOOLS.has(t)) return;
      createShape(
        t as ShapeTool,
        e.rect.x,
        e.rect.y,
        Math.max(8, e.rect.w),
        Math.max(8, e.rect.h),
      );
    },
    [createShape],
  );

  // Undo/redo, delete-selection, and single-key tool shortcuts. Skipped
  // while the inline text editor (a textarea/input) is focused.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "TEXTAREA" || el.tagName === "INPUT")) return;

      const meta = e.metaKey || e.ctrlKey;
      if (meta) {
        if (e.key === "z" || e.key === "Z") {
          e.preventDefault();
          if (e.shiftKey) store.redo();
          else store.undo();
        }
        return;
      }

      if (e.key === "Backspace" || e.key === "Delete") {
        const sel = store.getSelection();
        if (sel.length === 0) return;
        e.preventDefault();
        store.batch(() => {
          for (const id of sel) {
            if (store.getNode(id as NodeId)) store.removeNode(id as NodeId);
            else if (store.getEdge(id as EdgeId)) store.removeEdge(id as EdgeId);
          }
        });
        return;
      }

      if (e.key === "Escape") {
        setTool("select");
        return;
      }
      const next = KEY_TO_TOOL[e.key.toLowerCase()];
      if (next) setTool(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [store, setTool]);

  return (
    <Canvas
      tool={tool}
      onClick={handleClick}
      onCreateDrag={handleCreateDrag}
      arrowDefaults={ARROW_DEFAULTS}
      background={BACKGROUND}
      selectionColor={ACCENT}
    />
  );
}

function PlaygroundBar({ tool, onTool }: { tool: Tool; onTool: (t: Tool) => void }) {
  const store = useCanvasStore();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(store.getNodeCount());
    update();
    return store.subscribe("change", update);
  }, [store]);

  const clearAll = useCallback(() => {
    store.batch(() => {
      for (const n of store.getAllNodes()) store.removeNode(n.id);
      for (const ed of store.getAllEdges()) store.removeEdge(ed.id);
    });
  }, [store]);

  return (
    <header className="ch-pg-bar">
      <div className="ch-pg-bar-left">
        <Link href="/canvas-harness" className="ch-pg-back">
          ← canvas-harness
        </Link>
      </div>
      <div className="ch-pg-tools" role="toolbar" aria-label="tools">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`ch-pg-tool${tool === t.id ? " is-active" : ""}`}
            onClick={() => onTool(t.id)}
            title={`${t.label} (${t.key})`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="ch-pg-bar-right">
        <button
          type="button"
          className="ch-pg-btn"
          disabled={!canUndo}
          onClick={() => store.undo()}
          title="Undo (⌘Z)"
        >
          undo
        </button>
        <button
          type="button"
          className="ch-pg-btn"
          disabled={!canRedo}
          onClick={() => store.redo()}
          title="Redo (⌘⇧Z)"
        >
          redo
        </button>
        <button
          type="button"
          className="ch-pg-btn"
          disabled={count === 0}
          onClick={clearAll}
          title="Remove everything"
        >
          clear
        </button>
      </div>
    </header>
  );
}
