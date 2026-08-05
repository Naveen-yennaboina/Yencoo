import React, { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { X, Save, FileText, Loader2 } from "lucide-react";
import { saveNote as saveNoteAction } from "@/actions/learn-actions";
import { usePathname } from "next/navigation";

interface NotesPanelProps {
  lessonId: string;
  initialNote?: string;
  onClose: () => void;
}

export function NotesPanel({ lessonId, initialNote, onClose }: NotesPanelProps) {
  const [content, setContent] = useState(initialNote || "");
  const [isSaved, setIsSaved] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  useEffect(() => {
    setContent(initialNote || "");
  }, [lessonId, initialNote]);

  const handleSave = () => {
    startTransition(async () => {
      await saveNoteAction(lessonId, content, pathname);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    });
  };

  return (
    <div className="flex flex-col h-full bg-card border-l border-border w-full md:w-80 lg:w-96 shrink-0 shadow-xl z-20">
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">My Notes</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex-1 p-4 flex flex-col">
        <textarea
          className="flex-1 w-full bg-transparent border-0 focus:ring-0 resize-none outline-none text-base placeholder:text-muted-foreground p-2"
          placeholder="Type your notes here... They will be saved automatically."
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setIsSaved(false);
          }}
          onBlur={handleSave}
        />
      </div>
      
      <div className="p-4 border-t border-border bg-muted/20 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {isPending ? "Saving..." : isSaved ? "Saved just now" : "Auto-saves on blur"}
        </span>
        <Button size="sm" onClick={handleSave} disabled={isPending} className="gap-2">
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Notes
        </Button>
      </div>
    </div>
  );
}
