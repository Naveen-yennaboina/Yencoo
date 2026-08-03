import { PaymentProvider, PaymentIntent } from "../payment.provider";

/**
 * Placeholder implementation for Razorpay Payment Gateway.
 * Will be implemented when Indian/Asian market payments are required.
 */
export class RazorpayProvider implements PaymentProvider {
  async createPaymentIntent(amount: number, currency: string, metadata?: Record<string, any>): Promise<PaymentIntent> {
    console.warn("[RazorpayProvider] createPaymentIntent not implemented", { amount, currency, metadata });
    throw new Error("RazorpayProvider is not yet implemented.");
  }

  async verifyPayment(payload: any, signature: string): Promise<boolean> {
    console.warn("[RazorpayProvider] verifyPayment not implemented");
    throw new Error("RazorpayProvider is not yet implemented.");
  }

  async refundPayment(paymentId: string, amount?: number): Promise<boolean> {
    console.warn("[RazorpayProvider] refundPayment not implemented");
    throw new Error("RazorpayProvider is not yet implemented.");
  }
}
