import { softwareFoundation, type FoundationCourse } from '../content/softwareFoundation'
import { hireFlux, libraryProject, rcProject } from '../content/projects'
import styles from './SoftwareFoundation.module.css'

function EvidenceLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith('https:')
  return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}<span aria-hidden="true"> ↗</span>{external && <span className={styles.srOnly}> (opens in a new tab)</span>}</a>
}

function EvidenceLine({ technology, href, project }: { technology: string; href: string; project: string }) {
  return <p className={styles.evidenceLine}><span>{technology}</span><EvidenceLink href={href}>{project}</EvidenceLink></p>
}

// Preserve earlier deep links beside the related skills and course material.
function AnchorAliases({ ids }: { ids: string[] }) {
  return <>{ids.map(id => <span className={styles.anchor} id={id} key={id} aria-hidden="true" />)}</>
}

function Course({ course }: { course: FoundationCourse }) {
  return <article className={styles.course} id={course.id}>
    <h5>{course.name}</h5>
    <p><strong>{course.concepts}</strong> — {course.purpose}</p>
  </article>
}

export function SoftwareFoundation() {
  return (
    <section className={styles.section} id="software-foundation" aria-labelledby="engineering-profile-title">
      <header className={styles.opening} data-journey-reveal>
        <p className={styles.eyebrow}>Skills &amp; academic preparation</p>
        <h3 id="engineering-profile-title">Software engineering foundation<span>.</span></h3>
      </header>

      <section className={styles.skills} id="foundation-application-engineering" aria-labelledby="foundation-stack-title">
        <h4 id="foundation-stack-title">Technical skills</h4>
        <div className={styles.languageLine}>
          <h5 id="foundation-languages-title">Programming languages</h5>
          <ul>{softwareFoundation.languages.map(name => <li key={name}>{name}</li>)}</ul>
        </div>
        <div className={styles.skillsLayout}>
          <div className={styles.applicationSkills}>
            <section aria-labelledby="foundation-frontend-title">
              <h5 id="foundation-frontend-title">Frontend development</h5>
              <EvidenceLine technology="React / TypeScript" href={hireFlux.caseStudy} project="HireFlux" />
              <p className={styles.technologies}>{softwareFoundation.frontend.filter(name => name !== 'React').join(' · ')}</p>
            </section>
            <section aria-labelledby="foundation-backend-title">
              <AnchorAliases ids={['foundation-layer-detail','foundation-trace-note']} />
              <h5 id="foundation-backend-title">Backend &amp; APIs</h5>
              <EvidenceLine technology="FastAPI" href={hireFlux.caseStudy} project="HireFlux" />
              <EvidenceLine technology="Flask" href={libraryProject.repository} project="Library" />
              <p className={styles.technologies}>{softwareFoundation.backend.filter(name => name !== 'FastAPI' && name !== 'Flask').join(' · ')}</p>
            </section>
            <section id="foundation-data-persistence" aria-labelledby="foundation-databases-title">
              <h5 id="foundation-databases-title">Databases</h5>
              <EvidenceLine technology="DynamoDB" href={hireFlux.caseStudy} project="HireFlux" />
              <EvidenceLine technology="PostgreSQL / SQLAlchemy" href={libraryProject.repository} project="Library" />
              <p className={styles.technologies}>{softwareFoundation.databases.filter(name => name !== 'PostgreSQL' && name !== 'DynamoDB').join(' · ')}</p>
            </section>
            <section id="foundation-systems-software" aria-labelledby="foundation-tools-title">
              <h5 id="foundation-tools-title">Development tools</h5>
              <p className={styles.technologies}>{softwareFoundation.tools.join(' · ')}</p>
              <EvidenceLine technology="Docker" href={libraryProject.repository} project="Library" />
            </section>
          </div>
          <div className={styles.supportingSkills}>
            <section aria-labelledby="foundation-specialized-title">
              <h5 id="foundation-specialized-title">Computer vision &amp; integration</h5>
              <EvidenceLine technology="OpenCV · NumPy · PySerial" href={rcProject.repository} project="RCDetection" />
            </section>
            <section id="foundation-cloud-development-foundations" aria-labelledby="foundation-cloud-title">
              <h5 id="foundation-cloud-title">Cloud knowledge</h5>
              <p className={styles.technologies}>AWS architecture &amp; services</p>
              <p className={styles.cloudServices}>{softwareFoundation.cloudServices.join(' · ')}</p>
              <p className={styles.cloudBoundary}><a href="#credentials">Credential-backed knowledge</a>. HireFlux AWS deployment remains planned.</p>
            </section>
          </div>
        </div>
      </section>

      <section className={styles.academic} aria-labelledby="foundation-coursework-title">
        <header className={styles.academicHeader}>
          <h4 id="foundation-coursework-title">Relevant coursework</h4>
          <p>Selected completed courses<span>Montclair State University</span></p>
        </header>
        <div className={styles.designCourses} id="foundation-design-title">
          {softwareFoundation.designCourses.map(course => <Course course={course} key={course.name} />)}
        </div>
        <div className={styles.courseGrid} id="foundation-connected-courses">
          <AnchorAliases ids={['foundation-data-concept-title','foundation-query-result','foundation-data-course-heading']} />
          {[softwareFoundation.systemsCourses,softwareFoundation.connectedCourses.slice(0,2),softwareFoundation.connectedCourses.slice(2)].map(courses => (
            <div className={styles.coursePair} key={courses[0].name}>
              {courses.map(course => <Course course={course} key={course.name} />)}
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
