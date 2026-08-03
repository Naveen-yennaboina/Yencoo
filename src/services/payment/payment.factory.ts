import { PaymentProvider } from "./payment.provider";
import { RazorpayProvider } from "./providers/razorpay.provider";
import { StripeProvider } from "./providers/stripe.provider";
import { resolvePaymentGateway, PaymentGateway } from "@/config/payment";

export class PaymentFactory {
  private static providers: Partial<Record<PaymentGateway, PaymentProvider>> = {};

  static getProvider(countryCode?: string, currencyCode?: string): PaymentProvider {
    const gateway = resolvePaymentGateway(countryCode, currencyCode);

    if (!this.providers[gateway]) {
      switch (gateway) {
        case PaymentGateway.RAZORPAY:
          this.providers[gateway] = new RazorpayProvider();
          break;
        case PaymentGateway.STRIPE:
          this.providers[gateway] = new StripeProvider();
          break;
        default:
          throw new Error(`Unsupported payment gateway: ${gateway}`);
      }
    }

    return this.providers[gateway]!;
  }
}
