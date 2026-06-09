import { ChevronUp, Globe, MapPin, Phone } from "lucide-react";

export default function MainFooter() {
return ( <footer className="bg-[#0F172A] text-white mt-16">

  {/* TOP SECTION */}
  <div className="max-w-7xl mx-auto px-6 py-14">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* COMPANY */}
      <div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full border border-[#C47B36]/40 flex items-center justify-center">
            <Globe className="w-7 h-7 text-[#C47B36]" />
          </div>

          <div>
            <h2 className="text-2xl font-black">
              PYRAMID JAPAN
            </h2>

            <p className="text-slate-400 text-sm">
              Co.LTD 
            </p>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed">
          Trusted partner in heavy equipment export,
          supplying quality Japanese machinery worldwide
          since 2013.
        </p>
      </div>

      {/* QUICK LINKS */}
      <div>
        <h3 className="text-lg font-bold mb-5">
          Quick Links
        </h3>

        <ul className="space-y-3 text-slate-400 text-sm">
          <li className="hover:text-[#C47B36] cursor-pointer">Home</li>
          <li className="hover:text-[#C47B36] cursor-pointer">About Us</li>
          <li className="hover:text-[#C47B36] cursor-pointer">Stock List</li>
          <li className="hover:text-[#C47B36] cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* SERVICES */}
      <div>
        <h3 className="text-lg font-bold mb-5">
          Services
        </h3>

        <ul className="space-y-3 text-slate-400 text-sm">
          <li>Construction Machinery</li>
          <li>Agricultural Equipment</li>
          <li>Maintenance Services</li>
          <li>Worldwide Export</li>
        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <h3 className="text-lg font-bold mb-5">
          Contact Info
        </h3>

        <div className="space-y-4 text-slate-400 text-sm">

          <div className="flex gap-3">
            <MapPin className="w-4 h-4 text-[#C47B36] mt-1 shrink-0" />
            <span>
              Kasugai City, Aichi 480-0305, Japan
            </span>
          </div>

          <div className="flex gap-3">
            <Phone className="w-4 h-4 text-[#C47B36] shrink-0" />
            <span>+81-568-88-7980</span>
          </div>

        </div>
      </div>

    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className="border-t border-slate-800">

    <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

      <p className="text-slate-500 text-sm">
        © 2026 Pyramid Japan Co.LTD All Rights Reserved.
      </p>

      <button
        className="
          w-10
          h-10
          rounded-full
          bg-[#C47B36]
          hover:bg-[#A86428]
          flex
          items-center
          justify-center
          transition-all
        "
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </button>

    </div>

  </div>

</footer>

)}
