import { 
  BloodCentre, 
  EmergencyDonorAlert, 
  DonorProfile, 
  HospitalProfile, 
  DoctorProfile, 
  BloodCamp, 
  CommunityStory, 
  DoctorConsultationQuestion,
  BloodGroup 
} from '../types';

export const CITIES = [
  'All Cities',
  'Delhi-NCR',
  'Mumbai',
  'Bengaluru',
  'Hyderabad',
  'Kolkata',
  'Chennai',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow'
];

export const BLOOD_GROUPS: BloodGroup[] = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Bombay (hh)'
];

export const BLOOD_COMPONENTS = [
  'All Components',
  'Whole Blood',
  'PRBC (Red Cells)',
  'Platelets (RDP/SDP)',
  'Plasma (FFP)',
  'Cryoprecipitate'
];

export const MOCK_BLOOD_CENTRES: BloodCentre[] = [
  {
    id: 'bc-1',
    name: 'AIIMS Main Blood Bank & Transfusion Centre',
    type: 'Government',
    address: 'Ansari Nagar East, Ring Road',
    locality: 'Ansari Nagar',
    city: 'Delhi-NCR',
    state: 'Delhi',
    pincode: '110029',
    distanceKm: 2.1,
    phone: '+91 11 2658 8500',
    emergencyPhone: '011-2659-4444',
    licenseNumber: 'DL-FDA-CENTRAL-0914',
    verificationStatus: 'NABH_ACCREDITED',
    lastUpdatedMinutesAgo: 18, // Very fresh!
    operatingHours: 'Open 24/7 (Emergency Service)',
    facilities: ['Aphaeresis (SDP) Machine', 'Component Separation Unit', 'Cold Storage -80°C', 'Automated Cross-Match'],
    coordinates: { lat: 28.5672, lng: 77.2100 },
    stock: {
      'A+': { wholeBlood: 14, prbc: 28, platelets: 12, plasma: 19, cryo: 5 },
      'A-': { wholeBlood: 4, prbc: 6, platelets: 2, plasma: 4, cryo: 2 },
      'B+': { wholeBlood: 22, prbc: 45, platelets: 18, plasma: 24, cryo: 8 },
      'B-': { wholeBlood: 3, prbc: 5, platelets: 1, plasma: 3, cryo: 1 },
      'AB+': { wholeBlood: 10, prbc: 18, platelets: 8, plasma: 12, cryo: 4 },
      'AB-': { wholeBlood: 1, prbc: 2, platelets: 0, plasma: 1, cryo: 0 },
      'O+': { wholeBlood: 35, prbc: 62, platelets: 24, plasma: 38, cryo: 14 },
      'O-': { wholeBlood: 2, prbc: 4, platelets: 1, plasma: 3, cryo: 2 },
      'Bombay (hh)': { wholeBlood: 0, prbc: 1, platelets: 0, plasma: 0, cryo: 0 }
    }
  },
  {
    id: 'bc-2',
    name: 'Indian Red Cross Society Blood Centre',
    type: 'Red Cross',
    address: '1 Red Cross Road, Near Parliament Street',
    locality: 'Connaught Place',
    city: 'Delhi-NCR',
    state: 'Delhi',
    pincode: '110001',
    distanceKm: 4.8,
    phone: '+91 11 2371 6441',
    emergencyPhone: '1800-11-8004',
    licenseNumber: 'DL-REDX-1974-01',
    verificationStatus: 'GOVT_VERIFIED',
    lastUpdatedMinutesAgo: 45,
    operatingHours: 'Open 24 Hours',
    facilities: ['Mobile Blood Donation Bus', 'Voluntary Donor Registry', 'Platelet Extraction Unit'],
    coordinates: { lat: 28.6219, lng: 77.2090 },
    stock: {
      'A+': { wholeBlood: 18, prbc: 30, platelets: 9, plasma: 15, cryo: 3 },
      'A-': { wholeBlood: 2, prbc: 3, platelets: 1, plasma: 2, cryo: 0 },
      'B+': { wholeBlood: 25, prbc: 40, platelets: 14, plasma: 20, cryo: 6 },
      'B-': { wholeBlood: 2, prbc: 4, platelets: 0, plasma: 2, cryo: 0 },
      'AB+': { wholeBlood: 8, prbc: 12, platelets: 5, plasma: 8, cryo: 2 },
      'AB-': { wholeBlood: 0, prbc: 1, platelets: 0, plasma: 1, cryo: 0 },
      'O+': { wholeBlood: 40, prbc: 55, platelets: 20, plasma: 32, cryo: 10 },
      'O-': { wholeBlood: 1, prbc: 3, platelets: 0, plasma: 2, cryo: 1 },
      'Bombay (hh)': { wholeBlood: 0, prbc: 0, platelets: 0, plasma: 0, cryo: 0 }
    }
  },
  {
    id: 'bc-3',
    name: 'Rotary TTK Blood Centre & Research Foundation',
    type: 'Charitable',
    address: 'New Thippasandra Main Road, HAL 3rd Stage',
    locality: 'Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560075',
    distanceKm: 3.5,
    phone: '+91 80 2528 7903',
    emergencyPhone: '080-2529-3485',
    licenseNumber: 'KA-BNG-TTK-2019-91',
    verificationStatus: 'NABH_ACCREDITED',
    lastUpdatedMinutesAgo: 32,
    operatingHours: '24x7 Round the Clock',
    facilities: ['NAT Testing Lab (Nucleic Acid Test)', 'Specialized Thalassemia Support', 'Leukodepleted Blood Filter'],
    coordinates: { lat: 12.9716, lng: 77.6412 },
    stock: {
      'A+': { wholeBlood: 12, prbc: 22, platelets: 15, plasma: 18, cryo: 6 },
      'A-': { wholeBlood: 3, prbc: 4, platelets: 2, plasma: 3, cryo: 1 },
      'B+': { wholeBlood: 19, prbc: 38, platelets: 22, plasma: 25, cryo: 9 },
      'B-': { wholeBlood: 1, prbc: 3, platelets: 1, plasma: 2, cryo: 0 },
      'AB+': { wholeBlood: 7, prbc: 14, platelets: 6, plasma: 9, cryo: 3 },
      'AB-': { wholeBlood: 0, prbc: 2, platelets: 0, plasma: 1, cryo: 0 },
      'O+': { wholeBlood: 28, prbc: 48, platelets: 26, plasma: 30, cryo: 12 },
      'O-': { wholeBlood: 3, prbc: 5, platelets: 2, plasma: 4, cryo: 2 },
      'Bombay (hh)': { wholeBlood: 0, prbc: 0, platelets: 0, plasma: 0, cryo: 0 }
    }
  },
  {
    id: 'bc-4',
    name: 'Tata Memorial Centre Blood & Transfusion Medicine',
    type: 'Government',
    address: 'Dr. Ernest Borges Road, Parel',
    locality: 'Parel',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400012',
    distanceKm: 5.2,
    phone: '+91 22 2417 7000',
    emergencyPhone: '022-2417-7100',
    licenseNumber: 'MH-FDA-MUM-4412-A',
    verificationStatus: 'NABH_ACCREDITED',
    lastUpdatedMinutesAgo: 12,
    operatingHours: '24x7 Emergency Oncology Bank',
    facilities: ['Dedicated SDP (Platelet) Aphaeresis', 'Irradiated Blood Components', 'High-Risk Oncology Care'],
    coordinates: { lat: 19.0028, lng: 72.8427 },
    stock: {
      'A+': { wholeBlood: 15, prbc: 34, platelets: 30, plasma: 16, cryo: 7 },
      'A-': { wholeBlood: 2, prbc: 5, platelets: 4, plasma: 3, cryo: 1 },
      'B+': { wholeBlood: 20, prbc: 42, platelets: 35, plasma: 28, cryo: 10 },
      'B-': { wholeBlood: 2, prbc: 3, platelets: 2, plasma: 2, cryo: 0 },
      'AB+': { wholeBlood: 9, prbc: 16, platelets: 12, plasma: 10, cryo: 4 },
      'AB-': { wholeBlood: 1, prbc: 2, platelets: 1, plasma: 1, cryo: 0 },
      'O+': { wholeBlood: 32, prbc: 58, platelets: 40, plasma: 35, cryo: 15 },
      'O-': { wholeBlood: 4, prbc: 6, platelets: 3, plasma: 4, cryo: 2 },
      'Bombay (hh)': { wholeBlood: 1, prbc: 1, platelets: 0, plasma: 1, cryo: 0 }
    }
  },
  {
    id: 'bc-5',
    name: 'Apollo Hospital Central Blood Bank',
    type: 'Private Hospital',
    address: 'Jubilee Hills, Road No. 72',
    locality: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    distanceKm: 6.4,
    phone: '+91 40 2360 7777',
    emergencyPhone: '1066',
    licenseNumber: 'TS-FDA-HYD-8821',
    verificationStatus: 'NABH_ACCREDITED',
    lastUpdatedMinutesAgo: 180, // 3 hours ago - needs re-verification warning
    operatingHours: '24 Hours Emergency Service',
    facilities: ['Component Separation', 'Plasma Exchange Unit', 'Cryopreservation'],
    coordinates: { lat: 17.4265, lng: 78.4124 },
    stock: {
      'A+': { wholeBlood: 8, prbc: 16, platelets: 5, plasma: 10, cryo: 2 },
      'A-': { wholeBlood: 1, prbc: 2, platelets: 0, plasma: 1, cryo: 0 },
      'B+': { wholeBlood: 12, prbc: 24, platelets: 7, plasma: 14, cryo: 3 },
      'B-': { wholeBlood: 0, prbc: 1, platelets: 0, plasma: 1, cryo: 0 },
      'AB+': { wholeBlood: 4, prbc: 8, platelets: 2, plasma: 5, cryo: 1 },
      'AB-': { wholeBlood: 0, prbc: 1, platelets: 0, plasma: 0, cryo: 0 },
      'O+': { wholeBlood: 18, prbc: 30, platelets: 9, plasma: 16, cryo: 4 },
      'O-': { wholeBlood: 1, prbc: 2, platelets: 0, plasma: 1, cryo: 0 },
      'Bombay (hh)': { wholeBlood: 0, prbc: 0, platelets: 0, plasma: 0, cryo: 0 }
    }
  },
  {
    id: 'bc-6',
    name: 'District Civil Hospital Regional Blood Bank',
    type: 'Government',
    address: 'Near Old Bus Stand, Civil Lines',
    locality: 'Civil Lines',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302006',
    distanceKm: 7.8,
    phone: '+91 141 222 4100',
    emergencyPhone: '0141-222-4999',
    licenseNumber: 'RJ-DRUG-JPR-1029',
    verificationStatus: 'GOVT_VERIFIED',
    lastUpdatedMinutesAgo: 820, // >13 hrs ago - outdated warning!
    operatingHours: '9:00 AM - 9:00 PM (Emergency on-call)',
    facilities: ['Whole Blood Collection', 'Govt Subsidized Transfusion'],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    stock: {
      'A+': { wholeBlood: 6, prbc: 8, platelets: 0, plasma: 4, cryo: 0 },
      'A-': { wholeBlood: 0, prbc: 1, platelets: 0, plasma: 0, cryo: 0 },
      'B+': { wholeBlood: 8, prbc: 10, platelets: 1, plasma: 5, cryo: 0 },
      'B-': { wholeBlood: 0, prbc: 0, platelets: 0, plasma: 0, cryo: 0 },
      'AB+': { wholeBlood: 2, prbc: 3, platelets: 0, plasma: 1, cryo: 0 },
      'AB-': { wholeBlood: 0, prbc: 0, platelets: 0, plasma: 0, cryo: 0 },
      'O+': { wholeBlood: 10, prbc: 14, platelets: 1, plasma: 6, cryo: 1 },
      'O-': { wholeBlood: 0, prbc: 0, platelets: 0, plasma: 0, cryo: 0 },
      'Bombay (hh)': { wholeBlood: 0, prbc: 0, platelets: 0, plasma: 0, cryo: 0 }
    }
  }
];

