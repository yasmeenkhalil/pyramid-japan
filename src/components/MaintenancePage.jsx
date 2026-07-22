import MaintenanceHero from '../components/MaintenanceHero';
import ServiceCapabilities from '../components/ServiceCapabilities'; 
import PartsSupport from '../components/PartsSupport'; 
import MaintenanceCTA from '../components/MaintenanceCTA';
import MaintenanceFaq from '../components/MaintenanceFaq';

export default function MaintenancePage() {
  return (
    <main className="overflow-hidden">
      <MaintenanceHero />
      <ServiceCapabilities />
      <PartsSupport />
      <MaintenanceCTA />
      <MaintenanceFaq />
    </main>
  );
}
