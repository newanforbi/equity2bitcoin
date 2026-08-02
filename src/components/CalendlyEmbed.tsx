import { useEffect, useRef } from 'react'
import { isCalendlyConfigured } from '../config/site'
import './CalendlyEmbed.css'

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js'

export interface CalendlyPrefill {
  name?: string
  email?: string
  /** Free-text answer mapped to Calendly custom question 1. See README. */
  summary?: string
}

interface Props {
  url: string
  prefill?: CalendlyPrefill
  /** Rendered above the widget — used for the education-only acknowledgment. */
  children?: React.ReactNode
}

/**
 * Appends Calendly's supported prefill parameters to the event URL.
 * Calendly reads `name`, `email`, and `a1`..`a10` for custom questions.
 */
function buildUrl(url: string, prefill?: CalendlyPrefill): string {
  const params = new URLSearchParams()
  params.set('hide_gdpr_banner', '1')
  params.set('background_color', '121216')
  params.set('text_color', 'f4f2ee')
  params.set('primary_color', 'c9a227')

  if (prefill?.name) params.set('name', prefill.name)
  if (prefill?.email) params.set('email', prefill.email)
  if (prefill?.summary) params.set('a1', prefill.summary)

  return `${url}?${params.toString()}`
}

export function CalendlyEmbed({ url, prefill, children }: Props) {
  const configured = isCalendlyConfigured(url)
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!configured) return

    // The widget script initializes any .calendly-inline-widget present at load time,
    // so on client-side navigation we have to kick initialization manually.
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_SCRIPT}"]`,
    )

    const init = () => {
      const calendly = (window as unknown as { Calendly?: { initInlineWidget: (o: unknown) => void } })
        .Calendly
      if (calendly && mountRef.current) {
        mountRef.current.innerHTML = ''
        calendly.initInlineWidget({
          url: buildUrl(url, prefill),
          parentElement: mountRef.current,
        })
      }
    }

    if (existing) {
      init()
      return
    }

    const script = document.createElement('script')
    script.src = WIDGET_SCRIPT
    script.async = true
    script.addEventListener('load', init)
    document.body.appendChild(script)
  }, [configured, url, prefill])

  if (!configured) {
    return (
      <div className="calendly">
        {children}
        <div className="notice notice--warn calendly__placeholder">
          <p>
            <strong>Booking is not yet configured.</strong> This site is wired for
            Calendly but still points at a placeholder link.
          </p>
          <p>
            To activate: create the event types in Calendly, then replace the
            <code> PLACEHOLDER </code> URLs in <code>src/config/site.ts</code>. Full
            steps are in the project README under “Configuring Calendly.”
          </p>
          <p className="calendly__url">
            Currently pointing at: <code>{url}</code>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="calendly">
      {children}
      <div ref={mountRef} className="calendly__widget" data-testid="calendly-widget" />
      <noscript>
        <p className="tiny muted">
          Scheduling requires JavaScript. You can also reach us by email to arrange a
          call.
        </p>
      </noscript>
    </div>
  )
}
