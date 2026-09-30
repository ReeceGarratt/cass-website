---
summary: Where the design tokens live, their naming scheme, unit rules, how the fluid values were derived, the type classes and spacing scale, and the H1 line-height change.
updated: 2026-09-29
related: [figma-mcp.md, componentisation.md]
decisions: [D-002, D-014, D-020, D-021, D-024, D-026, Q-005, Q-010, Q-013]
---

# Design tokens

`src/styles/tokens.css` is the source of truth for every design value used in components and pages (architecture invariant 1). It's written by hand from the saved snapshots in `docs/figma/` (D-014), not generated — Q-005 (a real token pipeline) is still open. The spec's original "Space, size and radius" table has drifted from the real token names; treat `src/styles/tokens.css` and this page as current, not the spec.

## Naming scheme

| Prefix | Covers |
|---|---|
| `--color-*` | Figma colour variables, plus a couple of fills that aren't variables (`--color-black`, `--color-icon`) |
| `--type-<style>-{size,line-height,letter-spacing,weight}` | One group of four per Figma text style (`title`, `title-1`, `title-2`, `subtitle`, `card-title`, `h2`, `h3`, `body`, `body-med`, `caption`, `handwritten`, `stats`, `brand`, `nav`) |
| `--space-*` | Gaps, padding and offsets between elements |
| `--size-*` | Fixed widths/heights of elements (card, arrow, nav dot, hero intro) |
| `--hero-*` | Hero decoration sized relative to the title (`em`), plus its offsets |
| `--card-corner-*` | The hover-state corner stroke boxes on the case study card |
| `--radius-*` | Border radii |
| `--shadow-*` | Box shadows (`--shadow-card` is a placeholder, Q-013) |
| `--duration-*`, `--ease-*` | Transition timing (`--duration-hover`, `--ease-hover`; placeholders, Q-013) |
| `--focus-ring-*` | The shared focus ring colours and width |

The Figma text style called "H1" is the case study card's title, not the page's `<h1>` — its token is named `--type-card-title-*` to avoid confusion with the actual headline (`--type-title-*`). Confusingly, the case study page also uses a class called `.type-h1` for its finding-block headings and process-strip labels — it's the same "H1" Figma style (Inter Bold 30/0.92/−2%), reused on a case study page for the first time, not a second unrelated style.

## Type classes (D-024)

One CSS class per Figma text style, in `global.css`. Each sets only `font-size`/`font-weight`/`line-height`/`letter-spacing` (and `font-family` for `.type-handwritten`) — **colour is never set by a type class**, because the same Figma style appears in Red, Purple, Black and White depending on where it's used; colour stays on the component.

| Class | Figma style | Value | First used |
|---|---|---|---|
| `.type-title` | Title | Inter Black, fluid 72→100px / 0.98 / −4% | Home page hero |
| `.type-title-1` | Title 1 | Inter Black 50/0.96/−4% | Case study `<h1>` (`CaseStudyIntro`) |
| `.type-title-2` | Title 2 | Inter Black 45/1.0/−2% | Case study section headings |
| `.type-subtitle` | Sub Title | Inter Regular 20/1.35/−4% | Hero intro, case study lead/standfirst paragraphs |
| `.type-h1` | H1 | Inter Bold 30/0.92/−2% | Card title (existing), finding-block heading, process-strip label |
| `.type-h2` | H2 | Inter Bold 20/1.12/0 | Goal/outcome headings, "Key learnings" |
| `.type-h3` | H3 | Inter Bold 14/1.5/−1.1% | Finding-block labels (`problem`/`solution`/`outcome`), the testing "Insight" label |
| `.type-stats` | Stats | Inter Black 96/0.88/−2% | The "14 out of 15" figure |
| `.type-body` | Body Reg | Inter Regular 16/1.48/−1.1% | Base body text |
| `.type-body-med` | Body Med | Inter Medium 16/1.48/−1.1% | Case study prose (findings-list items, interview bullets, goal/outcome body) |
| `.type-caption` | Caption Text | Inter Regular 12/1.5/−1.1% (Bold in practice, see below) | Card skills list |
| `.type-handwritten` | Hand written | La Belle Aurore 28/1.11/−2% | Section-heading eyebrows, quote marks, interview markers, testing annotation |

