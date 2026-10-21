# Case Study 4 (TRANSEARCH) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/work/designing-an-interactive-workbook` from the 2026-10-20 Figma snapshot, update `case-studies.json` to the new landing cards, and commit the page's downscaled images.

**Architecture:** A bespoke Astro page composing the shared case study components (D-022), with page-local CSS for the sections that are new to this page. No shared component changes. Images go in-repo under `src/assets/` through `astro:assets` (Q-018 stays open for the later move off-repo). Page-specific tokens go in a labelled `stream: cs4` block at the end of `tokens.css`.

**Tech Stack:** Astro 7, scoped CSS with design tokens (`src/styles/tokens.css`), `astro:assets` `<Image>`, `sharp` (already in `node_modules`) for the one-off image prep, and headless Edge (`shoot.mjs`/`diff.mjs`, D-031) for visual checks.

**Spec:** [`docs/superpowers/specs/2026-10-21-case-study-four-design.md`](../specs/2026-10-21-case-study-four-design.md). Figma values: [`docs/figma/case-study-4-desktop/context.md`](../../figma/case-study-4-desktop/context.md); reference renders in its `sections/` folder.

## Global Constraints

- Work in the worktree `F:/Code/cass-website-cs4` on `reece/feature/case-study-4`. Never push; pushing needs Reece's approval.
- **This is a parallel stream (`cs4`).** Follow [wiki/parallel-streams.md](../../wiki/parallel-streams.md): new questions are `Q-cs4-<n>`, new decisions `D-cs4-<n>`; tokens go only in the `/* --- stream: cs4 --- */` block; don't edit files another stream owns (`src/pages/index.astro`, `SiteNav`, `streamlining-scoring.astro`, `consolidating-import-collections.astro`); in the macro plan, edit only the `3B cs4` Status row.
- **No shared component changes** (`src/components/*`, `src/layouts/*`, `global.css`, existing tokens). If one seems needed, stop and ask Reece.
- No Figma calls. Every value comes from `docs/figma/case-study-4-desktop/`.
- No hard-coded design values: colour, type, spacing, radius and shadow come from tokens. Measured widths may be rem literals with a px comment (the existing page convention, 1rem = 16px).
- A section's root element is a direct child of `.case-study` (invariant 8). Page styles reach a child component's root only via `.parent > :global(.child-class)`.
- Copy is transcribed exactly as Figma has it, defects included (Q-023). The copied `standardbank.co.za` links are plain text (Q-038). Alt text is drafted and marked `<!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->` (Q-024).
- The card says "book" and the page says "workbook" (spec, decisions table). The slug stays `designing-an-interactive-workbook`.
- Stage only the paths each task lists; never `git add -A`.
- Every task ends with `npm run build`, `npm run check` and `npm run format:check` passing. Commit messages follow Conventional Commits and end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Any `.mjs` written under `.superpowers/` must be run through `npx prettier --write`, because `format:check` checks that folder too.

## Verification tools

`.superpowers/sdd/2026-10-21-case-study-four/` (git-ignored by `.superpowers/sdd/.gitignore`, created in Task 1) holds `shoot.mjs` and `diff.mjs`, copied from the CS3 run, plus the image prep script and the baseline shots.

```bash
cd /f/Code/cass-website-cs4
npm run build && npx astro preview --port 4391   # run in the background; serves dist/
node .superpowers/sdd/2026-10-21-case-study-four/shoot.mjs http://localhost:4391/work/<id>/ .superpowers/sdd/2026-10-21-case-study-four/shots/<name>
node .superpowers/sdd/2026-10-21-case-study-four/diff.mjs <before.png> <after.png> [out.png]
```

`shoot.mjs` writes `full.png` and one PNG per direct child of `.case-study`, named `<n>-<id or class>.png`. Stop the preview server after each task's checks.

---

### Task 1: Tools, baselines and images

**Files:**
- Create (git-ignored): `.superpowers/sdd/.gitignore`, `.superpowers/sdd/2026-10-21-case-study-four/{shoot.mjs,diff.mjs,prepare-images.mjs}`
- Create: `src/assets/case-studies/designing-an-interactive-workbook/*` (14 images)

**Interfaces:**
- Produces: these image files, imported by Tasks 2 to 4. PNG files: `intro-hero.png`, `kindle-icon.png`, `adobe-reader-icon.png`, `wireframe.png`, `reader-dashboard.png`, `chapter-one.png`, `tablet.png`, `phone.png`. JPEG files: `book-cover.jpg`, `reference-the-girls.jpg`, `reference-the-season.jpg`, `reference-life-in-color.jpg`, `reference-the-beauty-edit.jpg`, `reference-fake-tan.jpg`.
- Produces: baseline shots of `/` and CS1–3 in `shots/before-*`, for Task 5's comparison.

- [ ] **Step 1: Set up the scratch folder**

```bash
cd /f/Code/cass-website-cs4
mkdir -p .superpowers/sdd/2026-10-21-case-study-four
printf '*\n' > .superpowers/sdd/.gitignore
cp /f/Code/cass-website/.superpowers/sdd/2026-10-04-case-study-three/{shoot.mjs,diff.mjs} .superpowers/sdd/2026-10-21-case-study-four/
git check-ignore -q .superpowers/sdd/2026-10-21-case-study-four/shoot.mjs && echo IGNORED
```

Expected: `IGNORED`. In `diff.mjs`, change the hard-coded `'F:/Code/cass-website/node_modules/sharp'` to `'F:/Code/cass-website-cs4/node_modules/sharp'`.

- [ ] **Step 2: Take the baselines**

The JSON change in Task 2 alters the home page cards and every Read More section, so take these first.

```bash
npm run build && (npx astro preview --port 4391 &)
S=.superpowers/sdd/2026-10-21-case-study-four
for p in streamlining-scoring consolidating-import-collections sales-workflow-research; do node $S/shoot.mjs http://localhost:4391/work/$p/ $S/shots/before-$p; done
node $S/shoot.mjs http://localhost:4391/ $S/shots/before-home
```

Expected: a `full.png` and per-section PNGs in each `shots/before-*` folder. Stop the server.

- [ ] **Step 3: Write the image prep script**

