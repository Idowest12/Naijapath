import React from 'react';
import { HelpCircle, Sparkles, Smartphone, Zap, Code, Palette, Laptop } from 'lucide-react';

interface ConfusedPersonGraphicProps {
  className?: string;
  onTakeQuiz?: () => void;
}

export const ConfusedPersonGraphic: React.FC<ConfusedPersonGraphicProps> = ({ 
  className = '',
  onTakeQuiz 
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      
      {/* Neo-brutalist Illustrated Card */}
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] bg-[#FED74C] rounded-3xl border-2 sm:border-[2.5px] border-black shadow-neo-xl p-5 sm:p-6 overflow-hidden">
        
        {/* Top Header Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-[#D4F938] text-[11px] font-mono font-bold border border-black shadow-neo-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF6A55] animate-ping" />
            <span>REALITY CHECK</span>
          </div>

          <span className="text-xs font-mono font-bold text-black uppercase tracking-wider">
            BEFORE QUIZ
          </span>
        </div>

        {/* Thought Bubbles Floating Overhead */}
        <div className="relative z-10 w-full mb-2 flex flex-col gap-2">
          {/* Bubble 1 */}
          <div className="self-start inline-flex items-center gap-1.5 bg-white text-black px-3 py-1.5 rounded-2xl rounded-bl-xs border-2 border-black shadow-neo-sm text-xs font-mono font-bold rotate-[-2deg] hover:rotate-0 transition-transform">
            <Code className="w-3.5 h-3.5 text-[#5D45FD]" />
            <span>"Must I learn Python to enter tech?!"</span>
          </div>

          {/* Bubble 2 */}
          <div className="self-end inline-flex items-center gap-1.5 bg-[#D4F938] text-black px-3 py-1.5 rounded-2xl rounded-br-xs border-2 border-black shadow-neo-sm text-xs font-mono font-bold rotate-[2deg] hover:rotate-0 transition-transform">
            <Smartphone className="w-3.5 h-3.5 text-black" />
            <span>"I only have phone & 1.5GB data..."</span>
          </div>

          {/* Bubble 3 */}
          <div className="self-center inline-flex items-center gap-1.5 bg-[#FF6A55] text-white px-3 py-1.5 rounded-2xl border-2 border-black shadow-neo-sm text-xs font-mono font-bold rotate-[-1deg] hover:rotate-0 transition-transform">
            <Zap className="w-3.5 h-3.5 text-[#FED74C]" />
            <span>"NEPA took light again, which lane fits me?"</span>
          </div>
        </div>

        {/* SVG Illustration of Confused Person */}
        <div className="relative my-2 flex items-center justify-center">
          <svg
            viewBox="0 0 280 230"
            className="w-56 h-48 sm:w-64 sm:h-52 drop-shadow-md select-none"
            aria-label="Illustration of a confused young Nigerian thinking about tech career lanes"
          >
            {/* Background Halo */}
            <circle cx="140" cy="120" r="95" fill="#FFFFFF" stroke="#000000" strokeWidth="2.5" />
            
            {/* Sparkles / Question Marks in background */}
            <g className="animate-bounce" style={{ animationDuration: '3s' }}>
              <rect x="35" y="45" width="22" height="22" rx="6" fill="#D4F938" stroke="#000000" strokeWidth="2" transform="rotate(-12 46 56)" />
              <text x="41" y="62" fontFamily="monospace" fontWeight="900" fontSize="14" fill="#000000">?</text>
            </g>

            <g className="animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.4s' }}>
              <rect x="220" y="55" width="26" height="26" rx="6" fill="#5D45FD" stroke="#000000" strokeWidth="2" transform="rotate(15 233 68)" />
              <text x="228" y="74" fontFamily="monospace" fontWeight="900" fontSize="16" fill="#FFFFFF">?</text>
            </g>

            {/* Neck */}
            <rect x="125" y="150" width="30" height="32" rx="4" fill="#6F4426" stroke="#000000" strokeWidth="2.5" />

            {/* Hoodie Body */}
            <path
              d="M80 230 C85 180, 110 170, 140 170 C170 170, 195 180, 200 230 Z"
              fill="#5D45FD"
              stroke="#000000"
              strokeWidth="2.5"
            />
            {/* Hoodie Collar/Drawstrings */}
            <path d="M125 174 Q140 190 155 174" fill="none" stroke="#000000" strokeWidth="2.5" />
            <path d="M132 185 L132 205" stroke="#D4F938" strokeWidth="3" strokeLinecap="round" />
            <path d="M148 185 L148 200" stroke="#D4F938" strokeWidth="3" strokeLinecap="round" />

            {/* Head & Ears */}
            {/* Left Ear */}
            <circle cx="96" cy="118" r="9" fill="#6F4426" stroke="#000000" strokeWidth="2.5" />
            <circle cx="96" cy="118" r="4" fill="#54331C" />
            {/* Right Ear */}
            <circle cx="184" cy="118" r="9" fill="#6F4426" stroke="#000000" strokeWidth="2.5" />
            <circle cx="184" cy="118" r="4" fill="#54331C" />

            {/* Face */}
            <rect x="100" y="80" width="80" height="85" rx="35" fill="#6F4426" stroke="#000000" strokeWidth="2.5" />

            {/* Stylish Hair (Afro Curls / Fade) */}
            <path
              d="M94 85 C90 55, 120 40, 140 40 C160 40, 190 55, 186 85 C180 65, 165 60, 140 60 C115 60, 100 65, 94 85 Z"
              fill="#18181B"
              stroke="#000000"
              strokeWidth="2.5"
            />
            {/* Curly hair bumps for organic texture */}
            <circle cx="105" cy="55" r="9" fill="#18181B" />
            <circle cx="120" cy="46" r="10" fill="#18181B" />
            <circle cx="140" cy="42" r="11" fill="#18181B" />
            <circle cx="160" cy="46" r="10" fill="#18181B" />
            <circle cx="175" cy="55" r="9" fill="#18181B" />

            {/* Eyebrows: One raised high (confused/quizzical) */}
            {/* Left Eyebrow - arched up high */}
            <path d="M112 95 Q122 84 130 96" fill="none" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
            {/* Right Eyebrow - furrowed/flat */}
            <path d="M150 101 Q159 100 168 103" fill="none" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />

            {/* Eyes: Looking up and to the side in confusion */}
            {/* Left Eye */}
            <ellipse cx="122" cy="112" rx="7" ry="8" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
            <circle cx="124" cy="109" r="4" fill="#000000" />
            <circle cx="125" cy="107" r="1.5" fill="#FFFFFF" />

            {/* Right Eye */}
            <ellipse cx="158" cy="114" rx="7" ry="8" fill="#FFFFFF" stroke="#000000" strokeWidth="2" />
            <circle cx="160" cy="111" r="4" fill="#000000" />
            <circle cx="161" cy="109" r="1.5" fill="#FFFFFF" />

            {/* Nose */}
            <path d="M138 116 Q144 126 137 129" fill="none" stroke="#452712" strokeWidth="2.5" strokeLinecap="round" />

            {/* Confused / Pouting Mouth (Wavy line of dilemma) */}
            <path d="M126 142 Q134 137 142 143 Q148 147 154 141" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" />

            {/* Glasses / Stylish Eyewear (Neo-brutalist Bold Frames) */}
            <rect x="110" y="103" width="24" height="20" rx="6" fill="none" stroke="#000000" strokeWidth="2.5" />
            <rect x="146" y="105" width="24" height="20" rx="6" fill="none" stroke="#000000" strokeWidth="2.5" />
            <line x1="134" y1="112" x2="146" y2="114" stroke="#000000" strokeWidth="2.5" />
            <line x1="100" y1="111" x2="110" y2="112" stroke="#000000" strokeWidth="2" />
            <line x1="170" y1="114" x2="180" y2="113" stroke="#000000" strokeWidth="2" />

            {/* Hand scratch / chin touch gesture */}
            <g transform="translate(142, 138)">
              {/* Hand/Fingers resting on chin in thought */}
              <path
                d="M14 12 C18 6, 26 8, 28 16 C30 24, 20 30, 10 32 C4 24, 8 16, 14 12 Z"
                fill="#6F4426"
                stroke="#000000"
                strokeWidth="2"
              />
              <circle cx="21" cy="14" r="3.5" fill="#6F4426" stroke="#000000" strokeWidth="1.5" />
              <circle cx="25" cy="19" r="3.5" fill="#6F4426" stroke="#000000" strokeWidth="1.5" />
            </g>

            {/* Big floating interrogation marks */}
            <g transform="translate(195, 20)">
              <circle cx="16" cy="16" r="16" fill="#D4F938" stroke="#000000" strokeWidth="2" />
              <text x="11" y="23" fontFamily="monospace" fontWeight="900" fontSize="20" fill="#000000">?</text>
            </g>
          </svg>
        </div>

        {/* Bottom Banner */}
        <div className="mt-2 pt-3 border-t-2 border-black flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xl">😵‍💫</span>
            <div className="text-left">
              <p className="text-xs font-display font-black text-black leading-tight">
                Information Overload
              </p>
              <p className="text-[10px] font-mono text-stone-700">
                100+ buzzwords, 0 real direction
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onTakeQuiz}
            className="px-3 py-1.5 rounded-full bg-black text-[#D4F938] text-xs font-mono font-bold border border-black shadow-neo-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>Fix in 3 min</span>
            <span>→</span>
          </button>
        </div>

      </div>

      {/* Tilted Sticker Stamp */}
      <div className="absolute -bottom-3 -right-2 sm:-right-4 bg-[#D4F938] text-black border-2 border-black rounded-xl px-3 py-1 text-xs font-mono font-black shadow-neo rotate-[6deg] z-20">
        Say no more! 🚀
      </div>

    </div>
  );
};
