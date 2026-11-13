import React, { useState } from 'react';
import { 
  UserCircle, 
  Heart, 
  Award, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Bell, 
  Lock, 
  CheckCircle2, 
  Calendar, 
  Droplet,
  Smartphone
} from 'lucide-react';

export const ProfileSection: React.FC = () => {
  const [receiveEmergencySms, setReceiveEmergencySms] = useState(true);
  const [maskLocality, setMaskLocality] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const donorInfo = {
    name: 'Vikram Mehta',
    bloodGroup: 'O-',
    donorId: 'RS-DEL-884210',
    city: 'Delhi-NCR',
    locality: 'Lajpat Nagar',
    donationsCount: 14,
    livesSavedEstimate: 42,
    lastDonationDate: '10 May 2026',
    nextEligibleDate: 'Eligible to Donate Life Now',
    badges: ['Century Hero (10+)', 'Rare Blood Champion', 'Verified Emergency Responder']
  };

  const handleDownloadPass = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="profile" className="py-12 bg-slate-50 min-h-screen border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide">
              Donor Pass & Privacy
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Digital Identity & Lifesaver Milestones
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            My Digital Donor Pass
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Show this digital identity at participating blood centres to expedite registration and donor health screening.
          </p>
        </div>

        {/* DIGITAL DONOR CARD */}
        <div className="relative bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-8 overflow-hidden">
          {/* Subtle Watermark Drop */}
          <Droplet className="w-80 h-80 text-white/5 absolute -right-16 -bottom-16 pointer-events-none fill-white" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full border border-white/20">
                  National Digital Blood Pass
                </span>
                <span className="text-[11px] font-mono opacity-80">ID: {donorInfo.donorId}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                {donorInfo.name}
              </h3>

              <p className="text-xs text-red-100 font-medium mt-1">
                {donorInfo.locality}, {donorInfo.city}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {donorInfo.badges.map((b, idx) => (
                  <span key={idx} className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-300" />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Giant Blood Group Stamp */}
            <div className="flex flex-col items-center sm:items-end shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-white text-red-700 flex flex-col items-center justify-center shadow-lg border-2 border-red-100">
                <span className="text-3xl sm:text-4xl font-black">{donorInfo.bloodGroup}</span>
                <span className="text-[9px] font-extrabold uppercase text-slate-500">Universal Donor</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="relative z-10 mt-6 pt-6 border-t border-white/20 grid grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-[11px] text-red-100 block">Total Donations</span>
              <strong className="text-xl sm:text-2xl font-black text-white">{donorInfo.donationsCount}</strong>
            </div>
            <div>
              <span className="text-[11px] text-red-100 block">Estimated Lives Saved</span>
              <strong className="text-xl sm:text-2xl font-black text-white">{donorInfo.livesSavedEstimate}+</strong>
            </div>
            <div>
              <span className="text-[11px] text-red-100 block">Current Status</span>
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[11px] font-black uppercase">
                Active Ready
              </span>
            </div>
          </div>
        </div>

        {/* Action & Privacy Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card Download & QR Verification */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <QrCode className="w-5 h-5 text-red-600" />
                <h4 className="text-base font-extrabold text-slate-900">
                  Instant QR Verification
                </h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Blood banks scan this encrypted token to load your past transfusion records, hemoglobin history, and deferral status instantly.
              </p>

              {/* QR Code Container Mock */}
              <div className="w-36 h-36 mx-auto bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center p-3 mb-4 shadow-inner">
                <div className="w-full h-full border-4 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 font-mono text-[10px] text-center">
                  [RS-VERIFIED-QR]
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadPass}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'Downloaded to Device!' : 'Save Digital Pass to Phone'}</span>
            </button>
          </div>

          {/* Privacy & Alert Preferences */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-600" />
              <h4 className="text-base font-extrabold text-slate-900">
                Privacy & SOS Broadcast Settings
              </h4>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <strong className="text-slate-800 block">Strict Locality Privacy</strong>
                  <span className="text-slate-500 text-[11px]">Hide exact home address. Only show locality (e.g. Lajpat Nagar)</span>
                </div>
                <input
                  type="checkbox"
                  checked={maskLocality}
                  onChange={(e) => setMaskLocality(e.target.checked)}
                  className="w-5 h-5 accent-red-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <strong className="text-slate-800 block">Urgent SMS & WhatsApp Alerts</strong>
                  <span className="text-slate-500 text-[11px]">Only receive alerts matching O- within 15 km of your city</span>
                </div>
                <input
                  type="checkbox"
                  checked={receiveEmergencySms}
                  onChange={(e) => setReceiveEmergencySms(e.target.checked)}
                  className="w-5 h-5 accent-red-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                RaktSetu enforces strict HIPAA & Digital Personal Data Protection (DPDP) compliance. Your healthcare data is never sold or shared with commercial entities.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

