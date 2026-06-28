import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Nav from './Nav.jsx'
import Highlights from './Highlights.jsx'
import ArrowButton from './ArrowButton.jsx'
import styles from './Hero.module.css'

export default function Hero() {
  const { t } = useLanguage()
  const { eyebrow, eyebrowAr, title, titleAr, video, poster } = site.hero

  return (
    <section className={styles.hero} id="top">
      {/* Background video (falls back to poster / ink if missing) */}
      <div className={styles.bg} aria-hidden="true">
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className={styles.scrim} />
      </div>

      <Nav />

      <div className={`container ${styles.inner}`}>
        {/* Two-column block: headline (left/start) + feature checklist (right/end) */}
        <div className={styles.block}>
          <div className={styles.colLeft}>
            <div className={styles.headlineCard}>
              <p className={styles.eyebrow}>{t(eyebrow, eyebrowAr)}</p>
              <h1 className={styles.title}>{t(title, titleAr)}</h1>
            </div>

          
            <ArrowButton
              label={t(site.primaryCta.label, site.primaryCta.labelAr)}
              href={site.primaryCta.href}
              variant="primary"
              size="md"
            />
          </div>

          
        </div>
      </div>
    </section>
  )
}
