import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MachineCard from './MachineCard';

const allMachineryData = [
  {
    id: "CN-001",
    model: "KOBELCO SK135SR-3",
    title: "Excavator Arm Crane Spec",
    tag: "ARM CRANE",
    type: "construction",
    year: "2015",
    hours: "3,321",
    location: "AOCHI Yard",
    price: "Ask Price",
    image: "/assets/images/Crushers_Wood_Chippers.png"
  },
  {
    id: "EX-001",
    model: "KOMATSU PC200-8",
    title: "Heavy Duty Export Grade Excavator",
    tag: "FOR EXPORT",
    type: "export",
    year: "2017",
    hours: "4,500",
    location: "KOBE Port",
    price: "Ask Price",
    image: "/assets/images/Crushers_Wood_Chippers.png"
  },
  {
    id: "AG-001",
    model: "KUBOTA M7060",
    title: "High Efficiency Agricultural Tractor",
    tag: "TRACTOR",
    type: "agriculture",
    year: "2019",
    hours: "1,200",
    location: "HOKKAIDO Yard",
    price: "Ask Price",
    image: "/assets/images/Crushers_Wood_Chippers.png"
  },
  {
    id: "MN-001",
    model: "TCM FD30T",
    title: "Maintenance Depot Forklift Truck",
    tag: "FORKLIFT",
    type: "maintenance",
    year: "2016",
    hours: "5,800",
    location: "OSAKA Yard",
    price: "Ask Price",
    image: "/assets/images/Crushers_Wood_Chippers.png"
  }
];

export default function AllMachineryPage() {
  const { category } = useParams();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'export', label: 'Export' },
    { id: 'construction', label: 'Construction' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'maintenance', label: 'Maintenance' }
  ];

  useEffect(() => {
    if (category) {
      setActiveFilter(category.toLowerCase());
    } else {
      setActiveFilter('all');
    }
  }, [category]);

  const filteredMachines = allMachineryData.filter((machine) => {
    const matchesFilter = activeFilter === 'all' || machine.type === activeFilter;
    const matchesSearch = 
      machine.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.tag.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-[1500px] mx-auto">
        
        <div className="text-center mb-8">
          <span className="text-xs font-bold tracking-[0.25em] text-[#C47B36] uppercase">Pyramid Japan</span>
          <h2 className="text-2xl font-black text-[#0F172A] sm:text-3xl mt-1">Used Construction Machine</h2>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <input 
            type="text" 
            placeholder="Search by name, model or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 rounded-xl border border-slate-200 text-base bg-white text-[#0F172A] focus:outline-none focus:border-[#C47B36] shadow-sm transition-colors"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 whitespace-nowrap snap-x justify-start sm:justify-center">
          {filters.map((f) => (
            <Link
              key={f.id}
              to={`/machinery-all/${f.id}`}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 snap-center block ${activeFilter === f.id ? 'bg-[#0F172A] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
            >
              {f.label}
            </Link>
          ))}
        </div>

        {filteredMachines.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 font-medium">No machinery found matching your selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filteredMachines.map((machine) => (
              <MachineCard key={machine.id} machine={machine} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
