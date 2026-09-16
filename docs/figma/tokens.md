---
fetched: 2026-09-16
tools: [get_variable_defs]
source_frames:
  - "4:489"   # Landing (hover state), desktop
---

Styles and variables *used in* the frames listed above. `get_variable_defs` only returns what the selected node uses, so this may not be the whole palette.

## Landing (hover state), node 4:489

```json
{"Title":"Font(family: \"Inter\", style: Black, size: 100, weight: 900, lineHeight: 98, letterSpacing: -4)","Purple":"#4832A1","Sub Title":"Font(family: \"Inter\", style: Regular, size: 20, weight: 400, lineHeight: 27, letterSpacing: -4)","Red":"#CD2B2B","Off-white":"#f8f9ff","H1":"Font(family: \"Inter\", style: Bold, size: 30, weight: 700, lineHeight: 0.9800000190734863, letterSpacing: -2)","White":"#FFFFFF","Caption Text":"Font(family: \"Roboto\", style: Regular, size: 12, weight: 400, lineHeight: 1.5, letterSpacing: -1.100000023841858)","Body copy":"Font(family: \"Inter\", style: Regular, size: 16, weight: 400, lineHeight: 1.4800000190734863, letterSpacing: -1.100000023841858)","Grey":"#6b6b6b","Light purple":"#c4cdf4"}
```

## Notes

- **Palette:** per the user (2026-09-16), the seven loose 102×102 squares plus the Flower symbol (`1:162`) make up the whole colour palette. That's 8 swatches, but this frame only uses 6 colour variables, so up to 2 palette colours are still unaccounted for.
- **Units are unclear.** `lineHeight` is sometimes pixels (`98`, `27`) and sometimes a multiplier (`0.98`, `1.48`), and it isn't known whether `letterSpacing` is pixels or percent. Check against the `get_design_context` output before turning these into CSS.
- **Fonts:** Inter (Black, Bold, Regular) and Roboto Regular (captions).
