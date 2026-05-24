
export default function Hero() {
  return (
    <section className="bg-charcoal text-pure-white py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#AB825A_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-sun-red/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-sun-red font-mono text-xs font-bold uppercase tracking-[0.25em] block mb-2">
            // Global Machinery Hub
          </span>
          <h2 className="font-antique text-3xl md:text-5xl font-light tracking-wide max-w-2xl leading-tight">
            Chubu's Elite Stockpile, Refined for Global Deployment.
          </h2>
        </div>
        <div className="bg-pure-white/5 border border-pure-white/10 backdrop-blur-sm p-6 rounded-xl text-left md:text-right min-w-[240px]">
          <p className="text-[10px] text-gold-light tracking-widest uppercase">Live Available Inventory</p>
          <p className="text-4xl font-light font-mono text-sun-red mt-1">1,457</p>
          <p className="text-[11px] text-bg-base/60 font-light mt-1">Verified Heavy Units Today</p>
        </div>
      </div>
    </section>
  );
}