Each raster is resized to 2× its largest rendered width at 1920px (the slot widths come from `context.md`). Screenshots stay PNG (palette, like CS3); photos become JPEG (like CS3's workshop photo). The intro hero is cropped to the part Figma shows: its fill is 124.79% of a 1104px box, and the frame clips the box at 1002px, so the visible part is `1002 / (1104 × 1.2479)` = 72.73% of the source's width, from the left.

Create `.superpowers/sdd/2026-10-21-case-study-four/prepare-images.mjs`:

```js
// One-off: downscale the staged TRANSEARCH exports (phase 1b) for the repo.
// Usage: node prepare-images.mjs <staged case-study-4 dir>
import { createRequire } from 'node:module';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
const sharp = createRequire(import.meta.url)(
  'F:/Code/cass-website-cs4/node_modules/sharp',
);

const S = process.argv[2];
if (!S) throw new Error('usage: node prepare-images.mjs <staged dir>');
const out =
  'F:/Code/cass-website-cs4/src/assets/case-studies/designing-an-interactive-workbook';
mkdirSync(out, { recursive: true });
const png = { compressionLevel: 9, palette: true, quality: 90 };
const jpeg = { quality: 80, mozjpeg: true };

// Intro hero (144:306): the visible 72.73% from the left, 2 × 1002px wide.
const hero = sharp(`${S}/01-intro-hero.png`);
const { width, height } = await hero.metadata();
await hero
  .extract({ left: 0, top: 0, width: Math.round(width * 0.7273), height })
  .resize({ width: 2004 })
  .png(png)
  .toFile(`${out}/intro-hero.png`);

const jobs = [
  // [source, output, width or null to keep, format]
  ['03-book-cover.png', 'book-cover.jpg', null, 'jpeg'], // 400px source for a 284px slot
  ['04-kindle-icon.png', 'kindle-icon.png', 230, 'png'], // 115px slot
  ['04-adobe-reader-icon.png', 'adobe-reader-icon.png', 230, 'png'],
  ['07-wireframe-composed@2x.png', 'wireframe.png', null, 'png'], // already 2×
  ['08-reference-1-1fa79.png', 'reference-the-girls.jpg', 428, 'jpeg'], // 144:399
  ['08-reference-2-9b612.png', 'reference-the-season.jpg', 428, 'jpeg'], // 144:400
  ['08-reference-3-ce62d.png', 'reference-life-in-color.jpg', 428, 'jpeg'], // 144:401
  ['08-reference-4-88c67.png', 'reference-the-beauty-edit.jpg', 428, 'jpeg'], // 144:402
  ['08-reference-5-22ebf.png', 'reference-fake-tan.jpg', 646, 'jpeg'], // 144:403
  ['09-reader-dashboard.png', 'reader-dashboard.png', 1530, 'png'], // 765px slot
  ['10-chapter-one.png', 'chapter-one.png', 1530, 'png'],
  ['11-ipad.png', 'tablet.png', 1430, 'png'], // 715px slot
  ['11-iphone.png', 'phone.png', 445, 'png'], // 222.5px slot
];
for (const [src, dest, w, fmt] of jobs) {
  let img = sharp(`${S}/${src}`);
  if (w) img = img.resize({ width: w });
  img = fmt === 'png' ? img.png(png) : img.flatten({ background: '#ffffff' }).jpeg(jpeg);
  await img.toFile(`${out}/${dest}`);
}

let total = 0;
for (const f of readdirSync(out)) {
  const { size } = statSync(`${out}/${f}`);
  total += size;
  console.log(`${f}\t${size}`);
}
console.log(`TOTAL\t${total}`);
```

Then run `npx prettier --write .superpowers/sdd/2026-10-21-case-study-four/prepare-images.mjs`.

- [ ] **Step 4: Run it**

```bash
node .superpowers/sdd/2026-10-21-case-study-four/prepare-images.mjs F:/Code/cass-website-staging/figma-2026-10-20/case-study-4
```

Expected: 14 files and a `TOTAL` line. Record the total (it goes in Q-018's update in Task 5). **If the total is over 1,500,000 bytes, stop and report it to Reece before committing**: the spec estimated 0.6–1 MB.

- [ ] **Step 5: Look at the results**

Open `intro-hero.png`, `wireframe.png`, `reader-dashboard.png` and one reference image with the Read tool. Check that the hero's right edge cuts through the note bubble area (the Figma crop), and that the palette PNGs show no obvious banding. If `wireframe.png` bands (it contains a photo), re-run that one job with `palette: false` and note it.

- [ ] **Step 6: Check and commit**

```bash
npm run build && npm run check && npm run format:check
git add src/assets/case-studies/designing-an-interactive-workbook
git commit -m "feat(cs4): add downscaled TRANSEARCH images" -m "Resized from the phase 1b exports to 2x their rendered width at 1920px; the intro hero is cropped to the part Figma shows. In-repo for now by Reece's call on Q-018, which stays open for the move off-repo." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Card data, tokens, and the top of the page

**Files:**
- Modify: `src/content/case-studies.json` (Absa `client`; TRANSEARCH `title` and `skills`)
- Modify: `src/styles/tokens.css` (append the `stream: cs4` block inside `:root`, before its closing `}`)
- Create: `src/pages/work/designing-an-interactive-workbook.astro`

**Interfaces:**
- Consumes: Task 1's `intro-hero.png` and `book-cover.jpg`.
- Produces: the page file with a `<style>` block that later tasks append to (insert new sections just before `</CaseStudyLayout>`, new CSS just before `</style>`); the tokens `--space-cs4-intro-image-drop`, `--space-cs4-intro-image-nudge`, `--space-cs4-panel-inline`, `--space-cs4-design-rows`, `--space-cs4-reference-column-gap`, `--space-cs4-reference-row-gap`, `--radius-cs4-app-icon`.

- [ ] **Step 1: Update the JSON (D-052)**

In `src/content/case-studies.json`, change only these fields:

```json
    "client": "Absa Banking",
```

(for `"id": "streamlining-scoring"`), and for `"id": "designing-an-interactive-workbook"`:

```json
    "title": "Designing an interactive book",
    "skills": ["UI Design", "Interaction Design", "Typography"],
```

- [ ] **Step 2: Add the stream's tokens**

At the end of the `:root` block in `src/styles/tokens.css`, after `--focus-ring-outer`, add:

```css

  /* --- stream: cs4 --- */
  /* TRANSEARCH (144:269). Folded into the groups above before the PR. */
  --space-cs4-intro-image-drop: 4.1875rem; /* 67px; the hero (144:306) sits
  66.93px below the top of the intro */
  --space-cs4-intro-image-nudge: 0.1875rem; /* 3px; and 3px into its column
  (x=918, against CS3's 922 for a 7px nudge) */
  --space-cs4-panel-inline: 6.25rem; /* 100px; the user journeys panel's
  inline padding (144:367 px-100), against .panel's 80px */
  --space-cs4-design-rows: 9.0625rem; /* 145px; between the four rows of the
  Design section (144:395) */
  --space-cs4-reference-column-gap: 0.625rem; /* 10px; typography reference
  grid (144:398) */
  --space-cs4-reference-row-gap: 0.84375rem; /* 13.5px */
  --radius-cs4-app-icon: 1.4375rem; /* 23px; the competitor research app
  icons (144:338, 144:339) */
```

- [ ] **Step 3: Create the page with the intro, process strip and business problem**

Create `src/pages/work/designing-an-interactive-workbook.astro`:

```astro
---
import { getEntry } from 'astro:content';
import { Image } from 'astro:assets';
import CaseStudyLayout from '../../layouts/CaseStudyLayout.astro';
import CaseStudyIntro from '../../components/CaseStudyIntro.astro';
import DefinitionTip from '../../components/DefinitionTip.astro';
import ProcessStrip from '../../components/ProcessStrip.astro';
import SectionHeading from '../../components/SectionHeading.astro';
import FindingsList from '../../components/FindingsList.astro';
import Woman2 from '../../assets/icons/woman-2.svg';
import introHero from '../../assets/case-studies/designing-an-interactive-workbook/intro-hero.png';
import bookCover from '../../assets/case-studies/designing-an-interactive-workbook/book-cover.jpg';

const entry = await getEntry('caseStudies', 'designing-an-interactive-workbook');
if (!entry)
  throw new Error('Missing case study: designing-an-interactive-workbook');

const subNav = [
  { href: '#project-overview', label: 'Project Overview' },
  { href: '#business-needs', label: 'Business Needs' },
  { href: '#research', label: 'Research' },
  { href: '#user-journeys', label: 'User Journeys' },
  { href: '#design', label: 'Design' },
  { href: '#handover', label: 'Handover' },
];
---

<!--
  Every measurement below is from docs/figma/case-study-4-desktop/context.md.
  TODO(cass): all image alt text is drafted from the surrounding copy and
  needs review (Q-024).
-->
<CaseStudyLayout entry={entry} subNav={subNav}>
  <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
  <CaseStudyIntro
    eyebrow="ux/ui designer"
    title={entry.data.title}
    userTypes={[{ label: 'Clients', icon: Woman2 }]}
    image={introHero}
    imageAlt="The workbook's reading view on a desktop: a large pull quote, chapter text with one passage selected and a highlight or note pop-up above it, and the chapter progress tracker down the left."
    imageBleed
    id="project-overview"
  >
    <Fragment slot="title">
      designing an
      <br />
      interactive workbook
    </Fragment>
    <!-- TODO(cass): definition drafted, not in Figma (Q-cs4-2) -->
    <DefinitionTip id="def-transearch" term="TRANSEARCH International">
      A global executive search and leadership consulting firm.
    </DefinitionTip>{' '}
    in collaboration with John O. Burdett published a workbook to help employees
    better integrate into new teams or navigate culture changes. During lockdown
    they found it harder to distribute this workbook to their successful
    candidates. I was tasked with creating an interactive online platform to
    improve user access.
    <Fragment slot="goal">
      Create an interactive online platform where users could{' '}
      <strong>
        access the workbook content, highlight, make notes and complete
        exercises.
      </strong>
    </Fragment>
    <Fragment slot="outcome">
      <p>
        I designed a discoverable interactive workbook that enabled users to
        engage with the content in a way similar to how they would with a
        physical workbook, including useful additional interactions that would
        improve their experience.
      </p>
      <p>
        I was the only designer on this and I ran the project from{' '}
        <strong>identifying business needs to its launch.</strong>
      </p>
    </Fragment>
  </CaseStudyIntro>

  <!-- 144:307: the same six labels and widths as CS2's strip -->
  <ProcessStrip
    class="u-bleed"
    steps={[
      {
        label: 'identify business needs',
        width: 'var(--size-process-step-import-identify)',
      },
      {
        label: 'user research',
        width: 'var(--size-process-step-import-research)',
      },
      { label: 'personas', width: 'var(--size-process-step-import-personas)' },
      {
        label: 'user journeys',
        width: 'var(--size-process-step-import-journeys)',
      },
      {
        label: 'wireframing & ui design',
        width: 'var(--size-process-step-import-wireframing)',
      },
      {
        label: 'development',
        width: 'var(--size-process-step-import-development)',
      },
    ]}
  />

  <section
    class="business"
    id="business-needs"
    aria-labelledby="business-needs-heading"
  >
    <div class="business__lead">
      <figure class="business__cover">
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <Image
          class="business__cover-image"
          src={bookCover}
          alt="The printed workbook's cover: Without Breaking Stride, Moving successfully into your new role, by John O. Burdett."
        />
        <figcaption class="business__cover-caption type-handwritten">
          The book cover
        </figcaption>
      </figure>
      <SectionHeading
        eyebrow="the"
        title="Business problem"
        id="business-needs-heading"
        titleWidth="12.625rem"
        align="start"
      >
        I ran a discovery session with the key stakeholder and identified the
        following needs.
      </SectionHeading>
    </div>
    <FindingsList
      spacing="compact"
      items={[
        'Increase <strong>engagement</strong> with the workbook.',
        'Help users<strong> manage a change in teams</strong> effectively and healthily.',
        'Make the book more <strong>accessible to their users.</strong>',
        'Help <strong>build TRANSEARCH’s brand reputation </strong>as <strong>thought leaders.</strong>',
      ]}
    />
  </section>
</CaseStudyLayout>

<style>
  /* --- Intro (144:285) ----------------------------------------------------
     The hero bleeds to the page edge like CS3's, but sits 67px below the
     intro's top and 3px into its column. CaseStudyIntro reads both from
     custom properties, so this page sets its own values on the intro. */
  :global(#project-overview) {
    --space-intro-image-drop: var(--space-cs4-intro-image-drop);
    --space-intro-image-nudge: var(--space-cs4-intro-image-nudge);
  }

  /* --- Business problem (144:319) -----------------------------------------
     A 1306px row, centred and top-aligned: the book cover (285px) and the
     shared Business Problem heading (305px, left-aligned on this frame)
     share a 637px block, then 80px, then the 502px list with 32px either
     side of each rule. Neither BusinessProblem variant matches (80px gap,
     top alignment, 32px rules) and it has no room for the cover, so the page
     composes its two parts instead. */
  .business {
    display: grid;
    grid-template-columns: minmax(0, 39.8125rem) minmax(0, 31.375rem);
    gap: var(--space-80);
    align-items: start;
    justify-content: center;
  }

  .business__lead {
    display: grid;
    grid-template-columns: minmax(0, 17.8125rem) minmax(0, 19.0625rem);
    justify-content: space-between;
    align-items: start;
  }

  /* 149:1939: no radius or shadow (a photo of the printed book), caption
     16px below. */
  .business__cover {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
    margin: 0;
  }

  .business__cover-image {
    inline-size: 100%;
    block-size: auto;
    aspect-ratio: 284 / 350;
    object-fit: cover;
  }

  .business__cover-caption {
    color: var(--color-purple);
    text-transform: lowercase;
  }
</style>
```

- [ ] **Step 4: Build and check**

Run: `npm run build && npm run check && npm run format:check`
Expected: all pass. If `format:check` fails on the new page or the JSON, run `npx prettier --write <file>` and re-run. Expected build output includes `/work/designing-an-interactive-workbook/index.html`.

- [ ] **Step 5: Look at it**

Start the preview server and shoot the page:

```bash
S=.superpowers/sdd/2026-10-21-case-study-four
node $S/shoot.mjs http://localhost:4391/work/designing-an-interactive-workbook/ $S/shots/task2
```

Compare `shots/task2/*` with `docs/figma/case-study-4-desktop/sections/01-introduction.png` and `03-business-problem.png` (the renders are 1024px wide; the shots are 1920px). Check:
- The hero touches the right edge of the window, its top is about 67px below the eyebrow's top, and it has square right-hand corners.
- The pill reads "Clients" with the woman icon.
- "the business problem" is left-aligned, with the cover to its left and the list to its right, all top-aligned.
- The page `<title>` is "Designing an interactive book — Cassandra Garratt" (expected: the card title, Q-cs4-1).

Stop the server.

- [ ] **Step 6: Commit**

```bash
git add src/content/case-studies.json src/styles/tokens.css src/pages/work/designing-an-interactive-workbook.astro
git commit -m "feat(cs4): add the TRANSEARCH page intro and business problem" -m "Also updates the TRANSEARCH card title and skills and Absa's badge to the new landing cards (D-052)." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Research, personas, user journeys and wireframing

**Files:**
- Modify: `src/pages/work/designing-an-interactive-workbook.astro`

**Interfaces:**
- Consumes: Task 1's `kindle-icon.png`, `adobe-reader-icon.png`, `wireframe.png`; Task 2's page file and the tokens `--space-cs4-panel-inline`, `--radius-cs4-app-icon`.
- Produces: the `.note` and `.note--roomy` classes (page-local), and the `#research` and `#user-journeys` anchors used by the sub-nav.

- [ ] **Step 1: Add the imports**

In the frontmatter, after the `bookCover` import:

```astro
import kindleIcon from '../../assets/case-studies/designing-an-interactive-workbook/kindle-icon.png';
import adobeReaderIcon from '../../assets/case-studies/designing-an-interactive-workbook/adobe-reader-icon.png';
import wireframe from '../../assets/case-studies/designing-an-interactive-workbook/wireframe.png';
```

- [ ] **Step 2: Add the four sections**

Insert just before `</CaseStudyLayout>`:

```astro
  <section class="panel" id="research" aria-labelledby="research-heading">
    <div class="research">
      <div class="research__icons">
        <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
        <Image class="research__icon" src={kindleIcon} alt="The Kindle app icon." />
        <Image
          class="research__icon"
          src={adobeReaderIcon}
          alt="The Adobe Acrobat Reader app icon."
        />
      </div>
      <div class="research__content">
        <h2 class="research__heading type-title-2" id="research-heading">
          Competitor
          <br />
          research
        </h2>
        <div class="research__body type-body-med">
          <p>
            I evaluated how &lsquo;Adobe PDF Reader&rsquo; and
            &lsquo;Kindle&rsquo; tackled <strong>navigation</strong> and
            <strong>bookmarking</strong> along with identifying any potential pain
            points.
          </p>
          <p>
            <strong>
              Using my research here I encouraged the inclusion of highlighting
              and taking notes to make future reference easier for the user.
            </strong>
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="personas" aria-labelledby="personas-heading">
    <h2 class="personas__heading type-title-2" id="personas-heading">
      Proto-personas
    </h2>
    <div class="personas__row">
      <div class="personas__types">
        <p class="type-subtitle">
          <strong>
            The client provided us with 3 types of users that would have access
            to this book:
          </strong>
        </p>
        <FindingsList
          spacing="compact"
          items={[
            '<strong>Newly placed employees.</strong>',
            '<strong>Staff moving teams within the same company.</strong>',
            '<strong>Executives experiencing a culture shift.</strong>',
          ]}
        />
      </div>
      <div class="personas__method">
        <div class="personas__method-body type-body-med">
          <p>
            In a <strong>workshop</strong> with my team, we brainstormed potential
            driving forces, frustrations, goals and needs that may apply to our
            users.
          </p>
          <p>
            I used insights and understandings gained from this session in
            conjunction with my 3 user bases to build my personas. Once completed
            we used the<strong>
              persona&rsquo;s as reference of our &lsquo;empathy&rsquo; touch
              points.</strong
            >
          </p>
        </div>
        <div class="note note--roomy">
          <h3 class="note__label type-h3">Reflection</h3>
          <p class="note__body type-body-med">
            I missed an opportunity to workshop with some of the C-suite
            employees at my company to get more accurate insights, in lieu of
            user interviews.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section
    class="panel journeys"
    id="user-journeys"
    aria-labelledby="user-journeys-heading"
  >
    <h2 class="journeys__heading type-title-2" id="user-journeys-heading">
      User
      <br />
      Journeys
    </h2>
    <div class="journeys__columns">
      <div class="journeys__column">
        <h3 class="journeys__subheading type-h1">Introduction/Orientation</h3>
        <p class="type-body-med">
          Triggered on first login, the user is presented with an optional
          introductory feature that helps them identify important chapters by
          providing a chapter summary and an indication of the situations
          covered in each chapter. This led into the feature tutorial mentioned
          above.
        </p>
      </div>
      <div class="journeys__column">
        <h3 class="journeys__subheading type-h1">Primary Content</h3>
        <p class="type-body-med">
          This would be the users &lsquo;everyday&rsquo; journey. This journey
          takes the user from login to reading content and completing the
          exercises. This is where we applied features like highlighting, note
          taking, cross referencing etc.
        </p>
      </div>
    </div>
    <div class="note">
      <h3 class="note__label type-h3">Suggested improvement</h3>
      <p class="note__body type-sub-titles">
        I identified the opportunity to provide our three types of users a
        curated set of chapters based on a selection made during onboarding.
      </p>
    </div>
  </section>

  <section
    class="u-bleed band band--white wireframing"
    aria-labelledby="wireframing-heading"
  >
    <div class="wireframing__inner">
      <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
      <Image
        class="wireframing__image"
        src={wireframe}
        alt="A hand-drawn wireframe of the reading view behind a cleaner mock-up of the same screen: chapter text on the left, and a pop-up of quick notes and highlights on the right."
      />
      <div class="wireframing__content">
        <h2 class="wireframing__heading type-title-2" id="wireframing-heading">
          Wireframing
        </h2>
        <div class="wireframing__body type-body-med">
          <p>
            Once wireframing was done I tested them on my team members to
            identify any issues or inconsistencies. Once those were identified I
            updated the designs and began testing again. I followed this
            iterative process until my users could use the interface easily and
            smoothly.
          </p>
          <p>
            The designs were then shown to our client and with their feedback we
            restarted this process.
          </p>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 3: Add the CSS**

Insert just before `</style>`:

```css
  /* --- Competitor research (144:335) --------------------------------------
     A .panel (1450px). A 672px row centred and bottom-aligned: the two
     115px app icons stacked 16px apart, 48px, then the 502px text (heading,
     24px, body). Figma's body box is 510px, 8px wider than its column:
     drift, built at 502. */
  .research {
    display: grid;
    grid-template-columns: 7.1875rem minmax(0, 31.375rem);
    gap: var(--space-48);
    align-items: end;
    justify-content: center;
  }

  .research__icons {
    display: flex;
    flex-direction: column;
    gap: var(--space-16);
  }

  .research__icon {
    inline-size: 100%;
    block-size: auto;
    border-radius: var(--radius-cs4-app-icon);
  }

  .research__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .research__heading {
    color: var(--color-light-purple);
    text-transform: lowercase;
  }

  .research__body {
    display: flex;
    flex-direction: column;
    gap: 1lh;
  }

  /* --- Proto-personas (144:348) -------------------------------------------
     A 1246px block, centred: the heading, 24px, then two top-aligned columns
     80px apart. Left (415px): the bold lead, 56px, the 359px user list.
     Right (695px): the method text, 24px, the Reflection note. */
  .personas {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    inline-size: 100%;
    max-inline-size: 77.875rem;
    margin-inline: auto;
  }

  .personas__heading {
    color: var(--color-red);
    text-transform: lowercase;
  }

  .personas__row {
    display: grid;
    grid-template-columns: minmax(0, 25.9375rem) minmax(0, 43.4375rem);
    gap: var(--space-80);
    align-items: start;
  }

  .personas__types {
    display: flex;
    flex-direction: column;
    gap: var(--space-56);
    color: var(--color-purple);
  }

  .personas__types > :global(.findings-list) {
    max-inline-size: 22.4375rem; /* 359px */
  }

  .personas__method {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
    color: var(--color-purple);
  }

  .personas__method-body {
    display: flex;
    flex-direction: column;
    gap: 1lh;
  }

  /* --- Notes ("Future state", 144:361 and 144:386) ------------------------
     White, 12px radius, no shadow, a bold 14px label 8px above the body,
     like CS2's future state card (163:2237) but with Figma's 8px gap. The
     body is 446px in both. Suggested improvement: 20px padding, 14px body.
     Reflection (roomy): 24px padding, 16px body. Figma's Suggested
     improvement box is 505px, 19px wider than its padding needs: drift. */
  .note {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    inline-size: fit-content;
    padding: var(--space-future-card);
    border-radius: var(--radius-panel);
    background-color: var(--color-white);
    color: var(--color-purple);
  }

  .note--roomy {
    padding: var(--space-24);
  }

  .note__label {
    text-transform: lowercase;
  }

  .note__body {
    max-inline-size: 27.875rem; /* 446px */
  }

  /* --- User journeys (144:367) --------------------------------------------
     A .panel (1446px) with 100px inline padding rather than 80: the
     heading, 40px, two 583px columns 80px apart (each a 30px subheading,
     40px, body), 40px, the note. The subheadings are Figma's Process name
     (30 / 0.88), built as .type-h1 (30 / 0.92) as on CS3. */
  .journeys {
    display: flex;
    flex-direction: column;
    gap: var(--space-40);
    padding-inline: var(--space-cs4-panel-inline);
  }

  .journeys__heading {
    color: var(--color-light-purple);
    text-transform: lowercase;
  }

  .journeys__columns {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 36.4375rem));
    gap: var(--space-80);
  }

  .journeys__column {
    display: flex;
    flex-direction: column;
    gap: var(--space-40);
  }

  .journeys__subheading {
    color: var(--color-off-white);
    text-transform: lowercase;
  }

  /* --- Wireframing (144:390) ----------------------------------------------
     A full-bleed White band (80px block padding), flush under the user
     journeys panel: Figma overlaps them by 6px, built flush. The negative
     margin cancels the grid's 160px row gap; the rows after it move up
     with it. The composed illustration (196:2697, exported at 790px
     including its shadow bleed) and the 715px text, 80px apart, centred. */
  .wireframing {
    margin-block-start: calc(-1 * var(--space-160));
  }

  .wireframing__inner {
    display: grid;
    grid-template-columns: minmax(0, 49.375rem) minmax(0, 44.6875rem);
    gap: var(--space-80);
    align-items: center;
    justify-content: center;
  }

  .wireframing__image {
    inline-size: 100%;
    block-size: auto;
  }

  .wireframing__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .wireframing__heading {
    color: var(--color-red);
    text-transform: lowercase;
  }

  .wireframing__body {
    display: flex;
    flex-direction: column;
    gap: 1lh;
    color: var(--color-purple);
  }
