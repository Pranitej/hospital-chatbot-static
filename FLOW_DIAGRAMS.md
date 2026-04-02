# Hospital Chatbot — Mermaid Diagrams for Figma

> Each diagram below is self-contained.
> Paste any block into https://mermaid.live → Export SVG → Import into Figma.

---

## Diagram 0 — Chatbot Conversation Flow (Voiso-style)

Matches the card + labeled-edge + LR layout style of visual flowbuilders.

```mermaid
flowchart LR
    classDef start      fill:#e8f5e9,stroke:#43a047,color:#1b5e20,font-weight:bold
    classDef botMsg     fill:#e3f2fd,stroke:#1e88e5,color:#0d47a1
    classDef userPick   fill:#fff8e1,stroke:#f9a825,color:#e65100,font-weight:bold
    classDef subFlow    fill:#f3e5f5,stroke:#8e24aa,color:#4a148c
    classDef terminal   fill:#fce4ec,stroke:#e53935,color:#b71c1c,font-weight:bold

    START(["▶  Start"]):::start

    START --> W

    W["🏥 Bot Message
    ─────────────────
    Hello! Welcome to
    City Hospital.
    How can I help you?"]:::botMsg

    W --> M

    M{"👆 User Selects
    ─────────────────
    Option Button
    from 20 choices"}:::userPick

    M -->|Book / Cancel Appt| F01
    M -->|Find a Doctor| F02
    M -->|Emergency Services| F04
    M -->|Ambulance Services| F08
    M -->|ICU / Critical Care| F10
    M -->|OPD & IPD Info| F05
    M -->|Lab Tests & Reports| F06
    M -->|Insurance & Billing| F11
    M -->|14 other options| FREST

    F01["🏥 Bot Response
    ─────────────────
    Book / Cancel Appt
    📞 1800-123-4567
    🌐 Online · 🏥 Walk-in"]:::botMsg

    F02["🏥 Bot Response
    ─────────────────
    Find a Doctor
    200+ specialists
    Choose a specialty"]:::botMsg

    F04["🏥 Bot Response
    ─────────────────
    Emergency Services
    🚨 108 · Available 24/7"]:::botMsg

    F05["🏥 Bot Response
    ─────────────────
    OPD & IPD Info
    Hours · Admission"]:::botMsg

    F06["🏥 Bot Response
    ─────────────────
    Lab Tests & Reports
    Online result access"]:::botMsg

    F08["🏥 Bot Response
    ─────────────────
    Ambulance Services
    🚑 Available 24/7"]:::botMsg

    F10["🏥 Bot Response
    ─────────────────
    ICU / Critical Care
    Visiting: 10AM–11AM
    4PM–5PM"]:::botMsg

    F11["🏥 Bot Response
    ─────────────────
    Insurance & Billing
    TPA accepted
    Counter: Ground Floor"]:::botMsg

    FREST["🏥 Bot Response
    ─────────────────
    One of 14 flows:
    Pharmacy · Blood Bank
    Visiting Hours · FAQs
    Health Tips · Location
    Contact · COVID · etc."]:::botMsg

    F02 --> SPEC

    SPEC{"👆 User Selects
    ─────────────────
    Specialty"}:::userPick

    SPEC -->|Cardiology| S1
    SPEC -->|Orthopedics| S2
    SPEC -->|Neurology| S3
    SPEC -->|Pediatrics| S4
    SPEC -->|Gynecology| S5
    SPEC -->|Dermatology| S6

    S1["🏥 Cardiology
    ─────────────────
    Heart & Vascular Care
    ECG · Angioplasty
    OPD: Mon–Sat 9AM–5PM"]:::subFlow

    S2["🏥 Orthopedics
    ─────────────────
    Bone · Joint · Spine
    Arthroscopy · Implants
    OPD: Mon–Sat 9AM–5PM"]:::subFlow

    S3["🏥 Neurology
    ─────────────────
    Brain & Nervous System
    MRI · EEG
    OPD: Mon–Fri 10AM–4PM"]:::subFlow

    S4["🏥 Pediatrics
    ─────────────────
    Child Health 0–18 yrs
    Vaccines · Growth
    OPD: Mon–Sat 9AM–1PM"]:::subFlow

    S5["🏥 Gynecology
    ─────────────────
    Women's Health
    Maternity · Laparoscopy
    OPD: Mon–Sat 9AM–5PM"]:::subFlow

    S6["🏥 Dermatology
    ─────────────────
    Skin · Hair · Nails
    Laser · Biopsy
    OPD: Mon–Fri 10AM–3PM"]:::subFlow

    S1 -->|Book Appointment| F01
    S2 -->|Book Appointment| F01
    S3 -->|Book Appointment| F01
    S4 -->|Book Appointment| F01
    S5 -->|Book Appointment| F01
    S6 -->|Book Appointment| F01

    S1 -->|Back to Main Menu| W
    S2 -->|Back to Main Menu| W
    S3 -->|Back to Main Menu| W
    S4 -->|Back to Main Menu| W
    S5 -->|Back to Main Menu| W
    S6 -->|Back to Main Menu| W
    SPEC -->|Back to Main Menu| W

    F01 -->|Back to Main Menu| W
    F04 -->|Back to Main Menu| W
    F05 -->|Back to Main Menu| W
    F06 -->|Back to Main Menu| W
    F08 -->|Ambulance / Emergency| F04
    F08 -->|Back to Main Menu| W
    F10 -->|Emergency Services| F04
    F10 -->|Back to Main Menu| W
    F11 -->|Contact Numbers| F16
    F11 -->|Back to Main Menu| W
    FREST -->|Back to Main Menu| W

    F16["🏥 Bot Response
    ─────────────────
    Contact Numbers
    All department extensions"]:::botMsg

    F16 -->|Back to Main Menu| W

    W -->|User closes chat| END_NODE

    END_NODE(["⏹  End"]):::terminal
```

