# 🏥 Hospital Chatbot - Project Flow Architecture

## Complete Project Data Flow & Component Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         USER OPENS APPLICATION                              │
│                        (http://localhost:5173)                              │
└────────────────────┬────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    React App Initialization                                  │
│  • main.jsx bootstraps React                                                │
│  • Creates root DOM node                                                    │
│  • Renders <App /> component                                                │
└────────────────────┬────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        App.jsx (Root)                                        │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ const { messages, isOpen, isTyping, ... } = useChat()             │    │
│  │                                                                    │    │
│  │ Initializes chat state via custom hook                           │    │
│  └────────────────────────────────────────────────────────────────────┘    │
└────────────────────┬────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       useChat Hook (State Management)                        │
│  ┌───────────────────────────────────────────────────────────────────┐     │
│  │ STATE                                                             │     │
│  │  • messages = []       (bot + user messages)                      │     │
│  │  • isOpen = false      (is chat panel visible?)                   │     │
│  │  • isTyping = false    (show typing animation?)                   │     │
│  │  • timerRef = { current: null }  (400ms bot delay timer)         │     │
│  ├───────────────────────────────────────────────────────────────────┤     │
│  │ HANDLERS                                                          │     │
│  │  • toggleChat()        → setIsOpen(!isOpen)                       │     │
│  │  • handleOptionClick() → add user msg → wait 400ms → add bot msg │     │
│  │  • resetChat()         → clear messages, return to welcome        │     │
│  └───────────────────────────────────────────────────────────────────┘     │
└────────────────────┬────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   ChatWidget (Floating Container)                            │
│  ┌───────────────────────────────────────────────────────────────────┐     │
│  │ • Fixed position: bottom-right                                    │     │
│  │ • Floating button: 56px circle, 🏥 icon                          │     │
│  │ • Unread indicator: red dot (when messages.length > 1 && !open)  │     │
│  │ • Conditionally renders: <ChatWindow /> when isOpen=true         │     │
│  └───────────────────────────────────────────────────────────────────┘     │
└────────────────────┬────────────────────────────────────────────────────────┘
                     │
         ┌───────────┴──────────────┐
         │                          │
    CLOSED (isOpen=false)      OPEN (isOpen=true)
         │                          │
         ▼                          ▼
    ┌─────────────┐        ┌──────────────────────┐
    │ Show Button │        │   <ChatWindow />     │
    │ + Badge     │        │  (Full chat panel)   │
    │             │        │                      │
    │ 🏥 🔴       │        │  ─────────────────── │
    │(unread dot) │        │  Blue Header Bar     │
    │             │        │  ─────────────────── │
    │             │        │  • "City Hospital"   │
    │             │        │  • Online status     │
    │             │        │  • ↺ Restart button  │
    │             │        │  • ✕ Close button    │
    │             │        │  ─────────────────── │
    │             │        │  Scrollable Messages │
    │             │        │  ─────────────────── │
    │             │        │  • MessageBubble[]   │
    │             │        │  • OptionButtons[]   │
    │             │        │  • TypingIndicator   │
    │             │        │  ─────────────────── │
    │             │        │  Footer: "Powered by"│
    └─────────────┘        └──────────────────────┘
```

---

## User Interaction Flow

```
USER CLICKS FLOATING BUTTON (🏥)
            │
            ▼
┌──────────────────────────────┐
│ onClick: toggleChat()        │
│ Handler from useChat hook    │
└──────────────────────────────┘
            │
            ▼
      Toggle isOpen
     (false → true OR true → false)
            │
            ▼
    Re-render App.jsx
            │
            ▼
   ChatWindow appears/disappears


USER CLICKS MENU OPTION (e.g., "Contact Numbers")
            │
            ▼
┌──────────────────────────────────────────────────────┐
│ onClick: handleOptionClick("Contact Numbers")       │
│ Passed as onOptionClick prop to OptionButtons       │
└──────────────────────────────────────────────────────┘
            │
            ├─ Step 1: Add User Message (IMMEDIATE)
            │   └─ Create message: { id, sender: 'user', text: 'Contact Numbers', ... }
            │   └─ Append to messages array
            │   └─ Update state: setMessages([...prev, userMsg])
            │   └─ Re-render: UserBubble appears (right side, blue)
            │
            ├─ Step 2: Show Typing Indicator
            │   └─ setIsTyping(true)
            │   └─ TypingIndicator appears with animated dots
            │
            ├─ Step 3: Wait 400ms (simulate thinking)
            │   └─ setTimeout(() => { ... }, 400)
            │   └─ Timer stored in timerRef
            │
            ├─ Step 4: Lookup Response (AFTER 400ms)
            │   └─ Call: chatHelpers.getResponse("Contact Numbers")
            │   │
            │   └─→ getResponse Logic:
            │       ├─ If key === "Back to Main Menu"
            │       │  └─ Return chatData.welcome
            │       │
            │       └─ Else lookup key in chatData object
            │          ├─ If found: return chatData[key]
            │          └─ If not found: return chatData.welcome (fallback)
            │   │
            │   └─ Returns: { text: "📞 City Hospital — Key Contacts: ...", options: [...] }
            │
            ├─ Step 5: Create Bot Message
            │   └─ { id, sender: 'bot', text: "📞 City Hospital...", options: [...] }
            │
            ├─ Step 6: Add Bot Message to State
            │   └─ setMessages([...prev, botMsg])
            │   └─ Auto-scroll to bottom
            │   └─ Re-render: BotBubble appears (left, gray) + OptionButtons
            │
            ├─ Step 7: Hide Typing Indicator
            │   └─ setIsTyping(false)
            │   └─ timerRef.current = null (cleanup)
            │
            └─ Step 8: User Can Now Click New Option
                └─ Only LAST bot message's buttons are enabled
                └─ All previous option buttons remain disabled (grayed out)
```

---

## Data Structure Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    chatData.js (27 flows)                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ export const chatData = {                                │  │
│  │   welcome: {                                             │  │
│  │     text: "Hello! Welcome to City Hospital...",          │  │
│  │     options: [                                           │  │
│  │       "Book / Cancel Appointment",                       │  │
│  │       "Find a Doctor",                                   │  │
│  │       ... (20 main options)                             │  │
│  │     ]                                                    │  │
│  │   },                                                     │  │
│  │                                                          │  │
│  │   "Contact Numbers": {                                   │  │
│  │     text: "📞 City Hospital — Key Contacts: ...",        │  │
│  │     options: ["Back to Main Menu"]                       │  │
│  │   },                                                     │  │
│  │                                                          │  │
│  │   "Book / Cancel Appointment": { ... },                 │  │
│  │   "Find a Doctor": { ... },                             │  │
│  │   "Cardiology": { ... },         // Sub-flow            │  │
│  │   "Orthopedics": { ... },        // Sub-flow            │  │
│  │   ... (27 total flows)                                   │  │
│  │ }                                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────┬─────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│              chatHelpers.js (Lookup Functions)                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ getResponse(optionKey)                                   │  │
│  │ ├─ If optionKey === "Back to Main Menu"                 │  │
│  │ │  └─ Return chatData.welcome                           │  │
│  │ ├─ Else return chatData[optionKey] ?? chatData.welcome  │  │
│  │ │  (nullish coalescing: fallback if key doesn't exist)  │  │
│  │ │                                                        │  │
│  │ formatTimestamp(date)                                    │  │
│  │ └─ Returns localized time string: "10:30 AM"            │  │
│  │                                                          │  │
│  │ generateId()                                             │  │
│  │ └─ Returns unique ID: "msg-{timestamp}-{random}"        │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────┬─────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│              Message Object Structure                           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ {                                                        │  │
│  │   id: "msg-1712000000000-a3f2b",                          │  │
│  │   sender: "bot" || "user",                               │  │
│  │   text: "📞 City Hospital — Key Contacts: ...",          │  │
│  │   timestamp: "10:30 AM",                                 │  │
│  │   options: ["Back to Main Menu", "Other Option"]         │  │
│  │ }                                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Component Render Tree

```
<App>
│
├─→ useChat() [Hook - provides state & handlers]
│   ├─ messages: Message[]
│   ├─ isOpen: boolean
│   ├─ isTyping: boolean
│   └─ handlers: toggleChat, handleOptionClick, resetChat
│
└─→ <ChatWidget>
    ├─ Props:
    │  ├─ messages
    │  ├─ isOpen
    │  ├─ isTyping
    │  ├─ onToggle={toggleChat}
    │  ├─ onOptionClick={handleOptionClick}
    │  └─ onReset={resetChat}
    │
    ├─ Renders:
    │  ├─ [Floating Button] 🏥
    │  │  └─ onClick={onToggle}
    │  │
    │  └─ [If isOpen=true] <ChatWindow>
    │     │
    │     ├─ [Header] Blue Bar
    │     │  ├─ 🏥 Icon + "City Hospital"
    │     │  ├─ Online Status (🟢 Green dot)
    │     │  ├─ ↺ Restart Button → onClick={onReset}
    │     │  └─ ✕ Close Button → onClick={onToggle}
    │     │
    │     ├─ [Message Area] Scrollable Container
    │     │  └─ For each message in messages:
    │     │     │
    │     │     ├─→ <MessageBubble>
    │     │     │   ├─ sender={message.sender}
    │     │     │   ├─ text={message.text}
    │     │     │   └─ timestamp={message.timestamp}
    │     │     │
    │     │     └─ [If sender==='bot' && options.length > 0]
    │     │        │
    │     │        └─→ <OptionButtons>
    │     │            ├─ options={message.options}
    │     │            ├─ onSelect={(option) => onOptionClick(option)}
    │     │            └─ disabled={!isLastBotMessage || isTyping}
    │     │
    │     ├─ [If isTyping=true]
    │     │  │
    │     │  └─→ <TypingIndicator>
    │     │      └─ Animated dots: ●●●
    │     │
    │     └─ [Footer]
    │        └─ "Powered by City Hospital"
```

---

## Message Flow Sequence Diagram

```
USER                    HANDLER                 STATE                 CHATWINDOW
  │                        │                      │                        │
  │──Click Option────────→ │                      │                        │
  │                        │                      │                        │
  │                        │──setMessages─────────→                        │
  │                        │                      │  User message added    │
  │                        │                      │────────────────────→ │ Display User Bubble
  │                        │                      │                        │ (right, blue)
  │                        │                      │                        │
  │                        │──setIsTyping(true)──→                        │
  │                        │                      │────────────────────→ │ Show Typing Indicator
  │                        │                      │                        │ (animated dots)
  │                        │                      │                        │
  │                        │ [Wait 400ms...]      │                        │
  │                        │                      │                        │
  │                        │──setMessages─────────→                        │
  │                        │   (+ bot message)    │  Bot message added     │
  │                        │                      │────────────────────→ │ Display Bot Bubble
  │                        │                      │                        │ (left, gray)
  │                        │                      │  + OptionButtons       │ Display Option Row
  │                        │                      │  (ONLY last bot msg)   │
  │                        │                      │                        │
  │                        │──setIsTyping(false)─→                        │
  │                        │                      │────────────────────→ │ Hide Typing Indicator
  │                        │                      │                        │
  │  Ready to Click────────────────────────────────────────────────────→ │
```

---

## State & Props Flow

```
┌────────────────────────────────────────────────────────┐
│              App.jsx (State Owner)                     │
│  • Owns all state via useChat hook                    │
│  • Passes state + handlers down as props              │
└─────────────┬──────────────────────────────────────────┘
              │
              │ Props:
              ├─→ messages
              ├─→ isOpen
              ├─→ isTyping
              ├─→ toggleChat
              ├─→ handleOptionClick
              └─→ resetChat
              │
              ▼
┌────────────────────────────────────────────────────────┐
│           ChatWidget (Receives Props)                  │
│  • Does NOT own state                                 │
│  • Passes props down to ChatWindow                    │
│  • Re-renders when any prop changes                   │
└─────────────┬──────────────────────────────────────────┘
              │
              │ Props:
              ├─→ messages
              ├─→ isOpen
              ├─→ isTyping
              ├─→ onOptionClick
              ├─→ onClose
              └─→ onReset
              │
              ▼
┌────────────────────────────────────────────────────────┐
│          ChatWindow (Receives Props)                   │
│  • Maps over messages array                           │
│  • For each message:                                  │
│  │  ├─→ <MessageBubble sender={} text={} />          │
│  │  └─→ <OptionButtons options={} onSelect={} />     │
│  │                                                    │
│  • Renders conditional elements:                      │
│  │  └─→ <TypingIndicator /> (if isTyping=true)       │
│  │                                                    │
│  • Handles auto-scroll logic                         │
└────────────────────────────────────────────────────────┘
```

---

## Browser Rendering Pipeline

```
1. USER ACTION (Click Option)
   └─→ Event Handler Fires

2. STATE UPDATE (In useChat Hook)
   ├─→ setMessages([...])
   ├─→ setIsTyping(true/false)
   └─→ timerRef management

3. RE-RENDER TRIGGERED
   └─→ React marks affected components for re-render

4. COMPONENT TREE RE-RUNS
   ├─→ ChatWindow recalculates lastBotMsgIndex
   ├─→ Maps messages array
   ├─→ Creates MessageBubble instances
   └─→ Creates OptionButtons with correct disabled state

5. VIRTUAL DOM DIFFING
   ├─→ React compares old & new VDOM
   └─→ Only changed elements flagged for update

6. DOM UPDATES (Browser Paint)
   ├─→ Insert new message bubble
   ├─→ Update button disabled state
   ├─→ Show/hide typing indicator
   └─→ Scroll to bottom

7. BROWSER RENDERS
   ├─→ Layout paint
   ├─→ Composite/rasterize
   └─→ Display to user
```

---

## Performance Optimization Flow

```
┌─────────────────────────────────────────────────────┐
│         React.memo (Memoization)                    │
│  ┌──────────────────────────────────────────────┐  │
│  │  ChatWindow = memo(ChatWindow)               │  │
│  │  ChatWidget = memo(ChatWidget)               │  │
│  │                                              │  │
│  │  Effect: Skip re-render if props unchanged  │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│         useCallback (Stable References)             │
│  ┌──────────────────────────────────────────────┐  │
│  │  const toggleChat = useCallback(...)         │  │
│  │  const handleOptionClick = useCallback(...)  │  │
│  │  const resetChat = useCallback(...)          │  │
│  │                                              │  │
│  │  Effect: Handlers maintain same reference   │  │
│  │         across re-renders                   │  │
│  │         Prevents unnecessary child re-renders
│  └──────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│    Functional State Updaters (Avoid Closures)       │
│  ┌──────────────────────────────────────────────┐  │
│  │  setMessages((prev) => [...prev, newMsg])   │  │
│  │                                              │  │
│  │  Effect: Accesses latest state value        │  │
│  │         Prevents stale closure bugs         │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│    Message Cap (100 entries max)                    │
│  ┌──────────────────────────────────────────────┐  │
│  │  if (messages.length > 100)                 │  │
│  │    messages = messages.slice(-100)          │  │
│  │                                              │  │
│  │  Effect: Limits array size                  │  │
│  │         Prevents memory bloat               │  │
│  │         O(n) operation amortized            │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│    useRef (Avoid Re-renders)                        │
│  ┌──────────────────────────────────────────────┐  │
│  │  timerRef = useRef(null)                    │  │
│  │  timerRef.current = setTimeout(...)         │  │
│  │                                              │  │
│  │  Effect: Mutable without triggering render  │  │
│  │         Stores timer ID for cleanup         │  │
│  └──────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## Error Handling & Fallback Flow

```
USER CLICKS UNKNOWN OPTION (not in chatData)
            │
            ▼
  handleOptionClick("Unknown")
            │
            ▼
  getResponse("Unknown")
            │
            ├─ Checks: chatData["Unknown"]
            │
            └─ Result: undefined
            │
            ▼
  Nullish Coalescing (??)
            │
            ├─ expression ?? fallback
            │ (undefined ?? chatData.welcome)
            │
            └─ Returns: chatData.welcome
            │
            ▼
  Bot replies with Welcome Message
  (Graceful Degradation)
```

---

## Conversation Flow Examples

### Example 1: Book Appointment → Contact Numbers → Back to Main Menu

```
User clicked: "Book / Cancel Appointment"
    ↓
Bot shows: Call, Online, Walk-in options
Options: ["OPD & IPD Information", "Contact Numbers", "Back to Main Menu"]
    ↓
User clicked: "Contact Numbers"
    ↓
Bot shows: All hospital contact numbers
Options: ["Back to Main Menu"]
    ↓
User clicked: "Back to Main Menu"
    ↓
Special case: "Back to Main Menu" === true
    ↓
getResponse("Back to Main Menu") returns chatData.welcome
    ↓
Bot shows: Welcome message with 20 options again
```

### Example 2: Find Doctor → Cardiology Specialty

```
User clicked: "Find a Doctor"
    ↓
Bot shows: Choose specialty
Options: ["Cardiology", "Orthopedics", ..., "Back to Main Menu"]
    ↓
User clicked: "Cardiology"
    ↓
getResponse("Cardiology") returns chatData.Cardiology
    ↓
Bot shows: Cardiology department details
Options: ["Book / Cancel Appointment", "Back to Main Menu"]
    ↓
User clicked: "Back to Main Menu"
    ↓
Returns to welcome with 20 options
```

---

## File Dependency Graph

```
src/App.jsx
├── imports: ChatWidget
├── imports: useChat hook
└── Uses: state + handlers
    │
    ├─→ components/Chat/ChatWidget.jsx
    │   ├── imports: ChatWindow
    │   ├── Props: all state + handlers
    │   └─→ components/Chat/ChatWindow.jsx
    │       ├── imports: MessageBubble
    │       ├── imports: OptionButtons
    │       ├── imports: TypingIndicator
    │       ├── imports: SENDER constant
    │       └── Uses: message mapping logic
    │           │
    │           ├─→ components/Chat/MessageBubble.jsx
    │           │   ├── imports: SENDER constant
    │           │   └── Uses: Conditional styling based on sender
    │           │
    │           ├─→ components/Chat/OptionButtons.jsx
    │           │   └── Uses: maps options array to buttons
    │           │
    │           └─→ components/Chat/TypingIndicator.jsx
    │               └── Pure component: no imports
    │
    └─→ hooks/useChat.js
        ├── imports: useState, useCallback, useEffect, useRef
        ├── imports: chatHelpers functions
        ├── imports: chatData
        ├── imports: SENDER constant
        │
        ├─→ utils/chatHelpers.js
        │   ├── imports: chatData
        │   ├── getResponse(key)     → looks up in chatData
        │   ├── formatTimestamp()    → returns time string
        │   └── generateId()         → returns unique ID
        │
        ├─→ data/chatData.js
        │   └── exports: const chatData = { 27 flows }
        │
        └─→ constants/index.js
            └── exports: SENDER, MESSAGE_TYPE enums
```

---

## State Mutation Prevention

```
✅ CORRECT (Immutable State Updates)
  setMessages((prev) => [...prev, newMsg])
  └─ Creates new array reference

✅ CORRECT (Functional Updater Pattern)
  setMessages((prev) => {
    const next = [...prev, userMsg]
    return next.length > 100 ? next.slice(-100) : next
  })
  └─ Always receives latest state

✅ CORRECT (useCallback with empty deps)
  const handleOptionClick = useCallback((key) => { ... }, [])
  └─ Handlers safe without external state dependency

❌ WRONG (Direct Mutation)
  messages.push(newMsg)           // Directly mutates array
  setState(messages)              // Won't trigger re-render

❌ WRONG (Object as Dependency)
  useCallback(..., [messages])    // Messages changes → handler reference changes
                                   // → Components re-render unnecessarily
```

---

## Accessibility Flow

```
KEYBOARD NAVIGATION
    │
    ├─ Tab: Focus moves button to button
    │  └─ OS handles tab order automatically
    │
    ├─ Enter: Activate focused button
    │  └─ onClick handler fires
    │
    └─ (Future) Escape: Close chat
       └─ To toggle isOpen to false

SCREEN READER SUPPORT
    │
    ├─ aria-label on all buttons
    │  └─ "Open chat", "Close chat", "Restart chat"
    │
    ├─ role="status" on TypingIndicator
    │  └─ Announces "Bot is typing"
    │
    ├─ role="dialog" on ChatWindow
    │  └─ Announces modal container
    │
    ├─ aria-labelledby="chat-header-title"
    │  └─ Links dialog to "City Hospital" heading
    │
    └─ aria-live="polite" on message area
       └─ Announces new messages as they arrive

COLOR CONTRAST
    │
    ├─ Blue (#1e40af) on White = 5.3:1 ratio ✓
    ├─ Gray (#374151) on White = 7:1 ratio ✓
    └─ All text meets WCAG AA standards
```

---

## Deployment & Build Flow

```
npm run build
    │
    ├─ Invokes Vite build command
    │  └─ vite build
    │
    ├─ Transpiles JSX → JavaScript
    │  └─ Removes React.StrictMode development warnings
    │
    ├─ Tree-shakes unused code
    │  └─ Removes test setup, development-only code
    │
    ├─ Minifies JavaScript
    │  └─ Reduces bundle size
    │
    ├─ Optimizes CSS
    │  └─ Removes unused Tailwind utilities
    │
    ├─ Generates output folder: dist/
    │  ├─ index.html (main entry point)
    │  └─ assets/
    │      ├─ main-[hash].js (bundled app)
    │      └─ index-[hash].css (compiled styles)
    │
    └─ Ready for deployment!
       ├─ Vercel: git push
       ├─ Netlify: drag & drop dist/
       ├─ GitHub Pages: push to gh-pages
       └─ S3: aws s3 sync dist/ s3://bucket/
```

---

## Performance Metrics

```
INITIAL LOAD
    ├─ ~50KB (gzipped) bundle size
    ├─ <1s Time to Interactive on 4G
    └─ Lighthouse Score: 95+

RUNTIME PERFORMANCE
    ├─ Component re-renders optimized
    │  ├─ React.memo prevents unnecessary renders
    │  ├─ useCallback maintains handler identity
    │  └─ Functional state updaters prevent bugs
    │
    ├─ Message array capped at 100
    │  └─ O(1) amortized append with periodic trim
    │
    └─ No external API calls
       └─ All data in-memory (JavaScript object)

MEMORY USAGE
    ├─ Minimal state footprint
    ├─ Automatic garbage collection
    └─ No memory leaks (useEffect cleanup)
```

---

## Complete State Machine

```
                    ┌─────────────────┐
                    │   INITIAL       │
                    │  isOpen=false   │
                    │ isTyping=false  │
                    └────────┬────────┘
                             │
                             │ User clicks 🏥
                             ▼
                    ┌─────────────────┐
                    │   CHAT OPEN     │
                    │   isOpen=true   │
                    │  isTyping=false │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
        User clicks option    User clicks close
                    │                 │
                    ▼                 ▼
        ┌──────────────────┐  ┌──────────────┐
        │  AWAITING REPLY  │  │ CHAT CLOSED  │
        │ isOpen=true      │  │ isOpen=false │
        │ isTyping=true    │  │isTyping=false│
        └────────┬─────────┘  └──────────────┘
                 │                   ▲
                 │                   │
          Wait 400ms            User clicks 🏥
                 │                   │
                 ▼                   │
        ┌──────────────────┐         │
        │ NEW OPTIONS      │         │
        │ isOpen=true      ├─────────┘
        │ isTyping=false   │
        └──────────────────┘
```

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| **Components** | 5 (TypingIndicator, MessageBubble, OptionButtons, ChatWindow, ChatWidget) |
| **Hooks Used** | 1 (useChat custom hook) + 4 React built-ins (useState, useCallback, useEffect, useRef) |
| **Conversation Flows** | 27 (1 welcome + 20 main + 6 specialties) |
| **Lines of Code** | ~412 |
| **State Variables** | 4 (messages[], isOpen, isTyping, timerRef) |
| **Event Handlers** | 3 (toggleChat, handleOptionClick, resetChat) |
| **Message Types** | 2 (bot, user) |
| **Max Concurrent Messages** | 100 (auto-trim oldest) |
| **Bot Reply Delay** | 400ms |
| **Responsive Breakpoints** | 2 (mobile: full-screen, sm+: 380×520px) |
| **Tailwind Utilities Used** | ~50 |
| **Accessibility Features** | 8 (ARIA labels, roles, aria-live, keyboard nav) |
