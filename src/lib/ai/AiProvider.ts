export interface AiActionContext {
  lessonTitle: string;
  lessonContent: string;
  courseTitle: string;
}

export interface AiProvider {
  /**
   * Generates a generic chat response.
   */
  generateResponse(prompt: string, context: AiActionContext): Promise<string>;

  /**
   * Generates an explanation for a concept based on the lesson context.
   */
  generateExplanation(concept: string, context: AiActionContext): Promise<string>;

  /**
   * Generates a summary of the current lesson.
   */
  generateSummary(context: AiActionContext): Promise<string>;

  /**
   * Translates a given text to a target language.
   */
  translateText(text: string, targetLanguage: string, context: AiActionContext): Promise<string>;

  /**
   * Generates practice questions or flashcards.
   */
  generateFlashcards(context: AiActionContext): Promise<string>;
}
