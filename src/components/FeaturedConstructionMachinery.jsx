import React, { useState } from "react";
import { ArrowUpRight, Gauge, Calendar, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const constructionMachinery = [
  {
    id: "CN-001",
    title: "Caterpillar 320D Excavator",
    category: "Excavator",
    year: "2018",
    hours: "4,200 hrs",
    condition: "Verified",
    image: "/assets/images/Excavators.png",
  },
  {
    id: "CN-002",
    title: "Komatsu D65EX Bulldozer",
    category: "Bulldozer",
    year: "2017",
    hours: "5,100 hrs",
    condition: "Verified",
    image: "/assets/images/Bulldozers.png",
  },
  {
    id: "CN-003",
    title: "Hitachi ZW220 Wheel Loader",
    category: "Wheel Loader",
    year: "2019",
    hours: "3,800 hrs",
    condition: "Verified",
    image: "/assets/images/Wheel_Loaders.png",
  },
  {
    id: "CN-004",
    title: "Kobelco SK210 Excavator",
    category: "Excavator",
    year: "2020",
    hours: "2,900 hrs",
    condition: "Verified",
    image: "/assets/images/Excavators.png",
  },
  {
    id: "CN-005",
    title: "Kato NK250 Mobile Crane",
    category: "Crane",
    year: "2016",
    hours: "6,400 hrs",
    condition: "Verified",
    image: "/assets/images/Cranes.png",
  },
];

export default function FeaturedConstructionMachinery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
    <section className="bg-white py-16 px-4 border-t border-slate-100 relative">
      
      {showToast && (
        <div className="fixed top-5 right-5 z-[110] flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 font-medium text-sm border border-emerald-400/20">
          <span className="text-base">✓</span>
          <span>Thank you! Your inquiry has been sent successfully.</span>
        </div>
      )}

      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            In-Stock Machinery
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[38px] leading-tight">
            Featured Construction Equipment
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-sm text-slate-600 leading-relaxed">
            Directly sourced from Japanese construction fleets, fully inspected and job-site ready.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mx-auto">
          {constructionMachinery.map((machine) => (
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
                  Ref: {machine.id}
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
                        <span className="text-[9px] text-slate-400 leading-none">Year</span>
                        <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Gauge className="h-3.5 w-3.5 text-[#D9A441]" />
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 leading-none">Hours</span>
                        <span className="text-xs font-bold text-[#081F3F] mt-0.5">{machine.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={(e) => handleOpenModal(e, machine)}
                  className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#081F3F] px-3 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F] relative z-10"
                >
                  Inquire Now
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {isModalOpen && selectedMachine && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl">✕</button>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#081F3F]">Inquire About Machinery</h2>
              <p className="text-xs text-slate-500 mt-1">Equipment: <span className="font-semibold text-[#D9A441]">{selectedMachine.title}</span> (Ref: {selectedMachine.id})</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441]" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441]" placeholder="+81 90-1234-5678" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Message</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D9A441] resize-none" placeholder="Ask about shipping, pricing, or inspection files..."></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-3 rounded-xl bg-[#081F3F] hover:bg-[#D9A441] hover:text-[#081F3F] text-white font-semibold text-sm transition-all duration-300">Submit Inquiry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
