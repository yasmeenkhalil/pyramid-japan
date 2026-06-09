import worldMapImage from '/assets/images/map.jpeg';

export default function WorldShipping() {
  const countries = [
    "United States",
    "United Kingdom",
    "United Arab Emirates",
    "Saudi Arabia",
    "Australia",
    "New Zealand",
    "Nigeria",
    "Kenya",
    "Malaysia",
    "Turkey",
    "Belgium",
    "Portugal",
    "Ireland",
    "Peru",
    "Mexico",
    "Argentina",
    "Kuwait",
    "Bahrain",
    "Greece",
    "Cyprus",
    "Nepal",
    "Bolivia",
    "Zambia",
    "Colombia",
  ];

  return (
    <section className="w-full">

      {/* Header */}
      <div className="text-center mb-8">
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
          Worldwide Export Network
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
          Shipping From Japan To The World
        </h2>

        <p
          className="
            mt-3
            text-slate-500
            max-w-3xl
            mx-auto
          "
        >
          Delivering quality construction and agricultural machinery
          from Japan to customers across Asia, Africa, Europe,
          Oceania and the Americas.
        </p>
      </div>

      {/* Main Card */}
      <div
        className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          overflow-hidden
          shadow-sm
        "
      >
        {/* Stats */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            border-b
            border-slate-100
          "
        >
          <div className="p-6 text-center">
            <div className="text-3xl font-black text-[#C47B36]">
              50+
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Countries Served
            </div>
          </div>

          <div className="p-6 text-center border-l border-slate-100">
            <div className="text-3xl font-black text-[#0F172A]">
              20+
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Years Experience
            </div>
          </div>

          <div className="p-6 text-center border-l border-slate-100">
            <div className="text-3xl font-black text-[#0F172A]">
              1000+
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Machines Exported
            </div>
          </div>

          <div className="p-6 text-center border-l border-slate-100">
            <div className="text-3xl font-black text-[#0F172A]">
              Global
            </div>
            <div className="text-sm text-slate-500 mt-1">
              Shipping Network
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="p-6 md:p-10">
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
            "
          >
            <img
              src={worldMapImage}
              alt="Worldwide Shipping Network"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Countries */}
        <div className="px-6 md:px-10 pb-10">
          <div
            className="
              border-t
              border-slate-100
              pt-8
            "
          >
            <h3
              className="
                text-lg
                font-bold
                text-[#0F172A]
                mb-5
              "
            >
              Countries We Export To
            </h3>

            <div
              className="
                flex
                flex-wrap
                gap-3
              "
            >
              {countries.map((country, index) => (
                <span
                  key={index}
                  className="
                    px-4
                    py-2
                    rounded-full
                    bg-slate-50
                    border
                    border-slate-200
                    text-sm
                    text-slate-700
                    hover:border-[#C47B36]
                    hover:text-[#C47B36]
                    transition-all
                    duration-300
                    cursor-pointer
                  "
                >
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}