```

- [ ] **Step 4: Build and check**

Run: `npm run build && npm run check && npm run format:check`
Expected: all pass (run `npx prettier --write` on the page if formatting fails).

- [ ] **Step 5: Look at it**

Shoot the page into `shots/task3` and compare the new sections with `sections/04-competitor-research.png`, `05-proto-personas.png`, `06-user-journeys.png` and `07-wireframing.png`. Check:
- The panels' body text is Regular weight (D-044), with the bold runs still bold.
- The journeys panel's text starts 100px from its edges (inspect it: `.journeys` padding-inline should compute to 100px, beating `.panel`'s 80px).
- The white wireframing band starts at the journeys panel's bottom edge with no gap, and the section after it (added in Task 4) will be 160px below.
- Both notes are white boxes; the Reflection one has larger text.

- [ ] **Step 6: Commit**

```bash
git add src/pages/work/designing-an-interactive-workbook.astro
git commit -m "feat(cs4): add research, personas, user journeys and wireframing" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Design section and handover

**Files:**
- Modify: `src/pages/work/designing-an-interactive-workbook.astro`

**Interfaces:**
- Consumes: Task 1's reference, `reader-dashboard.png`, `chapter-one.png`, `tablet.png` and `phone.png` images; the tokens `--space-cs4-design-rows`, `--space-cs4-reference-column-gap`, `--space-cs4-reference-row-gap`.
- Produces: the `#design` and `#handover` anchors. The page is complete after this task.

