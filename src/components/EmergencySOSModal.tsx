import React, { useState } from 'react';
import { 
  X, 
  AlertTriangle, 
  Droplet, 
  MapPin, 
  Phone, 
  Upload, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  FileCheck2,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BloodGroup, UrgencyLevel, EmergencyDonorAlert } from '../types';
import { BLOOD_GROUPS, BLOOD_COMPONENTS, CITIES } from '../data/mockData';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBroadcastSOS: (newAlert: EmergencyDonorAlert) => void;
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  onBroadcastSOS,
}) => {
  if (!isOpen) return null;

  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState(30);
  const [hospitalName, setHospitalName] = useState('');
  const [wardRoom, setWardRoom] = useState('');
  const [city, setCity] = useState('Delhi-NCR');
  const [locality, setLocality] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [component, setComponent] = useState('PRBC (Red Cells)');
  const [unitsNeeded, setUnitsNeeded] = useState(2);
  const [urgency, setUrgency] = useState<UrgencyLevel>('CRITICAL');
  const [attendantContact, setAttendantContact] = useState('');
  const [hasRequisitionSlip, setHasRequisitionSlip] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !hospitalName || !attendantContact) return;

    const newAlert: EmergencyDonorAlert = {
      id: `sos-${Date.now()}`,
      patientName,
      patientAge,
      hospitalName,
      wardRoom: wardRoom || 'Emergency ICU',
      city,
      locality: locality || 'Near Hospital Complex',
      bloodGroup,
      component,
      unitsNeeded,
      urgency,
      attendantContact,
      isRequisitionVerified: hasRequisitionSlip,
      timeAgo: 'Just now',
      status: 'ACTIVE',
      acceptedDonors: []
    };

    onBroadcastSOS(newAlert);
    setIsSuccess(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-red-200 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-500/30 animate-pulse">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-md">
                High Priority Broadcast
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Trigger Emergency Blood SOS
            </h3>
            <p className="text-xs text-slate-500">
              Instantly broadcast alerts to eligible registered donors and nearby blood banks within 15 km
            </p>
          </div>
        </div>

        {isSuccess ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Emergency SOS Broadcasted!</h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              We have dispatched emergency push & SMS alerts to <strong>18 registered {bloodGroup} donors</strong> within 10 km of {hospitalName}. Stay tuned by your phone ({attendantContact}).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Urgency Level Buttons */}
            <div className="bg-red-50/70 p-3 rounded-2xl border border-red-200">
              <label className="block text-xs font-black text-red-900 uppercase tracking-wider mb-2">
                Emergency Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUrgency('CRITICAL')}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    urgency === 'CRITICAL'
                      ? 'bg-red-600 text-white shadow-xs scale-102'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Critical (&lt;2h)
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('URGENT')}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    urgency === 'URGENT'
                      ? 'bg-amber-500 text-white shadow-xs scale-102'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Urgent (&lt;6h)
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('ROUTINE')}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    urgency === 'ROUTINE'
                      ? 'bg-slate-800 text-white shadow-xs scale-102'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  Today (Scheduled)
                </button>
              </div>
            </div>

            {/* Blood Group & Units Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Blood Group Required
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-black text-red-700 focus:ring-2 focus:ring-red-500"
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Component
                </label>
                <select
                  value={component}
                  onChange={(e) => setComponent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                >
                  {BLOOD_COMPONENTS.filter(c => c !== 'All Components').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Units Needed
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={unitsNeeded}
                  onChange={(e) => setUnitsNeeded(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Patient & Hospital Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Patient Age
                </label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  value={patientAge}
                  onChange={(e) => setPatientAge(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Hospital & Ward Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Hospital Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AIIMS Trauma Centre"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Ward & Bed / Room
                </label>
                <input
                  type="text"
                  placeholder="e.g. ICU-3 Bed 12"
                  value={wardRoom}
                  onChange={(e) => setWardRoom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* City & Contact Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  City
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                >
                  {CITIES.filter(c => c !== 'All Cities').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Attendant Phone (For Donors to Call)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={attendantContact}
                  onChange={(e) => setAttendantContact(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Requisition Verification Check */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600 shrink-0" />
                <span className="text-xs text-slate-700 font-semibold">
                  I have an official doctor's blood requisition / prescription slip
                </span>
              </div>
              <input
                type="checkbox"
                checked={hasRequisitionSlip}
                onChange={(e) => setHasRequisitionSlip(e.target.checked)}
                className="w-5 h-5 accent-red-600 cursor-pointer"
              />
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              ⚠️ Strict anti-hoarding policy: Emergency alerts are verified by medical desk. False alarms will lead to permanent blacklisting from the emergency grid.
            </p>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-sm rounded-xl shadow-lg shadow-red-600/30 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4 animate-bounce" />
              <span>CONFIRM & BROADCAST EMERGENCY SOS NOW</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

