# Case Study 3 (MiX Telematics) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/work/sales-workflow-research` from Figma, extract the components it repeats from CS1/CS2, and give every case study page 80px of bottom padding.

**Architecture:** A bespoke Astro page composing the shared case study components (D-022). Three extractions (`BusinessProblem`, `PullQuote`, `.band`) and two component extensions (`FindingsList` tone/spacing, `CaseStudyIntro` image bleed) are retrofitted into CS1/CS2 first, verified by before/after screenshot diffs, and then the CS3 page is built section by section.

**Tech Stack:** Astro 7, scoped CSS with design tokens (`src/styles/tokens.css`), `astro:assets` `<Image>`, `sharp` for one-off image crops, headless Edge (`shoot.mjs`/`diff.mjs`) for visual checks.

**Spec:** [`docs/superpowers/specs/2026-10-04-case-study-three-design.md`](../specs/2026-10-04-case-study-three-design.md). Figma values: [`docs/figma/case-study-3-desktop/context.md`](../../figma/case-study-3-desktop/context.md).

## Global Constraints

- No hard-coded design values: colour, type, spacing, radius and shadow come from tokens. Measured widths may be rem literals with a px comment (the existing page convention).
- A section component's root is a direct child of `.case-study` (invariant 8).
- Root-relative links go through `withBase` (invariant 7). In-page `#anchors` are fine.
- Copy is transcribed exactly as Figma has it, defects included (Q-023). All alt text is drafted and marked `<!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->` (Q-024).
- Page styles cannot reach a child component's root via `class`; use `.parent > :global(.child-class)`.
- Another session is committing to this branch. Stage only the paths each task lists; never `git add -A`.
- Every task ends with `npm run build`, `npm run check` and `npm run format:check` passing.

## Verification tools

`.superpowers/sdd/2026-10-04-case-study-three/` holds `shoot.mjs` and `diff.mjs` (copied from the CS2 run) and the baseline shots `shots/before-cs1/`, `shots/before-cs2/`, taken at `867bccf` before any change.

```bash
npm run build && (npx astro preview --port 4391 &)   # serve dist/
node .superpowers/sdd/2026-10-04-case-study-three/shoot.mjs http://localhost:4391/work/<id>/ .superpowers/sdd/2026-10-04-case-study-three/shots/<name>
node .superpowers/sdd/2026-10-04-case-study-three/diff.mjs <before.png> <after.png> [out.png]
```

---

### Task 1: Foundations — tokens, type classes, `.band`, bottom padding

**Files:**
- Modify: `src/styles/tokens.css` (process widths and row, type, spacing)
- Modify: `src/styles/global.css` (two type classes, `.band`, `.case-study` padding)
- Modify: `src/pages/work/consolidating-import-collections.astro` (bands use `.band`)

**Interfaces:**
- Produces: `--size-process-step-sales-{identify,asis,interviews,ideation,journey,proposal}`, `--type-sub-text-2-*` + `.type-sub-text-2`, `--type-body-bold-*` + `.type-body-bold`, `--space-intro-image-drop`, `--space-pain-quote-offset`, `.band`, `.band--purple`, `.band--white`.

- [ ] **Step 1: Tokens.** After the `--size-process-step-import-*` block add:

```css
  /* CS3 (92:1866) */
  --size-process-step-sales-identify: calc(129em / 30);
  --size-process-step-sales-asis: calc(204em / 30);
  --size-process-step-sales-interviews: calc(159em / 30);
  --size-process-step-sales-ideation: calc(142em / 30);
  --size-process-step-sales-journey: calc(196em / 30);
  --size-process-step-sales-proposal: calc(125em / 30);
```

Change `--size-process-row: 47.75;` to `49.47` and its comment to: CS3's row, 955px of labels + 5 arrows + 10 gaps = 1484px at 30px. After the `--type-sub-titles-*` block add:

```css
  /* Figma "Sub Text 2" (CS3 journey description, 98:2266) */
  --type-sub-text-2-size: 1.25rem; /* 20px */
  --type-sub-text-2-line-height: 1.5;
  --type-sub-text-2-letter-spacing: -0.011em;
  --type-sub-text-2-weight: 500;

  /* Figma "Body Bold" (CS3 proposal stat lead-in, 99:2799); the nav's values */
  --type-body-bold-size: 1.0625rem; /* 17px */
  --type-body-bold-line-height: 1.5;
  --type-body-bold-letter-spacing: -0.011em;
  --type-body-bold-weight: 700;
```

After `--space-personas-clearance` add:

```css
  --space-intro-image-drop: 6.9375rem; /* 111px; CS3 hero (99:2503) below the intro's top */
  --space-pain-quote-offset: 1.125rem; /* 18px; CS3 pain points quote below the heading's top (99:2654) */
```

- [ ] **Step 2: Type classes** in `global.css`, after `.type-sub-titles`:

```css
.type-sub-text-2 {
  font-size: var(--type-sub-text-2-size);
  font-weight: var(--type-sub-text-2-weight);
  line-height: var(--type-sub-text-2-line-height);
  letter-spacing: var(--type-sub-text-2-letter-spacing);
}

.type-body-bold {
  font-size: var(--type-body-bold-size);
  font-weight: var(--type-body-bold-weight);
  line-height: var(--type-body-bold-line-height);
  letter-spacing: var(--type-body-bold-letter-spacing);
}
```

