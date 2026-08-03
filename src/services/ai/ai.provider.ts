export interface AIExplanationRequest {
  context: string;
  question: string;
  courseId: string;
  lessonId: string;
}

export interface AIExplanationResponse {
  answer: string;
  suggestedResources?: string[];
  confidenceScore: number;
}

export interface AIProvider {
  /**
   * Generates a context-aware explanation for a student's question
   */
  explainConcept(request: AIExplanationRequest): Promise<AIExplanationResponse>;

  /**
   * Translates course material into the target language
   */
  translateContent(content: string, targetLanguageCode: string): Promise<string>;
}
