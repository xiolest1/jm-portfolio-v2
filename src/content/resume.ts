export type Education = {
  degree: string
  school: string
  detail?: string
}

export type Experience = {
  title: string
  company: string
  evidence: string
}

export type Certification = {
  name: string
  link: string
}

export type EngineeringEvidence = {
  label: string
  href: string
}

export type EngineeringArea = {
  name: string
  tools: string[]
  evidence: EngineeringEvidence[]
}

export const education: Education[] = [
  {
    degree: 'B.S. Computer Science',
    school: 'Montclair State University',
    detail: 'May 2025',
  },
  {
    degree: 'A.S. Computer Science',
    school: 'Bergen Community College',
  },
]

export const experience: Experience[] = [
  {
    title: 'Office Manager',
    company: 'Integrated Counseling',
    evidence:
      'Built practical internal Python workflow tooling while carrying day-to-day professional responsibility.',
  },
  {
    title: 'Technical Support',
    company: 'Conduent',
    evidence:
      'Diagnosed technical issues, communicated troubleshooting steps, and used judgment to escalate cases.',
  },
]

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    link: 'https://www.credly.com/badges/bd0d1ee6-6c5c-41fd-a1bd-9bad353054b2/public_url',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    link: 'https://www.credly.com/badges/7d78d2c9-b16f-4106-b786-109033563ae1/public_url',
  },
]

export const engineeringAreas: EngineeringArea[] = [
  {
    name: 'Backend and APIs',
    tools: ['Python', 'FastAPI', 'Flask'],
    evidence: [
      { label: 'HireFlux', href: '/hireflux' },
      { label: 'Library', href: '#project-library' },
    ],
  },
  {
    name: 'Full-stack applications',
    tools: ['React', 'TypeScript', 'Vite'],
    evidence: [{ label: 'HireFlux', href: '/hireflux' }],
  },
  {
    name: 'Data and persistence',
    tools: ['DynamoDB Local', 'PostgreSQL', 'SQLAlchemy'],
    evidence: [
      { label: 'HireFlux', href: '/hireflux' },
      { label: 'Library', href: '#project-library' },
    ],
  },
  {
    name: 'Computer vision and control',
    tools: ['OpenCV', 'NumPy', 'PySerial'],
    evidence: [{ label: 'RCDetection', href: '#project-rcdetection' }],
  },
  {
    name: 'Delivery and cloud foundations',
    tools: ['Docker', 'AWS'],
    evidence: [
      { label: 'Library', href: '#project-library' },
      { label: 'AWS credentials', href: '#credentials' },
    ],
  },
]
