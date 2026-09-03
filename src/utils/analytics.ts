/**
 * Client-side Telemetry, Event Tracking, and Resilient Storage for Naija Tech Guide.
 * Non-blocking, light-weight analytics with local fallback support for serverless/static hosts (e.g. Vercel).
 */

import { getAllAssessmentRecords } from './submissionStorage';

const VISITOR_ID_KEY = 'naija_tech_visitor_id_v1';
const LOCAL_COUNTERS_KEY = 'naija_tech_analytics_counters_v1';
const LOCAL_CLICKS_KEY = 'naija_tech_analytics_clicks_v1';
const LOCAL_PAGEVIEWS_KEY = 'naija_tech_analytics_pageviews_v1';
const LOCAL_VISITORS_KEY = 'naija_tech_analytics_visitors_v1';

export interface LocalCounters {
  pageviews: number;
  uniqueVisitors: number;
  assessmentStarts: number;
  assessmentCompletions: number;
  totalClicks: number;
  chatQueries: number;
}

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

function recordLocalEvent(event: {
  type: 'pageview' | 'click' | 'assessment_start' | 'assessment_complete' | 'chat_query';
  path?: string;
  buttonId?: string;
  label?: string;
  category?: string;
  metadata?: Record<string, any>;
  visitorId: string;
}) {
  try {
    // 1. Update unique visitor set
    let visitors: string[] = [];
    try {
      const stored = localStorage.getItem(LOCAL_VISITORS_KEY);
      if (stored) visitors = JSON.parse(stored);
    } catch {}
    if (!visitors.includes(event.visitorId)) {
      visitors.push(event.visitorId);
      localStorage.setItem(LOCAL_VISITORS_KEY, JSON.stringify(visitors.slice(-1000)));
    }

    // 2. Update aggregate counters
    let counters: LocalCounters = {
      pageviews: 0,
      uniqueVisitors: visitors.length,
      assessmentStarts: 0,
      assessmentCompletions: 0,
      totalClicks: 0,
      chatQueries: 0,
    };
    try {
      const stored = localStorage.getItem(LOCAL_COUNTERS_KEY);
      if (stored) counters = { ...counters, ...JSON.parse(stored) };
    } catch {}

    counters.uniqueVisitors = Math.max(visitors.length, counters.uniqueVisitors);

    if (event.type === 'pageview') {
      counters.pageviews += 1;
      const currentPath = event.path || '/';
      let pageviewsByPath: Record<string, number> = {};
      try {
        const stored = localStorage.getItem(LOCAL_PAGEVIEWS_KEY);
        if (stored) pageviewsByPath = JSON.parse(stored);
      } catch {}
      pageviewsByPath[currentPath] = (pageviewsByPath[currentPath] || 0) + 1;
      localStorage.setItem(LOCAL_PAGEVIEWS_KEY, JSON.stringify(pageviewsByPath));
    } else if (event.type === 'click') {
      counters.totalClicks += 1;
      let clicks: Record<string, { count: number; label: string; category?: string }> = {};
      try {
        const stored = localStorage.getItem(LOCAL_CLICKS_KEY);
        if (stored) clicks = JSON.parse(stored);
      } catch {}
      const btnId = event.buttonId || 'btn_action';
      if (!clicks[btnId]) {
        clicks[btnId] = {
          count: 0,
          label: event.label || btnId,
          category: event.category || 'User Action'
        };
      }
      clicks[btnId].count += 1;
      if (event.label) clicks[btnId].label = event.label;
      if (event.category) clicks[btnId].category = event.category;
      localStorage.setItem(LOCAL_CLICKS_KEY, JSON.stringify(clicks));
    } else if (event.type === 'assessment_start') {
      counters.assessmentStarts += 1;
    } else if (event.type === 'assessment_complete') {
      counters.assessmentCompletions += 1;
    } else if (event.type === 'chat_query') {
      counters.chatQueries += 1;
    }

    localStorage.setItem(LOCAL_COUNTERS_KEY, JSON.stringify(counters));
  } catch {
    // Non-blocking storage failure
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
    const visitorId = getOrCreateVisitorId();
    const payload = {
      ...event,
      visitorId,
      timestamp: new Date().toISOString(),
    };

    // Always update local persistent storage so analytics work even on static hosts (Vercel)
    recordLocalEvent(payload);

    // Sync to backend API if available
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
        } catch {}
      }
    });
  } catch {
    // Non-blocking
  }
}

/**
 * Initializes a global click listener that automatically captures clicks on
 * interactive elements across the site.
 */
