export interface CourseCategory {
  id: string;
  name: string;
}

export interface CourseInstructor {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  price?: number;
  learningOutcomes: string[];
  estimatedReadingTime?: number;
  instructor: CourseInstructor;
  category: CourseCategory;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
  progress?: number;
}
