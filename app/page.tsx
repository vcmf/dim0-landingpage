import Image from "next/image";

const features = [
  {
    title: "Runs On Your Machine",
    description: "Private-by-default execution with full local control.",
  },
  {
    title: "Chat-Driven Workflows",
    description: "Trigger actions from any chat app your users already use.",
  },
  {
    title: "Persistent Memory",
    description: "Remembers user context to keep every action relevant.",
  },
  {
    title: "Browser Actions",
    description: "Automate repetitive web tasks with reliable guardrails.",
  },
  {
    title: "System Access",
    description: "Read, write, and run commands when your app needs it.",
  },
  {
    title: "Extensible Skills",
    description: "Add custom skills and integrations without redesigning UI.",
  },
];

const integrations = [
  "WhatsApp",
  "Telegram",
  "Discord",
  "Slack",
  "Gmail",
  "GitHub",
  "Notion",
  "Google Drive",
  "Calendar",
  "Zapier",
  "Stripe",
  "HubSpot",
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-zinc-100">
      <div className="stars-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(244,63,94,0.2),transparent_35%),radial-gradient(circle_at_88%_12%,rgba(6,182,212,0.18),transparent_40%),radial-gradient(circle_at_50%_55%,rgba(99,102,241,0.08),transparent_55%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7">
        <a href="#" className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-zinc-200">
          <Image src="/dim0.svg" alt="dim0 logo" width={24} height={24} />
          <span>DIM0</span>
        </a>
        <a
          href="#product"
          className="rounded-full border border-cyan-300/50 bg-cyan-300/10 px-4 py-2 text-xs font-medium text-cyan-100 backdrop-blur-md transition hover:bg-cyan-300/20"
        >
          Product
        </a>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-6">
        <section className="text-center">
          <p className="mx-auto inline-flex items-center rounded-full border border-rose-300/35 bg-rose-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-rose-200">
            BUILT FOR AUTOMATION APPS
          </p>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Ship your dim0 landing page
            <span className="block bg-gradient-to-r from-rose-300 via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              with a bold neon style
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Clean sections, strong visual hierarchy, and easy editing with React
            + Next.js + Tailwind v4.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#cta"
              className="rounded-full border border-rose-300/50 bg-rose-300/15 px-6 py-3 text-sm font-semibold text-rose-100 backdrop-blur-md transition hover:bg-rose-300/25"
            >
              Launch Beta
            </a>
            <a
              href="#product"
              className="rounded-full border border-cyan-300/50 bg-cyan-300/10 px-6 py-3 text-sm font-semibold text-cyan-100 backdrop-blur-md transition hover:bg-cyan-300/20"
            >
              See Product
            </a>
          </div>
        </section>

        <section id="product" className="mx-auto mt-14 max-w-6xl">
          <div className="relative overflow-hidden rounded-xl border-none bg-zinc-900/40 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_35px_90px_-45px_rgba(34,211,238,0.8)] backdrop-blur-sm">
            <Image
              src="/app-main-screen.png"
              alt="dim0 application main screen"
              width={1920}
              height={1080}
              priority
              className="block h-auto w-full"
            />
            <div className="pointer-events-none absolute left-10 top-10 rounded-full border border-cyan-300/50 bg-cyan-300/15 px-3 py-1.5 text-xs font-medium text-cyan-100 backdrop-blur-md sm:left-14 sm:top-14">
              Graph Canvas
            </div>
            <div className="pointer-events-none absolute right-10 top-12 rounded-full border border-rose-300/50 bg-rose-300/15 px-3 py-1.5 text-xs font-medium text-rose-100 backdrop-blur-md sm:right-14 sm:top-16">
              Board Copilot
            </div>
            <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-emerald-300/50 bg-emerald-300/15 px-3 py-1.5 text-xs font-medium text-emerald-100 backdrop-blur-md sm:bottom-14 sm:text-sm">
              Multi-layer Reasoning
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-zinc-500">
            Live dim0 workspace: graph canvas, context panel, and copilots.
          </p>
        </section>

        <section id="quickstart" className="mx-auto mt-14 max-w-3xl">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-zinc-100">
            Quick Start
          </h2>
          <div className="rounded-2xl border border-zinc-800 bg-[#07101f]/90 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_-40px_rgba(6,182,212,0.45)]">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs text-zinc-500">One-liner install</span>
            </div>
            <code className="block overflow-x-auto rounded-lg bg-[#030816] p-4 text-sm text-cyan-200">
              npm create dim0@latest
            </code>
            <p className="mt-3 text-sm text-zinc-500">
              Works on macOS, Windows, and Linux.
            </p>
          </div>
        </section>

        <section id="features" className="mt-16">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
            What It Does
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/55 p-5 backdrop-blur-sm transition hover:border-cyan-300/40"
              >
                <h3 className="text-base font-semibold text-zinc-100">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
            Works With Everything
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {integrations.map((name) => (
              <span
                key={name}
                className="rounded-full border border-zinc-700 bg-zinc-900/65 px-4 py-2 text-xs text-zinc-300"
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        <section id="cta" className="mt-16">
          <div className="rounded-3xl border border-zinc-700 bg-gradient-to-r from-zinc-900/90 via-[#111827]/90 to-[#102036]/90 px-6 py-10 sm:px-9">
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-100">
              Build your own AI app experience
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
              This starter gives you a strong base. Replace copy, add screenshots,
              and connect your waitlist form.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#"
                className="rounded-full border border-cyan-300/50 bg-cyan-300/10 px-6 py-3 text-sm font-semibold text-cyan-100 backdrop-blur-md transition hover:bg-cyan-300/20"
              >
                Join Waitlist
              </a>
              <a
                href="#"
                className="rounded-full border border-zinc-300/40 bg-zinc-100/10 px-6 py-3 text-sm font-semibold text-zinc-100 backdrop-blur-md transition hover:bg-zinc-100/15"
              >
                Read Docs
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-8 text-xs text-zinc-500">
        © {new Date().getFullYear()} dim0
      </footer>
    </div>
  );
}
