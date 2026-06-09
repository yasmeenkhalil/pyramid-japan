export default function MakerSeaction() {
  const makers = [
    { name: "KOMATSU", color: "text-[#003B8E]" },
    { name: "KOBELCO", color: "text-[#00A6E7]" },
    { name: "HITACHI", color: "text-[#FF6600]" },
    { name: "CATERPILLAR", color: "text-[#FFCD11]" },
    { name: "KUBOTA", color: "text-[#E60012]" },
    { name: "YANMAR", color: "text-[#D50000]" },

    { name: "TADANO", color: "text-[#005BAC]" },
    { name: "KATO", color: "text-[#002B7F]" },
    { name: "SUMITOMO", color: "text-[#003DA5]" },
    { name: "MITSUBISHI", color: "text-[#E60012]" },
    { name: "ISUZU", color: "text-[#D50000]" },
    { name: "HINO", color: "text-[#666666]" },
  ];

  return (
    <section className="w-full">
      
      {/* HEADER */}
      <div className="mb-8 text-center">
        <span
          className="
            inline-flex
            items-center
            px-5
            py-2
            rounded-full
            bg-[#FFF7ED]
            border
            border-[#D6A06A]/40
            text-[#C47B36]
            text-xs
            font-semibold
            tracking-[0.25em]
            uppercase
          "
        >
          Trusted Brands
        </span>

        <h2
          className="
            mt-4
            text-3xl
            md:text-4xl
            font-extrabold
            text-[#0F172A]
          "
        >
          Leading Japanese Manufacturers
        </h2>

        <p
          className="
            mt-3
            text-slate-500
            max-w-2xl
            mx-auto
          "
        >
          Browse equipment from Japan's most trusted construction,
          agricultural and industrial machinery brands.
        </p>
      </div>

      {/* BRANDS */}
      <div
        className="
          bg-white
          border
          border-[#D6A06A]/20
          rounded-3xl
          p-6
          md:p-8
          shadow-sm
        "
      >
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-4
            lg:grid-cols-6
            gap-5
          "
        >
          {makers.map((maker, index) => (
            <button
              key={index}
              className="
                group
                h-20
                rounded-2xl
                border
                border-slate-200
                bg-gradient-to-b
                from-white
                to-slate-50
                hover:border-[#D6A06A]
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <span
                className={`
                  text-sm
                  font-extrabold
                  tracking-wide
                  transition-all
                  duration-300
                  group-hover:scale-105
                  ${maker.color}
                `}
              >
                {maker.name}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            className="
              px-6
              py-3
              rounded-xl
              bg-[#C47B36]
              text-white
              font-semibold
              hover:bg-[#A86428]
              transition-all
              shadow-md
            "
          >
            View All Brands
          </button>
        </div>
      </div>
    </section>
  );
}