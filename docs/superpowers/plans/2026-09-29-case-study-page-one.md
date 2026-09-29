# Case Study Page One Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/work/streamlining-scoring` — the Absa case study — as a complete, accessible, static page, plus the token, style and component layers it needs.

**Architecture:** A bespoke `.astro` page composes section components inside a `CaseStudyLayout` that owns a named CSS grid. Sections are constrained to a content track by default and opt out to full-bleed with `.u-bleed`. Two small progressive enhancements (sub nav scroll progress, Definition Tip positioning) attach after paint; everything renders and works without JavaScript.

**Tech Stack:** Astro 7 (static output, no adapter), TypeScript, hand-written CSS custom properties, Astro Fonts API (fontsource), native Popover API, `IntersectionObserver`. No UI framework, no new runtime dependencies.

**Spec:** [`docs/superpowers/specs/2026-09-29-case-study-pages-design.md`](../specs/2026-09-29-case-study-pages-design.md)

## Global Constraints

- **No hard-coded design values.** Colour, type, spacing, radius and shadow come from token custom properties or type classes (D-002, invariant 1).
- **`src/styles/tokens.css` is hand-written** from `docs/figma/` until a pipeline exists (Q-005, D-014, invariant 2).
- **No client JS unless needed.** Anything interactive states its reason (invariant 3). This plan adds exactly two scripts.
- **Card metadata lives in the `caseStudies` collection**, not in page files. Case study pages are bespoke `.astro` files (D-013, invariant 4).
- **Accessibility baseline:** semantic landmarks, one `<h1>` per page, visible focus, full keyboard operation, alt text on meaningful images, WCAG AA contrast (invariant 5).
- **Figma is the visual source of truth** unless a decision says otherwise (invariant 6). The three card divergences in the spec are the only sanctioned ones.
- **Root-relative URLs go through `withBase`** from `src/utils/base-path.ts` (D-019, invariant 7). In-page `#anchors` are exempt.
- **Fonts: Inter only**, plus La Belle Aurore for the handwritten style. Roboto is retired.
- **Light purple is `#c4cdf4`.** Ignore `#C1CBFF`.
- **Commits:** Conventional Commits, imperative, 72 characters max. One logical change per commit. Work on the current branch; **never push** without the user's approval (D-018).

## Verification Model

This repo has **no test runner**. Q-006 is open and the spec puts a test stack out of scope, so "tests" here means the project's real gate. Unless a task says otherwise, every task's verification is:

```bash
npm run check         # astro check — expect 0 errors, 0 warnings, 0 hints
npm run build         # expect "Complete!"
npm run format:check  # expect "All matched files use Prettier code style!"
```

plus the task's own manual check. If `format:check` fails, run `npm run format` and re-run. Run `npm run dev` for visual checks at `http://localhost:4321`.

## Figma Snapshot Dependency

Tasks 1–8 use values already saved under `docs/figma/`. **Tasks 14–17 depend on Task 4**, which fetches the Absa frame. Where a value comes from the fetch, this plan says which file and section to read it from rather than inventing a number.

Already saved, safe to build from:

| Component | Snapshot |
|---|---|
| Pill | `docs/figma/components/pills/context.md` |
| Circle arrow | `docs/figma/components/arrow/`, context in `case-study-card/context.md` |
| Sub nav | `docs/figma/components/sub-nav/context.md` |
| Read More row | `docs/figma/components/read-more/context.md` |
| Case study intro | `docs/figma/components/case-study-intro/context.md` |
| Section heading | `docs/figma/components/case-study-intro/business-problem-heading.md` |
| Definition Tip | `docs/figma/components/definition-tip/context.md` |
| Tokens | `docs/figma/tokens.md` |

Never fetched, and **only** obtainable in Task 4: the **process strip** and the **finding blocks**.

## File Structure

**Created**

| Path | Responsibility |
|---|---|
| `src/components/CircleArrow.astro` | The default/hover arrow SVG pair and their crossfade |
| `src/components/Pill.astro` | The pill, in `client` and `userType` colourways |
| `src/components/SectionHeading.astro` | Handwritten article + Red heading + optional standfirst |
| `src/components/ProcessStrip.astro` | Full-bleed Purple band of process steps |
| `src/components/FindingBlock.astro` | Image + labelled paragraphs |
| `src/components/CaseStudyIntro.astro` | Eyebrow, title, user pills, lead, goal/outcome pair |
| `src/components/CaseStudySubNav.astro` | Case study section nav and its progress script |
| `src/components/DefinitionTip.astro` | Popover trigger and bubble |
| `src/components/ReadMoreSection.astro` | "Other case studies" heading and card row |
| `src/layouts/CaseStudyLayout.astro` | Page grid, sub nav, `<h1>`, Read More row |
| `src/pages/work/streamlining-scoring.astro` | The Absa case study, bespoke composition |
| `src/assets/case-studies/streamlining-scoring/` | Case study images |
| `src/assets/icons/` | Avatar icons for `userType` pills |
| `docs/figma/case-study-1-desktop/context.md` | Saved Figma output for the Absa frame |

**Modified**

| Path | Change |
|---|---|
| `astro.config.mjs` | Add Inter weight 500; add La Belle Aurore |
| `src/styles/tokens.css` | New colours, spacing scale, type values, real shadows, `H1` 0.92 |
| `src/styles/global.css` | Type classes, `.u-bleed`, reduced-motion smooth scroll |
| `src/components/CaseStudyCard.astro` | Add `client` pill; remove fixed width; use `CircleArrow` and type classes |
| `src/pages/index.astro` | Own the card width the card no longer sets |
| `src/content.config.ts` | Add `client` to the schema |
| `src/content/case-studies.json` | Add `client` to all entries; add the TRANSEARCH entry |

---

### Task 1: Fonts

**Files:**
- Modify: `astro.config.mjs`

**Interfaces:**
- Consumes: nothing
- Produces: CSS variables `--font-inter` (weights 400, 500, 700, 900) and `--font-la-belle-aurore` (400), available to all later tasks.

- [ ] **Step 1: Add Inter 500 and La Belle Aurore**

`astro.config.mjs` currently loads Inter at 400/700/900 only. The spec's `.type-body-med` needs **Medium 500**, which would otherwise render as a synthesised weight. Replace the `fonts` array:

```js
// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 700, 900],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'La Belle Aurore',
      cssVariable: '--font-la-belle-aurore',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
  ],
});
```

- [ ] **Step 2: Preload the new face**

`BaseLayout.astro` renders `<Font cssVariable="--font-inter" preload />`. Add a second `<Font>` beside it. Read the file first to match its import and placement exactly:

```astro
<Font cssVariable="--font-inter" preload />
<Font cssVariable="--font-la-belle-aurore" preload />
```

La Belle Aurore appears above the fold in the case study intro, so it is preloaded rather than lazily fetched.

- [ ] **Step 3: Verify the fonts resolve**

Run `npm run build`, then:

```bash
grep -ro "la-belle-aurore" dist/ | head -5
```

Expected: at least one match, confirming the face was downloaded and emitted. If there are no matches, the font name doesn't match fontsource's id — check <https://fontsource.org/fonts/la-belle-aurore> for the exact name before changing anything else.

- [ ] **Step 4: Run the standard gate**

```bash
npm run check && npm run build && npm run format:check
```

Expected: 0 errors; "Complete!"; "All matched files use Prettier code style!"

- [ ] **Step 5: Commit**

```bash
git add astro.config.mjs src/layouts/BaseLayout.astro
git commit -m "feat: add La Belle Aurore and Inter Medium"
```

---

### Task 2: Tokens

**Files:**
- Modify: `src/styles/tokens.css`

**Interfaces:**
- Consumes: `--font-la-belle-aurore` from Task 1.
- Produces: custom properties used by every later task — `--color-light-grey`, `--space-8` … `--space-96`, `--type-title-1-*`, `--type-title-2-*`, `--type-h2-*`, `--type-body-med-*`, `--type-handwritten-*`, `--shadow-card`, `--shadow-card-warm`, `--font-family-handwritten`.

- [ ] **Step 1: Add the new colour and font family**

In the colour block, after `--color-light-purple`:

```css
  --color-light-grey: #e7e6e6;
```

Move `--color-black` up into the "Figma variables" group and delete the "fills in the design that aren't Figma variables" comment above it — Black is a real variable now (`docs/figma/tokens.md`). Leave `--color-icon` where it is.

After `--font-family-base`:

```css
  --font-family-handwritten: var(--font-la-belle-aurore);
```

- [ ] **Step 2: Add the spacing scale**

Above the existing `/* Space */` block, add a new block. The number is the pixel value, so it reads straight against Figma measurements:

```css
  /* Space: scale. The number is the px value at a 16px root */
  --space-8: 0.5rem;
  --space-16: 1rem;
  --space-24: 1.5rem;
  --space-32: 2rem;
  --space-40: 2.5rem;
  --space-48: 3rem;
  --space-56: 3.5rem;
  --space-64: 4rem;
  --space-96: 6rem;

  /* Figma's two spacing variables, aliased so the link stays traceable */
  --space-headings-body: var(--space-16); /* Figma: Headings & Body */
  --space-sub-sections: var(--space-48); /* Figma: Sub-Sub Sections */
```

