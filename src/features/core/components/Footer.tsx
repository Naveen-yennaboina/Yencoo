import * as React from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 w-full">
      <Container className="flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row w-full max-w-full">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by {siteConfig.name}. The source code is available on GitHub.
        </p>
      </Container>
    </footer>
  );
}
