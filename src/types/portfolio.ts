export interface Project {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  planetColor: string;
  ringColor: string;
  size: number;
  featured: boolean;
  metrics?: string;
  description: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Languages' | 'AI & Data';
  level: number; // 1-100
  iconName: string;
  description: string;
  connections: string[]; // Skill IDs connected in constellation
  position: [number, number, number];
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  role: string;
  organization: string;
  description: string;
  achievements: string[];
  crystalType: 'diamond' | 'octahedron' | 'icosahedron';
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  description: string;
  color: string;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  commits: number;
  url: string;
  color: string;
}

export interface SectionInfo {
  id: string;
  title: string;
  subtitle: string;
  chapter: number;
}