---

## Diagram 1 — Application Boot Flow

```mermaid
flowchart TD
    A([🌐 Browser loads index.html]) --> B[Vite injects main.jsx]
    B --> C[ReactDOM.createRoot]
    C --> D[Renders App.jsx]
    D --> E[useChat hook called]

    E --> F1[messages = Welcome Bot Message]
    E --> F2[isOpen = false]
    E --> F3[isTyping = false]
    E --> F4[timerRef = null]

    F1 & F2 & F3 & F4 --> G[App renders ChatWidget]

    G --> H{isOpen?}
    H -->|false| I[Show Floating Button only]
    H -->|true| J[Show Floating Button + ChatWindow]
```

---

## Diagram 2 — Open & Close Chat

```mermaid
flowchart TD
    A([User clicks Floating Button 🏥]) --> B[toggleChat fires]
    B --> C{Current isOpen value?}
    C -->|false| D[setIsOpen = true]
    C -->|true| E[setIsOpen = false]
    D --> F[ChatWindow slides in\nWelcome message visible]
    E --> G[ChatWindow hidden\nUnread dot appears\nif messages length > 1]
```

---

## Diagram 3 — Core Interaction Loop

```mermaid
flowchart TD
    A([User clicks an Option Button]) --> B[handleOptionClick called\nwith optionKey]

    B --> C[makeMessage USER optionKey\nid · sender:user · text · timestamp · options empty]
    C --> D[setMessages — append userMsg]
    D --> E{messages > 100?}
    E -->|yes| F[Slice oldest — keep last 100]
    E -->|no| G[Keep as-is]
    F & G --> H[setIsTyping = true]

    H --> I[TypingIndicator renders\n3-dot bounce animation]
    I --> J[[setTimeout 400ms]]

    J --> K[getResponse optionKey\nchatHelpers.js]
    K --> L{optionKey match?}

    L -->|Back to Main Menu| M[Return chatData welcome]
    L -->|Key exists in chatData| N[Return chatData optionKey]
    L -->|No match| O[Fallback: return chatData welcome]

    M & N & O --> P[makeMessage BOT response.text response.options]
    P --> Q[setMessages — append botMsg]
    Q --> R[setIsTyping = false]
    R --> S[timerRef.current = null]
    S --> T[React re-renders ChatWindow]

    T --> T1[New user bubble visible — right side blue]
    T --> T2[New bot bubble visible — left side gray]
    T --> T3[OptionButtons on latest bot msg ENABLED]
    T --> T4[All previous OptionButtons DISABLED]

    T1 & T2 & T3 & T4 --> A
```

