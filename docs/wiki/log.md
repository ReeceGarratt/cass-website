# Wiki log

A chronological record that is only ever appended to. **Add new entries at the bottom and never edit old ones.**

Entry format (easy to grep):

```
## [YYYY-MM-DD] <type> | <short title>
One to three lines: what changed, which pages or decisions it touched.
```

Types: `ingest` (new raw source processed) · `update` (wiki pages created or changed) · `decision` (D-/Q- entry added, resolved or superseded) · `query` (a question answered and the answer filed as a page) · `lint` (health check).

To see recent activity, run `grep "^## \[" docs/wiki/log.md | tail -10`.

---

## [2026-09-16] update | Repo bootstrapped
Installed the superpowers plugin (user scope) and the Figma MCP (project scope). Added README, AGENTS.md, and a CLAUDE.md symlink. Pages: agent-tooling, figma-mcp, windows-dev-environment.

## [2026-09-16] ingest | Project brief
Filed `raw/2026-09-16-project-brief.md` from the planning chat. It fed D-001 to D-004 and Q-001 to Q-005.

## [2026-09-16] decision | Initial decisions and open questions
Recorded D-001 (Astro), D-002 (tokens as CSS custom properties), D-003 (MDX content collection), D-004 (SEO deferred), D-005 (remote Figma MCP), D-006 (CLAUDE.md symlink), D-007 (docs system). Opened Q-001 hosting, Q-002 contact form, Q-003 CMS, Q-004 styling, Q-005 token pipeline.

## [2026-09-16] update | Documentation system created
Added docs/architecture.md, docs/decisions.md, and this wiki (index, log). Added the maintenance rules to AGENTS.md.

## [2026-09-16] update | AGENTS.md restructured
Reorganised into: repo layout, lookup routing, workflow (with superpowers skills), prerequisites, commands, testing, commit messages, principles. Moved the wiki maintenance rules to the new conventions.md page. Updated index, architecture and D-007 to match.

## [2026-09-16] decision | Q-006 opened
Opened Q-006: testing, linting and formatting approach.

## [2026-09-16] update | Brainstorming rule changed
Workflow in AGENTS.md: brainstorming now runs for every task except tiny ones. Only planning (writing-plans) is skipped for small, bounded changes.

## [2026-09-16] query | Figma MCP plan limits and call budget
Researched rate limits by plan and seat, and the MCP tool list. Estimated calls per screen and for the whole build (not measured yet). Filed in figma-mcp.
Account: signed in as the owner of a Professional plan, seat assumed Full; confirm with `whoami`.

## [2026-09-16] decision | D-008 save Figma MCP output
Added D-008: tool output saved in `docs/figma/` (format in its README) so frames aren't fetched twice. Updated architecture.md and index.md.

## [2026-09-16] update | AGENTS.md Figma working rules
Added a "Working with Figma" section: check snapshots first, outline before section-by-section context, no parallel calls, read only, ask for long copy exports. Updated the repo layout and lookup routing tables.

## [2026-09-16] update | Open questions split into questions.md
Moved Q-001 to Q-006 from decisions.md into the new docs/questions.md, which has a summary table. Questions move to decisions.md as D- entries once decided. Updated AGENTS.md, architecture, conventions, index, README and D-007.

## [2026-09-16] update | Figma build workflow
Added a four-phase build workflow (access, foundations, screens one at a time, wrap-up) to docs/figma/README.md, and a short version to the "Working with Figma" section of AGENTS.md.

## [2026-09-16] decision | Q-007 opened
Opened Q-007: which Figma plan to use for MCP access. Recommended Professional, billed monthly, for the build only. Corrected figma-mcp, which wrongly said the account was already on Professional. Added the finding that REST API reads of Starter files are capped at 6 a month.
