import React from 'react';
import { motion } from 'motion/react';
import { Code, Palette, Smartphone, MessageSquare, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { trackClick } from '../utils/analytics';

interface NigerianProfessionalHeroIllustrationProps {
  onStartQuiz?: () => void;
  onOpenChatbot?: () => void;
}

export const NigerianProfessionalHeroIllustration: React.FC<NigerianProfessionalHeroIllustrationProps> = ({
  onStartQuiz,
  onOpenChatbot,
}) => {
  return (
    <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_#111116] p-6 sm:p-7 overflow-hidden text-black">
      
      {/* Top Floating Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FED74C] border border-black text-black text-xs font-mono font-bold shadow-neo-sm whitespace-nowrap">
          <span>🇳🇬</span>
          <span>FIND YOUR LANE</span>
        </div>
        <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider whitespace-nowrap">
          PHONE-FIRST
        </span>
      </div>

      {/* Thought Bubbles Floating Area */}
      <div className="relative h-24 sm:h-28 mb-2">
        
        {/* Bubble 1: Code & Web */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 left-2 bg-[#5D45FD] text-white px-3 py-1.5 rounded-2xl border-2 border-black shadow-neo-sm flex items-center gap-1.5 text-xs font-display font-bold cursor-pointer hover:scale-105 transition-transform"
          onClick={() => {
            trackClick('hero_bubble_code', 'Code & Web Bubble', 'Illustration');
            onStartQuiz?.();
          }}
        >
          <Code className="w-3.5 h-3.5 text-[#D4F938]" />
          <span>Software</span>
        </motion.div>

        {/* Bubble 2: UI/UX Design */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute top-0 right-2 bg-[#D4F938] text-black px-3 py-1.5 rounded-2xl border-2 border-black shadow-neo-sm flex items-center gap-1.5 text-xs font-display font-bold cursor-pointer hover:scale-105 transition-transform"
          onClick={() => {
            trackClick('hero_bubble_design', 'UI/UX Design Bubble', 'Illustration');
            onStartQuiz?.();
          }}
        >
          <Palette className="w-3.5 h-3.5 text-black" />
          <span>UI/UX Design</span>
        </motion.div>

        {/* Bubble 3: Social & Community */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute top-12 left-6 sm:left-10 bg-[#FF6A55] text-white px-3 py-1 rounded-xl border-2 border-black shadow-neo-sm flex items-center gap-1.5 text-[11px] font-display font-bold cursor-pointer hover:scale-105 transition-transform"
          onClick={() => {
            trackClick('hero_bubble_community', 'Social & Community Bubble', 'Illustration');
            onStartQuiz?.();
          }}
        >
          <MessageSquare className="w-3 h-3 text-white" />
          <span>Social Media Ops</span>
        </motion.div>

        {/* Bubble 4: Virtual Assistant */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute top-12 right-4 sm:right-8 bg-[#60C6F8] text-black px-3 py-1 rounded-xl border-2 border-black shadow-neo-sm flex items-center gap-1.5 text-[11px] font-display font-bold cursor-pointer hover:scale-105 transition-transform"
          onClick={() => {
            trackClick('hero_bubble_va', 'Virtual Assistant Bubble', 'Illustration');
            onStartQuiz?.();
          }}
        >
          <Smartphone className="w-3 h-3 text-black" />
          <span>Remote VA</span>
        </motion.div>

        {/* Floating thought connector dots */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70">
          <div className="w-2.5 h-2.5 rounded-full bg-black border border-white"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
        </div>

      </div>

      {/* Friendly Stylized Nigerian Professional SVG Illustration */}
      <div className="relative flex justify-center items-center py-1">
        <svg
          viewBox="0 0 280 230"
          className="w-56 sm:w-64 h-auto select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Illustration of a friendly young Nigerian professional looking thoughtfully at their phone"
        >
          {/* Subtle Ambient Glow Behind Head */}
          <circle cx="140" cy="95" r="75" fill="#F1F0FF" stroke="#111116" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Shoulders & Torso (Stylish Contemporary Jacket in Signature Royal Purple) */}
          <path
            d="M50 230 C50 175 80 155 140 155 C200 155 230 175 230 230 Z"
            fill="#5D45FD"
            stroke="#111116"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Yellow/Lime Shirt Collar / Accents */}
          <path
            d="M115 155 L140 185 L165 155 Z"
            fill="#D4F938"
            stroke="#111116"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M140 185 L140 230"
            stroke="#111116"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Neck */}
          <rect
            x="124"
            y="125"
            width="32"
            height="35"
            rx="6"
            fill="#7B4B27"
            stroke="#111116"
            strokeWidth="3.5"
          />
          
          {/* Head & Face - Warm Nigerian Skin Tone */}
          <ellipse
            cx="140"
            cy="90"
            rx="46"
            ry="52"
            fill="#8D5524"
            stroke="#111116"
            strokeWidth="3.5"
          />

          {/* Stylish Modern Textured Haircut (Fade / Clean Top) */}
          <path
            d="M92 85 C92 42 110 32 140 32 C170 32 188 42 188 85 C188 88 184 80 178 72 C168 60 155 58 140 58 C125 58 112 60 102 72 C96 80 92 88 92 85 Z"
            fill="#111116"
            stroke="#111116"
            strokeWidth="2.5"
          />
          {/* Hair curls / texture dots */}
          <circle cx="120" cy="45" r="3" fill="#2D2D35" />
          <circle cx="135" cy="40" r="3.5" fill="#2D2D35" />
          <circle cx="150" cy="43" r="3" fill="#2D2D35" />
          <circle cx="162" cy="49" r="2.5" fill="#2D2D35" />

          {/* Ears */}
          <circle cx="94" cy="95" r="9" fill="#7B4B27" stroke="#111116" strokeWidth="3" />
          <circle cx="186" cy="95" r="9" fill="#7B4B27" stroke="#111116" strokeWidth="3" />
          {/* Clean stud earring */}
          <circle cx="94" cy="99" r="2.5" fill="#FED74C" stroke="#111116" strokeWidth="1" />

          {/* Eyebrows (Thoughtful, Inquiring Angle) */}
          <path d="M110 75 Q122 70 130 74" stroke="#111116" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M150 74 Q158 70 170 75" stroke="#111116" strokeWidth="3.5" strokeLinecap="round" />

          {/* Eyes looking down thoughtfully at the phone */}
          <ellipse cx="121" cy="85" rx="5.5" ry="4" fill="#FFFFFF" stroke="#111116" strokeWidth="2.5" />
          <circle cx="122" cy="87" r="2.8" fill="#111116" />
          <ellipse cx="159" cy="85" rx="5.5" ry="4" fill="#FFFFFF" stroke="#111116" strokeWidth="2.5" />
          <circle cx="158" cy="87" r="2.8" fill="#111116" />

          {/* Nose */}
          <path d="M140 85 Q143 98 138 104 Q142 106 144 104" stroke="#111116" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Warm, Confident Smile */}
          <path
            d="M127 114 Q140 126 153 114"
            stroke="#111116"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M132 116 Q140 122 148 116" fill="#FFFFFF" opacity="0.8" />

          {/* Hands Holding Smartphone */}
          {/* Left Hand */}
          <path
            d="M95 200 C95 185 105 180 115 190 L122 215 C115 220 100 220 95 200 Z"
            fill="#7B4B27"
            stroke="#111116"
            strokeWidth="3"
          />
          {/* Right Hand */}
          <path
            d="M185 200 C185 185 175 180 165 190 L158 215 C165 220 180 220 185 200 Z"
            fill="#7B4B27"
            stroke="#111116"
            strokeWidth="3"
          />

          {/* The Smartphone */}
          <rect
            x="118"
            y="172"
            width="44"
            height="58"
            rx="7"
            fill="#111116"
            stroke="#111116"
            strokeWidth="3"
          />
          {/* Phone Screen Glow with Naija Path Lime Graphic */}
          <rect
            x="121"
            y="176"
            width="38"
            height="50"
            rx="4"
            fill="#D4F938"
          />
          {/* Phone Screen UI - Mini Path Result Bar */}
          <rect x="125" y="181" width="22" height="4" rx="2" fill="#111116" />
          <rect x="125" y="188" width="30" height="3" rx="1.5" fill="#5D45FD" />
          <rect x="125" y="193" width="25" height="3" rx="1.5" fill="#111116" opacity="0.6" />
          <circle cx="140" cy="207" r="7" fill="#111116" />
          <path d="M138 207 L142 207" stroke="#D4F938" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Welcoming Sub-Copy & Action Footer (Full-width on mobile to avoid widget overlap) */}
      <div className="pt-3 border-t border-stone-200 mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-left">
          <p className="text-xs font-display font-black text-black">
            "Which tech lane is honestly for me?"
          </p>
          <p className="text-[11px] font-sans font-medium text-stone-600">
            Tap a bubble or take the 3-min quiz
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            trackClick('illustration_quiz_btn', 'Find Out in 3 Min', 'CTA');
            onStartQuiz?.();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-display font-black text-white bg-black hover:bg-stone-900 px-4 py-2.5 rounded-xl border-2 border-black shadow-neo-sm active:translate-x-0.5 transition-all cursor-pointer"
        >
          <span>Find out in 3 mins</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#D4F938]" />
        </button>
      </div>

    </div>
  );
};
