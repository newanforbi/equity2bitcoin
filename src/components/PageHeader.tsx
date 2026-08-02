import './PageHeader.css'

interface Props {
  eyebrow?: string
  title: string
  lede?: string
}

export function PageHeader({ eyebrow, title, lede }: Props) {
  return (
    <header className="page-header">
      <div className="shell page-header__inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="page-header__title">{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
    </header>
  )
}
