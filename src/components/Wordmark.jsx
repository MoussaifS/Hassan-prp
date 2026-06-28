import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function Wordmark({ size = 28, light = false }) {
  const { t } = useLanguage()
  const name = t(site.brand.name, site.brand.nameAr)

  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: `${size}px`,
        letterSpacing: '-0.04em',
        lineHeight: 1,
        color: light ? 'var(--white)' : 'var(--ink)',
      }}
    >
      {name}
      <span style={{ color: 'var(--signal)' }}>{site.brand.dot}</span>
    </span>
  )
}
