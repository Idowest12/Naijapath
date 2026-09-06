import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Smartphone, 
  Laptop, 
  ShieldCheck, 
  RotateCcw,
  Compass,
  Zap,
  Clock,
  Briefcase,
  AlertCircle,
  Users,
  Bot
} from 'lucide-react';
import { SectionTransitionCard } from './SectionTransitionCard';
import { 
  UserBiodata, 
  UserConstraints, 
  AptitudeScores, 
  FullAssessmentSubmission, 
  RecommendationResult,
  NigerianRegion,
  QualitativeAnswers
} from '../types';
import { 
  AGE_BAND_OPTIONS, 
  GENDER_OPTIONS, 
  STATUS_OPTIONS, 
  REGION_OPTIONS, 
  DEVICE_OPTIONS, 
  TIME_OPTIONS, 
  POWER_DATA_OPTIONS, 
  CODING_APPETITE_OPTIONS, 
  EARNING_URGENCY_OPTIONS,
  SCENARIO_QUESTIONS,
  calculateNicheRecommendation
} from '../data/assessmentQuestions';
import { DiagnosisResult } from './DiagnosisResult';
import { ALL_NICHES } from '../data/nichesData';
import { SingleQuestionCard } from './SingleQuestionCard';
import { saveAssessmentRecord } from '../utils/submissionStorage';
import { trackAssessmentStart, trackAssessmentComplete, trackPageView, syncLocalRecordsToServer } from '../utils/analytics';

