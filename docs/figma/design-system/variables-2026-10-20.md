---
figma_page: Design system
node_id: "306:1542"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=306-1542
fetched: 2026-10-20
tools: [get_variable_defs]
---

# Variables and styles (2026-10-20)

`get_variable_defs` on the style guide frame (`306:1542`), whose swatches are bound to the file's colour variables. Calling it on the page node (`129:3321`) fails with "You currently have nothing selected"; it needs a frame.

## Output

```json
{
  "Purple": "#4832A1",
  "Grey": "#6b6b6b",
  "Title 1": "Font(family: \"Inter\", style: Black, size: 50, weight: 900, lineHeight: 48, letterSpacing: -4)",
  "Black": "#000000",
  "Off-white": "#f8f9ff",
  "Red": "#CD2B2B",
  "Light purple": "#c4cdf4",
  "White": "#ffffff",
  "H1": "Font(family: \"Inter\", style: Bold, size: 30, weight: 700, lineHeight: 0.9200000166893005, letterSpacing: -2)",
  "H3": "Font(family: \"Inter\", style: Bold, size: 14, weight: 700, lineHeight: 1.5, letterSpacing: -1.100000023841858)",
  "Sub Title": "Font(family: \"Inter\", style: Regular, size: 20, weight: 400, lineHeight: 27, letterSpacing: -4)",
  "Title 2": "Font(family: \"Inter\", style: Black, size: 45, weight: 900, lineHeight: 1, letterSpacing: -2)",
  "Body Reg": "Font(family: \"Inter\", style: Regular, size: 16, weight: 400, lineHeight: 1.4800000190734863, letterSpacing: -1.100000023841858)",
  "Caption Text": "Font(family: \"Inter\", style: Regular, size: 12, weight: 400, lineHeight: 1.5, letterSpacing: -1.100000023841858)",
  "Handwritten": "Font(family: \"La Belle Aurore\", style: Regular, size: 28, weight: 400, lineHeight: 1.1100000143051147, letterSpacing: -2)",
  "Portfolio Drop": "Effect(type: DROP_SHADOW, color: #0000000D, offset: (0, 1), radius: 3, spread: 1); Effect(type: DROP_SHADOW, color: #0000001A, offset: (0, 1), radius: 2, spread: 0)",
  "Light Grey": "#e7e6e6"
}
```

## Also reported on 2026-10-20 by other calls

- `get_design_context` on the Intro (`144:1045`): `Hand written` (La Belle Aurore 28 / 1.11 / −2), `H2` (Inter Bold 20 / 1.12 / 0), `Body Med` (Inter Medium 16 / 1.48 / −1.1), and **`Light Purple: #C1CBFF`**, the second light purple, which still exists.
- The spacing variables `--sub-sub-sections` (48) and `--headings-&-body` (16) still appear in the Intro's output.

## Notes

- **Colour values match 2026-09-29.** Eight variables: Purple, Off-white, Red, Light purple, White, Black, Grey, Light Grey.
- **Seen for the first time in a fetch** (they may have existed before without being reported, so confirm against [`../tokens.md`](../tokens.md)):
  - **`H3`**: Inter Bold 14 / 1.5 / −1.1%, used for the email pill label.
  - **`Handwritten`** (one word) is reported here; the Intro reports `Hand written`. It may be a rename, or two styles with the same values.
- **`Portfolio Drop`** isn't new: it's the effect style already built as `--shadow-card` (see Q-022). It's listed here because the style guide's swatches or specimens use it.
- The style guide's own reading of these values is in [`style-guide/context.md`](style-guide/context.md).