- [ ] **Step 3: Bottom padding.** In `.case-study` add `padding-block-end: var(--space-80);` with a comment: Figma leaves 80px under the Read More row (CS1 6003 − 5923, CS3 92:2089); CS2's 103 and CS4's 89 are drift.

- [ ] **Step 4: `.band`** after `.panel`'s rules:

```css
/* Full-bleed band: CS2's "new user journey" (92:1636, Purple) and
   "reviewing" (91:1039, White), CS3's AS-IS (99:2596, Purple) and
   "realistic user journey" (92:1958, White). x=0, w=1920 in Figma, unlike
   the inset .panel. 80px block padding; the gutter keeps the content off the
   edges. Each page sets its own inner measure (1450, 1564, 1447, 1246px), so
   that stays page CSS. Use on a .u-bleed section, or inside one. */
.band {
  padding-block: var(--space-80);
  padding-inline: var(--space-gutter);
}

.band--purple {
  background-color: var(--color-purple);
}

.band--white {
  background-color: var(--color-white);
}
```

- [ ] **Step 5: Retrofit CS2.** `class="journey u-bleed"` → `class="journey u-bleed band band--purple"`; `class="reviewing u-bleed"` → `class="reviewing u-bleed band band--white"`. Delete the `padding-block`, `padding-inline` and `background-color` declarations from `.journey` and `.reviewing` (delete the now-empty rules) and point their comments at `.band`.

- [ ] **Step 6: Verify.** Build, check, format. Shoot CS1 and CS2 to `shots/t1-cs1`, `shots/t1-cs2`; `diff.mjs` every section against `before-*`. Expected: every section identical; `full.png` 80px taller with nothing but background in the extra rows.

- [ ] **Step 7: Commit** `src/styles/tokens.css src/styles/global.css src/pages/work/consolidating-import-collections.astro`: `feat: add case study bottom padding, the .band utility and CS3 tokens`.

### Task 2: `FindingsList` tone and spacing; extract `BusinessProblem`

**Files:**
- Modify: `src/components/FindingsList.astro`
- Create: `src/components/BusinessProblem.astro`
- Modify: `src/pages/work/streamlining-scoring.astro`, `src/pages/work/consolidating-import-collections.astro` (use `BusinessProblem`, drop `.business-problem` CSS and unused imports)

**Interfaces:**
- Produces: `FindingsList` props `{ items: string[]; tone?: 'default' | 'inverse'; spacing?: 'default' | 'compact' }`; `BusinessProblem` props `{ items: string[]; variant?: 'default' | 'compact' }`, default slot = standfirst, renders `<section id="business-needs">`.

- [ ] **Step 1: `FindingsList`.** Replace the file with:

```astro
---
interface Props {
  // Each item carries inline markup (<strong>). Rendered with set:html:
  // safe because items are always authored by us in page files.
  items: string[];
  // 'inverse' is White text with Light purple rules, for a Purple panel
  // (CS3's interviews list, 98:2333).
  tone?: 'default' | 'inverse';
  // Space either side of each rule: 48px (CS1 86:196, CS2 149:1945) or
  // 32px (CS3 149:1956 and 98:2333).
  spacing?: 'default' | 'compact';
}

const { items, tone = 'default', spacing = 'default' } = Astro.props;
---

<ul
  class:list={[
    'findings-list',
    `findings-list--${tone}`,
    `findings-list--${spacing}`,
  ]}
  role="list"
>
  {items.map((item) => (
    <li class="findings-list__item type-body-med" set:html={item} />
  ))}
</ul>

<style>
  /* Rule-separated statements beside a section heading. Figma stacks them
     flex-col with a 1px divider between, i.e. the gap either side of each
     rule, expressed as padding and margin on every item but the last so the
     rule belongs to the item rather than being an empty element. CS3's
     interviews list ends with a 350px divider that draws nothing (1c523.svg
     is an empty group), so the last item never gets a rule. */
  .findings-list {
    --findings-gap: var(--space-48);
    --findings-rule: var(--color-red);
    --findings-text: var(--color-purple);

    padding: 0;
    margin: 0;
    list-style: none;
  }

  .findings-list--compact {
    --findings-gap: var(--space-32);
  }

  /* Figma draws these rules as a 0.5px Light purple stroke (fd524.svg);
     1px like the Red ones, the thinnest a border reliably renders. */
  .findings-list--inverse {
    --findings-rule: var(--color-light-purple);
    --findings-text: var(--color-white);
  }

  .findings-list__item {
    color: var(--findings-text);
  }

  .findings-list__item:not(:last-child) {
    padding-block-end: var(--findings-gap);
    border-block-end: 1px solid var(--findings-rule);
    margin-block-end: var(--findings-gap);
  }
</style>
```

- [ ] **Step 2: Create `BusinessProblem.astro`:**

