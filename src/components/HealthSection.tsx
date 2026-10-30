import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Droplet, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { BloodGroup } from '../types';
import { BLOOD_GROUPS, BLOOD_COMPATIBILITY } from '../data/mockData';

export const HealthSection: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O+');
  const [searchQuery, setSearchQuery] = useState('');

  const compatibility = BLOOD_COMPATIBILITY[selectedGroup];

  const healthArticles = [
    {
      id: 'h-1',
      title: 'Platelet Transfusion in Dengue: When Is It Truly Necessary?',
      category: 'Dengue & Platelets',
      readTime: '3 min read',
      snippet: 'Medical guidelines emphasize that platelet transfusion is NOT required for every low platelet count. In asymptomatic patients without bleeding, counts as low as 10,000 to 20,000 can often be closely monitored under medical supervision.',
      tags: ['Dengue', 'SDP Platelets', 'Platelet Count']
    },
    {
      id: 'h-2',
      title: 'Understanding PRBC vs Whole Blood: Why Modern Medicine Separates Blood',
      category: 'Transfusion Science',
      readTime: '4 min read',
      snippet: 'Transfusing whole blood can cause circulatory overload in heart patients. By fractionating blood into Packed Red Blood Cells (PRBC), Platelets, and Plasma, one single voluntary donation treats three different patients safely.',
      tags: ['PRBC', 'Component Therapy', 'Blood Science']
    },
    {
      id: 'h-3',
      title: 'The Rare Bombay Phenotype (Oh): What You Need to Know',
      category: 'Rare Blood Groups',
      readTime: '5 min read',
      snippet: 'Discovered in Mumbai in 1952, individuals with the Bombay phenotype lack the H antigen. While their blood appears to be O, they develop strong antibodies against all ABO types and can strictly receive blood only from another Bombay phenotype donor.',
      tags: ['Bombay Blood', 'Rare Phenotype', 'Genetics']
    },
    {
      id: 'h-4',
      title: 'Pre & Post Donation Nutrition: How to Boost Hemoglobin Naturally',
      category: 'Donor Health',
      readTime: '3 min read',
      snippet: 'Eating iron-rich foods (spinach, jaggery, beetroot, pomegranates, lentils) coupled with Vitamin C enhances iron absorption. Donors should hydrate with 500ml water prior to donation and avoid strenuous exercise for 12 hours.',
      tags: ['Nutrition', 'Hemoglobin', 'Post-Donation']
    }
  ];

  const filteredArticles = healthArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="health" className="py-12 bg-slate-50 min-h-screen border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wide">
              Clinical Knowledge Base
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Medical Awareness & Transfusion Guidelines
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Health Guidance & Compatibility Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Explore interactive blood compatibility, clear clinical guidance, and component explanations verified by transfusion medicine experts.
          </p>
        </div>

        {/* 1. INTERACTIVE BLOOD COMPATIBILITY MATRIX TOOL */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                Interactive Transfusion Tool
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                Red Cell ABO & Rh Compatibility Calculator
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your blood group to see immediate compatible donors and recipients.
              </p>
            </div>

            {/* Selector Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {BLOOD_GROUPS.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedGroup === bg
                      ? 'bg-red-600 text-white shadow-md scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Visualization Results */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Can Receive From */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{selectedGroup} Can Safely Receive Blood From:</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-700">
                  {compatibility.canReceiveFrom.length} Groups
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {compatibility.canReceiveFrom.map((donorGroup) => (
                  <span
                    key={donorGroup}
                    className="px-3.5 py-1.5 bg-white text-emerald-800 border-2 border-emerald-300 font-extrabold text-sm rounded-xl shadow-2xs"
                  >
                    {donorGroup}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-emerald-700 mt-3 leading-relaxed">
                {selectedGroup === 'AB+' ? (
                  <strong>Universal Recipient:</strong>
                ) : null}{' '}
                Patients with {selectedGroup} have specific antibodies in plasma. Receiving mismatched blood triggers acute hemolytic reactions.
              </p>
            </div>

            {/* Can Donate To */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-rose-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-rose-600 fill-rose-600" />
                  <span>{selectedGroup} Can Safely Donate Blood To:</span>
                </span>
                <span className="text-[11px] font-bold text-rose-700">
                  {compatibility.canDonateTo.length} Groups
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {compatibility.canDonateTo.map((recipientGroup) => (
                  <span
                    key={recipientGroup}
                    className="px-3.5 py-1.5 bg-white text-rose-800 border-2 border-rose-300 font-extrabold text-sm rounded-xl shadow-2xs"
                  >
                    {recipientGroup}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-rose-700 mt-3 leading-relaxed">
                {selectedGroup === 'O-' ? (
                  <strong>Universal Red Cell Donor:</strong>
                ) : null}{' '}
                Your red cells lack A and B antigens, making them crucial for emergency trauma units before cross-matching.
              </p>
            </div>

          </div>
        </div>

        {/* 2. COMPONENT DECODER GUIDE */}
        <div className="mb-12">
          <h3 className="text-lg font-extrabold text-slate-900 mb-4">
            Component Guide: What Doctor Prescriptions Mean
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-700 font-bold text-xs inline-block mb-2">
                PRBC
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">Packed Red Blood Cells</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Concentrated oxygen-carrying red cells with plasma removed. Used for severe anemia, surgery blood loss, and trauma. Shelf life: 35–42 days at 2–6°C.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-xs inline-block mb-2">
                Platelets (SDP/RDP)
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">Single & Random Donor Platelets</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Essential for blood clotting. Vital for dengue fever with hemorrhagic signs, cancer chemo, and leukemia. Shelf life: 5 days with gentle agitation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold text-xs inline-block mb-2">
                FFP
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">Fresh Frozen Plasma</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Liquid portion of blood containing all coagulation factors. Used in massive hemorrhages, liver disease, and clotting factor deficiencies. Stored at -30°C.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200">
              <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-700 font-bold text-xs inline-block mb-2">
                Cryoprecipitate
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">Cryo Coagulation Factors</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Rich in Factor VIII, von Willebrand factor, and Fibrinogen. Indicated in hemophilia, hypofibrinogenemia, and massive obstetric hemorrhage.
              </p>
            </div>
          </div>
        </div>

        {/* 3. HEALTH SEARCH & ARTICLES */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="text-lg font-extrabold text-slate-900">
              Health Awareness & Clinical Explanations
            </h3>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search articles (e.g. dengue, iron, bombay)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-red-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-red-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-md">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{article.readTime}</span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900 mb-2">
                    {article.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {article.snippet}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-1">
                    {article.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
