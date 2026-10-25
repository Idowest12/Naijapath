import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  Smartphone, 
  Laptop, 
  Clock, 
  Zap, 
  Briefcase, 
  Check, 
  AlertCircle,
  Bot,
  Sprout,
  RefreshCw,
  Palette,
  Cpu,
  BookOpen,
  Rocket,
  Brain,
  ListChecks,
  MessageSquare,
  Coins,
  Wrench,
  GraduationCap,
  Building2,
  MapPin,
  Building,
  Globe,
  Monitor,
  Search,
  Award,
  ShieldCheck,
  Layout,
  Video,
  UserCheck
} from 'lucide-react';
import { SingleQuestionCard } from './SingleQuestionCard';
import { TechNavLogo } from './TechNavLogo';
import { AssessmentProgressIndicator } from './AssessmentProgressIndicator';
import { 
  HandPalette, 
  HandSmartphone, 
  HandMessage, 
  HandCoins, 
  HandChecklist, 
  HandGlobe, 
  HandLaptop, 
  HandCode, 
  HandShield, 
  HandBook,
  HandBriefcase,
  HandCompass,
  HandWrench,
  HandVideo
} from './HandDrawnIcons';
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
  REGION_OPTIONS, 
  SCENARIO_QUESTIONS,
  calculateNicheRecommendation
} from '../data/assessmentQuestions';
import { DiagnosisResult } from './DiagnosisResult';
import { saveAssessmentRecord } from '../utils/submissionStorage';
import { saveAssessmentDraft, getAssessmentDraft, clearAssessmentDraft } from '../utils/assessmentDraftStorage';
import { trackAssessmentStart, trackAssessmentComplete, trackPageView } from '../utils/analytics';

interface AssessmentPageProps {
  onBackToHome: () => void;
  initialNicheId?: string;
  onOpenChatbot?: (prompt?: string) => void;
}

