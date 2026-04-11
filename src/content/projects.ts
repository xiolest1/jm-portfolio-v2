export type Project = {
  id: string
  title: string
  role: string
  year: string
  stack: string[]
  summary: string
  /** Public path under `public/` (e.g. `/projects/photo.png`) */
  image?: string
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'pokedex',
    title: 'Pokédex site',
    role: 'Solo project',
    year: '2024',
    stack: ['HTML', 'CSS', 'JavaScript', 'PokeAPI'],
    summary:
      'A responsive Pokédex web app that integrates with PokeAPI to display 898+ Pokémon, with dynamic UI animations, responsive mobile/desktop views, stat visualization, and evolution chains.',
    image: '/projects/pokedex.png',
    links: [
      { label: 'Live demo', href: 'https://pokemon-site-nine.vercel.app/' },
      { label: 'View project', href: 'https://github.com/xiolest1/pokemon-site' },
    ],
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio site (v1)',
    role: 'Solo project',
    year: '2024',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    summary:
      'A modern, interactive portfolio with particle effects, custom animations, and responsive design—focused on UX and simplicity.',
    image: '/projects/portfolio-v1.png',
    links: [
      { label: 'Live demo', href: 'https://portfolio-jm-rouge.vercel.app/' },
      { label: 'View project', href: 'https://github.com/xiolest1/portfolio-jm' },
    ],
  },
  {
    id: 'robot-gripper',
    title: '3D-printed robot gripper',
    role: 'Hardware + software',
    year: '2023',
    stack: ['Python', 'Arduino', 'CustomTkinter', 'PySerial'],
    summary:
      'Servo-controlled 3D-printed gripper with a Python GUI for real-time control via Arduino—CustomTkinter for UX and pyserial for reliable communication.',
    image: '/projects/robot-gripper.jpg',
    links: [
      { label: 'View project', href: 'https://github.com/xiolest1/Robot-Gripper' },
    ],
  },
  {
    id: 'rc-detection',
    title: 'RC detection system',
    role: 'Computer vision + embedded',
    year: '2023',
    stack: ['Python', 'Arduino', 'OpenCV', 'NumPy'],
    summary:
      'Autonomous RC vehicle stack using computer vision: camera calibration, real-time detection (ORB, SIFT, AKAZE), and Arduino motor control for tracking and navigation.',
    image: '/projects/rc-detection.jpg',
    links: [
      { label: 'View project', href: 'https://github.com/xiolest1/RCDetection' },
    ],
  },
]