- [ ] **Step 1: Add the imports**

```astro
import CaseStudyFigure from '../../components/CaseStudyFigure.astro';
import LabelledFindings from '../../components/LabelledFindings.astro';
import referenceTheGirls from '../../assets/case-studies/designing-an-interactive-workbook/reference-the-girls.jpg';
import referenceTheSeason from '../../assets/case-studies/designing-an-interactive-workbook/reference-the-season.jpg';
import referenceLifeInColor from '../../assets/case-studies/designing-an-interactive-workbook/reference-life-in-color.jpg';
import referenceTheBeautyEdit from '../../assets/case-studies/designing-an-interactive-workbook/reference-the-beauty-edit.jpg';
import referenceFakeTan from '../../assets/case-studies/designing-an-interactive-workbook/reference-fake-tan.jpg';
import readerDashboard from '../../assets/case-studies/designing-an-interactive-workbook/reader-dashboard.png';
import chapterOne from '../../assets/case-studies/designing-an-interactive-workbook/chapter-one.png';
import tablet from '../../assets/case-studies/designing-an-interactive-workbook/tablet.png';
import phone from '../../assets/case-studies/designing-an-interactive-workbook/phone.png';
```

- [ ] **Step 2: Check the reference images' alt text**

Open the five `reference-*.jpg` files with the Read tool. The alt text below was drafted from the frame screenshot. Correct any headline that doesn't match its image (keep the wording pattern).

