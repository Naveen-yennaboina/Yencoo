"use server";

import { db as prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { aiProvider } from "@/lib/ai/MockAiProvider";

const TEST_USER_EMAIL = 'test@yencoo.com';

async function getTestUserId() {
  const user = await prisma.user.findUnique({ where: { email: TEST_USER_EMAIL } });
  if (!user) throw new Error("Test user not found.");
  return user.id;
}

export async function getConversation(lessonId: string) {
  const userId = await getTestUserId();
  return prisma.aiConversation.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
    include: {
      messages: { orderBy: { createdAt: 'asc' } }
    }
  });
}

export async function sendMessage(lessonId: string, content: string, pathname: string) {
  const userId = await getTestUserId();
  
  // Get or create conversation
  let conversation = await prisma.aiConversation.findUnique({
    where: { userId_lessonId: { userId, lessonId } }
  });

  if (!conversation) {
    conversation = await prisma.aiConversation.create({
      data: { userId, lessonId }
    });
  }

  // 1. Save user message
  await prisma.aiMessage.create({
    data: {
      conversationId: conversation.id,
      role: 'user',
      content
    }
  });

  // 2. Fetch lesson context
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } }
  });

  const context = {
    lessonTitle: lesson?.title || "Unknown Lesson",
    lessonContent: lesson?.content || "No content",
    courseTitle: lesson?.module?.course?.title || "Unknown Course"
  };

  // 3. Get AI response
  const response = await aiProvider.generateResponse(content, context);

  // 4. Save mock AI response
  await prisma.aiMessage.create({
    data: {
      conversationId: conversation.id,
      role: 'assistant',
      content: response
    }
  });

  revalidatePath(pathname);
}

export async function clearConversation(lessonId: string, pathname: string) {
  const userId = await getTestUserId();
  
  const conversation = await prisma.aiConversation.findUnique({
    where: { userId_lessonId: { userId, lessonId } }
  });

  if (conversation) {
    await prisma.aiMessage.deleteMany({
      where: { conversationId: conversation.id }
    });
  }
  
  revalidatePath(pathname);
}
export async function executeAiAction(lessonId: string, actionType: string, payload: any, pathname: string) {
  const userId = await getTestUserId();
  
  let conversation = await prisma.aiConversation.findUnique({
    where: { userId_lessonId: { userId, lessonId } }
  });

  if (!conversation) {
    conversation = await prisma.aiConversation.create({
      data: { userId, lessonId }
    });
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { include: { course: true } } }
  });

  const context = {
    lessonTitle: lesson?.title || "Unknown Lesson",
    lessonContent: lesson?.content || "No content",
    courseTitle: lesson?.module?.course?.title || "Unknown Course"
  };

  let response = "";
  let userMessage = "";

  switch (actionType) {
    case "explain":
      userMessage = "Explain the concept: " + payload.concept;
      response = await aiProvider.generateExplanation(payload.concept, context);
      break;
    case "summarize":
      userMessage = "Summarize this lesson";
      response = await aiProvider.generateSummary(context);
      break;
    case "translate":
      userMessage = "Translate this lesson to " + payload.language;
      response = await aiProvider.translateText(context.lessonContent, payload.language, context);
      break;
    case "flashcards":
      userMessage = "Generate flashcards for this lesson";
      response = await aiProvider.generateFlashcards(context);
      break;
    default:
      userMessage = "Execute action: " + actionType;
      response = await aiProvider.generateResponse("Execute action: " + actionType, context);
  }

  // Save user command message
  await prisma.aiMessage.create({
    data: {
      conversationId: conversation.id,
      role: 'user',
      content: userMessage
    }
  });

  // Save AI response
  await prisma.aiMessage.create({
    data: {
      conversationId: conversation.id,
      role: 'assistant',
      content: response
    }
  });

  revalidatePath(pathname);
}
