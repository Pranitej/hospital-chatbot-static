# Hospital Static Chatbot — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static hospital chatbot as a single-page React app with Tailwind CSS using menu-driven button/option conversation flows defined entirely in `chatData.js`.

**Architecture:** All chat state lives in `useChat.js` (custom hook). Components are pure display units receiving state and handlers as props. Conversation flows resolve from `chatData.js` via `chatHelpers.js` with zero network requests. `App` renders a single `ChatWidget` which toggles a `ChatWindow`.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v3, Vitest, React Testing Library

---

## File Map

| File | Responsibility |
|------|---------------|
| `vite.config.js` | Vite + Vitest configuration |
| `tailwind.config.js` | Tailwind content paths |
| `postcss.config.js` | PostCSS with Tailwind and autoprefixer |
| `src/index.css` | Tailwind directives |
| `src/test/setup.js` | Jest-DOM matchers setup |
| `src/constants/index.js` | `SENDER` and `MESSAGE_TYPE` enums |
| `src/data/chatData.js` | All 20+ conversation flows (display-string keys) |
| `src/utils/chatHelpers.js` | `getResponse`, `formatTimestamp`, `generateId` |
| `src/hooks/useChat.js` | `messages`, `isOpen`, `isTyping`, `hasUnread`, handlers |
| `src/components/Chat/TypingIndicator.jsx` | Animated 3-dot typing indicator |
| `src/components/Chat/MessageBubble.jsx` | Single message bubble (bot or user) |
| `src/components/Chat/OptionButtons.jsx` | Row of menu option buttons |
| `src/components/Chat/ChatWindow.jsx` | Chat panel: header, messages, typing indicator, footer |
| `src/components/Chat/ChatWidget.jsx` | Floating button + ChatWindow toggle + unread dot |
| `src/App.jsx` | Root component: instantiates `useChat`, renders `ChatWidget` |

> **chatData key convention:** Option strings in each flow's `options` array are also keys in `chatData`. The magic string `"Back to Main Menu"` routes back to `chatData.welcome` via `getResponse`.

---

### Task 1: Project Scaffold

**Files:**
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/index.css`
- Create: `src/test/setup.js`
- Modify: `package.json`

- [ ] **Step 1: Initialize Vite React project**

Run from `d:\Study\MERN\Chatbot-Static`:
```bash
npm create vite@latest . -- --template react
```
When prompted about the non-empty directory, select **"Ignore files and continue"**.

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind content paths**

Replace `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

- [ ] **Step 4: Configure Vitest in vite.config.js**

Replace `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] **Step 5: Create test setup file**

Create `src/test/setup.js`:
```js
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Replace src/index.css with Tailwind directives**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}
```

- [ ] **Step 7: Add test scripts to package.json**

In `package.json`, add to the `"scripts"` section:
```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 8: Clean up default Vite boilerplate**

Delete `src/App.css`. Delete `src/assets/react.svg` if present. Delete `public/vite.svg` if present.

Replace `src/App.jsx` with a minimal placeholder:
```jsx
export default function App() {
  return <div>Hospital Chatbot</div>
}
```

- [ ] **Step 9: Verify setup**

```bash
npm run dev
```
Expected: Vite dev server starts, browser shows "Hospital Chatbot".

```bash
npm run test:run
```
Expected: exits cleanly (no test files found is fine at this stage).

- [ ] **Step 10: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Vite React + Tailwind CSS + Vitest project"
```

---

### Task 2: Constants

**Files:**
- Create: `src/constants/index.js`

- [ ] **Step 1: Create constants**

Create `src/constants/index.js`:
```js
export const SENDER = {
  BOT: 'bot',
  USER: 'user',
}

