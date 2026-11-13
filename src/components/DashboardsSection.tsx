import React, { useState } from 'react';
import { 
  Building2, 
  Stethoscope, 
  ShieldCheck, 
  LayoutDashboard, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Save, 
  Lock, 
  Key, 
  Activity, 
  Users, 
  FileCheck2, 
  Flag,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BloodCentre, BloodGroup } from '../types';
import { BLOOD_GROUPS } from '../data/mockData';

interface DashboardsSectionProps {
  centres: BloodCentre[];
  onUpdateCentreStock: (centreId: string, updatedStock: any) => void;
}

export const DashboardsSection: React.FC<DashboardsSectionProps> = ({
  centres,
  onUpdateCentreStock,
}) => {
  const [selectedRole, setSelectedRole] = useState<'centre' | 'hospital' | 'doctor' | 'admin'>('centre');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default demo authenticated for review
  
  // Blood Centre Dashboard State
  const [selectedCentreId, setSelectedCentreId] = useState<string>(centres[0]?.id || 'bc-1');
  const [editingGroup, setEditingGroup] = useState<BloodGroup>('O+');
  const activeCentre = centres.find(c => c.id === selectedCentreId) || centres[0];
  const [stockPrbc, setStockPrbc] = useState(activeCentre.stock[editingGroup]?.prbc || 60);
  const [stockPlatelets, setStockPlatelets] = useState(activeCentre.stock[editingGroup]?.platelets || 20);
  const [stockPlasma, setStockPlasma] = useState(activeCentre.stock[editingGroup]?.plasma || 30);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin Dashboard State
  const [reportedTickets, setReportedTickets] = useState([
    { id: 'rep-1', centreName: 'District Civil Hospital Regional Blood Bank', issue: 'Phone line engaged, reported units 0 in reality', status: 'INVESTIGATING', time: '40m ago' },
    { id: 'rep-2', centreName: 'Apollo Hospital Central Blood Bank', issue: 'Stock outdated by 3 hours, please re-sync', status: 'RESOLVED', time: '2h ago' }
  ]);

  const handleStockSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStock = {
      ...activeCentre.stock,
      [editingGroup]: {
        ...activeCentre.stock[editingGroup],
        prbc: stockPrbc,
        platelets: stockPlatelets,
        plasma: stockPlasma
      }
    };
    onUpdateCentreStock(activeCentre.id, updatedStock);
    setSaveSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResolveTicket = (ticketId: string) => {
    setReportedTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED' } : t));
  };

  return (
    <section id="dashboards" className="py-12 bg-slate-50 min-h-screen border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wide">
                Role-Based Portals
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Authorized Healthcare Operations
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Healthcare Operations Dashboards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Switch roles below to test blood bank inventory management, hospital requisitions, and administrative oversight.
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setSelectedRole('centre')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'centre' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Blood Centre Portal
            </button>
            <button
              onClick={() => setSelectedRole('hospital')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'hospital' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Hospital Dashboard
            </button>
            <button
              onClick={() => setSelectedRole('doctor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'doctor' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Doctor Desk
            </button>
            <button
              onClick={() => setSelectedRole('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'admin' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Admin & Trust Desk
            </button>
          </div>
        </div>

        {/* 1. BLOOD CENTRE DASHBOARD */}
        {selectedRole === 'centre' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {activeCentre.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Lic: {activeCentre.licenseNumber} • Last Sync: {activeCentre.lastUpdatedMinutesAgo} mins ago
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Select Centre:</span>
                <select
                  value={selectedCentreId}
                  onChange={(e) => setSelectedCentreId(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700"
                >
                  {centres.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Stock Counter Adjuster */}
            <form onSubmit={handleStockSave} className="space-y-6">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      Update Live Stock Count
                    </h4>
                    <p className="text-xs text-slate-500">
                      Changes immediately broadcast to seekers and reset freshness timestamp to "0 mins ago".
                    </p>
                  </div>

                  {/* Pick Blood Group to Edit */}
                  <div className="flex flex-wrap items-center gap-1">
                    {BLOOD_GROUPS.map(bg => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => {
                          setEditingGroup(bg);
                          setStockPrbc(activeCentre.stock[bg]?.prbc || 0);
                          setStockPlatelets(activeCentre.stock[bg]?.platelets || 0);
                          setStockPlasma(activeCentre.stock[bg]?.plasma || 0);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                          editingGroup === bg ? 'bg-red-600 text-white' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      {editingGroup} PRBC (Packed Red Cells)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="200"
                        value={stockPrbc}
                        onChange={(e) => setStockPrbc(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-lg font-black text-red-700"
                      />
                      <span className="text-xs font-bold text-slate-400">Units</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      {editingGroup} Platelets (SDP/RDP)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="200"
                        value={stockPlatelets}
                        onChange={(e) => setStockPlatelets(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-lg font-black text-amber-700"
                      />
                      <span className="text-xs font-bold text-slate-400">Units</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      {editingGroup} Fresh Frozen Plasma
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="200"
                        value={stockPlasma}
                        onChange={(e) => setStockPlasma(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-lg font-black text-blue-700"
                      />
                      <span className="text-xs font-bold text-slate-400">Units</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    Authorized Staff: <strong>Duty Lab Technician / Transfusion Officer</strong>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Verified Stock Update</span>
                  </button>
                </div>

                {saveSuccess && (
                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Stock counts updated successfully! Freshness badge reset to "Verified Fresh (0 mins ago)".</span>
                  </div>
                )}
              </div>
            </form>

            {/* Pending Hold Requests Queue */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-3">
                Incoming Patient Hold & Reservation Requests (2-Hour Window)
              </h4>
              <div className="space-y-2 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-800">Patient: Aarav Sharma (O- PRBC • 2 Units)</strong>
                    <div className="text-[11px] text-slate-500">From Safdarjung Emergency • Requisition Uploaded • Expires in 1h 14m</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer">
                      Approve Hold
                    </button>
                    <button className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg cursor-pointer">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. HOSPITAL DASHBOARD */}
        {selectedRole === 'hospital' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  AIIMS Trauma Centre Requisitions Board
                </h3>
                <p className="text-xs text-slate-500">ICU, OT & Emergency Blood Coordination</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold">Active Patient Requisitions</span>
                <div className="text-2xl font-black text-slate-900 mt-1">4 Patients</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold">Arriving Voluntary Donors</span>
                <div className="text-2xl font-black text-emerald-600 mt-1">3 En Route</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-500 font-bold">Inter-Bank Units in Transit</span>
                <div className="text-2xl font-black text-blue-600 mt-1">6 Units Cold-Chain</div>
              </div>
            </div>
          </div>
        )}

        {/* 3. DOCTOR DASHBOARD */}
        {selectedRole === 'doctor' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Doctor Clinical Guidance Portal
                </h3>
                <p className="text-xs text-slate-500">Transfusion Medicine Officer on Duty</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900">Pending Patient & Donor Inquiries</h4>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-800">
                  Topic: Patient on Aspirin wanting to donate blood in emergency
                </div>
                <p className="text-slate-600">
                  "My father takes low-dose aspirin 75mg daily. Can he donate whole blood or platelets for his friend?"
                </p>
                <div className="pt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type clinical advice..."
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs"
                  />
                  <button className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer">
                    Answer Query
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ADMIN DASHBOARD */}
        {selectedRole === 'admin' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    RaktSetu Trust & Verification Admin
                  </h3>
                  <p className="text-xs text-slate-500">System Monitoring & Discrepancy Resolution</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  ● 99.4% Stock Reliability Index
                </span>
              </div>
            </div>

            {/* Reported Incorrect Information Queue */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-rose-600" />
                <span>Reported Incorrect Information Tickets ({reportedTickets.length})</span>
              </h4>

              <div className="space-y-3">
                {reportedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-900">{ticket.centreName}</strong>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                          ticket.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1">Issue: {ticket.issue}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">{ticket.time}</span>
                    </div>

                    {ticket.status !== 'RESOLVED' && (
                      <button
                        onClick={() => handleResolveTicket(ticket.id)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shrink-0"
                      >
                        Verify & Resolve Ticket
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

