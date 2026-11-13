import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Bookmark, 
  Flag, 
  Info, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  ExternalLink
} from 'lucide-react';
import { BloodCentre, BloodGroup, BloodComponent } from '../types';

interface BloodSearchSectionProps {
  centres: BloodCentre[];
  selectedGroup: BloodGroup | 'All';
  selectedComponent: BloodComponent;
  selectedCity: string;
  onOpenReserveModal: (centre: BloodCentre, group: BloodGroup) => void;
  onOpenReportModal: (centre: BloodCentre) => void;
}

export const BloodSearchSection: React.FC<BloodSearchSectionProps> = ({
  centres,
  selectedGroup,
  selectedComponent,
  selectedCity,
  onOpenReserveModal,
  onOpenReportModal,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [expandedCentreId, setExpandedCentreId] = useState<string | null>(null);

  // Filter centres by city & type
  const filteredCentres = centres.filter((c) => {
    if (selectedCity !== 'All Cities' && c.city !== selectedCity) return false;
    if (filterType !== 'All' && c.type !== filterType) return false;
    return true;
  });

  const getFreshnessBadge = (minutesAgo: number) => {
    if (minutesAgo <= 60) {
      return {
        label: `Verified Fresh (${minutesAgo} mins ago)`,
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        status: 'HIGH_CONFIDENCE'
      };
    } else if (minutesAgo <= 360) {
      const hours = Math.round(minutesAgo / 60);
      return {
        label: `Recent (${hours}h ago) — Call to Re-verify`,
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        status: 'MEDIUM_CONFIDENCE'
      };
    } else {
      const hours = Math.round(minutesAgo / 60);
      return {
        label: `Outdated Stock (${hours}h ago) — High Discrepancy Risk`,
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500',
        status: 'LOW_CONFIDENCE'
      };
    }
  };

  const getComponentStock = (stockItem: any, component: BloodComponent) => {
    if (!stockItem) return 0;
    switch (component) {
      case 'Whole Blood': return stockItem.wholeBlood;
      case 'PRBC (Red Cells)': return stockItem.prbc;
      case 'Platelets (RDP/SDP)': return stockItem.platelets;
      case 'Plasma (FFP)': return stockItem.plasma;
      case 'Cryoprecipitate': return stockItem.cryo;
      default: return (stockItem.wholeBlood + stockItem.prbc + stockItem.platelets + stockItem.plasma);
    }
  };

  return (
    <section id="blood-results" className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compliance / Transparency Notice Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/90 text-amber-900 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold uppercase tracking-wider text-[11px] block">
                Verification Protocol & Authorized Blood Banking Standard
              </span>
              <p className="text-amber-800 mt-0.5 leading-relaxed">
                Stock counts below reflect verified reports from participating blood centres. Actual blood collection, testing (NAT/ELISA), cross-matching and distribution remain under authorized State Drug Control & NBTC licensed centres.
              </p>
            </div>
          </div>
          <div className="shrink-0 font-bold text-amber-900 bg-amber-200/60 px-3 py-1.5 rounded-xl text-[11px]">
            Demo Simulation Grid Active
          </div>
        </div>

        {/* Section Header & Sub-filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide">
                Live Stock Discovery
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {filteredCentres.length} Centres Found in {selectedCity}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Matching Verified Blood Centres
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Showing availability for <strong className="text-red-700">{selectedGroup === 'All' ? 'All Blood Groups' : selectedGroup}</strong> • <strong className="text-slate-800">{selectedComponent}</strong>
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
            {['All', 'Government', 'Red Cross', 'Charitable', 'Private Hospital'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterType === type
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Blood Centre Cards Grid */}
        <div className="space-y-5">
          {filteredCentres.map((centre) => {
            const freshness = getFreshnessBadge(centre.lastUpdatedMinutesAgo);
            const isExpanded = expandedCentreId === centre.id;
            
            // Calculate reported units for current selection
            const activeGroup = (selectedGroup === 'All' ? 'O+' : selectedGroup) as BloodGroup;
            const stockForActiveGroup = centre.stock[activeGroup];
            const unitsAvailable = getComponentStock(stockForActiveGroup, selectedComponent);

            return (
              <div
                key={centre.id}
                className="bg-white rounded-3xl border border-slate-200/90 hover:border-red-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-5 sm:p-7">
                  
                  {/* Top Info Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                          {centre.name}
                        </h3>
                        
                        {/* Verification Badge */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          {centre.verificationStatus.replace('_', ' ')}
                        </span>

                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {centre.type}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500" />
                          {centre.address}, {centre.locality}, {centre.city}
                        </span>
                        <span>•</span>
                        <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {centre.distanceKm} km away
                        </span>
                        <span>•</span>
                        <span className="font-mono text-slate-500">
                          Lic: {centre.licenseNumber}
                        </span>
                      </div>
                    </div>

                    {/* Freshness Status Pill */}
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-extrabold ${freshness.bg}`}>
                        <span className={`w-2 h-2 rounded-full ${freshness.dot} animate-pulse`}></span>
                        <span>{freshness.label}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Stock Units Overview */}
                  <div className="py-5 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    
                    {/* Primary Target Group Stock Display */}
                    <div className="md:col-span-5 bg-gradient-to-br from-red-50/80 via-white to-slate-50 rounded-2xl p-4 border border-red-100 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Reported Stock for:
                        </span>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-2xl font-black text-red-700">
                            {activeGroup}
                          </span>
                          <span className="text-xs font-semibold text-slate-600">
                            ({selectedComponent})
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {centre.operatingHours}
                        </span>
                      </div>

                      <div className="text-right">
                        <div className={`text-3xl sm:text-4xl font-black tracking-tight ${
                          unitsAvailable > 5 
                            ? 'text-emerald-600' 
                            : unitsAvailable > 0 
                            ? 'text-amber-600' 
                            : 'text-rose-600'
                        }`}>
                          {unitsAvailable}
                        </div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                          {unitsAvailable === 1 ? 'Unit Available' : 'Units Available'}
                        </span>
                      </div>
                    </div>

                    {/* Component breakdown summary */}
                    <div className="md:col-span-4 grid grid-cols-4 gap-2 text-center">
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-500">PRBC</div>
                        <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                          {stockForActiveGroup?.prbc || 0}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-500">Platelet</div>
                        <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                          {stockForActiveGroup?.platelets || 0}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-500">Plasma</div>
                        <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                          {stockForActiveGroup?.plasma || 0}
                        </div>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <div className="text-xs font-bold text-slate-500">Whole</div>
                        <div className="text-sm font-extrabold text-slate-900 mt-0.5">
                          {stockForActiveGroup?.wholeBlood || 0}
                        </div>
                      </div>
                    </div>

                    {/* Quick Call & Direction Actions */}
                    <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-2">
                      <a
                        href={`tel:${centre.emergencyPhone.replace(/[^0-9]/g, '')}`}
                        className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Centre: {centre.emergencyPhone}</span>
                      </a>
                      
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(centre.name + ' ' + centre.address)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors"
                      >
                        <Navigation className="w-4 h-4 text-red-600" />
                        <span>Get Directions ({centre.distanceKm} km)</span>
                      </a>
                    </div>
                  </div>

                  {/* Facilities list */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mr-1">
                      Facilities:
                    </span>
                    {centre.facilities.map((fac, idx) => (
                      <span key={idx} className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        ✓ {fac}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Full Stock Breakdown & Actions */}
                  {isExpanded && (
                    <div className="mt-5 pt-5 border-t border-slate-100 animate-in fade-in duration-200">
                      <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">
                        Complete Multi-Group Stock Breakdown ({centre.name})
                      </h4>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left text-slate-700 border-collapse">
                          <thead>
                            <tr className="bg-slate-100/80 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                              <th className="py-2 px-3 rounded-l-lg">Blood Group</th>
                              <th className="py-2 px-3">Whole Blood</th>
                              <th className="py-2 px-3">PRBC (Red Cells)</th>
                              <th className="py-2 px-3">Platelets (SDP/RDP)</th>
                              <th className="py-2 px-3">Fresh Frozen Plasma</th>
                              <th className="py-2 px-3">Cryoprecipitate</th>
                              <th className="py-2 px-3 text-right rounded-r-lg">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {Object.entries(centre.stock).map(([grp, items]) => (
                              <tr key={grp} className={grp === activeGroup ? 'bg-red-50/60 font-bold' : 'hover:bg-slate-50'}>
                                <td className="py-2.5 px-3 font-extrabold text-slate-900">
                                  {grp}
                                </td>
                                <td className="py-2.5 px-3">{items.wholeBlood}</td>
                                <td className="py-2.5 px-3 text-red-700 font-bold">{items.prbc}</td>
                                <td className="py-2.5 px-3 text-amber-700 font-bold">{items.platelets}</td>
                                <td className="py-2.5 px-3">{items.plasma}</td>
                                <td className="py-2.5 px-3">{items.cryo}</td>
                                <td className="py-2.5 px-3 text-right">
                                  <button
                                    onClick={() => onOpenReserveModal(centre, grp as BloodGroup)}
                                    className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                                  >
                                    Hold Unit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Bottom Toggle & Report Button Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setExpandedCentreId(isExpanded ? null : centre.id)}
                      className="inline-flex items-center gap-1 font-bold text-red-600 hover:text-red-700 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span>Collapse Detailed Stock</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span>View Full Inventory Breakdown & Hold Options</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onOpenReportModal(centre)}
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-600 font-medium transition-colors cursor-pointer"
                        title="Report discrepancies in stock or phone number"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Report Incorrect Info</span>
                      </button>
                      
                      <button
                        onClick={() => onOpenReserveModal(centre, activeGroup)}
                        className="inline-flex items-center gap-1 text-red-700 font-bold hover:underline cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Reserve for Patient</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