export const MOCK_EMERGENCY_ALERTS: EmergencyDonorAlert[] = [
  {
    id: 'sos-101',
    patientName: 'Aarav Sharma',
    patientAge: 29,
    hospitalName: 'Safdarjung Hospital (Emergency ICU Bed 14)',
    wardRoom: 'Trauma Centre ICU-2',
    city: 'Delhi-NCR',
    locality: 'Ring Road, Safdarjung Enclave',
    bloodGroup: 'O-',
    component: 'PRBC (Red Cells)',
    unitsNeeded: 3,
    urgency: 'CRITICAL',
    attendantContact: '+91 98112 34567',
    isRequisitionVerified: true,
    timeAgo: '12 mins ago',
    status: 'ACTIVE',
    acceptedDonors: [
      { donorId: 'dn-1', donorName: 'Vikram Mehta', etaMinutes: 25, status: 'EN_ROUTE' },
      { donorId: 'dn-2', donorName: 'Pooja Verma', etaMinutes: 40, status: 'EN_ROUTE' }
    ]
  },
  {
    id: 'sos-102',
    patientName: 'Sunita Mukherjee',
    patientAge: 46,
    hospitalName: 'Tata Memorial Hospital',
    wardRoom: 'Oncology Daycare Wing C',
    city: 'Mumbai',
    locality: 'Parel East',
    bloodGroup: 'B-',
    component: 'Platelets (Single Donor Platelet / SDP)',
    unitsNeeded: 2,
    urgency: 'CRITICAL',
    attendantContact: '+91 97223 88120',
    isRequisitionVerified: true,
    timeAgo: '28 mins ago',
    status: 'ACTIVE',
    acceptedDonors: [
      { donorId: 'dn-3', donorName: 'Rohan Deshmukh', etaMinutes: 15, status: 'ARRIVED' }
    ]
  },
  {
    id: 'sos-103',
    patientName: 'Mohd. Farhan',
    patientAge: 12,
    hospitalName: 'Indira Gandhi Institute of Child Health',
    wardRoom: 'Thalassemia Ward Bed 8',
    city: 'Bengaluru',
    locality: 'South Hospital Complex',
    bloodGroup: 'A+',
    component: 'PRBC (Packed Red Cells)',
    unitsNeeded: 2,
    urgency: 'URGENT',
    attendantContact: '+91 94481 29402',
    isRequisitionVerified: true,
    timeAgo: '1 hour ago',
    status: 'ACTIVE',
    acceptedDonors: []
  },
  {
    id: 'sos-104',
    patientName: 'Kavita Nair',
    patientAge: 34,
    hospitalName: 'KIMS Super Speciality Hospital',
    wardRoom: 'Maternity OT-1',
    city: 'Hyderabad',
    locality: 'Secunderabad',
    bloodGroup: 'AB-',
    component: 'Fresh Frozen Plasma (FFP)',
    unitsNeeded: 4,
    urgency: 'CRITICAL',
    attendantContact: '+91 99882 12390',
    isRequisitionVerified: true,
    timeAgo: '42 mins ago',
    status: 'ACTIVE',
    acceptedDonors: [
      { donorId: 'dn-4', donorName: 'Deepak Reddy', etaMinutes: 30, status: 'EN_ROUTE' }
    ]
  }
];

