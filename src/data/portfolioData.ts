import { Project, SkillNode, TimelineMilestone, Achievement, Repository, SectionInfo } from '../types/portfolio';

export const STUDENT_INFO = {
  name: "AARAV SHARMA",
  title: "Computer Science Engineer",
  subtitle: "Creative Full Stack Developer & 3D Web Enthusiast",
  bio: "Building scalable, performant digital experiences with a passion for computer graphics, full-stack architecture, and intelligent systems.",
  college: "ABC Institute of Technology",
  degree: "B.Tech Computer Science Engineering (2022 – 2026)",
  location: "New Delhi, India",
  email: "aarav.sharma.dev@example.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  resumeUrl: "#",
};

export const SKILL_NODES: SkillNode[] = [
  {
    id: "react",
    name: "React 19",
    category: "Frontend",
    level: 95,
    iconName: "Code2",
    description: "Component architecture, React Server Components, custom hooks, and state engines.",
    connections: ["nextjs", "typescript", "threejs"],
    position: [-2.5, 1.2, 0],
  },
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "Frontend",
    level: 92,
    iconName: "Layers",
    description: "App Router, SSR/SSG, API routes, middleware, and performance optimization.",
    connections: ["react", "typescript", "nodejs"],
    position: [-1.2, 2.5, -0.5],
  },
  {
    id: "threejs",
    name: "Three.js / R3F",
    category: "Frontend",
    level: 88,
    iconName: "Box",
    description: "WebGL shaders, particle systems, GLTF pipelines, and physics-based animations.",
    connections: ["react", "typescript"],
    position: [-3.5, -0.8, 0.5],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    level: 94,
    iconName: "FileCode",
    description: "Strict static typing, complex generics, AST manipulation, and modular architecture.",
    connections: ["react", "nodejs", "express"],
    position: [0, 1.8, 0],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    level: 90,
    iconName: "Server",
    description: "Event-driven runtime, asynchronous architecture, microservices, and streaming pipelines.",
    connections: ["nextjs", "express", "mongodb", "postgresql"],
    position: [1.5, 2.2, -0.2],
  },
  {
    id: "express",
    name: "Express.js",
    category: "Backend",
    level: 88,
    iconName: "Cpu",
    description: "RESTful API design, authentication middleware, rate limiting, and webhooks.",
    connections: ["nodejs", "mongodb"],
    position: [2.8, 1.0, 0.2],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Backend",
    level: 85,
    iconName: "Database",
    description: "NoSQL document design, aggregation frameworks, indexing, and transactional sessions.",
    connections: ["nodejs", "express"],
    position: [3.2, -0.5, -0.4],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Backend",
    level: 86,
    iconName: "Database",
    description: "Relational modeling, complex SQL joins, Prisma/Drizzle ORM, and query optimization.",
    connections: ["nodejs", "docker"],
    position: [1.8, -1.5, 0],
  },
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    level: 82,
    iconName: "Container",
    description: "Containerization, multi-stage builds, Docker Compose pipelines, and microservice orchestration.",
    connections: ["aws", "postgresql"],
    position: [0.5, -2.4, -0.5],
  },
  {
    id: "aws",
    name: "AWS",
    category: "DevOps",
    level: 80,
    iconName: "Cloud",
    description: "EC2, S3, Lambda, CloudFront, ECS, and Serverless deployment architectures.",
    connections: ["docker", "nodejs"],
    position: [-1.2, -2.2, 0.2],
  },
  {
    id: "python",
    name: "Python",
    category: "Languages",
    level: 88,
    iconName: "Terminal",
    description: "Data processing, Machine Learning models, FastAPI backends, and automated scripting.",
    connections: ["typescript", "aws"],
    position: [-2.8, -2.0, -0.3],
  },
  {
    id: "java",
    name: "Java & DSA",
    category: "Languages",
    level: 90,
    iconName: "Code",
    description: "Object-oriented programming, Data Structures, Algorithms, and System Design patterns.",
    connections: ["python", "typescript"],
    position: [0, -1.0, 0.5],
  }
];

