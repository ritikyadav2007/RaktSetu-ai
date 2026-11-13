import React from 'react';
import { AlertCircle, Clock, MapPin, Sparkles } from 'lucide-react';

export const InformationTicker: React.FC = () => {
  const announcements = [
    {
      type: 'URGENT',
      text: 'O- Negative required urgently at Safdarjung Trauma ICU, Bed 14, New Delhi',
      tag: 'Critical SOS'
    },
    {
      type: 'INFO',
      text: 'AIIMS Main Blood Bank reported verified stock update 18 mins ago (62 units PRBC available)',
      tag: 'Stock Update'
    },
    {
      type: 'URGENT',
      text: 'B- Negative Single Donor Platelets (SDP) needed at Tata Memorial Hospital Mumbai',
      tag: 'Platelet Alert'
    },
    {
      type: 'CAMP',
      text: 'Upcoming Blood Donation Drive: Central Park Connaught Place, this Sunday 9 AM - 5 PM',
      tag: 'Donation Camp'
    },
    {
      type: 'TIP',
      text: 'Did you know? A single whole blood donation is split into PRBC, Platelets & Plasma, saving up to 3 lives.',
      tag: 'Health Fact'
    }
  ];

  return (
    <div className="bg-slate-900 text-white overflow-hidden border-b border-slate-800 text-xs py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        {/* Fixed Label Badge */}
        <div className="flex items-center gap-1.5 bg-red-600 text-white font-extrabold uppercase px-2.5 py-0.5 rounded-md text-[10px] tracking-wider shrink-0 mr-4 z-10 shadow-xs">
          <AlertCircle className="w-3.5 h-3.5 animate-pulse" />
          <span>Live Ticker</span>
        </div>

        {/* Ticker Track */}
        <div className="overflow-hidden relative w-full">
          <div className="animate-ticker flex items-center gap-12 whitespace-nowrap">
            {/* Duplicated for seamless infinite loop */}
            {[...announcements, ...announcements].map((item, index) => (
              <div key={index} className="inline-flex items-center gap-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide ${
                  item.type === 'URGENT' 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                    : item.type === 'CAMP'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}>
                  {item.tag}
                </span>
                <span className="text-slate-200 text-xs font-medium">
                  {item.text}
                </span>
                <span className="text-slate-600 mx-2">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

