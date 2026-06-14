import MaintenanceHero from '../components/MaintenanceHero';
import ServiceCapabilities from '../components/ServiceCapabilities'; // كروت الخدمات الأساسية
import PartsSupport from '../components/PartsSupport'; // دعم قطع الغيار الأصلية
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
