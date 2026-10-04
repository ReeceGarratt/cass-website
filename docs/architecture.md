# Architecture

A map of the repo for agents and developers. Read it to learn **where things live and which rules must hold**. For *why* a choice was made, see [decisions.md](decisions.md); for what's still undecided, see [questions.md](questions.md). For how-tos and gotchas, see the [wiki](wiki/index.md).

> **Keeping this doc current:** update it in the same change that adds, moves or removes a top-level directory, a key module, or an invariant. Describe modules and boundaries, not individual lines of code, so the doc doesn't go stale. Mark anything not built yet as **(planned)**.

**Status (2026-09-30):** scaffolded. The desktop home page POC exists (navigation, hero and three case study cards), and two case study pages are built end to end: `/work/streamlining-scoring` (Absa) and `/work/consolidating-import-collections` (Standard Bank), sharing one layout, the sub nav, and the shared section components listed below (`CaseStudyFigure` is used by CS2 only so far).

## Overview

A static portfolio site built with Astro (D-001). At build time:

```
Figma (docs/figma/, hand-written until Q-005) ──▶ tokens CSS ──▶ components ──▶ layouts ──▶ pages ──▶ static HTML/CSS ──▶ Cloudflare Workers (D-009)
case-studies.json ──▶ caseStudies collection ──▶ cards on / ──▶ bespoke /work/<id> pages, composing shared section components (D-013, D-022)
```

- **Pages:** home (built), about, contact (planned), one bespoke page per case study (first one built, three planned), `/work` index (planned, Q-020).
- **No client JavaScript by default.** An interactive component becomes an island only when it needs to.
- **Design values** come only from tokens (D-002).

## Code map

### Exists now

