"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight">Something went wrong!</h2>
      <p className="text-muted-foreground">
        An unexpected error has occurred. Please try again.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </Container>
  );
}
