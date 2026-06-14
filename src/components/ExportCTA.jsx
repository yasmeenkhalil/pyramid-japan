import { ArrowRight } from "lucide-react";

export default function ExportCTA() {
  return (
    <section className="relative overflow-hidden bg-[#D9A441] py-32">

      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:30px_30px]" />
      </div>

      <div className="relative mx-auto max-w-[900px] px-6 text-center">

        <span className="text-sm font-bold tracking-[0.3em] uppercase text-white">
          Get Started
        </span>

        <h2 className="mt-5 text-5xl font-black text-white md:text-6xl">
          Ready To Import
          <span className="block">
            Machinery From Japan?
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-white/90">
          Receive a personalized quotation and export plan
          within 24 hours.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <button className="group flex items-center gap-3 rounded-2xl bg-white px-8 py-5 font-bold text-[#081F3F] transition hover:scale-105">
            Request Quote

            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>

          <button className="rounded-2xl border border-white/30 px-8 py-5 font-bold text-white backdrop-blur-xl transition hover:bg-white/10">
            Browse Inventory
          </button>

        </div>

      </div>
    </section>
  );
}