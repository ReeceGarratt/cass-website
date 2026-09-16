# Home page POC (desktop) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Astro 7 project and build the desktop home page (nav, hero headline and intro, three case study cards, with hover, selected and focus states) from the saved Figma snapshots.

**Architecture:** Static Astro site with no client JS. Every design value is a CSS custom property in a hand-written `tokens.css`. The layout (`BaseLayout`) holds the head, fonts, skip link and nav. Card text comes from a JSON content collection. The hero stacks its children in one grid cell at 1880px and wider to reproduce the Figma composition, and falls back to a stacked flex column below that.

**Tech Stack:** Astro 7.3.x, TypeScript (strict, 6.x for `@astrojs/check`), plain CSS with Astro scoped styles, Astro Fonts API (Fontsource provider, Inter), Prettier with `prettier-plugin-astro`, Node 24 LTS. For verification only (not a project dependency): Playwright 1.63 driving the installed Microsoft Edge.

**Spec:** [`docs/superpowers/specs/2026-09-16-home-page-poc-design.md`](../specs/2026-09-16-home-page-poc-design.md)

## Global Constraints

- Node: `.nvmrc` = `24`, `package.json` `"engines": { "node": ">=24" }`. The dev machine has v24.21.0.
- Astro `^7.3.3`, static output, **no adapter**, no UI framework integrations, **no client-side `<script>`**.
- **No hard-coded design values in components or pages.** Colour, type, spacing, size and radius come from `var(--…)` tokens defined in `src/styles/tokens.css` (architecture invariant 1). The only literal values allowed outside `tokens.css` are `0`, `100%`, `50%`, `-50%`, `1 / 1` grid placement, `180deg`, and the media query `117.5rem` (media queries can't read custom properties).
- Fonts: Inter only, weights 400, 700 and 900, loaded with the Astro Fonts API (`--font-inter`). There's no `@fontsource-*` package and no Google Fonts `<link>`.
- `z` is imported from `'astro/zod'`, never from `'astro:content'` (deprecated in Astro 7).
- Copy is exact, including case: the brand is `cassandra garratt` and the headline is `effective & empathetic design`.
- Nav semantics: the **Selected** pill is shown for `aria-current="page"`, and the **Hover** dot on `:hover` and `:focus-visible`. Items in order: Home `/`, Work `/work`, About `/about`, Resume `/resume`, Contact `/contact`.
- Accessibility: `lang="en-GB"`, a skip link, landmarks, one `<h1>`, card titles in `<h2>`, decorative SVGs and shapes `aria-hidden="true"`, visible focus everywhere, and card hover styling also on `:focus-within`.
- Tool output in `docs/figma/` must stay unedited (D-008). Copy SVGs out of it; never modify the originals.
- **Commits:** the user approved one commit per task (2026-09-16), so run every "Commit" step. **Never push**: pushing needs the user's approval each time (AGENTS.md). Branch: `reece/feature/mvp`. Conventional Commits, imperative, 72 characters max, ending with the attribution line `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- **Figma MCP:** not needed. Don't call it.

## File structure

| File | Task | Responsibility |
|---|---|---|
| `package.json`, `package-lock.json` | 1 | Scripts, dependencies, engines |
| `.nvmrc` | 1 | Node version pin |
| `astro.config.mjs` | 1 | Astro config, including the Inter font family |
| `tsconfig.json` | 1 | Strict TypeScript |
| `.gitignore` | 1 | Build output, generated types, dependencies |
| `.prettierrc.json`, `.prettierignore` | 1 | Formatting |
| `src/styles/tokens.css` | 2 | All design tokens (hand-written, POC) |
| `src/styles/global.css` | 2 | Reset, base body, focus ring, skip link |
| `src/layouts/BaseLayout.astro` | 2, modified in 3 | Document shell, font, skip link, header, main |
| `src/components/SiteNav.astro` | 3 | Brand and nav list with selected and hover states |
| `src/content.config.ts` | 4 | `caseStudies` collection schema |
| `src/content/case-studies.json` | 4 | Card metadata for the three case studies |
| `src/assets/flower.svg`, `arrow-default.svg`, `arrow-hover.svg`, `corner-top-right.svg`, `corner-bottom-left.svg` | 4 | Decorative SVGs, recoloured through `currentColor` or tokens |
| `src/components/CaseStudyCard.astro` | 4 | One card with default, hover and focus states |
| `src/pages/index.astro` | 1 (placeholder), 2, 3, 4, 5 | The home page |

Verification helper (not in the repo): `<scratchpad>/visual-check/check.mjs`, where `<scratchpad>` is the session scratchpad directory given in the system prompt. If there isn't one, use `$TEMP/cass-visual-check`.

---

### Task 1: Scaffold the Astro project and tooling

**Files:**
- Create: `package.json`, `.nvmrc`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.prettierrc.json`, `.prettierignore`, `src/pages/index.astro`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - npm scripts `dev`, `build`, `preview`, `check`, `format` and `format:check`.
  - A font family registered with `cssVariable: '--font-inter'` (used by `<Font />` in Task 2).
  - The `@/`-free import style: relative imports only.

- [ ] **Step 1: Confirm the starting state**

Run:
```bash
node -v && git branch --show-current && ls -a
```
Expected: a `v24.x` Node version and branch `reece/feature/mvp`. There's no `package.json` or `src/`; the existing files are `.git`, `.mcp.json`, `AGENTS.md`, `CLAUDE.md`, `README.md` and `docs`. If Node isn't 24 or the branch is wrong, stop and tell the user.

- [ ] **Step 2: Write the failing check**

Run:
```bash
npm run build
```
Expected: FAIL with `ENOENT` / `Could not read package.json`.

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "cass-website",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "engines": {
    "node": ">=24"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "astro": "astro"
  },
  "allowScripts": {
    "esbuild": true
  }
}
```

- [ ] **Step 4: Create `.nvmrc`**

```
24
```

- [ ] **Step 5: Create `astro.config.mjs`**

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
      weights: [400, 700, 900],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
});
```

- [ ] **Step 6: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 7: Create `.gitignore`**

```gitignore
# build output
dist/
# generated types
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*

# environment variables
.env
.env.production

# macOS-specific files
.DS_Store

