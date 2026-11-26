"use client";

import { Field, Seg, Swatches } from "./style-panel";

// Pen settings, shown while the ink tool is active. Maps 1:1 onto the
// library's `inkDefaults` (color, base width, and the perfect-freehand
// shape knobs: thinning / smoothing / streamline).
export type InkSettings = {
  color: string;
  size: number;
  thinning: number;
  smoothing: number;
  streamline: number;
};

// Library defaults for the shape knobs; color matches the site's ink.
export const DEFAULT_INK: InkSettings = {
  color: "#0F1B2D",
  size: 5,
  thinning: 0.68,
  smoothing: 0.58,
  streamline: 0.42,
};

const PEN_COLORS = ["#0F1B2D", "#2F8FB5", "#0284c7", "#16a34a", "#dc2626", "#9333ea"];
const SIZES: { label: string; value: number }[] = [
  { label: "S", value: 3 },
  { label: "M", value: 5 },
  { label: "L", value: 9 },
  { label: "XL", value: 16 },
];

export function InkPanel({
  value,
  onChange,
}: {
  value: InkSettings;
  onChange: (next: InkSettings) => void;
}) {
  const apply = (patch: Partial<InkSettings>) => onChange({ ...value, ...patch });

  return (
    <aside className="ch-pg-panel">
      <div className="ch-pg-panel-head">
        <span>pen</span>
        <button
          type="button"
          className="ch-pg-del"
          onClick={() => onChange(DEFAULT_INK)}
          title="Reset pen settings"
        >
          reset
        </button>
      </div>

      <Field label="Color">
        <Swatches colors={PEN_COLORS} value={value.color} onPick={(c) => apply({ color: c })} />
      </Field>

      <Field label="Width">
        <Seg options={SIZES} value={value.size} onPick={(size) => apply({ size })} />
      </Field>

      <Slider
        label="Thinning"
        title="Pressure → width sensitivity. Negative inverts it."
        value={value.thinning}
        min={-1}
        onChange={(thinning) => apply({ thinning })}
      />
      <Slider
        label="Smoothing"
        title="Outline smoothing. Higher = softer, rounder edges."
        value={value.smoothing}
        min={0}
        onChange={(smoothing) => apply({ smoothing })}
      />
      <Slider
        label="Streamline"
        title="Input jitter smoothing. Higher = steadier line, more lag."
        value={value.streamline}
        min={0}
        onChange={(streamline) => apply({ streamline })}
      />
    </aside>
  );
}

function Slider({
  label,
  title,
  value,
  min,
  onChange,
}: {
  label: string;
  title: string;
  value: number;
  min: number;
  onChange: (v: number) => void;
}) {
  return (
    <Field label={`${label} · ${value.toFixed(2)}`}>
      <input
        type="range"
        min={min}
        max={1}
        step={0.02}
        value={value}
        title={title}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </Field>
  );
}
