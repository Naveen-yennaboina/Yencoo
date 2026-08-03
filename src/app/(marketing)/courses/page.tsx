import { Container } from "@/components/ui/Container";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { CourseCard, CourseCardData } from "@/features/discovery/components/CourseCard";
import { CourseFilters } from "@/features/discovery/components/CourseFilters";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/Pagination";

// Mock data for the catalog
const MOCK_COURSES: CourseCardData[] = [
  {
    id: "1",
    slug: "nextjs-masterclass",
    title: "Next.js 15 Masterclass: App Router to Production",
    thumbnailUrl: null,
    difficultyLevel: "INTERMEDIATE",
    estimatedAudioDuration: 420,
    aiExplanationEnabled: true,
    category: { name: "Programming" },
    rating: 4.8,
    reviewCount: 342,
    price: 99.99,
  },
  {
    id: "2",
    slug: "aws-cloud-architect",
    title: "AWS Cloud Architect Certification Prep",
    thumbnailUrl: null,
    difficultyLevel: "ADVANCED",
    estimatedAudioDuration: 1200,
    aiExplanationEnabled: true,
    category: { name: "Cloud & DevOps" },
    rating: 4.9,
    reviewCount: 890,
    price: 149.00,
  },
  {
    id: "3",
    slug: "intro-to-python",
    title: "Introduction to Python Programming",
    thumbnailUrl: null,
    difficultyLevel: "BEGINNER",
    estimatedAudioDuration: 300,
    aiExplanationEnabled: false,
    category: { name: "Programming" },
    rating: 4.5,
    reviewCount: 156,
    price: 0,
  },
  {
    id: "4",
    slug: "ai-prompt-engineering",
    title: "AI Prompt Engineering for Developers",
    thumbnailUrl: null,
    difficultyLevel: "BEGINNER",
    estimatedAudioDuration: 180,
    aiExplanationEnabled: true,
    category: { name: "Artificial Intelligence" },
    rating: 4.7,
    reviewCount: 420,
    price: 49.99,
  },
  {
    id: "5",
    slug: "system-design-interview",
    title: "Cracking the System Design Interview",
    thumbnailUrl: null,
    difficultyLevel: "ADVANCED",
    estimatedAudioDuration: 600,
    aiExplanationEnabled: true,
    category: { name: "Programming" },
    rating: 4.9,
    reviewCount: 2100,
    price: 199.00,
  },
  {
    id: "6",
    slug: "ui-ux-fundamentals",
    title: "UI/UX Design Fundamentals",
    thumbnailUrl: null,
    difficultyLevel: "BEGINNER",
    estimatedAudioDuration: 240,
    aiExplanationEnabled: false,
    category: { name: "Design" },
    rating: 4.6,
    reviewCount: 89,
    price: 79.99,
  },
];

export const metadata = {
  title: "Explore Courses | Yencoo",
  description: "Browse our comprehensive catalog of premium tech and business courses.",
};

export default function CoursesCatalogPage() {
  return (
    <div className="min-h-screen bg-background pb-20 pt-10">
      <Container>
        {/* Page Header */}
        <div className="mb-10 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Explore Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From curious to capable. Discover premium courses designed to accelerate your career in technology, design, and business.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <CourseFilters />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:max-w-xs">
                <SearchInput placeholder="Search courses..." />
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Showing 6 of 142 courses
                </span>
                <div className="w-full sm:w-48">
                  <Select 
                    options={[
                      { label: "Most Popular", value: "popular" },
                      { label: "Highest Rated", value: "rating" },
                      { label: "Newest", value: "newest" },
                      { label: "Price: Low to High", value: "price_asc" },
                      { label: "Price: High to Low", value: "price_desc" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {MOCK_COURSES.map(course => (
                <div key={course.id} className="h-[380px]">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pt-8 border-t border-border mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink>3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </Container>
    </div>
  );
}
