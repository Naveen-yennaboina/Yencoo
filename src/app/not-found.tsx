import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4 text-center">
      <h2 className="text-4xl font-extrabold tracking-tight">404</h2>
      <p className="text-xl text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </Container>
  );
}