```astro
---
import SectionHeading from './SectionHeading.astro';
import FindingsList from './FindingsList.astro';

interface Props {
  // Inline markup (<strong>), rendered by FindingsList with set:html.
  items: string[];
  // 'default': CS1 (86:190) and CS2 (91:1422), an 80px gap, the heading
  // centred on the list, 48px between findings. 'compact': CS3 (92:1878),
  // a 48px gap, top-aligned, 32px between findings.
  variant?: 'default' | 'compact';
}

const { items, variant = 'default' } = Astro.props;
---

<section
  class:list={['business-problem', `business-problem--${variant}`]}
  id="business-needs"
  aria-labelledby="business-needs-heading"
>
  <SectionHeading
    eyebrow="the"
    title="Business problem"
    id="business-needs-heading"
    titleWidth="12.625rem"
  >
    <slot />
  </SectionHeading>
  <FindingsList items={items} spacing={variant} />
</section>

<style>
  /* The same Business Problem Heading instance on every case study:
     heading block 391.8px (its title box 202px, the titleWidth above), list
     585px, the row centred. Figma's later items run to 596px, 11px wider
     than their list: drift, built at the list width. */
  .business-problem {
    display: grid;
    grid-template-columns: minmax(0, 24.5rem) minmax(0, 36.5625rem);
    gap: var(--space-80);
    align-items: center;
    justify-content: center;
  }

  .business-problem--compact {
    gap: var(--space-48);
    align-items: start;
  }
</style>
```

- [ ] **Step 3: Retrofit CS1.** Replace the `<section class="business-problem" …>…</section>` block with:

```astro
  <BusinessProblem
    items={[
      'Each business unit operated its own <strong>team of specialised Agents</strong>, each <strong>focused on one or two products.</strong>',
      '<strong>Repeated transfers</strong> were happening in the call centres and <strong>Customers were dropping calls</strong> to go to branches.',
      'Agents had <strong>limited cross-selling</strong> opportunities.',
    ]}
  >
    During a full day workshop with my key stakeholders I identified:
  </BusinessProblem>
```

Delete the `.business-problem` rule and its comment block from the page `<style>`, import `BusinessProblem`, and remove the `SectionHeading`/`FindingsList` imports only if nothing else on the page uses them (`grep -c '<SectionHeading\|<FindingsList'`).

- [ ] **Step 4: Retrofit CS2** the same way with its items and standfirst ("With my stakeholders I identified 3 key needs:"), deleting its `.business-problem` rule and comment.

- [ ] **Step 5: Verify.** Build/check/format. Shoot both pages (`t2-cs1`, `t2-cs2`) and diff against `t1-*`. Expected: identical, `04-business-needs` included.

- [ ] **Step 6: Commit** the four files: `refactor: extract BusinessProblem at its third use`.

### Task 3: Extract `PullQuote`; retrofit CS1

**Files:**
- Create: `src/components/PullQuote.astro`
- Modify: `src/pages/work/streamlining-scoring.astro`

**Interfaces:**
- Produces: `PullQuote` props `{ tone?: 'default' | 'inverse' }`, default slot = the quote text; root `<blockquote class="pull-quote …">`.

- [ ] **Step 1: Create `PullQuote.astro`:**

```astro
---
interface Props {
  // 'default' is Purple on the page (CS3 99:2654). 'inverse' is White on a
  // Purple panel (CS1 86:212, filled "Light x 2", which has no token: Q-021).
  tone?: 'default' | 'inverse';
}

const { tone = 'default' } = Astro.props;
---

<blockquote
  class:list={['pull-quote', 'type-handwritten', `pull-quote--${tone}`]}
>
  <span class="pull-quote__mark" aria-hidden="true">&ldquo;</span>
  <p><slot /></p>
  <span class="pull-quote__mark" aria-hidden="true">&rdquo;</span>
</blockquote>

<style>
  /* A handwritten quote between two larger marks, 16px apart (CS1 86:212,
     CS3 99:2654). The page sizes it in its own layout, through
     `.parent > :global(.pull-quote)`. */
  .pull-quote {
    display: flex;
    gap: var(--space-16);
    align-items: flex-start;
    margin: 0;
    text-transform: lowercase;
  }

  .pull-quote--default {
    color: var(--color-purple);
  }

  .pull-quote--inverse {
    color: var(--color-white);
  }

  /* 35px against the 28px handwritten style, expressed relative so it stays
     tied to the type token. */
  .pull-quote__mark {
    flex: none;
    font-size: 1.25em;
  }
</style>
```

- [ ] **Step 2: Retrofit CS1.** Replace the `<blockquote class="interviews__quote type-handwritten">…</blockquote>` with:

```astro
        <PullQuote tone="inverse">
          Customers always ask &lsquo;how much longer?&rsquo; or &lsquo;why do
          you need to know this?&rsquo; because the system asks unnecessary
          questions and it takes forever
        </PullQuote>
```

Replace the `.interviews__quote` and `.interviews__quote-mark` rules with the layout part only:

```css
  /* Basis is Figma's 632px; it may shrink but never exceeds it, so the
     quote holds the design's measure at full width and rewraps below it. */
  .interviews__top > :global(.pull-quote) {
    flex: 1 1 39.5rem;
    max-inline-size: 39.5rem; /* 632px */
  }
```

- [ ] **Step 3: Verify.** Build/check/format; confirm in `dist/` that the blockquote has the page's flex sizing (computed `max-inline-size` 632px via `SHOOT_EVAL`). Shoot CS1 (`t3-cs1`) and diff `05-interviews` against `t2-cs1`. Expected: identical.

