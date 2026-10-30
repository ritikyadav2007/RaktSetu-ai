# RaktSetu (रक्तसेतु) – Digital Blood Donation & Emergency Coordination Platform

> **Tagline:** *“Find the Right Blood, Faster.”*

RaktSetu is a modern, life-saving digital healthcare platform designed to connect patients, voluntary blood donors, licensed blood centres, hospitals, and transfusion medicine specialists during critical emergencies.

---

## 🌟 Core Architecture & Key Modules

### 1. 🩸 Blood Discovery & Live Stock Verification
- **Granular Multi-Parameter Search**:
  - Blood Groups: $A^+$, $A^-$, $B^+$, $B^-$, $AB^+$, $AB^-$, $O^+$, $O^-$, and Rare Bombay Phenotype ($hh$).
  - Components: PRBC (Packed Red Blood Cells), Platelets (RDP/SDP), Fresh Frozen Plasma (FFP), Whole Blood, Cryoprecipitate.
  - Location & Distance sorting with GPS detection.
  - Urgency Triage: Critical ($<2\text{h}$), Urgent ($<6\text{h}$), Scheduled.
- **Dynamic Stock Freshness System**:
  - 🟢 **Verified Fresh ($<1\text{h}$)**: High confidence inventory verified recently by centre technicians.
  - 🟡 **Recent ($1\text{h}–6\text{h}$)**: Moderate confidence; call to re-verify suggested.
  - 🔴 **Outdated ($>6\text{h}$)**: High discrepancy risk; marked clearly to prevent futile emergency trips.
- **Direct Actions**:
  - One-tap Emergency Helpline Calling.
  - Direct Turn-by-Turn GPS Navigation.
  - 2-Hour Temporary Hold / Reservation for arriving patient attendants.
  - **"Report Incorrect Information"** community integrity mechanism.

### 2. 🚨 Emergency SOS & Donor Broadcast Network
- **Instant Patient Requisition Broadcast**:
  - Patient Name, Age, Hospital Name & ICU Bed, Units Needed, Urgency Timeline, Requisition Slip status.
- **Interactive Volunteer Response Tracker**:
  - **"I Can Help"**: Donors specify their Estimated Time of Arrival (ETA) (15, 30, 45, or 60 minutes) and appear live in the patient's "En Route" tracker.
  - **"I Can't Help"**: Respectful acknowledgment that keeps broadcasting to the next nearby donor.
- **Strict Privacy Shield**:
  - Exact residential addresses and full telephone numbers are strictly concealed. Only approximate locality (e.g., *Lajpat Nagar, within 4 km*) is displayed.
- **Interactive Eligibility Pre-Check Tool**:
  - Validates Age ($18–65$), Weight ($\ge 50\text{ kg}$), Hemoglobin ($\ge 12.5\text{ g/dL}$), $90$-day interval rules, and tattoo/piercing deferrals as per NBTC guidelines.

### 3. 🏥 Hospital Coordination & Inter-Facility Transfers
- Verified hospital registry with in-house blood bank statuses.
- Real-time Hospital Requirement Boards for Emergency Trauma, Maternity OT, and Oncology Wards.
- **Inter-Hospital Blood Transfer Request Workflow**: Enables certified temperature-controlled cold-chain transfers between regional blood banks.

### 4. 🩺 Doctor Connect & Transfusion Guidance
- State Medical Council verified transfusion specialists and immunohematologists.
- **"Ask a Doctor"**: Interactive clinical consultation desk for doubts about platelet thresholds in dengue, minor antibody cross-matching, and medication deferrals.
- Verified clinical Q&A archive.

### 5. 🧬 Health Guidance & Compatibility Matrix
- **Interactive ABO & Rh Compatibility Tool**: Visualizes exact compatible donors and recipients for any chosen blood group.
- **Component Decoder Guide**: Plain-language medical guidance explaining PRBC, SDP, FFP, and Cryo.
- Searchable articles on dengue platelets, rare phenotypes, and natural iron recovery.

### 6. 🤝 Camps & Community Stories
- Upcoming mobile blood drives and NBTC-approved donation camps.
- Donor camp registration progress bars and "Host a Camp" application form for colleges and corporate campuses.
- Inspiring community stories with interactive like and comment threads.

### 7. 📊 Stakeholder Portals & Dashboards
- **Blood Centre Dashboard**: Live stock editor allowing staff to update counts and immediately reset the platform freshness timestamp.
- **Hospital Dashboard**: Track arriving donors and active requisitions.
- **Doctor Desk**: Review and answer clinical patient questions.
- **Admin & Trust Desk**: Monitor network reliability index and resolve community discrepancy reports.

### 8. 🪪 Digital Donor Pass
- Personalized digital donor identity with blood group stamp, lifetime donation counter, estimated lives saved, QR code token, and privacy preferences.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS v4 with custom healthcare gradients and pulse animations
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Typography**: Plus Jakarta Sans (Google Fonts)

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## ⚖️ Statutory Healthcare Disclaimer

*RaktSetu is a digital emergency coordination platform. RaktSetu does not buy, sell, collect, or store physical blood products. All biological collection, screening (HIV 1&2, Hepatitis B, Hepatitis C, Syphilis, Malaria), cross-matching, storage, and distribution are conducted strictly under licensed blood centres approved by the Drugs Controller General of India (DCGI) and State Licensing Authorities in accordance with the Drugs and Cosmetics Act.*