export const AssessmentPage: React.FC<AssessmentPageProps> = ({
  onBackToHome,
  initialNicheId: _initialNicheId,
  onOpenChatbot
}) => {
  // Step tracker: 1 = Biodata, 2 = Constraints, 3 = Scenarios/Aptitude, 4 = Nuance, 5 = Result
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [step1SubIndex, setStep1SubIndex] = useState<number>(0);
  const [constraintSubIndex, setConstraintSubIndex] = useState<number>(0);
  const [scenarioSubIndex, setScenarioSubIndex] = useState<number>(0);

  // Form State: clean slate so the user makes all choices themselves
  const [biodata, setBiodata] = useState<UserBiodata>({
    fullName: '',
    ageBand: '',
    gender: '',
    status: '',
    location: '',
    fieldOfStudy: '',
    experienceLevel: '',
    primaryInterest: ''
  });

  const [constraints, setConstraints] = useState<UserConstraints>({
    device: '',
    timeWeekly: '',
    powerData: '',
    codingAppetite: '',
    earningUrgency: ''
  });

  // Scenario selections: start completely blank, no preselected index
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

  // Auto-saved draft restoration state
  const [restoredFromDraft, setRestoredFromDraft] = useState<boolean>(false);

  // Restore saved draft on mount if user refreshed or navigated back
  useEffect(() => {
    const draft = getAssessmentDraft();
    if (draft) {
      if (draft.biodata) setBiodata(draft.biodata);
      if (draft.constraints) setConstraints(draft.constraints);
      if (draft.scenarioAnswers) setScenarioAnswers(draft.scenarioAnswers);
      if (draft.qualitative) setQualitative(draft.qualitative);
      if (typeof draft.currentStep === 'number' && draft.currentStep >= 1) setCurrentStep(Math.min(5, Math.max(1, draft.currentStep)));
      if (typeof draft.step1SubIndex === 'number') setStep1SubIndex(Math.max(0, Math.min(6, draft.step1SubIndex)));
      if (typeof draft.constraintSubIndex === 'number') setConstraintSubIndex(Math.max(0, Math.min(4, draft.constraintSubIndex)));
      if (typeof draft.scenarioSubIndex === 'number') setScenarioSubIndex(Math.max(0, Math.min(SCENARIO_QUESTIONS.length - 1, draft.scenarioSubIndex)));
      if (draft.diagnosisResult) setDiagnosisResult(draft.diagnosisResult);

      const hasMeaningfulAnswers =
        draft.currentStep > 1 ||
        Object.keys(draft.scenarioAnswers || {}).length > 0 ||
        Boolean(draft.biodata?.status || draft.biodata?.location || draft.biodata?.experienceLevel);

      if (hasMeaningfulAnswers) {
        setRestoredFromDraft(true);
      }
    }
  }, []);

  // Automatically save progress whenever answers or step change
  useEffect(() => {
    saveAssessmentDraft({
      currentStep,
      step1SubIndex,
      constraintSubIndex,
      scenarioSubIndex,
      activeSectionIntro: null,
      biodata,
      constraints,
      scenarioAnswers,
      qualitative,
      diagnosisResult
    });
  }, [
    currentStep,
    step1SubIndex,
    constraintSubIndex, 
    scenarioSubIndex, 
    biodata, 
    constraints, 
    scenarioAnswers, 
    qualitative, 
    diagnosisResult
  ]);

  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setValidationError(null);
    if (currentStep === 1) {
      trackPageView('/assessment');
      trackAssessmentStart();
    } else if (currentStep === 5) {
      trackPageView('/result');
    }
  }, [currentStep]);

  // Handle final submission in Step 4
  const handleSubmitAssessment = () => {
    setValidationError(null);

    if (!qualitative.proudAchievement.trim()) {
      setValidationError('Please share one small project, task, or problem you helped solve or organize recently.');
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
    setDiagnosisResult(computed);
    setCurrentStep(5);
  };

  // Step 1 Questions: Conversational, relatable, psychological
  const step1Questions = [
    {
      field: 'experienceLevel' as keyof UserBiodata,
      title: "Where are you on your journey right now?",
      subtitle: "No tests, no jargon. We tailor your starting pace to where you actually are today.",
      categoryBadge: "Your Starting Point",
      customTopSlot: (
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/90 mb-1">
          <label htmlFor="bio-name-input" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            What should we call you? <span className="text-stone-400 font-normal lowercase">(optional)</span>
          </label>
          <input
            id="bio-name-input"
            type="text"
            placeholder="e.g. Tosin, Chidi, Amina, Aisha"
            value={biodata.fullName || ''}
            onChange={(e) => setBiodata(prev => ({ ...prev, fullName: e.target.value }))}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 placeholder:text-stone-400 transition-all"
          />
        </div>
      ),
      options: [
        {
          value: 'novice_total_beginner',
          label: 'Total Beginner',
          sublabel: 'Brand new to tech, looking for a welcoming, jargon-free starting path',
          icon: 'sprout'
        },
        {
          value: 'intermediate_career_changer',
          label: 'Career Switcher',
          sublabel: 'Bringing experience from another field into high-income tech',
          icon: 'refresh'
        },
        {
          value: 'skill_builder_advancing',
          label: 'Skill Builder',
          sublabel: 'Have basic computer skills, ready to master a high-paying specialty',
          icon: 'zap'
        }
      ]
    },
    {
      field: 'fieldOfStudy' as keyof UserBiodata,
      title: "What did you study or what is your academic background?",
      subtitle: "Your background is a superpower! Every field naturally shines in specific tech niches.",
      categoryBadge: "Educational Foundation",
      options: [
        {
          value: 'arts_humanities',
          label: 'Arts, Languages & Media',
          sublabel: 'Literature, Languages, Mass Comm, Creative Arts, Theatre',
          icon: 'palette'
        },
        {
          value: 'commercial_business',
          label: 'Business & Finance',
          sublabel: 'Accounting, Economics, Business Admin, Banking, Marketing',
          icon: 'briefcase'
        },
        {
          value: 'sciences_health',
          label: 'Sciences & Tech',
          sublabel: 'Computer Science, Engineering, Physical Sciences, Pharmacy, Nursing',
          icon: 'cpu'
        },
        {
          value: 'social_sciences_education',
          label: 'Social Sciences & Education',
          sublabel: 'Education, Sociology, Psychology, Political Science',
          icon: 'book'
        },
        {
          value: 'secondary_school',
          label: 'Secondary School / O-Level',
          sublabel: 'High school graduate ready to dive straight into practical digital skills',
          icon: 'graduation'
        },
        {
          value: 'self_taught_other',
          label: 'Self-Taught & Practical Life',
          sublabel: 'Learned through business, hands-on trade, or informal exploration',
          icon: 'brain'
        }
      ]
    },
    {
      field: 'primaryInterest' as keyof UserBiodata,
      title: "What kind of activities naturally energize you?",
      subtitle: "What you naturally enjoy reveals where your deepest talent and earning power live.",
      categoryBadge: "Natural Curiosity",
      options: [
        {
          value: 'colors_visual_design',
          label: 'Colors, Visuals & Styling',
          sublabel: 'Playing with colors, typography, screen layouts, photo/video editing',
          icon: 'palette'
        },
        {
          value: 'investigating_puzzles',
          label: 'Solving Puzzles & Logic',
          sublabel: 'Untangling why things break, brain teasers, strategy games, riddles',
          icon: 'brain'
        },
        {
          value: 'organizing_systems',
          label: 'Organizing Systems & Lists',
          sublabel: 'Planning schedules, tidying messy files, structured checklists',
          icon: 'checklist'
        },
        {
          value: 'communicating_helping',
          label: 'Talking, Advising & Storytelling',
          sublabel: 'Explaining ideas, counseling, writing catchy posts, helping people',
          icon: 'message'
        },
        {
          value: 'numbers_money',
          label: 'Numbers, Margins & Deals',
          sublabel: 'Tracking money, calculating profits, finding bargains, spreadsheets',
          icon: 'coins'
        },
        {
          value: 'building_gadgets',
          label: 'Building Gadgets & Tinkering',
          sublabel: 'Hands-on experimenting, taking gadgets apart, coding software logic',
          icon: 'wrench'
        }
      ]
    },
    {
      field: 'status' as keyof UserBiodata,
      title: "What does your everyday life look like right now?",
      subtitle: "We ensure your study roadmap fits your real schedule without stress or burnout.",
      categoryBadge: "Current Routine",
      options: [
        {
          value: 'student_undergrad',
          label: 'Undergrad / College Student',
          sublabel: 'Balancing school lectures with building career-ready tech skills',
          icon: 'graduation'
        },
        {
          value: 'working_non_tech',
          label: 'Working a Non-Tech Job',
          sublabel: 'Currently employed and looking for a lucrative, flexible career pivot',
          icon: 'building'
        },
        {
          value: 'self_employed',
          label: 'Self-Employed / Running a Business',
          sublabel: 'Managing my own business, trade, or independent hustle',
          icon: 'rocket'
        },
        {
          value: 'nysc_member',
          label: 'NYSC Youth Corp Member',
          sublabel: 'Serving Nigeria and preparing for immediate post-service income',
          icon: 'award'
        },
        {
          value: 'unemployed_grad',
          label: 'Job Seeker / Recent Graduate',
          sublabel: 'Ready to dedicate focused daily time to tech mastery and job placement',
          icon: 'search'
        }
      ]
    },
    {
      field: 'ageBand' as keyof UserBiodata,
      title: "Which age bracket describes you?",
      subtitle: "Every life stage has distinct grant perks, fellowships, and career advantages.",
      categoryBadge: "Life Stage",
      options: [
        {
          value: 'under_18',
          label: 'Under 18',
          sublabel: 'Getting an early head start before university',
          icon: 'rocket'
        },
        {
          value: '18_22',
          label: '18 to 22 years',
          sublabel: 'Early university & foundational skill builder',
          icon: 'graduation'
        },
        {
          value: '23_27',
          label: '23 to 27 years',
          sublabel: 'Recent graduate or early career accelerator',
          icon: 'briefcase'
        },
        {
          value: '28_34',
          label: '28 to 34 years',
          sublabel: 'Mid-career switch or income acceleration',
          icon: 'clock'
        },
        {
          value: '35_plus',
          label: '35+ years',
          sublabel: 'Experienced professional expanding into global digital skills',
          icon: 'award'
        }
      ]
    },
    {
      field: 'gender' as keyof UserBiodata,
      title: "What is your gender?",
      subtitle: "Helps match female learners with fully-sponsored initiatives (She Code Africa, laptop grants).",
      categoryBadge: "Profile Matching",
      options: [
        {
          value: 'female',
          label: 'Female',
          sublabel: 'Unlocks dedicated women-in-tech grants, fellowships & laptop funds',
          icon: 'users'
        },
        {
          value: 'male',
          label: 'Male',
          sublabel: 'Standard diagnostic, scholarship and community matching',
          icon: 'users'
        },
        {
          value: 'prefer_not_to_say',
          label: 'Prefer not to say',
          sublabel: 'Neutral evaluation across all criteria',
          icon: 'shield'
        }
      ]
    },
    {
      field: 'location' as keyof UserBiodata,
      title: "Where are you based right now?",
      subtitle: "Matches you to local tech hubs, 3MTT learning centers, and developer meetups.",
      categoryBadge: "Location & Ecosystem",
      options: [
        {
          value: 'lagos',
          label: 'Lagos State',
          sublabel: 'Yaba, Ikeja, Lekki tech corridor & innovation ecosystem',
          icon: 'building'
        },
        {
          value: 'abuja_fct',
          label: 'Abuja (FCT)',
          sublabel: 'Capital innovation hubs & national tech initiatives',
          icon: 'building'
        },
        {
          value: 'south_south',
          label: 'Rivers (Port Harcourt)',
          sublabel: 'South-South digital innovation and remote hub',
          icon: 'map-pin'
        },
        {
          value: 'south_west',
          label: 'Oyo State (Ibadan)',
          sublabel: 'Fast-growing student and software community',
          icon: 'compass'
        },
        {
          value: 'south_east',
          label: 'Enugu / South-East',
          sublabel: 'Emerging tech clusters and remote tech talent',
          icon: 'zap'
        },
        {
          value: 'other_state',
          label: 'Other State / International',
          sublabel: 'Pick from all 36 Nigerian states or Diaspora below',
          icon: 'globe'
        }
      ],
      customBottomSlot: (
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
          <label htmlFor="bio-state-select" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
            Or pick your specific State / Region:
          </label>
          <select
            id="bio-state-select"
            value={biodata.location}
            onChange={(e) => {
              setBiodata(prev => ({ ...prev, location: e.target.value as NigerianRegion }));
              setValidationError(null);
            }}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 font-medium"
          >
            <option value="">-- Choose your State or Region --</option>
            {REGION_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      )
    }
  ];

  // Step 2 Questions: Real-world constraints
  const constraintQuestions = [
    {
      title: 'What device will you use for daily learning?',
      subtitle: 'Be real with us. We only recommend tech paths that work with the hardware you have right now.',
      field: 'device' as keyof UserConstraints,
      categoryBadge: 'Hardware Setup',
      options: [
        {
          value: 'phone_only',
          label: 'Smartphone Only',
          sublabel: 'Android or iPhone — zero laptop access right now',
          icon: 'smartphone'
        },
        {
          value: 'laptop_personal',
          label: 'Personal Laptop',
          sublabel: 'Your own laptop (Mac, Windows, or Linux) with full installation access',
          icon: 'laptop'
        },
        {
          value: 'shared_pc',
          label: 'Shared PC / Cyber Café',
          sublabel: 'Family desktop, university lab, or cafe visits (limited access hours)',
          icon: 'laptop'
        }
      ]
    },
    {
      title: 'How much free time do you realistically have each week?',
      subtitle: 'Be honest with your schedule so you never burn out or abandon your tech journey.',
      field: 'timeWeekly' as keyof UserConstraints,
      categoryBadge: 'Time Availability',
      options: [
        {
          value: '5_10_hours',
          label: '5 to 10 Hours / Week',
          sublabel: 'Bite-sized evenings & weekends (1 to 1.5 hours daily)',
          icon: 'clock'
        },
        {
          value: '10_20_hours',
          label: '10 to 20 Hours / Week',
          sublabel: 'Solid part-time dedication (2 to 3 hours daily)',
          icon: 'clock'
        },
        {
          value: '20_30_hours',
          label: '20 to 30 Hours / Week',
          sublabel: 'Serious career accelerator (3 to 5 hours daily)',
          icon: 'clock'
        },
        {
          value: '30_plus_hours',
          label: '30+ Hours / Week',
          sublabel: 'Full-time immersion (unemployed grad, gap year, or leave of absence)',
          icon: 'clock'
        }
      ]
    },
    {
      title: 'What is your power and internet situation?',
      subtitle: 'We match you to learning stacks with lightweight data needs or offline study capabilities if required.',
      field: 'powerData' as keyof UserConstraints,
      categoryBadge: 'Power & Data',
      options: [
        {
          value: 'stable_power_data',
          label: 'Reliable Light & Daily Internet',
          sublabel: 'Inverter, gen backup, or steady grid with Wi-Fi / data subscriptions',
          icon: 'zap'
        },
        {
          value: 'erratic_power_good_data',
          label: 'Unstable Light, Decent Data',
          sublabel: 'Frequent NEPA outages, reliance on phone battery & evening charging',
          icon: 'zap'
        },
        {
          value: 'mobile_data_rationed',
          label: 'Mobile Data Strictly Rationed',
          sublabel: 'Need low-bandwidth courses, downloadable docs, and offline coding',
          icon: 'smartphone'
        },
        {
          value: 'both_severely_constrained',
          label: 'Both Severely Constrained',
          sublabel: 'Need ultra-forgiving learning paths that operate with minimal resources',
          icon: 'shield'
        }
      ]
    },
    {
      title: 'How do you feel about writing code?',
      subtitle: 'Tech has massive high-paying roles for both coders and non-coders alike.',
      field: 'codingAppetite' as keyof UserConstraints,
      categoryBadge: 'Coding Appetite',
      options: [
        {
          value: 'no_coding',
          label: 'Zero Code Preferred',
          sublabel: 'I prefer visual design, writing, research, or virtual management',
          icon: 'palette'
        },
        {
          value: 'open_to_light_coding',
          label: 'Open to Light Logic / No-Code',
          sublabel: 'I can handle visual formulas, spreadsheets, automation, and basic web styling',
          icon: 'wrench'
        },
        {
          value: 'excited_to_code',
          label: 'Excited to Code',
          sublabel: 'I want to build software logic, APIs, mobile apps, or backend algorithms',
          icon: 'code'
        }
      ]
    },
    {
      title: 'How soon do you want to start earning income?',
      subtitle: 'Helps us balance quick-win freelance skills against long-term career mastery.',
      field: 'earningUrgency' as keyof UserConstraints,
      categoryBadge: 'Income Timeline',
      options: [
        {
          value: 'urgent_1_3_months',
          label: 'Urgent (1 to 3 Months)',
          sublabel: 'Need quick-win skills to monetize on WhatsApp, Upwork, or local clients',
          icon: 'zap'
        },
        {
          value: 'medium_3_6_months',
          label: 'Balanced (3 to 6 Months)',
          sublabel: 'Ready to build a solid portfolio and apply for entry-level roles or gigs',
          icon: 'briefcase'
        },
        {
          value: 'patient_6_12_months',
          label: 'Deep Mastery (6 to 12 Months)',
          sublabel: 'Willing to learn deep technical engineering for high-leverage compensation',
          icon: 'award'
        }
      ]
    }
  ];

  const handleStartFresh = () => {
    clearAssessmentDraft();
    setRestoredFromDraft(false);
    setBiodata({
      fullName: '',
      ageBand: '',
      gender: '',
      status: '',
      location: '',
      fieldOfStudy: '',
      experienceLevel: '',
      primaryInterest: ''
    });
    setConstraints({
      device: '',
      timeWeekly: '',
      powerData: '',
      codingAppetite: '',
      earningUrgency: ''
    });
    setScenarioAnswers({});
    setQualitative({
      proudAchievement: '',
      targetIndustry: '',
      preferredDailyActivity: ''
    });
    setDiagnosisResult(null);
    setCurrentStep(1);
    setStep1SubIndex(0);
    setConstraintSubIndex(0);
    setScenarioSubIndex(0);
  };

  const handleRetake = () => {
    handleStartFresh();
  };

  const handleExploreOther = () => {
    if (onBackToHome) {
      onBackToHome();
    }
  };

  const stepLabels = [
    'Your Background',
    'Setup & Time',
    'Everyday Scenarios',
    'Final Touch'
  ];

  // Global 19-question helpers
  const getAnsweredGlobalIndices = (): boolean[] => {
    return [
      // Phase 1: Background (7)
      Boolean(biodata.experienceLevel),
      Boolean(biodata.fieldOfStudy),
      Boolean(biodata.primaryInterest),
      Boolean(biodata.status),
      Boolean(biodata.ageBand),
      Boolean(biodata.gender),
      Boolean(biodata.location),
      // Phase 2: Constraints (5)
      Boolean(constraints.device),
      Boolean(constraints.timeWeekly),
      Boolean(constraints.powerData),
      Boolean(constraints.codingAppetite),
      Boolean(constraints.earningUrgency),
      // Phase 3: Scenarios (6)
      ...SCENARIO_QUESTIONS.map(q => scenarioAnswers[q.id] !== undefined),
      // Phase 4: Reflection (1)
      Boolean(qualitative.proudAchievement.trim())
    ];
  };

  const safeStep1Index = Math.max(0, Math.min(step1SubIndex, Math.max(0, step1Questions.length - 1)));
  const safeConstraintIndex = Math.max(0, Math.min(constraintSubIndex, Math.max(0, constraintQuestions.length - 1)));
  const safeScenarioIndex = Math.max(0, Math.min(scenarioSubIndex, Math.max(0, SCENARIO_QUESTIONS.length - 1)));

  const currentStep1 = step1Questions[safeStep1Index] || step1Questions[0];
  const currentConstraint = constraintQuestions[safeConstraintIndex] || constraintQuestions[0];
  const currentScenario = SCENARIO_QUESTIONS[safeScenarioIndex] || SCENARIO_QUESTIONS[0];

  const getCurrentGlobalIndex = (): number => {
    if (currentStep === 1) return safeStep1Index;
    if (currentStep === 2) return 7 + safeConstraintIndex;
    if (currentStep === 3) return 7 + 5 + safeScenarioIndex;
    if (currentStep === 4) return 18;
    return 18;
  };

  const getCurrentCategoryBadge = (): string => {
    if (currentStep === 1) return currentStep1?.categoryBadge || 'Your Background';
    if (currentStep === 2) return currentConstraint?.categoryBadge || 'Setup & Constraints';
    if (currentStep === 3) return currentScenario?.category || 'Everyday Scenarios';
    if (currentStep === 4) return 'Personal Small Win';
    return '';
  };

  const handleJumpToGlobalIndex = (globalIdx: number) => {
    setValidationError(null);
    if (globalIdx >= 0 && globalIdx < 7) {
      setCurrentStep(1);
      setStep1SubIndex(globalIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (globalIdx >= 7 && globalIdx < 12) {
      setCurrentStep(2);
      setConstraintSubIndex(globalIdx - 7);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (globalIdx >= 12 && globalIdx < 18) {
      setCurrentStep(3);
      setScenarioSubIndex(globalIdx - 12);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (globalIdx === 18) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate overall progress across the entire assessment
  const calculateOverallProgress = () => {
    if (currentStep === 5) return 100;
    const answeredCount = getAnsweredGlobalIndices().filter(Boolean).length;
    return Math.min(98, Math.round((answeredCount / 19) * 100));
  };

  return (
    <div className="min-h-screen bg-[#F1F0FF] text-slate-900 flex flex-col font-sans selection:bg-[#D4F938] selection:text-black">
      {/* Top Header */}
      <header className="bg-white border-b-2 border-black sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-black bg-white text-black hover:bg-stone-50 transition-all text-xs sm:text-sm font-bold shadow-neo-sm cursor-pointer"
              title="Return to Guide"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-6 w-0.5 bg-black/20"></div>
            <button
              type="button"
              onClick={onBackToHome}
              className="cursor-pointer hover:opacity-90 transition-opacity text-left flex items-center"
              title="Naija Path Home"
              aria-label="Naija Path Home"
            >
              <TechNavLogo size="sm" />
            </button>
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
              <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone-500">
                <span className="font-semibold text-stone-900">Phase 0{currentStep}/04</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-700 font-sans normal-case font-medium">{stepLabels[currentStep - 1]}</span>
              </div>
            ) : (
              <span className="text-xs font-semibold text-stone-900 font-mono tracking-wide uppercase">
                Diagnostic Complete
              </span>
            )}
          </div>
        </div>

        {/* Subtle, non-intrusive 4-phase segmented bar in header */}
        {currentStep < 5 && (
          <AssessmentProgressIndicator
            currentStep={currentStep}
            currentGlobalIndex={getCurrentGlobalIndex()}
            answeredGlobalIndices={getAnsweredGlobalIndices()}
            variant="header-bar"
          />
        )}
      </header>

      {/* Main Page Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24 sm:pb-28">
        
        {/* Auto-Resume Notification Banner */}
        {restoredFromDraft && currentStep < 5 && (
          <div 
            id="assessment-resume-banner" 
            className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 text-emerald-950 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs animate-in fade-in slide-in-from-top-2 duration-300"
          >
            <div className="flex items-start sm:items-center gap-2.5">
              <Compass className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <span className="font-bold text-emerald-950">Welcome back! </span>
                <span className="text-emerald-900">
                  We saved your progress. Resumed at Step {currentStep} of 4.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleStartFresh}
                className="text-xs font-bold text-stone-600 hover:text-stone-900 underline underline-offset-2 cursor-pointer transition-colors"
              >
                Start fresh instead
              </button>
              <button
                type="button"
                onClick={() => setRestoredFromDraft(false)}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 cursor-pointer transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Validation Alert */}
        {currentStep < 5 && validationError && (
          <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Subtle, non-intrusive card-level segmented dots indicator */}
        {currentStep < 5 && (
          <AssessmentProgressIndicator
            currentStep={currentStep}
            currentGlobalIndex={getCurrentGlobalIndex()}
            answeredGlobalIndices={getAnsweredGlobalIndices()}
            categoryBadge={getCurrentCategoryBadge()}
            onJumpToGlobalIndex={handleJumpToGlobalIndex}
            variant="dots"
          />
        )}

        {/* Step 1: BIODATA & BACKGROUND - One Card at a Time */}
        {currentStep === 1 && currentStep1 && (
          <div id="step-1-biodata" className="animate-in fade-in duration-200">
            <SingleQuestionCard
              questionNumber={safeStep1Index + 1}
              totalQuestions={step1Questions.length}
              stepNumber={1}
              stepName="Your Background"
              categoryBadge={currentStep1?.categoryBadge || 'Your Background'}
              title={currentStep1.title}
              subtitle={currentStep1.subtitle}
              customTopSlot={currentStep1.customTopSlot}
              customBottomSlot={currentStep1.customBottomSlot}
              options={currentStep1.options}
              selectedValue={biodata[currentStep1.field]}
              hideInternalProgressBar={true}
              onSelectOption={(val) => {
                setBiodata(prev => ({ ...prev, [currentStep1.field]: val as string }));
                setValidationError(null);
              }}
              onNext={() => {
                const currentVal = biodata[currentStep1.field];
                if (!currentVal) {
                  setValidationError('Please select an option to continue.');
                  return;
                }
                setValidationError(null);
                if (safeStep1Index < step1Questions.length - 1) {
                  setStep1SubIndex(safeStep1Index + 1);
                } else {
                  // Move directly into Step 2 without interstitial stop
                  setCurrentStep(2);
                  setConstraintSubIndex(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onPrev={() => {
                setValidationError(null);
                if (safeStep1Index > 0) {
                  setStep1SubIndex(safeStep1Index - 1);
                } else {
                  onBackToHome();
                }
              }}
              isFirst={safeStep1Index === 0}
              isLast={safeStep1Index === step1Questions.length - 1}
              nextButtonLabel={safeStep1Index === step1Questions.length - 1 ? 'Go to Section 2' : 'Next Question'}
              prevButtonLabel={safeStep1Index === 0 ? 'Home' : 'Back'}
              answeredIndices={step1Questions.map(q => Boolean(biodata[q.field]))}
              onJumpToQuestion={(idx) => {
                setValidationError(null);
                setStep1SubIndex(Math.max(0, Math.min(step1Questions.length - 1, idx)));
              }}
              autoAdvanceOnSelect={true}
            />
          </div>
        )}

        {/* Step 2: CONSTRAINTS - One Question at a Time */}
        {currentStep === 2 && currentConstraint && (
          <div id="step-2-constraints" className="animate-in fade-in duration-200">
            <SingleQuestionCard
              questionNumber={safeConstraintIndex + 1}
              totalQuestions={constraintQuestions.length}
              stepNumber={2}
              stepName="Your Setup & Time"
              categoryBadge={currentConstraint?.categoryBadge || 'Setup & Constraints'}
              title={currentConstraint.title}
              subtitle={currentConstraint.subtitle}
              options={currentConstraint.options}
              selectedValue={constraints[currentConstraint.field]}
              hideInternalProgressBar={true}
              onSelectOption={(val) => {
                setConstraints(prev => ({ ...prev, [currentConstraint.field]: val as string }));
                setValidationError(null);
              }}
              onNext={() => {
                const currentVal = constraints[currentConstraint.field];
                if (!currentVal) {
                  setValidationError('Please select an option to continue.');
                  return;
                }
                setValidationError(null);
                if (safeConstraintIndex < constraintQuestions.length - 1) {
                  setConstraintSubIndex(safeConstraintIndex + 1);
                } else {
                  // Move directly into Step 3 without interstitial stop
                  setCurrentStep(3);
                  setScenarioSubIndex(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onPrev={() => {
                setValidationError(null);
                if (safeConstraintIndex > 0) {
                  setConstraintSubIndex(safeConstraintIndex - 1);
                } else {
                  setCurrentStep(1);
                  setStep1SubIndex(step1Questions.length - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              isFirst={false}
              isLast={safeConstraintIndex === constraintQuestions.length - 1}
              nextButtonLabel={safeConstraintIndex === constraintQuestions.length - 1 ? 'Go to Scenarios' : 'Next Question'}
              prevButtonLabel={safeConstraintIndex === 0 ? 'Section 1' : 'Back'}
              answeredIndices={constraintQuestions.map(q => Boolean(constraints[q.field]))}
              onJumpToQuestion={(idx) => {
                setValidationError(null);
                setConstraintSubIndex(Math.max(0, Math.min(constraintQuestions.length - 1, idx)));
              }}
              autoAdvanceOnSelect={true}
            />
          </div>
        )}

        {/* Step 3: SCENARIO QUESTIONS - One Scenario at a Time */}
        {currentStep === 3 && currentScenario && (
          <div id="step-3-scenarios" className="animate-in fade-in duration-200">
            <SingleQuestionCard
              questionNumber={safeScenarioIndex + 1}
              totalQuestions={SCENARIO_QUESTIONS.length}
              stepNumber={3}
              stepName="Everyday Scenarios"
              categoryBadge={currentScenario?.category || 'Everyday Scenarios'}
              title={currentScenario.title}
              subtitle={currentScenario.scenario}
              options={currentScenario.options.map((opt, optIdx) => ({
                value: optIdx,
                label: opt.text,
                sublabel: opt.description,
                icon: opt.icon
              }))}
              selectedValue={scenarioAnswers[currentScenario.id]}
              hideInternalProgressBar={true}
              onSelectOption={(val) => {
                setScenarioAnswers(prev => ({ ...prev, [currentScenario.id]: Number(val) }));
                setValidationError(null);
              }}
              onNext={() => {
                const currentAnswer = scenarioAnswers[currentScenario.id];
                if (currentAnswer === undefined) {
                  setValidationError('Please select an option to continue.');
                  return;
                }
                setValidationError(null);
                if (safeScenarioIndex < SCENARIO_QUESTIONS.length - 1) {
                  setScenarioSubIndex(safeScenarioIndex + 1);
                } else {
                  // Check if all scenario questions are answered
                  const answeredAll = SCENARIO_QUESTIONS.every(q => scenarioAnswers[q.id] !== undefined);
                  if (!answeredAll) {
                    setValidationError(`Please answer all ${SCENARIO_QUESTIONS.length} questions.`);
                    return;
                  }
                  // Move directly into Step 4
                  setCurrentStep(4);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onPrev={() => {
                setValidationError(null);
                if (safeScenarioIndex > 0) {
                  setScenarioSubIndex(safeScenarioIndex - 1);
                } else {
                  setCurrentStep(2);
                  setConstraintSubIndex(constraintQuestions.length - 1);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              isFirst={false}
              isLast={safeScenarioIndex === SCENARIO_QUESTIONS.length - 1}
              nextButtonLabel={safeScenarioIndex === SCENARIO_QUESTIONS.length - 1 ? 'Go to Final Step' : 'Next Question'}
              prevButtonLabel={safeScenarioIndex === 0 ? 'Section 2' : 'Back'}
              answeredIndices={SCENARIO_QUESTIONS.map(q => scenarioAnswers[q.id] !== undefined)}
              onJumpToQuestion={(idx) => {
                setValidationError(null);
                setScenarioSubIndex(Math.max(0, Math.min(SCENARIO_QUESTIONS.length - 1, idx)));
              }}
              autoAdvanceOnSelect={true}
            />
          </div>
        )}

        {/* Step 4: FINAL TOUCH & PERSONAL VOICE */}
        {currentStep === 4 && (
          <div id="step-4-nuance" className="w-full max-w-2xl mx-auto space-y-7 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-9 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone-500 mb-2">
                  <span className="font-semibold text-stone-900">Part 04</span>
                  <span aria-hidden="true" className="text-stone-300">/</span>
                  <span className="text-stone-700 font-sans normal-case font-medium">Final Reflection & Anchor</span>
                </div>
                <h2 className="font-serif-display text-2xl sm:text-3xl text-stone-900 font-normal leading-[1.25] tracking-tight">
                  Almost done! One quick reflection
                </h2>
                <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed font-sans font-normal">
                  Tell us a small win, project, or problem you helped solve recently. We anchor your Day-One proof mission on this!
                </p>
              </div>

              {/* Question 1: Quick reflection with clickable inspiration chips */}
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-stone-900">
                  What is something you fixed, arranged, or helped someone with recently?{' '}
                  <span className="text-rose-600 font-medium">*</span>
                </label>
                <p className="text-xs text-stone-500">
                  Tap a suggestion or write your own in plain words:
                </p>
                
                {/* Suggestion Chips */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Designed a flyer or logo on Canva', icon: <HandPalette className="w-3.5 h-3.5 text-stone-500 shrink-0" />, text: 'I designed a promotional flyer and logo for a friend using Canva.' },
                    { label: 'Fixed a phone or app glitch', icon: <HandSmartphone className="w-3.5 h-3.5 text-stone-500 shrink-0" />, text: 'I helped troubleshoot smartphone settings and connectivity issues for a friend.' },
                    { label: 'Organized customer orders on WhatsApp', icon: <HandMessage className="w-3.5 h-3.5 text-stone-500 shrink-0" />, text: 'I organized customer orders, receipts, and delivery notes using WhatsApp and spreadsheets.' },
                    { label: 'Tracked sales or budget in Excel', icon: <HandCoins className="w-3.5 h-3.5 text-stone-500 shrink-0" />, text: 'I created a simple spreadsheet to track sales, expenses, and profit margins.' },
                    { label: 'Planned an event or project schedule', icon: <HandChecklist className="w-3.5 h-3.5 text-stone-500 shrink-0" />, text: 'I helped plan an event timeline and coordinated logistics with a group of friends.' }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQualitative(prev => ({ ...prev, proudAchievement: chip.text }));
                        setValidationError(null);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:border-stone-400 hover:text-stone-900 text-stone-600 transition-colors text-left cursor-pointer"
                    >
                      {chip.icon}
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>

                <textarea
                  id="qualitative-achievement-input"
                  rows={3}
                  value={qualitative.proudAchievement}
                  onChange={(e) => {
                    setQualitative(prev => ({ ...prev, proudAchievement: e.target.value }));
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="e.g. I helped organize customer orders on WhatsApp, designed a social flyer, or helped someone fix a computer issue..."
                  className={`w-full p-4 rounded-xl border bg-stone-50/50 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all placeholder:text-stone-400 ${
                    validationError && !qualitative.proudAchievement.trim()
                      ? 'border-rose-400 focus:ring-rose-500 bg-rose-50/30'
                      : 'border-stone-300 focus:ring-stone-900'
                  }`}
                />
              </div>

              {/* Question 2: Exciting Industry Field (Clean Visual Cards) */}
              <div className="space-y-3">
                <label className="block text-sm font-display font-bold text-black">
                  What kind of field or topic sounds exciting to you? <span className="text-stone-500 text-xs font-normal">(optional)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'Branding & Creative Design', label: 'Design & Aesthetics', sublabel: 'Brand styling, logos, UI screens, visuals', icon: <HandPalette className="w-4 h-4" /> },
                    { value: 'Software & SaaS Platforms', label: 'Apps & Software', sublabel: 'Everyday smartphone & web apps', icon: <HandSmartphone className="w-4 h-4" /> },
                    { value: 'Fintech & Mobile Money', label: 'Money & Fintech', sublabel: 'Savings apps, digital payments & wallets', icon: <HandCoins className="w-4 h-4" /> },
                    { value: 'E-commerce & Logistics', label: 'Shopping & Delivery', sublabel: 'Online stores, orders & retail logistics', icon: <HandBriefcase className="w-4 h-4" /> },
                    { value: 'Creator Economy & Media', label: 'Media & Creators', sublabel: 'Social media, video, storytelling', icon: <HandVideo className="w-4 h-4" /> },
                    { value: 'Global Remote Freelancing', label: 'Global Remote Work', sublabel: 'Working with foreign clients from home', icon: <HandGlobe className="w-4 h-4" /> }
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setQualitative(prev => ({ ...prev, targetIndustry: item.value }))}
                      className={`p-4 rounded-2xl border-2 border-black text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        qualitative.targetIndustry === item.value
                          ? 'bg-[#D4F938] text-black shadow-neo font-bold'
                          : 'bg-white hover:bg-stone-50 text-black shadow-neo-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg border border-black flex items-center justify-center shrink-0 ${
                          qualitative.targetIndustry === item.value
                            ? 'bg-black text-white'
                            : 'bg-stone-100 text-black'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold truncate">{item.label}</div>
                          <div className="text-xs text-stone-600 mt-0.5 line-clamp-1">{item.sublabel}</div>
                        </div>
                      </div>
                      {qualitative.targetIndustry === item.value && (
                        <div className="w-5 h-5 rounded-full bg-black text-[#D4F938] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Daily Work Style */}
              <div className="space-y-3">
                <label className="block text-sm font-display font-bold text-black">
                  Which daily work rhythm sounds most fun to you? <span className="text-stone-500 text-xs font-normal">(optional)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'design', label: 'Designing Screen Layouts', sublabel: 'Aesthetic buttons, user screens & Figma layouts', icon: <HandPalette className="w-4 h-4" /> },
                    { value: 'frontend_coding', label: 'Building Interactive Web Apps', sublabel: 'Coding interactive web pages & mobile tools', icon: <HandCode className="w-4 h-4" /> },
                    { value: 'data', label: 'Numbers & Data Insights', sublabel: 'Finding trends in numbers, sales & charts', icon: <HandCoins className="w-4 h-4" /> },
                    { value: 'testing_security', label: 'Testing Apps & Finding Glitches', sublabel: 'Bug hunting, quality assurance & security', icon: <HandShield className="w-4 h-4" /> },
                    { value: 'writing', label: 'Writing Guides & Helping People', sublabel: 'Beginner tutorials, documentation & support', icon: <HandBook className="w-4 h-4" /> },
                    { value: 'operations', label: 'Coordinating & Organizing', sublabel: 'Managing tasks, schedules & workflows', icon: <HandChecklist className="w-4 h-4" /> }
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setQualitative(prev => ({ ...prev, preferredDailyActivity: item.value }))}
                      className={`p-4 rounded-2xl border-2 border-black text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        qualitative.preferredDailyActivity === item.value
                          ? 'bg-[#D4F938] text-black shadow-neo font-bold'
                          : 'bg-white hover:bg-stone-50 text-black shadow-neo-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg border border-black flex items-center justify-center shrink-0 ${
                          qualitative.preferredDailyActivity === item.value
                            ? 'bg-black text-white'
                            : 'bg-stone-100 text-black'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold truncate">{item.label}</div>
                          <div className="text-xs text-stone-600 mt-0.5 line-clamp-1">{item.sublabel}</div>
                        </div>
                      </div>
                      {qualitative.preferredDailyActivity === item.value && (
                        <div className="w-5 h-5 rounded-full bg-black text-[#D4F938] flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Controls */}
              <div className="pt-6 border-t-2 border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(3);
                    setScenarioSubIndex(SCENARIO_QUESTIONS.length - 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border-2 border-black bg-white text-black text-xs sm:text-sm font-bold shadow-neo-sm hover:bg-stone-50 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Scenarios</span>
                </button>

                <button
                  id="assessment-reveal-results-btn"
                  type="button"
                  onClick={handleSubmitAssessment}
                  disabled={!qualitative.proudAchievement.trim()}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-base font-display font-bold border-2 border-black transition-all ${
                    qualitative.proudAchievement.trim()
                      ? 'bg-[#13141F] text-white shadow-neo-purple hover:translate-x-0.5 active:translate-x-1 cursor-pointer'
                      : 'bg-stone-200 text-stone-500 border-stone-300 cursor-not-allowed'
                  }`}
                >
                  <span>Reveal My Career Match</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
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

      </main>
    </div>
  );
};
