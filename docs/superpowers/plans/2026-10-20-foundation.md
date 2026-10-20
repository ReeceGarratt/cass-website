# Phase 2 foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the new nav (purple and White variants, Email me copy, hide on scroll down), the new sub nav, and Cass's shared feedback across the home page and the three built case studies.

**Architecture:** `SiteNav` takes over the `<header>` and owns two small scripts (hide on scroll, copy email). It publishes `--site-header-offset` on `<html>`, which `CaseStudySubNav` uses as its sticky offset. Everything else is a targeted change to an existing component, token or global rule. There's no test runner (Q-006), so every task proves itself with a **probe**: a JS expression evaluated in headless Edge against the built page, run before the change (it must fail) and after (it must pass), plus screenshot diffs.

**Tech Stack:** Astro 7, scoped CSS with tokens (`src/styles/tokens.css`), Astro SVG component imports, plain `<script>` blocks (bundled by Astro), headless Edge over DevTools (`shoot.mjs`, no dependencies), `sharp` (`diff.mjs`, `ink.mjs`).

**Spec:** [`docs/superpowers/specs/2026-10-20-foundation-design.md`](../specs/2026-10-20-foundation-design.md). Read it first; this plan argues from it.

## Global Constraints

- Work in the worktree `F:/Code/cass-website-foundation` on `reece/feature/foundation`. Never `cd` into `F:/Code/cass-website`: another chat may be using it.
- **Stage only the paths each task lists. Never `git add -A` or `git add .`:** `.superpowers/` is not git-ignored.
- No hard-coded design values: colour, type, spacing, radius, shadow and motion come from tokens (invariant 1). Measured values get a token with a px comment.
- Root-relative links go through `withBase` (invariant 7).
- Every client script starts with a comment giving its reason (invariant 3).
- Accessibility (invariant 5): visible focus on both nav variants, full keyboard operation, `prefers-reduced-motion` respected, behaviour works without JS where the spec says so.
- No Figma calls (phase 1b may be using the allowance).
- The email address is `hello@cassandragarratt.com`.
- Every task ends with `npm run build`, `npm run check` and `npm run format:check` passing. Run `npx prettier --write <files>` on the files you touched if the format check fails.
- Commit messages: Conventional Commits, imperative, ≤72 characters, ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Never push. Pushing needs Reece's approval.

## Verification tools

All tooling lives in `.superpowers/sdd/2026-10-20-foundation/` (call it `$T`), set up in Task 1. Shell variables don't persist between tool calls, so each command below spells the path out.

```bash
# Serve dist/ (once per session, in the background); rebuild with `npm run build` and it picks up the new files.
npx astro preview --port 4392
# Run a probe against a page: home | cs1 | cs2 | cs3. Prints the probe's JSON first.
sh .superpowers/sdd/2026-10-20-foundation/probe.sh <probe> <page> [--nojs] [--reduced-motion] [--width=1440] [--pretab=n] [--tab=n]
# Screenshot all four pages into shots/<name>-<page>/ (full.png plus one PNG per section).
sh .superpowers/sdd/2026-10-20-foundation/shoot-all.sh <name>
# Pixel diff: prints IDENTICAL or "DIFFERS: n px, rows a-b"; optional out.png marks differences in red.
node .superpowers/sdd/2026-10-20-foundation/diff.mjs <before.png> <after.png> [out.png]
```

Pages: `cs1` = `/work/streamlining-scoring/` (Absa), `cs2` = `/work/consolidating-import-collections/` (Standard Bank), `cs3` = `/work/sales-workflow-research/` (MiX Telematics).

`shoot.mjs` disables transitions before it evaluates a probe, scrolls to the top first, and evaluates with `awaitPromise`, so a probe may be an async IIFE. A probe returns a string (use `JSON.stringify`).

---

### Task 1: Tooling and baseline shots

**Files:**
- Create (not committed): `.superpowers/sdd/2026-10-20-foundation/{shoot.mjs,diff.mjs,ink.mjs,probe.sh,shoot-all.sh}`, `probes/`, `shots/before-*`

**Interfaces:**
- Produces: the commands in [Verification tools](#verification-tools), and baseline shots `shots/before-{home,cs1,cs2,cs3}/`.

- [ ] **Step 1: Copy the scripts.**

```bash
mkdir -p .superpowers/sdd/2026-10-20-foundation/probes
cp F:/Code/cass-website/.superpowers/sdd/2026-10-04-case-study-three/shoot.mjs F:/Code/cass-website/.superpowers/sdd/2026-10-04-case-study-three/diff.mjs .superpowers/sdd/2026-10-20-foundation/
sed -i "s#F:/Code/cass-website/node_modules/sharp#F:/Code/cass-website-foundation/node_modules/sharp#" .superpowers/sdd/2026-10-20-foundation/diff.mjs
sed -i "s#Number(process.env.SHOOT_PRETAB ?? 0)#Number(flag('pretab')?.split('=')[1] ?? 0)#" .superpowers/sdd/2026-10-20-foundation/shoot.mjs
grep -n "pretab" .superpowers/sdd/2026-10-20-foundation/shoot.mjs
```

The last command must print the patched loop line. `--pretab=n` presses Tab n times before shooting, replacing the old `SHOOT_PRETAB` env var, so every command starts with `node` or `sh` (the project's permission allowlist matches on the command's start).

- [ ] **Step 2: Write `probe.sh`.**

```sh
#!/usr/bin/env sh
# Evaluate a probe (a JS expression in probes/<probe>.js) against a built
# page in headless Edge and print its result. Shots land in
# shots/probe-<probe>-<page>/.
# Usage: sh probe.sh <probe> <home|cs1|cs2|cs3> [shoot.mjs flags]
T=.superpowers/sdd/2026-10-20-foundation
probe=$1
page=$2
shift 2
case "$page" in
  home) path=/ ;;
  cs1) path=/work/streamlining-scoring/ ;;
  cs2) path=/work/consolidating-import-collections/ ;;
  cs3) path=/work/sales-workflow-research/ ;;
  *) echo "unknown page: $page" >&2; exit 2 ;;
esac
SHOOT_EVAL="$(cat "$T/probes/$probe.js")" node "$T/shoot.mjs" "http://localhost:4392$path" "$T/shots/probe-$probe-$page" "$@"
```

- [ ] **Step 3: Write `shoot-all.sh`.**

```sh
#!/usr/bin/env sh
# Screenshot the four built pages into shots/<name>-<page>/.
# Usage: sh shoot-all.sh <name> [shoot.mjs flags]
T=.superpowers/sdd/2026-10-20-foundation
name=$1
shift
node "$T/shoot.mjs" http://localhost:4392/ "$T/shots/$name-home" "$@"
node "$T/shoot.mjs" http://localhost:4392/work/streamlining-scoring/ "$T/shots/$name-cs1" "$@"
node "$T/shoot.mjs" http://localhost:4392/work/consolidating-import-collections/ "$T/shots/$name-cs2" "$@"
node "$T/shoot.mjs" http://localhost:4392/work/sales-workflow-research/ "$T/shots/$name-cs3" "$@"
```

- [ ] **Step 4: Write `ink.mjs`** (used by Task 5 to measure visible gaps).

```js
// Rows of "ink" (pixels that differ from the Off-white page background) in
// a column band of a screenshot, grouped into runs, with the blank gap
// above each run. Used to measure the gaps a reader sees between lines of
// text, which line boxes don't show (D-046).
// Usage: node ink.mjs <png> <x0> <x1> <y0> <y1>
import sharp from 'sharp';

const [file, ...rest] = process.argv.slice(2);
const [x0, x1, y0, y1] = rest.map(Number);
const { data, info } = await sharp(file)
  .raw()
  .toBuffer({ resolveWithObject: true });
const bg = [0xf8, 0xf9, 0xff]; // --color-off-white
const hasInk = (y) => {
  for (let x = x0; x < x1; x++) {
    const i = (y * info.width + x) * info.channels;
    const d =
      Math.abs(data[i] - bg[0]) +
      Math.abs(data[i + 1] - bg[1]) +
      Math.abs(data[i + 2] - bg[2]);
    if (d > 30) return true;
  }
  return false;
};
const runs = [];
let start = -1;
for (let y = y0; y <= y1; y++) {
  const ink = hasInk(y);
  if (ink && start < 0) start = y;
  if (!ink && start >= 0) {
    runs.push([start, y - 1]);
    start = -1;
  }
}
if (start >= 0) runs.push([start, y1]);
runs.forEach(([a, b], i) =>
  console.log(
    `run ${i}: rows ${a}-${b}` +
      (i ? `  gap above: ${a - runs[i - 1][1] - 1}px` : ''),
  ),
);
```

- [ ] **Step 5: Build, serve and take the baseline.** Start the preview server in the background, then shoot.

```bash
npm run build
npx astro preview --port 4392   # run_in_background
sh .superpowers/sdd/2026-10-20-foundation/shoot-all.sh before
sh .superpowers/sdd/2026-10-20-foundation/shoot-all.sh before-tab --tab=12
```

Expected: each run prints `viewport {"innerWidth":1920,…,"scrollWidth":1920,…}` and a section list. `shots/before-cs1/` holds `full.png`, `00-sub-nav.png`, `01-project-overview.png`, and so on. Note the section names: later tasks diff them.

- [ ] **Step 6: No commit** (nothing tracked changed). Confirm with `git status --short`: expected `?? .superpowers/` only.

---

### Task 2: New nav: tokens, structure, variants, Email me

**Files:**
- Modify: `src/styles/tokens.css` (nav type, nav space, nav icon size)
- Create: `src/assets/icons/copy.svg`, `src/assets/icons/check.svg`
- Rewrite: `src/components/SiteNav.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro:17` (the `<BaseLayout>` tag)
- Test: `$T/probes/nav.js`, `$T/probes/copy.js`

**Interfaces:**
- Produces: `SiteNav` props `{ currentPath: string; variant?: 'purple' | 'white' }`. `SiteNav` renders `<header class="site-header site-header--{variant}">`. `BaseLayout` prop `navVariant?: 'purple' | 'white'` (default `purple`). Elements later tasks use: `.site-header`, `.site-nav__brand`, `.site-nav__link`, `.site-nav__utility[data-copy-email]`, `[data-copy-status]`.

- [ ] **Step 1: Write the nav probe** `$T/probes/nav.js`.

```js
(() => {
  const header = document.querySelector('.site-header');
  const cs = header && getComputedStyle(header);
  const items = [...document.querySelectorAll('.site-nav__link')].map((a) => [
    a.textContent.trim(),
    a.getAttribute('aria-current'),
    getComputedStyle(a).fontSize,
    getComputedStyle(a).backgroundColor,
  ]);
  const utility = document.querySelector('.site-nav__utility');
  return JSON.stringify({
    variant: header?.className.match(/site-header--(purple|white)/)?.[1] ?? null,
    headerBg: cs?.backgroundColor,
    headerHeight: header && Math.round(header.getBoundingClientRect().height),
    position: cs?.position,
    brand: getComputedStyle(document.querySelector('.site-nav__brand')).color,
    items,
    utility: utility && [utility.textContent.trim(), utility.getAttribute('href')],
  });
})()
```

- [ ] **Step 2: Write the copy probe** `$T/probes/copy.js`.

```js
(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const link = document.querySelector('.site-nav__utility');
  if (!link) return JSON.stringify({ error: 'no .site-nav__utility' });
  const status = document.querySelector('[data-copy-status]');
  const tick = () =>
    getComputedStyle(link.querySelector('.site-nav__icon-tick')).visibility;
  let copied = null;
  const stub = (writeText) =>
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  stub(async (text) => {
    copied = text;
  });
  link.click();
  await wait(100);
  const afterClick = {
    copied,
    dataCopied: link.hasAttribute('data-copied'),
    tick: tick(),
    status: status.textContent,
  };
  await wait(3100);
  const afterRevert = {
    dataCopied: link.hasAttribute('data-copied'),
    tick: tick(),
    status: status.textContent,
  };
  // A failed copy falls back to the link's own href. Point it at a hash so
  // the fallback navigation is observable without leaving the page.
  stub(async () => {
    throw new Error('denied');
  });
  link.href = '#mailto-fallback';
  link.click();
  await wait(100);
  return JSON.stringify({ afterClick, afterRevert, fallback: location.hash });
})()
```

- [ ] **Step 3: Run both probes; they must fail.**

```bash
sh .superpowers/sdd/2026-10-20-foundation/probe.sh nav cs1
sh .superpowers/sdd/2026-10-20-foundation/probe.sh copy cs1
```

Expected: `nav` shows `"variant":null`, five items (Home, Work, About, Resume, Contact) at `"17px"`, `"utility":null`. `copy` prints `{"error":"no .site-nav__utility"}`.

- [ ] **Step 4: Tokens.** In `src/styles/tokens.css`, replace the nav items type block:

```css
  /* Type: nav items (Navigation 20:703, 2026-10-20: Inter Bold 16 / 1.48 /
     -1.1%; was 17 / 1.5). Also the skip link and the sub nav's back link */
  --type-nav-size: 1rem;
  --type-nav-line-height: 1.48;
  --type-nav-letter-spacing: -0.011em;
  --type-nav-weight: 700;
```

Replace the four nav space tokens (`--space-nav-gap` to `--space-nav-pill-block`):

```css
  --space-nav-gap: 2.5rem; /* 40px (was 43px) */
  --space-nav-row-gap: 1.5rem; /* 24px; not designed — the gap between rows if the nav wraps */
  --space-nav-pill-inline: 1.5rem; /* 24px; selected item padding, 8px 24px */
  --space-nav-pill-block: 0.5rem; /* 8px */
  --space-nav-utility-gap: 1.0625rem; /* 17px; utility link text to icon */
```

After `--size-nav-dot`, add:

```css
  --size-nav-icon: 1.5rem; /* 24px; utility link icons (272:2033) */
```

- [ ] **Step 5: Icons.** Create `src/assets/icons/copy.svg` (the Figma `Icon · Copy email` glyph, `currentColor`, mask removed):

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18C8.45 18 7.97917 17.8042 7.5875 17.4125C7.19583 17.0208 7 16.55 7 16V4C7 3.45 7.19583 2.97917 7.5875 2.5875C7.97917 2.19583 8.45 2 9 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V16C20 16.55 19.8042 17.0208 19.4125 17.4125C19.0208 17.8042 18.55 18 18 18H9ZM9 16H18V4H9V16ZM5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6H5V20H16V22H5Z" fill="currentColor"/>
</svg>
```

Create `src/assets/icons/check.svg` (Material Symbols Rounded `check`, provisional per D-048):

```svg
<svg width="24" height="24" viewBox="0 -960 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M382-354 721-693q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" fill="currentColor"/>
</svg>
```

- [ ] **Step 6: Rewrite `src/components/SiteNav.astro`.**

```astro
---
import { withBase, withoutBase } from '../utils/base-path';
import CopyIcon from '../assets/icons/copy.svg';
import CheckIcon from '../assets/icons/check.svg';

interface Props {
  currentPath: string;
  /** D-040: purple on case studies, White on the home page. */
  variant?: 'purple' | 'white';
}

const { currentPath, variant = 'purple' } = Astro.props;

// D-049: About and Resume return when each has a screen or a target
// (Q-011). Contact is replaced by "Email me" (D-038).
const links = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
];

