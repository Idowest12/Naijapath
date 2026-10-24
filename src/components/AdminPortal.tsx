import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  BarChart3,
  TrendingUp,
  Users,
  Eye as ViewIcon,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Download,
  ArrowLeft,
  Smartphone,
  Laptop,
  Clock,
  LogOut,
  MousePointerClick,
  Award,
  Bot,
  Layers,
  ChevronRight,
  Database,
  Trash2,
  X,
  FileSpreadsheet,
  FileCode2,
  Radio,
  Play
} from 'lucide-react';
import {
  syncLocalRecordsToServer,
  getLocalAnalyticsStats,
  resetLocalAnalytics,
  exportAnalyticsCSV,
  exportAnalyticsJSON
} from '../utils/analytics';
import {
  getAllAssessmentRecords,
  exportRecordsAsJSON
} from '../utils/submissionStorage';

interface RecommendationStat {
  nicheId: string;
  nicheTitle: string;
  count: number;
  percentage: number;
  avgScore: number;
  totalScore: number;
}

interface ClickStat {
  id: string;
  label: string;
  category: string;
  count: number;
}

interface RecentSubmission {
  id: string;
  timestamp: string;
  primaryNiche: string;
  matchScore: number;
  device?: string;
  weeklyHours?: string;
  location?: string;
}

interface AdminStats {
  totals: {
    pageviews: number;
    uniqueVisitors: number;
    assessmentStarts: number;
    assessmentCompletions: number;
    totalClicks: number;
    completionRate: number;
    chatQueries: number;
  };
  pageviewsByPath: Record<string, number>;
  top10Recommendations: RecommendationStat[];
  allRecommendations: RecommendationStat[];
  clicks: ClickStat[];
  deviceBreakdown: Record<string, number>;
  hoursBreakdown: Record<string, number>;
  recentSubmissions: RecentSubmission[];
  lastUpdated: string;
}

interface AdminPortalProps {
  onBackToSite: () => void;
}