export const MOCK_DONORS: DonorProfile[] = [
  {
    id: 'dn-1',
    name: 'Vikram Mehta',
    bloodGroup: 'O-',
    city: 'Delhi-NCR',
    locality: 'Lajpat Nagar (within 4 km of AIIMS)',
    totalDonations: 14,
    lastDonationDate: '2026-05-10',
    isAvailableForEmergency: true,
    isVerified: true,
    badges: ['Life Saver (10+)', 'Rare Blood Champion', 'Emergency Responder'],
    phoneMasked: '+91 9811X-XXX12'
  },
  {
    id: 'dn-2',
    name: 'Pooja Verma',
    bloodGroup: 'O-',
    city: 'Delhi-NCR',
    locality: 'Green Park Extension',
    totalDonations: 6,
    lastDonationDate: '2026-06-18',
    isAvailableForEmergency: true,
    isVerified: true,
    badges: ['Silver Donor', 'Rapid Responder'],
    phoneMasked: '+91 9920X-XXX84'
  },
  {
    id: 'dn-3',
    name: 'Rohan Deshmukh',
    bloodGroup: 'B-',
    city: 'Mumbai',
    locality: 'Dadar West',
    totalDonations: 22,
    lastDonationDate: '2026-07-02',
    isAvailableForEmergency: true,
    isVerified: true,
    badges: ['Century Hero (20+)', 'SDP Platelet Hero', 'Verified Transfusion Advocate'],
    phoneMasked: '+91 9820X-XXX55'
  },
  {
    id: 'dn-4',
    name: 'Dr. Anita Sengupta',
    bloodGroup: 'A-',
    city: 'Kolkata',
    locality: 'Salt Lake Sector 1',
    totalDonations: 11,
    lastDonationDate: '2026-04-12',
    isAvailableForEmergency: true,
    isVerified: true,
    badges: ['Healthcare Hero', 'Star Donor'],
    phoneMasked: '+91 9433X-XXX19'
  },
  {
    id: 'dn-5',
    name: 'Karthik Ramanathan',
    bloodGroup: 'Bombay (hh)',
    city: 'Chennai',
    locality: 'Adyar',
    totalDonations: 9,
    lastDonationDate: '2026-03-20',
    isAvailableForEmergency: true,
    isVerified: true,
    badges: ['Ultra Rare Guardian (hh)', 'National Registry Member'],
    phoneMasked: '+91 9840X-XXX73'
  },
  {
    id: 'dn-6',
    name: 'Manpreet Singh',
    bloodGroup: 'O+',
    city: 'Delhi-NCR',
    locality: 'Rohini Sector 13',
    totalDonations: 8,
    lastDonationDate: '2026-08-01',
    isAvailableForEmergency: true,
    isVerified: true,
    badges: ['Universal Donor', 'Youth Icon'],
    phoneMasked: '+91 9711X-XXX20'
  }
];

