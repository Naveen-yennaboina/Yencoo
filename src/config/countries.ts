export interface CountryConfig {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  defaultCurrency: string;
  defaultLanguage: string;
  active: boolean;
}

export const SUPPORTED_COUNTRIES: CountryConfig[] = [
  { code: "US", name: "United States", defaultCurrency: "USD", defaultLanguage: "en", active: true },
  { code: "IN", name: "India", defaultCurrency: "INR", defaultLanguage: "en", active: true },
  { code: "GB", name: "United Kingdom", defaultCurrency: "GBP", defaultLanguage: "en", active: true },
  { code: "EU", name: "European Union", defaultCurrency: "EUR", defaultLanguage: "en", active: true }, // Representing EU block
  { code: "CA", name: "Canada", defaultCurrency: "CAD", defaultLanguage: "en", active: true },
  { code: "AU", name: "Australia", defaultCurrency: "AUD", defaultLanguage: "en", active: true },
];

export const DEFAULT_COUNTRY = "US";
