import { PageHeader } from '../components/PageHeader'
import { FaqAccordion } from '../components/FaqAccordion'
import { CTA } from '../components/CTA'

export function Faq() {
  return (
    <>
      <PageHeader
        eyebrow="Questions"
        title="The questions worth asking"
        lede="Including the ones most consultants would rather you asked later. The fee section is the one to read first."
      />

      <section className="section--tight">
        <div className="shell">
          <FaqAccordion />
        </div>
      </section>

      <CTA
        heading="Something not answered here?"
        body="Bring it to the orientation call. There is no question about the fee, the risks, or our licensing status that we will dodge."
      />
    </>
  )
}
