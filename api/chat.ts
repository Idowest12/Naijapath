import { GoogleGenAI } from '@google/genai';
import { generateSmartMentorResponse } from '../src/utils/mentorEngine';

function buildGeminiContents(rawMessages: Array<{ role: string; content: string }>) {
  const sanitized: Array<{ role: 'user' | 'model'; parts: [{ text: string }] }> = [];

  const clean = rawMessages
    .filter((m) => m && typeof m.content === 'string' && m.content.trim().length > 0)
    .filter((m) => !m.content.includes('network blip') && !m.content.includes('blip detected'));

  let startIndex = 0;
  while (startIndex < clean.length && (clean[startIndex].role === 'assistant' || clean[startIndex].role === 'model')) {
    startIndex++;
  }

  for (let i = startIndex; i < clean.length; i++) {
    const m = clean[i];
    const role: 'user' | 'model' = m.role === 'assistant' || m.role === 'model' ? 'model' : 'user';

    if (sanitized.length > 0 && sanitized[sanitized.length - 1].role === role) {
      sanitized[sanitized.length - 1].parts[0].text += `\n\n${m.content}`;
    } else {
      sanitized.push({
        role,
        parts: [{ text: m.content }],
      });
    }
  }

  if (sanitized.length === 0 && clean.length > 0) {
    const lastUser = clean.slice().reverse().find((m) => m.role === 'user') || clean[clean.length - 1];
    sanitized.push({
      role: 'user',
      parts: [{ text: lastUser.content }],
    });
  }

  return sanitized;
}

export default async function handler(req: any, res: any) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let lastUserMsg = "How do I start tech in Nigeria?";
  let context: any = undefined;

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const messages = body?.messages;
    context = body?.context;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty messages array.' });
    }

    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.content) {
      lastUserMsg = lastMsg.content;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackReply = generateSmartMentorResponse(lastUserMsg, context);
      return res.status(200).json({
        reply: fallbackReply,
        source: 'mentor-engine',
      });
    }

    let userContextString = '';
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

    const systemInstruction = `You are "Tizzi" (Naija Tech Guide AI Advisor), an empathetic, deeply knowledgeable, realistic, and encouraging tech career mentor built specifically for Nigerian youths, university students, and non-tech career switchers.

CORE DIRECTIVES (HIGHEST PRIORITY):
1. ALWAYS ANSWER THE EXACT QUESTION FIRST:
   - When the user asks to explain a concept or career ("Explain in layman's language", "What is X?", "What does a PM do?"), directly explain what it is and what the role entails.
   - DO NOT dump a 3-month learning roadmap or syllabus unless the user explicitly asked for "how do I start", "give me a roadmap", "steps to learn", or "curriculum".
   - Non-tech beginners need to understand what something means before deciding if they want a learning plan.

2. MASTER EVERYDAY NIGERIAN ANALOGIES:
   - Break down tech concepts using relatable, vivid real-world scenarios:
     * Product Design (UI/UX): The architect who designs the house layout before bricklayers build; or designing a mobile banking app (like GTBank, OPay, Kuda) so a busy trader in Balogun market can transfer money in 2 taps without getting confused.
     * Frontend: The car dashboard, steering wheel, and seats that the driver touches; or the boutique display shelves.
     * Backend: The engine and transmission under the car hood; or the restaurant kitchen cooking the food and checking the inventory freezer.
     * Data Analysis: A store manager finding secret buying patterns in paper receipt records to stop wasting money on unsold stock.
     * Product Manager (PM): The movie director or ship captain guiding actors and camera crew to finish on time.

3. HONEST & REAL-WORLD GROUNDED:
   - You understand Nigerian realities: irregular power supply (NEPA/PHCN), generator fuel costs, expensive mobile data tariffs (MTN/Airtel/Glo), and device limitations (e.g. starting on a 4GB RAM laptop or an Android smartphone).
   - Give candid, actionable advice without hype or "get-rich-quick" myths.
   - Emphasize high-yield, low-bandwidth learning strategies (offline video downloads at night, reading documentation, lightweight editors, FreeCodeCamp).

4. MULTI-TURN CONVERSATION MEMORY:
   - Remember details the user shared earlier in this conversation (e.g. their degree, their 4GB laptop, their interest in non-coding roles) and naturally reference them in follow-up answers.

5. COMMUNICATION STYLE:
   - Warm, respectful, sharp, and conversational (natural Nigerian English with friendly encouragement like "No shaking", "Step by step", but always articulate and professional).
   - Keep answers clear and digestible on mobile screens (2–4 concise paragraphs, clear markdown formatting, and check if the explanation makes sense).

${userContextString}`;

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const contents = buildGeminiContents(messages);

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('GEMINI_TIMEOUT')), 15000)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const response: any = await Promise.race([generatePromise, timeoutPromise]);
    const replyText =
      response?.text ||
      'I am right here with you. What specific question or topic can I break down for you next?';

    return res.status(200).json({
      reply: replyText,
      source: 'gemini',
    });
  } catch (err: any) {
    console.warn('Vercel API error or timeout, falling back to smart mentor engine:', err?.message || err);
    const fallbackReply = generateSmartMentorResponse(lastUserMsg, context);
    return res.status(200).json({
      reply: fallbackReply,
      source: 'mentor-engine',
    });
  }
}
