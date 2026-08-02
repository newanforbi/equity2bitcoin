import { MILESTONES } from '../content/milestones'
import './MilestoneStepper.css'

export function MilestoneStepper() {
  return (
    <ol className="stepper">
      {MILESTONES.map((m) => (
        <li key={m.number} className={`stepper__item ${m.fee ? 'is-fee' : ''}`}>
          <div className="stepper__marker" aria-hidden="true">
            {m.number}
          </div>

          <div className="stepper__body">
            <div className="stepper__head">
              <h3 className="stepper__title">{m.title}</h3>
              {m.fee ? (
                <span className="pill pill--fee">{m.fee}</span>
              ) : (
                <span className="pill pill--free">No fee</span>
              )}
            </div>

            <p className="stepper__objective">{m.objective}</p>

            <ul className="stepper__activities">
              {m.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>

            <dl className="stepper__meta">
              <div>
                <dt>You receive</dt>
                <dd>{m.deliverable}</dd>
              </div>
              <div>
                <dt>Milestone complete when</dt>
                <dd>{m.trigger}</dd>
              </div>
            </dl>
          </div>
        </li>
      ))}
    </ol>
  )
}
