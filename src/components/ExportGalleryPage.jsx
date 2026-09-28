import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Search,
  X,
  Maximize2,
  Package,
  Globe2,
  MapPin,
  ImageOff,
} from "lucide-react";

export default function ExportGalleryPage() {
  const { t, i18n } = useTranslation();

  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const isArabic = i18n.language?.startsWith("ar");
  const isJapanese = isArabic ? false : i18n.language?.startsWith("ja");
  const isRussian = isArabic || isJapanese ? false : i18n.language?.startsWith("ru");

  const apiBase = import.meta.env.VITE_API_URL || "https://pyramidjapan.jp";

  /*
   * -----------------------------------------
   * Fetch export containers
   * -----------------------------------------
   */
  useEffect(() => {
    let mounted = true;

    const fetchContainers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiBase}/api/containers`);

        if (!response.ok) {
          throw new Error("Failed to fetch export containers");
        }

        const data = await response.json();
        if (!mounted) return;

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data?.containers)
          ? data.containers
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setContainers(items);
      } catch (error) {
        console.error("Failed to load export containers:", error);
        if (mounted) setContainers([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchContainers();
    return () => { mounted = false; };
  }, [apiBase]);

  /*
   * -----------------------------------------
   * Helpers (تصحيح مسار قراءة الدول والألقاب)
   * -----------------------------------------
   */
  const getCountryName = (container) => {
    if (!container) return t("export_gallery.not_specified");

    // قراءة البيانات من جدول الموديل المتصل العائد للدولة المقترنة بالسجل
    const expCountry = container.exportCountry;

    if (isArabic) {
      return expCountry?.nameAr || expCountry?.nameEn || container.countryAr || container.destinationAr || t("export_gallery.not_specified");
    }
    if (isJapanese) {
      return expCountry?.nameJa || expCountry?.nameEn || container.countryJa || container.destinationJa || t("export_gallery.not_specified");
    }
    if (isRussian) {
      return expCountry?.nameRu || expCountry?.nameEn || container.countryRu || container.destinationRu || t("export_gallery.not_specified");
    }
    return expCountry?.nameEn || container.countryEn || container.destinationEn || t("export_gallery.not_specified");
  };

  const getContainerTitle = (container) => {
    if (!container) return t("export_gallery.export_shipment");

    if (isArabic) {
      return container.titleAr || container.titleEn || container.nameAr || t("export_gallery.export_shipment");
    }
    if (isJapanese) {
      return container.titleJa || container.titleEn || container.nameJa || t("export_gallery.export_shipment");
    }
    if (isRussian) {
      return container.titleRu || container.titleEn || container.nameRu || t("export_gallery.export_shipment");
    }
    return container.titleEn || container.titleAr || container.nameEn || t("export_gallery.export_shipment");
  };

  const getContainerImage = (container) => {
    if (!container) return null;
    return container.imageUrl || container.image || null;
  };

  const getContainerId = (container) => {
    return String(container?.id || Math.random().toString(36).slice(2));
  };

  // تجميع الدول الفريدة بشكل ديناميكي لتغذية صندوق الخيارات والفلترة
  const countries = useMemo(() => {
    const countryMap = new Map();

    containers.forEach((container) => {
      const country = getCountryName(container);
      if (country && country !== t("export_gallery.not_specified")) {
        const key = country.toLowerCase().trim();
        if (!countryMap.has(key)) {
          countryMap.set(key, country);
        }
      }
    });

    return Array.from(countryMap.values()).sort((a, b) =>
      a.localeCompare(b, i18n.language)
    );
  }, [containers, i18n.language]);

  const filteredContainers = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return containers.filter((container) => {
      const country = getCountryName(container);
      const title = getContainerTitle(container);

      const matchesCountry = !selectedCountry || country === selectedCountry;
      const matchesSearch =
        !search ||
        country.toLowerCase().includes(search) ||
        title.toLowerCase().includes(search);

      return matchesCountry && matchesSearch;
    });
  }, [containers, selectedCountry, searchTerm, i18n.language]);

  const totalShipments = containers.length;
  const totalDestinations = countries.length;

  const clearFilters = () => {
    setSelectedCountry("");
    setSearchTerm("");
  };

  const hasFilters = Boolean(selectedCountry || searchTerm);
  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#F8FAFC] text-[#111827]"
    >
      {/* =========================================
          HEADER
      ========================================== */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            {/* Heading */}
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                {t("export_gallery.badge")}
              </div>

              <h1 className="max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {t("export_gallery.title")}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                {t("export_gallery.description")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="min-w-[130px] border-e border-slate-200 px-5 py-5 sm:px-7">
                <Package className="mb-3 h-5 w-5 text-slate-700" />
                <div className="text-2xl font-black text-slate-950">
                  {totalShipments}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500">
                  {t("export_gallery.shipments")}
                </div>
              </div>

              <div className="min-w-[130px] px-5 py-5 sm:px-7">
                <Globe2 className="mb-3 h-5 w-5 text-slate-700" />
                <div className="text-2xl font-black text-slate-950">
                  {totalDestinations}
                </div>
                <div className="mt-1 text-xs font-medium text-slate-500">
                  {t("export_gallery.destinations")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FILTERS
      ========================================== */}
      <section className="border-b border-slate-200 bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid gap-3 md:grid-cols-[1fr_280px_auto]">
            {/* Search */}
            <div className="relative">
              <Search
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                  isArabic ? "right-4" : "left-4"
                }`}
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("export_gallery.search_placeholder")}
                className={`h-12 w-full rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/[0.04] ${
                  isArabic ? "pr-11 pl-4" : "pl-11 pr-4"
                }`}
              />
            </div>

            {/* Country */}
            <div className="relative">
              <Globe2
                className={`absolute top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                  isArabic ? "right-4" : "left-4"
                }`}
              />

              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className={`h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-900/[0.04] ${
                  isArabic ? "pl-10 pr-11" : "pl-11 pr-10"
                }`}
              >
                <option value="">{t("export_gallery.all_countries")}</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <ChevronDown
                className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${
                  isArabic ? "left-4" : "right-4"
                }`}
              />
            </div>

            {/* Clear */}
            {hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 transition-all hover:border-slate-950 hover:bg-slate-950 hover:text-white"
              >
                <X className="h-4 w-4" />
                {t("export_gallery.clear_filters")}
              </button>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>

          {/* Result summary */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-medium text-slate-500">
              {hasFilters ? (
                <>
                  {t("export_gallery.showing_results_for")}{" "}
                  <span className="font-bold text-slate-900">
                    {selectedCountry || searchTerm}
                  </span>
                </>
              ) : (
                t("export_gallery.all_shipments")
              )}
            </p>

            <p className="text-xs font-bold text-slate-400">
              {filteredContainers.length} {t("export_gallery.results")}
            </p>
          </div>
        </div>
      </section>
      {/* =========================================
          CONTENT
      ========================================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Loading */}
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="aspect-[4/3] animate-pulse bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredContainers.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredContainers.map((container, index) => {
              const image = getContainerImage(container);
              const country = getCountryName(container);
              const title = getContainerTitle(container);
              const id = getContainerId(container);

              return (
                <article
                  key={`${id}-${index}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageOff className="h-10 w-10 text-slate-300" />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent opacity-70" />

                    {/* Country */}
                    <div className={`absolute top-4 ${isArabic ? "right-4" : "left-4"}`}>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/70 bg-white/95 px-2.5 py-1.5 text-[10px] font-bold text-slate-800 shadow-sm backdrop-blur">
                        <MapPin className="h-3 w-3 text-[#B8892D]" />
                        {country}
                      </span>
                    </div>

                    {/* Image preview */}
                    {image && (
                      <button
                        type="button"
                        onClick={() => setSelectedImage({ src: image, title })}
                        aria-label={t("export_gallery.zoom_image")}
                        className={`absolute bottom-4 ${
                          isArabic ? "left-4" : "right-4"
                        } flex h-9 w-9 items-center justify-center rounded-xl bg-black/80 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:bg-[#D9A441]`}
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                      {t("export_gallery.export_shipment")}
                    </div>

                    <h2 className="line-clamp-2 min-h-[48px] text-sm font-bold leading-6 text-slate-900 transition-colors group-hover:text-[#B8892D]">
                      {title}
                    </h2>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-medium text-slate-400">
                        {t("export_gallery.destination")}
                      </span>
                      <span className="max-w-[60%] truncate text-xs font-bold text-slate-700">
                        {country}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Search className="h-6 w-6 text-slate-400" />
              </div>

              <h2 className="text-xl font-black text-slate-900">
                {containers.length === 0
                  ? t("export_gallery.no_shipments")
                  : t("export_gallery.no_results_title")}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {t("export_gallery.no_results_description")}
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#D9A441]"
                >
                  <X className="h-4 w-4" />
                  {t("export_gallery.clear_filters")}
                </button>
              )}
            </div>
          </div>
        )}
      </section>

      {/* =========================================
          FOOTER CTA
      ========================================== */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D9A441]">
                {t("export_gallery.footer_title")}
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                {t("export_gallery.footer_description")}
              </p>
            </div>

            <Link
              to="/export"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-[#D9A441] hover:text-white"
            >
              {t("export_gallery.back_to_export")}
              {isArabic ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          IMAGE MODAL (Lightbox)
      ========================================== */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label={t("export_gallery.close")}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-6 pb-5 pt-12">
              <p className="text-sm font-bold text-white">
                {selectedImage.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