export const MESSAGE_TYPE = {
  TEXT: 'text',
  OPTIONS: 'options',
}
```

- [ ] **Step 2: Commit**

```bash
git add src/constants/index.js
git commit -m "feat: add SENDER and MESSAGE_TYPE constants"
```

---

### Task 3: Chat Data

**Files:**
- Create: `src/data/chatData.js`

- [ ] **Step 1: Create chatData.js with all 20 flows**

Create `src/data/chatData.js`:
```js
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
```

- [ ] **Step 2: Commit**

```bash
git add src/data/chatData.js
git commit -m "feat: add chatData with all 20 hospital conversation flows"
```

---

### Task 4: Chat Helpers

**Files:**
- Create: `src/utils/chatHelpers.js`
- Create: `src/utils/chatHelpers.test.js`

- [ ] **Step 1: Write failing tests**

Create `src/utils/chatHelpers.test.js`:
```js
import { describe, it, expect } from 'vitest'
import { getResponse, formatTimestamp, generateId } from './chatHelpers'
import { chatData } from '../data/chatData'

describe('getResponse', () => {
  it('returns welcome data for "Back to Main Menu"', () => {
    expect(getResponse('Back to Main Menu')).toEqual(chatData.welcome)
  })

  it('returns matching flow for a known option key', () => {
    expect(getResponse('Contact Numbers')).toEqual(chatData['Contact Numbers'])
  })

  it('falls back to welcome for unknown keys', () => {
    expect(getResponse('Unknown Key XYZ')).toEqual(chatData.welcome)
  })
})

