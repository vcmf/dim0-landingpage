import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../../components/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for Dim0, the thinking canvas. We don't train on your content, we don't sell data, and we run no behavioral telemetry. Self-host for total control.",
};

const sections: LegalSection[] = [
  {
    heading: "Our approach",
    body: [
      "Your work is yours. Dim0 is built to help you think, not to mine what you create — and that applies in the cloud, not just on self-hosted setups.",
      "Cloud Dim0 is privacy-first by design: encrypted in transit and at rest, no behavioral telemetry, no training on your content, no profiling for ads. The same boards you make on app.dim0.net are protected by the same principles the open-source code enforces. Self-hosting is supported on top of that, for teams who want total custody — but you don’t have to leave the hosted product to get strong privacy.",
    ],
  },
  {
    heading: "What Dim0 will never do",
    body: [
      "We will never train models on your boards, notes, prompts, or uploads. Not ours, not anyone else’s.",
      "We will never sell your data, share it for advertising, or use it to profile you.",
      "We will never run session replay, behavioral analytics, or telemetry that watches what you do inside the canvas.",
      "We will never hold your work hostage. Notes are stored as plain Markdown, boards export cleanly, the codebase is MIT licensed, and self-hosting is supported.",
    ],
  },
  {
    heading: "Encryption",
    body: [
      "Everything between your browser and Dim0 travels over TLS — there is no plaintext leg on the network. Inside the cloud, your boards, notes, uploads, and database records sit on storage that encrypts data at rest by default.",
      "We don’t currently offer customer-held keys (BYOK) or zero-knowledge end-to-end encryption — if you need either, self-hosting puts the keys and the storage entirely in your control.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "We collect the minimum needed to run the product: account information, the content you create or upload, and basic technical logs needed for security, reliability, and abuse prevention.",
      "If you contact us directly, we also receive whatever you choose to send us, such as your email address and message.",
    ],
  },
  {
    heading: "How we use data",
    body: [
      "Only to provide the features you asked for, keep the service running, fix things when they break, respond to support requests, and protect against abuse.",
      "Your content is not a resource we mine. It is not training data. It is not material for advertising or profiling.",
    ],
  },
  {
    heading: "AI and model providers",
    body: [
      "When you use cloud features that need an AI model, the prompts, board context, and uploaded content relevant to your request are sent to the model provider that produces the response (Anthropic, OpenAI, Google, Mistral, DeepSeek, Qwen, Moonshot, or Z.ai, depending on the model you pick). We aim to send only what is needed for the requested feature to work.",
      "Model providers process that data under their own terms and policies. We do not pass your content to providers for any purpose other than answering the request you made, and we do not retain copies of your prompts to train models.",
    ],
  },
  {
    heading: "Self-hosting",
    body: [
      "Self-hosting is for teams who want total custody — regulated industries, air-gapped environments, or anyone who prefers to keep keys and storage under their own roof. It is not the only way to use Dim0 privately; the hosted product is privacy-first too.",
      "When you self-host, your content stays on your infrastructure: local Postgres, a local vector database, your own model keys, no calls back to us. Privacy, retention, and encryption in that mode depend entirely on how you deploy and configure the system.",
    ],
  },
  {
    heading: "Telemetry",
    body: [
      "We do not run behavioral analytics, session replay, or activity tracking inside the canvas. We do not build a profile of how you use Dim0.",
      "We do operate the minimum logging needed to keep the service running and secure — for example, error reports and basic request logs. Those logs are not used for advertising or profiling.",
    ],
  },
  {
    heading: "Security and retention",
    body: [
      "We take reasonable steps to protect data and keep systems secure, though no service can promise perfect security.",
      "We retain data only as long as needed to operate the service, meet legal obligations, resolve disputes, and prevent abuse. You can request deletion at any time.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can contact us about your data, request deletion, or get help understanding how your information is handled. Email contact@dim0.net.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If this policy changes in a material way, we will update this page and revise the effective date below.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Dim0 · Privacy"
      title="Privacy Policy"
      effective="May 13, 2026"
      sections={sections}
    />
  );
}
