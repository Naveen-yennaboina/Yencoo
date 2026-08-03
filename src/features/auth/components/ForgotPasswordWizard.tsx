"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OtpInput } from "@/components/ui/OtpInput";
import { Typography } from "@/components/ui/Typography";
import { PasswordStrength } from "./PasswordStrength";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export function ForgotPasswordWizard() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [direction, setDirection] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleNextStep = async () => {
    setError("");
    setIsLoading(true);

    try {
      if (step === 1) {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 1, data: { email } }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to send reset code");
      } else if (step === 2) {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 2, data: { email, otp } }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Invalid OTP");
      } else if (step === 3) {
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 3, data: { email, otp, password, confirmPassword } }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to reset password");
        
        router.push("/login");
        return;
      }

      setDirection(1);
      setStep((prev) => prev + 1);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden relative min-h-[400px]">
      <div className="mb-6">
        <Typography variant="h3" className="mb-2">
          {step === 1 && "Reset your password"}
          {step === 2 && "Enter reset code"}
          {step === 3 && "Create new password"}
        </Typography>
        <Typography variant="muted">
          {step === 1 && "We'll send you a code to reset your password."}
          {step === 2 && `We sent a 6-digit code to ${email}`}
          {step === 3 && "Make sure it's strong."}
        </Typography>
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="space-y-4"
        >
          {error && (
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 rounded-md">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <OtpInput length={6} onComplete={(val) => setOtp(val)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <PasswordStrength password={password} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          <div className="pt-4 flex items-center justify-between gap-4">
            <Button
              className="flex-1"
              onClick={handleNextStep}
              disabled={isLoading || (step === 2 && otp.length < 6)}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {step === 3 ? "Reset Password" : "Continue"}
              {step !== 3 && !isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
