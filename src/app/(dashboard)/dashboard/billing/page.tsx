"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CreditCard, Download, ExternalLink, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

const MOCK_INVOICES = [
  { id: "inv_12345", date: "2026-07-01", amount: "$29.00", status: "PAID", pdf: "#" },
  { id: "inv_12344", date: "2026-06-01", amount: "$29.00", status: "PAID", pdf: "#" },
  { id: "inv_12343", date: "2026-05-01", amount: "$29.00", status: "PAID", pdf: "#" },
];

export default function BillingPage() {
  const [isCanceled, setIsCanceled] = useState(false);

  return (
    <Container className="max-w-5xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Subscriptions</h1>
        <p className="text-muted-foreground mt-2">Manage your current plan, payment methods, and billing history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Current Plan Overview */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold">Pro Monthly</h2>
                  {isCanceled ? (
                    <Badge variant="outline" className="text-amber-500 border-amber-500/50">Canceled</Badge>
                  ) : (
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/50">Active</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mt-1">Unlimited access to all premium courses and AI features.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$29.00</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-4 mb-6">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                {isCanceled ? (
                  <>Your plan will remain active until <span className="font-semibold text-foreground">August 1, 2026</span>. After that, you will be downgraded to the Free plan.</>
                ) : (
                  <>Your plan will automatically renew on <span className="font-semibold text-foreground">August 1, 2026</span>.</>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isCanceled ? (
                <Button variant="default" onClick={() => setIsCanceled(false)}>Resume Subscription</Button>
              ) : (
                <>
                  <Button variant="default">Upgrade to Yearly (Save 20%)</Button>
                  <Button variant="outline" onClick={() => setIsCanceled(true)}>Cancel Subscription</Button>
                </>
              )}
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Payment Method</h3>
              <Button variant="ghost" size="sm">Update</Button>
            </div>
            <div className="flex items-center gap-4 border border-border rounded-lg p-4">
              <div className="bg-primary/10 p-2 rounded flex items-center justify-center text-primary">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">Visa ending in 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/28</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Invoice History */}
        <div className="md:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Billing History</h3>
            <div className="space-y-4">
              {MOCK_INVOICES.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 last:pb-0">
                  <div>
                    <div className="text-sm font-medium">{inv.date}</div>
                    <div className="text-xs text-muted-foreground">{inv.amount}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] uppercase h-5">{inv.status}</Badge>
                    <a href={inv.pdf} className="text-muted-foreground hover:text-primary transition-colors">
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="w-full mt-4 text-sm h-auto p-0 text-primary">
              View all invoices <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </Card>
        </div>
      </div>
    </Container>
  );
}
