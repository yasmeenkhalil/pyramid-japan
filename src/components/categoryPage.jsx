import { useTranslation } from "react-i18next";
import Aerial_Work_Platforms from "../assets/images/Aerial_Work_Platforms.png";

export default function CategoryGrid() {
  const { t } = useTranslation();

  const categories = [
    {
      nameKey: "categories_list.excavators",
      count: 41,
      imageSrc: "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=1200",
    },
    {
      nameKey: "categories_list.aerial_platforms",
      count: 83,
      imageSrc: Aerial_Work_Platforms,
    },
    {
      nameKey: "categories_list.heavy_cranes",
      count: 3,
      imageSrc: "https://i.ytimg.com/vi/H4j-EpTW4uY/sddefault.jpg",
    },
    {
      nameKey: "categories_list.foundation_systems",
      count: 6,
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLKvS1he4PVTyPyu_ABEqifYyfskPJIVBOw&s",
    },
    {
      nameKey: "categories_list.logistic_trucks",
      count: 14,
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGT1KJzv-R3s797d4KrSF-vKPYQZ0hP9DRw&s",
    },
    {
      nameKey: "categories_list.road_rollers",
      count: 7,
      imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTicBrtuYrDAl7i93fgsX5wOVKY1whn95ZcXg&s",
    },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      
      <div className="text-center mb-12">
        <p className="text-[#D6A06A] uppercase tracking-[0.3em] text-sm font-semibold">
          {t("categories_section.badge")}
        </p>

        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[#111827]">
          {t("categories_section.title")}
        </h2>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          {t("categories_section.desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="group relative h-[340px] overflow-hidden rounded-2xl cursor-pointer shadow-lg"
          >
            <img
              src={cat.imageSrc}
              alt={t(cat.nameKey)}
              className="w-full h-full object-cover transition-transform duration-7700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#D6A06A] text-[#111827] text-xs font-bold mb-4">
                {cat.count} {t("categories_section.machines_count")}
              </div>

              <h3 className="text-2xl font-bold leading-tight mb-2">
                {t(cat.nameKey)}
              </h3>

              <button className="mt-2 text-[#D6A06A] font-semibold flex items-center gap-2 transition-all group-hover:translate-x-1">
                {t("categories_section.btn_text")} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
