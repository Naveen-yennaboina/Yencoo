import { redirect } from "next/navigation";
import { MOCK_COURSES, MOCK_COURSE_MODULES } from "@/lib/mock-data";

export default async function LearnCourseRootPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const course = MOCK_COURSES.find((c) => c.slug === slug);
  if (!course) {
    redirect("/dashboard/courses");
  }

  const courseModules = MOCK_COURSE_MODULES.filter(
    (m) => m.courseId === course.id
  );
  
  const firstModule = courseModules.sort((a, b) => a.order - b.order)[0];
  const firstLesson = firstModule?.lessons[0];

  if (!firstLesson) {
    redirect("/dashboard/courses");
  }

  redirect(`/learn/${slug}/${firstLesson.id}`);
}
