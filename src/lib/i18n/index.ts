import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/config/languages";

export type Dictionary = Record<string, string>;

/**
 * High-level architecture placeholder for internationalization logic.
 * In a real application, this would interface with next-intl or next-i18next
 */
export class I18nService {
  /**
   * Resolves the best language match based on user preference or headers
   */
  static resolveLanguage(preferred?: string, acceptLanguageHeader?: string): string {
    if (preferred && SUPPORTED_LANGUAGES.some(l => l.code === preferred && l.active)) {
      return preferred;
    }
    
    // Simplistic parsing of Accept-Language header
    if (acceptLanguageHeader) {
      const parts = acceptLanguageHeader.split(",");
      for (const part of parts) {
        const lang = part.split(";")[0].trim().substring(0, 2); // get primary language code
        if (SUPPORTED_LANGUAGES.some(l => l.code === lang && l.active)) {
          return lang;
        }
      }
    }

    return DEFAULT_LANGUAGE;
  }

  /**
   * Mock dictionary loader
   */
  static async getDictionary(locale: string): Promise<Dictionary> {
    // In reality this would dynamically import `src/lib/i18n/dictionaries/${locale}.json`
    return {
      "welcome": "Welcome to Yencoo",
      "courses": "Courses",
    };
  }
}
