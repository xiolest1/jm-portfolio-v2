import { projects } from '../../content/projects'
import {
  certifications,
  education,
  experience,
  skills,
} from '../../content/resume'
import { site } from '../../content/site'
import styles from './Showcase.module.css'

type ShowcaseProps = {
  onReplayIntro: () => void
}

export function Showcase({ onReplayIntro }: ShowcaseProps) {
  const year = new Date().getFullYear()

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerIntro}>
          {site.avatar ? (
            <img
              src={site.avatar}
              alt=""
              className={styles.avatar}
              width={144}
              height={144}
              decoding="async"
            />
          ) : null}
          <div className={styles.headerText}>
            <h1 className={styles.name}>{site.name}</h1>
            <p className={styles.pronounce}>
              Pronounced &ldquo;{site.pronunciation}&rdquo;
            </p>
            <p className={styles.tagline}>{site.tagline}</p>
            <div className={styles.heroLinks}>
              {site.social.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <nav className={styles.nav} aria-label="In-page">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="about" className={styles.section} aria-labelledby="about-heading">
          <h2 id="about-heading" className={styles.sectionTitle}>
            About me
          </h2>
          <div className={styles.aboutBlock}>
            {site.bioParagraphs.map((para, i) => (
              <p key={i} className={styles.about}>
                {para}
              </p>
            ))}
          </div>

          <h3 className={styles.subheading} id="education">
            Education
          </h3>
          <div className={styles.timeline}>
            {education.map((ed) => (
              <article key={ed.degree} className={styles.panel}>
                <h4 className={styles.panelTitle}>{ed.degree}</h4>
                <p className={styles.panelMeta}>
                  {ed.years} · {ed.school}, {ed.location}
                </p>
                <ul className={styles.tagList} aria-label="Course highlights">
                  {ed.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <h3 className={styles.subheading} id="experience">
            Experience
          </h3>
          <div className={styles.timeline}>
            {experience.map((job) => (
              <article key={job.title + job.company} className={styles.panel}>
                <h4 className={styles.panelTitle}>{job.title}</h4>
                <p className={styles.panelMeta}>
                  {job.dates} · {job.company}
                </p>
                <ul className={styles.bulletList}>
                  {job.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <h3 className={styles.subheading} id="certificates">
            Certificates
          </h3>
          <ul className={styles.certList}>
            {certifications.map((c) => (
              <li key={c.name} className={styles.certItem}>
                <div className={styles.certHead}>
                  <span className={styles.certName}>{c.name}</span>
                  <span className={styles.certStatus}>{c.status}</span>
                </div>
                <p className={styles.certDesc}>{c.description}</p>
                {c.link && (
                  <a
                    className={styles.certLink}
                    href={c.link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <h3 className={styles.subheading} id="skills">
            Technical skills
          </h3>
          <div className={styles.skillsGrid}>
            {skills.map((sk) => (
              <div key={sk.name} className={styles.skillCard}>
                <div className={styles.skillTop}>
                  <span className={styles.skillName}>{sk.name}</span>
                  <span className={styles.skillTenure}>{sk.tenure}</span>
                </div>
                <p className={styles.skillDetail}>{sk.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className={styles.section}
          aria-labelledby="projects-heading"
        >
          <h2 id="projects-heading" className={styles.sectionTitle}>
            Projects
          </h2>
          <div className={styles.grid}>
            {projects.map((p) => (
              <article key={p.id} className={styles.card}>
                {p.image ? (
                  <div className={styles.cardMedia}>
                    <img
                      src={p.image}
                      alt={`Preview of ${p.title}`}
                      className={styles.cardImage}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.meta}>
                    {p.role} · {p.year}
                  </p>
                  <ul className={styles.stack} aria-label="Stack">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <p className={styles.summary}>{p.summary}</p>
                  {p.links && p.links.length > 0 && (
                    <div className={styles.links}>
                      {p.links.map((l) => (
                        <a
                          key={l.href + l.label}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className={styles.section} aria-labelledby="contact-heading">
          <h2 id="contact-heading" className={styles.sectionTitle}>
            Contact
          </h2>
          <p className={styles.contactIntro}>
            Feel free to reach out for questions, collaborations, or just to connect.
          </p>
          <ul className={styles.contactList}>
            {site.email ? (
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            ) : null}
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <button type="button" className={styles.replay} onClick={onReplayIntro}>
          Replay boot intro
        </button>
        <span className={styles.footerNote}>
          Clears the “skip intro next visit” preference for this browser.
        </span>
        <span className={styles.copyright}>
          © {year} {site.name}. All rights reserved.
        </span>
      </footer>
    </div>
  )
}
