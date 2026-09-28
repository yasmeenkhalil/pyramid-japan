import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MachineryGallery from "../components/MachineryGallery";

export default function MachineryDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  const isRtl = i18n.dir() === "rtl";
  const currentLang = i18n.language;

  // Machine data
  const [machineData, setMachineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Modal / Toast / Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [session, setSession] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // --------------------------------------------------
  // Check session فقط لتعبئة بيانات المستخدم إن وجد
  // لا يوجد أي إجبار على تسجيل الدخول
  // --------------------------------------------------
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL ||
            "https://app.pyramidjapan.jp"
          }/api/auth/session`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data?.user) {
            setSession(data);

            setFormData((prev) => ({
              ...prev,
              name: data.user.name || prev.name || "",
              email: data.user.email || prev.email || "",
            }));
          }
        }
      } catch (error) {
        // المستخدم غير مسجل أو session غير متاحة
        // وهذا لا يمنع إرسال الاستفسار
        console.log("No authenticated session");
      }
    }

    checkAuth();

    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("focus", checkAuth);

    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("focus", checkAuth);
    };
  }, []);

  // --------------------------------------------------
  // Fetch machinery
  // --------------------------------------------------
  useEffect(() => {
    async function fetchMachineDetails() {
      setIsLoading(true);
      setFetchError(null);

      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL ||
            "https://app.pyramidjapan.jp"
          }/api/machinery/${id}`
        );

        if (res.ok) {
          const data = await res.json();

          setMachineData(data);
        } else {
          setFetchError(t("details.fetch_error"));
        }
      } catch (err) {
        console.error(err);
        setFetchError(t("details.fetch_error"));
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchMachineDetails();
    }
  }, [id, t]);

  // --------------------------------------------------
  // Form
  // --------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // Submit quote
  // لا يوجد شرط تسجيل دخول
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL ||
          "https://app.pyramidjapan.jp"
        }/api/inquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,

            type: "machinery_quote",

            // إذا كان مسجل دخول نرسل الإيميل،
            // وإذا كان زائر نرسل null
            userId: session?.user?.email || null,

            machineId: machineData?.id,
            machineSlug: machineData?.slug,
          }),
        }
      );

      if (response.ok) {
        setShowToast(true);

        setFormData({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          phone: "",
          message: "",
        });

        setIsModalOpen(false);

        setTimeout(() => {
          setShowToast(false);
        }, 4000);
      } else {
        let errorData = {};

        try {
          errorData = await response.json();
        } catch {
          errorData = {};
        }

        setErrorMessage(
          errorData.message ||
            t("details.form.api_error_fallback")
        );
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);

      setErrorMessage(
        t("details.form.api_error_fallback")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <div className="animate-spin h-8 w-8 border-4 border-slate-300 border-t-[#C47B36] rounded-full" />

        <p className="text-sm font-medium text-slate-500 animate-pulse">
          {t("details.loading_machine")}
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Error
  // --------------------------------------------------
  if (fetchError || !machineData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="text-4xl mb-2">⚠️</div>

        <h2 className="text-lg font-bold text-slate-800">
          {fetchError || t("details.not_found")}
        </h2>

        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          {t("details.not_found_desc")}
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Translated data
  // --------------------------------------------------
  const displayTitle =
    currentLang === "ar"
      ? machineData.titleAr
      : currentLang === "ja"
      ? machineData.titleJa
      : currentLang === "ru"
      ? machineData.titleRu
      : machineData.titleEn;

  const displayDescription =
    currentLang === "ar"
      ? machineData.descriptionAr
      : currentLang === "ja"
      ? machineData.descriptionJa
      : currentLang === "ru"
      ? machineData.descriptionRu
      : machineData.descriptionEn;

  const displayCategory =
    currentLang === "ar"
      ? machineData.category?.nameAr
      : currentLang === "ja"
      ? machineData.category?.nameJa
      : currentLang === "ru"
      ? machineData.category?.nameRu
      : machineData.category?.nameEn;

  const isSold = Boolean(machineData.isSold);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">

      {/* Success Toast */}
      {showToast && (
        <div
          className={`fixed top-5 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 font-medium text-sm border border-emerald-400/20 ${
            isRtl ? "left-5" : "right-5"
          }`}
        >
          <span className="text-base">✓</span>

          <span>
            {t("details.toast_success")}
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">

        {/* Main machine card */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">

          {/* Gallery */}
          <div className="w-full lg:w-1/2">
            <MachineryGallery
              images={machineData.images || []}
              title={displayTitle}
              category={displayCategory}
              isSold={isSold}
              soldLabel={t("machinery.sold_badge")}
              dir={isRtl ? "rtl" : "ltr"}
            />
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">

            <div>

              {/* Stock + Published */}
              <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                <span>
                  {t("details.stock_id")} : #
                  {machineData.stockNo ||
                    machineData.id.slice(0, 6)}
                </span>

                <span>
                  {t("details.published")} :{" "}
                  {new Date(
                    machineData.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-[#0F172A] uppercase mb-1">
                {machineData.manufacturer?.name}{" "}
                {machineData.slug.replace(/-/g, " ")}
              </h1>

              <p className="text-lg text-slate-500 mb-2">
                {displayTitle}
              </p>

              <p className="text-sm text-slate-400 mb-6">
                {displayDescription}
              </p>

              {/* Basic specifications */}
              <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4 mb-6">

                <div className="text-center">
                  <span className="block text-xs text-slate-400 uppercase font-medium">
                    {t("machine.year")}
                  </span>

                  <span className="text-base font-bold text-[#0F172A]">
                    {machineData.year}
                  </span>
                </div>

                <div className="text-center border-x border-slate-100">
                  <span className="block text-xs text-slate-400 uppercase font-medium">
                    {t("machine.hours")}
                  </span>

                  <span className="text-base font-bold text-[#0F172A]">
                    {machineData.hour}{" "}
                    {t("machine.hours_unit")}
                  </span>
                </div>

                <div className="text-center">
                  <span className="block text-xs text-slate-400 uppercase font-medium">
                    {t("machine.location")}
                  </span>

                  <span className="text-base font-bold text-[#0F172A]">
                    {t(
                      `machine.locations.${machineData.location?.toLowerCase()}`,
                      machineData.location
                    )}
                  </span>
                </div>

              </div>

              {/* Price ranges */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">

                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  {t("details.price_ranges")}
                </h3>

                <div className="grid grid-cols-3 gap-3 text-center">

                  <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 font-medium mb-0.5">
                      {t("details.min_price")}
                    </span>

                    <span className="text-sm font-bold text-slate-700">
                      ¥{" "}
                      {machineData.minPrice?.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-white border border-[#C47B36]/20 rounded-lg p-2.5 shadow-sm">
                    <span className="block text-[10px] text-[#C47B36] font-medium mb-0.5">
                      {t("details.avg_price")}
                    </span>

                    <span className="text-sm font-bold text-[#0F172A]">
                      ¥{" "}
                      {machineData.avgPrice?.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 font-medium mb-0.5">
                      {t("details.max_price")}
                    </span>

                    <span className="text-sm font-bold text-slate-700">
                      ¥{" "}
                      {machineData.maxPrice?.toLocaleString()}
                    </span>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom action */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-6">

              <div>
                <span className="block text-xs text-slate-400 uppercase font-medium">
                  {t("machine.fob_price")}
                </span>

                <span className="text-2xl font-black text-[#C47B36]">
                  {machineData.price > 0
                    ? `¥ ${machineData.price.toLocaleString()}`
                    : t("machine.inquire")}
                </span>
              </div>

              {/* Quote button - available للجميع */}
              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 bg-[#0F172A] hover:bg-[#C47B36] shadow-sm hover:shadow-md"
              >
                {t("machine.btn_quote")}
              </button>

            </div>
          </div>
        </div>

        {/* Specifications */}
        {machineData.specifications &&
          machineData.specifications.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">

              <h2 className="text-xl font-bold text-[#0F172A] mb-4 pb-2 border-b border-slate-100">
                {t("details.specs_title")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">

                {machineData.specifications.map(
                  (item, index) => {

                    const specName =
                      currentLang === "ar"
                        ? item.specification?.nameAr
                        : currentLang === "ja"
                        ? item.specification?.nameJa
                        : currentLang === "ru"
                        ? item.specification?.nameRu
                        : item.specification?.nameEn;

                    const unitName =
                      item.unit?.name || "";

                    return (
                      <div
                        key={index}
                        className="flex justify-between py-2 border-b border-slate-50 last:border-0 md:last:border-b"
                      >
                        <span className="text-slate-500 font-medium">
                          {specName ||
                            `${t(
                              "details.spec_label"
                            )} ${index + 1}`}
                        </span>

                        <span className="font-semibold text-[#0F172A]">
                          {item.value} {unitName}
                        </span>
                      </div>
                    );
                  }
                )}

              </div>
            </div>
          )}

      </div>

      {/* --------------------------------------------------
          Quote Modal
          متاح للزائر وللمستخدم المسجل
      -------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">

          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative"
            dir={isRtl ? "rtl" : "ltr"}
          >

            {/* Close */}
            <button
              type="button"
              onClick={() => {
                if (!isSubmitting) {
                  setIsModalOpen(false);
                  setErrorMessage("");
                }
              }}
              className={`absolute top-4 text-slate-400 hover:text-slate-600 text-xl ${
                isRtl ? "left-4" : "right-4"
              }`}
              disabled={isSubmitting}
            >
              ✕
            </button>

            {/* Header */}
            <div className="mb-5 pr-6">
              <h2 className="text-xl font-bold text-[#0F172A]">
                {t("details.modal_title")}
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {t("details.form.request_subtitle")}{" "}
                <span className="font-semibold text-[#C47B36]">
                  {displayTitle}
                </span>
              </p>
            </div>

            {/* API Error */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t("details.form.name")}
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] text-[#0F172A] disabled:bg-slate-50"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t("details.form.email")}
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] text-[#0F172A] disabled:bg-slate-50"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t("details.form.phone")}
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] text-[#0F172A] disabled:bg-slate-50"
                  placeholder="+81 90-1234-5678"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {t("details.form.message")}
                </label>

                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] text-[#0F172A] resize-none disabled:bg-slate-50"
                  placeholder={t(
                    "details.form.message_placeholder"
                  )}
                />
              </div>

              {/* Submit */}
              <div className="pt-2">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-[#0F172A] hover:bg-[#C47B36] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />

                      <span>
                        {t("details.form.submitting")}
                      </span>
                    </>
                  ) : (
                    <span>
                      {t("details.form.submit_btn")}
                    </span>
                  )}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}