const email = 'hello@cassandragarratt.com';

const path = withoutBase(currentPath);
const current = path.length > 1 ? path.replace(/\/$/, '') : path;

const isCurrent = (href: string) =>
  href === '/'
    ? current === '/'
    : current === href || current.startsWith(`${href}/`);
---

<header class:list={['site-header', `site-header--${variant}`]}>
  <nav class="site-nav" aria-label="Main">
    <a class="site-nav__brand" href={withBase('/')}>cassandra garratt</a>
    <ul class="site-nav__list" role="list">
      {links.map(({ label, href }) => (
        <li>
          <a
            class="site-nav__link"
            href={withBase(href)}
            aria-current={isCurrent(href) ? 'page' : undefined}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
    <a class="site-nav__utility" href={`mailto:${email}`} data-copy-email={email}>
      Email me
      <span class="site-nav__icon" aria-hidden="true">
        <span class="site-nav__icon-copy"><CopyIcon /></span>
        <span class="site-nav__icon-tick"><CheckIcon /></span>
      </span>
    </a>
  </nav>
  <span class="visually-hidden" role="status" data-copy-status></span>
</header>

<style>
  /* Colourways (D-040). Purple is the case study bar; White (272:2233) is
     the home page's. The White bar's hover is undesigned: Light purple text
     would be ~1.4:1 on Off-white, so its text stays Purple and the dot is
     Purple (Reece, 2026-10-20). Selected is the same pill on both. */
  .site-header {
    --nav-brand: var(--color-white);
    --nav-text: var(--color-white);
    --nav-utility: var(--color-off-white);
    --nav-hover: var(--color-light-purple);

    background-color: var(--color-purple);
  }

  .site-header--white {
    --nav-brand: var(--color-red);
    --nav-text: var(--color-purple);
    --nav-utility: var(--color-purple);
    --nav-hover: var(--color-purple);

    background-color: var(--color-off-white);
  }

  /* Brand, links and utility link as three flex children spread apart, as
     Figma lays them out (justify-between, so the links sit between the two
     rather than exactly centred). */
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-nav-row-gap);
    max-inline-size: var(--page-max-width);
    margin-inline: auto;
    padding-block: var(--space-nav-block);
    padding-inline: var(--space-gutter);
  }

  .site-nav__brand {
    color: var(--nav-brand);
    font-size: var(--type-brand-size);
    font-weight: var(--type-brand-weight);
    line-height: var(--type-brand-line-height);
    letter-spacing: var(--type-brand-letter-spacing);
    text-decoration: none;
  }

  .site-nav__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-nav-row-gap) var(--space-nav-gap);
    padding: 0;
    list-style: none;
  }

  .site-nav__link,
  .site-nav__utility {
    font-size: var(--type-nav-size);
    font-weight: var(--type-nav-weight);
    line-height: var(--type-nav-line-height);
    letter-spacing: var(--type-nav-letter-spacing);
    text-decoration: none;
  }

  .site-nav__link {
    position: relative;
    display: block;
    color: var(--nav-text);
  }

  /* Selected: the pill is the item's own padding (8px 24px), so the focus
     ring follows its box and radius with no extra drawing. */
  .site-nav__link[aria-current='page'] {
    padding-block: var(--space-nav-pill-block);
    padding-inline: var(--space-nav-pill-inline);
    border-radius: var(--radius-pill);
    background-color: var(--color-light-purple);
    color: var(--color-purple);
  }

  @media (forced-colors: active) {
    .site-nav__link[aria-current='page'] {
      text-decoration: underline;
    }
  }

  /* Hover: the dot under the item (not on the selected item) */
  .site-nav__link:not([aria-current='page']):is(:hover, :focus-visible) {
    color: var(--nav-hover);
  }

  .site-nav__link:not([aria-current='page']):is(:hover, :focus-visible)::after {
    content: '';
    position: absolute;
    inset-block-start: 100%;
    inset-inline-start: 50%;
    inline-size: var(--size-nav-dot);
    block-size: var(--size-nav-dot);
    border-radius: var(--radius-pill);
    background-color: var(--nav-hover);
    translate: -50% 0;
  }

  .site-nav__utility {
    display: inline-flex;
    gap: var(--space-nav-utility-gap);
    align-items: center;
    color: var(--nav-utility);
  }

  /* Copy icon and tick share one 24px slot; data-copied swaps them. */
  .site-nav__icon {
    display: grid;
    inline-size: var(--size-nav-icon);
    block-size: var(--size-nav-icon);
  }

  .site-nav__icon > * {
    grid-area: 1 / 1;
  }

  .site-nav__icon :global(svg) {
    inline-size: 100%;
    block-size: 100%;
  }

  .site-nav__icon-tick,
  .site-nav__utility[data-copied] .site-nav__icon-copy {
    visibility: hidden;
  }

  .site-nav__utility[data-copied] .site-nav__icon-tick {
    visibility: visible;
  }
