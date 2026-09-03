import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { analyticsManager, AnalyticsEvent } from "./server/analytics";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
   - Format answers using clean markdown: bullet points, clear headings, bold text for key terms, and code blocks if showing coding snippets.
   - Keep answers practical, structured, and easy to read on mobile screens.

${userContextString}`;

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      // Fallback realistic response if API key is not yet set in environment
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      let fallbackText = `**Hello from Tizzi (Naija Tech Guide Mentor)!** 👋\n\nI hear your question: *"${lastUserMsg}"*.\n\nHere is honest, practical guidance for navigating tech in Nigeria:\n\n1. **Start with your current setup:** Whether you have a 4GB RAM laptop or just an Android phone, start learning core fundamentals with low-bandwidth sites like **freeCodeCamp.org** and **The Odin Project**.\n2. **Manage Power & Data:** Download tutorials during off-peak data hours (like night plans) and practice coding or design locally without needing continuous live streaming.\n3. **Build real projects:** Don't get stuck in tutorial loops. Build small tools that solve everyday problems (e.g. an expense tracker in Naira, a WhatsApp order organizer, or a portfolio site).\n\n*(Note: To enable live real-time Gemini AI responses for deep questions, make sure your GEMINI_API_KEY is connected in Settings > Secrets.)*`;

      return res.json({
        reply: fallbackText,
        source: "fallback",
      });
    }

    const ai = getAiClient();

    // Map message history to Gemini API format
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I couldn't generate a response at this moment. Please ask again!";

    return res.json({
      reply: replyText,
      source: "gemini",
    });
  } catch (err: any) {
    console.error("Gemini Chat API error:", err);
    return res.status(500).json({
      error: err?.message || "An error occurred while communicating with the AI mentor.",
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
