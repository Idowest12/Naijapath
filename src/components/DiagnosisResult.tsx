import React, { useState } from 'react';
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
  Users
} from 'lucide-react';
import { RecommendationResult } from '../types';

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

    </div>
  );
};
