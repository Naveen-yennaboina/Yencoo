"use client";

import { Progress } from "@/components/ui/Progress";
import { SmallText } from "@/components/ui/Typography";

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  let score = 0;
  let color = "bg-muted";
  let label = "Poor";

  if (password.length > 0) {
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[a-z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;

    if (score <= 25) {
      color = "bg-danger";
      label = "Weak";
    } else if (score <= 50) {
      color = "bg-warning";
      label = "Fair";
    } else if (score <= 75) {
      color = "bg-info";
      label = "Good";
    } else {
      color = "bg-success";
      label = "Strong";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <SmallText className="text-muted-foreground">
          Password strength
        </SmallText>
        <SmallText className="font-medium">
          {password.length > 0 ? label : ""}
        </SmallText>
      </div>
      <Progress value={score} max={100} indicatorColor={color} className="h-1.5" />
    </div>
  );
}
