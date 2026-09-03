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

    // Use keepalive: true so clicks during navigation or link transitions are never cancelled
    fetch('/api/analytics/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Gracefully fallback to navigator.sendBeacon if supported
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        try {
          const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
          navigator.sendBeacon('/api/analytics/event', blob);
        } catch {
          // ignore
        }
      }
    });
  } catch {
    // Non-blocking
  }
}

/**
 * Initializes a global click listener that automatically captures clicks on
 * interactive elements (buttons, links, option cards, pills, tabs) across the site,
 * ensuring real telemetry is always recorded even if an element lacks an explicit trackClick call.
 */
export function initGlobalClickListener(): () => void {
  if (typeof window === 'undefined') return () => {};

  const clickHandler = (e: MouseEvent) => {
    try {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find closest clickable element
      const clickable = target.closest<HTMLElement>(
        'button, a, [role="button"], input[type="radio"], input[type="checkbox"], [data-track-click], .clickable-card'
      );
      if (!clickable) return;

      // Skip elements that explicitly opt-out
      if (clickable.getAttribute('data-no-track') === 'true') return;

      // Extract attributes
      const href = (clickable as HTMLAnchorElement).href;
      const tagName = clickable.tagName.toLowerCase();

      // Custom attributes first
      let label = clickable.getAttribute('data-track-label') ||
                  clickable.getAttribute('aria-label') ||
                  clickable.getAttribute('title');

      if (!label) {
        // Look for text content or value
        const rawText = clickable.innerText?.trim()?.replace(/\s+/g, ' ');
        if (rawText && rawText.length <= 60) {
          label = rawText;
        } else if (rawText) {
          label = rawText.slice(0, 55) + '...';
        } else if ((clickable as HTMLInputElement).value) {
          label = (clickable as HTMLInputElement).value;
        } else if (href) {
          label = `Link: ${href.slice(0, 45)}`;
        } else {
          label = `${tagName} action`;
        }
      }

      // Action ID
      let id = clickable.id || clickable.getAttribute('data-track-id');
      if (!id) {
        const sanitized = label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .slice(0, 35);
        id = `${tagName}_${sanitized || 'action'}`;
      }

      // Categorization
      let category = clickable.getAttribute('data-track-category');
      if (!category) {
        if (clickable.closest('#admin-portal')) {
          category = 'Admin Portal';
        } else if (clickable.closest('#chatbot-panel') || clickable.closest('[data-chat]')) {
          category = 'AI Mentor';
        } else if (clickable.closest('#assessment-screen') || clickable.closest('[data-assessment]')) {
          category = 'Assessment Flow';
        } else if (href && !href.startsWith(window.location.origin) && href.startsWith('http')) {
          category = 'External Resource';
        } else if (tagName === 'a') {
          category = 'Navigation';
        } else if (id.includes('filter')) {
          category = 'Filter';
        } else if (id.includes('btn') || tagName === 'button') {
          category = 'Button Click';
        } else {
          category = 'User Interaction';
        }
      }

      trackClick(id, label, category);
    } catch {
      // Ignore click telemetry errors
    }
  };

  window.addEventListener('click', clickHandler, { capture: true, passive: true });
  return () => window.removeEventListener('click', clickHandler, { capture: true });
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
