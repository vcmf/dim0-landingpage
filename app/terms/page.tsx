import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of service for Dim0, the thinking canvas. Learn the basic rules for using the product responsibly and respectfully.",
};

const sections = [
  {
    title: "Our intent",
    paragraphs: [
      "Dim0 is built for thinking, research, creation, and communication. We want it to be useful, respectful, and human-centered.",
      "These terms exist to protect the product, the people using it, and the people affected by what gets made with it.",
    ],
  },
  {
    title: "Use Dim0 responsibly",
    paragraphs: [
      "You agree not to use Dim0 for illegal, abusive, harmful, deceptive, exploitative, or privacy-violating activity.",
      "That includes harassment, stalking, fraud, malware, non-consensual sexual content, child sexual abuse material, extremist propaganda, or attempts to generate or organize harmful acts.",
    ],
  },
  {
    title: "Your content",
    paragraphs: [
      "You keep ownership of the content you create, upload, or connect to Dim0.",
      "You are responsible for making sure you have the right to use the content you bring into the product and for how you use any generated outputs.",
    ],
  },
  {
    title: "AI-generated outputs",
    paragraphs: [
      "AI features can be useful, but they can also be wrong, incomplete, or inappropriate. You are responsible for reviewing outputs before relying on them.",
      "Do not treat generated content as guaranteed factual, safe, or professionally validated.",
    ],
  },
  {
    title: "Self-hosting and cloud use",
    paragraphs: [
      "If you use Dim0 in the cloud, we operate the hosted service and related infrastructure.",
      "If you self-host, you are responsible for your own deployment, security, compliance, and data handling.",
    ],
  },
  {
    title: "Service changes",
    paragraphs: [
      "We may update, improve, suspend, or remove features over time. We may also change these terms when needed.",
      "If we make material changes, we will update this page and revise the effective date below.",
    ],
  },
  {
    title: "No warranties",
    paragraphs: [
      "Dim0 is provided on an as-is and as-available basis. We do not promise uninterrupted service, perfect accuracy, or fitness for every purpose.",
    ],
  },
  {
    title: "Limitation of liability",
    paragraphs: [
      "To the maximum extent allowed by law, Dim0 and its operators are not liable for indirect, incidental, special, consequential, or punitive damages resulting from your use of the product.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      "If you have questions about these terms, contact us at contact@dim0.net.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="font-informal text-sm tracking-[0.18em] text-secondary/85 sm:text-base">
          Dim0 · Terms
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          Effective date: April 7, 2026
        </p>
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          These terms describe the basic rules for using Dim0. They are meant
          to be readable, direct, and aligned with the kind of product we want
          to build.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-3xl border border-border bg-card/60 px-6 py-6 backdrop-blur-sm"
          >
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              {section.title}
            </h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-muted-foreground sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-border bg-card/70 px-5 py-2.5 font-semibold text-foreground transition hover:bg-card"
        >
          Back to Dim0
        </Link>
        <a
          href="mailto:contact@dim0.net"
          className="inline-flex items-center rounded-full border border-secondary/70 bg-secondary/20 px-5 py-2.5 font-semibold text-secondary transition hover:bg-secondary/30"
        >
          Contact us
        </a>
      </div>
    </main>
  );
}
