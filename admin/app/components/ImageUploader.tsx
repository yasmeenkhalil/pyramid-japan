"use client";

import React, { ChangeEvent } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const files = Array.from(e.target.files);
    const loadedImages: string[] = [];
    let processedCount = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          loadedImages.push(reader.result);
        }
        processedCount++;
        if (processedCount === files.length) {
          onChange([...images, ...loadedImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };
  return (
    <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900">Machinery Images</h3>
      
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100/70 transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 font-semibold">Click to upload multiple images</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP</p>
          </div>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleImageChange} 
            className="hidden" 
          />
        </label>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 pt-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative group aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              <img 
                src={img} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
