import React, { useState } from 'react';
import { 
  Heart, 
  Search, 
  Users, 
  Building2, 
  Stethoscope, 
  Activity, 
  MessageSquareHeart, 
  LayoutDashboard, 
  UserCircle, 
  PhoneCall, 
  Menu, 
  X,
  AlertTriangle,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSOSModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSOSModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'blood', label: 'Find Blood', icon: Search },
    { id: 'donor', label: 'Donors & SOS', icon: Users },
    { id: 'hospital', label: 'Hospitals', icon: Building2 },
    { id: 'doctor', label: 'Doctors', icon: Stethoscope },
    { id: 'health', label: 'Health & Matrix', icon: Activity },
    { id: 'community', label: 'Camps & Stories', icon: MessageSquareHeart },
    { id: 'dashboards', label: 'Portals', icon: LayoutDashboard },
    { id: 'profile', label: 'My Pass', icon: UserCircle },
  ];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Emergency Strip */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="font-semibold tracking-wide uppercase text-[11px]">24x7 National Emergency Support</span>
            <span className="hidden sm:inline text-red-100">| National Blood Helpline: <strong>104</strong> or <strong>1800-11-8004</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:flex items-center gap-1 text-red-100">
              <ShieldCheck className="w-3.5 h-3.5 text-white" />
              NBTC & State Drug Control Compliant
            </span>
            <a 
              href="tel:104" 
              className="inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-full transition-colors text-white font-bold"
            >
              <PhoneCall className="w-3 h-3" />
              Dial 104
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleTabClick('blood')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-white stroke-white" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-red-600 via-red-700 to-slate-900 bg-clip-text text-transparent">
                  RaktSetu
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-md">
                  रक्तसेतु
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block -mt-0.5">
                Find the Right Blood, Faster.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive 
                      ? 'bg-red-50 text-red-700 border border-red-200/80 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600 stroke-[2.5]' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Emergency SOS Button */}
            <button
              onClick={onOpenSOSModal}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-extrabold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-[1.02] active:scale-95 transition-all animate-pulse-glow"
            >
              <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
              <span>EMERGENCY SOS</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${
                    isActive 
                      ? 'bg-red-50 text-red-700 border border-red-200 font-bold' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSOSModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md text-sm"
            >
              <AlertTriangle className="w-4 h-4" />
              Trigger Emergency Blood SOS
            </button>
            <div className="text-center text-[11px] text-slate-400 pt-1">
              National Emergency Helpline: <a href="tel:104" className="text-red-600 font-bold underline">104</a> / <a href="tel:108" className="text-red-600 font-bold underline">108</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

