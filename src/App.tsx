import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InformationTicker } from './components/InformationTicker';
import { HeroSection } from './components/HeroSection';
import { BloodSearchSection } from './components/BloodSearchSection';
import { DonorNetworkSection } from './components/DonorNetworkSection';
import { HospitalSection } from './components/HospitalSection';
import { DoctorSection } from './components/DoctorSection';
import { HealthSection } from './components/HealthSection';
import { CommunitySection } from './components/CommunitySection';
import { DashboardsSection } from './components/DashboardsSection';
import { ProfileSection } from './components/ProfileSection';
import { Footer } from './components/Footer';

// Modals
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { ReserveStockModal } from './components/ReserveStockModal';
import { ReportInfoModal } from './components/ReportInfoModal';
import { AskDoctorModal } from './components/AskDoctorModal';

// Mock Data
import { 
  MOCK_BLOOD_CENTRES, 
  MOCK_EMERGENCY_ALERTS, 
  MOCK_DONORS, 
  MOCK_HOSPITALS, 
  MOCK_DOCTORS 
} from './data/mockData';
import { 
  BloodGroup, 
  BloodComponent, 
  UrgencyLevel, 
  BloodCentre, 
  EmergencyDonorAlert, 
  DoctorProfile 
} from './types';

export function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('blood');

  // Search Filter State
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup | 'All'>('O+');
  const [selectedComponent, setSelectedComponent] = useState<BloodComponent>('PRBC (Red Cells)');
  const [selectedCity, setSelectedCity] = useState<string>('Delhi-NCR');
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevel>('CRITICAL');

  // Live Data State
  const [centres, setCentres] = useState<BloodCentre[]>(MOCK_BLOOD_CENTRES);
  const [alerts, setAlerts] = useState<EmergencyDonorAlert[]>(MOCK_EMERGENCY_ALERTS);
  const [donors, setDonors] = useState(MOCK_DONORS);
  const [hospitals, setHospitals] = useState(MOCK_HOSPITALS);
  const [doctors, setDoctors] = useState(MOCK_DOCTORS);

  // Modals State
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [reserveTargetCentre, setReserveTargetCentre] = useState<BloodCentre | null>(null);
  const [reserveTargetGroup, setReserveTargetGroup] = useState<BloodGroup>('O+');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTargetCentre, setReportTargetCentre] = useState<BloodCentre | null>(null);
  const [askDoctorModalOpen, setAskDoctorModalOpen] = useState(false);
  const [selectedDoctorForConsult, setSelectedDoctorForConsult] = useState<DoctorProfile | null>(null);

  // Handlers
  const handleSearchTrigger = () => {
    setActiveTab('blood');
    const el = document.getElementById('blood-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenReserve = (centre: BloodCentre, group: BloodGroup) => {
    setReserveTargetCentre(centre);
    setReserveTargetGroup(group);
    setReserveModalOpen(true);
  };

  const handleOpenReport = (centre: BloodCentre) => {
    setReportTargetCentre(centre);
    setReportModalOpen(true);
  };

  const handleOpenAskDoctor = (doc?: DoctorProfile) => {
    setSelectedDoctorForConsult(doc || null);
    setAskDoctorModalOpen(true);
  };

  const handleBroadcastSOS = (newAlert: EmergencyDonorAlert) => {
    setAlerts([newAlert, ...alerts]);
  };

  const handleDonorRespond = (alertId: string, etaMinutes: number) => {
    setAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          acceptedDonors: [
            ...a.acceptedDonors,
            {
              donorId: 'current-user',
              donorName: 'You (Verified Lifesaver)',
              etaMinutes,
              status: 'EN_ROUTE'
            }
          ]
        };
      }
      return a;
    }));
  };

  const handleUpdateCentreStock = (centreId: string, updatedStock: any) => {
    setCentres(prev => prev.map(c => {
      if (c.id === centreId) {
        return {
          ...c,
          stock: updatedStock,
          lastUpdatedMinutesAgo: 0 // Reset freshness timestamp!
        };
      }
      return c;
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* 1. Header Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenSOSModal={() => setSosModalOpen(true)} 
      />

      {/* 2. Running Information Ticker */}
      <InformationTicker />

      {/* Main Content Sections Based on Active Tab */}
      <main className="flex-1">
        {/* If on 'blood' tab or initial load, show Hero and full homepage experience */}
        {activeTab === 'blood' && (
          <>
            <HeroSection
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              selectedComponent={selectedComponent}
              setSelectedComponent={setSelectedComponent}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedUrgency={selectedUrgency}
              setSelectedUrgency={setSelectedUrgency}
              onSearch={handleSearchTrigger}
              onOpenSOSModal={() => setSosModalOpen(true)}
            />

            <BloodSearchSection
              centres={centres}
              selectedGroup={selectedGroup}
              selectedComponent={selectedComponent}
              selectedCity={selectedCity}
              onOpenReserveModal={handleOpenReserve}
              onOpenReportModal={handleOpenReport}
            />
          </>
        )}

        {/* 3. Donor Section */}
        {activeTab === 'donor' && (
          <DonorNetworkSection
            alerts={alerts}
            donors={donors}
            onOpenSOSModal={() => setSosModalOpen(true)}
            onDonorRespond={handleDonorRespond}
          />
        )}

        {/* 4. Hospital Section */}
        {activeTab === 'hospital' && (
          <HospitalSection
            hospitals={hospitals}
            onOpenSOSModal={() => setSosModalOpen(true)}
          />
        )}

        {/* 5. Doctor Section */}
        {activeTab === 'doctor' && (
          <DoctorSection
            doctors={doctors}
            onOpenAskDoctorModal={handleOpenAskDoctor}
          />
        )}

        {/* 6. Health & Compatibility Matrix Section */}
        {activeTab === 'health' && (
          <HealthSection />
        )}

        {/* 7. Community & Camps Section */}
        {activeTab === 'community' && (
          <CommunitySection />
        )}

        {/* 8. Dashboards Section */}
        {activeTab === 'dashboards' && (
          <DashboardsSection
            centres={centres}
            onUpdateCentreStock={handleUpdateCentreStock}
          />
        )}

        {/* 9. Profile Section */}
        {activeTab === 'profile' && (
          <ProfileSection />
        )}
      </main>

      {/* 10. Footer */}
      <Footer 
        onSelectTab={setActiveTab} 
        onOpenSOSModal={() => setSosModalOpen(true)} 
      />

      {/* Interactive Global Modals */}
      <EmergencySOSModal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        onBroadcastSOS={handleBroadcastSOS}
      />

      <ReserveStockModal
        isOpen={reserveModalOpen}
        centre={reserveTargetCentre}
        bloodGroup={reserveTargetGroup}
        onClose={() => setReserveModalOpen(false)}
      />

      <ReportInfoModal
        isOpen={reportModalOpen}
        centre={reportTargetCentre}
        onClose={() => setReportModalOpen(false)}
      />

      <AskDoctorModal
        isOpen={askDoctorModalOpen}
        doctor={selectedDoctorForConsult}
        onClose={() => setAskDoctorModalOpen(false)}
      />

    </div>
  );
}

export default App;
