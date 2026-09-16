---
summary: Where the design tokens live, their naming scheme, unit rules, and how the fluid values were derived.
updated: 2026-09-17
related: [figma-mcp.md]
decisions: [D-002, D-014, Q-005, Q-010]
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
| `--focus-ring-*` | The shared focus ring colours and width |

The Figma text style called "H1" is the case study card's title, not the page's `<h1>` — its token is named `--type-card-title-*` to avoid confusion with the actual headline (`--type-title-*`).

## Unit rules

- **Sizes and spacing:** `rem` (1rem = 16px), so they respect browser zoom and font-size settings.
- **Letter spacing:** `em`, because Figma expresses letter spacing as a percentage of the font size (e.g. Title −2% at 30px card title → −0.02em, or −4% at 100px title → −0.04em).
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

The card's skills line uses two literal spaces on each side of `|` in Figma (`User Research  |  Process Design  |  Systems Thinking`), not a fixed gap token. `--space-skill-separator: 0.4518em` is the measured rendered width of two spaces in the caption font (Inter Bold, 12px) — about 5.42px at 12px — so the CSS-drawn `|` separator (architecture: `content: "|" / ""`, screen-reader-invisible) sits the same distance from the words as it does in Figma, scaling with the caption size via `em`.

## Accepted residual: card 2 caption wrap (Q-010)

Figma's card caption is Inter Bold 12px. After the 2026-09-16 font change, captions wrap on cards 1 and 2 (391px tall cards) and stay on one line on card 3 (373px, vertically centred in the row) — see [`docs/figma/components/case-study-card/context.md`](../figma/components/case-study-card/context.md#refetch-2026-09-17-caption-font-changed-to-inter).

The build matches Figma for cards 1 and 3. **Card 2's caption fits on one line in the browser** (373px, not 391px), because browser and Figma shape Inter by a few pixels differently at this size. This is an accepted residual, not a bug: fixing it would mean hard-coding a per-card height or line-break, which the tokens system and the content collection don't support. Revisit if Cass flags it, or as part of settling Q-010.
