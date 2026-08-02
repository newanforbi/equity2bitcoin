const usd0 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const usd2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

/** Whole dollars — the default for anything above a few hundred. */
export function formatUsd(value: number): string {
  return usd0.format(Number.isFinite(value) ? value : 0)
}

/** Dollars and cents — used for monthly payments, where precision reads as honesty. */
export function formatUsdPrecise(value: number): string {
  return usd2.format(Number.isFinite(value) ? value : 0)
}

/** Bitcoin quantities, to four places. Below 0.0001 we just say "under". */
export function formatBtc(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return '0 BTC'
  if (value < 0.0001) return 'under 0.0001 BTC'
  return `${value.toFixed(4)} BTC`
}

export function formatPercent(fraction: number): string {
  return `${Math.round(fraction * 100)}%`
}

/** Parses digits out of a currency-ish input, tolerating "$", commas, and spaces. */
export function parseCurrencyInput(raw: string): number {
  const digits = raw.replace(/[^0-9.]/g, '')
  const parsed = Number.parseFloat(digits)
  return Number.isFinite(parsed) ? parsed : 0
}
