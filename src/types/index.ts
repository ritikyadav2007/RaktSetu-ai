export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'Bombay (hh)';

export type BloodComponent = 
  | 'All Components'
  | 'Whole Blood'
  | 'PRBC (Red Cells)'
  | 'Platelets (RDP/SDP)'
  | 'Plasma (FFP)'
  | 'Cryoprecipitate';

export type UrgencyLevel = 'CRITICAL' | 'URGENT' | 'ROUTINE';

export type VerificationStatus = 'NABH_ACCREDITED' | 'GOVT_VERIFIED' | 'LICENSED';

export interface BloodStockItem {
  wholeBlood: number;
  prbc: number;
  platelets: number;
  plasma: number;
  cryo: number;
}

export interface BloodCentre {
  id: string;
  name: string;
  type: 'Government' | 'Red Cross' | 'Charitable' | 'Private Hospital';
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  distanceKm: number;
  phone: string;
  emergencyPhone: string;
  licenseNumber: string;
  verificationStatus: VerificationStatus;
  lastUpdatedMinutesAgo: number; // For freshness indicator
  operatingHours: string;
  facilities: string[];
  stock: Record<BloodGroup, BloodStockItem>;
  coordinates: { lat: number; lng: number };
}

export interface EmergencyDonorAlert {
  id: string;
  patientName: string;
  patientAge: number;
  hospitalName: string;
  wardRoom: string;
  city: string;
  locality: string;
  bloodGroup: BloodGroup;
  component: string;
  unitsNeeded: number;
  urgency: UrgencyLevel;
  attendantContact: string;
  isRequisitionVerified: boolean;
  timeAgo: string;
  status: 'ACTIVE' | 'RESPONDED' | 'FULFILLED';
  acceptedDonors: {
    donorId: string;
    donorName: string;
    etaMinutes: number;
    status: 'EN_ROUTE' | 'ARRIVED' | 'DONATING';
  }[];
}

export interface DonorProfile {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  city: string;
  locality: string; // approximate for privacy
  totalDonations: number;
  lastDonationDate: string; // YYYY-MM-DD
  isAvailableForEmergency: boolean;
  isVerified: boolean;
  badges: string[];
  phoneMasked: string;
}

export interface HospitalProfile {
  id: string;
  name: string;
  type: 'Government Medical College' | 'Super Speciality' | 'Charitable Hospital' | 'District Hospital';
  city: string;
  address: string;
  emergencyDesk: string;
  bloodCoordinator: string;
  currentRequirements: {
    bloodGroup: BloodGroup;
    component: string;
    unitsNeeded: number;
    urgency: UrgencyLevel;
  }[];
  isVerified: boolean;
  hasInHouseBloodBank: boolean;
}

export interface DoctorProfile {
  id: string;
  name: string;
  qualification: string;
  specialization: string;
  hospital: string;
  registrationNumber: string;
  isVerified: boolean;
  availability: 'ONLINE' | 'ON_CALL' | 'OFFLINE';
  answeredQuestions: number;
  avatar: string;
}

export interface BloodCamp {
  id: string;
  title: string;
  organizer: string;
  date: string;
  timing: string;
  venue: string;
  city: string;
  targetUnits: number;
  registeredDonors: number;
  contactNumber: string;
  isNbtcApproved: boolean;
  bannerImage: string;
}

export interface CommunityStory {
  id: string;
  title: string;
  authorName: string;
  authorRole: 'Recipient Family' | 'Regular Donor' | 'Medical Staff' | 'Camp Organizer';
  bloodGroup: BloodGroup;
  story: string;
  date: string;
  likes: number;
  userLiked?: boolean;
  comments: {
    id: string;
    author: string;
    comment: string;
    time: string;
  }[];
  imageUrl?: string;
}

export interface DoctorConsultationQuestion {
  id: string;
  patientOrDonorName: string;
  topic: string;
  question: string;
  timestamp: string;
  doctorAnswer?: {
    doctorName: string;
    doctorReg: string;
    answer: string;
    timestamp: string;
  };
}
