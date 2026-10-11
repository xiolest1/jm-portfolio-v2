export type FoundationCourse = {
  name: string
  topics: string[]
  purpose: string
  id?: string
}

// Résumé-backed skills; FastAPI is additionally verified in HireFlux.
// AWS names describe architecture knowledge, not deployed project infrastructure.
// Joan confirmed completion. Course scope is checked against Montclair's catalog:
// https://www.catalog.montclair.edu/coursesaz/csit/csit.pdf
// Historical course names are retained; summaries describe preparation,
// without attributing invented assignments or implementations to Joan.
export const softwareFoundation = {
  languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  backend: ['FastAPI', 'Flask', 'Node.js', 'REST APIs'],
  frontend: ['React', 'HTML5', 'CSS3'],
  databases: ['PostgreSQL', 'MySQL', 'DynamoDB'],
  tools: ['Git', 'Linux'],
  cloudServices: ['IAM', 'S3', 'Lambda', 'CloudWatch', 'CloudFront', 'Route 53', 'VPC', 'EC2', 'DynamoDB'],
  designCourses: [
    { name: 'Software Engineering I', topics: ['Requirements', 'Architecture', 'Design patterns'], purpose: 'From a specification to software design.' },
    { name: 'Software Engineering II', topics: ['Verification & testing', 'Reliability', 'Maintenance'], purpose: 'Checking behavior as software changes.' },
  ] satisfies FoundationCourse[],
  systemsCourses: [
    { name: 'Database Systems', topics: ['Schema design', 'Database operations'], purpose: 'Consistent data storage and retrieval.' },
    { name: 'Operating Systems', topics: ['Processes & memory', 'Synchronization', 'Deadlocks'], purpose: 'Coordinating work and shared resources.', id: 'foundation-systems-courses' },
  ] satisfies FoundationCourse[],
  connectedCourses: [
    { name: 'Computer Networks', topics: ['TCP/IP', 'Network layers', 'Packet flow'], purpose: 'How connected systems communicate.' },
    { name: 'Computer Security', topics: ['Encryption', 'Public-key methods', 'Network security'], purpose: 'Protection and trust in connected systems.' },
    { name: 'Internet Computing', topics: ['Markup & JavaScript', 'Server-side programming'], purpose: 'Connecting browser behavior with server logic.' },
    { name: 'Web Services', topics: ['REST', 'Middleware', 'Service integration'], purpose: 'Interfaces between independent applications.' },
  ] satisfies FoundationCourse[],
}
