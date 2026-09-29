---
summary: What the Design system page defines, which of it is worth building as a component, and what has to be decided first.
updated: 2026-09-29
related: [design-tokens.md, figma-mcp.md, index.md]
decisions: [D-013, D-002, Q-005, Q-013, Q-014, Q-015, Q-016, Q-017]
---

# Componentisation

An analysis of the Figma **Design system** page (fetched 2026-09-29, snapshots in [`docs/figma/design-system/`](../figma/design-system/README.md)), written before building the case study pages. It answers one question: **what should become a component, and what shouldn't.**

The rule it applies is the one in `AGENTS.md`: *extract a component when markup repeats or Figma defines it as a component, not in advance.* A Figma component set is evidence, not an instruction — Cass's file also contains detached copies and drawing conveniences that shouldn't become code.

## What Figma actually defines

| Figma component set | Variants | Already built? |
|---|---|---|
| Navigation (`20:703`) | Default, Selected, Hover, iPad, **Prototype** | Yes — `SiteNav.astro`. The Prototype variant is new and unfetched. |
| Sub Nav (`185:2566`) | Default, 02, 03, 04 | No |
| Compact Card (`4:123`) | Default, Hover | Yes — `CaseStudyCard.astro` |
| Detailed Card (`129:3554`) | Default, Variant2 (= hover) | No |
| Pills (`144:592`) | Client name, User types | No |
| Button_Circle Arrow (`4:137`) | Default, Hover | Inline inside `CaseStudyCard.astro` |
| Definition Tip (`99:2845`) | — | No |
| Icons (`144:1321`) | 6 avatar symbols | No |
| Flower, Rectangle, Arrow_01–03 | symbols | Flower yes (asset); Rectangle as CSS; arrows unused so far |

Plus two things that **repeat but are not components** in Figma: the Read More card (a detached copy, used 3×) and the case study section heading (drawn once, but the six sub-nav links imply six of them per case study).

## The card family — the one decision that matters

Three card shapes exist, and they have drifted apart:

| | Compact (`4:123`) | Detailed (`129:3554`) | Read More (`88:583`) |
|---|---|---|---|
| Width / padding / gap | 343 / 30 / 22 | 405 / 32 / 24 | 448 / 30 / 22 |
| Client pill | — | yes | yes |
| Work thumbnail | — | yes | — |
| Skills type | Inter Bold 12 | Inter Bold 12 | **Roboto Bold 15** |
| Summary colour | Grey `#6b6b6b` | Grey `#6b6b6b` | **`rgba(0,0,0,0.58)`** |
| Hover state | yes | yes | **none drawn** |

Strip the drift and all three are **one skeleton with two optional slots**:

```
[ pill? ]
title
skills
[ thumbnail? ]
summary
arrow (bottom-right)
```

**Recommendation: one `CaseStudyCard.astro`, extended — not two or three components.** Add an optional `client` (renders the pill) and an optional `thumbnail` (renders the image frame). The existing hover behaviour, the stretched title link, the skills list and the focus handling all carry over unchanged.

**Leave width out of the component.** The three widths are a property of where the card sits — a home page row, a Work page grid, an end-of-page related row — not of the card. Let the card fill its grid track and drop `--size-card-width` from the component into the layouts. This is what stops three "variants" from existing at all.

The 12px-vs-15px skills and the two summary colours are almost certainly stale, since the Read More cards are detached copies that predate the caption font change ([design-tokens](design-tokens.md)). **Confirm before building both** (Q-014) — otherwise we implement a bug faithfully.

## Worth building as components

- **`Pill.astro`** — a real Figma component, two colourways (`client`: Purple/White; `userType`: Light purple/Purple + a 24px avatar icon), used on the detailed card, the Read More cards and the case study intro. Small, repeated, well specified. Note the detailed card's *hover* pill is a third colourway (Light purple bg, Purple text, no icon) applied as a local override — a third value of the same prop, not a third component.
- **`SectionHeading.astro`** — the handwritten eyebrow + right-aligned `Title 2` heading in Red + optional standfirst, from [Business Problem Heading](../figma/components/case-study-intro/business-problem-heading.md). Only one is drawn, but the sub nav lists six sections, so it repeats roughly 6 × 4 case studies = 24 times. The strongest case on the page. Rebuild it in flow layout; the Figma output is all absolute insets.
- **`SubNav.astro`** — used once per case study page, but it carries real logic (a progress underline) and shouldn't be re-typed into four page files. Build it as a component even though it has a single call site.
- **`CircleArrow.astro`** — currently inline in `CaseStudyCard.astro`. It is the default/hover SVG pair plus a crossfade, and the detailed and Read More cards both use it. **Extract it when the detailed card is built**, not before — that is its second real use.

## Not worth componentising

- **The Goal / Outcome block** — an H2 in Red over a Body Med paragraph, separated by a 400px hairline. Two uses inside one frame. That's a heading, a paragraph and an `<hr>`; a component would only hide tokens.
- **The avatar icons** — import the six SVGs as assets and pass one into `Pill`. No wrapper component.
- **Flower, Rectangle, the three hand-drawn arrows** — assets and CSS. The Rectangle is already a CSS rounded rect in the hero; the arrows are loose decoration with no home yet.
- **A generic `Card` primitive** underneath the case study card. There is exactly one card family on this site. A shared shell would be an abstraction with one implementer.
- **`DefinitionTip`** — blocked, not rejected. See below.

## What has to be decided first

These block or reshape the work above; none should be answered by an agent.

1. **Where is the Work page?** It isn't in this Figma file (Q-017). Everything about the case study *pages* below is inferred from design-system fragments, not from a real screen.
2. **Does D-013 still hold?** It says case study pages are bespoke `.astro` files with **no shared template**. The Design system page now defines a sub nav with six fixed section names, an intro block and a section-heading pattern — which describes a shared template. One of the two has to give (Q-015). This is the architecturally significant one: it decides whether the components above are a *template* or a *toolkit* that bespoke pages draw from.
3. **How interactive are these pages?** Two components break the no-client-JS default (invariant 3):
   - the **sub nav's progress underline**, which sweeps left to right with scroll position;
   - the **Definition Tip**, whose popup is drawn but whose trigger and open/close behaviour are not.

   Both are answerable with a little JS or degraded to CSS-only (a static `aria-current`; a `<details>` or native `title`), and the choice changes whether they are components or islands (Q-016).
4. **The content model grows.** The `caseStudies` collection currently has `title`, `skills`, `summary`, `order`. The designs also need a **client name** (the pill), **user types** (icon + label pairs), a **thumbnail**, and per-section body content. Figma also shows a **fourth** case study — TRANSEARCH, "designing an interactive book" — that isn't in `case-studies.json`.
5. **Token drift** ([tokens.md](../figma/tokens.md)): two light purples, `H1` line height changed 0.98 → 0.92, a new **La Belle Aurore** font to register, and new `Title 2` / `H2` / `Body Med` styles. The shadow effect styles Q-013 was waiting for now exist.

## Suggested order

Nothing here is a plan — it's the dependency order implied by the above.

1. Settle Q-015 (template vs bespoke) and find the Work page. Everything else hangs off these.
2. Reconcile tokens: add the new styles and font, fix `H1` line height, resolve the two light purples, replace the placeholder shadows.
3. Extend `CaseStudyCard` with `client` and `thumbnail`; move width to the layouts. Extract `CircleArrow` at the same time.
4. Add `Pill`.
5. Build the Work page from the real design, once we have it.
6. Case study pages: `SectionHeading`, then `SubNav`, then the Definition Tip once Q-016 is answered.
