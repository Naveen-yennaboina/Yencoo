"use server";

import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Simulate a logged-in user for Phase 4 development
const TEST_USER_EMAIL = 'test@yencoo.com';

async function getTestUserId() {
  const user = await prisma.user.findUnique({ where: { email: TEST_USER_EMAIL } });
  if (!user) throw new Error("Test user not found.");
  return user.id;
}

export async function toggleBookmark(lessonId: string, pathname: string) {
  const userId = await getTestUserId();
  
  const existing = await prisma.bookmark.findUnique({
    where: { userId_lessonId: { userId, lessonId } }
  });

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } });
  } else {
    await prisma.bookmark.create({
      data: { userId, lessonId }
    });
  }

  revalidatePath(pathname);
  revalidatePath('/dashboard/bookmarks');
}

export async function getUserBookmarks() {
  const userId = await getTestUserId();
  return prisma.bookmark.findMany({
    where: { userId },
    include: {
      lesson: {
        include: {
          module: {
            include: {
              course: true
            }
          }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function saveNote(lessonId: string, content: string, pathname: string) {
  const userId = await getTestUserId();
  
  await prisma.note.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: { content },
    create: { userId, lessonId, content }
  });

  revalidatePath(pathname);
}

export async function getLessonNote(lessonId: string) {
  const userId = await getTestUserId();
  return prisma.note.findUnique({
    where: { userId_lessonId: { userId, lessonId } }
  });
}

export async function getLesson(lessonId: string) {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: {
        include: {
          course: true
        }
      }
    }
  });
}
export async function markLessonComplete(lessonId: string, timeSpent: number = 0, pathname: string) {
  const userId = await getTestUserId();

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } }
  });

  if (!lesson) throw new Error("Lesson not found");

  const courseId = lesson.module.course.id;

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseId: { userId, courseId } }
  });

  if (!enrollment) throw new Error("Not enrolled in this course");

  // Create or update progress
  await prisma.lessonProgress.upsert({
    where: {
      enrollmentId_lessonId: { enrollmentId: enrollment.id, lessonId }
    },
    update: {
      isCompleted: true,
      timeSpent: { increment: timeSpent },
      completedAt: new Date()
    },
    create: {
      enrollmentId: enrollment.id,
      lessonId,
      isCompleted: true,
      timeSpent,
      completedAt: new Date()
    }
  });

  // Calculate course completion
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        include: { lessons: true }
      }
    }
  });

  if (course) {
    const allLessons = course.modules.flatMap(m => m.lessons);
    const totalLessons = allLessons.length;
    
    const completedProgresses = await prisma.lessonProgress.count({
      where: {
        enrollmentId: enrollment.id,
        isCompleted: true
      }
    });

    const progressPercent = totalLessons > 0 ? Math.round((completedProgresses / totalLessons) * 100) : 0;

    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: {
        progressPercent,
        timeSpent: { increment: timeSpent }
      }
    });

    // If 100% completed, generate certificate
    if (progressPercent === 100) {
      const existingCert = await prisma.certificate.findFirst({
        where: { userId, courseId }
      });
      
      if (!existingCert) {
        const verifyCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        await prisma.certificate.create({
          data: {
            userId,
            courseId,
            verifyCode,
            pdfUrl: `/certificates/${verifyCode}`
          }
        });
      }
    }
  }

  revalidatePath(pathname);
}
