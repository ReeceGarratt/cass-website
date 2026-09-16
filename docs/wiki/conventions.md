---
summary: How the wiki is structured and maintained — ingest, update, query and lint rules, page format.
updated: 2026-09-16
related: [index.md, log.md]
decisions: [D-007]
---

# Wiki conventions

This wiki follows Karpathy's "LLM wiki" pattern, adapted for a code repo. Agents maintain it so that later sessions start from built-up knowledge rather than working things out again.

Read this page when you add material, edit wiki pages, or check the wiki's health. Just *reading* the wiki only needs [index.md](index.md).

## Layers

| Layer | Location | Who changes it |
|---|---|---|
| Raw sources | `docs/raw/` | The user supplies them and agents file them. **Never edit an existing file.** Name files `YYYY-MM-DD-slug.md`. If something changes, add a new dated file. |
| Wiki pages | `docs/wiki/` | Agents create and maintain them. |
| Rules | This page, plus `AGENTS.md` for when to use the wiki | Change only with the user's agreement. |

## Operations

**Query (before a task)**
1. Read `index.md`, then the relevant pages.
2. If you answer a substantial question through research, save the answer as a page so the work isn't lost.

**Update (after a task)**
1. Create or update pages for anything non-obvious you learned: gotchas, how-tos, conventions, research.
2. Add each new page to `index.md` as one line: `[Title](file.md): one-sentence summary`.
3. Append an entry to `log.md`.

**Ingest (when the user provides new material)**
1. Save it to `docs/raw/`.
2. Update or create the affected pages, and any open questions (`docs/questions.md`) or decisions (`docs/decisions.md`).
3. Log it.

**Lint (when asked, or when you notice problems)**
1. Look for pages that contradict the code or each other, stale claims, pages missing from the index, broken links, and open questions that have already been answered.
2. Fix what you find, then log it.

## Page format

- **Files:** flat `kebab-case.md` files in `docs/wiki/`, one topic per page.
- **Frontmatter:** `summary`, `updated` (YYYY-MM-DD), `related` (other pages) and `decisions` (D-/Q- IDs).
- **Links:** relative markdown links, not `[[wikilinks]]`, so GitHub renders them.

## Content rules

- **Only record what's been verified.** Mark anything unverified, and date anything likely to go stale.
- **Decision reasoning** belongs in `docs/decisions.md`. Link to it from the wiki; don't repeat it.
- **Repo structure** belongs in `docs/architecture.md`. The wiki covers how-tos and knowledge, not a map of the code.
- **When facts change,** correct the existing page and update `updated`. Don't add a second page that contradicts it.
