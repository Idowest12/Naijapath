import { 
  FullAssessmentSubmission, 
  RecommendationResult, 
  PathwayNiche,
  AgeBand,
  Gender,
  CurrentStatus,
  NigerianRegion,
  DeviceType,
  TimeAvailable,
  PowerDataSetup,
  CodingAppetite,
  EarningUrgency
} from '../types';
import { ALL_NICHES } from './nichesData';

export interface BiodataQuestionOption<T> {
  value: T;
  label: string;
  sublabel?: string;
}

export interface ScenarioQuestion {
  id: string;
  category: string;
  title: string;
  scenario: string;
  options: {
    text: string;
    description: string;
    weights: {
      visualCreative?: number;
      logicalStructural?: number;
      peopleCommunication?: number;
      analyticalDetail?: number;
      organizationOps?: number;
      securityCuriosity?: number;
    };
  }[];
}

export const AGE_BAND_OPTIONS: BiodataQuestionOption<AgeBand>[] = [
  { value: 'under_18', label: 'Under 18', sublabel: 'Secondary school or just starting out' },
  { value: '18_22', label: '18 - 22', sublabel: 'Uni student or fresh school leaver' },
  { value: '23_27', label: '23 - 27', sublabel: 'Graduate, job seeker, or starting early career' },
  { value: '28_34', label: '28 - 34', sublabel: 'Switching from another career into tech' },
  { value: '35_plus', label: '35+', sublabel: 'Experienced worker learning digital skills' },
];

