export type CategoryFilter = 'ALL' | 'WEB' | 'SYSTEMS' | 'AI';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  category: 'WEB' | 'SYSTEMS' | 'AI';
  tags: string[];
  metrics: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured?: boolean;
  highlights?: string[];
  gradient: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'Languages' | 'Frameworks' | 'Systems' | 'Tools';
  level: number; // 1-100
  x: number; // percentage in graph canvas
  y: number; // percentage in graph canvas
  iconName?: string;
  connections: string[]; // IDs of connected skills
  description: string;
  color: string;
}

export interface TerminalEntry {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  content: string | React.ReactNode;
  timestamp?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  verificationUrl: string;
  category: 'CLOUD' | 'AI' | 'WEB' | 'SYSTEMS';
  tags: string[];
  description: string;
  skillsVerified: string[];
  gradient: string;
}

export type ThemeMode = 'light' | 'dark' | 'cyberpunk';

export type PanelId = 'hero' | 'skills' | 'projects' | 'terminal';
