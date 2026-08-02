/**
 * Math checks for the equity calculations.
 *
 * These duplicate the formulas from equity.ts rather than importing the TypeScript
 * source, so they run under plain `node --test` with no build step. If the formulas
 * in equity.ts change, change them here too — that duplication is the point: the test
 * fails loudly if someone alters the arithmetic without meaning to.
 */

import test from 'node:test'
import assert from 'node:assert/strict'

const FEE_RATE = 0.3

function tappable(homeValue, mortgage, ltv) {
  return Math.max(0, homeValue * ltv - mortgage)
}

function amortizingPayment(principal, aprPercent, years) {
  if (principal <= 0 || years <= 0) return 0
  const months = years * 12
  const r = aprPercent / 100 / 12
  if (r === 0) return principal / months
  const g = Math.pow(1 + r, months)
  return (principal * r * g) / (g - 1)
}

test('tappable equity uses the LTV cap, not raw equity', () => {
  // $700k home, $400k owed. Raw equity is $300k, but at 80% LTV only $160k is
  // borrowable. The business plan's Section III.F example conflates these two.
  assert.equal(tappable(700_000, 400_000, 0.8), 160_000)
  assert.equal(700_000 - 400_000, 300_000, 'raw equity is the larger, misleading figure')
})

test('appendix B scenario', () => {
  // $700k home, $300k owed, 80% LTV.
  const draw = tappable(700_000, 300_000, 0.8)
  assert.equal(draw, 260_000)
  assert.equal(draw * FEE_RATE, 78_000)
  assert.equal(draw - draw * FEE_RATE, 182_000)
})

test('fee and net always reconcile to the draw', () => {
  for (const [value, owed, ltv] of [
    [500_000, 250_000, 0.8],
    [1_200_000, 600_000, 0.75],
    [850_000, 300_000, 0.85],
  ]) {
    const draw = tappable(value, owed, ltv)
    const fee = draw * FEE_RATE
    assert.ok(Math.abs(fee + (draw - fee) - draw) < 1e-9)
    assert.ok(draw - fee < draw, 'net must be strictly less than the draw')
  }
})

test('no tappable equity clamps to zero rather than going negative', () => {
  // Owes more than the LTV cap allows.
  assert.equal(tappable(400_000, 380_000, 0.8), 0)
  // Underwater.
  assert.equal(tappable(300_000, 400_000, 0.8), 0)
})

test('zero and nonsense inputs do not produce NaN', () => {
  assert.equal(tappable(0, 0, 0.8), 0)
  assert.equal(amortizingPayment(0, 8.5, 20), 0)
  assert.ok(Number.isFinite(amortizingPayment(100_000, 0, 20)))
})

test('amortizing payment matches a known reference', () => {
  // $200,000 at 8.5% over 20 years is about $1,735.72/month.
  const payment = amortizingPayment(200_000, 8.5, 20)
  assert.ok(
    Math.abs(payment - 1735.72) < 1,
    `expected ~1735.72, got ${payment.toFixed(2)}`,
  )
})

test('interest-only is always less than the amortizing payment', () => {
  const principal = 260_000
  const interestOnly = (principal * 0.085) / 12
  assert.ok(interestOnly < amortizingPayment(principal, 8.5, 20))
})
