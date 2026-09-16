---
summary: Research behind the hosting decision — six hosts compared, pricing at our traffic, bot/cost-spike risk, security and GitHub Actions support (prices checked 2026-09-16).
updated: 2026-09-16
related: [cloudflare-workers.md, monitoring-options.md]
decisions: [D-009, Q-002, Q-009]
---

# Hosting options

The research behind [D-009](../decisions.md) (Cloudflare Workers). The reasoning for the decision itself lives in the decision entry, not here. This page keeps the data, so the choice can be revisited without redoing the research.

> **Prices and plan limits were checked on 2026-09-16** from the sources at the bottom. They change often, so check again before relying on them. Items marked *(unverified)* come from memory and weren't checked that day.

## Assumptions

- **Human traffic:** 100–200 visits a month, about 3 pages a visit. The first page makes about 15–20 requests (HTML, CSS, fonts, images). Later pages make about 5–10, because the CSS and fonts are cached. That's roughly **5–6k requests and 0.3–1 GB a month**, if case-study images are optimised to 1–3 MB a page.
- **Bot traffic will be larger than human traffic.** It includes search and AI crawlers, and scanners probing for `/wp-login.php` and `/.env`. Your own uptime check counts too: **a check every minute is about 43k requests a month.** A realistic total is **20k–150k requests a month, a few GB at most**.
- **Contact form:** 0–10 real submissions and dozens to hundreds of spam attempts a month.

## Candidates at a glance

| Host | Cost here | Main drawback |
|---|---|---|
| **Cloudflare Workers** (chosen) | $0, hard cap | CI logs in with a long-lived API token |
| **S3 + CloudFront** | ~$0.00–0.10 | Needs a Paid-plan AWS account and 1–2 days of setup; you build previews, rollback and URL rewriting yourself |
| **Cloudflare Pages** | $0 | Still supported, but Cloudflare recommends Workers for new projects and new features land there |
| **AWS Amplify** | Pennies, pay-as-you-go *(pricing unverified)* | No spending cap; hides the AWS services underneath; building in GitHub Actions means using manual zip deploys, which lose git-based previews |
| **Netlify** | $0 within 300 credits a month | Each production deploy costs 15 credits and bandwidth costs 20 credits per GB; **the site is paused** when credits run out. Forms are free and unlimited. |
| **Vercel Hobby** | $0 | Non-commercial use only ("being paid to build or host the site" counts as commercial). Portfolios are allowed, but a freelancer's portfolio is a grey area. No team members on Hobby. |
| **GitHub Pages** | $0 | No custom headers (no CSP or cache headers), no previews, no server code; the repo must be public on a free account |

## Cloudflare Workers vs S3 + CloudFront

| | Cloudflare Workers | S3 + CloudFront (flat-rate Free plan) |
|---|---|---|
| Account | Free plan | **Paid-plan AWS account.** Flat-rate plans aren't available to accounts on AWS Free Tier. |
| Spending cap | Hard $0. The free plan returns errors instead of billing. | CloudFront is capped. Lambda, SES, S3 and CloudWatch are billed per use with no cap. |
| Setup | ~1–2 hours | ~1–2 days including infrastructure as code |
| Domain and TLS | Built in (DNS is already on Cloudflare) | ACM certificate in `us-east-1`, validated by a CNAME in Cloudflare; the DNS record must be DNS only (grey cloud). Deleting the validation CNAME stops the certificate from auto-renewing. |
| Folder URLs, 404s, caching | Handled by the platform | You build them: a CloudFront Function to rewrite `/about/` to `/about/index.html`; mapping S3's 403 to `/404.html` with a 404 status; cache headers per path |
| Deploys and rollback | Atomic; `wrangler rollback` | Uploads aren't atomic (upload hashed assets before HTML); roll back by redeploying |
| PR previews | `wrangler versions upload --preview-alias` | You build them. Staging distributions aren't supported on flat-rate plans, and there are at most 3 Free plans per account. |
| GitHub Actions login | Long-lived API token | OIDC role, which can be restricted to `main` |
| Free bot and WAF controls | 5 custom rules, 1 rate-limiting rule, AI crawler blocking by category, Bot Fight Mode | 5 WAF rules, IP rate limiting, geo blocking. Header filtering and CAPTCHA are Pro ($15 a month); Bot Control is Business. |
| Logs | Workers Logs free (3 days); export is $5 a month | CloudFront access logs to CloudWatch included |
| If one account is compromised | DNS, hosting and email are all in one account | Split across two providers |

