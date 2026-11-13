import React, { useState } from 'react';
import { 
  X, 
  Flag, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Send 
} from 'lucide-react';
import { BloodCentre } from '../types';

interface ReportInfoModalProps {
  isOpen: boolean;
  centre: BloodCentre | null;
  onClose: () => void;
}

export const ReportInfoModal: React.FC<ReportInfoModalProps> = ({
  isOpen,
  centre,
  onClose,
}) => {
  if (!isOpen || !centre) return null;

  const [issueType, setIssueType] = useState('STOCK_DISCREPANCY');
  const [description, setDescription] = useState('');
  const [reportedPhone, setReportedPhone] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Report Incorrect Information
            </h3>
            <p className="text-xs text-slate-500">
              {centre.name}
            </p>
          </div>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Report Submitted!</h4>
            <p className="text-xs text-slate-600">
              Our data verification desk has flagged this blood centre. A verification call is being initiated to reconcile actual stock counts.
            </p>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Issue Observed</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
              >
                <option value="STOCK_DISCREPANCY">Reported stock unavailable at centre</option>
                <option value="PHONE_UNREACHABLE">Phone number switched off or wrong</option>
                <option value="TIMING_INCORRECT">Operating hours incorrect</option>
                <option value="LOCATION_WRONG">Address / Navigation pin mismatch</option>
                <option value="OTHER">Other issue</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Details of Experience</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Called emergency desk, staff mentioned 0 units of O- currently available..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Contact Phone (Optional)</label>
              <input
                type="tel"
                placeholder="To verify your feedback if needed"
                value={reportedPhone}
                onChange={(e) => setReportedPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <p className="text-[10px] text-slate-400">
              Your feedback protects patients and ensures transparency across the National Blood Network.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Submit Discrepancy Ticket
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

