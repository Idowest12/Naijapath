import React, { useState } from 'react';
import { 
  ArrowRight, 
  Smartphone, 
  Laptop, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Zap, 
  Bot, 
  Code2, 
  Palette, 
  Briefcase, 
  CheckSquare, 
  Bug, 
  Search,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { ALL_NICHES } from '../data/nichesData';
import { trackClick } from '../utils/analytics';
import { ScrollExperience } from './ScrollExperience';

interface MainContentProps {
  onStartAssessment?: () => void;
  onOpenChatbot?: (prompt?: string) => void;
  targetNicheId?: string | null;
  targetStrategyKey?: string | null;
  onClearTarget?: () => void;
  onSelectPathway?: (nicheId: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({ 
  onStartAssessment, 
  onOpenChatbot,
  onSelectPathway
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'phone' | 'non-coding' | 'coding'>('all');

  const filteredNiches = ALL_NICHES.filter((niche) => {
    if (selectedFilter === 'phone') return niche.deviceRequirement === 'phone_only_possible' || niche.supportedOnPhone;
    if (selectedFilter === 'non-coding') return niche.category === 'non-technical' || niche.category === 'creative';
    if (selectedFilter === 'coding') return niche.category === 'technical';
    return true;
  });

  return (
    <main id="main-content" className="flex-1 bg-[#FFFFFF] selection:bg-[#D4F938] selection:text-black relative">
      
      {/* Scroll Progress Bar and Belonging / Affirmation Companion */}
      <ScrollExperience 
        onOpenChatbot={onOpenChatbot} 
        onStartAssessment={onStartAssessment} 
      />

      {/* HERO SECTION MATCHING image_a99f5170.png with Tactile Scroll & Motion Feedback */}
      <section id="hero-section" className="relative pt-8 sm:pt-14 pb-16 sm:pb-24 overflow-hidden border-b-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Copy Column */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              
              {/* Eyebrow tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <div className="inline-block px-4 py-1.5 rounded-full border-2 border-black bg-[#FED74C] text-xs font-mono font-bold tracking-wider uppercase text-black shadow-neo-sm">
                  MADE FOR NIGERIAN BEGINNERS
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 }}
                className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-black leading-[1.08] tracking-tight"
              >
                Want to go into Tech and a little confused?{' '}
                <span className="inline-block bg-[#D4F938] border-2 border-black px-3 sm:px-4 py-0.5 rounded-md shadow-[2px_2px_0px_#000] mt-1 sm:mt-2">
                  Say no more.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-xl text-stone-800 font-sans max-w-xl font-medium leading-relaxed"
              >
                With just 3 mins, honestly, you can find a way.
              </motion.p>

              {/* The Two Primary Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="pt-2 flex flex-col items-start gap-3.5 w-full sm:w-auto"
              >
                {/* Button 1: Take the 3-min quiz */}
                <button
                  id="hero-start-quiz-btn"
                  type="button"
                  onClick={() => {
                    trackClick('hero_start_quiz_btn', 'Take the 3-min quiz', 'CTA');
                    onStartAssessment?.();
                  }}
                  className="group inline-flex items-center justify-between gap-4 px-7 sm:px-8 py-4 rounded-2xl bg-[#0F1015] text-white font-display font-bold text-base sm:text-lg border-2 border-black shadow-[5px_5px_0px_0px_#5D45FD] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_0px_#5D45FD] active:translate-x-1.5 active:translate-y-1.5 active:shadow-none transition-all cursor-pointer w-full sm:w-auto sm:min-w-[270px]"
                >
                  <span>Take the 3-min quiz</span>
                  <span className="text-xl leading-none font-sans font-bold group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>

                {/* Button 2: Ask Mentor Tizzi (AI Mentor) */}
                {onOpenChatbot && (
                  <button
                    id="hero-ask-mentor-btn"
                    type="button"
                    onClick={() => {
                      trackClick('hero_ask_mentor_btn', 'Ask Mentor Tizzi', 'AI Mentor');
                      onOpenChatbot();
                    }}
                    className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 rounded-2xl bg-white text-black font-display font-bold text-base sm:text-lg border-2 border-black shadow-none hover:bg-stone-50 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer w-full sm:w-auto sm:min-w-[270px]"
                    title="Ask your AI Mentor - Mentor Tizzi"
                  >
                    <span>Ask Mentor Tizzi</span>
                  </button>
                )}
              </motion.div>

              {/* Bottom quick value markers */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-stone-600"
              >
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5D45FD]"></span> 14 Pathways Analyzed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FED74C]"></span> 100% Free Learning Curated
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF6A55]"></span> Concrete Day-One Tasks
                </span>
              </motion.div>
            </motion.div>

            {/* Right Hero Graphic: Matching image_a99f5170.png White Match Card with Gentle Floating Motion */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: [0, -6, 0] 
                }}
                transition={{ 
                  y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
                  default: { duration: 0.65, ease: 'easeOut', delay: 0.15 }
                }}
                className="relative w-full max-w-sm sm:max-w-md pt-4"
              >
                
                {/* Coral Day-One Ribbon on top-right */}
                <motion.div 
                  initial={{ rotate: 0, scale: 0.8 }}
                  animate={{ rotate: 4, scale: 1 }}
                  transition={{ delay: 0.35, type: 'spring', stiffness: 200 }}
                  className="absolute top-0 right-4 sm:right-6 bg-[#FF6A55] text-black border-2 border-black rounded-xl px-4 py-1.5 text-xs font-mono font-bold shadow-neo-sm z-10"
                >
                  Day-One task: 20 mins
                </motion.div>

                {/* White Result Card Mockup */}
                <div className="bg-white text-black rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_#111116] p-7 sm:p-8 relative">
                  <div className="text-xs font-mono font-bold tracking-wider text-stone-500 uppercase mb-3">
                    YOUR MATCH
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-black leading-tight tracking-tight mb-5 text-black">
                    Social Media &amp; Community Ops
                  </h3>

                  {/* Score */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-display text-5xl sm:text-6xl font-black text-[#5D45FD] leading-none">
                      92%
                    </span>
                    <span className="text-base sm:text-lg font-bold text-stone-700">fit</span>
                  </div>

                  {/* Progress Bars with Animated Fill on View */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-xs font-mono font-semibold text-stone-800 mb-1">
                        Aptitude
                      </div>
                      <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden border-2 border-black p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
                          className="bg-[#5D45FD] h-full rounded-full" 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono font-semibold text-stone-800 mb-1">
                        Your resources
                      </div>
                      <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden border-2 border-black p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '88%' }}
                          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.45 }}
                          className="bg-[#D4F938] h-full rounded-full" 
                        />
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-mono font-semibold text-stone-800 mb-1">
                        Market demand
                      </div>
                      <div className="w-full bg-stone-100 h-3.5 rounded-full overflow-hidden border-2 border-black p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '82%' }}
                          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.6 }}
                          className="bg-[#FF6A55] h-full rounded-full" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card bottom pill badge */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="inline-block bg-[#D4F938] text-black border-2 border-black rounded-full px-4 py-1 text-xs font-mono font-bold">
                      100% phone viable
                    </span>
                    <button
                      type="button"
                      onClick={() => onStartAssessment?.()}
                      className="text-xs font-display font-bold text-[#5D45FD] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Take quiz to see yours</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Decorative floating sticker */}
                <motion.div 
                  initial={{ rotate: -10, opacity: 0 }}
                  animate={{ rotate: -5, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="absolute -bottom-3 -left-3 bg-[#FED74C] text-black border-2 border-black rounded-xl px-3 py-1 text-xs font-mono font-bold shadow-neo"
                >
                  No coding needed
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION: "Pick a lane. We'll help you choose." MATCHING Figma Landing_page_1x_41e999df.png */}
      <section id="pathways" className="bg-[#13141F] text-white py-16 sm:py-24 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight">
                Pick a lane.{' '}
                <span className="text-[#D4F938]">We'll help you choose.</span>
              </h2>
              <p className="text-stone-300 font-sans text-base sm:text-lg mt-3 max-w-2xl font-medium">
                Every pathway is grounded in the Nigerian context: device feasibility, power requirements, and real local + remote earning paths.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'bg-[#D4F938] text-black border-black shadow-neo-sm'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                All (14)
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('phone')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
                  selectedFilter === 'phone'
                    ? 'bg-[#D4F938] text-black border-black shadow-neo-sm'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                Phone-Only
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('non-coding')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
                  selectedFilter === 'non-coding'
                    ? 'bg-[#D4F938] text-black border-black shadow-neo-sm'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                Non-Coding
              </button>
              <button
                type="button"
                onClick={() => setSelectedFilter('coding')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 transition-all cursor-pointer ${
                  selectedFilter === 'coding'
                    ? 'bg-[#D4F938] text-black border-black shadow-neo-sm'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                Coding
              </button>
            </div>
          </motion.div>

          {/* 2-Column Neo-Brutalist Grid matching mockup with Staggered Scroll-In */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Card 1: Software & Web Engineering (Purple #7C65F6) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectPathway?.('niche-fullstack')}
              className="bg-[#7C65F6] text-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-neo-lg transition-shadow cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-[#FED74C] text-black px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
                    CODE
                  </span>
                  <span className="text-xs font-mono text-white/80">laptop needed</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight mb-2 group-hover:underline">
                  Software &amp; Web Engineering
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  Building resilient backend APIs, web apps, and databases. High upside, requires steady power and a computer.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/20 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FED74C]">8 to 15 hrs/wk</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                  Explore pathway <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

            {/* Card 2: Social Media & Community Ops (Lime #D4F938) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectPathway?.('niche-smm')}
              className="bg-[#D4F938] text-black rounded-2xl border-2 border-black p-6 sm:p-8 shadow-neo-lg transition-shadow cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
                    PHONE-FIRST
                  </span>
                  <span className="text-xs font-mono font-bold text-black/70">100% phone viable</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight mb-2 group-hover:underline">
                  Social Media &amp; Community Ops
                </h3>
                <p className="text-black/90 text-sm sm:text-base leading-relaxed font-medium">
                  Distributing campaigns, brand communication, and community management. Start right from your smartphone.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/20 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-black">5 to 8 hrs/wk</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-black group-hover:translate-x-1 transition-transform">
                  Explore pathway <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

            {/* Card 3: Product Design & Virtual Ops (Yellow #FED74C) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectPathway?.('niche-uiux')}
              className="bg-[#FED74C] text-black rounded-2xl border-2 border-black p-6 sm:p-8 shadow-neo-lg transition-shadow cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
                    DESIGN
                  </span>
                  <span className="text-xs font-mono font-bold text-black/70">laptop preferred</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight mb-2 group-hover:underline">
                  Product Design &amp; Virtual Ops
                </h3>
                <p className="text-black/90 text-sm sm:text-base leading-relaxed font-medium">
                  Figma wireframing, client communication systems, and remote executive support. Focuses on clarity and empathy.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/20 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-black">6 to 10 hrs/wk</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-black group-hover:translate-x-1 transition-transform">
                  Explore pathway <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

            {/* Card 4: Virtual Assistance (Sky Cyan #60C6F8) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectPathway?.('niche-va')}
              className="bg-[#60C6F8] text-black rounded-2xl border-2 border-black p-6 sm:p-8 shadow-neo-lg transition-shadow cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
                    REMOTE OPS
                  </span>
                  <span className="text-xs font-mono font-bold text-black/70">phone or laptop</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight mb-2 group-hover:underline">
                  Virtual Assistance &amp; Tech VA
                </h3>
                <p className="text-black/90 text-sm sm:text-base leading-relaxed font-medium">
                  Calendar management, inbox triage, client follow-ups, and Notion workflows. Immediate remote freelancing potential.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/20 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-black">5 to 10 hrs/wk</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-black group-hover:translate-x-1 transition-transform">
                  Explore pathway <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

            {/* Card 5: QA Testing & Product Quality (Coral Red #FF6A55) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelectPathway?.('niche-qa')}
              className="bg-[#FF6A55] text-white rounded-2xl border-2 border-black p-6 sm:p-8 shadow-neo-lg transition-shadow cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
                    QUALITY
                  </span>
                  <span className="text-xs font-mono text-white/80">laptop needed</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight mb-2 group-hover:underline">
                  QA Testing &amp; Bug Hunting
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  Hunting bugs, checking user journeys, documenting error states before users complain. Clear, logical entry to engineering.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/20 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white">6 to 12 hrs/wk</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                  Explore pathway <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

            {/* Card 6: +6 more pathways waiting (White outline dashed card) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onStartAssessment?.()}
              className="bg-transparent rounded-2xl border-2 border-dashed border-white/40 p-6 sm:p-8 hover:border-[#D4F938] hover:bg-white/5 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-white/20">
                    DIAGNOSTIC
                  </span>
                  <span className="text-xs font-mono text-[#D4F938]">3-min quiz</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight mb-2 text-white group-hover:text-[#D4F938] transition-colors">
                  +6 more pathways waiting
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                  Data Analysis &amp; BI, Cybersecurity, Technical Writing, Product Management, Cloud Ops, and Growth Marketing.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-stone-400">Zero guesswork</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-[#D4F938] group-hover:translate-x-1 transition-transform">
                  Take the quiz to match <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>


      {/* SECTION: "4 quick steps. Zero stress." MATCHING Figma Landing_page_1x_41e999df.png */}
      <section id="framework" className="py-16 sm:py-24 border-b-2 border-black bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="font-display text-3xl sm:text-5xl font-black text-black tracking-tight">
              4 quick steps.{' '}
              <span className="inline-block bg-[#FED74C] px-3 py-0.5 rounded-xl border-2 border-black shadow-neo-sm">
                Zero stress.
              </span>
            </h2>
            <p className="text-stone-600 font-sans text-base sm:text-lg mt-3 font-medium">
              We don't sell courses. We diagnose what actually fits you, then hand you free resources and a Day-One mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border-2 border-black p-6 sm:p-7 shadow-neo flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#5D45FD] text-white font-display font-black text-lg flex items-center justify-center border-2 border-black shadow-neo-sm mb-4">
                  1
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-black mb-2">
                  You
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-medium">
                  Tell us where you are on your journey, what naturally energizes you, and how you think when solving problems.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-mono font-bold text-[#5D45FD]">
                Phase 1: 30 seconds
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border-2 border-black p-6 sm:p-7 shadow-neo flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#D4F938] text-black font-display font-black text-lg flex items-center justify-center border-2 border-black shadow-neo-sm mb-4">
                  2
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-black mb-2">
                  Your gear
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-medium">
                  Be 100% honest about your hardware (phone vs. laptop), your NEPA / generator power, and monthly data realities.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-mono font-bold text-black">
                Phase 2: Real constraints
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border-2 border-black p-6 sm:p-7 shadow-neo flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#FF6A55] text-white font-display font-black text-lg flex items-center justify-center border-2 border-black shadow-neo-sm mb-4">
                  3
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-black mb-2">
                  Your style
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-medium">
                  Code, visuals, writing, coordination, or numbers. Quick scenarios evaluate which workflow you naturally enjoy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-mono font-bold text-[#FF6A55]">
                Phase 3: Work preferences
              </div>
            </motion.div>

          </div>

          {/* Step 4 Full-Width Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#FED74C] rounded-2xl border-2 border-black p-6 sm:p-8 shadow-neo flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-black text-white font-display font-black text-2xl flex items-center justify-center border-2 border-black shrink-0">
                4
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-black">
                  Day-One Task
                </h3>
                <p className="text-black/80 text-sm sm:text-base font-medium mt-1">
                  Instead of paying ₦150k for an abstract course, we give you a free 20-30 minute hands-on task to test if you actually enjoy the work.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onStartAssessment?.()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white font-display font-bold text-sm sm:text-base border-2 border-black shadow-neo hover:translate-x-0.5 active:translate-x-1 transition-all shrink-0 cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>

        </div>
      </section>


      {/* SECTION: ELECTRIC LIME BANNER MATCHING Figma Landing_page_1x_41e999df.png */}
      <section className="py-12 sm:py-16 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-[#D4F938] rounded-3xl border-2 border-black p-8 sm:p-14 shadow-neo-xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
                Ready? It takes less time than a TikTok scroll.
              </h2>
              <p className="text-black/80 font-sans text-base sm:text-lg mt-3 font-semibold">
                No email required to start. No payment cards. Just honest Nigerian guidance.
              </p>
            </div>

            <button
              id="banner-start-quiz-btn"
              type="button"
              onClick={() => {
                trackClick('banner_start_quiz_btn', 'Start the quiz', 'CTA');
                onStartAssessment?.();
              }}
              className="inline-flex items-center justify-center gap-3 px-8 py-4.5 rounded-full bg-black text-white font-display font-bold text-lg sm:text-xl border-2 border-black shadow-neo-purple hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5 transition-all shrink-0 cursor-pointer"
            >
              <span>Start the quiz</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        </div>
      </section>


      {/* SECTION: DAY-ONE SECTION MATCHING Figma Day-One_section___footer_1x_71174597.png */}
      <section id="day-one" className="bg-[#13141F] text-white py-16 sm:py-24 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Headline Column */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6 space-y-6"
            >
              
              <div className="inline-block bg-[#D4F938] text-black px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border-2 border-black shadow-neo-sm">
                THE DAY-ONE IDEA
              </div>

              <h2 className="font-display text-4xl sm:text-6xl font-black leading-[1.08] tracking-tight">
                Don't spend{' '}
                <span className="inline-block bg-[#FF6A55] text-white px-3 sm:px-4 py-0.5 rounded-xl border-2 border-black shadow-neo-sm rotate-[-1deg]">
                  six months
                </span>{' '}
                wondering if tech is for you.
              </h2>

              <p className="text-stone-300 font-sans text-base sm:text-xl font-medium leading-relaxed max-w-lg">
                Test-drive the real work for 20 to 30 minutes, with free tools and zero naira spent.
              </p>

              <div>
                <button
                  id="day-one-mission-btn"
                  type="button"
                  onClick={() => {
                    trackClick('day_one_mission_btn', 'Find your Day-One mission', 'CTA');
                    onStartAssessment?.();
                  }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#D4F938] text-black font-display font-bold text-base sm:text-lg border-2 border-black shadow-neo-blue hover:translate-x-1 hover:translate-y-1 active:translate-x-1.5 active:translate-y-1.5 transition-all cursor-pointer"
                >
                  <span>Find your Day-One mission</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </button>
              </div>

            </motion.div>

            {/* Right Stack of 3 Day-One Mission Cards matching mockup */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Card 1: UI/UX Product Design (Yellow #FED74C) */}
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-[#FED74C] text-black rounded-2xl border-2 border-black p-5 sm:p-6 shadow-neo-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display text-xl sm:text-2xl font-black">
                    UI/UX Product Design
                  </h4>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
                    30 MINS
                  </span>
                </div>
                <p className="text-black/90 text-sm sm:text-base font-medium leading-relaxed">
                  Screenshot your bank app's transfer screen. Spot two confusing buttons. Sketch a cleaner one on paper.
                </p>
              </motion.div>

              {/* Card 2: Virtual Assistance (Sky Cyan #60C6F8) */}
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-[#60C6F8] text-black rounded-2xl border-2 border-black p-5 sm:p-6 shadow-neo-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display text-xl sm:text-2xl font-black">
                    Virtual Assistance
                  </h4>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
                    20 MINS
                  </span>
                </div>
                <p className="text-black/90 text-sm sm:text-base font-medium leading-relaxed">
                  Build a weekly agenda with priority tags in Google Keep or Notion on your phone.
                </p>
              </motion.div>

              {/* Card 3: Data Analytics (Lime #D4F938) */}
              <motion.div 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.25 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-[#D4F938] text-black rounded-2xl border-2 border-black p-5 sm:p-6 shadow-neo-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display text-xl sm:text-2xl font-black">
                    Data Analytics
                  </h4>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-mono font-bold border border-black">
                    25 MINS
                  </span>
                </div>
                <p className="text-black/90 text-sm sm:text-base font-medium leading-relaxed">
                  Enter 10 grocery prices in a free Google Sheet, then use SUM and AVERAGE on your basket.
                </p>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
};