# jetbrains setting folder
.idea/
```

- [ ] **Step 8: Create `.prettierrc.json`**

```json
{
  "plugins": ["prettier-plugin-astro"],
  "singleQuote": true,
  "overrides": [
    {
      "files": "*.astro",
      "options": { "parser": "astro" }
    }
  ]
}
```

- [ ] **Step 9: Create `.prettierignore`**

```gitignore
dist/
.astro/
node_modules/
package-lock.json
# Markdown docs are hand-formatted (tables); reformatting them would churn every doc.
**/*.md
# Saved Figma MCP output must stay unedited (D-008).
docs/figma/
```

- [ ] **Step 10: Create a placeholder `src/pages/index.astro`**

This is replaced in Task 2. It exists so the build has a page.

```astro
---

---

<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>cassandra garratt</title>
  </head>
  <body>
    <p>Scaffold</p>
  </body>
</html>
```

- [ ] **Step 11: Install dependencies**

Run:
```bash
npm install astro@^7.3.3 && npm install -D @astrojs/check@^0.9.10 typescript@^6 prettier@^3.9.7 prettier-plugin-astro@^1.0.0
```
Expected: exit 0. `package.json` now has `dependencies.astro` and the four dev dependencies. If npm reports a peer-dependency conflict for `typescript`, stop and report it; don't pass `--force` or `--legacy-peer-deps`.

- [ ] **Step 12: Format, then run all checks**

Run:
```bash
npm run format && npm run format:check && npm run check && npm run build
```
Expected:
- `format:check` says `All matched files use Prettier code style!`
- `check` reports `0 errors`
- `build` ends with `1 page(s) built` and `Complete!`. The first build downloads Inter from Fontsource, which needs network access.

Then run `git status --short` and confirm that no `.md` file and nothing under `docs/` was modified by `format`.

- [ ] **Step 13: Commit **

```bash
git add package.json package-lock.json .nvmrc astro.config.mjs tsconfig.json .gitignore .prettierrc.json .prettierignore src/pages/index.astro
git commit -m "chore: scaffold Astro 7 project with Prettier and astro check" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 2: Tokens, global styles and base layout

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro` (replace the placeholder)

**Interfaces:**
- Consumes: `--font-inter` from Task 1.
- Produces:
  - Every token below, by exact name.
  - `BaseLayout` with prop `title: string` and a default slot rendered inside `<main id="main">`.
  - The `.visually-hidden` utility class.

- [ ] **Step 1: Write the failing check**

Run:
```bash
npm run build && grep -c 'Skip to content' dist/index.html
```
Expected: FAIL (grep prints `0` and exits 1).

- [ ] **Step 2: Create `src/styles/tokens.css`**

```css
/*
 * Design tokens: hand-written for the home page POC.
 *
 * Source: docs/figma/tokens.md (Figma variables) and the component snapshots in
 * docs/figma/components/ and docs/figma/landing-desktop-hover/. Values were
 * measured on the 1920px desktop frames. Fluid values scale linearly between a
 * 1200px and a 1920px viewport.
 *
 * Written by hand until a token pipeline is chosen (Q-005). When Figma
 * changes, update this file to match.
 *
 * Overlap layout breakpoint: 117.5rem (1880px). Media queries can't read
 * custom properties, so that value is repeated in src/pages/index.astro.
 */

:root {
  /* Colour: Figma variables */
  --color-purple: #4832a1;
  --color-red: #cd2b2b;
  --color-off-white: #f8f9ff;
  --color-white: #ffffff;
  --color-grey: #6b6b6b;
  --color-light-purple: #c4cdf4;
  /* Colour: fills in the design that aren't Figma variables */
  --color-black: #000000; /* hero headline */
  --color-icon: #1c1b1f; /* arrow glyph on the default card arrow */

  /* Font family (registered in astro.config.mjs) */
  --font-family-base: var(--font-inter);

  /* Type: Title (hero headline), fluid 72px → 100px */
  --type-title-size: clamp(4.5rem, 1.5833rem + 3.8889vw, 6.25rem);
  --type-title-line-height: 0.98;
  --type-title-letter-spacing: -0.04em;
  --type-title-weight: 900;

  /* Type: Sub Title (hero intro) */
  --type-subtitle-size: 1.25rem;
  --type-subtitle-line-height: 1.35;
  --type-subtitle-letter-spacing: -0.04em;
  --type-subtitle-weight: 400;
  --type-subtitle-emphasis-weight: 700;

  /* Type: card title (the Figma style is called "H1") */
  --type-card-title-size: 1.875rem;
  --type-card-title-line-height: 0.98;
  --type-card-title-letter-spacing: -0.02em;
  --type-card-title-weight: 700;

  /* Type: Body copy */
  --type-body-size: 1rem;
  --type-body-line-height: 1.48;
  --type-body-letter-spacing: -0.011em;
  --type-body-weight: 400;

  /* Type: Caption Text (card skills) */
  --type-caption-size: 0.75rem;
  --type-caption-line-height: 1.5;
  --type-caption-letter-spacing: -0.011em;
  --type-caption-weight: 700;

  /* Type: nav brand */
  --type-brand-size: 1.6875rem;
  --type-brand-line-height: 1.48;
  --type-brand-letter-spacing: -0.011em;
  --type-brand-weight: 900;

  /* Type: nav items */
  --type-nav-size: 1.0625rem;
  --type-nav-line-height: 1.5;
  --type-nav-letter-spacing: -0.011em;
  --type-nav-weight: 700;

  /* Page */
  --page-max-width: 120rem; /* 1920px */

  /* Space */
  --space-gutter: clamp(3rem, -3.4583rem + 8.6111vw, 6.875rem); /* 48 → 110px */
  --space-hero-top: clamp(6rem, -3.375rem + 12.5vw, 11.625rem); /* 96 → 186px */
  --space-hero-stack-gap: 4rem; /* stacked layout only; not designed (see spec) */
  --space-nav-block: 1.5625rem; /* 25px */
  --space-nav-gap: 2.6875rem; /* 43px */
  --space-nav-pill-inline: 1.46875rem; /* 23.5px */
  --space-nav-pill-block: 0.75rem; /* 12px */
  --space-card-padding: 1.875rem; /* 30px */
  --space-card-stack: 1.375rem; /* 22px */
  --space-card-row-gap: 0.9375rem; /* 15px */
  --space-skill-separator: 0.5em; /* the two spaces either side of "|" */
  --space-skip-link-inset: 1rem;
  --space-skip-link-padding-block: 0.75rem;
  --space-skip-link-padding-inline: 1rem;

  /* Size */
  --size-card-width: 21.4375rem; /* 343px */
  --size-card-title-width: 17rem; /* 272px */
  --size-card-title-height: 5.1875rem; /* 83px, fixed in Figma so captions align */
  --size-card-summary-min-height: 6rem; /* 96px */
  --size-arrow: 3.125rem; /* 50px */
  --size-nav-dot: 0.625rem; /* 10px */
  --size-hero-intro-width: 27.625rem; /* 442px */

  /* Hero decoration and offsets, relative to the title size */
  --hero-flower-size: 0.9em; /* 90px at 100px */
  --hero-flower-offset-top: 0.06em;
  --hero-flower-gap: 0.08em;
  --hero-pill-width: 2.69em; /* 269px */
  --hero-pill-height: 0.72em; /* 72px */
  --hero-pill-offset-top: 0.2em;
  --hero-pill-gap: 0.12em;
  --hero-titles-offset-top: calc(var(--type-title-size) * 2.89); /* 289px */
  --hero-intro-offset-top: calc(var(--type-title-size) * 2.23); /* 223px */
  --hero-intro-offset-inline: calc(var(--type-title-size) * 3.81); /* 381px */

  /* Card hover corner strokes (SVG boxes include the 3px stroke overflow) */
  --card-corner-top-right-width: 5.5rem; /* 88px */
  --card-corner-top-right-height: 2.5rem; /* 40px */
  --card-corner-top-right-top: 1.0625rem; /* 17px */
  --card-corner-top-right-right: 1.21875rem; /* 19.5px */
  --card-corner-bottom-left-width: 4rem; /* 64px */
  --card-corner-bottom-left-height: 1.9375rem; /* 31px */
  --card-corner-bottom-left-bottom: 1.0625rem; /* 17px */
  --card-corner-bottom-left-left: 1.03125rem; /* 16.5px */

  /* Radius */
  --radius-card: 1.5625rem; /* 25px */
  --radius-pill: 3.375rem; /* 54px */

  /* Focus ring: inner colour shows on light backgrounds, outer on Purple */
  --focus-ring-width: 0.1875rem; /* 3px */
  --focus-ring-inner: var(--color-purple);
  --focus-ring-outer: var(--color-white);
}
```

- [ ] **Step 3: Create `src/styles/global.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  min-block-size: 100vh;
  background-color: var(--color-off-white);
  color: var(--color-black);
  font-family: var(--font-family-base);
  font-size: var(--type-body-size);
  font-weight: var(--type-body-weight);
  line-height: var(--type-body-line-height);
  letter-spacing: var(--type-body-letter-spacing);
  -webkit-font-smoothing: antialiased;
}

