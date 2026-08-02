# Equity2Bitcoin.com

Marketing and lead-conversion site for Equity2Bitcoin Consulting LLC — an education-first
consultancy that guides homeowners considering repositioning dormant home equity into
Bitcoin.

Built to the specification in `Equity2Bitcoin_Business_Plan.pdf` §V.G, which defines five
jobs for the site: **Educate, Qualify, Convert, Comply, Retain**.

> **Not launch-ready.** Two things must happen first: legal review (see
> [`LEGAL-REVIEW.md`](./LEGAL-REVIEW.md)) and Calendly configuration (below).

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production bundle to dist/
npm run preview    # serve the built bundle
npm run typecheck  # tsc --noEmit
npm test           # math checks for the equity calculations
```

React 18 + Vite 6 + TypeScript + React Router 7. No backend, no database, no analytics.
Deploys as a static SPA; `vercel.json` provides the rewrite so client-side routes resolve.

---

## Configuring Calendly

Booking is the site's only conversion action. Until it is configured, `/book` shows an
explicit "not yet configured" notice rather than a broken widget — the site stays
demoable either way.

**1. Create two event types in Calendly:**

| Event | Duration | Purpose |
|---|---|---|
| Orientation Call | 20 min | Free first conversation. This is what the whole site points at. |
| Equity Profile Review | 60 min | Milestone 1 proper, booked after orientation. |

**2. Add a custom question to the Orientation Call.** Make it the *first* question —
prefill targets `a1` positionally:

> "Roughly what is your home worth, and what do you still owe?"

**3. Paste the URLs into `src/config/site.ts`:**

```ts
export const CALENDLY = {
  orientationUrl: 'https://calendly.com/your-handle/orientation-20min',
  equityReviewUrl: 'https://calendly.com/your-handle/equity-profile-review',
}
```

The placeholder check is a substring match on `PLACEHOLDER`, so any real URL activates the
widget. Nothing else needs changing.

**Prefill** is supported by `CalendlyEmbed` via `name`, `email`, and `summary` (which maps
to `a1`). Nothing currently passes prefill values — the calculator deliberately keeps user
figures in the browser and never transmits them. If you later want calculator figures
carried into the booking form, pass them through the `prefill` prop and update
`/legal/privacy` to say so, because that changes what leaves the user's device.

---

## Other things to set before launch

In `src/config/site.ts`:

- **`BTC_REFERENCE`** — a static illustrative Bitcoin price with an `asOf` date. Update
  the price and the date *together*. A stale price with an honest date is fine; an undated
  one is not. Remove the BTC line from the calculator entirely if you would rather not
  maintain it.
- **`SITE.email`** — currently `hello@equity2bitcoin.com`. Make sure it is monitored.
- **`MILESTONE_FEE_RATE`** — 0.3. Changing this updates the calculator, the pricing table,
  and the worked example simultaneously.

---

## How it's organised

```
src/
  config/site.ts       every tunable: booking URLs, fee rate, BTC reference, contact
  lib/equity.ts        ALL fee and equity math, pure functions
  lib/equity.test.mjs  math checks (node --test, no build step)
  content/             copy as typed data — edit here, not in JSX
  components/          layout, calculator, milestone stepper, FAQ, Calendly embed
  pages/               one file per route
  styles/              design tokens + global CSS
```

**Every number on the site comes from `lib/equity.ts`.** The pricing page's worked example
runs through the same `calculateEquity()` the calculator uses, so the two cannot drift
apart. If you change the arithmetic, change `equity.test.mjs` too — the duplication there
is deliberate, so an accidental change fails loudly.

**Copy lives in `src/content/`** as typed objects. Non-developers can edit milestone
descriptions, FAQ answers, and qualification criteria without touching components.

---

## Two decisions worth understanding before you edit

### The calculator shows the fee coming out

Most equity calculators stop at the borrowable number. This one subtracts the 30%
milestone fee, shows what actually reaches Bitcoin, and shows the monthly cost of carrying
the loan. That is intentional and it is the site's main differentiator — the alternative
is that clients discover the arithmetic on a sales call, which is both worse for them and
worse for the business. See `LEGAL-REVIEW.md` §1.3.

### No price forecasts anywhere

The business plan contains Bitcoin price projections and treasury growth models (p.2).
None of it is published here. Forecasting an asset price to a retail audience considering
borrowing against their home is the riskiest thing this site could do, and it would
undercut the education-first positioning the rest of the plan works to establish.
`/why-bitcoin` publishes the historical cycle record — including the 77–85% drawdowns —
and nothing forward-looking. Keep it that way.

The full list of excluded content, and two math errors in the source document that this
build deliberately corrects, are documented in `LEGAL-REVIEW.md` §3 and §4.

---

## Not built yet

Deliberately out of scope for this first version:

- Email capture / "Equity Advantage Blueprint" lead magnet delivery (needs a backend)
- Blog and SEO article system (§V.E)
- Newsletter and alumni network (§V.D Stage 4)
- Equity2Bitcoin Academy registration (§III.D)
- CRM / Zapier / Airtable wiring (§IV.F)

Adding any of these means user data starts leaving the browser. Update `/legal/privacy`
and re-check `LEGAL-REVIEW.md` when that happens.
