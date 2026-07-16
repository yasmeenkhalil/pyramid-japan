import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function SidebarCategoryFilters({ onCategoryChange, onSortChange }) {
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
    <aside className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
        <SlidersHorizontal className="w-4 h-4 text-red-600" />
        <h3 className="text-sm font-bold tracking-wider uppercase text-gray-800">
          Category Filters
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-2">
            Sector / Industry
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full border border-amber-200 p-3 rounded-xl text-xs bg-gray-50 text-gray-800 focus:border-red-500 focus:bg-white focus:outline-none transition-all duration-300"
          >
            <option value="">All Sectors</option>
            <option value="Construction">Construction</option>
            <option value="Industrial">Industrial</option>
            <option value="Agriculture">Agriculture</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border border-amber-200 p-3 rounded-xl text-xs bg-gray-50 text-gray-800 focus:border-red-500 focus:bg-white focus:outline-none transition-all duration-300"
          >
            <option value="">Most Machines Available</option>
            <option value="az">Alphabetical A-Z</option>
            <option value="za">Alphabetical Z-A</option>
          </select>
        </div>

        <button
          onClick={handleApplyFilters}
          className="w-full bg-gray-900 hover:bg-red-600 text-white py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer mt-2"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
