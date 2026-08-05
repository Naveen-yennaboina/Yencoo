import * as React from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { Navbar } from "@/components/marketing/Navbar";
import { getSession } from "@/lib/auth/session";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar isAuthenticated={!!session} />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
      {/* Left Branding Side - Desktop Only */}
      <div className="hidden md:flex flex-col justify-between bg-primary/5 border-r border-border/50 p-12 lg:p-24 relative overflow-hidden">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-1/4 -left-1/4 w-[150%] h-1/2 bg-primary/10 rotate-12 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col space-y-4">
          <a className="flex items-center space-x-2" href="/" aria-label="Go to homepage">
            <span className="font-heading font-extrabold text-4xl tracking-tight text-primary">
              {siteConfig.name}
            </span>
          </a>
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground max-w-md leading-tight">
            From Curious to Capable.
          </h1>
          <p className="text-muted-foreground text-lg max-w-sm mt-4 leading-relaxed">
            Join thousands of learners mastering new skills with interactive courses and an AI learning companion.
          </p>
        </div>

        {/* Hero Illustration Placeholder */}
        <div className="relative z-10 mt-12 flex-1 flex items-center justify-center min-h-[300px]">
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl border border-border/50 ring-1 ring-black/5 bg-card/50 backdrop-blur-sm">
             <Image
               src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
               alt="Students learning"
               fill
               className="object-cover opacity-90"
             />
             {/* Glass Overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-background/20 to-transparent mix-blend-overlay" />
          </div>
        </div>
      </div>

      {/* Right Auth Form Side */}
      <div className="flex items-center justify-center p-4 sm:p-8 lg:p-12 min-h-screen md:min-h-0 bg-background/50 backdrop-blur-sm relative z-10">
        <div className="w-full max-w-[420px]">
          {/* Mobile Only Branding */}
          <div className="md:hidden flex flex-col items-center text-center space-y-2 mb-10">
            <a className="flex items-center space-x-2" href="/" aria-label="Go to homepage">
              <span className="font-heading font-extrabold text-3xl tracking-tight text-primary">
                {siteConfig.name}
              </span>
            </a>
            <p className="text-muted-foreground font-medium">From Curious to Capable.</p>
          </div>
          
          <div className="bg-card border border-border/60 shadow-premium-xl rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden backdrop-blur-md">
            {children}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
