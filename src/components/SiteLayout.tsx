import { useState, type ReactNode } from 'react'
import { site } from '../content/site'
import { BootSequence } from './BootSequence/BootSequence'
import styles from './SiteLayout.module.css'

type SiteLayoutProps = {
  children: ReactNode
  footerVariant?: 'standard' | 'home'
}

export function SiteLayout({ children, footerVariant = 'standard' }: SiteLayoutProps) {
  const [bootOpen, setBootOpen] = useState(false)
  const year = new Date().getFullYear()

  return (
    <>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <div className={styles.siteShell}>
        <header className={styles.header}>
          <a className={styles.brand} href="/" aria-label="Joan Morillo home">
            <span className={styles.brandMark} aria-hidden="true">JM</span>
            <span>Joan Morillo</span>
          </a>
          <nav className={styles.primaryNav} aria-label="Primary navigation">
            <a href="/#work">Work</a>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
          </nav>
          <nav className={styles.utilityNav} aria-label="Professional profiles">
            <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
        </header>

        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <footer className={footerVariant === 'home' ? styles.footer + ' ' + styles.homeFooter : styles.footer}>
          <button className={styles.bootLink} type="button" onClick={() => setBootOpen(true)}>
            Replay system boot
          </button>
          <p>© {year} {site.name}</p>
        </footer>
      </div>
      <BootSequence open={bootOpen} onClose={() => setBootOpen(false)} />
    </>
  )
}
