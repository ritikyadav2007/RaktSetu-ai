import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Building2, 
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BloodCentre, BloodGroup } from '../types';

interface ReserveStockModalProps {
  isOpen: boolean;
  centre: BloodCentre | null;
  bloodGroup: BloodGroup;
  onClose: () => void;
}

export const ReserveStockModal: React.FC<ReserveStockModalProps> = ({
  isOpen,
  centre,
  bloodGroup,
  onClose,
}) => {
  if (!isOpen || !centre) return null;

  const [patientName, setPatientName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [unitsToHold, setUnitsToHold] = useState(1);
  const [attendantPhone, setAttendantPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <Bookmark className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Reserve Blood Unit (2-Hour Temporary Hold)
            </h3>
            <p className="text-xs text-slate-500">
              {centre.name} • {centre.city}
            </p>
          </div>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Hold Request Registered!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              <strong>{unitsToHold} unit(s) of {bloodGroup}</strong> have been marked on temporary hold for 2 hours. Please arrive with the doctor's requisition slip and patient cross-matching sample.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReserve} className="space-y-3.5">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block">Requested Blood Group</span>
                <strong className="text-base font-black text-red-700">{bloodGroup}</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Centre Emergency Hotline</span>
                <a href={`tel:${centre.emergencyPhone.replace(/[^0-9]/g, '')}`} className="font-bold text-slate-800 underline">
                  {centre.emergencyPhone}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Rao"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Units to Hold</label>
                <input
                  type="number"
                  min="1"
                  max="4"
                  value={unitsToHold}
                  onChange={(e) => setUnitsToHold(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Admitted Hospital</label>
              <input
                type="text"
                required
                placeholder="e.g. Apollo Hospital / Max Healthcare"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Attendant Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98XXX XXXXX"
                value={attendantPhone}
                onChange={(e) => setAttendantPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Holds expire automatically after 120 minutes if the patient attendant does not arrive with requisition documents, releasing stock for other emergency trauma cases.
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Confirm 2-Hour Reservation
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