- [ ] **Step 4: Commit** both files: `refactor: extract PullQuote at its second use`.

### Task 4: `CaseStudyIntro` bleed, CS3 images and the top of the page

**Files:**
- Modify: `src/components/CaseStudyIntro.astro`
- Create: `src/assets/case-studies/sales-workflow-research/{journey-map.png,journey-map-hero.png,workshop-artifact.jpg,as-is-journey.png}`, `src/assets/arrow-04.svg`
- Create: `src/pages/work/sales-workflow-research.astro`

**Interfaces:**
- Consumes: Task 1 tokens, `BusinessProblem` (Task 2).
- Produces: `CaseStudyIntro` prop `imageBleed?: boolean`; the CS3 page with sections 1–3.

- [ ] **Step 1: Images** with a one-off node script (`sharp`), from the downloads in the session scratchpad (`d546e.png`, `621b0.png`, `6dbb5.png`):

| Output | Crop (source px) | Resize |
|---|---|---|
| `journey-map.png` | none (2410 × 1094) | width 1600 |
| `journey-map-hero.png` | left 0, top 0, 1750 × 1094 (the visible 1005 of 1384.2 displayed px) | width 1600 |
| `workshop-artifact.jpg` | left 346, top 2, 2536 × 1846 (from `left -13.64%`, `w 157.73%` of 449 × 327) | width 898, JPEG q80 |
| `as-is-journey.png` | left 68, top 192, 3948 × 1474 (from `left -1.72% top -13.05%`, `w 103.76% h 118.37%` of 1444 × 539) | width 1600 |

Check each is ≤ 500 KB; re-encode PNGs with `palette: true` if not.

- [ ] **Step 2: Arrow.** Save `37816.svg` as `src/assets/arrow-04.svg`: keep the root `width`/`height`/`viewBox`, drop `preserveAspectRatio`, `overflow`, `style` and all `id`s, and set both paths' `stroke` to `currentColor`.

- [ ] **Step 3: `CaseStudyIntro`.** Add the prop and class:

```ts
  // CS3's hero (99:2503) runs through the end gutter to the page edge,
  // where Figma's frame clips it, and sits 111px below the intro's top.
  imageBleed?: boolean;
```

Root: `<div class:list={['case-study-intro', imageBleed && 'case-study-intro--bleed']} id={id}>`. CSS:

```css
  /* The image column plus the end gutter, so the image meets the page's
     edge (the viewport's below 1920px). The edge cuts it in Figma, so its
     end corners are square. The asset is cropped to the visible part. */
  .case-study-intro--bleed .case-study-intro__image {
    inline-size: calc(100% + var(--space-gutter));
    max-inline-size: none;
    margin-block-start: var(--space-intro-image-drop);
    margin-inline-end: calc(-1 * var(--space-gutter));
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }
```

- [ ] **Step 4: Page, sections 1–3.** Create `sales-workflow-research.astro`:

```astro
---
import { getEntry } from 'astro:content';
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
import CaseStudyIntro from '../../components/CaseStudyIntro.astro';
import DefinitionTip from '../../components/DefinitionTip.astro';
import ProcessStrip from '../../components/ProcessStrip.astro';
import BusinessProblem from '../../components/BusinessProblem.astro';
import Man3 from '../../assets/icons/man-3.svg';
import journeyMapHero from '../../assets/case-studies/sales-workflow-research/journey-map-hero.png';

const entry = await getEntry('caseStudies', 'sales-workflow-research');
if (!entry) throw new Error('Missing case study: sales-workflow-research');

const subNav = [
  { href: '#project-overview', label: 'Project Overview' },
  { href: '#business-needs', label: 'Business Needs' },
  { href: '#as-is-discovery', label: 'AS-IS Discovery' },
  { href: '#user-interviews', label: 'User Interviews' },
  { href: '#design', label: 'Design' },
  { href: '#proposal', label: 'Proposal' },
];
---

<!--
  Every measurement below is from docs/figma/case-study-3-desktop/context.md.
  TODO(cass): all image alt text is drafted from the surrounding copy and
  needs review (Q-024).
-->
<CaseStudyLayout entry={entry} subNav={subNav}>
  <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
  <CaseStudyIntro
    eyebrow="UX lead"
    title={entry.data.title}
    userTypes={[{ label: 'Sales employees', icon: Man3 }]}
    image={journeyMapHero}
    imageAlt="The redesigned sales journey map: swimlanes for the customer, sales representative, finance, sales manager and technical teams, running from lead and credit vetting into a new opportunity and quote."
    imageBleed
    id="project-overview"
  >
    <Fragment slot="title">using research to build a better sales workflow.</Fragment>
    <DefinitionTip id="def-mix-telematics" term="MiX Telematics">
      A telematics company providing connected and secure fleet telematics data
      and mobile asset management solutions.
    </DefinitionTip>{' '}
    , a local telematics company providing connected and secure fleet
    telematics data and mobile asset management solutions for transportation
    businesses, identified that their out of date Salesforce sales platform
    that impacted their ability to provide new or updated quotes in a timely
    manner.
    <Fragment slot="goal">
      Create a report that provides <strong>actionable recommendations</strong>
      to optimise the user experience of the sales platform with the ultimate
      goal of <strong>reducing their 7 day quoting cycle.</strong>
    </Fragment>
    <Fragment slot="outcome">
      <p>
        I led a research-based <strong>review and journey redesign</strong> of
        the sales platform&rsquo;s workflow, cutting it from
        <strong>22 to 14 steps</strong>.
      </p>
      <p>
        I led a team of 4 junior designers to
        <strong>review, research, ideation, UX report and proposal</strong>
        while working with a Salesforce Architect to keep the recommendations
        feasible.
      </p>
    </Fragment>
  </CaseStudyIntro>

  <ProcessStrip
    class="u-bleed"
    steps={[
      { label: 'identify business needs', width: 'var(--size-process-step-sales-identify)' },
      { label: 'AS-IS journey investigations', width: 'var(--size-process-step-sales-asis)' },
      { label: 'user interviews', width: 'var(--size-process-step-sales-interviews)' },
      { label: 'ideation workshop', width: 'var(--size-process-step-sales-ideation)' },
      { label: 'user journey design', width: 'var(--size-process-step-sales-journey)' },
      { label: 'proposal', width: 'var(--size-process-step-sales-proposal)' },
    ]}
  />

  <BusinessProblem
    variant="compact"
    items={[
      'A <strong>streamlined </strong>quoting and sales <strong>workflow.</strong>',
      '<strong>Self-sufficient </strong>users for new and existing features.',
      'A <strong>lower barrier to entry</strong> for new staff that require fewer days of training.',
      '<strong>Automation &amp; auto population</strong> in the journey where possible.',
      '<strong>Reduce quoting turnaround time </strong>from 7 days.',
    ]}
  >
    A conversation with business stakeholders revealed the following needs:
  </BusinessProblem>
</CaseStudyLayout>
```

