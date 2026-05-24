import { SlidersHorizontal } from 'lucide-react';

export default function SidebarFilters() {
  return (
    <aside className="bg-pure-white p-6 rounded-2xl border border-gold-light/40 shadow-sm sticky top-24">
      <div className="flex items-center gap-3 border-b border-bg-base pb-4 mb-6">
        <SlidersHorizontal className="w-4 h-4 text-sun-red" />
        <h3 className="font-antique text-sm font-bold tracking-wider uppercase text-charcoal">Advanced Filters</h3>
      </div>
      
      <div className="space-y-5">
        {[
          { label: 'Category Group', options: ['Excavators', 'Cranes', 'Trucks'] },
          { label: 'Sub-Type Spec', options: ['Mini 1-5t', 'Heavy 20-50t'] },
          { label: 'Manufacturer / Maker', options: ['Komatsu', 'Caterpillar', 'Hitachi'] }
        ].map((filter, index) => (
          <div key={index}>
            <label className="block text-[11px] font-semibold text-gold-dark uppercase tracking-wider mb-2">{filter.label}</label>
            <select className="w-full border border-gold-light/60 p-3 rounded-xl text-xs bg-bg-base/20 font-light text-charcoal focus:border-sun-red focus:bg-pure-white focus:outline-none transition-all duration-300">
              <option>All Assets</option>
              {filter.options.map((opt, oIdx) => <option key={oIdx}>{opt}</option>)}
            </select>
          </div>
        ))}

        <div>
          <label className="block text-[11px] font-semibold text-gold-dark uppercase tracking-wider mb-2">Technical Specification</label>
          <input 
            type="text" 
            placeholder="e.g. High-reach, Blade, EPA..." 
            className="w-full border border-gold-light/60 p-3 rounded-xl text-xs bg-bg-base/20 font-light text-charcoal placeholder-gold-dark/40 focus:border-sun-red focus:bg-pure-white focus:outline-none transition-all duration-300"
          />
        </div>

        <button className="w-full bg-charcoal hover:bg-sun-red text-pure-white py-3 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm cursor-pointer mt-2">
          Apply Queries
        </button>
      </div>
    </aside>
  );
}
