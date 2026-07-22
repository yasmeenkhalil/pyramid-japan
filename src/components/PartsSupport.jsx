import { useState, useEffect } from "react";
import { Settings, ShieldCheck, Box, ArrowRight, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PartsSupport() {
  const { t } = useTranslation();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [partNo, setPartNo] = useState("");
  const [machineModel, setMachineModel] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [session, setSession] = useState(null);
  const [status, setStatus] = useState("loading");

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
            setName(data.user.name || "");
          } else {
            setSession(null);
            setStatus("unauthenticated");
          }
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: "parts",
          name,
          phone,
          partNo, 
          machineModel, 
          message: msg,
          userId: session?.user?.email || null
        }),
      });

      if (response.ok) {
        setShowToast(true);
        
        const adminPhoneNumber = "00970594302532"; 
        const whatsappText = `*New Parts Inquiry - Pyramid Japan*\n\n` +
                             `*Client Name:* ${name || "N/A"}\n` +
                             `*Phone:* ${phone || "N/A"}\n` +
                             `*Part Number/OEM:* ${partNo}\n` +
                             `*Machine Model & Brand:* ${machineModel}\n` +
                             `*Details:* ${msg || "None"}`;
   
        const encodedText = encodeURIComponent(whatsappText);
        window.open(`https://wa.me{adminPhoneNumber}?text=${encodedText}`, "_blank");

        setPartNo("");
        setMachineModel("");
        setMsg("");
        setTimeout(() => setShowToast(false), 4000);
      }
    } catch (error) {
      console.error("Error submitting parts request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="parts-section" className="bg-white py-20 px-6 md:px-12 border-t border-slate-100 scroll-mt-10 relative">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 font-medium text-sm border border-emerald-400/20">
          <span>✓</span>
          <span>{t('parts.toast_success')}</span>
        </div>
      )}

      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          <div className="lg:col-span-6 text-left rtl:text-right">
            <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
              {t('parts.sub_title')}
            </span>
            <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[42px] leading-tight">
              {t('parts.main_title_1')} <br />
              {t('parts.main_title_2')}
            </h2>
            <p className="mt-5 text-sm md:text-base leading-relaxed text-slate-600 max-w-xl">
              {t('parts.description')}
            </p>

            <div className="mt-8 space-y-4 max-w-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#081F3F]/5 text-[#D9A441]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#081F3F]">{t('parts.feature_1_title')}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{t('parts.feature_1_desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#081F3F]/5 text-[#D9A441]">
                  <Box className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#081F3F]">{t('parts.feature_2_title')}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{t('parts.feature_2_desc')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl border border-slate-200 bg-[#F8F9FB] p-8 md:p-10 shadow-sm max-w-xl mx-auto lg:mr-0 relative overflow-hidden">
              
              {!isAuthenticated && status !== "loading" && (
                <div className="absolute inset-0 z-10 bg-slate-50/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#081F3F] text-white shadow-xl mb-4">
                    <Lock className="h-6 w-6 text-[#D9A441]" />
                  </div>
                  <h3 className="text-lg font-black text-[#081F3F]">{t('parts.locked_title')}</h3>
                  <p className="text-xs text-slate-600 max-w-xs mt-2 leading-relaxed">
                    {t('parts.locked_desc')}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#081F3F] mb-3">
                  <Settings className="h-5 w-5 text-[#D9A441]" />
                </div>
                <h3 className="text-lg font-black text-[#081F3F]">{t('parts.form_title')}</h3>
                <p className="text-xs text-slate-500 mt-1">{t('parts.form_desc')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">{t('parts.label_name')}</label>
                    <input 
                      type="text" 
                      disabled={loading || !isAuthenticated}
                      placeholder={t('parts.placeholder_name')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F] disabled:bg-slate-100/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">{t('parts.label_phone')}</label>
                    <input 
                      type="tel" 
                      disabled={loading || !isAuthenticated}
                      placeholder="+81 90-0000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F] disabled:bg-slate-100/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">{t('parts.label_part_no')}</label>
                  <input 
                    type="text" 
                    required
                    disabled={loading || !isAuthenticated}
                    placeholder={t('parts.placeholder_part_no')}
                    value={partNo}
                    onChange={(e) => setPartNo(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">{t('parts.label_machine_model')}</label>
                  <input 
                    type="text" 
                    required
                    disabled={loading || !isAuthenticated}
                    placeholder={t('parts.placeholder_machine_model')}
                    value={machineModel}
                    onChange={(e) => setMachineModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">{t('parts.label_details')}</label>
                  <textarea 
                    rows="3"
                    disabled={loading || !isAuthenticated}
                    placeholder={t('parts.placeholder_details')}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F] resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading || !isAuthenticated}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#081F3F] py-3.5 text-xs font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F] shadow-md shadow-[#081F3F]/5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? t('parts.btn_loading') : t('parts.btn_submit')}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
