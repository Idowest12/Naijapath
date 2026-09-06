export interface DiagnosticContext {
  matchedNiche?: string;
  device?: string;
  weeklyHours?: string;
  location?: string;
  proudAchievement?: string;
}

/**
 * Intelligent client & server Nigerian tech career mentor engine.
 * Delivers grounded, actionable, low-bandwidth-friendly career guidance.
 */
export function generateSmartMentorResponse(
  userQuery: string,
  context?: DiagnosticContext
): string {
  const query = (userQuery || '').toLowerCase().trim();
  const niche = context?.matchedNiche || '';
  const device = context?.device || '';

  // 1. Phone-only learning / smartphone setups
  if (
    query.includes('phone') ||
    query.includes('smartphone') ||
    query.includes('android') ||
    query.includes('mobile') ||
    device === 'phone_only'
  ) {
    return `**Yes, you can absolutely begin your tech journey on a smartphone.** 📱

Many successful Nigerian software developers, writers, and product builders started with an Android phone before acquiring a laptop. Here is how to make it work:

### 1. Essential Mobile Apps to Install Today
* **Acode (Google Play Store):** A fast, lightweight code editor with syntax highlighting for HTML, CSS, JavaScript, and Python. It has an offline browser preview so you do not waste data.
* **Termux:** A full Linux terminal on Android. You can install Python, Node.js, and Git to practice real terminal commands.
* **Pydroid 3 (for Python):** An offline Python interpreter with popular libraries built in.
* **SoloLearn & freeCodeCamp:** Smooth mobile web platforms for bite-sized daily logic practice.
* **GitHub Mobile:** Track issues, read real-world source code, and explore open-source repositories.

### 2. High-Yield Tracks for Smartphone Starters
* **Technical Writing & Documentation:** Write tutorials and articles on Hashnode or Medium directly from your phone.
* **Digital Marketing & SEO:** Analyze search trends, create social copy, and run campaigns on mobile.
* **Web Fundamentals (HTML/CSS):** Code landing pages and mobile interfaces using Acode or Replit.

### 3. Data & Power Tactics
* Use night data plans (MTN, Airtel, Glo night bundles) to download video playlists or documentation.
* Save tutorials as offline PDFs or bookmark text sites like MDN Web Docs.

Which specific skill are you looking to practice on your phone?`;
  }

  // 2. Power cuts / NEPA / PHCN / Data subscriptions / Light issues
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
* **Get a 20,000mAh or 30,000mAh Power Bank:** Modern power banks with USB Power Delivery (USB-PD) can power your phone, MiFi router, and even lightweight laptops via Type-C.
* **Batch Your Work Time:** Whenever electricity is available, charge all batteries and download learning materials. Save device battery strictly for active coding, design, or writing, not casual video streaming.
* **Map Out Community Hubs:** Locate local tech hubs, university libraries, or cafes with solar inverters in your town. Many offer subsidized day passes with steady power and high-speed Wi-Fi.

### 2. Data Conservation Tactics
* **Leverage Midnight Bundles:** Take advantage of night data plans (e.g., MTN or Airtel 2GB for N200 to N300 between 11 PM and 6 AM) to batch-download software packages, YouTube tutorials in 480p, and documentation.
* **Text-First Learning:** Sites like **The Odin Project**, **MDN Web Docs**, and **W3Schools** consume 95% less internet data than streaming video courses.
* **DevDocs.io Offline Cache:** Visit DevDocs.io, install offline documentation for JavaScript, Python, or CSS, and read it anywhere without an active internet connection.

Would you like offline resource recommendations tailored to your field?`;
  }

  // 3. Frontend Web Development
  if (
    query.includes('frontend') ||
    query.includes('html') ||
    query.includes('css') ||
    query.includes('javascript') ||
    query.includes('react') ||
    query.includes('tailwind') ||
    query.includes('web dev')
  ) {
    return `**Frontend Development is one of the most accessible and high-demand tracks in Nigeria and abroad.** 💻

Here is your practical, step-by-step roadmap:

### Phase 1: Core Fundamentals (Weeks 1 to 4)
* **HTML5:** Semantic elements (\`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<footer>\`), forms, and clean structure.
* **CSS3:** Box model, Flexbox, and CSS Grid. Build layouts that adapt cleanly from a budget smartphone to a widescreen monitor.
* **Free Resource:** **freeCodeCamp Responsive Web Design** certification.

### Phase 2: JavaScript Logic (Weeks 5 to 10)
* Master DOM manipulation, events, array methods (\`map\`, \`filter\`, \`reduce\`), and asynchronous JavaScript (\`fetch\`, \`async/await\`).
* **Milestone Projects:** Build an interactive Naira budget calculator, a task organizer, and a weather widget that pulls live data from a public API.

### Phase 3: Modern Tooling & Frameworks (Weeks 11 to 16)
* Learn **Tailwind CSS** for fast, maintainable styling.
* Learn **React** or **Next.js** (components, hooks, state management).
* Deploy your projects live on **Vercel** or **GitHub Pages** so potential employers can test your code immediately.

### Your Day-One Step
Open your editor and build a simple personal profile card with your photo, bio, and social links. Deploy it online today!

Would you like a starter template for your first portfolio project?`;
  }

  // 4. Backend Development & APIs
  if (
    query.includes('backend') ||
    query.includes('node') ||
    query.includes('python') ||
    query.includes('api') ||
    query.includes('database') ||
    query.includes('sql') ||
    query.includes('django') ||
    query.includes('express')
  ) {
    return `**Backend Development is the architectural engine behind apps, managing logic, security, and data.** ⚙️

Here is how to build a rock-solid foundation:

### 1. Choose One Primary Language First
* **Node.js (JavaScript/TypeScript):** Great if you already know JavaScript; huge ecosystem with Express and NestJS.
* **Python:** Readable syntax, rapid development with FastAPI or Django, and widely used in fintech and data.

### 2. Core Pillars to Master
* **RESTful APIs:** HTTP methods (GET, POST, PUT, DELETE), status codes, request validation, and error handling.
* **Databases:** Learn relational databases like PostgreSQL. Understand tables, relationships, indexes, and SQL queries.
* **Authentication & Security:** JWT tokens, password hashing with bcrypt, and session management.
* **Fintech Integrations:** Integrate Paystack or Flutterwave test payment gateways, which is a major hiring requirement for Nigerian startups.

### 3. Realistic Portfolio Project
Build a mini inventory and invoicing API for a Nigerian retail business, allowing store owners to add stock, record customer sales, and query daily profit reports.

Which language feels more natural to you: Node.js or Python?`;
  }

  // 5. UI/UX & Product Design
  if (
    query.includes('ui') ||
    query.includes('ux') ||
    query.includes('figma') ||
    query.includes('product design') ||
    query.includes('wireframe')
  ) {
    return `**UI/UX Design is a high-impact, non-coding tech career where you craft intuitive digital products.** 🎨

Here is your actionable learning plan:

### 1. Master Figma (Industry Standard)
* Learn auto-layout, components, variants, design systems, and responsive constraints.
* *Note:* Figma runs smoothly in modern web browsers and has a generous free tier.

### 2. Understand Real User Experience (UX)
* Learn user interviews, persona creation, user journey mapping, and usability testing.
* Practice analyzing broken digital experiences you encounter in daily life (like a confusing banking transfer flow or an unreadable school portal).

### 3. Build Detailed Case Studies
* Recruiters look for your thought process: what was the user problem, what research did you conduct, how did your wireframes evolve, and what was the validated final prototype?
* Publish your case studies on Notion, Behance, or your own portfolio website.

Would you like to analyze a common UX flaw in Nigerian apps and explore how to redesign it?`;
  }

  // 6. Data Analytics & Business Intelligence
  if (
    query.includes('data') ||
    query.includes('analytics') ||
    query.includes('excel') ||
    query.includes('power bi') ||
    query.includes('tableau')
  ) {
    return `**Data Analytics is in high demand across Nigerian banks, FMCG companies, fintechs, and foreign remote teams.** 📊

Here is your progressive roadmap:

### 1. Advanced Microsoft Excel / Google Sheets
* Master Pivot Tables, VLOOKUP, XLOOKUP, INDEX-MATCH, and conditional formatting.
* Many entry-level analyst roles rely heavily on structured Excel hygiene.

### 2. SQL (Structured Query Language)
* Learn SELECT, WHERE, GROUP BY, JOINs, subqueries, and window functions.
* Practice for free on **SQLBolt** and **Mode Analytics SQL Tutorial**.

### 3. Business Intelligence Dashboards
* Learn **Power BI** or **Tableau** to transform messy datasets into executive visual reports with interactive filters and KPIs.

### 4. Python for Analytics (Next Level)
* Learn Pandas, NumPy, and Matplotlib to handle larger datasets and automate reporting.

Would you like a sample public Nigerian dataset (such as NBS inflation trends or commodity prices) to practice analyzing?`;
  }

  // 7. Scholarships, Fellowships, and Free Training (3MTT, DevCareer, ALX)
  if (
    query.includes('3mtt') ||
    query.includes('scholarship') ||
    query.includes('alx') ||
    query.includes('devcareer') ||
    query.includes('fellowship') ||
    query.includes('free course') ||
    query.includes('free training')
  ) {
    return `**Nigeria has several outstanding free tech training and scholarship initiatives.** 🎓

Here are the top legitimate programs to track:

### 1. 3MTT (3 Million Technical Talent by NITDA)
* Federal initiative offering fully funded training in Software Development, Data, UI/UX, AI/ML, and Cybersecurity.
* Practical learning in physical hubs across all 36 states and FCT. Register on **3mtt.nitda.gov.ng**.

### 2. DevCareer (#Laptops4Developers)
* Provides free laptops, mentorship, learning hub access, and internet data for committed beginners across Africa.
* Follow @dev_career on Twitter/X for open application windows.

### 3. ALX Africa
* Intensive world-class programs in Software Engineering, Data Analytics, and Cloud Computing sponsored by Mastercard Foundation.

### 4. Ingressive For Good (I4G) & SheCodeAfrica
* Offers micro-scholarships, Coursera and DataCamp licenses, and dedicated female mentorship tracks.

Are you looking for application advice or assistance choosing the right track for one of these programs?`;
  }

  // 8. Earning, Freelancing, Remote Work & Jobs
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
* Ensure your projects have live links, clean GitHub repositories, and brief demonstration videos.

### 2. Local Freelancing & Community Gigs
* Help a local school, store, church, or entrepreneur establish a web presence or organize their inventory records.
* Gather genuine testimonials and initial Naira earnings to build your confidence.

### 3. Global Freelancing & Remote Roles
* Optimize your **LinkedIn** and **Upwork** profiles around a clear, specific outcome rather than generic titles.
* Set up a reliable foreign transfer account (such as Geegpay or Grey) to receive foreign currency payments smoothly.

What is the biggest obstacle currently standing between you and your first tech client or job?`;
  }

  // 9. General guidance with contextual diagnostic awareness
  return `**I am right here with you!** 🇳🇬

${
  niche
    ? `Connecting with your diagnostic profile in **${niche}**, `
    : ''
}Here is the best strategy to make steady progress:

1. **Pick one pathway and stick to it for 30 days:** The most common obstacle for Nigerian beginners is switching between Python, React, UI/UX, and Cybersecurity every week. Deep focus on one track builds true competence.
2. **Prioritize building over passive watching:** After every tutorial, build something small on your own without following a video. Even a simple calculator, landing page, or spreadsheet builds real confidence.
3. **Connect with a local community:** Join your city's Google Developer Group (GDG) or campus tech clubs to stay motivated through power outages and data hurdles.

What specific question or hurdle can I help you tackle right now?`;
}
