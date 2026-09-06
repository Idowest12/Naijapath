import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  Laptop, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  Flame, 
  Bot, 
  ChevronRight,
  Target,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Users,
  Code2,
  Share2,
  Palette
} from 'lucide-react';
import { PathwayNiche } from '../types';
import { ALL_NICHES } from '../data/nichesData';
import { trackClick } from '../utils/analytics';

interface MainContentProps {
  onStartAssessment?: () => void;
  onOpenChatbot?: (prompt?: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ onStartAssessment, onOpenChatbot }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'phone_friendly' | 'non_technical' | 'technical'>('all');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Trigger smooth entry transitions upon mount
    setIsMounted(true);
  }, []);

  const filteredNiches = ALL_NICHES.filter((niche) => {
    if (activeFilter === 'phone_friendly') return niche.deviceRequirement === 'phone_only_possible' || niche.supportedOnPhone;
    if (activeFilter === 'non_technical') return niche.category === 'non-technical' || niche.category === 'creative';
    if (activeFilter === 'technical') return niche.category === 'technical';
    return true;
  });

  return (
    <main id="main-content" className="flex-1">
      
      {/* Hero Section */}
      <section id="hero-section" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_35%_at_50%_0%,rgba(16,185,129,0.08)_0%,transparent_100%)]"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Hero Copy Container with Entry Animation */}
          <div className={`text-center max-w-4xl mx-auto transition-all duration-700 ease-out transform ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-mono tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
              <span>Beyond "Just learn to code" · A realistic African tech guide</span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl text-stone-900 font-normal tracking-tight leading-[1.12] mb-6">
              Find your rightful place in tech. <br className="hidden sm:inline" />
              <span className="italic text-emerald-800">Grounded in your actual reality.</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed mb-8 sm:mb-10 font-sans">
              Over 50% of high-paying tech roles do not require writing code. We evaluate your actual situation, including your device (phone vs. laptop), power setup, and problem-solving style, and then provide a concrete <strong>Day-One proof task</strong> you can complete today.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto mb-10">
              <button
                id="hero-assessment-primary-btn"
                type="button"
                onClick={() => {
                  trackClick('hero_assessment_primary_btn', 'Start 3-Minute Assessment', 'CTA');
                  onStartAssessment?.();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm sm:text-base shadow-sm active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>Take the 3-Minute Assessment</span>
                <ArrowRight className="w-4 h-4 text-emerald-200" />
              </button>

              {onOpenChatbot && (
                <button
                  id="hero-ask-mentor-btn"
                  type="button"
                  onClick={() => {
                    trackClick('hero_ask_mentor_btn', 'Ask Naija AI Mentor', 'AI Mentor');
                    onOpenChatbot();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-medium text-sm sm:text-base border border-stone-300/90 active:scale-[0.99] transition-all shadow-2xs cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-700" />
                  <span>Ask Naija Mentor</span>
                </button>
              )}

              <a
                id="hero-browse-pathways-btn"
                href="#pathways"
                onClick={() => {
                  trackClick('hero_browse_pathways_btn', 'Browse All Pathways', 'Navigation');
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors cursor-pointer hover:underline underline-offset-4"
              >
                <BookOpen className="w-4 h-4 text-stone-400" />
                <span>Explore all 12 pathways</span>
              </a>
            </div>

            {/* Quick Realities Badges */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-stone-500">
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Phone-friendly paths included
              </span>
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> 100% Free learning materials
              </span>
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Concrete Day-One proof task
              </span>
            </div>
          </div>

          {/* Dynamic Visual Showcase: Real African Tech Talents at Work */}
          <div className={`mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ease-out transform ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Visual 1: Software Developer / Coding */}
            <div className="group rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between">
              <div>
                <div className="h-48 rounded-xl overflow-hidden bg-stone-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                    alt="African software engineer working on code"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="pt-4 px-1">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-emerald-800">
                    <span>Engineering</span>
                    <span className="text-stone-400 font-sans font-normal lowercase">laptop needed</span>
                  </div>
                  <h3 className="font-serif-display text-xl font-normal text-stone-900 mt-1 tracking-tight">
                    Software & Web Engineering
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Building resilient backend APIs, web apps, and databases. High upside, requires steady power and a computer.
                  </p>
                </div>
              </div>
              <div className="pt-3 px-1 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Code-heavy</span>
                <span className="font-mono text-[11px] text-stone-600">8 to 15 hrs/week</span>
              </div>
            </div>

            {/* Visual 2: Social Media & Digital Operations */}
            <div className="group rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between">
              <div>
                <div className="h-48 rounded-xl overflow-hidden bg-stone-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                    alt="Nigerian digital specialist managing campaigns"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="pt-4 px-1">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-emerald-800">
                    <span>Growth & Media</span>
                    <span className="text-emerald-700 font-medium font-sans lowercase">100% phone viable</span>
                  </div>
                  <h3 className="font-serif-display text-xl font-normal text-stone-900 mt-1 tracking-tight">
                    Social Media & Community Ops
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Distributing campaigns, brand communication, and community management. Start right from your smartphone.
                  </p>
                </div>
              </div>
              <div className="pt-3 px-1 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>No coding required</span>
                <span className="font-mono text-[11px] text-stone-600">5 to 8 hrs/week</span>
              </div>
            </div>

            {/* Visual 3: UI/UX & Product Design / VAs */}
            <div className="group rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between">
              <div>
                <div className="h-48 rounded-xl overflow-hidden bg-stone-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="African professional working on product design"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>
                <div className="pt-4 px-1">
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-emerald-800">
                    <span>Design & Ops</span>
                    <span className="text-stone-400 font-sans font-normal lowercase">laptop preferred</span>
                  </div>
                  <h3 className="font-serif-display text-xl font-normal text-stone-900 mt-1 tracking-tight">
                    Product Design & Virtual Ops
                  </h3>
                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
                    Figma wireframing, client communication systems, and remote executive support. Focuses on clarity and empathy.
                  </p>
                </div>
              </div>
              <div className="pt-3 px-1 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Visual & logical</span>
                <span className="font-mono text-[11px] text-stone-600">6 to 10 hrs/week</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 4-Layer Assessment Framework */}
      <section id="framework" className="py-16 sm:py-24 bg-stone-100/60 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ease-out transform ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">Diagnostic Protocol</span>
            <h2 className="font-serif-display text-3xl sm:text-5xl text-stone-900 mt-3 tracking-tight font-normal">
              A career title is not a plan. <br className="hidden sm:inline" />
              <span className="italic text-emerald-800">You need real context first.</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
              Most tests give generic advice like "Try coding!" without checking whether you own a laptop, have stable electricity, or need to earn in 60 days. Our assessment filters through four grounded stages:
            </p>
          </div>

          {/* Editorial 4-Phase Diagnostic Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Phase 1: Biodata & Stage */}
            <div id="framework-card-biodata" className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-all duration-200">
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                  <span className="font-mono text-xs font-semibold text-emerald-800 tracking-wider">PHASE 01</span>
                  <span className="text-[11px] text-stone-400 font-mono">CONTEXT</span>
                </div>
                <h3 className="font-serif-display text-xl text-stone-900 font-normal mb-2">
                  Life Stage & Origin
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Undergraduates, NYSC corps members, and career switchers face completely different clocks. We calibrate for local developer grants and female-in-tech opportunities.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>Filters out irrelevant options early</span>
              </div>
            </div>

            {/* Phase 2: Hardware & Constraints */}
            <div id="framework-card-constraints" className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-all duration-200">
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                  <span className="font-mono text-xs font-semibold text-emerald-800 tracking-wider">PHASE 02</span>
                  <span className="text-[11px] text-stone-400 font-mono">REALITY</span>
                </div>
                <h3 className="font-serif-display text-xl text-stone-900 font-normal mb-2">
                  Hardware & Energy
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  We audit your actual device (smartphone vs. shared PC vs. laptop), weekly study hours, and access to steady electricity or night-owl powerbanks.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>Never recommends impossible prerequisites</span>
              </div>
            </div>

            {/* Phase 3: Cognitive Scenarios */}
            <div id="framework-card-aptitude" className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-all duration-200">
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                  <span className="font-mono text-xs font-semibold text-emerald-800 tracking-wider">PHASE 03</span>
                  <span className="text-[11px] text-stone-400 font-mono">INSTINCTS</span>
                </div>
                <h3 className="font-serif-display text-xl text-stone-900 font-normal mb-2">
                  Problem-Solving Style
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  Five real-life scenarios test whether you get irritated by messy visuals, broken logic, disorganized schedules, or slow communication.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>Measures natural curiosity over textbook tests</span>
              </div>
            </div>

            {/* Phase 4: Day-One Proof Project */}
            <div id="framework-card-dayone" className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-all duration-200">
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                  <span className="font-mono text-xs font-semibold text-emerald-800 tracking-wider">PHASE 04</span>
                  <span className="text-[11px] text-stone-400 font-mono">ACTION</span>
                </div>
                <h3 className="font-serif-display text-xl text-stone-900 font-normal mb-2">
                  The Day-One Proof
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  You walk away with an exact 20-minute exercise using free tools (like Canva, Notion, or browser dev tools) to test your genuine enjoyment immediately.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700"></span>
                <span>Validates interest before spending a single naira</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pathways Directory Section */}
      <section id="pathways" className="py-16 sm:py-24 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">Curated Tech Pathways</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl text-stone-900 mt-1 tracking-tight font-normal">
                Explore tech roles with complete honesty
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2 font-sans">
                Every niche has realistic device requirements and an actionable starter proof task.
              </p>
            </div>

            {/* Filter Tabs */}
            <div id="pathways-filter-controls" className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                id="filter-all-btn"
                type="button"
                onClick={() => {
                  trackClick('filter_all_btn', 'All Niches Filter', 'Filter');
                  setActiveFilter('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Niches ({ALL_NICHES.length})
              </button>
              <button
                id="filter-phone-btn"
                type="button"
                onClick={() => {
                  trackClick('filter_phone_btn', 'Phone Possible Filter', 'Filter');
                  setActiveFilter('phone_friendly');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  activeFilter === 'phone_friendly'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Phone Possible
              </button>
              <button
                id="filter-nontech-btn"
                type="button"
                onClick={() => {
                  trackClick('filter_nontech_btn', 'Non-Coding Filter', 'Filter');
                  setActiveFilter('non_technical');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'non_technical'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Non-Coding
              </button>
              <button
                id="filter-tech-btn"
                type="button"
                onClick={() => {
                  trackClick('filter_tech_btn', 'Technical Filter', 'Filter');
                  setActiveFilter('technical');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === 'technical'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Technical
              </button>
            </div>
          </div>

          {/* Cards Grid with Refined Editorial Presentation */}
          <div id="pathway-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredNiches.map((niche) => (
              <article
                key={niche.id}
                id={`niche-card-${niche.id}`}
                className="bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-700/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Clean Photography Header */}
                  {niche.imageUrl && (
                    <div className="relative h-48 w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                      <img 
                        src={niche.imageUrl} 
                        alt={niche.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Discrete subtle device pill pinned neatly in top right with soft backdrop */}
                      <div className="absolute top-3 right-3">
                        {niche.deviceRequirement === 'phone_only_possible' ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-900 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs border border-emerald-200/80">
                            <Smartphone className="w-3 h-3 text-emerald-700" /> Phone-friendly
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-stone-700 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-xs border border-stone-200/80">
                            <Laptop className="w-3 h-3 text-stone-500" /> Laptop needed
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7 space-y-4">
                    {/* Typographic Metadata Header */}
                    <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                      <span className="uppercase tracking-wider font-semibold text-emerald-800">
                        {niche.category === 'creative' ? 'Design & Creative' : niche.category === 'non-technical' ? 'Operations & Growth' : 'Engineering & Data'}
                      </span>
                      <span className="flex items-center gap-1 text-stone-500">
                        <Clock className="w-3 h-3 text-stone-400" /> {niche.timeCommitment}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif-display text-2xl font-normal text-stone-900 leading-snug group-hover:text-emerald-900 transition-colors">
                      {niche.title}
                    </h3>

                    {/* Human Description */}
                    <p className="text-sm text-stone-600 leading-relaxed font-sans">
                      {niche.description}
                    </p>

                    {/* Day-One Proof Task Memo */}
                    <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-stone-500">
                        <span className="font-semibold text-emerald-800">Day-One Proof Task</span>
                        <span>~{niche.dayOneEstimatedMins || 20} mins</span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-sans italic">
                        "{niche.dayOneAction}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Tools & CTA */}
                <div className="px-6 sm:px-7 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {niche.typicalTools.slice(0, 3).map((tool, i) => (
                      <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onStartAssessment}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <span>Assess fit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Day-One Mission Showcase Section */}
      <section id="day-one" className="py-16 sm:py-20 bg-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-300">The Core Philosophy</span>
              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight mt-2 leading-tight">
                Don't spend six months wondering if tech is for you.
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed font-sans">
                Most beginners start with huge tutorial playlists, burn their data, and get stuck in tutorial hell without ever building anything. 
              </p>
              <p className="text-emerald-200/80 text-sm sm:text-base mt-3 leading-relaxed font-sans">
                Naija Tech Guide forces a tangible output on <strong>Day 1</strong>. If you do the 30-minute task and enjoy the problem-solving feeling, you have proven your interest to yourself.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  id="dayone-start-assessment-btn"
                  type="button"
                  onClick={onStartAssessment}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-950 font-semibold text-sm hover:bg-stone-100 active:scale-[0.99] transition-all shadow-sm cursor-pointer"
                >
                  <span>Get Your Day-One Mission</span>
                  <ArrowRight className="w-4 h-4 text-emerald-950" />
                </button>
              </div>

              {/* Inspiring Team Photo Banner */}
              <div className="mt-8 relative rounded-2xl overflow-hidden border border-emerald-800 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Young African tech builders collaborating in an innovation hub"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-300" /> Community of Nigerian Builders
                  </span>
                  <span className="text-[11px] bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-100">
                    Real Proof Over Theory
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Preview Cards */}
            <div className="bg-emerald-950/80 p-6 sm:p-8 rounded-2xl border border-emerald-800 space-y-4 shadow-md">
              <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                <Target className="w-4 h-4" /> Real Examples of Day-One Tasks
              </div>

              <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800 hover:border-emerald-700 transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-200 mb-1">
                  <span>UI/UX Product Design</span>
                  <span className="text-emerald-400">⏱ 30 mins</span>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Open your bank app (OPay, Kuda, GTBank). Take a screenshot of the transfer screen. Identify 2 confusing buttons. Draw a cleaner version on plain paper with a pen.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800 hover:border-emerald-700 transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-200 mb-1">
                  <span>Virtual Assistance</span>
                  <span className="text-emerald-400">⏱ 20 mins</span>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Download Google Keep or Notion on your phone. Create a 5-item structured weekly agenda with priority color tags and mock executive meeting links.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800 hover:border-emerald-700 transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-200 mb-1">
                  <span>Data Analytics</span>
                  <span className="text-emerald-400">⏱ 25 mins</span>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Open a free Google Sheet. Enter 10 food items with prices from your last market visit. Use `=SUM()` and `=AVERAGE()` to analyze your grocery basket.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-800 hover:border-emerald-700 transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-200 mb-1">
                  <span>Frontend Web Development</span>
                  <span className="text-emerald-400">⏱ 25 mins</span>
                </div>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Create a single `index.html` file using Notepad or VS Code. Type your name, a quick bio, and 3 favorite links. Double click to watch it open live in your browser!
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Practical Nigerian Realities & Resources Section */}
      <section id="resources" className="py-16 sm:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Nigerian Ecosystem Realities</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 tracking-tight">
              Built for how learning actually happens here
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2">
              We address power cuts, data conservation, remote dollar payment hurdles, and mobile-first study habits head-on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Resource 1: Data-smart */}
            <div id="resource-data-card" className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="h-40 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80"
                  alt="Students learning on laptops in a study space"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold">Data & Power Tips</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-stone-900 mb-2">Data-Smart Learning</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Prioritize lightweight documentation (MDN, DevDocs offline), free downloadable PDFs, and setting YouTube video streams to 480p to conserve gigabytes.
                </p>
              </div>
            </div>

            {/* Resource 2: Free Local Tech Hubs */}
            <div id="resource-hub-card" className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="h-40 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                  alt="Young people collaborating in a modern tech hub"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold">Community Hubs</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-stone-900 mb-2">Free Local Tech Hubs</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Tap into community spaces (like Co-Creation Hub, ALX hubs, GDG groups, and state innovation hubs) when you need steady light and network for major downloads.
                </p>
              </div>
            </div>

            {/* Resource 3: AI Career Advisor */}
            <div id="resource-ai-card" className="rounded-2xl bg-white border border-stone-200 shadow-xs overflow-hidden hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="h-40 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80"
                  alt="Young professional with digital assistant"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold">AI Guidance</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-stone-900 mb-2">AI Career Advisor (Gemini)</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Ask anything about starting out: "How do I pitch my first VA gig?", "Can I do UI/UX on an 8GB laptop?", or "What free YouTube playlist is actually current in 2026?".
                </p>
              </div>
            </div>

          </div>

          {/* Quick interactive call to action banner */}
          <div className="mt-12 p-8 rounded-3xl bg-stone-900 text-white text-center max-w-4xl mx-auto border border-stone-800 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Ready to find out which door to walk through?</h3>
            <p className="text-stone-400 text-sm mt-2 max-w-xl mx-auto">
              Take the 3-minute assessment. No sign-up, no hype, just honest guidance with your day-one task.
            </p>
            <div className="mt-6">
              <button
                id="bottom-banner-assessment-btn"
                type="button"
                onClick={onStartAssessment}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-500 active:scale-[0.99] transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Take the Assessment Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
};
