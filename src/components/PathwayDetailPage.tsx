import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Smartphone, 
  Laptop, 
  Clock, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  Bot, 
  ShieldCheck, 
  Calendar, 
  Wrench, 
  Sparkles, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  ExternalLink,
  Compass,
  Zap
} from 'lucide-react';
import { PathwayNiche } from '../types';
import { ALL_NICHES } from '../data/nichesData';
import { trackClick } from '../utils/analytics';
import { Footer } from './Footer';

interface PathwayDetailPageProps {
  nicheId: string;
  onBack: () => void;
  onStartAssessment: () => void;
  onOpenChatbot: (prompt?: string) => void;
  onSelectNiche?: (nicheId: string) => void;
  onSelectStrategy?: (strategyKey: string) => void;
}

export const PathwayDetailPage: React.FC<PathwayDetailPageProps> = ({
  nicheId,
  onBack,
  onStartAssessment,
  onOpenChatbot,
  onSelectNiche,
  onSelectStrategy
}) => {
  const niche = ALL_NICHES.find((n) => n.id === nicheId) || ALL_NICHES[0];

  // Scroll to top upon viewing
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [nicheId]);

  const handleStartFitAssessment = () => {
    trackClick('pathway_page_assess_fit_btn', `Assess Fit for ${niche.title}`, 'Pathway Page');
    onStartAssessment();
  };

  const handleAskAIMentor = () => {
    trackClick('pathway_page_ask_ai_btn', `Ask AI about ${niche.title}`, 'Pathway Page');
    onOpenChatbot(`I want to learn more about the ${niche.title} pathway in Nigeria. What are realistic first steps, data-saving hacks, and how can I start earning?`);
  };

  // Other related niches in same or complementary category
  const relatedNiches = ALL_NICHES.filter((n) => n.id !== niche.id).slice(0, 3);

  return (
    <div id="pathway-detail-page" className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 font-sans antialiased">
      
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Back Button & Breadcrumbs */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                id="pathway-back-btn"
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-950 border border-stone-200 text-xs sm:text-sm font-semibold transition-all shadow-2xs cursor-pointer active:scale-95"
                title="Return to home and all pathways"
              >
                <ArrowLeft className="w-4 h-4 text-stone-500" />
                <span className="hidden sm:inline">Back to Pathways</span>
                <span className="sm:hidden">Back</span>
              </button>

              <div className="h-5 w-px bg-stone-200 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200 hidden md:inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-700" /> Career Roadmap
                </span>
                <span className="text-xs text-stone-400 hidden lg:inline">/</span>
                <span className="text-xs font-semibold text-stone-700 truncate max-w-[200px] hidden lg:inline">
                  {niche.title}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                id="pathway-top-ai-btn"
                type="button"
                onClick={handleAskAIMentor}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <Bot className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline">Ask Tizzi AI</span>
              </button>

              <button
                id="pathway-top-assessment-btn"
                type="button"
                onClick={handleStartFitAssessment}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <span>Take Fit Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 pb-16 sm:pb-24">
        
        {/* Hero Banner Section */}
        <section className="relative bg-stone-900 text-white overflow-hidden border-b border-stone-800">
          {niche.imageUrl && (
            <div className="absolute inset-0">
              <img 
                src={niche.imageUrl} 
                alt={niche.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-900/60"></div>
            </div>
          )}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-14 sm:pb-20">
            <div className="max-w-3xl space-y-4 sm:space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 text-emerald-200 text-xs font-mono border border-emerald-700/80 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  {niche.category === 'creative' ? 'Design & Creative' : niche.category === 'non-technical' ? 'Operations & Growth' : 'Engineering & Data'}
                </span>

                {niche.deviceRequirement === 'phone_only_possible' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 text-emerald-300 text-xs font-mono border border-emerald-800/80 backdrop-blur-xs">
                    <Smartphone className="w-3.5 h-3.5" /> Starts on Phone
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/80 text-stone-300 text-xs font-mono border border-stone-700/80 backdrop-blur-xs">
                    <Laptop className="w-3.5 h-3.5 text-stone-400" /> Laptop Needed
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight tracking-tight">
                {niche.title}
              </h1>

              <p className="text-base sm:text-xl text-stone-300 leading-relaxed font-sans max-w-2xl font-light">
                {niche.shortTagline}
              </p>

              {/* Fast Fact Pill Grid */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-300" /> Study Time
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white mt-1 block">
                    {niche.timeCommitment}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Earning Horizon
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-emerald-300 mt-1 block">
                    {niche.earningHorizon}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-stone-300" /> Starting Rig
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white mt-1 block">
                    {niche.supportedOnPhone ? 'Phone OK to start' : 'Laptop essential'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Main Column (Overview, Day-One Task, Roadmap, Curated Resources) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Detailed Breakdown Card */}
              <section className="bg-white rounded-3xl p-6 sm:p-9 border border-stone-200/90 shadow-2xs space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
                    Pathway Deep Dive
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-normal">
                    What This Role Truly Entails
                  </h2>
                </div>

                <p className="text-base text-stone-700 leading-relaxed font-sans">
                  {niche.description}
                </p>

                {/* Practical Nigerian Context Callout */}
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm">
                    <Zap className="w-4 h-4 text-emerald-700" />
                    <span>Realistic Nigerian Industry Context</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    In Nigeria, employers and international clients look for tangible proof over certificates. Whether you're working from Lagos, Ibadan, Enugu, or Kano, building a documented repository or portfolio of 2–3 completed projects opens doors far faster than reading theory.
                  </p>
                </div>
              </section>

              {/* Day-One Proof Project (Prominent Feature) */}
              <section id="day-one-project" className="bg-emerald-950 text-stone-100 rounded-3xl p-6 sm:p-9 border border-emerald-800/80 shadow-md space-y-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                        Action Before Investment
                      </span>
                      <h3 className="font-serif-display text-xl sm:text-2xl text-white font-normal">
                        Your Day-One Proof Project
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-emerald-200 bg-emerald-900/90 px-3 py-1 rounded-full border border-emerald-700/80">
                    Takes ~{niche.dayOneEstimatedMins || 20} minutes
                  </span>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-emerald-900/40 border border-emerald-700/50 space-y-3 relative z-10">
                  <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-sans italic">
                    "{niche.dayOneAction}"
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cost: ₦0. You do not need paid software or expensive courses to test your genuine curiosity.</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 relative z-10">
                  <p className="text-xs text-stone-400 max-w-md">
                    If this 20-minute task feels energizing, you have found a natural affinity. If it feels like pure torture, test a different pathway before buying expensive data bundles!
                  </p>

                  <button
                    type="button"
                    onClick={handleAskAIMentor}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Bot className="w-4 h-4 text-emerald-300" />
                    <span>Guide Me Through This Task</span>
                  </button>
                </div>
              </section>

              {/* 3-Month Realistic Progression Roadmap */}
              {niche.milestones && niche.milestones.length > 0 && (
                <section className="bg-white rounded-3xl p-6 sm:p-9 border border-stone-200/90 shadow-2xs space-y-7">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
                      <Calendar className="w-4 h-4 text-emerald-700" />
                      <span>Realistic 3-Month Trajectory</span>
                    </div>
                    <h2 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-normal">
                      Your Month-by-Month Blueprint
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 font-sans">
                      Structured specifically for candidates balancing school, NYSC, or a non-tech day job.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {niche.milestones.map((m, idx) => (
                      <div 
                        key={idx} 
                        className="p-5 sm:p-6 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-3 transition-all hover:border-emerald-300 hover:shadow-xs"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/60 pb-3">
                          <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100/90 px-3 py-1 rounded-lg border border-emerald-200">
                            {m.period}
                          </span>
                          <span className="text-sm font-semibold text-stone-900 font-sans">
                            Goal: {m.goal}
                          </span>
                        </div>

                        {m.tasks && m.tasks.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 font-medium block">
                              Key Milestones:
                            </span>
                            <ul className="space-y-2">
                              {m.tasks.map((task, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Curated Resources Section */}
              {niche.resources && niche.resources.length > 0 && (
                <section className="bg-white rounded-3xl p-6 sm:p-9 border border-stone-200/90 shadow-2xs space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
                      <BookOpen className="w-4 h-4 text-emerald-700" />
                      <span>Zero-Fluff Curriculum</span>
                    </div>
                    <h2 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-normal">
                      Recommended Learning Resources
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500 font-sans">
                      Selected for high practical depth and low data consumption.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {niche.resources.map((res, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                              {res.type.replace('_', ' ')}
                            </span>
                            {res.lowDataFriendly && (
                              <span className="text-[10px] font-mono text-emerald-700 flex items-center gap-1 font-semibold">
                                <Zap className="w-3 h-3 text-emerald-600" /> Low Data
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-stone-900 font-sans">
                            {res.name}
                          </h4>
                          <p className="text-xs text-stone-600 leading-relaxed font-sans">
                            {res.description}
                          </p>
                        </div>

                        {res.url && (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 pt-2 border-t border-stone-200/60"
                          >
                            <span>Open Resource</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Right Sidebar Column (Tools, Communities, Fit Test, Related Niches) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Fit Assessment Card */}
              <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 border border-stone-800 shadow-md space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Compass className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-display text-xl text-white font-normal">
                    Am I Truly Suited For This?
                  </h3>
                  <p className="text-xs text-stone-300 font-sans leading-relaxed">
                    Take our 5-minute Nigerian diagnostic. We cross-reference your hardware, hours, math appetite, and personality to calculate an honest match score.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStartFitAssessment}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <span>Start 5-Minute Fit Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Everyday Tools Card */}
              {niche.typicalTools && niche.typicalTools.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-stone-500">
                    <Wrench className="w-4 h-4 text-stone-400" />
                    <span>Everyday Industry Tools</span>
                  </div>

                  <p className="text-xs text-stone-500 font-sans">
                    You'll use these daily. Most are free or have robust free tiers:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {niche.typicalTools.map((tool, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-mono px-3 py-1.5 rounded-xl bg-stone-50 text-stone-800 border border-stone-200/80 font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nigerian & Global Communities */}
              {niche.relevantCommunities && niche.relevantCommunities.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-stone-500">
                    <Users className="w-4 h-4 text-stone-400" />
                    <span>Active Communities</span>
                  </div>

                  <p className="text-xs text-stone-500 font-sans">
                    Connect with peers for accountability, referrals, and gig swaps:
                  </p>

                  <ul className="space-y-2">
                    {niche.relevantCommunities.map((comm, idx) => (
                      <li key={idx} className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-200/70 font-sans flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>{comm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Pathways */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-400">
                    Explore Alternatives
                  </span>
                  <h4 className="font-serif-display text-lg text-stone-900 font-normal">
                    Other Pathways to Compare
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {relatedNiches.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => onSelectNiche?.(rel.id)}
                      className="w-full text-left p-3 rounded-2xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-200/80 hover:border-emerald-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-900">
                          {rel.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {rel.shortTagline}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Bottom Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 border border-stone-800 text-center space-y-6 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Personalized Career Guidance
              </span>
              <h3 className="font-serif-display text-3xl sm:text-4xl text-white font-normal leading-tight">
                Not 100% Sure If {niche.title} Is Right For You?
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-sans font-light">
                Answer 12 honest questions about your smartphone vs laptop setup, weekly electricity reliability, and logic appetite. We will calculate your primary and secondary pathway matches instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all border border-stone-700 cursor-pointer"
              >
                Browse All Pathways
              </button>

              <button
                type="button"
                onClick={handleStartFitAssessment}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
              >
                <span>Take 5-Minute Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* Site Footer */}
      <Footer 
        onSelectNiche={onSelectNiche} 
        onSelectStrategy={onSelectStrategy} 
      />

    </div>
  );
};
