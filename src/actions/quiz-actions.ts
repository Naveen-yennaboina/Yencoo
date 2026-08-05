"use server";

import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { markLessonComplete } from "./learn-actions";

// Simulate a logged-in user for Phase 4 development
const TEST_USER_EMAIL = 'test@yencoo.com';

async function getTestUserId() {
  const user = await prisma.user.findUnique({ where: { email: TEST_USER_EMAIL } });
  if (!user) throw new Error("Test user not found.");
  return user.id;
}

export async function getQuizByLessonId(lessonId: string) {
  return prisma.quiz.findUnique({
    where: { lessonId },
    include: {
      questions: {
        include: {
          options: {
            select: {
              id: true,
              text: true,
              // We omit isCorrect here so the client doesn't see it
            }
          }
        },
        orderBy: { order: 'asc' }
      }
    }
  });
}

export async function submitQuizAttempt(
  quizId: string, 
  lessonId: string, 
  answers: Record<string, string>, // questionId -> optionId
  pathname: string
) {
  const userId = await getTestUserId();

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: {
        include: { options: true }
      }
    }
  });

  if (!quiz) throw new Error("Quiz not found");

  let correctCount = 0;
  const totalQuestions = quiz.questions.length;
  const results = [];

  for (const question of quiz.questions) {
    const selectedOptionId = answers[question.id];
    const correctOption = question.options.find(o => o.isCorrect);
    const isCorrect = correctOption?.id === selectedOptionId;
    
    if (isCorrect) {
      correctCount++;
    }

    results.push({
      questionId: question.id,
      selectedOptionId,
      isCorrect,
      correctOptionId: correctOption?.id,
      explanation: question.explanation
    });
  }

  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = score >= quiz.passingScore;

  await prisma.quizAttempt.create({
    data: {
      userId,
      quizId,
      score,
      passed
    }
  });

  if (passed) {
    // If they pass, mark lesson complete automatically
    await markLessonComplete(lessonId, 120, pathname);
  }

  return {
    score,
    passed,
    results
  };
}
