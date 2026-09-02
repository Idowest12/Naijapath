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

interface MainContentProps {
  onStartAssessment?: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({ onStartAssessment }) => {
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-medium mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Tired of people telling you to "Just learn to code"?</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15] mb-6">
              Find your rightful niche in tech. <br className="hidden sm:inline" />
              <span className="text-emerald-700">Matched to your actual reality.</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed mb-8 sm:mb-10">
              Over 50% of high-paying tech roles do not require writing code. Naija Tech Guide assesses your real constraints—<strong>device (phone vs. laptop)</strong>, <strong>weekly hours</strong>, and <strong>aptitude</strong>—then gives you a concrete <strong>Day-One action</strong> you can do today.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <button
                id="hero-assessment-primary-btn"
                type="button"
                onClick={onStartAssessment}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-700 text-white font-semibold text-base shadow-sm hover:bg-emerald-800 active:scale-[0.99] transition-all"
              >
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span>Start 3-Minute Assessment</span>
                <ArrowRight className="w-5 h-5 text-emerald-200" />
              </button>

              <a
                id="hero-browse-pathways-btn"
                href="#pathways"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-stone-800 font-semibold text-base border border-stone-300 hover:bg-stone-50 hover:border-stone-400 active:bg-stone-100 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-stone-600" />
                <span>Browse All Pathways</span>
              </a>
            </div>

