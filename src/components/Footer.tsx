import React from 'react';
import { 
  Heart, 
  PhoneCall, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  ExternalLink,
  AlertTriangle,
  Lock,
  Building2,
  Users
} from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenSOSModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenSOSModal,
}) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency CTA Strip */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center md:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-red-100 bg-white/20 px-3 py-1 rounded-full">
              In A Critical Medical Emergency?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Broadcast an Immediate Blood SOS
            </h3>
            <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-xl">
              Alert verified voluntary donors and hospital blood banks within a 15 km radius. Free, 24x7 emergency service.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSOSModal}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-red-700 font-black text-sm rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              TRIGGER EMERGENCY SOS NOW
            </button>
            <a
              href="tel:104"
              className="px-5 py-3.5 bg-red-950/40 hover:bg-red-950/60 text-white font-extrabold text-sm rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Helpline 104</span>
            </a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                <Heart className="w-5 h-5 fill-white stroke-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                RaktSetu
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-red-900/60 text-red-300 border border-red-700 rounded-md">
                रक्तसेतु
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              RaktSetu is a digital blood donation and emergency coordination platform designed to eliminate critical delays during medical emergencies. Connecting patients, voluntary donors, licensed blood centres, hospitals, and doctors.
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <div><strong>Tagline:</strong> “Find the Right Blood, Faster.”</div>
              <div><strong>Platform Standard:</strong> Compliant with NBTC & State Drug Control guidelines.</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-4">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectTab('blood')} className="hover:text-white transition-colors cursor-pointer">
                  Find Blood & Components
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('donor')} className="hover:text-white transition-colors cursor-pointer">
                  Emergency Donor Alerts
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('donor')} className="hover:text-white transition-colors cursor-pointer">
                  Eligibility Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('hospital')} className="hover:text-white transition-colors cursor-pointer">
                  Hospital Requisitions
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('doctor')} className="hover:text-white transition-colors cursor-pointer">
                  Ask a Doctor Desk
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('health')} className="hover:text-white transition-colors cursor-pointer">
                  Blood Compatibility Matrix
                </button>
              </li>
            </ul>
          </div>

          {/* Stakeholder Portals */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-4">
              Authorized Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectTab('dashboards')} className="hover:text-white transition-colors cursor-pointer">
                  Blood Centre Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboards')} className="hover:text-white transition-colors cursor-pointer">
                  Hospital Requisition Desk
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboards')} className="hover:text-white transition-colors cursor-pointer">
                  Doctor Clinical Guidance
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('dashboards')} className="hover:text-white transition-colors cursor-pointer">
                  Trust & Verification Admin
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('profile')} className="hover:text-white transition-colors cursor-pointer">
                  My Digital Donor Pass
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Helplines & Govt Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 mb-4">
              Emergency Numbers
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">National Blood Helpline</span>
                <a href="tel:104" className="text-red-400 font-extrabold hover:underline">104 (Toll-Free 24x7)</a>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Ambulance Emergency</span>
                <a href="tel:108" className="text-white font-bold hover:underline">108 / 112</a>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Red Cross Disaster Line</span>
                <a href="tel:1800118004" className="text-slate-300 hover:underline">1800-11-8004</a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Regulatory Compliance Disclaimer */}
        <div className="mt-8 pt-8 text-[11px] text-slate-500 space-y-3">
          <p className="leading-relaxed">
            <strong>Statutory Medical Compliance Disclaimer:</strong> RaktSetu is a non-commercial digital emergency coordination network. RaktSetu does not buy, sell, collect, or store physical blood products. All biological collection, screening (HIV 1&2, Hepatitis B, Hepatitis C, Syphilis, Malaria), cross-matching, component fractionation, storage, and distribution are conducted strictly under licensed and accredited blood centres approved by the Drugs Controller General of India (DCGI) and State Licensing Authorities in accordance with the Drugs and Cosmetics Act.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-slate-400">
            <div>
              © 2026 RaktSetu Technologies. All rights reserved.
            </div>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Terms of Service</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer">Clinical Standards</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