</style>

<script>
  // Reason for client JS (invariant 3), D-038: "Email me" copies the
  // address to the clipboard, which has no HTML-only equivalent. Without JS,
  // or if copying fails, the link opens its mailto: as normal.
  //
  // The tick is PROVISIONAL (D-048): phase 3A replaces check.svg with the
  // landing page's tick, so one tick is used everywhere. How long it shows
  // is undesigned (Reece approved 3 seconds).
  const COPIED_MS = 3000;
  const link = document.querySelector<HTMLAnchorElement>('[data-copy-email]');
  const status = document.querySelector<HTMLElement>('[data-copy-status]');

  if (link && status) {
    let timer = 0;
    link.addEventListener('click', async (event) => {
      // Leave modified clicks (new tab, new window) to the browser.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      try {
        // Read at click time: navigator.clipboard is missing outside
        // secure contexts, and the TypeError lands in the catch.
        await navigator.clipboard.writeText(link.dataset.copyEmail ?? '');
      } catch {
        location.href = link.href;
        return;
      }
      link.toggleAttribute('data-copied', true);
      // Clear first, so a second copy is announced again.
      status.textContent = '';
      requestAnimationFrame(() => {
        status.textContent = 'Email address copied';
      });
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        link.removeAttribute('data-copied');
        status.textContent = '';
      }, COPIED_MS);
    });
  }
</script>
```

- [ ] **Step 7: `BaseLayout`.** In `src/layouts/BaseLayout.astro`, add the prop (after `fullBleed?: boolean;`):

```ts
  /** The nav bar's colourway (D-040): purple on case studies, White on home. */
  navVariant?: 'purple' | 'white';
```

Change the destructuring to `const { title, fullBleed = false, navVariant = 'purple' } = Astro.props;`. Replace

```astro
    <header class="site-header">
      <SiteNav currentPath={Astro.url.pathname} />
    </header>
```

with

```astro
    <SiteNav currentPath={Astro.url.pathname} variant={navVariant} />
```

and delete the `.site-header { … }` rule from its `<style>`.

- [ ] **Step 8: Home page.** In `src/pages/index.astro`, change `<BaseLayout title="cassandra garratt">` to `<BaseLayout title="cassandra garratt" navVariant="white">`.

- [ ] **Step 9: Build and re-run the probes.**

```bash
npm run build
sh .superpowers/sdd/2026-10-20-foundation/probe.sh nav cs1
sh .superpowers/sdd/2026-10-20-foundation/probe.sh nav home
sh .superpowers/sdd/2026-10-20-foundation/probe.sh copy cs1
```

Expected:
- `nav cs1`: `"variant":"purple"`, `"headerBg":"rgb(72, 50, 161)"`, `"headerHeight":90`, `"brand":"rgb(255, 255, 255)"`, `"items":[["Home",null,"16px","rgba(0, 0, 0, 0)"],["Work","page","16px","rgb(196, 205, 244)"]]`, `"utility":["Email me","mailto:hello@cassandragarratt.com"]`.
- `nav home`: `"variant":"white"`, `"headerBg":"rgb(248, 249, 255)"`, `"brand":"rgb(205, 43, 43)"`, Home has `"page"` and the Light purple background.
- `copy cs1`: `afterClick` = `{"copied":"hello@cassandragarratt.com","dataCopied":true,"tick":"visible","status":"Email address copied"}`; `afterRevert` = `{"dataCopied":false,"tick":"hidden","status":""}`; `"fallback":"#mailto-fallback"`.

- [ ] **Step 10: Screenshots.**

```bash
sh .superpowers/sdd/2026-10-20-foundation/shoot-all.sh t2
node .superpowers/sdd/2026-10-20-foundation/diff.mjs .superpowers/sdd/2026-10-20-foundation/shots/before-cs1/full.png .superpowers/sdd/2026-10-20-foundation/shots/t2-cs1/full.png
```

Expected: `DIFFERS: … rows 0-~95` only, because the header stays 90px and nothing below it moves. Repeat the diff for cs2, cs3 and home: same row range. Then **look**: Read `shots/t2-cs1/full.png` (top 100px) and `docs/figma/components/navigation/screenshot-2026-10-20.png` (the `Selcted` and `White` rows). Check the brand left, Home · Work in the middle, Email me with its icon on the right, 16px text, the Work pill, and on home the Red wordmark and Purple links.

- [ ] **Step 11: Keyboard.** Take shots with `--tab=6` on cs1 and home, then read `focus.txt`. Expected order: skip link, `cassandra garratt`, Home, Work, Email me (`mailto:` href), then the sub nav's "All Projects" on cs1. Each line has `outline=solid 3px` or `shadow=true`.

```bash
node .superpowers/sdd/2026-10-20-foundation/shoot.mjs http://localhost:4392/work/streamlining-scoring/ .superpowers/sdd/2026-10-20-foundation/shots/t2-tab-cs1 --tab=6
```

Then shoot the White bar's focus state on Work: the 4th Tab stop is skip link, brand, Home, then Work.

```bash
node .superpowers/sdd/2026-10-20-foundation/shoot.mjs http://localhost:4392/ .superpowers/sdd/2026-10-20-foundation/shots/t2-focus-home --pretab=4
```

Read the top of `full.png`. Expected: Work stays Purple with a Purple 10px dot under it, plus the shared focus ring; Home keeps its pill. Repeat with the cs1 URL: Home turns Light purple with a Light purple dot (the 3rd stop, so `--pretab=3`).

- [ ] **Step 12: Checks, then commit.**

```bash
npm run build && npm run check && npm run format:check
git add src/styles/tokens.css src/assets/icons/copy.svg src/assets/icons/check.svg src/components/SiteNav.astro src/layouts/BaseLayout.astro src/pages/index.astro
git commit -m "feat(nav): build the new nav with variants and Email me copy" -m "Home and Work only (D-049), a White variant for the home page (D-040), and Email me copying the address with a provisional tick (D-038, D-048). SiteNav now renders the header." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Hide the nav on scroll down, show it on scroll up

**Files:**
- Modify: `src/components/SiteNav.astro` (styles and a second `<script>`)
- Modify: `src/components/CaseStudySubNav.astro` (`.sub-nav` sticky offset only)
- Modify: `src/styles/tokens.css` (motion)
- Test: `$T/probes/scroll.js`, `$T/probes/motion.js`

**Interfaces:**
- Consumes: `.site-header`, `.site-nav__brand` (Task 2).
- Produces: `--site-header-offset` on `<html>` (`<n>px` or `0px`); `.site-header[data-hidden]`; the `site-header--scroll-aware` class; tokens `--duration-slide`, `--ease-slide`.

- [ ] **Step 1: Write the scroll probe** `$T/probes/scroll.js`.

```js
(async () => {
  const settle = () =>
    new Promise((r) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTimeout(r, 50)),
      ),
    );
  const header = document.querySelector('.site-header');
  const sub = document.querySelector('.sub-nav');
  const state = (step) => ({
    step,
    y: Math.round(scrollY),
    hidden: header.hasAttribute('data-hidden'),
    offset: getComputedStyle(document.documentElement)
      .getPropertyValue('--site-header-offset')
      .trim(),
    headerBottom: Math.round(header.getBoundingClientRect().bottom),
    subTop: sub ? Math.round(sub.getBoundingClientRect().top) : null,
  });
  const to = async (top) => {
    scrollTo({ top, behavior: 'instant' });
    await settle();
  };
  const out = [state('top')];
  await to(2000);
  out.push(state('down'));
  await to(1700);
  out.push(state('up'));
  await to(2400);
  out.push(state('down again'));
  document.querySelector('.site-nav__brand').focus();
  await settle();
  out.push(state('focus in nav'));
  document.activeElement.blur();
  if (sub) {
    await to(document.documentElement.scrollHeight);
    out.push(state('bottom'));
    // A mid-page section, so the jump lands well below the header's height.
    document.querySelectorAll('.sub-nav__link')[2].click();
    await new Promise((r) => {
      addEventListener('scrollend', r, { once: true });
      setTimeout(r, 2500);
    });
    await settle();
    out.push(state('jumped up via sub nav'));
    await to(scrollY - 300);
    out.push(state('scrolled up after jump'));
  }
  return JSON.stringify(out);
})()
```

- [ ] **Step 2: Write the motion probe** `$T/probes/motion.js`. It removes `shoot.mjs`'s transition kill-switch so the real durations show.

```js
(() => {
  for (const s of document.head.querySelectorAll('style'))
    if (s.textContent.includes('transition: none !important')) s.remove();
  const d = (sel) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el).transitionDuration : null;
  };
  return JSON.stringify({ header: d('.site-header'), subNav: d('.sub-nav') });
})()
```

- [ ] **Step 3: Run them; they must fail.**

```bash
sh .superpowers/sdd/2026-10-20-foundation/probe.sh scroll cs1
sh .superpowers/sdd/2026-10-20-foundation/probe.sh motion cs1
```

Expected: every `scroll` step has `"hidden":false` and `"offset":""`. `motion` shows `"header":"0s"`.

- [ ] **Step 4: Motion tokens.** In `tokens.css`, after `--ease-hover`, add:

```css
  /* The nav sliding away and back (D-045), and the sub nav following it.
     Not in Figma. The only movement on the site; off under reduced motion */
  --duration-slide: 200ms;
  --ease-slide: ease-out;
```

- [ ] **Step 5: Header styles.** In `SiteNav.astro`'s `<style>`, after the `.site-header--white` rule, add:

```css
  /* Hide on scroll down, return on scroll up (D-045). The script adds the
     class, so without JS the header simply scrolls away as before. Above
     the sub nav (z-index 2), below the skip link (100). */
  .site-header--scroll-aware {
    position: sticky;
    inset-block-start: 0;
    z-index: 3;
    transition: translate var(--duration-slide) var(--ease-slide);
  }

  .site-header--scroll-aware[data-hidden] {
    translate: 0 -100%;
  }

  @media (prefers-reduced-motion: reduce) {
    .site-header--scroll-aware {
      transition: none;
    }
  }
```

