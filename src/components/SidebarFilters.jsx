import { SlidersHorizontal } from 'lucide-react';

export default function SidebarFilters() {
  return (
    <aside className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-6">
        <SlidersHorizontal className="w-4 h-4 text-red-600" />

        <h3 className="text-sm font-bold tracking-wider uppercase text-gray-800">
          Advanced Filters
        </h3>
      </div>

      <div className="space-y-5">
        {[
          {
            label: 'Category Group',
            options: ['Excavators', 'Cranes', 'Trucks'],
          },
          {
            label: 'Sub-Type Spec',
            options: ['Mini 1-5t', 'Heavy 20-50t'],
          },
          {
            label: 'Manufacturer / Maker',
            options: ['Komatsu', 'Caterpillar', 'Hitachi'],
          },
        ].map((filter, index) => (
          <div key={index}>
            <label className="block text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-2">
              {filter.label}
            </label>

            <select className="w-full border border-amber-200 p-3 rounded-xl text-xs bg-gray-50 text-gray-800 focus:border-red-500 focus:bg-white focus:outline-none transition-all duration-300">
              <option>All Assets</option>

              {filter.options.map((opt, oIdx) => (
                <option key={oIdx}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

      

        <button className="w-full bg-gray-900 hover:bg-red-600 text-white py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer mt-2">
          Apply Queries
        </button>
      </div>
    </aside>
  );
}