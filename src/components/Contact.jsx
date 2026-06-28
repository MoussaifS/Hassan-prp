import { useEffect } from 'react'
import { site } from '../data/site.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import ArrowButton from './ArrowButton.jsx'
import styles from './Contact.module.css'

// Derive a wa.me link from the phone number + a language-aware message.
function whatsappHref(phone, lang) {
  const raw = phone.replace(/\D/g, '')
  const msg = lang === 'ar'
    ? 'أهلاً حسان، أخطط لفعالية وأود مناقشتها معك.'
    : "Hi Hassan, I'm planning an event and I'd like to discuss it with you."
  return `https://wa.me/${raw}?text=${encodeURIComponent(msg)}`
}

// Native Instagram embed — no token required.
// Instagram's embed.js picks up blockquotes with data-instgrm-permalink.
function InstagramFeed({ posts, instagramUrl, handle }) {
  useEffect(() => {
    if (!posts.length) return
    if (window.instgrm) {
      window.instgrm.Embeds.process()
    } else {
      const s = document.createElement('script')
      s.src = '//www.instagram.com/embed.js'
      s.async = true
      document.body.appendChild(s)
    }
  }, [posts])

  if (!posts.length) {
    return (
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.igCard}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={styles.igIcon}>
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
        </svg>
        <span className={styles.igAt}>{handle}</span>
        <span className={styles.igCta}>View on Instagram →</span>
      </a>
    )
  }

  return (
    <div className={styles.igFeed}>
      {posts.map((url) => (
        <blockquote
          key={url}
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          data-instgrm-captioned
          style={{ minHeight: 400 }}
        />
      ))}
    </div>
  )
}

export default function Contact() {
  const { lang, t } = useLanguage()
  const {
    eyebrow, eyebrowAr,
    heading, headingAr,
    instagram, instagramUrl, instagramPosts,
    email, phone,
    city, cityAr,
  } = site.contact

  const ctaHref = phone ? whatsappHref(phone, lang) : (email ? `mailto:${email}` : instagramUrl)

  const rows = [
    {
      label: t('WhatsApp', 'واتساب'),
      value: phone || t('Add number', 'أضف رقمًا'),
      href: phone ? whatsappHref(phone, lang) : null,
      placeholder: !phone,
      ltr: true,   // phone numbers must never flip with RTL
    },
    {
      label: t('Email', 'البريد'),
      value: email || t('Add booking email', 'أضف بريد الحجز'),
      href: email ? `mailto:${email}` : null,
      placeholder: !email,
      ltr: true,   // email addresses are always LTR
    },
    {
      label: t('Instagram', 'إنستغرام'),
      value: instagram,
      href: instagramUrl,
      ltr: true,   // handles like @_nut998 are always LTR
    },
    {
      label: t('Based in', 'مقيم في'),
      value: t(city, cityAr),
      href: null,
    },
  ]

  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <p className={styles.eyebrow}>{t(eyebrow, eyebrowAr)}</p>
        <h2 className={styles.heading}>{t(heading, headingAr)}</h2>

        <div className={styles.layout}>
          <div className={styles.left}>
            <dl className={styles.details}>
              {rows.map((r) => (
                <div key={r.label} className={styles.row}>
                  <dt className={styles.dt}>{r.label}</dt>
                  <dd className={styles.dd}>
                    {r.href ? (
                      <a
                        href={r.href}
                        dir={r.ltr ? 'ltr' : undefined}
                        target={r.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        {r.value}
                      </a>
                    ) : (
                      <span
                        dir={r.ltr ? 'ltr' : undefined}
                        className={r.placeholder ? styles.ph : ''}
                      >
                        {r.value}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className={styles.action}>
              <ArrowButton
                label={t(site.nav.cta.label, site.nav.cta.labelAr)}
                href={ctaHref}
                variant="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              />
            </div>
          </div>

          <InstagramFeed
            posts={instagramPosts}
            instagramUrl={instagramUrl}
            handle={instagram}
          />
        </div>
      </div>
    </section>
  )
}
