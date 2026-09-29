---
figma_page: Design system
page_node_id: "129:3321"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=129-3321
fetched: 2026-09-29
tools: [get_metadata, get_variable_defs, get_design_context, get_screenshot, download_assets]
---

# Design system page

The Figma file was reorganised some time between 2026-09-17 and 2026-09-29. It now has two pages, **📕 Cover** (`129:3336`) and **Design system** (`129:3321`). The `Landing` page that the home page POC was built from **no longer exists in this file** — see [Notes](#notes).

This folder holds the page-level output. Per-component snapshots live in [`../components/`](../components/).

## Frame inventory

| Frame | Node | Snapshot | Status |
|---|---|---|---|
| Colours | `129:3402` | [`../tokens.md`](../tokens.md) | Fetched (variables) |
| Text styles | `129:3456` | [`text-styles.png`](text-styles.png), [`../tokens.md`](../tokens.md) | Fetched (variables + screenshot) |
| Shapes & Arrows | `129:3457` | [`../components/shapes-arrows/`](../components/shapes-arrows/) | Fetched (assets) |
| Buttons *(hidden in Figma)* | `129:3467` | — | Not fetched; the layer is hidden |
| Buttons / Button_Circle Arrow | `129:3632` → `4:137` | [`../components/arrow/`](../components/arrow/) | Already saved 2026-09-16 |
| Cards / Compact Card | `129:3633` → `4:123` | [`../components/case-study-card/`](../components/case-study-card/) | Already saved 2026-09-16 |
| Cards / Detailed Card | `129:3633` → `129:3554` | [`../components/detailed-card/`](../components/detailed-card/) | **New**, fetched |
| Navigation / Navigation | `129:3646` → `20:703` | [`../components/navigation/`](../components/navigation/) | Saved 2026-09-16; **now has a 5th variant** (`Prototype`, `181:2514`) not in the snapshot |
| Navigation / Sub Nav | `129:3646` → `185:2566` | [`../components/sub-nav/`](../components/sub-nav/) | **New**, fetched |
| Pills | `144:626` → `144:592` | [`../components/pills/`](../components/pills/) | **New**, fetched |
| Definition Tip | `144:630` → `99:2845` | [`../components/definition-tip/`](../components/definition-tip/) | **New**, fetched |
| Icons | `144:1321` | [`../components/icons/`](../components/icons/) | **New**, fetched (assets) |
| Case Study / Intro | `144:1716` → `144:1045` | [`../components/case-study-intro/context.md`](../components/case-study-intro/context.md) | **New**, fetched |
| Case Study / Business Problem Heading | `144:1716` → `144:1870` | [`../components/case-study-intro/business-problem-heading.md`](../components/case-study-intro/business-problem-heading.md) | **New**, fetched |
| Other case studies cards / Read More | `180:914` → `99:2461` | [`../components/read-more/`](../components/read-more/) | **New**, fetched |

## Variables and styles

Full output is in [`../tokens.md`](../tokens.md). In summary, since the 2026-09-16 fetch:

- **Colours: 8 variables, up from 6.** `Black` (`#000000`) and `Light Grey` (`#e7e6e6`) are now proper variables. `Black` was a hard-coded fill before.
- **A second light purple exists.** The variable `Light purple` is `#c4cdf4`; a separate `Light Purple` is `#C1CBFF`. Both are reported by `get_variable_defs` on the Case Study frame.
- **Spacing variables now exist:** `Headings & Body` = 16 and `Sub-Sub Sections` = 48. The 2026-09-16 finding that the file has no spacing variables is out of date (affects Q-005).
- **Type: four new styles.** `Title 2` (Inter Black 45/1.0), `H2` (Inter Bold 20/1.12), `Body Med` (Inter Medium 16/1.48) and `Hand written` (**La Belle Aurore** 28/1.11).
- **`H1` line height changed** from 0.98 to **0.92**. `tokens.css` still has 0.98.
- **`Caption Text` is now Inter,** not Roboto — which matches the change already made in `tokens.css`. The Read More cards still use Roboto 15px, though (see below).
- **Two title scales beside the home hero's 100px `Title`:** `Title 1` at 50px and `Title 2` at 45px.

## Notes

- **The `Landing` page is gone from this file.** Node IDs that belong to components (`4:123` Compact Card, `20:703` Navigation, `4:137` arrow, `1:162` Flower) all still resolve here, so this is the same file — the Landing frames were deleted or moved out, not re-keyed. The saved snapshots in [`../landing-desktop/`](../landing-desktop/) and [`../landing-desktop-hover/`](../landing-desktop-hover/) are therefore the **only** remaining record of the home page design. Don't delete them.
- **There is no `Work` page in this file.** Only 📕 Cover and Design system are listed. Wherever the Work page and the case studies live, it isn't here.
- The `Buttons` frame at `129:3467` is hidden in Figma and was not fetched.
- The **Case Study** frame (`144:1716`) is 3558 x 2376 but holds only two symbols. It looks like a work-in-progress area rather than a finished component set.
