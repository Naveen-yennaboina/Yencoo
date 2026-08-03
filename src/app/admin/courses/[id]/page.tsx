"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, Save, Plus, GripVertical, Image as ImageIcon, Settings2, BookOpen } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseEditorPage() {
  const params = useParams();
  const isNew = params.id === "new";
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/admin/courses">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{isNew ? "Create Course" : "Edit Course"}</h1>
        </div>
        <Button variant="outline">Save Draft</Button>
        <Button className="gap-2"><Save className="h-4 w-4" /> Publish</Button>
      </div>

      <div className="flex border-b border-border overflow-x-auto">
        {["general", "curriculum", "seo", "ai_settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Course Title</label>
                <Input placeholder="e.g. Advanced TypeScript Patterns" defaultValue={!isNew ? "Advanced TypeScript Patterns" : ""} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea className="w-full min-h-[150px] bg-muted/50 border border-border rounded-lg p-3 text-sm resize-y" placeholder="Describe what students will learn..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (USD)</label>
                  <Input type="number" placeholder="49.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Difficulty</label>
                  <select className="w-full bg-muted/50 border border-border rounded-lg p-2.5 text-sm outline-none">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-sm">Course Thumbnail</h3>
              <div className="aspect-video bg-muted border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/80 transition-colors">
                <ImageIcon className="h-8 w-8 mb-2" />
                <span className="text-sm">Click to upload</span>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="font-semibold text-sm">Status</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Status</span>
                <Badge variant={isNew ? "secondary" : "default"}>{isNew ? "Draft" : "Published"}</Badge>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "curriculum" && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Curriculum</h3>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Add Module</Button>
          </div>

          <div className="space-y-4">
            {/* Mock Module */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 p-4 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                  <span className="font-medium">Module 1: Introduction</span>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="p-4 space-y-2">
                {/* Mock Lesson */}
                <div className="flex items-center justify-between bg-card border border-border rounded p-3 hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    <span className="text-sm">1. What are Generics?</span>
                  </div>
                  <Link href={`/admin/courses/${params.id}/lessons/1`}>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <BookOpen className="h-3.5 w-3.5" /> Edit Lesson
                    </Button>
                  </Link>
                </div>
                <Button variant="ghost" size="sm" className="w-full border border-dashed mt-2"><Plus className="h-4 w-4 mr-2" /> Add Lesson</Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "seo" && (
        <Card className="p-6 space-y-6 max-w-2xl">
          <div className="space-y-2">
            <label className="text-sm font-medium">SEO Title</label>
            <Input placeholder="Max 60 characters" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">SEO Description</label>
            <textarea className="w-full min-h-[100px] bg-muted/50 border border-border rounded-lg p-3 text-sm resize-none" placeholder="Max 160 characters"></textarea>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input placeholder="advanced-typescript-patterns" />
          </div>
        </Card>
      )}

      {activeTab === "ai_settings" && (
        <Card className="p-6 space-y-6 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">AI Companion Features</h3>
          
          {[
            { id: "ai_explain", label: "Enable AI Explanations", desc: "Allow students to ask the AI to explain concepts." },
            { id: "ai_quiz", label: "Enable Dynamic Quizzes", desc: "AI will generate quizzes based on lesson content." },
            { id: "ai_audio", label: "Enable Text-to-Speech", desc: "Allow students to listen to the lesson audio." },
            { id: "ai_translate", label: "Enable Translations", desc: "Allow on-the-fly translations of the material." },
          ].map(feature => (
            <div key={feature.id} className="flex items-start justify-between py-3 border-b border-border last:border-0 last:pb-0">
              <div>
                <div className="font-medium">{feature.label}</div>
                <div className="text-sm text-muted-foreground">{feature.desc}</div>
              </div>
              <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" id={feature.id} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-primary border-muted" defaultChecked />
                <label htmlFor={feature.id} className="toggle-label block overflow-hidden h-6 rounded-full bg-muted cursor-pointer"></label>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
