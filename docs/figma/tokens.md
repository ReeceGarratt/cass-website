---
fetched: 2026-09-29
tools: [get_variable_defs]
source_frames:
  - "4:489"    # Landing (hover state), desktop — 2026-09-16, frame since deleted from the file
  - "129:3402" # Design system / Colours — 2026-09-29
  - "129:3456" # Design system / Text styles — 2026-09-29
  - "144:1716" # Design system / Case Study — 2026-09-29
---

Styles and variables *used in* the frames listed above. `get_variable_defs` only returns what the selected node uses, so this may not be the whole palette.

## Colours, node 129:3402 (Design system / Colours) — 2026-09-29

```json
{"Body Reg":"Font(family: \"Inter\", style: Regular, size: 16, weight: 400, lineHeight: 1.4800000190734863, letterSpacing: -1.100000023841858)","Purple":"#4832a1","Red":"#cd2b2b","Light purple":"#c4cdf4","Off-white":"#f8f9ff","Black":"#000000","Grey":"#6b6b6b","White":"#ffffff","Light Grey":"#e7e6e6"}
```

## Text styles, node 129:3456 (Design system / Text styles) — 2026-09-29

```json
{"Black":"#000000","Title 1":"Font(family: \"Inter\", style: Black, size: 50, weight: 900, lineHeight: 48, letterSpacing: -4)","Sub Title":"Font(family: \"Inter\", style: Regular, size: 20, weight: 400, lineHeight: 27, letterSpacing: -4)","H1":"Font(family: \"Inter\", style: Bold, size: 30, weight: 700, lineHeight: 0.9200000166893005, letterSpacing: -2)","Body Reg":"Font(family: \"Inter\", style: Regular, size: 16, weight: 400, lineHeight: 1.4800000190734863, letterSpacing: -1.100000023841858)","Caption Text":"Font(family: \"Inter\", style: Regular, size: 12, weight: 400, lineHeight: 1.5, letterSpacing: -1.100000023841858)","Purple":"#4832A1","Handwritten":"Font(family: \"La Belle Aurore\", style: Regular, size: 28, weight: 400, lineHeight: 1.1100000143051147, letterSpacing: -2)","Off-white":"#f8f9ff"}
```

## Case Study, node 144:1716 (Design system / Case Study) — 2026-09-29

```json
{"Purple":"#4832A1","Hand written":"Font(family: \"La Belle Aurore\", style: Regular, size: 28, weight: 400, lineHeight: 1.1100000143051147, letterSpacing: -2)","Red":"#CD2B2B","Title 1":"Font(family: \"Inter\", style: Black, size: 50, weight: 900, lineHeight: 48, letterSpacing: -4)","Body Reg":"Font(family: \"Inter\", style: Regular, size: 16, weight: 400, lineHeight: 1.4800000190734863, letterSpacing: -1.100000023841858)","Light purple":"#c4cdf4","Sub Title":"Font(family: \"Inter\", style: Regular, size: 20, weight: 400, lineHeight: 27, letterSpacing: -4)","H2":"Font(family: \"Inter\", style: Bold, size: 20, weight: 700, lineHeight: 1.1200000047683716, letterSpacing: 0)","Body Med":"Font(family: \"Inter\", style: Medium, size: 16, weight: 500, lineHeight: 1.4800000190734863, letterSpacing: -1.100000023841858)","Headings & Body":"16","Light Purple":"#C1CBFF","Sub-Sub Sections":"48","Title 2":"Font(family: \"Inter\", style: Black, size: 45, weight: 900, lineHeight: 1, letterSpacing: -2)","Off-white":"#f8f9ff"}
```

## Landing (hover state), node 4:489 — 2026-09-16

Kept for history. **This frame no longer exists in the Figma file** (see [`design-system/README.md`](design-system/README.md)).

