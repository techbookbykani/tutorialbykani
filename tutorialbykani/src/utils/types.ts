// Type definitions for the tutorial website

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  author: string;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  publishedAt: string;
  tags: string[];
  featured: boolean;
  content?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  tutorialCount: number;
  icon?: string;
  color?: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface SearchFilters {
  category?: string;
  difficulty?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface TutorialProgress {
  tutorialId: string;
  progress: number;
  lastReadAt: string;
  completed: boolean;
}

export interface ReadingHistoryItem extends Tutorial {
  readAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}