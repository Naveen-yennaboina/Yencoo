export interface EmailProvider {
  sendVerificationOTP(email: string, otp: string): Promise<void>;
  sendPasswordResetOTP(email: string, otp: string): Promise<void>;
}

class MockEmailProvider implements EmailProvider {
  async sendVerificationOTP(email: string, otp: string): Promise<void> {
    console.log(`\n=========================================`);
    console.log(`📧 MOCK EMAIL: Verify Email`);
    console.log(`To: ${email}`);
    console.log(`Your OTP code is: ${otp}`);
    console.log(`=========================================\n`);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  async sendPasswordResetOTP(email: string, otp: string): Promise<void> {
    console.log(`\n=========================================`);
    console.log(`📧 MOCK EMAIL: Password Reset`);
    console.log(`To: ${email}`);
    console.log(`Your reset code is: ${otp}`);
    console.log(`=========================================\n`);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

// Factory to return the configured email provider
export function getEmailService(): EmailProvider {
  // In the future, check process.env.EMAIL_PROVIDER (e.g., "resend", "sendgrid")
  // and return the appropriate implementation.
  return new MockEmailProvider();
}
