import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../components/legal-page";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for Dim0, the thinking canvas. Learn what we collect, what we do not do with your data, and how cloud and self-hosted usage differ.",
};

const sections: LegalSection[] = [
  {
    heading: "Our approach",
    body: [
      "We believe your work should belong to you. Dim0 is built to help you think, create, and explore ideas, not to exploit your data.",
      "We do not sell your data. We do not use your content for ads. We do not use your content to train models for our own benefit.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "We try to collect the minimum information needed to run the product. Depending on how you use Dim0, that may include account information, content you upload or create, and basic technical logs needed for security and reliability.",
      "If you contact us directly, we will also receive the information you choose to send us, such as your email address and message.",
    ],
  },
  {
    heading: "How we use data",
    body: [
      "We use data only to provide the features you ask for, keep the service working, improve reliability, respond to support requests, and protect the product from abuse.",
      "We do not use your content for advertising or profiling. We do not treat your work as a resource to mine.",
    ],
  },
  {
    heading: "AI and model providers",
    body: [
      "When you use cloud features that require AI models, relevant prompts, board context, and uploaded content may be sent to model providers in order to generate the response you requested.",
      "Those providers process data under their own terms and policies. We aim to send only what is needed for the requested feature to work.",
    ],
  },
  {
    heading: "Self-hosting",
    body: [
      "If you self-host Dim0, you control your own infrastructure and data handling. In that setup, your privacy and retention practices depend on how you deploy and configure the system.",
    ],
  },
  {
    heading: "Security and retention",
    body: [
      "We take reasonable steps to protect data and keep systems secure, but no service can promise perfect security.",
      "We retain data only as long as needed to operate the service, meet legal obligations, resolve disputes, and prevent abuse.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can contact us if you have questions about your data, want to request deletion, or need help understanding how your information is handled.",
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
      effective="April 7, 2026"
      sections={sections}
    />
  );
}
