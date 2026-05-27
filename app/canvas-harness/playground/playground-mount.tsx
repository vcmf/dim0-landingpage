"use client";

import dynamic from "next/dynamic";

// The whole canvas-harness engine lives behind this dynamic import.
// `ssr: false` keeps it client-only (the canvas has nothing to paint on
// the server) and splits it into a chunk fetched only when this route
// actually mounts in the browser.
const Playground = dynamic(
  () => import("./playground").then((m) => m.Playground),
  {
    ssr: false,
    loading: () => (
      <div className="ch-pg">
        <div className="ch-pg-bar" />
        <div className="ch-pg-stage">
          <div className="ch-pg-loading">starting the canvas…</div>
        </div>
      </div>
    ),
  },
);

export function PlaygroundMount() {
  return <Playground />;
}
