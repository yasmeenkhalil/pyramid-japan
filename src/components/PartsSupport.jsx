import { useState } from "react";
import { Settings, ShieldCheck, Box, ArrowRight } from "lucide-react";

export default function PartsSupport() {
  const [partNo, setPartNo] = useState("");
  const [machineModel, setMachineModel] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك ربط الطلب بـ API أو الواتساب لاحقاً
    alert(`Inquiry Sent for Part: ${partNo}`);
  };

  return (
    <section className="bg-white py-20 px-6 md:px-12 border-t border-slate-100">
      <div className="mx-auto max-w-[1300px]">
        
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* الجانب الأيسر: ميزات وتفاصيل مستودع قطع الغيار */}
          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
              Genuine OEM Components
            </span>
            
            <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[42px] leading-tight">
              Global Spare Parts <br />
              Supply & Logistics
            </h2>
            
            <p className="mt-5 text-sm md:text-base leading-relaxed text-slate-600 max-w-xl">
              Don't let downtime stall your projects. Pyramid Japan maintains a massive local inventory of genuine parts for Caterpillar, Komatsu, Hitachi, and Kubota machinery. Ready for immediate global air-freight.
            </p>

            {/* ميزات سريعة تحت بعض بـ Padding مريح */}
            <div className="mt-8 space-y-4 max-w-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#081F3F]/5 text-[#D9A441]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#081F3F]">100% Genuine Parts</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Direct from original Japanese equipment manufacturers (OEM).</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#081F3F]/5 text-[#D9A441]">
                  <Box className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#081F3F]">Pre-Packed Delivery</h4>
                  <p className="text-xs text-slate-500 mt-0.5">We can secure replacement filters, seals, and teeth inside your purchased machine's cabin before shipping.</p>
                </div>
              </div>
            </div>
          </div>

          {/* الجانب الأيمن: نموذج طلب قطع الغيار السريع */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200 bg-[#F8F9FB] p-8 md:p-10 shadow-sm max-w-xl mx-auto lg:mr-0">
              <div className="mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#081F3F] mb-3">
                  <Settings className="h-5 w-5 text-[#D9A441]" />
                </div>
                <h3 className="text-lg font-black text-[#081F3F]">Quick Parts Inquiry</h3>
                <p className="text-xs text-slate-500 mt-1">Can't find the component? Submit the serial number and our yard team will locate it instantly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">Part Number / OEM Ref</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 1R-0716, 708-2L-00420"
                    value={partNo}
                    onChange={(e) => setPartNo(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">Machine Model & Brand</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Komatsu PC200-8"
                    value={machineModel}
                    onChange={(e) => setMachineModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">Additional Details</label>
                  <textarea 
                    rows="3"
                    placeholder="Describe the required condition or specific component section..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] text-[#081F3F]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#081F3F] py-3.5 text-xs font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F] shadow-md shadow-[#081F3F]/5"
                >
                  Submit Parts Request
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