---

## Diagram 4 — Chat Reset Flow

```mermaid
flowchart TD
    A([User clicks Restart button in header]) --> B[resetChat called]

    B --> C{timerRef.current exists?}
    C -->|yes| D[clearTimeout — cancel pending reply]
    C -->|no| E[Skip]

    D & E --> F[setIsTyping = false]
    F --> G[setMessages = Welcome Bot Message only]
    G --> H[React re-renders]

    H --> I[messages array has 1 entry]
    I --> J[Welcome text displayed]
    J --> K[All 20 main menu options shown]
    K --> L[Chatbot in initial state]
```

---

## Diagram 5 — Conversation Flow Map

```mermaid
flowchart TD
    W([WELCOME\nHello! Welcome to City Hospital])

    W --> L01[Book / Cancel Appointment]
    W --> L02[Find a Doctor]
    W --> L03[Departments & Specialties]
    W --> L04[Emergency Services]
    W --> L05[OPD & IPD Information]
    W --> L06[Lab Tests & Reports]
    W --> L07[Pharmacy Information]
    W --> L08[Ambulance Services]
    W --> L09[Blood Bank]
    W --> L10[ICU / Critical Care]
    W --> L11[Insurance & Billing]
    W --> L12[Visiting Hours]
    W --> L13[Admission / Discharge Process]
    W --> L14[Health Packages & Checkups]
    W --> L15[Hospital Location & Directions]
    W --> L16[Contact Numbers]
    W --> L17[FAQs]
    W --> L18[Health Tips]
    W --> L19[Feedback / Complaints]
    W --> L20[COVID / Health Screening]

    L01 --> L05
    L01 --> L16
    L01 --> W

    L02 --> S1[Cardiology]
    L02 --> S2[Orthopedics]
    L02 --> S3[Neurology]
    L02 --> S4[Pediatrics]
    L02 --> S5[Gynecology]
    L02 --> S6[Dermatology]
    L02 --> W

    S1 --> L01
    S1 --> W
    S2 --> L01
    S2 --> W
    S3 --> L01
    S3 --> W
    S4 --> L01
    S4 --> W
    S5 --> L01
    S5 --> W
    S6 --> L01
    S6 --> W

    L03 --> L02
    L03 --> W

    L04 --> L08
    L04 --> L10
    L04 --> W

    L05 --> L01
    L05 --> W

    L06 --> L05
    L06 --> W

    L07 --> W

    L08 --> L04
    L08 --> W

    L09 --> W

    L10 --> L04
    L10 --> W

    L11 --> L16
    L11 --> W

    L12 --> W

    L13 --> L05
    L13 --> W

    L14 --> L01
    L14 --> W

    L15 --> W
    L16 --> W
    L17 --> W
    L18 --> W
    L19 --> W
    L20 --> W
```

---

## Diagram 6 — Component Render Tree

