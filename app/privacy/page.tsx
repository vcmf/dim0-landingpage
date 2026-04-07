import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for Dim0, the thinking canvas. Learn what we collect, what we do not do with your data, and how cloud and self-hosted usage differ.",
};

const sections = [
  {
    title: "Our approach",
    paragraphs: [
      "We believe your work should belong to you. Dim0 is built to help you think, create, and explore ideas, not to exploit your data.",
      "We do not sell your data. We do not use your content for ads. We do not use your content to train models for our own benefit.",
    ],
  },
  {
    title: "What we collect",
    paragraphs: [
      "We try to collect the minimum information needed to run the product. Depending on how you use Dim0, that may include account information, content you upload or create, and basic technical logs needed for security and reliability.",
      "If you contact us directly, we will also receive the information you choose to send us, such as your email address and message.",
    ],
  },
  {
    title: "How we use data",
    paragraphs: [
      "We use data only to provide the features you ask for, keep the service working, improve reliability, respond to support requests, and protect the product from abuse.",
      "We do not use your content for advertising or profiling. We do not treat your work as a resource to mine.",
    ],
  },
  {
    title: "AI and model providers",
    paragraphs: [
      "When you use cloud features that require AI models, relevant prompts, board context, and uploaded content may be sent to model providers in order to generate the response you requested.",
      "Those providers process data under their own terms and policies. We aim to send only what is needed for the requested feature to work.",
    ],
  },
  {
    title: "Self-hosting",
    paragraphs: [
      "If you self-host Dim0, you control your own infrastructure and data handling. In that setup, your privacy and retention practices depend on how you deploy and configure the system.",
    ],
  },
  {
    title: "Security and retention",
    paragraphs: [
      "We take reasonable steps to protect data and keep systems secure, but no service can promise perfect security.",
      "We retain data only as long as needed to operate the service, meet legal obligations, resolve disputes, and prevent abuse.",
    ],
  },
  {
    title: "Your choices",
    paragraphs: [
      "You can contact us if you have questions about your data, want to request deletion, or need help understanding how your information is handled.",
    ],
  },
  {
    title: "Changes",
    paragraphs: [
      "If this policy changes in a material way, we will update this page and revise the effective date below.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="font-informal text-sm tracking-[0.18em] text-secondary/85 sm:text-base">
          Dim0 · Privacy
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          Effective date: April 7, 2026
        </p>
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          This page explains what information Dim0 may process, what we do not
          do with your data, and how we think about privacy in both cloud and
          self-hosted usage.
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
