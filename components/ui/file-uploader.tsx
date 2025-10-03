"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
}

export function FileUploader({ onFileChange }: FileUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileChange(file);
    }
  }, [onFileChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    multiple: false,
  });

  const removePreview = () => {
    setPreview(null);
    onFileChange(null);
  };

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-admin-accent bg-admin-accent/10" : "border-admin-border hover:border-admin-accent"}
      `}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="w-full h-auto rounded-lg" />
          <button
            onClick={removePreview}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="w-12 h-12 text-admin-muted" />
          <p className="text-admin-muted">
            Arrastra y suelta una imagen aquí, o haz clic para seleccionar
          </p>
          <p className="text-xs text-admin-muted">
            PNG, JPG, GIF hasta 10MB
          </p>
        </div>
      )}
    </div>
  );
}
