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
  BookOpen, 
  Users, 
  CheckCircle2, 
  ExternalLink,
  Compass,
  Zap,
  Award
} from 'lucide-react';
import { PathwayNiche } from '../types';
import { ALL_NICHES } from '../pathways/nichesData';
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
    <div id="pathway-detail-page" className="min-h-screen flex flex-col bg-[#F1F0FF] text-black font-sans antialiased">
      
      {/* Sticky Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Back Button & Breadcrumbs */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                id="pathway-back-btn"
                type="button"
                onClick={() => {
                  if (window.history.state && window.history.length > 1) {
                    window.history.back();
                  } else {
                    onBack();
                  }
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-[#D4F938] text-black border-2 border-black text-xs sm:text-sm font-display font-extrabold transition-all shadow-neo-sm cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                title="Return to home and all pathways"
              >
                <ArrowLeft className="w-4 h-4 text-black" />
                <span className="hidden sm:inline">Back to Pathways</span>
                <span className="sm:hidden">Back</span>
              </button>

              <div className="h-5 w-px bg-black hidden sm:block" />

              <div className="flex items-center gap-2 text-xs font-mono-tech uppercase text-black">
                <span className="font-bold hidden md:inline">Curriculum</span>
                <span className="text-black/40 hidden md:inline">/</span>
                <span className="font-bold text-[#5D45FD] truncate max-w-[200px] hidden lg:inline">
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
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#D4F938] text-black border-2 border-black text-xs font-display font-extrabold transition-all cursor-pointer shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5"
              >
                <Bot className="w-4 h-4 text-black" />
                <span className="hidden sm:inline">Ask Mentor Tizzi</span>
              </button>

              <button
                id="pathway-top-assessment-btn"
                type="button"
                onClick={handleStartFitAssessment}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4F938] hover:bg-[#cbf425] text-black text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>Take Fit Assessment</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 pb-16 sm:pb-24">
        
        {/* Hero Banner Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
          <section className="relative bg-[#13141F] text-white rounded-3xl border-2 border-black shadow-neo-lg overflow-hidden p-6 sm:p-10 lg:p-12">
            
            <div className="relative max-w-4xl space-y-5 sm:space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FED74C] text-black text-xs font-mono-tech font-bold border-2 border-black shadow-neo-sm uppercase">
                  <Award className="w-3.5 h-3.5 text-black" />
                  {niche?.category === 'creative' ? 'Design & Creative' : niche?.category === 'non-technical' ? 'Operations & Growth' : 'Engineering & Data'}
                </span>

                {niche.deviceRequirement === 'phone_only_possible' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4F938] text-black text-xs font-mono-tech font-bold border-2 border-black shadow-neo-sm uppercase">
                    <Smartphone className="w-3.5 h-3.5" /> Starts on Phone
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-xs font-mono-tech font-bold border-2 border-black shadow-neo-sm uppercase">
                    <Laptop className="w-3.5 h-3.5" /> Laptop Needed
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight uppercase">
                {niche.title}
              </h1>

              <p className="text-base sm:text-xl text-white/90 leading-relaxed font-sans max-w-2xl font-normal">
                {niche.shortTagline}
              </p>

              {/* Fast Fact Cards */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3.5 max-w-2xl">
                <div className="p-4 rounded-2xl bg-white text-black border-2 border-black shadow-neo-sm">
                  <span className="text-[11px] font-mono-tech font-bold text-black/60 uppercase tracking-wider block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-black" /> Study Time
                  </span>
                  <span className="text-xs sm:text-sm font-display font-black text-black mt-1 block">
                    {niche.timeCommitment}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white text-black border-2 border-black shadow-neo-sm">
                  <span className="text-[11px] font-mono-tech font-bold text-[#5D45FD] uppercase tracking-wider block flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#5D45FD]" /> Earning Horizon
                  </span>
                  <span className="text-xs sm:text-sm font-display font-black text-[#5D45FD] mt-1 block">
                    {niche.earningHorizon}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white text-black border-2 border-black shadow-neo-sm col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-mono-tech font-bold text-black/60 uppercase tracking-wider block flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-black" /> Starting Rig
                  </span>
                  <span className="text-xs sm:text-sm font-display font-black text-black mt-1 block">
                    {niche.supportedOnPhone ? 'Phone OK to start' : 'Laptop essential'}
                  </span>
                </div>
              </div>

            </div>
          </section>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Main Column (Overview, Day-One Task, Roadmap, Curated Resources) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Detailed Breakdown Card */}
              <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black shadow-neo space-y-5">
                <div className="space-y-1">
                  <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#5D45FD]">
                    Pathway Deep Dive
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl text-black font-black uppercase tracking-tight">
                    What This Role Truly Entails
                  </h2>
                </div>

                <p className="text-base text-black/85 leading-relaxed font-sans">
                  {niche.description}
                </p>

                {/* Practical Nigerian Context Callout */}
                <div className="p-5 rounded-2xl bg-[#FED74C] border-2 border-black shadow-neo-sm space-y-2">
                  <div className="flex items-center gap-2 text-black font-display font-black text-sm uppercase">
                    <Zap className="w-4 h-4 text-black" />
                    <span>Realistic Nigerian Industry Context</span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/85 leading-relaxed font-sans">
                    In Nigeria, employers and international clients look for tangible proof over certificates. Whether you're working from Lagos, Ibadan, Enugu, or Kano, building a documented repository or portfolio of 2–3 completed projects opens doors far faster than reading theory.
                  </p>
                </div>
              </section>

              {/* Day-One Proof Project (Prominent Feature) */}
              <section id="day-one-project" className="bg-[#FED74C] text-black rounded-3xl p-6 sm:p-8 border-2 border-black shadow-neo-lg space-y-5 relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-black text-[#FED74C] border-2 border-black flex items-center justify-center shadow-neo-sm font-display font-black text-lg">
                      <Target className="w-5 h-5 text-[#FED74C]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono-tech uppercase tracking-wider text-black font-bold block">
                        Action Before Investment
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl text-black font-black uppercase tracking-tight">
                        Your Day-One Proof Project
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono-tech font-bold text-white bg-black px-3 py-1 rounded-full border-2 border-black shadow-neo-sm">
                    Takes ~{niche.dayOneEstimatedMins || 20} minutes
                  </span>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-black shadow-neo-sm space-y-3">
                  <p className="text-sm sm:text-base text-black leading-relaxed font-sans font-medium italic">
                    "{niche.dayOneAction}"
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-xs text-black/80 font-mono-tech font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    <span>Cost: ₦0. You do not need paid software or expensive courses to test your genuine curiosity.</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className="text-xs text-black/70 max-w-md font-sans">
                    If this 20-minute task feels energizing, you have found a natural affinity. If it feels like pure torture, test a different pathway before buying expensive data bundles!
                  </p>

                  <button
                    type="button"
                    onClick={handleAskAIMentor}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-[#D4F938] hover:bg-[#13141F] text-xs font-display font-black border-2 border-black shadow-neo-sm transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Bot className="w-4 h-4 text-[#D4F938]" />
                    <span>Guide Me Through This Task</span>
                  </button>
                </div>
              </section>

              {/* 3-Month Realistic Progression Roadmap */}
              {niche.milestones && niche.milestones.length > 0 && (
                <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black shadow-neo space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#5D45FD]">
                      <Calendar className="w-4 h-4 text-[#5D45FD]" />
                      <span>Realistic 3-Month Trajectory</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl text-black font-black uppercase tracking-tight">
                      Your Month-by-Month Blueprint
                    </h2>
                    <p className="text-xs sm:text-sm text-black/60 font-sans">
                      Structured specifically for candidates balancing school, NYSC, or a non-tech day job.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {niche.milestones.map((m, idx) => (
                      <div 
                        key={idx} 
                        className="p-5 sm:p-6 rounded-2xl bg-[#F8F7FF] border-2 border-black shadow-neo-sm space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/10 pb-3">
                          <span className="text-xs font-mono-tech font-bold text-white bg-[#5D45FD] px-3 py-1 rounded-xl border-2 border-black shadow-neo-sm uppercase">
                            {m.period}
                          </span>
                          <span className="text-sm font-display font-extrabold text-black">
                            Goal: {m.goal}
                          </span>
                        </div>

                        {m.tasks && m.tasks.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-mono-tech uppercase tracking-wider text-black/60 font-bold block">
                              Key Milestones:
                            </span>
                            <ul className="space-y-2">
                              {m.tasks.map((task, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-black leading-relaxed font-sans">
                                  <span className="w-2 h-2 rounded-xs bg-[#5D45FD] mt-1.5 shrink-0" />
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
                <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black shadow-neo space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-[#5D45FD]">
                      <BookOpen className="w-4 h-4 text-[#5D45FD]" />
                      <span>Zero-Fluff Curriculum</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl text-black font-black uppercase tracking-tight">
                      Recommended Learning Resources
                    </h2>
                    <p className="text-xs sm:text-sm text-black/60 font-sans">
                      Selected for high practical depth and low data consumption.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {niche.resources.map((res, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-[#F8F7FF] border-2 border-black shadow-neo-sm flex flex-col justify-between space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-mono-tech uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border border-black ${
                              res.type.includes('youtube') || res.type.includes('video')
                                ? 'bg-[#FF6A55] text-white'
                                : 'bg-[#60C6F8] text-black'
                            }`}>
                              {res.type.replace('_', ' ')}
                            </span>
                            {res.lowDataFriendly && (
                              <span className="text-[10px] font-mono-tech text-black bg-[#D4F938] px-2 py-0.5 rounded-full border border-black font-bold flex items-center gap-1">
                                <Zap className="w-3 h-3 text-black" /> Low Data
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-display font-extrabold text-black">
                            {res.name}
                          </h4>
                          <p className="text-xs text-black/75 leading-relaxed font-sans">
                            {res.description}
                          </p>
                        </div>

                        {res.url && (
                          <a
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between text-xs font-mono-tech font-bold text-black bg-white hover:bg-[#D4F938] px-3 py-1.5 rounded-xl border-2 border-black shadow-neo-sm transition-all"
                          >
                            <span>Open Resource</span>
                            <ExternalLink className="w-3.5 h-3.5" />
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
              <div className="bg-[#5D45FD] text-white rounded-3xl p-6 sm:p-7 border-2 border-black shadow-neo-lg space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#D4F938] text-black border-2 border-black flex items-center justify-center shadow-neo-sm font-display font-black text-xl">
                  <Compass className="w-6 h-6 text-black" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-display text-2xl text-white font-black uppercase tracking-tight">
                    Am I Truly Suited For This?
                  </h3>
                  <p className="text-xs text-white/90 font-sans leading-relaxed">
                    Take our 5-minute Nigerian diagnostic. We cross-reference your hardware, hours, math appetite, and personality to calculate an honest match score.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStartFitAssessment}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D4F938] hover:bg-[#cbf425] text-black text-xs font-display font-black border-2 border-black shadow-neo transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
                >
                  <span>Start 5-Minute Fit Test</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Everyday Tools Card */}
              {niche.typicalTools && niche.typicalTools.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border-2 border-black shadow-neo space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-black">
                    <Wrench className="w-4 h-4 text-black" />
                    <span>Everyday Industry Tools</span>
                  </div>

                  <p className="text-xs text-black/60 font-sans">
                    You'll use these daily. Most are free or have robust free tiers:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {niche.typicalTools.map((tool, i) => (
                      <span 
                        key={i} 
                        className="text-xs font-mono-tech px-3 py-1.5 rounded-xl bg-[#F1F0FF] text-black border-2 border-black font-bold shadow-neo-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Nigerian & Global Communities */}
              {niche.relevantCommunities && niche.relevantCommunities.length > 0 && (
                <div className="bg-white rounded-3xl p-6 border-2 border-black shadow-neo space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono-tech font-bold uppercase tracking-wider text-black">
                    <Users className="w-4 h-4 text-black" />
                    <span>Active Communities</span>
                  </div>

                  <p className="text-xs text-black/60 font-sans">
                    Connect with peers for accountability, referrals, and gig swaps:
                  </p>

                  <ul className="space-y-2">
                    {niche.relevantCommunities.map((comm, idx) => (
                      <li key={idx} className="text-xs text-black bg-[#FED74C]/30 p-2.5 rounded-xl border-2 border-black font-sans font-medium flex items-center gap-2 shadow-neo-sm">
                        <span className="w-2 h-2 rounded-full bg-black shrink-0" />
                        <span>{comm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Pathways */}
              <div className="bg-white rounded-3xl p-6 border-2 border-black shadow-neo space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-black/50">
                    Explore Alternatives
                  </span>
                  <h4 className="font-display text-lg text-black font-black uppercase tracking-tight">
                    Other Pathways to Compare
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {relatedNiches.map((rel) => (
                    <button
                      key={rel.id}
                      type="button"
                      onClick={() => onSelectNiche?.(rel.id)}
                      className="w-full text-left p-3.5 rounded-2xl bg-[#F8F7FF] hover:bg-[#D4F938] border-2 border-black transition-all cursor-pointer group shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-display font-extrabold text-black">
                          {rel.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-black/70 line-clamp-1 mt-0.5 font-sans">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
          <div className="bg-[#5D45FD] text-white rounded-3xl p-8 sm:p-12 border-2 border-black text-center space-y-6 shadow-neo-xl">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono-tech uppercase tracking-widest text-[#D4F938] font-bold">
                Personalized Career Guidance
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-white font-black uppercase leading-tight tracking-tight">
                Not 100% Sure If {niche.title} Is Right For You?
              </h3>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed font-sans font-normal">
                Answer 18 honest questions about your smartphone vs laptop setup, weekly electricity reliability, and logic appetite. We will calculate your primary and secondary pathway matches instantly.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={onBack}
                className="px-5 py-3 rounded-xl bg-white text-black hover:bg-[#FED74C] text-xs font-display font-extrabold transition-all border-2 border-black shadow-neo-sm cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                Browse All Pathways
              </button>

              <button
                type="button"
                onClick={handleStartFitAssessment}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4F938] hover:bg-[#cbf425] text-black text-xs font-display font-black transition-all border-2 border-black shadow-neo cursor-pointer active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>Take 5-Minute Assessment</span>
                <ArrowRight className="w-4 h-4 text-black" />
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
