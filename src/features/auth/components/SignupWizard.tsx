"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { OtpInput } from "@/components/ui/OtpInput";
import { H3, MutedText } from "@/components/ui/Typography";
import { PasswordStrength } from "./PasswordStrength";
import { CountrySelect, Country } from "@/components/ui/CountrySelect";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};

export function SignupWizard() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [direction, setDirection] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | {field: string, message: string}[] | null>(null);

  // Step 1 Data
  const [country, setCountry] = React.useState("");
  const [countryData, setCountryData] = React.useState<Country | null>(null);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    // Auto-detect country code from browser locale (e.g. en-US -> US)
    try {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      const parsedCountry = locale.split("-")[1] || "US";
      setCountry(parsedCountry);
    } catch (e) {
      setCountry("US");
    }
  }, []);

  // Step 2 Data
  const [otp, setOtp] = React.useState("");

  // Step 3 Data
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleNextStep = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (step === 1) {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            step: 1, 
            data: { 
              country: countryData?.name || country,
              countryCode: country,
              fullName, 
              email,
              timezone
            } 
          }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 400 && process.env.NODE_ENV === "development") {
            console.log("Response", data);
          }
          if (data.errors) throw data.errors;
          throw new Error(data.message || data.error || "Failed to send OTP");
        }
      } else if (step === 2) {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 2, data: { email, otp } }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 400 && process.env.NODE_ENV === "development") {
            console.log("Response", data);
          }
          if (data.errors) throw data.errors;
          throw new Error(data.message || data.error || "Invalid OTP");
        }
      } else if (step === 3) {
        if (password !== confirmPassword) throw new Error("Passwords do not match");
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: 3, data: { email, password, confirmPassword } }),
        });
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 400 && process.env.NODE_ENV === "development") {
            console.log("Response", data);
          }
          if (data.errors) throw data.errors;
          throw new Error(data.message || data.error || "Failed to create account");
        }
        
        router.push("/dashboard");
        return;
      }

      setDirection(1);
      setStep((prev) => prev + 1);
    } catch (err: any) {
      if (Array.isArray(err)) {
        setError(err);
      } else {
        setError(err.message || "An error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden relative min-h-[400px]">
      <div className="mb-6">
        <H3 className="mb-2">
          {step === 1 && "Create your account"}
          {step === 2 && "Verify your email"}
          {step === 3 && "Secure your account"}
        </H3>
        <MutedText>
          {step === 1 && "Start your journey with Yencoo today."}
          {step === 2 && `We sent a 6-digit code to ${email}`}
          {step === 3 && "Choose a strong password."}
        </MutedText>
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
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
              {Array.isArray(error) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {error.map((err, i) => (
                    <li key={i}>{err.message}</li>
                  ))}
                </ul>
              ) : (
                error
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Country / Region</label>
                <CountrySelect 
                  value={country} 
                  onChange={setCountry} 
                  onCountrySelect={setCountryData} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
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
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <PasswordStrength password={password} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
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
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              className="flex-1"
              onClick={handleNextStep}
              disabled={isLoading || (step === 2 && otp.length < 6)}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {step === 3 ? "Complete Signup" : "Continue"}
              {step !== 3 && !isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
