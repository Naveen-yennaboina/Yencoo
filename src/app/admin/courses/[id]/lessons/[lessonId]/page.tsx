"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { 
  ArrowLeft, 
  Save, 
  Bold, 
  Italic, 
  List, 
  Image as ImageIcon, 
  Code, 
  Type,
  Eye,
  PenTool,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LessonBuilderPage() {
  const params = useParams();
  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState(`Generics in TypeScript allow you to write reusable and flexible components...`);

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-4 shrink-0">
        <Link href={`/admin/courses/${params.id}`}>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <Input defaultValue="1. What are Generics?" className="font-bold text-xl h-12 bg-transparent border-transparent hover:border-border focus:bg-card focus:border-primary transition-all" />
        </div>
        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
          <Button 
            variant={!isPreview ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setIsPreview(false)}
            className="h-8"
          >
            <PenTool className="h-4 w-4 mr-2" /> Editor
          </Button>
          <Button 
            variant={isPreview ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setIsPreview(true)}
            className="h-8"
          >
            <Eye className="h-4 w-4 mr-2" /> Preview
          </Button>
        </div>
        <Button className="gap-2 shrink-0"><Save className="h-4 w-4" /> Save Lesson</Button>
      </div>

      {!isPreview ? (
        <Card className="flex-1 flex flex-col overflow-hidden border-border">
          {/* Editor Toolbar */}
          <div className="h-14 border-b border-border bg-muted/30 flex items-center px-4 gap-1 overflow-x-auto shrink-0">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Type className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Bold className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Italic className="h-4 w-4" /></Button>
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><List className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><ImageIcon className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Code className="h-4 w-4" /></Button>
            <div className="w-px h-6 bg-border mx-2" />
            <Button variant="ghost" size="sm" className="h-8 gap-2 text-amber-500 hover:text-amber-600"><Lightbulb className="h-4 w-4" /> Tip</Button>
            <Button variant="ghost" size="sm" className="h-8 gap-2 text-destructive hover:text-destructive"><AlertTriangle className="h-4 w-4" /> Warning</Button>
          </div>

          {/* Editor Canvas */}
          <div className="flex-1 p-6 overflow-y-auto bg-card">
            <textarea
              className="w-full h-full min-h-[400px] resize-none outline-none bg-transparent text-foreground leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your lesson..."
            />
          </div>
        </Card>
      ) : (
        <Card className="flex-1 p-8 lg:p-12 overflow-y-auto bg-card border-border prose prose-slate dark:prose-invert max-w-none">
          {/* Preview Canvas */}
          <h1 className="text-3xl font-bold mb-8">1. What are Generics?</h1>
          <p className="whitespace-pre-wrap">{content}</p>
        </Card>
      )}
    </div>
  );
}
