import { FAQ, FAQ_GROUPS } from '../content/faq'
import './FaqAccordion.css'

export function FaqAccordion() {
  return (
    <div className="faq">
      {FAQ_GROUPS.map((group) => {
        const items = FAQ.filter((f) => f.group === group)
        return (
          <section key={group} className="faq__group">
            <h2 className="faq__group-title">{group}</h2>
            {items.map((item) => (
              <details key={item.question} className="faq__item">
                <summary className="faq__question">{item.question}</summary>
                <div className="faq__answer">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </section>
        )
      })}
    </div>
  )
}