- [ ] **Step 6: The script.** Append a second `<script>` to `SiteNav.astro`:

```astro
<script>
  // Reason for client JS (invariant 3), D-045: the nav hides while the page
  // scrolls down and returns when it scrolls up. CSS can't read scroll
  // direction in every browser. The script publishes the header's visible
  // height as --site-header-offset on <html>; the case study sub nav sticks
  // at that offset, so it moves below the returning nav and is never
  // covered by it.
  const header = document.querySelector<HTMLElement>('.site-header');

  if (header) {
    const root = document.documentElement;
    const DEAD_BAND = 8; // px; smaller movements are jitter, not intent
    const JUMP_TIMEOUT = 1500; // ms; fallback where scrollend never fires
    let height = header.offsetHeight;
    let hidden = false;
    let lastY = scrollY;
    let jumping = false;
    let jumpTimer = 0;
    let frame = 0;

    const writeOffset = () =>
      root.style.setProperty(
        '--site-header-offset',
        `${hidden ? 0 : height}px`,
      );

    const setHidden = (value: boolean) => {
      if (value === hidden) return;
      hidden = value;
      header.toggleAttribute('data-hidden', value);
      writeOffset();
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = scrollY;
        // Near the top the header is in its own place: always show it.
        if (y <= height) {
          setHidden(false);
          lastY = y;
          return;
        }
        if (Math.abs(y - lastY) < DEAD_BAND) return;
        if (!jumping) setHidden(y > lastY);
        lastY = y;
      });
    };

    // An in-page jump (the sub nav, the skip link) hides the nav and holds
    // it hidden until the scroll ends. Otherwise jumping up would bring the
    // nav back over the heading the jump was aiming at.
    const endJump = () => {
      jumping = false;
      clearTimeout(jumpTimer);
      lastY = scrollY;
    };
    document.addEventListener('click', (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!link || header.contains(link)) return;
      jumping = true;
      setHidden(true);
      clearTimeout(jumpTimer);
      jumpTimer = window.setTimeout(endJump, JUMP_TIMEOUT);
    });
    addEventListener('scrollend', () => {
      if (jumping) endJump();
    });

    // Keyboard focus inside the nav brings it back.
    header.addEventListener('focusin', () => setHidden(false));

    new ResizeObserver(() => {
      height = header.offsetHeight;
      writeOffset();
    }).observe(header);

    header.classList.add('site-header--scroll-aware');
    writeOffset();
    addEventListener('scroll', onScroll, { passive: true });
  }
</script>
```

- [ ] **Step 7: Sub nav offset.** In `CaseStudySubNav.astro`, change `.sub-nav`'s `inset-block-start: 0;` to:

```css
    /* Below the site header while it shows, at the top while it's hidden.
       SiteNav writes the offset (D-045); 0 without JS. */
    inset-block-start: var(--site-header-offset, 0);
    transition: inset-block-start var(--duration-slide) var(--ease-slide);
```

and add, after the `.sub-nav` rule:

```css
  @media (prefers-reduced-motion: reduce) {
    .sub-nav {
      transition: none;
    }
  }
```

(Task 4 rewrites this file; keep these lines there.)

- [ ] **Step 8: Build and re-run.**

```bash
npm run build
sh .superpowers/sdd/2026-10-20-foundation/probe.sh scroll cs1
sh .superpowers/sdd/2026-10-20-foundation/probe.sh scroll home
sh .superpowers/sdd/2026-10-20-foundation/probe.sh motion cs1
sh .superpowers/sdd/2026-10-20-foundation/probe.sh motion cs1 --reduced-motion
sh .superpowers/sdd/2026-10-20-foundation/probe.sh nav cs1 --nojs
```

Expected `scroll cs1`:

| step | hidden | offset | headerBottom | subTop |
|---|---|---|---|---|
| top | false | 90px | 90 | 90 |
| down | true | 0px | 0 | 0 |
| up | false | 90px | 90 | 90 |
| down again | true | 0px | 0 | 0 |
| focus in nav | false | 90px | 90 | 90 |
| bottom | true | 0px | 0 | 0 |
| jumped up via sub nav | **true** | 0px | 0 | 0 |
| scrolled up after jump | false | 90px | 90 | 90 |

`scroll home` covers the first five steps the same way, with `subTop: null`. `motion` gives `{"header":"0.2s","subNav":"0.2s"}`, and with `--reduced-motion` gives `{"header":"0s","subNav":"0s"}`. `nav cs1 --nojs` gives `"position":"static"`; without `--nojs` it's `"sticky"`.

If "jumped up" shows `hidden:false`, read the event order before changing anything: the probe calls `.click()` on the link, which runs the document click listener synchronously before the smooth scroll starts.

- [ ] **Step 9: No visual change at the top.** Run `shoot-all.sh t3` and diff each `t3-*/full.png` with `t2-*/full.png`. Expected: `IDENTICAL` (the full-page capture resizes the viewport to the page, so nothing is stuck).

- [ ] **Step 10: Checks, commit.**

```bash
npm run build && npm run check && npm run format:check
git add src/styles/tokens.css src/components/SiteNav.astro src/components/CaseStudySubNav.astro
git commit -m "feat(nav): hide the nav on scroll down and show it on scroll up" -m "The sub nav sticks below the returning nav through --site-header-offset, so it's never covered (D-045). In-page jumps keep the nav hidden until the scroll ends. Without JS the header scrolls away as before." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Sub nav: per-item underline, Regular links, back arrow, 80px gap

**Files:**
- Create: `src/assets/icons/arrow-back.svg`
- Rewrite: `src/components/CaseStudySubNav.astro`
- Modify: `src/styles/tokens.css` (sub nav sizes)
- Test: `$T/probes/subnav.js`

**Interfaces:**
- Consumes: `--site-header-offset`, `--duration-slide`, `--ease-slide` (Task 3).
- Produces: `.sub-nav__link[aria-current="true"]`, `.sub-nav__item`. Section shots: the sub nav is now 80px tall (was 83), and the intro starts 80px below it (was 160), so **every section below moves up 83px** on all three pages.

- [ ] **Step 1: Write the probe** `$T/probes/subnav.js`.

```js
(async () => {
  const settle = () =>
    new Promise((r) =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTimeout(r, 50)),
      ),
    );
  const links = [...document.querySelectorAll('.sub-nav__link')];
  const snap = () =>
    links.map((a) => ({
      label: a.textContent.trim(),
      current: a.getAttribute('aria-current'),
      weight: getComputedStyle(a).fontWeight,
      x: Math.round(a.getBoundingClientRect().left),
      underline: getComputedStyle(a.parentElement, '::after').content !== 'none',
    }));
  const back = document.querySelector('.sub-nav__back');
  const sub = document.querySelector('.sub-nav');
  const intro = document.querySelector('.case-study-intro');
  const top = {
    back: back.textContent.trim().replace(/\s+/g, ' '),
    backSvg: !!back.querySelector('svg'),
    subNavHeight: Math.round(sub.getBoundingClientRect().height),
    introGap: Math.round(
      intro.getBoundingClientRect().top - sub.getBoundingClientRect().bottom,
    ),
    links: snap(),
  };
  scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
  await settle();
  return JSON.stringify({ top, bottom: snap() });
})()
```

- [ ] **Step 2: Run it; it must fail.** `sh …/probe.sh subnav cs1`. Expected: `"back":"← All projects"`, `"backSvg":false`, `"subNavHeight":83`, `"introGap":160`, every link `"weight":"700"`, `"underline":false`.

- [ ] **Step 3: Arrow.** Create `src/assets/icons/arrow-back.svg`. This is Figma's `arrow_upward` (`144:540`) rotated to point left, the same glyph as Material `arrow_back`:

```svg
<svg width="22.0646" height="21.4809" viewBox="0 0 22.0646 21.4809" fill="none" xmlns="http://www.w3.org/2000/svg">
<path transform="translate(0 21.4809) rotate(-90)" d="M9.333 4.81667L2.39133 11.7583C2.108 12.0417 1.77744 12.1774 1.39967 12.1656C1.02189 12.1538 0.691333 12.0063 0.408 11.7229C0.148278 11.4396 0.0125139 11.109 0.000708333 10.7312C-0.0110972 10.3535 0.124667 10.0229 0.408 9.73958L9.758 0.389583C9.89967 0.247917 10.0531 0.147569 10.2184 0.0885417C10.3837 0.0295139 10.5608 0 10.7497 0C10.9386 0 11.1156 0.0295139 11.2809 0.0885417C11.4462 0.147569 11.5997 0.247917 11.7413 0.389583L21.0913 9.73958C21.3511 9.99931 21.4809 10.324 21.4809 10.7135C21.4809 11.1031 21.3511 11.4396 21.0913 11.7229C20.808 12.0063 20.4715 12.1479 20.082 12.1479C19.6924 12.1479 19.3559 12.0063 19.0726 11.7229L12.1663 4.81667V20.6479C12.1663 21.0493 12.0306 21.3858 11.759 21.6573C11.4875 21.9288 11.1511 22.0646 10.7497 22.0646C10.3483 22.0646 10.0118 21.9288 9.74029 21.6573C9.46876 21.3858 9.333 21.0493 9.333 20.6479V4.81667Z" fill="currentColor"/>
</svg>
```

- [ ] **Step 4: Tokens.** After `--size-nav-icon`, add:

```css
  --size-back-arrow: 1.379rem; /* 22.06px; sub nav arrow_back (144:540) */
  --size-sub-nav-underline: 0.1875rem; /* 3px; current section (144:529) */
```

- [ ] **Step 5: Rewrite `CaseStudySubNav.astro`.**

```astro
---
import { withBase } from '../utils/base-path';
import ArrowBack from '../assets/icons/arrow-back.svg';

interface Props {
  links: { href: string; label: string }[];
}

const { links } = Astro.props;
---

