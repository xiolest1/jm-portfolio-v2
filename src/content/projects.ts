export const hireFlux = {
  id: 'project-hireflux',
  title: 'HireFlux',
  type: 'Personal project',
  status: 'Local demo · AWS infrastructure not deployed',
  summary:
    'A candidate-focused job-search workspace that connects applications with interview context, notes, follow-ups, and next actions.',
  image: '/projects/hireflux-dashboard.png',
  imageAlt:
    'HireFlux Home dashboard in a local demo workspace, showing recorded follow-ups, scheduled interviews, and next steps with fictional job data.',
  stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'DynamoDB Local'],
  signals: [
    'Backend-owned lifecycle and domain rules',
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