### Estimated monthly cost at our traffic

**Cloudflare Workers:** $0.
- Static requests and storage are free and unlimited.
- The form Worker is far below 100k requests a day.
- Email to a verified address is free.
- Turnstile, Workers Logs and Web Analytics are free.
- Only log and trace export costs anything: $5 a month.

**S3 + CloudFront:** about $0.00–0.10.
- CloudFront, WAF, TLS and log ingestion are $0 on the Free plan; we'd use under 1% of the allowance.
- S3 storage is covered by the 5 GB credit.
- S3 requests are about $0.01–0.05 *(unverified request prices)*.
- Lambda is always free up to 1M requests a month.
- SES Essentials costs $0.16 per 1,000 emails.
- Costs that are easy to add by accident *(unverified)*: Secrets Manager at $0.40 a secret a month (use SSM Parameter Store standard parameters instead); a customer-managed KMS key at $1 a month.

## Can bots cause a price spike or security problems?

**Cloudflare: no bill is possible on the free plan.**
- Static requests are unlimited.
- The form Worker stops at 100k requests a day, so the worst case is the form being down until 00:00 UTC.
- Upgrading to Workers Paid makes usage metered and removes that cap.

**AWS: essentially no bill.**
- CloudFront never charges overage.
- Requests blocked by WAF or DDoS protection don't count toward the allowance, and the first spike up to 3× the allowance is ignored.
- Heavy, sustained over-use makes delivery slower, not more expensive. 1M requests is only about 23 a minute averaged over the month.
- S3 doesn't bill for 403 responses to requests from outside your account (since 2024), so keep the bucket private with OAC and never use the public website endpoint.
- Lambda has no cap, but 1M junk requests cost about $0.40 before the free tier. The real risk is a public function URL that bypasses WAF.
- AWS can't set a hard spending cap, only Budget alerts.
- The expensive AWS failure is leaked credentials, not bots.

**Security risks for either host, most important first:**
1. **Account takeover** (host, GitHub, registrar): use passkeys or MFA everywhere and turn on registrar lock.
2. **CI credentials:** keep scopes narrow, use a protected GitHub environment for production, and never use `pull_request_target` with secrets.
3. **Contact form abuse:** see Q-002.
4. **Dangling DNS:** an AWS CNAME left behind after teardown can be claimed by someone else. Workers custom domains are removed along with the Worker.
5. **Leaked content:** unreleased or NDA work through public preview URLs, draft content, or source maps.
6. **Scraping and AI training:** Cloudflare's Free plan can *enforce* AI crawler blocking. AWS's Free plan can't filter on headers, so you'd need a CloudFront Function workaround. Block training crawlers but allow search crawlers.

## GitHub Actions support

| Host | Tooling | Login | Previews from CI | Rollback |
|---|---|---|---|---|
| Cloudflare Workers | `cloudflare/wrangler-action@v3` | API token + account ID | ✅ preview aliases | ✅ instant |
| S3 + CloudFront | `aws-actions/configure-aws-credentials` | ✅ OIDC | ❌ build your own | Redeploy |
| Netlify | Netlify CLI `deploy --dir` | Token + site ID | ✅ `--alias` | ✅ |
| Amplify | Manual zip-deploy API | OIDC | ⚠️ loses git previews | Limited |
| GitHub Pages | `withastro/action` + `actions/deploy-pages` | ✅ `GITHUB_TOKEN` | ❌ | ❌ |

Cloudflare-specific CI gotchas are on [cloudflare-workers.md](cloudflare-workers.md#ci-with-github-actions).

## Sources

- [CloudFront flat-rate plans](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html): features by tier, quotas, account eligibility, unsupported features
- [CloudFront pricing](https://aws.amazon.com/cloudfront/pricing/) · [AWS Free Tier](https://aws.amazon.com/free/) · [Lambda pricing](https://aws.amazon.com/lambda/pricing/) · [SES pricing](https://aws.amazon.com/ses/pricing/)
- [S3 no charge for 403 errors](https://aws.amazon.com/about-aws/whats-new/2024/08/amazon-s3-no-charges-several-http-error-codes)
- [Workers static assets billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) · [Migrate from Pages to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)
- [Netlify pricing](https://www.netlify.com/pricing/) · [Netlify credit-based plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)
- [Vercel Hobby plan](https://vercel.com/docs/plans/hobby)
- [Amplify manual deploys](https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html)
