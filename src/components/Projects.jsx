import { site } from '../data/site.js'
import { projects } from '../data/projects.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import ProjectCard from './ProjectCard.jsx'
import styles from './Projects.module.css'

export default function Projects() {
  const { t } = useLanguage()
  const { eyebrow, eyebrowAr, title, titleAr } = site.projects

  return (
    <section className={styles.section} id="work">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow">{t(eyebrow, eyebrowAr)}</p>
          <h2 className={styles.title}>{t(title, titleAr)}</h2>
        </header>

        <div className={styles.grid}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
