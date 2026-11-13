import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { DoctorProfile } from '../types';

interface AskDoctorModalProps {
  isOpen: boolean;
  doctor: DoctorProfile | null;
  onClose: () => void;
}

export const AskDoctorModal: React.FC<AskDoctorModalProps> = ({
  isOpen,
  doctor,
  onClose,
}) => {
  if (!isOpen) return null;

  const [patientName, setPatientName] = useState('');
  const [topic, setTopic] = useState('Platelet Count Thresholds');
  const [question, setQuestion] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
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
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {doctor ? `Consult with ${doctor.name}` : 'Ask a Duty Transfusion Specialist'}
            </h3>
            <p className="text-xs text-slate-500">
              {doctor ? `${doctor.specialization} • ${doctor.hospital}` : 'Verified Medical Doctor Panel'}
            </p>
          </div>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-2">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Consultation Dispatched!</h4>
            <p className="text-xs text-slate-600">
              The on-duty specialist will review your question and respond in the clinical guidance feed shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Shalini Roy"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold"
              >
                <option value="Platelet Count Thresholds">Dengue & Platelet Transfusion (SDP)</option>
                <option value="Donor Eligibility & Deferral">Donor Eligibility / Medication Check</option>
                <option value="Cross-matching & Antibodies">Blood Group Cross-Match & Minor Antigens</option>
                <option value="Rare Blood Groups">Rare Blood Group (e.g. Bombay phenotype, Rh-null)</option>
                <option value="General Transfusion">General Transfusion Reaction Query</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Question</label>
              <textarea
                rows={4}
                required
                placeholder="Explain the clinical concern, patient condition, lab values, or donor query..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <p className="text-[10px] text-slate-400">
              🔒 Confidential clinical guidance. Does not substitute emergency triage or in-person surgical evaluation.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Doctor</span>
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

