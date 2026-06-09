
export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden select-none font-sans" dir="ltr">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="https://changlinglobal.asia/products/3-motor-graders_01.webp" // يمكنك استبدال الرابط بصورتك الخاصة من الأسيتس
          alt="Heavy Machinery Yard" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 absolute inset-0 bg-black/35 mix-blend-multiply" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-12 relative z-10 flex flex-col md:flex-row items-center justify-start gap-8 min-h-[320px]">
        
        {/* <div className="shrink-0 animate-pulse relative">
          <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-b from-[#FFF5E6] to-[#FFE0B3] rounded-full border-4 border-[#D70014] shadow-md flex flex-col items-center justify-center text-center p-2">
            <span className="text-[#D70014] text-xl md:text-2xl font-black font-serif leading-none">26th</span>
            <span className="text-[#005BAC] text-[10px] font-black uppercase tracking-wider mt-0.5">Anniversary</span>
            <div className="absolute -bottom-2 bg-[#D70014] text-white text-[9px] font-bold px-3 py-0.5 rounded-xs shadow-xs uppercase tracking-tight whitespace-nowrap">
              Established 2000
            </div>
          </div>
        </div> */}
  

        <div className="flex-1 max-w-5xl mx-auto text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
         
  {/* SINCE 2000 */}
  <div className="flex items-center justify-center gap-4 mb-6">
  <div className="w-12 h-px bg-[#E5C193]" />

  <span
    className="
    text-[#e7c098]
    text-lg
    font-semibold
    tracking-[0.3em]
    uppercase
    "
  >
    Since 2013
  </span>

  <div className="w-12 h-px bg-[#e7c098]" />
</div>

  <h1 className="text-4xl md:text-[48px] font-black leading-[1.1] max-w-5xl tracking-tight leading-tight uppercase">
    <span className="text-[#E0B15A]">
      Trusted
    </span>{" "}
    Partner in Heavy Equipment Export
  </h1>

  <div className="mt-6 inline-flex flex-col sm:flex-row sm:items-center gap-x-2 text-base md:text-lg font-medium bg-black/30 backdrop-blur-sm px-5 py-2 rounded-lg border border-white/10">
    <span className="text-white">
      Quality Used Construction & Agricultural Machinery From Japan
    </span>
  </div>

</div>
        </div>


      

    </section>
  );
}
