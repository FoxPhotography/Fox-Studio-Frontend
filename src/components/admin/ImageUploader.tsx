import React, { useState, useRef } from 'react';
import { uploadService } from '../../services';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange: (data: { url: string; publicId: string } | null) => void;
  folder?: string;
}

export default function ImageUploader({ value, onChange, folder = 'general' }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const res: any = await uploadService.uploadImage(file, folder);
      // Backend returns `{ success: true, data: { url: string, publicId: string } }`
      const uploaded = res.data || res;
      if (uploaded && uploaded.url) {
        onChange({ url: uploaded.url, publicId: uploaded.publicId });
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = async () => {
    onChange(null);
  };

  return (
    <div className="space-y-4">
      {value ? (
        <div className="relative aspect-video w-full max-w-md rounded-sm overflow-hidden bg-[#161616] border border-[#232323]">
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-[#0A0A0A]/80 hover:bg-[#EF4444] text-[#F8F8F8] rounded-full transition-colors duration-200"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`aspect-video w-full max-w-md rounded-sm border border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? 'border-[#D4AF37] bg-[#D4AF37]/5'
              : 'border-[#232323] bg-[#111111] hover:border-[#D4AF37]/50 hover:bg-[#161616]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            disabled={isUploading}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={24} className="text-[#D4AF37] animate-spin" />
              <p className="text-[#8A8A8A] text-xs">Uploading media to cloud...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#232323] flex items-center justify-center text-[#8A8A8A]">
                <Upload size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#F8F8F8]">Click to upload or drag & drop</p>
                <p className="text-xs text-[#555555] mt-1">PNG, JPG, WEBP up to 10MB</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
