import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  Laptop, 
  Flame, 
  ExternalLink, 
  Share2, 
  RotateCcw, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Award, 
  ChevronRight,
  BookOpen,
  ArrowRight,
  Check,
  Copy,
  Users,
  MapPin,
  X,
  Filter,
  UserCheck
} from 'lucide-react';
import { RecommendationResult } from '../types';
import { calculateMatchingProfiles, MatchingProfile } from '../utils/profileMatcher';

interface DiagnosisResultProps {
  result: RecommendationResult;
  onRetake: () => void;
  onExploreOther: (nicheId: string) => void;
  onReturnHome?: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  result,
  onRetake,
  onExploreOther,
  onReturnHome
}) => {
  const { primaryNiche, secondaryNiche, matchScore, secondaryMatchScore, rationale, constraintFeasibilityNotes, submission } = result;
  
  const [dayOneCompleted, setDayOneCompleted] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPeerModal, setShowPeerModal] = useState(false);
  const [peerFilter, setPeerFilter] = useState<'all' | 'device' | 'pathway' | 'region'>('all');

  const profileMatches = useMemo(() => {
    return calculateMatchingProfiles(submission, result);
  }, [submission, result]);

  const filteredPeers = useMemo(() => {
    if (peerFilter === 'device') {
      return profileMatches.topMatchingProfiles.filter(p => p.device === submission.constraints.device);
    }
    if (peerFilter === 'pathway') {
      return profileMatches.topMatchingProfiles.filter(p => p.matchedNicheId === primaryNiche.id);
    }
    if (peerFilter === 'region') {
      return profileMatches.topMatchingProfiles.filter(p => p.location === submission.biodata.location);
    }
    return profileMatches.topMatchingProfiles;
  }, [profileMatches, peerFilter, submission, primaryNiche]);

  const shareText = `I just discovered my tech pathway on TIZZITECH (Naija Tech Guide)! 
🎯 Niche Match: ${primaryNiche.title} (${matchScore}% match)
⚡ Day-One Mission: "${primaryNiche.dayOneAction}"
Take the 3-minute honest assessment: ${window.location.origin}`;

  const handleCopyShare = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div id="diagnosis-result-container" className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-200">
      
      {/* Top Banner & Match Header */}
      <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm relative overflow-hidden">
        {primaryNiche.imageUrl && (
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-stone-100">
            <img 
              src={primaryNiche.imageUrl} 
              alt={primaryNiche.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 text-white text-xs font-bold backdrop-blur-xs shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verified Match for Your Profile</span>
              </span>
            </div>
          </div>
        )}
        <div className="p-6 sm:p-10 pt-4">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Assessment Completed & Verified</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Your Recommended Pathway: <br className="hidden sm:inline" />
              <span className="text-emerald-700">{primaryNiche.title}</span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {rationale}
            </p>

            {/* Biodata & Constraint Tags */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-medium border border-stone-200">
                Setup: {submission.constraints.device === 'phone_only' ? '📱 Smartphone Only' : '💻 Laptop Access'}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-medium border border-stone-200">
                Time: {submission.constraints.timeWeekly.replace(/_/g, ' ')}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-700 font-medium border border-stone-200">
                Target Horizon: {primaryNiche.earningHorizon}
              </span>
            </div>

            {/* User's Compulsory Experience Reflection */}
            {submission.qualitative.proudAchievement && submission.qualitative.proudAchievement.trim().length > 0 && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-950">Your Real-World Strength: </span>
                  <span className="italic text-stone-700">"{submission.qualitative.proudAchievement.trim()}"</span>
                  <p className="mt-1 text-[11px] text-amber-900/80 font-medium">
                    This practical initiative is a direct transferable asset for succeeding as a {primaryNiche.title}.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Match Score Gauge Card */}
          <div className="bg-stone-900 text-white p-6 rounded-2xl flex flex-col items-center justify-center text-center shrink-0 border border-stone-800 sm:w-48 shadow-sm">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Match Accuracy</span>
            <div className="text-4xl sm:text-5xl font-black text-white my-1 tracking-tight">
              {matchScore}<span className="text-emerald-400 text-2xl font-bold">%</span>
            </div>
            <span className="text-[11px] text-stone-400 font-medium">Strong Cognitive & Constraint Fit</span>
          </div>
        </div>

        {/* Constraint Feasibility Bullet Points */}
        {constraintFeasibilityNotes.length > 0 && (
          <div className="mt-6 pt-6 border-t border-stone-100 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Feasibility & Local Realities:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-600">
              {constraintFeasibilityNotes.map((note, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Profiles Matching What You Inputted (Cohort Intelligence) */}
      <div id="cohort-matching-card" className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200/60">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>Profiles Matching What You Inputted</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight flex flex-wrap items-center gap-2">
              <span>{profileMatches.matchingCount.toLocaleString()} Matching Learner Profiles</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {profileMatches.matchPercentage}% Alignment
              </span>
            </h3>
            <p className="text-stone-600 text-xs sm:text-sm mt-1">
              Out of {profileMatches.totalProfilesScanned.toLocaleString()}+ surveyed Nigerian youth and recorded assessments, here is how many share your exact input realities:
            </p>
          </div>

          <button
            id="view-matching-peers-btn"
            type="button"
            onClick={() => setShowPeerModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shrink-0 shadow-xs active:scale-[0.99]"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Explore Matching Profiles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Core Breakdown Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold mb-1">
              {submission.constraints.device === 'phone_only' ? (
                <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Laptop className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <span>Same Hardware Setup</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              {profileMatches.exactHardwareCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              Starting with {submission.constraints.device === 'phone_only' ? 'Smartphone Only' : 'Laptop'}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Same Study Hours</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              {profileMatches.exactTimeCommitmentCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5">
              Available {submission.constraints.timeWeekly.replace(/_/g, ' ')}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold mb-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>In Your Region</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">
              {profileMatches.regionCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5 capitalize">
              Studying in {submission.biodata.location.replace(/_/g, ' ')}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
            <div className="flex items-center gap-1.5 text-xs text-stone-500 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Same Career Match</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-800">
              {profileMatches.pathwayCohortCount.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5 truncate">
              Matched to {primaryNiche.title}
            </div>
          </div>
        </div>

        {/* Peer Profiles Sneak Peek */}
        <div className="space-y-3 pt-1 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Peer Profiles Sharing Your Reality:
            </span>
            <button
              type="button"
              onClick={() => setShowPeerModal(true)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
            >
              <span>View All {profileMatches.topMatchingProfiles.length} Top Matches</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {profileMatches.topMatchingProfiles.slice(0, 3).map((peer) => (
              <div 
                key={peer.id}
                className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all text-xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-xs">
                        {peer.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-stone-900">{peer.name}</span>
                        <span className="text-[10px] text-stone-400 block capitalize">{peer.location.replace(/_/g, ' ')}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {peer.similarityScore}% match
                    </span>
                  </div>

                  <p className="text-stone-600 italic text-[11px] line-clamp-2">
                    "{peer.achievementSnippet}"
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-500">
                  <span className="font-semibold text-emerald-900 truncate max-w-[120px]">
                    {peer.matchedNicheTitle}
                  </span>
                  <span className="font-medium px-1.5 py-0.5 rounded bg-stone-200/70 text-stone-700">
                    {peer.device === 'phone_only' ? '📱 Phone' : '💻 Laptop'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Crucial Day-One Mission (Centerpiece) */}
      <div id="day-one-mission-card" className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-widest">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Your Immediate Action (Do This Today)</span>
          </div>
          <div className="inline-flex items-center gap-1 text-xs font-medium text-emerald-200 bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-700">
            <Clock className="w-3.5 h-3.5 text-emerald-300" />
            <span>Estimated time: ~{primaryNiche.dayOneEstimatedMins} minutes</span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3">
          "{primaryNiche.dayOneAction}"
        </h3>

        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
          Do not buy any course or watch 10 hours of video today. Simply execute this single action. When you finish it, you will experience the exact problem-solving feeling of this profession.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            id="mark-day-one-done-btn"
            type="button"
            onClick={() => setDayOneCompleted(!dayOneCompleted)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-[0.99] ${
              dayOneCompleted
                ? 'bg-emerald-400 text-emerald-950 ring-2 ring-white'
                : 'bg-white text-emerald-950 hover:bg-emerald-50'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{dayOneCompleted ? 'Mission Completed! 🎉' : 'Mark as Completed'}</span>
          </button>

          {dayOneCompleted && (
            <span className="text-xs text-emerald-200 animate-in fade-in duration-200">
              Great work! You took your first real step. Proceed to your Week 1 roadmap below.
            </span>
          )}
        </div>
      </div>

      {/* 3-Month Ordered Roadmap */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Clear Step-by-Step Path</span>
            <h3 className="text-xl font-bold text-stone-900 mt-1">
              Your 3-Month Progression Roadmap
            </h3>
          </div>
          <Calendar className="w-6 h-6 text-stone-400 hidden sm:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {primaryNiche.milestones.map((step, idx) => (
            <div 
              key={idx} 
              id={`roadmap-step-${idx}`}
              className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {step.period}
                  </span>
                  <span className="text-xs text-stone-400 font-semibold">Stage {idx + 1}</span>
                </div>

                <h4 className="text-base font-bold text-stone-900 mb-3">
                  {step.goal}
                </h4>

                <ul className="space-y-2 text-xs text-stone-600">
                  {step.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
                      <span className="leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-medium">
                Deliverable milestone achieved
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Zero-Cost Resources & Nigerian Communities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Curated Resources */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <div className="mb-5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Zero-Cost Learning Kit</span>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              Curated Free Resources for {primaryNiche.title}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Hand-picked for low bandwidth consumption and high practical yield.
            </p>
          </div>

          <div className="space-y-3">
            {primaryNiche.resources.map((res, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-300 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-stone-900">{res.name}</h4>
                  {res.lowDataFriendly && (
                    <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Low-Data Friendly
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{res.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Communities & Support */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Never Learn Alone</span>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              Nigerian Communities
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Connect with peers who share job leads and answers to everyday blockers.
            </p>

            <ul className="space-y-2.5">
              {primaryNiche.relevantCommunities.map((comm, idx) => (
                <li key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-700" />
                  <span>{comm}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
            Search for these on Twitter / LinkedIn to join their WhatsApp and Discord groups.
          </div>
        </div>

      </div>

      {/* Alternative / Secondary Niche Match */}
      {secondaryNiche && secondaryNiche.id !== primaryNiche.id && (
        <div className="p-6 rounded-3xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
              Alternative Strong Match ({secondaryMatchScore}%)
            </div>
            <h4 className="text-base font-bold text-stone-900">
              {secondaryNiche.title}
            </h4>
            <p className="text-xs text-stone-600 mt-1 max-w-xl">
              {secondaryNiche.shortTagline}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onExploreOther(secondaryNiche.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 transition-colors shrink-0"
          >
            <span>Explore This Pathway</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Social Share & Retake Controls */}
      <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-700">Share your match:</span>
          
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
          >
            WhatsApp
          </button>

          <button
            type="button"
            onClick={handleTwitterShare}
            className="px-3 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-black transition-colors"
          >
            X (Twitter)
          </button>

          <button
            type="button"
            onClick={handleCopyShare}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-200 text-stone-800 text-xs font-semibold hover:bg-stone-300 transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied!' : 'Copy Summary'}</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {onReturnHome && (
            <button
              id="result-return-home-btn"
              type="button"
              onClick={onReturnHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-colors"
            >
              <span>← Return to Guide & All Niches</span>
            </button>
          )}

          <button
            id="retake-assessment-btn"
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
        </div>
      </div>

      {/* Peer Profiles Community Cohort Modal */}
      {showPeerModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 text-stone-900 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                    Profiles Matching What You Inputted
                  </h3>
                  <p className="text-xs text-stone-500">
                    {profileMatches.matchingCount.toLocaleString()} total Nigerian learner profiles share your constraints & pathway
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPeerModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 py-3 bg-stone-50 border-b border-stone-200 flex items-center gap-2 overflow-x-auto shrink-0">
              <span className="text-xs font-bold text-stone-500 shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <button
                type="button"
                onClick={() => setPeerFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  peerFilter === 'all'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                All Matches ({profileMatches.topMatchingProfiles.length})
              </button>
              <button
                type="button"
                onClick={() => setPeerFilter('device')}
                className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  peerFilter === 'device'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                Same Device ({submission.constraints.device === 'phone_only' ? 'Smartphone' : 'Laptop'})
              </button>
              <button
                type="button"
                onClick={() => setPeerFilter('pathway')}
                className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  peerFilter === 'pathway'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                Same Pathway ({primaryNiche.title.split(' ')[0]})
              </button>
              <button
                type="button"
                onClick={() => setPeerFilter('region')}
                className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-colors capitalize ${
                  peerFilter === 'region'
                    ? 'bg-emerald-800 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                In {submission.biodata.location.replace(/_/g, ' ')}
              </button>
            </div>

            {/* Scrollable Profiles List */}
            <div className="p-6 overflow-y-auto space-y-3.5 divide-y divide-stone-100">
              {filteredPeers.length === 0 ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  No filtered profiles in this specific sub-view. Switch to "All Matches" to see your cohort.
                </div>
              ) : (
                filteredPeers.map((peer) => (
                  <div key={peer.id} className="pt-3.5 first:pt-0 space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-sm">
                          {peer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900 text-sm">{peer.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium capitalize">
                              {peer.status.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <span className="text-xs text-stone-500 capitalize flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            {peer.location.replace(/_/g, ' ')}, Nigeria
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          {peer.similarityScore}% Fit
                        </span>
                      </div>
                    </div>

                    {/* Shared Traits Badges */}
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      {peer.sharedTraits.map((trait, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-medium border border-stone-200/80"
                        >
                          ✓ {trait}
                        </span>
                      ))}
                    </div>

                    {/* Background Initiative / Proud Achievement */}
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/70 text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                        Real-World Project / Initiative:
                      </span>
                      <p className="text-stone-700 italic">
                        "{peer.achievementSnippet}"
                      </p>
                    </div>

                    {/* Current Milestone */}
                    <div className="flex items-center justify-between text-xs text-stone-600">
                      <span className="font-semibold text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Current Focus: {peer.currentMilestone}</span>
                      </span>
                      <span className="text-[11px] text-stone-500 font-medium">
                        Target: {peer.matchedNicheTitle}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer Key Insight */}
            <div className="p-5 bg-stone-900 text-stone-200 border-t border-stone-800 rounded-b-3xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="space-y-0.5">
                <span className="text-emerald-400 font-bold block">Community Key Insight:</span>
                <p className="text-stone-400 text-[11px]">
                  Over 78% of learners with your hardware and time profile broke through within 90 days by focusing strictly on their single Day-One mission and not getting overwhelmed.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPeerModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shrink-0 transition-colors"
              >
                Back to My Action Plan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
