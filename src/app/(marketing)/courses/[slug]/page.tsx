import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { CurriculumPreview, PreviewModule } from "@/features/discovery/components/CurriculumPreview";
import { AICompanionPreview } from "@/features/discovery/components/AICompanionPreview";
import { ReviewSection, Review } from "@/features/discovery/components/ReviewSection";
import { CourseCard, CourseCardData } from "@/features/discovery/components/CourseCard";
import { Clock, BarChart, Globe, CheckCircle2, PlayCircle, ShieldCheck } from "lucide-react";

// Mock Data for the course details
const COURSE_DETAILS = {
  id: "1",
  title: "Next.js 15 Masterclass: App Router to Production",
  description: "Master the modern React framework. Build, optimize, and deploy scalable web applications using the new App Router, Server Components, Server Actions, and Tailwind CSS. This comprehensive course takes you from fundamentals to advanced production patterns.",
  price: 99.99,
  difficulty: "Intermediate",
  duration: "7h 30m",
  language: "English",
  rating: 4.8,
  reviewCount: 342,
  thumbnailUrl: null,
  outcomes: [
    "Build full-stack applications with Next.js 15 App Router",
    "Master Server Components and Server Actions",
    "Implement robust authentication and authorization",
    "Optimize Core Web Vitals and SEO performance",
    "Deploy scalable applications to edge infrastructure"
  ],
  requirements: [
    "Solid understanding of React fundamentals",
    "Familiarity with modern JavaScript (ES6+)",
    "Basic knowledge of Tailwind CSS is helpful but not required"
  ]
};

const MOCK_MODULES: PreviewModule[] = [
  {
    id: "m1",
    title: "1. Introduction to Next.js 15",
    lessons: [
      { id: "l1", title: "Welcome to the Course", type: "VIDEO", durationStr: "03:45", isPreview: true },
      { id: "l2", title: "App Router vs Pages Router", type: "TEXT", durationStr: "5 min read", isPreview: true },
      { id: "l3", title: "Project Setup & Architecture", type: "VIDEO", durationStr: "12:30", isPreview: false },
    ]
  },
  {
    id: "m2",
    title: "2. Routing & Navigation",
    lessons: [
      { id: "l4", title: "Defining Routes & Pages", type: "VIDEO", durationStr: "15:20", isPreview: false },
      { id: "l5", title: "Layouts & Templates", type: "VIDEO", durationStr: "18:10", isPreview: false },
      { id: "l6", title: "Dynamic Routing", type: "VIDEO", durationStr: "14:05", isPreview: false },
    ]
  },
  {
    id: "m3",
    title: "3. Data Fetching & Mutations",
    lessons: [
      { id: "l7", title: "Server Components (RSC)", type: "VIDEO", durationStr: "22:15", isPreview: false },
      { id: "l8", title: "Server Actions", type: "VIDEO", durationStr: "25:40", isPreview: false },
      { id: "l9", title: "Caching & Revalidation", type: "TEXT", durationStr: "10 min read", isPreview: false },
    ]
  }
];

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    user: { name: "Sarah Jenkins", avatar: undefined },
    rating: 5,
    comment: "Absolutely phenomenal course. The explanation of Server Components finally made it click for me. The pacing is perfect and the projects are highly relevant to modern web development.",
    createdAt: "2026-07-15T10:00:00Z"
  },
  {
    id: "r2",
    user: { name: "David Chen", avatar: undefined },
    rating: 4.5,
    comment: "Great deep dive into Next.js 15. I especially loved the section on Server Actions and optimistic UI updates. Only wish there was a bit more on testing.",
    createdAt: "2026-07-02T14:30:00Z"
  }
];

const RELATED_COURSES: CourseCardData[] = [
  {
    id: "c1",
    slug: "react-server-components",
    title: "Deep Dive: React Server Components",
    difficultyLevel: "ADVANCED",
    estimatedAudioDuration: 180,
    aiExplanationEnabled: true,
    thumbnailUrl: null,
    category: { name: "Programming" },
    price: 49.99,
    rating: 4.9,
    reviewCount: 120
  },
  {
    id: "c2",
    slug: "tailwind-mastery",
    title: "Tailwind CSS Mastery",
    difficultyLevel: "BEGINNER",
    estimatedAudioDuration: 240,
    aiExplanationEnabled: false,
    thumbnailUrl: null,
    category: { name: "Design" },
    price: 39.99,
    rating: 4.7,
    reviewCount: 450
  }
];

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // In a real app, fetch course by slug
  return {
    title: `${COURSE_DETAILS.title} | Yencoo`,
    description: COURSE_DETAILS.description.substring(0, 160),
    openGraph: {
      title: COURSE_DETAILS.title,
      description: COURSE_DETAILS.description.substring(0, 160),
      type: "website",
    }
  };
}

export default function CourseDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-muted border-b border-border py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Programming</Badge>
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">Bestseller</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                {COURSE_DETAILS.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {COURSE_DETAILS.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <Rating value={COURSE_DETAILS.rating} className="text-yellow-400" />
                  <span className="text-muted-foreground">({COURSE_DETAILS.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <BarChart className="h-4 w-4" /> {COURSE_DETAILS.difficulty}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" /> {COURSE_DETAILS.duration}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Globe className="h-4 w-4" /> {COURSE_DETAILS.language}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-10">
              <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden sticky top-24">
                <div className="aspect-video bg-muted relative flex items-center justify-center border-b border-border group cursor-pointer">
                  {/* Thumbnail Placeholder */}
                  <PlayCircle className="h-16 w-16 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">${COURSE_DETAILS.price}</span>
                  </div>
                  <div className="space-y-3">
                    <Button size="lg" className="w-full text-base font-semibold h-12">Enroll Now</Button>
                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5" /> 30-Day Money-Back Guarantee
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            
            {/* Learning Outcomes */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">What you'll learn</h2>
              <div className="grid sm:grid-cols-2 gap-4 p-6 bg-muted/30 rounded-lg border border-border/50">
                {COURSE_DETAILS.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum Preview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Course Content</h2>
              <CurriculumPreview modules={MOCK_MODULES} />
            </section>

            {/* AI Companion Preview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">AI Enhanced Learning</h2>
              <AICompanionPreview />
            </section>

            {/* Requirements */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Requirements</h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {COURSE_DETAILS.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </section>

            {/* Reviews */}
            <section className="space-y-6">
              <ReviewSection 
                averageRating={COURSE_DETAILS.rating} 
                totalReviews={COURSE_DETAILS.reviewCount} 
                reviews={MOCK_REVIEWS} 
              />
            </section>

          </div>
        </div>
      </Container>

      {/* Related Courses */}
      <div className="border-t border-border bg-muted/20 py-16">
        <Container>
          <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Students also bought</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RELATED_COURSES.map(course => (
                <div key={course.id} className="h-[360px]">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
