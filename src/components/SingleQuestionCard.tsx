import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export interface CardOption {
  value: string | number;
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

interface SingleQuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  stepName: string;
  stepNumber: number;
  categoryBadge?: string;
  title: string;
  subtitle?: string;
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
}

const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const SingleQuestionCard: React.FC<SingleQuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  stepName,
  stepNumber,
  categoryBadge,
  title,
  subtitle,
  options,
  selectedValue,
  onSelectOption,
  onNext,
  onPrev,
  isFirst,
  isLast,
  nextButtonLabel,
  prevButtonLabel,
  answeredIndices,
  onJumpToQuestion,
  autoAdvanceOnSelect = true
}) => {
  const [direction, setDirection] = useState<number>(1);
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
    if (autoAdvanceOnSelect && !isLast) {
      setTimeout(() => {
        setDirection(1);
        onNext();
      }, 300);
    }
  };

  // Keyboard shortcut listener (A, B, C, D, E or 1, 2, 3, 4, 5, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      
      // Check for A, B, C, D, E
      const keyIndex = OPTION_KEYS.indexOf(key);
      if (keyIndex !== -1 && keyIndex < options.length) {
        e.preventDefault();
        handleSelect(options[keyIndex].value);
        return;
      }

      // Check for 1, 2, 3, 4, 5
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= options.length) {
        e.preventDefault();
        handleSelect(options[num - 1].value);
        return;
      }

      // Enter to advance if answered
      if (e.key === 'Enter' && selectedValue !== undefined && selectedValue !== '') {
        e.preventDefault();
        handleNextWithDirection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, selectedValue, isLast]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0 && selectedValue !== undefined) {
        // Swiped left -> Next
        handleNextWithDirection();
      } else if (diffX < 0) {
        // Swiped right -> Prev
        handlePrevWithDirection();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const percentComplete = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div 
      className="w-full max-w-2xl mx-auto select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header: Understated, Editorial Metadata */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold tracking-wider uppercase bg-emerald-50 text-emerald-900 border border-emerald-200/80">
              Section 0{stepNumber}
            </span>
            <span className="text-xs font-medium text-stone-700">
              {stepName}
            </span>
            {categoryBadge && (
              <span className="hidden sm:inline-flex items-center text-xs text-stone-400">
                · {categoryBadge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
            <span className="text-stone-400">Question</span>
            <span className="font-semibold text-stone-900">{questionNumber}</span>
            <span className="text-stone-400">of</span>
            <span className="text-stone-600">{totalQuestions}</span>
          </div>
        </div>

        {/* Minimal High-Craft Progress Track */}
        <div className="w-full bg-stone-200/70 h-1.5 rounded-full overflow-hidden flex">
          {answeredIndices.map((isAnswered, idx) => {
            const isCurrent = idx === questionNumber - 1;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setDirection(idx > questionNumber - 1 ? 1 : -1);
                  onJumpToQuestion(idx);
                }}
                className={`flex-1 h-full transition-all border-r border-white/50 last:border-r-0 ${
                  isCurrent
                    ? 'bg-emerald-700'
                    : isAnswered
                    ? 'bg-emerald-500/80 hover:bg-emerald-600 cursor-pointer'
                    : 'bg-transparent hover:bg-stone-300'
                }`}
                title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}`}
                aria-label={`Jump to Question ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Card View with Slide Animation */}
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={questionNumber}
            initial={{ opacity: 0, y: direction * 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -direction * 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-9 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)]"
          >
            {/* Question Title & Subtitle */}
            <div className="mb-7">
              <h2 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-normal leading-[1.25] tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm sm:text-base text-stone-600 mt-2.5 leading-relaxed font-sans">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {options.map((opt, optIdx) => {
                const isSelected = selectedValue === opt.value;
                const hotkey = OPTION_KEYS[optIdx] || String(optIdx + 1);

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full p-4 sm:p-4.5 rounded-xl border text-left transition-all duration-150 flex items-start gap-3.5 group cursor-pointer ${
                      isSelected
                        ? 'border-emerald-800 bg-emerald-50/75 text-emerald-950 ring-1 ring-emerald-800/40 shadow-xs'
                        : 'border-stone-200/80 bg-white hover:border-stone-400/80 hover:bg-stone-50/50 text-stone-800'
                    }`}
                  >
                    {/* Hotkey Letter Keycap */}
                    <div className={`w-6 h-6 rounded-md border text-[11px] font-mono font-semibold flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected 
                        ? 'border-emerald-800 bg-emerald-800 text-white shadow-2xs' 
                        : 'border-stone-300/80 bg-stone-100/80 text-stone-600 group-hover:border-stone-400 group-hover:bg-stone-200/70'
                    }`}>
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : hotkey}
                    </div>

                    {/* Optional Icon */}
                    {opt.icon && (
                      <div className={`shrink-0 mt-0.5 ${isSelected ? 'text-emerald-800' : 'text-stone-500 group-hover:text-stone-700'}`}>
                        {opt.icon}
                      </div>
                    )}

                    {/* Option Text */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm sm:text-base leading-snug font-medium ${
                        isSelected ? 'text-emerald-950 font-semibold' : 'text-stone-900'
                      }`}>
                        {opt.label}
                      </div>
                      {opt.sublabel && (
                        <div className="text-xs sm:text-sm text-stone-500 font-normal mt-1 leading-relaxed">
                          {opt.sublabel}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* In-Card Step Controls */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevWithDirection}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-600 text-xs sm:text-sm font-medium hover:bg-stone-50 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{prevButtonLabel || (isFirst ? 'Previous' : 'Back')}</span>
              </button>

              <div className="text-[11px] text-stone-400 hidden sm:inline-flex items-center gap-1.5 font-mono">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300/70 rounded text-[10px] text-stone-600">A</kbd>
                <span>to</span>
                <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300/70 rounded text-[10px] text-stone-600">{OPTION_KEYS[options.length - 1] || 'E'}</kbd>
                <span>or</span>
                <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300/70 rounded text-[10px] text-stone-600">Enter ↵</kbd>
              </div>

              <button
                type="button"
                onClick={handleNextWithDirection}
                disabled={selectedValue === undefined || selectedValue === ''}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedValue !== undefined && selectedValue !== ''
                    ? 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm active:scale-[0.99] cursor-pointer'
                    : 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200/80'
                }`}
              >
                <span>{nextButtonLabel || (isLast ? 'Continue' : 'Next')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
