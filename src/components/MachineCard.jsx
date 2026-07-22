import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MachineCard({ machine }) {
  const { t } = useTranslation();

  return (
    <Link 
      to={`/machinery/${machine.id || machine.model}`} 
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#C47B36]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer block"
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={machine.image}
          alt={machine.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#C47B36] text-white text-[10px] font-semibold uppercase tracking-wide">
          {t(`machine.tags.${machine.tag?.toLowerCase()}`, machine.tag)}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-[#0F172A] line-clamp-1 mb-1">
          {machine.model}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-1 mb-4">
          {machine.title}
        </p>

        {/* المواصفات المترجمة */}
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-slate-500">{t('machine.year')}</span>
          <span className="font-semibold text-[#0F172A]">{machine.year}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm mb-3">
          <span className="text-slate-500">{t('machine.hours')}</span>
          <span className="font-semibold text-[#0F172A]">
            {machine.hours} {t('machine.hours_unit')}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm mb-5">
          <span className="text-slate-500">{t('machine.location')}</span>
          <span className="font-semibold text-[#0F172A]">
            {t(`machine.locations.${machine.location?.toLowerCase()}`, machine.location)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-[#C47B36] font-bold text-sm">
            {machine.price?.toLowerCase() === 'inquire' ? t('machine.inquire') : machine.price}
          </span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="px-4 py-2 rounded-lg bg-[#0F172A] text-white text-sm font-medium hover:bg-[#C47B36] transition-colors relative z-10"
          >
            {t('machine.btn_quote')}
          </button>
        </div>
      </div>
    </Link>
  );
}
