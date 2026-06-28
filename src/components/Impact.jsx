import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import styles from './Impact.module.css'

const THEMES = ['light', 'signal', 'dark', 'light']

const IconMic = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="17" y="3" width="14" height="24" rx="7" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M10 24c0 7.18 6.27 13 14 13s14-5.82 14-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="24" y1="37" x2="24" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="16" y1="44" x2="32" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

const IconMegaphone = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M8 17H16L32 7V41L16 31H8V17Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M16 31L20 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M35 15C37.7 17.7 39.5 21.2 39.5 24S37.7 30.3 35 33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

const IconCamera = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <rect x="3" y="13" width="30" height="22" rx="3" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M33 19L45 13V35L33 29V19Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <circle cx="18" cy="24" r="5" stroke="currentColor" strokeWidth="2.5"/>
  </svg>
)

const IconCrowd = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="13" r="5" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M13 40C13 33.92 17.92 29 24 29S35 33.92 35 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="9" cy="18" r="4" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M3 38C3 33.58 5.69 30 9 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="39" cy="18" r="4" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M45 38C45 33.58 42.31 30 39 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

const ICONS = [<IconMic />, <IconMegaphone />, <IconCamera />, <IconCrowd />]

export default function Impact() {
  const { t } = useLanguage()
  const { eyebrow, eyebrowAr, title, titleAr, cards } = site.impact

  return (
    <section className={styles.section} id="impact">
      <div className={`container ${styles.header}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>{t(eyebrow, eyebrowAr)}</p>
        <h2 className={styles.title}>{t(title, titleAr)}</h2>
      </div>

      <div className={`container ${styles.grid}`}>
        {cards.map((card, i) => (
          <div key={card.number} className={`${styles.card} ${styles[THEMES[i]]}`}>
            <div className={styles.cardTop}>
              <span className={styles.number}>{card.number}</span>
              <span className={styles.roleLabel}>{t(card.role, card.roleAr)}</span>
            </div>
            <div className={styles.icon}>{ICONS[i]}</div>
            <h3 className={styles.headline}>{t(card.headline, card.headlineAr)}</h3>
            <p className={styles.body}>{t(card.body, card.bodyAr)}</p>
            <span className={styles.stat}>{t(card.stat, card.statAr)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
