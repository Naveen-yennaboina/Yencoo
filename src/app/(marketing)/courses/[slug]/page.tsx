import { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { CurriculumPreview, PreviewModule } from "@/features/discovery/components/CurriculumPreview";
import { AICompanionPreview } from "@/features/discovery/components/AICompanionPreview";
import { ReviewSection, Review } from "@/features/discovery/components/ReviewSection";
import { CourseCard } from "@/features/discovery/components/CourseCard";
import { Clock, BarChart, Globe, CheckCircle2, PlayCircle, ShieldCheck } from "lucide-react";
import { db as prisma } from "@/lib/db";
import { serializeDecimals } from "@/lib/serializers/decimal";
import { notFound } from "next/navigation";

// Mock Modules since Lesson CRUD is not yet implemented
const MOCK_MODULES: PreviewModule[] = [
  {
    id: "m1",
    title: "1. Introduction to the Course",
    lessons: [
      { id: "l1", title: "Welcome to the Course", type: "VIDEO", durationStr: "03:45", isPreview: true },
      { id: "l2", title: "Prerequisites", type: "TEXT", durationStr: "5 min read", isPreview: true },
    ]
  }
];

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    user: { name: "Sarah Jenkins", avatar: undefined },
    rating: 5,
    comment: "Absolutely phenomenal course. The pacing is perfect and the projects are highly relevant to modern web development.",
    createdAt: "2026-07-15T10:00:00Z"
  }
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findFirst({
    where: { slug, status: "PUBLISHED", deletedAt: null }
  });

  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.seoTitle || course.title} | Yencoo`,
    description: course.seoDescription || course.description?.substring(0, 160) || "",
    openGraph: {
      title: course.seoTitle || course.title,
      description: course.seoDescription || course.description?.substring(0, 160) || "",
      type: "website",
    }
  };
}

export default async function CourseDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const courseRaw = await prisma.course.findFirst({
    where: { slug, status: "PUBLISHED", deletedAt: null },
    include: {
      category: true,
    }
  });

  const course = serializeDecimals(courseRaw);

  if (!course) {
    notFound();
  }

  // Fetch related courses in same category
  const relatedCoursesRaw = await prisma.course.findMany({
    where: {
      categoryId: course.categoryId,
      id: { not: course.id },
      status: "PUBLISHED",
      deletedAt: null
    },
    include: { category: true },
    take: 4
  });

  const relatedCourses = serializeDecimals(relatedCoursesRaw);

  const price = course.price ? Number(course.price) : 0;
  const isFree = price === 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-muted border-b border-border py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                {course.category && (
                  <Badge variant="secondary">{course.category.name}</Badge>
                )}
                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">Bestseller</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                {course.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <Rating value={4.8} className="text-yellow-400" />
                  <span className="text-muted-foreground">(342 reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <BarChart className="h-4 w-4" /> {course.difficultyLevel.toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase())}
                </div>
                {(course.estimatedAudioDuration || course.estimatedReadingTime) && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="h-4 w-4" /> {course.estimatedAudioDuration || course.estimatedReadingTime}h
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Globe className="h-4 w-4" /> English
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pl-10">
              <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden sticky top-24">
                <div className="aspect-video bg-muted relative flex items-center justify-center border-b border-border group cursor-pointer">
                  {course.thumbnailUrl ? (
                     <Image
                       src={course.thumbnailUrl}
                       alt={course.title}
                       fill
                       className="object-cover"
                     />
                  ) : (
                    <>
                      <PlayCircle className="h-16 w-16 text-primary opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-10" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-0" />
                    </>
                  )}
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">
                      {isFree ? <span className="text-emerald-500">Free</span> : `$${price.toFixed(2)}`}
                    </span>
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
            
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">What you'll learn</h2>
                <div className="grid sm:grid-cols-2 gap-4 p-6 bg-muted/30 rounded-lg border border-border/50">
                  {course.learningOutcomes.map((outcome: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Curriculum Preview */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Course Content</h2>
              <CurriculumPreview modules={MOCK_MODULES} />
            </section>

            {/* AI Companion Preview */}
            {course.aiExplanationEnabled && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">AI Enhanced Learning</h2>
                <AICompanionPreview />
              </section>
            )}

            {course.requirements && course.requirements.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {course.requirements.map((req: string, idx: number) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Reviews */}
            <section className="space-y-6">
              <ReviewSection 
                averageRating={4.8} 
                totalReviews={342} 
                reviews={MOCK_REVIEWS} 
              />
            </section>

          </div>
        </div>
      </Container>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <div className="border-t border-border bg-muted/20 py-16">
          <Container>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold tracking-tight">Students also bought</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedCourses.map((rc: any) => (
                  <div key={rc.id} className="h-[360px]">
                    <CourseCard course={rc} />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
