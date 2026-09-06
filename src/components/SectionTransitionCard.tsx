import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Smartphone, Brain, Sparkles } from 'lucide-react';

interface SectionTransitionCardProps {
  sectionNumber: number;
  totalSections?: number;
  completedSectionName: string;
  nextSectionTitle: string;
  nextSectionSubtitle: string;
  keyPoints: string[];
  questionCountText: string;
  estimatedTimeText: string;
  onContinue: () => void;
  onBack: () => void;
}

export const SectionTransitionCard: React.FC<SectionTransitionCardProps> = ({
  sectionNumber,
  totalSections = 4,
  completedSectionName,
  nextSectionTitle,
  nextSectionSubtitle,
  keyPoints,
  questionCountText,
  estimatedTimeText,
  onContinue,
  onBack
}) => {
  const getSectionIcon = () => {
    switch (sectionNumber) {
      case 2:
        return <Smartphone className="w-6 h-6 text-emerald-800" />;
      case 3:
        return <Brain className="w-6 h-6 text-emerald-800" />;
      case 4:
        return <Sparkles className="w-6 h-6 text-emerald-800" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-emerald-800" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-9 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] relative overflow-hidden">
        {/* Top subtle milestone banner */}
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 rounded-lg px-3.5 py-2 mb-6 w-fit">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Completed: {completedSectionName}</span>
        </div>

        {/* Header with iconography */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200/80 flex items-center justify-center shrink-0">
            {getSectionIcon()}
          </div>
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-800">
              Entering Section 0{sectionNumber} of 0{totalSections}
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-normal mt-1 tracking-tight leading-tight">
              {nextSectionTitle}
            </h2>
          </div>
        </div>

        {/* Narrative description */}
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed mb-6 font-sans">
          {nextSectionSubtitle}
        </p>

        {/* Key focus area bullets */}
        <div className="bg-stone-50/75 rounded-xl p-4 sm:p-5 border border-stone-200/80 mb-8 space-y-2.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2 font-mono">
            What we examine in this section:
          </div>
          {keyPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0"></span>
              <span>{point}</span>
            </div>
          ))}
          <div className="pt-3 mt-3 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>{questionCountText}</span>
            <span>Est. {estimatedTimeText}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-600 text-xs sm:text-sm font-medium hover:bg-stone-50 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Previous Section</span>
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold shadow-sm active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>Begin Section 0{sectionNumber}</span>
            <ArrowRight className="w-4 h-4 text-emerald-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
