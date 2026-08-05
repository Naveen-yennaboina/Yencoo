"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CreditCard, Download, ExternalLink, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { PageContainer } from "@/components/dashboard/layout/PageContainer";
import { PageHeader } from "@/components/dashboard/layout/PageHeader";
import { SectionCard } from "@/components/dashboard/cards/SectionCard";
import { ActionButton } from "@/components/dashboard/common/ActionButton";

const MOCK_INVOICES = [
  { id: "inv_12345", date: "2026-07-01", amount: "$29.00", status: "PAID", pdf: "#" },
  { id: "inv_12344", date: "2026-06-01", amount: "$29.00", status: "PAID", pdf: "#" },
  { id: "inv_12343", date: "2026-05-01", amount: "$29.00", status: "PAID", pdf: "#" },
];

export default function BillingPage() {
  const [isCanceled, setIsCanceled] = useState(false);

  return (
    <PageContainer size="wide">
      <PageHeader 
        title="Billing & Subscriptions"
        description="Manage your current plan, payment methods, and billing history."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Current Plan Overview */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold tracking-tight">Pro Monthly</h2>
                  {isCanceled ? (
                    <Badge variant="outline" className="text-destructive border-destructive/50">Canceled</Badge>
                  ) : (
                    <Badge variant="outline" className="text-emerald-500 border-emerald-500/50">Active</Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mt-1">Unlimited access to all premium courses and AI features.</p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-2xl font-bold tracking-tight">$29.00</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 flex items-center gap-4 mb-6 border border-border/50">
              <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="text-sm">
                {isCanceled ? (
                  <>Your plan will remain active until <span className="font-semibold text-foreground">August 1, 2026</span>. After that, you will be downgraded to the Free plan.</>
                ) : (
                  <>Your plan will automatically renew on <span className="font-semibold text-foreground">August 1, 2026</span>.</>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {isCanceled ? (
                <ActionButton variant="default">Resume Subscription</ActionButton>
              ) : (
                <>
                  <ActionButton variant="default">Upgrade to Yearly (Save 20%)</ActionButton>
                  <ActionButton variant="outline" onClick={() => setIsCanceled(true)}>Cancel Subscription</ActionButton>
                </>
              )}
            </div>
          </SectionCard>

          {/* Payment Method */}
          <SectionCard>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <h3 className="text-lg font-bold tracking-tight">Payment Method</h3>
              <ActionButton variant="outline" size="sm" fullWidthOnMobile={false}>Update</ActionButton>
            </div>
            <div className="flex items-center gap-4 border border-border rounded-lg p-4 bg-muted/30">
              <div className="bg-primary/10 p-2 rounded flex items-center justify-center text-primary">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">Visa ending in 4242</div>
                <div className="text-sm text-muted-foreground">Expires 12/28</div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Invoice History */}
        <div className="lg:col-span-1">
          <SectionCard>
            <h3 className="text-lg font-bold tracking-tight mb-4">Billing History</h3>
            <div className="space-y-4">
              {MOCK_INVOICES.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0 last:pb-0">
                  <div>
                    <div className="text-sm font-medium">{inv.date}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{inv.amount}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] uppercase h-5 font-medium">{inv.status}</Badge>
                    <a href={inv.pdf} className="text-muted-foreground hover:text-primary transition-colors p-1">
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <ActionButton variant="ghost" className="w-full mt-4 text-sm text-primary hover:text-primary hover:bg-primary/5">
              View all invoices <ExternalLink className="h-3 w-3 ml-2" />
            </ActionButton>
          </SectionCard>
        </div>
      </div>
    </PageContainer>
  );
}
