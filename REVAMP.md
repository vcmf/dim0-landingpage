# Dim0 Landing Page — Revamp Audit & Proposals

> Working document. Basis for discussion, not a final plan.
> Goals set for this revamp: **sharpen the message**, **restructure & tighten**, **boost conversion**.
> Scope: audit-first — agree here before touching code.

## Build log (shipped so far)

- ✅ **GitHub stars in nav** — live via GitHub API (`useGitHubStars` hook,
  `app/components/use-github-stars.ts`), graceful fallback hides the badge on any
  failure. Renders `★ 104` on the "Open source" button; auto-formats (1.2k / 12k).
  Also added to the hero eyebrow. *(C2 / §7a)*
- ✅ **Hero sharpened** *(M1/M2)* — kept "Your canvas thinks back. Together.",
  promoted the concrete line + agent-reads-first hook into the tagline
  ("…on one infinite board — the AI reads your board *before* it acts").
- ✅ **Comparison merged into the problem section** *(M3 / S4 + S3 merge)* — the
  three-into-one visual (Notion / Excalidraw / ChatGPT → Dim0) now lives inside the
  "One idea, five tabs" section as its payoff. Removed the redundant fragmentation
  illustration and the standalone VS section. One section shorter.
- ✅ **Testimonials section** *(§7b / C2)* — featured pull-quote + 3-column masonry
  quote wall (avatars, handles, star rows) + "104★ on GitHub" aggregate line, placed
  just above Pricing. `#testimonials`. Left-aligned quote cards = visually distinct
  from the trio-cards (helps S2).

- ✅ **Mid-page CTA band** *(C1)* — lightweight sienna-tinted "Convinced? Start on
  the canvas." band with a Start-free button, placed right after Collaboration.

**Decisions locked:** testimonials attribution stays generic (no directory name);
composer model string "Claude Sonnet 4.6" confirmed accurate — left as-is.

- ✅ **Testimonials → floating marquee** — replaced featured+wall with two
  auto-scrolling, full-bleed rows (opposite directions, pause on hover,
  reduced-motion fallback). Pulled in short Tier-3 one-liners for volume → reads as
  "many". More compact vertically. 13 quotes total.
- ✅ **S2 — Privacy + Open-source merged into one Trust section** (`#trust`,
  "Yours. And it stays yours."). 6 trio-cards → 4, one lede, one CTA row. Kept the
  "never do" strip + policy link.

**Still open (optional):**
- C2 later — real testimonial avatars (currently initials) if/when we have images.
- See §9 compaction plan below.

## 9. Compaction plan (the page is still long)

Current flow (~15 content sections): Hero · ProductShot · Why · How · Features ·
Mini-apps · Collab · MidCTA · Rich-notes · Use-cases · Themes · Models · Trust ·
Testimonials · Pricing · FAQ · CTA.

Ranked compaction moves (each is independent — pick any):

1. **Themes + Models → one "Make it yours" strip** *(S3, easy win)*. — *declined for
   now.*
2. ✅ **Fold Rich-notes video into Use-cases** *(S3)* — DONE. Rich-notes was one
   video as its own section; it's now the "Write" use case (the card renders the
   video, copy folded in). Standalone section removed. `.rich-video-frame` CSS is
   now dead (harmless; clean up later if desired).
3. **Trim the explain-the-product trio** (How / Features / Use-cases overlap) —
   *declined for now.*
4. **Reconsider ProductShot** — *declined for now.*

Moves still on the table if you want more compaction later: move 1 (Themes+Models).

### Later additions (round 3)

- ✅ **Merge visual animated** — static connector replaced with flowing canvas edges
  (curved SVG paths, glowing packets streaming into the Dim0 node). On-brand, GPU-cheap.
- ✅ **Hero video reworked** — app screenshot as poster, bigger frame (aspect-locked,
  no crop), plays once on 75%-in-view or click (no loop), poster returns on end.
- ✅ **Features + Mini-apps + Use-cases → one "One board. Everything on it." bento**
  (`#features`). 2 big cards (Board-aware AI, Mini-apps), 1 wide media card (Rich
  notes video), 4 small capability cards. Notion-style hierarchy; 3 sections → 1.