Watch for Astro dropping the space after `</strong>` before a text line (wiki: layout gotchas); add `{' '}` where the build shows a missing space.

- [ ] **Step 5: Verify.** Build/check/format. Shoot CS3 (`t4-cs3`); compare `02-project-overview` with `sections/01-introduction.png` + `01b-intro-image.png`, `03-process-strip` with the frame screenshot, `04-business-needs` with `sections/03-business-problem.png`. `SHOOT_EVAL='document.documentElement.scrollWidth'` at widths 1920, 1440, 1280 equals the viewport. Shoot CS1/CS2 (`t4-*`) and diff `02-project-overview` against `t3`/`t2`: identical (the prop defaults off).

- [ ] **Step 6: Commit** the component, assets and page: `feat: add the MiX Telematics case study intro and business problem`.

### Task 5: AS-IS band, hook and user interviews

**Files:**
- Modify: `src/pages/work/sales-workflow-research.astro`

**Interfaces:**
- Consumes: `.band` (Task 1), `FindingsList tone="inverse" spacing="compact"` (Task 2), `CaseStudyFigure`, `arrow-04.svg`, `workshop-artifact.jpg`, `as-is-journey.png` (Task 4).

- [ ] **Step 1: Markup**, after `BusinessProblem` (imports: `Image` from `astro:assets`, `CaseStudyFigure`, `FindingsList`, `Arrow04`, `workshopArtifact`, `asIsJourney`):

```astro
  <section class="as-is u-bleed" id="as-is-discovery" aria-labelledby="as-is-heading">
    <div class="as-is__band band band--purple">
      <div class="as-is__inner">
        <div class="as-is__context">
          <figure class="as-is__photo">
            <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
            <Image
              src={workshopArtifact}
              alt="The workshop wall: sticky notes and hand-drawn arrows mapping the as-is sales journey across lead, proposal and quote stages."
            />
            <figcaption class="as-is__label type-handwritten">
              <Arrow04 class="as-is__arrow" aria-hidden="true" />
              workshop artifact
            </figcaption>
          </figure>
          <div class="as-is__text">
            <h2 class="as-is__heading type-title-2" id="as-is-heading">
              AS-IS Journey Investigations
            </h2>
            <p class="as-is__copy type-body-med">
              To better understand how the platform was supposed to be used my
              team and I had a workshop with a leader that manages training of
              new staff. With her help we developed an in-depth AS IS map with
              explanations of related responsibilities, platforms and processes .
            </p>
          </div>
        </div>
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <CaseStudyFigure
          image={asIsJourney}
          alt="The AS-IS sales journey as a swimlane diagram, from lead and proposal through a long run of create-quote steps to credit vetting, with most steps falling to the sales representative."
          caption="AS-is journey"
          captionSize="large"
          captionTone="inverse"
          captionAlign="end"
        />
      </div>
    </div>
    <p class="as-is__hook">
      <span class="type-handwritten">key session insight</span>
      <span class="as-is__hook-text type-title-2">
        Employees were <span class="as-is__hook-accent">leaving</span>
        <br />
        because of the system
      </span>
    </p>
  </section>

  <section class="panel" id="user-interviews" aria-labelledby="user-interviews-heading">
    <div class="interviews">
      <div class="interviews__summary">
        <h2 class="interviews__heading type-title-2" id="user-interviews-heading">
          User interviews
          <br />
          &amp; observations
        </h2>
        <p class="type-subtitle">
          If a new sales quote was found to be incorrect at any step past the
          original &lsquo;data capture form&rsquo; the sale would be considered a
          &lsquo;Lost lead&rsquo; and would have to be redone. The term
          &lsquo;Lost lead&rsquo; was then recorded on the sales persons monthly
          sales reports, same as leads that were actually lost/failed.
        </p>
        <p class="interviews__stat">
          <span class="type-stats">15+</span>
          <span class="type-body-med">users spoken to</span>
        </p>
      </div>
      <FindingsList
        tone="inverse"
        spacing="compact"
        items={[
          'There were fields that nobody understood.',
          'The sales team had to follow steps in the system that they felt were redundant.',
          'Many key steps were being presented to the user either too early or too late in the journey.',
          'New staff found the platform very hard to learn and had to rely on notes and recordings.',
        ]}
      />
    </div>
  </section>
```

