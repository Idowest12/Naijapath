import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { analyticsManager, AnalyticsEvent } from "./server/analytics";

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Analytics & Telemetry API ---
app.post("/api/analytics/event", (req, res) => {
  try {
    const event = req.body as AnalyticsEvent;
    if (!event || !event.type) {
      return res.status(400).json({ error: "Invalid event data" });
    }
    analyticsManager.recordEvent(event);
    return res.json({ success: true });
  } catch (err) {
    console.error("Analytics event ingestion error:", err);
    return res.status(500).json({ error: "Failed to record event" });
  }
});

app.post("/api/analytics/sync-records", (req, res) => {
  try {
    const { records } = req.body as { records?: any[] };
    if (!Array.isArray(records)) {
      return res.status(400).json({ error: "records must be an array" });
    }
    const result = analyticsManager.syncRecords(records);
    return res.json({ success: true, ...result });
  } catch (err) {
    console.error("Analytics sync-records error:", err);
    return res.status(500).json({ error: "Failed to sync records" });
  }
});

// --- Admin Authentication & Dashboard API ---
app.post("/api/admin/login", (req, res) => {
  try {
    const { passkey } = req.body as { passkey?: string };
    if (!passkey) {
      return res.status(400).json({ success: false, error: "Admin passkey is required." });
    }
    const result = analyticsManager.verifyPasskey(passkey);
    if (!result.success) {
      return res.status(401).json(result);
    }
    return res.json(result);
  } catch (err) {
    console.error("Admin login error:", err);
    return res.status(500).json({ success: false, error: "Login failed." });
  }
});

app.get("/api/admin/stats", (req, res) => {
  try {
    const token = req.headers["x-admin-token"] as string;
    if (!analyticsManager.validateToken(token)) {
      return res.status(401).json({ error: "Unauthorized: Invalid or expired admin token." });
    }
    const stats = analyticsManager.getAggregatedStats();
    return res.json({ success: true, stats });
  } catch (err) {
    console.error("Admin stats error:", err);
    return res.status(500).json({ error: "Failed to fetch stats." });
  }
});

app.post("/api/admin/update-passkey", (req, res) => {
  try {
    const token = req.headers["x-admin-token"] as string;
    const { newPasskey } = req.body as { newPasskey?: string };
    if (!newPasskey) {
      return res.status(400).json({ error: "New passkey is required." });
    }
    const result = analyticsManager.updatePasskey(token, newPasskey);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.json({ success: true, message: "Admin passkey updated successfully." });
  } catch (err) {
    console.error("Admin update passkey error:", err);
    return res.status(500).json({ error: "Failed to update passkey." });
  }
});

app.post("/api/admin/reset-stats", (req, res) => {
  try {
    const token = req.headers["x-admin-token"] as string;
    const result = analyticsManager.resetStats(token);
    if (!result.success) {
      return res.status(401).json(result);
    }
    return res.json({ success: true, message: "Analytics statistics reset to baseline." });
  } catch (err) {
    console.error("Admin reset stats error:", err);
    return res.status(500).json({ error: "Failed to reset stats." });
  }
});

app.get("/api/admin/export", (req, res) => {
  try {
    const token = req.headers["x-admin-token"] as string;
    const format = req.query.format === 'csv' ? 'csv' : 'json';
    if (!analyticsManager.validateToken(token)) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    const stats = analyticsManager.getAggregatedStats();

    if (format === 'csv') {
      const headers = ['Niche ID', 'Career Track Title', 'Total Recommendations', 'Percentage', 'Average Match Fit'];
      const rows = stats.allRecommendations.map(r => [
        r.nicheId,
        `"${r.nicheTitle.replace(/"/g, '""')}"`,
        r.count,
        `${r.percentage}%`,
        `${r.avgScore}%`
      ]);
      const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="naija_tech_recommendations_${Date.now()}.csv"`);
      return res.send(csv);
    }

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="naija_tech_analytics_${Date.now()}.json"`);
    return res.json(stats);
  } catch (err) {
    console.error("Admin export error:", err);
    return res.status(500).json({ error: "Export failed." });
  }
});

