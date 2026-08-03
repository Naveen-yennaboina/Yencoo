import { Container } from "@/components/ui/Container";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { CourseCard } from "@/features/discovery/components/CourseCard";
import { CourseFilters } from "@/features/discovery/components/CourseFilters";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@/components/ui/Pagination";
import { db as prisma } from "@/lib/db";
import { serializeDecimals } from "@/lib/serializers/decimal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Courses | Yencoo",
  description: "Browse our comprehensive catalog of premium tech and business courses.",
};

export default async function CoursesCatalogPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const categoryId = typeof params.category === 'string' ? params.category : undefined;
  
  const sort = typeof params.sort === 'string' ? params.sort : "newest";
  
  let orderBy: any = { createdAt: "desc" };
  if (sort === "popular") {
    // using reviews or students if we had it, fallback to createdAt for now
    orderBy = { createdAt: "desc" };
  } else if (sort === "rating") {
    orderBy = { createdAt: "desc" };
  } else if (sort === "price_asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price_desc") {
    orderBy = { price: "desc" };
  }

  const where = {
    status: "PUBLISHED" as const,
    deletedAt: null,
    ...(search ? { title: { contains: search, mode: 'insensitive' as const } } : {}),
    ...(categoryId ? { categoryId } : {}),
  };

  const [coursesRaw, total] = await Promise.all([
    prisma.course.findMany({
      where,
      include: {
        category: true,
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.course.count({ where }),
  ]);

  const courses = serializeDecimals(coursesRaw);
  const totalPages = Math.ceil(total / limit);

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
                <SearchInput placeholder="Search courses..." defaultValue={search} />
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Showing {courses.length} of {total} courses
                </span>
                <div className="w-full sm:w-48">
                  <Select 
                    defaultValue={sort}
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
              {courses.length === 0 ? (
                <div className="col-span-full py-12 text-center text-muted-foreground">
                  No courses found matching your criteria.
                </div>
              ) : (
                courses.map((course: any) => (
                  <div key={course.id} className="h-[380px]">
                    <CourseCard course={course} />
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-border mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href={page > 1 ? `?page=${page - 1}` : undefined} />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink href={`?page=${i + 1}`} isActive={page === i + 1}>
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext href={page < totalPages ? `?page=${page + 1}` : undefined} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
}