- [ ] **Step 2: Styles** (page `<style>`):

```css
  /* --- AS-IS journey investigations (99:2631) -----------------------------
     A full-bleed Purple band (99:2596, content 1447px, the inset measure),
     then the hook 80px below it in the same frame. */
  .as-is {
    display: flex;
    flex-direction: column;
    gap: var(--space-80);
  }

  .as-is__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-80);
    max-inline-size: var(--size-inset-measure);
    margin-inline: auto;
  }

  /* Photo 449px, 80px, text 764px, start-aligned in the measure. */
  .as-is__context {
    display: grid;
    grid-template-columns: minmax(0, 28.0625rem) minmax(0, 47.75rem);
    gap: var(--space-80);
    align-items: start;
  }

  /* No radius or shadow on the photo in Figma (99:2618). */
  .as-is__photo {
    position: relative;
    margin: 0;
  }

  /* 99:2651: 44px before the text column (so 36px past the photo) and
     289.82px down, beside the photo's bottom edge. */
  .as-is__label {
    position: absolute;
    inset-block-start: 18.11rem; /* 289.82px */
    inset-inline-start: calc(100% + 2.25rem); /* 36px */
    display: flex;
    gap: 1.4375rem; /* 23px */
    align-items: flex-start;
    color: var(--color-white);
    text-transform: lowercase;
    white-space: nowrap;
  }

  /* 37816.svg is stroked Light Purple (#C1CBFF drift); rotated to point at
     the photo. */
  .as-is__arrow {
    flex: none;
    color: var(--color-light-purple);
    transform: rotate(180deg);
  }

  .as-is__text {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .as-is__heading {
    max-inline-size: 25.4375rem; /* 407px */
    color: var(--color-light-purple);
    text-transform: lowercase;
  }

  .as-is__copy {
    max-inline-size: 44.875rem; /* 718px */
    color: var(--color-white);
  }

  /* 99:2529: centred, Purple with one Red word, 16px apart. */
  .as-is__hook {
    display: flex;
    flex-direction: column;
    gap: var(--space-headings-body);
    padding-inline: var(--space-gutter);
    margin: 0;
    color: var(--color-purple);
    text-align: center;
    text-transform: lowercase;
  }

  .as-is__hook-accent {
    color: var(--color-red);
  }

  /* --- User interviews (98:2316) -------------------------------------------
     A .panel (1444px). Summary 669px, 80px, list 467px, centred. */
  .interviews {
    display: grid;
    grid-template-columns: minmax(0, 41.8125rem) minmax(0, 29.1875rem);
    gap: var(--space-80);
    align-items: start;
    justify-content: center;
  }

  .interviews__summary {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    color: var(--color-white);
  }

  .interviews__heading {
    color: var(--color-light-purple);
    text-transform: lowercase;
  }

  .interviews__stat {
    display: flex;
    flex-direction: column;
  }
```

- [ ] **Step 3: Verify.** Build/check/format. Shoot (`t5-cs3`) and compare `05-as-is-discovery` with `sections/04-as-is-band.png` + `05-hook.png` and `06-user-interviews` with `sections/06-user-interviews.png`. Check the label sits beside the photo's bottom right, not over the copy, and the band reaches both viewport edges.

- [ ] **Step 4: Commit** the page: `feat: add the AS-IS band, key insight and user interviews`.

### Task 6: Pain points, the realistic journey and the proposal

**Files:**
- Modify: `src/pages/work/sales-workflow-research.astro`

**Interfaces:**
- Consumes: `PullQuote` (Task 3), `.band--white` (Task 1), `.type-sub-text-2` and `.type-body-bold` (Task 1), `journey-map.png` (Task 4).

- [ ] **Step 1: Markup**, after the interviews panel:

