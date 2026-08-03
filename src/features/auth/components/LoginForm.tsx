"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { H3, MutedText } from "@/components/ui/Typography";
import { Checkbox } from "@/components/ui/Checkbox";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);

  const [validationErrors, setValidationErrors] = React.useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.error || "Failed to login");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <H3 className="mb-2">
          Welcome back
        </H3>
        <MutedText>
          Log in to your Yencoo account
        </MutedText>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-3 p-3 text-sm bg-[#FEE2E2] border border-[#FCA5A5] text-[#B91C1C] rounded-md">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="whitespace-pre-wrap">{error}</div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Email Address</label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (validationErrors.email) setValidationErrors(prev => ({ ...prev, email: undefined }));
            }}
            className={validationErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {validationErrors.email && (
            <p className="text-xs text-destructive">{validationErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (validationErrors.password) setValidationErrors(prev => ({ ...prev, password: undefined }));
            }}
            className={validationErrors.password ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {validationErrors.password && (
            <p className="text-xs text-destructive">{validationErrors.password}</p>
          )}
        </div>

        <div className="flex justify-between items-center pt-2">
          <Checkbox
            id="rememberMe"
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link 
            href="/forgot-password" 
            className="text-sm text-primary hover:underline transition-all"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {isLoading ? "Logging In..." : "Log In"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link 
          href="/signup" 
          className="text-primary font-medium hover:underline hover:opacity-80 transition-all"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
