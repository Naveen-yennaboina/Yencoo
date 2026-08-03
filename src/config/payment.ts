import { DEFAULT_COUNTRY } from "./countries";

export enum PaymentGateway {
  STRIPE = "STRIPE",
  RAZORPAY = "RAZORPAY",
  PAYPAL = "PAYPAL",
}

export interface PaymentConfig {
  defaultGateway: PaymentGateway;
  countryGateways: Record<string, PaymentGateway>;
  currencyGateways: Record<string, PaymentGateway>;
}

export const PAYMENT_CONFIG: PaymentConfig = {
  defaultGateway: PaymentGateway.STRIPE,
  // Route to specific gateway based on user's country
  countryGateways: {
    IN: PaymentGateway.RAZORPAY,
    US: PaymentGateway.STRIPE,
    GB: PaymentGateway.STRIPE,
    EU: PaymentGateway.STRIPE,
  },
  // Route to specific gateway based on currency
  currencyGateways: {
    INR: PaymentGateway.RAZORPAY,
    USD: PaymentGateway.STRIPE,
    EUR: PaymentGateway.STRIPE,
    GBP: PaymentGateway.STRIPE,
  },
};

/**
 * Determines the optimal payment gateway based on country or currency
 */
export function resolvePaymentGateway(countryCode = DEFAULT_COUNTRY, currencyCode = "USD"): PaymentGateway {
  // Check currency first, then country, then default
  if (PAYMENT_CONFIG.currencyGateways[currencyCode]) {
    return PAYMENT_CONFIG.currencyGateways[currencyCode];
  }
  
  if (PAYMENT_CONFIG.countryGateways[countryCode]) {
    return PAYMENT_CONFIG.countryGateways[countryCode];
  }

  return PAYMENT_CONFIG.defaultGateway;
}
