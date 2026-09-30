---
figma_page: Work
page_node_id: "19:104"
url: https://www.figma.com/design/z037c50FocJthsq5WRzJcd/Portfolio-Website?node-id=19-104
fetched: 2026-09-29
tools: [get_metadata, get_screenshot]
---

# Work page

What the `Work` page (`19:104`) contains, and the section vocabulary the four case studies share. The raw outline is in [`outline-work-page.md`](outline-work-page.md); the reference screenshots are one per case study folder.

**Nothing here has had `get_design_context` run on it yet.** This is the map, not the detail. Per the [build workflow](README.md#phase-2--screens-one-at-a-time), fetch design context section by section when building each case study.

## Frames

| Frame | Node | Size | Snapshot |
|---|---|---|---|
| Landing | `30:339` | 1920 x 1080 | — (a third copy of the landing design; see Q-017) |
| 💻 Case Study 1 | `53:156` | 1920 x 6003 | [`case-study-1-desktop/`](case-study-1-desktop/) |
| 💻 Case Study 2 | `91:669` | 1920 x 9337 | [`case-study-2-desktop/`](case-study-2-desktop/) |
| 💻 Case Study 3 | `92:1823` | 1920 x 7400 | [`case-study-3-desktop/`](case-study-3-desktop/) |
| 💻 Case Study 4 | `144:269` | 1920 x 8184 | [`case-study-4-desktop/`](case-study-4-desktop/) |
| iPhone 16 - 2 | `99:2978` | 393 x 4773 | — (mobile case study) |
| ABSA (Definition Tip instances) | `144:1046`, `144:1063`, `144:1069`, `144:1079` | 463 x 141 | Floating beside the case studies, not inside them |

Which client each case study belongs to, read from the screenshots:

| | Client | Title |
|---|---|---|
| Case Study 1 | Absa | streamlining scoring for multiple products |
| Case Study 2 | Standard Bank | consolidating import collections |
| Case Study 3 | MiX Telematics | using research to build a better sales workflow |
| Case Study 4 | TRANSEARCH | designing an interactive workbook |

## How the case studies are assembled

Case studies 2, 3 and 4 are built from **instances** of the design system components:

| Component | CS1 | CS2 | CS3 | CS4 |
|---|---|---|---|---|
| Navigation | instance | instance | instance | instance |
| Sub Nav | drawn in place | instance | instance | instance |
| Intro | drawn in place | instance | instance | drawn ("Left Content") |
| Business Problem Heading | drawn in place | drawn ("Heading") | instance | drawn ("Heading") |
| Read More | instance | (not in outline) | instance | (not in outline) |
| Arrow_01 | — | 5 instances | 5 instances | 5 instances |

Case Study 1 is the odd one out: it wraps everything in a single `Content` frame with tidy section names (Introduction, Process, Business problem, Talking to agents, Design, Testing, Handover) and draws its sub nav rather than instancing it. It reads as the original, made before the components existed.

**The five `Arrow_01` instances per case study** are the hand-drawn Red arrows from [Shapes & Arrows](components/shapes-arrows/context.md). They sit between the process-strip steps.

## The shared section vocabulary

Read from the four screenshots. The **order and content differ per case study, but the section *types* repeat**:

1. **Intro** — handwritten role eyebrow, Red title, user-type pills, lead paragraph, then `project goal` / `project outcome`, with a large product screenshot to the right.
2. **Process strip** — a full-bleed Purple band of 5–6 labelled steps joined by hand-drawn arrows. Present in all four, with per-case-study step labels.
3. **Section heading** — the handwritten article + large Red two-line heading, sometimes right-aligned, sometimes left, with an optional standfirst. Used for "the business problem", "designing the scoring page", "wireframing", "typography & design", "handover & next iteration".
4. **Findings list** — short statements separated by thin Red or Purple rules, sitting to the right of a section heading.
5. **Full-bleed Purple panel** — a heading plus body, often with an image or a pull quote. Used for "talking to the experts", "taking it step by step", "competitor research", "user journeys", "the new user journey", "development & next iteration", and the "14 out of 15" stat panel.
6. **Image + problem/solution/outcome block** — a screenshot on one side, and on the other a small heading with `problem` / `solution` / `outcome` (sometimes `insight`, `design decision`, `reflection`) labelled paragraphs in Red with Purple body copy. **The most repeated block on the site** — roughly four per case study.
7. **Persona cards** — an avatar illustration, a name, `goals` and `pain points` lists. Three across, in CS2 and CS4.
8. **Handwritten annotation** — a short La Belle Aurore caption under an image or beside a block.
9. **Read More** — the "Other case studies" row of three cards.

## Notes

- **Sub nav labels are per case study, not fixed.** The design system's default reads Project Overview, Business Needs, Interviews, Design, User Testing, Handover (matching CS1), but CS2 and CS4 show Project Overview, Business Needs, Interviews, **Personas**, **User Journey**, Design. So the labels are content, and they track that case study's own sections.
- **Case studies are long:** 6003–9337px at 1920 wide. Image-heavy, so image handling and lazy loading matter more here than anywhere else on the site.
- **The Definition Tip instances float outside the frames**, parked on the canvas next to each case study rather than placed in the layout. That reinforces that its trigger and position aren't designed yet (Q-016).
- **Every case study ends with the Read More row**, even where the outline doesn't show an instance — CS2 and CS4 draw it in place.
