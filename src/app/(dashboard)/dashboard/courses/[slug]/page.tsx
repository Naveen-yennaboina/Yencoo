import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MOCK_COURSES, MOCK_COURSE_MODULES } from '@/lib/mock-data';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { Star, Clock, PlayCircle, FileText, CheckCircle2, ChevronRight, Video, FileQuestion, BarChart } from 'lucide-react';
import Link from 'next/link';

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = MOCK_COURSES.find(c => c.slug === params.slug);
  
  if (!course) {
    notFound();
  }

  const modules = MOCK_COURSE_MODULES.filter(m => m.courseId === course.id);
  const totalDuration = modules.reduce((acc, mod) => acc + mod.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0), 0);
  const isEnrolled = course.progress !== undefined;

  const curriculumItems = modules.map((mod) => ({
    title: (
      <div className="flex items-center justify-between w-full pr-4">
        <span className="font-semibold text-base">{mod.title}</span>
        <span className="text-xs text-neutral-500 font-normal">
          {mod.lessons.length} lessons • {formatDuration(mod.lessons.reduce((sum, l) => sum + (l.duration || 0), 0))}
        </span>
      </div>
    ),
    content: (
      <div className="flex flex-col gap-2 mt-2">
        {mod.lessons.map((lesson) => (
          <div key={lesson.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
            <div className="flex items-center gap-3">
              {lesson.type === 'VIDEO' && <PlayCircle className="w-4 h-4 text-primary" />}
              {lesson.type === 'TEXT' && <FileText className="w-4 h-4 text-blue-500" />}
              {lesson.type === 'QUIZ' && <FileQuestion className="w-4 h-4 text-purple-500" />}
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{lesson.title}</span>
            </div>
            <div className="flex items-center gap-3">
              {lesson.isFree && !isEnrolled && (
                <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded">
                  Preview
                </span>
              )}
              <span className="text-xs text-neutral-500">
                {formatDuration(lesson.duration || 0)}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
    defaultExpanded: mod.order === 1,
  }));

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto pb-20 px-4 md:px-0">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
        <Link href="/dashboard/courses" className="hover:text-primary transition-colors">Courses</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-neutral-900 dark:text-neutral-100 font-medium truncate">{course.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column (Content) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Header */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {course.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md font-semibold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{course.rating}</span>
                </div>
                <span>({course.studentsCount.toLocaleString()} students)</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                <span className="capitalize">{course.difficultyLevel.toLowerCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(totalDuration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <Image 
                src={course.instructor.avatarUrl || ''} 
                alt={course.instructor.firstName}
                width={40}
                height={40}
                className="rounded-full ring-2 ring-white dark:ring-neutral-900 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {course.instructor.firstName} {course.instructor.lastName}
                </span>
                <span className="text-xs text-neutral-500">Instructor</span>
              </div>
            </div>
          </div>

          {/* What you'll learn */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">What you'll learn</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-neutral-700 dark:text-neutral-300">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Curriculum</h2>
              <span className="text-sm text-neutral-500">{course.lessonsCount} lessons • {formatDuration(totalDuration)}</span>
            </div>
            <Accordion items={curriculumItems} />
          </div>
          
        </div>

        {/* Right Column (Sidebar / Sticky Card) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 flex flex-col gap-6">
            <Card className="overflow-hidden border-neutral-200 dark:border-neutral-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]">
              <div className="relative aspect-video w-full">
                {course.thumbnailUrl ? (
                  <>
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                        <PlayCircle className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <Video className="w-12 h-12 text-neutral-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                {isEnrolled ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span>Course Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500 ease-in-out" 
                          style={{ width: `${course.progress}%` }} 
                        />
                      </div>
                    </div>
                    <Link href={`/learn/${course.slug}`} className="w-full">
                      <Button className="w-full h-12 text-base rounded-xl">
                        Continue Learning
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold">${course.price?.toFixed(2)}</span>
                    </div>
                    <Button className="w-full h-12 text-base rounded-xl" size="lg">
                      Enroll Now
                    </Button>
                    <p className="text-xs text-center text-neutral-500">
                      30-Day Money-Back Guarantee
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="p-6 border-neutral-200 dark:border-neutral-800 shadow-none bg-neutral-50 dark:bg-neutral-900/50">
              <h3 className="font-semibold mb-4">This course includes:</h3>
              <div className="flex flex-col gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4" />
                  <span>{formatDuration(totalDuration)} on-demand video</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>{course.lessonsCount} interactive lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileQuestion className="w-4 h-4" />
                  <span>Quizzes and assignments</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
