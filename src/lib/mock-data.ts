export const MOCK_COURSES = [
  {
    id: "course_1",
    title: "Mastering React 18 & Next.js 14",
    slug: "mastering-react-nextjs",
    description: "Learn how to build production-ready full-stack applications using the latest React features and Next.js App Router.",
    thumbnailUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    status: "PUBLISHED",
    difficultyLevel: "INTERMEDIATE",
    price: 99.00,
    learningOutcomes: ["App Router", "React Server Components", "Server Actions", "Suspense"],
    estimatedReadingTime: 1200,
    instructor: {
      id: "inst_1",
      firstName: "Sarah",
      lastName: "Draskner",
      avatarUrl: "https://i.pravatar.cc/150?u=sarah"
    },
    category: {
      id: "cat_web",
      name: "Web Development"
    },
    rating: 4.8,
    studentsCount: 15420,
    lessonsCount: 42,
    progress: 35
  },
  {
    id: "course_2",
    title: "Advanced TypeScript Patterns",
    slug: "advanced-typescript",
    description: "Go beyond the basics and master advanced type manipulation, generics, and design patterns in TypeScript.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop",
    status: "PUBLISHED",
    difficultyLevel: "ADVANCED",
    price: 79.00,
    learningOutcomes: ["Generics", "Conditional Types", "Mapped Types", "Type Inference"],
    estimatedReadingTime: 800,
    instructor: {
      id: "inst_2",
      firstName: "Matt",
      lastName: "Pocock",
      avatarUrl: "https://i.pravatar.cc/150?u=matt"
    },
    category: {
      id: "cat_web",
      name: "Web Development"
    },
    rating: 4.9,
    studentsCount: 8200,
    lessonsCount: 24,
    progress: 0
  },
  {
    id: "course_3",
    title: "UI/UX Design for Developers",
    slug: "ui-ux-for-devs",
    description: "Learn the fundamentals of visual design, spacing, typography, and how to build beautiful interfaces without a designer.",
    thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    status: "PUBLISHED",
    difficultyLevel: "BEGINNER",
    price: 49.00,
    learningOutcomes: ["Typography", "Color Theory", "Spacing", "Figma Basics"],
    estimatedReadingTime: 600,
    instructor: {
      id: "inst_3",
      firstName: "Gary",
      lastName: "Simon",
      avatarUrl: "https://i.pravatar.cc/150?u=gary"
    },
    category: {
      id: "cat_design",
      name: "Design"
    },
    rating: 4.7,
    studentsCount: 12050,
    lessonsCount: 18,
    progress: 100
  }
];

export const MOCK_CATEGORIES = [
  { id: "cat_web", name: "Web Development" },
  { id: "cat_design", name: "Design" },
  { id: "cat_ai", name: "Artificial Intelligence" },
  { id: "cat_data", name: "Data Science" },
  { id: "cat_mobile", name: "Mobile Development" }
];

export const MOCK_COURSE_MODULES = [
  {
    id: "mod_1",
    courseId: "course_1",
    title: "Getting Started with Next.js 14",
    order: 1,
    lessons: [
      { id: "les_1", title: "Introduction to App Router", type: "VIDEO", duration: 600, isFree: true },
      { id: "les_2", title: "Setting up your environment", type: "VIDEO", duration: 420, isFree: true },
      { id: "les_3", title: "Routing Fundamentals", type: "TEXT", duration: 300, isFree: false }
    ]
  },
  {
    id: "mod_2",
    courseId: "course_1",
    title: "React Server Components",
    order: 2,
    lessons: [
      { id: "les_4", title: "What are Server Components?", type: "VIDEO", duration: 900, isFree: false },
      { id: "les_5", title: "Client Components vs Server Components", type: "VIDEO", duration: 750, isFree: false },
      { id: "les_6", title: "Data Fetching Strategies", type: "VIDEO", duration: 1200, isFree: false },
      { id: "les_7", title: "Knowledge Check", type: "QUIZ", duration: 300, isFree: false }
    ]
  },
  {
    id: "mod_3",
    courseId: "course_1",
    title: "Server Actions & Mutations",
    order: 3,
    lessons: [
      { id: "les_8", title: "Introduction to Server Actions", type: "VIDEO", duration: 800, isFree: false },
      { id: "les_9", title: "Form Handling", type: "VIDEO", duration: 1100, isFree: false },
      { id: "les_10", title: "Optimistic Updates", type: "VIDEO", duration: 950, isFree: false }
    ]
  }
];
