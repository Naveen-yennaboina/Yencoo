export interface CurrencyConfig {
  code: string; // ISO 4217
  symbol: string;
  name: string;
  decimals: number;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", name: "US Dollar", decimals: 2 },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee", decimals: 2 },
  EUR: { code: "EUR", symbol: "€", name: "Euro", decimals: 2 },
  GBP: { code: "GBP", symbol: "£", name: "British Pound", decimals: 2 },
  CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", decimals: 2 },
  AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", decimals: 2 },
};

export const DEFAULT_CURRENCY = "USD";
