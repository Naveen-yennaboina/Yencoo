"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, MotionCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, X } from "lucide-react";

export default function PricingTemplate() {
  const [isAnnual, setIsAnnual] = React.useState(true);

  return (
    <div className="container mx-auto p-4 md:p-8 py-16 space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-primary">Simple, transparent pricing</h1>
        <p className="text-xl text-muted-foreground">
          Unlock your full potential with unlimited access to all courses, projects, and resources.
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-primary/20 relative flex items-center px-1 transition-colors hover:bg-primary/30"
          >
            <div 
              className={`w-5 h-5 rounded-full bg-primary transition-transform duration-300 ease-in-out ${isAnnual ? "translate-x-7" : "translate-x-0"}`} 
            />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Annually <Badge variant="success" className="ml-1 text-xs">Save 20%</Badge>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
        {/* Basic Tier */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Basic</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold font-heading">{isAnnual ? "$9" : "$12"}</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {[
                { text: "Access to free courses", included: true },
                { text: "Community forum access", included: true },
                { text: "Basic profile customization", included: true },
                { text: "Premium courses", included: false },
                { text: "1-on-1 mentorship", included: false },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  {feature.included ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Get Started</Button>
          </CardFooter>
        </Card>

        {/* Pro Tier (Featured) */}
        <MotionCard isHoverable className="border-primary shadow-premium-lg relative">
          <div className="absolute top-0 inset-x-0 h-1 bg-primary rounded-t-xl" />
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant="default">Most Popular</Badge>
          <CardHeader>
            <CardTitle className="text-xl text-primary">Pro</CardTitle>
            <CardDescription>For dedicated learners</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold font-heading">{isAnnual ? "$29" : "$39"}</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {[
                { text: "All Basic features", included: true },
                { text: "Unlimited premium courses", included: true },
                { text: "Downloadable resources", included: true },
                { text: "Certificate of completion", included: true },
                { text: "Priority support", included: true },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full" size="lg">Subscribe Now</Button>
          </CardFooter>
        </MotionCard>

        {/* Team Tier */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Team</CardTitle>
            <CardDescription>For growing organizations</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold font-heading">{isAnnual ? "$99" : "$129"}</span>
              <span className="text-muted-foreground">/mo</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Up to 5 members</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {[
                { text: "All Pro features", included: true },
                { text: "Team management dashboard", included: true },
                { text: "Progress tracking reports", included: true },
                { text: "Custom learning paths", included: true },
                { text: "Dedicated success manager", included: true },
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