- [ ] **Step 3: Add the sections**

Insert just before `</CaseStudyLayout>`:

```astro
  <section class="design" id="design" aria-labelledby="design-heading">
    <div class="typography">
      <div class="typography__content">
        <h2 class="typography__heading type-title-2" id="design-heading">
          Typography &amp;
          <br />
          Design
        </h2>
        <div class="typography__body type-body-med">
          <p>
            The client wanted the book to be distinctly on-brand but they were
            open to applying the CI in new ways, as this wouldn&rsquo;t be
            accessed using their existing website.
          </p>
          <p>
            <strong>
              I took inspiration from magazine designs to create a clean and
              bold look that assisted in the scannability of the content.
            </strong>
          </p>
        </div>
      </div>
      <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
      <ul class="typography__references" role="list">
        <li>
          <Image
            class="typography__image"
            src={referenceTheGirls}
            alt="Magazine reference: a page headlined “the girls” in a large serif."
          />
        </li>
        <li>
          <Image
            class="typography__image"
            src={referenceTheSeason}
            alt="Magazine reference: a page headlined “the season” in a large serif."
          />
        </li>
        <li class="typography__reference--tall">
          <Image
            class="typography__image"
            src={referenceFakeTan}
            alt="Magazine reference: a full page headlined “The best fake tan ever”."
          />
        </li>
        <li>
          <Image
            class="typography__image"
            src={referenceTheBeautyEdit}
            alt="Magazine reference: a page headlined “The beauty edit”."
          />
        </li>
        <li>
          <Image
            class="typography__image"
            src={referenceLifeInColor}
            alt="Magazine reference: a page headlined “Life in color”."
          />
        </li>
      </ul>
    </div>

    <div class="feature feature--image-start">
      <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
      <CaseStudyFigure
        image={readerDashboard}
        alt="The reader dashboard: tabs for the introduction and four parts, a bookmark banner with a Continue link back to Part One, Chapter One, and four chapter cards showing how much of each has been read."
        caption="reader Dashboard"
      />
      <div class="feature__content">
        <h3 class="feature__heading type-h1">Bookmarking where you left off</h3>
        <LabelledFindings
          findings={[
            {
              label: 'problem',
              body: 'A user was assumed to be reading this content <strong>over a few days</strong> and would need to mark where they stopped reading.',
            },
            {
              label: 'solution',
              body: 'I added in a bookmark feature that would <strong>automatically mark where you stopped interacting </strong>with the content. When a user opened the interface again they were presented with a button on the top right that would <strong>take them to the screen they left off on.</strong>',
            },
            {
              label: 'Outcome',
              body: 'Users are able to easily<strong> continue their journey</strong> working through the content without having to note their stopping point.',
            },
          ]}
        />
      </div>
    </div>

    <div class="feature feature--image-end">
      <div class="feature__content">
        <h3 class="feature__heading type-h1">
          Highlighting &amp;
          <br />
          Note Taking
        </h3>
        <LabelledFindings
          findings={[
            {
              label: 'problem',
              body: 'The content needed to be <strong>easily referenced</strong> by our user without them needing to scroll through whole chapters.',
            },
            {
              label: 'solution',
              body: 'I made it possible for users to <strong>highlight or make a note in the content</strong>. To improve the access to the highlight or annotated content we implemented the ‘Quick Notes’ feature that allowed the user to scroll through all their notes without leaving a chapter.',
            },
            {
              label: 'Outcome',
              body: 'When a user chooses to make a note, a <strong>dialog box will appear on the right-most column of the screen</strong>. All text that the user highlights or makes notes on are available under ‘Quick Notes’ or ‘My Notes &amp; Exercises’. Including solutions like this also cater for users with impaired focus or cognitive processing.',
            },
          ]}
        />
      </div>
      <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
      <CaseStudyFigure
        image={chapterOne}
        alt="A chapter page headed “Do the research.”, with highlighted passages and an open note beside them reading “Talk to Jamie about this.”"
        caption="reader Dashboard"
      />
    </div>

    <div class="feature feature--image-start">
      <!-- TODO(cass): alt text drafted from the surrounding copy, needs review -->
      <figure class="devices">
        <Image
          class="devices__tablet"
          src={tablet}
          alt="The chapter page “Do the research.” on a tablet and, overlapping it, on a phone."
        />
        <Image class="devices__phone" src={phone} alt="" />
        <figcaption class="devices__caption type-handwritten-small">
          tABLET &amp; MOBILE DESIGNS
        </figcaption>
      </figure>
      <div class="feature__content">
        <h3 class="feature__heading type-h1">Responsive design</h3>
        <LabelledFindings
          findings={[
            {
              label: 'problem',
              body: 'Our users were business people on the move during the day, reading between working sessions or meetings. This meant that they would need a interface that worked seamlessly between devices.',
            },
            {
              label: 'solution',
              body: 'I adapted the interface for tablet and mobile. On mobile I replaced the progress tracker with a progress bar that sticks to the top of the screen to give the reader an idea of how far they are in the section. I tested the base font sizes on both device types to ensure comfortable readability.',
            },
            {
              label: 'Outcome',
              body: 'Users could continue their reading, highlights and note taking seamlessly whether they were on desktop, tablet or phone.',
            },
          ]}
        />
      </div>
    </div>
  </section>

  <section class="panel" id="handover" aria-labelledby="handover-heading">
    <div class="handover">
      <h2 class="handover__heading type-title-2" id="handover-heading">
        Development &amp;
        <br />
        launch
      </h2>
      <div class="handover__body type-body-med">
        <p>
          From feature ideation to final UI designs I worked closely with my
          developer this made handover and development seamless.
        </p>
        <p>
          I spent time collaborating with my developer during the build of the
          interface to assist with UI QA.
        </p>
      </div>
    </div>
  </section>
```

