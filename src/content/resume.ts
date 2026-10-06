export type Education = {
  degree: string
  abbreviation: string
  school: string
  completed: string
  completedOn: string
}

export type Experience = {
  title: string
  company: string
  period: string
  summary: string
  contributionLabel: string
  contribution: string
}

export type Certification = {
  name: string
  completed: string
  completedOn: string
  link: string
}

export const education: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    abbreviation: 'B.S.',
    school: 'Montclair State University',
    completed: 'May 2025',
    completedOn: '2025-05',
  },
  {
    degree: 'Associate of Science in Computer Science',
    abbreviation: 'A.S.',
    school: 'Bergen Community College',
    completed: 'August 2022',
    completedOn: '2022-08',
  },
]

export const experience: Experience[] = [
  {
    title: 'Office Manager',
    company: 'Integrated Counseling LCSW PLLC',
    period: 'Oct 2021 – Dec 2023',
    summary:
      'Managed scheduling, records, and coordination across internal and external providers in a high-volume office environment.',
    contributionLabel: 'Workflow improvement',
    contribution:
      'Developed an internal Python scheduling and records-management tool that replaced portions of a manual tracking workflow.',
  },
  {
    title: 'Technical Support',
    company: 'Conduent',
    period: 'Jun 2020 – Sep 2021',
    summary:
      'Diagnosed remote technical issues, identified recurring failure patterns, and refined escalation paths for complex support cases.',
    contributionLabel: 'Team collaboration',
    contribution:
      'Collaborated with technical teams to resolve recurring issues and improve troubleshooting workflow efficiency.',
  },
]

export const certifications: Certification[] = [
  {
    name: 'AWS Certified Solutions Architect – Associate',
    completed: 'June 2026',
    completedOn: '2026-06',
    link: 'https://www.credly.com/badges/bd0d1ee6-6c5c-41fd-a1bd-9bad353054b2/public_url',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    completed: 'December 2025',
    completedOn: '2025-12',
    link: 'https://www.credly.com/badges/7d78d2c9-b16f-4106-b786-109033563ae1/public_url',
  },
]
