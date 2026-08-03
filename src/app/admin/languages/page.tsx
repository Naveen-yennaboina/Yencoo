"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Globe, Plus } from "lucide-react";

export default function LanguageManagerPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Languages</h1>
          <p className="text-muted-foreground mt-1">Manage supported languages and translations.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Language
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          {[
            { code: "en-US", name: "English (US)", default: true, active: true },
            { code: "es-ES", name: "Spanish (Spain)", default: false, active: true },
            { code: "fr-FR", name: "French (France)", default: false, active: false },
            { code: "hi-IN", name: "Hindi (India)", default: false, active: true },
          ].map((lang, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {lang.name}
                    {lang.default && <span className="text-[10px] uppercase bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">Default</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{lang.code}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {!lang.default && (
                  <Button variant="ghost" size="sm" className="text-xs">Make Default</Button>
                )}
                <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id={`toggle-${i}`} className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-muted ${lang.active ? "checked:right-0 checked:border-primary" : ""}`} defaultChecked={lang.active} />
                  <label htmlFor={`toggle-${i}`} className="toggle-label block overflow-hidden h-6 rounded-full bg-muted cursor-pointer"></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