`LabelledFindings` renders `body` with `set:html`, so the `&amp;` in "My Notes &amp; Exercises" shows as "&".

- [ ] **Step 4: Add the CSS**

Insert just before `</style>`:

```css
  /* --- Design (144:395) ---------------------------------------------------
     Four 1443px rows, 145px apart: Typography & Design, then three feature
     rows (a screenshot beside problem, solution and outcome). */
  .design {
    display: flex;
    flex-direction: column;
    gap: var(--space-cs4-design-rows);
    inline-size: 100%;
    max-inline-size: 90.1875rem;
    margin-inline: auto;
  }

  /* 144:396: the 598px text (heading, 24px, body) and the 766px reference
     grid, 80px apart, top-aligned. */
  .typography {
    display: grid;
    grid-template-columns: minmax(0, 37.375rem) minmax(0, 47.875rem);
    gap: var(--space-80);
    align-items: start;
  }

  .typography__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .typography__heading {
    color: var(--color-red);
    text-transform: lowercase;
  }

  .typography__body {
    display: flex;
    flex-direction: column;
    gap: 1lh;
    color: var(--color-purple);
  }

  /* 144:398: three columns (213, 209 and 323.5px) and two 209px rows; the
     third image spans both. 10px across, 13.5px down. The small images
     are near-square crops of square sources, so they're built square:
     213px against Figma's 213 × 209 is drift. */
  .typography__references {
    display: grid;
    grid-template-columns: 213fr 209fr 323.5fr;
    column-gap: var(--space-cs4-reference-column-gap);
    row-gap: var(--space-cs4-reference-row-gap);
    margin: 0;
    padding: 0;
  }

  .typography__reference--tall {
    grid-row: span 2;
  }

  .typography__image {
    inline-size: 100%;
    block-size: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }

  .typography__reference--tall .typography__image {
    aspect-ratio: auto;
  }

  /* 144:406, 144:423, 144:440: a 765px screenshot and the 598px content
     (heading, 24px, findings), 80px apart, top-aligned, alternating sides
     (the same shape as CS2's status tracker). */
  .feature {
    display: grid;
    gap: var(--space-80);
    align-items: start;
  }

  .feature--image-start {
    grid-template-columns: minmax(0, 47.8125rem) minmax(0, 37.375rem);
  }

  .feature--image-end {
    grid-template-columns: minmax(0, 37.375rem) minmax(0, 47.8125rem);
  }

  .feature__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-24);
  }

  .feature__heading {
    color: var(--color-purple);
    text-transform: lowercase;
  }

  /* 48px between problem, solution and outcome on this frame (Sub-Sub
     Sections), against LabelledFindings' 24px. Its 8px label gap is kept
     (Figma: about 1px, drift). */
  .feature__content > :global(.labelled-findings) {
    gap: var(--space-sub-sections);
  }

  /* 144:441: a 765.5 × 555px group. The tablet (715px) at its top left,
     the phone (222.5px) at its right edge 71px down, the caption 492px
     down under the tablet. Percentages of the group, so it scales with its
     column. One figure, one alt text (the phone's is empty). */
  .devices {
    position: relative;
    aspect-ratio: 765.5 / 555;
    margin: 0;
  }

  .devices__tablet,
  .devices__phone {
    position: absolute;
    block-size: auto;
    border-radius: var(--radius-image);
    box-shadow: var(--shadow-card);
  }

  .devices__tablet {
    inset-block-start: 0;
    inset-inline-start: 0;
    inline-size: 93.43%;
  }

  .devices__phone {
    inset-block-start: 12.86%;
    inset-inline-end: 0;
    inline-size: 29.06%;
  }

  .devices__caption {
    position: absolute;
    inset-block-start: 88.66%;
    inset-inline-start: 0;
    color: var(--color-purple);
    text-transform: lowercase;
  }

  /* --- Development & launch (144:459) -------------------------------------
     A .panel (1446px). Heading 334px right-aligned, 48px, body 470px,
     vertically centred, the 860px row centred. The same layout as CS2's
     handover (99:2454). */
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

- [ ] **Step 5: Build and check**

Run: `npm run build && npm run check && npm run format:check`
Expected: all pass.

- [ ] **Step 6: Look at it**

Shoot into `shots/task4` and compare with `sections/08-typography-design.png` to `12-handover.png`. Check:
- The reference grid is about 766 × 432px, with the tall image on the right spanning both rows.
- The features alternate: image left, image right, image left.
- The phone overlaps the tablet's bottom-right corner and hangs below it; the caption sits under the tablet, left of the phone, and doesn't collide with it.
- Captions read "reader dashboard", "reader dashboard" and "tablet & mobile designs" (lowercased).
- Read More shows the other three case studies, not TRANSEARCH itself.

- [ ] **Step 7: Commit**

```bash
git add src/pages/work/designing-an-interactive-workbook.astro
git commit -m "feat(cs4): add the design section and handover" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Whole-page verification and docs