<nav class="sub-nav u-bleed" aria-label="Case study sections">
  <div class="sub-nav__inner">
    <a class="sub-nav__back" href={withBase('/work')}>
      <span class="sub-nav__back-arrow" aria-hidden="true"><ArrowBack /></span>
      All Projects
    </a>
    <ul class="sub-nav__list" role="list">
      {links.map((link) => (
        <li class="sub-nav__item">
          <a class="sub-nav__link" href={link.href} data-label={link.label}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
</nav>

<style>
  .sub-nav {
    position: sticky;
    /* Below the site header while it shows, at the top while it's hidden.
       SiteNav writes the offset (D-045); 0 without JS. */
    inset-block-start: var(--site-header-offset, 0);
    z-index: 2;
    /* 80px to the intro instead of the grid's 160px section gap: the intro
       moved up 80px on CS1–3 (2026-10-20, Cass's "halve the space"). */
    margin-block-end: calc(var(--space-80) - var(--space-160));
    background-color: var(--color-white);
    transition: inset-block-start var(--duration-slide) var(--ease-slide);
  }

  @media (prefers-reduced-motion: reduce) {
    .sub-nav {
      transition: none;
    }
  }

  .sub-nav__inner {
    display: flex;
    gap: var(--space-40);
    align-items: center;
    justify-content: space-between;
    block-size: var(--space-80); /* 80px */
    /* The bar bleeds to the viewport edge; its contents stop at the page
       width, like the site header's. */
    max-inline-size: var(--page-max-width);
    margin-inline: auto;
    padding-inline: var(--space-gutter);
  }

  .sub-nav__back {
    display: inline-flex;
    gap: var(--space-back-link-gap);
    align-items: center;
    color: var(--color-purple);
    font-weight: var(--type-nav-weight);
    text-decoration: none;
  }

  .sub-nav__back-arrow {
    display: block;
    inline-size: var(--size-back-arrow);
  }

  .sub-nav__back-arrow :global(svg) {
    inline-size: 100%;
    block-size: auto;
  }

  /* The list fills the bar's height so the underline can sit on its
     bottom edge, as in Figma (144:529). */
  .sub-nav__list {
    display: flex;
    align-self: stretch;
    gap: var(--space-40);
    padding: 0;
    list-style: none;
  }

  .sub-nav__item {
    position: relative;
    display: flex;
    align-items: center;
  }

  /* D-039: Regular, with the current section Bold. A hidden bold copy of
     the label reserves the bold width, so the links don't shift as the
     current section changes. */
  .sub-nav__link {
    display: inline-flex;
    flex-direction: column;
    color: var(--color-purple);
    font-weight: var(--type-body-weight);
    text-decoration: none;
  }

  .sub-nav__link::after {
    content: attr(data-label);
    block-size: 0;
    overflow: hidden;
    visibility: hidden;
    font-weight: var(--type-nav-weight);
  }

  .sub-nav__link[aria-current='true'] {
    font-weight: var(--type-nav-weight);
  }

  /* D-039: a 3px Red underline under the current item only. */
  .sub-nav__item:has(> [aria-current='true'])::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-end: 0;
    block-size: var(--size-sub-nav-underline);
    background-color: var(--color-red);
  }

  @media (forced-colors: active) {
    .sub-nav__item:has(> [aria-current='true'])::after {
      forced-color-adjust: none;
      background-color: CanvasText;
    }
  }
</style>

<script>
  // Reason for client JS (invariant 3), D-039: the current section's link
  // is marked as the page scrolls, which needs the scroll position.
  const anchors = [
    ...document.querySelectorAll<HTMLAnchorElement>('.sub-nav__link'),
  ];
  // [link, section] pairs, so a missing target drops its link from the spy
  // instead of shifting every later index.
  const items = anchors.flatMap((link) => {
    const section = link.hash ? document.querySelector(link.hash) : null;
    return section ? [{ link, section }] : [];
  });

  if (items.length > 0) {
    let current = -1;

    const setCurrent = (index: number) => {
      if (index === current) return;
      current = index;
      items.forEach(({ link }, i) =>
        link.setAttribute('aria-current', i === index ? 'true' : 'false'),
      );
    };

    // The current section is the last one whose top has passed a line 20%
    // down the viewport. At the very bottom of the page the last section
    // may never reach that line, so it becomes current there.
    const currentIndex = () => {
      const atBottom =
        Math.ceil(scrollY + innerHeight) >=
        document.documentElement.scrollHeight;
      if (atBottom) return items.length - 1;
      const line = innerHeight * 0.2;
      let index = 0;
      items.forEach(({ section }, i) => {
        if (section.getBoundingClientRect().top <= line) index = i;
      });
      return index;
    };

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setCurrent(currentIndex()));
    };

    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }
</script>
```

- [ ] **Step 6: Build and re-run** `probe.sh subnav` on cs1, cs2 and cs3. Expected on each:
  - `"back":"All Projects"`, `"backSvg":true`, `"subNavHeight":80`, `"introGap":80`.
  - `top.links`: the first link is `"current":"true"`, `"weight":"700"` and `"underline":true`; the rest are `"false"`, `"400"` and `false`.
  - `bottom`: the last link is current.
  - **Every link's `x` is the same in `top` and `bottom`**, so nothing shifts.

  Re-run `probe.sh scroll cs1`: the same table as Task 3.

- [ ] **Step 7: Screenshots.** Run `shoot-all.sh t4`. For each case study, every section shot from `01-…` onwards must be `IDENTICAL` to `t3-*` (the sections only moved), and `00-sub-nav.png` differs. Read `t4-cs1/00-sub-nav.png` beside `docs/figma/components/sub-nav/screenshot-2026-10-20.png`: the arrow and "All Projects", Regular links, Bold "Project Overview" with the Red underline at the bar's bottom edge. Then Read the top 400px of `t4-cs1/full.png` beside `docs/figma/case-study-1-desktop/screenshot-2026-10-20.png`: the intro now starts 80px under the sub nav.

- [ ] **Step 8: Checks, commit.**

```bash
npm run build && npm run check && npm run format:check
git add src/assets/icons/arrow-back.svg src/styles/tokens.css src/components/CaseStudySubNav.astro
git commit -m "feat(sub-nav): underline the current section and halve the intro gap" -m "Regular links with the current one Bold and underlined in Red (D-039), Material arrow_back, \"All Projects\", and 80px to the intro as in the 2026-10-20 frames." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Intro gaps, CS3 image position, pill icon

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/components/CaseStudyIntro.astro` (header gaps, bleed image)
- Modify: `src/components/Pill.astro` (icon)
- Possibly modify: `src/assets/icons/woman-3.svg` (viewBox only; see Step 6)
- Test: `$T/probes/intro.js`, `$T/probes/pill-icon.js`, `$T/ink.mjs`

**Interfaces:**
- Produces: tokens `--space-intro-eyebrow-title`, `--space-intro-title-pills`, `--space-intro-image-nudge`, `--size-pill-icon`, `--size-pill-icon-glyph`.

- [ ] **Step 1: Write the rect probe** `$T/probes/intro.js`.

```js
JSON.stringify(
  ['header', 'eyebrow', 'title', 'users', 'image'].map((k) => {
    const r = document
      .querySelector(`.case-study-intro__${k}`)
      .getBoundingClientRect();
    return [k, ...[r.left, r.right, r.top, r.bottom].map(Math.round)];
  }),
)
```

- [ ] **Step 2: Measure the current visible gaps on CS1 at 1920.**

```bash
sh .superpowers/sdd/2026-10-20-foundation/probe.sh intro cs1
node .superpowers/sdd/2026-10-20-foundation/ink.mjs .superpowers/sdd/2026-10-20-foundation/shots/probe-intro-cs1/full.png <header.left> <header.right> <eyebrow.top - 10> <users.bottom>
```

Expected: the runs are the eyebrow (run 0), the title's line(s), then the pills (the last run). Write down **g1** = the gap above run 1 (eyebrow ink to title ink) and **g2** = the gap above the last run (title ink to pill top). Run the same on cs2 and cs3 and record all six numbers. If the runs don't separate like this (for example, the eyebrow's tails touch the title), stop and report to Reece with the crop: don't guess.

- [ ] **Step 3: Compute the new values from CS1.** Both gaps are 16px today, and a change in the gap moves the ink one for one, so:
  - eyebrow → title: `m1 = 16 − g1 / 2` px
  - title → pills: `m2 = 16 + 0.2 × g2` px, each rounded to the nearest whole px

  `m1` may be negative.

- [ ] **Step 4: Tokens.** After `--space-intro-columns`, add (fill in the measured numbers):

```css
  /* D-046: Cass's intro spacing, applied to the gaps a reader sees, which
     include the letters' tails (Figma's 16px gaps compensate; ours don't).
     Measured on CS1 at 1920px (ink.mjs), 2026-10-20: eyebrow → title ink
     <g1>px, halved → <m1>px; title → pills <g2>px, +20% → <m2>px.
     CS2: <g1>/<g2>px; CS3: <g1>/<g2>px. */
  --space-intro-eyebrow-title: <m1 / 16>rem; /* <m1>px */
  --space-intro-title-pills: <m2 / 16>rem; /* <m2>px */
```

Change `--space-intro-image-drop` to:

```css
  --space-intro-image-drop: 10rem; /* 160px; CS3's hero (99:2503) sits this
  far below the top of the intro (y=410 against 250, 2026-10-20; was 111) */
  --space-intro-image-nudge: 0.4375rem; /* 7px; and this far right of its
  column (x=922, was 915) */
```

- [ ] **Step 5: `CaseStudyIntro.astro` styles.** Replace the `.case-study-intro__header` rule's `gap: var(--space-16);` with `gap: 0;` and add:

```css
  /* D-046: the measured gaps, as margins because the first may be
     negative. */
  .case-study-intro__title {
    margin-block-start: var(--space-intro-eyebrow-title);
  }

  .case-study-intro__users {
    margin-block-start: var(--space-intro-title-pills);
  }
