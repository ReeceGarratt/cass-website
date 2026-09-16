// The site can be built under a sub-path (the GitHub Pages preview serves it
// from /cass-website/, D-019). Root-relative links go through these helpers
// so they work with or without a base.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a root-relative path (e.g. `/work`) with the configured base. */
export const withBase = (path: string) => `${base}${path}`;

/** Strips the configured base from a pathname, e.g. `Astro.url.pathname`. */
export const withoutBase = (pathname: string) =>
  base && pathname.startsWith(base)
    ? pathname.slice(base.length) || '/'
    : pathname;
