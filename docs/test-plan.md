# Test plan

Manual checks to run on the deployed preview, split by feature. They cover what the automated checks and headless probes can't: real browsers, real devices, touch, and judgement calls on the design.

- **Where to test:** the GitHub Pages preview, `https://reecegarratt.github.io/cass-website/` (D-019). It redeploys on every push to `main`.
- **Ticking a check:** change `- [ ]` to `- [x]`, and add the browser or device and the date after it, e.g. `(Safari 19, Mac, 2026-10-22)`.
- **When a check fails:** leave it unticked and add an indented line under it with the browser, the steps and what happened. Then raise it as a question or a fix.
- **Adding checks (agents):** add each manual check to its feature's section as an unticked box while you build, not at the end. Each phase 3 stream has its own section below, so streams don't edit the same lines.

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

## Landing page (stream 3A)

<!-- Stream 3A adds its checks here. -->

## TRANSEARCH case study (stream 3B)

<!-- Stream 3B adds its checks here. -->

## Case study page fixes (stream 3C)

<!-- Stream 3C adds its checks here. -->