```

(Merge with the existing `.case-study-intro__title` and `.case-study-intro__users` rules instead of duplicating selectors.) In `.case-study-intro--bleed .case-study-intro__image`, change `inline-size` and add the nudge:

```css
    inline-size: calc(100% + var(--space-gutter) - var(--space-intro-image-nudge));
    margin-inline-start: var(--space-intro-image-nudge);
```

Update the props comment `sits 111px below the intro's top` to `sits 160px below the intro's top and 7px into its column`.

- [ ] **Step 6: Pill icons. First measure the artwork.** Write `$T/probes/pill-icon.js`:

```js
(async () => {
  const out = [];
  for (const img of document.querySelectorAll('.pill__icon')) {
    const cs = getComputedStyle(img);
    const text = await (await fetch(img.currentSrc || img.src)).text();
    const holder = document.createElement('div');
    holder.style.cssText = 'position:absolute;inset-inline-start:-9999px';
    holder.innerHTML = text;
    document.body.append(holder);
    const svg = holder.querySelector('svg');
    const b = svg.getBBox();
    out.push({
      src: (img.currentSrc || img.src).split('/').pop(),
      box: Math.round(img.getBoundingClientRect().width),
      content:
        parseFloat(cs.width) -
        parseFloat(cs.paddingLeft) -
        parseFloat(cs.paddingRight),
      viewBox: svg.getAttribute('viewBox'),
      artwork: [b.x, b.y, b.width, b.height].map((n) => +n.toFixed(2)),
    });
    holder.remove();
  }
  return JSON.stringify(out);
})()
```

Run it on cs1 (`woman-3`), cs2 (`man-2`, `woman-3`) and cs3 (`man-3`). Expected now: `box 24`, `content 24`. `man-2` (`0 0 20 20`) and `man-3` (`0 0 22 22`) should show artwork filling their viewBox. **`woman-3` (`0 0 24 24`) is the one to check.** If its artwork is noticeably smaller than 24 in both directions, the export includes frame padding. In that case, change its root `viewBox`, `width` and `height` to the artwork bounds (x, y, w, h rounded to 2 dp), so all three files are artwork-tight and render the same way. Report the numbers either way.

- [ ] **Step 7: Pill tokens and CSS.** After `--size-nav-icon`, add:

```css
  /* D-047: the user-type icon's frame is 24px; the artwork inside it is
     22px, centred. The icon files are cropped to their artwork. */
  --size-pill-icon: 1.5rem; /* 24px */
  --size-pill-icon-glyph: 1.375rem; /* 22px */
```

In `Pill.astro`, replace the `.pill__icon` rule with:

```css
  .pill__icon {
    inline-size: var(--size-pill-icon);
    block-size: var(--size-pill-icon);
    /* Border-box: the padding leaves the 22px artwork centred in the slot. */
    padding: calc((var(--size-pill-icon) - var(--size-pill-icon-glyph)) / 2);
  }
```

- [ ] **Step 8: Build, re-measure.** Re-run `probe.sh intro` and `ink.mjs` on all three pages. Expected on CS1: g1′ = g1 / 2 ± 1px, g2′ = 1.2 × g2 ± 1px; CS2 and CS3 within ±1px of their own targets. If a page is off by more, report it. Re-run `pill-icon`: `box 24`, `content 22`. `probe.sh intro cs3`: `image.left` is 7px more than before and `image.top − header.top` is 160 (rounded).

- [ ] **Step 9: Before/after crops for Reece.** Save crops of the CS1 intro header (the rect from Step 1 with 20px of margin) from `before-cs1/full.png` and the new shot, as `$T/shots/intro-before.png` and `$T/shots/intro-after.png`. Use a one-off `sharp(...).extract(...)` from the worktree root. These go in the phase summary ("For Reece to check" item 2).

- [ ] **Step 10: Screenshots.** Run `shoot-all.sh t5`. `01-project-overview.png` differs on each case study; every later section is `IDENTICAL` to `t4`, **if** the intro's height is unchanged. If later sections shift, that's expected only by the intro's height change: check that the diff in `01-…` is confined to the header block and the CS3 image.

- [ ] **Step 11: Checks, commit.**

```bash
npm run build && npm run check && npm run format:check
git add src/styles/tokens.css src/components/CaseStudyIntro.astro src/components/Pill.astro
# plus src/assets/icons/woman-3.svg if Step 6 changed it
git commit -m "feat(intro): apply Cass's intro spacing and the 22px pill icon" -m "Eyebrow-to-title halved and title-to-pills +20%, measured on the rendered gaps (D-046); the user-type icon is 22px in its 24px slot (D-047); CS3's hero sits 160px down and 7px right, as in the 2026-10-20 frame." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Definition Tip on hover, focus and tap

**Files:**
- Modify: `src/components/DefinitionTip.astro`
- Test: `$T/probes/tip.js`

- [ ] **Step 1: Write the probe** `$T/probes/tip.js`.

```js
(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const trigger = document.querySelector('.definition-trigger');
  const tip = document.getElementById(trigger.getAttribute('popovertarget'));
  const open = () => tip.matches(':popover-open');
  const pe = (el, type, pointerType = 'mouse') =>
    el.dispatchEvent(new PointerEvent(type, { pointerType }));
  const cs = getComputedStyle(trigger);
  const out = {
    weight: cs.fontWeight,
    underline: cs.textDecorationLine,
    action: trigger.getAttribute('popovertargetaction'),
  };
  pe(trigger, 'pointerenter');
  await wait(20);
  out.hoverOpens = open();
  pe(trigger, 'pointerleave');
  await wait(50);
  pe(tip, 'pointerenter');
  await wait(300);
  out.staysOpenOverBubble = open();
  pe(tip, 'pointerleave');
  await wait(300);
  out.leavingCloses = !open();
  pe(trigger, 'pointerenter', 'touch');
  await wait(20);
  out.touchEnterIgnored = !open();
  trigger.click();
  await wait(20);
  out.clickOpens = open();
  trigger.click();
  await wait(20);
  out.secondClickKeepsOpen = open();
  tip.hidePopover();
  trigger.focus();
  await wait(20);
  out.focusOpens = open();
  trigger.blur();
  await wait(20);
  out.blurCloses = !open();
  return JSON.stringify(out);
})()
```

- [ ] **Step 2: Run it; it must fail** (cs1). Expected: `"weight":"400"`, `"action":null`, `hoverOpens:false`, and `secondClickKeepsOpen:false` (a click toggles today).

- [ ] **Step 3: Markup and style.** Add `popovertargetaction="show"` to the `<button>`. In `.definition-trigger` add `font-weight: var(--type-subtitle-emphasis-weight);` with the comment `/* D-042: the company name is Bold and underlined. */`.

- [ ] **Step 4: Script.** Replace the `<script>` with:

```astro
<script>
  // Reason for client JS (invariant 3). Opening on click or tap, closing on
  // Escape or a click outside, and focus handling are native to the
  // Popover API; the trigger's popovertargetaction="show" makes a click
  // only open it. The script adds two things:
  //  1. Position: popovers render in the top layer, outside the flow, so
  //     CSS can't place the bubble under its trigger. Without JS it opens
  //     centred in the viewport.
  //  2. D-042: open on hover (mouse and pen) and on keyboard focus. It stays
  //     open while the pointer is over the trigger or the bubble, with a
  //     short grace period for crossing the gap between them (WCAG 1.4.13),
  //     and closes on leaving or blur.
  const GRACE_MS = 200;

  for (const trigger of document.querySelectorAll<HTMLButtonElement>(
    '.definition-trigger',
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

    let hovering = false;
    let closeTimer = 0;
    const isOpen = () => tip.matches(':popover-open');
    const show = () => {
      clearTimeout(closeTimer);
      if (!isOpen()) tip.showPopover();
    };
    const hide = () => {
      if (isOpen()) tip.hidePopover();
    };
    // Keyboard focus keeps it open; a mouse click's focus doesn't.
    const closeSoon = () => {
      clearTimeout(closeTimer);
      closeTimer = window.setTimeout(() => {
        if (!hovering && !trigger.matches(':focus-visible')) hide();
      }, GRACE_MS);
    };

    for (const el of [trigger, tip]) {
      el.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'touch') return;
        hovering = true;
        show();
      });
      el.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'touch') return;
        hovering = false;
        closeSoon();
      });
    }
    trigger.addEventListener('focus', show);
    trigger.addEventListener('blur', () => {
      if (!hovering) hide();
    });
  }
</script>
```

- [ ] **Step 5: Build, re-run** `probe.sh tip` on cs1, cs2 and cs3. Expected on each: `"weight":"700"`, `"underline":"underline"`, `"action":"show"`, and every other key `true`.

- [ ] **Step 6: Real keyboard focus.** Run `node …/shoot.mjs http://localhost:4392/work/streamlining-scoring/ …/shots/t6-tab-cs1 --tab=16` and find the line in `focus.txt` whose href column is `def-absa`. Its number is n. Then run `node …/shoot.mjs http://localhost:4392/work/streamlining-scoring/ …/shots/t6-tip-cs1 --pretab=<n>` and Read `01-project-overview.png`: the bubble is open under "Absa". Escape and light dismiss are native to `popover="auto"` and aren't automated here; list them as a manual check for Reece in the PR.

- [ ] **Step 7: Screenshots.** `shoot-all.sh t6`: on each case study only `01-project-overview.png` differs from `t5`, because the bold company name may rewrap the lead paragraph. Read it: check the paragraph still wraps acceptably. Report a changed line count.

- [ ] **Step 8: Checks, commit.**

