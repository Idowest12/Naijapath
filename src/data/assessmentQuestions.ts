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
  { value: 'under_18', label: 'Under 18', sublabel: 'Secondary school student or early starter' },
  { value: '18_22', label: '18 - 22', sublabel: 'Undergraduate student or fresh school leaver' },
  { value: '23_27', label: '23 - 27', sublabel: 'Graduate, job seeker, or early-career builder' },
  { value: '28_34', label: '28 - 34', sublabel: 'Career switcher or mid-career professional' },
  { value: '35_plus', label: '35+', sublabel: 'Seasoned professional pivoting into digital skills' },
];

export const GENDER_OPTIONS: BiodataQuestionOption<Gender>[] = [
  { value: 'female', label: 'Female', sublabel: 'Unlocks tailored female-in-tech grants & communities' },
  { value: 'male', label: 'Male' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export const STATUS_OPTIONS: BiodataQuestionOption<CurrentStatus>[] = [
  { value: 'student_undergrad', label: 'Undergraduate Student', sublabel: 'Balancing school lectures, tests & semesters' },
  { value: 'unemployed_grad', label: 'Recent Graduate / Job Seeker', sublabel: 'Actively searching for income & independence' },
  { value: 'working_non_tech', label: 'Working a 9-to-5 (Non-Tech)', sublabel: 'In banking, retail, sales, teaching, or admin' },
  { value: 'self_employed', label: 'Self-Employed / Trader / Hustling', sublabel: 'Running a small business or trade' },
  { value: 'secondary_school', label: 'Secondary School Leaver', sublabel: 'Awaiting university or choosing alternative routes' },
];

export const REGION_OPTIONS: BiodataQuestionOption<NigerianRegion>[] = [
  { value: 'lagos', label: 'Lagos State', sublabel: 'Highest density of hubs & tech meetups' },
  { value: 'abuja', label: 'Abuja / FCT', sublabel: 'Growing tech ecosystem & public sector' },
  { value: 'south_west', label: 'South-West (Oyo, Ogun, Osun, Ondo, Ekiti)' },
  { value: 'south_south', label: 'South-South (Rivers, Edo, Delta, etc.)' },
  { value: 'south_east', label: 'South-East (Enugu, Anambra, Imo, etc.)' },
  { value: 'north', label: 'Northern States (Kaduna, Kano, Jos, etc.)' },
  { value: 'outside_nigeria', label: 'Outside Nigeria / Diaspora' },
];

export const DEVICE_OPTIONS: BiodataQuestionOption<DeviceType>[] = [
  { value: 'phone_only', label: 'Smartphone Only', sublabel: 'No laptop right now; everything must start on mobile' },
  { value: 'shared_or_cafe', label: 'Family PC / Shared PC', sublabel: 'Shared access to a desktop or laptop at home' },
  { value: 'laptop_basic', label: 'Basic Laptop', sublabel: 'Everyday laptop for browsing and core digital tools' },
  { value: 'laptop_power', label: 'High-Performance Laptop', sublabel: 'Fast computer capable of heavy multitasking and intensive tools' },
];

export const TIME_OPTIONS: BiodataQuestionOption<TimeAvailable>[] = [
  { value: '3_to_5_hrs', label: '3 - 5 Hours / Week', sublabel: 'Casual spare-time explorer (under 1 hr/day)' },
  { value: '6_to_10_hrs', label: '6 - 10 Hours / Week', sublabel: 'Consistent habit (1 - 2 hrs/day)' },
  { value: '11_to_20_hrs', label: '11 - 20 Hours / Week', sublabel: 'Serious dedicated focus (2 - 3 hrs/day)' },
  { value: '20_plus_hrs', label: '20+ Hours / Week', sublabel: 'Full-time transition mode' },
];

export const POWER_DATA_OPTIONS: BiodataQuestionOption<PowerDataSetup>[] = [
  { value: 'night_data_or_powerbank', label: 'Powerbank Dependent', sublabel: 'Relying on powerbanks and charging when power is available' },
  { value: 'mobile_data_unsteady_power', label: 'Access to Good Internet Service', sublabel: 'Reliable internet connection with occasional power cuts' },
  { value: 'steady_light_wifi', label: 'Steady Power', sublabel: 'Consistent power via inverter, generator, or stable grid' },
];

export const CODING_APPETITE_OPTIONS: BiodataQuestionOption<CodingAppetite>[] = [
  { value: 'no_code_please', label: 'No Code! Keep me far from syntax errors', sublabel: 'I prefer visual, written, organizational, or human tasks' },
  { value: 'willing_to_try', label: 'Open to light logic & tools if taught practically', sublabel: 'I do not mind formulas, tools, or light scripting' },
  { value: 'love_logic_math', label: 'I enjoy deep logic, building engines & problem solving', sublabel: 'I want to build software or deep technical systems' },
];

export const EARNING_URGENCY_OPTIONS: BiodataQuestionOption<EarningUrgency>[] = [
  { value: 'immediate_1_3_months', label: 'Immediate (1 - 3 Months)', sublabel: 'I need freelance income or gigs as quickly as possible' },
  { value: 'steady_4_6_months', label: 'Balanced (4 - 6 Months)', sublabel: 'Willing to build real skills and portfolio before charging' },
  { value: 'long_term_mastery', label: 'Long-term (6 - 12+ Months)', sublabel: 'Focused on mastering a high-ceiling engineering skill' },
];

export const SCENARIO_QUESTIONS: ScenarioQuestion[] = [
  {
    id: 'scenario-app-frustration',
    category: 'Product Breakdown',
    title: 'The Daily App Frustration',
    scenario: 'You are using a Nigerian app (like a bank app or shopping site) and something goes wrong or feels clunky. What is your natural first instinct?',
    options: [
      {
        text: 'Redesign the visuals and layout',
        description: 'I get annoyed by how ugly the buttons look, poor font sizes, and confusing screen navigation.',
        weights: { visualCreative: 5, organizationOps: 2 }
      },
      {
        text: 'Figure out the technical breakdown',
        description: 'I wonder why the server timed out, what API call failed, or how the payment gateway was programmed.',
        weights: { logicalStructural: 5, securityCuriosity: 3 }
      },
      {
        text: 'Test all edge cases and find the bug',
        description: 'I try clicking other buttons to see if I can reproduce the bug and figure out why it slipped past testing.',
        weights: { analyticalDetail: 5, logicalStructural: 3 }
      },
      {
        text: 'Think about customer communication',
        description: 'I think about the thousands of confused users and want to write a crystal clear guide explaining what to do.',
        weights: { peopleCommunication: 5, organizationOps: 3 }
      }
    ]
  },
  {
    id: 'scenario-ideal-output',
    category: 'Work Output',
    title: 'Your Satisfying Daily Result',
    scenario: 'At the end of a productive 4-hour workday, which of these tangible outputs would make you feel most fulfilled?',
    options: [
      {
        text: 'A clean, beautiful interface or graphic that people can tap and admire',
        description: 'Creating visual prototypes, branding assets, or polished UI flows.',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        text: 'A clean spreadsheet or interactive dashboard showing business insights',
        description: 'Discovering why sales dropped, customer patterns, or profit trends.',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      },
      {
        text: 'An organized executive calendar, Notion workspace, and zero-inbox state',
        description: 'Bringing order to chaos and making a busy team run like clockwork.',
        weights: { organizationOps: 5, peopleCommunication: 4 }
      },
      {
        text: 'A working code feature or script that automates a painful manual task',
        description: 'Writing code that executes smoothly without error.',
        weights: { logicalStructural: 5, analyticalDetail: 3 }
      }
    ]
  },
  {
    id: 'scenario-collaboration-style',
    category: 'Work Style',
    title: 'Interpersonal Energy vs Deep Focus',
    scenario: 'How do you prefer to spend the majority of your working energy?',
    options: [
      {
        text: 'Behind the screen in deep, uninterrupted focus with data or code',
        description: 'I prefer minimal meetings and deep solitary problem solving.',
        weights: { logicalStructural: 4, analyticalDetail: 4, securityCuriosity: 3 }
      },
      {
        text: 'Coordinating with people, solving conflicts, and managing timelines',
        description: 'I love talking to clients, founders, and community members.',
        weights: { peopleCommunication: 5, organizationOps: 4 }
      },
      {
        text: 'Translating between creative visuals and practical user needs',
        description: 'A balance between independent design craft and listening to feedback.',
        weights: { visualCreative: 4, peopleCommunication: 3 }
      },
      {
        text: 'Investigating loopholes, security flaws, and double-checking safety',
        description: 'I am naturally skeptical, curious about defenses, and love finding weak links.',
        weights: { securityCuriosity: 5, analyticalDetail: 4 }
      }
    ]
  },
  {
    id: 'scenario-learning-project',
    category: 'Curiosity Spark',
    title: 'Weekend Project Challenge',
    scenario: 'If you were given 48 hours and high-speed internet to master one fun micro-project, which would you pick?',
    options: [
      {
        text: 'Design a mock mobile app for booking night buses in Lagos/Abuja',
        description: 'Mapping out screens, colors, and user touchpoints in Figma.',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        text: 'Build a social media growth plan and 10 viral hooks for a brand',
        description: 'Drafting viral Twitter threads, reels, and community engagement tactics.',
        weights: { peopleCommunication: 5, visualCreative: 3 }
      },
      {
        text: 'Analyze 5,000 rows of Nigerian food market prices to find inflation trends',
        description: 'Using Excel or SQL to find the cheapest market days and price surges.',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      },
      {
        text: 'Set up an automated digital office system for a foreign business consultant',
        description: 'Configuring Zapier, Calendly, Notion, and email sorting rules.',
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
