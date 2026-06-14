import AgricultureHero from '../components/AgricultureHero';
import AgricultureCategories from '../components/AgricultureCategories';
import FeaturedAgricultureMachinery from '../components/FeaturedAgricultureMachinery';
import AgricultureCTA from '../components/AgricultureCTA';
import AgricultureFaq from '../components/AgricultureFaq';

export default function AgriculturePage() {
  return (
    <main className="overflow-hidden">
      <AgricultureHero />
      <AgricultureCategories />
      <FeaturedAgricultureMachinery />
      <AgricultureCTA />
      <AgricultureFaq />
    </main>
  );
}