export const MOCK_HOSPITALS: HospitalProfile[] = [
  {
    id: 'hosp-1',
    name: 'All India Institute of Medical Sciences (AIIMS)',
    type: 'Government Medical College',
    city: 'Delhi-NCR',
    address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi',
    emergencyDesk: '011-2659-3300',
    bloodCoordinator: 'Dr. R. K. Singhal (Transfusion Dept)',
    isVerified: true,
    hasInHouseBloodBank: true,
    currentRequirements: [
      { bloodGroup: 'O-', component: 'PRBC', unitsNeeded: 6, urgency: 'CRITICAL' },
      { bloodGroup: 'B+', component: 'Platelets (SDP)', unitsNeeded: 4, urgency: 'URGENT' }
    ]
  },
  {
    id: 'hosp-2',
    name: 'Tata Memorial Hospital & Cancer Centre',
    type: 'Government Medical College',
    city: 'Mumbai',
    address: 'Dr. Ernest Borges Rd, Parel, Mumbai',
    emergencyDesk: '022-2417-7000',
    bloodCoordinator: 'Dr. Sunita Kulkarni',
    isVerified: true,
    hasInHouseBloodBank: true,
    currentRequirements: [
      { bloodGroup: 'B-', component: 'Platelets (SDP)', unitsNeeded: 3, urgency: 'CRITICAL' },
      { bloodGroup: 'A+', component: 'Whole Blood', unitsNeeded: 5, urgency: 'ROUTINE' }
    ]
  },
  {
    id: 'hosp-3',
    name: 'Fortis Memorial Research Institute',
    type: 'Super Speciality',
    city: 'Delhi-NCR',
    address: 'Sector 44, Opposite HUDA City Centre, Gurugram',
    emergencyDesk: '+91 124 496 2200',
    bloodCoordinator: 'Dr. Neeraj Mathur',
    isVerified: true,
    hasInHouseBloodBank: true,
    currentRequirements: [
      { bloodGroup: 'AB-', component: 'Fresh Frozen Plasma', unitsNeeded: 2, urgency: 'URGENT' }
    ]
  },
  {
    id: 'hosp-4',
    name: 'Narayana Institute of Cardiac Sciences',
    type: 'Super Speciality',
    city: 'Bengaluru',
    address: '258/A, Bommasandra Industrial Area, Anekal Taluk',
    emergencyDesk: '080-7122-2222',
    bloodCoordinator: 'Dr. P. Swaminathan',
    isVerified: true,
    hasInHouseBloodBank: true,
    currentRequirements: [
      { bloodGroup: 'O+', component: 'PRBC', unitsNeeded: 10, urgency: 'CRITICAL' },
      { bloodGroup: 'A-', component: 'Cryoprecipitate', unitsNeeded: 4, urgency: 'URGENT' }
    ]
  }
];

