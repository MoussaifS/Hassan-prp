import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import ScrollExpand from './ScrollExpand.jsx'
import styles from './About.module.css'

export default function About() {
  const { t } = useLanguage()
  const { eyebrow, eyebrowAr, newTitle, newTitleAr, title, titleAr, body, bodyAr } = site.about

  return (
    <section className={styles.section} id="about">
      <div >

        <ScrollExpand
          src="public/media/bw.jpg"
          alt="Hassan event host and live reporter"
          title={t(newTitle, newTitleAr)}
          scrollHint={t('Scroll', 'مرر')}
          startWidth={70}
          startHeight={56}
          startRadius={20}
          endRadius={20}
          mediaZoom={1.15}
          scrollDistance={1.1}
          holdDistance={0.2}
          overlayScrim={0.45}
          useWindowScroll
        >
          <div className="scroll-expand__text-block">
            <h2 className={styles.title}>{t(title, titleAr)}</h2>
            <p className={styles.body}>{t(body, bodyAr)}</p>
          </div>
        </ScrollExpand>
      </div>
    </section>
  )
}
