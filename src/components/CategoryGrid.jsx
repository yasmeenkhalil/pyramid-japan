export default function CategoryGrid() {
  const categories = [
    {
      name: "Excavators",
      count: 41,
      imageSrc: "/assets/images/Excavators.png",
    },
    {
      name: "Aerial Work Platforms",
      count: 83,
      imageSrc: "/assets/images/Aerial_Work_Platforms.png",
    },
    {
      name: "Attachments",
      count: 3,
      imageSrc: "/assets/images/Attachments.png",
    },
    {
      name: "Bulldozers",
      count: 6,
      imageSrc: "/assets/images/Bulldozers.png",
    },
    {
      name: "Compressors",
      count: 14,
      imageSrc: "/assets/images/Compressors.png",
    },
    {
      name: "Cranes",
      count: 7,
      imageSrc: "/assets/images/Cranes.png",
    },
    {
      name: "Crushers Wood Chippers",
      count: 7,
      imageSrc: "/assets/images/Crushers_Wood_Chippers.png",
    },
    {
      name: "Equipment Inspection",
      count: 7,
      imageSrc: "/assets/images/Equipment_Inspection.png",
    },
    
    {
      name: "Forklifts",
      count: 7,
      imageSrc: "/assets/images/Forklifts.png",
    },
    
    {
      name: "Generators",
      count: 7,
      imageSrc: "/assets/images/Generators.png",
    },
    {
      name: "Foundation Machines",
      count: 7,
      imageSrc: "/assets/images/Foundation_Machines.png",
    },
    {
      name: "Graders",
      count: 7,
      imageSrc: "/assets/images/Graders.png",
    },
    {
      name: "Mini Excavators",
      count: 7,
      imageSrc: "/assets/images/Mini_Excavators.png",
    },
    {
      name: "Road Rollers",
      count: 7,
      imageSrc: "/assets/images/Road_Rollers.png",
    },
     {
      name: "Spare_Parts",
      count: 7,
      imageSrc: "/assets/images/Spare_Parts.png",
    },
     {
      name: "Trucks",
      count: 7,
      imageSrc: "/assets/images/Trucks.png",
    },
     {
      name: "Welders",
      count: 7,
      imageSrc: "/assets/images/Welders.png",
    },
     {
      name: "Wheel_Loaders",
      count: 7,
      imageSrc: "/assets/images/Wheel_Loaders.png",
    },
    

  ];

  return (
    <section className="w-full">
      {/* Heading */}
      {/* SECTION HEADER */}
<div className="mb-8">
  <span
    className="
      inline-flex
      px-4
      py-1
      rounded-full
      bg-[#E0B15A]/10
      text-[#C47B36]
      text-xs
      uppercase
      tracking-[0.25em]
      font-semibold
    "
  >
    Our Machinery
  </span>

  <h2
    className="
      mt-3
      text-3xl
      font-black
      text-[#0B1B3A]
    "
  >
    Browse Equipment Categories
  </h2>
</div>

      {/* Categories Grid */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-4
        xl:grid-cols-5
        gap-5
      "
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="
            group
            bg-white
            rounded-2xl
            overflow-hidden
            border
            border-slate-200
            hover:border-[#C47B36]
            hover:shadow-xl
            transition-all
            duration-300
            cursor-pointer
            hover:-translate-y-2
          "
          >
            {/* Image */}
<div className="relative w-full h-[210px] overflow-hidden bg-[#16110F]">
  <img
    src={cat.imageSrc}
    alt={cat.name}
    className="
      w-full
      h-full
      object-contain
      object-center
      transition-transform
      duration-750
      ease-out
      group-hover:scale-105
    "
  />
  {/* طبقة تظليل علوية وسفلية لدمج الحواف تماماً ومنع ظهور أي فوارق لونية */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#16110F]/40 via-transparent to-[#16110F] opacity-90" />
</div>


            {/* Content */}
            <div className="p-5 text-center">
              <h3
                className="
                text-[#111827]
                font-bold
                uppercase
                tracking-wide
                text-sm
                lg:text-base
              "
              >
                {cat.name}
              </h3>

              <p
                className="
                mt-2
                text-xs
                text-slate-500
              "
              >
                {cat.count} Machines Available
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}