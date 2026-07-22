import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Video,
  Camera,
  Layers,
  Globe
} from "lucide-react";

export default function InspectionSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#0b192e] px-4 md:px-10">
      <div className="mx-auto max-w-[1300px] bg-[#07162c] rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        
        <div className="grid items-center gap-12 lg:grid-cols-12">

          {/* SECTION: LEFT SIDE (IMAGE & CHECKLIST CONTAINER) */}
          <div className="lg:col-span-6 relative flex flex-col md:flex-row items-stretch gap-4 bg-[#051022] rounded-[32px] border border-white/5">
            
            {/* MAIN IMAGE & 100% BADGE */}
            <div className="relative flex-1 min-h-[300px] md:min-h-auto rounded-2xl overflow-hidden group">
              <img
                src="assets/images/machine-inspection.png"
                alt="Machine Inspection"
                className="h-full w-full object-cover"
              />
              
              {/* COMPACT 100% INSPECTED BADGE */}
              <div className="absolute bottom-4 right-4 bg-[#07162c]/90 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl flex items-center gap-3 shadow-xl">
                <ShieldCheck className="h-6 w-6 text-[#d9a441]" />
                <div className="leading-tight">
                  <span className="text-lg font-black text-white block">100%</span>
                  <span className="text-[9px] font-medium text-slate-300 uppercase tracking-wider">
                    {t('inspection.badge_text')}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION: RIGHT SIDE (TEXT CONTENT & GRID) */}
          <div className="lg:col-span-6 lg:pl-6">
            
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#d9a441]">
              {t('inspection.tag')}
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl lg:text-[42px] font-black leading-[1.15] text-white">
              {t('inspection.title_start')}{" "}
              <span className="text-[#d9a441]">{t('inspection.title_highlight')}</span>{" "}
              {t('inspection.title_end')}
            </h2>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-400 max-w-xl">
              {t('inspection.description')}
            </p>

            {/* 2x2 FEATURE CARDS */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              
              {/* CARD 1 */}
              <div className="flex gap-4 p-2">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Camera className="h-5 w-5 text-[#d9a441]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{t('inspection.card1_title')}</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {t('inspection.card1_desc')}
                  </p>
                </div>
              </div>

              {/* CARD 2 */}
              <div className="flex gap-4 p-2">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Layers className="h-5 w-5 text-[#d9a441]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{t('inspection.card2_title')}</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {t('inspection.card2_desc')}
                  </p>
                </div>
              </div>

              {/* CARD 3 */}
              <div className="flex gap-4 p-2">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Video className="h-5 w-5 text-[#d9a441]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{t('inspection.card3_title')}</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {t('inspection.card3_desc')}
                  </p>
                </div>
              </div>

              {/* CARD 4 */}
              <div className="flex gap-4 p-2">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Globe className="h-5 w-5 text-[#d9a441]" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{t('inspection.card4_title')}</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                    {t('inspection.card4_desc')}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
