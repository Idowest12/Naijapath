import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Heart, Sparkles, X, Bot, ArrowRight } from 'lucide-react';
import { trackClick } from '../utils/analytics';

interface ScrollExperienceProps {
  onOpenChatbot?: (prompt?: string) => void;
  onStartAssessment?: () => void;
}

export const ScrollExperience: React.FC<ScrollExperienceProps> = ({
  onOpenChatbot,
  onStartAssessment,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercent, setScrollPercent] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const pct = Math.round(latest * 100);
      setScrollPercent(pct);
      if (pct > 5 && !hasScrolled) {
        setHasScrolled(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, hasScrolled]);

  // Affirmations tailored to Nigerian beginners based on scroll position
  const getAffirmation = () => {
    if (scrollPercent < 22) {
      return {
        tag: 'YOU BELONG HERE',
        tagColor: 'bg-[#FED74C]',
        text: 'Your perspective matters. Tech has a lane for you, exactly as you are.',
        emoji: '🇳🇬',
        actionText: 'Ask Mentor Tizzi',
        action: () => onOpenChatbot?.('Why do I belong in tech even as a complete Nigerian beginner?'),
      };
    } else if (scrollPercent < 50) {
      return {
        tag: 'ZERO GATEKEEPING',
        tagColor: 'bg-[#D4F938]',
        text: 'No laptop or coding experience? 4 of our top 14 paths are 100% phone-viable.',
        emoji: '📱',
        actionText: 'See Phone Pathways',
        action: () => {
          const el = document.getElementById('pathways');
          el?.scrollIntoView({ behavior: 'smooth' });
        },
      };
    } else if (scrollPercent < 75) {
      return {
        tag: 'REALITY-CHECKED',
        tagColor: 'bg-[#60C6F8]',
        text: 'NEPA light & expensive data? We focus on low-data tools & offline practice.',
        emoji: '⚡',
        actionText: 'Take 3-Min Quiz',
        action: () => onStartAssessment?.(),
      };
    } else {
      return {
        tag: 'YOUR TURN',
        tagColor: 'bg-[#FF6A55]',
        text: 'Don’t spend months doubting yourself. Test the waters in just 20 minutes.',
        emoji: '🚀',
        actionText: 'Start Day-One Task',
        action: () => onStartAssessment?.(),
      };
    }
  };

  const currentAffirmation = getAffirmation();

  return (
    <>
      {/* Neo-Brutalist Top Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-1.5 bg-black/10"
        aria-hidden="true"
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#D4F938] via-[#FED74C] to-[#5D45FD] origin-left border-b border-black"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Emotional Companion Pill */}
      {!dismissed && hasScrolled && (
        <motion.aside
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-5 left-4 sm:left-6 z-30 max-w-[340px] sm:max-w-sm"
          role="region"
          aria-label="Encouraging tech career guidance"
        >
          <div className="bg-white border-2 border-black rounded-2xl p-3.5 sm:p-4 shadow-neo-lg relative text-left">
            
            {/* Top row with tag and dismiss button */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base select-none">{currentAffirmation.emoji}</span>
                <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md border border-black text-black ${currentAffirmation.tagColor}`}>
                  {currentAffirmation.tag}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  trackClick('scroll_affirmation_dismiss', 'Dismiss scroll companion', 'Scroll Nudge');
                  setDismissed(true);
                }}
                className="p-1 rounded-md hover:bg-stone-100 text-stone-500 hover:text-black transition-colors cursor-pointer"
                aria-label="Dismiss encouragement notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Heartfelt Affirmation Text */}
            <p className="text-xs sm:text-[13px] font-sans font-semibold text-stone-900 leading-snug mb-3">
              {currentAffirmation.text}
            </p>

            {/* Micro Action Button */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <span className="text-[10px] font-mono font-bold text-stone-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#5D45FD]" />
                <span>Naija Path Companion</span>
              </span>

              <button
                type="button"
                onClick={() => {
                  trackClick('scroll_affirmation_action', currentAffirmation.actionText, 'Scroll Companion');
                  currentAffirmation.action();
                }}
                className="inline-flex items-center gap-1 text-[11px] font-display font-black text-black bg-[#D4F938] hover:bg-[#c2e82b] px-2.5 py-1 rounded-lg border border-black shadow-neo-sm active:translate-x-0.5 transition-all cursor-pointer"
              >
                <span>{currentAffirmation.actionText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </motion.aside>
      )}
    </>
  );
};
