import type { Metadata } from "next";
import { PlaygroundMount } from "./playground-mount";
import "./playground.css";

export const metadata: Metadata = {
  title: "playground · canvas-harness",
  description:
    "An interactive canvas-harness playground — add shapes, draw edges, restyle. Canvas-rendered, headless, styleless.",
};

// Server component: owns metadata and renders the client mount. The
// canvas engine is pulled in only inside <PlaygroundMount>, which loads
// it client-side via next/dynamic — so this route's chunk (and nothing
// on the rest of the site) carries canvas-harness.
export default function PlaygroundPage() {
  return <PlaygroundMount />;
}
