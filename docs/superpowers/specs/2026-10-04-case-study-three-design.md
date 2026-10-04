# Case study 3 (MiX Telematics) — design

- **Date:** 2026-10-04
- **Status:** Approach set by the user's request ("establish what needs to be a reusable component, where we need to modify existing components, then plan and execute"); judgement calls are listed at the end for review
- **Branch:** `reece/feature/case-study-3`, from `origin/main` (`e940e49`, both earlier case study PRs merged)
- **Scope:** `/work/sales-workflow-research`, end to end; the shared component changes it forces, retrofitted into CS1 and CS2; and **80px of bottom padding on every case study page** (asked for mid-session)
- **Builds on:** [the CS1 design](2026-09-29-case-study-pages-design.md) and [the CS2 design](2026-09-30-case-study-two-design.md). Bespoke pages composing shared components (D-022), the default-to-content grid (invariant 8), measured values as props or named tokens, and headless Edge verification (D-031) all hold.
- **Figma:** fetched and saved before this spec, in [`case-study-3-desktop/context.md`](../../figma/case-study-3-desktop/context.md) (10 reads plus `whoami`).

## Components

### Reused unchanged

`CaseStudyLayout`, `CaseStudySubNav`, `Pill`, `DefinitionTip`, `SectionHeading`, `CaseStudyFigure`, `ReadMoreSection`, `ProcessStrip`, `.panel`.

