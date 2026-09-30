# Case study 2 (Standard Bank) — design

- **Date:** 2026-09-30
- **Status:** Approved in brainstorming, awaiting spec review
- **Branch:** `reece/feature/case-study-2`, stacked on `reece/feature/mvp` (whose PR is under review)
- **Scope:** `/work/consolidating-import-collections`, end to end, plus the shared-component changes it forces, **retrofitted into Case Study 1** so both pages use one implementation.
- **Builds on:** [the CS1 design](2026-09-29-case-study-pages-design.md). Everything it settled (D-021 to D-027: bespoke pages composing shared components, the default-to-content grid, progressive enhancement, type classes and the spacing scale) holds unchanged.

## What CS1 taught us, and what changes because of it

CS1 shipped, but through 12 `fix:` commits after its feature commits. Nearly all trace to five causes. Each one maps to a rule for this build.

| CS1 trip-up | Evidence | Rule for CS2 |
|---|---|---|
| **The plan was written before Figma was fetched.** Task 4 fetched it, so earlier tasks were designed from the 0.4× screenshot | Panels built full-bleed that are 1448px inset cards (`1e37d84`); heading boxes without measured widths (`261a956`); labels without wrap widths (`d418fa0`) | **Fetched and saved before this spec** ([`case-study-2-desktop/context.md`](../../figma/case-study-2-desktop/context.md)). The plan copies measured values into each task. Styling a box Figma sizes means using its measured width |
| **Measured gaps rounded to a neighbouring step** | 80px → `--space-64` (`f991a63`); 118px → `--space-96` (`d418fa0`) | A measured value gets its own `--space-N` step or a named token, never the nearest one |
| **Content-keyed lookups inside components** | `ProcessStrip`'s width table is keyed to CS1's six strings (`e522368`) | Per-instance measurements are props, not tables inside the component |
| **HTML/CSS traps** | Scoped styles can't reach child roots (`7955103`); `<div popover>` breaks an open `<p>` (`d7c2ffc`); author `display` beats closed-popover hiding (`bcb8f18`); `alt="TODO…"` shipped as the accessible name (`249e444`); double gutter (`2ae2cc2`) | All fixed in the components now. The plan gets a **pre-flight scan before execution** for this class of mistake |
| **No visual, keyboard or no-JS check was ever run** | Task 18 report: "no browser in this environment" | **Edge is installed.** Headless Edge screenshots are part of verification (below). Only keyboard checks stay manual |
| **Doc claims drifted from the code** | Component counts and a non-existent "cap" corrected (`acc7a9e`, `0e96968`) | Count with `grep` before writing a number into the docs |
| **Token cost** | 18 tasks, a review round per task, 3 on Task 17 | Fewer, section-sized tasks carrying their own measurements, and one review at the end |

## Decisions made in brainstorming

| Topic | Decision |
|---|---|
| Branch | New branch stacked on the MVP branch; rebase if the MVP review changes shared files |
| Retrofit | CS1 moves onto the extracted and changed components in this branch |
| Content source | Figma, fetched before the spec (20 read calls + `whoami`; 65 project total) |
| Persona illustrations | Per-node **SVG** exports, background rects stripped (`src/assets/personas/`) |
| Redacted screenshot | 2× render of the composed node; the unredacted raw upload is never saved |

## Components

### Reused unchanged

`CaseStudyLayout`, `CaseStudySubNav`, `CaseStudyIntro`, `Pill`, `DefinitionTip`, `SectionHeading`, `ReadMoreSection`, `CaseStudyCard`, `CircleArrow`.

- `SectionHeading`: CS2's business problem heading is the same instance as CS1's, including the 202px `titleWidth`.
- `DefinitionTip`: term "Standard Bank", definition "An organisation offering financial services and banking throughout Africa." (fetched from `144:1063`).

### Changed (CS1 call sites updated in the same task)

**`ProcessStrip`**: `steps: string[]` becomes `steps: { label: string; width: string }[]`, where `width` is a size token. The string-keyed `stepWidths` table is deleted. The `max-inline-size` safety net stays. CS2's measured widths (from the outline, `91:701`): Identify Business Needs 129, User Research 126, Personas 134, User Journeys 129, Wireframing & UI Design 198, Development 187. Note that "User Research" is 129 in CS1 and 126 here, a collision the old table couldn't express.

**`FindingBlock`** gains three props. The defaults reproduce CS1 exactly:

