import { ArrowUpRight } from './Icon.jsx'
import styles from './ArrowButton.module.css'

/**
 * Pill button with a circular arrow badge — the core CTA element.
 *
 * @param {string} label     Button text
 * @param {string} href      Link target (renders an <a>)
 * @param {'primary'|'light'|'dark'} variant  Colour treatment
 * @param {'md'|'lg'} size    Size
 * @param {string} [ariaLabel]
 */
export default function ArrowButton({
  label,
  href = '#',
  variant = 'primary',
  size = 'md',
  block = false,
  ariaLabel,
  ...rest
}) {
  const className = [
    styles.btn,
    styles[variant],
    styles[size],
    block ? styles.block : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={className} aria-label={ariaLabel || label} {...rest}>
      <span className={styles.label}>{label}</span>
      <span className={styles.circle} aria-hidden="true">
        <ArrowUpRight size={size === 'lg' ? 20 : 16} />
      </span>
    </a>
  )
}
