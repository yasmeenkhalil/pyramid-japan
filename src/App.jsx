import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

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

export default function App() {
  const [recommendedMachines, setRecommendedMachines] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const transformData = (items) => {
    if (!items || !Array.isArray(items)) return [];
    return items.map((item) => ({
      id: item.id,
      title: item.titleEn || item.titleAr || item.titleJa,
      model: item.model || "",
      hours: item.hour ? item.hour.toLocaleString() : "0",
      year: item.year ? item.year.toString() : "",
      location: item.location || "AOCHI Yard",
      tag: item.featured ? "Featured" : "",
      price: item.price ? `${item.price.toLocaleString()} JPY` : "Ask Price",
      image: item.images && item.images.length > 0 ? item.images[0].imageUrl : '/assets/images/Crushers_Wood_Chippers.png'
    }));
  };

  useEffect(() => {
    async function fetchHomeData() {
      try {
        let recUrl = '/api/machinery/recommended';
        let newUrl = '/api/machinery/new-arrivals';
        
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
          setRecommendedMachines(transformData(dataRec));
        }

        const resNew = await fetch(newUrl);
        if (resNew.ok) {
          const dataNew = await resNew.json();
          setNewArrivals(transformData(dataNew));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchHomeData();
  }, [searchQuery, selectedCategory]);

  return (
    <Router>
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
                      title="Pick Up Recommended Used Construction Machine!" 
                      badgeColor="bg-[#0E4A86]" 
                      data={recommendedMachines}
                    />

                    <EquipmentSection 
                      title="New Arrival Used Construction Machine" 
                      badgeColor="bg-[#0E4A86]" 
                      data={newArrivals}
                    />
                    
                    <MakerSeaction /> 
                    <WorldShipping />
                  </div>

                </main>
              </>
            } />

            <Route path="/export" element={<Export />} />
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