```bash
npm run build && npm run check && npm run format:check
git add src/components/DefinitionTip.astro
git commit -m "feat(definition-tip): open on hover, focus and tap" -m "The company name is Bold and underlined; the bubble opens on hover and keyboard focus, stays open while hovered, and a click only opens it (D-042)." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Cards: flat, aligned pills and arrows, 55px arrow hover

**Files:**
- Modify: `src/components/CaseStudyCard.astro`
- Modify: `src/components/CircleArrow.astro`
- Replace: `src/assets/arrow-hover.svg`
- Modify: `src/styles/tokens.css`
- Test: `$T/probes/cards.js`

- [ ] **Step 1: Write the probe** `$T/probes/cards.js`.

```js
JSON.stringify(
  [...document.querySelectorAll('.card')].map((card) => {
    const r = card.getBoundingClientRect();
    const pill = card.querySelector('.card__client');
    const arrow = card.querySelector('.card__arrow');
    const hover = card.querySelector('.circle-arrow__icon--hover');
    const a = arrow.getBoundingClientRect();
    const h = hover.getBoundingClientRect();
    return {
      cardW: Math.round(r.width),
      pillW: pill ? Math.round(pill.getBoundingClientRect().width) : null,
      pillAlign: pill ? getComputedStyle(pill).alignSelf : null,
      arrowAlign: getComputedStyle(arrow).alignSelf,
      arrowRightInset: Math.round(r.right - a.right),
      arrow: [Math.round(a.width), Math.round(a.height)],
      hoverIcon: [Math.round(h.width), Math.round(h.height)],
      shadow: getComputedStyle(card).boxShadow,
    };
  }),
)
```

- [ ] **Step 2: Run it on cs1 and home; confirm the cause.** Expected, which confirms the spec's hypothesis: on cs1 `pillAlign` is `"auto"` (stretched) and `pillW` is the card's width less its padding; `arrowAlign` is `"auto"`; `hoverIcon` is `[50,50]`; `shadow` is not `"none"`. **If `pillAlign` is already `"start"`, the cause is different: stop and debug with superpowers:systematic-debugging before fixing.**

- [ ] **Step 3: Card CSS.** In `CaseStudyCard.astro`, remove `box-shadow: var(--shadow-card);` from `.card` and add the comment `/* Flat: no shadow (style guide 306:1542, D-037) */` in its place. Replace the `.card__client` and `.card__arrow` rules with:

```css
  /* Pill and CircleArrow are child components: a scoped .card__client
     selector never matches their root element (Astro scopes only this
     template's own elements), which left the pills full width and the
     arrows on the left. Reach them through :global(). */
  .card > :global(.card__client) {
    align-self: start;
  }

  .card > :global(.card__arrow) {
    align-self: flex-end;
    margin-block-start: auto;
  }
```

- [ ] **Step 4: The 55px hover asset.** Regenerate `src/assets/arrow-hover.svg` from the saved Figma export: the flower in `currentColor`, the arrow in White (the existing convention), Figma's ids and inline styles removed so three inlined copies don't repeat ids.

```bash
sed -e 's/ preserveAspectRatio="none" overflow="visible" style="display: block;"//' -e 's/ id="[^"]*"//g' -e 's/fill="#CD2B2B"/fill="currentColor"/g' -e 's/fill="white"/style="fill: var(--color-white)"/' docs/figma/components/arrow/arrow-hover-2026-10-20.svg > src/assets/arrow-hover.svg
```

Check the result: `width="55" height="55" viewBox="0 0 55 55"`, nine `fill="currentColor"` paths, one `style="fill: var(--color-white)"`, and no `id=`.

- [ ] **Step 5: Token and `CircleArrow` CSS.** After `--size-arrow`, add:

```css
  /* Hover flower 55px over the 50px slot (Button_Circle Arrow 4:137,
     2026-10-20, D-037): 3px over the top and left, 2px over the bottom and
     right, so the arrow inside keeps its size and place */
  --inset-arrow-hover: -6% -4% -4% -6%;
```

In `CircleArrow.astro`: add `position: relative;` to `.circle-arrow`, and change `.circle-arrow__icon--hover` to:

```css
  /* Out of the grid and overflowing the slot, so the 55px hover flower
     doesn't move the layout. */
  .circle-arrow__icon--hover {
    position: absolute;
    inset: var(--inset-arrow-hover);
    opacity: 0;
    color: var(--color-red);
  }
```

- [ ] **Step 6: Build, re-run** `probe.sh cards` on cs1, cs2, cs3 and home. Expected on every card: `"shadow":"none"`, `"arrowAlign":"flex-end"`, `arrowRightInset` 30 (`--space-card-padding`), `"arrow":[50,50]`, `"hoverIcon":[55,55]`. On case studies, `"pillAlign":"start"` and `pillW` well under `cardW − 60`.

- [ ] **Step 7: Hover shot.** Probes can't hover, so force the hover layer visible and look. Create `$T/probes/hover-on.js`:

```js
(() => {
  document
    .querySelectorAll('.circle-arrow__icon--hover')
    .forEach((e) => (e.style.opacity = '1'));
  return 'hover layer forced on';
})()
```

Run `sh …/probe.sh hover-on cs1` and Read the read-more section shot in `shots/probe-hover-on-cs1/`. Compare it with `docs/figma/components/arrow/arrow-hover-2026-10-20.svg`: the Red flower overflows the circle's slot slightly, and the White arrow sits where the default arrow does. The card itself stays White, because only the layer is forced.

- [ ] **Step 8: Screenshots.** `shoot-all.sh t7`. On case studies only the last section (`read-more`) differs from `t6`. Read it beside the bottom of `docs/figma/case-study-1-desktop/screenshot-2026-10-20.png`: content-width client pills on the left, arrows bottom right, flat cards. On home, the cards differ (no shadow, arrows right): Read it.

- [ ] **Step 9: Checks, commit.**

```bash
npm run build && npm run check && npm run format:check
git add src/components/CaseStudyCard.astro src/components/CircleArrow.astro src/assets/arrow-hover.svg src/styles/tokens.css
git commit -m "fix(cards): flatten cards and align their pills and arrows" -m "The card's scoped styles never reached the Pill and CircleArrow roots, so client pills stretched and arrows sat left. Cards lose their shadow and the hover flower grows to 55px (D-037)." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Light purple process arrows, Regular weight on blue cards

**Files:**
- Modify: `src/components/ProcessStrip.astro`
- Modify: `src/styles/global.css`
- Test: `$T/probes/process.js`, `$T/probes/weight.js`

- [ ] **Step 1: Write the probes.** `$T/probes/process.js`:

```js
(() => {
  const cs = getComputedStyle(
    document.querySelector('.process-strip__step'),
    '::after',
  );
  return JSON.stringify({
    bg: cs.backgroundColor,
    mask: cs.maskImage.slice(0, 12),
    filter: cs.filter,
  });
})()
```

`$T/probes/weight.js`. It lists every body-text element on a purple surface, with its weight and the colour of its nearest painted background:

```js
(() => {
  const paint = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const bg = getComputedStyle(e).backgroundColor;
      if (bg !== 'rgba(0, 0, 0, 0)') return bg;
    }
    return null;
  };
  const rows = [
    ...document.querySelectorAll(':is(.panel, .band--purple) .type-body-med'),
  ].map((el) => [
    el.textContent.trim().replace(/\s+/g, ' ').slice(0, 40),
    getComputedStyle(el).fontWeight,
    paint(el),
    getComputedStyle(el.querySelector('strong') ?? el).fontWeight,
  ]);
  return JSON.stringify(rows);
})()
```

- [ ] **Step 2: Run them; they must fail.** `process cs1`: `"bg":"rgba(0, 0, 0, 0)"`, `"mask":"none"`, the filter is set. `weight` on cs1, cs2 and cs3: every row is `"500"`.

- [ ] **Step 3: `ProcessStrip.astro`.** In the arrow rule, replace

```css
    background: url('../assets/arrow-01.svg') center / contain no-repeat;
    filter: brightness(0) invert(1);
```

with

```css
    background-color: var(--color-light-purple);
    mask: url('../assets/arrow-01.svg') center / contain no-repeat;
```

and replace the comment's colour paragraph with:

```css
     Colour: Light purple (#C4CDF4, Cass's feedback; the Figma screenshots
     show it light on the band). The SVG is a mask, so the arrow takes
     background-color from a token: url()-referenced SVGs can't take
     currentColor from the page. */
```

- [ ] **Step 4: `global.css`.** After the `.band--white` rule, add:

```css
/* D-044: body text on a purple card is Regular, not Body Med, on every
   case study. Bands count as cards for now; whether Cass meant only the
   rounded .panel cards is an open question. If she did, drop
   .band--purple here. <strong> runs and headings keep their weights. */
:is(.panel, .band--purple) .type-body-med {
  font-weight: var(--type-body-weight);
}
```

- [ ] **Step 5: Build, re-run.** `process` on cs1, cs2 and cs3: `"bg":"rgb(196, 205, 244)"`, the mask starts `url(`, `"filter":"none"`. `weight` on cs1, cs2 and cs3: every row is `"400"` with background `rgb(72, 50, 161)`, and column 4 is `"700"` wherever the element contains a `<strong>`. **Copy the three row lists into the task report**: they're the "every element it changes" list the spec asks for.

- [ ] **Step 6: Screenshots.** Run `shoot-all.sh t8` and diff the section shots against `t7`. The process strip sections and the sections holding a `.panel` or `.band--purple` differ, and nothing else does. Read the CS1 process strip beside the Figma screenshot (light arrows), and CS2's journey band (Regular body, Bold runs intact).

- [ ] **Step 7: Checks, commit.**

