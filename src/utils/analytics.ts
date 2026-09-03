/**
  * Client-side Telemetry and Event Tracking for Naija Tech Guide.
  * Non-blocking, light-weight analytics for real audience insights.
  */

import { getAllAssessmentRecords } from './submissionStorage';

const VISITOR_ID_KEY = 'naija_tech_visitor_id_v1';

export function getOrCreateVisitorId(): string {
  try {
    let vid = localStorage.getItem(VISITOR_ID_KEY);
    if (!vid) {
      vid = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(VISITOR_ID_KEY, vid);
    }
    return vid;
  } catch {
    return 'anonymous_visitor';
  }
}

export async function sendAnalyticsEvent(event: {
  type: 'pageview' | 'click' | 'assessment_start' | 'assessment_complete' | 'chat_query';
  path?: string;
  buttonId?: string;
  label?: string;
  category?: string;
  metadata?: Record<string, any>;
}): Promise<void> {
  try {
    const payload = {
      ...event,
      visitorId: getOrCreateVisitorId(),
      timestamp: new Date().toISOString(),
    };

    // Use fire-and-forget fetch
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Gracefully ignore offline/fetch errors
    });
  } catch {
    // Non-blocking
  }
}

export async function syncLocalRecordsToServer(): Promise<{ addedCount: number; totalCompletions: number } | null> {
  try {
    const records = getAllAssessmentRecords();
    if (!records || records.length === 0) {
      return { addedCount: 0, totalCompletions: 0 };
    }

    const res = await fetch('/api/analytics/sync-records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ records }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Failed to sync local records to server:', err);
    return null;
  }
}

export function trackPageView(path: string): void {
  sendAnalyticsEvent({
    type: 'pageview',
    path,
  });
}

export function trackClick(buttonId: string, label: string, category: string = 'User Action'): void {
  sendAnalyticsEvent({
    type: 'click',
    buttonId,
    label,
    category,
  });
}

export function trackAssessmentStart(): void {
  sendAnalyticsEvent({
    type: 'assessment_start',
    buttonId: 'start_assessment',
    label: 'Candidate Started Diagnostic Assessment',
    category: 'Assessment Flow',
  });
}

export function trackAssessmentComplete(data: {
  recordId?: string;
  nicheId: string;
  nicheTitle: string;
  matchScore: number;
  device?: string;
  weeklyHours?: string;
  location?: string;
}): void {
  sendAnalyticsEvent({
    type: 'assessment_complete',
    metadata: data,
    label: `Matched with ${data.nicheTitle}`,
    category: 'Assessment Result',
  });
}

export function trackChatQuery(): void {
  sendAnalyticsEvent({
    type: 'chat_query',
    label: 'User asked AI Mentor Tizzi a question',
    category: 'AI Chat',
  });
}
