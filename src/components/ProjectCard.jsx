import { useState, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { ArrowUpRight, Play } from './Icon.jsx'
import VideoModal from './VideoModal.jsx'
import styles from './ProjectCard.module.css'

const MEDIA_LABEL = {
  en: { photos: 'Photos', video: 'Video' },
  ar: { photos: 'صور',    video: 'فيديو' },
}

function mediaLabel(media = [], lang) {
  const map = MEDIA_LABEL[lang] || MEDIA_LABEL.en
  return media.map((m) => map[m] || m).join(' + ')
}

export default function ProjectCard({ project }) {
  const { lang, t } = useLanguage()
  const { city, cityAr, client, title, role, roleAr, media, poster, video, gallery = [] } = project
  const [modalOpen, setModalOpen] = useState(false)
  const videoRef = useRef(null)

  const handleEnter = () => {
    videoRef.current?.play().catch(() => {})
  }
  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const hasMedia = !!(video || gallery.length > 0)

  return (
    <>
      <article
        className={`${styles.card} ${hasMedia ? styles.hasVideo : ''}`}
        onMouseEnter={video ? handleEnter : undefined}
        onMouseLeave={video ? handleLeave : undefined}
        onClick={hasMedia ? () => setModalOpen(true) : undefined}
      >
        <div className={styles.media}>
          {video ? (
            <video
              ref={videoRef}
              className={styles.mediaAsset}
              src={video}
              poster={poster || undefined}
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : poster ? (
            <img
              className={styles.mediaAsset}
              src={poster}
              alt={`${client} — ${title}`}
              loading="lazy"
            />
          ) : (
            <div className={styles.placeholder} aria-hidden="true">
              <span>{client}</span>
            </div>
          )}

          <span className={styles.city}>{t(city, cityAr)}</span>
          {media?.length > 0 && (
            <span className={styles.tag}>{mediaLabel(media, lang)}</span>
          )}

          {video && (
            <span className={styles.playBadge} aria-hidden="true">
              <Play size={22} />
            </span>
          )}
        </div>

        <div className={styles.body}>
          <p className={styles.client}>{client}</p>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.role}>{t(role, roleAr)}</p>
          <span className={styles.view} aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </article>

      {modalOpen && (
        <VideoModal
          video={video}
          poster={poster}
          gallery={gallery}
          title={title}
          client={client}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
