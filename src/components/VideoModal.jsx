import { useState, useEffect, useRef } from 'react'
import { Close, Play } from './Icon.jsx'
import styles from './VideoModal.module.css'

// Builds a flat items list: video first (if present), then photos
function buildItems(video, poster, gallery) {
  return [
    ...(video ? [{ type: 'video', src: video, poster }] : []),
    ...gallery.map((src) => ({ type: 'photo', src })),
  ]
}

function NavArrow({ dir, onClick, disabled }) {
  return (
    <button
      className={`${styles.nav} ${dir === 'prev' ? styles.navPrev : styles.navNext}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous' : 'Next'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={dir === 'prev' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export default function VideoModal({ video, poster, gallery = [], title, client, onClose }) {
  const items = buildItems(video, poster, gallery)
  const [activeIdx, setActiveIdx] = useState(0)
  const videoRef = useRef(null)
  const thumbsRef = useRef(null)
  const active = items[activeIdx]

  // Keyboard navigation + body scroll lock
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActiveIdx((i) => Math.min(i + 1, items.length - 1))
      if (e.key === 'ArrowLeft') setActiveIdx((i) => Math.max(i - 1, 0))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, items.length])

  // Play video whenever it becomes the active item
  useEffect(() => {
    if (active?.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [active])

  // Scroll active thumbnail into view
  useEffect(() => {
    const strip = thumbsRef.current
    if (!strip) return
    const thumb = strip.children[activeIdx]
    if (thumb) thumb.scrollIntoView({ inline: 'nearest', behavior: 'smooth' })
  }, [activeIdx])

  const go = (idx) => setActiveIdx(Math.max(0, Math.min(idx, items.length - 1)))

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label={`${client} — ${title}`}
    >
      <div className={styles.panel}>
        {/* Close button */}
        <button className={styles.close} onClick={onClose} aria-label="Close">
          <Close size={20} />
        </button>

        {/* Main stage */}
        <div className={styles.stage}>
          {active?.type === 'video' ? (
            <video
              key="video"
              ref={videoRef}
              className={styles.stageAsset}
              src={active.src}
              poster={active.poster}
              controls
              playsInline
            />
          ) : (
            <img
              key={active?.src}
              className={styles.stageAsset}
              src={active?.src}
              alt={`${client} — ${title}`}
            />
          )}

          {/* Prev / Next arrows (only when multiple items) */}
          {items.length > 1 && (
            <>
              <NavArrow dir="prev" onClick={() => go(activeIdx - 1)} disabled={activeIdx === 0} />
              <NavArrow dir="next" onClick={() => go(activeIdx + 1)} disabled={activeIdx === items.length - 1} />
            </>
          )}
        </div>

        {/* Footer: meta + thumbnail strip */}
        <div className={styles.footer}>
          <div className={styles.meta}>
            <span className={styles.metaClient}>{client}</span>
            <span className={styles.metaTitle}>{title}</span>
            {items.length > 1 && (
              <span className={styles.metaCount}>{activeIdx + 1} / {items.length}</span>
            )}
          </div>

          {items.length > 1 && (
            <div className={styles.thumbsWrap}>
              <div className={styles.thumbs} ref={thumbsRef}>
                {items.map((item, i) => (
                  <button
                    key={i}
                    className={`${styles.thumb} ${i === activeIdx ? styles.thumbActive : ''}`}
                    onClick={() => go(i)}
                    aria-label={item.type === 'video' ? 'Play video' : `Photo ${i}`}
                    aria-pressed={i === activeIdx}
                  >
                    <img
                      src={item.type === 'video' ? item.poster : item.src}
                      alt=""
                      loading="lazy"
                    />
                    {item.type === 'video' && (
                      <span className={styles.thumbPlayIcon}>
                        <Play size={10} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
