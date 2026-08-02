/**
 * Single source of truth for every tunable the site exposes publicly.
 *
 * Anything a non-developer might need to change before or after launch lives here:
 * booking links, the illustrative Bitcoin price, the milestone fee rate, contact details.
 */

export const SITE = {
  name: 'Equity2Bitcoin',
  legalEntity: 'Equity2Bitcoin Consulting LLC',
  domain: 'equity2bitcoin.com',
  email: 'hello@equity2bitcoin.com',
  jurisdiction: 'California, USA',
} as const

/**
 * Booking links.
 *
 * Replace the two PLACEHOLDER URLs with real Calendly event links before launch.
 * While a URL still contains "PLACEHOLDER", the booking page renders an explicit
 * "not yet configured" notice instead of a broken widget — see CalendlyEmbed.tsx.
 *
 * Setup steps are documented in README.md under "Configuring Calendly".
 */
export const CALENDLY = {
  /** Free 20-minute orientation call. Primary conversion action across the site. */
  orientationUrl: 'https://calendly.com/PLACEHOLDER/orientation-20min',
  /** 60-minute Equity Profile Review (Milestone 1). */
  equityReviewUrl: 'https://calendly.com/PLACEHOLDER/equity-profile-review',
} as const

export function isCalendlyConfigured(url: string): boolean {
  return !url.includes('PLACEHOLDER')
}

/**
 * The milestone success fee, charged once, at Milestone 3 (verified loan funding).
 * All other milestones are $0. See the business plan, Section III.C.
 */
export const MILESTONE_FEE_RATE = 0.3

/**
 * Illustrative Bitcoin price used by the calculator to show roughly how much BTC a
 * given net amount buys. This is a static reference point, NOT a live quote and NOT
 * a forecast. Update the value and the date together, or don't update it at all —
 * a stale price with an honest date is far better than an undated one.
 */
export const BTC_REFERENCE = {
  priceUsd: 95_000,
  asOf: 'January 2026',
} as const

/** Calculator input defaults. Every one of these stays user-adjustable. */
export const CALCULATOR_DEFAULTS = {
  homeValue: 700_000,
  mortgageBalance: 400_000,
  /** Lenders typically cap combined loan-to-value around 80%. */
  maxLtv: 0.8,
  ltvMin: 0.75,
  ltvMax: 0.85,
  /** Representative HELOC APR. Users are told to confirm with their own lender. */
  aprPercent: 8.5,
  /** Term used for the amortizing-payment estimate. */
  amortizationYears: 20,
} as const
