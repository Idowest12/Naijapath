import fs from 'fs';
import path from 'path';

export interface AnalyticsEvent {
  type: 'pageview' | 'click' | 'assessment_start' | 'assessment_complete' | 'chat_query';
  path?: string;
  buttonId?: string;
  label?: string;
  category?: string;
  metadata?: Record<string, any>;
  visitorId?: string;
  timestamp: string;
}

export interface StoredAssessmentInput {
  id: string;
  timestamp: string;
  biodata?: {
    fullName?: string;
    ageBand?: string;
    gender?: string;
    status?: string;
    location?: string;
  };
  constraints?: {
    device?: string;
    timeWeekly?: string;
    powerData?: string;
    codingAppetite?: string;
    earningUrgency?: string;
  };
  recommendation?: {
    primaryNicheId: string;
    primaryNicheTitle: string;
    matchScore: number;
    secondaryNicheId?: string;
    secondaryNicheTitle?: string;
  };
}

export interface RecommendationStat {
  nicheId: string;
  nicheTitle: string;
  count: number;
  percentage: number;
  avgScore: number;
  totalScore: number;
}

export interface StoredAnalytics {
  version: number;
  adminPasskeyHash: string;
  failedLoginAttempts: { count: number; lockedUntil: number };
  totals: {
    pageviews: number;
    uniqueVisitors: number;
    assessmentStarts: number;
    assessmentCompletions: number;
    totalClicks: number;
    chatQueries: number;
  };
  pageviewsByPath: Record<string, number>;
  clicksByButton: Record<string, { count: number; label: string; category?: string }>;
  deviceBreakdown: Record<string, number>;
  hoursBreakdown: Record<string, number>;
  recommendations: Record<string, { title: string; count: number; totalScore: number }>;
  recentSubmissions: Array<{
    id: string;
    timestamp: string;
    primaryNiche: string;
    matchScore: number;
    device?: string;
    weeklyHours?: string;
    location?: string;
  }>;
  visitorSet: string[];
  ingestedRecordIds: string[]; // Deduplication registry for real synchronized records
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'analytics.json');

// REAL data baseline: zero mock numbers
function getDefaultData(): StoredAnalytics {
  return {
    version: 2,
    adminPasskeyHash: process.env.ADMIN_SECRET_KEY || 'naija-admin-2026',
    failedLoginAttempts: { count: 0, lockedUntil: 0 },
    totals: {
      pageviews: 0,
      uniqueVisitors: 0,
      assessmentStarts: 0,
      assessmentCompletions: 0,
      totalClicks: 0,
      chatQueries: 0,
    },
    pageviewsByPath: {},
    clicksByButton: {},
    deviceBreakdown: {},
    hoursBreakdown: {},
    recommendations: {},
    recentSubmissions: [],
    visitorSet: [],
    ingestedRecordIds: [],
  };
}

