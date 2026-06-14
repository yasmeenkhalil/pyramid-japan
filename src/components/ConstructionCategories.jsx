import { ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Excavators",
    count: "24 Units Available",
    description: "Crawler & wheeled excavators from top brands like Komatsu and CAT.",
    image: "/assets/images/Excavators.png", 
  },
  {
    name: "Bulldozers",
    count: "12 Units Available",
    description: "Heavy-duty dozers with high blade capacity for earthmoving.",
    image: "/assets/images/Bulldozers.png", 
  },
  {
    name: "Wheel Loaders",
    count: "18 Units Available",
    description: "Compact and large wheel loaders inspected for hydraulic efficiency.",
    image: "/assets/images/Wheel_Loaders.png", 
  },
  {
    name: "Cranes & Lifting",
    count: "7 Units Available",
    description: "Rough terrain and mobile cranes ready for secure international export.",
    image: "/assets/images/Cranes.png", 
  },
];

export default function ConstructionCategories() {
  return (
    <section className="bg-[#F8F9FB] py-20 px-4">
      <div className="mx-auto max-w-[1350px]">
        
        {/* HEADER SECTION */}
        <div className="mb-14 text-center">
          <span className="text-xs font-bold tracking-[0.25em] text-[#D9A441] uppercase">
            Browse by Machinery Type
          </span>
          <h2 className="mt-2 text-3xl font-black text-[#081F3F] md:text-[40px] leading-tight">
            Construction Sectors
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600 leading-relaxed">
            Select a specialized category to filter our live Japanese inventory for your specific project needs.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D9A441] hover:shadow-xl cursor-pointer"
            >
              <div>
                <div className="mb-6 h-20 w-20 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200 shadow-inner group-hover:border-[#D9A441] transition-colors">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <h3 className="text-xl font-black text-[#081F3F] group-hover:text-[#D9A441] transition-colors">
                  {cat.name}
                </h3>
                
                <span className="mt-1.5 inline-block text-[11px] font-bold text-[#D9A441] uppercase tracking-wider">
                  {cat.count}
                </span>

                <p className="mt-4 text-xs leading-relaxed text-slate-500">
                  {cat.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-1 text-xs font-bold text-[#081F3F] opacity-80 group-hover:opacity-100 group-hover:text-[#D9A441] transition-all">
                <span>View Machinery</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