| Path | Purpose |
|---|---|
| `AGENTS.md` | Agent instructions: repo layout, where to look things up, workflow, commands, principles. **Edit this file, not `CLAUDE.md`.** |
| `CLAUDE.md` | Symlink to `AGENTS.md` (D-006). |
| `.mcp.json` | Project-scoped MCP servers. Currently just Figma (D-005). |
| `.github/workflows/deploy-pages.yml` | Builds with the Pages base path and deploys the interim GitHub Pages preview (D-019). |
| `.claude/settings.json` | Ask rule on `git push`, enforcing D-018 (approval before every push). |
| `README.md` | Overview for humans. |
| `docs/architecture.md` | This file. |
| `docs/questions.md` | Open questions (Q-xxx), until they're decided. |
| `docs/decisions.md` | Decision log (D-xxx). |
| `docs/wiki/` | Knowledge base maintained by agents. Start from `index.md`. |
| `docs/raw/` | Unchanging source material (briefs, notes). Never edit existing files. |
| `docs/figma/` | Saved Figma MCP output, one folder per frame (D-008). Read before querying Figma, and fetch again when a design changes. |
| `docs/superpowers/` | Specs and implementation plans from the superpowers skills. |
| `astro.config.mjs` | Astro config: the Fonts API integration (D-015), no adapter, static output. |
| `src/styles/tokens.css` | Every design value as a custom property on `:root`, hand-written from `docs/figma/` (D-014). |
| `src/styles/global.css` | Reset, base `body` type, shared `:focus-visible` style, `.visually-hidden` and skip-link styles, one `.type-*` class per Figma text style (D-024), the case study grid and `.u-bleed` (invariant 8), and `.panel`, the inset Purple card used by both case studies (D-029). |
| `src/layouts/BaseLayout.astro` | `<html lang="en-GB">`, `<head>` with `<Font />` and a `head` slot, a `fullBleed` prop that drops `<main>`'s gutter padding, skip link, `<header>` with `SiteNav`, `<main id="main">`. |
| `src/layouts/CaseStudyLayout.astro` | Wraps `BaseLayout`; renders the page grid (`.case-study`), the sub nav, `<slot />` for the bespoke body, and the Read More row. Shared by every case study page (D-022). |
| `src/components/SiteNav.astro` | The brand and nav list; sets `aria-current="page"` on the matching item (D-017). |
| `src/components/CaseStudyCard.astro` | One case study card, rendered from a `caseStudies` collection entry. Takes an optional `showClient` prop (renders a `Pill`) and no longer sets its own width — the layout that places it does (home row vs. Read More row). |
| `src/components/CaseStudySubNav.astro` | Sticky sub nav: back link plus in-page anchors, with a scroll-position script (rAF-throttled `scroll`/`resize` listeners, plus a `ResizeObserver` on the nav and links so late font swaps re-measure) driving a progress underline via `aria-current` and CSS custom properties (D-023). |
| `src/components/CaseStudyIntro.astro` | Eyebrow, Red `Title 1`, user-type `Pill`s, lead paragraph slot, and the goal/outcome pair with its hairline divider. An optional `title` slot overrides the `title` prop where Figma breaks the title explicitly (CS2). |
| `src/components/SectionHeading.astro` | Handwritten eyebrow + Red `Title 2` + optional standfirst slot. `align` (`start`/`end`), `level` (`h2`/`h3`) and `titleWidth` props; used 3 times on CS1 and once on CS2 (panel, band and Solutions headings are hand-rolled `type-title-2` in their own colours) — see [componentisation](wiki/componentisation.md). |
| `src/components/FindingBlock.astro` | Image plus a heading and `LabelledFindings`. `side` swaps which column the image sits in; `columns` takes the measured image/text widths (default CS1's 802/566); `tone="inverse"` is White on Purple; `align` top-aligns or centres (D-029). 4 uses on CS1, 3 on CS2. |
| `src/components/LabelledFindings.astro` | The `<dl>` of label/body pairs (`problem`/`solution`/`outcome`, etc. — labels are data), with `tone`. Used inside `FindingBlock` and directly 6 times on CS2. |
| `src/components/FindingsList.astro` | Rule-separated statements beside a section heading (`items` are HTML strings). Once per case study so far. |
| `src/components/CaseStudyFigure.astro` | A screenshot with the standard radius and shadow, plus an optional handwritten `<figcaption>` (`captionSize`, `captionTone`, `captionAlign`). Figma's crops are baked into the asset files (D-030). 6 uses on CS2. |
| `src/components/ProcessStrip.astro` | Full-bleed Purple band of labelled process steps, joined by a recoloured hand-drawn arrow (`background-image` + `filter`). `steps` is `{ label, width }[]`, each width a measured `--size-process-step-*` token (D-028). Sizes are in `em` and the type is fitted to the band (a size container), so the row scales down from 30px to 20px, then wraps (D-033). |
| `src/components/Pill.astro` | Two colourways (`client`: Purple/White; `userType`: Light purple/Purple + a 24px icon). Used on cards and `CaseStudyIntro`. |
| `src/components/CircleArrow.astro` | The default/hover arrow-icon pair with a crossfade; extracted from `CaseStudyCard.astro`, used by it on every card, wherever the card renders (home page and Read More); `showClient` only controls the client pill. |
| `src/components/DefinitionTip.astro` | A `popovertarget` trigger plus a native `<span popover>` bubble; ~8 lines of script position it under its trigger (D-023). The Figma speech-bubble tail is deliberately omitted (doesn't survive repositioning). |
| `src/components/ReadMoreSection.astro` | "Other case studies" heading plus a `CaseStudyCard` for every collection entry except the current one, sorted by `order`. Heading-to-cards gap is Figma's 60px (`--space-read-more-gap`), and the 448px cards may shrink, so the row never forces the page wider than the viewport. No cap: renders three today only because the collection holds four entries; a fifth case study would render four cards, unlike the home page row (which does cap at three, Q-019). Worth a look once a fifth case study exists. |
| `src/utils/base-path.ts` | `withBase` / `withoutBase`: prefix root-relative links with the build's base path, and strip it from `Astro.url.pathname` (D-019). |
| `src/content.config.ts` | Defines the `caseStudies` collection (`file()` loader, Zod schema: `title`, `client`, `skills`, `summary`, `order`). |
| `src/content/case-studies.json` | Card metadata for four case studies (D-013). |
| `src/assets/` | SVGs (`flower`, `arrow-default`, `arrow-hover`, `arrow-01-curve`, `arrow-01-head`, `arrow-02`, `arrow-03`, `corner-top-right`, `corner-bottom-left`), `icons/` (avatar SVGs for `Pill`), `personas/` (CS2 persona illustrations), and the case study screenshots under `case-studies/<id>/`, copied from `docs/figma/` and imported as Astro components or `<Image>` sources (Q-018). |
| `src/pages/index.astro` | The home page: hero composition and a card list capped at the first three entries by `order` (Q-019). |
| `src/pages/work/streamlining-scoring.astro` | The first case study page (Absa), composing `CaseStudyLayout` with `CaseStudyIntro`, `ProcessStrip`, `SectionHeading`, `FindingBlock` and bespoke per-section markup for Interviews, Design, User Testing and Handover. |
| `src/pages/work/consolidating-import-collections.astro` | The second case study page (Standard Bank): the same layout and shared components, plus page markup for the persona cards, the full-bleed "new user journey" (Purple) and "reviewing" (White) bands, and the Easier Data Capture and Status tracker sections. |

### Planned

| Path | Purpose |
|---|---|
| `src/pages/about.astro`, `src/pages/contact.astro` | Not built yet. |
| `src/pages/work/<id>.astro` | The remaining two case studies (MiX Telematics, TRANSEARCH), composing the same shared components as `streamlining-scoring.astro` (D-022). |
| `src/pages/work/index.astro` | The `/work` index route; still 404s (Q-020). |
| `public/` | Static files served as-is (favicon, resume, etc. — see Q-011). |

## Invariants

These rules must always hold. Code that breaks one is a bug, even if the page looks right.

1. **No hard-coded design values.** Colour, type, spacing, radius, shadow and similar values come from token custom properties (D-002).
2. **The tokens file is hand-written for now.** `src/styles/tokens.css` is written by hand from `docs/figma/` until a token pipeline exists (Q-005, D-014). Once a pipeline exists, don't hand-edit it — change the source in Figma and regenerate.
3. **No client JS unless needed.** Anything interactive is an island with an explicit `client:*` directive and a stated reason.
4. **Card metadata lives in the `caseStudies` collection, not in page files.** Case study pages are bespoke `.astro` files composing shared section components, not a shared template (D-013, D-022).
5. **Accessibility baseline:** semantic landmarks, one `h1` per page, a visible focus state, full keyboard operation, alt text on meaningful images, and WCAG AA contrast.
6. **Figma is the visual source of truth.** When code and Figma disagree, Figma wins unless a decision in `decisions.md` says otherwise.
7. **Root-relative URLs go through `withBase`.** The site must work at `/` and under a sub-path (the Pages preview, D-019). Never hard-code `href="/…"`; in-page `#anchors` are fine.
8. **The case study page grid defaults to content, opts out to bleed.** `.case-study > *` is constrained to the content track; `.case-study > .u-bleed` opts out to full-bleed. This lives in `global.css`, not a layout's scoped `<style>`, because a scoped `.case-study > *` cannot match a child component's root element (Astro only scopes selectors to elements in a component's own template). **A section component's root element must be a direct child of the grid** — wrapping it in a stray `<div>` makes the wrapper the grid child (landing in `content`), and anything inside it marked `u-bleed` can no longer bleed. `CaseStudyLayout` passes `fullBleed` to `BaseLayout`, so `<main>` has no gutter padding and the grid's own gutter tracks are the only gutter.

## Cross-cutting concerns

- **Accessibility:** see invariant 5. Automated checks (axe/Lighthouse) are planned for the accessibility and performance pass.
- **Performance:** static output, optimised images through Astro's image handling, and minimal JS.
- **SEO:** deferred (D-004). Keep markup semantic so it's easy to add later.
- **Hosting and deployment:** Cloudflare Workers with static assets (D-009). No adapter while the site is fully static; add `@astrojs/cloudflare` only when a route renders on demand (Q-002). The deploy pipeline is open (Q-009). Until then, an interim preview deploys to GitHub Pages under `/cass-website/` (D-019, [wiki/github-pages.md](wiki/github-pages.md)). Platform notes: [wiki/cloudflare-workers.md](wiki/cloudflare-workers.md).
- **Observability:** deferred to a later pass (D-010); tools open as Q-008.