**Tooling note:** Playwright MCP is added but shows "Pending approval" — approve it
once in an interactive `claude` session to enable native browser screenshots/perf.
Chrome DevTools MCP for perf: `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest`
(verify package name; the earlier suggested Anthropic-hosted URL was unverified).

**Note:** Turbopack occasionally serves stale CSS after appending rules to
globals.css — if new styles don't appear, `rm -rf .next` + restart `npm run dev`.

**⚠️ Flagged during build:** the existing "One idea, five tabs" (Why) section's
illustration already depicts scattered tool-cards merging into "one surface" — now
sitting directly above the new "Three tools. One board." section, it reads as the
same idea twice. Resolution options: (a) drop the Why illustration and let VS carry
the visual, (b) merge Why + VS into one section, or (c) keep both but differentiate
the Why art. *Needs a call — see S3.*

---

## 0. Product recap (so we're aligned on the message)

**Dim0 — "The thinking canvas. Your canvas thinks back."**

Open-source (MIT), privacy-first, real-time collaborative AI canvas. Notes, docs,
code, mini-apps, sketches, charts, and a **board-aware AI agent** on one infinite
board. Rendered on an in-house engine (`canvas-harness`).

**The defensible claim:** the agent **reads the board's context first, then acts** —
dropping editable nodes right where you're already thinking. Not chat-first with a
canvas bolted on; canvas-first with the agent native to it.

- Cloud: `app.dim0.net`
- Code: `github.com/vcmf/dim0`
- Stack: Next.js 16, React 19, TypeScript, Tailwind v4

---

## 1. The core problem

The page is well-written and polished, but it is **long and evenly-weighted** —
16 full sections, each with eyebrow + title + lede + supporting content, all at
roughly the same visual volume. There is no sense of *"these 3 things matter most."*

A first-time visitor must read a lot before the *aha* lands. The two conversion
moments (hero composer, final CTA) sit ~1200 lines apart with 14 equal-weight
sections between them.

All three goals converge on one move:
**make the top of the page do more work, and let the rest taper.**

### Current section order (16)

1. Hero — animated graph bg, typewriter composer, hero video
2. ProductShot — big board screenshot
3. Why — "One idea, five tabs" (the problem)
4. How it works — 3 steps: Read → Act → Write
5. Features — 4 pillars
6. Mini-apps showcase
7. Collaboration — "Now multiplayer" + live canvas animation
8. Rich notes video
9. Use cases — Learn / Research / Sketch / Write
10. Themes — 8-theme grid
11. Models — 8 AI vendor chips
12. Privacy — 3 cards + "never do" strip
13. Open source — 3 cards
14. Pricing — Free / Basic / Plus / Self-host
15. FAQ
16. CTA + footer

### Nav links today

`Features` · `Pricing` · `Engine` (/canvas-harness) · `FAQ` — plus `Open source`
and `Try Dim0` CTAs.

---

## 2. MESSAGE — sharpen

