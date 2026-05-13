"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRightIcon,
  GithubLogoIcon,
  ListIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";

const APP_URL = "https://app.dim0.net";
const GH_URL = "https://github.com/vcmf/dim0";

const NAV_LINKS = [
  { href: "/#why", label: "Why" },
  { href: "/#how", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#use-cases", label: "Use cases" },
  { href: "/#themes", label: "Themes" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand" onClick={close}>
          <span className="brand-mark">
            <Image src="/dim0.svg" alt="Dim0" width={28} height={28} />
          </span>
          <span>Dim0</span>
        </Link>
        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} className="nav-link" href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <a
            className="btn btn-ghost nav-cta-gh"
            href={GH_URL}
            target="_blank"
            rel="noreferrer"
          >
            <GithubLogoIcon size={14} /> Open source
          </a>
          <a className="btn btn-primary nav-cta-try" href={APP_URL}>
            Try Dim0 <ArrowRightIcon size={14} />
          </a>
          <button
            type="button"
            className="nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
        </div>
      </div>
      <div className={`nav-drawer ${open ? "nav-drawer-open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            className="nav-drawer-link"
            href={l.href}
            onClick={close}
          >
            {l.label}
          </Link>
        ))}
        <a
          className="nav-drawer-link"
          href={GH_URL}
          target="_blank"
          rel="noreferrer"
          onClick={close}
        >
          <GithubLogoIcon size={14} /> Open source
        </a>
        <a className="nav-drawer-link nav-drawer-cta" href={APP_URL} onClick={close}>
          Try Dim0 <ArrowRightIcon size={14} />
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <div className="foot">
      <span>© 2026 Dim0 · The thinking canvas</span>
      <a className="foot-badge" href="https://softwareontheweb.com" rel="dofollow">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://softwareontheweb.com/images/badge.webp?v=1778309154"
          alt="Featured on Software on the Web"
          width={160}
          height={56}
        />
      </a>
      <div className="foot-links">
        <a href={APP_URL}>Cloud</a>
        <a href={GH_URL}>GitHub</a>
        <a href={`${GH_URL}#readme`}>README</a>
        <a href="mailto:contact@dim0.net">Contact</a>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </div>
  );
}
