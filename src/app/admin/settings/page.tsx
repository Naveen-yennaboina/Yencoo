"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Save } from "lucide-react";

export default function SiteSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
          <p className="text-muted-foreground mt-1">Configure global platform settings.</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-1">
            {["General", "SEO Defaults", "Contact", "Social Links"].map((tab, i) => (
              <button
                key={tab}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  i === 0 ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="p-6 space-y-6">
            <h3 className="font-bold text-lg border-b border-border pb-4">General Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Site Name</label>
                <Input defaultValue="Yencoo" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tagline</label>
                <Input defaultValue="From Curious to Capable." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Support Email</label>
                <Input type="email" defaultValue="support@yencoo.com" />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-6">
            <h3 className="font-bold text-lg border-b border-border pb-4">SEO Defaults</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Title Format</label>
                <Input defaultValue="%s | Yencoo" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Default Meta Description</label>
                <textarea className="w-full min-h-[100px] bg-muted/50 border border-border rounded-lg p-3 text-sm resize-none" defaultValue="Learn new skills with interactive courses from Yencoo."></textarea>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
