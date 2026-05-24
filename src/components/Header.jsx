import { Search, Globe, ChevronDown, User, Heart, HelpCircle } from 'lucide-react';
import logo from '../assets/images/logo1.jpg'; 
export default function Header() {
  return (
    <header className="bg-pure-white w-full border-b border-gold-light/60 sticky top-0 z-50">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-6">
        
        <div className="flex items-center gap-3 shrink-0 cursor-pointer">
          <img src={logo} alt="Pyramid Japan" className="w-14 h-14 object-contain" />
          <div className="leading-tight">
            <h1 className="font-antique text-base md:text-lg font-black tracking-wider text-charcoal">
              PYRAMID JAPAN <span className="text-sun-red">CORP.</span>
            </h1>
            <p className="text-[9px] md:text-[10px] text-gold-base font-medium tracking-widest uppercase">
              Used Heavy Equipment Directory
            </p>
          </div>
        </div>

        <div className="flex-1 max-w-2xl relative hidden md:block">
          <div className="flex border-2 border-charcoal rounded-lg overflow-hidden focus-within:border-sun-red transition-colors duration-200">
            <div className="flex items-center bg-bg-base/40 px-3 border-r border-gold-light/60">
              <Search className="w-4 h-4 text-gold-dark" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Keyword, Maker, Model, Stock No..." 
              className="w-full bg-pure-white py-2.5 px-3 text-xs text-charcoal placeholder-gold-dark/40 focus:outline-none"
            />
            <button className="bg-charcoal hover:bg-sun-red text-pure-white px-6 text-xs font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer">
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-charcoal shrink-0">
          
          <a href="#how-to-buy" className="hidden lg:flex items-center gap-1.5 hover:text-sun-red transition-colors">
            <HelpCircle className="w-4 h-4 text-gold-base" />
            <span>How to Buy</span>
          </a>

          <button className="relative p-2 hover:text-sun-red transition-colors cursor-pointer" title="Favorites">
            <Heart className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-sun-red text-pure-white text-[9px] font-mono font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </button>

          <button className="flex items-center gap-2 border border-charcoal/30 bg-bg-base/20 hover:border-charcoal hover:bg-charcoal hover:text-pure-white px-4 py-2 rounded-md font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer">
            <User className="w-3.5 h-3.5" />
            <span>Login / Register</span>
          </button>
          
        </div>
      </div>

      <div className="bg-bg-base/40 border-t border-gold-light/40 w-full hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between text-xs text-charcoal font-semibold">
          
          <nav className="flex items-center gap-8 tracking-wider uppercase">
            <a href="#all-stock" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">All Stock</a>
            <a href="#how-to-export" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">Export Service</a>
            <a href="#auction" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">Auction Info</a>
            <a href="#about-us" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">Our Identity</a>
          </nav>

          <div className="flex items-center gap-2 border-l border-gold-light/60 pl-6 h-6">
            <Globe className="w-3.5 h-3.5 text-gold-base" />
            <span className="font-light text-gold-dark">Language:</span>
            <button className="flex items-center gap-1 text-charcoal hover:text-sun-red cursor-pointer uppercase">
              <span>English</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
