# Phase 2 foundation: new nav, sub nav and shared feedback — design

- **Date:** 2026-10-20
- **Status:** Design approved by Reece in chat (2026-10-20); this file records it for review before planning
- **Branch:** `reece/feature/foundation` in the worktree `../cass-website-foundation`, from `2a83323` (the tip of `reece/feature/design-system-refresh`, which holds the phase 1a docs). Another chat may still be committing to `reece/feature/design-system-refresh`, so this phase works in its own worktree. The macro plan named `design-system-refresh` as phase 2's branch; this branch replaces it.
- **Scope:** phase 2 of the [2026-10-20 macro plan](../plans/2026-10-20-macro-plan.md#phase-2-foundation): the *apply* rows in the [design system delta](../../figma/design-system/delta-2026-10-20.md), the new nav and sub nav on the home page and all three case studies, and the [shared feedback items](../plans/2026-10-20-macro-plan.md#shared-feedback-items).
- **Decisions this implements:** D-037 to D-049. The first commit on this branch renumbered the second D-041 to D-044 as D-046 to D-049.
- **Figma:** no calls. Everything comes from `docs/figma/` snapshots saved in phase 1a. Phase 1b may be calling Figma in another chat.

## Approaches chosen

| Behaviour | Chosen | Rejected |
|---|---|---|
| Nav hides on scroll down, returns on scroll up (D-045) | A small script compares scroll positions, sets `data-hidden` on the header and writes `--site-header-offset`. CSS slides the header with `translate`, and the sub nav sticks at that offset | CSS-only (scroll-driven animations, `scroll-state()` queries): neither detects scroll direction reliably in every browser |
| Definition Tip opens on hover, focus and tap (D-042) | Keep the native popover, add `popovertargetaction="show"`, and add pointer and focus listeners | `interestfor` / `popover="hint"`: Chromium only for now |

## Tokens and type

`src/styles/tokens.css`:

| Token | From | To | Source |
|---|---|---|---|
| `--type-nav-size` | 17px | **16px** | Navigation `20:703` (and Cass's feedback) |
| `--type-nav-line-height` | 1.5 | **1.48** | same |
| `--space-nav-gap` | 43px | **40px** | same |
| `--space-nav-pill-block` / `--space-nav-pill-inline` | 12px / 23.5px (negative insets) | **8px / 24px** (real padding) | Selected pill, `padding: 8px 24px` |
| `--space-nav-utility-gap` (new) | — | **17px**, text to icon | Utility navigation |
| `--size-nav-icon` (new) | — | **24px** | Utility link icons |
| `--space-intro-image-drop` | 111px | **160px** | CS3 `99:2503` now 160px below the intro top |
| CS3 image nudge (new) | — | **7px** inline | `99:2503` at x=922 (was 915) |
| Intro gaps (new, D-046) | 16px / 16px | measured; see [Intro](#intro-and-pills) | rendered ink gaps |
| `--size-pill-icon-glyph` (new) | — | **22px** inside the 24px slot | D-047 |

- `--color-purple` is already `#4832a1`, matching Figma (D-040's check). H1's line height is already 0.92, so the delta's "apply if still 0.98" row needs no change.
- `--type-body-bold-*` carries its own literal 17 / 1.5 values, so it doesn't move with the nav tokens.
- Unchanged: `--radius-pill` (54px already fully rounds a 40px-tall pill, so Figma's 100px looks the same).

## Nav (`SiteNav.astro`)

**Structure.** `SiteNav` now renders the `<header class="site-header">` itself, so the header, its scroll script and its variant live in one component. `BaseLayout` takes a `navVariant: 'purple' | 'white'` prop (default `purple`) and passes it through.

- Brand on the left (`cassandra garratt`), Home and Work in the middle (40px gap), Email me on the right. Three flex children with `justify-content: space-between`, as Figma lays it out. About and Resume are left out (D-049); Contact goes (D-038).
- The selected item has real `8px 24px` padding and a Light purple `--radius-pill` background, replacing the negative-inset `::before`. The focus ring then follows the item's own box and radius, so the pill focus workaround goes too.
- Case studies use `purple` with Work selected (`/work/*` already matches `/work`). The home page uses `white` with Home in a pill (Reece, 2026-10-20). Figma's White variant has no selected state, so the pill on White is the purple variant's pill as is: Light purple, Purple text.

**Variants.**

| | Purple | White |
|---|---|---|
| Bar | `--color-purple` | `--color-off-white` |
| Wordmark | White | Red |
| Items | White | Purple |
| Utility link text and icon | Off-white | Purple |
| Hover / focus-visible | Light purple text + 10px Light purple dot (unchanged) | **Purple text + 10px Purple dot** (undesigned; Light purple on Off-white is ~1.4:1) |

**Email me (D-038, D-048).**

- Markup: `<a class="site-nav__utility" href="mailto:hello@cassandragarratt.com">Email me <svg …></a>`. The address lives in one constant in `SiteNav`. Without JS it's an ordinary `mailto:` link.
- Script: on click, `preventDefault`, then `navigator.clipboard.writeText(address)`. On success, set `data-copied` on the link, which swaps the copy icon for a tick, and write "Email address copied" to a visually hidden `role="status"` region in the header. After 3 seconds (undesigned; Reece approved the default), clear both. If the Clipboard API is missing or the write rejects, set `location.href` to the `mailto:` URL.
- Icons are inline SVGs with `currentColor`, made from the saved `icon-copy-email-*.svg` and a Material Symbols Rounded `check` glyph for the tick. A code comment marks the tick as **provisional**: phase 3A replaces it with the landing page's tick, so one tick is used everywhere (D-048).

**Hide on scroll down, return on scroll up (D-045).** Script reason (invariant 3): the behaviour depends on scroll direction, which CSS can't read in every browser.

- Without JS nothing changes: the header isn't sticky and scrolls away, as today. The script adds `site-header--scroll-aware`, which makes it `position: sticky; inset-block-start: 0` with a `z-index` above the sub nav's.
- On scroll (rAF-throttled): hide when moving down and past the header's own height; show when moving up or within the header's height of the top. A small dead band (a few px) ignores jitter.
- Hidden is `translate: 0 -100%`, with a transition from `--duration-hover` / `--ease-hover`. There's no transition under `prefers-reduced-motion: reduce`.
- The script writes `--site-header-offset` on `<html>`: the header's height when shown, 0 when hidden. A `ResizeObserver` keeps the height current.
- `focusin` inside the header shows it.
- **In-page jumps:** a click on a same-page `#anchor` link suspends direction tracking until `scrollend` (with a timeout fallback for browsers without it), and the nav stays hidden. Otherwise jumping up to a section would bring the nav back over its heading.
- **Anchor clearance:** `.case-study [id]`'s `scroll-margin-block-start` stays 96px (the sub nav plus 16px), which is right while the nav is hidden.

## Sub nav (`CaseStudySubNav.astro`, D-039)

- Sticky at `inset-block-start: var(--site-header-offset, 0px)`, with a transition matching the header's (none under reduced motion). When the nav returns, the sub nav moves down under it, and nothing covers it (D-045).
- Links are Regular (`--type-body-weight`); the current link (`aria-current="true"`) is Bold with a 3px Red underline at the bar's bottom edge, the width of the link. The sweep goes. To stop links shifting when the weight changes, each link reserves its bold width with a hidden bold copy of its label (`::after { content: attr(data-label); font-weight: bold; visibility: hidden; block-size: 0 }`).
- The script keeps `currentIndex()` (the last section past a line 20% down the viewport, or the last section at the bottom of the page) and sets `aria-current`. It drops the geometry, the custom properties and the `ResizeObserver`.
- The back link: "All Projects" (Figma's case), with Material `arrow_back` as an inline SVG (`currentColor`, 22 × 21.5px) made from the saved `arrow-upward.svg` rotated to point left, the same glyph. A 14px gap is unchanged.
- **80px to the intro:** the grid's row gap stays 160px, and the sub nav's own root takes `margin-block-end: calc(var(--space-80) - var(--space-160))`, so only that gap shrinks (Figma: the intro top moved 330 → 250 on all three frames).

## Intro and pills

- **Eyebrow → title and title → pills (D-046).** At 1920px on CS1, measure the visible gap from screenshot pixels: the bottom of the eyebrow's ink to the top of the title's ink, and the bottom of the title's ink to the top of the pills. The new eyebrow gap halves the first; the new pill gap adds 20% to the second. Both are set in the stack, and because a change in the gap moves the ink one for one, the new values are `16px − ink₁ / 2` and `16px + 0.2 × ink₂`. If the first comes out negative, it's a negative `margin-block-start` on the title rather than a flex `gap`. Record both measurements in a comment beside the tokens, then check CS2 and CS3 render the same gaps.
- **CS3 image:** `--space-intro-image-drop` becomes 160px, plus the 7px inline nudge.
- **Pill icon (D-047):** the 24px slot stays; the image renders at 22px, centred in it. First check each used icon's artwork bounds (`woman-3.svg` exports at 24, `man-2.svg` at 20, `man-3.svg` at 22), so an icon whose export already includes padding isn't shrunk twice.

## Definition Tip (D-042)

- The trigger is Bold (`--type-subtitle-emphasis-weight`) and stays underlined.
- `popovertargetaction="show"`: click or tap only opens it. Escape and a tap or click outside close it (native light dismiss). Without JS, click or tap still opens it.
- Script additions, beside the existing positioning code:
  - `pointerenter` on the trigger (mouse and pen only, `pointerType !== 'touch'`) shows it.
  - `pointerleave` from the trigger or the bubble closes it after a 200ms grace period, cancelled if the pointer enters the other. The bubble stays open while hovered (WCAG 1.4.13).
  - `focus` on the trigger shows it; `blur` hides it.

## Cards

- **Flat cards (D-037):** remove `box-shadow` from `.card`, on the home page and in Read More.
- **Read More alignment (build bug):** `CaseStudyCard`'s scoped `.card__client { align-self: start }` and `.card__arrow { align-self: flex-end }` never reach the `Pill` and `CircleArrow` root elements, because Astro doesn't scope a child component's root to the parent. Write them as `.card > :global(.card__client)` and `.card > :global(.card__arrow)`. This fixes the full-width pills and the left-hand arrows, and the home page's arrows too.
- **Arrow hover (D-037):** the hover layer becomes the 55px flower from `arrow-hover-2026-10-20.svg` (recoloured to `currentColor`, the white arrow kept), positioned in the 50px slot with `inset: -6% -4% -4% -6%`, so it overflows without changing layout. The arrow keeps its size and place. The existing 90° rotation turns the asymmetric overflow too, a sub-pixel difference accepted in the delta.

## Process strip and blue cards

- **Process arrows (build bug):** replace `background` + `filter: brightness(0) invert(1)` with `mask: url(arrow-01.svg) center / contain no-repeat` and `background-color: var(--color-light-purple)` (`#C4CDF4`).
- **Regular weight on blue cards (D-044):** one rule in `global.css`: `.panel :is(.type-body-med), .band--purple :is(.type-body-med) { font-weight: var(--type-body-weight) }`. On the case study pages, `.panel` and `.band--purple` are the only purple surfaces with body text, and Cass's own example (CS2's journey) is a band. `<strong>` runs and headings keep their weights. List every element it changes in the plan and check each against the screenshots.

## Skip link (D-041)

- **Restyle:** styled like the selected nav item: a Light purple `--radius-pill` pill, Purple 16px Bold nav type, `8px 24px` padding, in the top-left corner.
- **Likely cause for Cass:** it's shown on `:focus`, so any focus, not only keyboard focus, reveals it: a mouse click on it, or the browser restoring focus after going back. Switch to `:focus-visible`. Test Tab from the address bar, back/forward to a case study, and clicking in the page, and record which of these showed it before and after in the wiki.

## Verification

- Every commit: `npm run build`, `npm run check` and `npm run format:check`.
- **Screenshots:** headless Edge with `shoot.mjs` / `diff.mjs`, copied into `.superpowers/sdd/2026-10-20-foundation/` (the ignored folder). Take baseline shots of `/` and the three case studies before the first code change. Compare the nav with `docs/figma/components/navigation/screenshot-2026-10-20.png`, the sub nav with `sub-nav/screenshot-2026-10-20.png`, and each case study's top with its `screenshot-2026-10-20.png`. Pages with no intended change should diff identical below the changed parts.
- **Behaviour:** scroll down hides the nav and scroll up shows it, with the sub nav below it and never covered. `--reduced-motion` gives no transition. `--nojs` gives today's header. Tab into the nav while it's hidden shows it. Jumping up via the sub nav leaves the nav hidden. Email me copies, shows the tick, then reverts. With clipboard access denied, it opens `mailto:`. Definition Tip opens on hover, focus and click, stays open over the bubble, and closes on Escape.
- **Keyboard:** focus order with `--tab` on `/` and one case study: skip link, brand, Home, Work, Email me, then the sub nav. Visible focus on both nav variants.
- `document.documentElement.scrollWidth` equals the viewport at 1920, 1440 and 1280 on every page.

## Docs

- `architecture.md`: `SiteNav` owns the header and its two scripts; the `--site-header-offset` contract between `SiteNav` and `CaseStudySubNav`; the changes to `BaseLayout`, `CaseStudySubNav`, `DefinitionTip`, `CircleArrow`, `Pill` and `global.css`.
- `decisions.md`: one decision recording the three undesigned details Reece approved (the White nav hover, the 3-second tick revert, the nav staying hidden during in-page jumps). Before numbering it, check `reece/feature/design-system-refresh` for entries added since `2a83323` and take the next free number.
- Wiki: the skip link findings, the scoped-root-class gotcha (the Read More bug) in [componentisation](../../wiki/componentisation.md), and `log.md`.
- Macro plan: the phase 2 status row, including the branch change.

## Out of scope

- The new landing page, the email pill and its tick (3A), TRANSEARCH (3B) and the page-specific feedback (3C).
- The iPad nav variant and anything below desktop width (Q-026).
- Resume and About in the nav (Q-011, D-049).
