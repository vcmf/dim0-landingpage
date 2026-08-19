"use client";

import { useEffect, useState } from "react";

const REPO = "vcmf/dim0";

// Module-level cache so multiple components (nav, hero, OSS section) share one
// fetch per page load instead of each hitting the API.
let cache: number | null | undefined; // undefined = not fetched, null = failed
let inflight: Promise<number | null> | null = null;

async function fetchStars(): Promise<number | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
}

/**
 * Returns the live GitHub star count, or null while loading / on any failure.
 * Consumers should render the count only when it is a number, so anything going
 * wrong simply hides the badge rather than showing a stale or broken value.
 */
export function useGitHubStars(): number | null {
  const [stars, setStars] = useState<number | null>(cache ?? null);

  useEffect(() => {
    if (cache !== undefined) {
      setStars(cache);
      return;
    }
    let active = true;
    inflight ??= fetchStars();
    inflight.then((value) => {
      cache = value;
      if (active) setStars(value);
    });
    return () => {
      active = false;
    };
  }, []);

  return stars;
}

/** Compact display: 104 -> "104", 1234 -> "1.2k", 12345 -> "12k". */
export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  if (n < 10000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${Math.round(n / 1000)}k`;
}
