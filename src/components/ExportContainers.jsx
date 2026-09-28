
"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Globe2,
  Maximize2,
  Package,
  Ship,
  X,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "https://pyramidjapan.jp";

export default function ExportContainers() {
  const { i18n } = useTranslation();

  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  const isArabic = i18n.language === "ar";
  const isJapanese = i18n.language === "ja";
  const isRussian = i18n.language === "ru";

  useEffect(() => {
    async function fetchContainers() {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/containers`);

        if (res.ok) {
          const data = await res.json();

          setContainers(
            Array.isArray(data) ? data.slice(0, 4) : []
          );
        }
      } catch (error) {
        console.error("Failed to fetch export containers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContainers();
  }, []);

  const getContainerTitle = (item) => {
    if (isArabic && item.titleAr) return item.titleAr;
    if (isJapanese && item.titleJa) return item.titleJa;
    if (isRussian && item.titleRu) return item.titleRu;

    return item.titleEn || "";
  };

  const getCountryName = (country) => {
    if (!country) return "";

    if (isArabic) return country.nameAr || country.nameEn;
    if (isJapanese) return country.nameJa || country.nameEn;
    if (isRussian) return country.nameRu || country.nameEn;

    return country.nameEn || "";
  };

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden border-t border-white/[0.05] bg-[#071525] px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d9a441]/[0.035] blur-[140px]" />

      <div className="relative mx-auto max-w-[1480px]">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9a441]/20 bg-[#d9a441]/[0.07] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e3b65c]">
              <Ship className="h-3.5 w-3.5" />

              {isArabic
                ? "سجل الشحن"
                : isJapanese
                ? "出荷記録"
                : isRussian
                ? "Журнал отправок"
                : "Shipment Records"}
            </div>

            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">
              {isArabic
                ? "شحناتنا حول العالم"
                : isJapanese
                ? "世界への輸出実績"
                : isRussian
                ? "Наши экспортные отправки"
                : "Our Global Shipments"}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              {isArabic
                ? "نماذج من عمليات تجهيز وشحن المعدات والآلات من اليابان إلى عملائنا حول العالم."
                : "A selection of machinery shipments prepared and exported from Japan to customers worldwide."}
            </p>
          </div>

          <Link
            to="/export-gallery"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.035] px-5 py-3 text-xs font-bold text-slate-200 transition hover:border-[#d9a441]/40 hover:bg-[#d9a441]/10 hover:text-[#e3b65c]"
          >
            {isArabic ? "عرض الأرشيف الكامل" : "View Full Archive"}

            {isArabic ? (
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#09192d]"
              >
                <div className="aspect-[4/3] animate-pulse bg-white/[0.04]" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 animate-pulse rounded bg-white/[0.06]" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-white/[0.06]" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.06]" />
                </div>
              </div>
            ))}
          </div>
        ) : containers.length === 0 ? (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] py-16 text-center text-sm text-slate-500">
            <Package className="mx-auto mb-4 h-7 w-7" />

            {isArabic
              ? "لا توجد سجلات شحن متوفرة حالياً."
              : "No shipment records are currently available."}
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {containers.map((container) => {
                const title =
                  getContainerTitle(container) ||
                  (isArabic ? "شحنة حاوية" : "Pyramid Shipment");

                const country = getCountryName(
                  container.exportCountry
                );

                return (
                  <article
                    key={container.id}
                    className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#09192d] transition-all duration-300 hover:-translate-y-1 hover:border-[#d9a441]/30"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#050f1c]">
                      <img
                        src={container.imageUrl}
                        alt={title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#061322]/80 via-transparent to-transparent" />

                      {country && (
                        <div
                          className={`absolute top-4 inline-flex max-w-[75%] items-center gap-1.5 rounded-lg border border-white/10 bg-[#071a31]/90 px-2.5 py-1.5 text-[10px] font-bold text-white backdrop-blur-md ${
                            isArabic ? "right-4" : "left-4"
                          }`}
                        >
                          <Globe2 className="h-3 w-3 shrink-0 text-[#d9a441]" />

                          <span className="truncate">
                            {country}
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setActiveImage({
                            url: container.imageUrl,
                            title,
                          })
                        }
                        className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/30 text-white opacity-0 backdrop-blur-md transition hover:bg-[#d9a441] group-hover:opacity-100"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d9a441]">
                        <Ship className="h-3 w-3" />
                        {isArabic
                          ? "شحنة مصدّرة"
                          : "Export Shipment"}
                      </div>

                      <h3
                        className={`line-clamp-2 min-h-[42px] text-sm font-bold leading-6 text-white transition-colors group-hover:text-[#e1b65e] ${
                          isArabic ? "text-right" : "text-left"
                        }`}
                      >
                        {title}
                      </h3>

                      {country && (
                        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-4">
                          <Globe2 className="h-3.5 w-3.5 shrink-0 text-[#d9a441]" />

                          <span className="truncate text-xs text-slate-400">
                            {country}
                          </span>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                to="/export-gallery"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#d9a441] px-7 py-3.5 text-xs font-bold text-[#071525] shadow-lg shadow-[#d9a441]/10 transition hover:bg-[#e3b65c]"
              >
                {isArabic
                  ? "استكشف جميع الشحنات"
                  : "Explore All Shipments"}

                {isArabic ? (
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-[#d9a441]"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="max-h-[90vh] max-w-[92vw] overflow-hidden rounded-2xl border border-white/10 bg-[#071525] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage.url}
              alt={activeImage.title}
              className="max-h-[82vh] max-w-[90vw] object-contain"
            />

            <div className="border-t border-white/[0.07] px-5 py-4">
              <p className="text-sm font-semibold text-white">
                {activeImage.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
