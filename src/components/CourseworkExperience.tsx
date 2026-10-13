import { softwareFoundation, type FoundationCourse } from '../content/softwareFoundation'
import styles from './CourseworkExperience.module.css'

function CourseText({ course, number }: { course: FoundationCourse; number: string }) {
  return <article className={styles.course} id={course.id}>
    <span className={styles.courseNumber}>{number}</span>
    <div>
      <h5>{course.name}</h5>
      <ul className={styles.topics} role="list">{course.topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
      <p>{course.purpose}</p>
    </div>
  </article>
}

function DesignIllustration() {
  return <svg className={styles.designDrawing} viewBox="0 0 560 370" aria-hidden="true">
    <defs>
      <linearGradient id="cw-design-surface" x2="1" y2="1"><stop stopColor="#ffc39b" stopOpacity=".11" /><stop offset="1" stopColor="#ffc39b" stopOpacity=".02" /></linearGradient>
      <linearGradient id="cw-check-surface" x2="1" y2="1"><stop stopColor="#bad9c8" stopOpacity=".13" /><stop offset="1" stopColor="#bad9c8" stopOpacity=".02" /></linearGradient>
    </defs>
    <g className={styles.requirementNode}>
      <rect x="192" y="12" width="176" height="45" rx="5" />
      <text x="280" y="40" textAnchor="middle">REQUIREMENTS</text>
      <path d="M280 57v35" />
    </g>
    <g className={styles.structure}>
      <path className={styles.designConnections} d="M280 148v30H114v37M280 178h166v37M280 148v67" />
      <rect className={styles.architectureNode} x="192" y="92" width="176" height="56" rx="5" />
      <text className={styles.diagramMain} x="280" y="117" textAnchor="middle">Architecture</text>
      <text className={styles.diagramSmall} x="280" y="136" textAnchor="middle">roles + relationships</text>
      {[{x:38,name:'Interface'}, {x:204,name:'Logic'}, {x:370,name:'Data'}].map(node => <g key={node.name}>
        <rect className={styles.componentNode} x={node.x} y="215" width="152" height="66" rx="5" />
        <text className={styles.diagramMain} x={node.x + 76} y="243" textAnchor="middle">{node.name}</text>
        <text className={styles.diagramSmall} x={node.x + 76} y="263" textAnchor="middle">defined responsibility</text>
      </g>)}
    </g>
    <g className={styles.verificationFrame}><path d="M40 168V78h108M412 78h108v90M40 252v45h108M412 297h108v-45" /></g>
    <g className={styles.checks}>
      {[{x:114,label:'Behavior'}, {x:280,label:'Reliability'}, {x:446,label:'Change'}].map(check => <g key={check.label}>
        <path d={`M${check.x} 281v24`} />
        <circle cx={check.x} cy="318" r="13" />
        <path className={styles.checkMark} d={`m${check.x-5} 318 4 4 7-8`} />
        <text x={check.x} y="354" textAnchor="middle">{check.label}</text>
      </g>)}
    </g>
  </svg>
}

function ConceptGlyph({ kind }: { kind: 'systems' | 'network' | 'web' }) {
  return <svg viewBox="0 0 300 160" className={styles.conceptGlyph} aria-hidden="true">
    {kind === 'systems' && <>
      <g className={styles.glyphPrimary}><rect x="20" y="25" width="92" height="108" rx="5" /><path d="M20 52h92M20 79h92M20 106h92M50 52v81" /></g>
      <path className={styles.glyphRoute} d="M112 79h45v-30h31M157 79v35h31" />
      <g className={styles.glyphSecondary}><rect x="188" y="28" width="92" height="40" rx="5" /><rect x="188" y="94" width="92" height="40" rx="5" /></g>
      <text x="66" y="44" textAnchor="middle">records</text><text x="234" y="53" textAnchor="middle">process</text><text x="234" y="119" textAnchor="middle">memory</text>
    </>}
    {kind === 'network' && <>
      <g className={styles.glyphPrimary}><circle cx="35" cy="79" r="16" /><circle cx="265" cy="79" r="16" /></g>
      <path className={styles.glyphRoute} d="M51 79h63M186 79h63" />
      <g className={styles.glyphSecondary}><path d="m150 29 36 13v37c0 29-36 49-36 49s-36-20-36-49V42l36-13Z" /><path d="M139 79h22v20h-22zM142 79V67a8 8 0 0 1 16 0v12" /></g>
      <text x="35" y="119" textAnchor="middle">send</text><text x="265" y="119" textAnchor="middle">receive</text>
      <circle className={styles.glyphSignal} cx="80" cy="79" r="4" />
    </>}
    {kind === 'web' && <>
      <g className={styles.glyphPrimary}><rect x="16" y="40" width="97" height="79" rx="5" /><path d="M16 59h97" /></g>
      <g className={styles.glyphSecondary}><rect x="191" y="40" width="93" height="79" rx="5" /><path d="M208 63h59M208 80h40M208 97h49" /></g>
      <path className={styles.glyphRoute} d="M113 72h78M191 95h-78" />
      <text x="64" y="90" textAnchor="middle">browser</text><text x="237" y="142" textAnchor="middle">service</text>
    </>}
  </svg>
}

function RequestIllustration() {
  return <figure className={styles.requestFigure}>
    <div className={styles.requestOpening}><span className={styles.meta}>Concept illustration / request &amp; response</span></div>
    <svg viewBox="0 0 500 190" className={styles.requestDrawing} aria-hidden="true">
      <path className={styles.requestPath} d="M86 65V30h322v35m-5-5 5 5 5-5" />
      <path className={styles.responsePath} d="M408 121v39H86v-39m-5 5 5-5 5 5" />
      <rect x="24" y="65" width="124" height="56" rx="5" /><rect x="344" y="65" width="132" height="56" rx="5" />
      <text x="86" y="98" textAnchor="middle">Client</text><text x="410" y="98" textAnchor="middle">Service</text>
      <text className={styles.requestLabel} x="246" y="20" textAnchor="middle">REQUEST →</text><text className={styles.responseLabel} x="246" y="184" textAnchor="middle">← RESPONSE</text>
      <text className={styles.diagramSmall} x="246" y="98" textAnchor="middle">middleware / integration</text>
    </svg>
    <figcaption>A client sends a request; a service processes it and returns a response. This illustrates an application exchange, rather than individual network packets.</figcaption>
  </figure>
}

export function CourseworkExperience() {
  const groups = [
    {kind: 'systems' as const, label: 'Data & runtime', courses: softwareFoundation.systemsCourses, number: 3},
    {kind: 'network' as const, label: 'Communication & trust', courses: softwareFoundation.connectedCourses.slice(0,2), number: 5},
    {kind: 'web' as const, label: 'The connected application', courses: softwareFoundation.connectedCourses.slice(2), number: 7},
  ]

  return <section className={styles.coursework} id="coursework" aria-labelledby="foundation-coursework-title">
    <header className={styles.opening}>
      <p className={styles.meta}>Completed coursework / Computer Science</p>
      <h4 id="foundation-coursework-title"><span>Computer Science</span><span>Coursework<span className={styles.period}>.</span></span></h4>
      <p className={styles.openingContext}>Designing software. Understanding the systems underneath. Connecting it all.</p>
      <div className={styles.disciplineAxis} aria-hidden="true"><span>Design</span><span>Systems</span><span>Connection</span><i /></div>
    </header>

    <section className={styles.engineeringSequence} id="foundation-design-title" aria-label="Software Engineering I and II">
      <div className={styles.sequenceCopy}>
        <p className={styles.chapterLabel}>01 — From structure to correctness</p>
        {softwareFoundation.designCourses.map((course,index) => <CourseText course={course} number={`0${index+1}`} key={course.name} />)}
      </div>
      <figure className={styles.designFigure}>
        <div className={styles.figureTop}><span className={styles.meta}>Concept illustration</span><span className={styles.diagramIndex}>I ↔ II</span></div>
        <div className={styles.designLegend}><span>Design relationships</span><span>Verification</span></div>
        <DesignIllustration />
        <figcaption>Design defines the relationships. Verification examines behavior, reliability, and change in the same structure.</figcaption>
      </figure>
    </section>

    <section className={styles.landscape} id="foundation-connected-courses" aria-label="Systems and connected computing coursework">
      <span className={styles.anchor} id="foundation-data-concept-title" aria-hidden="true" /><span className={styles.anchor} id="foundation-query-result" aria-hidden="true" /><span className={styles.anchor} id="foundation-data-course-heading" aria-hidden="true" />
      <header className={styles.landscapeOpening}><p className={styles.chapterLabel}>02 — Underneath the application</p><p>Data, resources, communication, and the boundaries between systems.</p></header>
      {groups.map(group => <section className={styles.subjectBand} data-subject={group.kind} key={group.kind} aria-label={group.label}>
        <div className={styles.subjectVisual}><p className={styles.subjectLabel}>{group.label}</p><ConceptGlyph kind={group.kind} /><span className={styles.illustrationNote}>Illustrative relationships</span></div>
        <div className={styles.subjectCourses}>{group.courses.map((course,index) => <CourseText course={course} number={`0${group.number+index}`} key={course.name} />)}</div>
      </section>)}
      <RequestIllustration />
    </section>
  </section>
}
