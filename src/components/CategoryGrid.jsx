import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 استورديه في الأعلى

export default function CategoryGrid({ sector, sort }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // 👈 تفعيل دالة التوجيه

  useEffect(() => {
    async function fetchCategories() {
      try {
        let url = "/api/categories";
        const params = new URLSearchParams();
        if (sector) params.append("sector", sector);
        if (sort) params.append("sort", sort);
        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCategories();
  }, [sector, sort]);

  return (
    <section className="w-full">
      <div className="mb-8">
        <span className="inline-flex px-4 py-1 rounded-full bg-[#E0B15A]/10 text-[#C47B36] text-xs uppercase tracking-[0.25em] font-semibold">Our Machinery</span>
        <h2 className="mt-3 text-3xl font-black text-[#0B1B3A]">Browse Equipment Categories</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/machinery-all/${cat.slug}`)} // 👈 تعديل السطر لفتح الصفحة بالـ slug مصفاة فوراً
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#C47B36] transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative w-full h-[210px] overflow-hidden bg-[#16110F]">
              <img src={cat.imageUrl || "/assets/images/Crushers_Wood_Chippers.png"} alt={cat.nameEn} className="w-full h-full object-contain object-center transition-transform duration-750 ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#16110F]/40 via-transparent to-[#16110F] opacity-90" />
            </div>

            <div className="p-5 text-center">
              <h3 className="text-[#111827] font-bold uppercase tracking-wide text-sm lg:text-base">{cat.nameEn}</h3>
              <p className="mt-2 text-xs text-slate-500">{cat._count?.machinery || 0} Machines Available</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
