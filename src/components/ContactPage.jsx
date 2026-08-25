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
    let isMounted = true;

    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "include",
          cache: "no-store",
        });

        if (response.ok && isMounted) {
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
        if (isMounted) setStatus("unauthenticated");
      }
    }

    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("focus", checkAuth);

    return () => {
      isMounted = false;
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("focus", checkAuth);
    };
  }, []);

  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (inquiryType === "export") {
      setPageContent({
        title: t("card_info.business_label", "Export / Import"),
        desc: t("contact_page.desc_export", "Inquiries regarding vehicle and parts exportation.")
      });
    } else {
      setPageContent({
        title: t("contact_page.title_general", "Contact Us"),
        desc: t("contact_page.desc_general", "We are here to help and answer any questions you might have.")
      });
    }
  }, [inquiryType, t, i18n.language]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!isAuthenticated) {
      setErrorMessage(t("contact_page.err_auth", "Please log in first to submit an inquiry."));
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-[#F8F9FB] pt-0 pb-20 px-6 md:px-12 relative">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 font-medium text-sm border border-emerald-400/20">
          <span>✓</span>
          <span>{t("contact_page.toast_success", "Submitted successfully!")}</span>
        </div>
      )}

      <div className="mx-auto max-w-[1300px]">
        <div className="mb-10 text-left pt-6">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            {t("card_info.company_name")}
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[46px] leading-tight transition-all duration-300">
            {pageContent.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-600 leading-relaxed transition-all duration-300">
            {pageContent.desc}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-stretch max-w-7xl mx-auto">
          {/* عمود البطاقة ومعلومات الشركة */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            <div className="rounded-3xl bg-[#081F3F] p-6 text-white shadow-md border border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441]/20 mb-4">
                <MessageSquare className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold">{t("card_info.company_name")}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {t("card_info.license_label")}: 411070001683
              </p>
              <a
                href="https://wa.me/818043466222"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-xs font-bold text-[#081F3F] transition hover:bg-white"
              >
                WhatsApp Chat
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex-1 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-[#081F3F] border-b border-slate-100 pb-3 mb-6">
                  {t("card_info.company_name")}
                </h3>
                <div className="space-y-6">
                  {/* طبيعة العمل */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <Send className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("card_info.business_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">
                        {t("card_info.business_val")}
                      </p>
                    </div>
                  </div>

                  {/* الاسم المسؤول */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("card_info.manager_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">
                        {t("card_info.manager_val")}
                      </p>
                    </div>
                  </div>

                  {/* عنوان المكتب الرئيسي */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("card_info.office_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">
                        {t("card_info.office_val")}
                      </p>
                    </div>
                  </div>

                  {/* عنوان الساحة (الـ Yard) */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("card_info.yard_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">
                        {t("card_info.yard_val")}
                      </p>
                    </div>
                  </div>

                  {/* أرقام الهواتف والاتصال الحقيقية */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {t("card_info.phones_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5" dir="ltr">
                        080-4346-6222 / 080-3000-3879
                      </p>

                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-3">
                        {t("card_info.tel_fax_label")}
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5" dir="ltr">
                        0285-38-7781
                      </p>
                    </div>
                  </div>

                  {/* البريد الإلكتروني للشركة */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        E-mail
                      </h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">
                        pyramidjapan2013@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ساعات العمل */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100 mt-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t("contact_page.info_hours_label", "Business Hours")}
                  </h4>
                  <p className="text-sm font-bold text-[#081F3F] mt-0.5">
                    {t("contact_page.info_hours_val", "Mon - Sat: 9:00 AM - 6:00 PM")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* عمود نموذج إرسال الرسالة */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm h-full flex flex-col justify-between relative overflow-hidden">
            {!isAuthenticated && status !== "loading" && (
              <div className="absolute inset-0 z-10 bg-slate-50/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#081F3F] text-white shadow-xl mb-4">
                  <Lock className="h-6 w-6 text-[#D9A441]" />
                </div>
                <h3 className="text-lg font-black text-[#081F3F]">
                  {t("contact_page.lock_title", "Protected Form")}
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mt-2 leading-relaxed">
                  {t("contact_page.lock_desc", "Please log in to your account to securely submit an inquiry to our team.")}
                </p>
              </div>
            )}

            <div>
              <h3 className="text-xl font-black text-[#081F3F] mb-1">
                {t("contact_page.form_title", "Send us a Message")}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {t("contact_page.form_desc", "Fill out the form below and we will get back to you within 24 hours.")}
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
                      {t("contact_page.label_name", "Full Name")}
                    </label>
                    <input
                      type="text"
                      required
                      disabled={loading || !isAuthenticated}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                      {t("contact_page.label_email", "Email Address")}
                    </label>
                    <input
                      type="email"
                      required
                      disabled={loading || !isAuthenticated}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                      {t("contact_page.label_phone", "Phone Number")}
                    </label>
                    <input
                      type="tel"
                      required
                      disabled={loading || !isAuthenticated}
                      placeholder="+81 80-0000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                      {t("contact_page.label_dept", "Inquiry Department")}
                    </label>
                    <select
                      disabled={loading || !isAuthenticated}
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F] cursor-pointer"
                    >
                      <option value="general">{t("contact_page.opt_general", "General Inquiry")}</option>
                      <option value="export">{t("card_info.business_label", "Export / Import")}</option>
                      <option value="parts">{t("contact_page.opt_parts", "Spare Parts")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">
                    {t("contact_page.label_msg", "Your Message")}
                  </label>
                  <textarea
                    rows="5"
                    required
                    disabled={loading || !isAuthenticated}
                    placeholder={t("contact_page.label_msg_placeholder", "Write your requirements here...")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F] resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isAuthenticated}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#081F3F] py-4 text-xs font-bold text-white uppercase tracking-wider transition hover:bg-[#D9A441] hover:text-[#081F3F] shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {loading ? t("contact_page.btn_sending", "Sending...") : t("contact_page.btn_send", "Send Message")}
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
