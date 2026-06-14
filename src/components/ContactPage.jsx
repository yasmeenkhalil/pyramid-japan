"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}, your message has been sent successfully.`);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] pt-0 pb-20 px-6 md:px-12">
      <div className="mx-auto max-w-[1300px]">
        
        {/* HEADER SECTION - محاذاة علوية ملاصقة ومصغرة */}
        <div className="mb-10 text-left pt-6">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Get In Touch
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[46px] leading-tight">
            Connect With Pyramid Japan
          </h1>
          <p className="mt-3 max-w-xl text-sm text-slate-600 leading-relaxed">
            Have questions about our inventory, export procedures, or technical services? Reach out to our team in Japan today.
          </p>
        </div>

        {/* 2-COLUMN GRID SYSTEM - كود الفلترة والمحاذاة المشدودة لتساوي الطول */}
        <div className="grid gap-12 lg:grid-cols-12 items-stretch max-w-7xl mx-auto">
          
          {/* LEFT SIDE: COMPANY DETAILS & DIRECT WHATSAPP */}
          <div className="lg:col-span-5 flex flex-col gap-6 h-full">
            
            {/* كرت الواتساب للتواصل السريع */}
            <div className="rounded-3xl bg-[#081F3F] p-6 text-white shadow-md border border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441]/20 mb-4">
                <MessageSquare className="h-5 w-5 text-[#D9A441]" />
              </div>
              <h3 className="text-lg font-bold">Fast Track Communication</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Need immediate response regarding machinery live status or shipping rates? Chat directly with our sales desk on WhatsApp.
              </p>
              <a 
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-xs font-bold text-[#081F3F] transition hover:bg-white"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* كرت معلومات الاتصال الممتد ليتساوى مع الفورم */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex-1 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-black text-[#081F3F] border-b border-slate-100 pb-3 mb-6">Headquarters Info</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office Address</h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">Tokyo, Chiyoda-ku, Japan</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telephone</h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">+81 XX-XXXX-XXXX</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</h4>
                      <p className="text-sm font-bold text-[#081F3F] mt-0.5">info@pyramid-japan.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* خط ساعات العمل المثبت أسفل الكرت لموازنة الطول */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100 mt-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-[#D9A441]">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Business Hours</h4>
                  <p className="text-sm font-bold text-[#081F3F] mt-0.5">Mon - Fri: 9:00 AM - 6:00 PM (JST)</p>
                </div>
              </div>
            </div>

          </div>
          {/* RIGHT SIDE: INTERACTIVE CONTACT FORM - النصف الثاني المكمل */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-[#081F3F] mb-1">Send a Message</h3>
              <p className="text-xs text-slate-500 mb-6">Fill out the secure form below and our logistics coordinator will contact you within 24 business hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">Inquiry Department</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Machinery Export Quote">Machinery Export Quote</option>
                      <option value="Spare Parts Support">Spare Parts Support</option>
                      <option value="Technical Maintenance">Technical Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#081F3F] uppercase tracking-wider mb-1.5">Message / Requirements</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Detail your request, destination country, or targeted machinery stock reference number..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:outline-none focus:border-[#D9A441] focus:bg-white text-[#081F3F]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#081F3F] py-4 text-xs font-bold text-white transition hover:bg-[#D9A441] hover:text-[#081F3F] shadow-md shadow-[#081F3F]/5"
                >
                  Send Secure Message
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

        </div> {/* END OF GRID */}
      </div> {/* END OF CONTAINER */}
    </main>
  );
}
