# Case study 4 (TRANSEARCH): design

- **Date:** 2026-10-21
- **Status:** Approved by Reece in chat, 2026-10-21
- **Stream:** `cs4` (phase 3B of the [2026-10-20 macro plan](../plans/2026-10-20-macro-plan.md)), following [wiki/parallel-streams.md](../../wiki/parallel-streams.md)
- **Branch:** `reece/feature/case-study-4`, worktree `../cass-website-cs4`, from `origin/main` (`cf89447`, PRs #8 and #9 merged)
- **Scope:** `/work/designing-an-interactive-workbook`, end to end; its `case-studies.json` entry; Absa's card badge (D-052); its images
- **Builds on:** the [CS1](2026-09-29-case-study-pages-design.md), [CS2](2026-09-30-case-study-two-design.md) and [CS3](2026-10-04-case-study-three-design.md) designs and the [foundation](2026-10-20-foundation-design.md). Bespoke pages composing shared components (D-022), measured values as props or named tokens, and the phase 2 nav, sub-nav and intro spacing all hold.
- **Figma:** no calls. Everything comes from the 2026-10-20 snapshot, [`case-study-4-desktop/context.md`](../../figma/case-study-4-desktop/context.md), and its section renders.

## Decisions taken while brainstorming (Reece, 2026-10-21)

| Question | Answer |
|---|---|
| Is `144:269` still the current TRANSEARCH design? | Yes. Build from the 2026-10-20 snapshot. |
| Q-018, image delivery | **In-repo now, off-repo later.** Commit downscaled images under `src/assets/` like CS1–3; Q-018 stays open as a follow-up, with this stream's numbers added. |
| "Book" (landing card) vs "workbook" (CS4 frame) | **The card says book, the page says workbook.** `case-studies.json` follows the landing card (D-052); the page heading and copy follow `144:269`; the slug stays `designing-an-interactive-workbook`. The mismatch goes to Cass as Q-cs4-1. |
| "TRANSEARCH International" has no definition text in Figma | **Draft one and flag it for Cass:** `DefinitionTip` with "A global executive search and leadership consulting firm.", marked `TODO(cass)`, raised as Q-cs4-2. |

## Content data

`src/content/case-studies.json` (only this stream edits it):

- TRANSEARCH: `title` "Designing an interactive book", `skills` ["UI Design", "Interaction Design", "Typography"]. `id`, `summary` and `order` are unchanged; the summary already matches the landing card.
- Absa: `client` "Absa Banking". It's only read by `CaseStudyCard`'s client pill.

## Components

### Reused unchanged

`CaseStudyLayout`, `CaseStudySubNav`, `CaseStudyIntro`, `Pill`, `DefinitionTip`, `ProcessStrip`, `BusinessProblem`, `SectionHeading`, `CaseStudyFigure`, `LabelledFindings`, `ReadMoreSection`, `.panel`.

- `CaseStudyIntro`: eyebrow "ux/ui designer" (`I144:1594;53:249`), the "Clients" pill with the existing `woman-2.svg` (the node is `Icons/Woman 2`, whatever its asset constant is called), and the intro hero.
- `ProcessStrip`: six steps whose labels and widths are identical to CS2's, so it reuses the `--size-process-step-import-*` tokens. CS4's row is the same width as CS2's, so `--size-process-row` doesn't change.
- `BusinessProblem`: the four needs, with the Medium/Bold mix within each line as in the frame (not all bold).
- `LabelledFindings` + `CaseStudyFigure`: CS2's "tracker" pattern, used for Bookmarking, Highlighting & note taking, and Responsive design.

### Changed

None. If building shows a shared component needs a change, stop and raise it: the other streams build against the same components.

### Page markup (first use, page-local CSS)

- **Note box:** a white box with a small bold label over body text, used twice ("Reflection" under proto-personas, "Suggested improvement" in the user journeys panel). It stays page-local CSS until another page uses it.
- **Book cover figure** beside `BusinessProblem`: the cover with the handwritten "the book cover" caption.
- **Competitor research icons:** the Kindle and Adobe Reader app icons stacked beside the heading and text, in a `.panel`.
- **Typography references:** a grid of the five magazine images beside the heading and text.
- **Responsive figure:** one `<figure>` with the iPad and iPhone images overlapped in CSS, one alt text describing both, and the "tablet & mobile designs" caption.

## Page composition

`src/pages/work/designing-an-interactive-workbook.astro`. In order:

| # | Section (Figma node) | Built with | Anchor / sub-nav label |
|---|---|---|---|
| 1 | Intro (`144:285`) | `CaseStudyIntro` + `DefinitionTip` | `#project-overview` Project Overview |
| 2 | Process (`144:307`) | `ProcessStrip` | — |
| 3 | Business problem (`144:319`) | `BusinessProblem` + the book cover figure | `#business-needs` Business Needs |
| 4 | Competitor research (`144:335`) | `.panel` | `#research` Research |
| 5 | Proto-personas (`144:348`) | page-local layout + note box | — |
| 6 | User journeys (`144:367`) | `.panel`, two columns + note box | `#user-journeys` User Journeys |
| 7 | Wireframing (`144:390`) | `CaseStudyFigure` (the composed `196:2697` export) + heading and text | — |
| 8 | Typography & design (`144:396`) | page-local image grid | `#design` Design |
| 9 | Bookmarking where you left off (`144:406`) | `LabelledFindings` + `CaseStudyFigure`, image start | — |
| 10 | Highlighting & note taking (`144:423`) | the same, image end | — |
| 11 | Responsive design (`144:440`) | the same, the responsive figure at the start | — |
| 12 | Development & launch (`144:459`) | `.panel` handover, as on CS2 | `#handover` Handover |
| 13 | Read More (`144:463`) | `ReadMoreSection` (excludes this page) | — |

Measurements come from the snapshot's outline and design context, section by section. Where the frame and the design system disagree, the design system wins (macro plan, item 1).

## Copy rules

- **Transcribe as-is.** The copy defects Q-023 already lists for `144:269` stay as they are.
- **Plain text, not links:** the copied `standardbank.co.za` hyperlinks on almost every text block (Q-038).
- **Blue panels use Regular weight** for body text (D-044), although the frame uses Medium.
- **Alt text** is drafted from the surrounding copy and marked `TODO(cass)`, as on CS1–3 (Q-024).

## Images

The source is the staged raw exports in `F:/Code/cass-website-staging/figma-2026-10-20/case-study-4/` (Figma URLs expire 2026-10-27).

- A one-off `sharp` script, run from the session scratchpad and not committed, resizes each raster to **2× its largest rendered width at 1920px**, keeping PNG. `astro:assets` then generates the formats and `srcset` at build time, as on CS1–3.
- The output goes in `src/assets/case-studies/designing-an-interactive-workbook/`, with descriptive file names.
- The wireframe uses the composed export (`07-wireframe-composed@2x.png`), not the raw sketch.
- `01-pill-icon.svg` and `03-vertical-divider.svg` aren't needed: the pill icon is `woman-2.svg`, and the dividers come from `BusinessProblem` and `FindingsList`.
- Record the committed total in Q-018's update.

## Docs (temporary IDs)

- **Q-cs4-1** (for Cass): the card says "interactive book" but the page says "interactive workbook".
- **Q-cs4-2** (for Cass): the drafted TRANSEARCH International definition.
- **Q-018 update:** CS4 committed in-repo by Reece's call; the byte count; the move off-repo is still wanted later.
- **`test-plan.md`:** manual checks for the CS4 page.
- **`architecture.md`:** the new page in the repo map, if it lists pages.
- **`wiki/log.md`:** an entry for the build.
- **Macro plan:** only the 3B Status row.

## Validation

- `npm run build`, `npm run check` and `npm run format:check` pass.
- A visual compare at 1920px against `screenshot-2026-10-20.png` and the section renders in `sections/`, using the same headless Edge approach as CS1–3.
- Keyboard: the sub-nav links reach their anchors, and the definition tip opens on focus and closes on Escape.
- The other three case studies and the home page still build and look unchanged, apart from the TRANSEARCH card and Absa's badge.

## Out of scope

- Finishing steps (renumbering the temporary IDs, the PR): these happen after `fixes` has merged, with Reece's go-ahead.
- Moving images off-repo (Q-018 follow-up).
- Fixing the copy defects (Cass, Q-023).
