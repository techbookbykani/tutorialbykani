// Utility functions for the tutorial website

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get difficulty color class
 */
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'green';
    case 'intermediate':
      return 'orange';
    case 'advanced':
      return 'red';
    default:
      return 'gray';
  }
};

/**
 * Calculate estimated reading time based on word count
 */
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
};

/**
 * Generate excerpt from content
 */
export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  const plainText = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
};

/**
 * Slugify a string for URL use
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

/**
 * Capitalize first letter of each word
 */
export const titleCase = (text: string): string => {
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Filter tutorials by category
 */
export const filterTutorialsByCategory = (tutorials: any[], category: string): any[] => {
  return tutorials.filter(tutorial => 
    tutorial.category.toLowerCase() === category.toLowerCase()
  );
};

/**
 * Filter tutorials by difficulty
 */
export const filterTutorialsByDifficulty = (tutorials: any[], difficulty: string): any[] => {
  return tutorials.filter(tutorial => 
    tutorial.difficulty.toLowerCase() === difficulty.toLowerCase()
  );
};

/**
 * Search tutorials by title or description
 */
export const searchTutorials = (tutorials: any[], query: string): any[] => {
  const lowercaseQuery = query.toLowerCase();
  return tutorials.filter(tutorial => 
    tutorial.title.toLowerCase().includes(lowercaseQuery) ||
    tutorial.description.toLowerCase().includes(lowercaseQuery) ||
    tutorial.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * Sort tutorials by date (newest first)
 */
export const sortTutorialsByDate = (tutorials: any[]): any[] => {
  return [...tutorials].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

/**
 * Get featured tutorials
 */
export const getFeaturedTutorials = (tutorials: any[]): any[] => {
  return tutorials.filter(tutorial => tutorial.featured);
};

/**
 * Get related tutorials based on tags
 */
export const getRelatedTutorials = (
  tutorials: any[], 
  currentTutorial: any, 
  limit: number = 3
): any[] => {
  const currentTags = currentTutorial.tags || [];
  
  const related = tutorials
    .filter(tutorial => tutorial.id !== currentTutorial.id)
    .map(tutorial => ({
      ...tutorial,
      matchCount: tutorial.tags.filter((tag: string) => 
        currentTags.includes(tag)
      ).length
    }))
    .filter(tutorial => tutorial.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit);

  return related;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce function for search
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * Local storage helpers
 */
export const storage = {
  get: (key: string): any => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: any): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Handle storage errors silently
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
};

/**
 * Get tutorial progress (for future implementation)
 */
export const getTutorialProgress = (tutorialId: string): number => {
  const progress = storage.get(`tutorial_progress_${tutorialId}`);
  return progress || 0;
};

/**
 * Save tutorial progress (for future implementation)
 */
export const saveTutorialProgress = (tutorialId: string, progress: number): void => {
  storage.set(`tutorial_progress_${tutorialId}`, progress);
};

/**
 * Get reading history (for future implementation)
 */
export const getReadingHistory = (): any[] => {
  return storage.get('reading_history') || [];
};

/**
 * Add to reading history (for future implementation)
 */
export const addToReadingHistory = (tutorial: any): void => {
  const history = getReadingHistory();
  const existingIndex = history.findIndex(item => item.id === tutorial.id);
  
  if (existingIndex !== -1) {
    history.splice(existingIndex, 1);
  }
  
  history.unshift({
    ...tutorial,
    readAt: new Date().toISOString()
  });
  
  // Keep only last 20 items
  storage.set('reading_history', history.slice(0, 20));
};