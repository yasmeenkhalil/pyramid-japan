const categories = [
  { name: 'Excavators', count: 41, desc: 'Heavy tracked and wheeled excavators for mining and earthmoving projects.', imageSrc: 'https://www.quinncompany.com/wp-content/uploads/2022/03/jpg_5db2c5f496713.webp' },
  { name: 'Mini-Excavators', count: 83, desc: 'Compact excavators ideal for tight spaces, landscaping, and utility work.', imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Hk8g53_seSEOALEq46EMf2sWl22b2PMLUQ&s' },
  { name: 'Heavy Cranes', count: 3, desc: 'High-capacity lifting solutions for heavy construction and infrastructure.', imageSrc: 'https://i.ytimg.com/vi/H4j-EpTW4uY/sddefault.jpg' },
  { name: 'Foundation Systems', count: 6, desc: 'Advanced piling rigs and drilling equipment for deep foundation works.', imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLKvS1he4PVTyPyu_ABEqifYyfskPJIVBOw&s' },
  { name: 'Logistic Trucks', count: 14, desc: 'Heavy-duty transport trucks and tippers for site logistics and hauling.', imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGT1KJzv-R3s797d4KrSF-vKPYQZ0hP9DRw&s' },
  { name: 'Road Rollers', count: 7, desc: 'Soil and asphalt compactors for road building and paving operations.', imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTicBrtuYrDAl7i93fgsX5wOVKY1whn95ZcXg&s' },
];

export default function CategoryGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          return (
            <div 
              key={idx} 
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors duration-200 cursor-pointer flex flex-col justify-between h-[300px]"
            >
              <div className="w-full h-36 bg-slate-50 relative overflow-hidden shrink-0">
                <img 
                  src={cat.imageSrc} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-101"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h4 className="text-sm md:text-base font-extrabold text-slate-800 group-hover:text-sky-600 transition-colors duration-200 uppercase tracking-wide">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-normal mt-1 leading-relaxed line-clamp-2">
                    {cat.desc}
                  </p>
                </div>
                
                <div className="flex justify-end pt-2 border-t border-slate-50 mt-3">
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-0.5 rounded">
                    {cat.count} Types Available
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