```bash
npm run build && npm run check && npm run format:check
git add src/components/ProcessStrip.astro src/styles/global.css
git commit -m "fix(case-study): light purple process arrows, regular text on blue" -m "The process arrows are Light purple via a mask, as designed. Body text on purple panels and bands is Regular on every case study (D-044)." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Skip link restyled, shown on keyboard focus only

**Files:**
- Modify: `src/styles/global.css` (`.skip-link`)
- Modify: `src/styles/tokens.css` (remove the two skip link padding tokens)
- Test: `$T/probes/skip.js`, `$T/probes/skip-script.js`

- [ ] **Step 1: Write the probes.** `$T/probes/skip.js` (run with `--pretab=1`, so the skip link has real keyboard focus):

```js
(() => {
  const a = document.activeElement;
  const cs = getComputedStyle(a);
  return JSON.stringify({
    active: a.className,
    focusVisible: a.matches(':focus-visible'),
    top: Math.round(a.getBoundingClientRect().top),
    bg: cs.backgroundColor,
    color: cs.color,
    radius: cs.borderRadius,
    size: cs.fontSize,
  });
})()
```

`$T/probes/skip-script.js`: focus from script, which isn't keyboard focus:

```js
(() => {
  const s = document.querySelector('.skip-link');
  s.focus();
  return JSON.stringify({
    focus: s.matches(':focus'),
    focusVisible: s.matches(':focus-visible'),
    top: Math.round(s.getBoundingClientRect().top),
  });
})()
```

- [ ] **Step 2: Run them before the change, and record the results.**

```bash
sh .superpowers/sdd/2026-10-20-foundation/probe.sh skip cs1 --pretab=1
sh .superpowers/sdd/2026-10-20-foundation/probe.sh skip-script cs1
```

Expected for `skip`: `"active":"skip-link"`, `"top":16`, a White background. For `skip-script`, record whether `focusVisible` is true or false: Chrome's heuristic decides it. With `:focus` today the link is shown either way (`top` 16).

- [ ] **Step 3: Restyle.** Replace the `.skip-link` padding, background, colour and type declarations and the `:focus` rule in `global.css`:

```css
  /* D-041: styled like the nav's selected item */
  padding-block: var(--space-nav-pill-block);
  padding-inline: var(--space-nav-pill-inline);
  border-radius: var(--radius-pill);
  background-color: var(--color-light-purple);
  color: var(--color-purple);
  font-size: var(--type-nav-size);
  font-weight: var(--type-nav-weight);
  line-height: var(--type-nav-line-height);
  letter-spacing: var(--type-nav-letter-spacing);
  text-decoration: none;
  translate: 0 -200%;
}

/* Keyboard focus only. On :focus it also appeared for focus the reader
   didn't ask for, which is likely what Cass saw (D-041). */
.skip-link:focus-visible {
  translate: 0 0;
}
```

Keep the existing `position`, insets, `z-index` and their comment. In `tokens.css`, delete `--space-skip-link-padding-block` and `--space-skip-link-padding-inline` (keep `--space-skip-link-inset`). Then confirm nothing else uses them with `grep -rn "skip-link-padding" src`; expect no output.

- [ ] **Step 4: Build, re-run both.** `skip`: `"top":16`, `"bg":"rgb(196, 205, 244)"`, `"color":"rgb(72, 50, 161)"`, `"size":"16px"`, and a large radius. `skip-script`: if `focusVisible` is false, `top` is now off-screen (negative). Record both results.

- [ ] **Step 5: What showed it for Cass.** Using headless runs, try the cases below and record which ones showed the link before (`:focus`) and after (`:focus-visible`):
  - (a) Tab on page load: shows it, as intended.
  - (b) Script focus after load: the `skip-script` probe.
  - (c) Focus kept after going back: the probe focuses the skip link, navigates to `/` and calls `history.back()`. Check whether the restored page has the skip link focused and shown. bfcache can restore focus.

  Write the findings, and what still can't be reproduced headless (for example Safari's behaviour, or a click before Tab), into the Task 10 wiki note. **Add a manual check for Reece** to the PR list: on a real Mac and phone, open a case study from the home page, scroll, go back and forward, and see whether the link appears unasked.

- [ ] **Step 6: Screenshot** cs1 and home with `--pretab=1`. Read the top-left corner: a Light purple pill reading "Skip to content", above the header on both variants.

- [ ] **Step 7: Checks, commit.**

```bash
npm run build && npm run check && npm run format:check
git add src/styles/global.css src/styles/tokens.css
git commit -m "fix(a11y): restyle the skip link and show it on keyboard focus only" -m "It keeps WCAG 2.4.1's bypass block, now styled like the nav's selected item. Showing it on :focus-visible rather than :focus stops it appearing for focus the reader didn't ask for (D-041)." -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Full verification, docs, hand-off

**Files:**
- Modify: `docs/architecture.md`, `docs/decisions.md`, `docs/questions.md`, `docs/wiki/componentisation.md`, `docs/wiki/log.md`, `docs/superpowers/plans/2026-10-20-macro-plan.md`, `docs/figma/design-system/delta-2026-10-20.md`
- Possibly create: `docs/wiki/skip-link.md` (and add it to `docs/wiki/index.md`)

- [ ] **Step 1: Full pass.** Rebuild, run `shoot-all.sh final` and `shoot-all.sh final-tab --tab=14`, and every probe on every page it applies to (`nav`, `copy`, `scroll`, `motion` with and without `--reduced-motion`, `nav --nojs`, `subnav`, `intro`, `pill-icon`, `tip`, `cards`, `process`, `weight`, `skip`). Record that each matches its expected output. At widths 1440 and 1280, `probe.sh nav <page> --width=1440` reports `scrollWidth` equal to `innerWidth` on all four pages. Read each `final-*/full.png` top to bottom beside that page's Figma `screenshot-2026-10-20.png`, and list any difference you see that isn't explained by an open question.

- [ ] **Step 2: Check for parallel decisions.** The other chat may have added D or Q entries:

```bash
git show reece/feature/design-system-refresh:docs/decisions.md | grep -E "^### D-0" | tail -3
git show reece/feature/design-system-refresh:docs/questions.md | grep -E "^### Q-0" | tail -3
grep -E "^### (D|Q)-0" docs/decisions.md docs/questions.md | tail -4
```

Take the next free numbers across both branches (D-050 and Q-035 if nothing new). If the other branch reused any of D-046 to D-049 again, stop and tell Reece.

- [ ] **Step 3: Decision.** Append to `docs/decisions.md`:

```markdown
### D-050 · Undesigned nav details for phase 2
- **Date:** 2026-10-20 · **Status:** Accepted
- **Context:** The new nav (D-038, D-040, D-045) left three states undesigned.
- **Decision (Reece):** (1) The White nav works like the purple one in its own colours: hover shows the 10px dot with the text staying Purple, and the selected item shows the Light purple pill; Light purple text on Off-white would be ~1.4:1. (2) The "Email me" tick shows for 3 seconds, then the copy icon returns. (3) An in-page jump (a sub nav link, the skip link) hides the nav and keeps it hidden until the scroll ends, so it doesn't return over the section's heading.
- **Consequences:** Each is a constant or a colour in `SiteNav.astro`; change it there if Cass designs these states.
```

- [ ] **Step 4: Question.** Add to `docs/questions.md` (the summary table row and the entry):

```markdown
| Q-035 | Cass: Regular weight on blue cards: rounded cards only, or the full-bleed bands too? | Nothing; bands are included for now (D-044) |
```

```markdown
### Q-035 · Cass: Regular weight on blue cards: cards only, or bands too?
- **Raised:** 2026-10-20 (Reece)
- **Blocks:** nothing; built with bands included
- **Context:** D-044 sets body text on every "blue card" to Regular. The case studies have two purple surfaces: rounded, inset cards (`.panel`) and full-bleed bands (`.band--purple`). Cass's own example, Standard Bank's user journey, is a band, so both are included (one rule in `global.css`).
- **Options:** both (as built) · rounded cards only (drop `.band--purple` from the rule).
```

- [ ] **Step 5: Architecture.** In `docs/architecture.md`, change the status date and update the code map rows:
  - `BaseLayout`: `navVariant` prop; renders `SiteNav`, which renders the header.
  - `SiteNav`: header and nav, `variant` (purple / White, D-040), Home · Work · Email me (D-049), and two scripts: Email me copy (D-038, D-048) and hide on scroll (D-045), which publishes `--site-header-offset`.
  - `CaseStudySubNav`: per-item underline (D-039), sticky at `--site-header-offset`, `margin-block-end` for the 80px intro gap.
  - `DefinitionTip`: hover, focus and tap (D-042).
  - `CircleArrow`: the 55px hover overflow.
  - `Pill`: 22px icon in a 24px slot.
  - `global.css`: the D-044 rule and the skip link.

  Under Cross-cutting concerns, add a line: **Client scripts** live in plain `<script>` blocks in the component that needs them, each with its stated reason. The one cross-component contract is `--site-header-offset` (written by `SiteNav`, read by `CaseStudySubNav`).

- [ ] **Step 6: Wiki.**
  - In `componentisation.md`, add the gotcha: a `class` passed to a child component isn't matched by the parent's scoped styles; use `.parent > :global(.child-class)`. Cite the Read More bug.
  - Write the skip link findings from Task 9 (a `skip-link.md` page, or a section in an existing accessibility page if one exists) and add it to `index.md`.
  - Append a `log.md` entry: `## [2026-10-20] build | Phase 2 foundation: new nav, sub nav and shared feedback`, with a one-paragraph summary.

- [ ] **Step 7: Delta doc and macro plan.**
  - Delta doc: add a line under the Rulings intro: "Phase 2 built every *apply* row on `reece/feature/foundation` (2026-10-20)."
  - Macro plan status table: phase 2 → **Done** (or **In review**, until the PR merges). Branch `reece/feature/foundation`. Notes: the worktree, the renumbering fix, D-050, Q-035, and the two items for Reece to check.
  - In the phase 2 section, note that the branch changed and why.

- [ ] **Step 8: Checks, commit.**

```bash
npm run build && npm run check && npm run format:check
git add docs/architecture.md docs/decisions.md docs/questions.md docs/wiki/componentisation.md docs/wiki/log.md docs/wiki/index.md docs/superpowers/plans/2026-10-20-macro-plan.md docs/figma/design-system/delta-2026-10-20.md
# plus docs/wiki/skip-link.md if created
git commit -m "docs: record phase 2 foundation (D-050, Q-035)" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

- [ ] **Step 9: Hand-off.** Don't push. Summarise for Reece:
  - what changed, task by task
  - the probe results
  - the intro crops and measured gaps (for Reece to check, item 2)
  - the branch change (item 1)
  - Escape on the Definition Tip and the skip link (manual checks)
  - Q-035 for Cass
  - anything still different from Figma

  Then ask for approval to push `reece/feature/foundation` and open a PR to `main`. Draft the PR body with those items, ending with `🤖 Generated with [Claude Code](https://claude.com/claude-code)`.
