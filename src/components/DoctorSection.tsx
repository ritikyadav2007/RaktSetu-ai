import React, { useState } from 'react';
import { 
  Stethoscope, 
  ShieldCheck, 
  MessageSquare, 
  CheckCircle2, 
  Send, 
  Clock, 
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import { DoctorProfile, DoctorConsultationQuestion } from '../types';
import { MOCK_DOCTOR_QUESTIONS } from '../data/mockData';

interface DoctorSectionProps {
  doctors: DoctorProfile[];
  onOpenAskDoctorModal: (doc?: DoctorProfile) => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({
  doctors,
  onOpenAskDoctorModal,
}) => {
  const [questionsList, setQuestionsList] = useState<DoctorConsultationQuestion[]>(MOCK_DOCTOR_QUESTIONS);
  const [userQuery, setUserQuery] = useState('');
  const [userName, setUserName] = useState('');
  const [userTopic, setUserTopic] = useState('');
  const [submittedAlert, setSubmittedAlert] = useState(false);

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery || !userName) return;

    const newQ: DoctorConsultationQuestion = {
      id: `q-${Date.now()}`,
      patientOrDonorName: userName,
      topic: userTopic || 'General Transfusion Query',
      question: userQuery,
      timestamp: 'Just now',
      doctorAnswer: {
        doctorName: 'Dr. Rajeshwari Iyer, MD',
        doctorReg: 'MCI-2011-88421',
        answer: 'Thank you for reaching out to RaktSetu Doctor Desk. Your query has been logged. In acute symptomatic cases, always consult emergency triage directly. A medical officer will review your specific details shortly.',
        timestamp: 'Verified automatically via Duty Officer Desk'
      }
    };

    setQuestionsList([newQ, ...questionsList]);
    setUserQuery('');
    setUserName('');
    setUserTopic('');
    setSubmittedAlert(true);
    setTimeout(() => setSubmittedAlert(false), 4000);
  };

  return (
    <section id="doctors" className="py-12 bg-white min-h-screen border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wide">
                Clinical Advisory
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Verified Transfusion Medicine Specialists
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Doctor Connect & Transfusion Guidance
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Have clinical doubts about platelet counts, hemoglobin levels, or cross-matching? Get guidance from verified specialists.
            </p>
          </div>

          <button
            onClick={() => onOpenAskDoctorModal()}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask a Doctor (Free)</span>
          </button>
        </div>

        {/* 1. Verified Doctor Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3.5 mb-3">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-100 shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-slate-900">
                        {doc.name}
                      </h3>
                      {doc.isVerified && (
                        <span title="State Medical Council Verified">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-bold text-emerald-700">{doc.qualification}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{doc.hospital}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-3 space-y-1">
                  <div className="text-xs font-bold text-slate-700">Specialization:</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{doc.specialization}</div>
                  <div className="text-[10px] font-mono text-slate-400 pt-1">
                    Reg: {doc.registrationNumber}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                  doc.availability === 'ONLINE'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${doc.availability === 'ONLINE' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  {doc.availability === 'ONLINE' ? 'Online Now' : 'On-Call Desk'}
                </span>

                <button
                  onClick={() => onOpenAskDoctorModal(doc)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Consult
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Ask a Doctor Quick Form & Answered Queries Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: Submit Question */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 rounded-3xl p-6 border border-emerald-200/80 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Submit Question to Duty Doctor
                </h3>
                <span className="text-[11px] text-slate-500">Average clinical response time: ~20 mins</span>
              </div>
            </div>

            {submittedAlert && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your query has been submitted to the duty transfusion specialist!</span>
              </div>
            )}

            <form onSubmit={handleSubmitQuestion} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name & City</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Ananya Roy (Mumbai)"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Clinical Topic</label>
                <input
                  type="text"
                  required
                  value={userTopic}
                  onChange={(e) => setUserTopic(e.target.value)}
                  placeholder="e.g. Platelet count & Dengue / Hemoglobin criteria"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Question / Concern</label>
                <textarea
                  rows={4}
                  required
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="Describe the medical situation, patient age, platelet count or donor eligibility question..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <p className="text-[10px] text-slate-400">
                ⚠️ Information provided is for medical education and guidance only and does not replace emergency clinical evaluation.
              </p>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Query to Doctor Panel</span>
              </button>
            </form>
          </div>

          {/* Right Column: Verified Medical Answers Archive */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Recent Answered Questions by Specialists</span>
            </h3>

            <div className="space-y-4">
              {questionsList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-emerald-200 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {item.topic}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                        "{item.question}"
                      </h4>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        Asked by {item.patientOrDonorName} • {item.timestamp}
                      </span>
                    </div>
                  </div>

                  {item.doctorAnswer && (
                    <div className="bg-slate-50 rounded-xl p-3 border-l-4 border-emerald-500 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{item.doctorAnswer.doctorName}</span>
                        <span className="text-[10px] font-normal text-slate-500 font-mono">({item.doctorAnswer.doctorReg})</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {item.doctorAnswer.answer}
                      </p>
                      <span className="text-[10px] text-slate-400 block pt-1">
                        Answered: {item.doctorAnswer.timestamp}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
