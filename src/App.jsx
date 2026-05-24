import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import SidebarFilters from './components/SidebarFilters';
import CategoryGrid from './components/CategoryGrid';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base text-charcoal selection:bg-sun-red selection:text-pure-white">
      <TopBar />
      <Header />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-80 shrink-0">
          <SidebarFilters />
        </div>
        <CategoryGrid />
      </main>

      <footer className="bg-pure-white border-t border-gold-light/40 py-6 text-center text-[11px] text-gold-base tracking-widest uppercase">
        © {new Date().getFullYear()} Pyramid Japan Co., Ltd. All Rights Reserved.
      </footer>
    </div>
  );
}