export const MOCK_DOCTORS: DoctorProfile[] = [
  {
    id: 'doc-1',
    name: 'Dr. Rajeshwari Iyer, MD',
    qualification: 'MD (Transfusion Medicine), DNB',
    specialization: 'Transfusion Medicine & Immunohematology',
    hospital: 'AIIMS New Delhi',
    registrationNumber: 'MCI-2011-88421',
    isVerified: true,
    availability: 'ONLINE',
    answeredQuestions: 142,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'doc-2',
    name: 'Dr. Sandeep Vardhan, MBBS, MD',
    qualification: 'MD (Pathology & Blood Banking)',
    specialization: 'Apheresis & Platelet Biology',
    hospital: 'Tata Memorial Hospital Mumbai',
    registrationNumber: 'MMC-2008-09122',
    isVerified: true,
    availability: 'ON_CALL',
    answeredQuestions: 98,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'doc-3',
    name: 'Dr. Meenakshi Sundaram, MS',
    qualification: 'MS (General Surgery), Critical Care Specialist',
    specialization: 'Emergency Trauma & Mass Casualty Transfusion',
    hospital: 'Apollo Hospitals Chennai',
    registrationNumber: 'TMC-2015-44219',
    isVerified: true,
    availability: 'ONLINE',
    answeredQuestions: 76,
    avatar: 'https://images.unsplash.com/photo-1594824813511-1779cb250f28?auto=format&fit=crop&q=80&w=300'
  }
];

