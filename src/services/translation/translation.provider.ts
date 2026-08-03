export interface TranslationProvider {
  /**
   * Translates text into the specified language code
   */
  translateText(text: string, targetLanguage: string): Promise<string>;
  
  /**
   * Batch translates an array of strings
   */
  translateBatch(texts: string[], targetLanguage: string): Promise<string[]>;
}

export class MockTranslationProvider implements TranslationProvider {
  async translateText(text: string, targetLanguage: string): Promise<string> {
    return `[${targetLanguage}] ${text}`;
  }

  async translateBatch(texts: string[], targetLanguage: string): Promise<string[]> {
    return texts.map(text => `[${targetLanguage}] ${text}`);
  }
}
