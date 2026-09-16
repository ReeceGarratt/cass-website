# Architecture

A map of the repo for agents and developers. Read it to learn **where things live and which rules must hold**. For *why* a choice was made, see [decisions.md](decisions.md); for what's still undecided, see [questions.md](questions.md). For how-tos and gotchas, see the [wiki](wiki/index.md).

> **Keeping this doc current:** update it in the same change that adds, moves or removes a top-level directory, a key module, or an invariant. Describe modules and boundaries, not individual lines of code, so the doc doesn't go stale. Mark anything not built yet as **(planned)**.

**Status (2026-09-16):** scaffolded. The desktop home page POC exists: navigation, hero and three case study cards, built from `src/`.

## Overview

A static portfolio site built with Astro (D-001). At build time:

```
Figma (docs/figma/, hand-written until Q-005) ──▶ tokens CSS ──▶ components ──▶ layouts ──▶ pages ──▶ static HTML/CSS ──▶ Cloudflare Workers (D-009)
case-studies.json ──▶ caseStudies collection ──▶ cards on / ──▶ bespoke /work/<id> pages (planned, D-013)
```

- **Pages:** home (built), about, contact, and one bespoke page per case study (planned).
- **No client JavaScript by default.** An interactive component becomes an island only when it needs to.
- **Design values** come only from tokens (D-002).

## Code map

### Exists now

| Path | Purpose |
|---|---|
| `AGENTS.md` | Agent instructions: repo layout, where to look things up, workflow, commands, principles. **Edit this file, not `CLAUDE.md`.** |
| `CLAUDE.md` | Symlink to `AGENTS.md` (D-006). |
| `.mcp.json` | Project-scoped MCP servers. Currently just Figma (D-005). |
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
| `src/styles/global.css` | Reset, base `body` type, shared `:focus-visible` style, `.visually-hidden` and skip-link styles. |
| `src/layouts/BaseLayout.astro` | `<html lang="en-GB">`, `<head>` with `<Font />`, skip link, `<header>` with `SiteNav`, `<main id="main">`. |
| `src/components/SiteNav.astro` | The brand and nav list; sets `aria-current="page"` on the matching item (D-017). |
| `src/components/CaseStudyCard.astro` | One case study card, rendered from a `caseStudies` collection entry. |
| `src/content.config.ts` | Defines the `caseStudies` collection (`file()` loader, Zod schema). |
| `src/content/case-studies.json` | Card metadata: title, skills, summary, order (D-013). |
| `src/assets/` | SVGs (`flower`, `arrow-default`, `arrow-hover`, `corner-top-right`, `corner-bottom-left`), copied from `docs/figma/components/` and imported as Astro components. |
| `src/pages/index.astro` | The home page: hero composition and the card list, sorted by `order`. |

### Planned

| Path | Purpose |
|---|---|
| `src/pages/about.astro`, `src/pages/contact.astro` | Not built yet. |
| `src/pages/work/<id>.astro` | Bespoke case study pages, one per collection entry, styled uniquely with no shared MDX template (D-013). |
| `public/` | Static files served as-is (favicon, resume, etc. — see Q-011). |

## Invariants

These rules must always hold. Code that breaks one is a bug, even if the page looks right.

1. **No hard-coded design values.** Colour, type, spacing, radius, shadow and similar values come from token custom properties (D-002).
2. **The tokens file is hand-written for now.** `src/styles/tokens.css` is written by hand from `docs/figma/` until a token pipeline exists (Q-005, D-014). Once a pipeline exists, don't hand-edit it — change the source in Figma and regenerate.
3. **No client JS unless needed.** Anything interactive is an island with an explicit `client:*` directive and a stated reason.
4. **Card metadata lives in the `caseStudies` collection, not in page files.** Case study pages are bespoke `.astro` files with no shared template (D-013).
5. **Accessibility baseline:** semantic landmarks, one `h1` per page, a visible focus state, full keyboard operation, alt text on meaningful images, and WCAG AA contrast.
6. **Figma is the visual source of truth.** When code and Figma disagree, Figma wins unless a decision in `decisions.md` says otherwise.

## Cross-cutting concerns

- **Accessibility:** see invariant 5. Automated checks (axe/Lighthouse) are planned for the accessibility and performance pass.
- **Performance:** static output, optimised images through Astro's image handling, and minimal JS.
- **SEO:** deferred (D-004). Keep markup semantic so it's easy to add later.
- **Hosting and deployment:** Cloudflare Workers with static assets (D-009). No adapter while the site is fully static; add `@astrojs/cloudflare` only when a route renders on demand (Q-002). The deploy pipeline is open (Q-009). Platform notes: [wiki/cloudflare-workers.md](wiki/cloudflare-workers.md).
- **Observability:** deferred to a later pass (D-010); tools open as Q-008.