```mermaid
flowchart TD
    APP[App.jsx\nRoot Component]

    APP --> HOOK[useChat Hook\nno DOM output]
    APP --> CW[ChatWidget\nFloating Container]

    HOOK --> S1[state: messages array]
    HOOK --> S2[state: isOpen]
    HOOK --> S3[state: isTyping]
    HOOK --> S4[ref: timerRef]
    HOOK --> F1[fn: toggleChat]
    HOOK --> F2[fn: handleOptionClick]
    HOOK --> F3[fn: resetChat]

    CW --> FB[Floating Button\nBottom-right fixed]
    CW --> WIN[ChatWindow\nonly when isOpen = true]

    FB --> FB1[Hospital icon]
    FB --> FB2[Red unread dot\nif messages > 1 and chat closed]

    WIN --> HDR[Header — blue bar]
    WIN --> MSG[Message Area\nscrollable]
    WIN --> TYP[TypingIndicator\nonly when isTyping = true]
    WIN --> FTR[Footer]

    HDR --> HDR1[City Hospital title]
    HDR --> HDR2[Green Online dot]
    HDR --> HDR3[Restart button → resetChat]
    HDR --> HDR4[Close button → toggleChat]

    MSG --> MB[MessageBubble\nper message]
    MSG --> OB[OptionButtons\nper bot message]

    MB --> MB1[sender = bot\nleft side · gray · avatar]
    MB --> MB2[sender = user\nright side · blue · no avatar]

    OB --> OB1[disabled = true\nall except last bot msg]
    OB --> OB2[disabled = false\nlatest bot msg only]
    OB2 --> OB3[onClick → handleOptionClick]

    TYP --> TYP1[Hospital badge]
    TYP --> TYP2[3 bounce dots\nstaggered CSS animation]

    FTR --> FTR1[Powered by City Hospital]
```

---

## Diagram 7 — State Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Booted : ReactDOM renders App

    state Booted {
        messages : Welcome message only
        isOpen : false
        isTyping : false
        timerRef : null
    }

    Booted --> ChatOpen : User clicks Floating Button
    ChatOpen --> Booted : User clicks Close button

    state ChatOpen {
        isOpen : true
    }

    ChatOpen --> WaitingForBot : User clicks an option
    state WaitingForBot {
        messages : + userMsg appended
        isTyping : true
        timerRef : setTimeout id
    }

    WaitingForBot --> BotReplied : 400ms elapses
    state BotReplied {
        messages : + botMsg appended
        isTyping : false
        timerRef : null
    }

    BotReplied --> WaitingForBot : User clicks next option
    BotReplied --> Booted : User clicks Restart

    Booted --> [*] : Component unmounts\nclearTimeout called
```

---

## Diagram 8 — Data Resolution (chatHelpers.js)

```mermaid
flowchart TD
    A([optionKey received\ne.g. Cardiology]) --> B{optionKey === \nBack to Main Menu?}

    B -->|yes| C[Return chatData.welcome]
    B -->|no| D{chatData has\nkey optionKey?}

    D -->|yes| E[Return chatData optionKey]
    D -->|no| F[Return chatData.welcome\ngraceful fallback]

    C --> G[Response object]
    E --> G
    F --> G

    G --> H[text: string\nDisplay text for bot bubble]
    G --> I[options: string array\nButton labels for OptionButtons]
```

---

## Diagram 9 — Message Object Lifecycle

```mermaid
flowchart LR
    A([User clicks option]) --> B[generateId\nDate.now + random suffix]
    A --> C[formatTimestamp\nHH:MM AM/PM]
    A --> D[sender = user\ntext = optionKey\noptions = empty array]

    B & C & D --> E[userMsg object\nid · sender · text · timestamp · options]

    E --> F[setMessages append]
    F --> G[ChatWindow re-renders\nMessageBubble for user msg]

    H([400ms later — bot reply]) --> I[generateId]
    H --> J[formatTimestamp]
    H --> K[sender = bot\ntext = response.text\noptions = response.options array]

    I & J & K --> L[botMsg object\nid · sender · text · timestamp · options]

    L --> M[setMessages append]
    M --> N[ChatWindow re-renders\nMessageBubble + OptionButtons for bot msg]
```

---

> **How to use in Figma:**
> 1. Copy one diagram block (the triple-backtick mermaid block)
> 2. Paste into https://mermaid.live
> 3. Click **Export → SVG**
> 4. In Figma: **Import** or drag-drop the SVG file
> 5. Ungroup to edit individual nodes and labels
