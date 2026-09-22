import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function MachineryGallery({
  images = [],
  title = "",
  isSold = false,
  category = "",
  soldLabel = "SOLD",
  dir = "ltr",
}) {
  const isRtl = dir === "rtl";

  const normalizedImages = useMemo(() => {
    return images
      .map((img) => {
        if (typeof img === "string") return img;
        return img?.imageUrl || img?.url || "";
      })
      .filter(Boolean);
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  const totalImages = normalizedImages.length;

  // ---------------------------------------------------------
  // Keep active index valid if images change
  // ---------------------------------------------------------
  useEffect(() => {
    if (activeIndex >= totalImages) {
      setActiveIndex(Math.max(0, totalImages - 1));
    }
  }, [activeIndex, totalImages]);

  // ---------------------------------------------------------
  // Change image
  // ---------------------------------------------------------
  const goToImage = (index, animationDirection = 1) => {
    if (!totalImages) return;

    let nextIndex = index;

    if (index < 0) {
      nextIndex = totalImages - 1;
    }

    if (index >= totalImages) {
      nextIndex = 0;
    }

    setDirection(animationDirection);
    setActiveIndex(nextIndex);
  };

  const goNext = () => {
    goToImage(activeIndex + 1, 1);
  };

  const goPrevious = () => {
    goToImage(activeIndex - 1, -1);
  };

  // ---------------------------------------------------------
  // Keyboard controls
  // ---------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (event) => {
      const tag = event.target?.tagName?.toLowerCase();

      // Don't hijack keyboard while typing
      if (
        tag === "input" ||
        tag === "textarea" ||
        tag === "select"
      ) {
        return;
      }

      if (event.key === "Escape" && isZoomOpen) {
        setIsZoomOpen(false);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();

        if (isRtl) {
          goPrevious();
        } else {
          goNext();
        }
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        if (isRtl) {
          goNext();
        } else {
          goPrevious();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, isZoomOpen, isRtl, totalImages]);

  // ---------------------------------------------------------
  // Lock body scroll while zoom is open
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isZoomOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isZoomOpen]);

  // ---------------------------------------------------------
  // No images
  // ---------------------------------------------------------
  if (!totalImages) {
    return (
      <div className="w-full">
        <div className="relative h-[360px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-200 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 016.828 0L20 16m-2-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <p className="text-sm text-slate-400">
              No images available
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeImage = normalizedImages[activeIndex];

  // ---------------------------------------------------------
  // Swipe handling
  // ---------------------------------------------------------
  let touchStartX = 0;

  const handleTouchStart = (event) => {
    touchStartX = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      // Swipe left
      isRtl ? goPrevious() : goNext();
    } else {
      // Swipe right
      isRtl ? goNext() : goPrevious();
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4">

        {/* =====================================================
            MAIN IMAGE
        ====================================================== */}
        <div
          className="relative w-full h-[360px] sm:h-[400px] lg:h-[430px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 group"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* Image counter */}
          <div
            className={`absolute top-4 z-30 px-3 py-1.5 rounded-full
              bg-black/55 backdrop-blur-md
              border border-white/10
              text-white text-[11px] font-semibold
              tracking-wide
              ${isRtl ? "left-4" : "right-4"}
            `}
          >
            {activeIndex + 1} / {totalImages}
          </div>

          {/* Status badge */}
          {isSold ? (
            <div
              className={`absolute top-4 z-30 px-3.5 py-1.5
                rounded-full bg-red-600/95
                text-white text-[10px]
                font-bold tracking-wider shadow-lg
                ${isRtl ? "right-4" : "left-4"}
              `}
            >
              {soldLabel}
            </div>
          ) : category ? (
            <div
              className={`absolute top-4 z-30 px-3.5 py-1.5
                rounded-full bg-[#C47B36]
                text-white text-[10px]
                font-semibold tracking-wide shadow-lg
                ${isRtl ? "right-4" : "left-4"}
              `}
            >
              {category}
            </div>
          ) : null}

          {/* Main image */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={`${activeImage}-${activeIndex}`}
              src={activeImage}
              alt={title}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 45 : -45,
                scale: 1.015,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -45 : 45,
                scale: 0.985,
              }}
              transition={{
                duration: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0 w-full h-full object-cover cursor-zoom-in select-none"
              draggable={false}
              onClick={() => setIsZoomOpen(true)}
            />
          </AnimatePresence>

          {/* Gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/5" />

          {/* Zoom hint */}
          <div
            className="absolute bottom-4 left-1/2 -translate-x-1/2
              opacity-0 group-hover:opacity-100
              transition-all duration-300
              pointer-events-none"
          >
            <div
              className="flex items-center gap-2
                px-3 py-1.5 rounded-full
                bg-black/55 backdrop-blur-md
                border border-white/10
                text-white text-[10px] font-medium"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M21 21l-4.35-4.35m2.35-5.65a8 8 0 11-16 0 8 8 0 0116 0zM8 11h6M11 8v6"
                />
              </svg>

              <span>Click to zoom</span>
            </div>
          </div>

          {/* Previous */}
          {totalImages > 1 && (
            <button
              type="button"
              onClick={isRtl ? goNext : goPrevious}
              aria-label="Previous image"
              className={`
                absolute top-1/2 -translate-y-1/2 z-30
                w-10 h-10 sm:w-11 sm:h-11
                rounded-full
                bg-white/90 backdrop-blur-sm
                border border-white
                shadow-lg
                flex items-center justify-center
                text-slate-700
                hover:bg-white
                hover:text-[#C47B36]
                hover:scale-105
                active:scale-95
                transition-all duration-200
                opacity-0 group-hover:opacity-100
                ${isRtl ? "right-4" : "left-4"}
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Next */}
          {totalImages > 1 && (
            <button
              type="button"
              onClick={isRtl ? goPrevious : goNext}
              aria-label="Next image"
              className={`
                absolute top-1/2 -translate-y-1/2 z-30
                w-10 h-10 sm:w-11 sm:h-11
                rounded-full
                bg-white/90 backdrop-blur-sm
                border border-white
                shadow-lg
                flex items-center justify-center
                text-slate-700
                hover:bg-white
                hover:text-[#C47B36]
                hover:scale-105
                active:scale-95
                transition-all duration-200
                opacity-0 group-hover:opacity-100
                ${isRtl ? "left-4" : "right-4"}
              `}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* =====================================================
            THUMBNAILS
        ====================================================== */}
        {totalImages > 1 && (
          <div className="relative">

            <div
              className="flex gap-3 overflow-x-auto pb-2
                scrollbar-thin scrollbar-thumb-slate-300
                scrollbar-track-transparent
                snap-x snap-mandatory"
            >
              {normalizedImages.map((image, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={`
                      relative flex-shrink-0
                      w-[82px] h-[68px]
                      sm:w-[92px] sm:h-[74px]
                      rounded-xl overflow-hidden
                      bg-slate-100
                      snap-start
                      transition-all duration-200
                      focus:outline-none
                      ${
                        isActive
                          ? "ring-2 ring-[#C47B36] ring-offset-2 scale-[0.97]"
                          : "border border-slate-200 opacity-75 hover:opacity-100 hover:border-slate-300"
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`${title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />

                    {/* Active overlay */}
                    {isActive && (
                      <motion.div
                        layoutId="activeGalleryThumb"
                        className="absolute inset-0 border-2 border-[#C47B36] rounded-xl"
                      />
                    )}

                    {/* Index */}
                    <span
                      className={`
                        absolute bottom-1 right-1
                        min-w-5 h-5 px-1
                        rounded-md
                        flex items-center justify-center
                        text-[9px] font-bold
                        ${
                          isActive
                            ? "bg-[#C47B36] text-white"
                            : "bg-black/50 text-white"
                        }
                      `}
                    >
                      {index + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Keyboard hint */}
        {totalImages > 1 && (
          <div className="hidden sm:flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200 font-medium">
              ←
            </span>
            <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200 font-medium">
              →
            </span>
            <span>Use arrow keys to browse</span>
          </div>
        )}
      </div>

      {/* =======================================================
          ZOOM MODAL
      ======================================================== */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            className="fixed inset-0 z-[100]
              bg-black/90 backdrop-blur-md
              flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsZoomOpen(false);
              }
            }}
          >

            {/* Close */}
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close"
              className="absolute top-5 right-5 z-[110]
                w-10 h-10 rounded-full
                bg-white/10 hover:bg-white/20
                border border-white/10
                text-white
                flex items-center justify-center
                transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>

            {/* Counter */}
            <div
              className="absolute top-5 left-1/2 -translate-x-1/2
                px-3.5 py-1.5 rounded-full
                bg-white/10 backdrop-blur-md
                border border-white/10
                text-white text-xs font-semibold"
            >
              {activeIndex + 1} / {totalImages}
            </div>

            {/* Main zoom image */}
            <motion.img
              key={`zoom-${activeImage}-${activeIndex}`}
              src={activeImage}
              alt={title}
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-full max-h-[82vh]
                object-contain rounded-lg
                select-none"
              draggable={false}
            />

            {/* Previous zoom */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={isRtl ? goNext : goPrevious}
                className={`
                  absolute top-1/2 -translate-y-1/2
                  w-12 h-12 rounded-full
                  bg-white/10 hover:bg-white/20
                  border border-white/10
                  text-white
                  flex items-center justify-center
                  transition-all
                  ${isRtl ? "right-5" : "left-5"}
                `}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.7}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Next zoom */}
            {totalImages > 1 && (
              <button
                type="button"
                onClick={isRtl ? goPrevious : goNext}
                className={`
                  absolute top-1/2 -translate-y-1/2
                  w-12 h-12 rounded-full
                  bg-white/10 hover:bg-white/20
                  border border-white/10
                  text-white
                  flex items-center justify-center
                  transition-all
                  ${isRtl ? "left-5" : "right-5"}
                `}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.7}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Bottom thumbnails */}
            {totalImages > 1 && (
              <div
                className="absolute bottom-5 left-1/2
                  -translate-x-1/2
                  max-w-[90vw]"
              >
                <div
                  className="flex gap-2 p-2
                    rounded-2xl
                    bg-black/40 backdrop-blur-md
                    border border-white/10
                    overflow-x-auto"
                >
                  {normalizedImages.map((image, index) => (
                    <button
                      key={`zoom-thumb-${index}`}
                      type="button"
                      onClick={() => {
                        setDirection(index > activeIndex ? 1 : -1);
                        setActiveIndex(index);
                      }}
                      className={`
                        flex-shrink-0
                        w-12 h-10
                        rounded-lg overflow-hidden
                        border-2 transition-all
                        ${
                          index === activeIndex
                            ? "border-[#C47B36] opacity-100"
                            : "border-transparent opacity-50 hover:opacity-100"
                        }
                      `}
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Hint */}
            <div
              className="absolute bottom-20
                left-1/2 -translate-x-1/2
                hidden sm:block
                text-[10px] text-white/50"
            >
              ESC to close · ← → to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
