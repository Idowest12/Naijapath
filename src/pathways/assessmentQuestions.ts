import { 
  FullAssessmentSubmission, 
  RecommendationResult, 
  PathwayNiche,
  AgeBand,
  Gender,
  CurrentStatus,
  NigerianRegion,
  FieldOfStudy,
  ExperienceLevel,
  PrimaryInterest,
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
    icon?: string;
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
  { value: 'under_18', label: 'Under 18', sublabel: 'Secondary school student or just discovering tech' },
  { value: '18_22', label: '18 – 22', sublabel: 'In uni, polytechnic, or fresh school leaver' },
  { value: '23_27', label: '23 – 27', sublabel: 'Recent graduate, serving (NYSC), or early in work' },
  { value: '28_34', label: '28 – 34', sublabel: 'Switching career or adding high-paying tech skills' },
  { value: '35_plus', label: '35 and above', sublabel: 'Experienced professional or parent learning digital skills' },
];

export const GENDER_OPTIONS: BiodataQuestionOption<Gender>[] = [
  { value: 'female', label: 'Female', sublabel: 'Unlocks female-in-tech grants & fellowships' },
  { value: 'male', label: 'Male' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export const STATUS_OPTIONS: BiodataQuestionOption<CurrentStatus>[] = [
  { value: 'student_undergrad', label: 'Student in School', sublabel: 'Juggling lectures, assignments, and campus life' },
  { value: 'unemployed_grad', label: 'Recent Graduate / Job Hunting', sublabel: 'Done with school or NYSC, ready to build income' },
  { value: 'working_non_tech', label: 'Working a 9-to-5 (Non-Tech)', sublabel: 'In banking, teaching, sales, or civil service — looking to pivot' },
  { value: 'self_employed', label: 'Business Owner / Hustling', sublabel: 'Running my own trade or business, wanting tech leverage' },
  { value: 'secondary_school', label: 'Finished Secondary School', sublabel: 'Waiting for JAMB/admission or exploring tech first' },
];

export const REGION_OPTIONS: BiodataQuestionOption<NigerianRegion>[] = [
  { value: 'lagos', label: 'Lagos State (Yaba, Ikeja, Lekki & major hubs)' },
  { value: 'abuja', label: 'Abuja / FCT (Central tech ecosystem & hubs)' },
  { value: 'south_west', label: 'South-West (Oyo / Ibadan, Ogun, Osun, Ondo, Ekiti)' },
  { value: 'south_south', label: 'South-South (Rivers / Port Harcourt, Edo / Benin, Delta, etc.)' },
  { value: 'south_east', label: 'South-East (Enugu, Anambra, Imo, Abia, Ebonyi)' },
  { value: 'north', label: 'Northern States (Kaduna, Kano, Jos / Plateau, etc.)' },
  { value: 'outside_nigeria', label: 'Living outside Nigeria / Abroad' },
];

export const FIELD_OF_STUDY_OPTIONS: BiodataQuestionOption<FieldOfStudy>[] = [
  { value: 'arts_humanities', label: 'Arts & Humanities', sublabel: 'Mass Comm, Literature, Languages, History, Law, Philosophy, Creative Arts' },
  { value: 'sciences_health', label: 'Sciences & Healthcare', sublabel: 'Biology, Chemistry, Physics, Biochemistry, Nursing, Medicine, Agriculture' },
  { value: 'commercial_business', label: 'Commercial & Business', sublabel: 'Accounting, Business Admin, Economics, Banking & Finance, Marketing' },
  { value: 'engineering_tech', label: 'Engineering & Technology', sublabel: 'Electrical, Mechanical, Civil, Computer Science / IT, Polytechnic diplomas' },
  { value: 'social_sciences_education', label: 'Social Sciences & Education', sublabel: 'Sociology, Political Science, Psychology, Education, Public Admin' },
  { value: 'secondary_or_other', label: 'Secondary School / Self-Taught', sublabel: 'Finished SSCE, waiting for admission, or building skills independently' },
];

export const EXPERIENCE_LEVEL_OPTIONS: BiodataQuestionOption<ExperienceLevel>[] = [
  { value: 'novice_total_beginner', label: 'Complete Novice (Total Beginner)', sublabel: 'Tech is brand new to me — I don’t know where to start and want a welcoming path' },
  { value: 'intermediate_career_changer', label: 'Career Changer / Intermediate', sublabel: 'Working in non-tech or dabbled in digital basics, ready to pivot completely' },
  { value: 'skill_builder_specializing', label: 'Skill Builder Seeking Specialization', sublabel: 'I know basic computer or digital tools and want to master a high-income specialty' },
];

export const PRIMARY_INTEREST_OPTIONS: BiodataQuestionOption<PrimaryInterest>[] = [
  { value: 'colors_visual_design', label: 'Playing with Colors, Art & Styling', sublabel: 'Flyers, photography, video edits, arranging visuals, and choosing aesthetics' },
  { value: 'investigating_puzzles', label: 'Solving Riddles & Glitches', sublabel: 'Brain teasers, taking gadgets apart, finding mistakes, and testing what broke' },
  { value: 'organizing_systems', label: 'Organizing & Planning Systems', sublabel: 'Managing schedules, planning events, keeping checklists, and sorting chaos' },
  { value: 'communicating_helping', label: 'Talking, Advising & Helping People', sublabel: 'Explaining ideas simply, counseling friends, writing posts, or teaching others' },
  { value: 'numbers_money', label: 'Working with Numbers & Budgets', sublabel: 'Tracking spending, calculating profits, managing money, and spotting bargains' },
  { value: 'building_gadgets', label: 'Building Things & Gadget Mechanics', sublabel: 'Figuring out how software and machines work under the hood and assembling parts' },
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
  { value: 'no_code_please', label: 'Keep it 100% visual, creative, or people-focused! (No code)', sublabel: 'I prefer design, writing, managing, organizing, or talking to people' },
  { value: 'willing_to_try', label: 'Open to simple tools & light formulas', sublabel: 'I do not mind Excel formulas, Canva, Notion, or simple setups' },
  { value: 'love_logic_math', label: 'I love puzzles, logic & want to build real software!', sublabel: 'Excited to write real code, create interactive apps, and build systems' },
];

export const EARNING_URGENCY_OPTIONS: BiodataQuestionOption<EarningUrgency>[] = [
  { value: 'immediate_1_3_months', label: 'Need money fast (1 - 3 months)', sublabel: 'Want gigs or freelance jobs as soon as possible' },
  { value: 'steady_4_6_months', label: 'Balanced (4 - 6 months)', sublabel: 'Ready to build solid skills and samples first' },
  { value: 'long_term_mastery', label: 'Long game (6 - 12+ months)', sublabel: 'Focused on mastering a high-paying skill without rushing' },
];

export const SCENARIO_QUESTIONS: ScenarioQuestion[] = [
  {
    id: 'scenario-colors-visuals',
    category: 'Visual & Aesthetics',
    title: 'When looking at an app or flyer, what catches your eye first?',
    scenario: 'Pick what your eye and mind naturally notice right away:',
    options: [
      {
        icon: 'palette',
        text: 'Colors & Visual Style',
        description: 'Harmonious palettes, font beauty, modern styling',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        icon: 'layout',
        text: 'Neat & Clean Layout',
        description: 'Clean spacing, organized sections, zero clutter',
        weights: { organizationOps: 5, visualCreative: 3 }
      },
      {
        icon: 'message',
        text: 'The Words & Offer',
        description: 'Catchy headlines that hook attention and emotion',
        weights: { peopleCommunication: 5, visualCreative: 2 }
      },
      {
        icon: 'search',
        text: 'Spotting Small Flaws',
        description: 'Noticing typos, crooked borders, or errors others miss',
        weights: { analyticalDetail: 5, visualCreative: 2 }
      },
      {
        icon: 'cpu',
        text: 'How It Works Behind',
        description: 'Curious how interactive clicks and features operate',
        weights: { logicalStructural: 5, analyticalDetail: 3 }
      }
    ]
  },
  {
    id: 'scenario-everyday-troubleshooting',
    category: 'Everyday Logic',
    title: 'A gadget or phone stops working. How do you tackle it?',
    scenario: 'Your natural instinct to solve problems:',
    options: [
      {
        icon: 'search',
        text: 'Methodical Detective',
        description: 'Testing one button or setting at a time patiently',
        weights: { analyticalDetail: 5, securityCuriosity: 4 }
      },
      {
        icon: 'cpu',
        text: 'System Connections',
        description: 'Seeing how parts, power, or logic link together',
        weights: { logicalStructural: 5, analyticalDetail: 4 }
      },
      {
        icon: 'youtube',
        text: 'Follow Step-by-Step Guides',
        description: 'Searching YouTube or Google for proven solutions',
        weights: { organizationOps: 4, peopleCommunication: 3 }
      },
      {
        icon: 'users',
        text: 'Calm & Listen',
        description: 'Asking what happened and talking through it patiently',
        weights: { peopleCommunication: 5, organizationOps: 3 }
      },
      {
        icon: 'sparkles',
        text: 'Clean, Reset & Organize',
        description: 'Tidying storage, resetting clutter so it runs fresh',
        weights: { organizationOps: 5, visualCreative: 3 }
      }
    ]
  },
  {
    id: 'scenario-flow-state',
    category: 'Flow State',
    title: 'What activity makes 3 hours feel like 10 minutes?',
    scenario: 'When you are in your zone, what are you usually doing?',
    options: [
      {
        icon: 'palette',
        text: 'Colors, Art & Styling',
        description: 'Editing photos/videos, sketching, arranging aesthetics',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        icon: 'brain',
        text: 'Puzzles & Brain Teasers',
        description: 'Cracking riddles, strategy games, untangling dilemmas',
        weights: { logicalStructural: 5, analyticalDetail: 4 }
      },
      {
        icon: 'message',
        text: 'Advising & Talking',
        description: 'Heart-to-heart counseling, storytelling, mentoring',
        weights: { peopleCommunication: 5, organizationOps: 2 }
      },
      {
        icon: 'list',
        text: 'Organizing & Checklists',
        description: 'Tidying spaces, filing, planning detailed schedules',
        weights: { organizationOps: 5, analyticalDetail: 2 }
      },
      {
        icon: 'coins',
        text: 'Numbers & Budgets',
        description: 'Tracking money, calculating profits, finding deals',
        weights: { analyticalDetail: 5, organizationOps: 4 }
      },
      {
        icon: 'shield',
        text: 'Safety & Digital Privacy',
        description: 'Spotting scams, securing accounts, testing privacy',
        weights: { securityCuriosity: 5, analyticalDetail: 4 }
      }
    ]
  },
  {
    id: 'scenario-confusion-roadblock',
    category: 'Learning Style',
    title: 'You hit a confusing roadblock learning something new. What helps most?',
    scenario: 'How your brain absorbs tricky concepts best:',
    options: [
      {
        icon: 'palette',
        text: 'Visual Picture or Demo',
        description: 'Seeing what the finished result looks like first',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        icon: 'list',
        text: 'Numbered Checklist',
        description: 'Step 1, Step 2, Step 3 in plain everyday language',
        weights: { organizationOps: 5, peopleCommunication: 3 }
      },
      {
        icon: 'wrench',
        text: 'Hands-on Tinkering',
        description: 'Taking it apart and figuring out the rules by doing',
        weights: { logicalStructural: 5, analyticalDetail: 5 }
      },
      {
        icon: 'users',
        text: 'Talking It Out Loud',
        description: 'Bouncing questions with a partner or learning buddy',
        weights: { peopleCommunication: 5, organizationOps: 3 }
      },
      {
        icon: 'search',
        text: 'Double-Checking Details',
        description: 'Inspecting each piece carefully to ensure zero flaws',
        weights: { securityCuriosity: 5, analyticalDetail: 4 }
      }
    ]
  },
  {
    id: 'scenario-venture-launch',
    category: 'Team Strengths',
    title: 'Starting a side hustle with 3 friends. What is your natural role?',
    scenario: 'Pick where you feel most energized contributing:',
    options: [
      {
        icon: 'palette',
        text: 'Brand & Visual Stylist',
        description: 'Designing logos, color themes, flyers, packaging',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        icon: 'cpu',
        text: 'Digital Tools Builder',
        description: 'Setting up ordering tools, automated notifications',
        weights: { logicalStructural: 5, organizationOps: 4 }
      },
      {
        icon: 'message',
        text: 'Community & Growth',
        description: 'Talking to customers on WhatsApp, writing catchy posts',
        weights: { peopleCommunication: 5, visualCreative: 2 }
      },
      {
        icon: 'coins',
        text: 'Money & Margin Tracker',
        description: 'Accounting for every Naira, calculating profits',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      },
      {
        icon: 'list',
        text: 'Operations & Dispatch',
        description: 'Managing delivery schedules, keeping orders on time',
        weights: { organizationOps: 5, peopleCommunication: 4 }
      },
      {
        icon: 'shield',
        text: 'Quality & Anti-Fraud',
        description: 'Verifying payments, inspecting orders, preventing scams',
        weights: { securityCuriosity: 5, analyticalDetail: 4 }
      }
    ]
  },
  {
    id: 'scenario-weekend-project',
    category: 'Free Curiosity',
    title: 'Two free days and unlimited internet. What fun project do you pick?',
    scenario: 'Zero exams, zero pressure — what sounds exciting to explore?',
    options: [
      {
        icon: 'palette',
        text: 'App Screens & Branding',
        description: 'Designing modern screens and brand colors in Figma',
        weights: { visualCreative: 5, peopleCommunication: 3 }
      },
      {
        icon: 'cpu',
        text: 'Code an Interactive App',
        description: 'Writing code that creates live clickable features',
        weights: { logicalStructural: 5, visualCreative: 3 }
      },
      {
        icon: 'rocket',
        text: 'Social Ads & Marketing',
        description: 'Learning how to attract buyers and run viral campaigns',
        weights: { peopleCommunication: 5, analyticalDetail: 3 }
      },
      {
        icon: 'coins',
        text: 'Spreadsheets & Dashboards',
        description: 'Turning messy data into colorful profit charts',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      },
      {
        icon: 'shield',
        text: 'Cyber Defense & Security',
        description: 'Learning how security guardians protect accounts',
        weights: { securityCuriosity: 5, analyticalDetail: 4 }
      },
      {
        icon: 'book',
        text: 'Teaching & Mini-Courses',
        description: 'Creating short helpful guides that explain skills simply',
        weights: { peopleCommunication: 5, organizationOps: 4 }
      }
    ]
  }
];

export function calculateNicheRecommendation(submission: FullAssessmentSubmission): RecommendationResult {
  const { biodata, constraints, aptitude, qualitative } = submission;

  // NLP Semantic Keyword Extraction from Open-Ended Answer
  const achievementText = (qualitative.proudAchievement || '').toLowerCase();
  const detectedKeywords: string[] = [];

  const semanticBoosts: Record<string, number> = {
    'niche-va': 0,
    'niche-smm': 0,
    'niche-tech-writing': 0,
    'niche-uiux': 0,
    'niche-data': 0,
    'niche-frontend': 0,
    'niche-backend': 0,
    'niche-fullstack': 0,
    'niche-qa': 0,
    'niche-cyber': 0,
    'niche-pm': 0,
    'niche-digital-marketing': 0,
    'niche-branding': 0,
    'niche-edtech': 0,
  };

  // Keyword dictionary
  const keywordMappings: { words: string[]; niches: string[]; label: string }[] = [
    {
      words: ['backend', 'api', 'server', 'database', 'sql', 'postgres', 'mongo', 'node', 'express', 'django', 'fastapi', 'endpoint', 'auth', 'webhook', 'cron', 'devops'],
      niches: ['niche-backend', 'niche-fullstack'],
      label: 'Backend & API Architecture'
    },
    {
      words: ['fullstack', 'full stack', 'web dev', 'web developer', 'website', 'software engineer', 'software development', 'react', 'nextjs', 'next.js', 'vue', 'full-stack'],
      niches: ['niche-fullstack', 'niche-frontend', 'niche-backend'],
      label: 'Full-Stack & Web Engineering'
    },
    {
      words: ['sheet', 'excel', 'numbers', 'budget', 'money', 'calculate', 'count', 'sales', 'profit', 'data', 'reconcil', 'audit', 'records'],
      niches: ['niche-data'],
      label: 'Financial & Data Tracking'
    },
    {
      words: ['flyer', 'design', 'canva', 'poster', 'video', 'edit', 'draw', 'logo', 'layout', 'graphics', 'colors', 'art', 'palette', 'brand'],
      niches: ['niche-branding', 'niche-uiux', 'niche-smm'],
      label: 'Visual Design & Branding'
    },
    {
      words: ['ads', 'campaign', 'meta', 'traffic', 'marketing', 'funnel', 'leads', 'seo', 'conversions', 'audience', 'promotion'],
      niches: ['niche-digital-marketing', 'niche-smm'],
      label: 'Digital Marketing & Growth'
    },
    {
      words: ['teach', 'taught', 'tutor', 'student', 'lesson', 'course', 'class', 'school', 'explain', 'train', 'curriculum', 'education'],
      niches: ['niche-edtech', 'niche-tech-writing'],
      label: 'Teaching & Digital Education'
    },
    {
      words: ['organize', 'schedule', 'whatsapp', 'orders', 'event', 'meeting', 'plan', 'coordinate', 'assistant', 'calendar', 'deliver', 'logistics', 'vendor'],
      niches: ['niche-va', 'niche-pm'],
      label: 'Operations & Coordination'
    },
    {
      words: ['wrote', 'write', 'blog', 'guide', 'manual', 'tutorial', 'explain', 'caption', 'article', 'story', 'letter', 'documentation', 'pdf'],
      niches: ['niche-tech-writing', 'niche-smm'],
      label: 'Writing & Clear Documentation'
    },
    {
      words: ['fix', 'repair', 'phone', 'laptop', 'troubleshoot', 'glitch', 'error', 'bug', 'reset', 'setting', 'install', 'test'],
      niches: ['niche-qa', 'niche-cyber'],
      label: 'Technical Troubleshooting'
    },
    {
      words: ['code', 'python', 'javascript', 'html', 'css', 'app', 'software', 'bot', 'automate', 'formula', 'program', 'coding'],
      niches: ['niche-frontend', 'niche-backend', 'niche-fullstack', 'niche-data'],
      label: 'Logical Coding & Software'
    }
  ];

  keywordMappings.forEach(({ words, niches, label }) => {
    const matched = words.some(w => achievementText.includes(w));
    if (matched) {
      detectedKeywords.push(label);
      niches.forEach(nId => {
        if (semanticBoosts[nId] !== undefined) {
          semanticBoosts[nId] += 12;
        }
      });
    }
  });

  // Target Industry Alignment
  const targetIndustry = qualitative.targetIndustry || '';
  if (targetIndustry.includes('Fintech')) {
    semanticBoosts['niche-backend'] += 14;
    semanticBoosts['niche-fullstack'] += 12;
    semanticBoosts['niche-data'] += 8;
    semanticBoosts['niche-frontend'] += 8;
    semanticBoosts['niche-qa'] += 4;
    semanticBoosts['niche-cyber'] += 8;
  } else if (targetIndustry.includes('Software') || targetIndustry.includes('SaaS') || targetIndustry.includes('Tech')) {
    semanticBoosts['niche-fullstack'] += 16;
    semanticBoosts['niche-backend'] += 16;
    semanticBoosts['niche-frontend'] += 14;
    semanticBoosts['niche-uiux'] += 10;
  } else if (targetIndustry.includes('E-commerce') || targetIndustry.includes('Logistics')) {
    semanticBoosts['niche-va'] += 8;
    semanticBoosts['niche-digital-marketing'] += 8;
    semanticBoosts['niche-fullstack'] += 8;
    semanticBoosts['niche-pm'] += 8;
  } else if (targetIndustry.includes('Creator') || targetIndustry.includes('Media')) {
    semanticBoosts['niche-smm'] += 10;
    semanticBoosts['niche-branding'] += 10;
    semanticBoosts['niche-uiux'] += 8;
  } else if (targetIndustry.includes('Digital Marketing') || targetIndustry.includes('Growth')) {
    semanticBoosts['niche-digital-marketing'] += 18;
    semanticBoosts['niche-smm'] += 10;
    semanticBoosts['niche-branding'] += 8;
  } else if (targetIndustry.includes('Branding') || targetIndustry.includes('Creative')) {
    semanticBoosts['niche-branding'] += 20;
    semanticBoosts['niche-uiux'] += 12;
    semanticBoosts['niche-smm'] += 8;
  } else if (targetIndustry.includes('Education') || targetIndustry.includes('EdTech') || targetIndustry.includes('Learning')) {
    semanticBoosts['niche-edtech'] += 20;
    semanticBoosts['niche-tech-writing'] += 10;
    semanticBoosts['niche-va'] += 6;
  } else if (targetIndustry.includes('Foreign') || targetIndustry.includes('Remote')) {
    semanticBoosts['niche-backend'] += 12;
    semanticBoosts['niche-fullstack'] += 12;
    semanticBoosts['niche-va'] += 9;
    semanticBoosts['niche-digital-marketing'] += 9;
    semanticBoosts['niche-tech-writing'] += 8;
    semanticBoosts['niche-branding'] += 7;
  }

  // Preferred Daily Activity Direct Alignment
  const dailyPref = qualitative.preferredDailyActivity || '';
  if (dailyPref === 'backend_dev' || dailyPref === 'backend_systems') {
    semanticBoosts['niche-backend'] += 26;
    semanticBoosts['niche-fullstack'] += 16;
    semanticBoosts['niche-data'] += 8;
  } else if (dailyPref === 'fullstack_dev' || dailyPref === 'fullstack_building') {
    semanticBoosts['niche-fullstack'] += 26;
    semanticBoosts['niche-frontend'] += 16;
    semanticBoosts['niche-backend'] += 16;
  } else if (dailyPref === 'frontend_dev' || dailyPref === 'frontend_coding') {
    semanticBoosts['niche-frontend'] += 26;
    semanticBoosts['niche-fullstack'] += 14;
    semanticBoosts['niche-uiux'] += 8;
  } else if (dailyPref === 'mobile_building') {
    semanticBoosts['niche-frontend'] += 20;
    semanticBoosts['niche-fullstack'] += 18;
    semanticBoosts['niche-uiux'] += 10;
  } else if (dailyPref === 'digital_marketing') {
    semanticBoosts['niche-digital-marketing'] += 24;
    semanticBoosts['niche-smm'] += 10;
  } else if (dailyPref === 'branding') {
    semanticBoosts['niche-branding'] += 24;
    semanticBoosts['niche-uiux'] += 12;
  } else if (dailyPref === 'design') {
    semanticBoosts['niche-uiux'] += 20;
    semanticBoosts['niche-branding'] += 12;
  } else if (dailyPref === 'education') {
    semanticBoosts['niche-edtech'] += 24;
    semanticBoosts['niche-tech-writing'] += 10;
  } else if (dailyPref === 'writing') {
    semanticBoosts['niche-tech-writing'] += 20;
    semanticBoosts['niche-edtech'] += 8;
  } else if (dailyPref === 'operations') {
    semanticBoosts['niche-va'] += 20;
    semanticBoosts['niche-pm'] += 12;
  } else if (dailyPref === 'data') {
    semanticBoosts['niche-data'] += 22;
  } else if (dailyPref === 'testing_security') {
    semanticBoosts['niche-qa'] += 20;
    semanticBoosts['niche-cyber'] += 18;
  } else if (dailyPref === 'coding') {
    semanticBoosts['niche-fullstack'] += 18;
    semanticBoosts['niche-backend'] += 18;
    semanticBoosts['niche-frontend'] += 18;
  }

  // Experience Level Alignment
  const expLevel = biodata.experienceLevel || '';
  if (expLevel === 'novice_total_beginner') {
    semanticBoosts['niche-uiux'] += 14;
    semanticBoosts['niche-va'] += 14;
    semanticBoosts['niche-tech-writing'] += 14;
    semanticBoosts['niche-smm'] += 12;
    semanticBoosts['niche-branding'] += 12;
    semanticBoosts['niche-frontend'] += 10;
  } else if (expLevel === 'intermediate_career_changer') {
    semanticBoosts['niche-data'] += 14;
    semanticBoosts['niche-pm'] += 14;
    semanticBoosts['niche-digital-marketing'] += 14;
    semanticBoosts['niche-qa'] += 12;
    semanticBoosts['niche-uiux'] += 10;
  } else if (expLevel === 'skill_builder_specializing') {
    semanticBoosts['niche-fullstack'] += 16;
    semanticBoosts['niche-backend'] += 16;
    semanticBoosts['niche-cyber'] += 16;
    semanticBoosts['niche-data'] += 12;
    semanticBoosts['niche-qa'] += 10;
  }

  // Field of Study Alignment
  const study = biodata.fieldOfStudy || '';
  if (study === 'arts_humanities') {
    semanticBoosts['niche-branding'] += 16;
    semanticBoosts['niche-uiux'] += 14;
    semanticBoosts['niche-tech-writing'] += 16;
    semanticBoosts['niche-smm'] += 14;
    semanticBoosts['niche-digital-marketing'] += 10;
  } else if (study === 'sciences_health') {
    semanticBoosts['niche-data'] += 16;
    semanticBoosts['niche-backend'] += 12;
    semanticBoosts['niche-cyber'] += 14;
    semanticBoosts['niche-qa'] += 12;
    semanticBoosts['niche-fullstack'] += 10;
  } else if (study === 'commercial_business') {
    semanticBoosts['niche-data'] += 18;
    semanticBoosts['niche-pm'] += 16;
    semanticBoosts['niche-digital-marketing'] += 14;
    semanticBoosts['niche-va'] += 12;
  } else if (study === 'engineering_tech') {
    semanticBoosts['niche-fullstack'] += 16;
    semanticBoosts['niche-backend'] += 16;
    semanticBoosts['niche-frontend'] += 14;
    semanticBoosts['niche-cyber'] += 14;
    semanticBoosts['niche-qa'] += 12;
  } else if (study === 'social_sciences_education') {
    semanticBoosts['niche-edtech'] += 18;
    semanticBoosts['niche-tech-writing'] += 14;
    semanticBoosts['niche-pm'] += 12;
    semanticBoosts['niche-va'] += 12;
    semanticBoosts['niche-smm'] += 10;
  } else if (study === 'secondary_or_other') {
    semanticBoosts['niche-uiux'] += 10;
    semanticBoosts['niche-frontend'] += 10;
    semanticBoosts['niche-va'] += 12;
    semanticBoosts['niche-branding'] += 10;
    semanticBoosts['niche-smm'] += 10;
  }

  // Primary Natural Interest / Hobby Alignment
  const interest = biodata.primaryInterest || '';
  if (interest === 'colors_visual_design') {
    semanticBoosts['niche-uiux'] += 22;
    semanticBoosts['niche-branding'] += 24;
    semanticBoosts['niche-frontend'] += 12;
    semanticBoosts['niche-smm'] += 10;
  } else if (interest === 'investigating_puzzles') {
    semanticBoosts['niche-qa'] += 22;
    semanticBoosts['niche-cyber'] += 22;
    semanticBoosts['niche-backend'] += 18;
    semanticBoosts['niche-fullstack'] += 14;
  } else if (interest === 'organizing_systems') {
    semanticBoosts['niche-va'] += 22;
    semanticBoosts['niche-pm'] += 20;
    semanticBoosts['niche-data'] += 10;
  } else if (interest === 'communicating_helping') {
    semanticBoosts['niche-tech-writing'] += 20;
    semanticBoosts['niche-smm'] += 18;
    semanticBoosts['niche-digital-marketing'] += 16;
    semanticBoosts['niche-edtech'] += 18;
  } else if (interest === 'numbers_money') {
    semanticBoosts['niche-data'] += 24;
    semanticBoosts['niche-digital-marketing'] += 12;
    semanticBoosts['niche-backend'] += 10;
  } else if (interest === 'building_gadgets') {
    semanticBoosts['niche-fullstack'] += 22;
    semanticBoosts['niche-backend'] += 18;
    semanticBoosts['niche-frontend'] += 18;
    semanticBoosts['niche-cyber'] += 12;
  }

  // Trait scoring per niche using Signature Resonance
  const scoredNiches = ALL_NICHES.map((niche) => {
    // 1. Cognitive Aptitude Fit (0 - 100)
    const traitKeys: (keyof typeof aptitude)[] = [
      'visualCreative',
      'logicalStructural',
      'peopleCommunication',
      'analyticalDetail',
      'organizationOps',
      'securityCuriosity'
    ];

    let totalNicheWeight = 0;
    let earnedResonance = 0;

    traitKeys.forEach((key) => {
      const userVal = aptitude[key]; // 1 to 5
      const nicheVal = niche.traitProfile[key]; // 1 to 5
      
      // Signature trait weighting: higher niche traits matter substantially more
      const weight = nicheVal;
      totalNicheWeight += weight * 5;

      const diff = nicheVal - userVal;
      let traitContribution = userVal * weight;
      if (diff > 2) {
        // Penalty if user is severely under-developed in a required trait for this niche
        traitContribution -= (diff * 2);
      }
      earnedResonance += Math.max(0, traitContribution);
    });

    let aptitudeFit = Math.round((earnedResonance / totalNicheWeight) * 100);

    // Apply semantic & preference boosts to aptitude fit
    const semanticBonus = semanticBoosts[niche.id] || 0;
    aptitudeFit = Math.min(96, Math.max(45, aptitudeFit + semanticBonus));

    // 2. Resource & Constraints Feasibility (0 - 100)
    let feasibility = 80;

    // Hardware
    if (constraints.device === 'phone_only') {
      if (niche.supportedOnPhone) {
        feasibility += 15;
      } else {
        feasibility -= 28;
      }
    } else if (constraints.device === 'shared_or_cafe') {
      if (niche.supportedOnPhone) {
        feasibility += 10;
      } else if (niche.id === 'niche-tech-writing' || niche.id === 'niche-qa') {
        feasibility += 2;
      } else {
        feasibility -= 10;
      }
    } else {
      feasibility += 12; // Laptop owner
    }

    // Coding appetite
    if (constraints.codingAppetite === 'no_code_please') {
      if (niche?.category === 'technical') {
        feasibility -= 26;
      } else {
        feasibility += 12;
      }
    } else if (constraints.codingAppetite === 'love_logic_math') {
      if (niche?.category === 'technical') {
        feasibility += 15;
      } else {
        feasibility -= 6;
      }
    }

    // Time availability
    if (constraints.timeWeekly === '3_to_5_hrs') {
      if (niche.id === 'niche-frontend' || niche.id === 'niche-backend' || niche.id === 'niche-fullstack' || niche.id === 'niche-cyber') {
        feasibility -= 18;
      } else if (niche.id === 'niche-va' || niche.id === 'niche-tech-writing' || niche.id === 'niche-smm') {
        feasibility += 8;
      }
    }

    feasibility = Math.min(98, Math.max(35, feasibility));

    // 3. Market Demand in Nigeria & Global Remote (0 - 100)
    const marketDemandMap: Record<string, number> = {
      'niche-backend': 94,
      'niche-fullstack': 93,
      'niche-digital-marketing': 92,
      'niche-data': 91,
      'niche-frontend': 90,
      'niche-branding': 89,
      'niche-va': 88,
      'niche-uiux': 88,
      'niche-edtech': 86,
      'niche-cyber': 86,
      'niche-smm': 85,
      'niche-pm': 85,
      'niche-tech-writing': 82,
      'niche-qa': 81
    };
    const marketDemand = marketDemandMap[niche.id] || 82;

    // Realistic Composite Score Calculation (Weighted: 50% Aptitude, 30% Feasibility, 20% Market)
    const compositeScore = Math.round(
      (aptitudeFit * 0.50) + 
      (feasibility * 0.30) + 
      (marketDemand * 0.20)
    );

    // Realistic score calibration: Top match will naturally fall between 75% and 91%
    const finalScore = Math.min(92, Math.max(48, compositeScore));

    return {
      niche,
      score: finalScore,
      aptitudeFit,
      feasibility,
      marketDemand
    };
  });

  // Sort by score descending
  scoredNiches.sort((a, b) => b.score - a.score);

  const primary = scoredNiches[0];
  const secondary = scoredNiches[1] || scoredNiches[0];

  // Build comparative prioritization rationale: Why Option 1 was selected over Option 2
  let edgeReason = '';
  let practicalDifferentiator = '';
  let learningVelocityNote = '';

  if (primary.niche.id === secondary.niche.id) {
    edgeReason = `Your answers showed clear, consistent alignment with ${primary.niche.title} across all problem-solving scenarios.`;
    practicalDifferentiator = `Uniquely tailored to your schedule, hardware setup, and daily learning style.`;
    learningVelocityNote = `Focusing single-mindedly on this track will accelerate your journey to your first client or role.`;
  } else {
    // Determine the key difference (hardware, aptitude spike, timeline, or practical match)
    if (!secondary.niche.supportedOnPhone && constraints.device === 'phone_only') {
      edgeReason = `${primary.niche.title} takes the lead because it can be started 100% on your smartphone from Day One, avoiding any hardware roadblock while you study.`;
    } else if (primary.aptitudeFit > secondary.aptitudeFit + 4) {
      edgeReason = `Your answers revealed stronger natural instincts for ${primary.niche.title} (${primary.aptitudeFit}% problem-solving match vs ${secondary.aptitudeFit}%). You naturally enjoy the type of day-to-day challenges found in this track.`;
    } else if (constraints.earningUrgency === 'immediate_1_3_months' && (primary?.niche?.category !== 'technical' || primary?.niche?.id === 'niche-frontend')) {
      edgeReason = `${primary.niche.title} offers a much faster path to your first freelance earnings (${primary.niche.earningHorizon}) compared to the heavier technical foundation needed for ${secondary.niche.title}.`;
    } else {
      edgeReason = `${primary.niche.title} came out on top because it provides the best all-around fit between your daily problem-solving style (${primary.aptitudeFit}%), your current hardware/time setup (${primary.feasibility}%), and real hiring demand (${primary.marketDemand}%).`;
    }

    // Clean, complete sentences without awkward truncation
    const primaryWork = primary.niche.shortTagline || primary.niche.title;
    const secondaryWork = secondary.niche.shortTagline || secondary.niche.title;
    practicalDifferentiator = `In ${primary.niche.title}, your daily work focuses on ${primaryWork.toLowerCase()}. In ${secondary.niche.title}, your focus shifts to ${secondaryWork.toLowerCase()}.`;
    
    learningVelocityNote = `In ${primary.niche.title}, you can become job-ready in about ${primary.niche.earningHorizon}. In ${secondary.niche.title}, typical readiness takes about ${secondary.niche.earningHorizon}.`;
  }

  // Craft honest caveat explaining why score isn't 100%
  let honestCaveat = '';
  if (constraints.device === 'phone_only' && !primary.niche.supportedOnPhone) {
    honestCaveat = `Why ${primary.score}% and not 100%? While your problem-solving style is a great match, your smartphone-only setup means you'll need to learn theory first and transition to a shared or borrowed PC to build portfolio projects.`;
  } else if (constraints.device === 'phone_only') {
    honestCaveat = `Why ${primary.score}% and not 100%? You can begin 100% on your phone, but creating larger multi-file client deliveries will eventually benefit from occasional computer access at a library or cafe.`;
  } else if (constraints.timeWeekly === '3_to_5_hrs') {
    honestCaveat = `Why ${primary.score}% and not 100%? With 3 to 5 hours per week, maintaining steady learning momentum requires high weekend discipline to avoid forgetting concepts between sessions.`;
  } else if (constraints.powerData === 'night_data_or_powerbank') {
    honestCaveat = `Why ${primary.score}% and not 100%? Your power and data setup requires downloading offline documentation and practicing during off-peak night bundles.`;
  } else if (constraints.codingAppetite === 'willing_to_try') {
    honestCaveat = `Why ${primary.score}% and not 100%? You are open to light tools, so you will need to build initial confidence with formulas and basic logic without rushing into overwhelming code syntax.`;
  } else {
    honestCaveat = `Why ${primary.score}% and not 100%? Every new career transition requires bridging knowledge gaps with consistent weekly project practice and portfolio feedback.`;
  }

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

  const expLevelText = biodata.experienceLevel === 'novice_total_beginner'
    ? 'as a total beginner looking for a welcoming, jargon-free starting point'
    : biodata.experienceLevel === 'intermediate_career_changer'
    ? 'as a career changer bringing valuable real-world problem-solving experience'
    : biodata.experienceLevel === 'skill_builder_specializing'
    ? 'as an ambitious skill builder aiming for high-income specialization'
    : '';

  const studyText = biodata.fieldOfStudy === 'arts_humanities'
    ? 'rooted in your creative and communication background'
    : biodata.fieldOfStudy === 'commercial_business'
    ? 'leveraging your commercial and business mindset'
    : biodata.fieldOfStudy === 'sciences_health'
    ? 'drawing on your scientific and investigative curiosity'
    : biodata.fieldOfStudy === 'engineering_tech'
    ? 'building on your technical and systems logic'
    : biodata.fieldOfStudy === 'social_sciences_education'
    ? 'drawing on your people and organizational insight'
    : '';

  const backgroundContext = [statusText, expLevelText, studyText].filter(Boolean).join(', ');

  const rationale = `Based on your diagnostic profile ${backgroundContext || statusText}, ${primary.niche.title} is your highest-scoring realistic match (${primary.score}% fit). It works effectively with ${deviceText} and ${urgencyText}. Your diagnostic inputs demonstrated strong ${
    primary.niche.category === 'creative' 
      ? 'visual discernment, color sensitivity, and human-centered design instincts' 
      : primary.niche.category === 'technical' 
      ? 'structured analytical logic and investigative problem solving' 
      : 'organizational discipline and clear communication capabilities'
  }${detectedKeywords.length > 0 ? ` (backed by your real-world experience in ${detectedKeywords.join(', ')})` : ''}.`;

  const feasibilityNotes: string[] = [];

  if (constraints.device === 'phone_only') {
    if (primary.niche.supportedOnPhone) {
      feasibilityNotes.push('100% Smartphone Feasible: You can execute all Day-One tasks and beginner client deliverables directly on your mobile device using Google Docs, Notion Mobile, Canva, or CapCut.');
    } else {
      feasibilityNotes.push('Hardware Realities: While your cognitive traits strongly match this role, advanced production work will require a laptop. Start with conceptual theory and paper wireframing before securing a computer.');
    }
  } else {
    feasibilityNotes.push('Hardware Ready: Your laptop access gives you full freedom to run local developer tools, Figma, databases, and emulators without bottlenecks.');
  }

  if (constraints.powerData === 'night_data_or_powerbank') {
    feasibilityNotes.push('Data-Conscious Learning: Our curated resources emphasize offline docs and downloadable text guides so you can preserve your data bundles and night plans.');
  }

  if (biodata.gender === 'female') {
    feasibilityNotes.push('Community Boost: You are eligible for specialized mentorship and scholarship tracks through She Code Africa, Tech4Dev, and Women in Tech Nigeria.');
  }

  return {
    primaryNiche: primary.niche,
    matchScore: primary.score,
    scoreBreakdown: {
      aptitudeFit: primary.aptitudeFit,
      resourceFeasibility: primary.feasibility,
      marketDemand: primary.marketDemand,
      honestCaveat,
      detectedKeywords
    },
    rationale,
    constraintFeasibilityNotes: feasibilityNotes,
    secondaryNiche: secondary.niche,
    secondaryMatchScore: secondary.score,
    priorityComparison: {
      primaryTitle: primary.niche.title,
      secondaryTitle: secondary.niche.title,
      edgeReason,
      practicalDifferentiator,
      learningVelocityNote
    },
    submission
  };
}
