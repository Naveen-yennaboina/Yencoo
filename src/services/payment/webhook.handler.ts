export interface WebhookEventPayload {
  id: string;
  type: string;
  data: any;
}

export interface WebhookHandler {
  /**
   * Called when a one-time payment succeeds
   */
  handlePaymentIntentSucceeded(event: WebhookEventPayload): Promise<void>;

  /**
   * Called when a one-time payment fails
   */
  handlePaymentIntentFailed(event: WebhookEventPayload): Promise<void>;

  /**
   * Called when a recurring subscription invoice is paid
   */
  handleInvoicePaid(event: WebhookEventPayload): Promise<void>;

  /**
   * Called when a recurring subscription invoice fails
   */
  handleInvoicePaymentFailed(event: WebhookEventPayload): Promise<void>;

  /**
   * Called when a subscription is cancelled or expired
   */
  handleSubscriptionCanceled(event: WebhookEventPayload): Promise<void>;
}
