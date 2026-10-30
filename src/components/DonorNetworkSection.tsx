import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  Check, 
  X, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Award, 
  PhoneCall, 
  CheckCircle2, 
  Heart, 
  HelpCircle,
  FileCheck,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EmergencyDonorAlert, DonorProfile, BloodGroup } from '../types';
import { BLOOD_GROUPS, CITIES } from '../data/mockData';

interface DonorNetworkSectionProps {
  alerts: EmergencyDonorAlert[];
  donors: DonorProfile[];
  onOpenSOSModal: () => void;
  onDonorRespond: (alertId: string, etaMinutes: number) => void;
}

export const DonorNetworkSection: React.FC<DonorNetworkSectionProps> = ({
  alerts,
  donors,
  onOpenSOSModal,
  onDonorRespond,
}) => {
  const [selectedAlertForHelp, setSelectedAlertForHelp] = useState<string | null>(null);
  const [chosenEta, setChosenEta] = useState<number>(30);
  const [filterGroup, setFilterGroup] = useState<string>('All');
  
  // Eligibility Calculator State
  const [donorAge, setDonorAge] = useState<number>(25);
  const [donorWeight, setDonorWeight] = useState<number>(62);
  const [donorHb, setDonorHb] = useState<number>(13.5);
  const [lastDonationMonths, setLastDonationMonths] = useState<number>(4);
  const [hasTattooRecent, setHasTattooRecent] = useState<boolean>(false);
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);

  // New Donor Registration Modal/Form
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [newDonorName, setNewDonorName] = useState<string>('');
  const [newDonorGroup, setNewDonorGroup] = useState<BloodGroup>('O+');
  const [newDonorCity, setNewDonorCity] = useState<string>('Delhi-NCR');
  const [newDonorLocality, setNewDonorLocality] = useState<string>('');
  const [newDonorPhone, setNewDonorPhone] = useState<string>('');
  const [regSuccess, setRegSuccess] = useState<boolean>(false);

  const handleHelpSubmit = (alertId: string) => {
    onDonorRespond(alertId, chosenEta);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSelectedAlertForHelp(null);
  };

  const checkEligibility = () => {
    if (donorAge < 18 || donorAge > 65) {
      setEligibilityResult('NOT_ELIGIBLE_AGE: Donors must be between 18 and 65 years of age.');
      return;
    }
    if (donorWeight < 50) {
      setEligibilityResult('NOT_ELIGIBLE_WEIGHT: Minimum body weight required is 50 kg for whole blood donation (45 kg for females in select protocols).');
      return;
    }
    if (donorHb < 12.5) {
      setEligibilityResult('NOT_ELIGIBLE_HB: Hemoglobin level must be at least 12.5 g/dL to protect donor health.');
      return;
    }
    if (lastDonationMonths < 3) {
      setEligibilityResult('NOT_ELIGIBLE_INTERVAL: Mandatory deferral of at least 90 days (3 months) for males and 120 days for females between whole blood donations.');
      return;
    }
    if (hasTattooRecent) {
      setEligibilityResult('NOT_ELIGIBLE_TATTOO: Mandatory 6 to 12-month deferral required after a tattoo or body piercing as per NBTC guidelines.');
      return;
    }

    setEligibilityResult('ELIGIBLE: Congratulations! You meet all health criteria to donate life.');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  const handleRegisterDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDonorName || !newDonorPhone) return;
    setRegSuccess(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
    setTimeout(() => {
      setIsRegistering(false);
      setRegSuccess(false);
      setNewDonorName('');
      setNewDonorPhone('');
    }, 2500);
  };

  return (
    <section id="donor-network" className="py-12 bg-white min-h-screen border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wide">
                Live Emergency Network
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Active Broadcasts Available
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Emergency Donor Alerts & Volunteers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              When hospital blood banks face shortages, nearby voluntary donors receive instant SOS broadcasts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRegistering(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              + Register as Emergency Donor
            </button>
            <button
              onClick={onOpenSOSModal}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Broadcast New SOS
            </button>
          </div>
        </div>

        {/* 1. ACTIVE EMERGENCY SOS BROADCASTS CARDS */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600 animate-bounce" />
              <span>Active Hospital Emergency Requisitions ({alerts.length})</span>
            </h3>
            <span className="text-xs text-slate-500">Live geo-tagged radius: 15 km</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="bg-white rounded-3xl border-2 border-red-200/90 shadow-md hover:shadow-lg transition-all p-5 sm:p-6 relative overflow-hidden"
              >
                {/* Emergency Tag Ribbons */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-red-600 text-white font-black text-xs rounded-lg uppercase tracking-wider shadow-2xs">
                      {alert.bloodGroup} Needed
                    </span>
                    <span className="px-2.5 py-1 bg-red-50 text-red-700 font-bold text-xs rounded-lg">
                      {alert.unitsNeeded} {alert.unitsNeeded === 1 ? 'Unit' : 'Units'} ({alert.component})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      <Clock className="w-3.5 h-3.5" />
                      {alert.timeAgo}
                    </span>
                    {alert.isRequisitionVerified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                        <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                        Doctor Slip Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Patient & Hospital Info */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-base font-extrabold text-slate-900">
                    Patient: {alert.patientName} ({alert.patientAge}y)
                  </div>
                  <div className="flex items-start gap-1.5 text-xs text-slate-700 font-semibold">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{alert.hospitalName} • {alert.wardRoom}</span>
                  </div>
                  <div className="text-xs text-slate-500 pl-5">
                    {alert.locality}, {alert.city}
                  </div>
                </div>

                {/* Donors Responded Tracker */}
                <div className="bg-slate-50 rounded-2xl p-3 mb-4 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-700">Donors Responded:</span>
                    <span className="font-extrabold text-emerald-600">
                      {alert.acceptedDonors.length} Volunteers En Route
                    </span>
                  </div>
                  {alert.acceptedDonors.length > 0 ? (
                    <div className="space-y-1.5">
                      {alert.acceptedDonors.map((donor, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-200">
                          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                            {donor.donorName}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            ETA: ~{donor.etaMinutes} mins ({donor.status})
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic text-center py-1">
                      No donors en route yet. Be the first to respond!
                    </div>
                  )}
                </div>

                {/* I CAN HELP / I CAN'T HELP INTERACTION */}
                {selectedAlertForHelp === alert.id ? (
                  <div className="bg-red-50 rounded-2xl p-4 border border-red-200 animate-in fade-in duration-200">
                    <span className="text-xs font-extrabold text-red-900 block mb-2">
                      Confirm Your Emergency Arrival Time:
                    </span>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[15, 30, 45, 60].map((eta) => (
                        <button
                          key={eta}
                          onClick={() => setChosenEta(eta)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            chosenEta === eta 
                              ? 'bg-red-600 text-white shadow-xs' 
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {eta} Mins
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleHelpSubmit(alert.id)}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        Confirm & Notify Attendant
                      </button>
                      <button
                        onClick={() => setSelectedAlertForHelp(null)}
                        className="py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedAlertForHelp(alert.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>I CAN HELP (DONATE)</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        window.alert("Thank you for reviewing. We will continue alerting other available donors in this zone.");
                      }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span className="hidden sm:inline">Cannot Help</span>
                    </button>

                    <a
                      href={`tel:${alert.attendantContact.replace(/[^0-9]/g, '')}`}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                      title="Call Attendant"
                    >
                      <PhoneCall className="w-4 h-4 text-slate-700" />
                    </a>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* 2. INTERACTIVE DONOR ELIGIBILITY PRE-CHECK TOOL */}
        <div className="mb-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-9 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Medical Safety Protocol</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Instant Blood Donation Eligibility Pre-Check
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              Verify your physical eligibility before traveling to any blood bank or camp. Designed strictly according to National Blood Transfusion Council (NBTC) guidelines.
            </p>

            {/* Quick Interactive Sliders/Inputs */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 p-3.5 rounded-2xl backdrop-blur-xs border border-white/10">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Age: <strong className="text-white text-sm">{donorAge} years</strong>
                </label>
                <input
                  type="range"
                  min="16"
                  max="70"
                  value={donorAge}
                  onChange={(e) => setDonorAge(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Rule: 18 – 65 years</span>
              </div>

              <div className="bg-white/10 p-3.5 rounded-2xl backdrop-blur-xs border border-white/10">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Weight: <strong className="text-white text-sm">{donorWeight} kg</strong>
                </label>
                <input
                  type="range"
                  min="40"
                  max="110"
                  value={donorWeight}
                  onChange={(e) => setDonorWeight(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Rule: Min. 50 kg</span>
              </div>

              <div className="bg-white/10 p-3.5 rounded-2xl backdrop-blur-xs border border-white/10">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Hemoglobin: <strong className="text-white text-sm">{donorHb} g/dL</strong>
                </label>
                <input
                  type="range"
                  min="10"
                  max="17"
                  step="0.1"
                  value={donorHb}
                  onChange={(e) => setDonorHb(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Rule: Min. 12.5 g/dL</span>
              </div>

              <div className="bg-white/10 p-3.5 rounded-2xl backdrop-blur-xs border border-white/10">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Months Since Last Donation
                </label>
                <select
                  value={lastDonationMonths}
                  onChange={(e) => setLastDonationMonths(Number(e.target.value))}
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl px-2 py-1.5 text-xs font-bold"
                >
                  <option value={1}>1 Month Ago</option>
                  <option value={2}>2 Months Ago</option>
                  <option value={3}>3 Months Ago (90 days)</option>
                  <option value={4}>4+ Months Ago</option>
                  <option value={12}>First-time Donor</option>
                </select>
                <span className="text-[10px] text-slate-400">Rule: 90 days gap</span>
              </div>
            </div>

            {/* Checkbox for Tattoo/Piercing */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="tattoo-check"
                checked={hasTattooRecent}
                onChange={(e) => setHasTattooRecent(e.target.checked)}
                className="w-4 h-4 rounded-sm accent-red-600 cursor-pointer"
              />
              <label htmlFor="tattoo-check" className="text-xs text-slate-300 cursor-pointer">
                I have received a tattoo or major piercing within the past 6 months
              </label>
            </div>

            {/* Check Button & Outcome Banner */}
            <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={checkEligibility}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                Validate My Eligibility
              </button>

              {eligibilityResult && (
                <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                  eligibilityResult.startsWith('ELIGIBLE')
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  {eligibilityResult.startsWith('ELIGIBLE') ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{eligibilityResult}</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3. REGISTERED EMERGENCY DONOR DIRECTORY (WITH PRIVACY SHIELD) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Verified Voluntary Donors Network
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Privacy Protected (Locality Only)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Exact home addresses and complete phone numbers are never shared publicly.
              </p>
            </div>

            {/* Filter by blood group */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-[11px] font-bold text-slate-500">Filter:</span>
              {['All', 'O-', 'O+', 'B-', 'B+', 'Bombay (hh)'].map((bg) => (
                <button
                  key={bg}
                  onClick={() => setFilterGroup(bg)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    filterGroup === bg 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {donors
              .filter((d) => filterGroup === 'All' || d.bloodGroup === filterGroup)
              .map((donor) => (
                <div
                  key={donor.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-red-200 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-extrabold text-slate-900">
                            {donor.name}
                          </h4>
                          {donor.isVerified && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{donor.locality}, {donor.city}</span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 bg-red-600 text-white text-xs font-black rounded-lg shadow-2xs">
                        {donor.bloodGroup}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {donor.badges.map((b, idx) => (
                        <span key={idx} className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-600" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Lifetime Donated</span>
                      <strong className="text-slate-900 font-extrabold">{donor.totalDonations} Times</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Contact</span>
                      <span className="font-mono text-slate-600 font-bold">{donor.phoneMasked}</span>
                    </div>
                    <button
                      onClick={onOpenSOSModal}
                      className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                    >
                      Ping in SOS
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 4. DONOR REGISTRATION MODAL */}
        {isRegistering && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
              <button
                onClick={() => setIsRegistering(false)}
                className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Heart className="w-5 h-5 fill-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Register as Emergency Donor
                  </h3>
                  <p className="text-xs text-slate-500">Join our 6,200+ on-call volunteer lifesavers</p>
                </div>
              </div>

              {regSuccess ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Welcome to RaktSetu!</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Your donor profile is active. You will receive notifications only when emergency requests match your blood group and city.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterDonor} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={newDonorName}
                      onChange={(e) => setNewDonorName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Blood Group</label>
                      <select
                        value={newDonorGroup}
                        onChange={(e) => setNewDonorGroup(e.target.value as BloodGroup)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                      >
                        {BLOOD_GROUPS.map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City</label>
                      <select
                        value={newDonorCity}
                        onChange={(e) => setNewDonorCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                      >
                        {CITIES.filter(c => c !== 'All Cities').map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Locality / Area <span className="text-[10px] text-slate-400 font-normal">(Never exact address)</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newDonorLocality}
                      onChange={(e) => setNewDonorLocality(e.target.value)}
                      placeholder="e.g. Indiranagar / Saket / Dadar"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={newDonorPhone}
                      onChange={(e) => setNewDonorPhone(e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <p className="text-[10px] text-slate-500 leading-tight">
                    🔒 By registering, you agree to receive SMS/WhatsApp alerts for emergency blood requests in your locality. Your details remain confidential.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Complete Registration & Unlock Hero Badge
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