**Note:** Figma's `Caption Text` is Regular 400, but the card skills render Inter **Bold** 12. Components may override weight on top of the class; don't add a second caption class for it.

**Note:** `SectionHeading.astro` uses `.type-title-2`, not a class named after itself — the type class is always named after the Figma style, and components pick the class(es) they need. A single component can also use several type classes (e.g. `FindingBlock` uses `.type-h1` for its heading and `.type-h3` for each label).

## Spacing scale (D-024)

Numeric, where the number is the px value at the 16px root: `--space-8` = `0.5rem` through `--space-96` = `6rem` (8/16/24/32/40/48/56/64/80/96). Self-documenting against Figma measurements, and self-limiting — reach for the scale first; only add a bespoke named token (as the pre-existing `--space-gutter`, `--space-card-padding` etc. already were) for a genuine one-off that doesn't belong to a family of repeated gaps.

Figma's two real spacing variables alias onto the scale so the link stays traceable:

- `Headings & Body` (16px) → `--space-headings-body` → `var(--space-16)`
- `Sub-Sub Sections` (48px) → `--space-sub-sections` → `var(--space-48)`

Case study work added `--space-80` (the Design section's image/text gap and the purple panels' padding) and confirmed `--space-96` (the gap between finding blocks) as real, used values rather than speculative scale steps.

