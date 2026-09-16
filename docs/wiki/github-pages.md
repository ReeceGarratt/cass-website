---
summary: The interim GitHub Pages preview — one-off repo settings, how the workflow and base path work, gotchas, and how to remove it.
updated: 2026-09-17
related: [cloudflare-workers.md, hosting-options.md]
decisions: [D-019, D-009, Q-009]
---

# GitHub Pages preview

An interim, shareable preview of the site ([D-019](../decisions.md)). Production hosting is still Cloudflare Workers ([D-009](../decisions.md)), and the real pipeline is open as Q-009.

- **URL:** `https://reecegarratt.github.io/cass-website/`
- **Workflow:** `.github/workflows/deploy-pages.yml`
- **Triggers:** push to `main`, or **Actions → Deploy preview to GitHub Pages → Run workflow** on any branch.

**Status (2026-09-17):** the workflow is committed, but hasn't run on GitHub yet. Update this page once it has.

## One-off repo settings

These are set by hand in the GitHub UI, not by the workflow:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.** Without it, `configure-pages` fails.
2. **Settings → Environments → `github-pages` → Deployment branches:** add `reece/feature/mvp` (or any branch you want to run by hand). By default only the default branch can deploy, so a manual run on another branch fails at the deploy job. The environment appears after Pages is first enabled.

## How it works

1. `actions/configure-pages` reads the site's origin and base path from the Pages API (the build job needs `pages: read`).
2. `npm run build -- --site "$SITE_URL" --base "$BASE_PATH"` builds with the base. Nothing is set in `astro.config.mjs`, so local builds stay at `/`. Reading `process.env` in the config would fail `astro check`, because the project has no `@types/node`.
3. `actions/upload-pages-artifact` uploads `dist/`, and `actions/deploy-pages` publishes it in a separate job with `pages: write` and `id-token: write`.

Action versions were checked on 2026-09-17: `checkout@v7`, `setup-node@v7`, `configure-pages@v6`, `upload-pages-artifact@v5`, `deploy-pages@v5`.

## Base path gotchas

- **Astro rewrites its own URLs, not yours.** With a base set, Astro prefixes CSS, font and `_astro/` URLs itself (verified: the `@font-face` URLs and preloads get `/cass-website/`). Hand-written `href="/…"` links don't, so use `withBase('/work')` from `src/utils/base-path.ts`. The same applies to files in `public/` once it exists.
- **`Astro.url.pathname` includes the base.** Use `withoutBase()` before comparing paths. `SiteNav` does this for `aria-current`.
- **In-page anchors** (`#main`) don't need the base.
- **Git Bash on Windows mangles `--base /cass-website`** into `C:/Program Files/Git/cass-website`. To test a base build locally, run `MSYS_NO_PATHCONV=1 npm run build -- --site https://reecegarratt.github.io --base /cass-website`. CI runs on Linux, so it isn't affected.
- **Custom domain:** `base_path` becomes empty, and the workflow falls back to `/`.

## Limits compared with Cloudflare

These are from [hosting-options.md](hosting-options.md): no custom headers, no pull request previews, and the repo must stay public on a free account.

## Removing it

When the Cloudflare pipeline runs (Q-009):

1. Delete the workflow.
2. Turn off Pages in the repo settings.
3. Decide whether to keep `withBase`. It costs nothing at the root, but it's only needed for sub-path hosting.
4. Mark D-019 as superseded.
