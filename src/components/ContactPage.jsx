import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Lock } from "lucide-react";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  console.log("URL:", window.location.href);
  console.log("search:", window.location.search);
  console.log("inquiry:", searchParams.get("inquiry"));
  const inquiryType = searchParams.get("inquiry") || "general";

  const getInitialType = (type) => {
    if (type === "maintenance-service" || type === "custom-test" || type === "maintenance") return "maintenance";
    if (type === "spare-parts" || type === "parts") return "parts";
    if (type === "custom-sourcing" || type === "agriculture-sourcing" || type === "agriculture") return "agriculture";
    if (type === "export") return "export";
    if (type === "construction") return "construction";
    return "general";
  };

  const [pageContent, setPageContent] = useState({
    title: "",
    desc: ""
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: getInitialType(inquiryType),
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
              name: data.user.name || ""
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
  useEffect(() => {
    if (inquiryType === "export") {
      setPageContent({
        title: t("contact_page.title_export"),
        desc: t("contact_page.desc_export")
      });
    } else if (inquiryType === "construction") {
      setPageContent({
        title: t("contact_page.title_construction"),
        desc: t("contact_page.desc_construction")
      });
    } else if (inquiryType === "maintenance-service" || inquiryType === "custom-test" || inquiryType === "maintenance") {
      setPageContent({
        title: inquiryType === "custom-test" ? t("contact_page.title_test") : t("contact_page.title_maintenance"),
        desc: inquiryType === "custom-test" ? t("contact_page.desc_test") : t("contact_page.desc_maintenance")
      });
    } else if (inquiryType === "spare-parts" || inquiryType === "parts") {
      setPageContent({
        title: t("contact_page.title_parts"),
        desc: t("contact_page.desc_parts")
      });
    } else if (inquiryType === "custom-sourcing" || inquiryType === "agriculture-sourcing" || inquiryType === "agriculture") {
      setPageContent({
        title: inquiryType === "agriculture-sourcing" || inquiryType === "agriculture" ? t("contact_page.title_agri_source") : t("contact_page.title_custom_source"),
        desc: inquiryType === "agriculture-sourcing" || inquiryType === "agriculture" ? t("contact_page.desc_agri_source") : t("contact_page.desc_custom_source")
      });
    } else if (inquiryType === "engineer-consultation") {
      setPageContent({
        title: t("contact_page.title_consult"),
        desc: t("contact_page.desc_consult")
      });
    } else {
      setPageContent({
        title: t("contact_page.title_general"),
        desc: t("contact_page.desc_general")
      });
    }
  }, [inquiryType, i18n.language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isAuthenticated) {
      setErrorMessage(t("contact_page.err_auth"));
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: session?.user?.email || null
        }),
      });

      if (response.ok) {
        setShowToast(true);
        setFormData({ name: session?.user?.name || "", email: "", phone: "", type: "general", message: "" });
        setTimeout(() => setShowToast(false), 4000);
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] pt-0 pb-20 px-6 md:px-12 relative">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 font-medium text-sm border border-emerald-400/20">
          <span>✓</span>
          <span>{t("contact_page.toast_success")}</span>
        </div>
      )}

      <div className="mx-auto max-w-[1300px]">
        <div className="mb-10 text-left pt-6">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            {t("contact_page.badge")}
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[46px] leading-tight transition-all duration-300">
            {pageContent.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-600 leading-relaxed transition-all duration-300">
            {pageContent.desc}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-stretch max-w-7xl mx-auto">
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            <div className="rounded-3xl bg-[#081F3F] p-6 text-white shadow-md border border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441]/20 mb-4">
                <MessageSquare className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold">{t("contact_page.wa_title")}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {t("contact_page.wa_desc")}
              </p>
              <a 
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-xs font-bold text-[#081F3F] transition hover:bg-white"
              >
                {t("contact_page.wa_btn")}
              </a>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex-1 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-[#081F3F] border-b border-slate-100 pb-3 mb-6">
                  {t("contact_page.info_title")}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("contact_page.info_addr_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">
                        {t("contact_page.info_addr_val")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("contact_page.info_phone_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">+81 90-1234-5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("contact_page.info_email_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">info@pyramid-japan.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-slate-100 mt-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t("contact_page.info_hours_label")}
                  </h4>
                  <p className="text-sm font-bold text-[#081F3F] mt-0.5">
                    {t("contact_page.info_hours_val")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
            {!isAuthenticated && status !== "loading" && (
              <div className="absolute inset-0 z-10 bg-slate-50/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#081F3F] text-white shadow-xl mb-4">
                  <Lock className="h-6 w-6 text-[#D9A441]" />
                </div>
                <h3 className="text-lg font-black text-[#081F3F]">
                  {t("contact_page.lock_title")}
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mt-2 leading-relaxed">
                  {t("contact_page.lock_desc")}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-xl font-black text-[#081F3F] mb-1">
                {t("contact_page.form_title")}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {t("contact_page.form_desc")}
              </p>
              
              {errorMessage && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold">
                  ⚠️ {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                      {t("contact_page.label_name")}
                    </label>
                    <input 
                      type="text" 
                      required
                      disabled={loading || !isAuthenticated}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                      {t("contact_page.label_email")}
                    </label>
                    <input 
                      type="email" 
                      required
                      disabled={loading || !isAuthenticated}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                      {t("contact_page.label_phone")}
                    </label>
                    <input 
                      type="tel" 
                      required
                      disabled={loading || !isAuthenticated}
                      placeholder="+81 90-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                      {t("contact_page.label_dept")}
                    </label>
                    <select 
                      disabled={loading || !isAuthenticated}
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F] cursor-pointer"
                    >
                      <option value="general">{t("contact_page.opt_general")}</option>
                      <option value="export">{t("contact_page.opt_export")}</option>
                      <option value="construction">{t("contact_page.opt_construction")}</option>
                      <option value="agriculture">{t("contact_page.opt_agriculture")}</option>
                      <option value="parts">{t("contact_page.opt_parts")}</option>
                      <option value="maintenance">{t("contact_page.opt_maintenance")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                    {t("contact_page.label_msg")}
                  </label>
                  <textarea 
                    rows="5" 
                    required 
                    disabled={loading || !isAuthenticated}
                    placeholder={t("contact_page.placeholder_msg")}
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F] resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !isAuthenticated}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#081F3F] py-4 text-xs font-bold text-white uppercase tracking-wider transition hover:bg-[#D9A441] hover:text-[#081F3F] shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {loading ? t("contact_page.btn_sending") : t("contact_page.btn_submit")}
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
);}