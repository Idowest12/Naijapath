export interface DiagnosticContext {
  matchedNiche?: string;
  device?: string;
  weeklyHours?: string;
  location?: string;
  proudAchievement?: string;
}

/**
 * Intelligent client & fallback Nigerian tech career mentor engine.
 * Specifically designed for non-tech beginners with:
 * 1. Intent Detection (Explain vs Feasibility vs Comparison vs Roadmap)
 * 2. Everyday relatable Nigerian analogies (banking apps, tailoring, architects, restaurants)
 * 3. Direct answers first — never blindly dumping an unprompted 3-month syllabus
 */
export function generateSmartMentorResponse(
  userQuery: string,
  context?: DiagnosticContext
): string {
  const query = (userQuery || '').toLowerCase().trim();
  const niche = context?.matchedNiche || '';
  const device = context?.device || '';

  // Helper flags for intent detection
  const isLaymanExplanation =
    query.includes('layman') ||
    query.includes('lay man') ||
    query.includes('simple terms') ||
    query.includes('explain') ||
    query.includes('what is') ||
    query.includes('what does') ||
    query.includes('meaning of') ||
    query.includes('break down') ||
    query.includes('analogy') ||
    query.includes('tell me about') ||
    query.includes('simply put') ||
    query.includes('understand');

  const isRoadmapRequest =
    query.includes('roadmap') ||
    query.includes('how do i start') ||
    query.includes('where do i start') ||
    query.includes('how to start') ||
    query.includes('learning plan') ||
    query.includes('curriculum') ||
    query.includes('steps to learn') ||
    query.includes('guide to start') ||
    query.includes('syllabus') ||
    query.includes('what are the steps');

  const isComparison =
    query.includes(' vs ') ||
    query.includes(' versus ') ||
    query.includes('difference between') ||
    query.includes('which is better') ||
    query.includes('which pays faster') ||
    query.includes('compare');

  const isFeasibility =
    query.includes('can i') ||
    query.includes('is it possible') ||
    query.includes('4gb') ||
    query.includes('ram') ||
    query.includes('laptop') ||
    query.includes('without laptop') ||
    query.includes('phone only') ||
    query.includes('smartphone') ||
    query.includes('math') ||
    query.includes('mathematics') ||
    query.includes('arts') ||
    query.includes('non-tech') ||
    query.includes('age') ||
    query.includes('too old') ||
    query.includes('degree') ||
    query.includes('certificate');

  // -------------------------------------------------------------
  // 1. COMPARISONS (e.g., Frontend vs Backend, UI/UX vs PM)
  // -------------------------------------------------------------
  if (isComparison) {
    if (
      (query.includes('front') && query.includes('back')) ||
      query.includes('full stack') ||
      query.includes('fullstack')
    ) {
      return `**Here is the simplest way to understand Frontend vs Backend:** 🚗

Think of a modern car:
* **Frontend:** The steering wheel, dashboard, speedometer, leather seats, and horn. It's everything the driver can see, touch, and interact with directly. If a website looks clean and the buttons respond smoothly, that is great Frontend.
* **Backend:** The engine, fuel pump, alternator, and transmission underneath the hood. You can't see it, but without it, the car won't move an inch. It manages databases, handles your login credentials, and securely processes payments.
* **Full-Stack:** Someone who understands how to work on both the dashboard (Frontend) and the engine (Backend).

**Which one should you pick?**
* Pick **Frontend** if you like seeing immediate visual results from your code.
* Pick **Backend** if you enjoy logic, data flow, and solving behind-the-scenes puzzles.

Would you like to know what tools beginners start with in either of them?`;
    }

    if (query.includes('pay') || query.includes('faster') || query.includes('money')) {
      return `**Which tech skill pays or lands gigs faster in Nigeria?** 💰

Here is the honest reality:

1. **Fastest Entry (1–3 months): Virtual Assistance & Tech Operations / Social Media Management**
   * You don't need months of intense coding or complex math. If you are organized, know how to manage Google Docs/Sheets, handle emails, and schedule meetings, you can start pitching for remote freelance assistance gigs quickly.

2. **Medium Horizon (3–6 months): UI/UX Design & Frontend Development**
   * These pay very well, but you need **2–3 finished proof projects** before serious clients hire you. For UI/UX, you need Figma prototypes; for Frontend, you need live websites hosted on Vercel or GitHub.

3. **High Earning Ceiling (6+ months): Backend Engineering, Cybersecurity & Cloud**
   * These command top-tier salaries in fintechs (like Paystack, Moniepoint) and foreign companies, but they demand deeper computer science fundamentals and disciplined practice.

What is your immediate goal: quick income to support yourself, or building toward long-term engineering mastery?`;
    }
  }

  // -------------------------------------------------------------
  // 2. LAYMAN EXPLANATIONS & CONCEPT DEFINITIONS
  // (Priority: Answer the user's question directly first!)
  // -------------------------------------------------------------
  if (isLaymanExplanation && !isRoadmapRequest) {
    // A. Product Design / UI/UX
    if (
      query.includes('product design') ||
      query.includes('ui/ux') ||
      query.includes('ui ux') ||
      query.includes('ui') ||
      query.includes('ux') ||
      query.includes('figma')
    ) {
      return `**Product Design (UI/UX) in simple layman's language:** 🎨

Imagine you want to build a house:
* The **Architect** draws the floor plan. They decide where the parlor is, how wide the kitchen door should be, and make sure you don't have to walk through the bathroom to get into the bedroom.
* The **Bricklayers & Electricians** then come in to lay blocks and run wires based on that drawing.

In the tech world:
* A **Product Designer (UI/UX)** is that architect for mobile apps and websites.
* Software developers (coders) are the bricklayers.

**Everyday Nigerian Example:**
Open any banking app on your phone (like GTBank, OPay, or Kuda).
* If the button to **"Send Money"** is big, clear, and takes you only 2 taps, that is **good product design**.
* But if you are sweating in a store trying to pay a merchant and you can't find where to input the account number because the text is tiny and confusing—that is **bad product design**.

**What the job involves:**
You use a free tool called **Figma** to sketch out screens, pick friendly colors, and arrange buttons so that whether a busy trader in Balogun market or a first-time student uses the app, it feels effortless. **No coding is required.**

Does this analogy make sense to you? Would you like to know what a typical day looks like for a designer?`;
    }

    // B. Frontend Web Development
    if (
      query.includes('frontend') ||
      query.includes('front end') ||
      query.includes('web design') ||
      query.includes('web development')
    ) {
      return `**Frontend Development in simple layman's language:** 💻

Think of walking into a supermarket or boutique:
* The glass doors, the product shelves, the price tags, the bright showroom lights, and the cash register counter are the **Frontend**. It is everything customers see, touch, and interact with.
* On a website (like Jumia, Twitter, or YouTube), the search bar, the images of shoes, the buy button, and the video player are all Frontend.

When you click a button and a pop-up appears or the page smoothly slides open, a **Frontend Developer** wrote the code (using HTML, CSS, and JavaScript) to make that visual experience happen.

If you enjoy seeing immediate visual results whenever you type something on your screen, Frontend is one of the most rewarding tracks.

Would you like to try a 10-minute exercise on your phone or laptop to see if you enjoy it?`;
    }

    // C. Backend Development & APIs
    if (
      query.includes('backend') ||
      query.includes('back end') ||
      query.includes('api') ||
      query.includes('server') ||
      query.includes('database')
    ) {
      return `**Backend Development in simple layman's language:** ⚙️

Think of a busy restaurant:
* The **Waiter** who hands you the menu and brings your food is the Frontend.
* The **Kitchen** in the back—where the chef keeps food in the freezer, checks the pantry stock, cooks your meal safely, and records the bill—is the **Backend**.

**Everyday Nigerian Example:**
When you transfer ₦5,000 to a friend on your bank app:
1. The screen that asks for your 4-digit PIN is the **Frontend**.
2. But the moment you click send, the app contacts the **Backend**:
   * It checks if your account actually has up to ₦5,000.
   * It subtracts ₦5,000 from your balance.
   * It credits the receiver's account in another bank.
   * It triggers an instant SMS and email alert to both of you.

All of that security, data math, and communication happens behind the scenes. **Backend developers write that logic.**

Do you find yourself more excited by visual design (Frontend) or behind-the-scenes logic (Backend)?`;
    }

    // D. Data Analytics
    if (
      query.includes('data analytics') ||
      query.includes('data analysis') ||
      query.includes('data analyst') ||
      query.includes('data')
    ) {
      return `**Data Analytics in simple layman's language:** 📊

Think of a doctor running a medical test or a detective solving a mystery.

Imagine your friend owns a provision store in Lagos. At the end of every month, she has hundreds of paper receipts. A **Data Analyst** takes all that messy sales information, puts it into a spreadsheet (like Excel), and discovers surprising secrets:
* *"Hey! People buy cold drinks mostly on hot Tuesdays between 2 PM and 4 PM, but almost nobody buys bread on Sunday mornings. Let's stop wasting money baking bread on Sundays and buy a second freezer for drinks!"*

A Data Analyst takes raw numbers, finds patterns, and tells business owners: **"Here is what happened, why it happened, and what you should do next to make more profit."**

You don't need advanced calculus or complex math. If you are naturally curious and enjoy finding answers, you will thrive in Data Analytics.

Would you like to know how analysts use simple tools like Excel and Power BI to start?`;
    }

    // E. Product Management (PM)
    if (
      query.includes('product management') ||
      query.includes('product manager') ||
      query.includes('pm')
    ) {
      return `**Product Management (PM) in simple layman's language:** 🧭

Think of a **movie director** or the **captain of a football team**:
* The movie director is not the main actor, they don't operate the heavy camera, and they don't sew the costumes.
* But the director knows the whole story, sets the vision, makes sure the actors and camera crew communicate, and keeps everyone on schedule and within budget.

In tech, a **Product Manager (PM)**:
* Doesn't write the code.
* Doesn't design the final graphics.
* Instead, they talk to customers to understand their frustrations, talk to the business bosses about profit goals, and guide the engineers and designers on **what to build, why to build it, and when to launch it**.

They are the ultimate bridge between customers, business, and tech builders.

Do you naturally enjoy organizing people, communication, and solving real-life problems?`;
    }

    // F. Cybersecurity
    if (
      query.includes('cyber') ||
      query.includes('security') ||
      query.includes('hacker') ||
      query.includes('hacking')
    ) {
      return `**Cybersecurity in simple layman's language:** 🛡️

Think of the security guards, iron gates, padlocks, and CCTV cameras around a bank vault or an estate.

In the digital world, banks, hospitals, and fintech apps hold millions of people's money, BVNs, and passwords on computers. **Cybersecurity specialists are digital security guards and lock experts.**
* They test the digital doors to see if an armed burglar (a criminal hacker) could sneak in.
* If they find a weak window or an unlocked door, they seal it with strong encryption and security rules before bad actors can steal anything.

It is an exciting, high-integrity field for people who are naturally curious and love solving puzzles.

Does protective digital security sound interesting to you?`;
    }

    // G. Virtual Assistance / Tech Operations
    if (
      query.includes('virtual assistant') ||
      query.includes('virtual assistance') ||
      query.includes('va') ||
      query.includes('operations')
    ) {
      return `**Virtual Assistance (Tech VA) in simple layman's language:** 📋

Think of an executive personal assistant or office manager—except you work 100% remotely from your home, often for international founders or businesses in the US, UK, or Canada.

Busy founders don't have time to:
* Answer 80 customer emails every morning.
* Organize their Google Calendar and schedule meetings across time zones.
* Update their Trello or Notion boards.
* Book flights and research suppliers online.

A **Tech Virtual Assistant** handles all of these digital tasks smoothly. It is one of the **fastest ways to start earning online** because you don't need to learn programming—just master tools like Google Docs, Gmail, Notion, Slack, and Zoom.

Would you like to know how Nigerians set up Upwork profiles to pitch for remote VA roles?`;
    }
  }

  // -------------------------------------------------------------
  // 3. FEASIBILITY & CONSTRAINTS (Hardware, Math, Background, Age)
  // -------------------------------------------------------------
  if (isFeasibility) {
    if (
      query.includes('4gb') ||
      query.includes('ram') ||
      (query.includes('laptop') && (query.includes('can i') || query.includes('enough')))
    ) {
      return `**Can you learn tech with a 4GB RAM laptop? YES, 100%.** 💻

You do not need an expensive ₦800,000 MacBook to start your tech journey. Thousands of successful Nigerian developers wrote their first thousands of lines of code on 4GB RAM dual-core machines.

### What Works Great on 4GB RAM:
* **Frontend Web Development:** HTML, CSS, and JavaScript run completely fine in lightweight editors like **VS Code** or **Sublime Text**.
* **UI/UX Design:** **Figma** runs right in your web browser (Chrome, Edge, or Brave). Just avoid keeping 30 browser tabs open at once.
* **Data Analytics:** Excel, Google Sheets, and SQL run smoothly on 4GB RAM.
* **Technical Writing & Virtual Assistance:** 4GB RAM is more than enough for docs, spreadsheets, Notion, and email management.

### Pro-Tips to Keep a 4GB Laptop Fast:
1. Use **Brave Browser** or Microsoft Edge (they use less RAM than Chrome).
2. Install **Sublime Text** or lightweight **VS Code** extensions.
3. Don't run heavy tools like Android Studio or heavy local virtual machines until you upgrade your RAM to 8GB or 16GB later.

What specific skill are you planning to practice on your machine?`;
    }

    if (
      query.includes('phone') ||
      query.includes('smartphone') ||
      query.includes('without laptop') ||
      device === 'phone_only'
    ) {
      return `**Can you start learning tech on a smartphone without a laptop? YES.** 📱

Many Nigerian developers and tech creators started on an Android phone before they could afford a PC.

### What You Can Realistically Do on a Phone:
* **Learn Programming Logic:** Apps like **Acode** (a code editor for Android) let you write HTML, CSS, and JavaScript with instant live preview.
* **Virtual Assistance & Operations:** Google Docs, Google Sheets, Trello, and Slack work great on mobile.
* **Technical Writing:** Write articles and share lessons on Hashnode, Medium, or LinkedIn directly from your phone.
* **Bite-Sized Practice:** Use **SoloLearn**, **freeCodeCamp Mobile**, or **Mimo** for 20 minutes a day.

*Honest Caveat:* To build large professional portfolio projects or get high-paying full-time engineering jobs, you will eventually need a laptop. But you can learn 60% of the foundational concepts on your phone first!

Would you like the names of the best free mobile apps for your Android or iPhone?`;
    }

    if (
      query.includes('math') ||
      query.includes('mathematics') ||
      query.includes('arts') ||
      query.includes('non-tech')
    ) {
      return `**"I am not good at math / I came from an Arts or Commercial background. Can I do tech?"** 🎓

**Yes, absolutely.** This is one of the biggest myths holding people back in Nigeria.

Most high-paying modern tech careers require **zero advanced math**:
1. **Product Design (UI/UX):** Requires empathy, understanding human behavior, and visual balance. No math at all.
2. **Product Management:** Requires communication, organization, and problem-solving.
3. **Frontend Web Development:** Requires structured logic and visual design, not calculus or algebra.
4. **Technical Writing & Documentation:** Requires clear English communication and the ability to explain things simply.
5. **Virtual Assistance & Tech Operations:** Requires diligence, scheduling, and email etiquette.

Only specialized fields like Artificial Intelligence research, 3D Game Physics, or Algorithmic Trading demand heavy university math.

What course did you study in school, or what kind of work have you been doing? I can show you your transferable strengths.`;
    }
  }

  // -------------------------------------------------------------
  // 4. POWER & DATA SURVIVAL HACKS
  // -------------------------------------------------------------
  if (
    query.includes('nepa') ||
    query.includes('light') ||
    query.includes('power') ||
    query.includes('electricity') ||
    query.includes('data') ||
    query.includes('sub') ||
    query.includes('generator') ||
    query.includes('tariff')
  ) {
    return `**Managing power and data constraints is a core skill for every Nigerian tech builder.** ⚡

Here is the realistic survival blueprint practiced by thousands in our community:

### 1. Power Strategy
* **Get a 20,000mAh or 30,000mAh Power Bank:** Modern power banks with USB-PD can keep your phone, MiFi router, and lightweight Type-C devices alive during blackouts.
* **Batch Your Work Time:** Whenever electricity is available, charge all batteries and download learning materials. Save device battery strictly for active coding, design, or writing, not casual video streaming.
* **Map Out Community Hubs:** Locate local tech hubs, university libraries, or cafes with solar inverters in your town. Many offer subsidized day passes with steady power and high-speed Wi-Fi.

### 2. Data Conservation Tactics
* **Leverage Midnight Bundles:** Take advantage of night data plans (e.g., MTN or Airtel night bundles between 11 PM and 6 AM) to batch-download software packages, YouTube tutorials in 480p, and documentation.
* **Text-First Learning:** Sites like **The Odin Project**, **MDN Web Docs**, and **W3Schools** consume 95% less internet data than streaming video courses.
* **DevDocs.io Offline Cache:** Visit DevDocs.io, install offline documentation for JavaScript, Python, or CSS, and read it anywhere without an active internet connection.

Would you like offline resource recommendations tailored to your field?`;
  }

  // -------------------------------------------------------------
  // 5. SCHOLARSHIPS & FREE TRAININGS (3MTT, DevCareer, ALX)
  // -------------------------------------------------------------
  if (
    query.includes('3mtt') ||
    query.includes('scholarship') ||
    query.includes('alx') ||
    query.includes('devcareer') ||
    query.includes('fellowship') ||
    query.includes('free training')
  ) {
    return `**Legitimate Free Tech Training & Laptop Scholarships in Nigeria:** 🎓

Here are the top active programs:

### 1. 3MTT (3 Million Technical Talent by Federal Ministry of Comm/NITDA)
* Fully funded government training in Software Development, Data Analytics, UI/UX, AI, and Cybersecurity.
* Practical learning in physical community hubs across all 36 states and FCT. Register on **3mtt.nitda.gov.ng**.

### 2. DevCareer (#Laptops4Developers)
* Provides free laptops, mentorship, learning hub access, and internet data for committed beginners across Africa.
* Follow @dev_career on Twitter/X for open cohort application windows.

### 3. ALX Africa
* World-class intensive programs in Software Engineering, Data Analytics, and Cloud Computing sponsored by the Mastercard Foundation.

### 4. Ingressive For Good (I4G) & SheCodeAfrica
* Offers micro-scholarships, Coursera and DataCamp licenses, and dedicated female mentorship tracks.

Are you looking for application advice or assistance choosing the right track for one of these programs?`;
  }

  // -------------------------------------------------------------
  // 6. ROADMAPS (Only when explicitly asked for steps/plan/roadmap)
  // -------------------------------------------------------------
  if (isRoadmapRequest) {
    if (
      query.includes('ui') ||
      query.includes('ux') ||
      query.includes('product design') ||
      query.includes('figma')
    ) {
      return `**Here is your actionable 3-month roadmap for UI/UX & Product Design:** 🎨

### Month 1: Fundamentals & Figma Fluency
* Learn Figma basics: frames, shapes, typography hierarchy, and color theory.
* Master auto-layout, components, and responsive constraints (Figma's superpower).
* *Action:* Clone 3 existing mobile screens you love (like Spotify, PiggyVest, or Kuda) in Figma to develop an eye for spacing.

### Month 2: Real User Experience (UX) Research
* Learn how to interview real users and discover their actual pain points.
* Learn user journey mapping, wireframing, and interactive prototyping.
* *Action:* Find a broken digital experience in Nigeria (e.g. university course registration portal or electricity payment app) and sketch a cleaner, simpler redesign.

### Month 3: Portfolio Case Studies & Proof
* Build 2 detailed case studies on Notion, Behance, or your website explaining: The Problem, Your Research, Iterations, and Final Prototype.
* Start sharing your design journey on Twitter/LinkedIn.

Would you like a link to free Figma practice exercises to begin today?`;
    }

    if (
      query.includes('frontend') ||
      query.includes('web') ||
      query.includes('html') ||
      query.includes('javascript')
    ) {
      return `**Here is your actionable 3-month roadmap for Frontend Web Development:** 💻

### Month 1: HTML5 & CSS3 Foundations
* **HTML:** Semantic tags (\`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<footer>\`), forms, and clean structure.
* **CSS:** Box model, Flexbox, and CSS Grid. Make layouts responsive on budget phones.
* *Free Resource:* **freeCodeCamp Responsive Web Design** certification.

### Month 2: JavaScript Logic & Interactivity
* Variables, functions, loops, array methods (\`map\`, \`filter\`, \`reduce\`), and DOM events.
* Fetching live data using APIs (\`fetch\`, \`async/await\`).
* *Milestone Projects:* Build a Naira currency converter and an interactive task tracker.

### Month 3: Modern Tooling & Frameworks
* Learn **Tailwind CSS** for clean, rapid styling.
* Learn **React** (components, hooks, state).
* Host your projects live on **Vercel** or **GitHub Pages** for employers to test.

Would you like a simple Day-One coding template to start on your phone or laptop?`;
    }
  }

  // -------------------------------------------------------------
  // 7. EARNING & JOBS (Proof of work)
  // -------------------------------------------------------------
  if (
    query.includes('job') ||
    query.includes('money') ||
    query.includes('salary') ||
    query.includes('earn') ||
    query.includes('freelance') ||
    query.includes('upwork') ||
    query.includes('client') ||
    query.includes('remote')
  ) {
    return `**Earning in tech depends on proof of work, not paper certificates.** 💼

Here is the realistic progression for Nigerian beginners:

### 1. Build 2 or 3 Functional Proof Projects
* Clients and employers care about what you have deployed that actually works.
* Ensure your projects have live links, clean GitHub repositories, or Figma prototypes, and brief 1-minute Loom video demos.

### 2. Local Community Gigs First
* Help a local business, school, church, or entrepreneur establish a digital presence, organize their inventory, or design their flyers/app.
* Gather genuine testimonials and initial Naira earnings to build your confidence.

### 3. Global Freelancing & Remote Roles
* Optimize your **LinkedIn** and **Upwork** profiles around a clear, specific outcome rather than generic titles.
* Set up a reliable foreign transfer account (such as Geegpay or Grey) to receive USD/GBP payments smoothly.

What is the biggest obstacle currently standing between you and your first tech client or job?`;
  }

  // -------------------------------------------------------------
  // 8. GENERAL / DEFAULT GUIDANCE (Warm, grounded, conversational)
  // -------------------------------------------------------------
  return `**I am right here with you!** 🇳🇬

${
  niche
    ? `Looking at your diagnostic pathway in **${niche}**, `
    : ''
}Here is the best mindset to make steady progress:

1. **Pick one pathway and stick with it for 30 days:** The most common trap for Nigerian beginners is jumping between Python, React, UI/UX, and Cybersecurity every week. Focused consistency builds competence.
2. **Prioritize building over passive video watching:** After every lesson, build something small on your own without following a video tutorial line-by-line. That is where real confidence comes from.
3. **Ask me any specific question:** Whether it's about hardware, data tariffs, what a particular role does every day, or breaking down technical jargon into plain English, I'm here to help.

What specific question or concept can I break down for you right now?`;
}
