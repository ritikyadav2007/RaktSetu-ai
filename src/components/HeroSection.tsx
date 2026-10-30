import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Droplet, 
  AlertCircle, 
  Crosshair, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Users, 
  Building, 
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { BloodGroup, BloodComponent, UrgencyLevel } from '../types';
import { BLOOD_GROUPS, BLOOD_COMPONENTS, CITIES } from '../data/mockData';

interface HeroSectionProps {
  selectedGroup: BloodGroup | 'All';
  setSelectedGroup: (group: BloodGroup | 'All') => void;
  selectedComponent: BloodComponent;
  setSelectedComponent: (comp: BloodComponent) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedUrgency: UrgencyLevel;
  setSelectedUrgency: (urgency: UrgencyLevel) => void;
  onSearch: () => void;
  onOpenSOSModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedGroup,
  setSelectedGroup,
  selectedComponent,
  setSelectedComponent,
  selectedCity,
  setSelectedCity,
  selectedUrgency,
  setSelectedUrgency,
  onSearch,
  onOpenSOSModal,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Real-Time Blood Stock Discovery Across India",
      subtitle: "Connect instantly with verified government, Red Cross, and accredited hospital blood banks with up-to-the-minute stock verification.",
      image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200",
      tag: "Verified Inventory"
    },
    {
      title: "Rapid Emergency SOS Broadcast to Nearby Donors",
      subtitle: "When blood banks run out of rare groups, our geo-targeted network mobilizes eligible verified donors within minutes.",
      image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=1200",
      tag: "Emergency Response"
    },
    {
      title: "Safe, Licensed & Authorised Healthcare Coordination",
      subtitle: "All collection, cross-matching, testing (HIV, HCV, HBV, Syphilis, Malaria) and distribution handled strictly under licensed blood centres.",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200",
      tag: "Clinical Standards"
    }
  ];

  // Auto rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setSelectedCity('Delhi-NCR'); // simulated detected zone
        },
        () => {
          setSelectedCity('Delhi-NCR');
        }
      );
    } else {
      setSelectedCity('Delhi-NCR');
    }
  };

  return (
    <section className="relative bg-white pt-6 pb-12 sm:pb-16 border-b border-slate-200 overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-red-50/70 via-rose-50/30 to-transparent pointer-events-none -z-10"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200/80 rounded-full text-red-700 text-xs font-semibold shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>National Emergency Blood Coordination Grid</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Live stock verified every 30 minutes
          </div>
        </div>

        {/* Main Headline & Tagline */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Find the Right Blood,{' '}
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 bg-clip-text text-transparent">
              Faster.
            </span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
            Every second counts in critical emergencies. Search verified blood centre stock, mobilize nearby emergency donors, and coordinate hospital transfers without delays.
          </p>
        </div>

        {/* Hero Image Carousel Banner */}
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-900 aspect-21/9 sm:aspect-24/8 max-h-[360px] group">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.45]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 right-6 sm:right-10 text-white">
                <span className="inline-block px-2.5 py-1 bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider rounded-md mb-2 shadow-sm">
                  {slide.tag}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm max-w-2xl">
                  {slide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-1.5 max-w-2xl hidden sm:block leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Carousel Controls */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 right-6 flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentSlide ? 'w-6 bg-red-500' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Core Emergency Blood Search Widget (Prominent Hero Card) */}
        <div className="relative bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-2 border-red-100 ring-4 ring-red-50/50">
          
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-red-500 text-white shadow-xs">
                <Search className="w-5 h-5 stroke-[2.5]" />
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  Emergency Blood & Component Search
                </h2>
                <p className="text-xs text-slate-500">
                  Select group and location to view verified live inventory
                </p>
              </div>
            </div>

            {/* Quick Urgency Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
              <span className="text-[11px] font-bold text-slate-600 px-2">Urgency:</span>
              <button
                onClick={() => setSelectedUrgency('CRITICAL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedUrgency === 'CRITICAL'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Immediate (&lt;2h)
              </button>
              <button
                onClick={() => setSelectedUrgency('URGENT')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedUrgency === 'URGENT'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Today (&lt;12h)
              </button>
              <button
                onClick={() => setSelectedUrgency('ROUTINE')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedUrgency === 'ROUTINE'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Planned
              </button>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Blood Group */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Blood Group</span>
                <span className="text-[10px] text-red-600 lowercase font-medium">Required</span>
              </label>
              <div className="relative">
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value as BloodGroup | 'All')}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer"
                >
                  <option value="All">All Blood Groups</option>
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg} {bg === 'O-' ? '(Universal Donor)' : bg === 'AB+' ? '(Universal Recipient)' : bg === 'Bombay (hh)' ? '(Ultra Rare)' : ''}
                    </option>
                  ))}
                </select>
                <Droplet className="w-4 h-4 text-red-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Blood Component */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Component Required
              </label>
              <div className="relative">
                <select
                  value={selectedComponent}
                  onChange={(e) => setSelectedComponent(e.target.value as BloodComponent)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer"
                >
                  {BLOOD_COMPONENTS.map((comp) => (
                    <option key={comp} value={comp}>
                      {comp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 3. Location / City */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  City / Location
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  <Crosshair className="w-3 h-3" />
                  <span>Use GPS</span>
                </button>
              </div>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-800 focus:bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all cursor-pointer"
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 4. Prominent FIND BLOOD NOW Button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={onSearch}
                className="w-full h-12 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span>FIND BLOOD NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Filter Blood Group Pills */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mr-1">
              Quick Pick:
            </span>
            {BLOOD_GROUPS.map((bg) => {
              const isSelected = selectedGroup === bg;
              return (
                <button
                  key={bg}
                  onClick={() => {
                    setSelectedGroup(bg);
                    onSearch();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-xs scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-700'
                  }`}
                >
                  {bg}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Network Metrics Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">48+</div>
              <div className="text-xs font-medium text-slate-500">Verified Blood Centres</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Droplet className="w-5 h-5 fill-emerald-600 text-emerald-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">1,840+</div>
              <div className="text-xs font-medium text-slate-500">Reported Units In Stock</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">6,200+</div>
              <div className="text-xs font-medium text-slate-500">Emergency Donors On-Call</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">~18 Mins</div>
              <div className="text-xs font-medium text-slate-500">Avg. Emergency Match Time</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
