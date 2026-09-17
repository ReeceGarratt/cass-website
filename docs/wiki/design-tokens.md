---
summary: Where the design tokens live, their naming scheme, unit rules, and how the fluid values were derived.
updated: 2026-09-17
related: [figma-mcp.md]
decisions: [D-002, D-014, D-020, Q-005, Q-010, Q-013]
---

# Design tokens

`src/styles/tokens.css` is the source of truth for every design value used in components and pages (architecture invariant 1). It's written by hand from the saved snapshots in `docs/figma/` (D-014), not generated — Q-005 (a real token pipeline) is still open. The spec's original "Space, size and radius" table has drifted from the real token names; treat `src/styles/tokens.css` and this page as current, not the spec.

## Naming scheme

| Prefix | Covers |
|---|---|
| `--color-*` | Figma colour variables, plus a couple of fills that aren't variables (`--color-black`, `--color-icon`) |
| `--type-<style>-{size,line-height,letter-spacing,weight}` | One group of four per Figma text style (`title`, `subtitle`, `card-title`, `body`, `caption`, `brand`, `nav`) |
| `--space-*` | Gaps, padding and offsets between elements |
| `--size-*` | Fixed widths/heights of elements (card, arrow, nav dot, hero intro) |
| `--hero-*` | Hero decoration sized relative to the title (`em`), plus its offsets |
| `--card-corner-*` | The hover-state corner stroke boxes on the case study card |
| `--radius-*` | Border radii |
| `--shadow-*` | Box shadows (`--shadow-card` is a placeholder, Q-013) |
| `--duration-*`, `--ease-*` | Transition timing (`--duration-hover`, `--ease-hover`; placeholders, Q-013) |
| `--focus-ring-*` | The shared focus ring colours and width |

The Figma text style called "H1" is the case study card's title, not the page's `<h1>` — its token is named `--type-card-title-*` to avoid confusion with the actual headline (`--type-title-*`).

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
