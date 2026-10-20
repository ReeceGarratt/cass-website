---
frame: Cassandra Garratt — Portfolio style guide
node_id: "306:1542"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=306-1542
fetched: 2026-10-20
tools: [get_metadata, get_screenshot]
screenshot: screenshot.png   # 2369 × 3360 (the frame is 3360 × 4767.5)
---

# Portfolio style guide (Design system page, new since 2026-09-29)

A 3360 × 4767.5 frame on the Design system page, above the older component frames. It's a written style guide in four sections, **dated "Observed 19 Oct 2026"**, and it describes **one page: "Portfolio landing — Desktop" (`267:1855`)**, a landing frame that isn't in the [frame index](../../README.md#frame-index) yet.

This is a **transcription of the screenshot**, not `get_design_context` output: the frame is about 370 text nodes, and the screenshot is legible at this size. If an exact string matters, call `get_design_context` on the section node listed in the headings below.

## Guide introduction (`306:1543`)

- Label: "DESIGN REFERENCE / CURRENT FILE". Top right: "Desktop portfolio · 1920px reference · Observed 19 Oct 2026".
- Title: "Cassandra Garratt — Portfolio style guide".
- Purpose: "The page is the law. Heavy, expressive Inter. Violet and lavender foundations. Red as punctuation. Flat rounded forms, with room to breathe."
- Reading key:
  - OBSERVED = measured on Portfolio landing — Desktop (267:1855).
  - GUIDANCE = application advice derived from that page.
  - NOT SPECIFIED = no evidence on the selected page; do not infer a state or system.
- Footer: "One authoritative desktop page. Existing variables, linked text styles and component specimens." / "REFERENCE EDITION · 19 OCT 2026".

## 01 Color (`306:1557`)

"Seven observed brand colors. Swatches use the existing Current file variables; names below are the actual variable names, not a new semantic token system."

| Variable | Hex | Variable ID | Observed role |
|---|---|---|---|
| Purple | `#4832A1` | `2:6` | Brand text, links, solid client strip and badge fills |
| Off-white | `#F8F9FF` | `2:14` | Page canvas |
| Red | `#CD2B2B` | `2:15` | Brand name, scalloped flower and handwritten punctuation |
| Light purple | `#C4CDF4` | `4:84` | About background, email pills and circular project buttons |
| White | `#FFFFFF` | `2:16` | Case-study card surfaces and labels on purple badges |
| Black | `#000000` | `99:2972` | Primary hero headline and project titles |
| Grey | `#6B6B6B` | `99:2977` | Case-study summaries and paragraph text on cards |

- Pairings: Purple on Light purple (About panel); Light purple on Off-white (Contact email pill).
- In application: the client strip (Cell C, Transearch, Mercedes Benz, Manhattan Iced Tea in Off-white on Purple); the red wordmark and flower; the purple introduction with bold emphasis.
- **Local exceptions** ("observed, not new palette tokens"): `#EE0E0E` only for the curved "Open to work" text; `#1C1B1F` for the project-arrow glyph. "Keep Red #CD2B2B as the primary red."
- **Guidance:** "Purple and lavender lead; red punctuates. Do not promote embedded screenshot colors or #D9D9D9 icon-bounds rectangles into the brand palette. Light Grey exists locally but is not an observed visual brand surface on this page. These pairings are not an accessibility certification."

## 02 Typography (`306:1645`)

"Use actual page values, not library defaults. Inter does the structural work; La Belle Aurore adds an occasional red aside. Measurements are size / line-height / tracking."

| Role | Linked? | Font | Size / line height / tracking | Used for |
|---|---|---|---|---|
| Hero | no linked style (local override, "not Stats 96") | Inter Black 900 | 140px / 125px / −4% | Hero headline ("effective &") |
| Title 1 | linked | Inter Black 900 | 50px / 48px / −4% | Major section and contact headings |
| Title 2 | linked | Inter Black 900 | 45px / 100% / −2% | About heading, lowercase |
| H1 | linked | Inter Bold 700 | 30px / 92% / −2% | Card and principle headings, lowercase |
| Sub Title | linked | Inter Regular 400 | 20px / 27px / −4% | Introduction and design perspective |
| Body Reg | linked | Inter Regular 400 | 16px / 148% / −1.1% | Summaries and paragraph copy |
| Body Reg + local Bold | override | Inter Bold 700 | 16px / 148% / −1.1% | **Navigation** and client badges |
| H3 | linked | Inter Bold 700 | 14px / 150% / −1.1% | Email labels |
| Caption Text + local Bold | override (defined style is Regular 400) | Inter Bold 700 | 12px / 150% / −1.1% | Project disciplines |
| Handwritten | linked | La Belle Aurore 400 | 28px / 111% / −2% | Sparse red "favourite" and pointer accents |
| Wordmark | local | Inter Black 900 | 27px / 148% / −1.1% | Red brand name |
| Client strip names | local | Inter Bold 700 | 20px / 112% / 0% | Off-white names on the purple strip |

- **Guidance:** "Sub Title selectively uses Bold emphasis for key phrases. Curved 'Open to work' is a separate local treatment: La Belle Aurore Regular 20px / 111% / −2%, lowercase, #EE0E0E. Body Med and Stats exist in the library but are not page law here. Do not set body paragraphs in handwriting."

## 03 Layout & spacing (`306:1750`)

"Desktop source: 1920 × 3161px. Vertical auto layout with 160px between major root children. Spacing is role-specific; this page does not establish a universal 8px scale."

- Diagram: Header 1920 × 90, 110px insets. Hero 922.1 × 559.9: headline + brand accents, 56px, introduction, 56px, email pill. Client strip 102px high, 40px padding, 64px name spacing. Main inset 114px; Selected work 1692px = 114 + (4 × 405) + (3 × 24) + 114 = 1920. Four cards 405 × 633 (Absa Banking, Standard Bank, MiX Telematics, TRANSEARCH), 24px apart. About: 508px column, 114px horizontal inset, 96px top and bottom padding; 130px column gap to principles; 30px between approach rows; 40px title-to-description gap; title width 270px. Contact: 1040px wide, centred; Title, 32px, email pill, 32px, flower.
- **Page rhythm / 160px:** the main root's auto-layout gap between hero, client strip, selected work, about and contact.
- **Header / 25px × 110px:** 25px vertical and 110px horizontal padding; primary links use 40px gaps. "Header margin is not the 114px main margin."
- **Hero and work / 56px:** hero internal vertical gap 56px; selected-work heading-to-card-row gap 56px. "Do not apply these to every stack."
- **About / 96, 114, 130px:** 96px vertical and 114px horizontal padding; 130px between columns; 30px between approach rows; 40px within principle content.
- **Principles / 14px, 1px, 18%:** 14px between principle content and divider; divider is 1px Purple at 18% opacity; explanatory stack uses 12px.
- **Contact / 32px:** 32px between contact children. The about perspective has a separate 24px internal gap; "don't normalize the two."
- **Guidance:** "Match the relevant region's measured spacing, not a synthesized global scale. Keep header and content insets distinct."
- **Not specified:** "This guide records the selected desktop page only. Breakpoints, smaller-screen reflow, sticky behavior and adaptive spacing rules are not specified by this source."

## 04 Components & brand usage (`306:1829`)

- **Navigation** (source instance `272:2268`, shown at 75%): wordmark left, Home · Work · About centre, Resume (download icon) and Email me (copy icon) right. "1920 × 90px · 25px vertical / 110px horizontal padding · primary links 40px apart. Preserve Home, Work, About, Resume and Email me; the observed library variant is White."
- **Case-study card / 405 × 633px:** White fill, 25px corners, 32px padding, 24px internal gap. "Flat outer card: no shadows or effects. Observed family: Detailed Card, Default." Source `267:1908`.
- **Anatomy:** client badge → H1 project title → Bold discipline caption → screenshot → Grey Body Reg summary → bottom-right circular arrow.
- **Screenshot container / 341 × 211px:** 25px corners; keep the source asset, aspect and crop.
- **Badge / 138 × 40px** (for "Absa Banking"): Purple fill, White Bold 16px label, radius 25px, padding 8px / 16px. Width is content-dependent.
- **Circular arrow / 50 × 50px:** Light purple fill, 38px radius, 15px padding; arrow glyph uses local `#1C1B1F`. "Observed Default only. Arrow rotated 90° on source cards." "Reuse the component, not a newly drawn arrow."
- **Email pill / 263 × 40px:** Light purple fill, 25px radius, padding 8px / 16px, 10px icon gap, H3 Bold 14px Purple label; copy glyph 17 × 20 in a 24 × 24 bounds. "Copy success and other interaction states: not specified." Sources `267:1865`, `267:1940`.
- **Brand accents:** the red scalloped flower (with curved "open to work"), a violet elongated pill, and "some of my projects" with a handwritten red "favourite" and caret. "The flower returns at 66px wide in contact; these are accents, not a repeating decorative pattern."
- **Do:** "Keep cards flat and rounded. Let purple/lavender dominate. Preserve screenshot aspect and existing crop. Use handwriting as a short red aside, with generous whitespace."
- **Don't:** "Don't add card shadows, rainbow brand colors, stretched screenshots or decorative body copy. **Library hover variants are not evidence of this page's behavior; states beyond those shown are not specified.**"
- **Handoff checklist:** "01 Bind the seven observed variables and retain linked text styles plus local overrides. 02 Check 110px header vs 114px main insets. 03 Reuse original components, content, screenshots and accent shapes. 04 Record new decisions separately: responsive rules, hover/focus/disabled states and accessibility conformance are not specified by this page."

## Notes

- **What it is:** a description of the new landing page, written up as rules. It doesn't define the case study pages or component states, and it says so ("states beyond those shown are not specified"). Its wording ("Observed", "Evidence status", "Source record", "do not infer a state or system") reads like an automated audit of `267:1855`, so it may not be something Cass wrote by hand.
- **New landing frame `267:1855`** (1920 × 3161): its sections are hero, client strip, selected work (four Detailed Cards), about and contact. This is phase 1b and Q-017 territory.
- **Ruling (2026-10-20, D-037):** Reece confirmed the style guide is the **source of truth**. Where a component set differs, the style guide wins and the component sets change to match. States the guide doesn't cover still come from the component sets, including the new 55px arrow hover. See the [delta doc](../delta-2026-10-20.md).
