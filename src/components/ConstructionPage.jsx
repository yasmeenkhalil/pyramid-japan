import ConstructionHero from '../components/ConstructionHero';
import ConstructionCategories from '../components/ConstructionCategories';
import FeaturedConstructionMachinery from '../components/FeaturedConstructionMachinery';
import RentalOrSaleCTA from '../components/RentalOrSaleCTA'; 
import ConstructionFaq from '../components/ConstructionFaq';

export default function ConstructionPage() {
  return (
    <main className="overflow-hidden">
      <ConstructionHero />
      <ConstructionCategories />
      <FeaturedConstructionMachinery />
      <RentalOrSaleCTA />
      <ConstructionFaq />
    </main>
  );
}
