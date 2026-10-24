# TechNav — Your Path to Tech (Nigeria Tech Career Navigator)
> **Comprehensive Architecture, Design System, Color Tokens, and Tech Stack Specification**

---

## 📌 1. Project Overview & Mission

**TechNav** is a constraint-first career orientation platform built specifically for African and Nigerian tech aspirants. Unlike generic career quizzes that push everyone to "just learn coding" (Python/Full-Stack) while ignoring real-world challenges, TechNav assesses a candidate's **true baseline constraints**:
- **Hardware Access**: Smartphone-only vs. shared cyber-café computer vs. personal laptop.
- **Power & Data Reality**: Intermittent grid power, reliance on night bundles/powerbanks vs. steady inverter access.
- **Time Availability**: 3–5 hours/week alongside university/NYSC/full-time work vs. full-time learning.
- **Coding Appetite**: 100% no-code visual/people roles vs. light logic formulas vs. deep engineering.
- **Earning Urgency**: Fast freelance income (1–3 months) vs. deep high-ceiling mastery (6–12+ months).

The platform pairs a 19-point diagnostic matrix with **14 hyper-tailored African tech pathways**, a realistic Day-One proof task, curated 100% free open-curriculum roadmaps, an interactive Nigerian AI Mentor ("Tizzi"), and an administrative analytics portal.

---

## 🎨 2. Design System & Master Color Tokens

The UI follows a bold, neo-brutalist tech aesthetic inspired by modern editorial tech publications and high-conversion mobile design systems:
- Solid 2px to 2.5px solid black borders (`border-2 border-black`)
- Hard drop shadows with zero blur (`shadow-[3px_3px_0px_#000]`, `shadow-[4px_4px_0px_#000]`, `shadow-[5px_5px_0px_#000]`)
- Distinctive rounded capsules (`rounded-full`) and container cards (`rounded-2xl`, `rounded-3xl`)
- High-contrast visual cards with tactile letter/symbol badges

### 2.1 Master Color Palette

| Token Name | Hex Code | RGB | Role & Semantic UI Usage |
| :--- | :--- | :--- | :--- |
| **Electric Lime / Neon Yellow** | `#D4F938` | `rgb(212, 249, 56)` | **Primary brand accent**: Active option states, `[tech.]` hero badge, 92% circular gauge, "Learn it free" card, "We'll help you choose" headline highlight, and CTA buttons |
| **Electric Purple / Indigo** | `#5D45FD` | `rgb(93, 69, 253)` | **Brand Primary**: Result card hero surface, Footer background, button drop shadows (`shadow-neo-purple`), progress bar active capsules |
| **Dark Navy / Ink Black** | `#13141F` | `rgb(19, 20, 31)` | **High Contrast Dark**: Main CTA buttons, "Pick a lane" section background, Day-One idea section background, header links |
| **Pastel Lavender Canvas** | `#F1F0FF` | `rgb(241, 240, 255)` | **Assessment & Results Background**: Soft, low-strain background for the quiz questions and results flow |
| **Warm Yellow / Gold** | `#FED74C` | `rgb(254, 215, 76)` | **Secondary Card & Badges**: "Product Design" card, Phase pill badges, "Your Day-One mission" card, "Level up" card, step 4 banner |
| **Sky Cyan / Electric Blue** | `#60C6F8` | `rgb(96, 198, 248)` | **Action & Accent**: "Virtual Assistance" card, "Website" resource badges, Day-One card 2 |
| **Coral / Salmon Red** | `#FF6A55` | `rgb(255, 106, 85)` | **Alert & Accent**: `[six months]` headline highlight, "QA Testing" card, YouTube resource badges, Day-One task ribbons |
| **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | **Card Surfaces**: Unselected question cards, resource cards, hero containers |
| **Pure Black** | `#000000` | `rgb(0, 0, 0)` | **Strokes & Hard Shadows**: 2px solid borders, hard offset shadows, high-contrast typography |

---

### 2.2 Typography Stack

1. **Display & Headlines (`font-display`)**:
   - Font Family: `'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif`
   - Weight: `700 (Bold)`, `800 (ExtraBold)`, `900 (Black)`
   - Role: Hero headlines (`Find your lane in tech.`), Section titles, Match percentages (`92%`), Pathway card titles.

2. **Body & UI Sans-Serif (`font-sans`)**:
   - Primary: `'Plus Jakarta Sans', system-ui, -apple-system, sans-serif`
   - Weight: `400 (Regular)`, `500 (Medium)`, `600 (SemiBold)`, `700 (Bold)`
   - Role: Explanatory subtitles, question option titles, resource descriptions, advice notes.

