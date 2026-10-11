import { softwareFoundation, type FoundationCourse } from '../content/softwareFoundation'
import styles from './SoftwareFoundation.module.css'

function TechnologyNames({ names, secondary = false }: { names: string[]; secondary?: boolean }) {
  return <ul role="list" className={secondary ? styles.supportingNames : styles.technologyNames}>
    {names.map(name => <li key={name}>{name}</li>)}
  </ul>
}

// Preserve earlier deep links beside the related skills and course material.
function AnchorAliases({ ids }: { ids: string[] }) {
  return <>{ids.map(id => <span className={styles.anchor} id={id} key={id} aria-hidden="true" />)}</>
}

function Course({ course }: { course: FoundationCourse }) {
  return <article className={styles.course} id={course.id}>
    <h5>{course.name}</h5>
    <ul className={styles.courseTopics}>{course.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
    <p className={styles.coursePurpose}>{course.purpose}</p>
  </article>
}

export function SoftwareFoundation() {
  return (
    <section className={styles.section} id="software-foundation" aria-labelledby="engineering-profile-title">
      <header className={styles.opening} data-journey-reveal>
        <p className={styles.eyebrow}>Software engineering foundation</p>
        <div className={styles.headingLine}>
          <h3 id="engineering-profile-title">Technical foundation<span>.</span></h3>
          <a className={styles.projectEvidence} href="#work">Explore project evidence <span aria-hidden="true">↑</span></a>
        </div>
      </header>

      <section className={styles.skills} id="foundation-application-engineering" aria-labelledby="foundation-stack-title">
        <h4 className={styles.srOnly} id="foundation-stack-title">Technical skills</h4>
        <div className={styles.languageLine}>
          <h5 id="foundation-languages-title">Programming languages</h5>
          <ul role="list">{softwareFoundation.languages.map(name => <li key={name}>{name}</li>)}</ul>
        </div>
        <div className={styles.applicationStack}>
            <section className={styles.stackLayer} aria-labelledby="foundation-frontend-title">
              <span className={styles.layerSymbol} aria-hidden="true">&lt;/&gt;</span>
              <h5 id="foundation-frontend-title">Frontend development</h5>
              <TechnologyNames names={['React', 'TypeScript']} />
              <TechnologyNames names={softwareFoundation.frontend.filter(name => name !== 'React')} secondary />
            </section>
            <section className={styles.stackLayer} aria-labelledby="foundation-backend-title">
              <AnchorAliases ids={['foundation-layer-detail','foundation-trace-note']} />
              <span className={styles.layerSymbol} aria-hidden="true">{'{ }'}</span>
              <h5 id="foundation-backend-title">Backend &amp; APIs</h5>
              <TechnologyNames names={softwareFoundation.backend.filter(name => name === 'FastAPI' || name === 'Flask')} />
              <TechnologyNames names={softwareFoundation.backend.filter(name => name !== 'FastAPI' && name !== 'Flask')} secondary />
            </section>
            <section className={styles.stackLayer} id="foundation-data-persistence" aria-labelledby="foundation-databases-title">
              <span className={styles.layerSymbol} aria-hidden="true">[ ]</span>
              <h5 id="foundation-databases-title">Databases</h5>
              <TechnologyNames names={softwareFoundation.databases} />
              <TechnologyNames names={['SQLAlchemy']} secondary />
            </section>
        </div>
        <div className={styles.supportingStack}>
            <section id="foundation-systems-software" aria-labelledby="foundation-tools-title">
              <h5 id="foundation-tools-title">Development tools</h5>
              <TechnologyNames names={[...softwareFoundation.tools, 'Docker']} secondary />
            </section>
            <section aria-labelledby="foundation-specialized-title">
              <h5 id="foundation-specialized-title">Computer vision &amp; integration</h5>
              <TechnologyNames names={['OpenCV', 'NumPy', 'PySerial']} secondary />
            </section>
            <section className={styles.cloudKnowledge} id="foundation-cloud-development-foundations" aria-labelledby="foundation-cloud-title">
              <h5 id="foundation-cloud-title">Cloud knowledge</h5>
              <p className={styles.technologies}>AWS architecture &amp; services</p>
              <TechnologyNames names={softwareFoundation.cloudServices} secondary />
            </section>
        </div>
      </section>

      <section className={styles.academic} aria-labelledby="foundation-coursework-title">
        <header className={styles.academicHeader}>
          <div>
            <p className={styles.eyebrow}>Relevant coursework</p>
            <h4 id="foundation-coursework-title">Computer Science preparation<span>.</span></h4>
          </div>
        </header>
        <div className={styles.designCourses} id="foundation-design-title" data-journey-reveal>
          <span className={styles.courseProgress} aria-hidden="true">→</span>
          {softwareFoundation.designCourses.map(course => <Course course={course} key={course.name} />)}
        </div>
        <div className={styles.courseGrid} id="foundation-connected-courses">
          <AnchorAliases ids={['foundation-data-concept-title','foundation-query-result','foundation-data-course-heading']} />
          {[...softwareFoundation.systemsCourses,...softwareFoundation.connectedCourses].map(course => <Course course={course} key={course.name} />)}
        </div>
      </section>
    </section>
  )
}
