import { AiActionContext, AiProvider } from "./AiProvider";

export class MockAiProvider implements AiProvider {
  private async simulateDelay() {
    return new Promise((resolve) => setTimeout(resolve, 800));
  }

  async generateResponse(prompt: string, context: AiActionContext): Promise<string> {
    await this.simulateDelay();
    return `This is a mocked AI response for "${prompt}". In a production environment, this would integrate with a real LLM, passing the context of "${context.lessonTitle}".`;
  }

  async generateExplanation(concept: string, context: AiActionContext): Promise<string> {
    await this.simulateDelay();
    return `Here is an explanation of "${concept}" in the context of "${context.lessonTitle}":\n\n${concept} is a key principle taught in this module. It helps developers build scalable systems. You can think of it like a blueprint for your application.`;
  }

  async generateSummary(context: AiActionContext): Promise<string> {
    await this.simulateDelay();
    return `**Summary of ${context.lessonTitle}**:\n\n1. Introduction to the main concepts.\n2. Deep dive into the mechanics and syntax.\n3. Real-world applications.\n4. Best practices and performance considerations.\n\nKeep practicing these concepts to master the module!`;
  }

  async translateText(text: string, targetLanguage: string, context: AiActionContext): Promise<string> {
    await this.simulateDelay();
    return `*(Translated to ${targetLanguage})*\n\nThis is a mock translation of "${text.substring(0, 50)}...". In production, this would call a Translation API or an LLM with instructions to translate the content.`;
  }

  async generateFlashcards(context: AiActionContext): Promise<string> {
    await this.simulateDelay();
    return `**Flashcards for ${context.lessonTitle}**:\n\n**Q:** What is the primary purpose of this lesson?\n**A:** To understand the core fundamentals of the topic.\n\n**Q:** Name one best practice.\n**A:** Always validate your inputs.`;
  }
}

export const aiProvider = new MockAiProvider();