class AnalyticsManager {
  private data: StoredAnalytics;
  private saveTimeout: NodeJS.Timeout | null = null;
  private activeTokens: Map<string, { expiresAt: number }> = new Map();

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): StoredAnalytics {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        // If it was version 1 (which had mock data), upgrade and reset to real version 2
        if (!parsed.version || parsed.version < 2) {
          const fresh = getDefaultData();
          if (parsed.adminPasskeyHash) fresh.adminPasskeyHash = parsed.adminPasskeyHash;
          this.saveDataDirect(fresh);
          return fresh;
        }
        return { ...getDefaultData(), ...parsed };
      }
    } catch (e) {
      console.warn('Could not load analytics file, using clean real data structure:', e);
    }
    const def = getDefaultData();
    this.saveDataDirect(def);
    return def;
  }

  private saveDataDirect(data: StoredAnalytics) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to write analytics file:', err);
    }
  }

  private scheduleSave() {
    if (this.saveTimeout) clearTimeout(this.saveTimeout);
    this.saveTimeout = setTimeout(() => {
      this.saveDataDirect(this.data);
      this.saveTimeout = null;
    }, 500);
  }

  // --- Authentication ---
  public verifyPasskey(passkey: string): { success: boolean; token?: string; error?: string; lockedUntil?: number } {
    const now = Date.now();

    if (this.data.failedLoginAttempts.lockedUntil > now) {
      const waitSeconds = Math.ceil((this.data.failedLoginAttempts.lockedUntil - now) / 1000);
      return {
        success: false,
        error: `Access temporarily locked for ${waitSeconds}s due to failed attempts.`,
        lockedUntil: this.data.failedLoginAttempts.lockedUntil,
      };
    }

    const currentPasskey = this.data.adminPasskeyHash || process.env.ADMIN_SECRET_KEY || 'naija-admin-2026';

    if (passkey.trim() === currentPasskey.trim()) {
      this.data.failedLoginAttempts = { count: 0, lockedUntil: 0 };
      this.scheduleSave();

      const token = `adm_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      this.activeTokens.set(token, { expiresAt: now + 24 * 60 * 60 * 1000 });
      return { success: true, token };
    } else {
      const newCount = (this.data.failedLoginAttempts.count || 0) + 1;
      let lockedUntil = 0;
      if (newCount >= 5) {
        lockedUntil = now + 5 * 60 * 1000;
      }
      this.data.failedLoginAttempts = { count: newCount, lockedUntil };
      this.scheduleSave();

      const remainingTries = Math.max(0, 5 - newCount);
      return {
        success: false,
        error: newCount >= 5
          ? 'Maximum attempts exceeded. Locked for 5 minutes.'
          : `Invalid passkey. ${remainingTries} attempt(s) remaining.`,
        lockedUntil: lockedUntil || undefined,
      };
    }
  }

  public validateToken(token?: string): boolean {
    if (!token) return false;
    const session = this.activeTokens.get(token);
    if (!session) return false;
    if (Date.now() > session.expiresAt) {
      this.activeTokens.delete(token);
      return false;
    }
    return true;
  }

  public updatePasskey(token: string, newPasskey: string): { success: boolean; error?: string } {
    if (!this.validateToken(token)) {
      return { success: false, error: 'Unauthorized session.' };
    }
    if (!newPasskey || newPasskey.trim().length < 6) {
      return { success: false, error: 'Passkey must be at least 6 characters.' };
    }
    this.data.adminPasskeyHash = newPasskey.trim();
    this.scheduleSave();
    return { success: true };
  }

  // --- Real Telemetry Tracking ---
  public recordEvent(event: AnalyticsEvent) {
    const { type, path: pagePath, buttonId, label, category, metadata, visitorId } = event;

    if (visitorId && !this.data.visitorSet.includes(visitorId)) {
      this.data.visitorSet.push(visitorId);
      this.data.totals.uniqueVisitors = this.data.visitorSet.length;
    }

    if (type === 'pageview') {
      this.data.totals.pageviews = (this.data.totals.pageviews || 0) + 1;
      const p = pagePath || '/';
      this.data.pageviewsByPath[p] = (this.data.pageviewsByPath[p] || 0) + 1;
    } else if (type === 'click' && buttonId) {
      this.data.totals.totalClicks = (this.data.totals.totalClicks || 0) + 1;
      if (!this.data.clicksByButton[buttonId]) {
        this.data.clicksByButton[buttonId] = {
          count: 0,
          label: label || buttonId,
          category: category || 'Action',
        };
      }
      this.data.clicksByButton[buttonId].count += 1;
      if (label && this.data.clicksByButton[buttonId].label !== label) {
        this.data.clicksByButton[buttonId].label = label;
      }
      if (category && (!this.data.clicksByButton[buttonId].category || this.data.clicksByButton[buttonId].category === 'Action')) {
        this.data.clicksByButton[buttonId].category = category;
      }
    } else if (type === 'assessment_start') {
      this.data.totals.assessmentStarts = (this.data.totals.assessmentStarts || 0) + 1;
    } else if (type === 'assessment_complete' && metadata) {
      const recordId = metadata.recordId || `event_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      
      if (!this.data.ingestedRecordIds.includes(recordId)) {
        this.data.ingestedRecordIds.push(recordId);
        this.data.totals.assessmentCompletions = (this.data.totals.assessmentCompletions || 0) + 1;

        const nicheId = metadata.nicheId || 'general';
        const nicheTitle = metadata.nicheTitle || 'Tech Track';
        const score = Number(metadata.matchScore) || 85;

        if (!this.data.recommendations[nicheId]) {
          this.data.recommendations[nicheId] = {
            title: nicheTitle,
            count: 0,
            totalScore: 0,
          };
        }
        this.data.recommendations[nicheId].count += 1;
        this.data.recommendations[nicheId].totalScore += score;

        if (metadata.device) {
          this.data.deviceBreakdown[metadata.device] = (this.data.deviceBreakdown[metadata.device] || 0) + 1;
        }
        if (metadata.weeklyHours) {
          this.data.hoursBreakdown[metadata.weeklyHours] = (this.data.hoursBreakdown[metadata.weeklyHours] || 0) + 1;
        }

        this.data.recentSubmissions.unshift({
          id: recordId,
          timestamp: new Date().toISOString(),
          primaryNiche: nicheTitle,
          matchScore: score,
          device: metadata.device,
          weeklyHours: metadata.weeklyHours,
          location: metadata.location || 'Nigeria',
        });

        if (this.data.recentSubmissions.length > 100) {
          this.data.recentSubmissions = this.data.recentSubmissions.slice(0, 100);
        }
      }
    } else if (type === 'chat_query') {
      this.data.totals.chatQueries = (this.data.totals.chatQueries || 0) + 1;
    }

    this.scheduleSave();
  }

  // --- Batch Synchronization of Real Submissions ---
  public syncRecords(records: StoredAssessmentInput[]): { addedCount: number; totalCompletions: number } {
    let addedCount = 0;

    for (const rec of records) {
      if (!rec || !rec.id) continue;

      const nicheId = rec.recommendation?.primaryNicheId || (rec as any).primaryNicheId || 'general';
      const nicheTitle = rec.recommendation?.primaryNicheTitle || (rec as any).primaryNicheTitle || 'Tech Track';
      const score = Number(rec.recommendation?.matchScore ?? (rec as any).matchScore ?? 85);
      const device = rec.constraints?.device || (rec as any).device || (rec as any).deviceRequirement;
      const hours = rec.constraints?.timeWeekly || (rec as any).timeWeekly || (rec as any).weeklyHours;
      const location = rec.biodata?.location || (rec as any).location || (rec as any).stateLocation || 'Nigeria';

      if (!this.data.ingestedRecordIds.includes(rec.id)) {
        this.data.ingestedRecordIds.push(rec.id);
        addedCount++;
        this.data.totals.assessmentCompletions = (this.data.totals.assessmentCompletions || 0) + 1;

        if (!this.data.recommendations[nicheId]) {
          this.data.recommendations[nicheId] = {
            title: nicheTitle,
            count: 0,
            totalScore: 0,
          };
        }
        this.data.recommendations[nicheId].count += 1;
        this.data.recommendations[nicheId].totalScore += score;

        if (device) {
          this.data.deviceBreakdown[device] = (this.data.deviceBreakdown[device] || 0) + 1;
        }

        if (hours) {
          this.data.hoursBreakdown[hours] = (this.data.hoursBreakdown[hours] || 0) + 1;
        }

        this.data.recentSubmissions.unshift({
          id: rec.id,
          timestamp: rec.timestamp || new Date().toISOString(),
          primaryNiche: nicheTitle,
          matchScore: score,
          device: device,
          weeklyHours: hours,
          location: location,
        });
      }
    }

    if (this.data.recentSubmissions.length > 100) {
      this.data.recentSubmissions = this.data.recentSubmissions.slice(0, 100);
    }

    if (addedCount > 0) {
      this.scheduleSave();
    }

    return {
      addedCount,
      totalCompletions: this.data.totals.assessmentCompletions,
    };
  }

  // --- Aggregate Stats for Dashboard ---
  public getAggregatedStats() {
    const totalCompletions = this.data.totals.assessmentCompletions;
    const completionRate = this.data.totals.assessmentStarts > 0
      ? Math.min(100, Math.round((this.data.totals.assessmentCompletions / this.data.totals.assessmentStarts) * 1000) / 10)
      : (totalCompletions > 0 ? 100 : 0);

    const recEntries = Object.entries(this.data.recommendations).map(([id, rec]) => {
      const avgScore = rec.count > 0 ? Math.round(rec.totalScore / rec.count) : 0;
      const percentage = totalCompletions > 0 ? Math.round((rec.count / totalCompletions) * 1000) / 10 : 0;
      return {
        nicheId: id,
        nicheTitle: rec.title,
        count: rec.count,
        percentage,
        avgScore,
        totalScore: rec.totalScore,
      };
    });

    recEntries.sort((a, b) => b.count - a.count);
    const top10Recommendations = recEntries.slice(0, 10);

    const clicksList = Object.entries(this.data.clicksByButton).map(([btnId, item]) => ({
      id: btnId,
      label: item.label,
      category: item.category || 'General',
      count: item.count,
    })).sort((a, b) => b.count - a.count);

    const totalClicks = Math.max(
      this.data.totals.totalClicks || 0,
      clicksList.reduce((acc, curr) => acc + curr.count, 0)
    );

    return {
      totals: {
        pageviews: this.data.totals.pageviews,
        uniqueVisitors: this.data.totals.uniqueVisitors,
        assessmentStarts: this.data.totals.assessmentStarts,
        assessmentCompletions: this.data.totals.assessmentCompletions,
        totalClicks,
        completionRate,
        chatQueries: this.data.totals.chatQueries,
      },
      pageviewsByPath: this.data.pageviewsByPath,
      top10Recommendations,
      allRecommendations: recEntries,
      clicks: clicksList,
      deviceBreakdown: this.data.deviceBreakdown,
      hoursBreakdown: this.data.hoursBreakdown,
      recentSubmissions: this.data.recentSubmissions.slice(0, 50),
      isRealData: true,
      lastUpdated: new Date().toISOString(),
    };
  }

  public resetStats(token: string): { success: boolean; error?: string } {
    if (!this.validateToken(token)) {
      return { success: false, error: 'Unauthorized.' };
    }
    const clean = getDefaultData();
    clean.adminPasskeyHash = this.data.adminPasskeyHash;
    this.data = clean;
    this.saveDataDirect(clean);
    return { success: true };
  }
}

export const analyticsManager = new AnalyticsManager();
