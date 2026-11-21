# Personal Website — Plan

## 1. Goal
Replace the dated bogdangosa.com with a **showpiece portfolio** that proves "AI developer with real frontend craft" in under 10 seconds. Audience: recruiters, startup founders, hackathon organizers, clients. Over-the-top scroll storytelling (reference: landonorris.com — giant type, pinned sections, clip-path wipes, marquee, smooth scroll), bold and memorable, but fast and accessible.

Success = (a) people remember it, (b) projects are editable by changing JSON only, (c) Lighthouse ≥ 90 perf on desktop, usable on mobile.

## 2. Design system
| Token | Value |
|---|---|
| bg-0 / bg-1 / bg-2 | `#121214` / `#1a1a1f` / `#232329` (dark gray) |
| text | `#ededf2`, muted `#9a9aa8` |
| accent | `#8b5cf6` (glow `#a78bfa`, deep `#5b21b6`) |
| display font | Space Grotesk / Clash Display, huge (10–20vw), tight tracking |
| mono font | Space Mono (carried over from current site) |
| texture | film-grain overlay, subtle purple radial glows, custom cursor |

## 3. Sections
Preloader → Hero (giant name, kinetic type) → Manifesto/About → Experience → Projects → Awards → Stack → Contact/Footer.

## 4. Animation stack
- **Lenis** smooth scroll, driving **GSAP ScrollTrigger** (pin, scrub, SplitText-style reveals, clip-path wipes).
- **Framer Motion** for route/page and component transitions.
- Optional single WebGL element (react-three-fiber or OGL) in hero — lazy loaded.
- `prefers-reduced-motion` fallback, simplified mobile variants, no scroll-hijacking that breaks anchors/keyboard.

## 5. Architecture (Next.js App Router + TypeScript + Tailwind)
```
app/
  layout.tsx, page.tsx
  projects/[slug]/page.tsx     # generated from JSON
components/
  sections/ (Hero, About, Experience, Projects, Awards, Stack, Contact)
  motion/   (Reveal, SplitText, Marquee, PinnedScroller, Cursor)
data/
  projects.json  experience.json  site.json
lib/
  projects.ts   # loader + Zod validation (swap for MDX/CMS later)
public/projects/*  # images
```
**Project JSON shape**
```json
{
  "slug": "rl-calico",
  "title": "RL on Modern Boardgames",
  "tagline": "Agents that learn to play Calico",
  "description": "…",
  "year": 2026,
  "role": "Solo",
  "category": "ai",            // ai | web | mobile | game
  "featured": true,
  "tags": ["PyTorch", "DQN", "MCTS", "Godot"],
  "cover": "/projects/calico.jpg",
  "images": [],
  "links": { "github": "…", "demo": null },
  "award": null
}
```
Zod validates at build, so a typo fails the build instead of the live site. `featured` + array order control the home page; the rest go to a full index.

## 5b. Content seed
Initial `projects.json` = 4 CV projects (Calico RL, Mills AI, EduLearn, Boardgame Reviews) + Let's Cope, ThinkUp Platform + a curated few legacy ones. Full legacy list in `bogdangosa-com-scrape.md`.

## 6. Roadmap
- M0 Choose a mock (or hybrid) from `/mock`
- M1 Scaffold Next.js, tokens, fonts, layout
- M2 Smooth scroll + hero + preloader
- M3 Projects from JSON + detail pages
- M4 Experience + awards + stack
- M5 Polish: perf, a11y, SEO/OG, reduced motion, mobile
- M6 Deploy on Vercel, point bogdangosa.com

## 7. Risks
Mobile scroll jank · WebGL bundle size · motion accessibility · heavy images (use `next/image`) · over-animation hurting readability.

## 8. Mocks (see `/mock`)
1. `01-orbit-neural` — AI work: particle network, experience as neural net.
2. `02-board-game` — passion: board games/RL; the page is a game board, a pawn walks the sections.
3. `03-terminal-glitch` — dev craft: giant type, wipes, terminal, glitch, most Lando-like.

Open items: real bio copy, photo, mock choice, which legacy projects to keep.