export const MOCK_CAMPS: BloodCamp[] = [
  {
    id: 'camp-1',
    title: 'Yuva Raktdaan Mahotsav 2026',
    organizer: 'Red Cross Society & Delhi Youth Welfare Association',
    date: 'Sunday, 15 Nov 2026',
    timing: '9:00 AM – 5:00 PM',
    venue: 'Central Park Pavilion, Connaught Place',
    city: 'Delhi-NCR',
    targetUnits: 300,
    registeredDonors: 198,
    contactNumber: '+91 11 2371 6441',
    isNbtcApproved: true,
    bannerImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'camp-2',
    title: 'Corporate Life-Saver Drive: Tech Park Chapter',
    organizer: 'Rotary TTK Blood Bank & Manyata Tech Forum',
    date: 'Wednesday, 18 Nov 2026',
    timing: '10:00 AM – 4:30 PM',
    venue: 'Block G Amphitheatre, Manyata Embassy Business Park',
    city: 'Bengaluru',
    targetUnits: 250,
    registeredDonors: 164,
    contactNumber: '+91 80 2528 7903',
    isNbtcApproved: true,
    bannerImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'camp-3',
    title: 'Mumbai Coastal Community Blood Drive',
    organizer: 'Lions Club of Marine Lines & KEM Hospital',
    date: 'Saturday, 21 Nov 2026',
    timing: '8:30 AM – 3:30 PM',
    venue: 'Chowpatty Community Hall, Marine Drive',
    city: 'Mumbai',
    targetUnits: 200,
    registeredDonors: 142,
    contactNumber: '+91 22 2417 7000',
    isNbtcApproved: true,
    bannerImage: 'https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_STORIES: CommunityStory[] = [
  {
    id: 'story-1',
    title: 'How 3 RaktSetu donors saved my sister during emergency childbirth',
    authorName: 'Priyesh Nambiar',
    authorRole: 'Recipient Family',
    bloodGroup: 'AB-',
    story: 'My sister suffered severe postpartum hemorrhage at 2:00 AM. The hospital had only 1 unit of AB- plasma in stock. We triggered an emergency alert on RaktSetu. Within 22 minutes, two donors accepted and arrived at Fortis. The doctors said those timely units saved two lives that night. Forever indebted.',
    date: '28 Oct 2026',
    likes: 124,
    comments: [
      { id: 'c1', author: 'Dr. Rajeshwari', comment: 'Every minute matters in postpartum hemorrhage. Proud of our vigilant donor community.', time: '2 days ago' },
      { id: 'c2', author: 'Vikram M.', comment: 'Salute to the swift donors! Hope mother and child are thriving.', time: '1 day ago' }
    ]
  },
  {
    id: 'story-2',
    title: 'My 50th Voluntary Blood Donation milestone on RaktSetu',
    authorName: 'Sunil Kedari',
    authorRole: 'Regular Donor',
    bloodGroup: 'O-',
    story: 'I started donating blood when I was 19 after witnessing an accident. Today at 38, I completed my 50th donation through a RaktSetu urgent call for a dengue pediatric patient. Blood cannot be manufactured in a factory — only one human can gift life to another.',
    date: '24 Oct 2026',
    likes: 218,
    comments: [
      { id: 'c3', author: 'Neha Gupta', comment: 'You are a true superhero Sunil ji!', time: '3 days ago' }
    ]
  },
  {
    id: 'story-3',
    title: 'Dispelling myths: Why giving platelets does not make you weak',
    authorName: 'Dr. Sandeep Vardhan',
    authorRole: 'Medical Staff',
    bloodGroup: 'B+',
    story: 'Many people fear apheresis (single donor platelets) because it takes 60-90 minutes. However, your body regenerates platelet reserves within 48 to 72 hours! Dengue and cancer chemotherapy patients depend on timely platelet transfusions every single day. Do not hesitate.',
    date: '19 Oct 2026',
    likes: 189,
    comments: [
      { id: 'c4', author: 'Amit K.', comment: 'Donated platelets last week at Tata Memorial. Feeling completely energetic and fulfilled.', time: '5 days ago' }
    ]
  }
];

export const MOCK_DOCTOR_QUESTIONS: DoctorConsultationQuestion[] = [
  {
    id: 'q-1',
    patientOrDonorName: 'Ramesh K. (Bengaluru)',
    topic: 'Platelet count dropped to 28,000 in Dengue',
    question: 'My brother has dengue day 5, and his platelets dropped to 28,000. Doctor is advising standby SDP. Can we wait or arrange immediately?',
    timestamp: 'Today, 11:20 AM',
    doctorAnswer: {
      doctorName: 'Dr. Rajeshwari Iyer, MD',
      doctorReg: 'MCI-2011-88421',
      answer: 'Arranging standby Single Donor Platelets (SDP) is crucial. Transfusion is generally indicated when platelets fall below 20,000 or if there is active mucosal bleeding (petechiae, gum bleeding). Please reserve 1-2 verified units nearby through RaktSetu right away.',
      timestamp: 'Today, 11:45 AM'
    }
  },
  {
    id: 'q-2',
    patientOrDonorName: 'Shreya M. (Delhi)',
    topic: 'Donation eligibility after getting a tattoo',
    question: 'I got a tattoo 4 months ago in a hygienic studio. Can I donate blood in an emergency call today?',
    timestamp: 'Yesterday, 4:15 PM',
    doctorAnswer: {
      doctorName: 'Dr. Sandeep Vardhan, MBBS, MD',
      doctorReg: 'MMC-2008-09122',
      answer: 'As per National Blood Transfusion Council (NBTC) regulations in India, there is a mandatory deferral period of 6 to 12 months after getting a tattoo or body piercing to eliminate window-period transfusion-transmissible infections. Please defer until 6 full months have elapsed.',
      timestamp: 'Yesterday, 5:02 PM'
    }
  }
];

// Interactive Compatibility Matrix
export const BLOOD_COMPATIBILITY: Record<BloodGroup, { canReceiveFrom: BloodGroup[]; canDonateTo: BloodGroup[] }> = {
  'O-': {
    canReceiveFrom: ['O-'],
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] // Universal red cell donor
  },
  'O+': {
    canReceiveFrom: ['O-', 'O+'],
    canDonateTo: ['O+', 'A+', 'B+', 'AB+']
  },
  'A-': {
    canReceiveFrom: ['O-', 'A-'],
    canDonateTo: ['A-', 'A+', 'AB-', 'AB+']
  },
  'A+': {
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+'],
    canDonateTo: ['A+', 'AB+']
  },
  'B-': {
    canReceiveFrom: ['O-', 'B-'],
    canDonateTo: ['B-', 'B+', 'AB-', 'AB+']
  },
  'B+': {
    canReceiveFrom: ['O-', 'O+', 'B-', 'B+'],
    canDonateTo: ['B+', 'AB+']
  },
  'AB-': {
    canReceiveFrom: ['O-', 'A-', 'B-', 'AB-'],
    canDonateTo: ['AB-', 'AB+']
  },
  'AB+': {
    canReceiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal recipient
    canDonateTo: ['AB+']
  },
  'Bombay (hh)': {
    canReceiveFrom: ['Bombay (hh)'], // Only another Bombay phenotype!
    canDonateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] // Universal red cell donor for ABO
  }
};

