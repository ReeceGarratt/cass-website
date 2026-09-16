---
summary: Observability research for the later monitoring pass — what a static site needs to watch, Sentry/Grafana/Datadog free tiers, Workers observability limits, and the client-JS cost (checked 2026-09-16).
updated: 2026-09-16
related: [cloudflare-workers.md, hosting-options.md]
decisions: [D-009, D-010, Q-008, Q-002, Q-006]
---

# Monitoring and observability options

Observability is **deferred to a later pass** ([D-010](../decisions.md)). The tool choice is open as Q-008. This page keeps the research so that pass can start from it. **Prices and limits were checked on 2026-09-16.** Check them again before implementing.

## What a static portfolio needs to watch

| Question | Where the data comes from | Depends on host? |
|---|---|---|
| Is the site up? | Checks from outside (uptime, synthetic tests) | No |
| Is it fast for real visitors? | A script in the browser (real-user monitoring, Core Web Vitals) | No |
| Did the contact form fail? | An SDK inside the form handler (Q-002) | Barely |
| What is the edge or server doing? | Logs and traces exported by the platform | Yes (see below) |

The contact form is the most important thing to watch, since a silent failure there loses Cass enquiries. A mostly static site has little client JS, so browser error tracking has little to catch.

Automated accessibility (axe) and Lighthouse checks in CI (Q-006) prevent regressions before release, which covers some of what monitoring would otherwise catch after it.

## Tools

**Sentry** ([pricing](https://sentry.io/pricing/)): the best fit for form errors.
- Free Developer plan: 5k errors and 5M spans a month, 50 session replays, 1 uptime monitor, 1 cron monitor, **1 user**, 30-day retention. Team plan is $26 a month.
- Sentry's Astro SDK (`@sentry/astro`) on its own only supports Node server runtimes. On Cloudflare, use `@sentry/astro` for the browser plus `@sentry/cloudflare` for the Worker.
- The Cloudflare setup needs the `nodejs_compat` flag, a `compatibility_date` of 2024-09-23 or later, Astro 6+, `@astrojs/cloudflare` v13+ and Sentry SDKs v10.40+ ([guide](https://docs.sentry.io/platforms/javascript/guides/cloudflare/frameworks/astro/)).
- The Sentry SDK inside the Worker works on the free Workers plan, because it sends data straight from our code without the paid export feature.

**Grafana Cloud** ([pricing](https://grafana.com/pricing/)): the best one to learn.
- Free plan, no card needed:
  - Metrics: 10k series.
  - Logs, traces and profiles: 50 GB each, kept 14 days.
  - Users: 3.
  - Real-user monitoring (Faro): 50k sessions a month.
  - Synthetic checks: 100k API runs and 10k browser runs a month.
  - k6 load testing: 500 virtual-user hours.
- It covers uptime, real-user monitoring and dashboards in one place. The concepts (Prometheus, Loki, Tempo, OpenTelemetry) carry over to backend work.
- It's more to set up and maintain than Sentry.

**Datadog: ruled out.**
- The free tier covers infrastructure only: 5 hosts, 1-day retention, and no APM, logs, real-user monitoring or synthetic checks.
- A serverless static site has no hosts to monitor, so every useful feature is paid (real-user monitoring about $0.15 per 1k sessions; API tests about $5 per 10k runs; third-party figures).
- If you want Datadog experience, a trial teaches more.

**Cloudflare built-in:**
- Web Analytics: free, cookieless, and includes Core Web Vitals.
- Workers Logs: free, 200k events a day, kept 3 days.
- Automatically exporting Worker logs and traces to Sentry, Grafana or Honeycomb (OpenTelemetry) **needs Workers Paid ($5 a month)**. It's in beta, with billing from 2026-10-01 (10M events a month included, then $0.05 per million).
- Exporting raw CDN request logs (Logpush) is *(unverified)* Enterprise-only.

## Client JS cost

Browser SDKs (Sentry browser, Faro) add JS to every page, which conflicts with the no-client-JS priority (architecture invariant 3). Options:
- Use Cloudflare Web Analytics for Core Web Vitals instead.
- Or load the SDK after the page is idle, and include it in the Lighthouse budget (Q-006) so its cost stays visible.

## Suggested phasing for the later pass

1. Uptime checks on the home page and the form endpoint, using Grafana synthetic checks or Sentry's one uptime monitor. **A check every minute adds about 43k requests a month**, so choose the interval deliberately.
2. Sentry in the form handler, with alerts by email.
3. Optional: Grafana dashboards and real-user monitoring, and Workers Paid for OpenTelemetry export if the logs are worth $5 a month.

## Sources

- [Sentry pricing](https://sentry.io/pricing/) · [Sentry Astro SDK](https://docs.sentry.io/platforms/javascript/guides/astro/) · [Sentry: Astro on Cloudflare](https://docs.sentry.io/platforms/javascript/guides/cloudflare/frameworks/astro/)
- [Grafana Cloud pricing](https://grafana.com/pricing/) · [Grafana Faro Web SDK](https://github.com/grafana/faro-web-sdk)
- [Datadog free tier (Telemtra, third-party)](https://telemtra.io/blog/datadog-pricing-explained-2026/)
- [Workers observability](https://developers.cloudflare.com/workers/observability/) · [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/) · [OpenTelemetry export](https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/)
- [CloudWatch RUM pricing (RUMCost, third-party)](https://rumcost.com/aws-cloudwatch-rum-pricing): for comparison if the AWS route is ever revisited
