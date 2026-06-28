import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { Check } from './Icon.jsx'
import styles from './Highlights.module.css'

export default function Highlights() {
  const { t } = useLanguage()

  return (
    <ul className={styles.card}>
      {site.highlights.map((h, i) => (
        <li key={i} className={styles.row}>
          <span className={styles.check} aria-hidden="true">
            <Check />
          </span>
          <span className={styles.text}>{t(h.en, h.ar)}</span>
        </li>
      ))}
    </ul>
  )
}