// Smart contextual mentor response generator for Nigerian tech learners
function generateSmartMentorResponse(
  userQuery: string,
  context?: {
    matchedNiche?: string;
    device?: string;
    weeklyHours?: string;
    location?: string;
    proudAchievement?: string;
  }
): string {
  const query = userQuery.toLowerCase();
  const niche = context?.matchedNiche || '';
  const device = context?.device || '';

  // 1. Phone-only learning / hardware setup
  if (query.includes('phone') || query.includes('smartphone') || query.includes('android') || device === 'phone_only') {
    return `**Yes, you can definitely start your tech journey on a smartphone.** 📱

Many successful Nigerian developers began on mobile before getting their first laptop. Here is the realistic game plan:

1. **Essential Mobile Apps:**
   - **Acode** (Android): A fast, lightweight code editor that supports HTML, CSS, and JavaScript with live browser preview offline.
   - **Termux**: A full Linux terminal environment on Android for running Python, Git, and Node.js commands.
   - **SoloLearn & freeCodeCamp**: Interactive lessons that work smoothly on mobile browsers.
   - **GitHub Mobile**: For reviewing code, tracking issues, and learning open-source structure.

2. **Best Smartphone-Friendly Pathways:**
   - **Technical Writing & Content**: Drafting developer guides, documentation, and articles on Hashnode or Medium.
   - **Digital Marketing & SEO**: Managing campaigns, copywriting, and social analytics directly from your phone.
   - **Web Fundamentals**: Practicing HTML, CSS, and basic JavaScript using Acode or Replit mobile.

3. **Data & Power Tips:**
   - Download learning materials on night data plans (MTN/Airtel/Glo night bundles).
   - Use offline documentation apps like **DevDocs** or save web pages as PDFs for offline study during power outages.

What specific track are you most excited to explore on your phone?`;
  }

  // 2. Power cuts / NEPA / PHCN / Data subscriptions
  if (query.includes('nepa') || query.includes('light') || query.includes('power') || query.includes('data') || query.includes('electricity') || query.includes('generator')) {
    return `**Navigating power and data constraints is part of the Nigerian tech developer survival toolkit.** ⚡

Here is how thousands of developers in our community manage it effectively:

1. **Power Strategy:**
   - **Invest in a 20,000mAh or 30,000mAh Power Bank:** High-capacity power banks with USB-PD can power your phone, router, and sometimes lightweight laptops.
   - **Batch Your Work:** Charge all devices whenever electricity is restored. Use battery time strictly for focused coding or designing, not passive video scrolling.
   - **Locate Nearby Co-working Hubs or Cyber Cafes:** Places like local tech hubs, university libraries, or cafes with solar inverters give you steady power and networking with fellow learners.

2. **Data Conservation Tactics:**
   - **Leverage Night Data Bundles:** Download course videos, packages, and documentation during midnight off-peak hours (usually 500MB to 2GB for N50-N200).
   - **Read Documentation First:** Official docs (MDN Web Docs, Python.org, React docs) consume 95% less data than streaming YouTube at 1080p.
   - **Work Offline:** Code locally in VS Code or your text editor without keeping active web streams open.

Would you like recommendations for free offline learning packs for your pathway?`;
  }

  // 3. Frontend & Web Development
  if (query.includes('frontend') || query.includes('html') || query.includes('css') || query.includes('javascript') || query.includes('react') || query.includes('web development')) {
    return `**Frontend Development is one of the most visible, high-demand tracks in Nigeria and globally.** 💻

Here is your straightforward, step-by-step roadmap:

1. **Stage 1: The Core Foundation (Weeks 1 to 4)**
   - **HTML5 & Semantic Markup:** Learn clean page structure, forms, and accessibility.
   - **CSS3 & Responsive Design:** Flexbox, CSS Grid, and mobile-first layouts so your websites look crisp on phones and monitors.
   - *Free resource:* **freeCodeCamp Responsive Web Design** certification.

2. **Stage 2: JavaScript Logic (Weeks 5 to 10)**
   - Master DOM manipulation, fetch API, async/await, and event listeners.
   - Build 3 small projects: a Nigerian currency converter, a task organizer, and a simple quiz app.

3. **Stage 3: Modern Frameworks & Tooling (Weeks 11 to 16)**
   - Learn **Tailwind CSS** for rapid styling and **React** (or Next.js).
   - Integrate a real local API, like Paystack test checkout or Nigeria public holidays API.

4. **Your Day-One Action:**
   - Open your editor and build a single-page profile card with your picture, bio, and social links. Don't worry about complexity yet; just publish it on GitHub Pages or Vercel!

Do you want to see an example starter template for your first project?`;
  }

  // 4. Backend Development & APIs
  if (query.includes('backend') || query.includes('node') || query.includes('python') || query.includes('api') || query.includes('database') || query.includes('sql') || query.includes('django')) {
    return `**Backend Development is the architectural engine behind apps, handling data, logic, and security.** ⚙️

Here is how to build a rock-solid backend foundation in Nigeria:

1. **Pick One Language to Master First:**
   - **Node.js (JavaScript/TypeScript):** Great if you already know some JS; massive ecosystem with Express.
   - **Python:** Extremely readable, powerful with FastAPI or Django, and widely used in fintech and data.

2. **Core Pillars to Master:**
   - **RESTful APIs:** HTTP methods (GET, POST, PUT, DELETE), status codes, and request validation.
   - **Databases:** Start with PostgreSQL or SQLite. Understand schemas, tables, relationships, and queries.
   - **Authentication:** JWT tokens, password hashing with bcrypt, and session security.
   - **Local Payments Integration:** Build a mock checkout endpoint using Paystack or Flutterwave test API keys.

3. **Realistic Portfolio Project:**
   - Build a mini POS/Inventory API for a Nigerian corner store where shop owners can register products, record sales, and view daily revenue.

Which language feels more natural to you: JavaScript or Python?`;
  }

  // 5. UI/UX & Product Design
  if (query.includes('ui') || query.includes('ux') || query.includes('design') || query.includes('figma') || query.includes('product design')) {
    return `**UI/UX Design is a high-yield pathway that requires no coding and allows you to create intuitive digital experiences.** 🎨

Here is your actionable learning plan:

1. **Master Figma (The Industry Standard):**
   - Learn auto-layout, components, variants, design systems, and responsive wireframes.
   - *Tip:* Figma has an excellent free tier and runs in your browser.

2. **Understand UX Fundamentals:**
   - User empathy, heuristic evaluation, user interviews, and information architecture.
   - Practice redesigning broken real-world experiences you encounter daily (like a frustrating Nigerian mobile banking transfer flow).

3. **Build Case Studies, Not Just Dribbble Shots:**
   - Recruiters look for your thought process: what was the user problem, what research did you do, how did wireframes evolve, and what was the final result?
   - Publish case studies on Notion, Behance, or your own portfolio.

Would you like to analyze a common UX flaw in Nigerian apps and how to redesign it?`;
  }

  // 6. Data Analytics
  if (query.includes('data') || query.includes('analytics') || query.includes('excel') || query.includes('power bi') || query.includes('sql')) {
    return `**Data Analytics is in huge demand across Nigerian banks, FMCG companies, logistics, and foreign remote teams.** 📊

Here is your progressive learning roadmap:

1. **Phase 1: Advanced Microsoft Excel / Google Sheets**
   - Master Pivot Tables, VLOOKUP/XLOOKUP, INDEX-MATCH, and clean conditional formatting.
   - Many entry-level analyst roles rely heavily on strong Excel hygiene.

2. **Phase 2: SQL (Structured Query Language)**
   - Learn SELECT, WHERE, GROUP BY, JOINs, subqueries, and window functions.
   - Practice for free on **SQLBolt** and **Mode Analytics SQL Tutorial**.

3. **Phase 3: Business Intelligence Dashboards**
   - Learn **Power BI** or **Tableau** to turn raw numbers into executive visual dashboards.

4. **Phase 4: Python for Analytics (Optional Next Step)**
   - Pandas, NumPy, and Matplotlib for deeper statistical modeling.

Would you like a sample public Nigerian dataset (like NBS census or fuel price trends) to practice analyzing?`;
  }

  // 7. Scholarships & Programs (3MTT, ALX, DevCareer, etc.)
  if (query.includes('3mtt') || query.includes('scholarship') || query.includes('alx') || query.includes('devcareer') || query.includes('fellowship') || query.includes('free training')) {
    return `**Nigeria has some of the most vibrant tech scholarship initiatives in Africa.** 🎓

Here are the top legitimate programs you should keep on your radar:

1. **3MTT (3 Million Technical Talent by NITDA):**
   - Federal government initiative providing fully sponsored training in Software Development, Data, UI/UX, AI/ML, and Cybersecurity.
   - Training takes place in local hubs across all 36 states and FCT. Check **3mtt.nitda.gov.ng** for open cohort registrations.

2. **DevCareer (#Laptops4Developers):**
   - Provides free laptops, mentorship, learning hubs, and internet data for dedicated beginners in tech.
   - Follow @dev_career on X (Twitter) for upcoming application cycles.

3. **ALX Africa:**
   - Intensive, world-class programs in Software Engineering, Data Analytics, and Cloud Computing with Mastercard Foundation sponsorships.

4. **Ingressive For Good (I4G) & She Code Africa:**
   - Micro-scholarships, Coursera/Datacamp licenses, and female-focused mentorship cohorts.

Are you looking for an application strategy or help picking the right track for one of these programs?`;
  }

  // 8. Earning, Freelancing, and Getting Hired
  if (query.includes('job') || query.includes('money') || query.includes('salary') || query.includes('earn') || query.includes('freelance') || query.includes('upwork') || query.includes('client')) {
    return `**Earning in tech is a marathon of proof of work, not just certificates.** 💼

Here is the realistic progression for Nigerian tech starters:

1. **Stage 1: Build 2 or 3 Concrete Proof Projects**
   - Employers and clients do not care how many courses you watched. They care about what you have deployed or designed that actually works.
   - Make sure your projects have live links and clear documentation.

2. **Stage 2: Local Freelancing & Community Gigs**
   - Help a local business, church, school, or friend build an online presence, streamline their records in Excel, or create a brand package.
   - Collect your first genuine testimonials and Naira payments.

3. **Stage 3: International Freelancing & Remote Roles**
   - Optimize your **LinkedIn** and **Upwork** profile.
   - Focus on specific niches rather than "generalist developer". For example: "Shopify Speed Optimization" or "Paystack Payment Gateway Integrator".
   - Setup a domiciliary account or reliable payment platform (like Geegpay or Grey) to receive foreign client transfers.

What is the biggest roadblock currently standing between you and your first tech gig?`;
  }

  // General default answer with contextual warmth
  return `**I am right here with you!** 🇳🇬

${niche ? `Based on your diagnostic profile in **${niche}**, ` : ''}Here is the best way to move forward today:

1. **Focus on one thing at a time:** The biggest trap for Nigerian beginners is tutorial overload, jumping between Python, React, and UI/UX every week. Pick one pathway and commit to 30 days of daily practice.
2. **Prioritize proof of work:** Even if it is just a simple calculator, a basic Figma landing page, or a cleaned spreadsheet, build something tangible.
3. **Connect with a learning circle:** Join local communities like GDG, ForLoop, or our campus circles to stay motivated when power or data gets tough.

What specific question or roadblock can I help you break down right now?`;
}