interface AssessmentPageProps {
  onBackToHome: () => void;
  initialNicheId?: string | null;
  onOpenChatbot?: (prompt?: string, context?: any) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  onBackToHome,
  initialNicheId,
  onOpenChatbot
}) => {
  // Step tracker: 1 = Biodata, 2 = Constraints, 3 = Scenarios/Aptitude, 4 = Nuance, 5 = Result
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [constraintSubIndex, setConstraintSubIndex] = useState<number>(0);
  const [scenarioSubIndex, setScenarioSubIndex] = useState<number>(0);

  // Interstitial transition state between sections (2, 3, 4)
  const [activeSectionIntro, setActiveSectionIntro] = useState<number | null>(null);

  // Form State: clean slate so the user makes all choices themselves
  const [biodata, setBiodata] = useState<UserBiodata>({
    fullName: '',
    ageBand: '',
    gender: '',
    status: '',
    location: ''
  });

  const [constraints, setConstraints] = useState<UserConstraints>({
    device: '',
    timeWeekly: '',
    powerData: '',
    codingAppetite: '',
    earningUrgency: ''
  });

  // Scenario selections: start completely blank, no preselected index 0
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});

  // Qualitative answers
  const [qualitative, setQualitative] = useState<QualitativeAnswers>({
    proudAchievement: '',
    targetIndustry: '',
    preferredDailyActivity: ''
  });

  // Result state
  const [diagnosisResult, setDiagnosisResult] = useState<RecommendationResult | null>(null);

  // Validation alert state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setValidationError(null);
    if (currentStep === 1 && !activeSectionIntro) {
      trackPageView('/assessment');
      trackAssessmentStart();
    } else if (currentStep === 5) {
      trackPageView('/result');
    }
  }, [currentStep, activeSectionIntro]);

  const handleNextStep = () => {
    setValidationError(null);

    // Step 1 Validation
    if (currentStep === 1) {
      if (!biodata.ageBand || !biodata.gender || !biodata.status || !biodata.location) {
        setValidationError('Please answer all 4 questions above to continue.');
        return;
      }
      setActiveSectionIntro(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Step 2 Validation
    if (currentStep === 2) {
      if (!constraints.device || !constraints.timeWeekly || !constraints.powerData || !constraints.codingAppetite || !constraints.earningUrgency) {
        setValidationError('Please answer all 5 questions about your device, time, and power setup.');
        return;
      }
      setActiveSectionIntro(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Step 3 Validation
    if (currentStep === 3) {
      const answeredAll = SCENARIO_QUESTIONS.every(q => scenarioAnswers[q.id] !== undefined);
      if (!answeredAll) {
        setValidationError(`Please pick an answer for all ${SCENARIO_QUESTIONS.length} questions above.`);
        return;
      }
      setActiveSectionIntro(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Step 4: Submission & Calculation
    if (currentStep === 4) {
      if (!qualitative.proudAchievement.trim()) {
        setValidationError('This question is compulsory: please tell us one thing you fixed, arranged, or helped with recently.');
        return;
      }

      // Tally raw weighted points across the 6 cognitive domains
      const points: Record<keyof AptitudeScores, number> = {
        visualCreative: 0,
        logicalStructural: 0,
        peopleCommunication: 0,
        analyticalDetail: 0,
        organizationOps: 0,
        securityCuriosity: 0,
      };

      SCENARIO_QUESTIONS.forEach((q) => {
        const chosenIndex = scenarioAnswers[q.id];
        if (chosenIndex !== undefined) {
          const option = q.options[chosenIndex];
          if (option && option.weights) {
            Object.entries(option.weights).forEach(([key, val]) => {
              const k = key as keyof AptitudeScores;
              points[k] += (val ?? 0);
            });
          }
        }
      });

      // Dynamic contrast normalization: scale relative to user's highest point domain
      // to preserve authentic spikes in strength rather than flattening everyone to average
      const maxPointVal = Math.max(...Object.values(points), 1);

      const aptitudeTotals: AptitudeScores = {
        visualCreative: Math.max(1, Math.min(5, Math.round((points.visualCreative / maxPointVal) * 5))),
        logicalStructural: Math.max(1, Math.min(5, Math.round((points.logicalStructural / maxPointVal) * 5))),
        peopleCommunication: Math.max(1, Math.min(5, Math.round((points.peopleCommunication / maxPointVal) * 5))),
        analyticalDetail: Math.max(1, Math.min(5, Math.round((points.analyticalDetail / maxPointVal) * 5))),
        organizationOps: Math.max(1, Math.min(5, Math.round((points.organizationOps / maxPointVal) * 5))),
        securityCuriosity: Math.max(1, Math.min(5, Math.round((points.securityCuriosity / maxPointVal) * 5))),
      };

      const submission: FullAssessmentSubmission = {
        biodata,
        constraints,
        aptitude: aptitudeTotals,
        qualitative
      };

      const computed = calculateNicheRecommendation(submission);
      const savedRecord = saveAssessmentRecord(submission, computed);
      trackAssessmentComplete({
        recordId: savedRecord.id,
        nicheId: computed.primaryNiche.id,
        nicheTitle: computed.primaryNiche.title,
        matchScore: computed.matchScore,
        device: submission.constraints.device,
        weeklyHours: submission.constraints.timeWeekly,
        location: submission.biodata.location || 'Nigeria',
      });
      syncLocalRecordsToServer();
      setDiagnosisResult(computed);
      setCurrentStep(5);
    }
  };

  const constraintQuestions = [
    {
      title: 'What device will you use for daily learning?',
      subtitle: 'Be real with us. We only recommend tech paths that work with the hardware you have right now.',
      field: 'device' as keyof UserConstraints,
      categoryBadge: 'Hardware Setup',
      options: DEVICE_OPTIONS.map(opt => ({
        value: opt.value,
        label: opt.label,
        sublabel: opt.sublabel,
        icon: opt.value === 'phone_only' ? <Smartphone className="w-5 h-5" /> : <Laptop className="w-5 h-5" />
      }))
    },
    {
      title: 'How much free time do you realistically have each week?',
      subtitle: 'Be honest with your schedule so you never burn out or abandon your tech journey.',
      field: 'timeWeekly' as keyof UserConstraints,
      categoryBadge: 'Time Availability',
      options: TIME_OPTIONS.map(opt => ({
        value: opt.value,
        label: opt.label,
        sublabel: opt.sublabel,
        icon: <Clock className="w-5 h-5" />
      }))
    },
    {
      title: 'What is your power and data situation?',
      subtitle: 'We match you to learning stacks with lightweight data needs or offline study capabilities if required.',
      field: 'powerData' as keyof UserConstraints,
      categoryBadge: 'Light & Internet',
      options: POWER_DATA_OPTIONS.map(opt => ({
        value: opt.value,
        label: opt.label,
        sublabel: opt.sublabel,
        icon: <Zap className="w-5 h-5" />
      }))
    },
    {
      title: 'How do you feel about writing code?',
      subtitle: 'Tech has massive high-paying roles for both coders and non-coders alike.',
      field: 'codingAppetite' as keyof UserConstraints,
      categoryBadge: 'Coding Appetite',
      options: CODING_APPETITE_OPTIONS.map(opt => ({
        value: opt.value,
        label: opt.label,
        sublabel: opt.sublabel,
        icon: <Compass className="w-5 h-5" />
      }))
    },
    {
      title: 'How soon do you want to start earning income?',
      subtitle: 'Helps us balance quick-win freelance skills against long-term career mastery.',
      field: 'earningUrgency' as keyof UserConstraints,
      categoryBadge: 'Income Urgency',
      options: EARNING_URGENCY_OPTIONS.map(opt => ({
        value: opt.value,
        label: opt.label,
        sublabel: opt.sublabel,
        icon: <Briefcase className="w-5 h-5" />
      }))
    }
  ];

  const handlePrevStep = () => {
    setValidationError(null);
    if (currentStep === 4) {
      setActiveSectionIntro(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      if (scenarioSubIndex > 0) {
        setScenarioSubIndex(prev => prev - 1);
      } else {
        setActiveSectionIntro(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 2) {
      if (constraintSubIndex > 0) {
        setConstraintSubIndex(prev => prev - 1);
      } else {
        setActiveSectionIntro(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRetake = () => {
    setDiagnosisResult(null);
    setScenarioAnswers({});
    setConstraintSubIndex(0);
    setScenarioSubIndex(0);
    setActiveSectionIntro(null);
    setCurrentStep(1);
  };

  const handleExploreOther = (nicheId: string) => {
    const found = ALL_NICHES.find(n => n.id === nicheId);
    if (found && diagnosisResult) {
      setDiagnosisResult({
        ...diagnosisResult,
        primaryNiche: found,
        matchScore: diagnosisResult.secondaryMatchScore,
        rationale: `You are exploring ${found.title}. This is your secondary strong match, offering a complementary set of career and earnings opportunities.`
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const stepLabels = [
    'Background',
    'Setup & Reality',
    'Cognitive Scenarios',
    'Final Calibration',
    'Your Result'
  ];

  return (
    <div id="assessment-page-root" className="min-h-screen bg-stone-50 flex flex-col text-stone-900">
      
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              id="assessment-back-to-home-btn"
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors text-xs sm:text-sm font-medium cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Guide</span>
            </button>
            <div className="h-5 w-px bg-stone-200 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-2 text-stone-900 font-bold text-sm">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Naija Tech Guide</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenChatbot && (
              <button
                type="button"
                onClick={() => onOpenChatbot("I'm currently taking the assessment and have a question about tech career paths in Nigeria:")}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 bg-white text-stone-700 hover:text-emerald-800 hover:border-emerald-300 text-xs font-semibold transition-all cursor-pointer"
                title="Ask AI Mentor if you have questions"
              >
                <Bot className="w-3.5 h-3.5 text-emerald-700" />
                <span>Ask AI Mentor</span>
              </button>
            )}

            {currentStep < 5 ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                  {activeSectionIntro ? `Section 0${activeSectionIntro} of 4:` : `Section 0${currentStep} of 4:`}
                </span>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  {activeSectionIntro ? stepLabels[activeSectionIntro - 1] : stepLabels[currentStep - 1]}
                </span>
              </div>
            ) : (
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                Diagnosis Complete
              </span>
            )}
          </div>
        </div>

        {/* Step Progress Bar */}
        {currentStep < 5 && (
          <div className="h-1 w-full bg-stone-100">
            <div 
              className="h-full bg-emerald-700 transition-all duration-300 ease-out"
              style={{ width: `${((activeSectionIntro ? activeSectionIntro - 0.5 : currentStep) / 4) * 100}%` }}
            ></div>
          </div>
        )}
      </header>

      {/* Main Form Page Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 sm:pb-28">
        
        {/* Section Transition Interstitial Screen */}
        {activeSectionIntro !== null ? (
          <div className="animate-in fade-in duration-200">
            {activeSectionIntro === 2 && (
              <SectionTransitionCard
                sectionNumber={2}
                totalSections={4}
                completedSectionName="Section 01: Background & Origin"
                nextSectionTitle="Real-World Constraints"
                nextSectionSubtitle="We evaluate your daily hardware, weekly study hours, and electricity situation so we never recommend a pathway that requires tools you don't possess."
                keyPoints={[
                  "Your primary learning device (Smartphone vs. Shared PC vs. Dedicated Laptop)",
                  "Realistic weekly free hours to avoid burnout and abandonment",
                  "Power stability and internet data access in your area",
                  "Honest preference for coding vs. non-coding digital careers",
                  "Financial horizon and when you realistically need income"
                ]}
                questionCountText="5 practical questions"
                estimatedTimeText="60 to 90 seconds"
                onContinue={() => {
                  setActiveSectionIntro(null);
                  setCurrentStep(2);
                  setConstraintSubIndex(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBack={() => {
                  setActiveSectionIntro(null);
                  setCurrentStep(1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeSectionIntro === 3 && (
              <SectionTransitionCard
                sectionNumber={3}
                totalSections={4}
                completedSectionName="Section 02: Hardware & Constraints"
                nextSectionTitle="Cognitive Style & Scenarios"
                nextSectionSubtitle="Five realistic everyday situations involving broken banking apps, disorganized team files, or messy spreadsheets. Pick your natural, honest reaction, because there are no right or wrong answers."
                keyPoints={[
                  "What frustrates you most when digital tools malfunction",
                  "What kind of daily creative output gives you the most satisfaction",
                  "How your mind organizes tasks, files, and project goals",
                  "Your balance between deep logical analysis and visual or human empathy"
                ]}
                questionCountText="5 scenario questions"
                estimatedTimeText="60 seconds"
                onContinue={() => {
                  setActiveSectionIntro(null);
                  setCurrentStep(3);
                  setScenarioSubIndex(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBack={() => {
                  setActiveSectionIntro(null);
                  setCurrentStep(2);
                  setConstraintSubIndex(constraintQuestions.length - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeSectionIntro === 4 && (
              <SectionTransitionCard
                sectionNumber={4}
                totalSections={4}
                completedSectionName="Section 03: Cognitive Style & Scenarios"
                nextSectionTitle="Final Calibration & Reflection"
                nextSectionSubtitle="You are one question away from your personalized diagnosis. Tell us one thing you arranged, fixed, or helped someone with recently so your Day-One proof mission is anchored in reality."
                keyPoints={[
                  "A real task or project you solved in the past 6 months",
                  "Personal strengths calibration against Nigerian industry demand",
                  "Unlocks your tailored Day-One Proof Project"
                ]}
                questionCountText="1 compulsory reflection"
                estimatedTimeText="30 seconds"
                onContinue={() => {
                  setActiveSectionIntro(null);
                  setCurrentStep(4);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onBack={() => {
                  setActiveSectionIntro(null);
                  setCurrentStep(3);
                  setScenarioSubIndex(SCENARIO_QUESTIONS.length - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        ) : (
          <>
            {/* Live Cohort Match Counter */}
            {currentStep < 5 && (
              <div className="mb-8 flex items-center justify-between text-xs text-stone-600 bg-stone-100/70 border border-stone-200/80 px-4 py-2.5 rounded-xl">
                <div className="flex items-center gap-2 text-stone-800 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>
                    {currentStep === 1 && (biodata.location ? `Calibrating against 380+ learner profiles from ${biodata.location.replace(/_/g, ' ')}...` : 'Calibrating with 2,480+ Nigerian youth profiles in our community...')}
                    {currentStep === 2 && (constraints.device === 'phone_only' ? '📱 840+ learners in our community started on smartphone only.' : constraints.device ? '💻 610+ learners started on laptop.' : 'Calibrating against your hardware & time setup...')}
                    {currentStep === 3 && 'Comparing your problem-solving style with 12 practical tech pathways...'}
                    {currentStep === 4 && 'Almost there: generating your personalized Day-One mission...'}
                  </span>
                </div>
                <span className="text-[11px] text-stone-500 font-mono hidden sm:inline">
                  Community Calibration
                </span>
              </div>
            )}

        {/* Step 1: BIODATA */}
        {currentStep === 1 && (
          <div id="step-1-biodata" className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-800 mb-2">
                Step 01 of 04 · Background & Context
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight leading-tight">
                Tell us a bit about yourself
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl leading-relaxed font-sans">
                We use this to identify relevant local hubs, state-level developer grants, and peer circles near you.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-9 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)] space-y-7">
              {/* Optional Name */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-700 mb-2">
                  Your Name or Nickname <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="bio-name-input"
                  type="text"
                  placeholder="e.g. Tosin, Chidi, Amina"
                  value={biodata.fullName || ''}
                  onChange={(e) => setBiodata({ ...biodata, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300/90 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Age Bracket */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-700 mb-2">
                  1. What is your age group?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AGE_BAND_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setBiodata({ ...biodata, ageBand: opt.value });
                        setValidationError(null);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        biodata.ageBand === opt.value
                          ? 'border-emerald-800 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-800/40 shadow-2xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50 text-stone-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold">{opt.label}</div>
                      {opt.sublabel && (
                        <div className="text-[11px] text-stone-500 mt-1 leading-snug">{opt.sublabel}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-700 mb-2">
                  2. Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {GENDER_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setBiodata({ ...biodata, gender: opt.value });
                        setValidationError(null);
                      }}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        biodata.gender === opt.value
                          ? 'border-emerald-800 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-800/40 shadow-2xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50 text-stone-700'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-700 mb-2">
                  3. What is your current situation?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setBiodata({ ...biodata, status: opt.value });
                        setValidationError(null);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        biodata.status === opt.value
                          ? 'border-emerald-800 bg-emerald-50/80 text-emerald-950 font-semibold ring-1 ring-emerald-800/40 shadow-2xs'
                          : 'border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50/50 text-stone-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-semibold">{opt.label}</div>
                      {opt.sublabel && (
                        <div className="text-xs text-stone-500 mt-1 leading-relaxed">{opt.sublabel}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-700 mb-2">
                  4. Where in Nigeria are you based?
                </label>
                <select
                  id="bio-location-select"
                  value={biodata.location}
                  onChange={(e) => {
                    setBiodata({ ...biodata, location: e.target.value as NigerianRegion });
                    setValidationError(null);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                >
                  <option value="">-- Choose your state or region --</option>
                  {REGION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: CONSTRAINTS - One Question at a time */}
        {currentStep === 2 && (
          <div id="step-2-constraints" className="animate-in fade-in duration-200">
            <SingleQuestionCard
              questionNumber={constraintSubIndex + 1}
              totalQuestions={constraintQuestions.length}
              stepNumber={2}
              stepName="Your Setup & Time"
              categoryBadge={constraintQuestions[constraintSubIndex].categoryBadge}
              title={constraintQuestions[constraintSubIndex].title}
              subtitle={constraintQuestions[constraintSubIndex].subtitle}
              options={constraintQuestions[constraintSubIndex].options}
              selectedValue={constraints[constraintQuestions[constraintSubIndex].field]}
              onSelectOption={(val) => {
                setConstraints(prev => ({ ...prev, [constraintQuestions[constraintSubIndex].field]: val as string }));
                setValidationError(null);
              }}
              onNext={() => {
                const currentVal = constraints[constraintQuestions[constraintSubIndex].field];
                if (!currentVal) {
                  setValidationError('Please select an option to continue.');
                  return;
                }
                setValidationError(null);
                if (constraintSubIndex < constraintQuestions.length - 1) {
                  setConstraintSubIndex(prev => prev + 1);
                } else {
                  // Final question in constraints
                  if (!constraints.device || !constraints.timeWeekly || !constraints.powerData || !constraints.codingAppetite || !constraints.earningUrgency) {
                    setValidationError('Please answer all 5 questions about your device, time, and power setup.');
                    return;
                  }
                  setActiveSectionIntro(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onPrev={() => {
                setValidationError(null);
                if (constraintSubIndex > 0) {
                  setConstraintSubIndex(prev => prev - 1);
                } else {
                  setActiveSectionIntro(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              isFirst={constraintSubIndex === 0}
              isLast={constraintSubIndex === constraintQuestions.length - 1}
              nextButtonLabel={constraintSubIndex === constraintQuestions.length - 1 ? 'Complete Section 2' : 'Next Question'}
              prevButtonLabel={constraintSubIndex === 0 ? 'Section 2 Overview' : 'Previous Question'}
              answeredIndices={constraintQuestions.map(q => Boolean(constraints[q.field]))}
              onJumpToQuestion={(idx) => {
                setValidationError(null);
                setConstraintSubIndex(idx);
              }}
              autoAdvanceOnSelect={true}
            />
          </div>
        )}

        {/* Step 3: SCENARIOS - One Question at a time */}
        {currentStep === 3 && (
          <div id="step-3-scenarios" className="animate-in fade-in duration-200">
            <SingleQuestionCard
              questionNumber={scenarioSubIndex + 1}
              totalQuestions={SCENARIO_QUESTIONS.length}
              stepNumber={3}
              stepName="Cognitive Style"
              categoryBadge={SCENARIO_QUESTIONS[scenarioSubIndex].category}
              title={SCENARIO_QUESTIONS[scenarioSubIndex].title}
              subtitle={SCENARIO_QUESTIONS[scenarioSubIndex].scenario}
              options={SCENARIO_QUESTIONS[scenarioSubIndex].options.map((opt, optIdx) => ({
                value: optIdx,
                label: opt.text,
                sublabel: opt.description
              }))}
              selectedValue={scenarioAnswers[SCENARIO_QUESTIONS[scenarioSubIndex].id]}
              onSelectOption={(val) => {
                setScenarioAnswers(prev => ({ ...prev, [SCENARIO_QUESTIONS[scenarioSubIndex].id]: Number(val) }));
                setValidationError(null);
              }}
              onNext={() => {
                const currentAnswer = scenarioAnswers[SCENARIO_QUESTIONS[scenarioSubIndex].id];
                if (currentAnswer === undefined) {
                  setValidationError('Please select an option to continue.');
                  return;
                }
                setValidationError(null);
                if (scenarioSubIndex < SCENARIO_QUESTIONS.length - 1) {
                  setScenarioSubIndex(prev => prev + 1);
                } else {
                  // Check if all scenario questions are answered
                  const answeredAll = SCENARIO_QUESTIONS.every(q => scenarioAnswers[q.id] !== undefined);
                  if (!answeredAll) {
                    setValidationError(`Please answer all ${SCENARIO_QUESTIONS.length} questions.`);
                    return;
                  }
                  setActiveSectionIntro(4);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onPrev={() => {
                setValidationError(null);
                if (scenarioSubIndex > 0) {
                  setScenarioSubIndex(prev => prev - 1);
                } else {
                  setActiveSectionIntro(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              isFirst={scenarioSubIndex === 0}
              isLast={scenarioSubIndex === SCENARIO_QUESTIONS.length - 1}
              nextButtonLabel={scenarioSubIndex === SCENARIO_QUESTIONS.length - 1 ? 'Complete Section 3' : 'Next Question'}
              prevButtonLabel={scenarioSubIndex === 0 ? 'Section 3 Overview' : 'Previous Question'}
              answeredIndices={SCENARIO_QUESTIONS.map(q => scenarioAnswers[q.id] !== undefined)}
              onJumpToQuestion={(idx) => {
                setValidationError(null);
                setScenarioSubIndex(idx);
              }}
              autoAdvanceOnSelect={true}
            />
          </div>
        )}

        {/* Step 4: QUALITATIVE NUANCE */}
        {currentStep === 4 && (
          <div id="step-4-nuance" className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-800 mb-2">
                Step 04 of 04 · Personal Voice & Proof
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-stone-900 font-normal tracking-tight leading-tight">
                Almost done: one personal reflection
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-xl leading-relaxed font-sans">
                Tell us a problem you solved or personal strength so we can tailor your Day-One proof project.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-9 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)] space-y-7">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold tracking-wider uppercase text-stone-800">
                    1. Tell us one thing you fixed, arranged, or helped someone with recently{' '}
                    <span className="text-rose-600 font-medium ml-1">* (required)</span>
                  </label>
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Doesn't have to be tech! Could be planning an event, troubleshooting a phone issue, editing a short video, organizing orders on WhatsApp, or keeping accounts.
                </p>
                <textarea
                  id="qualitative-achievement-input"
                  rows={4}
                  required
                  value={qualitative.proudAchievement}
                  onChange={(e) => {
                    setQualitative({ ...qualitative, proudAchievement: e.target.value });
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="e.g., I helped organize customer orders for a friend's bake shop using Google Sheets and WhatsApp..."
                  className={`w-full p-4 rounded-xl border bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all placeholder:text-stone-400 ${
                    validationError && !qualitative.proudAchievement.trim()
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-stone-300 focus:ring-emerald-800'
                  }`}
                ></textarea>
                <p className="text-[11px] text-stone-400">
                  {qualitative.proudAchievement.trim().length > 0 ? (
                    <span className="text-emerald-800 font-medium">✓ Saved. This will shape your Day-One mission.</span>
                  ) : (
                    <span>Please enter a brief sentence to continue.</span>
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-700">
                  2. What kind of industry or topic sounds exciting to you? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <select
                  id="qualitative-industry-select"
                  value={qualitative.targetIndustry}
                  onChange={(e) => setQualitative({ ...qualitative, targetIndustry: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800"
                >
                  <option value="">-- Pick an area that interests you (Optional) --</option>
                  <option value="Software & SaaS Platforms">Software & Cloud Tech (Web apps, SaaS platforms, developer tools)</option>
                  <option value="Fintech & Mobile Money">Banking & Money Apps (Fintech, savings, payments)</option>
                  <option value="E-commerce & Logistics">Shopping & Delivery Apps (Jumia, Chowdeck, logistics)</option>
                  <option value="Digital Marketing & Growth">Digital Marketing & Performance Growth (Ads, SEO, Funnels, Email Campaigns)</option>
                  <option value="Branding & Creative Design">Branding & Creative Design (Logos, Visual Identity, Brand Kits, Art Direction)</option>
                  <option value="Education & EdTech">Education & EdTech (Online Learning, Teaching, Training, Course Creation)</option>
                  <option value="Creator Economy & Media">Social Media & Creators (TikTok, YouTube, Instagram, X)</option>
                  <option value="Health & EdTech">Healthcare & Biotechnology</option>
                  <option value="Global Remote Freelancing">Working for Foreign Clients & Companies (Remote Freelancing)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold tracking-wider uppercase text-stone-700">
                  3. Which day-to-day task sounds most appealing to you? <span className="text-stone-400 font-normal lowercase">(optional)</span>
                </label>
                <select
                  id="qualitative-activity-select"
                  value={qualitative.preferredDailyActivity || ''}
                  onChange={(e) => setQualitative({ ...qualitative, preferredDailyActivity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 font-medium"
                >
                  <option value="">-- Choose what kind of day-to-day work you enjoy most --</option>
                  <optgroup label="💻 Software Building & Coding (High Variety)">
                    <option value="fullstack_building">Full-Stack Web App Building: Coding complete web apps from scratch (connecting UI to live databases & user logins)</option>
                    <option value="frontend_coding">Frontend Web Development: Coding interactive, sleek web apps with modern React, JavaScript & responsive animations</option>
                    <option value="backend_systems">Backend & API Engineering: Writing server code, designing databases, and handling secure payment gateways (Paystack/Flutterwave)</option>
                    <option value="coding">Software Engineering & Problem-Solving: Writing clean code, building automated scripts, and cracking technical puzzles</option>
                    <option value="mobile_building">Mobile & App Creation: Coding user-friendly mobile and web experiences that run smoothly on smartphones</option>
                  </optgroup>
                  <optgroup label="🎨 Design & Creative Arts">
                    <option value="design">UI/UX Product Design: Designing user screens, mobile app wireframes, and interactive prototypes in Figma</option>
                    <option value="branding">Branding & Visual Identity: Crafting brand identities, custom logos, visual guideline decks, and aesthetics</option>
                  </optgroup>
                  <optgroup label="📊 Data, Quality & Security">
                    <option value="data">Data Analytics & Insights: Querying databases, finding sales trends, and building visual dashboards in Excel/SQL</option>
                    <option value="testing_security">QA Testing & Cyber Defense: Hunting software bugs, automated testing, securing systems, and protecting accounts</option>
                  </optgroup>
                  <optgroup label="🚀 Growth, Content & Operations">
                    <option value="digital_marketing">Digital Marketing & Growth: Running paid ad campaigns, driving customer traffic, and optimizing funnels</option>
                    <option value="writing">Technical Writing: Writing step-by-step guides, documentation, tutorials, and tech explainers</option>
                    <option value="education">Education & Teaching: Designing online lessons, creating tutorials, and training learners</option>
                    <option value="operations">Virtual Operations & Tech Support: Organizing calendars, managing client tasks, and coordinating projects</option>
                  </optgroup>
                </select>
                <p className="text-[11px] text-stone-400">
                  Directly weights your daily preference into the diagnostic matching matrix.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
                <span>All set! Click below to see your realistic tech career match and Day-One roadmap.</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: DIAGNOSIS RESULT */}
        {currentStep === 5 && diagnosisResult && (
          <div id="step-5-result" className="space-y-6 animate-in fade-in duration-300">
            <DiagnosisResult
              result={diagnosisResult}
              onRetake={handleRetake}
              onExploreOther={handleExploreOther}
              onReturnHome={onBackToHome}
              onOpenChatbot={onOpenChatbot}
            />
          </div>
        )}

        {/* Validation Alert */}
        {currentStep < 5 && validationError && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Page Navigation Buttons for Step 1 and Step 4 */}
        {(currentStep === 1 || currentStep === 4) && (
          <div className="mt-8 pt-6 border-t border-stone-200/80 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-stone-600 text-xs sm:text-sm font-medium hover:bg-stone-50 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackToHome}
                className="text-xs sm:text-sm text-stone-500 hover:text-stone-800 transition-colors font-medium"
              >
                Cancel & Return Home
              </button>
            )}

            <button
              id="assessment-page-next-btn"
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-900 active:scale-[0.99] transition-all shadow-sm cursor-pointer"
            >
              <span>{currentStep === 4 ? 'See My Career Match' : 'Continue to Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

          </>
        )}

      </main>

    </div>
  );
};