Leave every existing bespoke `--space-*` token alone. The 110px gutter and 30px card padding are genuine one-offs and stay named.

- [ ] **Step 3: Change H1 to 0.92**

Find `--type-card-title-line-height: 0.98;` and change it to `0.92`. Update the comment above the block to record why:

```css
  /* Type: card title (the Figma style is called "H1").
     Line height changed 0.98 -> 0.92 on 2026-09-29; confirmed against the
     current Figma frame. This changes card heights on the home page. */
```

- [ ] **Step 4: Add the new type styles**

After the existing type blocks:

```css
  /* Type: Title 1 (case study title, "Other case studies") */
  --type-title-1-size: 3.125rem; /* 50px */
  --type-title-1-line-height: 0.96; /* 48/50 */
  --type-title-1-letter-spacing: -0.04em;
  --type-title-1-weight: 900;

  /* Type: Title 2 (case study section headings) */
  --type-title-2-size: 2.8125rem; /* 45px */
  --type-title-2-line-height: 1;
  --type-title-2-letter-spacing: -0.02em;
  --type-title-2-weight: 900;

  /* Type: H2 (project goal / outcome headings). Figma letterSpacing is 0 */
  --type-h2-size: 1.25rem; /* 20px */
  --type-h2-line-height: 1.12;
  --type-h2-letter-spacing: 0;
  --type-h2-weight: 700;

  /* Type: Body Med */
  --type-body-med-size: 1rem;
  --type-body-med-line-height: 1.48;
  --type-body-med-letter-spacing: -0.011em;
  --type-body-med-weight: 500;

  /* Type: Hand written */
  --type-handwritten-size: 1.75rem; /* 28px */
  --type-handwritten-line-height: 1.11;
  --type-handwritten-letter-spacing: -0.02em;
  --type-handwritten-weight: 400;
```

Letter-spacing conversions follow the rule recorded in `docs/figma/tokens.md`: Figma's value is a percentage, so `-4` is `-0.04em` and `-2` is `-0.02em`.

- [ ] **Step 5: Replace the placeholder shadows**

Replace the whole `--shadow-card` declaration and its comment with the real Figma effect styles:

```css
  /* Shadow: Figma effect styles (docs/figma/tokens.md) */
  --shadow-card:
    0 0.0625rem 0.1875rem 0.0625rem #0000000d, 0 0.0625rem 0.125rem 0 #0000001a;
  --shadow-card-warm: -0.0625rem 0.1875rem 0.21875rem 0.0625rem #f5efe6ab;
```

Leave `--duration-hover` and `--ease-hover` as they are, including their comment — Figma still defines no motion (Q-013).

- [ ] **Step 6: Check the home page for the H1 change**

Run `npm run dev` and open `http://localhost:4321`. Compare the three cards against `docs/figma/landing-desktop/screenshot.png` at a 1920px viewport width.

Expected: card titles are slightly tighter. Card heights may change, and the row stays equal-height because of `grid-auto-rows: 1fr` (D-020).

**Check specifically:** does card 3's title still wrap as `Using research to / build a better / sales workflow`? `--size-card-title-width` was tuned to 264px for exactly that at the old line height. Line height does not affect horizontal wrapping, so it should be unchanged — but confirm, because `--size-card-title-height` (83px) is a *fixed* height chosen so captions align, and a tighter line height leaves more slack inside it.

If the captions no longer align, do not re-tune the width. Record what you saw and raise it; the fixed height may now be wrong and that is a Figma question.

- [ ] **Step 7: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/styles/tokens.css
git commit -m "feat: add spacing scale, new type styles and Figma shadows"
```

---

### Task 3: Type classes and layout utilities

**Files:**
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: every custom property from Task 2.
- Produces: classes `.type-title`, `.type-title-1`, `.type-title-2`, `.type-subtitle`, `.type-h1`, `.type-h2`, `.type-body`, `.type-body-med`, `.type-caption`, `.type-handwritten`, and `.u-bleed`. Every later task uses these instead of re-declaring type.

- [ ] **Step 1: Add the type classes**

Append to `global.css`, after `.skip-link:focus`:

```css
/* Type classes: one per Figma text style.
   These set family, size, weight, line height and letter spacing only.
   Colour stays with the component, because the same style appears in Red,
   Purple, Black and White depending on context. */

.type-title {
  font-size: var(--type-title-size);
  font-weight: var(--type-title-weight);
  line-height: var(--type-title-line-height);
  letter-spacing: var(--type-title-letter-spacing);
}

.type-title-1 {
  font-size: var(--type-title-1-size);
  font-weight: var(--type-title-1-weight);
  line-height: var(--type-title-1-line-height);
  letter-spacing: var(--type-title-1-letter-spacing);
}

.type-title-2 {
  font-size: var(--type-title-2-size);
  font-weight: var(--type-title-2-weight);
  line-height: var(--type-title-2-line-height);
  letter-spacing: var(--type-title-2-letter-spacing);
}

.type-subtitle {
  font-size: var(--type-subtitle-size);
  font-weight: var(--type-subtitle-weight);
  line-height: var(--type-subtitle-line-height);
  letter-spacing: var(--type-subtitle-letter-spacing);
}

.type-h1 {
  font-size: var(--type-card-title-size);
  font-weight: var(--type-card-title-weight);
  line-height: var(--type-card-title-line-height);
  letter-spacing: var(--type-card-title-letter-spacing);
}

.type-h2 {
  font-size: var(--type-h2-size);
  font-weight: var(--type-h2-weight);
  line-height: var(--type-h2-line-height);
  letter-spacing: var(--type-h2-letter-spacing);
}

.type-body {
  font-size: var(--type-body-size);
  font-weight: var(--type-body-weight);
  line-height: var(--type-body-line-height);
  letter-spacing: var(--type-body-letter-spacing);
}

.type-body-med {
  font-size: var(--type-body-med-size);
  font-weight: var(--type-body-med-weight);
  line-height: var(--type-body-med-line-height);
  letter-spacing: var(--type-body-med-letter-spacing);
}

.type-caption {
  font-size: var(--type-caption-size);
  font-weight: var(--type-caption-weight);
  line-height: var(--type-caption-line-height);
  letter-spacing: var(--type-caption-letter-spacing);
}

.type-handwritten {
  font-family: var(--font-family-handwritten);
  font-size: var(--type-handwritten-size);
  font-weight: var(--type-handwritten-weight);
  line-height: var(--type-handwritten-line-height);
  letter-spacing: var(--type-handwritten-letter-spacing);
}
```

`.type-h1` deliberately reads the existing `--type-card-title-*` properties rather than duplicating them — Figma's `H1` and the card title are the same style.

Note that `--type-caption-weight` is `700` while Figma's `Caption Text` is Regular 400. That is an intentional existing override for the card skills. Components may override weight on top of the class; do not add a second caption class.

- [ ] **Step 2: Add the page grid, the bleed utility and reduced-motion scroll**

```css
/* Case study page grid.
   Sections are constrained to the content track by default and opt out to
   full-bleed with .u-bleed. Correct-by-default: forgetting the class yields
   a constrained section, never a broken layout.

   This lives in global.css, not in CaseStudyLayout's scoped <style>, because
   its children are other components' root elements. Astro scopes styles to
   elements in a component's OWN template, so a scoped `.case-study > *`
   would not match a child component's root and every section would silently
   fall through to the `full` track. */
.case-study {
  display: grid;
  grid-template-columns:
    [full-start] var(--space-gutter)
    [content-start] 1fr [content-end]
    var(--space-gutter) [full-end];
  row-gap: var(--space-96);
  max-inline-size: var(--page-max-width);
  margin-inline: auto;
}

/* Direct children only — a section's root element must be a direct child
   of this grid, never wrapped in a stray div. */
.case-study > * {
  grid-column: content;
}

.case-study > .u-bleed {
  grid-column: full;
}

