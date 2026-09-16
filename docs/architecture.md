# Architecture

A map of the repo for agents and developers. Read it to learn **where things live and which rules must hold**. For *why* a choice was made, see [decisions.md](decisions.md); for what's still undecided, see [questions.md](questions.md). For how-tos and gotchas, see the [wiki](wiki/index.md).

> **Keeping this doc current:** update it in the same change that adds, moves or removes a top-level directory, a key module, or an invariant. Describe modules and boundaries, not individual lines of code, so the doc doesn't go stale. Mark anything not built yet as **(planned)**.

**Status (2026-09-16):** pre-scaffold. Only the docs and agent config exist. Everything under `src/` below is planned.

## Overview

A static portfolio site built with Astro (D-001). At build time:

```
Figma variables ──(token pipeline, Q-005)──▶ tokens CSS ──▶ components ──▶ layouts ──▶ pages ──▶ static HTML/CSS ──▶ host (Q-001)
MDX case studies ──▶ content collection (typed schema) ──▶ [slug] route ─────────────────────▲
```

- **Pages:** home, about, contact, the case studies index, and one page per case study.
- **No client JavaScript by default.** An interactive component becomes an island only when it needs to.
- **Design values** come only from tokens (D-002).

## Code map

### Exists now

| Path | Purpose |
|---|---|
| `AGENTS.md` | Agent instructions: repo layout, where to look things up, workflow, commands, principles. **Edit this file, not `CLAUDE.md`.** |
| `CLAUDE.md` | Symlink to `AGENTS.md` (D-006). |
| `.mcp.json` | Project-scoped MCP servers. Currently just Figma (D-005). |
| `README.md` | Overview for humans. |
| `docs/architecture.md` | This file. |
| `docs/questions.md` | Open questions (Q-xxx), until they're decided. |
| `docs/decisions.md` | Decision log (D-xxx). |
| `docs/wiki/` | Knowledge base maintained by agents. Start from `index.md`. |
| `docs/raw/` | Unchanging source material (briefs, notes). Never edit existing files. |
| `docs/figma/` | Saved Figma MCP output, one folder per frame (D-008). Read before querying Figma, and fetch again when a design changes. |

### Planned (Astro conventions; confirm when scaffolding)

| Path | Purpose |
|---|---|
| `src/pages/` | File-based routes: `index`, `about`, `contact`, `case-studies/index`, `case-studies/[slug]`. Pages put layouts and components together; they don't hold long-form content. |
| `src/layouts/` | Page shells: document head, header/nav, footer, and skip link. |
| `src/components/` | Reusable `.astro` components with typed props and scoped styles. |
| `src/content/` | Case study MDX files (D-003). |
| `src/content.config.ts` | Content collection definitions and frontmatter schemas. |
| `src/styles/` | The tokens file (generated from Figma), global reset and base typography. |
| `public/` | Static files served as-is (favicon, etc.). |

## Invariants

These rules must always hold. Code that breaks one is a bug, even if the page looks right.

1. **No hard-coded design values.** Colour, type, spacing, radius, shadow and similar values come from token custom properties (D-002).
2. **The tokens file is generated.** Don't hand-edit it once a pipeline exists (Q-005). Change the source in Figma and regenerate.
3. **No client JS unless needed.** Anything interactive is an island with an explicit `client:*` directive and a stated reason.
4. **Content lives in collections, not in page files.** Case study text lives in `src/content/`.
5. **Accessibility baseline:** semantic landmarks, one `h1` per page, a visible focus state, full keyboard operation, alt text on meaningful images, and WCAG AA contrast.
6. **Figma is the visual source of truth.** When code and Figma disagree, Figma wins unless a decision in `decisions.md` says otherwise.

## Cross-cutting concerns

- **Accessibility:** see invariant 5. Automated checks (axe/Lighthouse) are planned for the accessibility and performance pass.
- **Performance:** static output, optimised images through Astro's image handling, and minimal JS.
- **SEO:** deferred (D-004). Keep markup semantic so it's easy to add later.
- **Hosting and deployment:** not decided (Q-001). Don't add an adapter yet.
