/**
 * Shared equity and fee arithmetic.
 * Pure functions only — every page that shows a dollar figure should import from here.
 */

import {
  BTC_FUTURE_SCENARIO,
  BTC_REFERENCE,
  INTEREST_ONLY_RESERVE,
  MILESTONE_FEE_RATE,
} from "../config/site";

export interface EquityInputs {
  homeValue: number;
  mortgageBalance: number;
  /** Combined loan-to-value cap as a fraction (0.8 = 80%). */
  maxLtv: number;
  aprPercent: number;
  amortizationYears: number;
}

export interface EquityResult {
  /** Value minus mortgage — paper equity, not what a lender will advance. */
  rawEquity: number;
  /** (value × maxLtv) − mortgage — what is typically borrowable. */
  tappableEquity: number;
  milestoneFee: number;
  /** monthlyInterestOnly × INTEREST_ONLY_RESERVE.months — set aside from the draw. */
  interestOnlyReserve: number;
  interestOnlyMonths: number;
  /** Draw − fee − IO reserve — capital treated as deployable to Bitcoin. */
  netToBitcoin: number;
  illustrativeBtc: number;
  /** Same BTC quantity valued at BTC_FUTURE_SCENARIO — not a forecast. */
  illustrativeFutureValueUsd: number;
  monthlyInterestOnly: number;
  monthlyAmortizing: number;
  totalInterestOverTerm: number;
  feeRate: number;
  hasNoTappableEquity: boolean;
}

function clampMoney(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

export function amortizingPayment(principal: number, aprPercent: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;

  const months = years * 12;
  const monthlyRate = aprPercent / 100 / 12;

  if (monthlyRate === 0) return principal / months;

  const growth = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * growth) / (growth - 1);
}

export function calculateEquity(inputs: EquityInputs): EquityResult {
  const homeValue = clampMoney(inputs.homeValue);
  const mortgageBalance = clampMoney(inputs.mortgageBalance);
  const maxLtv = Number.isFinite(inputs.maxLtv) ? inputs.maxLtv : 0;
  const aprPercent = Number.isFinite(inputs.aprPercent) ? Math.max(0, inputs.aprPercent) : 0;
  const years = Math.max(1, inputs.amortizationYears);
  const interestOnlyMonths = INTEREST_ONLY_RESERVE.months;

  const rawEquity = clampMoney(homeValue - mortgageBalance);
  const tappableEquity = clampMoney(homeValue * maxLtv - mortgageBalance);
  const milestoneFee = tappableEquity * MILESTONE_FEE_RATE;
  const monthlyInterestOnly = (tappableEquity * (aprPercent / 100)) / 12;
  const interestOnlyReserve = monthlyInterestOnly * interestOnlyMonths;
  // Safer deployable capital: fee + multi-year IO carry come out of the draw first.
  const netToBitcoin = clampMoney(tappableEquity - milestoneFee - interestOnlyReserve);
  const monthlyAmortizing = amortizingPayment(tappableEquity, aprPercent, years);
  const totalInterestOverTerm = clampMoney(monthlyAmortizing * years * 12 - tappableEquity);

  const illustrativeBtc = netToBitcoin / BTC_REFERENCE.priceUsd;

  return {
    rawEquity,
    tappableEquity,
    milestoneFee,
    interestOnlyReserve,
    interestOnlyMonths,
    netToBitcoin,
    illustrativeBtc,
    illustrativeFutureValueUsd: illustrativeBtc * BTC_FUTURE_SCENARIO.priceUsd,
    monthlyInterestOnly,
    monthlyAmortizing,
    totalInterestOverTerm,
    feeRate: MILESTONE_FEE_RATE,
    hasNoTappableEquity: tappableEquity <= 0,
  };
}
