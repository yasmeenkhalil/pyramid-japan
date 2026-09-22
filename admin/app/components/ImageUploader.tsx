"use client";

import React, { ChangeEvent, DragEvent, useState } from "react";
import {
  ImagePlus,
  Trash2,
  GripVertical,
  Star,
} from "lucide-react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({
  images,
  onChange,
}: ImageUploaderProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // =========================================================
  // Upload Images
  // =========================================================

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    if (files.length === 0) return;

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

    // يسمح باختيار نفس الصورة مرة ثانية
    e.target.value = "";
  };

  // =========================================================
  // Remove
  // =========================================================

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter(
      (_, imageIndex) => imageIndex !== index
    );

    onChange(updatedImages);
  };

  // =========================================================
  // Drag Start
  // =========================================================

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedIndex(index);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  // =========================================================
  // Drag Over
  // =========================================================

  const handleDragOver = (
    e: DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";

    if (draggedIndex === null || draggedIndex === index) {
      return;
    }

    setDragOverIndex(index);
  };

  // =========================================================
  // Drop
  // =========================================================

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    dropIndex: number
  ) => {
    e.preventDefault();

    if (
      draggedIndex === null ||
      draggedIndex === dropIndex
    ) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reorderedImages = [...images];

    const [movedImage] = reorderedImages.splice(
      draggedIndex,
      1
    );

    reorderedImages.splice(dropIndex, 0, movedImage);

    // مهم جدًا:
    // هنا يتم تغيير ترتيب الـ array فقط
    onChange(reorderedImages);

    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // =========================================================
  // Drag End
  // =========================================================

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // =========================================================
  // Make Image First
  // =========================================================

  const makePrimary = (index: number) => {
    if (index === 0) return;

    const reorderedImages = [...images];

    const [selectedImage] = reorderedImages.splice(
      index,
      1
    );

    reorderedImages.unshift(selectedImage);

    onChange(reorderedImages);
  };

  return (
    <div className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">

      {/* =====================================================
          Header
      ===================================================== */}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Machinery Images
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Arrange the images in the order you want them to
            appear on the website.
          </p>
        </div>

        {images.length > 0 && (
          <div className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
            {images.length}{" "}
            {images.length === 1 ? "image" : "images"}
          </div>
        )}

      </div>

      {/* =====================================================
          Upload
      ===================================================== */}

      <label className="group flex min-h-[125px] w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 py-6 transition-all hover:border-[#C47B36]/40 hover:bg-[#C47B36]/5">

        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm transition group-hover:text-[#C47B36]">
          <ImagePlus size={24} />
        </div>

        <p className="text-sm font-semibold text-slate-600">
          Click to upload multiple images
        </p>

        <p className="mt-1 text-xs text-slate-400">
          PNG, JPG or WEBP
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

      </label>

      {/* =====================================================
          Images
      ===================================================== */}

      {images.length > 0 && (
        <div className="space-y-3">

          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">
              Image Order
            </p>

            <p className="text-xs text-slate-400">
              Drag an image to change its position
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {images.map((img, idx) => {
              const isFirst = idx === 0;
              const isDragging = draggedIndex === idx;
              const isDragOver = dragOverIndex === idx;

              return (
                <div
                  key={`${img}-${idx}`}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, idx)
                  }
                  onDragOver={(e) =>
                    handleDragOver(e, idx)
                  }
                  onDrop={(e) =>
                    handleDrop(e, idx)
                  }
                  onDragEnd={handleDragEnd}
                  className={`
                    group relative aspect-[4/3]
                    overflow-hidden rounded-2xl
                    border-2 bg-slate-100
                    cursor-grab active:cursor-grabbing
                    transition-all duration-200

                    ${
                      isFirst
                        ? "border-[#C47B36] shadow-md shadow-[#C47B36]/10"
                        : "border-slate-200"
                    }

                    ${
                      isDragOver
                        ? "scale-[1.03] border-[#C47B36] ring-4 ring-[#C47B36]/10"
                        : ""
                    }

                    ${
                      isDragging
                        ? "scale-95 opacity-40"
                        : ""
                    }
                  `}
                >

                  {/* Image */}

                  <img
                    src={img}
                    alt={`Machinery image ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />

                  {/* Bottom Gradient */}

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                  {/* =================================================
                      Number
                  ================================================= */}

                  <div
                    className={`
                      absolute left-2 top-2
                      flex h-7 min-w-7 items-center
                      justify-center rounded-lg px-2
                      text-xs font-bold shadow-sm

                      ${
                        isFirst
                          ? "bg-[#C47B36] text-white"
                          : "bg-black/60 text-white backdrop-blur-sm"
                      }
                    `}
                  >
                    {idx + 1}
                  </div>

                  {/* =================================================
                      Main Badge
                  ================================================= */}

                  {isFirst && (
                    <div className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-[#C47B36] shadow-sm">
                      <Star
                        size={11}
                        fill="currentColor"
                      />
                      MAIN
                    </div>
                  )}

                  {/* =================================================
                      Drag Icon
                  ================================================= */}

                  <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-black/55 p-3 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <GripVertical size={20} />
                  </div>

                  {/* =================================================
                      Actions
                  ================================================= */}

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 opacity-0 transition-opacity group-hover:opacity-100">

                    {/* Make First */}

                    {!isFirst && (
                      <button
                        type="button"
                        onClick={() => makePrimary(idx)}
                        className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-2 text-[11px] font-bold text-slate-700 shadow-lg transition hover:bg-[#C47B36] hover:text-white"
                      >
                        <Star size={13} />
                        Make First
                      </button>
                    )}

                    {isFirst && (
                      <div className="flex items-center gap-1.5 rounded-lg bg-[#C47B36] px-2.5 py-2 text-[11px] font-bold text-white shadow-lg">
                        <Star
                          size={12}
                          fill="currentColor"
                        />
                        Main Image
                      </div>
                    )}

                    {/* Delete */}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveImage(idx)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                      title="Remove image"
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      )}

      {/* =====================================================
          Empty
      ===================================================== */}

      {images.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-8 text-center">
          <p className="text-sm font-medium text-slate-400">
            No images added yet
          </p>

          <p className="mt-1 text-xs text-slate-300">
            Upload images to get started
          </p>
        </div>
      )}

      {/* =====================================================
          Info
      ===================================================== */}

      {images.length > 1 && (
        <div className="flex items-center gap-2 rounded-xl bg-[#C47B36]/5 px-4 py-3 text-xs text-slate-500">
          <Star
            size={14}
            className="shrink-0 text-[#C47B36]"
            fill="currentColor"
          />

          <span>
            The first image will be displayed as the main
            image on the website.
          </span>
        </div>
      )}

    </div>
  );
}