import { AIProvider, AIExplanationRequest, AIExplanationResponse } from "./ai.provider";

class MockAIProvider implements AIProvider {
  async explainConcept(request: AIExplanationRequest): Promise<AIExplanationResponse> {
    console.log("[MockAIProvider] Generating explanation for:", request.question);
    return {
      answer: "This is a placeholder AI explanation. The actual AI integration is pending.",
      confidenceScore: 0.95,
    };
  }

  async translateContent(content: string, targetLanguageCode: string): Promise<string> {
    console.log(`[MockAIProvider] Translating to ${targetLanguageCode}`);
    return `[Translated to ${targetLanguageCode}]: ${content}`;
  }
}

export class AIFactory {
  private static instance: AIProvider;

  static getProvider(): AIProvider {
    if (!this.instance) {
      // In the future, this can resolve different providers based on env vars (e.g. OpenAI vs Anthropic)
      this.instance = new MockAIProvider();
    }
    return this.instance;
  }
}
