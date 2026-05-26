import { Truck, Compass, Layers, Wrench, Settings } from 'lucide-react';
import { TbBackhoe } from "react-icons/tb";

const categories = [
  { name: 'Excavators', count: 41, icon: TbBackhoe, iconColor: 'text-amber-600', iconBg: 'bg-amber-50 border-amber-100' },
  { name: 'Mini-Excavators', count: 83, icon: Settings, iconColor: 'text-blue-600', iconBg: 'bg-blue-50 border-blue-100' },
  { name: 'Heavy Cranes', count: 3, icon: Compass, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50 border-emerald-100' },
  { name: 'Foundation Systems', count: 6, icon: Layers, iconColor: 'text-indigo-600', iconBg: 'bg-indigo-50 border-indigo-100' },
  { name: 'Logistic Trucks', count: 14, icon: Truck, iconColor: 'text-rose-600', iconBg: 'bg-rose-50 border-rose-100' },
  { name: 'Road Rollers', count: 7, icon: Wrench, iconColor: 'text-sky-600', iconBg: 'bg-sky-50 border-sky-100' },
];

export default function CategoryGrid() {
  return (
    <section className="flex-1">
      {/* الهيدر العلوي الأزرق */}
      <div className="mb-6">
        <div className="flex items-center justify-between bg-sky-700/95 text-white rounded-lg px-4 py-2">
          <h3 className="text-sm font-semibold tracking-wide uppercase">Search by Used Construction Machines</h3>
          <div className="text-xs opacity-90">Total <span className="font-bold">{categories.reduce((s, c) => s + c.count, 0)}</span></div>
        </div>
      </div>

      {/* شبكة البطاقات الفخمة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <div 
              key={idx} 
              className="bg-pure-white border border-gold-light/40 hover:border-sun-red/60 rounded-2xl p-6 flex flex-col justify-between h-44 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group relative overflow-hidden"
            >
              {/* الصف العلوي: الأيقونة والعداد */}
              <div className="flex justify-between items-start">
                
                {/* حاوية الأيقونة الملونة */}
                <div className={`p-3.5 ${cat.iconBg} border rounded-xl group-hover:bg-sun-red/10 group-hover:border-sun-red/20 group-hover:text-sun-red ${cat.iconColor} transition-all duration-300 flex items-center justify-center`}>
                  {/* تم توحيد الحجم إلى w-7 h-7 ليتطابق شكل الحفار تماماً مع بقية أيقونات لوكيد */}
                  <IconComponent className="w-7 h-7 stroke-[1.5]" />
                </div>

                {/* العداد الرقمي الأنيق */}
                <span className="text-xs font-mono font-bold bg-bg-base/50 text-gold-dark px-2.5 py-1 rounded-md group-hover:bg-sun-red group-hover:text-pure-white transition-colors duration-300">
                  {cat.count}
                </span>
              </div>

              {/* الصف السفلي: النصوص */}
              <div>
                <h4 className="font-antique text-sm font-bold text-charcoal group-hover:text-sun-red transition-colors duration-300 uppercase tracking-wider">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-gold-base font-light mt-1">Inspected & Documented</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