img,
svg {
  display: block;
  max-inline-size: 100%;
}

a {
  color: inherit;
}

:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-inner);
  outline-offset: 0;
  box-shadow: 0 0 0 calc(var(--focus-ring-width) * 2) var(--focus-ring-outer);
}

.visually-hidden {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.skip-link {
  position: absolute;
  inset-block-start: var(--space-skip-link-inset);
  inset-inline-start: var(--space-skip-link-inset);
  z-index: 1;
  padding-block: var(--space-skip-link-padding-block);
  padding-inline: var(--space-skip-link-padding-inline);
  background-color: var(--color-white);
  color: var(--color-purple);
  font-size: var(--type-nav-size);
  font-weight: var(--type-nav-weight);
  line-height: var(--type-nav-line-height);
  text-decoration: none;
  translate: 0 -200%;
}

.skip-link:focus {
  translate: 0 0;
}
```

Note: the literals `1px`, `50%`, `-200%`, `z-index: 1` and `2` (the ring multiplier) are mechanical, not design values.

- [ ] **Step 4: Create `src/layouts/BaseLayout.astro`**

```astro
---
import { Font } from 'astro:assets';
import '../styles/tokens.css';
import '../styles/global.css';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    <Font cssVariable="--font-inter" preload />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header"></header>
    <main id="main" class="site-main" tabindex="-1">
      <slot />
    </main>
  </body>
</html>

<style>
  .site-header {
    background-color: var(--color-purple);
  }

  .site-main {
    max-inline-size: var(--page-max-width);
    margin-inline: auto;
    padding-inline: var(--space-gutter);
  }

  .site-main:focus {
    outline: none;
    box-shadow: none;
  }
</style>
```

- [ ] **Step 5: Replace `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="cassandra garratt">
  <h1>effective &amp; empathetic design</h1>
</BaseLayout>
```

- [ ] **Step 6: Run the checks**

Run:
```bash
npm run format && npm run check && npm run build && grep -c 'Skip to content' dist/index.html && grep -c 'rel="preload"' dist/index.html && grep -c -- '--font-inter' dist/index.html && ! grep -q '<script' dist/index.html && echo "no scripts"
```
Expected:
- `check`: `0 errors`.
- `build`: `Complete!`.
- The three counts are each `1` or more.
- The last line prints `no scripts`.

- [ ] **Step 7: Commit **

```bash
git add src/styles/tokens.css src/styles/global.css src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat: add design tokens, global styles and base layout" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Site navigation

**Files:**
- Create: `src/components/SiteNav.astro`
- Modify: `src/layouts/BaseLayout.astro` (render `SiteNav` inside `<header>`)

**Interfaces:**
- Consumes: the tokens `--page-max-width`, `--space-gutter`, `--space-nav-*`, `--type-brand-*`, `--type-nav-*`, `--color-white`, `--color-purple`, `--color-light-purple`, `--size-nav-dot` and `--radius-pill`.
- Produces: `SiteNav` with prop `currentPath: string`. Links carry class `site-nav__link`, and the brand carries `site-nav__brand`. Task 5's visual check selects `a.site-nav__link[href="/work"]`.

- [ ] **Step 1: Write the failing check**

Run:
```bash
npm run build && grep -c 'aria-current="page"' dist/index.html
```
Expected: FAIL (`0`).

- [ ] **Step 2: Create `src/components/SiteNav.astro`**

```astro
---
interface Props {
  currentPath: string;
}

const { currentPath } = Astro.props;

const links = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

const current =
  currentPath.length > 1 ? currentPath.replace(/\/$/, '') : currentPath;

const isCurrent = (href: string) =>
  href === '/'
    ? current === '/'
    : current === href || current.startsWith(`${href}/`);
---

<nav class="site-nav" aria-label="Main">
  <a class="site-nav__brand" href="/">cassandra garratt</a>
  <ul class="site-nav__list" role="list">
    {
      links.map(({ label, href }) => (
        <li>
          <a
            class="site-nav__link"
            href={href}
            aria-current={isCurrent(href) ? 'page' : undefined}
          >
            {label}
          </a>
        </li>
      ))
    }
  </ul>
</nav>

<style>
  .site-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-inline-size: var(--page-max-width);
    margin-inline: auto;
    padding-block: var(--space-nav-block);
    padding-inline: var(--space-gutter);
  }

  .site-nav__brand {
    color: var(--color-white);
    font-size: var(--type-brand-size);
    font-weight: var(--type-brand-weight);
    line-height: var(--type-brand-line-height);
    letter-spacing: var(--type-brand-letter-spacing);
    text-decoration: none;
  }

  .site-nav__list {
    display: flex;
    align-items: center;
    gap: var(--space-nav-gap);
    padding: 0;
    list-style: none;
  }

  .site-nav__link {
    position: relative;
    display: block;
    isolation: isolate;
    color: var(--color-white);
    font-size: var(--type-nav-size);
    font-weight: var(--type-nav-weight);
    line-height: var(--type-nav-line-height);
    letter-spacing: var(--type-nav-letter-spacing);
    text-decoration: none;
  }

  /* Selected: pill behind the current page's item */
  .site-nav__link[aria-current='page'] {
    color: var(--color-purple);
  }

  .site-nav__link[aria-current='page']::before {
    content: '';
    position: absolute;
    inset-block: calc(var(--space-nav-pill-block) * -1);
    inset-inline: calc(var(--space-nav-pill-inline) * -1);
    z-index: -1;
    border-radius: var(--radius-pill);
    background-color: var(--color-light-purple);
  }

  /* Hover: dot under the item (not on the selected item) */
  .site-nav__link:not([aria-current='page']):is(:hover, :focus-visible) {
    color: var(--color-light-purple);
  }

  .site-nav__link:not([aria-current='page']):is(
      :hover,
      :focus-visible
    )::after {
    content: '';
    position: absolute;
    inset-block-start: 100%;
    inset-inline-start: 50%;
    inline-size: var(--size-nav-dot);
    block-size: var(--size-nav-dot);
    border-radius: var(--radius-pill);
    background-color: var(--color-light-purple);
    translate: -50% 0;
  }
</style>
```

- [ ] **Step 3: Render `SiteNav` in `BaseLayout.astro`**

Add the import below the `Font` import:

```astro
import SiteNav from '../components/SiteNav.astro';
```

Replace:

```astro
    <header class="site-header"></header>
```

with:

```astro
    <header class="site-header">
      <SiteNav currentPath={Astro.url.pathname} />
    </header>
```

- [ ] **Step 4: Run the checks**

Run:
```bash
npm run format && npm run check && npm run build && grep -o '<a[^>]*aria-current="page"[^>]*>' dist/index.html && grep -c 'aria-label="Main"' dist/index.html
```
Expected:
- `0 errors`, `Complete!`.
- The first grep prints exactly one tag, containing `href="/"`.
- The second count is `1`.

- [ ] **Step 5: Commit **

```bash
git add src/components/SiteNav.astro src/layouts/BaseLayout.astro
git commit -m "feat: add site navigation with selected and hover states" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Case study collection, SVG assets and card component

**Files:**
- Create: `src/content.config.ts`, `src/content/case-studies.json`, `src/assets/flower.svg`, `src/assets/arrow-default.svg`, `src/assets/arrow-hover.svg`, `src/assets/corner-top-right.svg`, `src/assets/corner-bottom-left.svg`, `src/components/CaseStudyCard.astro`
- Modify: `src/pages/index.astro` (temporarily list the cards; Task 5 builds the real hero)

**Interfaces:**
- Consumes: the tokens `--size-card-*`, `--space-card-*`, `--space-skill-separator`, `--type-card-title-*`, `--type-caption-*`, `--type-body-*`, `--radius-card`, `--size-arrow`, `--card-corner-*`, `--focus-ring-*` and the colours.
- Produces:
  - Collection `caseStudies`, whose entries have `id: string` and `data: { title: string; skills: string[]; summary: string; order: number }`.
  - `CaseStudyCard` with prop `caseStudy: CollectionEntry<'caseStudies'>`, whose root is `article.card`.
  - `src/assets/flower.svg`, coloured with `currentColor` (used by Task 5).

- [ ] **Step 1: Create the collection schema `src/content.config.ts`**

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

- [ ] **Step 2: Write the failing check (the schema rejects bad data)**

Create `src/content/case-studies.json` with an entry that's **missing `summary`**:

```json
[
  {
    "id": "streamlining-scoring",
    "title": "Streamlining scoring for multiple products",
    "skills": ["User Research", "Process Design", "Systems Thinking"],
    "order": 1
  }
]
```

Run:
```bash
npm run build
```
Expected: FAIL. The build errors with a content validation message naming `caseStudies`, `streamlining-scoring` and `summary`.

- [ ] **Step 3: Write the real data to `src/content/case-studies.json`**

```json
[
  {
    "id": "streamlining-scoring",
    "title": "Streamlining scoring for multiple products",
    "skills": ["User Research", "Process Design", "Systems Thinking"],
    "summary": "A consolidated scoring interface that allows Agents to score, customise and add multiple credit products in a single call.",
    "order": 1
  },
  {
    "id": "consolidating-import-collections",
    "title": "Consolidating import collections",
    "skills": ["User Research", "Workshops", "Usability Testing"],
    "summary": "An interface replacing a five-platform and paper-heavy capture process with one cohesive, trackable journey.",
    "order": 2
  },
  {
    "id": "sales-workflow-research",
    "title": "Using research to build a better sales workflow",
    "skills": ["User Research", "Workshops", "Journey Mapping"],
    "summary": "A research-based review and journey redesign of the sales platform's workflow, cutting it from 22 steps to 14 steps.",
    "order": 3
  }
]
```

Run `npm run build`. Expected: `Complete!`.

- [ ] **Step 4: Copy the SVGs and replace their hard-coded colours**

Run:
```bash
mkdir -p src/assets
cp docs/figma/components/flower/flower.svg src/assets/flower.svg
cp docs/figma/components/arrow/arrow-default.svg src/assets/arrow-default.svg
cp docs/figma/components/arrow/arrow-hover.svg src/assets/arrow-hover.svg
cp docs/figma/components/case-study-card/corner-top-right.svg src/assets/corner-top-right.svg
cp docs/figma/components/case-study-card/corner-bottom-left.svg src/assets/corner-bottom-left.svg

# Root attributes from the Figma export that we don't want
sed -i 's/ preserveAspectRatio="none" overflow="visible" style="display: block;"//' src/assets/*.svg

# Flower: red → currentColor
sed -i 's/fill="#CD2B2B"/fill="currentColor"/g' src/assets/flower.svg

# Default arrow: light purple disc → currentColor; glyph → icon token
sed -i 's/fill="#C4CDF4"/fill="currentColor"/; s/fill="#1C1B1F"/style="fill: var(--color-icon)"/' src/assets/arrow-default.svg

# Hover arrow: red flower → currentColor; white glyph → white token
sed -i 's/fill="#CD2B2B"/fill="currentColor"/g; s/fill="white"/style="fill: var(--color-white)"/' src/assets/arrow-hover.svg

# Corners: white stroke → currentColor
sed -i 's/stroke="white"/stroke="currentColor"/' src/assets/corner-top-right.svg src/assets/corner-bottom-left.svg
```

Verify:
```bash
grep -nE '#[0-9A-Fa-f]{3,6}"|"white"|preserveAspectRatio' src/assets/*.svg; echo "exit $?"
grep -c 'currentColor' src/assets/*.svg
git status --short docs/figma
```
Expected:
- The first grep prints nothing and `exit 1`.
- Every asset has a `currentColor` count of 1 or more (flower 9, arrow-hover 9).
- `git status` for `docs/figma` shows no **modified** files (the originals are untouched).

- [ ] **Step 5: Create `src/components/CaseStudyCard.astro`**

```astro
---
import type { CollectionEntry } from 'astro:content';
import ArrowDefault from '../assets/arrow-default.svg';
import ArrowHover from '../assets/arrow-hover.svg';
import CornerTopRight from '../assets/corner-top-right.svg';
import CornerBottomLeft from '../assets/corner-bottom-left.svg';

interface Props {
  caseStudy: CollectionEntry<'caseStudies'>;
}

const { caseStudy } = Astro.props;
const { title, skills, summary } = caseStudy.data;
---

<article class="card">
  <h2 class="card__title">
    <a class="card__link" href={`/work/${caseStudy.id}`}>{title}</a>
  </h2>
  <ul class="card__skills" role="list">
    {skills.map((skill) => <li class="card__skill">{skill}</li>)}
  </ul>
  <p class="card__summary">{summary}</p>
  <span class="card__arrow" aria-hidden="true">
    <span class="card__arrow-icon card__arrow-icon--default"
      ><ArrowDefault /></span
    >
    <span class="card__arrow-icon card__arrow-icon--hover"><ArrowHover /></span>
  </span>
  <span class="card__corner card__corner--top-right" aria-hidden="true"
    ><CornerTopRight /></span
  >
  <span class="card__corner card__corner--bottom-left" aria-hidden="true"
    ><CornerBottomLeft /></span
  >
</article>

<style>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-card-stack);
    inline-size: var(--size-card-width);
    padding: var(--space-card-padding);
    border-radius: var(--radius-card);
    background-color: var(--color-white);
  }

  .card__title {
    max-inline-size: var(--size-card-title-width);
    block-size: var(--size-card-title-height);
    color: var(--color-purple);
    font-size: var(--type-card-title-size);
    font-weight: var(--type-card-title-weight);
    line-height: var(--type-card-title-line-height);
    letter-spacing: var(--type-card-title-letter-spacing);
  }

  .card__link {
    color: inherit;
    text-decoration: none;
  }

  /* Stretch the title link over the whole card */
  .card__link::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: var(--radius-card);
  }

  .card__link:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .card:has(.card__link:focus-visible) {
    outline: var(--focus-ring-width) solid var(--focus-ring-inner);
    box-shadow: 0 0 0 calc(var(--focus-ring-width) * 2)
      var(--focus-ring-outer);
  }

  .card__skills {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    color: var(--color-purple);
    font-size: var(--type-caption-size);
    font-weight: var(--type-caption-weight);
    line-height: var(--type-caption-line-height);
    letter-spacing: var(--type-caption-letter-spacing);
    list-style: none;
  }

  .card__skill + .card__skill::before {
    content: '|' / '';
    margin-inline: var(--space-skill-separator);
  }

  .card__summary {
    min-block-size: var(--size-card-summary-min-height);
    color: var(--color-grey);
  }

  .card__arrow {
    display: grid;
    align-self: flex-end;
    margin-block-start: auto;
    inline-size: var(--size-arrow);
    block-size: var(--size-arrow);
  }

  .card__arrow-icon {
    grid-area: 1 / 1;
  }

  .card__arrow-icon :global(svg),
  .card__corner :global(svg) {
    inline-size: 100%;
    block-size: 100%;
  }

  .card__arrow-icon--default {
    color: var(--color-light-purple);
  }

  .card__arrow-icon--hover {
    display: none;
    color: var(--color-red);
  }

  .card__corner {
    position: absolute;
    display: none;
    color: var(--color-white);
  }

  .card__corner--top-right {
    inset-block-start: var(--card-corner-top-right-top);
    inset-inline-end: var(--card-corner-top-right-right);
    inline-size: var(--card-corner-top-right-width);
    block-size: var(--card-corner-top-right-height);
  }

  .card__corner--bottom-left {
    inset-block-end: var(--card-corner-bottom-left-bottom);
    inset-inline-start: var(--card-corner-bottom-left-left);
    inline-size: var(--card-corner-bottom-left-width);
    block-size: var(--card-corner-bottom-left-height);
    rotate: 180deg;
  }

  /* Hover state (Figma "Variant2"), also for keyboard focus */
  .card:is(:hover, :focus-within) {
    background-color: var(--color-purple);
  }

  .card:is(:hover, :focus-within) .card__title,
  .card:is(:hover, :focus-within) .card__summary {
    color: var(--color-off-white);
  }

  .card:is(:hover, :focus-within) .card__skills {
    color: var(--color-white);
  }

  .card:is(:hover, :focus-within) .card__arrow-icon--default {
    display: none;
  }

  .card:is(:hover, :focus-within) .card__arrow-icon--hover,
  .card:is(:hover, :focus-within) .card__corner {
    display: block;
  }
