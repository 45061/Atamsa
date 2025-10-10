'use client';

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";

interface MultiFileUploaderProps {
  onFilesChange: (files: File[]) => void;
}

export function MultiFileUploader({ onFilesChange }: MultiFileUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles];
    setFiles(newFiles);
    onFilesChange(newFiles);

    const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  }, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];

    newFiles.splice(index, 1);
    const removedPreview = newPreviews.splice(index, 1);
    URL.revokeObjectURL(removedPreview[0]); // Clean up memory

    setFiles(newFiles);
    setPreviews(newPreviews);
    onFilesChange(newFiles);
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? "border-admin-accent bg-admin-accent/10" : "border-admin-border hover:border-admin-accent"}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="w-12 h-12 text-admin-muted" />
          <p className="text-admin-muted">
            Arrastra y suelta imágenes aquí, o haz clic para seleccionar
          </p>
          <p className="text-xs text-admin-muted">
            PNG, JPG, GIF hasta 10MB
          </p>
        </div>
      </div>
      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-auto rounded-lg" />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
