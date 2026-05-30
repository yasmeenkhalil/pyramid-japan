import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import SidebarFilters from './components/SidebarFilters';
import EquipmentStockSidebar from './components/EquipmentStockSidebar'; 
import CategoryGrid from './components/CategoryGrid';
import SidebarBanners from './components/SidebarBanners';
import EquipmentSection from './components/EquipmentSection';
import MakerSeaction from './components/MakerSeaction';
import WorldShipping from './components/WorldShipping';
import MainFooter from './components/MainFooter'; 
import FixedContactBar from './components/FixedContactBar'; 

import AboutUs from './components/AboutUs'; 

const RECOMMENDED_MACHINES = [
  { id: 'r1', title: 'Large Excavator For Demolition', model: 'KOBELCO ZX225USRLCK-5B', hours: '5,458', year: '2016 (H28)', location: 'AOCHI Yard', tag: 'For Demolition', price: 'Ask Price', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIZT4_hyGumrVANz4nG69aRl_zj_Sm0yAvg&s' },
  { id: 'r2', title: 'Excavator Arm Crane Spec', model: 'KOBELCO SK135SR-3', hours: '3,321', year: '2015 (H27)', location: 'AOCHI Yard', tag: 'Arm Crane', price: 'Ask Price', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIZT4_hyGumrVANz4nG69aRl_zj_Sm0yAvg&s' },
  { id: 'r3', title: 'Wheel Loaders Animal Spec', model: 'HITACHI ZW30-5B', hours: '1,320', year: '2022 (R04)', location: 'AOCHI Yard', tag: 'Animal Spec', price: 'Ask Price', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIZT4_hyGumrVANz4nG69aRl_zj_Sm0yAvg&s' },
  { id: 'r4', title: 'Excavator For Demolition', model: 'KOBELCO ZX135USK-6', hours: '2', year: '2026 (R08)', location: 'AOCHI Yard', tag: 'For Demolition', price: 'Ask Price', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIZT4_hyGumrVANz4nG69aRl_zj_Sm0yAvg&s' },
];

const NEW_ARRIVALS = [
  { id: 'n1', title: 'KOBELCO Hydraulic Excavator', model: 'KOBELCO SK135SR-3', hours: '4,256', year: '2016 (H28)', location: 'HYOGO Yard', tag: 'Arm Crane', price: 'Ask Price', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIZT4_hyGumrVANz4nG69aRl_zj_Sm0yAvg&s' },
  { id: 'n2', title: 'KOBELCO Hydraulic Excavator', model: 'KOBELCO SK135SR-3', hours: '4,193', year: '2016 (H28)', location: 'HYOGO Yard', tag: 'Arm Crane', price: 'Ask Price', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIZT4_hyGumrVANz4nG69aRl_zj_Sm0yAvg&s' },
  { id: 'n3', title: 'KOMATSU Medium Excavator', model: 'KOMATSU PC138US-11', hours: '125', year: '2023 (R05)', location: 'IBARAKI Yard', tag: 'Arm Crane', price: 'Ask Price', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIZT4_hyGumrVANz4nG69aRl_zj_Sm0yAvg&s' },
  { id: 'n4', title: 'KOMATSU Electric Forklift', model: 'KOMATSU FB15-12', hours: '64', year: '2024 (R06)', location: 'IBARAKI Yard', tag: 'Forklift', price: 'Ask Price', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIZT4_hyGumrVANz4nG69aRl_zj_Sm0yAvg&s' },
];

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-base text-charcoal selection:bg-sun-red selection:text-pure-white antialiased pb-16 overflow-x-hidden">
        
        <TopBar />
        <Header />
        
        <Routes>
          
          <Route path="/" element={
            <>
              <Hero />
              
              <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-12 flex flex-col lg:flex-row gap-6 items-start">
                
                <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4 lg:sticky lg:top-4">
                  
                  <SidebarFilters />
                  
                  <div className="hidden lg:block">
                    <EquipmentStockSidebar /> 
                  </div>
                  
                </div>

                <div className="flex-1 w-full flex flex-col gap-8 md:gap-12 overflow-hidden">
                  <CategoryGrid />
                  
                  <EquipmentSection 
                    title="Pick Up Recommended Used Construction Machine!" 
                    badgeColor="bg-[#0E4A86]" 
                    data={RECOMMENDED_MACHINES}
                  />

                  <EquipmentSection 
                    title="New Arrival Used Construction Machine" 
                    badgeColor="bg-[#0E4A86]" 
                    data={NEW_ARRIVALS}
                  />
                  
                  <EquipmentSection 
                    title="Recently Sold Used Construction Machine!" 
                    badgeColor="bg-[#0E4A86]" 
                    data={RECOMMENDED_MACHINES}
                  />
                  
                  <EquipmentSection 
                    title="Popular Ranking Construction Machine!" 
                    badgeColor="bg-[#0E4A86]" 
                    data={RECOMMENDED_MACHINES}
                  />
                  
                  <EquipmentSection 
                    title="Looking for Construction Machine!" 
                    badgeColor="bg-[#0E4A86]" 
                    data={RECOMMENDED_MACHINES}
                  />
                  
                  <MakerSeaction /> 
                  <WorldShipping />
                </div>

                <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-4 hidden lg:block">
                  <SidebarBanners />
                </div>
              </main>
            </>
          } />

          <Route path="/about" element={<AboutUs />} />

        </Routes>

        <MainFooter />
        <FixedContactBar />

      </div>
    </Router>
  );
}
