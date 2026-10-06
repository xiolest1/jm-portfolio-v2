import { certifications, education, experience, programmingLanguages, technicalFoundation, projectProof } from '../content/resume'
import styles from './ProfessionalFoundation.module.css'

function VerificationArrow() {
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M4 16 16 4M4 4h12v12" /></svg>
}

export function ProfessionalFoundation() {
  // Most recent role leads; explicit dates preserve the chronology.
  const roles = experience

  return (
    <section className={styles.foundation} id="foundation" aria-labelledby="foundation-title">
      <header className={styles.opening} data-journey-reveal>
        <p className={styles.label}>03 / Professional foundation</p>
        <div className={styles.introduction}>
          <h2 id="foundation-title">Professional &amp;<br />technical foundation<span>.</span></h2>
          <p>Computer Science graduate focused on backend and full-stack development, with professional experience in technical support and office operations.</p>
        </div>
      </header>

      <div className={styles.foundationGrid}>
        <section className={styles.experience} aria-labelledby="experience-title" data-journey-reveal>
          <h3 className={styles.groupHeading} id="experience-title">Professional experience</h3>
          {roles.map((role, index) => (
            <article className={styles.role} data-primary={index === 0 ? 'true' : undefined} key={role.company}>
              <header>
                <p className={styles.roleDate}>{role.period}</p>
                <h4>{role.title}</h4>
                <p className={styles.employer}>{role.company}</p>
              </header>
              <p className={styles.roleScope}>{role.summary}</p>
              <div className={styles.accomplishment}>
                <p className={styles.smallLabel}>{index === 0 ? 'Technical collaboration' : 'Internal workflow tooling'}</p>
                <p>{role.contribution}</p>
              </div>
            </article>
          ))}
        </section>

        <div className={styles.qualifications}>
          <section className={styles.education} aria-labelledby="education-title" data-journey-reveal>
            <h3 className={styles.groupHeading} id="education-title">Computer Science education</h3>
            {education.map((degree, index) => (
              <article className={styles.degree} data-primary={index === 0 ? 'true' : undefined} key={degree.degree}>
                <h4><abbr title={degree.degree.replace(' in Computer Science', '')}>{degree.abbreviation}</abbr> Computer Science</h4>
                <p>{degree.school}</p>
                <time dateTime={degree.completedOn}>{degree.completed}</time>
              </article>
            ))}
          </section>

          <section className={styles.credentials} id="credentials" aria-labelledby="credentials-title" data-journey-reveal>
            <header>
              <p className={styles.smallLabel}>Amazon Web Services</p>
              <h3 className={styles.groupHeading} id="credentials-title">Completed certifications</h3>
            </header>
            {certifications.map((credential, index) => (
              <article className={styles.credential} data-primary={index === 0 ? 'true' : undefined} key={credential.name}>
                <h4>{credential.name}</h4>
                <div className={styles.credentialMeta}>
                  <span className={styles.completed}><span aria-hidden="true">✓</span> Earned <time dateTime={credential.completedOn}>{credential.completed}</time></span>
                  <a href={credential.link} target="_blank" rel="noreferrer" aria-label={'Verify ' + credential.name + ' on Credly (opens in a new tab)'}>Verify credential<VerificationArrow /></a>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>

      <section className={styles.technical} aria-labelledby="engineering-profile-title" data-journey-reveal>
        <header className={styles.technicalHeader}>
          <h3 id="engineering-profile-title">Software-engineering foundation</h3>
          <p>Technical preparation, with implementation demonstrated in the projects above.</p>
        </header>
        <div className={styles.languageLine}><span>Languages</span><ul>{programmingLanguages.map(language => <li key={language}>{language}</li>)}</ul></div>
        <div className={styles.technicalGrid}>
          {technicalFoundation.map(group => (
            <section className={styles.technicalGroup} id={group.id} aria-labelledby={group.id + '-title'} key={group.id}>
              <h4 id={group.id + '-title'}>{group.title}</h4>
              <p>{group.context}</p>
              <dl>{group.areas.map(area => <div key={area.label}><dt>{area.label}</dt><dd>{area.technologies.join(' · ')}</dd></div>)}</dl>
            </section>
          ))}
        </div>
        <div className={styles.proof}>
          <div className={styles.proofIntro} id="foundation-computer-vision"><p className={styles.smallLabel}>Selected implementation evidence</p><p>Web applications and computer vision</p></div>
          <ul>{projectProof.map(project => (
            <li key={project.label}><a href={project.href}>{project.label}<VerificationArrow /></a><span>{project.context}</span></li>
          ))}</ul>
        </div>
      </section>
    </section>
  )
}