```astro
  <section class="pain-points" aria-labelledby="pain-points-heading">
    <div class="pain-points__header">
      <h2 class="pain-points__heading type-title-2" id="pain-points-heading">
        Key
        <br />
        Pain points
      </h2>
      <PullQuote>
        there are things that I'm gonna be capturing, but if you ask me
        &lsquo;why are you capturing this?&rsquo; I won't know.
      </PullQuote>
    </div>
    <ol class="pain-points__list" role="list">
      <li class="pain-point pain-point--detailed">
        <span class="pain-point__number type-h1" aria-hidden="true">01</span>
        <div class="pain-point__content">
          <h3 class="pain-point__title type-h1">An overly complex system</h3>
          <ul class="pain-point__points type-body-med">
            <li><strong>Training new sales representatives took 1 month </strong>with an additional month of monitored work.</li>
            <li>The complex system design meant that new sales representatives <strong>relied on notes and recordings</strong> for years before becoming experts.</li>
            <li>There were <strong>no self-help tools</strong> like tooltips or wiki&rsquo;s available to users.</li>
            <li>The system relied on user <strong>memory and not recognition</strong>.</li>
          </ul>
        </div>
      </li>
      <li class="pain-point pain-point--detailed">
        <span class="pain-point__number type-h1" aria-hidden="true">02</span>
        <div class="pain-point__content">
          <h3 class="pain-point__title type-h1">The real world journey was different</h3>
          <ul class="pain-point__points type-body-med">
            <li>Steps were placed in<strong> unrealistic times</strong> in the journey.</li>
            <li>Options in dropdowns or radio buttons <strong>didn&rsquo;t match real information</strong> causing users to need to input additional information.</li>
            <li>Some vetting <strong>steps weren&rsquo;t happening early</strong> enough resulting in wasted time and disappointed clients.</li>
            <li>There were <strong>unnecessary approvals</strong> being required.</li>
          </ul>
        </div>
      </li>
      <li class="pain-point">
        <span class="pain-point__number type-h1" aria-hidden="true">03</span>
        <h3 class="pain-point__title pain-point__title--03 type-h1">No platform integration or automation</h3>
      </li>
      <li class="pain-point">
        <span class="pain-point__number type-h1" aria-hidden="true">04</span>
        <h3 class="pain-point__title type-h1">No<br />notifications</h3>
      </li>
      <li class="pain-point">
        <span class="pain-point__number type-h1" aria-hidden="true">05</span>
        <h3 class="pain-point__title pain-point__title--05 type-h1">Inaccessible language</h3>
      </li>
    </ol>
  </section>

  <section class="realistic-journey u-bleed band band--white" id="design" aria-labelledby="design-heading">
    <div class="realistic-journey__inner">
      <div class="realistic-journey__intro">
        <h2 class="realistic-journey__heading type-title-2" id="design-heading">
          Building a realistic user journey
        </h2>
        <p class="realistic-journey__description type-sub-text-2">
          Using the information gathered we brainstormed ways to improve the
          <br />
          AS-IS journey, with the sole goal of making the process
          <strong>match our users real-life sales journey</strong> and creating
          an <strong>agile approach to their workflow</strong>, allowing for
          <strong>multiple work streams to happen at once</strong>.
        </p>
      </div>
      <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
      <CaseStudyFigure
        image={journeyMap}
        alt="The new sales journey map: swimlanes for the customer, sales representative, finance, sales manager and technical teams, with credit vetting alongside the lead and parallel streams through the quote."
        caption="AS-IS map"
        captionSize="large"
      />
    </div>
  </section>

  <section class="proposal" id="proposal" aria-labelledby="proposal-heading">
    <p class="proposal__stat">
      <span class="proposal__stat-lead type-body-bold">
        <span>Reducing the</span>
        <span class="proposal__stat-lead-indent">journey from 22 to</span>
      </span>
      <span class="proposal__stat-figure type-stats">14 steps</span>
    </p>
    <div class="proposal__body">
      <h2 class="proposal__heading type-title-2" id="proposal-heading">
        The proposal &amp;
        <br />
        future steps
      </h2>
      <div class="proposal__copy type-body-med">
        <p>
          Leveraging all the information gathered and artifacts created I
          prepared and presented a UX proposal for the CTO that outlined:
        </p>
        <ul>
          <li>My process;</li>
          <li>The problems found;</li>
          <li>A breakdown of detailed key feedback, recommendations (based on user research and desktop research) and indication of if it is a quick win or a future win.</li>
          <li>A list of key metrics to measure the ROI of the changes such as average time on task, new user onboarding time etc.</li>
        </ul>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Styles:**

```css
  /* --- Key pain points (168:2839) ------------------------------------------
     1446px (inset measure). Heading 243px at the start, the quote 677px at
     the end and 18px down; cards 24px below. */
  .pain-points {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    max-inline-size: var(--size-inset-measure);
    margin-inline: auto;
  }

  .pain-points__header {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-24);
    align-items: flex-start;
    justify-content: space-between;
  }

  .pain-points__heading {
    max-inline-size: 15.1875rem; /* 243px */
    color: var(--color-red);
    text-transform: lowercase;
  }

  .pain-points__header > :global(.pull-quote) {
    flex: 0 1 42.3125rem; /* 677px */
    margin-block-start: var(--space-pain-quote-offset);
  }

  /* Two 700px cards, then three 456px, 40px apart (row gap 41: drift). Six
     tracks so both rows share one grid: 3 + 3, then 2 + 2 + 2. */
  .pain-points__list {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: var(--space-40);
    padding: 0;
    margin: 0;
    list-style: none;
  }

  /* White, 25px radius. Figma's Image Drop shadow has a -36px spread, so it
     draws nothing (Q-022). */
  .pain-point {
    display: flex;
    grid-column: span 2;
    gap: var(--space-16);
    align-items: flex-start;
    padding: var(--space-card-padding);
    border-radius: var(--radius-card);
    background-color: var(--color-white);
    color: var(--color-purple);
  }

  .pain-point--detailed {
    grid-column: span 3;
    gap: var(--space-24);
    padding: var(--space-40);
  }

  /* Figma's "Process name" style reports 30 / 0.88; .type-h1 is 30 / 0.92. */
  .pain-point__number {
    flex: none;
    color: var(--color-red);
  }

  .pain-point__title {
    text-transform: lowercase;
  }

  /* Figma's title boxes, so the lines break where the design has them. */
  .pain-point__title--03 {
    max-inline-size: 19.6875rem; /* 315px */
  }

  .pain-point__title--05 {
    max-inline-size: 12.6875rem; /* 203px */
  }

  .pain-point__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    max-inline-size: 33.0625rem; /* 529px */
  }

  .pain-point__points {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    padding-inline-start: var(--space-24);
    margin: 0;
    list-style-type: disc;
  }

  /* --- Building a realistic user journey (92:1958) -------------------------
     A full-bleed White band, content 1246px, centred (Figma's 319/351 side
     padding is 16px off-centre: drift). */
  .realistic-journey__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-80);
    max-inline-size: 77.875rem; /* 1246px */
    margin-inline: auto;
  }

  /* Heading 397px right-aligned, 48px, description 695px, centred. */
  .realistic-journey__intro {
    display: grid;
    grid-template-columns: minmax(0, 24.8125rem) minmax(0, 43.4375rem);
    gap: var(--space-48);
    align-items: center;
    justify-content: center;
  }

  .realistic-journey__heading {
    color: var(--color-red);
    text-align: end;
    text-transform: lowercase;
  }

  .realistic-journey__description {
    color: var(--color-purple);
  }

  /* --- The proposal & future steps (99:2794) -------------------------------
     Stat 293px, 48px, text 573px: the 962px row centred. */
  .proposal {
    display: grid;
    grid-template-columns: minmax(0, 18.3125rem) minmax(0, 35.8125rem);
    gap: var(--space-48);
    align-items: start;
    justify-content: center;
  }

  /* The same 292 × 163 right-aligned Stats box as CS1's "14 out of 15"
     (88:626). The Body Bold lead-in sits over its first line, 32px down,
     the second line 23px in (99:2799, 99:2800). */
  .proposal__stat {
    display: grid;
    margin: 0;
    color: var(--color-purple);
  }

  .proposal__stat > * {
    grid-area: 1 / 1;
  }

  .proposal__stat-figure {
    text-align: end;
    text-transform: lowercase;
  }

  .proposal__stat-lead {
    display: flex;
    flex-direction: column;
    align-self: start;
    margin-block-start: var(--space-32);
  }

  .proposal__stat-lead-indent {
    margin-inline-start: 1.4375rem; /* 23px */
  }

  .proposal__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .proposal__heading {
    color: var(--color-red);
    text-transform: lowercase;
  }

  /* An empty line between the paragraph and the list (a spacer paragraph
     in Figma), then bullets 16px apart. */
  .proposal__copy {
    color: var(--color-purple);
  }

  .proposal__copy ul {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    padding-inline-start: var(--space-24);
    margin: 1lh 0 0;
    list-style-type: disc;
  }
