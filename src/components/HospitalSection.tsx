import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  ShieldCheck, 
  AlertCircle, 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw,
  PlusCircle,
  Truck
} from 'lucide-react';
import { HospitalProfile, BloodGroup } from '../types';
import { BLOOD_GROUPS, CITIES } from '../data/mockData';

interface HospitalSectionProps {
  hospitals: HospitalProfile[];
  onOpenSOSModal: () => void;
}

export const HospitalSection: React.FC<HospitalSectionProps> = ({
  hospitals,
  onOpenSOSModal,
}) => {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<HospitalProfile | null>(null);
  const [transferGroup, setTransferGroup] = useState<BloodGroup>('O-');
  const [transferUnits, setTransferUnits] = useState<number>(2);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const filteredHospitals = hospitals.filter(
    (h) => selectedCity === 'All Cities' || h.city === selectedCity
  );

  const handleRequestTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferSuccess(true);
    setTimeout(() => {
      setTransferSuccess(false);
      setTransferModalOpen(false);
    }, 2500);
  };

  return (
    <section id="hospitals" className="py-12 bg-slate-50 min-h-screen border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                Institutional Network
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Hospital Coordination & Inter-Facility Transfer
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Verified Hospitals & Clinical Requirements
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Real-time requirement boards for emergency trauma, oncology wards, and ICU requisitions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Hospital Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Title & Badges */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-slate-900">
                        {hosp.name}
                      </h3>
                      {hosp.isVerified && (
                        <span title="NABH / Quality Accredited">
                          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      {hosp.address}, {hosp.city}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                    {hosp.type}
                  </span>
                </div>

                {/* Blood Bank Availability and Coordinator */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Blood Bank Desk</span>
                    <strong className="text-slate-800">{hosp.hasInHouseBloodBank ? 'In-House 24x7 Bank' : 'External Affiliate'}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Transfusion Officer</span>
                    <strong className="text-slate-800">{hosp.bloodCoordinator}</strong>
                  </div>
                </div>

                {/* Live Requirements Board */}
                <div className="mb-4">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Current Urgent Requisitions ({hosp.currentRequirements.length})
                  </span>
                  
                  <div className="space-y-2">
                    {hosp.currentRequirements.map((req, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-red-50/70 border border-red-100 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-red-600 text-white font-black text-xs">
                            {req.bloodGroup}
                          </span>
                          <span className="font-bold text-slate-800">
                            {req.unitsNeeded} Units ({req.component})
                          </span>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          req.urgency === 'CRITICAL'
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {req.urgency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <a
                  href={`tel:${hosp.emergencyDesk.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-red-700 bg-slate-100 px-3 py-2 rounded-xl transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                  <span>Desk: {hosp.emergencyDesk}</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedHospital(hosp);
                      setTransferModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Inter-Bank Transfer</span>
                  </button>

                  <button
                    onClick={onOpenSOSModal}
                    className="flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Fulfill Need</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* INTER-HOSPITAL TRANSFER COORDINATION MODAL */}
        {transferModalOpen && selectedHospital && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Inter-Hospital Blood Transfer Request
                  </h3>
                  <p className="text-xs text-slate-500">Authorized medical requisition for {selectedHospital.name}</p>
                </div>
              </div>

              {transferSuccess ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900">Transfer Request Dispatched!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Nearby regional blood bank cold-chains have been alerted with medical transport priority.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestTransfer} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
                      <select
                        value={transferGroup}
                        onChange={(e) => setTransferGroup(e.target.value as BloodGroup)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      >
                        {BLOOD_GROUPS.map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Units Needed</label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={transferUnits}
                        onChange={(e) => setTransferUnits(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Receiving Hospital</label>
                    <input
                      type="text"
                      disabled
                      value={selectedHospital.name}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Doctor / Medical Officer Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. A. K. Sharma (Reg #DL-12948)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800">
                    ⚠️ Official hospital transfers require certified temperature-controlled cold boxes (2°C to 6°C for PRBC, 20°C to 24°C with gentle agitation for Platelets).
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Authorize Transfer Dispatch
                    </button>
                    <button
                      type="button"
                      onClick={() => setTransferModalOpen(false)}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