</style>
```

- [ ] **Step 6: Temporarily render the cards on `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import CaseStudyCard from '../components/CaseStudyCard.astro';

const caseStudies = (await getCollection('caseStudies')).sort(
  (a, b) => a.data.order - b.data.order,
);
---

<BaseLayout title="cassandra garratt">
  <h1>effective &amp; empathetic design</h1>
  <ul role="list">
    {
      caseStudies.map((caseStudy) => (
        <li>
          <CaseStudyCard caseStudy={caseStudy} />
        </li>
      ))
    }
  </ul>
</BaseLayout>
```

- [ ] **Step 7: Run the checks**

Run:
```bash
npm run format && npm run check && npm run build && grep -o 'href="/work/[a-z-]*"' dist/index.html && grep -c '<h2' dist/index.html && ! grep -q '<script' dist/index.html && echo "no scripts"
```
Expected:
- `0 errors`, `Complete!`.
- The first grep prints, in this order: `href="/work/streamlining-scoring"`, `href="/work/consolidating-import-collections"`, `href="/work/sales-workflow-research"`.
- The `<h2` count is `3`.
- The last line prints `no scripts`.

- [ ] **Step 8: Commit **

```bash
git add src/content.config.ts src/content/case-studies.json src/assets src/components/CaseStudyCard.astro src/pages/index.astro
git commit -m "feat: add case study collection and card component" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Home page hero composition and visual verification