            {/* Quick Realities Badges */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs sm:text-sm text-stone-500">
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phone-friendly paths included
              </span>
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free learning materials
              </span>
              <span className="flex items-center gap-1.5 font-medium text-stone-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Concrete Day-One proof task
              </span>
            </div>
          </div>

          {/* Dynamic Visual Showcase: Real African Tech Talents at Work */}
          <div className={`mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-1000 delay-200 ease-out transform ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Visual 1: Software Developer / Coding */}
            <div className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
                  alt="Young African software engineer working on code with multi-screen monitors"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-xs">
                    <Code2 className="w-3.5 h-3.5" /> Technical Path
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm font-bold tracking-tight">Software & Web Development</h3>
                  <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-1">Writing clean code, responsive apps & web APIs</p>
                </div>
              </div>
            </div>

            {/* Visual 2: Social Media & Digital Operations */}
            <div className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                  alt="Young Nigerian digital specialist and social media manager managing mobile campaigns and analytics"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-600 text-white text-[11px] font-bold shadow-xs">
                    <Share2 className="w-3.5 h-3.5" /> Phone Friendly
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm font-bold tracking-tight">Social Media & Community</h3>
                  <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-1">Content creation, brand growth & smartphone tools</p>
                </div>
              </div>
            </div>

            {/* Visual 3: UI/UX & Product Design / VAs */}
            <div className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Young African professional working on product design and digital workspace operations"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-600 text-white text-[11px] font-bold shadow-xs">
                    <Palette className="w-3.5 h-3.5" /> Visual & Ops
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm font-bold tracking-tight">Product Design & Tech Operations</h3>
                  <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-1">Wireframing, client calendars & remote team systems</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The 4-Layer Assessment Framework */}
      <section id="framework" className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ease-out transform ${
            isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Why Most Tech Quizzes Fail You</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-2 tracking-tight">
              A label is not a plan. You need real context first.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
              Standard career tests ask generic questions like "Do you like computers?". But if you are balancing university tests, only have a phone, or need income in 60 days, generic advice sets you up to quit. Here is our 4-layer diagnostic architecture:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Layer 0: Biodata */}
            <div id="framework-card-biodata" className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4">
                  0
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">Layer 0: Biodata & Stage</h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  Tailors advice to your actual life stage:
                </p>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Age Bracket:</strong> Undergrad, youth, or mid-career</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Targeting:</strong> Female-in-tech grants, NYSC tracks</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                Filters irrelevant options immediately
              </div>
            </div>

            {/* Layer 1: Hardware & Power Reality */}
            <div id="framework-card-constraints" className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4">
                  1
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">Layer 1: Real Constraints</h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  Honest hardware and bandwidth assessment:
                </p>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Device:</strong> Phone-only, Family PC, or Laptop</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Hours:</strong> 3-5 hrs vs. full-time immersion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Power & Data:</strong> Powerbank dependent & internet access</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                Guarantees you don't pick an impossible path
              </div>
            </div>

            {/* Layer 2: Aptitude & Scenarios */}
            <div id="framework-card-aptitude" className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4">
                  2
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">Layer 2: Real Scenarios</h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  Reveals how your brain naturally solves problems:
                </p>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <Flame className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Frustration style:</strong> Clutter vs. broken logic</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Ideal output:</strong> Design, spreadsheet, or running app</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                Measures natural instincts, not exam memory
              </div>
            </div>

            {/* Layer 3: Day-One Action */}
            <div id="framework-card-dayone" className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base mb-4">
                  3
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">Layer 3: Day-One Task</h3>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">
                  Never leave with just a career title:
                </p>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Actionable:</strong> 20-30 min proof exercise today</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>Free tools:</strong> No paid courses required</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                Test your own interest in 30 minutes
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
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Curated Tech Pathways</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1 tracking-tight">
                Explore tech roles with honesty
              </h2>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                Every niche has realistic device requirements and an actionable starter proof task.
              </p>
            </div>

            {/* Filter Tabs */}
            <div id="pathways-filter-controls" className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              <button
                id="filter-all-btn"
                type="button"
                onClick={() => setActiveFilter('all')}
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
                onClick={() => setActiveFilter('phone_friendly')}
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
                onClick={() => setActiveFilter('non_technical')}
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
                onClick={() => setActiveFilter('technical')}
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

          {/* Cards Grid with Dynamic Images & Animations */}
          <div id="pathway-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNiches.map((niche) => (
              <div
                key={niche.id}
                id={`niche-card-${niche.id}`}
                className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Image Header */}
                {niche.imageUrl && (
                  <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                    <img 
                      src={niche.imageUrl} 
                      alt={niche.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent"></div>
                    
                    {/* Device Badge Floating Top Right */}
                    <div className="absolute top-3 right-3">
                      {niche.deviceRequirement === 'phone_only_possible' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-emerald-200">
                          <Smartphone className="w-3 h-3 text-emerald-700" /> Phone Friendly
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-800 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs border border-stone-200">
                          <Laptop className="w-3 h-3 text-stone-600" /> Laptop Needed
                        </span>
                      )}
                    </div>

                    {/* Category & Time Tag Floating Bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                      <span className="font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                        {niche.category === 'creative' ? 'Visual / Design' : niche.category === 'non-technical' ? 'Operational / Growth' : 'Engineering / Code'}
                      </span>
                      <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded font-medium">
                        <Clock className="w-3 h-3 text-emerald-300" /> {niche.timeCommitment}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                      {niche.title}
                    </h3>

                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                      {niche.description}
                    </p>

                    {/* Day One Mission Highlight */}
                    <div className="mt-4 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                        <Flame className="w-3.5 h-3.5 text-emerald-600" /> Day-One Action:
                      </div>
                      <p className="text-xs text-stone-700 leading-snug">
                        "{niche.dayOneAction}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {niche.typicalTools.slice(0, 3).map((tool, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={onStartAssessment}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      Assess Fit <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Day-One Mission Showcase Section */}
      <section id="day-one" className="py-16 sm:py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">The Core Philosophy</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2 leading-tight">
                Don't wait 6 months to know if tech is for you.
              </h2>
              <p className="text-emerald-100/90 text-sm sm:text-base mt-4 leading-relaxed">
                Most people start with huge tutorial playlists, burn their data, and get stuck in tutorial hell without ever building anything. 
              </p>
              <p className="text-emerald-200/80 text-sm sm:text-base mt-3 leading-relaxed">
                Naija Tech Guide forces a tangible output on <strong>Day 1</strong>. If you do the 30-minute task and enjoy the problem-solving feeling, you have proven your interest to yourself.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  id="dayone-start-assessment-btn"
                  type="button"
                  onClick={onStartAssessment}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-950 font-bold text-sm hover:bg-emerald-50 active:scale-[0.99] transition-all shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Get Your Day-One Mission</span>
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
              Take the 3-minute assessment. No sign-up, no hype—just honest guidance with your day-one task.
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
