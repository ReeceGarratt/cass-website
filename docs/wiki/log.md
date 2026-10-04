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

## [2026-09-29] ingest | Design system page pulled in; Q-014–Q-017 opened
**[Corrected later the same day — see the lint entry below. The `Landing` and `Work` pages were never missing.]** Cass added a `Design system` page to the Figma file. The first reading of this also claimed the `Landing` page was gone and that the file had no `Work` page; both were artefacts of an incomplete `get_metadata` page listing. Fetched and saved the Design system page: the Detailed Card, Sub Nav, Pills, Definition Tip, Read More row, Case Study Intro and Business Problem Heading as component snapshots, plus the Icons and Shapes & Arrows assets and an updated `tokens.md` (8 colours, 2 spacing variables, 4 new text styles including La Belle Aurore, 2 effect styles, `H1` line height 0.98 → 0.92, two conflicting light purples). New `wiki/componentisation.md` analyses what to build as a component and what not to. Opened Q-014 (card drift), Q-015 (case study template vs D-013's bespoke pages), Q-016 (interactivity for the sub nav progress and Definition Tip) and Q-017; updated Q-005 and Q-013. 15 Figma read calls.

## [2026-09-29] lint | Corrected: the Figma file has four pages, not two
`get_metadata` with no node ID listed only `Cover` and `Design system`, and an earlier entry today concluded from that that the `Landing` page had been deleted and the case studies lived in another file. **Both were wrong.** The user supplied page URLs: `Landing` is `0:1` and `Work` is `19:104`, in the same file, and `1:79`/`19:327`/`19:328`/`19:665` are all intact. Corrected `figma/README.md`, `figma/design-system/README.md`, `figma/tokens.md`, `wiki/figma-mcp.md` and Q-017, and recorded the gotcha: the no-node-ID page listing is a hint, not an inventory.

## [2026-09-29] ingest | Work page mapped; componentisation analysis revised
Saved the `Work` page outline (`outline-work-page.md`, ~94k chars — over the tool's response limit, so it came back as a file) and a reference screenshot per case study. Four desktop case studies: Absa, Standard Bank, MiX Telematics and TRANSEARCH, 6003-9337px tall. New `figma/work-page.md` records how they're assembled and the section vocabulary they share. Revised `wiki/componentisation.md`: the case studies share a vocabulary but no sequence, which is evidence for a toolkit rather than a template (Q-015). The biggest component win is the image + problem/solution/outcome block, ~16 uses, which wasn't visible from the design system page at all. Also: sub nav labels vary per case study, so they're content. Rewrote Q-017 to ask which of the three Landing frames is current. 6 Figma read calls (33 total).

## [2026-09-29] fix | Home page limited back to three cards; Q-019 opened
Case-study-page-one batch (tasks 5–7) added a fourth case study (TRANSEARCH) to the `caseStudies` collection so `ReadMoreSection` can use it later, but `src/pages/index.astro` mapped over the whole collection with no limit, so the home page briefly rendered four cards — the `>=1880px` row (`grid-auto-flow: column`) doesn't wrap, so the fourth extended it past the Figma-designed width. Fixed by slicing to the first three entries by `order` (`featuredCaseStudies`) rather than filtering the collection itself. Opened Q-019: which case studies the home page features is a design decision, not settled by entry order alone.

## [2026-09-29] decision | Case Study 1 (Absa) shipped; D-021–D-027 recorded; Q-014–Q-016 resolved; Q-020–Q-024 opened
Task 18 of the case-study-page-one plan: verification and documentation for the finished `/work/streamlining-scoring` page. Measured the Red-on-Off-white contrast (`#cd2b2b` on `#f8f9ff`) with the WCAG 2.x formula: **5.03:1**, passing AA for both normal and large text, including the 14px bold finding-block labels that were the case in question — recorded in design-tokens.md, no colour change needed. The keyboard, no-JS, reduced-motion and home-page-recheck passes from the task brief could not be run (no browser in this environment); all deferred visual checks accumulated across the 18-task run are consolidated in `.superpowers/sdd/2026-09-29-case-study-page-one/task-18-report.md`.

Recorded D-021 (Inter only, Roboto retired), D-022 (case study pages: bespoke files composing shared components, amends D-013), D-023 (progressive enhancement: Popover API + IntersectionObserver, no framework), D-024 (type classes + numeric spacing scale), D-025 (the three sanctioned Read More card divergences), D-026 (the two-measure page layout, `--size-inset-measure`), D-027 (two departures from Figma: the user-testing annotation in flow, Handover on the grid track). Resolved and removed Q-014, Q-015, Q-016. Retitled Q-013 to cover hover timing only, with the real shadow values now recorded there. Updated Q-018 with the real committed image count (5 files, 259,729 bytes) and Q-019 left as-is (still accurate). Opened Q-020 (`/work` index route, still 404s), Q-021 (a third undocumented light purple, `#E3E7FF`), Q-022 (finding blocks' inconsistent Figma drop shadow), Q-023 (three copy defects transcribed faithfully rather than silently corrected), Q-024 (drafted alt text needs Cass's review).

Updated architecture.md (status line, ten new entries in the code map, the case study route moved out of Planned, a new invariant 8 for the layout grid's direct-child constraint). Updated design-tokens.md (the full type-class table, the spacing scale, the new tokens, the `H1` line-height knock-on and its still-unverified effect on the home page, the contrast measurement). Updated componentisation.md with what CS1 actually built against the pre-build predictions — the component set matched well; `FindingsList` and the "purple band isn't a component" calls both held, but the "purple band is full-bleed" half of that prediction was wrong (they're 1448px inset cards, corrected in Task 17 as D-026). Updated figma-mcp.md's call budget (44 total) and added two techniques for working without a browser: cropping saved (downscaled) screenshots with `sharp`, and re-fetching a composed SVG symbol node directly when its loose exported parts can't be reassembled.

## [2026-09-30] update | Final review fixes: fullBleed layout opt-out, popover display gotcha
Fixed the final-review findings: `BaseLayout` gained `fullBleed` (case study pages no longer get a double gutter), DefinitionTip's `display: block` removed, sub nav scroll-spy rewritten to compute the current section from positions, remaining hard-coded design values tokenised, Read More card titles are h3, La Belle Aurore preloaded only on case study pages. Corrected architecture.md (SectionHeading counts, CircleArrow, invariant 8) and added layout gotchas to componentisation.md and a screenshot-scale note to figma-mcp.md.

## [2026-09-30] decision | Case Study 2 (Standard Bank) shipped; D-028–D-032 recorded; Q-025 opened
Built `/work/consolidating-import-collections`, with the Figma snapshot fetched before the spec this time (20 reads plus `whoami`, 65 total). Extracted `LabelledFindings`, `FindingsList`, `CaseStudyFigure` and a global `.panel`; `ProcessStrip` takes measured widths as props; `FindingBlock` gained `tone`, `columns` and `align`. CS1 moved onto the shared pieces and was verified pixel-identical with headless Edge, except for one intended fix: `.panel` now stretches, so CS1's user-testing panel is its Figma width.

Recorded D-028 (ProcessStrip widths as props), D-029 (extract on second use), D-030 (crops baked into assets, redactions exported as renders), D-031 (headless Edge as the visual check) and D-032 (trust Cass's redaction). Opened Q-025 (redaction strength, non-blocking); extended Q-022 (Image Drop), Q-023 (four CS2 copy notes) and Q-024 (10 more drafted alt texts). Updated architecture.md, componentisation.md (CS2 actuals, two layout gotchas), figma-mcp.md (redaction overlays, SVG background rects, outline reuse, and a note that Edge is available) and design-tokens.md (CS2 contrast and tokens).

## [2026-09-30] update | MVP fix round: six findings from the case study 2 build
Fixed on the case-study-2 branch: CS1's handover heading showed "&amp;" (entity in a string prop); the current nav item's focus ring didn't fit its pill (now drawn on the pill; the original report of "no visible focus" was a tooling false positive); the sub nav underline's 2px run-to-run offset (caused by the Read More overflow and, in screenshots only, mid-transition captures; the script now also re-measures via ResizeObserver); ReadMoreSection's 2px horizontal overflow at 1920 (60px gap token, shrinkable cards); SectionHeading's standfirst placement and colour (303px box, inset 92.8px, start-aligned, Purple); and the case study section gap (96px → 160px, `--space-160`, both frames). Updated architecture.md, design-tokens.md and componentisation.md (ProcessStrip still overflows below ~1430px; left for the responsive pass).

## [2026-10-01] decision | ProcessStrip scales to fit, then wraps (D-033); Q-026 opened
The strip's ~1432px minimum wasn't a chosen breakpoint, just the width of its fixed-size content. Percentage label widths couldn't help (the widths were already at their longest words), so all strip sizes moved to `em` and the type is fitted to the band with a container query: 30px by default, down to 20px, then the row wraps. Pixel-identical at 1920 on both case studies; no overflow at 1440 or 1280. Opened Q-026 (case study pages below desktop width), since the rest of the grid still needs ~1100px. Updated componentisation.md, design-tokens.md and architecture.md.

## [2026-10-04] update | Sub nav: no text underline, white bar to the viewport edge
Removed the text underline on the current sub nav link; the progress bar is the only marker, and `aria-current` is unchanged. The sub nav's white now runs to the viewport edge above 1920px through a `border-image` outset. Its contents stay on the grid, and there's no horizontal overflow at 2560 or 1440. Added the gotcha to componentisation.md.
