"use client";

import type {
  Arrowhead,
  EdgeId,
  EdgeStyle,
  NodeId,
  PathStyle,
  Style,
  StrokeStyle,
} from "@canvas-harness/core";
import { useCanvasStore } from "@canvas-harness/react";
import { type ReactNode, useEffect, useState } from "react";

const FILL = [
  "#dbeafe",
  "#bfdbfe",
  "#a5f3fc",
  "#bbf7d0",
  "#fde68a",
  "#fecaca",
  "#e9d5ff",
  "#ffffff",
];
const STROKE = ["#0F1B2D", "#2F8FB5", "#0284c7", "#16a34a", "#dc2626", "#9333ea", "#00000000"];
const WIDTHS: { label: string; value: number }[] = [
  { label: "S", value: 1 },
  { label: "M", value: 2 },
  { label: "L", value: 4 },
];
const BORDERS: { label: string; value: StrokeStyle }[] = [
  { label: "──", value: "solid" },
  { label: "╌╌", value: "dashed" },
  { label: "··", value: "dotted" },
];
const ARROWHEADS: { label: string; value: Arrowhead }[] = [
  { label: "none", value: "none" },
  { label: "→", value: "arrow" },
  { label: "barb", value: "barb" },
  { label: "▶", value: "arrow-filled" },
];
const PATHS: { label: string; value: PathStyle }[] = [
  { label: "straight", value: "straight" },
  { label: "bezier", value: "bezier" },
  { label: "poly", value: "polyline" },
];

// Selection-driven properties panel. Mirrors the reference playground's
// StylePanel, trimmed to the shape/edge controls this demo exposes.
export function StylePanel() {
  const store = useCanvasStore();
  const [ids, setIds] = useState<(NodeId | EdgeId)[]>(() => store.getSelection());
  const [, tick] = useState(0);

  useEffect(() => {
    const unsubSel = store.subscribe("selection", setIds);
    const unsubChange = store.subscribe("change", () => tick((n) => n + 1));
    return () => {
      unsubSel();
      unsubChange();
    };
  }, [store]);

  if (ids.length === 0) return null;

  const nodeIds: NodeId[] = [];
  const edgeIds: EdgeId[] = [];
  for (const id of ids) {
    if (store.getNode(id as NodeId)) nodeIds.push(id as NodeId);
    else if (store.getEdge(id as EdgeId)) edgeIds.push(id as EdgeId);
  }
  if (nodeIds.length + edgeIds.length === 0) return null;

  const nodesOnly = edgeIds.length === 0;
  const edgesOnly = nodeIds.length === 0;
  const sampleNode = nodeIds[0] ? store.getNode(nodeIds[0]) : null;
  const sampleEdge = edgeIds[0] ? store.getEdge(edgeIds[0]) : null;
  const s = (sampleNode?.style ?? sampleEdge?.style ?? {}) as Style & EdgeStyle;

  const applyNode = (patch: Partial<Style>) =>
    store.batch(() => {
      for (const id of nodeIds) {
        const n = store.getNode(id);
        if (n) store.updateNode(id, { style: { ...n.style, ...patch } });
      }
    });
  const applyEdge = (patch: Partial<EdgeStyle>) =>
    store.batch(() => {
      for (const id of edgeIds) {
        const e = store.getEdge(id);
        if (e) store.updateEdge(id, { style: { ...e.style, ...patch } });
      }
    });
  const applyAll = (patch: Partial<EdgeStyle>) => {
    applyNode(patch as Partial<Style>);
    applyEdge(patch);
  };
  const setPath = (pathStyle: PathStyle) =>
    store.batch(() => {
      for (const id of edgeIds) store.updateEdge(id, { pathStyle });
    });
  const removeSel = () =>
    store.batch(() => {
      for (const id of nodeIds) store.removeNode(id);
      for (const id of edgeIds) store.removeEdge(id);
    });

  return (
    <aside className="ch-pg-panel">
      <div className="ch-pg-panel-head">
        <span>
          {nodeIds.length > 0 && `${nodeIds.length} shape${nodeIds.length > 1 ? "s" : ""}`}
          {nodeIds.length > 0 && edgeIds.length > 0 && " · "}
          {edgeIds.length > 0 && `${edgeIds.length} edge${edgeIds.length > 1 ? "s" : ""}`}
        </span>
        <button type="button" className="ch-pg-del" onClick={removeSel} title="Delete (⌫)">
          delete
        </button>
      </div>

      {nodesOnly && (
        <Field label="Fill">
          <Swatches colors={FILL} value={s.backgroundColor} onPick={(c) => applyNode({ backgroundColor: c })} />
        </Field>
      )}

      <Field label="Stroke">
        <Swatches colors={STROKE} value={s.strokeColor} onPick={(c) => applyAll({ strokeColor: c })} />
      </Field>

      <Field label="Width">
        <Seg options={WIDTHS} value={s.strokeWidth ?? 2} onPick={(w) => applyAll({ strokeWidth: w })} />
      </Field>

      <Field label="Border">
        <Seg options={BORDERS} value={s.strokeStyle ?? "solid"} onPick={(v) => applyAll({ strokeStyle: v })} />
      </Field>

      <Field label={`Roughness · ${s.roughness ?? 0}`}>
        <input
          type="range"
          min={0}
          max={2}
          step={0.5}
          value={s.roughness ?? 0}
          onChange={(e) => applyAll({ roughness: Number(e.target.value) })}
        />
      </Field>

      <Field label={`Opacity · ${s.opacity ?? 100}`}>
        <input
          type="range"
          min={10}
          max={100}
          step={5}
          value={s.opacity ?? 100}
          onChange={(e) => applyAll({ opacity: Number(e.target.value) })}
        />
      </Field>

      {edgesOnly && (
        <>
          <Field label="Path">
            <Seg options={PATHS} value={sampleEdge?.pathStyle ?? "bezier"} onPick={setPath} />
          </Field>
          <Field label="Start">
            <Seg
              options={ARROWHEADS}
              value={s.sourceArrowhead ?? "none"}
              onPick={(v) => applyEdge({ sourceArrowhead: v })}
            />
          </Field>
          <Field label="End">
            <Seg
              options={ARROWHEADS}
              value={s.targetArrowhead ?? "arrow-filled"}
              onPick={(v) => applyEdge({ targetArrowhead: v })}
            />
          </Field>
        </>
      )}
    </aside>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="ch-pg-field">
      <div className="ch-pg-field-label">{label}</div>
      {children}
    </div>
  );
}

function Swatches({
  colors,
  value,
  onPick,
}: {
  colors: string[];
  value: string | undefined;
  onPick: (color: string) => void;
}) {
  return (
    <div className="ch-pg-swatches">
      {colors.map((c) => {
        const transparent = c === "#00000000";
        const active = (value ?? "").toLowerCase() === c.toLowerCase();
        return (
          <button
            key={c}
            type="button"
            title={transparent ? "transparent" : c}
            className={`ch-pg-swatch${active ? " is-active" : ""}${transparent ? " is-transparent" : ""}`}
            style={transparent ? undefined : { background: c }}
            onClick={() => onPick(c)}
          />
        );
      })}
    </div>
  );
}

function Seg<T extends string | number>({
  options,
  value,
  onPick,
}: {
  options: { label: string; value: T }[];
  value: T;
  onPick: (v: T) => void;
}) {
  return (
    <div className="ch-pg-seg">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          className={o.value === value ? "is-active" : undefined}
          onClick={() => onPick(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