3. **Technical & Monospace (`font-mono`, `font-mono-tech`)**:
   - Primary: `'Space Mono', monospace`
   - Role: Announcement bar (`100% FREE / PHONE-FRIENDLY / 12 PATHWAYS`), Phase tags (`PHASE 1 / YOUR BACKGROUND`), estimated times (`25 MINS`), keyboard hotkeys (`A`, `B`, `C`).

---

## 🛠️ 3. Full Technology Stack

### 3.1 Frontend Architecture
- **Framework**: [React 19](https://react.dev/) (`^19.0.0`)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (`~5.7.2`) with strict type-checking
- **Build System**: [Vite 6](https://vite.dev/) (`^6.2.0`) with `@vitejs/plugin-react`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@import "tailwindcss";`)
- **Icons**:
  - [Lucide React](https://lucide.dev/) (`^1.16.0`) for standard UI controls
  - Bespoke hand-drawn SVG line icons (`src/components/HandDrawnIcons.tsx`)
- **Motion & Transitions**:
  - `motion` (`^12.23.24`) for fluid question card transitions and auto-advance animations
- **Effects & Feedback**:
  - `canvas-confetti` (`^1.9.4`) for celebratory assessment completion
- **Telemetry**:
  - `@vercel/analytics` (`^1.5.0`) for privacy-conscious real-time web telemetry

### 3.2 Backend & API Layer
- **Runtime**: Node.js with `tsx` (`^4.19.3`)
- **Server Framework**: [Express 5](https://expressjs.com/) (`^5.0.1`)
- **Vite Middleware**: Mounted in development mode via `vite.middlewares` on `port 3000`
- **Generative AI SDK**:
  - `@google/genai` (`^0.1.2`)
  - Server-side proxy at `/api/chat` using `gemini-2.5-flash` for the Nigerian Tech Mentor ("Tizzi")
  - Automatic prompt engineering enforcing Nigerian Pidgin/English conversational tone, local context (NYSC, NEPA, Jiji, Upwork, Paystack), and zero hallucination of paid barriers.

---

## 📁 4. Project Directory & File Tree

```
├── .env.example                     # Environment template (PORT=3000, GEMINI_API_KEY)
├── index.html                       # HTML entry point with Space Grotesk, Plus Jakarta Sans, Space Mono
├── metadata.json                    # AI Studio manifest & permissions
├── package.json                     # Project manifest and scripts
├── server.ts                        # Full-stack Express server with Vite middleware
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite configuration
├── public/                          # Public static assets & design screenshots
└── src/
    ├── main.tsx                     # React DOM root entry point
    ├── App.tsx                      # Primary view router (Home | Assessment | Pathway | Admin)
    ├── index.css                    # Tailwind v4 styles, neo-brutalist shadow & font utilities
    ├── types.ts                     # Full TypeScript interfaces & domain models
    │
    ├── components/
    │   ├── Header.tsx               # Top announcement bar + TECH [NAV] logo + Quiz CTA
    │   ├── Footer.tsx               # Electric purple footer (#5D45FD) + colored category underlines
    │   ├── TechNavLogo.tsx          # TECH [NAV] brand mark (header, footer, dark variants)
    │   ├── MainContent.tsx          # Hero, Pick a lane grid, 4 quick steps, Day-One section
    │   ├── AssessmentPage.tsx       # 19-Step multi-phase card-based diagnostic flow (#F1F0FF canvas)
    │   ├── AssessmentProgressIndicator.tsx # 4-phase segmented micro-capsule rail
    │   ├── SingleQuestionCard.tsx   # Neo-brutalist card with badges, lime active states, and sticky Continue CTA
    │   ├── DiagnosisResult.tsx      # Results page (#5D45FD hero card, gauge, Day-One task, sub-views)
    │   ├── PathwayDetailPage.tsx    # Dedicated deep-dive page for each of the 14 niches
    │   ├── NaijaChatbot.tsx         # AI Mentor "Tizzi" slide-over drawer
    │   ├── DraggableAiButton.tsx    # Floating draggable AI Mentor launcher
    │   ├── AdminPortal.tsx          # Real-time analytics dashboard & submission audit
    │   └── HandDrawnIcons.tsx       # Bespoke hand-drawn SVG icon suite
    │
    ├── data/
    │   ├── assessmentQuestions.ts   # 19 questions, scoring algorithm, recommendation engine
    │   └── nichesData.ts            # 14 curated Nigerian tech pathways with full roadmaps
    │
    └── utils/
        ├── analytics.ts             # Telemetry tracking, click listeners, local storage sync
        ├── assessmentDraftStorage.ts # Auto-save & resume (survives refreshes & battery drops)
        ├── profileMatcher.ts        # Peer cohort matching (compare with real Nigerian techies)
        └── submissionStorage.ts     # Local assessment persistence
```

---

## 📱 5. UI Screen Mapping to Figma Specifications

| Screen / Feature | Component | Mockup Reference | Key Visual Elements |
| :--- | :--- | :--- | :--- |
| **Landing Hero** | `MainContent.tsx` | `Landing_page_1x_41e999df.png` | Eyebrow pill `MADE FOR NIGERIAN BEGINNERS`, `Find your lane in [tech.]` with lime `#D4F938` box, tilted result preview card with 92% gauge and red task ribbon |
| **Pick a Lane Grid** | `MainContent.tsx` | `Landing_page_1x_41e999df.png` | `#13141F` dark background, 2-column grid of colored neo-brutalist cards (Software `#7C65F6`, SMM `#D4F938`, UI/UX `#FED74C`, VA `#60C6F8`, QA `#FF6A55`) |
| **4 Quick Steps** | `MainContent.tsx` | `Landing_page_1x_41e999df.png` | "4 quick steps. Zero stress.", numbered cards (1: You, 2: Your gear, 3: Your style) + full-width gold Step 4 banner |
| **TikTok Scroll Banner** | `MainContent.tsx` | `Landing_page_1x_41e999df.png` | Electric lime banner `#D4F938` with black CTA button `Start the quiz →` |
| **The Day-One Idea** | `MainContent.tsx` | `Day-One_section___footer_1x_71174597.png` | `#13141F` background, `[six months]` highlighted in coral `#FF6A55`, 3 stacked Day-One cards (UI/UX 30m, VA 20m, Data 25m) |
| **Site Footer** | `Footer.tsx` | `Day-One_section___footer_1x_71174597.png` | Electric purple background `#5D45FD`, `TECH [NAV]` logo, `Low-data friendly` + `100% free` pills, 3 colored underline columns |
| **Question Step 1** | `SingleQuestionCard.tsx` | `Assessment__step_1_1x_fb2979bc.png` | `#F1F0FF` canvas, segmented purple capsules, avatar `T` + speech bubble, letter badges (A, B, C), lime active card fill, sticky navy button |
| **Question Step 3 (6 Cards)** | `SingleQuestionCard.tsx` | `Assessment__question_3_of_18_1x_cd340ef9.png` | 2-column grid of 6 cards with icon badges (`Aa`, `?!`, `[ ]`, `...`, `%`, `{ }`), lime active state, monospace tap note |
| **Result Overview** | `DiagnosisResult.tsx` | `Results_your_path_1x_3a45c1ec.png` | Deep purple container `#5D45FD`, lime pill `YOUR CLEAR PATH IS`, 92% circular gauge, top 2 tracks side-by-side, Day-One mission, Learn it free / Level up triggers |
| **Learn It Free** | `DiagnosisResult.tsx` | `Results_learn_it_free_1x_7be961ea.png` | Filter pills (`All`, `Videos`, `Websites`), curated free cards with `YOUTUBE` and `WEBSITE` badges, `Back to my result` button |
| **Level Up** | `DiagnosisResult.tsx` | `Results_level_up_1x_8546fe49.png` | Yellow notice banner `Free first. Pay only after your Day-One mission.`, paid certificate cards (Coursera, DataCamp, Udemy) |
| **Ask Mentor AI (Tizzi Drawer)** | `NaijaChatbot.tsx` | Neo-Brutalist Drawer | `#5D45FD` purple header, `T` lime avatar badge, `#F1F0FF` canvas, user messages in lime `#D4F938`, Tizzi cards in white with 2px borders, prompt chips, and Pidgin/English conversational intelligence |
| **Floating AI Launcher** | `DraggableAiButton.tsx` | Neo-Brutalist Pill | `#D4F938` electric lime pill, 2px black border, `shadow-neo-lg`, pulsing green dot, `ASK MENTOR TIZZI` label |
| **Pathway Detail Page** | `PathwayDetailPage.tsx` | Neo-Brutalist Deep Dive | `#13141F` hero banner with category pill, 3-month roadmap milestones, warm yellow `#FED74C` Day-One project box, zero-fluff curated resources |
| **Admin Portal** | `AdminPortal.tsx` | Neo-Brutalist Telemetry | Anti-hijack PIN gate, `#F1F0FF` dashboard, 5 KPI cards with 2px solid black borders, live click tracker, Top 10 pathways feed, CSV/JSON export |

---

## 🚀 6. Running & Deploying Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd technav

# Install all dependencies
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
PORT=3000
# Optional: Set Gemini API Key to enable AI Mentor Tizzi
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development
```bash
# Starts Express server with Vite HMR on port 3000
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Typecheck and build client bundles
npm run build

# Start production Node server
npm start
```

### Linting & Validation
```bash
npm run lint
```

---

## 📄 7. License

Distributed under the **Apache-2.0 License**. Free for personal and educational use across Africa and worldwide. Built with care for aspiring tech builders in Nigeria.
