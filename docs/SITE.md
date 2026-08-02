# Equity2Bitcoin commercial site

Marketing + conversion site for **Equity2Bitcoin Consulting LLC**.

UI from the Cursor commercial-site work in
[`interactive-litigation-portfolio@a23dadb`](https://github.com/newanforbi/interactive-litigation-portfolio/commit/a23dadbaf852ce9ebf535235713ea63b29c57fee).
Functional substance (LTV math, fit gate, booking acknowledgment, deeper FAQ/disclosures)
ported from `claude/home-equity-bitcoin-site-8njw49` without adopting that branch’s UI.

## Local

```bash
npm install
npm run dev
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local Vite server |
| `npm run build` | Typecheck + production build |
| `npm test` | Equity math unit tests |
| `npm run typecheck` | TypeScript only |

## Launch config

Copy `web/.env.example` to `web/.env` (or set Vercel env vars):

| Variable | Purpose |
|---|---|
| `VITE_CALENDLY_URL` | Calendly event URL — enables inline booking embed |
| `VITE_LEAD_WEBHOOK_URL` | Optional Zapier/Make/HubSpot webhook for quiz + form leads |

Tunables (fee rate, BTC reference price, calculator defaults) live in `web/src/config/site.ts`.

Without Calendly configured, `/book` shows a request form after the acknowledgment gate
(and posts to the webhook if set).

## Funnel

1. Hero wake-up → Equity IQ quiz **or** `/calculator`
2. `/fit` self-qualification + volatility honesty
3. Quiz/calc → `/book` acknowledgment gate → Calendly / form
4. Milestone Agreement offline/DocuSign

## Legal

See [`LEGAL-REVIEW.md`](./LEGAL-REVIEW.md) before pointing a live consumer domain at this site.
