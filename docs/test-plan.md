# Test plan

Manual checks to run on the deployed preview, split by feature. They cover what the automated checks and headless probes can't: real browsers, real devices, touch, and judgement calls on the design.

- **Where to test:** the GitHub Pages preview, `https://reecegarratt.github.io/cass-website/` (D-019). It redeploys on every push to `main`.
- **Ticking a check:** change `- [ ]` to `- [x]`, and add the browser or device and the date after it, e.g. `(Safari 19, Mac, 2026-10-22)`.
- **When a check fails:** leave it unticked and add an indented line under it with the browser, the steps and what happened. Then raise it as a question or a fix.
- **Adding checks (agents):** add each manual check to its feature's section as an unticked box while you build, not at the end. Add a new section when a feature doesn't have one yet.

## Reviews for Reece

Decisions to accept or change, not pass/fail tests.

- [ ] **Case study intro spacing (D-046).** On Absa and Standard Bank, the visible gaps (eyebrow to title / title to pill) went from 13 / 11px to 7 / 13px, against targets of 6.5 / 13.2px. MiX Telematics misses its targets (25 / 23px against 15.5 / 25.2px): its eyebrow has no descenders, so its gap started at 31px. One shared pair of spacing tokens was kept; a per-page override is a one-line change. Compare the [before](superpowers/plans/2026-10-20-foundation/intro-before.png) and [after](superpowers/plans/2026-10-20-foundation/intro-after.png) crops, then accept the shared tokens or ask for the override.

## Site nav

From phase 2 (D-040, D-045, D-048, D-049, D-050). The headless probes passed; these confirm it on real devices.

- [ ] On a case study, scrolling down hides the nav and scrolling up brings it back. The sub nav stays visible throughout, and the nav never covers it.
- [ ] Clicking a sub nav link jumps to its section without the nav coming back over the section's heading.
- [ ] Tabbing into the hidden nav brings it back.
- [ ] "Email me" copies the address and shows the tick for about 3 seconds, then the copy icon returns. Paste it somewhere to confirm what was copied.
- [ ] **Phone:** "Email me" copies the address, or opens the mail app if copying isn't available.
- [ ] Resume shows its download icon on both nav colours. Once the document exists (Q-011), it downloads, or opens if it's hosted off-site.

## Skip link

From phase 2 (D-041). See [wiki/skip-link.md](wiki/skip-link.md). The headless tests couldn't tell `:focus` from `:focus-visible`, so it's still unconfirmed whether the change fixes what Cass saw.

- [ ] **Mac (Safari):** open a case study from the home page, scroll, then go back and forward. The skip link shouldn't appear unless you press Tab.
- [ ] **Phone:** the same steps. The skip link shouldn't appear.
- [ ] **Keyboard:** pressing Tab on page load shows the skip link, and Enter jumps to the main content (WCAG 2.4.1).

## Definition Tip

From phase 2 (D-042): the bold, underlined company name in a case study opens an info block.

- [ ] Escape closes an open tip.
- [ ] Clicking outside closes an open tip.
- [ ] **Android:** tapping the company name opens the tip, and tapping elsewhere closes it.

## Read More cards

From phase 2 (D-037, D-043).

- [ ] **Client pill on hover and focus (Q-036).** The card turns Purple, so the Purple pill disappears and only its white text is left. Check how it looks, then decide with Cass's answer to Q-036.

## Landing page

From stream `landing` (D-051 to D-054, D-055 to D-057). The headless probes passed; these confirm it in real browsers.

- [ ] The client strip loops smoothly with no jump or gap at the end of each loop, at 1920px and on a wider screen if one's available.
- [ ] Hovering the client strip pauses it, and moving away resumes it.
- [ ] With the OS's reduced motion setting on, the strip is still and shows each client once.
- [ ] Both email pills copy the address and show the tick for about 3 seconds. Paste it somewhere to confirm what was copied.
- [ ] **Phone:** tapping an email pill copies the address, or opens the mail app if copying isn't available.
- [ ] Hovering or tabbing to a project card turns it Purple, with a White title and summary, a Light purple pill and skills, and the Red arrow.
- [ ] **Keyboard:** on the home page, Tab then Enter on the skip link moves focus to the main content, and the nav comes back.

## TRANSEARCH case study

- [ ] At 1920px, the page matches the TRANSEARCH frame (`docs/figma/case-study-4-desktop/screenshot-2026-10-20.png`) section by section.
- [ ] The intro image runs to the right edge of the window, with square right-hand corners.
- [ ] Hovering, focusing or tapping "TRANSEARCH International" opens its definition; Escape closes it.
- [ ] Each sub nav link (Project Overview, Business Needs, Research, User Journeys, Design, Handover) jumps to its section, and the underline follows as you scroll.
- [ ] The white wireframing band sits flush under the purple user journeys panel.
- [ ] The phone image overlaps the tablet in Responsive design, and the caption isn't covered.
- [ ] Other case studies shows Absa, Standard Bank and MiX Telematics, not TRANSEARCH.
- [ ] In Other case studies, TRANSEARCH's card says "Designing an interactive book" with UI Design | Interaction Design | Typography, and Absa's badge says "Absa Banking". The home page shows the same: all four case studies as detailed cards, with badges (D-056).

## Case study page fixes

From stream `fixes` (D-058, Q-044, Q-045).

- [ ] On Absa's "testing my work" panel at 1920px, the hand-written arrow's tip sits just right of "instead of at the bottom.", level with that line, as in Figma (D-058). Also check at 1280px that the arrow doesn't touch the text.
- [ ] Cass has answered Q-044 (Standard Bank business needs) and Q-045 (Standard Bank Reviewing alignment), or the items are dropped.
