import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Loader2 } from 'lucide-react';

interface ResumeUploadZoneProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export function ResumeUploadZone({ onUpload, isLoading }: ResumeUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-all ${
        dragActive ? 'border-primary bg-primary/5' : 'border-border'
      } ${isLoading ? 'opacity-50 pointer-events-none' : 'hover-elevate'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      data-testid="card-resume-upload"
    >
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        {isLoading ? (
          <>
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <div className="space-y-2">
              <p className="text-lg font-semibold">Analyzing Resume...</p>
              <p className="text-sm text-muted-foreground">
                AI is extracting your information and optimizing your profile
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Drag and drop your resume here, or click to browse. We'll auto-fill your profile!
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="default" asChild data-testid="button-browse-resume">
                <label className="cursor-pointer">
                  <FileText className="w-4 h-4 mr-2" />
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                  />
                </label>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </>
        )}
      </div>
    </Card>
  );
}
