# Home page POC (desktop): design

- **Date:** 2026-09-16
- **Status:** Approved in brainstorming, awaiting spec review
- **Branch:** `reece/feature/mvp`
- **Figma source:** saved snapshots in [`docs/figma/`](../../figma/README.md), mainly [`landing-desktop-hover/context.md`](../../figma/landing-desktop-hover/context.md), [`components/navigation/context.md`](../../figma/components/navigation/context.md), [`components/case-study-card/context.md`](../../figma/components/case-study-card/context.md) and [`tokens.md`](../../figma/tokens.md). **No Figma calls are needed.**

## Goal

Scaffold the Astro project and build the desktop home page as a proof of concept: the navigation, the hero headline and intro, and three case study cards, all with the designed hover, selected and focus states. It should match Figma at 1920px, stay usable at desktop widths down to about 1200px, and meet the accessibility baseline (architecture invariant 5). It should have no client-side JS.

## Out of scope

- Tablet and phone layouts (Figma frames `19:327`, `19:328`, `19:665`).
- Any page other than `/`. Nav and card links point to planned routes that will 404 for now.
- Case study pages, the About, Contact and Work pages, and the resume.
- A token pipeline (Q-005 stays open), SEO (D-004), monitoring (D-010), deployment (Q-009), and accessibility or performance automation beyond the checks below (Q-006).
- Animation and transitions. None are designed.

## Decisions made during brainstorming

