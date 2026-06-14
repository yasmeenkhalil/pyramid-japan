import { Globe2 } from "lucide-react";

const countries = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Jordan",
  "Qatar",
  "Oman",
  "Kuwait",
  "Kenya",
  "Tanzania",
  "Uganda",
  "South Africa",
  "Pakistan",
  "Malaysia",
];

export default function CountriesSection() {
  return (
    <section className="bg-[#081F3F] py-32">
      <div className="mx-auto max-w-[1280px] px-6">

        <div className="text-center">
          <span className="text-sm font-bold tracking-[0.3em] uppercase text-[#D9A441]">
            Global Reach
          </span>

          <h2 className="mt-4 text-5xl font-black text-white">
            Countries We Export To
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Delivering Japanese machinery to customers around
            the world with trusted logistics partners.
          </p>
        </div>

        <div className="mt-20 rounded-[40px] border border-white/10 bg-white/5 p-12 backdrop-blur-xl">

          <div className="mb-12 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#D9A441]/20">
              <Globe2 className="h-12 w-12 text-[#D9A441]" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {countries.map((country) => (
              <div
                key={country}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:bg-white/10"
              >
                <span className="font-semibold text-white">
                  {country}
                </span>
              </div>
            ))}

          </div>

          <div className="mt-14 grid grid-cols-3 gap-8 text-center">

            <div>
              <div className="text-5xl font-black text-[#D9A441]">
                40+
              </div>
              <p className="mt-2 text-slate-400">
                Countries Served
              </p>
            </div>

            <div>
              <div className="text-5xl font-black text-[#D9A441]">
                5000+
              </div>
              <p className="mt-2 text-slate-400">
                Machines Exported
              </p>
            </div>

            <div>
              <div className="text-5xl font-black text-[#D9A441]">
                13+
              </div>
              <p className="mt-2 text-slate-400">
                Years Experience
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}