describe('formatTimestamp', () => {
  it('returns a non-empty string', () => {
    const result = formatTimestamp(new Date('2026-01-01T10:30:00'))
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('uses current time when no argument is passed', () => {
    const result = formatTimestamp()
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('generateId', () => {
  it('returns a string starting with "msg-"', () => {
    expect(generateId()).toMatch(/^msg-/)
  })

  it('returns unique ids on consecutive calls', () => {
    const a = generateId()
    const b = generateId()
    expect(a).not.toBe(b)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/utils/chatHelpers.test.js
```
Expected: FAIL — "Cannot find module './chatHelpers'"

- [ ] **Step 3: Implement chatHelpers.js**

Create `src/utils/chatHelpers.js`:
```js
import { chatData } from '../data/chatData'

export function getResponse(optionKey) {
  if (optionKey === 'Back to Main Menu') return chatData.welcome
  return chatData[optionKey] ?? chatData.welcome
}

export function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export function generateId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- src/utils/chatHelpers.test.js
```
Expected: PASS — 7 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/utils/chatHelpers.js src/utils/chatHelpers.test.js
git commit -m "feat: add chatHelpers (getResponse, formatTimestamp, generateId)"
```

---

### Task 5: useChat Hook

**Files:**
- Create: `src/hooks/useChat.js`
- Create: `src/hooks/useChat.test.js`

- [ ] **Step 1: Write failing tests**

Create `src/hooks/useChat.test.js`:
```js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useChat } from './useChat'
import { SENDER } from '../constants'
import { chatData } from '../data/chatData'

describe('useChat', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('initializes with welcome bot message, isOpen false, isTyping false', () => {
    const { result } = renderHook(() => useChat())
    expect(result.current.isOpen).toBe(false)
    expect(result.current.isTyping).toBe(false)
    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].sender).toBe(SENDER.BOT)
    expect(result.current.messages[0].text).toBe(chatData.welcome.text)
    expect(result.current.messages[0].options).toEqual(chatData.welcome.options)
  })

  it('toggleChat flips isOpen', () => {
    const { result } = renderHook(() => useChat())
    act(() => result.current.toggleChat())
    expect(result.current.isOpen).toBe(true)
    act(() => result.current.toggleChat())
    expect(result.current.isOpen).toBe(false)
  })

  it('handleOptionClick adds user message immediately', () => {
    const { result } = renderHook(() => useChat())
    act(() => result.current.handleOptionClick('Contact Numbers'))
    expect(result.current.messages).toHaveLength(2)
    expect(result.current.messages[1].sender).toBe(SENDER.USER)
    expect(result.current.messages[1].text).toBe('Contact Numbers')
  })

  it('handleOptionClick sets isTyping true then adds bot reply after 400ms', () => {
    const { result } = renderHook(() => useChat())
    act(() => result.current.handleOptionClick('Contact Numbers'))
    expect(result.current.isTyping).toBe(true)
    act(() => vi.advanceTimersByTime(400))
    expect(result.current.isTyping).toBe(false)
    expect(result.current.messages).toHaveLength(3)
    expect(result.current.messages[2].sender).toBe(SENDER.BOT)
    expect(result.current.messages[2].text).toBe(chatData['Contact Numbers'].text)
  })

  it('resetChat returns to single welcome message', () => {
    const { result } = renderHook(() => useChat())
    act(() => result.current.handleOptionClick('Contact Numbers'))
    act(() => vi.advanceTimersByTime(400))
    act(() => result.current.resetChat())
    expect(result.current.messages).toHaveLength(1)
    expect(result.current.messages[0].text).toBe(chatData.welcome.text)
    expect(result.current.isTyping).toBe(false)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/hooks/useChat.test.js
```
Expected: FAIL — "Cannot find module './useChat'"

- [ ] **Step 3: Implement useChat.js**

Create `src/hooks/useChat.js`:
```js
import { useState, useCallback, useEffect, useRef } from 'react'
import { SENDER } from '../constants'
import { chatData } from '../data/chatData'
import { getResponse, formatTimestamp, generateId } from '../utils/chatHelpers'

function makeMessage(sender, text, options = []) {
  return { id: generateId(), sender, text, timestamp: formatTimestamp(), options }
}

export function useChat() {
  const [messages, setMessages] = useState(() => [
    makeMessage(SENDER.BOT, chatData.welcome.text, chatData.welcome.options),
  ])
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const toggleChat = useCallback(() => setIsOpen((prev) => !prev), [])

  const handleOptionClick = useCallback((optionKey) => {
    const userMsg = makeMessage(SENDER.USER, optionKey)
    setMessages((prev) => {
      const next = [...prev, userMsg]
      return next.length > 100 ? next.slice(-100) : next
    })
    setIsTyping(true)
    timerRef.current = setTimeout(() => {
      const response = getResponse(optionKey)
      const botMsg = makeMessage(SENDER.BOT, response.text, response.options)
      setMessages((prev) => {
        const next = [...prev, botMsg]
        return next.length > 100 ? next.slice(-100) : next
      })
      setIsTyping(false)
    }, 400)
  }, [])

  const resetChat = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsTyping(false)
    setMessages([makeMessage(SENDER.BOT, chatData.welcome.text, chatData.welcome.options)])
  }, [])

  return { messages, isOpen, isTyping, toggleChat, handleOptionClick, resetChat }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- src/hooks/useChat.test.js
```
Expected: PASS — 5 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useChat.js src/hooks/useChat.test.js
git commit -m "feat: add useChat hook with message state and 400ms bot reply logic"
```

---

### Task 6: TypingIndicator Component

**Files:**
- Create: `src/components/Chat/TypingIndicator.jsx`
- Create: `src/components/Chat/TypingIndicator.test.jsx`

- [ ] **Step 1: Write failing test**

Create `src/components/Chat/TypingIndicator.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TypingIndicator from './TypingIndicator'

describe('TypingIndicator', () => {
  it('renders three animated dots', () => {
    const { container } = render(<TypingIndicator />)
    const dots = container.querySelectorAll('[data-testid="typing-dot"]')
    expect(dots).toHaveLength(3)
  })

  it('has accessible status role', () => {
    render(<TypingIndicator />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- src/components/Chat/TypingIndicator.test.jsx
```
Expected: FAIL

- [ ] **Step 3: Implement TypingIndicator.jsx**

Create `src/components/Chat/TypingIndicator.jsx`:
```jsx
export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 px-4 py-1">
      <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
        <span className="text-xs">🏥</span>
      </div>
      <div
        role="status"
        aria-label="Bot is typing"
        className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            data-testid="typing-dot"
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm run test:run -- src/components/Chat/TypingIndicator.test.jsx
```
Expected: PASS — 2 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/components/Chat/TypingIndicator.jsx src/components/Chat/TypingIndicator.test.jsx
git commit -m "feat: add TypingIndicator component"
```

---

### Task 7: MessageBubble Component

**Files:**
- Create: `src/components/Chat/MessageBubble.jsx`
- Create: `src/components/Chat/MessageBubble.test.jsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/Chat/MessageBubble.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MessageBubble from './MessageBubble'
import { SENDER } from '../../constants'

describe('MessageBubble', () => {
  it('renders bot message text', () => {
    render(<MessageBubble sender={SENDER.BOT} text="Hello from bot" timestamp="10:00 AM" />)
    expect(screen.getByText('Hello from bot')).toBeInTheDocument()
  })

  it('renders user message text', () => {
    render(<MessageBubble sender={SENDER.USER} text="User reply" timestamp="10:01 AM" />)
    expect(screen.getByText('User reply')).toBeInTheDocument()
  })

  it('renders timestamp', () => {
    render(<MessageBubble sender={SENDER.BOT} text="Hi" timestamp="09:45 AM" />)
    expect(screen.getByText('09:45 AM')).toBeInTheDocument()
  })

  it('bot bubble includes bot avatar', () => {
    const { container } = render(
      <MessageBubble sender={SENDER.BOT} text="Hi" timestamp="10:00 AM" />
    )
    expect(container.querySelector('[data-testid="bot-avatar"]')).toBeInTheDocument()
  })

  it('user bubble does not include bot avatar', () => {
    const { container } = render(
      <MessageBubble sender={SENDER.USER} text="Hi" timestamp="10:00 AM" />
    )
    expect(container.querySelector('[data-testid="bot-avatar"]')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/components/Chat/MessageBubble.test.jsx
```
Expected: FAIL

- [ ] **Step 3: Implement MessageBubble.jsx**

Create `src/components/Chat/MessageBubble.jsx`:
```jsx
import { SENDER } from '../../constants'

export default function MessageBubble({ sender, text, timestamp }) {
  const isBot = sender === SENDER.BOT

  return (
    <div className={`flex items-start gap-2 px-4 py-1 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div
          data-testid="bot-avatar"
          className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0"
        >
          <span className="text-xs text-white">🏥</span>
        </div>
      )}
      <div className={`max-w-[75%] flex flex-col ${isBot ? '' : 'items-end'}`}>
        <div
          className={
            isBot
              ? 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2 text-sm whitespace-pre-wrap'
              : 'bg-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm'
          }
        >
          {text}
        </div>
        <span className="text-xs text-gray-400 mt-1 px-1">{timestamp}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- src/components/Chat/MessageBubble.test.jsx
```
Expected: PASS — 5 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/components/Chat/MessageBubble.jsx src/components/Chat/MessageBubble.test.jsx
git commit -m "feat: add MessageBubble component"
```

---

### Task 8: OptionButtons Component

**Files:**
- Create: `src/components/Chat/OptionButtons.jsx`
- Create: `src/components/Chat/OptionButtons.test.jsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/Chat/OptionButtons.test.jsx`:
```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import OptionButtons from './OptionButtons'

const options = ['Book Appointment', 'Find a Doctor', 'Back to Main Menu']

describe('OptionButtons', () => {
  it('renders all option buttons', () => {
    render(<OptionButtons options={options} onSelect={vi.fn()} disabled={false} />)
    options.forEach((opt) => expect(screen.getByText(opt)).toBeInTheDocument())
  })

  it('calls onSelect with the option text when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<OptionButtons options={options} onSelect={onSelect} disabled={false} />)
    await user.click(screen.getByText('Find a Doctor'))
    expect(onSelect).toHaveBeenCalledWith('Find a Doctor')
  })

  it('buttons are disabled when disabled prop is true', () => {
    render(<OptionButtons options={options} onSelect={vi.fn()} disabled={true} />)
    options.forEach((opt) => expect(screen.getByText(opt)).toBeDisabled())
  })

  it('renders nothing when options array is empty', () => {
    const { container } = render(<OptionButtons options={[]} onSelect={vi.fn()} disabled={false} />)
    expect(container.firstChild).toBeNull()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/components/Chat/OptionButtons.test.jsx
```
Expected: FAIL

- [ ] **Step 3: Implement OptionButtons.jsx**

Create `src/components/Chat/OptionButtons.jsx`:
```jsx
export default function OptionButtons({ options, onSelect, disabled }) {
  if (!options || options.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          disabled={disabled}
          aria-label={option}
          className="text-sm border border-blue-300 text-blue-700 rounded-full px-3 py-1.5 hover:bg-blue-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {option}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- src/components/Chat/OptionButtons.test.jsx
```
Expected: PASS — 4 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/components/Chat/OptionButtons.jsx src/components/Chat/OptionButtons.test.jsx
git commit -m "feat: add OptionButtons component"
```

---

### Task 9: ChatWindow Component

**Files:**
- Create: `src/components/Chat/ChatWindow.jsx`
- Create: `src/components/Chat/ChatWindow.test.jsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/Chat/ChatWindow.test.jsx`:
```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatWindow from './ChatWindow'
import { SENDER } from '../../constants'

const defaultProps = {
  messages: [
    {
      id: 'msg-1',
      sender: SENDER.BOT,
      text: 'Hello from bot',
      timestamp: '10:00 AM',
      options: ['Option A', 'Option B'],
    },
  ],
  isTyping: false,
  onOptionClick: vi.fn(),
  onClose: vi.fn(),
  onReset: vi.fn(),
}

describe('ChatWindow', () => {
  it('renders the hospital name in the header', () => {
    render(<ChatWindow {...defaultProps} />)
    expect(screen.getByText('City Hospital')).toBeInTheDocument()
  })

  it('renders bot message text', () => {
    render(<ChatWindow {...defaultProps} />)
    expect(screen.getByText('Hello from bot')).toBeInTheDocument()
  })

  it('renders option buttons for the last bot message', () => {
    render(<ChatWindow {...defaultProps} />)
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('shows TypingIndicator when isTyping is true', () => {
    render(<ChatWindow {...defaultProps} isTyping={true} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<ChatWindow {...defaultProps} onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: /close chat/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('has role="dialog" on the panel', () => {
    render(<ChatWindow {...defaultProps} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/components/Chat/ChatWindow.test.jsx
```
Expected: FAIL

- [ ] **Step 3: Implement ChatWindow.jsx**

Create `src/components/Chat/ChatWindow.jsx`:
```jsx
import { useEffect, useRef, memo } from 'react'
import { SENDER } from '../../constants'
import MessageBubble from './MessageBubble'
import OptionButtons from './OptionButtons'
import TypingIndicator from './TypingIndicator'

const ChatWindow = memo(function ChatWindow({ messages, isTyping, onOptionClick, onClose, onReset }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const lastBotMsgIndex = messages.reduce(
    (acc, msg, i) => (msg.sender === SENDER.BOT ? i : acc),
    -1
  )

  return (
    <div
      role="dialog"
      aria-labelledby="chat-header-title"
      className="flex flex-col w-screen h-screen sm:w-[380px] sm:h-[520px] bg-white sm:rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-blue-600 px-4 py-3 flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
          <span className="text-lg">🏥</span>
        </div>
        <div className="flex-1">
          <h2 id="chat-header-title" className="text-white font-semibold text-sm">
            City Hospital
          </h2>
          <p className="text-green-300 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
            Online
          </p>
        </div>
        <button
          onClick={onReset}
          aria-label="Restart chat"
          className="text-white/70 hover:text-white text-sm mr-2"
        >
          ↺
        </button>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="text-white/70 hover:text-white text-lg leading-none"
        >
          ✕
        </button>
      </div>

      {/* Message list */}
      <div
        className="flex-1 overflow-y-auto py-3 bg-gray-50"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((msg, index) => (
          <div key={msg.id}>
            <MessageBubble sender={msg.sender} text={msg.text} timestamp={msg.timestamp} />
            {msg.sender === SENDER.BOT && msg.options?.length > 0 && (
              <OptionButtons
                options={msg.options}
                onSelect={onOptionClick}
                disabled={index !== lastBotMsgIndex || isTyping}
              />
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-2 bg-white border-t border-gray-100 flex-shrink-0">
        Powered by City Hospital
      </div>
    </div>
  )
})

export default ChatWindow
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- src/components/Chat/ChatWindow.test.jsx
```
Expected: PASS — 6 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/components/Chat/ChatWindow.jsx src/components/Chat/ChatWindow.test.jsx
git commit -m "feat: add ChatWindow component with accessible dialog and auto-scroll"
```

---

### Task 10: ChatWidget Component

**Files:**
- Create: `src/components/Chat/ChatWidget.jsx`
- Create: `src/components/Chat/ChatWidget.test.jsx`

- [ ] **Step 1: Write failing tests**

Create `src/components/Chat/ChatWidget.test.jsx`:
```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatWidget from './ChatWidget'
import { SENDER } from '../../constants'

const baseProps = {
  messages: [
    { id: 'msg-1', sender: SENDER.BOT, text: 'Hello', timestamp: '10:00 AM', options: [] },
  ],
  isOpen: false,
  isTyping: false,
  onToggle: vi.fn(),
  onOptionClick: vi.fn(),
  onReset: vi.fn(),
}

describe('ChatWidget', () => {
  it('renders the floating toggle button', () => {
    render(<ChatWidget {...baseProps} />)
    expect(screen.getByRole('button', { name: /open chat/i })).toBeInTheDocument()
  })

  it('does not render ChatWindow when isOpen is false', () => {
    render(<ChatWidget {...baseProps} isOpen={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders ChatWindow when isOpen is true', () => {
    render(<ChatWidget {...baseProps} isOpen={true} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('calls onToggle when floating button is clicked', async () => {
    const user = userEvent.setup()
    const onToggle = vi.fn()
    render(<ChatWidget {...baseProps} onToggle={onToggle} />)
    await user.click(screen.getByRole('button', { name: /open chat/i }))
    expect(onToggle).toHaveBeenCalledOnce()
  })

  it('shows unread dot when chat is closed and there are replies beyond welcome', () => {
    const propsWithReplies = {
      ...baseProps,
      isOpen: false,
      messages: [
        { id: 'msg-1', sender: SENDER.BOT, text: 'Hello', timestamp: '10:00 AM', options: [] },
        { id: 'msg-2', sender: SENDER.USER, text: 'Find a Doctor', timestamp: '10:01 AM', options: [] },
        { id: 'msg-3', sender: SENDER.BOT, text: 'Here are specialties', timestamp: '10:01 AM', options: [] },
      ],
    }
    const { container } = render(<ChatWidget {...propsWithReplies} />)
    expect(container.querySelector('[data-testid="unread-dot"]')).toBeInTheDocument()
  })

  it('does not show unread dot when chat is open', () => {
    const propsWithReplies = {
      ...baseProps,
      isOpen: true,
      messages: [
        { id: 'msg-1', sender: SENDER.BOT, text: 'Hello', timestamp: '10:00 AM', options: [] },
        { id: 'msg-2', sender: SENDER.USER, text: 'Hi', timestamp: '10:01 AM', options: [] },
        { id: 'msg-3', sender: SENDER.BOT, text: 'Reply', timestamp: '10:01 AM', options: [] },
      ],
    }
    const { container } = render(<ChatWidget {...propsWithReplies} />)
    expect(container.querySelector('[data-testid="unread-dot"]')).not.toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test:run -- src/components/Chat/ChatWidget.test.jsx
```
Expected: FAIL

- [ ] **Step 3: Implement ChatWidget.jsx**

Create `src/components/Chat/ChatWidget.jsx`:
```jsx
import { memo } from 'react'
import ChatWindow from './ChatWindow'

const ChatWidget = memo(function ChatWidget({
  messages,
  isOpen,
  isTyping,
  onToggle,
  onOptionClick,
  onReset,
}) {
  const hasUnread = !isOpen && messages.length > 1

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      {isOpen && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onOptionClick={onOptionClick}
          onClose={onToggle}
          onReset={onReset}
        />
      )}
      <div className="relative">
        {hasUnread && (
          <span
            data-testid="unread-dot"
            className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white z-10"
          />
        )}
        <button
          onClick={onToggle}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center text-white text-2xl transition-colors"
        >
          {isOpen ? '✕' : '🏥'}
        </button>
      </div>
    </div>
  )
})

export default ChatWidget
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm run test:run -- src/components/Chat/ChatWidget.test.jsx
```
Expected: PASS — 6 tests passed

- [ ] **Step 5: Commit**

```bash
git add src/components/Chat/ChatWidget.jsx src/components/Chat/ChatWidget.test.jsx
git commit -m "feat: add ChatWidget with floating button and unread indicator"
```

---

### Task 11: Wire Up App.jsx + Full Test Run

**Files:**
- Modify: `src/App.jsx`
- Create: `src/App.test.jsx`

- [ ] **Step 1: Write App integration test**

Create `src/App.test.jsx`:
```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App integration', () => {
  it('renders the floating chat button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /open chat/i })).toBeInTheDocument()
  })

  it('opens ChatWindow when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /open chat/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('City Hospital')).toBeInTheDocument()
  })

  it('shows welcome message when chat is opened', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /open chat/i }))
    expect(
      screen.getByText('Hello! Welcome to City Hospital. How can I help you today?')
    ).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test:run -- src/App.test.jsx
```
Expected: FAIL (App renders placeholder text)

- [ ] **Step 3: Implement App.jsx**

Replace `src/App.jsx`:
```jsx
import ChatWidget from './components/Chat/ChatWidget'
import { useChat } from './hooks/useChat'

export default function App() {
  const { messages, isOpen, isTyping, toggleChat, handleOptionClick, resetChat } = useChat()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
      <div className="text-center select-none">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">City Hospital</h1>
        <p className="text-gray-500 text-sm">Click the chat button to get started.</p>
      </div>
      <ChatWidget
        messages={messages}
        isOpen={isOpen}
        isTyping={isTyping}
        onToggle={toggleChat}
        onOptionClick={handleOptionClick}
        onReset={resetChat}
      />
    </div>
  )
}
```

- [ ] **Step 4: Run App test to verify it passes**

```bash
npm run test:run -- src/App.test.jsx
```
Expected: PASS — 3 tests passed

- [ ] **Step 5: Run full test suite**

```bash
npm run test:run
```
Expected: All tests pass across all test files (0 failures).

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```
Open `http://localhost:5173`. Manually verify:
- Page shows "City Hospital" heading with gradient background
- Floating 🏥 button visible in bottom-right corner
- Clicking button opens chat panel (or full-screen on mobile)
- Welcome message and 20 option buttons are displayed
- Clicking an option shows the user bubble, typing dots, then bot response
- Previous option row becomes disabled after selection
- "Back to Main Menu" returns to the full 20-option welcome menu
- ↺ button resets the conversation
- Unread red dot appears on the widget button after a reply when chat is closed

- [ ] **Step 7: Final commit**

```bash
git add src/App.jsx src/App.test.jsx
git commit -m "feat: wire up App with useChat — hospital chatbot complete"
```

---

## Self-Review

**Spec coverage:**
| Spec section | Covered by |
|---|---|
| 1 — Overview: static SPA, menu-driven, chatData | Tasks 3, 5, 11 |
| 2 — Architecture: folder structure, data flow | All tasks follow the spec's file map |
| 3 — ChatWidget, ChatWindow, MessageBubble, OptionButtons, TypingIndicator | Tasks 6–10 |
| 4 — useChat state shape + handlers | Task 5 |
| 5 — chatData structure | Task 3 |
| 6 — All 20 main menu options | Task 3 (all 20 + 6 specialty sub-flows) |
| 7 — Tailwind: blue-600, gray-50, rounded-2xl, mobile responsive | Tasks 6–11 |
| 8 — Accessibility: aria-label, role="dialog", aria-labelledby, aria-live | Tasks 9–10 |
| 9 — Performance: 100-message cap, React.memo, useCallback, timer cleanup | Tasks 5, 9, 10 |
| 10 — Out of scope | Nothing from this section was added |

**Placeholder scan:** No TBDs, TODOs, or incomplete steps found.

**Type/name consistency:**
- `handleOptionClick` (useChat) → `onOptionClick` prop (ChatWidget/ChatWindow) — App maps them ✅
- `toggleChat` (useChat) → `onToggle` prop (ChatWidget) ✅
- `resetChat` (useChat) → `onReset` prop (ChatWidget/ChatWindow) ✅
- `SENDER.BOT` / `SENDER.USER` used identically across MessageBubble, useChat, ChatWindow, tests ✅
- `makeMessage` is internal to useChat, not exported or referenced elsewhere ✅
- `data-testid="bot-avatar"` defined in MessageBubble, queried in MessageBubble test ✅
- `data-testid="typing-dot"` defined in TypingIndicator, queried in TypingIndicator test ✅
- `data-testid="unread-dot"` defined in ChatWidget, queried in ChatWidget test ✅
