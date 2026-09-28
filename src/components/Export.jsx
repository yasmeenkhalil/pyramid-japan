import ExportHero from '../components/ExportHero'; 
import ExportProcess from '../components/ExportProcess'; 
import InspectionSection from '../components/InspectionSection'; 
import ShippingMethods from '../components/ShippingMethods'; 
import ExportDocuments from '../components/ExportDocuments'; 
import CountriesSection from '../components/CountriesSection'; 
import FaqSection from '../components/FaqSection'; 
import ExportCTA from '../components/ExportCTA'; 
import FeaturedExportMachinery from '../components/FeaturedExportMachinery'; 
import ExportContainers from '../components/ExportContainers'; 

export default function ExportPage() {
  return (
    <main className="overflow-hidden">

      
<ExportHero />
<FeaturedExportMachinery /> 
<ExportContainers />
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