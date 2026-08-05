import React, { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { ActionButton } from "../common/ActionButton";
import { Upload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AvatarUploaderProps {
  initialImage?: string | null;
  name: string;
  onChange?: (file: File | null) => void;
  className?: string;
}

export function AvatarUploader({ initialImage, name, onChange, className }: AvatarUploaderProps) {
  const [preview, setPreview] = useState<string | null | undefined>(initialImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.(null);
  };

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
    : "U";

  return (
    <div className={cn("flex flex-col sm:flex-row items-center sm:items-start gap-6", className)}>
      <Avatar 
        src={preview || undefined} 
        alt={name} 
        fallback={initials}
        className="w-24 h-24 md:w-28 md:h-28 border-4 border-background shadow-sm text-2xl md:text-3xl font-medium" 
      />
      
      <div className="flex flex-col gap-3 w-full sm:w-auto items-center sm:items-start">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <ActionButton variant="outline" className="relative w-full sm:w-auto">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
            />
          </ActionButton>
          
          {preview && (
            <ActionButton 
              variant="ghost" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10 w-full sm:w-auto"
              onClick={handleRemove}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </ActionButton>
          )}
        </div>
        <p className="text-xs text-muted-foreground text-center sm:text-left max-w-[200px] sm:max-w-none">
          Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
        </p>
      </div>
    </div>
  );
}
