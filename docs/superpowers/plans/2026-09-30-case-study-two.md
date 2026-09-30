# Case Study 2 (Standard Bank) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `/work/consolidating-import-collections` as a complete, accessible, static page, and move CS1 onto the shared components it forces, with CS1 and the home page left pixel-identical.

**Architecture:** A bespoke Astro page composing shared section components inside `CaseStudyLayout` (D-022), exactly like `streamlining-scoring.astro`. The first three tasks are refactors of shared code, each proven by a pixel diff against baselines taken before any code changed. The remaining tasks build the page one section group at a time, each checked against the saved per-section Figma render.

**Tech Stack:** Astro 7 (static), TypeScript, hand-written CSS custom properties (`src/styles/tokens.css`), Astro `<Image>`, headless Microsoft Edge over the DevTools protocol for verification (no new dependencies).

**Spec:** [`docs/superpowers/specs/2026-09-30-case-study-two-design.md`](../specs/2026-09-30-case-study-two-design.md). Read its first table ("What CS1 taught us") before starting.

## Global Constraints

- Branch `reece/feature/case-study-2`. One commit per task, Conventional Commits, summary ≤72 chars, ending with the `Co-Authored-By` line from the session's attribution reminder. **Never push** without asking the user (AGENTS.md).
- **Every measurement comes from [`docs/figma/case-study-2-desktop/context.md`](../../figma/case-study-2-desktop/context.md).** It is copied into each task below. Never guess a value, and never make a Figma call: everything needed is saved.
- **A measured value is never rounded to a neighbouring token.** It gets its own `--space-N` scale step or a named token. Widths inside page CSS follow CS1's idiom: `minmax(0, <rem>)` with the px value and Figma node in a comment.
- **No hard-coded colours, shadows, radii or type values.** Use tokens and `.type-*` classes only.
- **Invariant 8:** every section's root element is a **direct child** of the `.case-study` grid. Full-bleed sections carry `class="u-bleed"` on that root.
- **Scoped styles only reach elements in their own template.** A page cannot style a child component's root through a class passed as a prop. Wrap the component in a page-owned element when the page needs to place it.
- **Never put `display` on a `[popover]` element**, and never put anything but phrasing content inside a `<p>`. `DefinitionTip` is already safe; don't wrap it differently.
- **Alt text:** draft real alt text (given in each task) and flag it for Cass in an HTML comment beside the image. Never write "TODO" inside `alt`. Decorative images get `alt=""` or `aria-hidden="true"`.
- **Copy is transcribed as written**, including its defects, which are listed in each task. Q-023 records them.
- **Every task ends with** `npm run build`, `npm run check` and `npm run format:check` all passing, plus the task's own screenshot check. If `format:check` fails, run `npm run format` and re-check.
- **Line endings:** write files with the Write/Edit tools or `sed`, not Python on Windows (it writes CRLF).

## Verification Model

The tooling lives in the git-ignored workspace `.superpowers/sdd/2026-09-30-case-study-two/`:

- `shoot.mjs <url> <outDir> [--nojs] [--reduced-motion] [--tab=N]` drives headless Edge. It writes `full.png`, one `NN-<id-or-class>.png` per direct child of `.case-study` (cropped to its real bounding box, full page width), prints each section's x/y/w/h, and with `--tab` writes `focus.txt` (the Tab order, each element's target and whether its focus ring shows).
- `diff.mjs <before.png> <after.png> [marked.png]` prints `IDENTICAL` or the differing-pixel count and row range, and exits 1 on any difference.
- Baselines, taken before any code changed: `shots/cs1-before/` and `shots/home-before/`. Repeat shots of an unchanged page were verified pixel-identical, so any diff is a real change.
- Figma references: `docs/figma/case-study-2-desktop/sections/NN-*.png`. These are the per-section renders returned by `get_design_context`, each at roughly 1024px wide for a section that is 1200–1920px wide in Figma. Compare **structure, wrapping, alignment and proportions**, not pixels.

Serve the build for shooting (run in the background, then stop it when the task is done):

```bash
npm run build && (npx astro preview --port 4329 >/dev/null 2>&1 &) && sleep 4
S=.superpowers/sdd/2026-09-30-case-study-two
```

Stop it (PowerShell):

```powershell
Get-NetTCPConnection -LocalPort 4329 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -Confirm:$false }
```

To look at a shot, downscale it first (full-page shots are too tall to read):

```bash
node -e "require('F:/Code/cass-website/node_modules/sharp')(process.argv[1]).resize({width:900}).toFile(process.argv[2])" <in.png> <out.png>
```

## Pre-flight

Before Task 1, the executor re-reads the spec and this plan and checks, then records the result in `$S/progress.md`:

1. `git status` is clean and the branch is `reece/feature/case-study-2`.
2. `git rev-parse --short reece/feature/mvp` prints `0e96968`, the commit this branch was cut from. If the MVP branch has moved (the user's PR review), **stop and ask the user** whether to rebase first.
3. The baselines exist: `$S/shots/cs1-before/full.png` and `$S/shots/home-before/full.png`.
4. Every file path in the "File Structure" table below exists (Modify) or doesn't yet (Create).

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/components/ProcessStrip.astro` | Modify | Takes `{ label, width }[]`; the width lookup table goes |
| `src/components/LabelledFindings.astro` | Create | The `<dl>` of label/body pairs, with `tone` |
| `src/components/FindingBlock.astro` | Modify | Uses `LabelledFindings`; gains `tone`, `columns`, `align` |
| `src/components/FindingsList.astro` | Create | Rule-separated statements list (moved from CS1's page markup) |
| `src/components/CaseStudyFigure.astro` | Create | Screenshot with the standard radius and shadow, plus an optional handwritten caption |
| `src/styles/global.css` | Modify | Gains `.panel` (moved from CS1), `.type-handwritten-small`, `.type-sub-titles` |
| `src/styles/tokens.css` | Modify | CS2 process widths, new type tokens, `--space-2`, two bespoke spaces |
| `src/pages/work/streamlining-scoring.astro` | Modify | Retrofit: new `ProcessStrip` steps, `FindingsList`, `.panel` CSS removed |
| `src/pages/work/consolidating-import-collections.astro` | Create | The CS2 page |
| `docs/…` | Modify | Decisions, questions, architecture, wiki (Task 9) |

---

### Task 1: ProcessStrip takes measured widths as props

**Files:**
- Modify: `src/components/ProcessStrip.astro`
- Modify: `src/styles/tokens.css` (the Process strip size block, after `--size-process-step-testing`)
- Modify: `src/pages/work/streamlining-scoring.astro:74-84`

**Interfaces:**
- Produces: `ProcessStrip` props `{ steps: { label: string; width: string }[]; class?: string }`, where `width` is a CSS length (always a `var(--size-process-step-*)` token). Six new tokens `--size-process-step-import-*`, used in Task 4.

- [ ] **Step 1: Change the component interface and delete the lookup table**

In `src/components/ProcessStrip.astro`, replace everything from `interface Props {` to the closing `};` of `stepWidths` with:

```astro
interface Props {
  // Each label's width is the fixed width Figma gives that text node, so
  // long labels wrap as designed; without it a label can't shrink below its
  // own min-content and the six-step row overflows narrower viewports.
  // Measured per case study rather than looked up by label text: the same
  // label differs between frames ("user research" is 129px in CS1's 67:334
  // and 126px in CS2's 91:701). Pass a --size-process-step-* token.
  steps: { label: string; width: string }[];
  class?: string;
}

const { steps, class: className } = Astro.props;
```

Replace the `steps.map` body with:

```astro
    {steps.map(({ label, width }) => (
      <li class="process-strip__step">
        <span
          class="process-strip__label type-h1"
          style={`inline-size: ${width}`}
        >
          {label}
        </span>
      </li>
    ))}
```

In the `.process-strip__label` CSS comment, replace "caps any label the stepWidths lookup above doesn't cover" with "caps a label whose width token is larger than intended".

- [ ] **Step 2: Add CS2's widths as tokens**

In `src/styles/tokens.css`, directly after the `--size-process-step-testing` line, add:

```css
  /* CS2 (Standard Bank) process strip label widths, from the 91:701 outline. */
  --size-process-step-import-identify: 8.0625rem; /* 129px: "identify business needs" */
  --size-process-step-import-research: 7.875rem; /* 126px: "user research" */
  --size-process-step-import-personas: 8.375rem; /* 134px: "personas" */
  --size-process-step-import-journeys: 8.0625rem; /* 129px: "user journeys" */
  --size-process-step-import-wireframing: 12.375rem; /* 198px: "wireframing & ui design" */
  --size-process-step-import-development: 11.6875rem; /* 187px: "development" */
```

The existing `--size-process-step-max` (256px) stays above the widest new value (198px).

- [ ] **Step 3: Update CS1's call site**

In `src/pages/work/streamlining-scoring.astro`, replace the `steps={[…]}` array with:

```astro
    steps={[
      { label: 'identify business needs', width: 'var(--size-process-step-identify)' },
      { label: 'as-is journey investigations', width: 'var(--size-process-step-asis)' },
      { label: 'sme interviews', width: 'var(--size-process-step-sme)' },
      { label: 'user research', width: 'var(--size-process-step-research)' },
      { label: 'design', width: 'var(--size-process-step-design)' },
      { label: 'usability testing', width: 'var(--size-process-step-testing)' },
    ]}
```

- [ ] **Step 4: Run the gates**

Run: `npm run build && npm run check && npm run format:check`
Expected: build completes, `0 errors`, and "All matched files use Prettier code style!" (run `npm run format` first if needed).

- [ ] **Step 5: Prove CS1 and the home page are unchanged**

```bash
node $S/shoot.mjs http://localhost:4329/work/streamlining-scoring/ $S/shots/cs1-t1
node $S/diff.mjs $S/shots/cs1-before/full.png $S/shots/cs1-t1/full.png $S/shots/cs1-t1/marked.png
node $S/shoot.mjs http://localhost:4329/ $S/shots/home-t1
node $S/diff.mjs $S/shots/home-before/full.png $S/shots/home-t1/full.png
```

Expected: `IDENTICAL` twice. If CS1 differs, open `marked.png` (downscaled): the differing rows show where. The likely cause is a width now applied where the old table missed a label; compare the rendered labels against `shots/cs1-before/03-process-strip.png`.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProcessStrip.astro src/styles/tokens.css src/pages/work/streamlining-scoring.astro
git commit -m "refactor(ProcessStrip): take measured label widths as props"
```

Body: "The lookup was keyed to CS1's six label strings, and CS2's labels (one shared with a different measured width) would all have fallen through to the safety cap."

---

### Task 2: Extract `.panel`, `FindingsList` and `LabelledFindings`

**Files:**
- Create: `src/components/FindingsList.astro`, `src/components/LabelledFindings.astro`
- Modify: `src/components/FindingBlock.astro`, `src/styles/global.css`, `src/pages/work/streamlining-scoring.astro`

**Interfaces:**
- Produces: `FindingsList` props `{ items: string[] }` (each item is an HTML string with inline `<strong>`). `LabelledFindings` props `{ findings: { label: string; body: string }[]; tone?: 'default' | 'inverse' }`. A global `.panel` class.

- [ ] **Step 1: Create `LabelledFindings.astro`**

```astro
---
interface Props {
  // body carries inline markup (<strong>) for the bold runs every finding
  // has in Figma. Rendered with set:html: safe because it is always authored
  // by us in page files, never user input, on this static site.
  findings: { label: string; body: string }[];
  // 'inverse' sets labels and bodies White, for findings on a Purple band.
  tone?: 'default' | 'inverse';
}

const { findings, tone = 'default' } = Astro.props;
---

<dl class:list={['labelled-findings', `labelled-findings--${tone}`]}>
  {
    findings.map(({ label, body }) => (
      <div class="labelled-findings__finding">
        <dt class="labelled-findings__label type-h3">{label}</dt>
        <dd class="labelled-findings__text type-body-med" set:html={body} />
      </div>
    ))
  }
</dl>

<style>
  /* Label/body pairs: H3 label, Body Med body, 8px apart, 24px between
     pairs (CS1 87:504; CS2 journey rows 162:2118). CS2's Status tracker
     draws a 5px label gap (91:1025) — drift, normalised to 8px. */
  .labelled-findings {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .labelled-findings__finding {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .labelled-findings__label {
    color: var(--color-red);
    /* Labels are free text with inconsistent source casing ("outcome" vs
       "Outcome"); Figma displays every one lowercase. */
    text-transform: lowercase;
  }

  .labelled-findings__text {
    color: var(--color-purple);
  }

  .labelled-findings--inverse .labelled-findings__label,
  .labelled-findings--inverse .labelled-findings__text {
    color: var(--color-white);
  }
</style>
```

- [ ] **Step 2: Make `FindingBlock` use it**

In `src/components/FindingBlock.astro`, add `import LabelledFindings from './LabelledFindings.astro';` to the frontmatter, and replace the whole `<dl class="finding-block__findings">…</dl>` with:

```astro
    <LabelledFindings findings={findings} />
```

Delete these now-unused rules from its `<style>`: `.finding-block__findings`, `.finding-block__finding`, `.finding-block__label`, `.finding-block__text`, and the comment attached to the label rule.

- [ ] **Step 3: Create `FindingsList.astro`**

```astro
---
interface Props {
  // Each item carries inline markup (<strong>). Rendered with set:html:
  // safe because items are always authored by us in page files.
  items: string[];
}

const { items } = Astro.props;
---

<ul class="findings-list" role="list">
  {
    items.map((item) => (
      <li class="findings-list__item type-body-med" set:html={item} />
    ))
  }
</ul>

<style>
  /* Rule-separated statements beside a section heading (CS1 86:196, CS2
     149:1945). Figma stacks them flex-col gap-48 with a 1px Red divider
     between, i.e. 48px either side of each rule, expressed as padding and
     margin on every item but the last so the rule belongs to the item
     rather than being an empty element. */
  .findings-list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .findings-list__item {
    color: var(--color-purple);
  }

  .findings-list__item:not(:last-child) {
    padding-block-end: var(--space-48);
    border-block-end: 1px solid var(--color-red);
    margin-block-end: var(--space-48);
  }
</style>
```

- [ ] **Step 4: Move CS1's list to it**

In `streamlining-scoring.astro`, add `import FindingsList from '../../components/FindingsList.astro';`, replace the whole `<ul class="findings-list" role="list">…</ul>` with the following, and delete the three `.findings-list*` rules and their comment from the page's `<style>`:

```astro
    <FindingsList
      items={[
        'Each business unit operated its own <strong>team of specialised Agents</strong>, each <strong>focused on one or two products.</strong>',
        '<strong>Repeated transfers</strong> were happening in the call centres and <strong>Customers were dropping calls</strong> to go to branches.',
        'Agents had <strong>limited cross-selling</strong> opportunities.',
      ]}
    />
```

- [ ] **Step 5: Move `.panel` to `global.css`**

Cut the `.panel { … }` rule **and the comment block above it** ("Purple panels … no second max-width mechanism inside.") from `streamlining-scoring.astro`'s `<style>`, and paste them into `src/styles/global.css` directly after the `.case-study [id]` rule. Then edit the comment's first paragraph to read:

```css
/* Inset Purple panel: the card shared by CS1's "talking to the experts"
   (86:211) and user-testing (19:109) panels and CS2's "taking it step by
   step" (91:1437) and handover (99:2454) panels, 1442–1451px wide in Figma
   (one --size-inset-measure). A utility class rather than a component:
   the heading sits somewhere different in each (above the body, beside it,
   right-aligned), so a component would be a <section> with a slot. Global
   because two pages use it and page styles are scoped. */
```

Keep the rest of the moved comment ("NOT full-bleed…", the 80px padding note) unchanged.

- [ ] **Step 6: Run the gates, then prove nothing changed**

Run: `npm run build && npm run check && npm run format:check`, then:

```bash
node $S/shoot.mjs http://localhost:4329/work/streamlining-scoring/ $S/shots/cs1-t2
node $S/diff.mjs $S/shots/cs1-before/full.png $S/shots/cs1-t2/full.png $S/shots/cs1-t2/marked.png
```

Expected: `IDENTICAL`. Specificity is the thing to watch: the scoped `.panel` carried a `[data-astro-cid-…]` attribute and the global one doesn't. If a panel differs, look for a page rule that now outranks it.

- [ ] **Step 7: Commit**

```bash
git add src/components/FindingsList.astro src/components/LabelledFindings.astro src/components/FindingBlock.astro src/styles/global.css src/pages/work/streamlining-scoring.astro
git commit -m "refactor: extract panel, FindingsList and LabelledFindings for reuse"
```

---

### Task 3: FindingBlock props, CaseStudyFigure, new type classes and tokens

**Files:**
- Modify: `src/components/FindingBlock.astro`, `src/styles/tokens.css`, `src/styles/global.css`
- Create: `src/components/CaseStudyFigure.astro`

**Interfaces:**
- Consumes: `LabelledFindings` (Task 2).
- Produces: `FindingBlock` gains `tone?: 'default' | 'inverse'`, `columns?: [number, number]` (image px, text px) and `align?: 'start' | 'center'`. `CaseStudyFigure` props `{ image: ImageMetadata; alt: string; caption?: string; captionSize?: 'small' | 'large'; captionTone?: 'default' | 'inverse'; captionAlign?: 'start' | 'end' }`. Classes `.type-handwritten-small` and `.type-sub-titles`. Tokens `--space-2`, `--space-persona-note`, `--space-capture-images`.

- [ ] **Step 1: Add the FindingBlock props**

In the `Props` interface add:

```ts
  // 'inverse' sets the heading, labels and bodies White, for blocks on a
  // Purple band (CS2's journey rows, 92:1636).
  tone?: 'default' | 'inverse';
  // Figma's measured image and text column widths in px, used as fr
  // weights so the split stays fluid. Default: CS1's Design section
  // (87:504), image 802px and text 566px.
  columns?: [number, number];
  // CS1's blocks top-align; CS2's journey rows centre vertically.
  align?: 'start' | 'center';
```

Destructure with defaults: `tone = 'default', columns = [802, 566], align = 'start'`. Change the root element and the findings line to:

```astro
<div
  class:list={[
    'finding-block',
    `finding-block--${side}`,
    `finding-block--${tone}`,
    `finding-block--align-${align}`,
  ]}
  style={`--finding-image: ${columns[0]}fr; --finding-text: ${columns[1]}fr`}
>
```

```astro
    <LabelledFindings findings={findings} tone={tone} />
```

In the `<style>`: change `.finding-block`'s `grid-template-columns: 802fr 566fr;` to `grid-template-columns: var(--finding-image) var(--finding-text);`, change `.finding-block--end`'s to `grid-template-columns: var(--finding-text) var(--finding-image);`, update the column-split comment to say the defaults are CS1's 802/566 and that pages pass their own measured split, and add:

```css
  .finding-block--align-center {
    align-items: center;
  }

  .finding-block--inverse .finding-block__heading {
    color: var(--color-white);
  }
```

- [ ] **Step 2: Add the tokens**

In `tokens.css`, add after the `--type-h3-*` block:

```css
  /* Hand written small (La Belle Aurore 20 / 1.11 / -2%): captions under
     CS2 screenshots (91:1057, 91:1107). */
  --type-handwritten-small-size: 1.25rem; /* 20px */
  --type-handwritten-small-line-height: 1.11;
  --type-handwritten-small-letter-spacing: -0.02em;
  --type-handwritten-small-weight: 400;

  /* Sub Titles (Inter Medium 14 / 1.5 / -1.1%): CS2's future state card body (163:2240). */
  --type-sub-titles-size: 0.875rem; /* 14px */
  --type-sub-titles-line-height: 1.5;
  --type-sub-titles-letter-spacing: -0.011em;
  --type-sub-titles-weight: 500;
```

Add `--space-2: 0.125rem;` as the first line of the spacing scale (before `--space-8`), with the comment `/* CS2 future state card title-to-body gap (163:2238) */`. After `--space-intro-columns`, add:

```css
  --space-persona-note: 1.3125rem; /* 21px; CS2 persona card 3 bottom to its
  handwritten note (92:1608 top 584 − card bottom 563) */
  --space-capture-images: 5.625rem; /* 90px; CS2 Easier Data Capture before
  and after screenshots (91:1085: after at x=697, before 607 wide) */
```

- [ ] **Step 3: Add the type classes**

In `global.css`, after `.type-handwritten`:

```css
.type-handwritten-small {
  font-family: var(--font-family-handwritten);
  font-size: var(--type-handwritten-small-size);
  font-weight: var(--type-handwritten-small-weight);
  line-height: var(--type-handwritten-small-line-height);
  letter-spacing: var(--type-handwritten-small-letter-spacing);
}

.type-sub-titles {
  font-size: var(--type-sub-titles-size);
  font-weight: var(--type-sub-titles-weight);
  line-height: var(--type-sub-titles-line-height);
  letter-spacing: var(--type-sub-titles-letter-spacing);
}
```

- [ ] **Step 4: Create `CaseStudyFigure.astro`**

```astro
---
import type { ImageMetadata } from 'astro';
import { Image } from 'astro:assets';

interface Props {
  image: ImageMetadata;
  alt: string;
  caption?: string;
  // Figma's two handwritten styles: "Hand written small" (20px) under
  // screenshots, "Hand written" (28px) for the as-is journey (92:1637).
  captionSize?: 'small' | 'large';
  // 'inverse' is White, for figures inside a Purple panel.
  captionTone?: 'default' | 'inverse';
  captionAlign?: 'start' | 'end';
}

const {
  image,
  alt,
  caption,
  captionSize = 'small',
  captionTone = 'default',
  captionAlign = 'start',
} = Astro.props;
---

<figure class="case-study-figure">
  <Image class="case-study-figure__image" src={image} alt={alt} />
  {
    caption && (
      <figcaption
        class:list={[
          'case-study-figure__caption',
          captionSize === 'small' ? 'type-handwritten-small' : 'type-handwritten',
          `case-study-figure__caption--${captionTone}`,
          `case-study-figure__caption--${captionAlign}`,
        ]}
      >
        {caption}
      </figcaption>
    )
  }
</figure>

<style>
  /* Screenshot plus handwritten caption, 16px apart (--h2-&-body, 91:1055).
     Figma's crops are baked into the asset files, so the image just fills
     its column at its own aspect ratio. */
  .case-study-figure {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
  }

  .case-study-figure__image {
    inline-size: 100%;
    border-radius: var(--radius-image);
    /* Portfolio Drop. Figma gives one CS2 screenshot "Image Drop"
       (91:1036), whose -36px spread makes it invisible: drift, Q-022. */
    box-shadow: var(--shadow-card);
  }

  .case-study-figure__caption {
    text-transform: lowercase;
  }

  .case-study-figure__caption--default {
    color: var(--color-purple);
  }

  .case-study-figure__caption--inverse {
    color: var(--color-white);
  }

  .case-study-figure__caption--end {
    text-align: end;
  }
</style>
```

- [ ] **Step 5: Gates, then prove CS1 and the home page unchanged**

Run the gates, then the Task 1 Step 5 commands with output folders `cs1-t3` and `home-t3`. Expected: `IDENTICAL` twice.

- [ ] **Step 6: Commit**

```bash
git add src/components/FindingBlock.astro src/components/CaseStudyFigure.astro src/styles/tokens.css src/styles/global.css
git commit -m "feat: add FindingBlock tone and layout props and CaseStudyFigure"
```

---

### Task 4: The CS2 route, intro, process strip and business problem

**Files:**
- Create: `src/pages/work/consolidating-import-collections.astro`

**Interfaces:**
- Consumes: everything from Tasks 1–3; `CaseStudyLayout`, `CaseStudyIntro`, `DefinitionTip`, `SectionHeading` unchanged.
- Produces: the page file with a `<style>` block that later tasks append to, and the `subNav` const (all six anchors already declared; later tasks create the missing targets).

- [ ] **Step 1: Create the page**

```astro
---
import { getEntry } from 'astro:content';
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
import CaseStudyIntro from '../../components/CaseStudyIntro.astro';
import DefinitionTip from '../../components/DefinitionTip.astro';
import ProcessStrip from '../../components/ProcessStrip.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import FindingsList from '../../components/FindingsList.astro';
import Man1 from '../../assets/icons/man-1.svg';
import Woman2 from '../../assets/icons/woman-2.svg';
import dashboard from '../../assets/case-studies/consolidating-import-collections/import-collection-dashboard.png';

const entry = await getEntry('caseStudies', 'consolidating-import-collections');
if (!entry) throw new Error('Missing case study: consolidating-import-collections');

const subNav = [
  { href: '#project-overview', label: 'Project Overview' },
  { href: '#business-needs', label: 'Business Needs' },
  { href: '#interviews', label: 'Interviews' },
  { href: '#personas', label: 'Personas' },
  { href: '#user-journey', label: 'User Journey' },
  { href: '#design', label: 'Design' },
];
---

<!--
  Every measurement below is from docs/figma/case-study-2-desktop/context.md.
  TODO(cass): all image alt text is drafted from the surrounding copy and
  needs review (Q-024).
-->
<CaseStudyLayout entry={entry} subNav={subNav}>
  <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
  <CaseStudyIntro
    eyebrow="ux/ui designer"
    title={entry.data.title}
    userTypes={[
      { label: 'Bank employees', icon: Man1 },
      { label: 'Clients', icon: Woman2 },
    ]}
    image={dashboard}
    imageAlt="The redesigned Import Collection page for a trade officer, showing the collection's details, trade documents and due diligence checks beside a status tracker listing each step of the process."
    id="project-overview"
  >
    <DefinitionTip id="def-standard-bank" term="Standard Bank">
      An organisation offering financial services and banking throughout
      Africa.
    </DefinitionTip>{' '}
    provides a service known as &lsquo;Import Collections&rsquo; in which they
    act as an intermediary between their Client (a business importing goods)
    and a foreign bank representing the exporter. This service reduces the risk
    for the importer while earning the bank a transaction fee.
    <Fragment slot="goal">
      Build a cohesive interface allowing my users to{' '}
      <strong>capture, review and verify data</strong> with minimal mistakes and
      a <strong>visible working log.</strong>
    </Fragment>
    <Fragment slot="outcome">
      <p>
        I designed a single{' '}
        <strong>
          interface that replaced a five-platform, paper-heavy capture process
          with one cohesive, trackable journey.
        </strong>
      </p>
      <p>
        I owned it <strong>end to end</strong>, from discovery and user
        interviews through journey mapping to development , and left a defined
        roadmap for document-scanning automation.
      </p>
    </Fragment>
  </CaseStudyIntro>

  <ProcessStrip
    class="u-bleed"
    steps={[
      { label: 'identify business needs', width: 'var(--size-process-step-import-identify)' },
      { label: 'user research', width: 'var(--size-process-step-import-research)' },
      { label: 'personas', width: 'var(--size-process-step-import-personas)' },
      { label: 'user journeys', width: 'var(--size-process-step-import-journeys)' },
      { label: 'wireframing & ui design', width: 'var(--size-process-step-import-wireframing)' },
      { label: 'development', width: 'var(--size-process-step-import-development)' },
    ]}
  />

  <section
    class="business-problem"
    id="business-needs"
    aria-labelledby="business-needs-heading"
  >
    <SectionHeading
      eyebrow="the"
      title="Business problem"
      id="business-needs-heading"
      titleWidth="12.625rem"
    >
      With my stakeholders I identified 3 key needs:
    </SectionHeading>
    <FindingsList
      items={[
        'Faster and more accurate <strong>data capturing.</strong>',
        'Reduced swivel chairing between multiple interfaces and physical papers.',
        '<strong>Tracking</strong> of where the request was in the process for <strong>better reporting.</strong>',
      ]}
    />
  </section>
</CaseStudyLayout>

<style>
  /* --- The business problem (91:1422) -------------------------------------
     Same geometry as CS1's (86:190): heading block 391.8px, 80px gap, list
     585px, centred. The heading's 202px title box is the titleWidth above.
     Figma's third item is 596px, 11px wider than its list: drift, built at
     the list width. This grid is a copy of CS1's .business-problem;
     extract it if a third case study repeats it. */
  .business-problem {
    display: grid;
    grid-template-columns: minmax(0, 24.5rem) minmax(0, 36.5625rem);
    gap: var(--space-80);
    align-items: center;
    justify-content: center;
  }
</style>
```

Copy notes for Q-023: "development , and" (stray space before the comma) is transcribed as written.

- [ ] **Step 2: Gates**

Run the gates. `astro check` must report 0 errors.

- [ ] **Step 3: Compare with Figma**

```bash
node $S/shoot.mjs http://localhost:4329/work/consolidating-import-collections/ $S/shots/cs2-t4
```

Downscale `00-sub-nav.png`, `02-project-overview.png`, `03-process-strip.png` and `04-business-needs.png`, and compare with `docs/figma/case-study-2-desktop/sections/01-introduction.png` and `03-business-problem.png`, and with the process band in `docs/figma/case-study-2-desktop/screenshot.png`. Check:
- The title wraps "consolidating / import collections".
- Both pills show, with the right icons.
- "Standard Bank" is the Definition Tip trigger.
- Process labels wrap as in Figma: "identify business / needs", "user / research", "wireframing & / ui design", with "personas" and "development" on one line.
- "business problem" wraps onto two lines, and the list has two Red rules.

- [ ] **Step 4: Commit**

```bash
git add src/pages/work/consolidating-import-collections.astro
git commit -m "feat: add the Standard Bank case study intro and business problem"
```

---

### Task 5: "Taking it step by step" panel and the persona cards

**Files:**
- Modify: `src/pages/work/consolidating-import-collections.astro`

**Interfaces:**
- Consumes: `.panel` (Task 2), `CaseStudyFigure` (Task 3).
- Produces: the `#interviews` and `#personas` sections.

- [ ] **Step 1: Add the imports**

```astro
import CaseStudyFigure from '../../components/CaseStudyFigure.astro';
import asIsJourney from '../../assets/case-studies/consolidating-import-collections/as-is-journey.png';
import TradeOfficerIllustration from '../../assets/personas/trade-officer.svg';
import CheckerIllustration from '../../assets/personas/checker.svg';
import ClientIllustration from '../../assets/personas/client.svg';
```

SVG imports are components (as CS1's `Arrow03` is), so the names are PascalCase. The files carry fixed `width`/`height` attributes, and the CSS `inline-size` below overrides them.

- [ ] **Step 2: Add the markup after the business problem section**

```astro
  <section class="panel" id="interviews" aria-labelledby="interviews-heading">
    <div class="steps">
      <div class="steps__context">
        <div class="steps__intro">
          <h2 class="steps__heading type-title-2" id="interviews-heading">
            taking it<br />step by step
          </h2>
          <p class="type-body-med">
            I organised an <strong>observational study</strong> with an
            experienced member of the import collections team and asked them to
            process an import collection request from start to finish with me.
          </p>
        </div>
        <div class="steps__details">
          <p class="steps__statement type-subtitle">
            5 different platforms were being used.
          </p>
          <p class="type-body-med">
            This journey was <strong>very reliant on physical documentation</strong>
            and some of it would need to stay that way due to legal restraints.
          </p>
        </div>
      </div>
      <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
      <CaseStudyFigure
        image={asIsJourney}
        alt="The as-is journey as a flow diagram: a document is mailed to the bank and uploaded, checked by the due diligence team and a checker, sent back by email for changes, then reviewed and approved by the client."
        caption="AS-is journey"
        captionSize="large"
        captionTone="inverse"
        captionAlign="end"
      />
    </div>
  </section>

  <section class="personas" id="personas" aria-labelledby="personas-heading">
    <h2 class="visually-hidden" id="personas-heading">Personas</h2>
    <ul class="personas__list" role="list">
      <li class="persona">
        <h3 class="persona__name type-title-2">Trade Officer</h3>
        <div class="persona__card">
          <TradeOfficerIllustration
            class="persona__illustration persona__illustration--trade-officer"
            aria-hidden="true"
          />
          <p class="persona__intro type-body-med">
            Bank employee responsible for receiving and capturing data.
          </p>
          <div class="persona__details">
            <div class="persona__group">
              <h4 class="persona__label type-h2">goals</h4>
              <ul class="persona__points type-body-med">
                <li>Capture data as fast and accurately as possible.</li>
              </ul>
            </div>
            <div class="persona__group">
              <h4 class="persona__label type-h2">Pain points</h4>
              <ul class="persona__points type-body-med">
                <li>Swivel chairing;</li>
                <li>Not being able to track feedback;</li>
                <li>Time spent uploading data.</li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li class="persona">
        <h3 class="persona__name type-title-2">Checker</h3>
        <div class="persona__card">
          <CheckerIllustration
            class="persona__illustration persona__illustration--checker"
            aria-hidden="true"
          />
          <p class="persona__intro type-body-med">
            The bank employee responsible for checking the data the Trade
            Officer uploaded.
          </p>
          <div class="persona__details">
            <div class="persona__group">
              <h4 class="persona__label type-h2">goals</h4>
              <ul class="persona__points type-body-med">
                <li>Ensure input data accuracy.</li>
              </ul>
            </div>
            <div class="persona__group">
              <h4 class="persona__label type-h2">Pain points</h4>
              <ul class="persona__points type-body-med">
                <li>Keeping track of projects waiting for checking;</li>
                <li>long feedback threads via email;</li>
                <li>Unnecessary input mistakes.</li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li class="persona">
        <h3 class="persona__name type-title-2">client</h3>
        <div class="persona__card">
          <ClientIllustration
            class="persona__illustration persona__illustration--client"
            aria-hidden="true"
          />
          <p class="persona__intro type-body-med">
            A business working with the bank on an import collection request
          </p>
          <div class="persona__details">
            <div class="persona__group">
              <h4 class="persona__label type-h2">goals</h4>
              <ul class="persona__points type-body-med">
                <li>Provide accurate data;</li>
                <li>Ensure input data accuracy;</li>
                <li>Monitoring progress.</li>
              </ul>
            </div>
            <div class="persona__group">
              <h4 class="persona__label type-h2">Pain points</h4>
              <ul class="persona__points type-body-med">
                <li>Not knowing where in the process they are;</li>
                <li>Long wait times.</li>
              </ul>
            </div>
          </div>
        </div>
        <p class="persona__note type-handwritten">
          based on trade officer insights.
        </p>
      </li>
    </ul>
  </section>
```

Copy notes for Q-023: "legal restraints"; the Checker's "long feedback threads" starts lowercase where the other points are capitalised.

- [ ] **Step 3: Append the CSS**

```css
  /* --- Taking it step by step (91:1437) -----------------------------------
     A .panel, 1444px wide in Figma (inset measure). Context row 1212px
     centred: intro 487px, 64px, a 1px White rule, 64px, details 596px;
     then the as-is journey image 48px below. */
  .steps {
    display: flex;
    flex-direction: column;
    gap: var(--space-48);
  }

  /* The rule is a border on the details column, so its 64px padding sits
     inside the track: 596 + 64 + 1. */
  .steps__context {
    display: grid;
    grid-template-columns:
      minmax(0, 30.4375rem)
      minmax(0, calc(37.25rem + var(--space-64) + 1px));
    gap: var(--space-64);
    align-items: center;
    justify-content: center;
  }

  .steps__intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .steps__heading {
    color: var(--color-light-purple);
    text-transform: lowercase;
  }

  /* Figma's rule (91:1448) is 171px tall, inset ~8px from the 188px row;
     the margin reproduces that inset. */
  .steps__details {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    align-self: stretch;
    justify-content: center;
    padding-inline-start: var(--space-64);
    margin-block: var(--space-8);
    border-inline-start: 1px solid var(--color-white);
  }

  .steps__statement {
    font-weight: var(--type-subtitle-emphasis-weight);
  }

  /* --- Personas (92:1579) -------------------------------------------------
     Three 450px cards, 48px apart (1446px, the inset measure). Each name
     sits 24px above its card; each illustration overlaps its card's top
     right corner, placed by Figma's measured offsets from the card. */
  .personas {
    max-inline-size: var(--size-inset-measure);
    margin-inline: auto;
    /* The tallest illustration (checker) rises 153px above its card, 84px
       above the names row; keep it clear of the section above. */
    padding-block-start: 5.25rem; /* 84px */
  }

  .personas__list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 28.125rem)); /* 450px */
    gap: var(--space-48);
    justify-content: center;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .persona {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .persona__name {
    color: var(--color-red);
    text-transform: lowercase;
  }

  .persona__card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    padding: var(--space-40);
    border-radius: var(--radius-panel);
    background-color: var(--color-white);
  }

  /* 250–259px in Figma, keeping the copy clear of the illustration. */
  .persona__intro {
    max-inline-size: 16.1875rem; /* 259px */
    color: var(--color-purple);
  }

  /* Card 2's details gap is 34px in Figma (92:1483), 24 on cards 1 and 3:
     drift, built at 24. */
  .persona__details {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    color: var(--color-purple);
  }

  .persona__group {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
  }

  .persona__label {
    text-transform: lowercase;
  }

  .persona__points {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    padding-inline-start: var(--space-24);
    margin: 0;
  }

  .persona__illustration {
    position: absolute;
    block-size: auto;
    pointer-events: none;
  }

  /* 92:1473: left 324.8, top −119, 147 × 229. */
  .persona__illustration--trade-officer {
    inset-block-start: -7.4375rem;
    inset-inline-start: 20.3rem;
    inline-size: 9.1875rem;
  }

  /* 92:1480: left 269, top −153, 216 × 292. */
  .persona__illustration--checker {
    inset-block-start: -9.5625rem;
    inset-inline-start: 16.8125rem;
    inline-size: 13.5rem;
  }

  /* 92:1501: left 285, top −147, 204 × 275. */
  .persona__illustration--client {
    inset-block-start: -9.1875rem;
    inset-inline-start: 17.8125rem;
    inline-size: 12.75rem;
  }

  /* 92:1608: 29px in Figma, 1px off the 28px Hand written style: drift. */
  .persona__note {
    margin-block-start: calc(var(--space-persona-note) - var(--space-24));
    color: var(--color-purple);
    text-transform: lowercase;
  }
```

The note's margin subtracts the `.persona` gap because it is a flex sibling of the card.

- [ ] **Step 4: Gates, then compare with Figma**

Shoot to `$S/shots/cs2-t5`. Compare `05-interviews.png` with `sections/04-step-by-step.png`, and `06-personas.png` with `sections/05-personas.png`. Check:
- The heading wraps "taking it / step by step" in Light purple, and the White rule sits between the columns.
- The journey image spans the panel, with "as-is journey" in White at its bottom right.
- The three names sit above their cards.
- **Each illustration faces the same way as in Figma** (all three look left, towards the copy). If one is mirrored, add `transform: scaleX(-1)` to that illustration class with a comment citing the node's transform.
- The intro copy doesn't run under an illustration, and the note sits under card 3.

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/consolidating-import-collections.astro
git commit -m "feat: add the step-by-step panel and persona cards"
```

---

### Task 6: "The new user journey" band

**Files:**
- Modify: `src/pages/work/consolidating-import-collections.astro`

**Interfaces:**
- Consumes: `FindingBlock` with `tone`, `columns` and `align` (Task 3).

- [ ] **Step 1: Add the imports**

```astro
import FindingBlock from '../../components/FindingBlock.astro';
import tradeOfficerFlow from '../../assets/case-studies/consolidating-import-collections/trade-officer-flow.png';
import checkerFlow from '../../assets/case-studies/consolidating-import-collections/checker-flow.png';
import clientFlow from '../../assets/case-studies/consolidating-import-collections/client-flow.png';
```

- [ ] **Step 2: Add the markup after the personas section**

```astro
  <section
    class="journey u-bleed"
    id="user-journey"
    aria-labelledby="user-journey-heading"
  >
    <div class="journey__inner">
      <h2 class="journey__heading type-title-2" id="user-journey-heading">
        the new<br />user journey
      </h2>
      <div class="journey__rows">
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <FindingBlock
          heading="Trade officer flow"
          image={tradeOfficerFlow}
          imageAlt="Flow diagram of the new trade officer journey, bringing capture steps that were spread across five systems into one path."
          side="end"
          tone="inverse"
          align="center"
          columns={[709, 501]}
          findings={[
            {
              label: 'insight',
              body: 'The trade officers were losing context and focus by swopping between 5 different systems.',
            },
            {
              label: 'decision',
              body: 'I integrated the required programs where possible for a more seamless journey.',
            },
          ]}
        />
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <FindingBlock
          heading="Checker flow"
          image={checkerFlow}
          imageAlt="Flow diagram of the new checker journey, with its own review steps and a feedback loop back to the trade officer on the platform."
          side="start"
          tone="inverse"
          align="center"
          columns={[679, 532]}
          findings={[
            {
              label: 'insight',
              body: 'Checkers didn’t have easy access to projects and needed a way to give and track feedback on the platform.',
            },
            {
              label: 'decision',
              body: '<p>I separated the trade officer and checkers flows to create Checker specific journeys that cater to their needs.</p><p>I also streamlined the feedback and changes loop so that feedback would be automatically tracked and kept in context of the project.</p>',
            },
          ]}
        />
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <FindingBlock
          heading="client flow"
          image={clientFlow}
          imageAlt="Three flow diagrams of the client journeys: accepting or not accepting a collection, and accepting with or without capture."
          side="end"
          tone="inverse"
          align="center"
          columns={[683, 525]}
          findings={[
            {
              label: 'insight',
              body: 'Clients weren’t getting as much information as they needed to feel confident that there was progress.',
            },
            {
              label: 'decision',
              body: 'I made the content more accessible, trackable and easier to capture or approve the captured data.',
            },
          ]}
        />
      </div>
    </div>
  </section>
```

The checker decision has two paragraphs (Figma separates them with an empty line), so its `<dd>` holds two `<p>`s. `<p>` is valid inside `<dd>`.

- [ ] **Step 3: Append the CSS**

```css
  /* --- The new user journey (92:1636) -------------------------------------
     Genuinely full-bleed (x=0, w=1920), unlike the panels: Purple, no
     radius, 80px block padding, content at 235px each side, i.e. the
     1450px inset measure. 80px between the heading and each row. */
  .journey {
    padding-block: var(--space-80);
    padding-inline: var(--space-gutter);
    background-color: var(--color-purple);
  }

  .journey__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-80);
    max-inline-size: var(--size-inset-measure);
    margin-inline: auto;
  }

  .journey__heading {
    color: var(--color-light-purple);
    text-transform: lowercase;
  }

  /* Each row is ~1290px (709 + 80 + 501; 679 + 80 + 532; 525 + 80 + 683),
     start-aligned in the 1450px measure, so the rows end ~160px short of
     the band's right edge. */
  .journey__rows {
    display: flex;
    flex-direction: column;
    gap: var(--space-80);
    max-inline-size: 80.625rem; /* 1290px */
  }

  .journey__rows :global(dd p + p) {
    margin-block-start: 1lh;
  }
