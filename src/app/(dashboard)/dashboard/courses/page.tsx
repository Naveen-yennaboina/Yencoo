import { MOCK_COURSES } from '@/lib/mock-data';
import { CourseCard } from '@/features/course/components/CourseCard';
import { SlidersHorizontal } from 'lucide-react';
import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { ResponsiveToolbar } from "@/components/dashboard/layout/ResponsiveToolbar";
import { SearchBar } from "@/components/dashboard/filters/SearchBar";
import { ActionButton } from "@/components/dashboard/common/ActionButton";
import { DashboardGrid } from "@/components/dashboard/layout/DashboardGrid";

export const metadata = {
  title: 'My Courses | Yencoo',
  description: 'View and manage your enrolled courses',
};

export default function CoursesPage() {
  return (
    <PageContainer size="wide">
      <PageHeader 
        title="Courses" 
        description="Explore our catalog and continue learning"
      />
      
      <ResponsiveToolbar 
        search={<SearchBar placeholder="Search courses..." />}
        filters={
          <>
            <ActionButton variant="outline" size="sm" className="whitespace-nowrap shrink-0 h-10 px-4 rounded-xl" fullWidthOnMobile={false}>
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </ActionButton>
            <ActionButton variant="secondary" size="sm" className="whitespace-nowrap shrink-0 h-10 px-4 rounded-xl" fullWidthOnMobile={false}>
              All
            </ActionButton>
            <ActionButton variant="ghost" size="sm" className="whitespace-nowrap shrink-0 text-muted-foreground h-10 px-4 rounded-xl" fullWidthOnMobile={false}>
              Web Development
            </ActionButton>
            <ActionButton variant="ghost" size="sm" className="whitespace-nowrap shrink-0 text-muted-foreground h-10 px-4 rounded-xl" fullWidthOnMobile={false}>
              Design
            </ActionButton>
          </>
        }
      />

      <DashboardGrid cols={4}>
        {MOCK_COURSES.map((course) => (
          <CourseCard key={course.id} course={course as any} />
        ))}
      </DashboardGrid>
    </PageContainer>
  );
}
