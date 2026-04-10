export const STORAGE_KEY_INTRO = 'portfolio_intro_completed'

export const site = {
  name: 'Joan Morillo',
  /** Portrait file in `public/` (replace `profile.jpg` anytime). Set `null` to hide. */
  avatar: '/profile.jpg' as string | null,
  pronunciation: 'Yo-han',
  tagline:
    'Hi there! Here you can check out what I\'m working on. Hope you enjoy it!',
  /** Set to null to hide the mailto line until you add a public address */
  email: null as string | null,
  social: [
    { label: 'GitHub', href: 'https://github.com/xiolest1' },
    /** Update to your exact public profile URL if different */
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joanmorillo/' },
  ] as const,
  bioParagraphs: [
    "Welcome to my portfolio! As mentioned above, my name is Joan (pronounced \"Yo-han\"). I've been into software development for a while now, and I'm still learning new things within the field every day.",
    'I specialize in full-stack development using a mix of my marketing background and my passion for creating interactive experiences online. My goal is to build web/desktop applications that are both functional and user-friendly, less guess work, more fun. I also like to dabble in other areas of computer science, such as game development and mobile development.',
    'I prioritize in writing clean, maintainable code to ensure long term sustainability of projects. When developing, my focus is on creating code that is not only clear to me, but also easily comprehensible to my peers.',
    "Beyond coding, I'm deeply interested in user experience design. I believe that great software should be both powerful and inclusive, accessible to users of all abilities. This philosophy guides my development process, from initial concept to final implementation.",
    "When I'm not coding, I enjoy relaxing with my dog, working out, playing video games, or going out with friends. Thank you for taking the time to check out my portfolio and reading this far!",
  ],
}