```

The last rule restores the blank line between the checker decision's two paragraphs. It is `:global` because the `<dd>` belongs to `LabelledFindings`.

- [ ] **Step 4: Gates, then compare with Figma**

Shoot to `$S/shots/cs2-t6`. Compare `07-user-journey.png` with `sections/06-user-journey.png`. Check:
- The band runs edge to edge in Purple.
- The heading wraps "the new / user journey" in Light purple.
- Images are on the right, left and right in turn, and each text column is vertically centred on its image.
- Headings, labels and bodies are all White.
- Nothing overflows horizontally: in `full.png`, the band's width equals the page width.

Also check contrast: White on Purple (`#ffffff` on `#4832a1`) must be ≥ 4.5:1 for the 16px body. Measure it with the formula in the Task 8 script.

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/consolidating-import-collections.astro
git commit -m "feat: add the new user journey band"
```

---

### Task 7: The three Solutions sections and the handover panel

**Files:**
- Modify: `src/pages/work/consolidating-import-collections.astro`

**Interfaces:**
- Consumes: `LabelledFindings` (Task 2), `CaseStudyFigure` and `.type-sub-titles` (Task 3), `.panel`.

- [ ] **Step 1: Add the imports**

```astro
import LabelledFindings from '../../components/LabelledFindings.astro';
import Arrow02 from '../../assets/arrow-02.svg';
import captureBefore from '../../assets/case-studies/consolidating-import-collections/capture-before-redacted.png';
import captureAfter from '../../assets/case-studies/consolidating-import-collections/capture-after.png';
import checkerSummary from '../../assets/case-studies/consolidating-import-collections/checker-summary.png';
import changeRequest from '../../assets/case-studies/consolidating-import-collections/change-request-pop-up.png';
```

`dashboard` (the intro image) is reused for the Status tracker, because Figma fills both slots with the same upload.

- [ ] **Step 2: Add the markup after the journey band**

```astro
  <section class="capture" id="design" aria-labelledby="design-heading">
    <div class="capture__text">
      <h2 class="capture__heading type-title-2" id="design-heading">
        Easier Data Capture
      </h2>
      <div class="capture__info">
        <div class="capture__column">
          <LabelledFindings
            findings={[
              {
                label: 'problem',
                body: 'Trade officer users were working on an interface that made it <strong>hard to keep track</strong> of where they were working.',
              },
            ]}
          />
          <hr class="capture__rule" />
          <LabelledFindings
            findings={[
              {
                label: 'Outcome',
                body: 'This approach not only reduces the amount of information the user sees at once, it also helps them restart in case they are disturbed while working.',
              },
            ]}
          />
        </div>
        <div class="capture__column">
          <LabelledFindings
            findings={[
              {
                label: 'solution',
                body: 'I broke down the data required into smaller <strong>chunks</strong> and organised them according to how they are likely to<strong> appear on the documentation</strong>.',
              },
            ]}
          />
          <div class="capture__future">
            <h3 class="capture__future-title type-h3">
              Future State | &lsquo;Automagical&rsquo; Data Population
            </h3>
            <p class="type-sub-titles">
              Allow the Trade Officer to upload the scanned documentation and use
              a document scanning API to automatically fill in the data as it saw
              it on the document. Leaving the Trade Officer to just check the
              data.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="capture__images">
      <div class="capture__before">
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <CaseStudyFigure
          image={captureBefore}
          alt="Before: the old capture screen, one long form of import bill fields with a comments window open over it. Client data is blurred."
        />
      </div>
      <div class="capture__after">
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <CaseStudyFigure
          image={captureAfter}
          alt="After: the new capture screen, a transaction type form split into steps, with a side menu of sections to complete and a progress summary."
        />
      </div>
      <div class="capture__annotation" aria-hidden="true">
        <Arrow02 class="capture__arrow" />
        <span class="capture__after-label type-handwritten-small">after</span>
      </div>
    </div>
  </section>

  <section
    class="reviewing u-bleed"
    aria-labelledby="reviewing-heading"
  >
    <div class="reviewing__inner">
      <div class="reviewing__info">
        <div class="reviewing__column">
          <h2 class="reviewing__heading type-title-2" id="reviewing-heading">
            Reviewing data &amp; Requesting Changes
          </h2>
          <LabelledFindings
            findings={[
              {
                label: 'problem',
                body: '<strong>Feedback was being</strong> given to Trade Officer users in parts over <strong>email or verbally</strong>. This made it difficult to track changes made.',
              },
            ]}
          />
        </div>
        <div class="reviewing__column">
          <LabelledFindings
            findings={[
              {
                label: 'Outcome',
                body: 'The platform becomes the source of truth for anything to do with the project, making it easier to track changes and requests.',
              },
              {
                label: 'solution',
                body: 'Checker users are able to<strong> add comments to the project file</strong> that would trigger an <strong>email and platform notification</strong> for the Trade Officer. These comments would also be <strong>trackable in the project history</strong>, making the process smoother and easier to follow up on.',
              },
            ]}
          />
        </div>
      </div>
      <div class="reviewing__images">
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <CaseStudyFigure
          image={checkerSummary}
          alt="The checker's Review & Approve screen, with the transaction details grouped into collapsible sections and Approve or Reject & Request Changes actions."
          caption="Checker summary screen"
        />
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <CaseStudyFigure
          image={changeRequest}
          alt="The Request Changes pop-up over the Review & Approve screen, with a text box for the checker's comments."
          caption="Change request pop-up"
        />
      </div>
    </div>
  </section>

  <section class="tracker" aria-labelledby="tracker-heading">
    <div class="tracker__content">
      <h2 class="tracker__heading type-title-2" id="tracker-heading">
        a Status tracker<br />for every role
      </h2>
      <LabelledFindings
        findings={[
          {
            label: 'problem',
            body: 'Client users were reported to be frustrated that they <strong>weren’t getting enough feedback from the Trade Officers </strong>during processing because they didn’t know what phase of the progress they were in.',
          },
          {
            label: 'solution',
            body: '<p>I added a user type specific status tracker to the product dashboards that displayed the <strong>steps taken, the steps in progress and the future steps</strong>.</p><p>I also added a tracker for the Due Diligence checks to keep communication transparent and continue the feeling of progress during a notoriously slow process.</p>',
          },
          {
            label: 'Outcome',
            body: '<p>All user types are able to see <strong>where in the process the documents are</strong> and what <strong>the next steps</strong> are without having to ask a Trade Officer.</p><p>All users also have access to dedicated compliance tracking (KYC, sanctions, and due-diligence checks).</p>',
          },
        ]}
      />
    </div>
    <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
    <CaseStudyFigure
      image={dashboard}
      alt="The trade officer dashboard for an import collection, with a status tracker showing completed, current and upcoming steps and a due diligence checks panel."
      caption="trade officer dashboard"
    />
  </section>

  <section class="panel" aria-labelledby="handover-heading">
    <div class="handover">
      <h2 class="handover__heading type-title-2" id="handover-heading">
        Development &amp;<br />next iteration
      </h2>
      <div class="handover__body type-body-med">
        <p>
          After a hand over session with the Development team, I supported the
          team during the coding process.
        </p>
        <p>
          When I stepped away from this project I included future state
          wireframes for the above mentioned improvements.
        </p>
      </div>
    </div>
  </section>
