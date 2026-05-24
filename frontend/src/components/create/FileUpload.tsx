"use client";

import { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  fileName?: string;
}

export function FileUpload({ onFileSelect, fileName }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0] ?? null;
    if (file && !/image\/(jpeg|png|jpg)|application\/pdf|text\/plain/i.test(file.type)) {
      return;
    }
    onFileSelect(file);
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-7 transition ${
          dragOver ? "border-ink/25 bg-[#FAFAFA]" : "border-[#E5E7EB] bg-[#FAFAFA]/50"
        }`}
      >
        <CloudUpload className="h-7 w-7 text-ink-subtle" strokeWidth={1.5} />
        <p className="mt-2.5 text-sm font-medium text-ink">
          Choose a file or drag & drop it here
        </p>
        <p className="mt-1 text-xs text-ink-subtle">JPEG, PNG, PDF up to 10MB</p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-3"
          onClick={() => inputRef.current?.click()}
        >
          Browse Files
        </Button>
        {fileName && (
          <p className="mt-3 text-xs font-medium text-ink">{fileName}</p>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf,.txt"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      <p className="mt-2 text-xs text-ink-subtle">
        Upload images of your preferred document/image
      </p>
    </div>
  );
}
