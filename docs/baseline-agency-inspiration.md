# Inspiration: baseline.agency

Source: https://www.baseline.agency/ (fetched 2026-11-21). A brand-identity studio site, built with Next.js + Tailwind.

**What I could and couldn't see.** I read the page's text and the raw HTML/class names. I could *not* see rendered visuals, scroll behaviour or hover/cursor effects, so motion notes below are inferred and marked as such. Verified vs. inferred is labelled throughout.

## Verified facts
- **Stack:** Next.js (`/_next/` assets) + Tailwind utility classes. A fixed, pointer-events-none top layer at `z-[99999]` (likely a custom cursor or overlay).
- **Palette (from Tailwind classes):** near-black text `#040404`, off-white `#f6f6f6`, greys `#6b6b6b` / `#666` / `#d2d2d2` / `#d9d9d9`, dark panels `#101010` / `#131313` / `#1f1f1f`. Essentially monochrome; colour comes from client imagery, not the UI.
- **Type:** several font variables loaded, including a serif (`--font-averia`) used for emphasis. Headings are sentence case.
- **Section order:** nav → hero (bold claim + two CTAs + "Booking projects for Nov'26" status badge) → first-person manifesto → case-study carousel with `1/2` counters → stats row (75+ projects, 3–4 weeks, 100% on time) → client logo strip → "We rebuild the baseline." → per-project case blocks with result numbers → second CTA band → brand grid → testimonials carousel → 3-step process ("the first one is free") → FAQ accordion with category tabs → final CTA → footer.
- **Copy tone:** short, direct, confident, "we/you". Every claim is backed by a number.
- **Detail worth noting:** an "Ask AI about Baseline" row linking to ChatGPT / Claude / Perplexity / Grok.

## Inferred (not confirmed)
- Looping client-logo ticker; video-style step cards (stills named under `/videos/steps/`); grid-line and top-fade background assets; custom cursor.

## What to take for our site
| Idea from Baseline | How it fits the portfolio |
|---|---|
| **Numbers as proof** (stats row, per-case results) | Add a stats band: "3 / 4 hackathon podiums" → "100% podium rate", "millions of documents classified", "4 production roles". Result metrics on each project card. |
| **Status badge** ("Booking projects for Nov'26") | Hero badge, e.g. "● Open to AI automation roles/projects". Pulsing purple dot. |
| **Confident one-line claim + two CTAs** | Hero sub-line plus "Download CV" and "Get in touch" buttons. |
| **First-person manifesto** | Keep the purple statement section personal and short (already similar). |
| **Mono-chrome restraint, one accent** | Matches our dark grey + single purple. Resist adding more colours. |
| **Serif accent word in a sans headline** | Italic serif on one word per heading (e.g. "AI" or "talk") adds editorial polish against the grotesk. |
| **Carousels with `1/3` counters** | Optional for featured projects or testimonials; fits the mono style we already use. |
| **Simple 3-step process** | "How I work": 01 understand the process → 02 prototype with AI → 03 ship & evaluate (ties to Arize Phoenix evals). |
| **FAQ accordion with tabs** | A short "Working with me" FAQ aimed at businesses (stack, availability, how automation projects run). |
| **Logo strip** | Ticker of tech/tools or companies (Planet Group, Let's Cope, ThinkUp) beneath the marquee. |
| **"Ask AI about…" links** | Fun, on-brand for an AI developer; a footer row that opens an AI chat prefilled with a question about you. |
| **Testimonials** | Collect 1–2 short quotes (Let's Cope / ThinkUp / hackathon mentors). |

## Suggested next steps (pick any)
1. Hero status badge + CV / contact buttons.
2. Stats band right after the marquee.
3. Serif italic accent word in headings.
4. "How I work" 3-step section aimed at business automation.
5. Add result numbers to `data/projects.json` (`metrics` field) and show them in the project rows.
