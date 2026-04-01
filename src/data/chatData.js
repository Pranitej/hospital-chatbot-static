export const chatData = {
  welcome: {
    text: 'Hello! Welcome to City Hospital. How can I help you today?',
    options: [
      'Book / Cancel Appointment',
      'Find a Doctor',
      'Departments & Specialties',
      'Emergency Services',
      'OPD & IPD Information',
      'Lab Tests & Reports',
      'Pharmacy Information',
      'Ambulance Services',
      'Blood Bank',
      'ICU / Critical Care',
      'Insurance & Billing',
      'Visiting Hours',
      'Admission / Discharge Process',
      'Health Packages & Checkups',
      'Hospital Location & Directions',
      'Contact Numbers',
      'FAQs',
      'Health Tips',
      'Feedback / Complaints',
      'COVID / Health Screening',
    ],
  },

  'Book / Cancel Appointment': {
    text:
      'To book or cancel an appointment:\n' +
      '📞 Call: 1800-123-4567 (toll-free, Mon–Sat 8AM–6PM)\n' +
      '🌐 Online: cityhospital.com/appointments\n' +
      '🏥 Walk-in: OPD Counter, Ground Floor\n\n' +
      'For cancellations, please call at least 2 hours in advance.',
    options: ['OPD & IPD Information', 'Contact Numbers', 'Back to Main Menu'],
  },

  'Find a Doctor': {
    text: 'We have 200+ specialists across 20+ departments. Please choose a specialty:',
    options: [
      'Cardiology',
      'Orthopedics',
      'Neurology',
      'Pediatrics',
      'Gynecology',
      'Dermatology',
      'Back to Main Menu',
    ],
  },

  Cardiology: {
    text:
      'Cardiology — Heart & Vascular Care\n' +
      'Specializes in ECG, echocardiograms, angioplasty, and cardiac surgery.\n' +
      '⏰ OPD Hours: Mon–Sat, 9AM–5PM\n' +
      '📞 Direct Line: 1800-123-4568 Ext. 201',
    options: ['Book / Cancel Appointment', 'Back to Main Menu'],
  },

  Orthopedics: {
    text:
      'Orthopedics — Bone, Joint & Spine\n' +
      'Specializes in fractures, joint replacements, spine surgery, and sports injuries.\n' +
      '⏰ OPD Hours: Mon–Sat, 9AM–5PM\n' +
      '📞 Direct Line: 1800-123-4568 Ext. 202',
    options: ['Book / Cancel Appointment', 'Back to Main Menu'],
  },

  Neurology: {
    text:
      'Neurology — Brain & Nervous System\n' +
      "Expert care for stroke, epilepsy, migraines, Parkinson's, and neuropathy.\n" +
      '⏰ OPD Hours: Mon–Fri, 9AM–4PM\n' +
      '📞 Direct Line: 1800-123-4568 Ext. 203',
    options: ['Book / Cancel Appointment', 'Back to Main Menu'],
  },

  Pediatrics: {
    text:
      'Pediatrics — Child Health (0–18 years)\n' +
      'General pediatrics, vaccinations, growth monitoring, and NICU services.\n' +
      '⏰ OPD Hours: Mon–Sat, 8AM–6PM\n' +
      '📞 Direct Line: 1800-123-4568 Ext. 204',
    options: ['Book / Cancel Appointment', 'Back to Main Menu'],
  },

  Gynecology: {
    text:
      "Gynecology & Obstetrics — Women's Health\n" +
      'Prenatal care, delivery, gynecological surgery, and fertility services.\n' +
      '⏰ OPD Hours: Mon–Sat, 9AM–5PM\n' +
      '📞 Direct Line: 1800-123-4568 Ext. 205',
    options: ['Book / Cancel Appointment', 'Back to Main Menu'],
  },

  Dermatology: {
    text:
      'Dermatology — Skin, Hair & Nail Care\n' +
      'Treatment for acne, eczema, psoriasis, hair loss, and cosmetic dermatology.\n' +
      '⏰ OPD Hours: Mon–Sat, 10AM–4PM\n' +
      '📞 Direct Line: 1800-123-4568 Ext. 206',
    options: ['Book / Cancel Appointment', 'Back to Main Menu'],
  },

  'Departments & Specialties': {
    text:
      'City Hospital has 25+ departments including:\n' +
      '• Cardiology  • Orthopedics  • Neurology\n' +
      '• Pediatrics  • Gynecology   • Oncology\n' +
      '• Gastroenterology  • Nephrology  • Pulmonology\n' +
      '• Ophthalmology  • ENT  • Dermatology\n' +
      '• Urology  • Endocrinology  • Psychiatry\n\n' +
      'For a full list, visit our website or call us.',
    options: ['Find a Doctor', 'Book / Cancel Appointment', 'Back to Main Menu'],
  },

  'Emergency Services': {
    text:
      '🚨 EMERGENCY — Available 24/7\n\n' +
      '📞 Emergency Helpline: 108 / 1800-123-9999\n' +
      '🏥 Emergency Ward: Ground Floor, Building A\n\n' +
      'Services: Trauma care, cardiac emergencies, stroke response, poisoning & burns.\n\n' +
      'Do NOT wait — call 108 immediately for life-threatening situations.',
    options: ['Ambulance Services', 'ICU / Critical Care', 'Back to Main Menu'],
  },

  'OPD & IPD Information': {
    text:
      'OPD (Outpatient Department):\n' +
      '⏰ Mon–Sat: 8AM–6PM | Sun: 9AM–1PM (emergency OPD only)\n' +
      '📍 Building B, Ground Floor\n\n' +
      'IPD (Inpatient / Admission):\n' +
      '⏰ 24/7 admission desk available\n' +
      '📍 Main Building, 1st Floor\n' +
      '🛏️ Private, Semi-Private, and General Ward options available.',
    options: ['Admission / Discharge Process', 'Insurance & Billing', 'Back to Main Menu'],
  },

  'Lab Tests & Reports': {
    text:
      'Diagnostic Lab Services:\n' +
      '⏰ Mon–Sat: 7AM–8PM | Sun: 7AM–12PM\n' +
      '📍 Ground Floor, Building C\n\n' +
      'Services: Blood tests, urine analysis, X-ray, CT scan, MRI, ultrasound, ECG.\n\n' +
      '📋 Reports: Collect from lab counter or view online at cityhospital.com/reports\n' +
      'Same-day results available for most routine tests.',
    options: ['Contact Numbers', 'Back to Main Menu'],
  },

  'Pharmacy Information': {
    text:
      'Hospital Pharmacy:\n' +
      '⏰ Main Pharmacy (Building A): 24/7\n' +
      '⏰ OPD Branch Pharmacy: Mon–Sat, 8AM–8PM\n' +
      '📍 Ground Floor, near main entrance\n\n' +
      '💊 Stocks all prescribed medications, surgical supplies, and OTC medicines.\n' +
      '🧾 Accepts insurance and cashless settlement.',
    options: ['Insurance & Billing', 'Back to Main Menu'],
  },

  'Ambulance Services': {
    text:
      '🚑 Ambulance Services — 24/7\n\n' +
      '📞 Emergency (free): 108\n' +
      '📞 City Hospital Ambulance: 1800-123-5678\n\n' +
      'Fleet: Basic Life Support (BLS) and Advanced Life Support (ALS) ambulances.\n' +
      'Average response time: 10–15 minutes within city limits.\n\n' +
      'For inter-hospital transfers, please call the helpline.',
    options: ['Emergency Services', 'Back to Main Menu'],
  },

  'Blood Bank': {
    text:
      '🩸 Blood Bank — 24/7\n\n' +
      '📞 Direct: 1800-123-6789\n' +
      '📍 Ground Floor, Building A (near Emergency)\n\n' +
      'Components available: Whole blood, RBC, Platelets, FFP, Cryoprecipitate.\n\n' +
      'Donors welcome Mon–Sat, 8AM–5PM. Bring a photo ID.\n' +
      'Eligibility: Age 18–65, weight >50 kg, good health.',
    options: ['Emergency Services', 'Contact Numbers', 'Back to Main Menu'],
  },

  'ICU / Critical Care': {
    text:
      '🏥 ICU & Critical Care — 24/7\n\n' +
      'Units available:\n' +
      '• Medical ICU (MICU) — 20 beds\n' +
      '• Surgical ICU (SICU) — 15 beds\n' +
      '• Cardiac ICU (CICU) — 10 beds\n' +
      '• Neonatal ICU (NICU) — 12 beds\n\n' +
      '📞 ICU Information Desk: 1800-123-4568 Ext. 300\n' +
      '👥 Visitor policy: 1 visitor at a time, 10AM–11AM & 5PM–6PM only.',
    options: ['Visiting Hours', 'Contact Numbers', 'Back to Main Menu'],
  },

  'Insurance & Billing': {
    text:
      '💳 Insurance & Billing:\n\n' +
      'Accepted: All major TPA and insurance providers.\n' +
      'Cashless facility: Available for empanelled insurance companies.\n\n' +
      '📍 Billing Counter: Ground Floor, Building A\n' +
      '⏰ Mon–Sat: 8AM–8PM | 24/7 emergency billing\n\n' +
      '📞 Billing Helpline: 1800-123-4568 Ext. 400\n\n' +
      'For pre-authorization, contact your insurer with Hospital ID: CYH-001.',
    options: ['Contact Numbers', 'Admission / Discharge Process', 'Back to Main Menu'],
  },

  'Visiting Hours': {
    text:
      '🕐 Visiting Hours:\n\n' +
      'General Wards: 10AM–12PM & 5PM–7PM\n' +
      'Private Rooms: Flexible (within 8AM–9PM)\n' +
      'ICU / NICU: 10AM–11AM & 5PM–6PM (1 visitor only)\n' +
      'Pediatric Ward: Parents allowed 24/7\n\n' +
      '⚠️ Maximum 2 visitors per patient at a time.\n' +
      '🚫 Children under 12 not allowed in ICU or surgical wards.',
    options: ['ICU / Critical Care', 'Back to Main Menu'],
  },

  'Admission / Discharge Process': {
    text:
      '📋 Admission Process:\n' +
      "1. Obtain doctor's admission advice note\n" +
      '2. Report to Admission Desk, 1st Floor\n' +
      '3. Submit ID proof + insurance documents\n' +
      '4. Pay initial deposit (if applicable)\n\n' +
      '📋 Discharge Process:\n' +
      '1. Doctor issues discharge summary\n' +
      '2. Clear dues at Billing Counter\n' +
      '3. Collect medicines from pharmacy\n' +
      '4. Collect discharge summary & reports\n\n' +
      '⏰ Discharge time: Before 12PM to avoid extra charges.',
    options: ['Insurance & Billing', 'OPD & IPD Information', 'Back to Main Menu'],
  },

  'Health Packages & Checkups': {
    text:
      '🩺 Preventive Health Packages:\n\n' +
      '• Basic Health Checkup — ₹999 (15 tests)\n' +
      '• Executive Health Package — ₹2,499 (35 tests + ECG)\n' +
      '• Comprehensive Package — ₹4,999 (60 tests + imaging)\n' +
      '• Senior Citizen Package — ₹3,499 (40 tests)\n' +
      '• Cardiac Package — ₹3,999\n' +
      '• Diabetes Package — ₹1,499\n\n' +
      '📞 Book: 1800-123-4567 | 🌐 cityhospital.com/packages',
    options: ['Book / Cancel Appointment', 'Contact Numbers', 'Back to Main Menu'],
  },

  'Hospital Location & Directions': {
    text:
      '📍 City Hospital\n' +
      '123, Healthcare Avenue, Medical District\n' +
      'Cityville — 560001\n\n' +
      '🗺️ Landmark: Near Central Park, opposite Metro Station\n\n' +
      '🚇 Metro: Green Line — "Hospital Station" (500m walk)\n' +
      '🚌 Bus: Routes 42, 67, 110 stop at Hospital Gate\n' +
      '🚗 Parking: Basement (P1–P3), 200 spaces\n\n' +
      '🌐 Google Maps: cityhospital.com/location',
    options: ['Contact Numbers', 'Back to Main Menu'],
  },

  'Contact Numbers': {
    text:
      '📞 City Hospital — Key Contacts:\n\n' +
      '• Main Reception: 1800-123-4567\n' +
      '• Emergency: 108 / 1800-123-9999\n' +
      '• Ambulance: 1800-123-5678\n' +
      '• Blood Bank: 1800-123-6789\n' +
      '• Billing: 1800-123-4568 Ext. 400\n' +
      '• Lab Reports: 1800-123-4568 Ext. 500\n' +
      '• ICU Info: 1800-123-4568 Ext. 300\n' +
      '• Patient Relations: 1800-123-4568 Ext. 600\n\n' +
      '✉️ Email: info@cityhospital.com\n' +
      '🌐 Website: cityhospital.com',
    options: ['Back to Main Menu'],
  },

  FAQs: {
    text:
      'Frequently Asked Questions:\n\n' +
      'Q: Do I need an appointment for OPD?\n' +
      'A: Walk-ins accepted; appointments reduce wait time.\n\n' +
      'Q: Is parking free?\n' +
      'A: First 2 hours free; ₹20/hr thereafter.\n\n' +
      'Q: Do you accept health insurance?\n' +
      'A: Yes, all major insurers. See Insurance & Billing.\n\n' +
      'Q: Are reports available online?\n' +
      'A: Yes, at cityhospital.com/reports (SMS code given on collection).\n\n' +
      'Q: What are visiting hours?\n' +
      'A: See Visiting Hours for details.',
    options: ['Visiting Hours', 'Insurance & Billing', 'Contact Numbers', 'Back to Main Menu'],
  },

  'Health Tips': {
    text:
      '💡 Health Tips from City Hospital:\n\n' +
      '• Drink 8–10 glasses of water daily\n' +
      '• Exercise at least 30 minutes, 5 days a week\n' +
      '• Get 7–9 hours of sleep each night\n' +
      '• Eat a balanced diet rich in fruits and vegetables\n' +
      '• Avoid smoking and limit alcohol\n' +
      '• Schedule an annual health checkup\n' +
      '• Manage stress through mindfulness or yoga\n' +
      '• Wash hands frequently to prevent infections\n\n' +
      '🩺 For personalized advice, consult our doctors.',
    options: ['Health Packages & Checkups', 'Book / Cancel Appointment', 'Back to Main Menu'],
  },

  'Feedback / Complaints': {
    text:
      '📝 We value your feedback!\n\n' +
      '🌐 Online: cityhospital.com/feedback\n' +
      '📧 Email: feedback@cityhospital.com\n' +
      '📞 Patient Relations: 1800-123-4568 Ext. 600\n' +
      '📍 Suggestion box: Main Reception, Ground Floor\n\n' +
      '⚠️ For urgent complaints, contact Patient Relations Officer:\n' +
      '📞 1800-123-4568 Ext. 601\n\n' +
      'We respond to all feedback within 2 working days.',
    options: ['Contact Numbers', 'Back to Main Menu'],
  },

  'COVID / Health Screening': {
    text:
      '🦠 COVID & Health Screening:\n\n' +
      'COVID Testing:\n' +
      '• RT-PCR Test: Results in 24 hours\n' +
      '• Rapid Antigen Test: Results in 30 minutes\n' +
      '📍 Testing Center: Building D, Gate 4\n' +
      '⏰ Mon–Sat: 7AM–5PM\n\n' +
      'Health Screening:\n' +
      '• Temperature & oxygen check at all entrances\n' +
      '• Masks recommended inside the hospital\n\n' +
      '📞 COVID Helpline: 1800-123-26843',
    options: ['Lab Tests & Reports', 'Contact Numbers', 'Back to Main Menu'],
  },
}
