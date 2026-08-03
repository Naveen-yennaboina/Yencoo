export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "REQUIRES_ACTION" | "SUCCESS" | "FAILED";
  clientSecret?: string; // For frontend confirmation (e.g. Stripe client secret, Razorpay order id)
}

export interface PaymentProvider {
  /**
   * Initializes a payment intent/order on the gateway
   */
  createPaymentIntent(amount: number, currency: string, metadata?: Record<string, any>): Promise<PaymentIntent>;

  /**
   * Verifies the signature/webhook from the gateway
   */
  verifyPayment(payload: any, signature: string): Promise<boolean>;

  /**
   * Process a refund
   */
  refundPayment(paymentId: string, amount?: number): Promise<boolean>;
}
