export const siteContent = {
  site: {
    title: 'Cyvneil | Hextech Portfolio',
    brand: 'Cyvneil',
    ownerName: 'Cyvneil Gleine Enriquez',
    year: '2026',
  },
  intro: {
    label: 'Portfolio Link Established',
    initialStatus: 'INITIALIZING SIGNAL...',
    calibratingStatus: 'SYNCHRONIZING PROJECT ARCHIVE...',
    readyStatus: 'ACCESS GRANTED',
  },
  marquee: {
    items: [
      'React',
      'Next.js',
      'Vue.js',
      'TypeScript',
      'Node.js',
      'Express',
      'Supabase',
      'MongoDB',
      'PostgreSQL',
      'Tailwind CSS',
      'Vite',
      'Docker',
      'CI/CD',
      'Cloudinary',
      'REST APIs',
    ],
  },
  navigation: [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education and Core Stack' },
    { href: '#contact', label: 'Contact' },
  ],
  hero: {
    eyebrow: 'Full-stack dev · frontend, backend, CI/CD',
    title: {
      prefix: 'Designing',
      accent: 'Systems',
      suffix: 'People Trust',
    },
    description:
      'I build apps where the admin side has to make sense and the public side still looks good. Most of my work is inventory sites, barangay tools, and farm software — real data, real users, not just landing pages.',
    primaryCta: {
      href: '#projects',
      label: 'See my work',
    },
    secondaryCta: {
      href: '#contact',
      label: 'Get in touch',
    },
  },
  about: {
    heading: 'What I Build',
    cards: [
      {
        title: 'Robust Full-Stack Systems',
        description:
          'I design secure, efficient server-side architectures using Node.js and Express.js. I handle data management fluidly across both relational and non-relational ecosystems, including PostgreSQL for strict relational schemas, MongoDB (via Mongoose) for document-based caching, and Supabase for rapid backend-as-a-service (BaaS) handling authentication and real-time data sync.',
      },
      {
        title: 'API Integration, Security & Authentication',
        description:
          "I don't just build isolated apps; I build connected and secure systems. I design and integrate robust RESTful APIs and handle secure user access control using JSON Web Tokens (JWT) and OAuth for role-based authentication (Admin vs. User). Additionally, I have hands-on experience connecting applications to third-party services—whether it’s integrating communication channels, mapping services, or managing cloud storage for media assets, ensuring the system is fully functional and secure against unauthorized access.",
      },
      {
        title: 'AI-Accelerated Workflow',
        description:
          "I use an AI-accelerated development workflow to fast-track debugging, optimize complex query logic, and draft robust boilerplate setups. Every single project is tracked systematically using Git and GitHub for clean branching strategies, structured commit logs, and secure version control—allowing me to deliver optimized code ahead of schedule.",
      },
      {
        title: 'Containerization & Deployment',
        description:
          "A great system needs to be consistently deployable. I utilize Docker to containerize environments, ensuring my code runs exactly the same in production as it does on my local machine. I am experienced in managing continuous deployment, custom routing, and environment safety across Cloudflare Pages, Render, and advanced serverless architectures.",
      },
    ],
  },
  projects: {
    heading: 'Projects',
    viewAllLabel: 'Like what you see? Let\'s connect!',
    viewAllHref: '#contact',
  },
  skills: {
    heading: 'Core Stack',
    description:
      'Languages and tools I use most often when building something end to end — from the UI down to the database and deploy.',
    groups: [
      {
        title: 'Languages',
        items: ['JavaScript (ES6+)', 'TypeScript', 'SQL', 'HTML/CSS', 'C', 'Java'],
      },
      {
        title: 'Backend',
        items: ['Node.js', 'Express.js', 'Supabase', 'RESTful APIs'],
      },
      {
        title: 'Frontend',
        items: ['Vue.js', 'Next.js', 'React.js', 'Bootstrap', 'Tailwind CSS'],
      },
      {
        title: 'Databases',
        items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Supabase'],
      },
      {
        title: 'Tools',
        items: [
          'Git/GitHub',
          'CI/CD',
          'Cursor',
          'Antigravity',
          'Claude',
          'ChatGPT',
          'Discord',
          'Vercel',
          'Render',
          'MongoDB Atlas',
          'Cloudinary',
        ],
      },
    ],
  },
  education: {
    heading: 'Education',
    items: [
      {
        title: 'University of San Carlos',
        subtitle: 'Bachelor of Science in Computer Engineering',
        meta: '2022 - 2026',
      },
      {
        title: 'Udemy',
        subtitle: 'The Web Developer Bootcamp 2025 by Colt Steele (75 hours)',
      },
      {
        title: 'Google',
        subtitle: 'Google UI/UX Course (30 hours)',
      },
    ],
  },
  contact: {
    heading: "Let's Connect",
    description:
      'Whether you need a robust database schema, secure API integration, responsive frontend portal, or an end-to-end web application built from scratch—I design functional, scale-ready systems that solve real-world problems. Let\'s discuss your project.',
    primaryEmail: 'cyvenriquez1@gmail.com',
    highlights: [
      {
        label: 'Capabilities',
        value: 'Full-stack development, database optimization, RESTful API design, and automated CI/CD pipelines.',
      },
      {
        label: 'Working Style',
        value: 'Practical UI/UX design, clean & maintainable code architecture, and transparent communication.',
      },
      {
        label: 'Availability',
        value: 'Based in Cebu, Philippines. Open to remote roles, contract projects, and global collaboration.',
      },
    ],
    methods: [
      { label: 'Location', value: 'Cebu City, Cebu, Philippines', href: null },
      { label: 'Phone', value: '0930 938 4064', href: 'tel:09309384064' },
      { label: 'Email', value: 'cyvenriquez1@gmail.com', href: 'mailto:cyvenriquez1@gmail.com' },
    ],
  },
  footer: {
    suffix: 'Portfolio built with React, Vite, and Tailwind.',
    signal: ['REACT', 'VITE', 'TAILWIND', 'HEXTECH UI', 'CINZEL', 'INTER'],
  },
}
