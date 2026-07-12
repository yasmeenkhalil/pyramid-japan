import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MachineryDetails() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const machineData = {
    id: id || "SK135SR-3",
    model: "KOBELCO SK135SR-3",
    title: "Excavator Arm Crane Spec",
    tag: "ARM CRANE",
    publishDate: "2026/07/11",
    location: "AOCHI Yard",
    year: "2015 (H27)",
    hours: "3,321",
    images: [
      "/assets/images/Crushers_Wood_Chippers.png",
      "/assets/images/Aerial_Work_Platforms.png",
      "/assets/images/Electrical_Calibration.jpg",
      "/assets/images/Crushers_Wood_Chippers.png",
      "/assets/images/Crushers_Wood_Chippers.png",
      "/assets/images/Crushers_Wood_Chippers.png",
    ],
    specifications: [
      { label: "Engine Power", value: "102 HP" },
      { label: "Operating Weight", value: "13,800 kg" },
      { label: "Bucket Capacity", value: "0.5 m³" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Boom Length", value: "4.5 m" }
    ],
    prices: {
      max: "¥ 4,500,000",
      avg: "¥ 3,900,000",
      min: "¥ 3,200,000"
    }
  };

  const [activeImage, setActiveImage] = useState(machineData.images[0]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans relative">
      
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-500 text-white px-5 py-3.5 rounded-xl shadow-xl transition-all duration-300 font-medium text-sm border border-emerald-400/20">
          <span className="text-base">✓</span>
          <span>Thank you! Your quote request has been sent successfully.</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="relative h-96 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex justify-center items-center">
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C47B36] text-white text-[10px] font-semibold uppercase tracking-wide z-10">
                {machineData.tag}
              </span>
              <img 
                src={activeImage} 
                alt={machineData.title} 
                className="w-90 h-full object-cover object-center transition-all duration-300"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth select-none cursor-grab active:cursor-grabbing snap-x whitespace-nowrap scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
              {machineData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 bg-slate-50 transition-all snap-center ${activeImage === img ? 'border-[#C47B36] shadow-md scale-95' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <img src={img} alt={`thumb-${index}`} className="w-full h-full object-cover object-center pointer-events-none" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
                <span>Stock ID: #{machineData.id}</span>
                <span>Published: {machineData.publishDate}</span>
              </div>
              
              <h1 className="text-3xl font-bold text-[#0F172A] uppercase mb-1">
                {machineData.model}
              </h1>
              <p className="text-lg text-slate-500 mb-6">
                {machineData.title}
              </p>

              <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4 mb-6">
                <div className="text-center">
                  <span className="block text-xs text-slate-400 uppercase font-medium">Year</span>
                  <span className="text-base font-bold text-[#0F172A]">{machineData.year}</span>
                </div>
                <div className="text-center border-x border-slate-100">
                  <span className="block text-xs text-slate-400 uppercase font-medium">Hours</span>
                  <span className="text-base font-bold text-[#0F172A]">{machineData.hours} hr</span>
                </div>
                <div className="text-center">
                  <span className="block text-xs text-slate-400 uppercase font-medium">Location</span>
                  <span className="text-base font-bold text-[#0F172A]">{machineData.location}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Estimated Price Ranges</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 font-medium mb-0.5">MIN PRICE</span>
                    <span className="text-sm font-bold text-slate-700">{machineData.prices.min}</span>
                  </div>
                  <div className="bg-white border border-[#C47B36]/20 rounded-lg p-2.5 shadow-sm">
                    <span className="block text-[10px] text-[#C47B36] font-medium mb-0.5">AVG PRICE</span>
                    <span className="text-sm font-bold text-[#0F172A]">{machineData.prices.avg}</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg p-2.5">
                    <span className="block text-[10px] text-slate-400 font-medium mb-0.5">MAX PRICE</span>
                    <span className="text-sm font-bold text-slate-700">{machineData.prices.max}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-100 pt-6">
              <div>
                <span className="block text-xs text-slate-400 uppercase font-medium">FOB Price</span>
                <span className="text-2xl font-black text-[#C47B36]">Ask Price</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#C47B36] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-slate-900/10"
              >
                Get A Quote
              </button>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#0F172A] mb-4 pb-2 border-b border-slate-100">
            Specifications & Attachments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {machineData.specifications.map((spec, index) => (
              <div key={index} className="flex justify-between py-2 border-b border-slate-50 last:border-0 md:last:border-b">
                <span className="text-slate-500 font-medium">{spec.label}</span>
                <span className="font-semibold text-[#0F172A]">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl">✕</button>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0F172A]">Request a Quote</h2>
              <p className="text-xs text-slate-500 mt-1">You are requesting details for: <span className="font-semibold text-[#C47B36]">{machineData.model}</span></p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36]" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36]" placeholder="+81 90-1234-5678" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Message</label>
                <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#C47B36] resize-none" placeholder="Enter any specific questions..."></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-3 rounded-xl bg-[#0F172A] hover:bg-[#C47B36] text-white font-semibold text-sm transition-all duration-300">Submit Quote Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
