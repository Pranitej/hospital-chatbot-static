# Hospital Static Chatbot — Design Spec
**Date:** 2026-04-01  
**Stack:** React.js + Tailwind CSS  
**Type:** Static frontend only (no backend, no API)

---

## 1. Overview

A production-ready static hospital chatbot built as a single-page React app. The chatbot uses a menu-driven (button/option) approach where users click prewritten options to get responses. All conversation flows are defined in a single data file. No user authentication, no server, no database.

---

## 2. Architecture

### Folder Structure

```
src/
├── components/
│   └── Chat/
│       ├── ChatWidget.jsx        # Floating button + open/close toggle
│       ├── ChatWindow.jsx        # Chat panel: header, message list, input area
│       ├── MessageBubble.jsx     # Individual bot/user message with timestamp
│       ├── OptionButtons.jsx     # Row of clickable option buttons
│       └── TypingIndicator.jsx   # Animated "bot is typing..." dots
├── hooks/
│   └── useChat.js                # All chat state and logic
├── data/
│   └── chatData.js               # All prewritten flows and responses
├── constants/
│   └── index.js                  # SENDER, MESSAGE_TYPE enums
├── utils/
│   └── chatHelpers.js            # Pure helper functions
├── App.jsx
└── index.css
docs/
└── superpowers/specs/
    └── 2026-04-01-hospital-chatbot-design.md
```

### Data Flow

1. App loads → bot sends welcome message + main menu buttons
2. User clicks a button → choice appears as a user bubble
3. Bot shows typing indicator (300–600ms delay) → then replies
4. Reply contains info text + sub-options OR "Back to Main Menu" button
5. All responses resolved from `chatData.js` — zero network requests

---

## 3. Components

### `ChatWidget.jsx`
- Renders a fixed floating button (bottom-right corner)
- Hospital logo/icon on the button
- Clicking toggles `ChatWindow` open/closed
- Shows unread dot indicator when closed and bot has sent a message

### `ChatWindow.jsx`
- Fixed-size panel (e.g. 380px × 520px) anchored above the widget button
- Header: hospital name, bot avatar, "Online" status, close button
- Scrollable message list (auto-scrolls to latest)
- Footer: "Powered by [Hospital Name]" branding

### `MessageBubble.jsx`
- Props: `sender` (bot | user), `text`, `timestamp`
- Bot bubbles: left-aligned, light gray background, bot avatar
- User bubbles: right-aligned, hospital primary color background
- Timestamp shown in small text below each bubble

### `OptionButtons.jsx`
- Renders a list of buttons from the current menu options
- Buttons disabled after one is selected (prevents duplicate clicks)
- Horizontally wrapping flex layout

### `TypingIndicator.jsx`
- Three animated dots (CSS keyframe animation)
- Shown while bot "processes" response
- Auto-hides when bot message arrives

---

## 4. State Management (`useChat.js`)

All state lives in a single custom hook. Components receive state and handlers as props.

```js
// State shape
{
  messages: [{ id, sender, text, timestamp, options }],
  isOpen: boolean,
  isTyping: boolean,
  currentMenu: string   // e.g. "main", "appointments", "doctors"
}
```

**Handlers:**
- `handleOptionClick(optionKey)` — adds user message, triggers bot reply
- `toggleChat()` — open/close the widget
- `resetChat()` — return to main menu

**Bot reply logic:**
1. Add user bubble immediately
2. Set `isTyping: true`
3. After 400ms delay, resolve response from `chatData.js`
4. Set `isTyping: false`, add bot bubble with next options

---

## 5. Data Structure (`chatData.js`)

```js
export const chatData = {
  welcome: {
    text: "Hello! Welcome to City Hospital. How can I help you today?",
    options: ["Book Appointment", "Find a Doctor", "Departments", "Emergency", ...]
  },
  bookAppointment: {
    text: "You can book an appointment by calling 1800-XXX-XXXX or visiting our OPD counter (Mon–Sat, 8AM–6PM).",
    options: ["Back to Main Menu", "Contact Numbers"]
  },
  findDoctor: {
    text: "We have specialists across 20+ departments. Please choose a specialty:",
    options: ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "Back to Main Menu"]
  },
  // ... all other flows
}
```

---

## 6. Hospital Chat Flows

### Main Menu Options
1. Book / Cancel Appointment
2. Find a Doctor
3. Departments & Specialties
4. Emergency Services
5. OPD & IPD Information
6. Lab Tests & Reports
7. Pharmacy Information
8. Ambulance Services
9. Blood Bank
10. ICU / Critical Care
11. Insurance & Billing
12. Visiting Hours
13. Admission / Discharge Process
14. Health Packages & Checkups
15. Hospital Location & Directions
16. Contact Numbers
17. FAQs
18. Health Tips
19. Feedback / Complaints
20. COVID / Health Screening

Each top-level option leads to an info response + relevant sub-options + "Back to Main Menu".

---

## 7. Styling (Tailwind CSS)

- **Primary color:** Blue (`blue-600` / `blue-700`) — hospital trust color
- **Accent:** Green (`green-500`) — for online status, success states
- **Background:** White with light gray (`gray-50`) message area
- **Font:** System default via Tailwind (clean, readable)
- **Widget button:** 56px circle, shadow-lg, blue background, white icon
- **Chat panel:** Rounded corners (`rounded-2xl`), drop shadow, white background
- **Responsive:** Panel adjusts on mobile (full-screen on small viewports)

---

## 8. Accessibility

- All buttons have `aria-label` attributes
- Chat panel has `role="dialog"` and `aria-labelledby`
- Option buttons are keyboard-navigable (`Tab` + `Enter`)
- Color contrast meets WCAG AA standards
- Auto-scroll uses `aria-live="polite"` on message list

---

## 9. Performance

- No external dependencies beyond React + Tailwind
- Messages array capped at 100 entries (oldest trimmed)
- Components memoized with `React.memo` where appropriate
- `useCallback` on event handlers in `useChat.js`
- Typing delay uses `setTimeout` cleaned up with `useEffect` return

---

## 10. Out of Scope

- Backend / API integration
- Real appointment booking
- User authentication
- Multilingual support
- Analytics / logging
- Persistent chat history (localStorage)
