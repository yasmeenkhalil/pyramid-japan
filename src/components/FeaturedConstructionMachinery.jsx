import React, { useState, useEffect } from "react";
import { ArrowUpRight, Gauge, Calendar, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FeaturedConstructionMachinery() {
  const { t, i18n } = useTranslation();
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const transformData = (items) => {
    if (!items || !Array.isArray(items)) return [];
    return items.map((item) => {
      let finalTitle = item.titleEn || item.title || "";
      if (i18n.language === "ar" && item.titleAr) finalTitle = item.titleAr;
      if (i18n.language === "ja" && item.titleJa) finalTitle = item.titleJa;

      let finalCategory = item.category?.nameEn || "Machinery";
      if (i18n.language === "ar" && item.category?.nameAr) finalCategory = item.category.nameAr;
      if (i18n.language === "ja" && item.category?.nameJa) finalCategory = item.category.nameJa;

      return {
        id: item.id,
        title: finalTitle,
        category: finalCategory,
        year: item.year ? item.year.toString() : "",
        hours: item.hour ? `${item.hour.toLocaleString()} ${t("featured_con.hrs")}` : `0 ${t("featured_con.hrs")}`,
        condition: t("featured_con.condition_val"),
        price: item.price ? `${item.price.toLocaleString()} JPY` : t("featured_con.ask_price"),
        image: item.images && item.images.length > 0 ? item.images[0].imageUrl : '/assets/images/Crushers_Wood_Chippers.png',
      };
    });
  };

  useEffect(() => {
    async function fetchFeaturedMachines() {
      try {
        setLoading(true);
        const response = await fetch("/api/machinery/all?sector=Construction&featured=true");
        if (response.ok) {
          const data = await response.json();
          setMachines(transformData(data));
        }
      } catch (err) {
        console.error("Fetch featured machinery error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedMachines();
  }, [i18n.language]);

  const handleOpenModal = (e, machine) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedMachine(machine);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    setShowToast(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };
  return (
    <section className="bg-white py-16 px-12 border-t border-slate-100 relative">
      
      {showToast && (
        <div className="fixed top-5 right-5 z-[110] flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 font-medium text-sm border border-emerald-400/20">
          <span className="text-base">✓</span>
          <span>{t("featured_con.toast_success")}</span>
        </div>
      )}

      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            {t("featured_con.badge")}
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            {t("featured_con.title")}
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 leading-relaxed">
            {t("featured_con.desc")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mx-auto">
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between h-[380px]">
                <div className="relative h-52 w-full bg-slate-200 rounded-t-2xl" />
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="h-2 w-12 bg-slate-200 rounded mb-1" />
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-2.5 my-3">
                      <div className="h-6 bg-slate-100 rounded" />
                      <div className="h-6 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="h-10 bg-slate-200 rounded-xl w-full" />
                </div>
              </div>
            ))
          ) : machines.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 font-medium py-10">
              {t("featured_con.no_data")}
            </div>
          ) : (
            machines.map((machine) => (
              <Link 
                key={machine.id} 
                to={`/machinery/${machine.id}`}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between block"
              >
                <div className="relative h-52 w-full overflow-hidden bg-[#F4F6F9] border-b border-slate-100">
                  <img 
                    src={machine.image} 
                    alt={machine.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow">
                    <ShieldCheck className="h-3 w-3" />
                    {machine.condition}
                  </div>
                  <div className="absolute bottom-3 right-3 z-10 rounded-md bg-[#081F3F]/85 backdrop-blur-sm px-2 py-0.5 text-[9px] font-mono text-white">
                    {t("featured_con.ref_label")}: {machine.id}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-[#D9A441] uppercase">
                      {machine.category}
                    </span>
                    <h3 className="mt-0.5 text-sm font-black text-[#081F3F] line-clamp-1 group-hover:text-[#D9A441] transition-colors">
                      {machine.title}
                    </h3>

                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-b border-slate-100 py-2.5 my-3">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Calendar className="h-3.5 w-3.5 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 leading-none">{t("featured_con.year_label")}</span>
                          <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.year}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Gauge className="h-3.5 w-3.5 text-[#D9A441]" />
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-400 leading-none">{t("featured_con.hours_label")}</span>
                          <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.hours}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="text-[10px] text-slate-400 block leading-none">{t("featured_con.price_label")}</span>
                      <span className="text-xs font-black text-[#C47B36] mt-0.5 block">{machine.price}</span>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => handleOpenModal(e, machine)}
                    className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#081F3F] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F] relative z-10"
                  >
                    {t("featured_con.btn_details")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {isModalOpen && selectedMachine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl">✕</button>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#081F3F]">{t("featured_con.modal_title")}</h2>
              <p className="text-xs text-slate-500 mt-1">{t("featured_con.modal_equip")}: <span className="font-semibold text-[#D9A441]">{selectedMachine.title}</span> ({t("featured_con.ref_label")}: {selectedMachine.id})</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">{t("featured_con.label_name")}</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441]" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">{t("featured_con.label_email")}</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">{t("featured_con.label_phone")}</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441]" placeholder="+81 90-1234-5678" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">{t("featured_con.label_msg")}</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441] resize-none" placeholder={t("featured_con.placeholder_msg")}></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-3 rounded-xl bg-[#081F3F] hover:bg-[#D9A441] hover:text-[#081F3F] text-white font-semibold text-sm transition-all duration-300">{t("featured_con.btn_submit")}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
