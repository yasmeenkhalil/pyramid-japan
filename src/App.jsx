import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import SidebarFilters from './components/SidebarFilters';
import CategoryGrid from './components/CategoryGrid';
import SidebarBanners from './components/SidebarBanners';
import EquipmentSection from './components/EquipmentSection';
import MakerSeaction from './components/MakerSeaction';
import WorldShipping from './components/WorldShipping';
import MainFooter from './components/MainFooter'; 
import FixedContactBar from './components/FixedContactBar'; 

import AboutUs from './components/AboutUs'; 

const RECOMMENDED_MACHINES = [
  { id: 'r1', title: 'Large Excavator For Demolition', model: 'KOBELCO ZX225USRLCK-5B', hours: '5,458', year: '2016 (H28)', location: 'AOCHI Yard', tag: 'For Demolition', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
  { id: 'r2', title: 'Excavator Arm Crane Spec', model: 'KOBELCO SK135SR-3', hours: '3,321', year: '2015 (H27)', location: 'AOCHI Yard', tag: 'Arm Crane', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
  { id: 'r3', title: 'Wheel Loaders Animal Spec', model: 'HITACHI ZW30-5B', hours: '1,320', year: '2022 (R04)', location: 'AOCHI Yard', tag: 'Animal Spec', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
  { id: 'r4', title: 'Excavator For Demolition', model: 'KOBELCO ZX135USK-6', hours: '2', year: '2026 (R08)', location: 'AOCHI Yard', tag: 'For Demolition', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
  { id: 'r5', title: 'Excavator For Demolition', model: 'KOBELCO ZX135USK-6', hours: '2', year: '2026 (R08)', location: 'AOCHI Yard', tag: 'For Demolition', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
];

const NEW_ARRIVALS = [
  { id: 'n1', title: 'KOBELCO Hydraulic Excavator', model: 'KOBELCO SK135SR-3', hours: '4,256', year: '2016 (H28)', location: 'HYOGO Yard', tag: 'Arm Crane', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
  { id: 'n2', title: 'KOBELCO Hydraulic Excavator', model: 'KOBELCO SK135SR-3', hours: '4,193', year: '2016 (H28)', location: 'HYOGO Yard', tag: 'Arm Crane', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
  { id: 'n3', title: 'KOMATSU Medium Excavator', model: 'KOMATSU PC138US-11', hours: '125', year: '2023 (R05)', location: 'IBARAKI Yard', tag: 'Arm Crane', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
  { id: 'n4', title: 'KOMATSU Electric Forklift', model: 'KOMATSU FB15-12', hours: '64', year: '2024 (R06)', location: 'Forklift', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
  { id: 'n5', title: 'KOMATSU Electric Forklift', model: 'KOMATSU FB15-12', hours: '64', year: '2024 (R06)', location: 'Forklift', price: 'Ask Price', image: '/assets/images/Crushers_Wood_Chippers.png' },
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
              
              <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-6 md:py-12 flex flex-col gap-12">
                
                {/* الحاوية العلوية تجمع القسمين بنفس الارتفاع الفعلي لليسار */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  
                  {/* شريط اليسار يتمدد طبيعياً ويتحكم بارتفاع المنطقة بالكامل */}
                  <div id="left-sidebar" className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
                    <SidebarFilters />
                    <SidebarBanners />
                  </div>

                  <div className="flex-1 w-full relative lg:self-stretch">
<div className="lg:absolute lg:inset-0 lg:overflow-y-auto pr-3
  [&::-webkit-scrollbar]:w-[8px]
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:bg-[#C47B36]/30
  [&::-webkit-scrollbar-thumb]:rounded-full
  hover:[&::-webkit-scrollbar-thumb]:bg-[#C47B36]/60
">
  <CategoryGrid />
</div>


                  </div>

                </div>

                {/* بقية الأقسام تظهر تحت الحاوية العلوية مباشرة وتأخذ كامل العرض */}
                <div className="w-full flex flex-col gap-8 md:gap-12">
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
                  
                
                  
                  <MakerSeaction /> 
                  <WorldShipping />
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
