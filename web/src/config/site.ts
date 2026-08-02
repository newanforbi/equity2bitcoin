/** Tunables a non-developer may need to change before/after launch. */

export const SITE = {
  name: "Equity2Bitcoin",
  legalEntity: "Equity2Bitcoin Consulting LLC",
  domain: "equity2bitcoin.com",
  email: "hello@equity2bitcoin.com",
  jurisdiction: "California, USA",
} as const;

/** Milestone success fee — charged once at verified loan funding (Phase 3). */
export const MILESTONE_FEE_RATE = 0.3;

/**
 * Static illustrative BTC price used to convert "reaches Bitcoin" into a BTC quantity.
 * Update price and asOf together, or remove the BTC line entirely.
 */
export const BTC_REFERENCE = {
  priceUsd: 35_000,
  asOf: "November 2026",
} as const;

/**
 * Optional later-date USD scenario applied to the same BTC quantity.
 * Illustrative arithmetic only — not a forecast or promise of future value.
 */
export const BTC_FUTURE_SCENARIO = {
  priceUsd: 450_000,
  asOf: "November 2029",
} as const;

export const CALCULATOR_DEFAULTS = {
  homeValue: 700_000,
  mortgageBalance: 400_000,
  maxLtv: 0.8,
  ltvMin: 0.75,
  ltvMax: 0.85,
  aprPercent: 8.5,
  amortizationYears: 20,
} as const;
