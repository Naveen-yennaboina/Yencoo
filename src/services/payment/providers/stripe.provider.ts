import { PaymentProvider, PaymentIntent } from "../payment.provider";

/**
 * Placeholder implementation for Stripe Payment Gateway.
 * Will be implemented for Global/US/EU market payments.
 */
export class StripeProvider implements PaymentProvider {
  async createPaymentIntent(amount: number, currency: string, metadata?: Record<string, any>): Promise<PaymentIntent> {
    console.warn("[StripeProvider] createPaymentIntent not implemented", { amount, currency, metadata });
    throw new Error("StripeProvider is not yet implemented.");
  }

  async verifyPayment(payload: any, signature: string): Promise<boolean> {
    console.warn("[StripeProvider] verifyPayment not implemented");
    throw new Error("StripeProvider is not yet implemented.");
  }

  async refundPayment(paymentId: string, amount?: number): Promise<boolean> {
    console.warn("[StripeProvider] refundPayment not implemented");
    throw new Error("StripeProvider is not yet implemented.");
  }
}
