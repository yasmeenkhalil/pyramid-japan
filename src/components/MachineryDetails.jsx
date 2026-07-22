import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MachineryDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";
  const currentLang = i18n.language; // لمعرفة اللغة الحالية (ar, en, ja)

  // حالات التحكم بالبيانات القادمة من الباك إند
  const [machineData, setMachineData] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [fetchError, setFetchError] = useState(null); 

  // حالات المودال والتوست والنموذج
  const [activeImage, setActiveImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
const [session, setSession] = useState(null);
const [status, setStatus] = useState("loading");
const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
  async function checkAuth() {
    try {
      const response = await fetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        if (data?.user) {
          setSession(data);
          setStatus("authenticated");
          setFormData(prev => ({
            ...prev,
            name: data.user.name || "",
            email: data.user.email || ""
          }));
        } else {
          setStatus("unauthenticated");
        }
      }
    } catch {
      setStatus("unauthenticated");
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

const isAuthenticated = status === "authenticated";

  // جلب البيانات من الـ API بأسلوب fetch المعتمد لديك
  useEffect(() => {
    async function fetchMachineDetails() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const res = await fetch(`/api/machinery/${id}`);
        
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setMachineData(data);
          
          if (data.images && data.images.length > 0) {
            const firstImg = data.images[0].imageUrl || data.images[0];
            setActiveImage(firstImg);
          }
        } else {
          setFetchError(t('details.fetch_error'));
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setFetchError(t('details.fetch_error'));
        setIsLoading(false);
      }
    }
    
    if (id) {
      fetchMachineDetails();
    }
  }, [id, t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");

  if (!isAuthenticated) {
    setErrorMessage(t("contact_page.err_auth"));
    return;
  }

  try {
    setIsSubmitting(true);
    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        type: "machinery_quote", // لتحديد نوع الاستفسار في الباك إند
        userId: session?.user?.email || null,
        machineId: machineData?.id,
        machineSlug: machineData?.slug
      }),
    });

    if (response.ok) {
      setShowToast(true);
      setFormData({ name: session?.user?.name || "", email: session?.user?.email || "", phone: "", message: "" });
      setIsModalOpen(false);
      setTimeout(() => setShowToast(false), 4000);
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.message || t('details.form.api_error_fallback'));
    }
  } catch (error) {
    console.error("Error submitting quote request:", error);
  } finally {
    setIsSubmitting(false);
  }
};



  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <div className="animate-spin h-8 w-8 border-4 border-slate-300 border-t-[#C47B36] rounded-full" />
        <p className="text-sm font-medium text-slate-500 animate-pulse">{t('details.loading_machine')}</p>
      </div>
    );
  }

  if (fetchError || !machineData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="text-4xl mb-2">⚠️</div>
        <h2 className="text-lg font-bold text-slate-800">{fetchError || t('details.not_found')}</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">{t('details.not_found_desc')}</p>
      </div>
    );
  }

  // فرز العناوين والوصف بناءً على اللغة الحالية المفعّلة في الموقع ديناميكياً
  const displayTitle = currentLang === 'ar' ? machineData.titleAr : currentLang === 'ja' ? machineData.titleJa : machineData.titleEn;
  const displayDescription = currentLang === 'ar' ? machineData.descriptionAr : currentLang === 'ja' ? machineData.descriptionJa : machineData.descriptionEn;
  const displayCategory = currentLang === 'ar' ? machineData.category?.nameAr : currentLang === 'ja' ? machineData.category?.nameJa : machineData.category?.nameEn;
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      
      {showToast && (
        <div className={`fixed top-5 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 font-medium text-sm border border-emerald-400/20 ${isRtl ? 'left-5' : 'right-5'}`}>
          <span className="text-base">✓</span>
          <span>{t('details.toast_success')}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          
          {/* معرض الصور الديناميكي */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="relative h-96 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex justify-center items-center">
              <span className={`absolute top-4 px-3 py-1 rounded-full bg-[#C47B36] text-white text-[10px] font-semibold uppercase tracking-wide z-10 ${isRtl ? 'right-4' : 'left-4'}`}>
                {displayCategory}
              </span>
              <img src={activeImage} alt={displayTitle} className="w-90 h-full object-cover object-center transition-all duration-300" />
            </div>

            {machineData.images && machineData.images.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth select-none cursor-grab active:cursor-grabbing snap-x whitespace-nowrap scrollbar-thin scrollbar-thumb-slate-300 stroke-transparent">
                {machineData.images.map((img, index) => {
                  const imgUrl = img.imageUrl || img; // معالجة إذا كانت الصورة أوبجكت أو نص عادي
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 bg-slate-50 transition-all snap-center ${activeImage === imgUrl ? 'border-[#C47B36] shadow-md scale-95' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                      <img src={imgUrl} alt={`thumb-${index}`} className="w-full h-full object-cover object-center pointer-events-none" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* تفاصيل الموديل والمواصفات الأساسية الراجعة من الـ Object */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                <span>{t('details.stock_id')} : #{machineData.stockNo || machineData.id.slice(0,6)}</span>
                <span>{t('details.published')} : {new Date(machineData.createdAt).toLocaleDateString()}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-[#0F172A] uppercase mb-1">
                {machineData.manufacturer?.name} {machineData.slug.replace(/-/g, ' ')}
              </h1>
              <p className="text-lg text-slate-500 mb-2">{displayTitle}</p>
              <p className="text-sm text-slate-400 mb-6">{displayDescription}</p>

              <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4 mb-6">
                <div className="text-center">
                  <span className="block text-xs text-slate-400 uppercase font-medium">{t('machine.year')}</span>
                  <span className="text-base font-bold text-[#0F172A]">{machineData.year}</span>
                </div>
                <div className="text-center border-x border-slate-100">
                  <span className="block text-xs text-slate-400 uppercase font-medium">{t('machine.hours')}</span>
                  <span className="text-base font-bold text-[#0F172A]">{machineData.hour} {t('machine.hours_unit')}</span>
                </div>
                <div className="text-center">
                  <span className="block text-xs text-slate-400 uppercase font-medium">{t('machine.location')}</span>
                  <span className="text-base font-bold text-[#0F172A]">
                    {t(`machine.locations.${machineData.location?.toLowerCase()}`, machineData.location)}
                  </span>
                </div>
              </div>

              {/* أسعار تقديرية من حقول الـ Object */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">{t('details.price_ranges')}</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 font-medium mb-0.5">{t('details.min_price')}</span>
                    <span className="text-sm font-bold text-slate-700">¥ {machineData.minPrice?.toLocaleString()}</span>
                  </div>
                  <div className="bg-white border border-[#C47B36]/20 rounded-lg p-2.5 shadow-sm">
                    <span className="block text-[10px] text-[#C47B36] font-medium mb-0.5">{t('details.avg_price')}</span>
                    <span className="text-sm font-bold text-[#0F172A]">¥ {machineData.avgPrice?.toLocaleString()}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 font-medium mb-0.5">{t('details.max_price')}</span>
                    <span className="text-sm font-bold text-slate-700">¥ {machineData.maxPrice?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-6">
              <div>
                <span className="block text-xs text-slate-400 uppercase font-medium">{t('machine.fob_price')}</span>
                <span className="text-2xl font-black text-[#C47B36]">
                  {machineData.price > 0 ? `¥ ${machineData.price.toLocaleString()}` : t('machine.inquire')}
                </span>
              </div>
             <button 
  onClick={() => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    }
  }}
  disabled={!isAuthenticated}
  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300
    disabled:bg-slate-300 disabled:cursor-not-allowed disabled:text-slate-500
    bg-[#0F172A] hover:bg-[#C47B36]"
>
  {isAuthenticated ? t('machine.btn_quote') : t('machine.btn_quote_login_required')}
</button>

            </div>
          </div>
        </div>

{machineData.specifications && machineData.specifications.length > 0 && (
  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
    <h2 className="text-xl font-bold text-[#0F172A] mb-4 pb-2 border-b border-slate-100">
      {t('details.specs_title')}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
      {machineData.specifications.map((item, index) => {
        const specName = 
          currentLang === 'ar' ? item.specification?.nameAr : 
          currentLang === 'ja' ? item.specification?.nameJa : 
          item.specification?.nameEn;

        // 2. استخراج اسم الوحدة القياسية إن وجدت (مثل kg أو HP)
        const unitName = item.unit?.name || '';

        return (
          <div key={index} className="flex justify-between py-2 border-b border-slate-50 last:border-0 md:last:border-b">
            {/* اسم المواصفة المترجم */}
            <span className="text-slate-500 font-medium">
              {specName || `${t('details.spec_label')} ${index + 1}`}
            </span>
            
            {/* القيمة متبوعة بالوحدة */}
            <span className="font-semibold text-[#0F172A]">
              {item.value} {unitName}
            </span>
          </div>
        );
      })}
    </div>
  </div>
)}

      </div>
{/* المودال ونموذج التواصل المحمي من الباك إند */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
    <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative" dir={isRtl ? "rtl" : "ltr"}>
      <button onClick={() => { if(!isSubmitting) setIsModalOpen(false); }} className={`absolute top-4 text-slate-400 hover:text-slate-600 text-xl ${isRtl ? 'left-4' : 'right-4'}`} disabled={isSubmitting}>✕</button>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#0F172A]">{t('details.modal_title')}</h2>
        <p className="text-xs text-slate-500 mt-1">{t('details.form.request_subtitle')} <span className="font-semibold text-[#C47B36]">{displayTitle}</span></p>
      </div>
      
      {/* 1. حماية التوثيق التلقائية مثل صفحة الاتصال */}
      {!isAuthenticated && status !== "loading" && (
        <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium rounded-xl">
          ⚠️ {t("contact_page.err_auth")}
        </div>
      )}

      {errorMessage && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs font-medium rounded-xl">⚠️ {errorMessage}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">{t('details.form.name')}</label>
          <input type="text" name="name" required value={formData.name} onChange={handleInputChange} disabled={isSubmitting} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] text-[#0F172A] disabled:bg-slate-50" placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">{t('details.form.email')}</label>
          <input type="email" name="email" required value={formData.email} onChange={handleInputChange} disabled={isSubmitting} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] text-[#0F172A] disabled:bg-slate-50" placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">{t('details.form.phone')}</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] text-[#0F172A] disabled:bg-slate-50" placeholder="+81 90-1234-5678" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">{t('details.form.message')}</label>
          <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} disabled={isSubmitting} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] text-[#0F172A] resize-none disabled:bg-slate-50" placeholder={t('details.form.message_placeholder')}></textarea>
        </div>
        
        {/* 2. قفل وتفعيل زر الإرسال بناءً على حالة تسجيل الدخول الفورية */}
        <div className="pt-2">
          <button 
            type="submit" 
            disabled={!isAuthenticated || isSubmitting} 
            className="w-full py-3 rounded-xl bg-[#0F172A] hover:bg-[#C47B36] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                <span>{t('details.form.submitting')}</span>
              </>
            ) : (
              <span>{t('details.form.submit_btn')}</span>
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
