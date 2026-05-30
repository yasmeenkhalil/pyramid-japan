import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { Search, Globe, ChevronDown, HelpCircle, Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.png'; 

export default function Header() {
  // حالة للتحكم بفتح وإغلاق منيو الجوال
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-pure-white w-full border-b border-gold-light/60 sticky top-0 z-50">
      
      {/* البار الرئيسي العلوي */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-6">
        
        {/* اللوجو واسم الشركة */}
        <div className="flex items-center shrink-0 cursor-pointer">
          <img src={logo} alt="Pyramid Japan" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
          <div className="leading-tight ml-2">
            <h1 className="font-antique text-sm md:text-lg font-black tracking-wider text-charcoal">
              PYRAMID JAPAN <span className="text-sun-red">CORP.</span>
            </h1>
            <p className="text-[8px] md:text-[10px] text-gold-base font-medium tracking-widest uppercase">
              Used Heavy Equipment Directory
            </p>
          </div>
        </div>

        {/* صندوق البحث - يظهر على الكمبيوتر والتابلت فقط */}
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

        {/* يمين الهيدر: زر الهامبرغر للجوال وروابط المساعدة للكمبيوتر */}
        <div className="flex items-center gap-4 text-xs font-medium text-charcoal shrink-0">
          <a href="#how-to-buy" className="hidden lg:flex items-center gap-1.5 hover:text-sun-red transition-colors">
            <HelpCircle className="w-4 h-4 text-gold-base" />
            <span>How to Buy</span>
          </a>

          {/* زر قائمة الجوال (يظهر فقط على الجوال) */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="block md:hidden p-2 text-slate-700 hover:text-sun-red transition-colors cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 1. منيو الشاشات الكبيرة (الكمبيوتر والتابلت) - تبقى كما هي */}
      <div className="bg-bg-base/40 border-t border-gold-light/40 w-full hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between text-xs text-charcoal font-semibold">
          <nav className="flex items-center gap-8 tracking-wider uppercase">
            <Link to="/" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">Home</Link>
            <Link to="/about" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">About us</Link>
            <a href="#how-to-export" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">Export Service</a>
            <a href="#auction" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">Auction Info</a>
            <a href="#about-us" className="hover:text-sun-red transition-colors border-b-2 border-transparent hover:border-sun-red py-3">Contact us</a>
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

      {/* 2. منيو الجوال المنسدلة الذكية (تظهر فقط عند الضغط على زر الهامبرغر ☰) */}
      {isOpen && (
        <div className="md:hidden w-full bg-white border-t border-slate-100 shadow-xl absolute left-0 right-0 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col p-4 space-y-3 font-semibold text-xs text-charcoal tracking-wide uppercase">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-sun-red hover:bg-slate-50 p-2.5 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-sun-red hover:bg-slate-50 p-2.5 rounded-lg transition-colors"
            >
              About us
            </Link>
            <a 
              href="#how-to-export" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-sun-red hover:bg-slate-50 p-2.5 rounded-lg transition-colors"
            >
              Export Service
            </a>
            <a 
              href="#auction" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-sun-red hover:bg-slate-50 p-2.5 rounded-lg transition-colors"
            >
              Auction Info
            </a>
            <a 
              href="#about-us" 
              onClick={() => setIsOpen(false)} 
              className="hover:text-sun-red hover:bg-slate-50 p-2.5 rounded-lg transition-colors"
            >
              Contact us
            </a>

            {/* خط فاصل واختيار اللغة داخل الجوال */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold-base" />
                <span className="font-light text-gold-dark lowercase">Language:</span>
              </div>
              <button className="flex items-center gap-1 text-charcoal font-bold bg-slate-50 px-3 py-1.5 rounded-md border border-slate-100">
                <span>English</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