### M1. The hero headline is abstract *(high impact)*
"Your canvas *thinks back.* Together." is poetic but doesn't tell a cold visitor
what the product *is*. The concrete line ("Notes, mini-apps, and agents on one
infinite board") is demoted to a sub-line.

- **Proposal:** lead with the concrete line as the headline (or co-headline); keep
  the poetic line as a kicker/eyebrow. First screen answers "what is this" in <3s.

### M2. The killer differentiator is buried *(high impact)*
"Reads first. Acts second." — the agent reading board context before acting — is
the single most defensible claim vs. ChatGPT / Notion AI. Today it is pillar #3 of
4 in Features, and step 2 of How.

- **Proposal:** promote it to a first-screen proof point.

### M3. The strongest positioning line is hidden in the FAQ *(high impact)*
FAQ answer #2 contains:
> "Notion has rich notes but no canvas. Excalidraw has a canvas but no notes or AI.
> ChatGPT Canvas has AI but no spatial workspace. Dim0 has all three."

That is a comparison table waiting to happen. It should be a **section**, not a
buried FAQ answer.

### M4. Microcopy consistency
Small: hero microcopy says "8 AI models"; Models section lists exactly 8. Good —
keep those in sync if the count changes.

---

## 3. STRUCTURE — restructure & tighten

### S1. Two sections say the same thing *(merge)*
"How it works" (Read → Act → Write) and Features pillar #3 ("Reads first. Acts
second.") are the same idea twice.
- **Proposal:** merge into one canonical "How it works."

### S2. Three identical "trio card" sections in a row *(monotony)*
Collaboration, Privacy, and Open-source all use the same 3-card layout. Reads as
filler by the third one.
- **Proposal:** compress **Privacy + Open-source into one trust section**
  ("Yours, and it stays yours") — privacy + MIT/self-host are the same trust story.

### S3. Thin standalone sections *(fold in)*
- "Rich notes" (one video) is thin as its own section → fold into Use cases as the
  "Write" case.
- "Why / One idea, five tabs" overlaps heavily with the proposed comparison section
  (M3) → keep one, not both.
- Themes + Models are both lightweight → consider one "Make it yours" strip.

### S4. Proposed tighter order (16 → ~11)

1. **Hero** (sharper headline + composer)
2. **Product shot**
3. **NEW — "vs. the tabs you use now"** comparison (from M3) — *the aha*
4. **How it works** (merged with the board-aware pillar, S1)
5. **Mini-apps** (most unique + demo-able — move up)
6. **Collaboration**
7. **Use cases** (Rich-notes video folded in as "Write", S3)
8. **Make it yours** — Themes + Models combined (S3)
9. **Trust** — Privacy + Open-source merged (S2)
10. **Pricing**
11. **FAQ + CTA**

---

## 4. CONVERSION — boost

### C1. Add a mid-page CTA *(high impact)*
Only two conversion points today: hero and the very bottom. Someone convinced by
Collaboration or Mini-apps has nowhere to click.
- **Proposal:** a lightweight "Start free · app.dim0.net" band after Mini-apps or
  Collaboration.

### C2. No social proof anywhere *(highest conversion gap → now DECIDED)*
No GitHub star count, user count, testimonials, or "who's using it." For an OSS
product this is the biggest gap. **We have the material — see §7.**
- **DECIDED:** GitHub stars (104) in the nav button. Hardcode a constant now; live
  API fetch optional later.
- **DECIDED:** add a testimonials section from real public directory reviews (§7).

### C3. Confirm the composer model label *(trust)*
Composer shows a hardcoded **"Claude Sonnet 4.6"**. If that's not a real/current
model string, it undercuts trust on the first screen.
- **Action:** confirm it's accurate; make it easy to update. *(needs your input)*

### C4. Pricing free-tier note framing
"Free is limited while we run on a small budget" is honest and charming but sits
under the first card as a slightly apologetic note. Fine to keep — just ensure it
doesn't read as "the free tier is barely usable" at a glance.

---

## 5. Priority order (bang-for-buck)

1. **M3 + S4** — comparison section & reorder *(the aha + the flow)*
2. **M1 + M2** — hero sharpening
3. **C2** — social proof (GitHub stars)
4. **C1** — mid-page CTA
5. **S1 + S2 + S3** — merge duplicate / monotonous / thin sections

---

## 6. Open questions for discussion

- [ ] **Bold vs. safe:** keep the current visual language and restructure, or also
  refresh the aesthetic (typography, motion, spacing)?
- [ ] **Comparison section format:** table (Dim0 vs Notion/Excalidraw/ChatGPT
  Canvas) vs. a more visual "three tools → one board" illustration?
- [ ] **Hero headline:** which line leads? Draft options:
  - A: "Notes, mini-apps, and agents on one infinite board." *(concrete-first)*
  - B: "The canvas that thinks with you." *(benefit-first)*
  - C: keep "Your canvas thinks back." but add a concrete sub-headline that leads.
- [ ] **Social proof:** do we have real star counts / user numbers / quotes to use
  yet, or start with just the live star badge?
- [ ] **Composer model string** — what should it say? (C3)
- [ ] **Cut or keep** the "One idea, five tabs" section if we add the comparison?

---

---

## 7. Social proof — decided material

### 7a. GitHub stars in nav *(agreed)*
Repo is at **104 stars**. Surface it on the "Open source" nav button
(e.g. `★ 104` or `Open source · 104`). Hardcode `104` as a constant for now;
switch to a live GitHub API count later if we want it to self-update.
Also worth echoing in the hero eyebrow and the OSS/Trust section.

### 7b. Testimonials section *(agreed — real public directory reviews)*
Reviews are public on AI-directory sites, free for anyone to read → fine to quote
with attribution. Rule: **keep them real, attribute by handle/name, link where
possible, never paraphrase into something they didn't say.**

**Placement:** just above Pricing (reassurance at the decision point).
**Format:** deliberately *different* from the trio-card layout (avoids the S2
monotony) — one featured pull-quote + a quote wall of ~6–8, star rows where we
have them. Optional aggregate strip: directory rating + "104★ on GitHub".

#### Tier 1 — gold (restate our positioning; feature these)
- **@shopiahomedesign** — "Placing agent output directly on the board as nodes
  instead of a chat sidebar is the detail that sells this. Spatial context
  survives, chat history doesn't." ← use as the **featured** pull-quote.
- **@omribenshoham** — "The spatial design of this canvas is really elegant. Being
  able to place AI outputs directly as nodes instead of chat history is a clever
  insight."
- **Tomas Jones** — "Clean pitch, the problem is immediately relatable. The
  'everything on one canvas' angle is compelling, and making the AI write directly
  as nodes is a genuinely nice UX insight — it feels native rather than bolted on.
  Open source is a good trust signal for the thinking-tools crowd." *(trim if long)*
- **@m2721** — "I am a poweruser of Miro and must say very well done :-)!"
  *(competitor-user endorsement — high credibility)*
- **Christian Carestia** — "great idea, definitely something missing in the market"

#### Tier 2 — solid, attributed
- **@erdemgulen** ★★★★★ — "Great design and ease to use, collaboration makes it
  more productive."
- **@viciousse** ★★★★★ — "I like the idea, the multiplayer and the design!"
- **lianbo zhou** — "Great idea, and the interface is beautiful and elegant. The
  canvas-based approach makes the tools truly useful."
- **Abhinav Ramesh** (Founder & CEO, matterhorn.so) — "That's so cool… AI is really
  moving fast." *(weak text, but the title adds authority — use for the name badge)*

#### Tier 3 — too thin → skip, or fold into an aggregate rating only
@supahmation ("Great product!"), @WurtApp ("Brilliant work… keep it up"),
cerebrixos ("Good for visualising"), Jnanesh Bekal ("Very good overall"),
Jacky zeng ("This tool is very nice."), plus no-text ratings @Cosmo_bk (4★),
@jakemckeegan08 (5★).

**To confirm:** which directory/directories are these from (for a "Rated on ___"
label + links)? "Well deserved lead this month" (@shopiahomedesign) suggests Dim0
was featured/led a directory — if true, "#1 on ___ this month" is strong social
proof worth its own badge.

---

## 8. Messaging model — the guiding frame

Every copy decision (especially the hero) gets checked against this. The
"sell the value vs. sell the idea" advice is contradictory only because each
source is describing a different *layer*. A landing page needs all three, stacked:

| Layer | Job | For Dim0 |
|---|---|---|
| **1. Aspiration** (identity/idea) | make them *feel* & remember | "Your canvas thinks back" |
| **2. Concrete promise** (the hook) | make it *specific & believable* | "Notes, mini-apps, and agents on one board — the AI reads your board before it acts" |
| **3. Proof** (evidence) | make them *trust* it | video · 104★ · testimonials · perf numbers |

**The test for any aspirational line:** *could a competitor paste it on their site
unchanged?* If yes, it's a category platitude, not positioning.
- ❌ "Embrace visual thinking" → Miro, Milanote, Excalidraw could all use it. Empty.
- ✅ "Your canvas thinks back" → points at a real, defensible capability. Keep it.

**The villain frame:** the enemy Dim0 defeats is **fragmentation** — five tabs, the
copy-paste-back, thinking scattered across tools that don't talk. The aspiration is
just the positive mirror of that villain: *your thinking, whole, in one place — and
it thinks with you.* (We already own the villain half: "One idea, five tabs.")

**Recommendation:** don't chase a new abstract tagline. Keep "Your canvas thinks
back" as the emotional lead (Layer 1), promote the concrete line directly beneath it
as the believable hook (Layer 2 = M1), and invest heavily in Layer 3 proof (§7).

---

*Next step: agree on Section 5 priorities + Section 6 answers, then I start with the
highest-leverage piece (comparison section + hero), with §7 social proof and §8 as
the frame.*
