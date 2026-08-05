import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { LessonPlayerClient } from "@/features/learn/components/LessonPlayerClient";

export default async function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const { slug, lessonId } = params;

  // We are currently simulating the user
  const user = await db.user.findUnique({ where: { email: 'test@yencoo.com' } });
  if (!user) throw new Error("Test user not found");
  const userId = user.id;

  // Fetch course and modules with lessons
  const course = await db.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" }
          }
        }
      }
    }
  });

  if (!course) {
    redirect(`/dashboard/courses`);
  }

  // Find current lesson and module
  let currentLesson: any = null;
  let currentModule: any = null;
  let prevLesson: any = null;
  let nextLesson: any = null;

  // Flatten lessons to find next/prev easily
  const flatLessons: { module: any, lesson: any }[] = [];
  course.modules.forEach(mod => {
    mod.lessons.forEach(les => flatLessons.push({ module: mod, lesson: les }));
  });

  const currentIndex = flatLessons.findIndex(item => item.lesson.id === lessonId);
  
  if (currentIndex !== -1) {
    currentLesson = flatLessons[currentIndex].lesson;
    currentModule = flatLessons[currentIndex].module;
    if (currentIndex > 0) prevLesson = flatLessons[currentIndex - 1].lesson;
    if (currentIndex < flatLessons.length - 1) nextLesson = flatLessons[currentIndex + 1].lesson;
  }

  if (!currentLesson && flatLessons.length > 0) {
    redirect(`/learn/${slug}/${flatLessons[0].lesson.id}`);
  } else if (!currentLesson && flatLessons.length === 0) {
    redirect(`/dashboard/courses/${slug}`);
  }

  // Fetch initial state for user data (Bookmarks, Notes, AI)
  // We'll fetch them all in parallel
  const [bookmark, note, aiConversation] = await Promise.all([
    db.bookmark.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      }
    }),
    db.note.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      }
    }),
    db.aiConversation.findFirst({
      where: {
        userId,
        lessonId
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" }
        }
      }
    })
  ]);

  const initialBookmarked = !!bookmark;
  const initialNote = note?.content || "";
  const initialAiMessages = aiConversation?.messages || [];

  let initialQuiz = null;
  if (currentLesson?.type === "QUIZ") {
    initialQuiz = await db.quiz.findUnique({
      where: { lessonId: currentLesson.id },
      include: {
        questions: {
          include: {
            options: {
              select: { id: true, text: true } // hide isCorrect
            }
          },
          orderBy: { order: "asc" }
        }
      }
    });
  }

  return (
    <LessonPlayerClient 
      slug={slug}
      lessonId={lessonId}
      currentLesson={currentLesson}
      currentModule={currentModule}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      initialBookmarked={initialBookmarked}
      initialNote={initialNote}
      initialAiMessages={initialAiMessages}
      initialQuiz={initialQuiz}
    />
  );
}