**Files:**
- Modify: `src/pages/index.astro` (final)
- Create (outside the repo): `<scratchpad>/visual-check/check.mjs`

**Interfaces:**
- Consumes:
  - `BaseLayout` (`title`), `CaseStudyCard` (`caseStudy`) and the `caseStudies` collection.
  - `src/assets/flower.svg`.
  - Tokens `--type-title-*`, `--type-subtitle-*`, `--hero-*`, `--size-hero-intro-width`, `--space-hero-top`, `--space-hero-stack-gap`, `--space-card-row-gap` and the colours.
  - Class hooks `a.site-nav__link` and `article.card`.
- Produces: the finished home page, with classes `hero`, `hero__titles`, `hero__title`, `hero__line`, `hero__flower`, `hero__pill`, `hero__intro` and `hero__cards`.

- [ ] **Step 1: Write the failing check**

Run:
```bash
npm run build && grep -c 'hero__intro' dist/index.html
```
Expected: FAIL (`0`).

- [ ] **Step 2: Replace `src/pages/index.astro`**

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import CaseStudyCard from '../components/CaseStudyCard.astro';
import Flower from '../assets/flower.svg';

const caseStudies = (await getCollection('caseStudies')).sort(
  (a, b) => a.data.order - b.data.order,
);
---

