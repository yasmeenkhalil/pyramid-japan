import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronUp, Globe, MapPin, Phone } from "lucide-react";

export default function MainFooter() {
  const location = useLocation();
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuickLinkClick = () => {
    if (location.pathname === "/contact" || location.pathname === "/") {
      scrollToTop();
    }
  };

  return (
    <footer className="bg-[#0F172A] text-white mt-0 pb-12 w-full relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-11">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Section 1: About Company */}
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full border border-[#C47B36]/40 flex items-center justify-center">
                <Globe className="w-7 h-7 text-[#C47B36]" />
              </div>
              <div>
                <h2 className="text-2xl font-black">
                  {t('footer.company_name')}
                </h2>
                <p className="text-slate-400 text-sm">
                  {t('footer.company_suffix')}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t('footer.company_desc')}
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              {t('footer.title_links')}
            </h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link to="/" onClick={handleQuickLinkClick} className="hover:text-[#C47B36] cursor-pointer block">
                  {t('footer.links.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C47B36] cursor-pointer block">
                  {t('footer.links.about')}
                </Link>
              </li>
              <li>
                <Link to="/machinery-all/all" className="hover:text-[#C47B36] cursor-pointer block">
                  {t('footer.links.stock')}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleQuickLinkClick} className="hover:text-[#C47B36] cursor-pointer block">
                  {t('footer.links.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Services Links */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              {t('footer.title_services')}
            </h3>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li>
                <Link to="/construction" className="hover:text-[#C47B36] cursor-pointer block">
                  {t('footer.services.construction')}
                </Link>
              </li>
              <li>
                <Link to="/agricultural" className="hover:text-[#C47B36] cursor-pointer block">
                  {t('footer.services.agricultural')}
                </Link>
              </li>
              <li>
                <Link to="/maintenance" className="hover:text-[#C47B36] cursor-pointer block">
                  {t('footer.services.maintenance')}
                </Link>
              </li>
              <li>
                <Link to="/Export" className="hover:text-[#C47B36] cursor-pointer block">
                  {t('footer.services.export')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-5">
              {t('footer.title_contact')}
            </h3>
            <div className="space-y-4 text-slate-400 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#C47B36] mt-1 shrink-0" />
                <span>
                  {t('footer.contact.address')}
                </span>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-[#C47B36] shrink-0" />
                <a href="tel:+81568887980" className="hover:text-[#C47B36]">
                  {t('footer.contact.phone_val')}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <p className="text-slate-500 text-sm">
            {t('footer.copyright')}
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#C47B36] hover:bg-[#A86428] flex items-center justify-center transition-all cursor-pointer"
          >
            <ChevronUp className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
}
