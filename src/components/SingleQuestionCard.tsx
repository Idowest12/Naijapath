import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export interface CardOption {
  value: string | number;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode | string;
  badgeSymbol?: string;
  paletteColors?: string[];
}

interface SingleQuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  stepName: string;
  stepNumber: number;
  categoryBadge?: string;
  title: string;
  subtitle?: string;
  mentorTip?: string;
  options: CardOption[];
  selectedValue?: string | number;
  onSelectOption: (val: string | number) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  nextButtonLabel?: string;
  prevButtonLabel?: string;
  answeredIndices: boolean[];
  onJumpToQuestion: (index: number) => void;
  autoAdvanceOnSelect?: boolean;
  hideInternalProgressBar?: boolean;
  customTopSlot?: React.ReactNode;
  customBottomSlot?: React.ReactNode;
  columns?: 1 | 2 | 3;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];
const BADGE_BG_COLORS = ['bg-[#FED74C]', 'bg-[#D4F938]', 'bg-[#60C6F8]', 'bg-[#FF6A55]', 'bg-[#C084FC]', 'bg-[#F472B6]'];

export const SingleQuestionCard: React.FC<SingleQuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  stepName,
  stepNumber,
  categoryBadge,
  title,
  subtitle,
  mentorTip,
  options,
  selectedValue,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
  nextButtonLabel = 'Continue →',
  answeredIndices,
  onJumpToQuestion,
  autoAdvanceOnSelect = false,
  hideInternalProgressBar = false,
  customTopSlot,
  customBottomSlot,
  columns
}) => {
  const [direction, setDirection] = useState<number>(1);
  const [animatingSelection, setAnimatingSelection] = useState<string | number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleNextWithDirection = () => {
    setDirection(1);
    onNext();
  };

  const handlePrevWithDirection = () => {
    setDirection(-1);
    onPrev();
  };

  const handleSelect = (val: string | number) => {
    onSelectOption(val);
    setAnimatingSelection(val);

    if (autoAdvanceOnSelect && !isLast) {
      setTimeout(() => {
        handleNextWithDirection();
        setAnimatingSelection(null);
      }, 260);
    } else {
      setTimeout(() => {
        setAnimatingSelection(null);
      }, 150);
    }
  };

  // Keyboard navigation: 1-6 or A-F, Enter to continue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }

      if (e.key >= '1' && e.key <= String(Math.min(options.length, 6))) {
        const idx = parseInt(e.key, 10) - 1;
        if (options[idx]) {
          handleSelect(options[idx].value);
        }
      } else if (['a', 'b', 'c', 'd', 'e', 'f'].includes(e.key.toLowerCase())) {
        const idx = e.key.toLowerCase().charCodeAt(0) - 97;
        if (options[idx]) {
          handleSelect(options[idx].value);
        }
      } else if (e.key === 'Enter') {
        if (selectedValue !== undefined) {
          e.preventDefault();
          handleNextWithDirection();
        }
      } else if (e.key === 'ArrowLeft' && !isFirst) {
        e.preventDefault();
        handlePrevWithDirection();
      } else if (e.key === 'ArrowRight' && selectedValue !== undefined && !isLast) {
        e.preventDefault();
        handleNextWithDirection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, selectedValue, isFirst, isLast]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.99,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.18 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.99,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  const isGrid = columns === 2 || (options.length >= 4 && options.length <= 6 && !options.some(o => o.sublabel && o.sublabel.length > 50));

  return (
    <div className="w-full max-w-2xl mx-auto select-none">
      
      {/* Top Header: Back Arrow + Segmented Progress Bars (Matching Figma Assessment__step_1_1x_fb2979bc.png) */}
      {!hideInternalProgressBar && (
        <div className="mb-6 flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handlePrevWithDirection}
            disabled={isFirst}
            className={`w-11 h-11 rounded-xl border-2 border-black flex items-center justify-center transition-all shrink-0 cursor-pointer ${
              isFirst
                ? 'opacity-40 cursor-not-allowed bg-white/60'
                : 'bg-white shadow-neo-sm hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1'
            }`}
            title="Go to previous question"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>

          {/* Segmented Progress Capsules */}
          <div className="flex-1 flex gap-1.5 sm:gap-2">
            {answeredIndices.map((isAnswered, idx) => {
              const isCurrent = idx === questionNumber - 1;
              const isFilled = isAnswered || idx < questionNumber - 1;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDirection(idx > questionNumber - 1 ? 1 : -1);
                    onJumpToQuestion(idx);
                  }}
                  className={`flex-1 h-3 rounded-full border border-black transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#5D45FD] shadow-neo-sm scale-y-110'
                      : isFilled
                      ? 'bg-[#5D45FD]'
                      : 'bg-white/80 hover:bg-white'
                  }`}
                  title={`Question ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Card Area */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={questionNumber}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            {/* Eyebrow Pill from Mockup (e.g. PHASE 1 / YOUR BACKGROUND) */}
            <div className="flex items-center gap-2">
              <span className="inline-block bg-[#FED74C] text-black px-3.5 py-1 rounded-full text-xs font-mono font-bold border-2 border-black shadow-neo-sm uppercase">
                PHASE {stepNumber} / {stepName}
              </span>
              {categoryBadge && (
                <span className="text-xs font-mono font-bold text-stone-500">
                  {categoryBadge}
                </span>
              )}
            </div>

            {/* Avatar 'T' + Speech Bubble from Mockup */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4F938] border-2 border-black flex items-center justify-center font-display font-black text-black text-sm shadow-neo-sm shrink-0">
                T
              </div>
              <div className="border-2 border-black bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-black shadow-neo-sm">
                {mentorTip || "No stress. No wrong answers."}
              </div>
            </div>

            {/* Headline */}
            <div>
              <h2 className="font-display text-2xl sm:text-4xl font-black text-black leading-tight tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-stone-600 font-sans text-sm sm:text-base mt-2 font-medium">
                  {subtitle}
                </p>
              )}
            </div>

            {customTopSlot && <div>{customTopSlot}</div>}

            {/* Options List / Grid (Matching Figma Mockup) */}
            <div className={`grid gap-3.5 ${isGrid ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              {options.map((opt, optIdx) => {
                const isSelected = selectedValue === opt.value;
                const letterKey = OPTION_KEYS[optIdx] || String(optIdx + 1);
                const badgeBg = BADGE_BG_COLORS[optIdx % BADGE_BG_COLORS.length];
                const symbol = opt.badgeSymbol || letterKey;

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 border-black text-left transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#D4F938] text-black shadow-neo-lg scale-[1.01]'
                        : 'bg-white text-black shadow-neo hover:translate-x-0.5 hover:translate-y-0.5'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                      
                      {/* Left Badge: Rounded Square with Black Border */}
                      <div
                        className={`w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center font-display font-black text-base shrink-0 ${
                          isSelected ? 'bg-black text-white' : `${badgeBg} text-black`
                        }`}
                      >
                        {symbol}
                      </div>

                      {/* Title & Subtitle */}
                      <div className="min-w-0">
                        <div className="font-display text-base sm:text-lg font-bold leading-snug">
                          {opt.label}
                        </div>
                        {opt.sublabel && (
                          <p className="text-xs sm:text-sm text-stone-700 font-sans mt-0.5 leading-relaxed font-medium">
                            {opt.sublabel}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Checkmark when selected */}
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-black text-[#D4F938] flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Helper note: Monospace helper from Mockup cd340ef9 */}
            <div className="text-center pt-2">
              <span className="text-xs font-mono font-medium text-stone-500">
                Tap one to jump to the next question
              </span>
            </div>

            {customBottomSlot && <div>{customBottomSlot}</div>}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sticky Bottom Navigation Bar (Matching Figma Mockup) */}
      <div className="sticky bottom-4 pt-6 z-20">
        <button
          type="button"
          onClick={handleNextWithDirection}
          disabled={selectedValue === undefined}
          className={`w-full py-4 rounded-2xl font-display font-bold text-lg border-2 border-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            selectedValue !== undefined
              ? 'bg-[#13141F] text-white shadow-neo-purple hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1'
              : 'bg-stone-300 text-stone-500 border-stone-400 cursor-not-allowed opacity-70'
          }`}
        >
          <span>{nextButtonLabel}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