**Still bespoke, not on the scale** (measured one-offs, not scale-worthy numbers): `--space-panel-columns` (240px, Interviews heading/quote gap), `--space-intro-columns` (118px, intro text/image gap), `--size-divider-width` (400px, the goal/outcome hairline's length), and the `--size-process-step-*` family (measured per-label wrap widths for `ProcessStrip`, with `--size-process-step-max` as a safety-net cap for any label without a measured entry).

## New tokens from the case study work

Beyond the type classes and spacing scale above:

- **Colour:** none added; `--color-purple`, `--color-red`, `--color-light-purple`, `--color-white`, `--color-off-white` cover everything CS1 uses. `#E3E7FF`, a third light purple Figma uses for the Interviews pull quote, has no token — see [Q-021](../questions.md).
- **Radius:** `--radius-image` (12px, case study screenshots), `--radius-panel` (12px, the inset Purple panels — kept as a separate token from `--radius-image` even though the value matches today, because they're different things in Figma and could move independently).
- **Size:** `--size-inset-measure` (1448px, shared by the Design section and both Purple panels — D-026), `--size-divider-width`, the `--size-process-step-*` family (above).
- **Shadow:** `--shadow-card` and `--shadow-card-warm` are no longer placeholders — see [Q-013](../questions.md#q-013--card-hover-timing-from-figma) for the real values now in use.

## The `H1` line-height change and its effect on the home page

Figma's "H1" style (the card title / finding-block heading / process-strip label) changed line-height from 0.98 to 0.92 as part of the design system update fetched 2026-09-29. This is confirmed correct against the current Figma frame, so `--type-card-title-line-height` in `tokens.css` was updated to `0.92` directly (no versioned token — the old value simply stopped being current).

This is a **knock-on change to the existing home page**, not something scoped to the case study: `--size-card-title-height` (83px, "fixed in Figma so captions align") and `--size-card-title-width` (264px, tuned so card 3 wraps like Figma) both depend on exactly how tall and wide the title text renders, and a tighter line-height changes that. The case study spec called out re-verifying the home page as part of this work, not a free change.

**Status: this re-check has not been done.** There is no browser in this environment, so whether card 3 still wraps "Using research to / build a better / sales workflow" and whether captions still align inside the fixed 83px title height is an open, deferred visual check — see the case-study-page-one Task 18 report for the full list. This was already true before Task 18 (it's the first item in the plan's own deferred-checks list, opened at Tasks 1–3), and Task 18 didn't resolve it.

## Accessibility: Red-on-Off-white contrast

Measured 2026-09-29 with the WCAG 2.x relative-luminance formula (sRGB channel linearisation, then `(L1+0.05)/(L2+0.05)`): Red `#cd2b2b` on Off-white `#f8f9ff` is **5.03:1**. That passes AA for normal text (4.5:1) as well as large text (3:1), so it covers every Red-on-Off-white use on the case study page, including the smallest case — the 14px bold finding-block labels (`.type-h3`, which is normal text at that size, not large). No design change needed; recorded here as the actual measured value rather than the spec's ~4.9:1 estimate.

Note this only covers Red directly on the Off-white page background. Red also appears on White (`DefinitionTip`, unmeasured) and Red text never appears on Purple in this build — those are separate pairs were they to occur.

## Contrast on the case study palette (2026-09-30)

Measured for CS2 with the same formula:

| Pair | Ratio | Used for |
|---|---|---|
| White on Purple | 9.35:1 | Band and panel copy, journey labels (14–16px) |
| Light purple on Purple | 5.96:1 | Panel and band headings (45px); would pass as body text too |
| Purple on White | 9.35:1 | Reviewing band, persona cards, future state card |
| Red on White | 5.28:1 | Finding labels in the White reviewing band (14px bold) |
| Purple on Off-white | 8.90:1 | Body copy |

All pass AA for normal text.

## New tokens from case study 2 (2026-09-30)

- **Type:** `.type-handwritten-small` (Figma "Hand written small", La Belle Aurore 20 / 1.11 / −2%) for captions under screenshots, and `.type-sub-titles` (Figma "Sub Titles", Inter Medium 14 / 1.5 / −1.1%).
- **Space:** `--space-2` (a one-off 2px value, kept in the scale block because its name follows the scale), plus bespoke measured values: `--space-persona-note` (21px), `--space-capture-images` (90px), `--space-capture-before-offset` (14px), `--space-capture-heading-offset` (59.54px), `--space-future-card` (20px) and `--space-personas-clearance` (84px).
- **Size:** six `--size-process-step-import-*` label widths (D-028).
- **Not added:** Figma's `Image Drop` effect (its −36px spread makes it invisible; Q-022) and `Background colour` `#F3F3F4` (reported but not visibly used). Figma's `--h1-&-h2` (24px) and `--h2-&-body` (16px) spacing variables map onto `--space-24` and `--space-16`.

## MVP fix round (2026-09-30)

- **`--space-160`** (scale step): the case study grid's section gap. Both frames space every section 160px apart; the build had used 96px, chosen before the frames were fetched.
- **`--space-read-more-gap`** (60px): Figma's Read More gap had been rounded up to `--space-64`, which made the row 1702px in a 1700px track (a 2px horizontal overflow at 1920).
- **`--space-personas-clearance`** is now Figma's 52px (it was 84px to compensate for the 96px gap).

## Unit rules

- **Sizes and spacing:** `rem` (1rem = 16px), so they respect browser zoom and font-size settings.
- **Letter spacing:** `em`, because Figma expresses letter spacing as a percentage of the font size (e.g. H1 (card title) −2% at 30px → −0.02em, or −4% at 100px title → −0.04em).
- **Hero decoration** (`--hero-flower-size`, `--hero-pill-width`, `--hero-pill-height`, and their offsets): `em`, relative to `--type-title-size`, so they scale with the fluid title instead of needing their own `clamp()`.

## Fluid values

`--type-title-size`, `--space-gutter` and `--space-hero-top` scale linearly between a 1200px and a 1920px viewport, using `clamp(min, preferred, max)`, and hold at each end. The `preferred` term is derived the usual way for a linear clamp between two breakpoints:

```
slope = (valueMax - valueMin) / (viewportMax - viewportMin)
preferred = valueMin - slope * viewportMin + slope * 100vw
```

For `--type-title-size` (72px → 100px between 1200px and 1920px): slope = 28/720 ≈ 0.038889 (3.8889vw), intercept = 4.5rem − 0.038889 × 1200px ≈ 1.5833rem, giving `clamp(4.5rem, 1.5833rem + 3.8889vw, 6.25rem)`. `--space-gutter` and `--space-hero-top` are built the same way from their own min/max pairs (see `tokens.css` for the worked values).

**The 117.5rem breakpoint (1880px)**, where the overlapping hero grid stops fitting and the layout switches to the stacked fallback (Q-010), can't be read from a custom property inside a media query, so it's a literal in both `tokens.css` (as a comment) and `src/pages/index.astro` (in the actual `@media` rule). If the breakpoint ever changes, update both.

## `--space-skill-separator`

The card's skills line uses two literal spaces on each side of `|` in Figma (`User Research  |  Process Design  |  Systems Thinking`), not a fixed gap token. `--space-skill-separator: 0.4518em` is the measured rendered width of two spaces in the caption font (Inter Bold, 12px) — about 5.42px at 12px — so the CSS-drawn `|` separator (`CaseStudyCard.astro`: `.card__skill:not(:last-child)::after { content: "|" / ""; }`, screen-reader-invisible) sits the same distance from the words as it does in Figma, scaling with the caption size via `em`.

## Accepted residual: card 2 caption wrap (Q-010)

Figma's card caption is Inter Bold 12px. After the 2026-09-16 font change, captions wrap on cards 1 and 2 (391px tall cards) and stay on one line on card 3 (373px, vertically centred in the row) — see [`docs/figma/components/case-study-card/context.md`](../figma/components/case-study-card/context.md#refetch-2026-09-17-caption-font-changed-to-inter).

The build matches Figma for cards 1 and 3. **Card 2's caption fits on one line in the browser** (373px, not 391px), because browser and Figma shape Inter by a few pixels differently at this size. This is an accepted residual, not a bug: fixing it would mean hard-coding a per-card height or line-break, which the tokens system and the content collection don't support. Revisit if Cass flags it, or as part of settling Q-010.

Since D-020 every card stretches to the tallest card's height, so card 2's shorter caption no longer changes its outer height. Its summary still starts 18px higher than card 1's. The arrows line up, because the arrow is pinned to the bottom of the card.

## `--hero-title-baseline` (card alignment)

At 1880px and wider, the cards' bottom edge sits on the baseline of the first headline line, "effective &" (D-020). The hero grid's first row is `--hero-titles-offset-top + --hero-title-baseline` tall, and the cards are end-aligned in it.

`--hero-title-baseline: calc(var(--type-title-size) * 0.853)` is the distance from the top of a headline line box to its baseline, worked out from Inter's metrics: ascent 0.96875em, less half the leading. Line height 0.98 minus a content area of 1.2109 gives −0.2309, so half-leading is −0.1155, and 0.96875 − 0.1155 = 0.853. In Edge, the baseline measured 85px at 100px, 64px at 75px and 61px at 72px, and the card bottoms landed within 1px of it at 1880, 1920 and 2400px.

- **Gotcha:** the ratio depends on the font's ascent and descent and on `--type-title-line-height`. If either changes, recompute it. The measurement trick: append a zero-size `inline-block` with `vertical-align: baseline` to `.hero__line` and read its `top`.
- **Gotcha:** the cards are taller (391px) than that row (about 374px at 100px), so they overflow the row upward into the hero's top padding. That relies on grid `align-self: end` overflowing towards the start edge, which it does in all current engines (none implement "safe" alignment by default).
