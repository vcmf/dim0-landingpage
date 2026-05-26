const SITE_URL = "https://dim0.net";
const GH_URL = "https://github.com/vcmf/dim0";
const DESCRIPTION =
  "An infinite AI canvas where notes, sketches, code, and agents work on one board. Open source, MIT, 8 models. Free to try — your work stays yours.";

const softwareApplication = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dim0",
  description: DESCRIPTION,
  url: SITE_URL,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  image: `${SITE_URL}/board-mindmap-deaging.png`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "Dim0",
    url: SITE_URL,
  },
  softwareVersion: "0.3",
  license: "https://opensource.org/licenses/MIT",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dim0",
  url: SITE_URL,
  logo: `${SITE_URL}/dim0.svg`,
  sameAs: [GH_URL],
};

// Plain-text mirror of the FAQ rendered on the page. Keep in sync with FAQS in
// app/(dim0)/page.tsx — order and questions must match.
const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Dim0, exactly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A thinking canvas where notes, docs, code, widgets, and AI agents live on one board together. Rich notes like Notion, freehand shapes like Excalidraw, agents that act on the board — same surface.",
      },
    },
    {
      "@type": "Question",
      name: "Is Dim0 a Notion or Excalidraw alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — Dim0 is a Notion alternative and an Excalidraw alternative on one canvas, with a board-aware AI agent on top. Notion has rich notes but no canvas. Excalidraw has a canvas but no notes or AI. ChatGPT Canvas has AI but no spatial workspace. Dim0 has all three on one board — and the agent reads the surrounding context before it acts.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, free to use during early access at app.dim0.net. The product is also open source — fork it, self-host it, bring your own model keys.",
      },
    },
    {
      "@type": "Question",
      name: "Is it open source?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Inspect it, fork it, self-host it — it's all on GitHub.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI models?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude, GPT, Gemini, Mistral, DeepSeek, Qwen, Kimi, GLM. Pick what you trust; switch anytime.",
      },
    },
    {
      "@type": "Question",
      name: "Can I collaborate with others?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Today Dim0 is built for single-user thinking. Real-time multi-user collaboration is on the roadmap.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a desktop or mobile app?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dim0 runs in the browser today. Tablets work well; phones are read-friendly. Native apps may follow.",
      },
    },
    {
      "@type": "Question",
      name: "Why canvas-first instead of chat-first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Complex thinking is spatial. A canvas keeps structure, relationships, and partial ideas visible at once. Chat buries context.",
      },
    },
    {
      "@type": "Question",
      name: "What can the agent actually do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Read selected context, search the web, run code, and generate nodes, widgets, charts, or summaries directly on the board.",
      },
    },
    {
      "@type": "Question",
      name: "How big can boards get?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Thousands. We built our own canvas engine — canvas-harness — 10k visible nodes pan at ~80 fps on an M1, idle stays at ~120 fps. Same league as Excalidraw and tldraw. Most boards live in the hundreds; the ceiling is there if you need it.",
      },
    },
    {
      "@type": "Question",
      name: "How is my data used?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On the cloud at app.dim0.net: prompts and board context are sent only to the model provider that produces the answer (Anthropic, OpenAI, Google, etc.) under their terms. We don't train on your content, we don't sell data, we don't profile you for ads, and we run no behavioral telemetry on your boards. Self-host: everything stays on your infrastructure — local Postgres and vector DB, your own model keys, no calls back to us.",
      },
    },
    {
      "@type": "Question",
      name: "What format are my notes stored in?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pure Markdown. Download any note and paste it into any other editor — Obsidian, VS Code, plain text. Boards export cleanly too. No proprietary blocks, no vendor format you can't walk away from.",
      },
    },
  ],
};

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