These get recorded in `docs/decisions.md` when the work is done (see [Docs to update](#docs-to-update)).

| Topic | Decision |
|---|---|
| Styling (Q-004) | Plain CSS: Astro scoped styles on top of token custom properties. |
| Figma plan (Q-007) | Professional plan, Full seat (confirmed with `whoami`). |
| Tokens (Q-005, POC only) | `src/styles/tokens.css` is written by hand from the saved snapshots. Q-005 stays open for a real pipeline. |
| Case studies (supersedes D-003) | Each case study is a bespoke `.astro` page, with no shared MDX template. Card metadata (the text shown on a card) lives in a JSON data collection. |
| CMS (Q-003) | None. The content isn't meant to be abstracted into a CMS. |
| Checks (part of Q-006) | Scaffold with `astro check`, `astro build` and Prettier (with the Astro plugin). The accessibility, performance and lint tooling is still open. |
| Width behaviour | At about 1880px and wider, the exact Figma composition, centred and capped at 1920px. Below that, a stacked desktop layout that isn't in the designs yet (a new question for Cass). |
| Nav | Adds a **Home** item, which isn't in the design. The current page gets the **Selected** pill; **hover** shows the dot (per the Figma annotations, confirmed by the user). |
| Card caption font | Inter. Cass updated the Figma file on 2026-09-16; the snapshot still says Roboto. |

## Stack and scaffold

- **Astro 7** (7.3.3 at time of writing), strict TypeScript, static output, and no adapter.
- **Node 24 LTS**, pinned with `.nvmrc` and `"engines"` in `package.json`. Astro 7 needs Node 22.12 or later. **Prerequisite (user):** the dev machine has v22.11.0, so install Node 24 before scaffolding.
- **Scaffold** from Astro's `minimal` template into the existing repo root, keeping the docs, `AGENTS.md`, `.mcp.json` and the `CLAUDE.md` symlink untouched.
- **Fonts:** Astro's built-in Fonts API (`fonts` in `astro.config.mjs`, with `fontProviders.fontsource()`) for Inter at weights 400, 700 and 900, `normal` style, `latin` subset. `<Font cssVariable="--font-inter" preload />` goes in the layout's `<head>`. Astro downloads the files, serves them from our own domain, and generates fallback font metrics. The first build needs network access. (Changed 2026-09-16 from the `@fontsource-variable/inter` package, with the user's approval, after finding the built-in API while planning.)
- **New dev dependencies:**
  - `prettier` and `prettier-plugin-astro`.
  - `@astrojs/check` and `typescript` (6.x, because `@astrojs/check` 0.9 doesn't support TypeScript 7), which `astro check` needs.
- **npm scripts:** `dev`, `build`, `preview`, `check` (`astro check`), `format` (`prettier --write .`) and `format:check` (`prettier --check .`). Prettier ignores `docs/figma/` (tool output must stay unedited) and `docs/raw/`.

## File map

| Path | Responsibility |
|---|---|
| `src/styles/tokens.css` | Every design value as a custom property on `:root`. A header comment names the source (`docs/figma/tokens.md` and the component snapshots) and says it's written by hand until Q-005 is settled. |
| `src/styles/global.css` | A minimal reset, base `body` (Off-white background, Inter, body type), the shared `:focus-visible` style, and the `.visually-hidden` and skip-link styles. Uses tokens only. |
| `src/layouts/BaseLayout.astro` | `<html lang="en-GB">`, `<head>` (charset, viewport, `<title>` from a prop, `<Font />`), global CSS, the skip link to `#main`, `<header>` with `SiteNav`, and `<main id="main">` with a slot. |
| `src/components/SiteNav.astro` | The brand and nav list. Takes the current path and sets `aria-current="page"` on the matching item. |
| `src/components/CaseStudyCard.astro` | One card, rendered from a collection entry. |
| `src/content.config.ts` | Defines the `caseStudies` collection with the `file()` loader and a Zod schema. |
| `src/content/case-studies.json` | Three entries (below). |
| `src/pages/index.astro` | The home page: the hero composition and the card list, sorted by `order`. |
| `src/assets/*.svg` | `flower.svg`, `arrow-default.svg`, `arrow-hover.svg`, `corner-top-right.svg` and `corner-bottom-left.svg`, copied from `docs/figma/components/`. Imported as Astro SVG components. Hard-coded fills are replaced with `currentColor` or token-driven values where a colour is set from CSS. |

## Tokens

Values come from the snapshots. Type and spacing are in `rem` (1rem = 16px) so they respect browser zoom and font-size settings. Letter spacing is in `em`, because Figma's letter spacing is a percentage of the font size.

**Colour**

| Token | Value | Figma |
|---|---|---|
| `--color-purple` | `#4832A1` | Purple |
| `--color-red` | `#CD2B2B` | Red |
| `--color-off-white` | `#F8F9FF` | Off-white |
| `--color-white` | `#FFFFFF` | White |
| `--color-grey` | `#6B6B6B` | Grey |
| `--color-light-purple` | `#C4CDF4` | Light purple |
| `--color-black` | `#000000` | Headline fill (not a Figma variable) |

**Type.** Each style has `-size`, `-line-height`, `-letter-spacing` and `-weight` tokens.

| Style | Size | Line height | Letter spacing | Weight | Used by |
|---|---|---|---|---|---|
| `title` | 100px, fluid (see [Layout](#layout)) | 0.98 (98px) | −0.04em | 900 | Hero headline |
| `subtitle` | 20px | 1.35 (27px) | −0.04em | 400, emphasis 700 | Hero intro |
| `h1` (Figma name) → `--type-card-title-*` | 30px | 0.98 | −0.02em | 700 | Card title |
| `body` | 16px | 1.48 | −0.011em | 400 | Card summary |
| `caption` | 12px | 1.5 | −0.011em | 700 | Card skills |
| `brand` | 27px | 1.48 | −0.011em | 900 | Nav name |
| `nav` | 17px | 1.5 | −0.011em | 700 | Nav items |

The Figma style called "H1" is the card title, not the page's `<h1>`, so its token is named `card-title` to avoid confusion.

**Space, size and radius** (desktop values at 1920px)

| Token | Value | Source |
|---|---|---|
| `--page-max-width` | 1920px | Frame width |
| `--space-gutter` | 110px, fluid | Nav and content inset |
| `--space-nav-block` | 25px | Nav padding (90px bar) |
| `--space-nav-gap` | 43px | Gap between nav items |
| `--space-nav-pill-inline` / `-block` | 23.5px / 12px | Selected pill (91×50 around "Work") |
| `--space-hero-top` | 186px, fluid | Nav bottom to card top (276 − 90) |
| `--space-card-padding` | 30px | Card |
| `--space-card-stack` | 22px | Gap inside card |
| `--space-card-row-gap` | 15px | Between cards |
| `--size-card-width` / `-min-height` | 343px / 373px | Card |
| `--size-flower` | 90px, scales with title | Hero flower |
| `--size-hero-pill-width` / `-height` | 269px / 72px, scale with title | Hero pill |
| `--size-arrow` | 50px | Card arrow |
| `--size-nav-dot` | 10px | Nav hover dot |
| `--radius-card` | 25px | Card |
| `--radius-pill` | 54px | Nav pill, hero pill |

"Fluid" values scale linearly with the viewport between 1200px and 1920px, using `clamp()`, and hold at each end:

| Token | At 1200px | At 1920px |
|---|---|---|
| `--type-title-size` | 72px | 100px |
| `--space-gutter` | 48px | 110px |
| `--space-hero-top` | 96px | 186px |

The flower and hero pill sizes are in `em`, relative to the title size, so they scale with it.

## Components

### SiteNav

- **Markup:** `<nav aria-label="Main">`, containing the brand ("cassandra garratt", linking to `/`) and a `<ul>` of links: Home `/`, Work `/work`, About `/about`, Resume `/resume` (a placeholder until its target is decided, see [New open questions](#new-open-questions)), Contact `/contact`.
- **Bar:** Purple, full width, content inset by `--space-gutter` and capped at `--page-max-width`. Brand on the left, items on the right.
- **States:**
  - **Default:** item text White.
  - **Hover:** item text Light purple, with a 10px Light purple dot centred below the text, drawn by CSS as a pseudo-element with `--radius-pill`. The Figma dot SVG isn't used.
  - **Selected** (`aria-current="page"`): Light purple pill (`--radius-pill`) behind the item, with Purple text. The selected item doesn't show the dot on hover.
  - **Focus:** `:focus-visible` uses the shared focus style, plus the hover treatment.

### CaseStudyCard

- **Props:** a `caseStudies` entry (`id`, `title`, `skills`, `summary`).
- **Markup:** `<article>` inside an `<li>`:
  - `<h2><a href="/work/{id}">{title}</a></h2>`. The link's `::after` stretches over the whole card, so the entire card is clickable while screen readers hear a single link named by the title.
  - `<ul class="skills">`, one `<li>` per skill. The `|` separators are drawn by CSS with `content: "|" / ""`, so screen readers skip them.
  - `<p>{summary}</p>`.
  - Arrow: both SVGs (`aria-hidden="true"`), with CSS showing one at a time, pushed to the bottom right.
  - The two corner strokes (`aria-hidden="true"`), shown only in the hover state.
- **Default:** White background, Purple title and skills, Grey summary, the Light purple arrow.
- **Hover** (the Figma variant called "Variant2"), triggered by `:hover` **and** `:focus-within`: Purple background, Off-white title and summary, White skills, the red flower arrow, and the corner strokes (top-right 85×37 at 237, 18.5; bottom-left 61×28 at 18, 326.5, rotated 180°).
- **Focus:** the focus ring goes around the whole card, using `article:has(a:focus-visible)`, not around the title text.

## Content collection

`src/content.config.ts`:

```ts
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: file('src/content/case-studies.json'),
  schema: z.object({
    title: z.string(),
    skills: z.array(z.string()).min(1),
    summary: z.string(),
    order: z.number().int(),
  }),
});

export const collections = { caseStudies };
```

`src/content/case-studies.json` holds three entries. The `id`s are the planned `/work/<id>` slugs; the text is from [landing-desktop-hover/context.md](../../figma/landing-desktop-hover/context.md#notes).

| `id` | `title` | `skills` | `order` |
|---|---|---|---|
| `streamlining-scoring` | Streamlining scoring for multiple products | User Research, Process Design, Systems Thinking | 1 |
| `consolidating-import-collections` | Consolidating import collections | User Research, Workshops, Usability Testing | 2 |
| `sales-workflow-research` | Using research to build a better sales workflow | User Research, Workshops, Journey Mapping | 3 |

Import paths checked against the Astro 7.3.3 package: `z` comes from `astro/zod`, because importing it from `astro:content` is deprecated.

## Layout

### Page

- `<main>` is centred, capped at `--page-max-width`, with `--space-gutter` side padding and `--space-hero-top` above the hero.
- `<h1>` is the headline "effective & empathetic design". It's the only `h1`; card titles are `h2`.

### Hero at 1880px and wider: CSS Grid with overlapping areas

- The hero is a grid with **a single cell**, and every child is placed in it (`grid-area: 1 / 1`). The children overlap, and the grid grows to fit the tallest one, so the page flow below still works. (Refined while planning: one shared cell needs fewer magic numbers than two columns.)
- The **card row** (`<ul>`, flex, `--space-card-row-gap`) uses `justify-self: end`, so it sits against the right gutter.
- The **titles block** (headline plus intro) is pushed down by `2.89 ×` the title size: 289px at 1920, matching Figma (565 − 276). Its first line sits beside the cards, and the next two lines fall below them.
- **Headline lines** are three `display: block` spans, so the breaks match Figma:
  1. The flower (`aria-hidden`, `--size-flower`, inline, with a small gap), then "effective &".
  2. "empathetic", then the Purple hero pill (`aria-hidden`, inline-block, `--radius-pill`).
  3. "design".
- **Intro paragraph:** 442px wide, sitting beside the "design" line. The titles block is itself a single-cell grid; the intro is offset by `3.81 ×` the title size from the left (381px) and `2.23 ×` from the top (223px), so it keeps its place when the title scales. "inclusive technology" and "user advocacy" are wrapped in `<strong>`.

### Below 1880px: stacked desktop layout (not designed)

- The headline and intro form one block at the top: the headline on the left, the intro keeping its offset below it.
- The card row sits below, left-aligned with the gutter. Cards keep their size and wrap if the row doesn't fit, so there's never a horizontal scrollbar.
- The fluid tokens (title, gutter, top space) scale between about 1200px and 1920px.
- 1880px is an estimate of where the overlapping layout stops fitting. Confirm it in the browser, and set the breakpoint to the width where the first headline line would touch the cards.
- Below about 1200px, nothing is designed. The only requirement is no horizontal scroll and no overlapping content.

## Accessibility

- A skip link, the landmarks (`header`, `nav`, `main`), one `h1`, and card `h2`s.
- Every interactive state is available by keyboard: nav hover styling on `:focus-visible`, and card hover styling on `:focus-within`.
- A visible focus ring on every link, with at least 3:1 contrast against its background (checked on both Off-white and Purple).
- Decorative SVGs (flower, pill, arrows, corners, dot) are `aria-hidden="true"`, and the SVG components aren't focusable.
- **Contrast** (to be confirmed with a checker during the build):
  - Grey `#6B6B6B` on White: about 5.3:1.
  - Light purple on Purple: about 6.0:1.
  - Purple on Light purple, White on Purple and Off-white on Purple: all well above 4.5:1.
- The layout holds at 200% zoom: no lost content and no overlap. It may reflow into the stacked layout.

## Verification

Run on the finished branch, and show the output before claiming it's done:

1. `npm run build` succeeds.
2. `npm run check` (`astro check`) reports 0 errors.
3. `npm run format:check` passes.
4. **Visual check at 1920×1080:** the dev server compared with `docs/figma/landing-desktop/screenshot.png` (rest state) and `landing-desktop-hover/screenshot.png` (hovering the first card and "Work"). The method for screenshotting the dev server (a one-off headless browser, or the user's own browser) is agreed when this step comes. It doesn't add a project dependency.
5. **Widths:** check 1440 and 1280. Stacked layout, no horizontal scroll, nothing overlapping.
6. **Keyboard:**
   - Tab order is skip link → brand → nav items → cards.
   - Focus is visible everywhere.
   - A focused card shows the hover styling.
   - The skip link moves focus to `main`.
7. **Zero client JS:** the built `dist/index.html` has no `<script>` tags.

## Docs to update

Update these at the end of the session, per the user's preference:

- **`docs/decisions.md`:**
  - New entries: plain CSS (resolves Q-004); Figma Professional plan with a Full seat (resolves Q-007); case studies as bespoke pages plus a JSON data collection (supersedes D-003); no CMS (resolves Q-003); hand-written tokens for the POC; the Home nav item; Node 24 LTS.
  - Set D-003's status to "Superseded".
- **`docs/questions.md`:** remove Q-003, Q-004 and Q-007. Update Q-005 (a hand-written file exists for now) and Q-006 (the baseline and Prettier are in place). Add the new questions below.
- **`docs/architecture.md`:** status, the code map (actual paths), the overview diagram (no MDX template), and invariant 4 (card data lives in the collection, and case study pages are bespoke).
- **`AGENTS.md`:** status, commands (confirmed scripts), prerequisites (Node 24), and the repo layout (`src/content/` holds a JSON collection, not MDX).
- **`docs/wiki/`:**
  - `figma-mcp.md`: sign-in in VS Code, annotations arrive as `data-annotations`, screenshots are URLs, `get_design_context` on a component set covers nested sets, and 9 calls for this screen.
  - A new `design-tokens.md`.
  - `log.md` and `index.md`.
- **`docs/figma/`:** a note in `components/case-study-card/context.md` that the caption font is now Inter in Figma.

## New open questions

- **Stacked layout below about 1880px:** Cass to design, or approve, how the home page looks at common laptop widths (1280–1536).
- **Resume link:** a PDF in `public/`, a page, or an external link?
- **Brand link:** the brand linking to `/` duplicates the Home item. Keep both, or make the brand plain text?