**Files:**
- Modify: `docs/questions.md`, `docs/test-plan.md`, `docs/wiki/log.md`, `docs/architecture.md`, `docs/superpowers/specs/2026-10-21-case-study-four-design.md`, `docs/superpowers/plans/2026-10-20-macro-plan.md` (the `3B cs4` Status row only)
- Create (if any crops are referenced from docs): `docs/superpowers/plans/2026-10-21-case-study-four/*.png`. Never link docs into `.superpowers/`, which is deleted at the end.

**Interfaces:**
- Consumes: the finished page, Task 1's baselines and image byte total.

- [ ] **Step 1: Whole-page compare against Figma**

```bash
S=.superpowers/sdd/2026-10-21-case-study-four
node $S/shoot.mjs http://localhost:4391/work/designing-an-interactive-workbook/ $S/shots/final
```

Resize `shots/final/full.png` to 570px wide with `sharp` and read it beside `docs/figma/case-study-4-desktop/screenshot-2026-10-20.png` (570 × 2400, frame 1920 × 8096). Expected: the same section order and proportions; the full shot's height is within about 2% of 8096px. List any visible difference as fixed or as drift (with the reason) for the summary.

- [ ] **Step 2: The other pages changed only where expected**

```bash
for p in streamlining-scoring consolidating-import-collections sales-workflow-research; do node $S/shoot.mjs http://localhost:4391/work/$p/ $S/shots/after-$p; done
node $S/shoot.mjs http://localhost:4391/ $S/shots/after-home
for d in streamlining-scoring consolidating-import-collections sales-workflow-research home; do
  for f in $S/shots/before-$d/*.png; do node $S/diff.mjs "$f" "$S/shots/after-$d/$(basename "$f")" >/dev/null || echo "DIFF $d $(basename "$f")"; done
done
```