```

Copy notes for Q-023: the Status tracker caption has a leading space in Figma (dropped); "hand over" and "above mentioned" are as written. Headings use `&amp;` in **markup**, never in a string prop (CS1's handover heading shows the double-escape bug that causes).

- [ ] **Step 3: Append the CSS**

```css
  /* Shared across the Solutions sections: headings are Purple here, Red on
     the page background above, Light purple on Purple. */
  .capture__heading,
  .reviewing__heading,
  .tracker__heading {
    color: var(--color-purple);
    text-transform: lowercase;
  }

  /* --- Easier Data Capture (91:1065) --------------------------------------
     1468px (inset measure, drift). The heading (243px box) sits top left
     and the two-column info row is offset 192px right and 59.54px down,
     so "easier data" runs above the row and "capture" tucks in to its
     left. Images 48px below. */
  .capture {
    display: flex;
    flex-direction: column;
    gap: var(--space-48);
    max-inline-size: var(--size-inset-measure);
    margin-inline: auto;
  }

  .capture__text {
    display: grid;
    grid-template-columns: 12rem minmax(0, 69.25rem); /* 192px, 1108px */
    grid-template-rows: 3.72rem auto; /* 59.54px */
  }

  .capture__heading {
    grid-area: 1 / 1 / 3 / 3;
    max-inline-size: 15.1875rem; /* 243px */
  }

  /* Left 507px, 80px, right 509px (91:1067). */
  .capture__info {
    display: grid;
    grid-area: 2 / 2;
    grid-template-columns: minmax(0, 31.6875rem) minmax(0, 31.8125rem);
    gap: var(--space-80);
    align-items: start;
  }

  .capture__column {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .capture__rule {
    border: 0;
    border-block-start: 1px solid var(--color-red);
  }

  /* 163:2237: White, 20px padding, 12px radius, no shadow; title and body
     2px apart. */
  .capture__future {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: 1.25rem; /* 20px */
    border-radius: var(--radius-panel);
    background-color: var(--color-white);
    color: var(--color-purple);
  }

  .capture__future-title {
    text-transform: lowercase;
  }

  /* 91:1085: before 607px (14px down), a 90px gap, after 765px. The arrow
     and "after" label sit at x=594 / 621, y=331, over the before image's
     bottom-right corner. */
  .capture__images {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 37.9375rem) minmax(0, 47.8125rem);
    column-gap: var(--space-capture-images);
    align-items: start;
  }

  .capture__before {
    margin-block-start: 0.875rem; /* 14px */
  }

  .capture__annotation {
    position: absolute;
    inset-block-start: 20.6875rem; /* 331px */
    inset-inline-start: 37.125rem; /* 594px */
    inline-size: 4.65rem; /* 74.4px */
  }

  /* 91:1104: rotate 178.16deg, mirrored vertically. */
  .capture__arrow {
    inline-size: 100%;
    block-size: auto;
    transform: rotate(178.16deg) scaleY(-1);
  }

  .capture__after-label {
    position: absolute;
    inset-block-start: 0;
    inset-inline-start: 1.6875rem; /* 27px: 621 − 594 */
    color: var(--color-red);
    text-transform: lowercase;
  }

  /* --- Reviewing data & requesting changes (91:1039) ----------------------
     Full-bleed White band, 80px block padding, content 1564px centred.
     Info row: left 509px, 80px, right 509px, bottom-aligned; images 752px
     and 764px, 48px apart. */
  .reviewing {
    padding-block: var(--space-80);
    padding-inline: var(--space-gutter);
    background-color: var(--color-white);
  }

  .reviewing__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-48);
    max-inline-size: 97.75rem; /* 1564px */
    margin-inline: auto;
  }

  .reviewing__info {
    display: grid;
    grid-template-columns: minmax(0, 31.8125rem) minmax(0, 31.8125rem);
    gap: var(--space-80);
    align-items: end;
    justify-content: center;
  }

  .reviewing__column {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .reviewing__images {
    display: grid;
    grid-template-columns: minmax(0, 47rem) minmax(0, 47.75rem);
    gap: var(--space-48);
    justify-content: center;
  }

  /* --- Status tracker (91:1021) -------------------------------------------
     Text 598px, 80px, image 754px (1432px, inside the inset measure). */
  .tracker {
    display: grid;
    grid-template-columns: minmax(0, 37.375rem) minmax(0, 47.125rem);
    gap: var(--space-80);
    align-items: start;
    justify-content: center;
    max-inline-size: var(--size-inset-measure);
    margin-inline: auto;
  }

  .tracker__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  /* Paragraph breaks inside a finding (Figma: an empty line between). */
  .tracker :global(dd p + p) {
    margin-block-start: 1lh;
  }

  /* --- Handover (99:2454) -------------------------------------------------
     A .panel, 1442px (inset measure). Heading 334px right-aligned, 48px,
     body 470px, vertically centred, the 866px row centred. No shadow. */
  .handover {
    display: grid;
    grid-template-columns: minmax(0, 20.875rem) minmax(0, 29.375rem);
    gap: var(--space-48);
    align-items: center;
    justify-content: center;
  }

  .handover__heading {
    color: var(--color-light-purple);
    text-align: end;
    text-transform: lowercase;
  }

  .handover__body {
    display: flex;
    flex-direction: column;
    gap: 1lh;
  }
```

- [ ] **Step 4: Gates, then compare with Figma**

Shoot to `$S/shots/cs2-t7`. Compare `08-design.png` with `sections/07-easier-data-capture.png`, `09-reviewing.png` with `sections/08-reviewing.png`, `10-tracker.png` with `sections/09-status-tracker.png`, and the handover panel with `sections/10-handover.png`. Check:
- "easier data / capture" interlocks with the info row without overlapping any copy.
- The arrow points from the before image towards the after image, with "after" beside it.
- The White band runs edge to edge.
- "reviewing data & / requesting changes" shows a literal "&", not "&amp;".
- The Status tracker's text sits on the left, the dashboard on the right, and "trade officer dashboard" is under it.
- The handover heading is right-aligned and Light purple.

If the arrow direction is wrong, check the transform order against `context.md` (Tailwind applies rotate, then skew, then scale) before changing anything.

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/consolidating-import-collections.astro
git commit -m "feat: add the Standard Bank solutions sections and handover"
```

---

### Task 8: Full verification pass

**Files:** none changed unless a check fails. Fixes get their own `fix:` commits.

- [ ] **Step 1: Whole-page comparison**

Shoot CS2 to `$S/shots/cs2-final`. Downscale `full.png` to 768px wide and compare with `docs/figma/case-study-2-desktop/screenshot.png`, which is the same scale. Check the section order and rhythm, which sections bleed, and that nothing overflows horizontally (the shot's width must be exactly 1920).

- [ ] **Step 2: CS1 and home page regression**

```bash
node $S/shoot.mjs http://localhost:4329/work/streamlining-scoring/ $S/shots/cs1-final --tab=30
node $S/diff.mjs $S/shots/cs1-before/full.png $S/shots/cs1-final/full.png $S/shots/cs1-final/marked.png
node $S/shoot.mjs http://localhost:4329/ $S/shots/home-final
node $S/diff.mjs $S/shots/home-before/full.png $S/shots/home-final/full.png
```

Expected: `IDENTICAL` twice. CS1's Read More row already linked to CS2 (the collection entry predates this work), so adding the page changes nothing visible there.

- [ ] **Step 3: No-JS and reduced motion**

```bash
node $S/shoot.mjs http://localhost:4329/work/consolidating-import-collections/ $S/shots/cs2-nojs --nojs
node $S/shoot.mjs http://localhost:4329/work/consolidating-import-collections/ $S/shots/cs2-reduced --reduced-motion
node $S/diff.mjs $S/shots/cs2-final/full.png $S/shots/cs2-reduced/full.png
```

Expected:
- No-JS: the page renders completely, and the Definition Tip bubble is **not** visible.
- Reduced motion: `IDENTICAL` to `cs2-final` (a static shot has no motion, so any difference means reduced motion changes layout, which it shouldn't).

- [ ] **Step 4: Focus order**

```bash
node $S/shoot.mjs http://localhost:4329/work/consolidating-import-collections/ $S/shots/cs2-focus --tab=30
```

Read `focus.txt`. Expected order: skip link, brand, 5 nav items, "All projects", the 6 sub nav anchors, the "Standard Bank" trigger, then the three Read More card links. Every line shows `outline=solid 3px`. Note the result, including the known "Work" nav item `shadow=false` (MVP-branch finding, not this task's to fix).

- [ ] **Step 5: Contrast**

```bash
node -e "
const lin=c=>{c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)};
const L=h=>{const n=parseInt(h.slice(1),16);return 0.2126*lin(n>>16)+0.7152*lin((n>>8)&255)+0.0722*lin(n&255)};
const r=(a,b)=>{const[x,y]=[L(a),L(b)].sort((p,q)=>q-p);return ((x+0.05)/(y+0.05)).toFixed(2)};
for(const [f,b,what] of [['#ffffff','#4832a1','White on Purple (journey body, panels)'],['#c4cdf4','#4832a1','Light purple on Purple (panel headings, 45px)'],['#cd2b2b','#ffffff','Red on White (not used for text on CS2; check)'],['#4832a1','#ffffff','Purple on White (reviewing band, cards)'],['#4832a1','#f8f9ff','Purple on Off-white']])console.log(r(f,b)+':1',what)"
```

Expected: every pairing used for 16px text is ≥ 4.5:1, and Light purple on Purple (45px heading, large text) is ≥ 3:1. Record the numbers in `design-tokens.md` (Task 9). If one fails, **stop and raise it with the user**; don't change a colour.

- [ ] **Step 6: Keyboard checklist for the user**

Write `$S/keyboard-checklist.md`, a checklist for the user to run in a real browser on `/work/consolidating-import-collections`:
1. Tab from page load reaches the skip link first, and Enter moves focus to main.
2. The sub nav anchors scroll to the right sections, and each heading lands below the sticky bar.
3. "Standard Bank" opens the tip on Enter and on Space, Escape closes it, and focus returns to the trigger.
4. Focus is visible on every stop, including on the Purple band (there are no focusable elements inside the bands, so confirm that's true).
5. The three Read More cards each take focus once.

- [ ] **Step 7: Record the results**

Append the results of Steps 1–5 to `$S/progress.md`, including anything that couldn't be checked. Commit any fixes made along the way, one `fix:` commit per defect.

---

### Task 9: Documentation

**Files:**
- Modify: `docs/decisions.md`, `docs/questions.md`, `docs/architecture.md`, `docs/wiki/componentisation.md`, `docs/wiki/figma-mcp.md`, `docs/wiki/design-tokens.md`, `docs/wiki/log.md`, `AGENTS.md` (status line only)

Each doc says at its top how to maintain it. Follow that. **Count with grep before writing any number.**

- [ ] **Step 1: decisions.md**

Add, as the next D- numbers (check the last one with `grep -o '^## D-[0-9]*' docs/decisions.md | tail -1`):
- `ProcessStrip` takes measured widths as props.
- `.panel` is a global utility, not a component.
- `FindingsList`, `LabelledFindings` and `CaseStudyFigure` are extracted on second use.
- Figma's image crops are baked into asset files.
- Composed redactions are exported as renders, never as raw fills.
- Headless Edge over DevTools is the visual check (`shoot.mjs`/`diff.mjs`, with retrofits proven pixel-identical).

- [ ] **Step 2: questions.md**

- **Open Q-025, non-blocking:** "Is the blur on the Standard Bank 'before' screenshot (Easier Data Capture, `91:1087`) strong enough? At 2× some values, including what look like a customer name and a person's name, are near-legible. The user's call (2026-09-30): trust Cass's redaction as drawn; a more blurred image can be swapped in later as a one-file change." Add it to the summary table.
- **Extend Q-022** with Image Drop on `91:1036`, built as `--shadow-card`.
- **Extend Q-023** with CS2's copy notes: "development , and", "legal restraints", the lowercase "long feedback threads", and "swopping" (a variant spelling, possibly intended).
- **Extend Q-024** with CS2's 10 drafted alt texts. Count them with `grep -c 'TODO(cass)' src/pages/work/consolidating-import-collections.astro` and subtract the header comment.

- [ ] **Step 3: architecture.md**

Add the route and the 3 new components to the code map. Update the `ProcessStrip` and `FindingBlock` rows with their new props. Add `.panel` to the `global.css` row. Move `consolidating-import-collections` out of Planned.

- [ ] **Step 4: Wiki**

- **`componentisation.md`:** a "What CS2 actually built" section. Give counts from grep (`FindingBlock`, `SectionHeading`, `LabelledFindings`, `CaseStudyFigure` per page). Note that the business-problem grid is duplicated between the two pages (extract at a third use), and that persona cards stay page markup.
- **`figma-mcp.md`:** under usage notes, add three gotchas:
  - Redactions can be overlays: export the composed node, never the raw fill.
  - An SVG export of a node includes the canvas, page and card `<rect>`s behind it.
  - The saved Work outline made `get_metadata` unnecessary.
  Also add a line to the no-browser techniques pointing at `shoot.mjs`: "there *is* a browser: Edge".
- **`design-tokens.md`:** the new tokens and type classes, and the contrast numbers from Task 8.
- **`log.md`:** one entry summarising all of the above.

- [ ] **Step 5: AGENTS.md**

Update the status line to say two case study pages are built.

- [ ] **Step 6: Gates and commit**

Run `npm run format:check`, then:

```bash
git add docs AGENTS.md
git commit -m "docs: record case study 2 decisions, questions and learnings"
```

---

## After the last task

Request one final code review (superpowers:requesting-code-review) over `reece/feature/mvp..HEAD`, rather than one review per task. Then report to the user:
- What shipped.
- The verification evidence (the diff results, `focus.txt`, the contrast numbers).
- The keyboard checklist for them to run.
- The two MVP-branch findings: CS1's handover heading renders "&amp;amp;", and the current "Work" nav item's focus ring shows no outer ring.
- Q-025.

**Do not push.** Ask first.