<BaseLayout title="cassandra garratt">
  <div class="hero">
    <div class="hero__titles">
      <h1 class="hero__title">
        <span class="hero__line"
          ><span class="hero__flower" aria-hidden="true"><Flower /></span
          >effective &amp; </span
        >
        <span class="hero__line"
          >empathetic<span class="hero__pill" aria-hidden="true"></span>
        </span>
        <span class="hero__line">design</span>
      </h1>
      <p class="hero__intro">
        I am a proactive designer with a passion for <strong
          >inclusive technology</strong
        > and <strong>user advocacy</strong>. I create intuitive, user-centred
        designs that solve real problems and delight users.
      </p>
    </div>
    <ul class="hero__cards" role="list">
      {
        caseStudies.map((caseStudy) => (
          <li>
            <CaseStudyCard caseStudy={caseStudy} />
          </li>
        ))
      }
    </ul>
  </div>
</BaseLayout>

<style>
  /* Stacked desktop layout (below 1880px): not designed, see spec */
  .hero {
    display: flex;
    flex-direction: column;
    gap: var(--space-hero-stack-gap);
    padding-block: var(--space-hero-top);
  }

  .hero__titles {
    display: grid;
  }

  .hero__titles > * {
    grid-area: 1 / 1;
  }

  .hero__title {
    color: var(--color-black);
    font-size: var(--type-title-size);
    font-weight: var(--type-title-weight);
    line-height: var(--type-title-line-height);
    letter-spacing: var(--type-title-letter-spacing);
  }

  .hero__line {
    display: block;
  }

  .hero__flower {
    display: inline-block;
    vertical-align: top;
    inline-size: var(--hero-flower-size);
    block-size: var(--hero-flower-size);
    margin-block-start: var(--hero-flower-offset-top);
    margin-inline-end: var(--hero-flower-gap);
    color: var(--color-red);
  }

  .hero__flower :global(svg) {
    inline-size: 100%;
    block-size: 100%;
  }

  .hero__pill {
    display: inline-block;
    vertical-align: top;
    inline-size: var(--hero-pill-width);
    block-size: var(--hero-pill-height);
    margin-block-start: var(--hero-pill-offset-top);
    margin-inline-start: var(--hero-pill-gap);
    border-radius: var(--radius-pill);
    background-color: var(--color-purple);
  }

  .hero__intro {
    align-self: start;
    max-inline-size: var(--size-hero-intro-width);
    margin-block-start: var(--hero-intro-offset-top);
    margin-inline-start: var(--hero-intro-offset-inline);
    color: var(--color-purple);
    font-size: var(--type-subtitle-size);
    font-weight: var(--type-subtitle-weight);
    line-height: var(--type-subtitle-line-height);
    letter-spacing: var(--type-subtitle-letter-spacing);
  }

  .hero__intro strong {
    font-weight: var(--type-subtitle-emphasis-weight);
  }

  .hero__cards {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-card-row-gap);
    padding: 0;
    list-style: none;
  }

  /* Figma composition: breakpoint also noted in tokens.css */
  @media (min-width: 117.5rem) {
    .hero {
      display: grid;
    }

    .hero > * {
      grid-area: 1 / 1;
    }

    .hero__titles {
      margin-block-start: var(--hero-titles-offset-top);
    }

    .hero__cards {
      align-self: start;
      justify-self: end;
    }
  }
</style>
```

- [ ] **Step 3: Run the build checks**

Run:
```bash
npm run format && npm run format:check && npm run check && npm run build && grep -c '<h1' dist/index.html && grep -c 'hero__intro' dist/index.html && ! grep -q '<script' dist/index.html && echo "no scripts"
```
Expected:
- `All matched files use Prettier code style!`, `0 errors`, `Complete!`.
- `<h1` count `1`, `hero__intro` count 1 or more.
- `no scripts`.

- [ ] **Step 4: Set up the visual check helper (outside the repo)**

Run (replace `<scratchpad>` with the session scratchpad path):
```bash
mkdir -p "<scratchpad>/visual-check" && cd "<scratchpad>/visual-check" && npm init -y >/dev/null && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install playwright@1.63.0
```
Expected: exit 0, with no browser download (the script uses the installed Microsoft Edge).

Create `<scratchpad>/visual-check/check.mjs`:

```js
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:4321/';
const out = process.argv[3] ?? '.';

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
});
await page.goto(base, { waitUntil: 'networkidle' });

// 1. Rest state vs docs/figma/landing-desktop/screenshot.png
await page.mouse.move(0, 1079);
await page.screenshot({ path: `${out}/home-1920-rest.png` });

// 2. First card hovered, and "Work" hovered, vs landing-desktop-hover/screenshot.png
await page.hover('.hero__cards li:first-child article.card');
await page.screenshot({ path: `${out}/home-1920-card-hover.png` });
await page.hover('a.site-nav__link[href="/work"]');
await page.screenshot({ path: `${out}/home-1920-nav-hover.png` });
await page.mouse.move(0, 1079);

// 3. Geometry at 1920: compare with Figma coordinates
const geometry = await page.evaluate(() => {
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.x),
      y: Math.round(r.y),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  };
  const textRect = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return rect(range);
  };
  const lines = [...document.querySelectorAll('.hero__line')];
  return {
    nav: rect(document.querySelector('.site-header')),
    cards: [...document.querySelectorAll('article.card')].map(rect),
    cardTitles: [...document.querySelectorAll('.card__title')].map(textRect),
    flower: rect(document.querySelector('.hero__flower')),
    pill: rect(document.querySelector('.hero__pill')),
    lines: lines.map(textRect),
    intro: rect(document.querySelector('.hero__intro')),
  };
});
console.log('geometry@1920', JSON.stringify(geometry, null, 2));

// 4. Breakpoint: at 1880 the first headline line must not reach the cards
for (const width of [1880, 1900]) {
  await page.setViewportSize({ width, height: 1080 });
  const gap = await page.evaluate(() => {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('.hero__line'));
    const lineRight = range.getBoundingClientRect().right;
    const cardsLeft = document
      .querySelector('.hero__cards')
      .getBoundingClientRect().left;
    return Math.round(cardsLeft - lineRight);
  });
  console.log(`breakpoint gap@${width}: ${gap}px (must be > 0)`);
}

// 5. Narrower desktops: stacked layout, no horizontal overflow.
//    960 is the CSS width of a 1920px window at 200% zoom.
for (const width of [1440, 1280, 960]) {
  await page.setViewportSize({ width, height: 1080 });
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  console.log(`horizontal overflow@${width}: ${overflow}`);
  await page.screenshot({ path: `${out}/home-${width}.png`, fullPage: true });
}

// 6. Keyboard: tab order and focused card
await page.setViewportSize({ width: 1920, height: 1080 });
await page.goto(base, { waitUntil: 'networkidle' });
const order = [];
for (let i = 0; i < 10; i += 1) {
  await page.keyboard.press('Tab');
  order.push(
    await page.evaluate(() => {
      const el = document.activeElement;
      return `${el.tagName.toLowerCase()} ${el.getAttribute('href') ?? ''} "${el.textContent.trim().slice(0, 40)}"`;
    }),
  );
  if (i === 7) {
    await page.screenshot({ path: `${out}/home-1920-card-focus.png` });
  }
}
console.log('tab order:\n' + order.join('\n'));

