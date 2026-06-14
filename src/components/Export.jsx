import ExportHero from '../components/ExportHero'; 
import ExportProcess from '../components/ExportProcess'; 
import InspectionSection from '../components/InspectionSection'; 
import ShippingMethods from '../components/ShippingMethods'; 
import ExportDocuments from '../components/ExportDocuments'; 
import CountriesSection from '../components/CountriesSection'; 
import FaqSection from '../components/FaqSection'; 
import ExportCTA from '../components/ExportCTA'; 
import FeaturedExportMachinery from '../components/FeaturedExportMachinery'; 

export default function ExportPage() {
  return (
    <main className="overflow-hidden">

      
<ExportHero />
<FeaturedExportMachinery /> 
<ExportProcess />
<InspectionSection />
<ShippingMethods />
<ExportDocuments />

{/* <WhyChooseUs /> */}

<CountriesSection />

<FaqSection />

<ExportCTA />

 </main>
  );
}