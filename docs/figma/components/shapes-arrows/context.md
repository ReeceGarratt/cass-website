---
frame: Design system / Shapes & Arrows
node_id: "129:3457"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=129-3457
fetched: 2026-09-29
tools: [get_metadata, download_assets]
---

## Outline

```xml
<frame id="129:3457" name="Shapes &amp; Arrows" x="-2842" y="1185" width="355" height="416">
  <symbol id="1:162" name="Flower" x="43" y="40" width="77" height="77" />
  <symbol id="129:3466" name="Rectangle" x="43" y="156" width="288" height="77" />
  <symbol id="129:3488" name="Arrow_01" x="67" y="277.75" width="41.83" height="27.33" />
  <symbol id="129:3489" name="Arrow_02" x="201.40" y="314" width="76.57" height="62.20" />
  <symbol id="129:3490" name="Arrow_03" x="67" y="359.51" width="48.90" height="44.84" />
</frame>
```

## Files

`reference.png` is the `download_assets` export of the whole frame, kept as a visual key.

| File | Size | Belongs to |
|---|---|---|
| `arrow-01-curve.svg` | 40 x 29 | Arrow_01 (`129:3488`) |
| `arrow-01-head.svg` | 17 x 12.96 | Arrow_01 |
| `arrow-02-curve.svg` | 71.29 x 48.33 | Arrow_02 (`129:3489`) |
| `arrow-02-head.svg` | 17 x 16 | Arrow_02 |
| `arrow-03-curve.svg` | 38.03 x 15.38 | Arrow_03 (`129:3490`) |
| `arrow-03-head.svg` | 27.81 x 21.92 | Arrow_03 |
| `arrow-03.svg` | 49 x 46 | Arrow_03 (`129:3490`), whole node |

## Notes

- **Three hand-drawn Red accent arrows,** each exported as **two SVGs** — a curve and a separate arrowhead. `download_assets` on the whole frame returns them as loose vectors, so the grouping above is inferred by matching part sizes to each symbol's bounding box. Re-export per symbol node before building if exact placement matters.
- **Flower** (`1:162`) is the same symbol already saved in [`components/flower/`](../flower/flower.svg). Only the export size differs (77 here vs 90 there), so the existing file stays the single copy.
- **Rectangle** (`129:3466`) is the solid Purple 288x77 rounded pill used behind the home page hero headline. It has no SVG export because it's a plain rounded rectangle — build it in CSS, as the home page already does (`--hero-pill-*` tokens).
- These arrows don't appear in any component fetched so far. They're loose decoration, presumably placed on the Work or case study pages.
- **`arrow-03.svg` (refetch, 2026-09-29, task 17):** the two loose `arrow-03-*` part exports can't be reassembled — their relative placement isn't recoverable from the part sizes, and every attempted arrangement produced an arrowhead detached from the curve and pointing the wrong way. `download_assets` was re-run on the `129:3490` node itself with `defaultFormat: svg`, which returns the composed arrow (curve plus head, pointing up and to the left). Saved here as `arrow-03.svg`; the two background `<rect>`s the node export wraps it in were stripped and the strokes changed from `#CD2B2B` to `currentColor` before copying it to `src/assets/arrow-03.svg`, so the embedding page sets the colour (the case study's user-testing panel draws it White on Purple). Used by `src/pages/work/streamlining-scoring.astro`.
- **The same trap applies to `Arrow_01` and `Arrow_02`.** None of the three symbols' part exports carry their relative placement, so any of them will look wrong if reassembled from the loose files. `ProcessStrip.astro`'s Arrow_01 is composited from `arrow-01-curve.svg` + `arrow-01-head.svg` and its own comments describe the head's position as "a best-effort visual approximation, not a measured value" — it could be replaced with a composed `arrow-01.svg` the same way, for one `download_assets` call on `129:3488`. **Before building an arrow into case studies 2-4, re-export the symbol node itself** (`download_assets` with `defaultFormat: svg` on the symbol's id) rather than reaching for the part files here.
