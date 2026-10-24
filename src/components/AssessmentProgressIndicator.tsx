import React from 'react';

export interface PhaseConfig {
  id: number;
  number: number;
  name: string;
  shortName: string;
  totalQuestions: number;
  startIndex: number;
}

export const ASSESSMENT_PHASES: PhaseConfig[] = [
  { id: 1, number: 1, name: 'Your Background', shortName: 'Background', totalQuestions: 7, startIndex: 0 },
  { id: 2, number: 2, name: 'Setup & Time', shortName: 'Setup', totalQuestions: 5, startIndex: 7 },
  { id: 3, number: 3, name: 'Everyday Scenarios', shortName: 'Scenarios', totalQuestions: 6, startIndex: 12 },
  { id: 4, number: 4, name: 'Final Reflection', shortName: 'Reflection', totalQuestions: 1, startIndex: 18 },
];

export const QUESTION_TITLES: string[] = [
  // Phase 1 (0..6)
  'Starting Point',
  'Field of Study',
  'Natural Interest',
  'Current Routine',
  'Age Bracket',
  'Gender Matching',
  'State & Region',
  // Phase 2 (7..11)
  'Hardware Device',
  'Weekly Hours',
  'Power & Internet',
  'Coding Appetite',
  'Earning Timeline',
  // Phase 3 (12..17)
  'Visual & Aesthetics',
  'Everyday Logic',
  'Communication & Advice',
  'Data & Flaws',
  'Operations & Planning',
  'Curiosity & Security',
  // Phase 4 (18)
  'Personal Small Win'
];

interface AssessmentProgressIndicatorProps {
  currentStep: number; // 1, 2, 3, 4
  currentGlobalIndex: number; // 0 to 18
  answeredGlobalIndices: boolean[]; // length 19
  categoryBadge?: string;
  onJumpToGlobalIndex?: (index: number) => void;
  variant?: 'dots' | 'header-bar';
  className?: string;
}

