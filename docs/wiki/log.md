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

## [2026-09-16] query | Hosting, monitoring and CI/CD research
Compared Cloudflare Workers, S3 + CloudFront, Amplify, Netlify, Vercel and GitHub Pages: pricing (checked 2026-09-16), bot and cost-spike risk, security, monitoring tools, and GitHub Actions support. Filed as hosting-options, cloudflare-workers and monitoring-options.

## [2026-09-16] decision | D-009 Cloudflare Workers hosting
Added D-009, which resolves Q-001, and D-010 (observability deferred to a later pass). Updated Q-002 (Cloudflare form route) and Q-006 (CI isn't tied to the host). Opened Q-008 (monitoring) and Q-009 (deploy pipeline and account ownership). Updated architecture.md, README.md and AGENTS.md.

## [2026-09-16] decision | D-011 plain CSS with scoped styles
Resolves Q-004. Astro scoped `<style>` blocks on top of token custom properties; no Tailwind.

## [2026-09-16] decision | D-012 Figma Professional plan, Full seat
Resolves Q-007. `whoami` confirmed a Full seat on the "pro" tier: 200 read calls a day, 15 a minute.

## [2026-09-16] decision | D-013 bespoke case study pages plus a JSON card collection
Supersedes D-003 (set to Superseded). Resolves Q-003 (no CMS). Each case study is a bespoke `.astro` page at `/work/<id>`; card metadata lives in the `caseStudies` data collection.

## [2026-09-16] decision | D-014 tokens written by hand for the POC
`src/styles/tokens.css` is hand-written from `docs/figma/`. Q-005 stays open for a real pipeline.

## [2026-09-16] decision | D-015 fonts through the Astro Fonts API
Inter 400/700/900 via `fontProviders.fontsource()` and `<Font cssVariable="--font-inter" preload />`, replacing the `@fontsource-variable/inter` package from the original spec.

## [2026-09-16] decision | D-016 Node 24 LTS and baseline checks
Partly resolves Q-006. `.nvmrc`/`engines` pin Node 24; `check` and `format`/`format:check` scripts added.

## [2026-09-16] decision | D-017 navigation items and state semantics
Adds a Home item; Selected uses `aria-current="page"`, Hover shows on `:hover`/`:focus-visible`; the brand links to `/`.

## [2026-09-16] decision | D-018 commit per task, approval before push
Agents commit per task/section; pushing needs the user's approval every time, enforced by a `.claude/settings.json` ask rule.

## [2026-09-16] decision | Q-010, Q-011, Q-012 opened
Opened while documenting the home page POC: the stacked layout below 1880px (Q-010), the resume link target (Q-011), and the brand-link/Home-item duplication (Q-012).

## [2026-09-16] update | Home page POC scaffolded and built
Astro scaffolded; the desktop home page POC (nav, hero, three case study cards) built and verified (`npm run build`, `check`, `format:check`, no client `<script>`). Docs brought in line with the code: architecture.md (status, code map, invariants 2 and 4), AGENTS.md (status, repo layout, prerequisites, commands, testing), decisions.md (D-011–D-018), questions.md (Q-003/Q-004/Q-007 removed, Q-005/Q-006 updated, Q-010–Q-012 added), figma-mcp.md (measured call budget, usage notes, Figma file link), windows-dev-environment.md (`.gitattributes` LF note), and the new design-tokens.md.

## [2026-09-17] update | Case study card caption refetched after font change
Cass changed the card caption text style to Inter Bold in Figma; refetched and saved as a "Refetch 2026-09-17" section in `docs/figma/components/case-study-card/context.md`. Captions now wrap on cards 1 and 2 (391px tall); card 3 stays 373px, vertically centred. Recorded an accepted residual in design-tokens.md and a note on Q-010: card 2's caption fits on one line in the browser due to browser/Figma Inter shaping differences.

## [2026-09-17] decision | D-019 GitHub Pages as an interim preview
Added `.github/workflows/deploy-pages.yml` (push to `main` or a manual run) and `withBase`/`withoutBase` in `src/utils/base-path.ts` so the site works under `/cass-website/`. D-009 stands. Q-009 updated, new page github-pages.md, architecture.md (code map, invariant 7, hosting) and AGENTS.md (repo layout) updated. The workflow hasn't run on GitHub yet.

## [2026-09-17] decision | D-020 card heights, alignment, shadow and hover fade; Q-013 opened
Cards on the home page now share the tallest card's height, sit on the first headline baseline at 1880px and wider, have a placeholder drop shadow, and fade into their hover state. Recorded D-020, opened Q-013 for the Figma values still to come, and updated design-tokens.md (naming scheme, card 2 residual, `--hero-title-baseline`).
