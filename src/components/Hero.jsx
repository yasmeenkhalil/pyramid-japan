
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden select-none font-sans" dir="ltr">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="https://changlinglobal.asia/products/3-motor-graders_01.webp" // يمكنك استبدال الرابط بصورتك الخاصة من الأسيتس
          alt="Heavy Machinery Yard" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#005BAC]/40 via-transparent to-[#005BAC]/40 mix-blend-multiply" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-12 relative z-10 flex flex-col md:flex-row items-center justify-start gap-8 min-h-[320px]">
        
        <div className="shrink-0 animate-pulse relative">
          <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-b from-[#FFF5E6] to-[#FFE0B3] rounded-full border-4 border-[#D70014] shadow-md flex flex-col items-center justify-center text-center p-2">
            <span className="text-[#D70014] text-xl md:text-2xl font-black font-serif leading-none">26th</span>
            <span className="text-[#005BAC] text-[10px] font-black uppercase tracking-wider mt-0.5">Anniversary</span>
            <div className="absolute -bottom-2 bg-[#D70014] text-white text-[9px] font-bold px-3 py-0.5 rounded-xs shadow-xs uppercase tracking-tight whitespace-nowrap">
              Established 2000
            </div>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <h1 className="text-3xl md:text-[52px] font-black tracking-tight leading-tight uppercase">
            <span className="text-[#FFF500] text-4xl md:text-[68px] font-extrabold italic mr-2">No.1!</span> 
            stock quantity of Used
          </h1>
          <h2 className="text-2xl md:text-[42px] font-black tracking-tight leading-none uppercase mt-1">
            Construction Machines in Japan's Chubu Region
          </h2>

          <div className="mt-6 inline-flex flex-col sm:flex-row sm:items-center gap-x-2 text-xs md:text-sm font-bold bg-black/40 backdrop-blur-xs px-4 py-1.5 rounded-sm border border-white/10">
            <span className="text-white uppercase">Used heavy machinery stock:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#FFF500] text-lg md:text-xl font-black font-mono">1463</span>
              <span className="text-[#FFF500] uppercase text-[11px]">units</span>
            </div>
            <span className="text-white/70 font-normal font-mono text-[11px] sm:before:content-['('] sm:after:content-[')'] sm:before:mx-1">
              updated on May 25, 2026
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