export const AssessmentProgressIndicator: React.FC<AssessmentProgressIndicatorProps> = ({
  currentStep,
  currentGlobalIndex,
  answeredGlobalIndices,
  categoryBadge,
  onJumpToGlobalIndex,
  variant = 'dots',
  className = '',
}) => {
  const totalQuestions = 19;
  const answeredCount = answeredGlobalIndices.filter(Boolean).length;
  const percentComplete = Math.min(98, Math.round((answeredCount / totalQuestions) * 100));
  const currentPhase = ASSESSMENT_PHASES.find(p => p.number === currentStep) || ASSESSMENT_PHASES[0];

  // Header slim segmented bar variant
  if (variant === 'header-bar') {
    return (
      <div className={`w-full bg-stone-100/90 border-t border-stone-200/70 select-none ${className}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center gap-1.5 sm:gap-2">
          {ASSESSMENT_PHASES.map((phase) => {
            const phaseAnswers = answeredGlobalIndices
              .slice(phase.startIndex, phase.startIndex + phase.totalQuestions)
              .filter(Boolean).length;
            const phasePct = Math.round((phaseAnswers / phase.totalQuestions) * 100);
            const isCurrentPhase = phase.number === currentStep;
            const isPhaseDone = phaseAnswers === phase.totalQuestions;

            return (
              <div 
                key={phase.id} 
                className="flex-1 flex flex-col gap-1 min-w-0"
                title={`${phase.name}: ${phaseAnswers}/${phase.totalQuestions} completed`}
              >
                <div className="h-1 sm:h-1.5 w-full bg-stone-200/90 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full transition-all duration-300 ease-out ${
                      isPhaseDone
                        ? 'bg-[#10B981]'
                        : isCurrentPhase
                        ? 'bg-[#1D4ED8]'
                        : 'bg-stone-400'
                    }`}
                    style={{ width: `${phasePct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Dots / Segmented indicator variant
  return (
    <div className={`w-full max-w-2xl mx-auto mb-6 sm:mb-8 select-none ${className}`}>
      {/* Top Meta Line: Phase Badge, Category Badge & Question Progress */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone-500">
          <span className="font-bold text-stone-900 px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-[11px]">
            PHASE 0{currentStep}
          </span>
          <span aria-hidden="true" className="text-stone-300">/</span>
          <span className="text-stone-700 font-sans normal-case font-medium">{currentPhase.name}</span>
          {categoryBadge && (
            <>
              <span aria-hidden="true" className="text-stone-300 hidden sm:inline">·</span>
              <span className="text-stone-500 font-sans normal-case hidden sm:inline">{categoryBadge}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <span className="text-stone-400">Question</span>
          <span className="font-bold text-[#1D4ED8] text-sm">{currentGlobalIndex + 1}</span>
          <span className="text-stone-400">of {totalQuestions}</span>
          <span className="text-stone-300">|</span>
          <span className="font-semibold text-stone-700">{percentComplete}%</span>
        </div>
      </div>

      {/* 4-Phase Segmented Dot Rail */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center justify-between gap-2 sm:gap-3.5">
        {ASSESSMENT_PHASES.map((phase) => {
          const isCurrentPhase = phase.number === currentStep;
          const isPastPhase = phase.number < currentStep;
          const phaseAnswers = answeredGlobalIndices
            .slice(phase.startIndex, phase.startIndex + phase.totalQuestions)
            .filter(Boolean).length;
          const isPhaseDone = phaseAnswers === phase.totalQuestions;

          return (
            <div
              key={phase.id}
              className={`flex-1 flex flex-col gap-1.5 min-w-0 transition-opacity duration-200 ${
                isCurrentPhase ? 'opacity-100' : isPastPhase ? 'opacity-90' : 'opacity-65 hover:opacity-85'
              }`}
            >
              {/* Phase Label & Count */}
              <div className="flex items-center justify-between text-[10px] font-mono tracking-tight px-0.5">
                <span className={`truncate font-medium ${
                  isCurrentPhase
                    ? 'text-[#1D4ED8] font-bold'
                    : isPhaseDone
                    ? 'text-[#059669]'
                    : 'text-stone-500'
                }`}>
                  {phase.shortName}
                </span>
                <span className="text-stone-400 text-[9px] hidden sm:inline">
                  {phaseAnswers}/{phase.totalQuestions}
                </span>
              </div>

              {/* Dots / Micro-capsules */}
              <div className="flex items-center gap-1 sm:gap-1.5 h-3">
                {Array.from({ length: phase.totalQuestions }).map((_, qOffset) => {
                  const globalIdx = phase.startIndex + qOffset;
                  const isCurrent = globalIdx === currentGlobalIndex;
                  const isAnswered = answeredGlobalIndices[globalIdx];
                  // Allow clicking any answered question or any question up to current
                  const canNavigate = Boolean(onJumpToGlobalIndex && (isAnswered || globalIdx <= currentGlobalIndex));

                  return (
                    <button
                      key={qOffset}
                      type="button"
                      disabled={!canNavigate}
                      onClick={() => canNavigate && onJumpToGlobalIndex?.(globalIdx)}
                      title={`Q${globalIdx + 1}: ${QUESTION_TITLES[globalIdx]}${isAnswered ? ' (Answered)' : ''}`}
                      aria-label={`Go to Question ${globalIdx + 1}: ${QUESTION_TITLES[globalIdx]}`}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-200 ${
                        isCurrent
                          ? 'w-4 sm:w-6 bg-[#1D4ED8] ring-2 ring-blue-300/70 shadow-xs'
                          : isAnswered
                          ? 'flex-1 bg-[#10B981] hover:bg-emerald-600'
                          : 'flex-1 bg-stone-200/90'
                      } ${canNavigate ? 'cursor-pointer hover:scale-y-125' : 'cursor-default'}`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
