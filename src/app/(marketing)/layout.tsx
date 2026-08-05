import * as React from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { getSession } from "@/lib/auth/session";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isAuthenticated={!!session} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