export function initGlobalClickListener(): () => void {
  if (typeof window === 'undefined') return () => {};

  const clickHandler = (e: MouseEvent) => {
    try {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest<HTMLElement>(
        'button, a, [role="button"], input[type="radio"], input[type="checkbox"], [data-track-click], .clickable-card'
      );
      if (!clickable) return;
      if (clickable.getAttribute('data-no-track') === 'true') return;

      const href = (clickable as HTMLAnchorElement).href;
      const tagName = clickable.tagName.toLowerCase();

      let label = clickable.getAttribute('data-track-label') ||
                  clickable.getAttribute('aria-label') ||
                  clickable.getAttribute('title');

      if (!label) {
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

      let id = clickable.id || clickable.getAttribute('data-track-id');
      if (!id) {
        const sanitized = label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '_')
          .slice(0, 35);
        id = `${tagName}_${sanitized || 'action'}`;
      }

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

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
    return { addedCount: 0, totalCompletions: records.length };
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

/**
 * Computes full Admin Analytics directly from browser storage.
 * Used whenever a backend API is unavailable or on static deployment (e.g. Vercel).
 */
export function getLocalAnalyticsStats() {
  const records = getAllAssessmentRecords();
  
  let counters: LocalCounters = {
    pageviews: 1,
    uniqueVisitors: 1,
    assessmentStarts: 0,
    assessmentCompletions: records.length,
    totalClicks: 0,
    chatQueries: 0,
  };
  try {
    const stored = localStorage.getItem(LOCAL_COUNTERS_KEY);
    if (stored) counters = { ...counters, ...JSON.parse(stored) };
  } catch {}

  counters.assessmentCompletions = Math.max(counters.assessmentCompletions, records.length);
  const completionRate = counters.assessmentStarts > 0
    ? Math.min(100, Math.round((counters.assessmentCompletions / counters.assessmentStarts) * 100))
    : (counters.assessmentCompletions > 0 ? 100 : 0);

  let pageviewsByPath: Record<string, number> = { '/': Math.max(1, counters.pageviews) };
  try {
    const stored = localStorage.getItem(LOCAL_PAGEVIEWS_KEY);
    if (stored) pageviewsByPath = JSON.parse(stored);
  } catch {}

  // Aggregate clicks
  let clicksRaw: Record<string, { count: number; label: string; category?: string }> = {};
  try {
    const stored = localStorage.getItem(LOCAL_CLICKS_KEY);
    if (stored) clicksRaw = JSON.parse(stored);
  } catch {}

  const clicks = Object.entries(clicksRaw).map(([id, item]) => ({
    id,
    label: item.label,
    category: item.category || 'User Action',
    count: item.count,
  })).sort((a, b) => b.count - a.count);

  // Aggregate recommendations from records
  const recMap: Record<string, { title: string; count: number; totalScore: number }> = {};
  const deviceBreakdown: Record<string, number> = {};
  const hoursBreakdown: Record<string, number> = {};

  records.forEach((r) => {
    const pId = r.recommendation.primaryNicheId;
    const pTitle = r.recommendation.primaryNicheTitle;
    const score = r.recommendation.matchScore;

    if (!recMap[pId]) {
      recMap[pId] = { title: pTitle, count: 0, totalScore: 0 };
    }
    recMap[pId].count += 1;
    recMap[pId].totalScore += score;

    const dev = r.constraints.device || 'unspecified';
    deviceBreakdown[dev] = (deviceBreakdown[dev] || 0) + 1;

    const hrs = r.constraints.timeWeekly || 'unspecified';
    hoursBreakdown[hrs] = (hoursBreakdown[hrs] || 0) + 1;
  });

  const totalRecs = Object.values(recMap).reduce((acc, curr) => acc + curr.count, 0);

  const allRecommendations = Object.entries(recMap).map(([nicheId, item]) => ({
    nicheId,
    nicheTitle: item.title,
    count: item.count,
    percentage: totalRecs > 0 ? Math.round((item.count / totalRecs) * 100) : 0,
    avgScore: item.count > 0 ? Math.round(item.totalScore / item.count) : 0,
    totalScore: item.totalScore,
  })).sort((a, b) => b.count - a.count);

  const top10Recommendations = allRecommendations.slice(0, 10);

  const recentSubmissions = records.slice(-25).reverse().map((r) => ({
    id: r.id,
    timestamp: r.timestamp,
    primaryNiche: r.recommendation.primaryNicheTitle,
    matchScore: r.recommendation.matchScore,
    device: r.constraints.device,
    weeklyHours: r.constraints.timeWeekly,
    location: r.biodata.location,
  }));

  return {
    totals: {
      pageviews: counters.pageviews,
      uniqueVisitors: Math.max(1, counters.uniqueVisitors),
      assessmentStarts: counters.assessmentStarts,
      assessmentCompletions: counters.assessmentCompletions,
      totalClicks: counters.totalClicks,
      completionRate,
      chatQueries: counters.chatQueries,
    },
    pageviewsByPath,
    top10Recommendations,
    allRecommendations,
    clicks,
    deviceBreakdown,
    hoursBreakdown,
    recentSubmissions,
    lastUpdated: new Date().toISOString(),
  };
}

export function resetLocalAnalytics(): void {
  try {
    localStorage.removeItem(LOCAL_COUNTERS_KEY);
    localStorage.removeItem(LOCAL_CLICKS_KEY);
    localStorage.removeItem(LOCAL_PAGEVIEWS_KEY);
    localStorage.removeItem(LOCAL_VISITORS_KEY);
  } catch {}
}

export function exportAnalyticsCSV(stats: any): void {
  if (!stats) return;
  const headers = ['Niche ID', 'Career Track Title', 'Total Recommendations', 'Percentage', 'Average Match Fit'];
  const rows = (stats.allRecommendations || []).map((r: any) => [
    r.nicheId,
    `"${(r.nicheTitle || '').replace(/"/g, '""')}"`,
    r.count,
    `${r.percentage}%`,
    `${r.avgScore}%`
  ]);
  const csvContent = [headers.join(','), ...rows.map((row: any) => row.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `naija_tech_recommendations_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAnalyticsJSON(stats: any): void {
  if (!stats) return;
  const jsonString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(stats, null, 2));
  const a = document.createElement('a');
  a.href = jsonString;
  a.download = `naija_tech_analytics_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
