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
import MainFooter from './components/MainFooter'; // 1. استيراد الفوتر الكبير الجديد
import FixedContactBar from './components/FixedContactBar'; // 2. استيراد شريط الاتصال السفلي العائم

const RECOMMENDED_MACHINES = [
  { id: 'r1', title: 'Large Excavator For Demolition', model: 'KOBELCO ZX225USRLCK-5B', hours: '5,458', year: '2016 (H28)', location: 'AOCHI Yard', tag: 'For Demolition', price: 'Ask Price', image: 'https://image.made-in-china.com/2f0j00YVBkfAGKCgco/Chinese-Small-454-Model-45HP-50HP-4-Wheels-4X4-Yto-Diesel-Engine-Farm-Tractors.webp' },
  { id: 'r2', title: 'Excavator Arm Crane Spec', model: 'KOBELCO SK135SR-3', hours: '3,321', year: '2015 (H27)', location: 'AOCHI Yard', tag: 'Arm Crane', price: 'Ask Price', image: 'https://image.made-in-china.com/2f0j00YVBkfAGKCgco/Chinese-Small-454-Model-45HP-50HP-4-Wheels-4X4-Yto-Diesel-Engine-Farm-Tractors.webp' },
  { id: 'r3', title: 'Wheel Loaders Animal Spec', model: 'HITACHI ZW30-5B', hours: '1,320', year: '2022 (R04)', location: 'AOCHI Yard', tag: 'Animal Spec', price: 'Ask Price', image: 'https://image.made-in-china.com/2f0j00YVBkfAGKCgco/Chinese-Small-454-Model-45HP-50HP-4-Wheels-4X4-Yto-Diesel-Engine-Farm-Tractors.webp' },
  { id: 'r4', title: 'Excavator For Demolition', model: 'KOBELCO ZX135USK-6', hours: '2', year: '2026 (R08)', location: 'AOCHI Yard', tag: 'For Demolition', price: 'Ask Price', image: 'https://image.made-in-china.com/2f0j00YVBkfAGKCgco/Chinese-Small-454-Model-45HP-50HP-4-Wheels-4X4-Yto-Diesel-Engine-Farm-Tractors.webp' },
];

const NEW_ARRIVALS = [
  { id: 'n1', title: 'KOBELCO Hydraulic Excavator', model: 'KOBELCO SK135SR-3', hours: '4,256', year: '2016 (H28)', location: 'HYOGO Yard', tag: 'Arm Crane', price: 'Ask Price', image: 'https://image.made-in-china.com/2f0j00YVBkfAGKCgco/Chinese-Small-454-Model-45HP-50HP-4-Wheels-4X4-Yto-Diesel-Engine-Farm-Tractors.webp' },
  { id: 'n2', title: 'KOBELCO Hydraulic Excavator', model: 'KOBELCO SK135SR-3', hours: '4,193', year: '2016 (H28)', location: 'HYOGO Yard', tag: 'Arm Crane', price: 'Ask Price', image: 'https://image.made-in-china.com/2f0j00YVBkfAGKCgco/Chinese-Small-454-Model-45HP-50HP-4-Wheels-4X4-Yto-Diesel-Engine-Farm-Tractors.webp' },
  { id: 'n3', title: 'KOMATSU Medium Excavator', model: 'KOMATSU PC138US-11', hours: '125', year: '2023 (R05)', location: 'IBARAKI Yard', tag: 'Arm Crane', price: 'Ask Price', image: 'https://image.made-in-china.com/2f0j00YVBkfAGKCgco/Chinese-Small-454-Model-45HP-50HP-4-Wheels-4X4-Yto-Diesel-Engine-Farm-Tractors.webp' },
  { id: 'n4', title: 'KOMATSU Electric Forklift', model: 'KOMATSU FB15-12', hours: '64', year: '2024 (R06)', location: 'IBARAKI Yard', tag: 'Forklift', price: 'Ask Price', image: 'https://image.made-in-china.com/2f0j00YVBkfAGKCgco/Chinese-Small-454-Model-45HP-50HP-4-Wheels-4X4-Yto-Diesel-Engine-Farm-Tractors.webp' },
];

export default function App() {
  return (
    // أضفت pb-16 لعمل مسافة أمان بالأسفل حتى لا يغطي الشريط العائم على الفوتر
    <div className="min-h-screen bg-bg-base text-charcoal selection:bg-sun-red selection:text-pure-white antialiased pb-16">
      <TopBar />
      <Header />
      <Hero />
      
      <main className="max-w-[1600px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* العمود الجانبي الأيسر (الفلاتر) */}
        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4 sticky top-4">
          <SidebarFilters />
          <EquipmentStockSidebar /> 
        </div>

        {/* المنتصف واليمين يظلون كما هم لضمان جمال التوزيع المكتمل... */}
        <div className="flex-1 w-full flex flex-col gap-12">
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

        {/* العمود الجانبي الأيمن */}
        <div className="w-full lg:w-72 shrink-0 sticky top-4">
          <SidebarBanners />
        </div>
        
      </main>

      {/* 3. استبدال الفوتر القديم البسيط بالفوتر الفخم والكامل المطابق للصورة */}
      <MainFooter />

      {/* 4. إضافة شريط الاتصال العائم والمضيء أسفل الشاشة تماماً */}
      <FixedContactBar />
    </div>
  );
}
