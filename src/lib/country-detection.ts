import { SUPPORTED_COUNTRIES, DEFAULT_COUNTRY } from "@/config/countries";

export interface CountryDetectionResult {
  countryCode: string;
  currency: string;
}

/**
 * Utility to resolve the user's country and default currency.
 * In a real application, this would ideally happen server-side 
 * via headers (e.g. x-vercel-ip-country) or user profile fetch.
 */
export function resolveUserCountry(
  userPreferredCountryCode?: string | null,
  browserLocale?: string
): CountryDetectionResult {
  
  // 1. Check user preference first
  if (userPreferredCountryCode) {
    const config = SUPPORTED_COUNTRIES.find((c) => c.code === userPreferredCountryCode);
    if (config) {
      return {
        countryCode: config.code,
        currency: config.defaultCurrency
      };
    }
  }

  // 2. Fallback to browser locale (very simplified version for client-side)
  // E.g., en-US -> US, en-IN -> IN
  if (browserLocale && browserLocale.includes('-')) {
    const region = browserLocale.split('-')[1].toUpperCase();
    const config = SUPPORTED_COUNTRIES.find((c) => c.code === region);
    if (config) {
      return {
        countryCode: config.code,
        currency: config.defaultCurrency
      };
    }
  }

  // 3. Fallback to default
  const defaultConfig = SUPPORTED_COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY)!;
  return {
    countryCode: defaultConfig.code,
    currency: defaultConfig.defaultCurrency
  };
}
