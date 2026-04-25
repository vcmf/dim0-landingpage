import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, GithubLogoIcon } from "@phosphor-icons/react/dist/ssr";

export function SiteNav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <span className="brand-mark">
            <Image src="/dim0.svg" alt="Dim0" width={28} height={28} />
          </span>
          <span>Dim0</span>
        </Link>
        <nav className="nav-links">
          <Link className="nav-link" href="/#why">Why</Link>
          <Link className="nav-link" href="/#how">How it works</Link>
          <Link className="nav-link" href="/#features">Features</Link>
          <Link className="nav-link" href="/#models">Models</Link>
          <Link className="nav-link" href="/#faq">FAQ</Link>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-ghost" href="https://github.com/vcmf/dim0" target="_blank" rel="noreferrer">
            <GithubLogoIcon size={14} /> Open source
          </a>
          <a className="btn btn-primary" href="https://app.dim0.net">
            Try Dim0 <ArrowRightIcon size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <div className="foot">
      <span>© 2026 Dim0 · The thinking canvas</span>
      <div className="foot-links">
        <a href="https://app.dim0.net">Cloud</a>
        <a href="https://github.com/vcmf/dim0">GitHub</a>
        <a href="https://github.com/vcmf/dim0#readme">README</a>
        <a href="mailto:contact@dim0.net">Contact</a>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </div>
  );
}
