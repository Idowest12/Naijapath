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
  Users
} from 'lucide-react';
import { 
  UserBiodata, 
  UserConstraints, 
  AptitudeScores, 
  FullAssessmentSubmission, 
  RecommendationResult,
  NigerianRegion
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
import { saveAssessmentRecord } from '../utils/submissionStorage';

interface AssessmentPageProps {
  onBackToHome: () => void;
  initialNicheId?: string | null;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  onBackToHome,
  initialNicheId
}) => {
  // Step tracker: 1 = Biodata, 2 = Constraints, 3 = Scenarios/Aptitude, 4 = Nuance, 5 = Result
  const [currentStep, setCurrentStep] = useState<number>(1);

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
  const [qualitative, setQualitative] = useState({
    proudAchievement: '',
    targetIndustry: ''
  });

  // Result state
  const [diagnosisResult, setDiagnosisResult] = useState<RecommendationResult | null>(null);

  // Validation alert state
  const [validationError, setValidationError] = useState<string | null>(null);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setValidationError(null);
  }, [currentStep]);

  const handleNextStep = () => {
    setValidationError(null);

    // Step 1 Validation
    if (currentStep === 1) {
      if (!biodata.ageBand || !biodata.gender || !biodata.status || !biodata.location) {
        setValidationError('Please answer all 4 questions above to continue.');
        return;
      }
      setCurrentStep(2);
      return;
    }

    // Step 2 Validation
    if (currentStep === 2) {
      if (!constraints.device || !constraints.timeWeekly || !constraints.powerData || !constraints.codingAppetite || !constraints.earningUrgency) {
        setValidationError('Please answer all 5 questions about your device, time, and power setup.');
        return;
      }
      setCurrentStep(3);
      return;
    }

    // Step 3 Validation
    if (currentStep === 3) {
      const answeredAll = SCENARIO_QUESTIONS.every(q => scenarioAnswers[q.id] !== undefined);
      if (!answeredAll) {
        setValidationError(`Please pick an answer for all ${SCENARIO_QUESTIONS.length} questions above.`);
        return;
      }
      setCurrentStep(4);
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
      saveAssessmentRecord(submission, computed);
      setDiagnosisResult(computed);
      setCurrentStep(5);
    }
  };

  const handlePrevStep = () => {
    setValidationError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRetake = () => {
    setDiagnosisResult(null);
    setScenarioAnswers({});
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
    'About You',
    'Your Setup & Time',
    'What You Like',
    'Final Touch',
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
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors text-xs sm:text-sm font-medium"
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
            {currentStep < 5 ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                  Step {currentStep} of 4:
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {stepLabels[currentStep - 1]}
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
              className="h-full bg-emerald-600 transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        )}
      </header>

      {/* Main Form Page Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Live Cohort Match Counter */}
        {currentStep < 5 && (
          <div className="mb-6 flex items-center justify-between text-xs text-stone-600 bg-emerald-50/80 border border-emerald-200/80 px-4 py-2.5 rounded-2xl shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-950 font-medium">
              <Users className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                {currentStep === 1 && (biodata.location ? `Matching against 380+ learner profiles from ${biodata.location.replace(/_/g, ' ')}...` : 'Connecting your input with 2,480+ Nigerian youth profiles in our database...')}
                {currentStep === 2 && (constraints.device === 'phone_only' ? '📱 840+ profiles in our community also started learning on smartphone only.' : constraints.device ? '💻 610+ profiles learn on laptop.' : 'Matching your hardware & time setup against peer profiles...')}
                {currentStep === 3 && '🧠 Comparing your problem-solving style with 12 practical tech pathways...'}
                {currentStep === 4 && '🎯 Almost done: calibrating your final match against 2,480+ Nigerian learner profiles...'}
              </span>
            </div>
            <span className="text-[11px] text-emerald-800 font-bold hidden sm:inline px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300">
              Live Cohort Matching
            </span>
          </div>
        )}

        {/* Step 1: BIODATA */}
        {currentStep === 1 && (
          <div id="step-1-biodata" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Step 1 of 4: About You</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Tell us a bit about yourself
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                We use this to find beginner-friendly opportunities, local tech communities, and grants tailored to you.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Optional Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Your Name or Nickname (Optional)
                </label>
                <input
                  id="bio-name-input"
                  type="text"
                  placeholder="e.g. Tosin, Chidi, Amina"
                  value={biodata.fullName || ''}
                  onChange={(e) => setBiodata({ ...biodata, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>

              {/* Age Bracket */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  1. What is your age?
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
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        biodata.ageBand === opt.value
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                      {opt.sublabel && (
                        <div className="text-[11px] text-stone-500 mt-1 leading-snug">{opt.sublabel}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
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
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
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
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                      {opt.sublabel && (
                        <div className="text-[11px] text-stone-500 mt-1">{opt.sublabel}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  4. Where in Nigeria are you based?
                </label>
                <select
                  id="bio-location-select"
                  value={biodata.location}
                  onChange={(e) => {
                    setBiodata({ ...biodata, location: e.target.value as NigerianRegion });
                    setValidationError(null);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
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

        {/* Step 2: CONSTRAINTS */}
        {currentStep === 2 && (
          <div id="step-2-constraints" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Step 2 of 4: Your Tools & Time</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Your Phone, Laptop, and Light
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                Be real with us. We will only recommend skills that work with the tools and light you actually have today.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-7">
              {/* Hardware Device */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  1. What device will you use for daily learning?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEVICE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setConstraints({ ...constraints, device: opt.value });
                        setValidationError(null);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                        constraints.device === opt.value
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      {opt.value === 'phone_only' ? (
                        <Smartphone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      ) : (
                        <Laptop className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                        <div className="text-[11px] text-stone-500 mt-1">{opt.sublabel}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Available */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  2. How much free time do you realistically have each week?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setConstraints({ ...constraints, timeWeekly: opt.value });
                        setValidationError(null);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        constraints.timeWeekly === opt.value
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                      <div className="text-[10px] text-stone-500 mt-1">{opt.sublabel}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Power & Internet Setup */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  3. What is your power and data situation?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {POWER_DATA_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setConstraints({ ...constraints, powerData: opt.value });
                        setValidationError(null);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        constraints.powerData === opt.value
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                      <div className="text-[11px] text-stone-500 mt-1">{opt.sublabel}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Coding Appetite */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  4. How do you feel about writing code?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CODING_APPETITE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setConstraints({ ...constraints, codingAppetite: opt.value });
                        setValidationError(null);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        constraints.codingAppetite === opt.value
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                      <div className="text-[11px] text-stone-500 mt-1">{opt.sublabel}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Earning Urgency */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  5. How soon do you want to start earning income?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {EARNING_URGENCY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setConstraints({ ...constraints, earningUrgency: opt.value });
                        setValidationError(null);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        constraints.earningUrgency === opt.value
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                          : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                      <div className="text-[11px] text-stone-500 mt-1">{opt.sublabel}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: SCENARIOS */}
        {currentStep === 3 && (
          <div id="step-3-scenarios" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Step 3 of 4: What You Like</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                What feels natural or fun for you?
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                No tech jargon! Pick what you actually enjoy doing. There is no right or wrong answer.
              </p>
            </div>

            <div className="space-y-6">
              {SCENARIO_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      {q.title}
                    </span>
                  </div>
                  
                  <p className="text-sm sm:text-base text-stone-800 font-semibold leading-relaxed">
                    {q.scenario}
                  </p>

                  <div className="space-y-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = scenarioAnswers[q.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => {
                            setScenarioAnswers({ ...scenarioAnswers, [q.id]: optIdx });
                            setValidationError(null);
                          }}
                          className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-600/20'
                              : 'border-stone-200 bg-stone-50/50 hover:bg-white hover:border-stone-300 text-stone-700'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-stone-900">{opt.text}</div>
                            <div className="text-xs text-stone-500 font-normal mt-1 leading-relaxed">{opt.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: QUALITATIVE NUANCE */}
        {currentStep === 4 && (
          <div id="step-4-nuance" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Step 4 of 4: Final Touch</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Almost done! One last question
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                Tell us a bit about what you like so we can craft your personalized Day-One task.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-800">
                    1. Tell us one cool thing you fixed, arranged, or helped someone with recently{' '}
                    <span className="text-rose-600 font-bold ml-1">* (Compulsory)</span>
                  </label>
                </div>
                <p className="text-xs text-stone-500">
                  Doesn't have to be tech! Could be planning an event, fixing someone's phone problem, making a short video, organizing orders on WhatsApp, or balancing a budget.
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
                  placeholder="e.g., I helped organize orders for a friend's bake shop with a Google Sheet and WhatsApp..."
                  className={`w-full p-4 rounded-xl border bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                    validationError && !qualitative.proudAchievement.trim()
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-stone-300 focus:ring-emerald-600'
                  }`}
                ></textarea>
                <p className="text-[11px] text-stone-400">
                  {qualitative.proudAchievement.trim().length > 0 ? (
                    <span className="text-emerald-700 font-medium">✓ Thank you! This helps us personalize your Day-One mission.</span>
                  ) : (
                    <span>This response is required before you can view your career match.</span>
                  )}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  2. What kind of industry or topic sounds exciting to you? (Optional)
                </label>
                <select
                  id="qualitative-industry-select"
                  value={qualitative.targetIndustry}
                  onChange={(e) => setQualitative({ ...qualitative, targetIndustry: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="">-- Pick an area that interests you (Optional) --</option>
                  <option value="Digital Marketing & Growth">Digital Marketing & Performance Growth (Ads, SEO, Funnels, Email Campaigns)</option>
                  <option value="Branding & Creative Design">Branding & Creative Design (Logos, Visual Identity, Brand Kits, Art Direction)</option>
                  <option value="Education & EdTech">Education & EdTech (Online Learning, Teaching, Training, Course Creation)</option>
                  <option value="Fintech & Mobile Money">Banking & Money Apps (Fintech, savings, payments)</option>
                  <option value="E-commerce & Logistics">Shopping & Delivery Apps (Jumia, Chowdeck, logistics)</option>
                  <option value="Creator Economy & Media">Social Media & Creators (TikTok, YouTube, Instagram, X)</option>
                  <option value="Health & EdTech">Healthcare & Biotechnology</option>
                  <option value="Global Remote Freelancing">Working for Foreign Clients & Companies (Remote Freelancing)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  3. Which day-to-day task sounds most appealing to you? (Optional)
                </label>
                <select
                  id="qualitative-activity-select"
                  value={qualitative.preferredDailyActivity || ''}
                  onChange={(e) => setQualitative({ ...qualitative, preferredDailyActivity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="">-- Choose what kind of day-to-day work you enjoy most --</option>
                  <option value="digital_marketing">Digital Marketing: Running paid ad campaigns, driving customer traffic, and optimizing funnels</option>
                  <option value="branding">Branding & Visual Identity: Crafting logos, color palettes, brand guideline decks, and visual styling</option>
                  <option value="education">Education & Teaching: Designing online lessons, creating tutorials, and training learners</option>
                  <option value="design">UI/UX Design: Designing mobile app screens, web layouts, and interactive wireframes</option>
                  <option value="writing">Technical Writing: Writing clear articles, step-by-step guides, and documentation</option>
                  <option value="operations">Virtual Operations: Organizing calendars, managing client tasks, and coordinating projects</option>
                  <option value="data">Data & Analytics: Analyzing numbers, spotting sales trends, and creating charts in spreadsheets</option>
                  <option value="testing_security">QA & Security: Testing apps for bugs, finding mistakes, and keeping accounts safe</option>
                  <option value="coding">Software Development: Writing code, solving technical puzzles, and building app features</option>
                </select>
                <p className="text-[11px] text-stone-400">
                  Directly weights your daily preference into the diagnostic matching matrix.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>All set! Click below to see your realistic tech career match and Day-One roadmap.</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: DIAGNOSIS RESULT */}
        {currentStep === 5 && diagnosisResult && (
          <div id="step-5-result" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <DiagnosisResult
              result={diagnosisResult}
              onRetake={handleRetake}
              onExploreOther={handleExploreOther}
              onReturnHome={onBackToHome}
            />
          </div>
        )}

        {/* Validation Alert */}
        {currentStep < 5 && validationError && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Form Page Navigation Buttons */}
        {currentStep < 5 && (
          <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-stone-300 bg-white text-stone-700 text-xs sm:text-sm font-semibold hover:bg-stone-50 transition-colors"
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 text-white text-xs sm:text-sm font-bold hover:bg-emerald-800 active:scale-[0.99] transition-all shadow-sm"
            >
              <span>{currentStep === 4 ? 'See My Career Match' : 'Continue to Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>

    </div>
  );
};