export const GENDER_OPTIONS: BiodataQuestionOption<Gender>[] = [
  { value: 'female', label: 'Female', sublabel: 'Unlocks female-in-tech grants & communities' },
  { value: 'male', label: 'Male' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export const STATUS_OPTIONS: BiodataQuestionOption<CurrentStatus>[] = [
  { value: 'student_undergrad', label: 'Student in School', sublabel: 'Balancing school lectures, tests & exams' },
  { value: 'unemployed_grad', label: 'Recent Graduate / Looking for Work', sublabel: 'Free time and ready to learn skills for income' },
  { value: 'working_non_tech', label: 'Working a 9-to-5 (Non-Tech)', sublabel: 'Working in bank, sales, teaching, admin, etc.' },
  { value: 'self_employed', label: 'Business Owner / Hustling', sublabel: 'Running my own business or trade' },
  { value: 'secondary_school', label: 'Finished Secondary School', sublabel: 'Awaiting admission or exploring tech first' },
];

export const REGION_OPTIONS: BiodataQuestionOption<NigerianRegion>[] = [
  { value: 'lagos', label: 'Lagos State', sublabel: 'Most tech hubs and community events' },
  { value: 'abuja', label: 'Abuja / FCT', sublabel: 'Growing tech community and hubs' },
  { value: 'south_west', label: 'South-West (Oyo, Ogun, Osun, Ondo, Ekiti)' },
  { value: 'south_south', label: 'South-South (Rivers, Edo, Delta, etc.)' },
  { value: 'south_east', label: 'South-East (Enugu, Anambra, Imo, etc.)' },
  { value: 'north', label: 'Northern States (Kaduna, Kano, Jos, etc.)' },
  { value: 'outside_nigeria', label: 'Outside Nigeria / Abroad' },
];

export const DEVICE_OPTIONS: BiodataQuestionOption<DeviceType>[] = [
  { value: 'phone_only', label: 'Smartphone Only', sublabel: 'No laptop right now; everything must work on phone' },
  { value: 'shared_or_cafe', label: 'Shared PC or Cafe', sublabel: 'Can use a family PC, friend laptop, or cyber cafe sometimes' },
  { value: 'laptop_basic', label: 'Normal Everyday Laptop', sublabel: 'Core i3/i5, 4GB - 8GB RAM for daily work' },
  { value: 'laptop_power', label: 'Fast Powerful Laptop', sublabel: '16GB RAM or high-speed machine for heavy tasks' },
];

export const TIME_OPTIONS: BiodataQuestionOption<TimeAvailable>[] = [
  { value: '3_to_5_hrs', label: '3 - 5 hrs / week', sublabel: 'Quick spare time (under 1 hr a day)' },
  { value: '6_to_10_hrs', label: '6 - 10 hrs / week', sublabel: 'Steady habit (1 - 2 hrs a day)' },
  { value: '11_to_20_hrs', label: '11 - 20 hrs / week', sublabel: 'Serious learning (2 - 3 hrs a day)' },
  { value: '20_plus_hrs', label: '20+ hrs / week', sublabel: 'Full-time focus (all-in on learning)' },
];

export const POWER_DATA_OPTIONS: BiodataQuestionOption<PowerDataSetup>[] = [
  { value: 'night_data_or_powerbank', label: 'Powerbank & Night Data', sublabel: 'Charging when light shows up, managing phone data carefully' },
  { value: 'mobile_data_unsteady_power', label: 'Normal Data & Occasional Light Cuts', sublabel: 'Decent internet connection with light coming and going' },
  { value: 'steady_light_wifi', label: 'Steady Light & Good Wi-Fi', sublabel: 'Inverter, gen, or steady power with reliable internet' },
];

export const CODING_APPETITE_OPTIONS: BiodataQuestionOption<CodingAppetite>[] = [
  { value: 'no_code_please', label: 'No coding at all! Keep it simple', sublabel: 'I prefer design, writing, managing, organizing, or talking to people' },
  { value: 'willing_to_try', label: 'Open to light tools & simple steps', sublabel: 'I do not mind Excel formulas, Canva, Notion, or simple setups' },
  { value: 'love_logic_math', label: 'I want to build software & code!', sublabel: 'Excited to write real code, apps, and solve technical puzzles' },
];

export const EARNING_URGENCY_OPTIONS: BiodataQuestionOption<EarningUrgency>[] = [
  { value: 'immediate_1_3_months', label: 'Need money fast (1 - 3 months)', sublabel: 'Want gigs or freelance jobs as soon as possible' },
  { value: 'steady_4_6_months', label: 'Balanced (4 - 6 months)', sublabel: 'Ready to build solid skills and samples first' },
  { value: 'long_term_mastery', label: 'Long game (6 - 12+ months)', sublabel: 'Focused on mastering a high-paying skill without rushing' },
];

export const SCENARIO_QUESTIONS: ScenarioQuestion[] = [
  {
    id: 'scenario-app-frustration',
    category: 'Daily Apps',
    title: 'When an app annoys you',
    scenario: 'You are using a Nigerian bank or shopping app and something feels off. What bugs you the most?',
    options: [
      {
        text: 'Ugly design and confusing layout',
        description: 'Hard-to-read text, tiny buttons, or bad colors that make you tap the wrong thing.',
        weights: { visualCreative: 5, organizationOps: 2 }
      },
      {
        text: 'Technical crash or loading failure',
        description: 'The app hanging on "Please wait", payment timing out, or network errors.',
        weights: { logicalStructural: 5, securityCuriosity: 3 }
      },
      {
        text: 'Finding errors before others do',
        description: 'You notice bugs, typos, and weird glitches that should have been caught and fixed.',
        weights: { analyticalDetail: 5, logicalStructural: 3 }
      },
      {
        text: 'Poor customer communication',
        description: 'Nobody explaining clearly what went wrong or how to get your money back.',
        weights: { peopleCommunication: 5, organizationOps: 3 }
      }
    ]
  },
  {
    id: 'scenario-ideal-output',
    category: 'Daily Vibe',
    title: 'Work that feels most satisfying',
    scenario: 'At the end of a good work day, which result would make you feel happiest?',
    options: [
      {
        text: 'A gorgeous design or graphic',
        description: 'A clean screen, logo, poster, or slide that people look at and say "this is clean".',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        text: 'A neat spreadsheet or numbers breakdown',
        description: 'Spotting sales trends, profit figures, or finding where money is leaking.',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      },
      {
        text: 'An organized workspace with zero clutter',
        description: 'Tidying up meeting schedules, emails, and to-do lists so everything flows smoothly.',
        weights: { organizationOps: 5, peopleCommunication: 4 }
      },
      {
        text: 'A working app feature or automated shortcut',
        description: 'Building something that runs by itself and saves hours of manual effort.',
        weights: { logicalStructural: 5, analyticalDetail: 3 }
      }
    ]
  },
  {
    id: 'scenario-collaboration-style',
    category: 'Work Style',
    title: 'How you like to work',
    scenario: 'What kind of work environment feels most natural for you?',
    options: [
      {
        text: 'Quiet focus behind my screen',
        description: 'Few or no meetings. Just me, my screen, and figuring things out.',
        weights: { logicalStructural: 4, analyticalDetail: 4, securityCuriosity: 3 }
      },
      {
        text: 'Chatting, organizing, and helping people',
        description: 'Connecting with clients, answering questions, and coordinating team tasks.',
        weights: { peopleCommunication: 5, organizationOps: 4 }
      },
      {
        text: 'Creative visual styling with quick feedback',
        description: 'Designing layouts, picking colors, and showing people how things look.',
        weights: { visualCreative: 4, peopleCommunication: 3 }
      },
      {
        text: 'Checking safety and catching red flags',
        description: 'Spotting scams, verifying links, and making sure accounts are safe.',
        weights: { securityCuriosity: 5, analyticalDetail: 4 }
      }
    ]
  },
  {
    id: 'scenario-learning-project',
    category: 'Weekend Challenge',
    title: 'Fun project pick',
    scenario: 'If you had 2 free days and fast internet to try one thing, what sounds most exciting?',
    options: [
      {
        text: 'Design a clean food or ride app on your screen',
        description: 'Pick colors, draw buttons, and map out what the app should look like.',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        text: 'Create a viral content plan for TikTok, Instagram or X',
        description: 'Write catchy video hooks, memes, and posts that get people engaging.',
        weights: { peopleCommunication: 5, visualCreative: 3 }
      },
      {
        text: 'Analyze market food prices to find the best deals',
        description: 'Put numbers into a sheet and spot which days are cheapest to shop.',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      },
      {
        text: 'Set up an automated assistant system for a busy boss',
        description: 'Organize calendars, auto-replies, and clean notes using smart tools.',
        weights: { organizationOps: 5, peopleCommunication: 3 }
      }
    ]
  }
];

export function calculateNicheRecommendation(submission: FullAssessmentSubmission): RecommendationResult {
  const { biodata, constraints, aptitude, qualitative } = submission;

  const scoredNiches = ALL_NICHES.map((niche) => {
    let score = 50; // Base score

    // 1. Aptitude trait alignment (Max 35 pts)
    const traitKeys: (keyof typeof aptitude)[] = [
      'visualCreative',
      'logicalStructural',
      'peopleCommunication',
      'analyticalDetail',
      'organizationOps',
      'securityCuriosity'
    ];

    let traitScoreDiff = 0;
    traitKeys.forEach((key) => {
      const userVal = aptitude[key];
      const nicheVal = niche.traitProfile[key];
      // Reward alignment
      const match = 5 - Math.abs(userVal - nicheVal);
      traitScoreDiff += match;
    });
    // normalize trait score out of 30 pts
    score += (traitScoreDiff / (traitKeys.length * 5)) * 30;

    // 2. Hardware / Device feasibility filter (Extremely important!)
    if (constraints.device === 'phone_only') {
      if (niche.supportedOnPhone) {
        score += 25; // Massive boost for feasible phone roles
      } else {
        score -= 40; // Heavy penalty for heavy laptop requirements
      }
    } else if (constraints.device === 'shared_or_cafe') {
      if (niche.supportedOnPhone) {
        score += 15;
      } else if (niche.id === 'niche-qa' || niche.id === 'niche-tech-writing') {
        score += 10;
      } else {
        score -= 15;
      }
    } else {
      // Laptop owner - all technical & creative options fully viable
      if (niche.deviceRequirement === 'laptop_required') {
        score += 12;
      }
    }

    // 3. Coding Appetite Filter
    if (constraints.codingAppetite === 'no_code_please') {
      if (niche.category === 'technical') {
        if (niche.id === 'niche-qa') {
          score -= 5; // QA has manual entry
        } else {
          score -= 35; // Remove or downgrade hard code niches
        }
      } else {
        score += 15; // Boost non-technical
      }
    } else if (constraints.codingAppetite === 'love_logic_math') {
      if (niche.category === 'technical') {
        score += 20;
      } else {
        score -= 10;
      }
    }

    // 4. Earning Urgency Filter
    if (constraints.earningUrgency === 'immediate_1_3_months') {
      if (niche.id === 'niche-va' || niche.id === 'niche-smm' || niche.id === 'niche-tech-writing' || niche.id === 'niche-qa') {
        score += 18;
      } else {
        score -= 15;
      }
    } else if (constraints.earningUrgency === 'long_term_mastery') {
      if (niche.id === 'niche-frontend' || niche.id === 'niche-cyber' || niche.id === 'niche-data') {
        score += 15;
      }
    }

    // 5. Time commitment filter
    if (constraints.timeWeekly === '3_to_5_hrs') {
      if (niche.id === 'niche-frontend' || niche.id === 'niche-cyber') {
        score -= 20; // Too little time for deep engineering
      } else if (niche.id === 'niche-va' || niche.id === 'niche-tech-writing') {
        score += 10;
      }
    }

    // Clamp score between 30 and 98
    const finalScore = Math.min(98, Math.max(35, Math.round(score)));

    return {
      niche,
      score: finalScore
    };
  });

  // Sort by score descending
  scoredNiches.sort((a, b) => b.score - a.score);

  const primary = scoredNiches[0];
  const secondary = scoredNiches[1] || scoredNiches[0];

  // Compose personalized rationale reflecting biodata & constraints
  const deviceText = constraints.device === 'phone_only' 
    ? 'your current smartphone-only setup' 
    : constraints.device === 'shared_or_cafe' 
    ? 'your access to a family or shared computer' 
    : 'your personal laptop access';

  const statusMap: Record<CurrentStatus, string> = {
    student_undergrad: 'as an undergraduate balancing academic commitments',
    unemployed_grad: 'as a graduate focused on establishing financial independence',
    working_non_tech: 'as a working professional transitioning smoothly into tech',
    self_employed: 'with your existing entrepreneurial and self-driven background',
    secondary_school: 'starting early with foundational digital skills'
  };

  const statusText = statusMap[biodata.status] || 'at your current career stage';

  const urgencyText = constraints.earningUrgency === 'immediate_1_3_months'
    ? 'offers one of the quickest paths to client freelance earnings without 6 months of prerequisite theory'
    : constraints.earningUrgency === 'steady_4_6_months'
    ? 'provides a balanced pathway allowing you to build an impressive portfolio within 4 to 6 months'
    : 'aligns with your commitment to deep technical mastery and high-ceiling career longevity';

  const rationale = `Based on your diagnostic profile ${statusText}, ${primary.niche.title} is your strongest match (${primary.score}% fit). It works effectively with ${deviceText} and ${urgencyText}. Your problem-solving responses highlighted strong ${
    primary.niche.category === 'creative' 
      ? 'visual discernment and human-centered design instincts' 
      : primary.niche.category === 'technical' 
      ? 'structured analytical logic and investigative problem solving' 
      : 'organizational discipline and clear communication capabilities'
  }.`;

  const feasibilityNotes: string[] = [];

  if (constraints.device === 'phone_only') {
    if (primary.niche.supportedOnPhone) {
      feasibilityNotes.push('100% Smartphone Feasible: You can execute all Day-One tasks and beginner client templates on mobile using Google Docs, Notion Mobile, or Canva Mobile.');
    } else {
      feasibilityNotes.push('Hardware Note: While this role matches your aptitude, advanced practice will require laptop access. Begin with theory and paper wireframing before borrowing or securing a laptop.');
    }
  } else {
    feasibilityNotes.push('Hardware Ready: Your laptop access gives you full freedom to run local developer tools, Figma, and databases without limitations.');
  }

  if (constraints.powerData === 'night_data_or_powerbank') {
    feasibilityNotes.push('Data-Conscious Learning: Our curated resources emphasize offline docs and downloadable text guides so you can preserve your data bundles and night plans.');
  }

  if (biodata.gender === 'female') {
    feasibilityNotes.push('Community Boost: You are eligible for specialized mentorship and scholarship tracks through She Code Africa and Women in Tech Nigeria.');
  }

  return {
    primaryNiche: primary.niche,
    matchScore: primary.score,
    rationale,
    constraintFeasibilityNotes: feasibilityNotes,
    secondaryNiche: secondary.niche,
    secondaryMatchScore: secondary.score,
    submission
  };
}
