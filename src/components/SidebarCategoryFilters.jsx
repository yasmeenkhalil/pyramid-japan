import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة

export default function SidebarCategoryFilters({ onCategoryChange, onSortChange }) {
  const { t } = useTranslation(); // تفعيل تابع الترجمة

  const [sector, setSector] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleApplyFilters = () => {
    if (onCategoryChange) {
      onCategoryChange(sector);
    }
    if (onSortChange) {
      onSortChange(sortBy);
    }
  };

  return (
    <aside className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm text-left rtl:text-right">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
        <SlidersHorizontal className="w-4 h-4 text-red-600" />
        <h3 className="text-sm font-bold tracking-wider uppercase text-gray-800">
          {t('filters.main_title')}
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-2">
            {t('filters.sector_label')}
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full border border-amber-200 p-3 rounded-xl text-xs bg-gray-50 text-gray-800 focus:border-red-500 focus:bg-white focus:outline-none transition-all duration-300"
          >
            <option value="">{t('filters.sector_all')}</option>
            <option value="construction">{t('filters.sector_construction')}</option>
            <option value="industrial">{t('filters.sector_industrial')}</option>
            <option value="agriculture">{t('filters.sector_agriculture')}</option>
            <option value="maintenance">{t('filters.sector_maintenance')}</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-2">
            {t('filters.sort_label')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-amber-200 p-3 rounded-xl text-xs bg-gray-50 text-gray-800 focus:border-red-500 focus:bg-white focus:outline-none transition-all duration-300"
          >
            <option value="">{t('filters.sort_default')}</option>
            <option value="az">{t('filters.sort_az')}</option>
            <option value="za">{t('filters.sort_za')}</option>
          </select>
        </div>

        <button
          onClick={handleApplyFilters}
          className="w-full bg-gray-900 hover:bg-red-600 text-white py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer mt-2"
        >
          {t('filters.btn_apply')}
        </button>
      </div>
    </aside>
  );
}
