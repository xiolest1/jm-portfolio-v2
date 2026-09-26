import { certifications, education, engineeringAreas, experience } from '../content/resume'
import { hireFlux, libraryProject, rcProject } from '../content/projects'
import { site, resumeRequestHref } from '../content/site'
import styles from './PortfolioHome.module.css'

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <span className={styles.srOnly}> (opens in a new tab)</span>
    </a>
  )
}

export function PortfolioHome() {
  const mailto = 'mailto:' + site.email

  return (
    <>
      <section className={styles.identity} id="top" aria-labelledby="identity-title">
        <div className={styles.identityCopy}>
          <p className={styles.eyebrow}>Software engineering · backend + full-stack</p>
          <h1 className={styles.name} id="identity-title">{site.name}</h1>
          <p className={styles.pronunciation}>Pronounced “{site.pronunciation}”</p>
          <p className={styles.role}>{site.role}</p>
          <p className={styles.positioning}>
            I build backend and full-stack applications with clear system boundaries,
            reliable data handling, and useful workflows. AWS strengthens that
            software-engineering foundation.
          </p>
          <div className={styles.credibility}>
            <span>B.S. Computer Science · Montclair State University · May 2025</span>
            <span>AWS Solutions Architect – Associate</span>
          </div>
          <div className={styles.actions}>
            <a className={styles.actionPrimary} href="#work">Explore selected work</a>
            <a className={styles.actionSecondary} href={resumeRequestHref}>Request résumé</a>
          </div>
          <div className={styles.profileLine} aria-label="Engineering focus">
            <span>Backend systems</span>
            <span>Full-stack products</span>
            <span>Reliable data workflows</span>
          </div>
        </div>
        <figure className={styles.portrait}>
          <img
            src={site.avatar}
            alt="Portrait of Joan Morillo"
            width="960"
            height="1280"
            fetchPriority="high"
          />
          <figcaption>Joan Morillo <span>·</span> Yo-han</figcaption>
        </figure>
        <span className={styles.orbit} aria-hidden="true" />
      </section>

      <section className={styles.flagship} id="work" aria-labelledby="hireflux-title">
        <div className={styles.regionHeader}>
          <p className={styles.eyebrow}>01 / Flagship proof</p>
          <p className={styles.regionHint}>Personal project</p>
        </div>
        <div className={styles.flagshipGrid}>
          <div className={styles.flagshipCopy}>
            <h2 className={styles.projectTitle} id="hireflux-title">{hireFlux.title}</h2>
            <p className={styles.projectSummary}>{hireFlux.summary}</p>
            <p className={styles.statusLine}>
              <span className={styles.statusDot} aria-hidden="true" />
              {hireFlux.status}
            </p>
            <p className={styles.signalLabel}>Implemented engineering signals</p>
            <ul className={styles.signalList}>
              {hireFlux.signals.map((signal) => <li key={signal}>{signal}</li>)}
            </ul>
            <ul className={styles.stackLine} aria-label="HireFlux technologies">
              {hireFlux.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className={styles.projectLinks}>
              <a className={styles.textLinkStrong} href={hireFlux.caseStudy}>
                Read the engineering case study <span aria-hidden="true">↗</span>
              </a>
              <ExternalLink href={hireFlux.repository}>View HireFlux on GitHub</ExternalLink>
            </div>
          </div>
          <figure className={styles.flagshipMedia}>
            <img
              src={hireFlux.image}
              alt={hireFlux.imageAlt}
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <figcaption>Local demo workspace · fictional records</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.supporting} aria-labelledby="supporting-title">
        <div className={styles.regionHeader}>
          <p className={styles.eyebrow}>02 / Selected supporting work</p>
          <h2 className={styles.sectionTitle} id="supporting-title">
            Broader engineering evidence
          </h2>
        </div>

        <article className={styles.library} id="project-library">
          <div className={styles.projectMeta}>
            <span>{libraryProject.type}</span>
            <span>Backend · relational data · authorization</span>
          </div>
          <div className={styles.supportGrid}>
            <div>
              <h3 className={styles.supportTitle}>{libraryProject.title}</h3>
              <p className={styles.projectSummary}>{libraryProject.summary}</p>
              <p className={styles.contribution}>
                <strong>Contribution</strong> {libraryProject.contribution}
              </p>
              <ul className={styles.stackLine} aria-label="Library technologies">
                {libraryProject.stack.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <ExternalLink href={libraryProject.repository}>View Library on GitHub</ExternalLink>
            </div>
            <div className={styles.flowProof} role="group" aria-label="Library system overview">
              <span className={styles.flowLabel}>System at a glance</span>
              <div className={styles.flowLine}>
                <span>Flask API</span>
                <span className={styles.flowArrow} aria-hidden="true">→</span>
                <span>PostgreSQL</span>
              </div>
              <p>SQLAlchemy data layer · session auth and roles · Docker</p>
            </div>
          </div>
        </article>

        <article className={styles.rcProject} id="project-rcdetection">
          <figure className={styles.rcMedia}>
            <img
              src={rcProject.image}
              alt={rcProject.imageAlt}
              width="450"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className={styles.rcCopy}>
            <div className={styles.projectMeta}>
              <span>{rcProject.type}</span>
              <span>Computer vision · physical control</span>
            </div>
            <h3 className={styles.supportTitle}>{rcProject.title}</h3>
            <p className={styles.projectSummary}>{rcProject.summary}</p>
            <p className={styles.contribution}>
              <strong>Contribution</strong> {rcProject.contribution}
            </p>
            <ul className={styles.stackLine} aria-label="RCDetection technologies">
              {rcProject.stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <ExternalLink href={rcProject.repository}>View RCDetection on GitHub</ExternalLink>
          </div>
        </article>
      </section>

      <section className={styles.foundation} id="foundation" aria-labelledby="foundation-title">
        <div className={styles.regionHeader}>
          <p className={styles.eyebrow}>03 / Professional foundation</p>
          <h2 className={styles.sectionTitle} id="foundation-title">
            Background that supports the work
          </h2>
        </div>
        <div className={styles.foundationGrid}>
          <div className={styles.foundationColumn}>
            <h3 className={styles.subhead}>Professional experience</h3>
            {experience.map((item) => (
              <article className={styles.experienceItem} key={item.company}>
                <h4>{item.title} <span>· {item.company}</span></h4>
                <p>{item.evidence}</p>
              </article>
            ))}
          </div>

          <div className={styles.foundationColumn}>
            <h3 className={styles.subhead}>Education</h3>
            <ul className={styles.foundationList}>
              {education.map((item) => (
                <li key={item.degree}>
                  <strong>{item.degree}</strong>
                  <span>{item.school}{item.detail ? ' · ' + item.detail : ''}</span>
                </li>
              ))}
            </ul>
            <h3 className={styles.subhead} id="credentials">Completed AWS credentials</h3>
            <ul className={styles.credentialList}>
              {certifications.map((item) => (
                <li key={item.name}>
                  <ExternalLink href={item.link}>{item.name}</ExternalLink>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.foundationColumn}>
            <h3 className={styles.subhead}>Engineering profile</h3>
            <ul className={styles.engineeringList}>
              {engineeringAreas.map((area) => (
                <li key={area.name}>
                  <h4>{area.name}</h4>
                  <p>{area.tools.join(' · ')}</p>
                  <div className={styles.evidenceLinks}>{area.evidence.map((item) => (<a href={item.href} key={item.label}>{item.label}<span aria-hidden="true"> ↗</span></a>))}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.closing} id="about" aria-labelledby="about-title">
        <div className={styles.aboutCopy}>
          <p className={styles.eyebrow}>04 / About</p>
          <h2 className={styles.sectionTitle} id="about-title">Curious about how systems work.</h2>
          <p>
            I’m interested in how software carries context from a user’s first action
            through a reliable next step—from full-stack applications to computer vision.
          </p>
        </div>
        <div className={styles.contact} id="contact" aria-labelledby="contact-title">
          <p className={styles.eyebrow}>Next step</p>
          <h2 id="contact-title">Let’s connect.</h2>
          <a className={styles.emailAction} href={mailto}>{site.email}</a>
          <div className={styles.contactLinks}>
            <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
            <ExternalLink href={site.github}>GitHub</ExternalLink>
            <a href={resumeRequestHref}>Request résumé</a>
          </div>
        </div>
      </section>
    </>
  )
}