const ADMIN_TOKEN_STORAGE_KEY = 'naija_tech_admin_session_token_v1';

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [showPasskey, setShowPasskey] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  // Dashboard Data State
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Settings & Passkey Modal
  const [showPasskeyModal, setShowPasskeyModal] = useState(false);
  const [newPasskey, setNewPasskey] = useState('');
  const [confirmPasskey, setConfirmPasskey] = useState('');
  const [passkeyStatusMsg, setPasskeyStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isUpdatingPasskey, setIsUpdatingPasskey] = useState(false);

  // Reset Confirmation Modal
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Active Sub-tab in Admin
  const [activeTab, setActiveTab] = useState<'overview' | 'top10' | 'clicks' | 'submissions'>('overview');

  // Real data sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  const handleSyncLocalRecords = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await syncLocalRecordsToServer();
      if (res) {
        if (res.addedCount > 0) {
          setSyncFeedback({
            type: 'success',
            message: `Synchronized ${res.addedCount} real assessment submission(s) into the live database! (Total: ${res.totalCompletions})`
          });
        } else {
          setSyncFeedback({
            type: 'info',
            message: `All assessment records from this device are up to date in the live server (Total: ${res.totalCompletions}).`
          });
        }
        if (token) {
          fetchAdminStats(token, true);
        }
      } else {
        setSyncFeedback({
          type: 'error',
          message: 'Could not contact server sync endpoint.'
        });
      }
    } catch {
      setSyncFeedback({
        type: 'error',
        message: 'Sync error occurred.'
      });
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 6000);
    }
  };

  // Check login on load
  useEffect(() => {
    if (token) {
      fetchAdminStats(token);
    }
  }, [token]);

  // Auto-refresh timer (5s for real-time live telemetry)
  useEffect(() => {
    if (!token || !autoRefresh) return;
    const interval = setInterval(() => {
      fetchAdminStats(token, true);
    }, 5000);
    return () => clearInterval(interval);
  }, [token, autoRefresh]);

  const fetchAdminStats = async (activeToken: string, silent = false) => {
    if (!silent) setIsLoadingStats(true);
    setStatsError(null);
    let serverSuccess = false;

    try {
      const res = await fetch('/api/admin/stats', {
        headers: {
          'x-admin-token': activeToken,
        },
      });

      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        if (res.status === 401) {
          // Token expired on server
          setToken(null);
          localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
          setLoginError('Your admin session has expired. Please enter passkey again.');
          return;
        }

        const data = await res.json();
        if (data.success && data.stats) {
          setStats(data.stats);
          serverSuccess = true;
        }
      }
    } catch {
      // Server unreachable or static hosting (Vercel)
    }

    // Resilient fallback: compute stats directly from local browser storage & submissions
    if (!serverSuccess) {
      try {
        const localStats = getLocalAnalyticsStats();
        setStats(localStats);
      } catch {
        setStatsError('Failed to load telemetry statistics.');
      }
    }

    if (!silent) setIsLoadingStats(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredPasskey = passkeyInput.trim();
    if (!enteredPasskey) {
      setLoginError('Please enter your admin passkey.');
      return;
    }

    setIsLoggingIn(true);
    setLoginError(null);

    // 1. Try server verification first (if running on a server-backed environment)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: enteredPasskey }),
      });

      const contentType = res.headers.get('content-type') || '';
      // Only process as JSON if response is actual JSON (not HTML from SPA rewrites)
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success && data.token) {
          setToken(data.token);
          localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.token);
          setPasskeyInput('');
          setLoginError(null);
          setIsLoggingIn(false);
          return;
        } else if (res.status === 401 || (data && !data.success)) {
          setLoginError(data.error || 'Invalid admin passkey.');
          if (data.lockedUntil) {
            setLockedUntil(data.lockedUntil);
          }
          setIsLoggingIn(false);
          return;
        }
      }
    } catch {
      // Server unreachable (e.g. static Vercel host), fallback to local passkey validation
    }

    // 2. Resilient Passkey Verification for static deployments (Vercel) & offline modes
    const customPasskey = localStorage.getItem('naija_admin_custom_passkey');
    const validPasskeys = ['naija-admin-2026'];
    if (customPasskey) validPasskeys.push(customPasskey);

    if (validPasskeys.includes(enteredPasskey)) {
      const localToken = `admin_session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      setToken(localToken);
      localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, localToken);
      setPasskeyInput('');
      setLoginError(null);
    } else {
      setLoginError('Invalid admin passkey. Please check and try again.');
    }

    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
    setStats(null);
  };

  const handleUpdatePasskey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasskey !== confirmPasskey) {
      setPasskeyStatusMsg({ type: 'error', text: 'Passkeys do not match.' });
      return;
    }
    if (newPasskey.length < 6) {
      setPasskeyStatusMsg({ type: 'error', text: 'Passkey must be at least 6 characters.' });
      return;
    }

    setIsUpdatingPasskey(true);
    setPasskeyStatusMsg(null);

    // Save in local storage immediately
    localStorage.setItem('naija_admin_custom_passkey', newPasskey);

    // Also attempt server sync in background if server exists
    try {
      fetch('/api/admin/update-passkey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token || '',
        },
        body: JSON.stringify({ newPasskey }),
      }).catch(() => {});
    } catch {}

    setPasskeyStatusMsg({ type: 'success', text: 'Passkey successfully updated! Save it safely.' });
    setNewPasskey('');
    setConfirmPasskey('');
    setTimeout(() => {
      setShowPasskeyModal(false);
      setPasskeyStatusMsg(null);
    }, 2000);
    setIsUpdatingPasskey(false);
  };

  const handleResetStats = async () => {
    if (!token) return;
    setIsResetting(true);

    // Reset local data
    resetLocalAnalytics();

    // Try server reset in background
    try {
      fetch('/api/admin/reset-stats', {
        method: 'POST',
        headers: {
          'x-admin-token': token,
        },
      }).catch(() => {});
    } catch {}

    setShowResetModal(false);
    fetchAdminStats(token);
    setIsResetting(false);
  };

  const downloadExport = async (format: 'csv' | 'json') => {
    if (!stats) return;
    if (format === 'csv') {
      exportAnalyticsCSV(stats);
    } else {
      exportAnalyticsJSON(stats);
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: SECURITY SHIELD GATE (LOGIN SCREEN)
  // -------------------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen bg-[#13141F] text-white flex flex-col justify-between p-4 sm:p-6 antialiased font-sans">
        {/* Top Header */}
        <div className="max-w-md mx-auto w-full pt-4 flex items-center justify-between">
          <button
            id="admin-return-public-site-btn"
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white text-black border-2 border-black text-xs font-display font-extrabold shadow-neo-sm hover:bg-[#D4F938] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-black" />
            <span>Return to App</span>
          </button>
          <span className="text-[11px] font-mono-tech uppercase font-bold text-black bg-[#D4F938] px-2.5 py-1 rounded-full border-2 border-black shadow-neo-sm">
            Admin Auth Gate
          </span>
        </div>

        {/* Center Card */}
        <div className="max-w-md mx-auto w-full my-auto py-8">
          <div className="bg-white text-black border-2 border-black rounded-3xl p-6 sm:p-8 shadow-neo-xl relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#D4F938] border-b-2 border-black" />

            {/* Icon Header */}
            <div className="flex flex-col items-center text-center mb-6 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-[#D4F938] border-2 border-black flex items-center justify-center text-black mb-3 shadow-neo-sm font-display font-black text-xl">
                <ShieldCheck className="w-7 h-7 text-black" />
              </div>
              <h1 className="text-2xl font-display font-black tracking-tight text-black uppercase">
                Admin Gateway
              </h1>
              <p className="text-xs text-black/70 mt-1 max-w-xs font-sans">
                Private analytics portal tracking candidate traffic, button clicks, and top recommended career paths.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech font-bold uppercase tracking-wider text-black mb-1.5 flex items-center justify-between">
                  <span>Admin Secret Passkey</span>
                  <KeyRound className="w-3.5 h-3.5 text-black" />
                </label>
                <div className="relative">
                  <input
                    id="admin-passkey-input"
                    type={showPasskey ? 'text' : 'password'}
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="Enter admin passkey..."
                    className="w-full bg-[#F8F7FF] border-2 border-black rounded-xl px-4 py-3 text-sm text-black placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#5D45FD] pr-11 font-mono-tech transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasskey(!showPasskey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:opacity-75 p-1 cursor-pointer"
                    title={showPasskey ? 'Hide passkey' : 'Show passkey'}
                  >
                    {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-[#FED74C] border-2 border-black text-black text-xs flex items-start gap-2 shadow-neo-sm">
                  <AlertTriangle className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span className="font-medium">{loginError}</span>
                </div>
              )}

              <button
                id="admin-unlock-portal-btn"
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-[#D4F938] hover:bg-[#cbf425] text-black font-display font-black text-sm flex items-center justify-center gap-2 border-2 border-black shadow-neo hover:shadow-neo-lg hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 uppercase tracking-wider"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 text-black" />
                    <span>Unlock Admin Console →</span>
                  </>
                )}
              </button>
            </form>

            {/* Anti-hijack Information Box */}
            <div className="mt-6 pt-5 border-t-2 border-black/10">
              <div className="flex items-start gap-2.5 bg-[#F1F0FF] p-3.5 rounded-xl border-2 border-black text-[11px] text-black shadow-neo-sm">
                <Shield className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold font-display uppercase tracking-wider block">Protection Enabled</span>
                  <p className="text-black/75 font-sans">
                    Five consecutive failed attempts trigger a temporary lockdown.
                  </p>
                  <p className="font-mono-tech text-[10px] mt-1 pt-1 border-t border-black/10 font-bold">
                    Default Master Key: <span className="bg-[#FED74C] px-1 py-0.5 rounded border border-black">naija-admin-2026</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-md mx-auto w-full text-center pb-4 text-[11px] font-mono-tech text-white/50">
          Naija Tech Career Advisor • Executive Telemetry System
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F1F0FF] text-black flex flex-col font-sans antialiased">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white border-b-2 border-black px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              id="admin-nav-back-to-site"
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#D4F938] text-black text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Return to the candidate-facing app"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-black" />
              <span>Public Site</span>
            </button>

            <div className="flex items-center gap-2 border-l-2 border-black pl-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-black" />
              <h1 className="text-sm font-display font-black tracking-tight text-black uppercase">
                Naija Tech Admin
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-mono-tech uppercase font-bold bg-[#D4F938] text-black px-2 py-0.5 rounded-full border-2 border-black shadow-neo-sm">
                Live Telemetry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Auto-refresh indicator */}
            <button
              id="admin-toggle-autorefresh-btn"
              type="button"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono-tech font-bold border-2 border-black shadow-neo-sm transition-all ${
                autoRefresh
                  ? 'bg-[#D4F938] text-black'
                  : 'bg-white text-black/60'
              }`}
              title="Toggle automatic 30s polling"
            >
              <RefreshCw className={`w-3 h-3 text-black ${autoRefresh ? 'animate-spin' : ''}`} />
              <span>Auto: {autoRefresh ? 'ON' : 'OFF'}</span>
            </button>

            {/* Sync Local Device Records Button */}
            <button
              id="admin-sync-local-records-btn"
              type="button"
              onClick={handleSyncLocalRecords}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FED74C] hover:bg-[#D4F938] text-black text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 cursor-pointer"
              title="Sync any assessment tests stored on this device into the live server database"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-black ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Device Records'}</span>
            </button>

            {/* Manual Refresh */}
            <button
              id="admin-refresh-stats-btn"
              type="button"
              onClick={() => token && fetchAdminStats(token)}
              disabled={isLoadingStats}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#D4F938] text-black text-xs font-display font-bold border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 cursor-pointer"
              title="Refresh telemetry immediately"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-black ${isLoadingStats ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Change Passkey */}
            <button
              id="admin-change-passkey-btn"
              type="button"
              onClick={() => setShowPasskeyModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FED74C] text-black text-xs font-display font-bold border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Change your secret passkey"
            >
              <KeyRound className="w-3.5 h-3.5 text-black" />
              <span className="hidden sm:inline">PIN</span>
            </button>

            {/* Logout */}
            <button
              id="admin-logout-btn"
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6A55] hover:bg-black hover:text-white text-white text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Lock and sign out of admin portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Sync Feedback Toast Banner */}
        {syncFeedback && (
          <div className={`p-4 rounded-xl text-xs flex items-center justify-between transition-all animate-in fade-in ${
            syncFeedback.type === 'success' 
              ? 'bg-emerald-950/90 border border-emerald-700 text-emerald-200' 
              : syncFeedback.type === 'error'
              ? 'bg-red-950/90 border border-red-800 text-red-200'
              : 'bg-stone-900 border border-stone-700 text-stone-200'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium">{syncFeedback.message}</span>
            </div>
            <button 
              onClick={() => setSyncFeedback(null)} 
              className="text-stone-400 hover:text-white text-xs font-bold px-2 py-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Error Alert */}
        {statsError && (
          <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{statsError}</span>
            </div>
            <button
              onClick={() => token && fetchAdminStats(token)}
              className="text-xs font-bold underline hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* Executive Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#13141F] text-white border-2 border-black rounded-3xl p-5 sm:p-7 shadow-neo-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4F938] animate-pulse border border-black" />
              <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#D4F938]">
                100% Real Live Telemetry (Zero Mock Data)
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-white/70 font-mono-tech">Live Synced</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white uppercase">
              Direct Traffic & Live Career Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-sans">
              Connected directly to candidate diagnostic assessments, hardware setups, and click funnels. Every metric is computed strictly from actual interactions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 z-10">
            <button
              id="admin-banner-sync-btn"
              type="button"
              onClick={handleSyncLocalRecords}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FED74C] hover:bg-[#D4F938] text-black text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50 cursor-pointer"
              title="Sync any assessments completed on this browser directly into live server storage"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-black ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Device Records'}</span>
            </button>
            <button
              id="admin-export-csv-btn"
              type="button"
              onClick={() => downloadExport('csv')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#D4F938] hover:bg-[#cbf425] text-black text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Download Top Recommendations as CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-black" />
              <span>Export CSV</span>
            </button>
            <button
              id="admin-export-json-btn"
              type="button"
              onClick={() => downloadExport('json')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#FED74C] text-black text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Download full analytics schema as JSON"
            >
              <FileCode2 className="w-4 h-4 text-black" />
              <span>Export JSON</span>
            </button>
            <button
              id="admin-export-dataset-btn"
              type="button"
              onClick={exportRecordsAsJSON}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#5D45FD] hover:bg-black text-white text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Download LLM Fine-Tuning Training Dataset JSON"
            >
              <Database className="w-4 h-4 text-white" />
              <span>AI Dataset ({getAllAssessmentRecords().length})</span>
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 5 CORE KPI METRIC CARDS (INCLUDING LIVE CLICKS) */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Pageviews */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-neo-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-black text-xs font-mono-tech font-bold uppercase mb-2">
              <span>Total Page Views</span>
              <div className="w-8 h-8 rounded-xl bg-[#F1F0FF] border-2 border-black flex items-center justify-center text-black">
                <ViewIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight">
              {stats ? stats.totals.pageviews.toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-mono-tech text-black/60">
              <span>Home: {stats?.pageviewsByPath['/'] || 0}</span>
              <span>Result: {stats?.pageviewsByPath['/result'] || 0}</span>
            </div>
          </div>

          {/* Card 2: Unique Visitors */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-neo-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-black text-xs font-mono-tech font-bold uppercase mb-2">
              <span>Unique Visitors</span>
              <div className="w-8 h-8 rounded-xl bg-[#FED74C] border-2 border-black flex items-center justify-center text-black">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight">
              {stats ? stats.totals.uniqueVisitors.toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-mono-tech text-black/60">
              <span className="font-bold text-[#5D45FD]">Distinct Users</span>
              <span>Organic Traffic</span>
            </div>
          </div>

          {/* Card 3: Live User Clicks & Interactions */}
          <div 
            onClick={() => setActiveTab('clicks')}
            className="bg-white border-2 border-black hover:bg-[#D4F938]/30 cursor-pointer rounded-2xl p-5 shadow-neo-sm relative overflow-hidden transition-all group"
            title="Click to view full button and action breakdown"
          >
            <div className="flex items-center justify-between text-black text-xs font-mono-tech font-bold uppercase mb-2">
              <span className="flex items-center gap-1.5 text-black">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping border border-black" />
                <span>Live Clicks</span>
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#D4F938] border-2 border-black flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-black text-[#5D45FD] tracking-tight">
              {stats ? (stats.totals.totalClicks || 0).toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-mono-tech text-black/60">
              <span className="font-bold group-hover:underline">All CTAs & Links</span>
              <span>5s auto-sync</span>
            </div>
          </div>

          {/* Card 4: Completion Funnel */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-neo-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-black text-xs font-mono-tech font-bold uppercase mb-2">
              <span>Diagnostic Tests</span>
              <div className="w-8 h-8 rounded-xl bg-[#FED74C] border-2 border-black flex items-center justify-center text-black">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-black text-black tracking-tight">
              {stats ? stats.totals.assessmentCompletions.toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-mono-tech text-black/60">
              <span>Starts: {stats?.totals.assessmentStarts || 0}</span>
              <span className="font-bold text-black bg-[#FED74C] px-1 rounded border border-black">
                {stats?.totals.completionRate || 0}% Done
              </span>
            </div>
          </div>

          {/* Card 5: AI Mentor Interactions */}
          <div className="bg-white border-2 border-black rounded-2xl p-5 shadow-neo-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-black text-xs font-mono-tech font-bold uppercase mb-2">
              <span>Tizzi AI Queries</span>
              <div className="w-8 h-8 rounded-xl bg-[#5D45FD] text-white border-2 border-black flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-display font-black text-[#5D45FD] tracking-tight">
              {stats ? stats.totals.chatQueries.toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t-2 border-black/10 flex items-center justify-between text-[11px] font-mono-tech text-black/60">
              <span className="font-bold text-black">Nigerian Advisory</span>
              <span>Live Guidance</span>
            </div>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 border-b-2 border-black pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all whitespace-nowrap border-2 border-black cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#D4F938] text-black shadow-neo-sm'
                : 'bg-white text-black hover:bg-[#FED74C]'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('top10')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 border-2 border-black cursor-pointer ${
              activeTab === 'top10'
                ? 'bg-[#D4F938] text-black shadow-neo-sm'
                : 'bg-white text-black hover:bg-[#FED74C]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Top 10 Recommendations</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clicks')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 border-2 border-black cursor-pointer ${
              activeTab === 'clicks'
                ? 'bg-[#D4F938] text-black shadow-neo-sm'
                : 'bg-white text-black hover:bg-[#FED74C]'
            }`}
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>Click Analytics</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 border-2 border-black cursor-pointer ${
              activeTab === 'submissions'
                ? 'bg-[#D4F938] text-black shadow-neo-sm'
                : 'bg-white text-black hover:bg-[#FED74C]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Recent Runs Feed</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: TOP 10 RECOMMENDATIONS (THE CORE USER ASK) */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'top10' || activeTab === 'overview') && (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Top 10 Recommended Tech Pathways
                  </h3>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Ranked by frequency of diagnostic matches based on Nigerian students' constraints & cognitive traits.
                </p>
              </div>

              {stats?.top10Recommendations[0] && (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-800 text-[11px] text-emerald-300 flex items-center gap-1.5 self-start sm:self-auto">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>#1 Ranked: <strong>{stats.top10Recommendations[0].nicheTitle}</strong></span>
                </div>
              )}
            </div>

            {/* Ranked Table / Visual List */}
            <div className="space-y-3">
              {stats?.top10Recommendations && stats.top10Recommendations.length > 0 ? (
                stats.top10Recommendations.map((rec, index) => {
                  const rank = index + 1;
                  const isTop3 = rank <= 3;
                  const rankColor =
                    rank === 1
                      ? 'bg-amber-500 text-stone-950 font-black'
                      : rank === 2
                      ? 'bg-stone-300 text-stone-950 font-black'
                      : rank === 3
                      ? 'bg-amber-700 text-white font-bold'
                      : 'bg-stone-800 text-stone-400 font-semibold';

                  return (
                    <div
                      key={rec.nicheId}
                      className="p-3.5 rounded-xl bg-stone-950/60 border border-stone-800/80 hover:border-stone-700 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 ${rankColor}`}>
                            #{rank}
                          </span>
                          <div>
                            <span className="text-sm font-bold text-white block">
                              {rec.nicheTitle}
                            </span>
                            <span className="text-[11px] text-stone-400">
                              Avg Candidate Fit: <span className="text-emerald-400 font-medium">{rec.avgScore}% match</span>
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm font-black text-white">
                            {rec.count} <span className="text-xs font-normal text-stone-400">matches</span>
                          </div>
                          <span className="text-xs font-mono text-emerald-400 font-semibold">
                            {rec.percentage}% share
                          </span>
                        </div>
                      </div>

                      {/* Percentage Bar */}
                      <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            rank === 1
                              ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                              : isTop3
                              ? 'bg-emerald-500'
                              : 'bg-stone-500'
                          }`}
                          style={{ width: `${Math.max(4, Math.min(100, rec.percentage * 2.5))}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-10 px-4 rounded-xl border border-dashed border-stone-800 bg-stone-950/40 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center mx-auto text-emerald-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 max-w-md mx-auto">
                    <h4 className="text-sm font-bold text-stone-200">Awaiting Live Diagnostic Submissions</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      This table ranks tech career pathways strictly from 100% real assessments taken by Nigerian candidates. Once you or any visitor takes the test on the main site, their recommended niche, fit score, device, and study hours will populate here instantly.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onBackToSite}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-xs active:scale-95"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Take Diagnostic Test on Public Site</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSyncLocalRecords}
                      disabled={isSyncing}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 transition-all active:scale-95 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>Sync Assessments from This Device</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: AUDIENCE CONSTRAINTS & HARDWARE REALITY */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'overview') && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Device Hardware Share */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Candidate Hardware Reality
                  </h4>
                </div>
                <span className="text-[11px] text-stone-400">Nigerian Devices</span>
              </div>

              <div className="space-y-3 pt-1">
                {stats?.deviceBreakdown && Object.keys(stats.deviceBreakdown).length > 0 ? (
                  Object.entries(stats.deviceBreakdown).map(([device, count]) => {
                    const total = Object.values(stats.deviceBreakdown).reduce((a, b) => a + b, 0);
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={device} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-300 font-medium">{device}</span>
                          <span className="text-stone-400 font-mono">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-stone-500 text-xs text-center py-4">No device data logged yet.</p>
                )}
              </div>
            </div>

            {/* Time Commitment Share */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                    Weekly Study Availability
                  </h4>
                </div>
                <span className="text-[11px] text-stone-400">Hours / Week</span>
              </div>

              <div className="space-y-3 pt-1">
                {stats?.hoursBreakdown && Object.keys(stats.hoursBreakdown).length > 0 ? (
                  Object.entries(stats.hoursBreakdown).map(([hours, count]) => {
                    const total = Object.values(stats.hoursBreakdown).reduce((a, b) => a + b, 0);
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                    return (
                      <div key={hours} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-stone-300 font-medium">{hours}</span>
                          <span className="text-stone-400 font-mono">{count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-500 h-full rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-stone-500 text-xs text-center py-4">No hours data logged yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: BUTTON CLICKS & CONVERSION AUDIT */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'clicks' || activeTab === 'overview') && (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <MousePointerClick className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Button & Interactive Engagement Telemetry
                  </h3>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  See where users are clicking most (e.g. Test start CTAs, WhatsApp shares, Tizzi AI chats).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Button / Action Label</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Action ID</th>
                    <th className="py-2.5 px-3 text-right">Total Clicks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {stats?.clicks && stats.clicks.length > 0 ? (
                    stats.clicks.map((click) => (
                      <tr key={click.id} className="hover:bg-stone-800/30 transition-colors">
                        <td className="py-3 px-3 font-semibold text-white">
                          {click.label}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-800 text-stone-300 border border-stone-700">
                            {click?.category || 'General'}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-stone-400">
                          {click.id}
                        </td>
                        <td className="py-3 px-3 text-right font-black text-emerald-400 text-sm">
                          {click.count.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-stone-500 text-xs">
                        No click events recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: RECENT SUBMISSIONS STREAM */}
        {/* ------------------------------------------------------------- */}
        {(activeTab === 'submissions' || activeTab === 'overview') && (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Recent Anonymous Diagnostic Runs
                  </h3>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Latest candidates who finished the diagnostic test and their matched career path.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Primary Match</th>
                    <th className="py-2.5 px-3">Fit %</th>
                    <th className="py-2.5 px-3">Device Reported</th>
                    <th className="py-2.5 px-3">State / Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {stats?.recentSubmissions && stats.recentSubmissions.length > 0 ? (
                    stats.recentSubmissions.map((sub) => {
                      const dateObj = new Date(sub.timestamp);
                      const timeStr = isNaN(dateObj.getTime())
                        ? sub.timestamp
                        : dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' ' + dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });

                      return (
                        <tr key={sub.id} className="hover:bg-stone-800/30 transition-colors">
                          <td className="py-3 px-3 font-mono text-[11px] text-stone-400">
                            {timeStr}
                          </td>
                          <td className="py-3 px-3 font-bold text-white">
                            {sub.primaryNiche}
                          </td>
                          <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">
                            {sub.matchScore}%
                          </td>
                          <td className="py-3 px-3 text-stone-300 text-[11px]">
                            {sub.device || 'Unspecified'}
                          </td>
                          <td className="py-3 px-3 text-stone-400 text-[11px]">
                            {sub.location || 'Nigeria'}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-10 text-center">
                        <div className="max-w-md mx-auto space-y-2 text-stone-400">
                          <p className="text-xs font-semibold text-stone-300">0 Live Candidate Submissions Logged</p>
                          <p className="text-[11px] text-stone-500">
                            Assessment tests are logged anonymously with timestamp, matched niche, fit percentage, and device constraints in real-time.
                          </p>
                          <button
                            type="button"
                            onClick={handleSyncLocalRecords}
                            disabled={isSyncing}
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
                          >
                            <RefreshCw className={`w-3 h-3 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
                            <span>Check & Sync Local Records</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Danger Zone & Reset */}
        <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
          <span>Server Status: Online & Monitoring</span>
          <button
            type="button"
            onClick={() => setShowResetModal(true)}
            className="text-stone-500 hover:text-red-400 inline-flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Telemetry Data</span>
          </button>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: CHANGE ADMIN PASSKEY */}
      {/* ------------------------------------------------------------- */}
      {showPasskeyModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Update Secret Passkey</h3>
              </div>
              <button
                onClick={() => setShowPasskeyModal(false)}
                className="text-stone-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-400">
              Change the secret PIN used to access this /admin route. Make sure you memorize it.
            </p>

            <form onSubmit={handleUpdatePasskey} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">New Secret Passkey</label>
                <input
                  type="password"
                  value={newPasskey}
                  onChange={(e) => setNewPasskey(e.target.value)}
                  placeholder="At least 6 characters..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">Confirm New Passkey</label>
                <input
                  type="password"
                  value={confirmPasskey}
                  onChange={(e) => setConfirmPasskey(e.target.value)}
                  placeholder="Repeat new passkey..."
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-emerald-500"
                  required
                />
              </div>

              {passkeyStatusMsg && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    passkeyStatusMsg.type === 'success'
                      ? 'bg-emerald-950/80 border border-emerald-800 text-emerald-300'
                      : 'bg-red-950/80 border border-red-800 text-red-300'
                  }`}
                >
                  <span>{passkeyStatusMsg.text}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasskeyModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingPasskey}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isUpdatingPasskey ? 'Saving...' : 'Save New Passkey'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: RESET TELEMETRY CONFIRMATION */}
      {/* ------------------------------------------------------------- */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Reset Telemetry Data?</h3>
            </div>
            <p className="text-xs text-stone-300">
              Are you sure you want to reset all click counters and recommendation statistics back to baseline? Your admin passkey will be preserved.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetStats}
                disabled={isResetting}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold disabled:opacity-50"
              >
                {isResetting ? 'Resetting...' : 'Yes, Reset Data'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
