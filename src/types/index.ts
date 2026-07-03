export interface EducationalPlan {
  id: string;
  role: string;
  level: string;
  description: string;
  requirements: string[];
}

export interface LeadershipRole {
  id: string;
  title: string;
  category: 'pioneers' | 'national' | 'general';
  membersCount?: number;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

export interface CurriculumBlock {
  title: string;
  details: string;
}

export interface Curriculum {
  id: string;
  section: 'wolves' | 'boys' | 'rovers' | 'leaders'; // أشبال، فتيان، جوالة، رواد وأحباء
  title: string;
  ageGroup: string;
  badge: string;
  description: string;
  educationalGoals: string[];
  principles: string[];
  activities: CurriculumBlock[];
  motto?: string;
  promise?: string;
  law?: string[];
  progression?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'reports' | 'elections' | 'achievements' | 'projects';
  content: string;
  summary: string;
  image?: string;
  isImportant?: boolean;
}

export interface Commandment {
  id: string;
  type: string;
  period: string;
  details: string;
  rights: string[];
  procedures: string[];
}

export interface TrainingPathStep {
  id: string;
  title: string;
  level: 'basic' | 'functional' | 'advanced' | 'guides';
  duration: string;
  requirements: string[];
  description: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  date: string;
  type: string;
  downloadUrl?: string;
  content: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'admin' | 'finance' | 'organization' | 'penalties';
}

export interface ApplicationForm {
  id: string;
  title: string;
  category: string;
  instructions: string[];
  fields: {
    id: string;
    label: string;
    type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'number';
    options?: string[];
    required: boolean;
  }[];
}
