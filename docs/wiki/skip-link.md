---
summary: How the skip link is styled and shown (D-041), what was and wasn't reproduced about Cass's report, and the manual check left for a real Mac and phone.
updated: 2026-10-20
related: [windows-dev-environment.md, index.md]
decisions: [D-041]
---

# Skip link

The "Skip to content" link is the first focusable element in `BaseLayout`. It is an accessibility requirement (invariant 5, WCAG 2.4.1), so Cass's feedback to remove it was answered with "keep it, restyle it" (D-041).

## How it's built (2026-10-20)

- Styled in `src/styles/global.css` as a Light purple pill with Purple bold 16px text, using the design system tokens. It sits off-screen until it's focused.
- It shows on `:focus-visible` only. It used to show on `:focus`, so any focus the reader hadn't asked for would reveal it.

## What was found about Cass's report

Verified in headless Edge with a real Tab key, before and after the change:

- Tab on load shows the link, both before and after.
- Script `.focus()` with no pointer use shows the link, both before and after (Chrome treats it as focus-visible).
- Tab, navigate away, then history back (bfcache restored focus on the skip link and kept it visible) shows the link, both before and after.

**No headless case separated `:focus` from `:focus-visible`.** In every case reproduced, both matched, so the old and the new CSS behaved the same. The two only differ when an element has `:focus` without `:focus-visible`, which means focus after a mouse or touch interaction. The harness doesn't click, and it can't reproduce Safari or a real touch screen. So **what showed the link to Cass is unconfirmed**; the change is a spec-correct fix, not a verified one. WCAG 2.4.1 still holds: Tab reaches the link and shows it.

## Manual check (for Reece)

On a real Mac and a phone: open a case study from the home page, scroll, go back and forward, and see whether the skip link appears unasked. If it does, note the browser and the steps, and reopen this page.

## Testing gotcha

Headless `document.hasFocus()` is false, so script `.focus()` fires no `focus` event and doesn't match `:focus`. A probe that relies on it reads false even when the page is fine. Press a real Tab with `--pretab=N`, or emulate focus with `Emulation.setFocusEmulationEnabled`.
