// Reason for client JS (invariant 3), D-038: "Email me" and the landing
// page's email pills copy the address to the clipboard, which has no
// HTML-only equivalent. Without JS, or if copying fails, each link opens
// its mailto: as normal.
//
// The tick is the landing page's (272:2302), used everywhere (D-048). How
// long it shows is undesigned (Reece approved 3 seconds).
const COPIED_MS = 3000;
// One live region per page. SiteNav renders it, and every page has the nav.
const liveRegion = document.querySelector<HTMLElement>('[data-copy-status]');

for (const link of document.querySelectorAll<HTMLAnchorElement>(
  '[data-copy-email]',
)) {
  let timer = 0;
  link.addEventListener('click', async (event) => {
    // Leave modified clicks (new tab, new window) to the browser.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    event.preventDefault();
    try {
      // Read at click time: navigator.clipboard is missing outside
      // secure contexts, and the TypeError lands in the catch.
      await navigator.clipboard.writeText(link.dataset.copyEmail ?? '');
    } catch {
      location.href = link.href;
      return;
    }
    link.toggleAttribute('data-copied', true);
    if (liveRegion) {
      // Clear first, so a second copy is announced again.
      liveRegion.textContent = '';
      requestAnimationFrame(() => {
        liveRegion.textContent = 'Email address copied';
      });
    }
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      link.removeAttribute('data-copied');
      if (liveRegion) liveRegion.textContent = '';
    }, COPIED_MS);
  });
}

// A module, not a global script, so its names can't clash with the DOM's
// globals.
export {};
