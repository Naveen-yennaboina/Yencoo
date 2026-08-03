export interface TTSOptions {
  voiceId: string;
  languageCode: string;
  speed?: number; // e.g. 1.0
}

export interface TTSProvider {
  /**
   * Converts text to an audio stream or URL
   */
  generateAudio(text: string, options: TTSOptions): Promise<string>;
  
  /**
   * Retrieves available voices for a specific language
   */
  getVoices(languageCode: string): Promise<Array<{ id: string; name: string; gender: string }>>;
}

export class MockTTSProvider implements TTSProvider {
  async generateAudio(text: string, options: TTSOptions): Promise<string> {
    console.log(`[MockTTSProvider] Generating audio for text with voice ${options.voiceId}`);
    return "https://example.com/mock-audio.mp3";
  }

  async getVoices(languageCode: string): Promise<Array<{ id: string; name: string; gender: string }>> {
    return [
      { id: "voice-1", name: "Alex", gender: "male" },
      { id: "voice-2", name: "Samantha", gender: "female" },
    ];
  }
}