```json
{"Title":"Font(family: \"Inter\", style: Black, size: 100, weight: 900, lineHeight: 98, letterSpacing: -4)","Purple":"#4832A1","Sub Title":"Font(family: \"Inter\", style: Regular, size: 20, weight: 400, lineHeight: 27, letterSpacing: -4)","Red":"#CD2B2B","Off-white":"#f8f9ff","H1":"Font(family: \"Inter\", style: Bold, size: 30, weight: 700, lineHeight: 0.9800000190734863, letterSpacing: -2)","White":"#FFFFFF","Caption Text":"Font(family: \"Roboto\", style: Regular, size: 12, weight: 400, lineHeight: 1.5, letterSpacing: -1.100000023841858)","Body copy":"Font(family: \"Inter\", style: Regular, size: 16, weight: 400, lineHeight: 1.4800000190734863, letterSpacing: -1.100000023841858)","Grey":"#6b6b6b","Light purple":"#c4cdf4"}
```

## Effect styles

Reported by `get_design_context` on the Detailed Card (`129:3554`); they have no entry in `get_variable_defs` output.

```
Portfolio Drop:      DROP_SHADOW #0000000D offset (0, 1) radius 3 spread 1
                   + DROP_SHADOW #0000001A offset (0, 1) radius 2 spread 0
Portfolio Card drop: DROP_SHADOW #F5EFE6AB offset (-1, 3) radius 3.5 spread 1
```

## Notes

### Changes since 2026-09-16

- **Colours: 8 variables, up from 6.** `Black` (`#000000`) and `Light Grey` (`#e7e6e6`) are now variables; `Black` was previously a hard-coded fill, recorded as such in `tokens.css`. This closes the "up to 2 palette colours unaccounted for" note.
- **Spacing variables now exist:** `Headings & Body` = 16 and `Sub-Sub Sections` = 48 (unitless, i.e. px). Q-005's note that the file has no spacing variables is out of date. Only these two exist — everything else is still untokenised.
- **`H1` line height changed 0.98 → 0.92.** `src/styles/tokens.css` still has `--type-card-title-line-height: 0.98`, so card titles are currently taller than the design.
- **`Caption Text` is now Inter**, not Roboto, matching the change already made to `tokens.css`.
- **Four new type styles:** `Title 2` (Inter Black 45/1.0), `H2` (Inter Bold 20/1.12, letterSpacing **0**), `Body Med` (Inter Medium 16/1.48), `Hand written` / `Handwritten` (**La Belle Aurore** 28/1.11).
- **Effect styles now exist** (`Portfolio Drop`, `Portfolio Card drop`), which is what Q-013 was waiting for.

### Things to confirm with Cass

- **Two light purples:** `Light purple` `#c4cdf4` and `Light Purple` `#C1CBFF` are separate variables that differ only in case and by a few units of hue. Almost certainly one is a duplicate.
- **`Hand written` vs `Handwritten`:** the same font style is returned under two names from different frames. Probably one style renamed, with a stale reference somewhere.
- **`Title` (100px) is not on the Design system page.** The type specimen's largest sample is labelled "Title 100px" but is bound to `Title 1` at 50px. The 100px `Title` style the home hero uses only ever appeared on the deleted Landing frame. Check it still exists.
- **`Body Copy 12px` vs `Captions 12px`:** the specimen shows both as separate samples, but only one 12px style (`Caption Text`) comes back as a variable.

### Units

`lineHeight` is sometimes pixels (`98`, `48`, `27`) and sometimes a multiplier (`0.92`, `1.48`). `letterSpacing` is a percentage: `-1.1` renders as `-0.176px` at 16px (= -1.1%), and `-4` renders as `-0.8px` at 20px. Check against `get_design_context` output before turning these into CSS.

### Fonts

Inter (Black, Bold, Medium, Regular) and **La Belle Aurore** (Regular). La Belle Aurore is new and isn't registered in `astro.config.mjs`. Roboto is no longer used by any current style, though the Read More cards still reference Roboto Bold 15px (see [`components/read-more/`](components/read-more/context.md)).
