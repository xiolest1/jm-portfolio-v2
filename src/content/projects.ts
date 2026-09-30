export const hireFlux = {
  id: 'project-hireflux',
  title: 'HireFlux',
  type: 'Personal project',
  status: 'Local demo · AWS infrastructure not deployed',
  summary:
    'A candidate workspace that turns recorded applications, interviews, and next steps into a focused Action Center without disguising missing information as certainty.',
  image: '/projects/hireflux-home-light.png',
  imageAlt:
    'Light-mode HireFlux Action Center in a fictional local demo, with recorded commitments separated from a stage-age suggestion.',
  stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'DynamoDB Local'],
  signals: [
    'Server-derived actions with explicit uncertainty',
    'Owner-scoped data access',
    'Concurrency handling and idempotency',
    'Validation and automated tests',
  ],
  repository: 'https://github.com/xiolest1/HireFlux',
  caseStudy: '/hireflux',
}

export const libraryProject = {
  id: 'project-library',
  title: 'Library Web Application',
  type: 'Team project',
  summary:
    'A book-management application with search, saved lists, authentication, and role-based access.',
  contribution:
    'Backend APIs, PostgreSQL and SQLAlchemy data work, session authentication and roles, and Docker setup.',
  stack: ['Flask', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
  repository: 'https://github.com/xiolest1/library-app',
}

export const rcProject = {
  id: 'project-rcdetection',
  title: 'Autonomous RC Vehicle',
  type: 'Team project',
  summary:
    'A computer-vision system that tracks a target and communicates steering and motor commands to an RC vehicle.',
  contribution:
    'Camera calibration, feature matching and positional analysis, with Arduino serial control.',
  stack: ['Python', 'OpenCV', 'NumPy', 'PySerial', 'Arduino'],
  image: '/projects/rc-detection.jpg',
  imageAlt: 'RC vehicle used in the computer-vision and control project.',
  repository: 'https://github.com/xiolest1/RCDetection',
}