/* The sub nav is sticky and 80px tall, so anchor targets need clearance. */
.case-study [id] {
  scroll-margin-block-start: 6rem;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

`--space-gutter`, `--page-max-width` and `--space-96` all already exist by this point (the first two predate this plan; `--space-96` comes from Task 2).

- [ ] **Step 3: Verify a class renders**

Run `npm run dev`. In devtools, add `class="type-handwritten"` to any element on the home page and confirm it renders in a joined handwriting face, not a fallback cursive. Then remove it.

Expected: the glyphs are clearly La Belle Aurore. If it falls back, Task 1 Step 3's grep passed but the family name in `--font-la-belle-aurore` doesn't match — check the generated CSS variable name in `dist/`.

- [ ] **Step 4: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/styles/global.css
git commit -m "feat: add type classes and the bleed utility"
```

---

### Task 4: Fetch the Absa case study from Figma

**Files:**
- Create: `docs/figma/case-study-1-desktop/context.md`
- Create: `src/assets/case-studies/streamlining-scoring/` (images)
- Modify: `docs/figma/README.md` (frame index row)

**Interfaces:**
- Consumes: nothing.
- Produces: the saved design context and images that Tasks 9–14 read. **Nothing after this task should call Figma.**

This task writes no application code. Its deliverable is the snapshot.

**Figma rules that apply** (`AGENTS.md`): calls one at a time, never in parallel; `get_metadata` for the outline first, then `get_design_context` per section, never on a whole page; `download_assets` batched up to 20 nodes; read tools only; stop and tell the user if you hit the rate limit rather than retrying.

- [ ] **Step 1: Get the frame outline**

Call `get_metadata` with `fileKey: z037c50FocJthsq5WRzJcd`, `nodeId: 53:156`.

This returns the section node IDs inside `Content` (`157:2104`). From the 2026-09-29 mapping, the sections are: `88:650` Navigation, `86:441` Introduction, `67:334` Process, `86:190` Business problem, `86:211` Talking to agents, `87:504` Design, `19:109` Testing, `19:127` Handover, plus `180:844` Read More.

If the output exceeds the tool's response limit it is written to a file — parse that file rather than re-calling.

- [ ] **Step 2: Fetch design context per section**

Load Figma's guidance resource first, or `get_design_context` will refuse:

```
ReadMcpResourceTool(server: "figma", uri: "skill://figma/figma-design-to-code/SKILL.md")
```

Then call `get_design_context` once per section node, **one call at a time**, in this order: `86:441`, `67:334`, `86:190`, `86:211`, `87:504`, `19:109`, `19:127`.

Skip `88:650` (Navigation — already built as `SiteNav`) and `180:844` (Read More — already saved in `docs/figma/components/read-more/context.md`).

That is 7 calls. Budget for this task is ~12 including assets; the daily limit is 200 and 33 were used on 2026-09-29.

- [ ] **Step 3: Save the snapshot**

Write `docs/figma/case-study-1-desktop/context.md` in the format required by `docs/figma/README.md`:

```markdown
---
frame: 💻 Case Study 1 (Absa — streamlining scoring for multiple products)
node_id: '53:156'
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=53-156
fetched: YYYY-MM-DD
tools: [get_metadata, get_design_context, download_assets]
---

## Outline

<get_metadata output>

## Section: Introduction (node 86:441)

<get_design_context output, unedited>

## Section: Process (node 67:334)

...
```

Keep tool output **unedited** so it can be diffed against a future fetch (D-008). Put observations under a separate `## Notes` heading.

- [ ] **Step 4: Download the images**

Call `download_assets` per section node that contains screenshots — at minimum the Introduction (the product hero) and Design (`87:504`, the four finding block screenshots). Use `rawImages` from the response, which are the original uploads rather than re-renders.

Save to `src/assets/case-studies/streamlining-scoring/` with descriptive kebab-case names matching the block they belong to, for example `scoring-page-hero.png`, `removing-the-guess-work.png`.

Note the `export` PNG of each section is a flattened render — do not ship it, use it only as a visual key.

- [ ] **Step 5: Downscale before committing**

Images are committed to git, and git history is permanent (Q-018). Before `git add`, check sizes:

```bash
ls -lh src/assets/case-studies/streamlining-scoring/
```

The layout renders these at roughly 700px wide at most. Anything wider than **1600px** or heavier than **500KB** should be downscaled first — Astro's `<Image>` generates responsive variants at build, so a 3000px original buys nothing and costs repo size forever.

- [ ] **Step 6: Record the fetch**

Add a row to the frame index in `docs/figma/README.md` for `case-study-1-desktop/`, noting the node ID and what was fetched. Update the measured call budget table in `docs/wiki/figma-mcp.md` with the actual number of calls this task used — this is the first real measurement of what a content page costs.

- [ ] **Step 7: Commit**

```bash
git add docs/figma/ docs/wiki/figma-mcp.md src/assets/case-studies/
git commit -m "docs: save the Absa case study Figma snapshot and images"
```

---

### Task 5: Extract CircleArrow

**Files:**
- Create: `src/components/CircleArrow.astro`
- Modify: `src/components/CaseStudyCard.astro`

**Interfaces:**
- Consumes: `src/assets/arrow-default.svg`, `src/assets/arrow-hover.svg`.
- Produces: `<CircleArrow class?: string />`. Renders both arrow states stacked in a grid cell; the **parent** drives the crossfade by setting opacity on `.circle-arrow__icon--default` / `--hover`. The component owns no hover logic, because its two consumers trigger it differently.

- [ ] **Step 1: Create the component**

Lift the existing markup and styles out of `CaseStudyCard.astro` unchanged, renaming `card__arrow` to `circle-arrow`:

```astro
---
import ArrowDefault from '../assets/arrow-default.svg';
import ArrowHover from '../assets/arrow-hover.svg';

interface Props {
  class?: string;
}

const { class: className } = Astro.props;
---

<span class:list={['circle-arrow', className]} aria-hidden="true">
  <span class="circle-arrow__icon circle-arrow__icon--default">
    <ArrowDefault />
  </span>
  <span class="circle-arrow__icon circle-arrow__icon--hover">
    <ArrowHover />
  </span>
</span>

<style>
  .circle-arrow {
    display: grid;
    inline-size: var(--size-arrow);
    block-size: var(--size-arrow);
    rotate: 90deg;
  }

  .circle-arrow__icon {
    grid-area: 1 / 1;
    transition-property: opacity;
    transition-duration: var(--duration-hover);
    transition-timing-function: var(--ease-hover);
  }

  .circle-arrow__icon :global(svg) {
    inline-size: 100%;
    block-size: 100%;
  }

  .circle-arrow__icon--default {
    color: var(--color-light-purple);
  }

  .circle-arrow__icon--hover {
    opacity: 0;
    color: var(--color-red);
  }
</style>
```

`aria-hidden` stays on the arrow: the card's title link is the accessible name, and the arrow is decorative.

- [ ] **Step 2: Use it in CaseStudyCard**

In `CaseStudyCard.astro`: add `import CircleArrow from './CircleArrow.astro';`, replace the `<span class="card__arrow">` block with `<CircleArrow class="card__arrow" />`, and delete the `.card__arrow-icon*` rules plus the `.card__arrow` rule's `display`/`rotate`/sizing — keep only what positions it:

```css
  .card__arrow {
    align-self: flex-end;
    margin-block-start: auto;
  }
```

Update the two hover rules to target the new class names:

```css
  .card:is(:hover, :focus-within) .circle-arrow__icon--default {
    opacity: 0;
  }

  .card:is(:hover, :focus-within) .circle-arrow__icon--hover,
  .card:is(:hover, :focus-within) .card__corner {
    opacity: 1;
  }
```

Remove `.card__arrow-icon` from the card's shared `transition-property` list, since `CircleArrow` now owns that transition. Also remove the now-unused `ArrowDefault` / `ArrowHover` imports.

**Astro scoping note:** `.circle-arrow__icon--default` is defined in `CircleArrow.astro`, so `CaseStudyCard.astro`'s scoped styles cannot reach it normally. Wrap those two selectors in `:global()`:

```css
  .card:is(:hover, :focus-within) :global(.circle-arrow__icon--default) {
    opacity: 0;
  }

  .card:is(:hover, :focus-within) :global(.circle-arrow__icon--hover) {
    opacity: 1;
  }
```

Keep `.card__corner` in its own non-global rule.

- [ ] **Step 3: Verify the hover is unchanged**

Run `npm run dev`, open the home page, hover each card and tab to each card.

Expected: identical to before — the light purple arrow fades out, the red one fades in, the corner strokes appear, all over 200ms. Focus via keyboard produces the same state.

- [ ] **Step 4: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/CircleArrow.astro src/components/CaseStudyCard.astro
git commit -m "refactor: extract CircleArrow from CaseStudyCard"
```

---

### Task 6: Pill

**Files:**
- Create: `src/components/Pill.astro`
- Create: `src/assets/icons/` (copy the six avatar SVGs)

**Interfaces:**
- Consumes: type classes from Task 3.
- Produces: `<Pill variant?: 'client' | 'userType', icon?: ImageMetadata, class?: string>` with the label in the default slot.

Values from `docs/figma/components/pills/context.md`: 16px inline / 8px block padding, 25px radius, Inter Bold 16, `client` is Purple background with White text, `userType` is Light purple with Purple text, 40px tall, 8px gap, 24px icon.

- [ ] **Step 1: Copy the avatar icons**

```bash
mkdir -p src/assets/icons
cp docs/figma/components/icons/woman-1.svg docs/figma/components/icons/woman-2.svg docs/figma/components/icons/woman-3.svg docs/figma/components/icons/man-1.svg docs/figma/components/icons/man-2.svg docs/figma/components/icons/man-3.svg src/assets/icons/
```

Do not copy `bounding-box.svg` — it is a transparent Figma artefact.

- [ ] **Step 2: Add the radius token**

The pill radius (25px) differs from both existing radius tokens (`--radius-card` 25px, `--radius-pill` 54px). It matches `--radius-card` exactly, but they are different things and would drift. Add to `tokens.css` beside the other radii:

```css
  --radius-pill-label: 1.5625rem; /* 25px */
```

- [ ] **Step 3: Create the component**

```astro
---
import type { ImageMetadata } from 'astro';
import { Image } from 'astro:assets';

interface Props {
  variant?: 'client' | 'userType';
  icon?: ImageMetadata;
  class?: string;
}

const { variant = 'client', icon, class: className } = Astro.props;
---

<span class:list={['pill', `pill--${variant}`, className]}>
  {icon && <Image class="pill__icon" src={icon} alt="" width={24} height={24} />}
  <span class="pill__label"><slot /></span>
</span>

<style>
  .pill {
    display: inline-flex;
    gap: var(--space-8);
    align-items: center;
    justify-content: center;
    padding-block: var(--space-8);
    padding-inline: var(--space-16);
    border-radius: var(--radius-pill-label);
    font-weight: 700;
  }

  .pill--client {
    background-color: var(--color-purple);
    color: var(--color-white);
  }

  .pill--userType {
    background-color: var(--color-light-purple);
    color: var(--color-purple);
  }

  .pill__icon {
    inline-size: 1.5rem;
    block-size: 1.5rem;
  }
</style>
```

The label carries `font-weight: 700` on top of the inherited body size — Figma's pill text is Inter Bold 16, which is `Body Reg` at bold weight, so it needs no type class.

The icon's `alt=""` is correct: the avatar is decorative and the label beside it carries the meaning.

- [ ] **Step 4: Verify both variants**

Temporarily add to `src/pages/index.astro` above the card list:

```astro
<Pill>Absa Banking</Pill>
<Pill variant="userType" icon={Woman2}>Call centre agents</Pill>
```

with `import Pill from '../components/Pill.astro';` and `import Woman2 from '../assets/icons/woman-2.svg';`.

Run `npm run dev` and compare against `docs/figma/components/pills/context.md`'s screenshot description: a Purple pill with White bold text, and a Light purple pill with a Purple avatar and Purple bold text.

Then **remove the temporary markup and imports** before committing.

- [ ] **Step 5: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/Pill.astro src/assets/icons/ src/styles/tokens.css
git commit -m "feat: add Pill component and avatar icons"
```

---

### Task 7: Card content model and width

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/content/case-studies.json`
- Modify: `src/components/CaseStudyCard.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Pill` from Task 6.
- Produces: `caseStudies` entries with a required `client: string`; `<CaseStudyCard caseStudy, showClient?: boolean>`. The card no longer sets its own width — **every consumer must now set it**.

- [ ] **Step 1: Add `client` to the schema**

In `src/content.config.ts`, add to the Zod object, after `title`:

```ts
    client: z.string(),
```

- [ ] **Step 2: Add client names and the fourth case study**

In `src/content/case-studies.json`, add `"client"` to each existing entry — `"Absa"`, `"Standard Bank"`, `"MiX Telematics"` in order — and append the TRANSEARCH entry. Copy read from `docs/figma/components/read-more/context.md`:

```json
  {
    "id": "designing-an-interactive-workbook",
    "client": "TRANSEARCH",
    "title": "Designing an interactive workbook",
    "skills": ["User Research", "Process Design", "Systems Thinking"],
    "summary": "An interactive workbook that enabled users to engage with the content in a way similar to how they would with a physical workbook.",
    "order": 4
  }
```

Note the id matches the route this case study will eventually have. **Its page does not exist yet**, so its card will link to a 404 — that is expected and matches `/work` already 404ing.

- [ ] **Step 3: Render the pill and drop the fixed width**

In `CaseStudyCard.astro`: import `Pill`, destructure `client` alongside the other fields, add a `showClient` prop, and render the pill first inside `<article>`:

```astro
interface Props {
  caseStudy: CollectionEntry<'caseStudies'>;
  showClient?: boolean;
}

const { caseStudy, showClient = false } = Astro.props;
const { title, client, skills, summary } = caseStudy.data;
```

```astro
<article class="card">
  {showClient && <Pill class="card__client">{client}</Pill>}
  <h2 class="card__title">
```

`showClient` defaults to `false` so the home page is unchanged.

Then **delete** `inline-size: var(--size-card-width);` from `.card`, and add `align-self: start;` to `.card__client` so the pill hugs its content rather than stretching to the card width.

- [ ] **Step 4: Move the width to the home page**

In `src/pages/index.astro`, find the rule for the card list items and set the track width there. The list is already a grid (D-020, `grid-auto-rows: 1fr`), so set the column width rather than the item:

```css
    grid-auto-columns: var(--size-card-width);
```

Read the existing grid declarations first and place this so it matches how the row is defined. If the grid uses `grid-template-columns`, set that to `repeat(3, var(--size-card-width))` instead. The stacked layout below 1880px must keep working.

- [ ] **Step 5: Verify the home page is visually unchanged**

Run `npm run dev` at 1920px and compare against `docs/figma/landing-desktop/screenshot.png`.

Expected: **no visible change at all** — same three cards, same width, no pills. Card heights may differ slightly from the Task 2 line-height change, which was already checked there.

Then narrow the window below 1880px and confirm the stacked layout still works.

- [ ] **Step 6: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/content.config.ts src/content/case-studies.json src/components/CaseStudyCard.astro src/pages/index.astro
git commit -m "feat: add client to case studies and move card width to layouts"
```

---

### Task 8: ReadMoreSection

**Files:**
- Create: `src/components/ReadMoreSection.astro`

**Interfaces:**
- Consumes: `CaseStudyCard` (Task 7).
- Produces: `<ReadMoreSection currentId: string />`. Renders the heading and every case study except `currentId`, sorted by `order`, each card with `showClient`.

Values from `docs/figma/components/read-more/context.md`: heading is `Title 1` in Purple, right-aligned, 262px wide; 60px gap to the cards; cards 16px apart and 448px wide.

- [ ] **Step 1: Create the component**

```astro
---
import { getCollection } from 'astro:content';
import CaseStudyCard from './CaseStudyCard.astro';

interface Props {
  currentId: string;
}

const { currentId } = Astro.props;

const others = (await getCollection('caseStudies'))
  .filter((entry) => entry.id !== currentId)
  .sort((a, b) => a.data.order - b.data.order);
---

<section class="read-more" aria-labelledby="read-more-heading">
  <h2 class="read-more__heading type-title-1" id="read-more-heading">
    Other case studies
  </h2>
  <ul class="read-more__list" role="list">
    {
      others.map((entry) => (
        <li class="read-more__item">
          <CaseStudyCard caseStudy={entry} showClient />
        </li>
      ))
    }
  </ul>
</section>

<style>
  .read-more {
    display: flex;
    gap: var(--space-64); /* Figma: 60px */
    align-items: center;
  }

  .read-more__heading {
    flex: none;
    inline-size: 16.375rem; /* 262px */
    color: var(--color-purple);
    text-align: end;
  }

  .read-more__list {
    display: flex;
    gap: var(--space-16);
    align-items: stretch;
    padding: 0;
    list-style: none;
  }

  .read-more__item {
    display: flex;
    inline-size: 28rem; /* 448px */
  }
</style>
```

`align-items: stretch` plus `display: flex` on the item makes the three cards equal height, matching how the home page row behaves (D-020).

**Figma's gap is 60px and `--space-64` is 64px.** Use the token: a 4px difference is invisible here and the scale is the point. If the row looks wrong against the screenshot, add a bespoke token rather than an inline value.

- [ ] **Step 2: Verify against the case study screenshot**

This component has no page yet, so verify it in Task 9 once the layout renders it. Skip to the gate.

- [ ] **Step 3: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/ReadMoreSection.astro
git commit -m "feat: add the other case studies row"
```

---

### Task 9: CaseStudyLayout and the route

**Files:**
- Create: `src/layouts/CaseStudyLayout.astro`
- Create: `src/pages/work/streamlining-scoring.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `ReadMoreSection` (Task 8).
- Produces: `<CaseStudyLayout entry: CollectionEntry<'caseStudies'>, subNav: { href: string; label: string }[] />` with page sections in the default slot. Owns the grid, so **every direct child of the slot is placed automatically**.

- [ ] **Step 1: Create the layout**

```astro
---
import type { CollectionEntry } from 'astro:content';
import BaseLayout from './BaseLayout.astro';
import ReadMoreSection from '../components/ReadMoreSection.astro';

interface Props {
  entry: CollectionEntry<'caseStudies'>;
  subNav: { href: string; label: string }[];
}

const { entry, subNav } = Astro.props;
---

<BaseLayout title={`${entry.data.title} — Cassandra Garratt`}>
  <article class="case-study">
    <slot />
    <ReadMoreSection currentId={entry.id} />
  </article>
</BaseLayout>
```

**This component has no `<style>` block.** The `.case-study` grid lives in `global.css` (Task 3), deliberately: its children are other components' root elements, and Astro scopes styles to elements in a component's *own* template. A scoped `.case-study > *` would not match a child component's root, so every section would silently fall through to the `full` track instead of being constrained.

If you find yourself needing a scoped style here, that is a signal the rule belongs in `global.css` with the rest of the grid.

Read `BaseLayout.astro` first to confirm its prop name for the page title — this plan assumes `title`. Match whatever it actually uses.

**The spec leaves one layout question open:** whether body copy needs a narrower measure than images. If, when the sections land in Task 17, prose runs uncomfortably wide, add a third track inside `content`:

```css
      [content-start] minmax(0, 1fr)
      [text-start] minmax(0, 44rem) [text-end]
      minmax(0, 1fr) [content-end]
```

and a `.u-text` utility for it. **Do not add it pre-emptively** — two tracks may be enough, and an unused track is dead complexity.

- [ ] **Step 2: Check the subNav prop is consumed**

`subNav` is destructured but not yet rendered — Task 10 adds `CaseStudySubNav`. Leave it destructured; `astro check` will not complain about an unused destructured prop, but if it does, prefix with an underscore and rename it back in Task 10.

- [ ] **Step 3: Create the page with a temporary body**

```astro
---
import { getEntry } from 'astro:content';
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';

const entry = await getEntry('caseStudies', 'streamlining-scoring');
if (!entry) throw new Error('Missing case study: streamlining-scoring');

const subNav = [
  { href: '#project-overview', label: 'Project Overview' },
  { href: '#business-needs', label: 'Business Needs' },
  { href: '#interviews', label: 'Interviews' },
  { href: '#design', label: 'Design' },
  { href: '#user-testing', label: 'User Testing' },
  { href: '#handover', label: 'Handover' },
];
---

<CaseStudyLayout entry={entry} subNav={subNav}>
  <h1 class="type-title-1">{entry.data.title}</h1>
</CaseStudyLayout>
```

The `if (!entry) throw` is deliberate: a missing entry is a build-time bug, and failing the build is better than rendering a broken page.

The six sub nav labels come from CS1's own frame, not the design system default — they happen to match here, but CS2 and CS4 differ.

- [ ] **Step 4: Verify the route and the grid**

Run `npm run dev` and open `http://localhost:4321/work/streamlining-scoring`.

Expected: the site header, the case study title, and the three other case studies (Standard Bank, MiX Telematics, TRANSEARCH) as cards with client pills. The title and the Read More row both sit inside the gutter, not against the viewport edge.

Check in devtools that `.case-study` is a grid with the four named lines, and that `.read-more` sits in the `content` column.

- [ ] **Step 5: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/layouts/CaseStudyLayout.astro src/pages/work/
git commit -m "feat: add the case study layout and Absa route"
```

---

### Task 10: CaseStudySubNav, static

**Files:**
- Create: `src/components/CaseStudySubNav.astro`
- Modify: `src/layouts/CaseStudyLayout.astro`

**Interfaces:**
- Consumes: `withBase` from `src/utils/base-path.ts`; the `subNav` prop from Task 9.
- Produces: `<CaseStudySubNav links: { href: string; label: string }[] />`. Renders a sticky nav with a back link and the section anchors, plus an underline element positioned by `--progress-inline-size`, which Task 11's script sets.

Values from `docs/figma/components/sub-nav/context.md`: 80px tall, White, 110px inline padding, back link with a 14px gap, section links 40px apart, all Inter Bold 16 Purple.

- [ ] **Step 1: Create the component, static only**

```astro
---
import { withBase } from '../utils/base-path';

interface Props {
  links: { href: string; label: string }[];
}

const { links } = Astro.props;
---

<nav class="sub-nav u-bleed" aria-label="Case study sections">
  <div class="sub-nav__inner">
    <a class="sub-nav__back" href={withBase('/work')}>
      <span class="sub-nav__back-arrow" aria-hidden="true">&#8592;</span>
      All projects
    </a>
    <ul class="sub-nav__list" role="list">
      {
        links.map((link) => (
          <li>
            <a class="sub-nav__link" href={link.href}>
              {link.label}
            </a>
          </li>
        ))
      }
    </ul>
  </div>
  <span class="sub-nav__progress" aria-hidden="true"></span>
</nav>

<style>
  .sub-nav {
    position: sticky;
    inset-block-start: 0;
    z-index: 2;
    background-color: var(--color-white);
  }

  .sub-nav__inner {
    display: flex;
    gap: var(--space-40);
    align-items: center;
    justify-content: space-between;
    block-size: 5rem; /* 80px */
    padding-inline: var(--space-gutter);
  }

  .sub-nav__back,
  .sub-nav__link {
    color: var(--color-purple);
    font-weight: 700;
    text-decoration: none;
  }

  .sub-nav__back {
    display: inline-flex;
    gap: 0.875rem; /* 14px */
    align-items: center;
  }

  .sub-nav__list {
    display: flex;
    gap: var(--space-40);
    padding: 0;
    list-style: none;
  }

  .sub-nav__progress {
    display: block;
    block-size: 0.1875rem; /* 3px */
    inline-size: var(--progress-inline-size, 0);
    margin-inline-start: var(--progress-inset-inline-start, 0);
    background-color: var(--color-purple);
    transition-property: inline-size, margin-inline-start;
    transition-duration: var(--duration-hover);
    transition-timing-function: var(--ease-hover);
  }

  @media (prefers-reduced-motion: reduce) {
    .sub-nav__progress {
      transition: none;
    }
  }

  .sub-nav__link[aria-current='true'] {
    /* The underline carries the current state visually; this is the
       non-visual hook and the no-JS fallback marker. */
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }
</style>
```

The back arrow is a text glyph rather than the Figma SVG, because the SVG is a rotated `arrow_upward` and a left-pointing arrow character is simpler and scales with the text. If it looks wrong against the screenshot, swap in the SVG from `docs/figma/components/sub-nav/` and size it 21.5×22px.

`z-index: 2` sits above page content but below the skip link, which is `z-index: 1` inside a different stacking context — verify the skip link still appears above this bar in Step 3.

- [ ] **Step 2: Render it in the layout**

In `CaseStudyLayout.astro`, import the component and place it as the **first child** of `<article class="case-study">`, before `<slot />`:

```astro
<CaseStudySubNav links={subNav} />
```

It carries `u-bleed`, so it spans the full grid. It must be a direct child of `.case-study` for that to work.

- [ ] **Step 3: Confirm the anchor clearance rule is present**

Because the bar is sticky and 80px tall, anchor targets would otherwise land underneath it. The rule already exists in `global.css` from Task 3:

```css
.case-study [id] {
  scroll-margin-block-start: 6rem;
}
```

Confirm it is there. **Do not add a scoped copy** in this component — `.case-study` is a global layout class and its rules live together in `global.css`.

- [ ] **Step 4: Verify**

Run `npm run dev` on the case study route.

Expected: a White bar under the site header with "← All projects" on the left and six Purple links on the right. It sticks to the top when you scroll. The underline is invisible (width 0) because no script has set it yet.

Check: Tab through the links — each shows a visible focus ring. Press Tab from the very top and confirm the **skip link still appears above the sticky bar**. Click a section link — nothing scrolls yet, because the sections don't exist.

- [ ] **Step 5: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/CaseStudySubNav.astro src/layouts/CaseStudyLayout.astro
git commit -m "feat: add the case study sub navigation"
```

---

### Task 11: Sub nav progress enhancement

**Files:**
- Modify: `src/components/CaseStudySubNav.astro`

**Interfaces:**
- Consumes: the static markup from Task 10; `[id]` elements in the page matching each link's `href`.
- Produces: no new interface. Sets `--progress-inline-size` and `--progress-inset-inline-start` on the nav, and `aria-current="true"` on the active link.

**Reason for client JS** (invariant 3 requires one): the design's selected state is a single underline that grows from the first link to the current section, i.e. reading progress. That needs scroll position, which CSS alone cannot provide with acceptable cross-browser support.

- [ ] **Step 1: Add the script**

Append to `CaseStudySubNav.astro`, after the `<style>` block:

```astro
<script>
  const nav = document.querySelector<HTMLElement>('.sub-nav');
  const links = [
    ...document.querySelectorAll<HTMLAnchorElement>('.sub-nav__link'),
  ];
  if (nav && links.length > 0) {
    const sections = links
      .map((link) => document.querySelector(link.hash))
      .filter((section): section is Element => section !== null);

    const setProgress = (index: number) => {
      const navLeft = nav.getBoundingClientRect().left;
      const first = links[0].getBoundingClientRect();
      const current = links[index].getBoundingClientRect();
      nav.style.setProperty(
        '--progress-inset-inline-start',
        `${first.left - navLeft}px`
      );
      nav.style.setProperty(
        '--progress-inline-size',
        `${current.right - first.left}px`
      );
      links.forEach((link, i) =>
        link.setAttribute('aria-current', i === index ? 'true' : 'false')
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = sections.indexOf(entry.target);
          if (index !== -1) setProgress(index);
        }
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    if (sections.length > 0) setProgress(0);
    addEventListener('resize', () => {
      const active = links.findIndex(
        (link) => link.getAttribute('aria-current') === 'true'
      );
      setProgress(active === -1 ? 0 : active);
    });
  }
</script>
```

Notes on the choices here:

- `rootMargin: '0px 0px -80% 0px'` shrinks the observer's viewport to its top fifth, so a section becomes "current" as it reaches the top of the screen rather than when it first appears at the bottom.
- The underline is measured from the DOM rather than hard-coded, so it stays correct if labels change per case study.
- Offsets are measured **relative to the nav**, not the viewport. `.case-study` has `max-inline-size` and `margin-inline: auto`, so above 1920px the grid is centred and the nav's left edge is not the viewport's — a viewport-relative offset would drift.
- `aria-current="false"` is set explicitly rather than removed, so the attribute selector in the CSS has a stable value to match.
- The `resize` listener re-measures, because the positions are pixel values.
- Astro bundles this as a deferred module script, so it runs after the HTML is parsed and painted.

- [ ] **Step 2: Verify with JS enabled**

This needs sections to observe. The first arrives in Task 14 and the full set in Task 17. For now, verify no errors: run `npm run dev`, open the case study route and check the console.

Expected: **no errors**. `sections` is empty, so the observer watches nothing and the underline stays at width 0. The `if (sections.length > 0)` guard prevents a crash.

- [ ] **Step 3: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/CaseStudySubNav.astro
git commit -m "feat: track reading progress in the case study sub nav"
```

---

### Task 12: SectionHeading

**Files:**
- Create: `src/components/SectionHeading.astro`

**Interfaces:**
- Consumes: type classes from Task 3.
- Produces: `<SectionHeading eyebrow?: string, title: string, align?: 'start' | 'end', id?: string, level?: 2 | 3 />` with an optional standfirst in the default slot.

Values from `docs/figma/components/case-study-intro/business-problem-heading.md`: eyebrow in La Belle Aurore Purple, heading in `Title 2` Red and lowercase, standfirst in `Sub Title` Purple.

- [ ] **Step 1: Create the component**

```astro
---
interface Props {
  eyebrow?: string;
  title: string;
  align?: 'start' | 'end';
  id?: string;
  level?: 2 | 3;
}

const { eyebrow, title, align = 'end', id, level = 2 } = Astro.props;
const Heading = `h${level}` as 'h2' | 'h3';
---

<div class:list={['section-heading', `section-heading--${align}`]}>
  <Heading class="section-heading__title type-title-2" id={id}>
    {eyebrow && <span class="section-heading__eyebrow type-handwritten">{eyebrow}</span>}
    {title}
  </Heading>
  {
    Astro.slots.has('default') && (
      <p class="section-heading__standfirst type-subtitle">
        <slot />
      </p>
    )
  }
</div>

<style>
  .section-heading {
    display: flex;
    flex-direction: column;
    gap: var(--space-headings-body);
  }

  .section-heading--end {
    align-items: flex-end;
    text-align: end;
  }

  .section-heading__title {
    color: var(--color-red);
    text-transform: lowercase;
  }

  .section-heading__eyebrow {
    display: block;
    color: var(--color-purple);
    text-transform: lowercase;
  }
</style>
```

Design notes:

- The eyebrow lives **inside** the heading element so screen readers announce "the business problem" as one heading, matching how it reads visually. It is a `<span>`, so it does not break the heading semantics.
- `text-transform: lowercase` matches Figma, which lowercases title-case source text. The prop takes normal casing so the underlying content stays readable and correct if the styling changes.
- `level` defaults to 2. The page has exactly one `<h1>` (invariant 5), so sections are `<h2>` unless nested.
- `id` is passed to the heading so sub nav anchors target the heading itself, which is what `scroll-margin-block-start` from Task 10 applies to.

- [ ] **Step 2: Verify against Figma**

Add temporarily to the case study page, below the `<h1>`:

```astro
<SectionHeading eyebrow="the" title="Business problem" id="business-needs">
  During a full day workshop with my key stakeholders I identified:
</SectionHeading>
```

Run `npm run dev` and compare against `docs/figma/case-study-1-desktop/screenshot.png`, the "the business problem" block: a small Purple handwritten "the" above a two-line Red lowercase heading, right-aligned, with the standfirst below.

Leave this in place — Task 17 replaces it with the real composition.

- [ ] **Step 3: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/SectionHeading.astro src/pages/work/streamlining-scoring.astro
git commit -m "feat: add the case study section heading"
```

---

### Task 13: DefinitionTip

**Files:**
- Create: `src/components/DefinitionTip.astro`

**Interfaces:**
- Consumes: type classes from Task 3.
- Produces: `<DefinitionTip id: string, term: string />` with the definition in the default slot. Renders inline inside a paragraph.

Values from `docs/figma/components/definition-tip/context.md`: White bubble, 25px radius, 16px padding, 8px gap, Purple text at `Sub Title` size, term in bold, soft upward drop shadow.

**Reason for client JS** (invariant 3): none for behaviour — opening, closing, Escape, light dismiss and focus are all native to the Popover API. The ~10 lines exist only to *position* the bubble under its trigger, because popovers render in the top layer and cannot be positioned by an ancestor.

- [ ] **Step 1: Create the component**

```astro
---
interface Props {
  id: string;
  term: string;
}

const { id, term } = Astro.props;
---

<button class="definition-trigger" type="button" popovertarget={id}>
  {term}
</button>
<div class="definition-tip" id={id} popover>
  <p class="definition-tip__term type-subtitle">{term}</p>
  <p class="definition-tip__body type-subtitle"><slot /></p>
</div>

<style>
  .definition-trigger {
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    text-underline-offset: 0.15em;
    cursor: pointer;
  }

  .definition-tip {
    inline-size: min(28.9375rem, calc(100vw - 2rem)); /* 463px */
    padding: var(--space-16);
    border: 0;
    border-radius: var(--radius-card);
    background-color: var(--color-white);
    color: var(--color-purple);
    filter: drop-shadow(0 -0.125rem 0.275rem rgb(0 0 0 / 0.08));
  }

  .definition-tip__term {
    margin-block-end: var(--space-8);
    font-weight: 700;
  }
</style>

<script>
  for (const trigger of document.querySelectorAll<HTMLButtonElement>(
    '.definition-trigger'
  )) {
    const tip = document.getElementById(trigger.getAttribute('popovertarget')!);
    if (!tip) continue;
    tip.addEventListener('beforetoggle', (event) => {
      if ((event as ToggleEvent).newState !== 'open') return;
      const rect = trigger.getBoundingClientRect();
      tip.style.position = 'fixed';
      tip.style.margin = '0';
      tip.style.insetBlockStart = `${rect.bottom + 8}px`;
      tip.style.insetInlineStart = `${rect.left}px`;
    });
  }
</script>
```

Notes:

- **The trigger is a `<button>`**, not a `<span>`, so it is keyboard reachable and announced as interactive. It is reset to look like inline underlined text.
- `popovertarget` is declarative, so **without JavaScript the popover still opens and closes** — it simply appears centred in the viewport rather than anchored to the word. That is the intended fallback.
- The tail (the speech-bubble point) from Figma is **omitted**. It is positioned at a fixed percentage of a fixed-width bubble in the design, which does not survive the bubble being repositioned. Note this as a known visual difference and raise it rather than approximating it.
- `filter: drop-shadow` rather than `box-shadow`, so it would follow the bubble's shape if the tail is added later.

- [ ] **Step 2: Verify keyboard and no-JS behaviour**

Add temporarily to the case study page:

```astro
<p class="type-subtitle">
  <DefinitionTip id="def-absa" term="Absa">
    A multinational banking and financial services provider, based in
    Johannesburg ZA.
  </DefinitionTip> wanted to streamline its credit product scoring.
</p>
```

Run `npm run dev` and check all of:

1. Click "Absa" — the bubble opens directly beneath the word.
2. Press `Escape` — it closes.
3. Click elsewhere — it closes.
4. `Tab` to the trigger, press `Enter` — it opens. Press `Escape` — it closes and focus returns to the trigger.
5. In devtools, disable JavaScript and reload. Click "Absa" — **it still opens**, centred in the viewport. Re-enable JS.

Expected: all five pass. If 5 fails, the browser lacks Popover API support — record which browser and raise it.

Remove the temporary markup before committing; Task 14 adds the real one.

- [ ] **Step 3: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/DefinitionTip.astro
git commit -m "feat: add the definition tip popover"
```

---

### Task 14: CaseStudyIntro

**Files:**
- Create: `src/components/CaseStudyIntro.astro`
- Modify: `src/pages/work/streamlining-scoring.astro`

**Interfaces:**
- Consumes: `Pill` (Task 6), `DefinitionTip` (Task 13), the hero image from Task 4.
- Produces: `<CaseStudyIntro eyebrow: string, title: string, userTypes: { label: string; icon: ImageMetadata }[], image: ImageMetadata, imageAlt: string, id?: string />` with the lead paragraph in the default slot and `goal` / `outcome` named slots. **Contains the page's one `<h1>`.**

`id` is applied to the component's **root element**, which is the grid's direct child, so the sub nav's `#project-overview` anchor resolves and picks up the `scroll-margin-block-start` rule from Task 3. Do not wrap the component in an extra `<div>` to carry the id — that would break the grid's direct-child placement.

**Depends on Task 4.** Column widths and the text/image split come from the fetched Introduction section (`86:441`) in `docs/figma/case-study-1-desktop/context.md`. The block structure below is already known from `docs/figma/components/case-study-intro/context.md`.

- [ ] **Step 1: Build the component**

Structure, with gaps from the saved snapshot:

```
outer stack                      --space-48
  Title block                    --space-56
    Header                       --space-16
      eyebrow    .type-handwritten, Purple
      h1         .type-title-1, RED (not Black — the card title is Black,
                 the case study title is Red)
      user pills row             --space-16
    lead paragraph .type-subtitle, Purple
  Goal and outcome               --space-sub-sections (48)
    goal:    h2 .type-h2, Red, lowercase  +  body .type-body-med, Purple
             separated by --space-headings-body (16)
    hairline rule, 400px wide, 1px, Light purple
    outcome: same shape as goal
```

Use named slots for `goal` and `outcome` so the page supplies prose with its bold runs intact:

```astro
<slot name="goal" />
```

The `<h1>` moves **into** this component — the case study title is the page's single `<h1>` (invariant 5). Remove the temporary `<h1>` from the page file.

Two things in the Figma output that must **not** be reproduced, both recorded in the snapshot's Notes:

- The `<a href="standardbank.co.za">` wrappers around every block. They are Figma prototype links, and they point at the wrong client on this very case study.
- The `lowercase` on the `<h1>` is a text transform, not the content. Pass normal casing in the prop and lowercase it in CSS, so the accessible name stays properly cased.

- [ ] **Step 2: Use it on the page**

```astro
<CaseStudyIntro
  eyebrow="ux/ui designer"
  title={entry.data.title}
  userTypes={[{ label: 'Call centre agents', icon: Woman2 }]}
  image={scoringHero}
  imageAlt="TODO(cass): needs review"
  id="project-overview"
>
  <DefinitionTip id="def-absa" term="Absa">
    A multinational banking and financial services provider, based in
    Johannesburg ZA.
  </DefinitionTip> wanted to streamline its credit product scoring within their
  Salesforce CRM so that a single call centre Agent could handle multiple
  product types in one interaction.
  <Fragment slot="goal">…</Fragment>
  <Fragment slot="outcome">…</Fragment>
</CaseStudyIntro>
```

Take the exact prose from the fetched snapshot, not from this plan.

- [ ] **Step 3: Verify against the frame**

Run `npm run dev` on the route and compare the top of the page with the top of `docs/figma/case-study-1-desktop/screenshot.png`.

Expected: handwritten Purple eyebrow, two-line Red title, one Light purple pill with an avatar, the lead paragraph with "Absa" underlined and clickable, then `project goal` and `project outcome` in Red over Purple body copy with a hairline between.

Confirm there is exactly one `<h1>` on the page:

```bash
npm run build && grep -o "<h1" dist/work/streamlining-scoring/index.html | wc -l
```

Expected: `1`

- [ ] **Step 4: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/CaseStudyIntro.astro src/pages/work/
git commit -m "feat: add the case study intro"
```

---

### Task 15: ProcessStrip

**Files:**
- Create: `src/components/ProcessStrip.astro`
- Modify: `src/pages/work/streamlining-scoring.astro`
- Copy: arrow assets into `src/assets/`

**Interfaces:**
- Consumes: hand-drawn arrow SVGs from `docs/figma/components/shapes-arrows/`.
- Produces: `<ProcessStrip steps: string[], class?: string />`. The page passes `class="u-bleed"`.

**Depends on Task 4.** Band height, padding, step type size and which arrow asset is used all come from the fetched Process section (`67:334`). This component has **no earlier snapshot**.

- [ ] **Step 1: Copy the arrow assets**

```bash
cp docs/figma/components/shapes-arrows/arrow-01-curve.svg docs/figma/components/shapes-arrows/arrow-01-head.svg src/assets/
```

Check the fetched Process section first — if it references a different arrow (`Arrow_02` or `Arrow_03`), copy that pair instead. The frame uses five `Arrow_01` instances per case study, so `arrow-01-*` is the expected one.

- [ ] **Step 2: Build the component**

```astro
---
interface Props {
  steps: string[];
  class?: string;
}

const { steps, class: className } = Astro.props;
---

<div class:list={['process-strip', className]}>
  <ol class="process-strip__list" role="list">
    {
      steps.map((step) => (
        <li class="process-strip__step">
          <span class="process-strip__label">{step}</span>
        </li>
      ))
    }
  </ol>
</div>
```

An `<ol>` is correct: these are sequential stages of a process, and that order is meaningful to a screen reader.

The arrows between steps are **decorative** — render them as a CSS `::after` background on every step except `:last-child`, so they never enter the accessibility tree. Do not put them in the markup.

Band background is `--color-purple`, step labels White. Padding, block size and the label's type size come from the fetched section.

- [ ] **Step 3: Use it on the page**

Below the intro:

```astro
<ProcessStrip
  class="u-bleed"
  steps={[
    'identify business needs',
    'as-is journey investigations',
    'sme interviews',
    'user research',
    'design',
    'usability testing',
  ]}
/>
```

These six are read from the screenshot — **confirm them against the fetched section**, which has the authoritative text.

- [ ] **Step 4: Verify the bleed**

Run `npm run dev`.

Expected: the Purple band reaches both viewport edges, the six steps sit between arrows, and **there is no horizontal scrollbar**. Check at 1280px, 1920px and 2400px — the last one matters because `.case-study` is capped at `--page-max-width` and centred above 1920px.

- [ ] **Step 5: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/ProcessStrip.astro src/assets/ src/pages/work/
git commit -m "feat: add the case study process strip"
```

---

### Task 16: FindingBlock

**Files:**
- Create: `src/components/FindingBlock.astro`

**Interfaces:**
- Consumes: images from Task 4.
- Produces: `<FindingBlock heading: string, image: ImageMetadata, imageAlt: string, side?: 'start' | 'end', findings: { label: string; body: string }[] />`

**Depends on Task 4.** Column split, image size and gaps come from the fetched Design section (`87:504`). This is the most-repeated block on the site — roughly four per case study, ~16 across all four — so its interface matters more than any other component here.

- [ ] **Step 1: Build the component**

```astro
---
import type { ImageMetadata } from 'astro';
import { Image } from 'astro:assets';

interface Props {
  heading: string;
  image: ImageMetadata;
  imageAlt: string;
  side?: 'start' | 'end';
  findings: { label: string; body: string }[];
}

const { heading, image, imageAlt, side = 'start', findings } = Astro.props;
---

<div class:list={['finding-block', `finding-block--${side}`]}>
  <Image class="finding-block__image" src={image} alt={imageAlt} />
  <div class="finding-block__body">
    <h3 class="finding-block__heading type-h2">{heading}</h3>
    <dl class="finding-block__findings">
      {
        findings.map(({ label, body }) => (
          <div class="finding-block__finding">
            <dt class="finding-block__label type-caption">{label}</dt>
            <dd class="finding-block__text type-body">{body}</dd>
          </div>
        ))
      }
    </dl>
  </div>
</div>

<style>
  .finding-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-48);
    align-items: start;
  }

  .finding-block--end .finding-block__image {
    order: 2;
  }

  .finding-block__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .finding-block__heading {
    color: var(--color-purple);
  }

  .finding-block__findings {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    margin: 0;
  }

  .finding-block__label {
    color: var(--color-red);
    font-weight: 700;
  }

  .finding-block__text {
    margin: 0;
    color: var(--color-purple);
  }
</style>
```

Design notes:

- **A `<dl>`, not headings.** Each finding is a short label and its description — exactly a description list. Using `<h4>` for `problem` would pollute the document outline with four identical headings per block.
- **Labels are data, not fixed slots.** CS1 alone uses `problem`/`solution`/`outcome` *and* `problem`/`design decision`/`outcome`; other case studies add `insight` and `reflection`. Never hard-code the three.
- `<dd>` has a default `margin-inline-start: 40px` in user agents — the `margin: 0` above removes it.
- `side` swaps which column the image occupies, which the frame alternates down the page.

- [ ] **Step 2: Verify one block against the frame**

Add one to the page temporarily, using the first Design-section screenshot from Task 4:

```astro
<FindingBlock
  heading="removing the guess work"
  image={removingTheGuessWork}
  imageAlt="TODO(cass): needs review"
  findings={[
    { label: 'problem', body: "Agents didn't know how much Customers qualified for." },
    { label: 'design decision', body: 'Created a dynamic affordability indicator to give agents a clear amount to work with.' },
    { label: 'outcome', body: 'Giving the Agent enough information to offer additional products with confidence.' },
  ]}
/>
```

Take the exact prose from the fetched snapshot. Compare against the "removing the guess work" block in `docs/figma/case-study-1-desktop/screenshot.png`: screenshot on the left, heading and three Red-labelled paragraphs on the right.

Leave it in place — Task 17 completes the set.

- [ ] **Step 3: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/components/FindingBlock.astro src/pages/work/
git commit -m "feat: add the case study finding block"
```

---

### Task 17: Compose the full page

**Files:**
- Modify: `src/pages/work/streamlining-scoring.astro`

**Interfaces:**
- Consumes: every component from Tasks 5–16.
- Produces: the finished page. Nothing consumes it.

**Depends on Task 4** for all remaining prose, images and measurements.

- [ ] **Step 1: Lay out the full section order**

Following the frame top to bottom:

1. `CaseStudyIntro` — `id="project-overview"`
2. `ProcessStrip` — `class="u-bleed"`
3. `SectionHeading` "the business problem" — `id="business-needs"`, `align="end"` — plus the findings list beside it
4. Purple panel "talking to the experts" — `class="u-bleed"`, `id="interviews"`
5. `SectionHeading` "designing the scoring page" — `id="design"`, `align="end"`
6. Four `FindingBlock`s: removing the guess work, giving the agent control, a variety of choices, building trust
7. Purple panel "14 out of 15 / testing my work" — `class="u-bleed"`, `id="user-testing"`
8. `SectionHeading` "handover & next iteration" — `id="handover"`, `align="end"` — with body copy
9. The Read More row, which `CaseStudyLayout` already renders

Every `id` must match a sub nav `href` from Task 9, or the progress underline never moves.

- [ ] **Step 2: Build the two purple panels as markup, not components**

Per the spec, the purple band is a utility, not a component — its contents differ every time. Each is a direct child of the grid carrying `u-bleed`:

```astro
<section class="panel u-bleed" id="interviews" aria-labelledby="interviews-heading">
  <div class="panel__inner">…</div>
</section>
```

with a shared `.panel` class in the page's `<style>` block: Purple background, White text, the fetched padding, and an inner wrapper constrained to the content measure so the text doesn't run edge to edge inside a full-bleed band.

If a third case study needs the same panel shape, extract it then — not now.

- [ ] **Step 3: Build the findings list as markup**

The rule-separated statements beside the business-problem heading:

```astro
<ul class="findings-list" role="list">
  <li class="findings-list__item type-body">…</li>
</ul>
```

with `border-block-end` on each item except the last. It appears in all four case studies, but it is a `<ul>` with a border — the spec says build it here and extract only if the second case study makes it awkward.

- [ ] **Step 4: Draft alt text and flag every instance**

Every `<Image>` needs meaningful alt text (invariant 5). Draft from the surrounding copy, for example: "The consolidated scoring page, showing total affordability, a rewards tier panel and a product summary."

Add at the top of the page file:

```astro
<!--
  TODO(cass): all image alt text below is drafted from the surrounding copy
  and needs review. What each screenshot is meant to demonstrate is a design
  intent question, not something inferable from the image.
-->
```

**Do not describe the alt text as finished** in the task summary.

- [ ] **Step 5: Verify the whole page**

Run `npm run dev` and compare top to bottom against `docs/figma/case-study-1-desktop/screenshot.png`.

Check specifically:

- Purple bands reach both viewport edges; **no horizontal scrollbar** at 1280px, 1920px and 2400px.
- Text sections stay within the gutter.
- The sub nav underline **grows as you scroll**, and `aria-current="true"` moves between links in devtools.
- Clicking a sub nav link scrolls the heading clear of the sticky bar rather than under it.
- The definition tip opens beneath "Absa".

- [ ] **Step 6: Run the standard gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add src/pages/work/ src/assets/
git commit -m "feat: build the Absa case study page"
```

---

### Task 18: Verification pass and documentation

**Files:**
- Modify: `docs/decisions.md`, `docs/questions.md`, `docs/architecture.md`, `docs/wiki/index.md`, `docs/wiki/log.md`, `docs/wiki/design-tokens.md`, `docs/wiki/componentisation.md`

**Interfaces:**
- Consumes: the finished page.
- Produces: nothing in code. Updating the docs is part of being done (`AGENTS.md`).

- [ ] **Step 1: Keyboard pass**

On the case study route, with a keyboard only:

1. `Tab` from the top: skip link appears **above** the sticky sub nav and works.
2. Tab order is header nav → sub nav back link → sub nav links → in-page links → cards.
3. Every focusable element shows the visible focus ring.
4. The definition tip opens on `Enter`, closes on `Escape`, and returns focus to its trigger.
5. Each card is reachable and its whole area is the link target.

Record anything that fails; do not fix it silently if it needs a design answer.

- [ ] **Step 2: No-JS pass**

Disable JavaScript in devtools and reload.

Expected: the page renders completely; sub nav anchors navigate; the definition tip still opens (centred); the progress underline sits at its start position; no layout breaks and no console errors.

- [ ] **Step 3: Reduced-motion pass**

In devtools, emulate `prefers-reduced-motion: reduce`.

Expected: anchor clicks jump rather than smooth-scroll, and the progress underline snaps rather than animating.

- [ ] **Step 4: Measure the Red-on-Off-white contrast**

Use devtools' colour picker or any contrast checker on a small Red label (`#cd2b2b`) against the Off-white page background (`#f8f9ff`).

Record the actual ratio. **AA needs 4.5:1 for text under 24px.** The small `problem` / `solution` / `outcome` labels are the case that matters; the 45px headings only need 3:1.

If it fails, **do not change the colour** — Figma is the source of truth (invariant 6). Record the measured value and raise it as a question for Cass.

- [ ] **Step 5: Re-verify the home page**

Open `/` at 1920px and compare against `docs/figma/landing-desktop/screenshot.png`, then hover and tab a card.

Expected: unchanged except for the `H1` line-height tightening already accepted in Task 2. Confirm the card captions still align and the hover crossfade still works after the `CircleArrow` extraction.

- [ ] **Step 6: Record the decisions**

Add to `docs/decisions.md`, taking the next free numbers after D-020, each with Context / Decision / Alternatives considered / Consequences in the existing style:

- **Inter only.** Roboto retired on Cass's ruling (2026-09-29). La Belle Aurore retained for the handwritten style. *Resolves Q-014.*
- **Case study pages are bespoke, on shared section components.** Amends D-013: pages stay bespoke `.astro` files, but shared section components are allowed. A data-driven model is deferred to post-MVP. *Resolves Q-015.*
- **Progressive enhancement over a UI framework.** Popover API for the definition tip; a small `IntersectionObserver` script for sub nav progress. No framework, no scroll-driven CSS. *Resolves Q-016.*
- **Type classes and a spacing scale.** One class per Figma text style; a numeric spacing scale; colour stays with components.
- **The three sanctioned card divergences** from the Read More artwork (Inter not Roboto, Grey not 58% black, hover state added), which invariant 6 requires be written down.

Also record the real shadow values against **Q-013**, leaving it open for hover timing only.

- [ ] **Step 7: Update the questions**

In `docs/questions.md`: delete the entries and summary rows for Q-014, Q-015 and Q-016, per the file's own instructions. Update Q-013 to cover motion only. Add a new question for the **`/work` index route**, which this work leaves 404ing, alongside Q-011's `/resume`.

Update Q-018 with what was actually committed — the real image count and total size — so the off-repo decision has facts behind it.

- [ ] **Step 8: Update architecture and the wiki**

- `docs/architecture.md`: add the new components, layout and route to the code map; update the status line; note the layout grid convention under invariants if it belongs there.
- `docs/wiki/design-tokens.md`: the type classes, the spacing scale, the `H1` change and its effect on the home page.
- `docs/wiki/componentisation.md`: replace predictions with what was actually built, and record whether `FindingsList` and the purple band still look like the right calls after building them.
- `docs/wiki/index.md`: only if a new page was added.
- `docs/wiki/log.md`: append an entry.

- [ ] **Step 9: Final gate and commit**

```bash
npm run check && npm run build && npm run format:check
git add docs/
git commit -m "docs: record case study decisions and update the wiki"
```

- [ ] **Step 10: Report honestly**

Summarise: what was built, the verification results **including anything that failed**, the measured contrast ratio, the Figma call count, the committed image size, and the open items — alt text awaiting Cass's review, the missing definition-tip tail, `/work` still 404ing, and the NDA question that still gates publishing.

Do not push. Pushing needs the user's approval every time (D-018).
