import {
  ChevronUp,
  ArrowRight,
  Globe,
} from "lucide-react";
export default function MainFooter() {
  return (
    <footer
      className="w-full overflow-hidden font-sans text-left select-none"
      dir="ltr"
    >
      {/* ================= TOP DARK BLUE AREA ================= */}
      <div className="bg-[#00458F] border-b border-[#ffffff14]">
        <div className="max-w-[1180px] mx-auto px-6 py-7 flex flex-col xl:flex-row justify-between gap-10">
          
          {/* LOGO */}
          <div className="flex items-start gap-4 shrink-0">
            <div className="w-[68px] h-[68px] rounded-full border border-white/30 bg-white/5 flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>

            <div className="leading-none pt-1">
              <h2 className="text-white text-[35px] font-black tracking-[-3px] uppercase">
                PYRADMID JAPAN
              </h2>

              <span className="text-white text-[24px] font-bold tracking-wide">
                Corporation
              </span>
            </div>
          </div>

          {/* OFFICE 1 */}
          <div className="text-white text-[11px] leading-[1.45] font-medium max-w-[320px]">
            <p className="font-bold mb-1">
              PYRADMID JAPAN Corporation (Head Office)
            </p>

            <p>
              1-1550-8, Sakashita-Cho, Kasugai City,
              <br />
              Aichi 480-0305, Japan
            </p>

            <p className="mt-2">
              TEL:+81-568-88-7980 &nbsp;&nbsp;FAX:+81-568-88-7989
            </p>

            <p className="text-white/75 mt-1">
              Business hours: 9:00-18:00 (Mon-Fri), 9:00-12:00 (Sat)
            </p>

            <p className="text-white/90">
              (Closed: Sundays and holidays)
            </p>
          </div>

          {/* OFFICE 2 */}
          <div className="text-white text-[11px] leading-[1.45] font-medium max-w-[320px]">
            <p className="font-bold mb-1">
              PYRADMID JAPAN Corporation (Maintenance Factory)
            </p>

            <p>
              6-783-162, Sakashita-Cho, Kasugai City,
              <br />
              Aichi 480-0305, Japan
            </p>

            <p className="mt-2">
              TEL:+81-568-90-6970 &nbsp;&nbsp;FAX:+81-568-90-6979
            </p>

            <p className="text-white/75 mt-1">
              Business hours: 8:30-17:30 (Mon-Fri), 8:30-12:00 (Sat)
            </p>

            <p className="text-white/90">
              (Closed: Sundays and holidays)
            </p>
          </div>
        </div>
      </div>

      {/* ================= LIGHT AREA ================= */}
      <div className="relative bg-[#DCE5EF] min-h-[250px] overflow-hidden">
        
        {/* RIGHT IMAGE */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <div
            className="w-full h-full bg-cover bg-right bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop')",
              maskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage:
                "linear-gradient(to left, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-[1180px] mx-auto px-6 py-10 flex flex-col lg:flex-row justify-between gap-8">
          
          {/* LEFT LINKS */}
          <div className="flex flex-col justify-between min-h-[170px]">
            <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-[#003B73] text-[12px] font-black tracking-[0.5px]">
              
              <a href="#" className="hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                HOME
              </a>

              <a href="#" className="hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Company Profile
              </a>

              <a
                href="#"
                className="leading-[1.5] hover:translate-x-1 transition-all flex items-start gap-1"
              >
                <ArrowRight className="w-3 h-3 mt-[2px]" />
                <span>
                  Used Heavy Equipment ・
                  <br />
                  Construction Machines Stock(1463台)
                </span>
              </a>

              <a href="#" className="hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Access
              </a>

              <a href="#" className="hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Contact us
              </a>

              <a href="#" className="hover:translate-x-1 transition-all flex items-center gap-1">
                <ArrowRight className="w-3 h-3" />
                Privacy policy
              </a>
            </div>

            <p className="text-[#003B73]/70 text-[10px] mt-10">
              Copyright (C) PYRADMID JAPAN-World Corporation. All rights reserved.
            </p>
          </div>

          {/* PAGE TOP */}
          <div className="flex items-start justify-end">
            <button className="bg-[#0A5BB1] hover:bg-[#00458F] transition-colors w-[86px] h-[86px] flex flex-col items-center justify-center text-white shadow-xl">
              <ChevronUp className="w-5 h-5 mb-1" />

              <span className="text-[12px] leading-[1.1] font-bold">
                Page
                <br />
                Top
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}