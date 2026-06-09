import Aerial_Work_Platforms from "../assets/images/Aerial_Work_Platforms.png";

const categories = [
  {
    name: "Excavators",
    count: 41,
    imageSrc:
      "https://images.unsplash.com/photo-1599707254554-027aeb4deacd?q=80&w=1200",
  },
  {
    name: "Aerial Work Platforms",
    count: 83,
    imageSrc: Aerial_Work_Platforms,
  },
  {
    name: "Heavy Cranes",
    count: 3,
    imageSrc:
      "https://i.ytimg.com/vi/H4j-EpTW4uY/sddefault.jpg",
  },
  {
    name: "Foundation Systems",
    count: 6,
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLKvS1he4PVTyPyu_ABEqifYyfskPJIVBOw&s",
  },
  {
    name: "Logistic Trucks",
    count: 14,
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGT1KJzv-R3s797d4KrSF-vKPYQZ0hP9DRw&s",
  },
  {
    name: "Road Rollers",
    count: 7,
    imageSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTicBrtuYrDAl7i93fgsX5wOVKY1whn95ZcXg&s",
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-20">
      
      {/* SECTION TITLE */}
      <div className="text-center mb-12">
        <p className="text-[#D6A06A] uppercase tracking-[0.3em] text-sm font-semibold">
          Our Categories
        </p>

        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-[#111827]">
          Explore Equipment Categories
        </h2>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          Browse our wide range of construction, agricultural and industrial
          machinery ready for export worldwide.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="
              group
              relative
              h-[340px]
              overflow-hidden
              rounded-2xl
              cursor-pointer
              shadow-lg
            "
          >
            {/* IMAGE */}
            <img
              src={cat.imageSrc}
              alt={cat.name}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* CONTENT */}
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                p-6
                text-white
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  px-3
                  py-1
                  rounded-full
                  bg-[#D6A06A]
                  text-[#111827]
                  text-xs
                  font-bold
                  mb-4
                "
              >
                {cat.count} Machines
              </div>

              <h3
                className="
                  text-2xl
                  font-bold
                  leading-tight
                  mb-2
                "
              >
                {cat.name}
              </h3>

              <button
                className="
                  mt-2
                  text-[#D6A06A]
                  font-semibold
                  flex
                  items-center
                  gap-2
                  transition-all
                  group-hover:translate-x-1
                "
              >
                View Equipment →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}