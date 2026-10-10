export type FoundationCourse = {
  name: string
  concepts: string
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
    { name: 'Software Engineering I', concepts: 'Requirements, architecture, and design patterns', purpose: 'turning a specification into a coherent software design.' },
    { name: 'Software Engineering II', concepts: 'Verification, testing, reliability, and maintenance', purpose: 'checking behavior as software changes.' },
  ] satisfies FoundationCourse[],
  systemsCourses: [
    { name: 'Database Systems', concepts: 'Schema design and database operations', purpose: 'organizing data for consistent storage and retrieval.' },
    { name: 'Operating Systems', concepts: 'Processes, memory, synchronization, and deadlocks', purpose: 'coordinating work and shared resources.', id: 'foundation-systems-courses' },
  ] satisfies FoundationCourse[],
  connectedCourses: [
    { name: 'Computer Networks', concepts: 'TCP/IP, network layers, and packet flow', purpose: 'understanding how connected systems communicate.' },
    { name: 'Computer Security', concepts: 'Encryption, public-key methods, and network security', purpose: 'reasoning about protection and trust.' },
    { name: 'Internet Computing', concepts: 'Markup, JavaScript, and server-side programming', purpose: 'connecting browser behavior with server logic.' },
    { name: 'Web Services', concepts: 'REST, middleware, and service integration', purpose: 'connecting independent applications through interfaces.' },
  ] satisfies FoundationCourse[],
}
