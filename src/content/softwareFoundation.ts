// Skills are résumé-backed; FastAPI and DynamoDB Local are additionally
// verified in the current HireFlux implementation. Category emphasis expresses
// engineering direction, not proficiency or production deployment.
// Completed coursework was identified by Joan. Catalog descriptions provide
// context; program requirements alone do not establish individual completion.
export const softwareFoundation = {
  languages: ['Python', 'TypeScript', 'JavaScript', 'Java', 'SQL'],
  frontend: ['React', 'HTML5', 'CSS3'],
  backend: ['FastAPI', 'Flask', 'REST APIs', 'Node.js'],
  databases: [
    { name: 'PostgreSQL', context: '' },
    { name: 'DynamoDB', context: '' },
    { name: 'MySQL', context: '' },
  ],
  cloudDevelopment: [
    { name: 'AWS', context: 'Cloud architecture knowledge' },
    { name: 'Docker', context: 'Containerized development' },
  ],
  tools: ['Linux', 'Git'],
  softwareCourses: [
    { name: 'Software Engineering I', context: 'Software design, architectures & patterns.' },
    { name: 'Software Engineering II', context: 'Reliability, testing & maintenance.' },
  ],
  foundationCourses: [
    { name: 'Database Systems', context: 'Data organization & database design.' },
    { name: 'Operating Systems', context: 'Processes, memory & synchronization.' },
    { name: 'Computer Networks', context: 'Internet protocols & layered networks.' },
    { name: 'Computer Security', context: '' },
    { name: 'Internet Computing', context: 'Client & server-side web programming.' },
    { name: 'Web Services', context: 'Service integration & REST architecture.' },
  ],
}