// Lazy-initialized Gemini client with required User-Agent telemetry
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Naija Tech Career Advisor API" });
});

// Chat endpoint for Naija Tech AI Mentor
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, context } = req.body as {
      messages: Array<{ role: 'user' | 'assistant' | 'model'; content: string }>;
      context?: {
        matchedNiche?: string;
        device?: string;
        weeklyHours?: string;
        location?: string;
        proudAchievement?: string;
      };
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Invalid or empty messages array." });
    }

    const lastUserMsg = messages[messages.length - 1]?.content || "";

    // If API key is not configured, gracefully use our intelligent mentor engine
    if (!process.env.GEMINI_API_KEY) {
      const fallbackReply = generateSmartMentorResponse(lastUserMsg, context);
      return res.json({
        reply: fallbackReply,
        source: "mentor-engine",
      });
    }

    // Build context string if provided
    let userContextString = "";
    if (context) {
      userContextString = `
User Diagnostic Profile Context:
- Matched Tech Pathway: ${context.matchedNiche || 'Not yet taken'}
- Primary Hardware/Device: ${context.device || 'Unspecified'}
- Available Learning Hours: ${context.weeklyHours || 'Unspecified'}
- Location: ${context.location || 'Nigeria'}
- Transferable Experience / Pride Project: ${context.proudAchievement || 'None provided'}
`;
    }

    const systemInstruction = `You are "Tizzi" (Naija Tech Guide AI Advisor), an empathetic, deeply knowledgeable, realistic, and encouraging tech career mentor built specifically for Nigerian youths, university students, and career switchers.

Key Personality & Knowledge Base:
1. Honest & Real-World Grounded:
   - You understand Nigerian realities: irregular power supply (NEPA/PHCN), fuel costs for generators, expensive mobile data tariffs (MTN/Airtel/Glo), and device limitations (e.g. 4GB RAM laptops or starting on an Android smartphone).
   - You give candid, actionable advice without hype or "get-rich-quick" tech myths.
   - You emphasize high-yield, low-bandwidth learning strategies (offline video downloads at night, reading documentation, lightweight text editors like VS Code or browser sandboxes, FreeCodeCamp, GitHub).

2. Deep Tech Field Breadth:
   - Full-Stack Web Development, Frontend (HTML, CSS, JavaScript, React, Next.js, Tailwind), Backend (Node.js, Express, Python/Django, PostgreSQL, MongoDB, APIs, Paystack/Flutterwave integrations).
   - UI/UX & Product Design (Figma, UX research, wireframing, portfolio case studies).
   - Data Analytics & Data Science (Excel, SQL, Power BI, Python, Pandas).
   - Cyber Security & Ethical Hacking, Software QA/Testing.
   - Technical Writing & Developer Documentation (Hashnode, Dev.to, Medium).
   - Product Management, Virtual Assistance (remote client support, calendar/email management).
   - Digital Marketing, SEO, and Brand Identity.

3. Nigerian Tech Ecosystem & Opportunities:
   - Programs & Scholarships: 3MTT (3 Million Technical Talent), ALX Africa, DevCareer (Laptop scholarship), SheCodeAfrica, Ingressive For Good (I4G), NITDA scholarships.
   - Local Tech Communities: GDG (Google Developer Groups) Lagos/Abuja/PH/Ibadan, ForLoop Africa, Python Nigeria, Web3Bridge.
   - Earning & Freelancing Realities: Upwork, Fiverr, Contra, local Nigerian startups (PiggyVest, Paystack, Moniepoint, Flutterwave, Chowdeck), and finding foreign remote gigs from Nigeria.

4. Communication Style:
   - Warm, respectful, sharp, and conversational (natural Nigerian English with occasional relatable phrases like "No shaking", "Step by step", "Wahala-free", but always professional, crisp, and articulate).
   - Avoid artificial em-dashes and robotic phrases.
   - Format answers using clean markdown: bullet points, clear headings, bold text for key terms, and code blocks if showing coding snippets.
   - Keep answers practical, structured, and easy to read on mobile screens.

${userContextString}`;

    try {
      const ai = getAiClient();

      // Map message history to Gemini API format
      const contents = messages.map((m) => ({
        role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      // Use the recommended Gemini model for text and Q&A: gemini-3.8-flash
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "I am right here with you. What specific question or topic can I break down for you next?";

      return res.json({
        reply: replyText,
        source: "gemini",
      });
    } catch (aiErr: any) {
      console.warn("Gemini API call warning, falling back to smart mentor engine:", aiErr?.message || aiErr);
      const fallbackReply = generateSmartMentorResponse(lastUserMsg, context);
      return res.json({
        reply: fallbackReply,
        source: "mentor-engine",
      });
    }
  } catch (err: any) {
    console.error("Chat endpoint error:", err);
    return res.status(500).json({
      error: err?.message || "An unexpected error occurred while processing your request.",
    });
  }
});

// Serve frontend in dev or prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TIZZITECH Naija Tech Guide server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
