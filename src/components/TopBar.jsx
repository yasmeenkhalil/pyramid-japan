
export default function TopBar() {
  return (
    <div className="bg-charcoal text-bg-base/80 text-[11px] font-light tracking-[0.15em] uppercase py-2 px-6 border-b border-gold-base/10 hidden md:flex justify-between items-center">
      <p>Premium Heavy Machinery Export • Japan to the Dunes</p>
      <div className="flex gap-6">
        <button className="hover:text-sun-red transition-colors duration-300 cursor-pointer">EN</button>
        <button className="hover:text-sun-red transition-colors duration-300 cursor-pointer">JA</button>
        <button className="hover:text-sun-red transition-colors duration-300 cursor-pointer">ZH</button>
      </div>
    </div>
  );
}
