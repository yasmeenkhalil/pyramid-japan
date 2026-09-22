import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowUpRight,
  ChevronRight,
  Layers3,
  PackageOpen,
} from "lucide-react";

export default function ConstructionCategories() {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_API_URL || "https://app.pyramidjapan.jp";

        const response = await fetch(
          `${apiUrl}/api/categories?sector=Construction`
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setCategories(data);
        }
      } catch (error) {
        console.error(
          "Error fetching construction categories:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =========================================================
  // LANGUAGE
  // =========================================================

  const getLanguage = () => {
    const language = i18n.language || "en";

    if (language.startsWith("ar")) return "ar";
    if (language.startsWith("ja")) return "ja";
    if (language.startsWith("ru")) return "ru";

    return "en";
  };

  // =========================================================
  // CATEGORY NAME
  // =========================================================

  const getCategoryName = (cat) => {
    if (!cat) return "";

    const lang = getLanguage();

    const names = {
      en: cat.nameEn,
      ar: cat.nameAr,
      ja: cat.nameJa,
      ru: cat.nameRu,
    };

    return names[lang] || cat.nameEn || cat.name || "";
  };

  // =========================================================
  // CATEGORY DESCRIPTION
  // =========================================================

  const getCategoryDesc = (cat) => {
    if (!cat) return "";

    const lang = getLanguage();

    const descriptions = {
      en: cat.descriptionEn,
      ar: cat.descriptionAr,
      ja: cat.descriptionJa,
      ru: cat.descriptionRu,
    };

    return (
      descriptions[lang] ||
      cat.descriptionEn ||
      cat.description ||
      ""
    );
  };

  // =========================================================
  // OPEN CATEGORY
  // =========================================================

  const openCategory = (id) => {
    navigate(
      `/machinery-all/${id}?sector=Construction`
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#F7F8FA] py-14">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#C47B36]/[0.035] blur-3xl" />

        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-slate-200/30 blur-3xl" />

        <div className="absolute right-[8%] top-12 hidden h-16 w-16 rotate-12 rounded-2xl border border-[#C47B36]/10 lg:block" />

        <div className="absolute bottom-14 left-[7%] hidden h-12 w-12 rounded-full border border-slate-200 lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-7 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-xl">

            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#C47B36]" />

              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C47B36]">
                {t("con_cat.badge")}
              </span>
            </div>

            <h2 className="text-[27px] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#142B45] sm:text-[32px] lg:text-[36px]">
              {t("con_cat.title")}
            </h2>

            <p className="mt-3 max-w-lg text-[12px] leading-5 text-slate-500">
              {t("con_cat.desc")}
            </p>
          </div>

          {/* =================================================
              COUNT
          ================================================== */}

          {!loading && categories.length > 0 && (
            <div className="hidden shrink-0 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm sm:flex">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#142B45] text-white">
                <Layers3
                  size={14}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <p className="text-lg font-extrabold leading-none text-[#142B45]">
                  {categories.length}
                </p>

                <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {t("con_cat.categories") || "Categories"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[17px] border border-slate-200 bg-white"
              >
                <div className="h-[125px] animate-pulse bg-slate-100" />

                <div className="space-y-2.5 p-3.5">
                  <div className="h-3.5 w-3/4 animate-pulse rounded bg-slate-100" />

                  <div className="h-2.5 w-full animate-pulse rounded bg-slate-100" />

                  <div className="h-2.5 w-2/3 animate-pulse rounded bg-slate-100" />

                  <div className="mt-3 h-2.5 w-16 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (

          /* =====================================================
             EMPTY
          ====================================================== */

          <div className="flex min-h-[190px] flex-col items-center justify-center rounded-[20px] border border-dashed border-slate-300 bg-white px-5 text-center">

            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
              <PackageOpen
                size={21}
                strokeWidth={1.5}
              />
            </div>

            <p className="text-xs font-semibold text-slate-600">
              {t("con_cat.no_data")}
            </p>
          </div>

        ) : (

          /* =====================================================
             CATEGORY GRID
          ====================================================== */

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {categories.map((cat, index) => {

              const name = getCategoryName(cat);
              const description = getCategoryDesc(cat);

              return (
                <article
                  key={cat.id || cat.slug}
                  onClick={() => openCategory(cat.id)}
                  className="group relative cursor-pointer overflow-hidden rounded-[17px] border border-slate-200/80 bg-white transition-all duration-400 hover:-translate-y-1 hover:border-[#C47B36]/40 hover:shadow-[0_15px_35px_-16px_rgba(15,23,42,0.22)]"
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <div className="relative h-[125px] overflow-hidden bg-slate-100">

                    {cat.imageUrl ? (

                      <img
                        src={cat.imageUrl}
                        alt={name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-600 ease-out group-hover:scale-[1.06]"
                      />

                    ) : (

                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">

                        <PackageOpen
                          size={30}
                          strokeWidth={1.2}
                          className="text-slate-300"
                        />

                      </div>
                    )}

                    {/* Image Gradient */}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#081F3F]/55 via-transparent to-transparent opacity-70" />

                    {/* =================================================
                        NUMBER
                    ================================================== */}

                    <div className="absolute left-3 top-3 flex h-6 min-w-6 items-center justify-center rounded-md border border-white/20 bg-black/20 px-1.5 text-[8px] font-bold text-white backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* =================================================
                        ARROW
                    ================================================== */}

                    <div className="absolute right-3 top-3 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full bg-white/95 text-[#142B45] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                      <ArrowUpRight
                        size={13}
                        strokeWidth={2}
                      />

                    </div>

                    {/* =================================================
                        UNITS
                    ================================================== */}

                    <div className="absolute bottom-3 left-3">

                      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-[#081F3F]/65 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-white backdrop-blur-md">

                        <span className="h-1 w-1 rounded-full bg-[#D9A441]" />

                        {cat.machineryCount || 0}{" "}
                        {t("con_cat.units")}

                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================== */}

                  <div className="p-3.5">

                    <div className="min-h-[58px]">

                      {/* Name */}

                      <h3 className="line-clamp-2 text-[15px] font-extrabold leading-[1.25] tracking-[-0.015em] text-[#142B45] transition-colors duration-300 group-hover:text-[#C47B36]">
                        {name}
                      </h3>

                      {/* Description */}

                      {description && (
                        <p className="mt-1.5 line-clamp-2 text-[9.5px] leading-[1.55] text-slate-500">
                          {description}
                        </p>
                      )}
                    </div>

                    {/* =================================================
                        DIVIDER
                    ================================================== */}

                    <div className="my-3 h-px bg-slate-100 transition-colors duration-300 group-hover:bg-[#C47B36]/20" />

                    {/* =================================================
                        CTA
                    ================================================== */}

                    <div className="flex items-center justify-between">

                      <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#142B45] transition-colors duration-300 group-hover:text-[#C47B36]">
                        {t("con_cat.btn")}
                      </span>

                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-[#C47B36] group-hover:bg-[#C47B36] group-hover:text-white">

                        <ChevronRight
                          size={12}
                          strokeWidth={2}
                        />

                      </div>
                    </div>
                  </div>

                  {/* =================================================
                      GOLD ACCENT
                  ================================================== */}

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C47B36] transition-all duration-500 group-hover:w-full" />

                </article>
              );
            })}
          </div>
        )}

        {/* =====================================================
            BOTTOM
        ====================================================== */}

        {!loading && categories.length > 0 && (
          <div className="mt-6 flex items-center justify-center">

            <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-400">

              <span className="h-px w-5 bg-slate-200" />

              <span>
                {t("con_cat.explore") ||
                  "Explore Construction Machinery"}
              </span>

              <span className="h-px w-5 bg-slate-200" />

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
