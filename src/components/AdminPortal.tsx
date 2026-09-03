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
  Sparkles,
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
import { syncLocalRecordsToServer } from '../utils/analytics';

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
    try {
      const res = await fetch('/api/admin/stats', {
        headers: {
          'x-admin-token': activeToken,
        },
      });

      if (res.status === 401) {
        // Token expired
        setToken(null);
        localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
        setLoginError('Your admin session has expired. Please enter passkey again.');
        return;
      }

      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      } else {
        setStatsError(data.error || 'Failed to load telemetry stats.');
      }
    } catch {
      setStatsError('Network error connecting to telemetry server.');
    } finally {
      if (!silent) setIsLoadingStats(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) {
      setLoginError('Please enter your admin passkey.');
      return;
    }

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey: passkeyInput }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, data.token);
        setPasskeyInput('');
        setLoginError(null);
      } else {
        setLoginError(data.error || 'Invalid admin passkey.');
        if (data.lockedUntil) {
          setLockedUntil(data.lockedUntil);
        }
      }
    } catch {
      setLoginError('Could not reach server. Please check your network.');
    } finally {
      setIsLoggingIn(false);
    }
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

    try {
      const res = await fetch('/api/admin/update-passkey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token || '',
        },
        body: JSON.stringify({ newPasskey }),
      });

      const data = await res.json();
      if (data.success) {
        setPasskeyStatusMsg({ type: 'success', text: 'Passkey successfully updated! Save it safely.' });
        setNewPasskey('');
        setConfirmPasskey('');
        setTimeout(() => {
          setShowPasskeyModal(false);
          setPasskeyStatusMsg(null);
        }, 2000);
      } else {
        setPasskeyStatusMsg({ type: 'error', text: data.error || 'Failed to update passkey.' });
      }
    } catch {
      setPasskeyStatusMsg({ type: 'error', text: 'Failed to communicate with server.' });
    } finally {
      setIsUpdatingPasskey(false);
    }
  };

  const handleResetStats = async () => {
    if (!token) return;
    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/reset-stats', {
        method: 'POST',
        headers: {
          'x-admin-token': token,
        },
      });
      const data = await res.json();
      if (data.success) {
        setShowResetModal(false);
        fetchAdminStats(token);
      } else {
        alert(data.error || 'Failed to reset.');
      }
    } catch {
      alert('Error connecting to server.');
    } finally {
      setIsResetting(false);
    }
  };

  const downloadExport = async (format: 'csv' | 'json') => {
    if (!token) return;
    window.location.href = `/api/admin/export?format=${format}&token=${encodeURIComponent(token)}`;
  };

  // -------------------------------------------------------------
  // VIEW 1: SECURITY SHIELD GATE (LOGIN SCREEN)
  // -------------------------------------------------------------
  if (!token) {
    return (
      <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-between p-4 sm:p-6 antialiased">
        {/* Top Header */}
        <div className="max-w-md mx-auto w-full pt-4 flex items-center justify-between">
          <button
            id="admin-return-public-site-btn"
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public App</span>
          </button>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
            SECURE LINK /admin
          </span>
        </div>

        {/* Center Card */}
        <div className="max-w-md mx-auto w-full my-auto py-8">
          <div className="bg-stone-950/90 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400" />

            {/* Icon Header */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 shadow-inner">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <h1 className="text-xl font-black tracking-tight text-white">Owner & Admin Gateway</h1>
              <p className="text-xs text-stone-400 mt-1 max-w-xs">
                Private analytics portal tracking candidate traffic, button clicks, and top 10 recommended career paths.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5 flex items-center justify-between">
                  <span>Admin Secret Passkey</span>
                  <KeyRound className="w-3.5 h-3.5 text-stone-500" />
                </label>
                <div className="relative">
                  <input
                    id="admin-passkey-input"
                    type={showPasskey ? 'text' : 'password'}
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    placeholder="Enter your admin secret PIN..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 pr-11 transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasskey(!showPasskey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 p-1"
                    title={showPasskey ? 'Hide passkey' : 'Show passkey'}
                  >
                    {showPasskey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-300 text-xs flex items-start gap-2 animate-in fade-in duration-200">
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                id="admin-unlock-portal-btn"
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950 active:scale-98 disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>Unlock Admin Console</span>
                  </>
                )}
              </button>
            </form>

            {/* Anti-hijack Information Box */}
            <div className="mt-6 pt-5 border-t border-stone-800/80">
              <div className="flex items-start gap-2.5 bg-stone-900/60 p-3 rounded-xl border border-stone-800 text-[11px] text-stone-400">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-stone-300 block">Anti-Hijacking Protection</span>
                  <p>
                    This console is locked behind server-verified authentication. Five consecutive failed attempts trigger a temporary lockdown.
                  </p>
                  <p className="text-emerald-400 font-mono text-[10px] mt-1 pt-1 border-t border-stone-800">
                    Default Master Key: <span className="underline select-all">naija-admin-2026</span> (Change anytime inside).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-md mx-auto w-full text-center pb-4 text-[11px] text-stone-500">
          Naija Tech Career Advisor • Executive Telemetry System
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans antialiased">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              id="admin-nav-back-to-site"
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold border border-stone-700 transition-colors"
              title="Return to the candidate-facing app"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <div className="flex items-center gap-2 border-l border-stone-800 pl-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-sm font-black tracking-tight text-white">Naija Tech Guide Admin</h1>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
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
              className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                autoRefresh
                  ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                  : 'bg-stone-800 border-stone-700 text-stone-400'
              }`}
              title="Toggle automatic 30s polling"
            >
              <RefreshCw className={`w-3 h-3 ${autoRefresh ? 'text-emerald-400' : 'text-stone-500'}`} />
              <span>Auto-refresh: {autoRefresh ? 'ON' : 'OFF'}</span>
            </button>

            {/* Sync Local Device Records Button */}
            <button
              id="admin-sync-local-records-btn"
              type="button"
              onClick={handleSyncLocalRecords}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-800/80 transition-colors disabled:opacity-50"
              title="Sync any assessment tests stored on this device into the live server database"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Device Records'}</span>
            </button>

            {/* Manual Refresh */}
            <button
              id="admin-refresh-stats-btn"
              type="button"
              onClick={() => token && fetchAdminStats(token)}
              disabled={isLoadingStats}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors disabled:opacity-50"
              title="Refresh telemetry immediately"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-stone-300 ${isLoadingStats ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Change Passkey */}
            <button
              id="admin-change-passkey-btn"
              type="button"
              onClick={() => setShowPasskeyModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
              title="Change your secret passkey"
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Security PIN</span>
            </button>

            {/* Logout */}
            <button
              id="admin-logout-btn"
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 text-xs font-semibold border border-red-800/80 transition-colors"
              title="Lock and sign out of admin portal"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Sign Out</span>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900/80 border border-stone-800 rounded-2xl p-5 sm:p-6 relative overflow-hidden">
          <div className="relative z-10 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                100% Real Live Telemetry Feed (Zero Mock Data)
              </span>
              <span className="text-stone-500">•</span>
              <span className="text-xs text-stone-400 font-mono">Live Synchronized</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Direct Traffic & Live Career Recommendations
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-2xl">
              Connected directly to user diagnostic assessments, device realities, and click funnels. Every metric is computed strictly from actual candidate interactions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 z-10">
            <button
              id="admin-banner-sync-btn"
              type="button"
              onClick={handleSyncLocalRecords}
              disabled={isSyncing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-700 hover:bg-emerald-900 text-emerald-300 text-xs font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
              title="Sync any assessments completed on this browser directly into live server storage"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Device Records'}</span>
            </button>
            <button
              id="admin-export-csv-btn"
              type="button"
              onClick={() => downloadExport('csv')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              title="Download Top Recommendations as CSV"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <button
              id="admin-export-json-btn"
              type="button"
              onClick={() => downloadExport('json')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold border border-stone-700 transition-all active:scale-95"
              title="Download full analytics schema as JSON"
            >
              <FileCode2 className="w-4 h-4 text-emerald-400" />
              <span>Export JSON</span>
            </button>
          </div>

          {/* Decorative Corner Glow */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 5 CORE KPI METRIC CARDS (INCLUDING LIVE CLICKS) */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Pageviews */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold mb-2">
              <span>Total Page Views</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <ViewIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {stats ? stats.totals.pageviews.toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
              <span>Home: {stats?.pageviewsByPath['/'] || 0}</span>
              <span>Result: {stats?.pageviewsByPath['/result'] || 0}</span>
            </div>
          </div>

          {/* Card 2: Unique Visitors */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold mb-2">
              <span>Unique Visitors</span>
              <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {stats ? stats.totals.uniqueVisitors.toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
              <span className="text-blue-400 font-medium">Distinct Sessions</span>
              <span>Organic Traffic</span>
            </div>
          </div>

          {/* Card 3: Live User Clicks & Interactions */}
          <div 
            onClick={() => setActiveTab('clicks')}
            className="bg-stone-900 border border-emerald-900/60 hover:border-emerald-500/80 cursor-pointer rounded-2xl p-5 relative overflow-hidden transition-all group"
            title="Click to view full button and action breakdown"
          >
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Live Clicks</span>
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700/80 flex items-center justify-center text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
              {stats ? (stats.totals.totalClicks || 0).toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
              <span className="text-emerald-300 font-medium group-hover:underline">All CTAs & Links</span>
              <span className="text-stone-500 font-mono">5s auto-sync</span>
            </div>
          </div>

          {/* Card 4: Completion Funnel */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold mb-2">
              <span>Diagnostic Tests</span>
              <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800/60 flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {stats ? stats.totals.assessmentCompletions.toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
              <span>Starts: {stats?.totals.assessmentStarts || 0}</span>
              <span className="text-amber-400 font-bold">
                {stats?.totals.completionRate || 0}% Done
              </span>
            </div>
          </div>

          {/* Card 5: AI Mentor Interactions */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-stone-400 text-xs font-semibold mb-2">
              <span>Tizzi AI Queries</span>
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {stats ? stats.totals.chatQueries.toLocaleString() : '---'}
            </div>
            <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
              <span className="text-purple-300 font-medium">Nigerian Advisory</span>
              <span>Live Guidance</span>
            </div>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-900'
            }`}
          >
            Dashboard Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('top10')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'top10'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-900'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Top 10 Recommendations</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clicks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'clicks'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-900'
            }`}
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>Click Analytics</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'submissions'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-900'
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
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
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
                            {click.category}
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
