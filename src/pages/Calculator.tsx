import { EquityCalculator } from '../components/calculator/EquityCalculator'
import { PageHeader } from '../components/PageHeader'

export function Calculator() {
  return (
    <>
      <PageHeader
        eyebrow="Milestone 1, in miniature"
        title="What could you actually draw — and what would reach Bitcoin?"
        lede="Most equity calculators stop at the borrowable number. This one keeps going: it subtracts our fee, shows what is left, and shows what the loan costs you every month. Adjust anything; the numbers update as you type."
      />

      <section className="section--tight">
        <div className="shell">
          <EquityCalculator />
        </div>
      </section>
    </>
  )
}
