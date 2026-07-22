import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden select-none font-sans">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="https://changlinglobal.asia/products/3-motor-graders_01.webp" 
          alt="Heavy Machinery Yard" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35 mix-blend-multiply" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-12 relative z-10 flex flex-col md:flex-row items-center justify-start gap-8 min-h-[320px]">
        
        <div className="flex-1 max-w-5xl mx-auto text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
         
          {/* SINCE 2013 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#E5C193]" />
            <span className="text-[#e7c098] text-lg font-semibold tracking-[0.3em] uppercase">
              {t('hero.since')}
            </span>
            <div className="w-12 h-px bg-[#e7c098]" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-[48px] font-black leading-[1.1] max-w-5xl tracking-tight uppercase">
            <span className="text-[#E0B15A]">
              {t('hero.title_highlight')}
            </span>{" "}
            {t('hero.title_rest')}
          </h1>

          {/* Subtitle */}
          <div className="mt-6 inline-flex flex-col sm:flex-row sm:items-center gap-x-2 text-base md:text-lg font-medium bg-black/30 backdrop-blur-sm px-5 py-2 rounded-lg border border-white/10">
            <span className="text-white">
              {t('hero.subtitle')}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