// 7. Skip link moves focus to main
await page.goto(base, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
await page.keyboard.press('Enter');
console.log(
  'focus after skip link:',
  await page.evaluate(() => document.activeElement.id),
);

await browser.close();
```

- [ ] **Step 5: Run the dev server and the visual check**

Start `npm run dev` in the background from the repo root and wait until it prints its local URL (normally `http://localhost:4321/`). Then run:

```bash
cd "<scratchpad>/visual-check" && node check.mjs http://localhost:4321/ .
```

Expected output:
- **Geometry at 1920** is within about ±3px of Figma:
  - Nav `h: 90`.
  - Cards at `y: 276`, `x` values `751`, `1109` and `1467`, each `w: 343`, `h: 373`.
  - Card titles span 3, 2 and 3 lines (`h` about 88, 59 and 88).
  - Flower `x: 110, y: 571, w: 90, h: 90`.
  - Pill `x: 660, y: 683, w: 269, h: 72`.
  - First line `y` about 565.
  - Intro `x: 491, y: 788, w: 442`.
- `breakpoint gap@1880` and `@1900` are both `> 0`.
- `horizontal overflow@1440: false`, `@1280: false` and `@960: false`.
- **Tab order:**
  1. `a #main "Skip to content"`
  2. `a / "cassandra garratt"`
  3. `a / "Home"`
  4. `a /work "Work"`
  5. `a /about "About"`
  6. `a /resume "Resume"`
  7. `a /contact "Contact"`
  8. `a /work/streamlining-scoring "Streamlining…"`
  9. `a /work/consolidating-import-collections "Consolidating…"`
  10. `a /work/sales-workflow-research "Using research…"`
- `focus after skip link: main`.

- [ ] **Step 6: Compare the screenshots with Figma**

Read each image with the Read tool and compare:
- `home-1920-rest.png` with `docs/figma/landing-desktop/screenshot.png`. Expect the Home pill in the nav; that's an intended difference, since Figma has no Home item.
- `home-1920-card-hover.png` with `docs/figma/landing-desktop-hover/screenshot.png`: the first card is purple with corner strokes and the red flower arrow.
- `home-1920-nav-hover.png`: a Light purple "Work" with a dot underneath.
- `home-1920-card-focus.png`: the first card shows the hover styling plus a visible focus ring around the whole card.
- `home-1440.png`, `home-1280.png` and `home-960.png`: the stacked layout (headline and intro above, cards below, wrapping at 960), with nothing overlapping.

**If the geometry or visuals are off:**
- **Line breaks or overlap:** adjust only the relevant token in `src/styles/tokens.css`, then repeat Steps 3, 5 and 6. The likely candidates are `--hero-flower-*`, `--hero-pill-*`, `--hero-intro-offset-*` and `--space-skill-separator`.
- **Breakpoint gap ≤ 0 at 1880:** raise the breakpoint in 20px steps (1900px = `118.75rem`, 1920px = `120rem`) in both `index.astro` and the `tokens.css` header comment, until the gap at the new breakpoint is > 0.

- [ ] **Step 7: Check colour contrast for the colour pairs used**

Run:
```bash
node -e '
const hex = (h) => h.match(/\w\w/g).map((c) => parseInt(c, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
const lum = (h) => { const [r, g, b] = hex(h); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return ((x + 0.05) / (y + 0.05)).toFixed(2); };
const pairs = [
  ["grey summary on white", "6b6b6b", "ffffff", 4.5],
  ["purple title/caption on white", "4832a1", "ffffff", 4.5],
  ["white nav text on purple", "ffffff", "4832a1", 4.5],
  ["light-purple hover text on purple", "c4cdf4", "4832a1", 4.5],
  ["purple selected text on light purple", "4832a1", "c4cdf4", 4.5],
  ["off-white text on purple card", "f8f9ff", "4832a1", 4.5],
  ["purple intro on off-white", "4832a1", "f8f9ff", 4.5],
  ["black headline on off-white", "000000", "f8f9ff", 4.5],
  ["focus ring purple on off-white", "4832a1", "f8f9ff", 3],
  ["focus ring white on purple", "ffffff", "4832a1", 3],
];
for (const [name, fg, bg, min] of pairs) { const r = ratio(fg, bg); console.log((r >= min ? "PASS" : "FAIL"), r, name); }
'
```
Expected: every line starts with `PASS`. If any line says `FAIL`, stop and tell the user. Don't change colours, because they come from Figma.

- [ ] **Step 8: Stop the dev server**

Stop the background `npm run dev` process.

- [ ] **Step 9: Commit **

```bash
git add src/pages/index.astro src/styles/tokens.css
git commit -m "feat: build desktop home page hero from Figma" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Final verification and documentation

**Files:**
- Modify:
  - `docs/decisions.md`, `docs/questions.md`, `docs/architecture.md`, `AGENTS.md`
  - `docs/wiki/figma-mcp.md`, `docs/wiki/index.md`, `docs/wiki/log.md`
  - `docs/figma/components/case-study-card/context.md` (the `## Notes` section only)
  - `docs/superpowers/specs/2026-09-16-home-page-poc-design.md` (status line only)
- Create: `docs/wiki/design-tokens.md`

**Interfaces:**
- Consumes: everything above.
- Produces: docs consistent with the code. The next free IDs are **D-011** and **Q-010**; confirm them by checking both files first.

- [ ] **Step 1: Run the full verification from the spec**

Run:
```bash
npm run build && npm run check && npm run format:check && ! grep -q '<script' dist/index.html && echo "no scripts"
```
Expected: `Complete!`, `0 errors`, `All matched files use Prettier code style!` and `no scripts`. Visual, width, keyboard and contrast evidence comes from Task 5, Steps 5–7. If code changed since then, re-run those steps.

- [ ] **Step 2: Read the doc rules before editing**

Read `docs/wiki/conventions.md`, and the "How to use this doc" sections at the top of `docs/decisions.md` and `docs/questions.md`. Follow their formats exactly.

- [ ] **Step 3: Add decisions to `docs/decisions.md`**

Append these entries, dated 2026-09-16 with status Accepted, following the file's format (**Context**, **Decision**, **Alternatives considered**, **Consequences**).
- In **D-003**, change the status line to `Superseded by D-013`.
- Add one line per decision to `docs/wiki/log.md`.

1. **D-011 · Styling: plain CSS with scoped styles.** Resolves Q-004.
   - Decision: Astro scoped `<style>` blocks on top of token custom properties. No Tailwind.
   - Alternative: Tailwind v4 with a `@theme` built from tokens.
2. **D-012 · Figma access: Professional plan, Full seat.** Resolves Q-007.
   - `whoami` on 2026-09-16 returned a Full seat on the "pro" tier.
   - Limits: 200 read calls a day, 15 a minute.
3. **D-013 · Case studies: bespoke pages plus a JSON card collection.** Supersedes D-003. Resolves Q-003.
   - Each case study will be its own `.astro` page at `/work/<id>`, styled uniquely, with no shared MDX template.
   - Card metadata (title, skills, summary, order) lives in the `caseStudies` data collection (`src/content/case-studies.json`, `file()` loader, schema in `src/content.config.ts`).
   - No CMS: the user doesn't want content abstracted in a CMS-friendly way.
4. **D-014 · Tokens written by hand for the POC.**
   - `src/styles/tokens.css` is written by hand from `docs/figma/`. Q-005 stays open.
   - Spacing, size and radius tokens are named by us, because Figma has no variables for them.
5. **D-015 · Fonts: the Astro Fonts API.**
   - Inter at weights 400, 700 and 900 through `fontProviders.fontsource()` and `<Font cssVariable="--font-inter" preload />`.
   - Alternative: the `@fontsource-variable/inter` package, which was in the spec until the built-in API turned up during planning.
   - Consequence: the first build needs network access.
6. **D-016 · Node 24 LTS, and baseline checks.** Partly answers Q-006.
   - `.nvmrc` and `engines`.
   - Scripts: `check` (`astro check`, with `typescript` pinned to 6.x for `@astrojs/check` 0.9) and `format` / `format:check` (Prettier with `prettier-plugin-astro`).
   - Prettier ignores `**/*.md` and `docs/figma/`.
7. **D-017 · Navigation items and state semantics.**
   - Adds a Home item that isn't in the design.
   - The **Selected** pill marks `aria-current="page"`, and the **Hover** dot shows on hover and focus, matching the Figma annotations on component `20:703` (confirmed by the user).
   - The brand links to `/`.

- [ ] **Step 4: Update `docs/questions.md`**

- Remove the Q-003, Q-004 and Q-007 entries and their summary rows.
- **Q-005:** add a line saying a hand-written `src/styles/tokens.css` exists (D-014), that its header lists the sources, and that the Figma file has 6 colour variables and 5 text styles with no spacing variables.
- **Q-006:** note that the baseline plus Prettier is in place (D-016). Accessibility automation, Lighthouse, lint and CI are still open.
- **Add these questions,** each with a summary row and **Raised**, **Blocks / Depends on**, **Context** and **Options**:
  - **Q-010 · Home page below 1880px.** Blocks nothing yet. The Figma composition only fits at 1880px and wider; below that the POC uses an undesigned stacked layout. Options: Cass designs a laptop frame (1280–1536), or approves the stacked layout.
  - **Q-011 · Resume link target.** Options: a PDF in `public/`, a page, or an external link. The nav currently points to `/resume`, which 404s.
  - **Q-012 · Brand link.** The brand linking to `/` duplicates the Home item. Options: keep both, make the brand plain text, or drop the Home item.
- Log the opened and resolved questions in `docs/wiki/log.md`.

- [ ] **Step 5: Update `docs/architecture.md`**

- **Status:** scaffolded; the home page POC exists.
- **Overview diagram:** drop the MDX `[slug]` route. Show `case-studies.json → caseStudies collection → cards on /`, and bespoke case study pages as planned.
- **Code map:** move the real paths into "Exists now": `astro.config.mjs`, `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/components/SiteNav.astro`, `src/components/CaseStudyCard.astro`, `src/content.config.ts`, `src/content/case-studies.json`, `src/assets/`, `src/pages/index.astro`. Also add `docs/superpowers/` (specs and plans).
- **Invariant 2:** the tokens file is hand-written until Q-005 is settled (D-014).
- **Invariant 4:** card metadata lives in the `caseStudies` collection, and case study pages are bespoke `.astro` pages (D-013).

- [ ] **Step 6: Update `AGENTS.md` (never `CLAUDE.md`)**

- **Status line:** scaffolded; the desktop home page POC is built.
- **Repo layout:** `src/` is no longer "(planned)", and `content/` holds "card metadata (JSON collection)", not MDX. Add a `docs/superpowers/` row: "Specs and implementation plans from the superpowers skills".
- **Prerequisites:** "Node.js 24 LTS (`.nvmrc`) and npm."
- **Commands table:** `npm install`, `npm run dev`, `npm run build`, `npm run preview`, `npm run check`, `npm run format` and `npm run format:check`. Replace "Lint, format and test scripts: TBD" with "Lint and test scripts: TBD (Q-006)."
- **Testing:** list `npm run build`, `npm run check` and `npm run format:check`.

- [ ] **Step 7: Update the wiki**

- **`docs/wiki/figma-mcp.md`:** fill in "Usage notes":
  - Sign-in worked from the VS Code panel's `/mcp`.
  - Annotations come back as `data-annotations` attributes in `get_design_context`.
  - `get_screenshot` returns a short-lived URL, not a file.
  - `get_design_context` on a component set also returns the nested sets it uses (arrow, flower).
  - The first screen (desktop home) took 9 read calls.
  - Fill in "Figma files" with the file URL `https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website` (one page, `Landing`).
  - Replace the estimated per-screen budget with this measured figure.
- **New `docs/wiki/design-tokens.md`** (follow the page format in `conventions.md`):
  - Where the tokens live, and the naming scheme (`--color-*`, `--type-<style>-{size,line-height,letter-spacing,weight}`, `--space-*`, `--size-*`, `--hero-*`, `--card-corner-*`, `--radius-*`, `--focus-ring-*`).
  - The unit rules (rem for sizes, em for letter spacing, since Figma letter spacing is a percentage).
  - How the fluid `clamp()` values were derived (linear between 1200px and 1920px).
  - That the 117.5rem breakpoint is duplicated in `index.astro`.
- **`docs/wiki/index.md`:** add the new page under "Design", replacing the "_No pages yet_" line.

- [ ] **Step 8: Note the caption font change in the Figma snapshot**

In `docs/figma/components/case-study-card/context.md`, add this bullet under `## Notes` only, leaving the tool output unedited:

`- **Caption font changed (2026-09-16):** Cass switched the card caption to Inter in Figma after this snapshot was taken. The build uses Inter Bold. Fetch again to confirm the weight when this component is next needed.`

- [ ] **Step 9: Mark the spec as implemented**

In `docs/superpowers/specs/2026-09-16-home-page-poc-design.md`, change the status line to `- **Status:** Implemented (see docs/superpowers/plans/2026-09-16-home-page-poc.md)`.

- [ ] **Step 10: Check the docs for consistency**

Run:
```bash
grep -rn "Q-003\|Q-004\|Q-007" docs AGENTS.md | grep -v "decisions.md\|log.md\|superpowers/"
grep -n "not scaffolded\|(planned)" AGENTS.md docs/architecture.md
```
Expected:
- The first grep prints nothing (no live references to resolved questions outside the decision log, the wiki log and the superpowers docs).
- The second prints only rows for things that really are still planned (e.g. `public/`, case study pages). Fix anything else.

- [ ] **Step 11: Commit **

```bash
git add docs AGENTS.md
git commit -m "docs: record home page POC decisions and update architecture" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

If the user wants the earlier Figma snapshot work committed separately, commit `docs/figma/` first as `docs(figma): save landing page snapshots and tokens`.
