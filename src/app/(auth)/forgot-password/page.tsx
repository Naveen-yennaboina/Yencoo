import { ForgotPasswordWizard } from "@/features/auth/components/ForgotPasswordWizard";

export const metadata = {
  title: "Forgot Password | Yencoo",
  description: "Reset your Yencoo password",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordWizard />;
}
