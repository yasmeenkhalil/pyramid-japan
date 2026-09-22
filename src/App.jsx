import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import SidebarCategoryFilters from './components/SidebarCategoryFilters';
import CategoryGrid from './components/CategoryGrid';
import SidebarBanners from './components/SidebarBanners';
import EquipmentSection from './components/EquipmentSection';
import MakerSeaction from './components/MakerSeaction';
import WorldShipping from './components/WorldShipping';
import MainFooter from './components/MainFooter'; 
import FixedContactBar from './components/FixedContactBar'; 
import Export from './components/Export'; 
import Construction from './components/ConstructionPage'; 
import Agriculture from './components/AgriculturePage'; 
import Maintenance from './components/MaintenancePage'; 
import ContactPage from './components/ContactPage'; 
import MachineryDetails from './components/MachineryDetails'; 
import AllMachineryPage from './components/AllMachineryPage'; 
import ScrollToTop from "./components/ScrollToTop"; 
import AboutUs from  "./components/AboutUs"; 
 
export default function App() {
  const { t, i18n } = useTranslation();
  const [recommendedMachines, setRecommendedMachines] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingRec, setLoadingRec] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const currentLang = i18n.language;

  // تعريف الرابط الأساسي للباك إند من ملف الـ env
  const baseUrl = import.meta.env.VITE_API_URL || 'https://app.pyramidjapan.jp';

  const resolveImage = (item) => {
    const candidates = [
      item?.images,
      item?.image,
      item?.imageUrl,
      item?.thumbnail,
      item?.mainImage,
    ];

    for (const candidate of candidates) {
      if (Array.isArray(candidate) && candidate.length > 0) {
        const first = candidate[0];
        if (typeof first === 'string') return first;
        if (first?.imageUrl) return first.imageUrl;
      }

      if (typeof candidate === 'string' && candidate.trim()) {
        return candidate;
      }

      if (candidate && typeof candidate === 'object' && candidate.imageUrl) {
        return candidate.imageUrl;
      }
    }

    if (item?.sector === 'Agriculture') {
      return '/assets/images/Tractors.png';
    }

    if (item?.sector === 'Construction') {
      return '/assets/images/Crushers_Wood_Chippers.png';
    }

    return '/assets/images/Crushers_Wood_Chippers.png';
  };

  const transformData = (items) => {
    if (!items || !Array.isArray(items)) return [];
    return items.map((item) => {
      let finalTitle = item.titleEn || item.title || "";
      if ((currentLang === "ar" || currentLang?.startsWith("ar")) && item.titleAr) finalTitle = item.titleAr;
      if ((currentLang === "ja" || currentLang?.startsWith("ja")) && item.titleJa) finalTitle = item.titleJa;
      if ((currentLang === "ru" || currentLang?.startsWith("ru")) && item.titleRu) finalTitle = item.titleRu;

      return {
        id: item.id,
        title: finalTitle,
        titleEn: item.titleEn,
        titleAr: item.titleAr,
        titleJa: item.titleJa,
        titleRu: item.titleRu,
        model: item.model || "",
        hours: item.hour ? item.hour.toLocaleString() : "0",
        year: item.year ? item.year.toString() : "",
        location: item.location || t('app.default_location'),
        tag: item.isSold ? "" : (item.featured ? t('app.tag_featured') : ""),
        isSold: Boolean(item.isSold),
        price: item.price ? `${item.price.toLocaleString()} JPY` : t('app.ask_price'),
        image: resolveImage(item)
      };
    });
  };

  useEffect(() => {
    async function fetchHomeData() {
      setLoadingRec(true);
      setLoadingNew(true);
      try {
        // إصلاح وتوجيه الروابط إلى السيرفر الفعلي باستخدام الـ baseUrl
        let recUrl = `${baseUrl}/api/machinery/recommended`;
        let newUrl = `${baseUrl}/api/machinery/new-arrivals`;
        
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (selectedCategory) params.append("category", selectedCategory);
        
        const queryString = params.toString();
        if (queryString) {
          recUrl += `?${queryString}`;
          newUrl += `?${queryString}`;
        }

        const resRec = await fetch(recUrl);
        if (resRec.ok) {
          const dataRec = await resRec.json();
          console.log(dataRec);
          
          setRecommendedMachines(transformData(dataRec));
        }
        setLoadingRec(false);

        const resNew = await fetch(newUrl);
        if (resNew.ok) {
          const dataNew = await resNew.json();
          setNewArrivals(transformData(dataNew));
        }
        setLoadingNew(false);
      } catch (err) {
        console.error(err);
        setLoadingRec(false);
        setLoadingNew(false);
      }
    }
    fetchHomeData();
  }, [searchQuery, selectedCategory, currentLang, baseUrl]); // إضافة baseUrl هنا لضمان استقرار التحديث
  
  return (
    <Router> 
      <ScrollToTop />
      <div className="min-h-screen bg-bg-base text-charcoal selection:bg-sun-red selection:text-pure-white antialiased overflow-x-hidden flex flex-col justify-between">
        
        <div>
          <TopBar />
          <Header onSearch={setSearchQuery} />
          
          <Routes>
           
            <Route path="/" element={
              <>
                <Hero onSearch={setSearchQuery} />
                
                <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-12 flex flex-col gap-12">
                  
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    
                    <div id="left-sidebar" className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
                      <SidebarCategoryFilters 
                        onCategoryChange={setSelectedSector} 
                        onSortChange={setSelectedSort}
                      />
                      <SidebarBanners />
                    </div>

                    <div className="flex-1 w-full relative lg:self-stretch">
                      <div className="lg:absolute lg:inset-0 lg:overflow-y-auto pr-3
                        [&::-webkit-scrollbar]:w-[8px]
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:bg-[#C47B36]/30
                        [&::-webkit-scrollbar-full]:rounded-full
                        hover:[&::-webkit-scrollbar-thumb]:bg-[#C47B36]/60
                      ">
                        <CategoryGrid 
                          sector={selectedSector}
                          sort={selectedSort}
                          selectedCategory={selectedCategory}
                          onCategorySelect={setSelectedCategory}
                        />
                      </div>
                    </div>

                  </div>

                  <div className="w-full flex flex-col gap-8 md:gap-12">
                    <EquipmentSection 
                      title={t('app.sections.recommended_title')} 
                      badgeColor="bg-[#0E4A86]" 
                      data={recommendedMachines}
                      loading={loadingRec}
                    />

                    <EquipmentSection 
                      title={t('app.sections.new_arrivals_title')} 
                      badgeColor="bg-[#0E4A86]" 
                      data={newArrivals}
                      loading={loadingNew}
                    />
                    
                    <MakerSeaction /> 
                    <WorldShipping />
                  </div>

                </main>
              </>
            } />

            <Route path="/export" element={<Export />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/construction" element={<Construction />} />
            <Route path="/agricultural" element={<Agriculture />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/machinery/:id" element={<MachineryDetails />} />
            <Route path="/machinery-all/:category" element={<AllMachineryPage />} />

          </Routes>
        </div>

        <MainFooter />
        <FixedContactBar />

      </div>
    </Router>
  );
}
