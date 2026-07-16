"use client";

import React, { useState } from "react";
import { Eye, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: { id: string; imageUrl: string }[];
  title: string;
}

export default function TableImageGallery({ images, title }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return <span className="text-gray-400">-</span>;
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* عرض الخلية التفاعلية في الجدول */}
      <div className="flex items-center gap-2">
        <img
          src={images[0].imageUrl}
          alt={title}
          className="h-14 w-20 rounded-xl object-cover border border-slate-100 shadow-sm"
        />
        
        <button
          onClick={() => {
            setCurrentIndex(0);
            setIsOpen(true);
          }}
          type="button"
          className="flex items-center gap-1 rounded-xl bg-slate-50 border border-slate-200 p-2 text-gray-600 hover:bg-blue-50 hover:text-[#0B4EA2] hover:border-blue-200 transition shadow-sm cursor-pointer"
          title="View all images"
        >
          <Eye size={15} />
          <span className="text-xs font-bold px-0.5">{images.length}</span>
        </button>
      </div>

      {/* الـ Popup المعرض المنبثق */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* الهيدر العلوي */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <div>
                <h4 className="font-bold text-gray-900 text-sm md:text-base line-clamp-1">{title}</h4>
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  Image {currentIndex + 1} of {images.length}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 hover:bg-slate-200 rounded-full transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* منطقة عرض الصورة الكبيرة والأسهم */}
            <div className="relative flex-1 bg-slate-950 flex items-center justify-center min-h-[350px] md:min-h-[500px]">
              <img
                src={images[currentIndex].imageUrl}
                alt={`${title} - ${currentIndex + 1}`}
                className="max-w-full max-h-[60vh] md:max-h-[70vh] object-contain select-none"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all active:scale-95 cursor-pointer"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* الشريط السفلي للصور المصغرة */}
            {images.length > 1 && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 overflow-x-auto flex gap-2 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative rounded-xl overflow-hidden h-14 w-14 shrink-0 transition-all ${
                      currentIndex === idx 
                        ? "ring-4 ring-[#0B4EA2] scale-105 shadow-md" 
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.imageUrl} alt="thumbnail" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
