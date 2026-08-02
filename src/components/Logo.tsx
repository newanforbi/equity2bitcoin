/**
 * The Equity2Bitcoin mark: a house outline with a Bitcoin coin inside it.
 *
 * Redrawn as vector from the supplied raster logo, recoloured for this site's palette.
 * The source artwork was navy (#0A2A4A) with Bitcoin-brand orange (#F7931A) on white —
 * neither of which survives on a near-black ground, and the orange sits close enough to
 * our gold to read as an error rather than a second accent. So: the house outline takes
 * `currentColor` (so it inherits whatever it sits on) and the coin takes the site gold.
 *
 * The source raster also had an unclosed right wall with a detached vertical stub beside
 * it — a generation artifact. The redraw closes the house symmetrically.
 */

interface LogoMarkProps {
  /** Rendered width and height in px. */
  size?: number
  /** Coin fill. Defaults to the site gold. */
  coin?: string
  className?: string
}

export function LogoMark({ size = 32, coin = '#c9a227', className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Equity2Bitcoin"
    >
      {/* House: roof with overhanging eaves, two walls, floor. */}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 30 L32 6 L60 30" />
        <path d="M11.5 28.5 V56" />
        <path d="M52.5 28.5 V56" />
        <path d="M11.5 56 H52.5" />
      </g>

      {/* The coin sits within the walls with clearance on all sides. */}
      <circle cx="32" cy="39.5" r="13.5" fill={coin} />

      {/* Bitcoin glyph, stroked rather than filled so the counters stay open at
          small sizes. Knocked out in the darkest ink so it reads on gold. */}
      <g stroke="#08080a" strokeWidth="2.9" strokeLinecap="round" fill="none">
        <path d="M29 32.8 V46.2" />
        <path d="M33.2 30.6 V33" />
        <path d="M33.2 46 V48.4" />
        <path d="M36.6 30.6 V33" />
        <path d="M36.6 46 V48.4" />
        <path d="M29 32.8 H34.6 a3.3 3.3 0 0 1 0 6.6 H29" />
        <path d="M29 39.4 H35.6 a3.4 3.4 0 0 1 0 6.8 H29" />
      </g>
    </svg>
  )
}

interface LogoLockupProps {
  /** Mark size in px; the wordmark scales alongside it. */
  size?: number
  className?: string
}

/**
 * Mark plus wordmark. The wordmark is live HTML text rather than vector outlines so it
 * uses the site's actual display face and stays selectable and accessible.
 */
export function LogoLockup({ size = 30, className }: LogoLockupProps) {
  return (
    <span className={`logo-lockup ${className ?? ''}`}>
      <LogoMark size={size} />
      <span className="logo-lockup__word" style={{ fontSize: size * 0.58 }}>
        Equity<span className="logo-lockup__two">2</span>Bitcoin
      </span>
    </span>
  )
}
