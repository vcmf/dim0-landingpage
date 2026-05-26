import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "../../components/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of service for Dim0, the thinking canvas. Learn the basic rules for using the product responsibly and respectfully.",
};

const sections: LegalSection[] = [
  {
    heading: "Our intent",
    body: [
      "Dim0 is built for thinking, research, creation, and communication. We want it to be useful, respectful, and human-centered.",
      "These terms exist to protect the product, the people using it, and the people affected by what gets made with it.",
    ],
  },
  {
    heading: "Use Dim0 responsibly",
    body: [
      "You agree not to use Dim0 for illegal, abusive, harmful, deceptive, exploitative, or privacy-violating activity.",
      "That includes harassment, stalking, fraud, malware, non-consensual sexual content, child sexual abuse material, extremist propaganda, or attempts to generate or organize harmful acts.",
    ],
  },
  {
    heading: "Your content",
    body: [
      "You keep ownership of the content you create, upload, or connect to Dim0.",
      "You are responsible for making sure you have the right to use the content you bring into the product and for how you use any generated outputs.",
    ],
  },
  {
    heading: "AI-generated outputs",
    body: [
      "AI features can be useful, but they can also be wrong, incomplete, or inappropriate. You are responsible for reviewing outputs before relying on them.",
      "Do not treat generated content as guaranteed factual, safe, or professionally validated.",
    ],
  },
  {
    heading: "Self-hosting and cloud use",
    body: [
      "If you use Dim0 in the cloud, we operate the hosted service and related infrastructure.",
      "If you self-host, you are responsible for your own deployment, security, compliance, and data handling.",
    ],
  },
  {
    heading: "Service changes",
    body: [
      "We may update, improve, suspend, or remove features over time. We may also change these terms when needed.",
      "If we make material changes, we will update this page and revise the effective date below.",
    ],
  },
  {
    heading: "No warranties",
    body: [
      "Dim0 is provided on an as-is and as-available basis. We do not promise uninterrupted service, perfect accuracy, or fitness for every purpose.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the maximum extent allowed by law, Dim0 and its operators are not liable for indirect, incidental, special, consequential, or punitive damages resulting from your use of the product.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "If you have questions about these terms, contact us at contact@dim0.net.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Dim0 · Terms"
      title="Terms of Service"
      effective="April 7, 2026"
      sections={sections}
    />
  );
}
