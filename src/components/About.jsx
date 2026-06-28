import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import styles from './About.module.css'

export default function About() {
  const { t } = useLanguage()
  const { eyebrow, eyebrowAr, title, titleAr, body, bodyAr } = site.about

  return (
    <section className={styles.section} id="about">
      <div className="container">
        <p className="eyebrow">{t(eyebrow, eyebrowAr)}</p>
        <h2 className={styles.title}>{t(title, titleAr)}</h2>
        <p className={styles.body}>{t(body, bodyAr)}</p>
      </div>
    </section>
  )
}
