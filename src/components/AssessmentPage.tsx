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
  Briefcase
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

  // Form State
  const [biodata, setBiodata] = useState<UserBiodata>({
    fullName: '',
    ageBand: '23_27',
    gender: 'female',
    status: 'unemployed_grad',
    location: 'lagos'
  });

  const [constraints, setConstraints] = useState<UserConstraints>({
    device: 'phone_only',
    timeWeekly: '6_to_10_hrs',
    powerData: 'mobile_data_unsteady_power',
    codingAppetite: 'no_code_please',
    earningUrgency: 'immediate_1_3_months'
  });

  // Scenario selections
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({
    'scenario-app-frustration': 0,
    'scenario-ideal-output': 0,
    'scenario-collaboration-style': 0,
    'scenario-learning-project': 0,
  });

  // Qualitative answers
  const [qualitative, setQualitative] = useState({
    proudAchievement: '',
    targetIndustry: 'Fintech & Mobile Money'
  });

  // Result state
  const [diagnosisResult, setDiagnosisResult] = useState<RecommendationResult | null>(null);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      // Calculate aptitude scores
      const aptitudeTotals: AptitudeScores = {
        visualCreative: 3,
        logicalStructural: 3,
        peopleCommunication: 3,
        analyticalDetail: 3,
        organizationOps: 3,
        securityCuriosity: 2,
      };

      SCENARIO_QUESTIONS.forEach((q) => {
        const chosenIndex = scenarioAnswers[q.id] ?? 0;
        const option = q.options[chosenIndex];
        if (option && option.weights) {
          Object.entries(option.weights).forEach(([key, val]) => {
            const k = key as keyof AptitudeScores;
            aptitudeTotals[k] = Math.min(5, Math.max(1, aptitudeTotals[k] + (val ?? 0) - 2));
          });
        }
      });

      const submission: FullAssessmentSubmission = {
        biodata,
        constraints,
        aptitude: aptitudeTotals,
        qualitative
      };

      const computed = calculateNicheRecommendation(submission);
      setDiagnosisResult(computed);
      setCurrentStep(5);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRetake = () => {
    setDiagnosisResult(null);
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
    'Biodata & Stage',
    'Real Constraints',
    'Aptitude Scenarios',
    'Qualitative Nuance',
    'Diagnosis Result'
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
        
        {/* Step 1: BIODATA */}
        {currentStep === 1 && (
          <div id="step-1-biodata" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Layer 0: Biodata & Life Stage</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Tell us about where you are right now
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                We use your age group, life stage, and location to tailor recommendations to age-appropriate opportunities, female-in-tech funding, and regional hubs.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              {/* Optional Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  First Name or Preferred Nickname (Optional)
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
                  What is your age bracket?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AGE_BAND_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBiodata({ ...biodata, ageBand: opt.value })}
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
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {GENDER_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBiodata({ ...biodata, gender: opt.value })}
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
                  Current Daily Life / Occupation
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setBiodata({ ...biodata, status: opt.value })}
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
                  Where are you primarily based in Nigeria?
                </label>
                <select
                  id="bio-location-select"
                  value={biodata.location}
                  onChange={(e) => setBiodata({ ...biodata, location: e.target.value as NigerianRegion })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
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
                <span>Layer 1: Real-World Constraints</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Your Hardware & Power Reality
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                We never recommend high-end 3D or compiler tools if you only have a phone. Tell us what you actually work with today.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-7">
              {/* Hardware Device */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  1. What primary device do you have for daily learning?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEVICE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setConstraints({ ...constraints, device: opt.value })}
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
                  2. Realistic time available each week
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setConstraints({ ...constraints, timeWeekly: opt.value })}
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
                  3. Power & Internet Access
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {POWER_DATA_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setConstraints({ ...constraints, powerData: opt.value })}
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
                  4. How do you honestly feel about coding & syntax?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CODING_APPETITE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setConstraints({ ...constraints, codingAppetite: opt.value })}
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
                  5. How quickly do you need to begin earning income?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {EARNING_URGENCY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setConstraints({ ...constraints, earningUrgency: opt.value })}
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
                <span>Layer 2: Real Product Scenarios</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                How Your Brain Naturally Solves Problems
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                Pick the option that matches what you instinctively do — not what you think sounds most prestigious.
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
                      const isSelected = (scenarioAnswers[q.id] ?? 0) === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => setScenarioAnswers({ ...scenarioAnswers, [q.id]: optIdx })}
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
                <span>Layer 3: Nuance & Curiosity</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                A Few Personal Touchpoints
              </h1>
              <p className="text-stone-600 text-sm sm:text-base mt-2">
                Multiple-choice tests miss qualitative sparks. These prompts help us craft your personalized Day-One mission.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  1. Describe something you enjoyed organizing, fixing, or figuring out recently
                </label>
                <p className="text-xs text-stone-500">
                  Does not have to be technical! Could be planning an event, fixing a phone issue, editing a video, balancing a budget, or writing a guide.
                </p>
                <textarea
                  id="qualitative-achievement-input"
                  rows={4}
                  value={qualitative.proudAchievement}
                  onChange={(e) => setQualitative({ ...qualitative, proudAchievement: e.target.value })}
                  placeholder="e.g., I helped organize my sister's small catering orders with a Google Sheet and WhatsApp catalog..."
                  className="w-full p-4 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  2. What industry or field naturally excites you most?
                </label>
                <select
                  id="qualitative-industry-select"
                  value={qualitative.targetIndustry}
                  onChange={(e) => setQualitative({ ...qualitative, targetIndustry: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Fintech & Mobile Money">Fintech & Mobile Money (Banks, payments, digital savings)</option>
                  <option value="E-commerce & Logistics">E-commerce & Logistics (Delivery, shopping, retail marketplaces)</option>
                  <option value="Creator Economy & Media">Creator Economy & Media (Content creators, podcasts, YouTube, X)</option>
                  <option value="Health & EdTech">Healthcare & Education (Learning platforms, telemedicine)</option>
                  <option value="Global Remote Freelancing">General Global Remote Freelancing & Agency Operations</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>All information gathered! Click below to calculate your matching tech niche and immediate Day-One task.</span>
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
              <span>{currentStep === 4 ? 'Calculate My Pathway' : 'Continue to Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>

    </div>
  );
};
