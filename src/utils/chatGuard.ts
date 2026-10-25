/**
 * Small safety layer for the chat endpoint: limits request size, cleans the
 * profile context, and rate limits by IP.
 *
 * The rate limiter lives in memory. On serverless hosts each instance has its
 * own counter, so treat it as a speed bump. For a hard limit, add a Vercel
 * WAF rule or a shared store such as Upstash Redis.
 */

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;
const MAX_CONTEXT_CHARS = 200;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 20;

type Role = 'user' | 'assistant';
export interface CleanMessage { role: Role; content: string }
export interface CleanContext {
  matchedNiche?: string;
  device?: string;
  weeklyHours?: string;
  location?: string;
  proudAchievement?: string;
}

const hits = new Map<string, { count: number; resetAt: number }>();

export function getClientIp(req: any): string {
  const fwd = req?.headers?.['x-forwarded-for'];
  const first = Array.isArray(fwd) ? fwd[0] : typeof fwd === 'string' ? fwd.split(',')[0] : '';
  return (first || req?.socket?.remoteAddress || 'unknown').trim();
}

export function allowRequest(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [key, v] of hits) if (v.resetAt < now) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_REQUESTS_PER_WINDOW;
}

function cleanText(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\u0000-\u001f`]/g, ' ').trim().slice(0, max);
}

export function sanitizeChatPayload(body: any): { messages: CleanMessage[]; context?: CleanContext } | null {
  if (!body || !Array.isArray(body.messages) || body.messages.length === 0) return null;

  const messages: CleanMessage[] = body.messages
    .slice(-MAX_MESSAGES)
    .filter((m: any) => m && typeof m.content === 'string' && m.content.trim().length > 0)
    .map((m: any): CleanMessage => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'assistant' : 'user',
      content: m.content.slice(0, MAX_MESSAGE_CHARS),
    }));
  if (messages.length === 0) return null;

  let context: CleanContext | undefined;
  if (body.context && typeof body.context === 'object') {
    context = {
      matchedNiche: cleanText(body.context.matchedNiche, MAX_CONTEXT_CHARS),
      device: cleanText(body.context.device, MAX_CONTEXT_CHARS),
      weeklyHours: cleanText(body.context.weeklyHours, MAX_CONTEXT_CHARS),
      location: cleanText(body.context.location, MAX_CONTEXT_CHARS),
      proudAchievement: cleanText(body.context.proudAchievement, MAX_CONTEXT_CHARS),
    };
  }
  return { messages, context };
}
