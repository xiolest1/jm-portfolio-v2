import { certifications, education, experience } from '../content/resume'
import { SoftwareFoundation } from './SoftwareFoundation'
import styles from './ProfessionalFoundation.module.css'

function VerificationArrow() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 16 16 4M4 4h12v12" /></svg>
}

export function ProfessionalFoundation() {
  return (
    <section className={styles.foundation} id="foundation" aria-labelledby="foundation-title">
      <header className={styles.opening} data-journey-reveal>
        <p className={styles.label}>03 / Professional foundation</p>
        <h2 id="foundation-title">Experience &amp; qualifications<span>.</span></h2>
        <p>Professional work, formal Computer Science preparation, and verified industry credentials.</p>
      </header>

        <section className={styles.experience} aria-labelledby="experience-title">
          <h3 id="experience-title">Professional experience</h3>
          <div className={styles.roleGrid}>
            {experience.map(role => (
              <article className={styles.role} key={role.company}>
                <header className={styles.roleHeading}>
                  <h4>{role.title}</h4>
                  <p className={styles.employer}>{role.company}</p>
                  <p className={styles.roleDate}>{role.period}</p>
                </header>
                <ul className={styles.roleScopeLabels} aria-label={role.title + ' work scope'}>{role.scope.map(item => <li key={item}>{item}</li>)}</ul>
                <p className={styles.roleScope}>{role.summary}</p>
                {role.contribution && <div className={styles.accomplishment}>
                  <p className={styles.smallLabel}>{role.contributionLabel}</p>
                  <p>{role.contribution}</p>
                </div>}
              </article>
            ))}
          </div>
        </section>

        <div className={styles.qualifications} data-journey-reveal>
          <section className={styles.education} aria-labelledby="education-title">
            <h3 id="education-title">Computer Science education</h3>
            <div className={styles.degreeList}>
              {education.map((degree, index) => (
                <article className={styles.degree} data-primary={index === 0 ? 'true' : undefined} key={degree.degree}>
                  <h4><abbr title={degree.degree.replace(' in Computer Science', '')}>{degree.abbreviation}</abbr> Computer Science</h4>
                  <p>{degree.school}</p>
                  <time dateTime={degree.completedOn}>{degree.completed}</time>
                </article>
              ))}
            </div>
          </section>
          <section className={styles.credentials} id="credentials" aria-labelledby="credentials-title">
            <h3 id="credentials-title">Completed AWS certifications</h3>
            <div className={styles.credentialList}>
              {certifications.map((credential, index) => (
                <article className={styles.credential} data-primary={index === 0 ? 'true' : undefined} key={credential.name}>
                  <h4>{credential.name}</h4>
                  <div className={styles.credentialMeta}>
                    <p>Earned <time dateTime={credential.completedOn}>{credential.completed}</time></p>
                    <a href={credential.link} target="_blank" rel="noreferrer" aria-label={'Verify ' + credential.name + ' on Credly (opens in a new tab)'}>Verify credential <VerificationArrow /></a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      <SoftwareFoundation />
    </section>
  )
}
