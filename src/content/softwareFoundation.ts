// Skills come from Joan's current résumé. FastAPI is additionally verified in
// HireFlux. Listing AWS services describes knowledge, not deployed project work.
// Completed courses were confirmed by Joan. Learning summaries describe course
// scope, not individual assignments, outcomes, or proficiency.
// Course context: https://www.catalog.montclair.edu/coursesaz/csit/csit.pdf
// Keep Joan's confirmed historical course names rather than current catalog names.
export const softwareFoundation = {
  languages: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  backend: ['FastAPI', 'Flask', 'Node.js', 'REST APIs'],
  frontend: ['React', 'HTML5', 'CSS3'],
  databases: ['PostgreSQL', 'MySQL', 'DynamoDB'],
  tools: ['Git', 'Linux'],
  cloudServices: [
    { label: 'Compute', technologies: ['Lambda', 'EC2'] },
    { label: 'Data & storage', technologies: ['DynamoDB', 'S3'] },
    { label: 'Access & networking', technologies: ['IAM', 'VPC', 'Route 53'] },
    { label: 'Delivery & observability', technologies: ['CloudFront', 'CloudWatch'] },
  ],
  softwareCourses: [
    {
      name: 'Software Engineering I',
      focus: 'Requirements, architecture & design patterns',
      learning: 'Studied how to turn software requirements into structured designs across the development lifecycle.',
    },
    {
      name: 'Software Engineering II',
      focus: 'Testing, reliability & maintenance',
      learning: 'Studied verification and validation techniques for building, testing, and maintaining reliable software.',
    },
  ],
  courseGroups: [
    {
      label: 'Data & systems',
      courses: [
        {
          name: 'Database Systems',
          focus: 'Schema design & data organization',
          learning: 'Studied database structures, design methods, operations, and security.',
        },
        {
          name: 'Operating Systems',
          focus: 'Processes, synchronization & memory',
          learning: 'Studied how operating systems manage resources, coordinate processes, and prevent deadlocks.',
          id: 'foundation-systems-courses',
        },
      ],
    },
    {
      label: 'Networks & security',
      courses: [
        {
          name: 'Computer Networks',
          focus: 'TCP/IP & layered networks',
          learning: 'Studied how packets travel through networks, including flow control and congestion.',
        },
        {
          name: 'Computer Security',
          focus: 'Encryption & network security',
          learning: 'Studied public-key methods and how to analyze network and Internet security.',
        },
      ],
    },
    {
      label: 'Web & services',
      courses: [
        {
          name: 'Internet Computing',
          focus: 'Client & server web programming',
          learning: 'Studied markup, JavaScript, and server-side technologies used to build websites.',
        },
        {
          name: 'Web Services',
          focus: 'REST & service integration',
          learning: 'Studied how web services and middleware connect distributed applications.',
        },
      ],
    },
  ],
}
