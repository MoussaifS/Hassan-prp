import { useState } from 'react'
import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { Menu, Close } from './Icon.jsx'
import ArrowButton from './ArrowButton.jsx'
import Wordmark from './Wordmark.jsx'
import styles from './Nav.module.css'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { lang, toggle, t } = useLanguage()
  const { links, cta } = site.nav

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.bar}`}>
        <button
          className={styles.menuBtn}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t('Close menu', 'إغلاق القائمة') : t('Open menu', 'فتح القائمة')}
          aria-expanded={open}
        >
          {open ? <Close /> : <Menu />}
        </button>

        <a href="#top" className={styles.brand} aria-label={site.brand.name}>
          <Wordmark size={26} light />
        </a>

        <nav className={styles.links} aria-label={t('Primary', 'الرئيسية')}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {t(l.label, l.labelAr)}
            </a>
          ))}
        </nav>

        <button
          className={styles.langToggle}
          onClick={toggle}
          aria-label={t('Switch to Arabic', 'Switch to English')}
        >
          {lang === 'en' ? 'AR' : 'EN'}
        </button>

        <div className={styles.cta}>
          <ArrowButton label={t(cta.label, cta.labelAr)} href={cta.href} variant="primary" size="md" />
        </div>
      </div>

      {/* Mobile drop panel */}
      {open && (
        <nav className={styles.panel} aria-label={t('Mobile', 'موبايل')}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={styles.panelLink}
              onClick={() => setOpen(false)}
            >
              {t(l.label, l.labelAr)}
            </a>
          ))}
          <a href={cta.href} className={styles.panelCta} onClick={() => setOpen(false)}>
            {t(cta.label, cta.labelAr)}
          </a>
        </nav>
      )}
    </header>
  )
}
