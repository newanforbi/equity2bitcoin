/**
 * All equity and fee arithmetic for the site.
 *
 * Every page that shows a number imports from here, so the calculator and the pricing
 * page can never drift apart. Pure functions only — no React, no formatting.
 */

import { BTC_REFERENCE, MILESTONE_FEE_RATE } from '../config/site'

export interface EquityInputs {
  /** Current market value of the home, USD. */
  homeValue: number
  /** Outstanding balance on all existing mortgages, USD. */
  mortgageBalance: number
  /** Maximum combined loan-to-value the lender will allow, as a fraction (0.8 = 80%). */
  maxLtv: number
  /** Estimated annual percentage rate on the new line, as a percent (8.5 = 8.5%). */
  aprPercent: number
  /** Term in years used for the amortizing-payment estimate. */
  amortizationYears: number
}

export interface EquityResult {
  /** Equity on paper: value minus what's owed. Not the same as what a lender will lend. */
  rawEquity: number
  /** What a lender would typically let you draw: (value x maxLtv) - mortgage. */
  tappableEquity: number
  /** The one-time milestone success fee, charged only at verified loan funding. */
  milestoneFee: number
  /** What actually reaches Bitcoin after the fee comes out. */
  netToBitcoin: number
  /** Illustrative BTC quantity at the reference price. Not a quote, not a forecast. */
  illustrativeBtc: number
  /** Interest-only monthly payment on the full draw. */
  monthlyInterestOnly: number
  /** Fully amortizing monthly payment on the full draw. */
  monthlyAmortizing: number
  /** Total interest paid over the full amortizing term. */
  totalInterestOverTerm: number
  /** The fee as a share of the draw — always MILESTONE_FEE_RATE, surfaced for clarity. */
  feeRate: number
  /** True when the inputs leave nothing to draw. Drives the empty state. */
  hasNoTappableEquity: boolean
}

/** Guards against NaN, Infinity, and negative money sneaking into the display. */
function clampMoney(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0
  return value
}

/**
 * Standard amortizing payment. Falls back to simple division when the rate is zero,
 * which the closed form can't handle.
 */
export function amortizingPayment(
  principal: number,
  aprPercent: number,
  years: number,
): number {
  if (principal <= 0 || years <= 0) return 0

  const months = years * 12
  const monthlyRate = aprPercent / 100 / 12

  if (monthlyRate === 0) return principal / months

  const growth = Math.pow(1 + monthlyRate, months)
  return (principal * monthlyRate * growth) / (growth - 1)
}

export function calculateEquity(inputs: EquityInputs): EquityResult {
  const homeValue = clampMoney(inputs.homeValue)
  const mortgageBalance = clampMoney(inputs.mortgageBalance)
  const maxLtv = Number.isFinite(inputs.maxLtv) ? inputs.maxLtv : 0
  const aprPercent = Number.isFinite(inputs.aprPercent) ? Math.max(0, inputs.aprPercent) : 0
  const years = Math.max(1, inputs.amortizationYears)

  const rawEquity = clampMoney(homeValue - mortgageBalance)

  // The number that actually matters: lenders cap total borrowing at a share of the
  // home's value, so existing mortgage debt eats into what's available.
  const tappableEquity = clampMoney(homeValue * maxLtv - mortgageBalance)

  const milestoneFee = tappableEquity * MILESTONE_FEE_RATE
  const netToBitcoin = tappableEquity - milestoneFee

  const monthlyInterestOnly = (tappableEquity * (aprPercent / 100)) / 12
  const monthlyAmortizing = amortizingPayment(tappableEquity, aprPercent, years)
  const totalInterestOverTerm = clampMoney(monthlyAmortizing * years * 12 - tappableEquity)

  return {
    rawEquity,
    tappableEquity,
    milestoneFee,
    netToBitcoin,
    illustrativeBtc: netToBitcoin / BTC_REFERENCE.priceUsd,
    monthlyInterestOnly,
    monthlyAmortizing,
    totalInterestOverTerm,
    feeRate: MILESTONE_FEE_RATE,
    hasNoTappableEquity: tappableEquity <= 0,
  }
}