| Prop | Values | Default | Needed by |
|---|---|---|---|
| `tone` | `default` \| `inverse` | `default` | Journey rows: White heading, labels and body on Purple |
| `columns` | `[imageFr, textFr]`, measured widths | `[802, 566]` | Journey rows 709:501, 679:532, 683:525 |
| `align` | `start` \| `center` | `start` | Journey rows are vertically centred |

`side` keeps working with `columns`: the image keeps its own measured track whichever side it's on. Its findings `<dl>` moves into `LabelledFindings` (below).

*Revised while planning (2026-09-30):* Status tracker was going to be a fourth `FindingBlock` with a `headingStyle` prop. Reading the code showed it would also need a heading `level` (it's an `h2`, finding headings are `h3`) and an image caption, so that's three props for one caller. It becomes page markup built from `LabelledFindings` and `CaseStudyFigure` instead.

### Extracted (second use)

| New | Uses | Form | Why this form |
|---|---|---|---|
| `.panel` in `global.css` | CS1 ×2, CS2 ×2 | Utility class: Purple, `--radius-panel`, 80px padding, `--size-inset-measure`, centred | The heading sits differently in each panel (above the body, beside it, right-aligned), so a component would be a `<section>` with a slot. It moves out of CS1's scoped `<style>` because CS2 can't reach it there |
| `FindingsList.astro` | CS1 ×1, CS2 ×1 | `items: string[]` (inline markup, `set:html`, same justification as `FindingBlock`), Red hairlines, 48px gaps | Identical structure in both; predicted in the CS1 design to extract "if the second case study makes it awkward" |
| `CaseStudyFigure.astro` | CS2 ×6 (CS1 has none: its annotation follows a paragraph, D-027) | `<figure>`: an `<Image>` with `--radius-image` and `--shadow-card`, optional `<figcaption>` in handwritten type (`captionSize`, `captionTone`, `captionAlign`). Figma's crops are baked into the asset files, so it takes no crop props | Image + handwritten caption repeats six times on this page alone |
| `LabelledFindings.astro` | CS1 ×4 (inside `FindingBlock`), CS2 ×7 | The `<dl>` of label/body pairs: `findings: { label, body }[]`, `tone`. Labels are `H3` (Red, or White when inverse), bodies are Body Med (Purple, or White), 8px apart, 24px between pairs | The pattern recurs outside `FindingBlock` in all three Solutions sections |

### Page markup (first use)

- **Persona cards**: three White cards, 450px, 48px gaps. The name is an `h3` Red `Title 2` above each card. The illustration is absolutely positioned over the card's top-right corner, `aria-hidden` (decorative; the name carries the meaning). CS4's proto-personas are a different shape, so this stays page markup until a third use.
- **Easier Data Capture**: the Purple `Title 2` heading overlapping the offset two-column text row, the White "future state" card, then before/after images with `arrow-02` and the Red "after" annotation.
- **Reviewing data & requesting changes**: a White `u-bleed` band (content 1564px), text row over two captioned images.
- **The new user journey**: a Purple `u-bleed` band (content 1450px), with a Light purple `Title 2` heading over three `FindingBlock tone="inverse"` rows.

### Type and tokens

- New type classes: `.type-handwritten-small` (La Belle Aurore 20 / 1.11 / −2%) and `.type-sub-titles` (Inter Medium 14 / 1.5 / −1.1%).
- New size tokens for CS2's process widths and the measured column splits, following the existing `--size-*` naming.
- **Not added:** an `Image Drop` shadow token. Its −36px spread makes it invisible. The one image Figma gives it gets `--shadow-card` like every other screenshot, recorded under Q-022.
- `Background colour` `#F3F3F4` was reported but isn't visibly used. Not added.

## Page composition

`src/pages/work/consolidating-import-collections.astro`, matching the existing collection id. Direct children of the `.case-study` grid (invariant 8):

| # | Section | Placement | Anchor / sub nav label |
|---|---|---|---|
| 1 | `CaseStudyIntro` + `DefinitionTip` | content | `#project-overview` Project Overview |
| 2 | `ProcessStrip` | `u-bleed` | — |
| 3 | `SectionHeading` + `FindingsList` | content | `#business-needs` Business Needs |
| 4 | `.panel` "taking it step by step" + `CaseStudyFigure` | inset | `#interviews` Interviews |
| 5 | Persona cards | inset | `#personas` Personas |
| 6 | Purple band "the new user journey" | `u-bleed` | `#user-journey` User Journey |
| 7 | Easier Data Capture | inset (1468px, within drift of the measure) | `#design` Design |
| 8 | White band "reviewing data & requesting changes" | `u-bleed` | — |
| 9 | Status tracker (page markup: `LabelledFindings` + `CaseStudyFigure`) | inset | — |
| 10 | `.panel` "development & next iteration" | inset | — |
| 11 | Read More | layout | — |

Heading levels: `h1` from the layout, `h2` per section, `h3` for persona names and finding headings, matching CS1.

## Normalised drift

Figma inconsistencies built consistently rather than reproduced. Each gets a comment at its call site:

- Label-to-body gap: 5px (Status tracker) and 8px elsewhere → 8px.
- Persona card 2's details gap is 34px against 24 on cards 1 and 3 → 24px.
- The third business-problem item is 596px wide in a 585px list → the list width.
- Inset panels measure 1442–1446px against CS1's 1448–1451 → `--size-inset-measure`.
- Hard line breaks used as layout inside paragraphs → one paragraph each.
- Copy is transcribed as written ("swopping", "legal restraints", "development ,", the lowercase "long feedback threads"). Q-023 is extended rather than corrected silently.

## Verification

Every task: `npm run build`, `npm run check`, `npm run format:check`.

Once the page is complete:

1. **Visual.** Headless Edge full-page screenshots at 1920 wide of **both** case studies. CS1 is re-shot because the retrofit touches it; its baseline is a screenshot taken *before* the retrofit, not the Figma one. Compare section by section with `sharp` crops, scaling Figma coordinates by 768/1920 for the saved screenshots (wiki: figma-mcp). Check the home page too, since `CaseStudyCard` renders there.
2. **No-JS.** An Edge screenshot with script execution disabled: the page renders fully, and the sub nav underline sits at its start position.
3. **Reduced motion.** An Edge screenshot with `prefers-reduced-motion: reduce` emulated.
4. **Contrast**, measured with the CS1 script: White on Purple, Light purple on Purple, Red on White, and Purple on White.
5. **Keyboard.** A manual checklist for the user: tab order through the sub nav, Definition Tip (Enter, Escape, focus return) and cards; visible focus throughout.
6. **Alt text** is drafted for every meaningful image and flagged for Cass in an HTML comment, never inside `alt` (Q-024 extended). Persona illustrations and the arrow are decorative.

**Tooling, proven while planning:** `.superpowers/sdd/2026-09-30-case-study-two/shoot.mjs` drives headless Edge over the DevTools protocol with no dependencies. It takes a full-page shot, one shot per grid section (cropped to its real bounding box), no-JS and reduced-motion modes, and a Tab-order focus trace. `diff.mjs` counts differing pixels between two shots. Repeat shots of an unchanged page are pixel-identical, so **the retrofit tasks must leave CS1 and the home page pixel-identical to the baselines** taken before any code changed (`shots/cs1-before/`, `shots/home-before/`).

## Documentation

- **decisions.md:** `ProcessStrip` widths as props; `.panel` as a global utility; `FindingsList`, `LabelledFindings` and `CaseStudyFigure` extracted; image crops baked into assets; headless Edge as the visual check.
- **questions.md:** open **Q-025**, a non-blocking note asking Cass whether the redaction blur is strong enough. Extend Q-022 (Image Drop), Q-023 (CS2 copy) and Q-024 (CS2 alt text).
- **architecture.md:** the new route, the new components, and the changed props.
- **wiki:** `componentisation.md` (CS2 actuals vs predictions, counted with grep), `figma-mcp.md` (the redaction gotcha, the SVG background-rect gotcha, the saved-outline reuse), and `design-tokens.md` (new type classes and tokens).

## Risks and open items

| Risk | Handling |
|---|---|
| **Redaction strength.** The "before" screenshot's blur redaction is light. Some values, including what look like a customer name and a person's name, are near-legible | **Decided 2026-09-30: trust Cass's redaction as drawn; not blocking.** Open Q-025 as a note to mention to Cass. If Cass wants it stronger, re-export a more blurred image later (a one-file swap) |
| Client work on a public preview (Q-009, NDA) | Unchanged from CS1: gates publishing, not building |
| The retrofit breaks CS1 | Screenshot CS1 before the first retrofit task and compare after each |
| MVP review changes shared files | Rebase onto the updated MVP branch before continuing |
| Headless Edge flags behave differently than expected | Verified in task 1; fall back to manual checks, and say so |
| Persona illustrations face the wrong way (export transforms) | Compare against the Figma screenshot in the visual pass |

## Out of scope

Mobile and responsive polish beyond "fluid, not fighting it", case studies 3 and 4, the `/work` index (Q-020), automated accessibility and performance testing (Q-006), and a token pipeline (Q-005).