- `Pill`: "Sales employees" with the existing `man-3.svg` (same path data as Figma's `7fde3.svg`).
- `DefinitionTip`: term "MiX Telematics", definition "A telematics company providing connected and secure fleet telematics data and mobile asset management solutions." (`144:1069`).
- `CaseStudyFigure`: the AS-IS journey (`captionSize="large"`, `captionTone="inverse"`, `captionAlign="end"`, exactly as CS2's) and the journey map ("AS-IS map", large, default tone). Figma's caption gap on the AS-IS journey is 26px against the component's 16 (CS2's equivalent is 16): drift, built at 16.
- `.panel`: the User interviews card (`98:2316`, 1444px, `p-80`, radius 12).

### Changed

| Component | Change | Default keeps | Needed by |
|---|---|---|---|
| `FindingsList` | `tone: 'default' \| 'inverse'`: inverse is White text with Light purple rules. `spacing: 'default' \| 'compact'`: 48px or 32px either side of each rule | Red rules, Purple text, 48px | CS3 business problem (32px), the interviews list (inverse, 32px) |
| `CaseStudyIntro` | `imageBleed: boolean`: the image runs through the end gutter to the page edge, drops 111px (`--space-intro-image-drop`), and loses its end-side corner radius where the edge cuts it | Image inside its column, top-aligned | CS3's hero (`99:2503`, x=915 y=441, 1042px wide, clipped by the frame 37px past its edge) |
| `ProcessStrip` | None to the component. `--size-process-row` goes from 47.75 (CS2's row) to **49.47**, because CS3's row is the widest now: 955px of labels + 5 arrows + 10 gaps = 1484px | — | The strip must start scaling before CS3's row overflows. CS1/CS2 scale slightly earlier below ~1750px, keeping one shared type size across pages (D-033) |

### Extracted

| New | Uses | Form | Why now |
|---|---|---|---|
| `BusinessProblem.astro` | CS1, CS2, CS3 | `<section id="business-needs">` with the shared `SectionHeading` (eyebrow "the", 202px title box) and `FindingsList`. Props: `items`, `variant: 'default' \| 'compact'`; the standfirst is the slot. Compact is CS3's 48px gap, top alignment and 32px list | Third use. CS2's page comment says "extract it if a third case study repeats it" |
| `PullQuote.astro` | CS1 interviews panel, CS3 pain points | `<blockquote>` with decorative 1.25em quote marks either side, `type-handwritten`, lowercase, 16px gaps. `tone: 'default' \| 'inverse'` (Purple or White). Takes `class`, so the page sizes it in its own layout | Second use; the same structure in Purple on the page and White on Purple |
| `.band` in `global.css` | CS2 ×2, CS3 ×2 | Utility: 80px block padding, gutter inline padding, plus `.band--purple` / `.band--white`. Each page still sets its own inner measure (1450, 1564, 1447, 1246) | Second page using full-bleed bands, the same reasoning that moved `.panel` to `global.css` (D-029) |

### Page markup (first use)

- **AS-IS band:** cropped workshop photo (no radius, no shadow) beside the Light purple heading and White copy, the "workshop artifact" label with a new left-pointing arrow (`arrow-04.svg`, `currentColor`, Light purple), then the AS-IS journey figure.
- **The hook:** "key session insight" over "employees were **leaving** because of the system", centred, Purple with one Red word, 80px under the band in the same section. A `<p>`, not a heading: it's a statement, not a section title.
- **Interviews stat:** "15+" (`type-stats`) over "users spoken to". CS1's "14 out of 15" is a different shape, so no shared stat component.
- **Pain point cards:** an `<ol>` of five White cards (25px radius), two large (40px padding, number + title + bulleted list) and three small (30px padding, number + title). Numbers are `aria-hidden`, since the list conveys order.
- **Proposal stat:** "Reducing the journey from 22 to **14 steps**" as one `<p>`, with the Body Bold lead-in laid over the stat's first line as Figma has it.

### Type and tokens

- New type classes from Figma styles: `.type-sub-text-2` (Inter Medium 20 / 1.5 / −1.1%) and `.type-body-bold` (Inter Bold 17 / 1.5 / −1.1%).
- New tokens: CS3's six process widths (`--size-process-step-sales-*`), `--space-intro-image-drop` (111px), `--space-pain-quote-offset` (18px).
- **Not added:** `Image Drop` on the pain point cards (−36px spread, invisible; Q-022). `Process name` at 30 / 0.88: the pain point titles use `.type-h1` (30 / 0.92) like the process strip, recorded as drift.
- **Shadows:** both renders of the journey map use `Portfolio Card drop` in Figma. Whether screenshots should vary their shadow is Q-022, which is still open, so the build keeps `--shadow-card` on every screenshot and adds this evidence to Q-022.

## Page composition

`src/pages/work/sales-workflow-research.astro` (the existing collection id). Direct children of the `.case-study` grid:

| # | Section | Placement | Anchor / sub nav label |
|---|---|---|---|
| 1 | `CaseStudyIntro imageBleed` + `DefinitionTip` | content, image into the end gutter | `#project-overview` Project Overview |
| 2 | `ProcessStrip` | `u-bleed` | — |
| 3 | `BusinessProblem variant="compact"` | content | `#business-needs` Business Needs |
| 4 | AS-IS band + hook | `u-bleed` | `#as-is-discovery` AS-IS Discovery |
| 5 | User interviews `.panel` | inset | `#user-interviews` User Interviews |
| 6 | Key pain points | inset | — |
| 7 | White band "building a realistic user journey" | `u-bleed` | `#design` Design |
| 8 | Proposal | 962px, centred | `#proposal` Proposal |

The intro title uses the `title` slot to keep Figma's full stop ("…sales workflow."), which the card title in the collection doesn't have.

## Bottom padding

`.case-study` gets `padding-block-end: var(--space-80)`, matching Figma's 80px under the Read More row on CS1 and CS3 (CS2 leaves 103, CS4 89: drift). One rule in `global.css` covers every case study page.

## Images

Saved under `src/assets/case-studies/sales-workflow-research/`, Figma's crops baked in (D-030), at most 2× the placed width and 1600px wide:

- `journey-map.png`: the whole map (journey band, 1246px placed).
- `journey-map-hero.png`: its visible left 72.6% (the intro hero, 1005px visible).
- `workshop-artifact.jpg`: the cropped photo (449 × 327 placed), JPEG because it's a photograph.
- `as-is-journey.png`: cropped (1444 × 539 placed).

## Verification

- `npm run build`, `npm run check`, `npm run format:check`.
- Headless Edge (`shoot.mjs`) at 1920: CS3 sections against the saved renders; `scrollWidth` equals the viewport at 1920, 1440 and 1280 (the bleeding hero must not add a scrollbar).
- **Regression:** shoot CS1 and CS2 per section **before** the shared changes, then diff after (`diff.mjs`). Expected differences: none, apart from the 80px of extra space at the bottom.
- No-JS and keyboard: focus order through the sub nav, Definition Tip and Read More; the new page adds no interactive elements of its own.

## Judgement calls for review

1. **Intro hero bleed** is a component prop rather than a CS3-only override, because only the component can style its own image.
2. **The shadow** stays `--shadow-card` pending Q-022, though Figma uses the warm one here.
3. **`.band`** is a small retrofit of CS2's two bands.
4. **"AS-IS map"** is the caption Figma puts under the *new* journey. Built as written and added to Q-023.