Expected: the only `DIFF` lines are each case study's read-more section and `full.png`, plus the home page's card section and `full.png` (the TRANSEARCH title and skills, and "Absa Banking"). If the sub-nav row flakes (see `IGNORE_ROWS` in `diff.mjs`), re-run that diff with `IGNORE_ROWS=170-172`. Anything else is a regression: stop and investigate.

- [ ] **Step 3: Keyboard, no-JS and reduced motion**

```bash
node $S/shoot.mjs http://localhost:4391/work/designing-an-interactive-workbook/ $S/shots/focus --tab=40
node $S/shoot.mjs http://localhost:4391/work/designing-an-interactive-workbook/ $S/shots/nojs --nojs
node $S/shoot.mjs http://localhost:4391/work/designing-an-interactive-workbook/ $S/shots/reduced --reduced-motion
```

Expected: `focus.txt` runs skip link → nav → sub-nav links (6) → the TRANSEARCH International tip trigger → the Read More cards, with no stray stops on images. The no-JS full shot shows every section. Stop the server.

- [ ] **Step 4: Open questions (temporary IDs)**

In `docs/questions.md`, add two summary rows after Q-026 (keep the table's columns):

```markdown
| Q-cs4-1 | TRANSEARCH: "interactive book" on the card, "interactive workbook" on the page | Nothing; built as the designs have it |
| Q-cs4-2 | TRANSEARCH International: confirm the drafted definition | Nothing; drafted text is live, marked for review |
```

And two full entries, after the last existing entry:

```markdown
### Q-cs4-1 · Cass: "interactive book" or "interactive workbook" for TRANSEARCH
- **Raised:** 2026-10-21 (stream `cs4`)
- **Blocks:** nothing; built as the designs have it
- **Context:** The landing card (`267:1911`) titles TRANSEARCH "Designing an interactive book". The case study frame (`144:269`), confirmed current by Reece on 2026-10-21, says "interactive workbook" in its title and throughout its copy. By Reece's call, the card data (`case-studies.json`, which also sets the page's `<title>`) follows the landing card (D-052), and the page heading and copy follow the frame. The slug stays `designing-an-interactive-workbook`.
- **Options:** keep both (the default) · "book" everywhere, with a copy change to the page · "workbook" everywhere, overriding the landing card's title.

### Q-cs4-2 · Cass: the TRANSEARCH International definition
- **Raised:** 2026-10-21 (stream `cs4`)
- **Blocks:** nothing; drafted text is live, marked `TODO(cass)`
- **Context:** The CS4 intro styles "TRANSEARCH International" like the other pages' Definition Tip triggers, but Figma has no definition text for it (CS1–3 each had one). Reece chose to draft one: "A global executive search and leadership consulting firm."
- **Options:** Cass confirms it · Cass gives her own wording.
```

Add to the Q-018 entry, after its last update:

```markdown
- **Update (2026-10-21, stream `cs4`):** Reece: in-repo now, off-repo later. CS4's 14 images were committed under `src/assets/case-studies/designing-an-interactive-workbook/`, downscaled to 2× their rendered width (<TOTAL> bytes). The move off-repo is still wanted, so this stays open.
```

Replace `<TOTAL>` with Task 1's number.

- [ ] **Step 5: Test plan**

Under `## TRANSEARCH case study` in `docs/test-plan.md`, replace the placeholder comment with:

```markdown
- [ ] At 1920px, the page matches the TRANSEARCH frame (`docs/figma/case-study-4-desktop/screenshot-2026-10-20.png`) section by section.
- [ ] The intro image runs to the right edge of the window, with square right-hand corners.
- [ ] Hovering, focusing or tapping "TRANSEARCH International" opens its definition; Escape closes it.
- [ ] Each sub nav link (Project Overview, Business Needs, Research, User Journeys, Design, Handover) jumps to its section, and the underline follows as you scroll.
- [ ] The white wireframing band sits flush under the purple user journeys panel.
- [ ] The phone image overlaps the tablet in Responsive design, and the caption isn't covered.
- [ ] Other case studies shows Absa, Standard Bank and MiX Telematics, not TRANSEARCH.
- [ ] On the home page and in Other case studies, TRANSEARCH's card says "Designing an interactive book" with UI Design | Interaction Design | Typography, and Absa's badge says "Absa Banking".
```

- [ ] **Step 6: Architecture, log, spec and status**

- `docs/architecture.md`: in the built table, add a row after the `sales-workflow-research.astro` row:
  `| `src/pages/work/designing-an-interactive-workbook.astro` | The fourth case study page (TRANSEARCH): the shared components plus page markup for the book cover, the app icons, the White "future state" notes, the White wireframing band, the typography reference grid, the three feature rows and the overlapping tablet and phone figure. |`
  Delete the planned `src/pages/work/<id>.astro` row. In the Status line, change "three case study pages are built end to end" to "four case study pages are built end to end" and add `` `/work/designing-an-interactive-workbook` (TRANSEARCH) `` to its list.
- `docs/wiki/log.md`: append

  ```markdown
  ## [2026-10-21] update | Case study 4 (TRANSEARCH) built
  Stream `cs4`: `/work/designing-an-interactive-workbook` from the 2026-10-20 snapshot, no Figma calls. `case-studies.json` follows the landing cards (D-052). Images in-repo (Q-018 updated, still open). Opened Q-cs4-1 (book vs workbook) and Q-cs4-2 (drafted definition).
  ```

- The spec: only if something changed during the build that it doesn't already describe.
- The macro plan's `3B cs4` Status row: set State to **Built, not merged**, and Notes to the commit range, the image total, Q-cs4-1 and Q-cs4-2, and "Finishing (numbering, token fold, PR) waits until `fixes` has merged".

- [ ] **Step 7: Check and commit**

```bash
npm run build && npm run check && npm run format:check
git add docs/questions.md docs/test-plan.md docs/wiki/log.md docs/architecture.md docs/superpowers/specs/2026-10-21-case-study-four-design.md docs/superpowers/plans/2026-10-20-macro-plan.md
git commit -m "docs(cs4): record the TRANSEARCH build, Q-cs4-1 and Q-cs4-2" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 8: Report**

Summarise for Reece: what was built, the image byte total, the drift list from Step 1, the regression check from Step 2, and that the finishing steps (temporary IDs to real numbers, folding the token block, the PR) are waiting on his go-ahead after `fixes` merges.