```

- [ ] **Step 3: Verify.** Build/check/format. Shoot (`t6-cs3`), compare `07`, `08`, `09` with `sections/07-key-pain-points.png`, `08-journey.png`, `09-proposal.png`. Check the proposal stat reads as one sentence in the accessibility order (the lead before the figure), and the "14 steps" box breaks to two lines.

- [ ] **Step 4: Commit** the page: `feat: add the pain points, realistic journey and proposal sections`.

### Task 7: Whole-page verification and docs

**Files:**
- Modify: `docs/architecture.md`, `docs/decisions.md`, `docs/questions.md`, `docs/wiki/componentisation.md`, `docs/wiki/log.md`, `AGENTS.md` (status line), `docs/figma/case-study-3-desktop/context.md` (assets table)

- [ ] **Step 1: Full checks.** Build/check/format. Shoot all three pages; diff CS1/CS2 sections against `before-*` (only expected difference: the bottom padding). `scrollWidth` at 1920/1440/1280/1024 for CS3 (record the minimum width with no sideways scroll for Q-026). No-JS shot (`--nojs`) of CS3. Focus order (`--tab=40`): sub nav links, the Definition Tip trigger, Read More cards, in order, all visible.
- [ ] **Step 2: Docs.**
  - `decisions.md`: D-034 (the three extractions and two component changes, with the "extract at third use / second page" rule they follow), D-035 (case study pages end with 80px padding).
  - `questions.md`: Q-022 (CS3 uses Portfolio Card drop on both journey-map renders; Image Drop on the pain point cards), Q-023 (the CS3 copy defects plus the "AS-IS map" caption), Q-024 (4 more drafted alt strings), Q-026 (CS3's minimum width).
  - `architecture.md`: status, the new components and `.band`, CS3's page row, remove CS3 from Planned.
  - `componentisation.md`: "What case study 3 added" with `grep -c` counts.
  - `log.md`: the session entry. `AGENTS.md`: status mentions three case studies.
- [ ] **Step 3: Commit** the docs: `docs: record case study 3 decisions, questions and learnings`.
