import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Wordmark from './Wordmark.jsx'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bar}`}>
        <Wordmark size={22} light />
        <p className={styles.tag}>{t(site.footer.tagline, site.footer.taglineAr)}</p>
        <p className={styles.meta}>
          <a href={site.contact.instagramUrl}>{site.contact.instagram}</a>
          <span aria-hidden="true"> · </span>© {year}
        </p>
      </div>
    </footer>
  )
}