export const PROJECTS: Project[] = [
  {
    id: "ai-resume-builder",
    title: "AI Resume Builder",
    subtitle: "AI-Powered Career Document Synthesizer",
    description: "Intelligent platform that generates ATS-optimized resumes with real-time score analysis, keyword matching, and custom tailored cover letters using LLMs.",
    problem: "Job seekers struggle with ATS parsers and customizing resumes for high conversion rates.",
    solution: "Integrated Gemini AI to analyze job descriptions against user profiles, suggesting real-time dynamic bullet improvements.",
    tech: ["Next.js 15", "Gemini API", "TailwindCSS", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/aaravsharma/ai-resume-builder",
    liveUrl: "https://ai-resume-demo.com",
    planetColor: "#38BDF8", // Cyan
    ringColor: "#0284C7",
    size: 1.4,
    featured: true,
    metrics: "10k+ Resumes Generated",
  },
  {
    id: "smart-campus",
    title: "Smart Attendance System",
    subtitle: "Facial Recognition & IoT Campus Management",
    description: "Computer vision powered attendance and security monitoring system engineered for college campuses with live anomaly alerts.",
    problem: "Manual attendance taking is slow, prone to proxy attendance, and difficult to audit centrally.",
    solution: "Designed a lightweight OpenCV & DeepFace pipeline connected to Edge IoT cameras with real-time WebSocket dashboard sync.",
    tech: ["Python", "OpenCV", "FastAPI", "React", "MongoDB", "WebSockets"],
    githubUrl: "https://github.com/aaravsharma/smart-campus",
    liveUrl: "https://smartcampus-demo.com",
    planetColor: "#818CF8", // Indigo
    ringColor: "#4F46E5",
    size: 1.2,
    featured: true,
    metrics: "99.4% Accuracy Rate",
  },
  {
    id: "code-mentor-ai",
    title: "Code Mentor AI",
    subtitle: "Interactive Algorithmic Tutor & Visualizer",
    description: "Real-time AI pair programmer that breaks down complex Data Structures and Algorithms into step-by-step visual execution graphs.",
    problem: "Students struggle to visualize pointer mutations and recursion stacks in complex algorithms.",
    solution: "Built a custom AST parser combined with animated Canvas nodes that render memory frames step-by-step.",
    tech: ["TypeScript", "Monaco Editor", "Gemini API", "React", "D3.js"],
    githubUrl: "https://github.com/aaravsharma/code-mentor-ai",
    liveUrl: "https://codementor-ai.com",
    planetColor: "#F43F5E", // Rose/Pink
    ringColor: "#E11D48",
    size: 1.3,
    featured: true,
    metrics: "500+ Daily Learners",
  },
  {
    id: "weather-analytics",
    title: "Weather Analytics",
    subtitle: "Global Micro-Climate Predictive Engine",
    description: "Interactive 3D weather radar visualizer rendering real-time atmospheric vectors, temperature gradients, and weather forecast models.",
    problem: "Standard weather apps show flat static charts without intuitive 3D spatial storm dynamics.",
    solution: "Implemented WebGL particle velocity fields over a 3D Earth globe with live OpenWeatherMap API feeds.",
    tech: ["Three.js", "React", "TailwindCSS", "OpenWeather API", "Chart.js"],
    githubUrl: "https://github.com/aaravsharma/weather-3d-analytics",
    liveUrl: "https://weather-3d-demo.com",
    planetColor: "#10B981", // Emerald
    ringColor: "#059669",
    size: 1.1,
    featured: false,
    metrics: "60 FPS WebGL Rendering",
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    subtitle: "Automated Personal Finance & Analytics",
    description: "Privacy-first expense analyzer that categorizes bank transactions, predicts monthly budgets, and generates financial health scores.",
    problem: "Users lack clear breakdown of recurring subscription traps and impulse spending habits.",
    solution: "Engineered local-first client database with encrypted sync and automated categorization rules.",
    tech: ["Next.js", "Recharts", "Node.js", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/aaravsharma/expense-tracker",
    liveUrl: "https://expense-demo.com",
    planetColor: "#F59E0B", // Amber
    ringColor: "#D97706",
    size: 1.0,
    featured: false,
    metrics: "$50k+ Tracked Volume",
  },
  {
    id: "portfolio-v4",
    title: "Portfolio v4 Universe",
    subtitle: "Cinematic 3D Interactive Storytelling Portfolio",
    description: "Award-winning style interactive 3D universe portfolio tracing the journey from student curiosity to production software engineer.",
    problem: "Standard resumes fail to showcase creative technical depth and spatial interaction capabilities.",
    solution: "Constructed camera flight path in Three.js with procedural stars, constellations, planets, and interactive crystals.",
    tech: ["Next.js 15", "Three.js", "React Three Fiber", "GSAP", "TailwindCSS"],
    githubUrl: "https://github.com/aaravsharma/portfolio-v4",
    liveUrl: "https://aaravsharma.dev",
    planetColor: "#EC4899", // Pink/Purple
    ringColor: "#DB2777",
    size: 1.25,
    featured: true,
    metrics: "Continuous 3D Flight Path",
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    id: "m2022",
    year: "2022",
    title: "The Spark — Enrolled B.Tech CSE",
    role: "Computer Science Student",
    organization: "ABC Institute of Technology",
    description: "Initiated formal computer science studies. Discovered C, C++, and basic web dev. Built my first line of C code and fell in love with algorithmic problem solving.",
    achievements: [
      "Top 5% in first-year engineering mathematics & algorithms",
      "Joined college Open Source & Coding Club"
    ],
    crystalType: "diamond",
    color: "#38BDF8"
  },
  {
    id: "m2023",
    year: "2023",
    title: "The Foundation — Full Stack Evolution",
    role: "Full Stack Developer",
    organization: "Self-Driven Projects",
    description: "Mastered JavaScript ES6+, React, Node.js, and MongoDB. Built over 12 projects and began solving Data Structures & Algorithms daily on LeetCode.",
    achievements: [
      "Built first production micro-SaaS application",
      "Completed 200+ LeetCode DSA questions in C++ and Java"
    ],
    crystalType: "octahedron",
    color: "#818CF8"
  },
  {
    id: "m2024",
    year: "2024",
    title: "The Breakthrough — Hackathon Champion",
    role: "Team Lead & Lead Engineer",
    organization: "National Inter-College Hackathon",
    description: "Led a 4-person developer team to 1st Place in the National Smart Campus Hackathon out of 120+ competing teams.",
    achievements: [
      "Secured 1st Prize & $2,500 Cash Award for Smart Attendance IoT System",
      "Earned AWS Certified Cloud Practitioner Certification"
    ],
    crystalType: "icosahedron",
    color: "#F43F5E"
  },
  {
    id: "m2025",
    year: "2025",
    title: "The Experience — Software Developer Intern",
    role: "Software Engineering Intern",
    organization: "TechNova Solutions",
    description: "Worked on high-concurrency microservices, reduced API latency by 35% using Redis caching, and contributed to client-side performance optimization.",
    achievements: [
      "Optimized production bundle size by 42%",
      "Engineered automated CI/CD pipelines with GitHub Actions & Docker"
    ],
    crystalType: "octahedron",
    color: "#10B981"
  },
  {
    id: "m2026",
    year: "2026",
    title: "The Horizon — Open Source & Beyond",
    role: "Open Source Contributor & Graduating Senior",
    organization: "Global Developer Community",
    description: "Graduating B.Tech CSE with honors. Active contributor to open-source developer tooling and building next-generation WebGL & AI applications.",
    achievements: [
      "500+ LeetCode problems solved with 1850+ contest rating",
      "Published 5+ NPM packages and 300+ open source commits"
    ],
    crystalType: "diamond",
    color: "#EC4899"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "hackathon",
    title: "Hackathon Winner",
    value: "1st Place",
    subtitle: "National Smart Campus Hackathon 2024",
    icon: "Trophy",
    description: "Built an IoT + Facial Recognition Attendance Engine in 36 continuous hours, outperforming 120+ teams.",
    color: "#F59E0B"
  },
  {
    id: "leetcode",
    title: "LeetCode Mastery",
    value: "500+",
    subtitle: "Problems Solved | Knight Rank",
    icon: "Code2",
    description: "Top 8% global rating in competitive programming contests with deep mastery of Graphs, Dynamic Programming, and Trees.",
    color: "#38BDF8"
  },
  {
    id: "github",
    title: "GitHub Contributions",
    value: "300+",
    subtitle: "Commits in 2025-2026",
    icon: "GitCommit",
    description: "Consistent daily coding habit across personal repositories, client projects, and open source libraries.",
    color: "#818CF8"
  },
  {
    id: "aws",
    title: "AWS Certified",
    value: "Certified",
    subtitle: "Cloud Practitioner",
    icon: "CloudCheck",
    description: "Validated expertise in AWS core services, VPC networking, IAM security, S3 storage, and serverless Lambda architecture.",
    color: "#10B981"
  }
];

export const REPOSITORIES: Repository[] = [
  {
    id: "repo1",
    name: "ai-resume-builder",
    description: "ATS-friendly AI resume parser and generator powered by Gemini API and Next.js 15.",
    language: "TypeScript",
    stars: 124,
    forks: 38,
    commits: 112,
    url: "https://github.com/aaravsharma/ai-resume-builder",
    color: "#3178C6"
  },
  {
    id: "repo2",
    name: "smart-campus-iot",
    description: "Facial recognition and IoT student attendance tracking backend built with FastAPI & OpenCV.",
    language: "Python",
    stars: 89,
    forks: 21,
    commits: 84,
    url: "https://github.com/aaravsharma/smart-campus-iot",
    color: "#3572A5"
  },
  {
    id: "repo3",
    name: "code-mentor-ai",
    description: "Interactive execution visualizer for Data Structures and Algorithms with AI hints.",
    language: "TypeScript",
    stars: 210,
    forks: 45,
    commits: 156,
    url: "https://github.com/aaravsharma/code-mentor-ai",
    color: "#3178C6"
  },
  {
    id: "repo4",
    name: "react-3d-universe-template",
    description: "Starter kit for cinematic Three.js + React Three Fiber interactive portfolio websites.",
    language: "JavaScript",
    stars: 340,
    forks: 92,
    commits: 68,
    url: "https://github.com/aaravsharma/react-3d-universe-template",
    color: "#F7DF1E"
  }
];

export const CHAPTERS: SectionInfo[] = [
  { id: "spark", title: "THE SPARK", subtitle: "Genesis & Identity", chapter: 1 },
  { id: "beginning", title: "THE BEGINNING", subtitle: "Curiosity & Problem Solving", chapter: 2 },
  { id: "skills", title: "CONSTELLATIONS", subtitle: "Skills & Tech Network", chapter: 3 },
  { id: "projects", title: "PROJECT GALAXY", subtitle: "Exploration of Planets", chapter: 4 },
  { id: "timeline", title: "THE JOURNEY", subtitle: "Timeline & Milestones", chapter: 5 },
  { id: "achievements", title: "CRYSTALS OF GLORY", subtitle: "Achievements & Credentials", chapter: 6 },
  { id: "open-source", title: "OPEN SOURCE", subtitle: "Repositories & Systems", chapter: 7 },
  { id: "contact", title: "THE PORTAL", subtitle: "Contact & Collaboration", chapter: 8 }
];
