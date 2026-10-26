import React, { useState } from 'react';
import { 
  ArrowLeft,
  ArrowRight, 
  ExternalLink, 
  Share2, 
  RotateCcw, 
  Clock, 
  Check, 
  Copy, 
  Bot, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Sparkles,
  CheckCircle2,
  BookOpen,
  Award
} from 'lucide-react';
import { RecommendationResult } from '../types';
import { ALL_NICHES } from '../data';
import { trackClick } from '../utils/analytics';
import { TechNavLogo } from './TechNavLogo';

interface DiagnosisResultProps {
  result: RecommendationResult;
  onRetake: () => void;
  onExploreOther: (nicheId: string) => void;
  onReturnHome?: () => void;
  onOpenChatbot?: (prompt?: string, context?: any) => void;
}

// Curated paid / level up certifications for pathways
const LEVEL_UP_DATA: Record<string, Array<{ type: string; title: string; desc: string; url: string }>> = {
  'niche-data': [
    { type: 'COURSE', title: 'Google Data Analytics Certificate', desc: 'Guided path on Coursera. Ask about financial aid.', url: 'https://www.coursera.org/professional-certificates/google-data-analytics' },
    { type: 'PLATFORM', title: 'DataCamp', desc: 'Hands-on lessons in your browser.', url: 'https://www.datacamp.com' },
    { type: 'MARKETPLACE', title: 'Udemy', desc: 'One-off courses. Wait for a sale.', url: 'https://www.udemy.com' }
  ],
  'niche-smm': [
    { type: 'COURSE', title: 'Meta Social Media Marketing Professional Certificate', desc: 'Guided curriculum on Coursera with hands-on campaign simulations.', url: 'https://www.coursera.org/professional-certificates/meta-social-media-marketing' },
    { type: 'PLATFORM', title: 'HubSpot Academy Inbound Marketing', desc: 'Free certification on content, social, and lead generation.', url: 'https://academy.hubspot.com' },
    { type: 'MARKETPLACE', title: 'Udemy: Social Media Management Masterclass', desc: 'Practical video courses covering Canva, TikTok, and Meta ads.', url: 'https://www.udemy.com' }
  ],
  'niche-uiux': [
    { type: 'COURSE', title: 'Google UX Design Professional Certificate', desc: 'Complete portfolio-building program on Coursera with financial aid.', url: 'https://www.coursera.org/professional-certificates/google-ux-design' },
    { type: 'PLATFORM', title: 'Interaction Design Foundation (IxDF)', desc: 'Industry-recognized UX courses with student discounts.', url: 'https://www.interaction-design.org' },
    { type: 'MARKETPLACE', title: 'Udemy: Figma UI/UX Essentials', desc: 'Hands-on prototyping tutorials from beginner to pro.', url: 'https://www.udemy.com' }
  ],
  'niche-frontend': [
    { type: 'COURSE', title: 'Meta Front-End Developer Certificate', desc: 'Learn React, JavaScript, and HTML/CSS on Coursera.', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer' },
    { type: 'PLATFORM', title: 'Scrimba Frontend Career Path', desc: 'Interactive coding directly inside the video player.', url: 'https://scrimba.com' },
    { type: 'MARKETPLACE', title: 'Udemy: Complete Web Development Bootcamp', desc: 'Full projects and portfolio apps. Wait for regular 80% discount sales.', url: 'https://www.udemy.com' }
  ],
  'niche-va': [
    { type: 'COURSE', title: 'ALX Virtual Assistant Program', desc: 'Intensive sponsored cohort for young Africans in tech ops.', url: 'https://www.alxafrica.com' },
    { type: 'PLATFORM', title: 'Notion Certified Administrator', desc: 'Official badge proving executive workspace mastery.', url: 'https://www.notion.so/help/notion-certified' },
    { type: 'MARKETPLACE', title: 'Udemy: Executive VA Mastery', desc: 'Learn travel planning, inbox management, and international client billing.', url: 'https://www.udemy.com' }
  ]
};

const DEFAULT_LEVEL_UP = [
  { type: 'COURSE', title: 'Google Professional Certificate', desc: 'Guided path on Coursera. Ask about financial aid.', url: 'https://www.coursera.org' },
  { type: 'PLATFORM', title: 'DataCamp / Scrimba', desc: 'Hands-on lessons directly in your browser.', url: 'https://www.datacamp.com' },
  { type: 'MARKETPLACE', title: 'Udemy', desc: 'One-off courses. Always wait for a flash sale.', url: 'https://www.udemy.com' }
];

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  result,
  onRetake,
  onExploreOther,
  onReturnHome,
  onOpenChatbot
}) => {
  const { primaryNiche, secondaryNiche, matchScore, secondaryMatchScore, rationale, submission, constraintFeasibilityNotes } = result;

  const [activeTrack, setActiveTrack] = useState<'primary' | 'secondary'>('primary');
  const [dayOneCompleted, setDayOneCompleted] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [showLearnFree, setShowLearnFree] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [resourceFilter, setResourceFilter] = useState<'all' | 'video' | 'website'>('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const activeNiche = activeTrack === 'primary' ? primaryNiche : secondaryNiche;
  const activeScore = activeTrack === 'primary' ? matchScore : secondaryMatchScore;

  // Handle WhatsApp Share
  const handleWhatsAppShare = () => {
    trackClick('result_share_whatsapp', 'Share on WhatsApp', 'Share');
    const text = `Hey! I just took the Naija Path diagnostic and my top tech match is ${activeNiche.title} (${activeScore}% match) based on my phone and schedule. Find your lane for free here: ${window.location.origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    trackClick('result_copy_link', 'Copy Link', 'Share');
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Free resources for active niche
  const rawResources = activeNiche.resources || [];
  const freeResources = rawResources.length > 0 ? rawResources : [
    { name: `${activeNiche.title} Starter Guide`, url: 'https://www.youtube.com', type: 'youtube' as const, description: 'Step-by-step breakdown for Nigerian beginners.' },
    { name: 'Roadmap.sh Interactive Path', url: 'https://roadmap.sh', type: 'roadmap' as const, description: 'Visual skill tree showing exactly what to study in order.' },
    { name: 'FreeCodeCamp / W3Schools', url: 'https://www.freecodecamp.org', type: 'interactive' as const, description: 'Interactive browser lessons that run on slow connections.' }
  ];

  const filteredResources = freeResources.filter(r => {
    if (resourceFilter === 'video') return r.type === 'youtube';
    if (resourceFilter === 'website') return r.type !== 'youtube';
    return true;
  });

  const levelUpList = LEVEL_UP_DATA[activeNiche.id] || DEFAULT_LEVEL_UP;

  // --- SUBVIEW 1: LEARN IT FREE (Matching Figma Results_learn_it_free_1x_7be961ea.png) ---
  if (showLearnFree) {
    return (
      <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLearnFree(false)}
            className="w-11 h-11 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
            title="Back to result"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-black">
            Learn it free
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setResourceFilter('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border-2 border-black transition-all cursor-pointer ${
              resourceFilter === 'all' ? 'bg-black text-white shadow-neo-sm' : 'bg-white text-black hover:bg-stone-50'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setResourceFilter('video')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border-2 border-black transition-all cursor-pointer ${
              resourceFilter === 'video' ? 'bg-black text-white shadow-neo-sm' : 'bg-white text-black hover:bg-stone-50'
            }`}
          >
            Videos
          </button>
          <button
            type="button"
            onClick={() => setResourceFilter('website')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold border-2 border-black transition-all cursor-pointer ${
              resourceFilter === 'website' ? 'bg-black text-white shadow-neo-sm' : 'bg-white text-black hover:bg-stone-50'
            }`}
          >
            Websites
          </button>
        </div>

        {/* Subtitle / Tip */}
        <p className="text-stone-600 font-sans text-xs sm:text-sm font-medium">
          For {activeNiche.title}. <span className="font-bold text-black">Tip:</span> watch at 360p to save data.
        </p>

        {/* Resource Cards List */}
        <div className="space-y-3.5">
          {filteredResources.map((res, idx) => {
            const isVideo = res.type === 'youtube';
            return (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl border-2 border-black p-4.5 shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border border-black ${
                    isVideo ? 'bg-[#FF6A55] text-white' : 'bg-[#60C6F8] text-black'
                  }`}>
                    {isVideo ? 'YOUTUBE' : 'WEBSITE'}
                  </span>
                  <span className="text-xs font-mono text-stone-500 font-semibold">
                    {isVideo ? 'Video' : 'Free'}
                  </span>
                </div>

                <h4 className="font-display text-lg font-bold text-black group-hover:underline flex items-center justify-between">
                  <span>{res.name}</span>
                  <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
                </h4>

                <p className="text-stone-600 text-xs sm:text-sm font-sans mt-1 leading-relaxed font-medium">
                  {res.description}
                </p>
              </a>
            );
          })}
        </div>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => setShowLearnFree(false)}
          className="w-full py-4 rounded-2xl bg-[#13141F] text-white font-display font-bold text-base sm:text-lg border-2 border-black shadow-neo-purple hover:translate-x-0.5 active:translate-x-1 transition-all cursor-pointer"
        >
          Back to my result
        </button>

      </div>
    );
  }

  // --- SUBVIEW 2: LEVEL UP (Matching Figma Results_level_up_1x_8546fe49.png) ---
  if (showLevelUp) {
    return (
      <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in duration-200">
        
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLevelUp(false)}
            className="w-11 h-11 rounded-xl border-2 border-black bg-white flex items-center justify-center shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
            title="Back to result"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-black">
            Level up
          </h2>
        </div>

        {/* Yellow Notice Banner */}
        <div className="bg-[#FED74C] rounded-2xl border-2 border-black p-4.5 shadow-neo">
          <p className="font-display font-bold text-black text-sm sm:text-base leading-snug">
            Free first. Pay only after your Day-One mission.
          </p>
        </div>

        {/* Paid Courses List */}
        <div className="space-y-3.5">
          {levelUpList.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl border-2 border-black p-4.5 shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="bg-[#FED74C] text-black px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border border-black">
                  {item.type}
                </span>
                <span className="text-xs font-mono text-stone-500 font-semibold">
                  Paid
                </span>
              </div>

              <h4 className="font-display text-lg font-bold text-black group-hover:underline flex items-center justify-between">
                <span>{item.title}</span>
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
              </h4>

              <p className="text-stone-600 text-xs sm:text-sm font-sans mt-1 leading-relaxed font-medium">
                {item.desc}
              </p>
            </a>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-xs font-mono text-stone-500 text-center">
          Links and prices change, so check before you pay.
        </p>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => setShowLevelUp(false)}
          className="w-full py-4 rounded-2xl bg-[#13141F] text-white font-display font-bold text-base sm:text-lg border-2 border-black shadow-neo-purple hover:translate-x-0.5 active:translate-x-1 transition-all cursor-pointer"
        >
          Back to my result
        </button>

      </div>
    );
  }

  // --- MAIN RESULT VIEW (Matching Figma Results_your_path_1x_3a45c1ec.png) ---
  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      
      {/* Top Brand Marker from Mockup */}
      <div className="flex items-center justify-between px-1">
        <TechNavLogo size="sm" variant="default" />
        <span className="text-xs font-mono font-bold tracking-widest uppercase text-stone-500">
          YOUR RESULT
        </span>
      </div>

      {/* Main Purple Result Card */}
      <div className="bg-[#5D45FD] text-white rounded-3xl border-2 border-black shadow-neo-xl p-6 sm:p-7 relative overflow-hidden">
        
        {/* Eyebrow Pill */}
        <div className="inline-block bg-[#D4F938] text-black px-3.5 py-1 rounded-full text-xs font-mono font-bold border-2 border-black shadow-neo-sm mb-4">
          YOUR CLEAR PATH IS
        </div>

        {/* Main Pathway Title */}
        <h2 className="font-display text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-6">
          {activeNiche.title}
        </h2>

        {/* Match Score Gauge + 3 Horizontal Bars */}
        <div className="flex items-center gap-5 sm:gap-6 mb-7">
          
          {/* Circular Gauge */}
          <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full bg-[#D4F938] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-neo-sm">
            <span className="font-display text-3xl sm:text-4xl font-black leading-none">
              {activeScore}%
            </span>
          </div>

          {/* 3 Metric Bars */}
          <div className="flex-1 space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-mono font-bold text-white/95 mb-0.5">
                <span>Aptitude</span>
                <span>{Math.min(98, activeScore + 2)}%</span>
              </div>
              <div className="w-full bg-black/25 h-2 rounded-full overflow-hidden border border-black/30">
                <div className="bg-[#FED74C] h-full rounded-full" style={{ width: `${Math.min(98, activeScore + 2)}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono font-bold text-white/95 mb-0.5">
                <span>Your resources</span>
                <span>{Math.min(95, activeScore - 3)}%</span>
              </div>
              <div className="w-full bg-black/25 h-2 rounded-full overflow-hidden border border-black/30">
                <div className="bg-[#60C6F8] h-full rounded-full" style={{ width: `${Math.min(95, activeScore - 3)}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono font-bold text-white/95 mb-0.5">
                <span>Market demand</span>
                <span>{Math.min(96, activeScore)}%</span>
              </div>
              <div className="w-full bg-black/25 h-2 rounded-full overflow-hidden border border-black/30">
                <div className="bg-[#FF6A55] h-full rounded-full" style={{ width: `${Math.min(96, activeScore)}%` }}></div>
              </div>
            </div>
          </div>

        </div>

        {/* 2 Primary CTAs inside card */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('day-one-mission-card');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full py-3.5 rounded-xl bg-[#D4F938] text-black font-display font-bold text-base sm:text-lg border-2 border-black shadow-neo hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start my Day-One mission</span>
            <ArrowRight className="w-5 h-5 text-black" />
          </button>

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full py-3.5 rounded-xl bg-white text-black font-display font-bold text-base border-2 border-black shadow-neo hover:bg-stone-50 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Share on WhatsApp status</span>
          </button>
        </div>

      </div>


      {/* SECTION: "Your top 2 tracks" (Matching Figma Results_your_path_1x_3a45c1ec.png) */}
      <div className="space-y-3">
        <h3 className="font-display text-xl sm:text-2xl font-black text-black">
          Your top 2 tracks
        </h3>

        <div className="grid grid-cols-2 gap-3.5">
          
          {/* Priority #1 Card (Lime #D4F938) */}
          <button
            type="button"
            onClick={() => setActiveTrack('primary')}
            className={`rounded-2xl border-2 border-black p-4 text-left transition-all cursor-pointer ${
              activeTrack === 'primary'
                ? 'bg-[#D4F938] shadow-neo-lg scale-[1.01]'
                : 'bg-white shadow-neo hover:bg-stone-50'
            }`}
          >
            <div className="text-[11px] font-mono font-bold uppercase text-stone-700 mb-1">
              PRIORITY #1
            </div>
            <div className="font-display font-black text-base sm:text-lg text-black leading-tight line-clamp-2 min-h-12">
              {primaryNiche.title}
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-black mt-3">
              {matchScore}%
            </div>
          </button>

          {/* Alternative Card (White) */}
          <button
            type="button"
            onClick={() => setActiveTrack('secondary')}
            className={`rounded-2xl border-2 border-black p-4 text-left transition-all cursor-pointer ${
              activeTrack === 'secondary'
                ? 'bg-[#D4F938] shadow-neo-lg scale-[1.01]'
                : 'bg-white shadow-neo hover:bg-stone-50'
            }`}
          >
            <div className="text-[11px] font-mono font-bold uppercase text-stone-500 mb-1">
              ALTERNATIVE
            </div>
            <div className="font-display font-black text-base sm:text-lg text-black leading-tight line-clamp-2 min-h-12">
              {secondaryNiche.title}
            </div>
            <div className="font-display font-black text-2xl sm:text-3xl text-black mt-3">
              {secondaryMatchScore}%
            </div>
          </button>

        </div>
      </div>


      {/* SECTION: Accordion "Why [Role] ranked #1" */}
      <div className="bg-white rounded-2xl border-2 border-black shadow-neo overflow-hidden">
        <button
          type="button"
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-display font-black text-base sm:text-lg text-black cursor-pointer hover:bg-stone-50 transition-colors"
        >
          <span>Why {activeNiche.title} ranked #{activeTrack === 'primary' ? '1' : '2'}</span>
          <span className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-bold text-lg shrink-0">
            {isAccordionOpen ? '−' : '+'}
          </span>
        </button>

        {isAccordionOpen && (
          <div className="px-5 pb-5 pt-1 border-t border-stone-200 text-stone-700 space-y-3 text-sm font-sans font-medium">
            <p className="leading-relaxed">
              {rationale || `${activeNiche.title} matches your problem-solving rhythm, weekly time, and current hardware setup without requiring upfront financial risk.`}
            </p>
            {constraintFeasibilityNotes && (
              <div className="bg-[#F1F0FF] rounded-xl border border-black/20 p-3 text-xs font-mono text-black">
                <strong>Hardware &amp; Setup Check:</strong> {constraintFeasibilityNotes}
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-mono font-bold">
              <span className="bg-stone-100 px-2.5 py-1 rounded-md border border-stone-300">
                {activeNiche.deviceRequirement === 'phone_only_possible' ? '📱 100% Phone Friendly' : '💻 Computer Recommended'}
              </span>
              <span className="bg-stone-100 px-2.5 py-1 rounded-md border border-stone-300">
                ⏱ {activeNiche.timeCommitment}
              </span>
            </div>
          </div>
        )}
      </div>


      {/* SECTION: "Your Day-One mission" (Yellow Card #FED74C) */}
      <div id="day-one-mission-card" className="bg-[#FED74C] text-black rounded-2xl border-2 border-black shadow-neo-lg p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl sm:text-2xl font-black">
            Your Day-One mission
          </h3>
          <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
            {activeNiche.dayOneEstimatedMins || 25} MINS
          </span>
        </div>

        <p className="text-black/90 font-sans text-sm sm:text-base font-medium leading-relaxed">
          {activeNiche.dayOneAction}
        </p>

        {/* Interactive completion toggle */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setDayOneCompleted(!dayOneCompleted)}
            className={`w-full py-2.5 px-4 rounded-xl border-2 border-black font-display font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
              dayOneCompleted
                ? 'bg-black text-[#D4F938] shadow-neo-sm'
                : 'bg-white text-black hover:bg-stone-50 shadow-neo-sm'
            }`}
          >
            {dayOneCompleted ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Mission Completed! Great Job!</span>
              </>
            ) : (
              <span>Mark mission as completed</span>
            )}
          </button>
        </div>
      </div>


      {/* SECTION: "Learn it free" (Lime Card #D4F938) */}
      <button
        type="button"
        onClick={() => setShowLearnFree(true)}
        className="w-full bg-[#D4F938] text-black rounded-2xl border-2 border-black shadow-neo-lg p-5 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center justify-between text-left group"
      >
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-black">
            Learn it free
          </h3>
          <p className="text-black/80 font-sans text-xs sm:text-sm font-medium mt-0.5">
            {freeResources.length} curated picks. Videos and websites.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-mono font-bold border-2 border-black">
            ₦0
          </span>
          <span className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight className="w-5 h-5" />
          </span>
        </div>
      </button>


      {/* SECTION: "Level up" (Yellow Card #FED74C) */}
      <button
        type="button"
        onClick={() => setShowLevelUp(true)}
        className="w-full bg-[#FED74C] text-black rounded-2xl border-2 border-black shadow-neo-lg p-5 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all cursor-pointer flex items-center justify-between text-left group"
      >
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-black">
            Level up
          </h3>
          <p className="text-black/80 font-sans text-xs sm:text-sm font-medium mt-0.5">
            Paid courses &amp; certificates, if you want more.
          </p>
        </div>

        <span className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-5 h-5" />
        </span>
      </button>


      {/* Footnote */}
      <p className="text-xs font-mono text-stone-500 text-center">
        Links and prices change, so check before you pay.
      </p>


      {/* Bottom Actions Row */}
      <div className="pt-4 border-t-2 border-black/10 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onRetake}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-black bg-white text-black font-display font-bold text-xs sm:text-sm shadow-neo-sm hover:bg-stone-50 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Quiz</span>
        </button>

        {onOpenChatbot && (
          <button
            type="button"
            onClick={() => onOpenChatbot(`I just completed the assessment and was matched with ${activeNiche.title}. Can you give me specific tips for a Nigerian beginner?`, { niche: activeNiche })}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-black bg-white text-black font-display font-bold text-xs sm:text-sm shadow-neo-sm hover:bg-stone-50 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Ask Mentor Tizzi</span>
          </button>
        )}

        {onReturnHome && (
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-display font-bold text-xs sm:text-sm shadow-neo-sm hover:bg-stone-900 cursor-pointer"
          >
            <span>Return to Home</span>
          </button>
        )}
      </div>

    </div>
  );
};
