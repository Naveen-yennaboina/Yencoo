import * as React from "react";
import { Container } from "@/components/ui/Container";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Container className="w-full max-w-md bg-card border border-border shadow-lg rounded-2xl p-6 sm:p-8">
        {children}
      </Container>
    </div>
  );
}
