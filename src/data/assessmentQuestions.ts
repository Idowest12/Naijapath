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
    scenario: 'You are using a Nigerian bank, food, or shopping app and something feels off. What bugs you the most?',
    options: [
      {
        text: 'Ugly design, awkward visual layouts, or confusing buttons',
        description: 'Hard-to-read text, cluttered screens, or buttons placed where your thumb cannot reach easily.',
        weights: { visualCreative: 5, organizationOps: 2 }
      },
      {
        text: 'Server timeouts, failed bank transfers, or slow backend API errors',
        description: 'The app freezing on "Processing payment...", database connection errors, or backend crashes.',
        weights: { logicalStructural: 5, securityCuriosity: 4, analyticalDetail: 3 }
      },
      {
        text: 'Finding broken features, calculation glitches, or layout bugs before others',
        description: 'You immediately spot wrong calculations, buttons that do nothing, or inconsistent behavior.',
        weights: { analyticalDetail: 5, logicalStructural: 3 }
      },
      {
        text: 'Poor customer communication, unclear steps, and zero help documentation',
        description: 'Nobody explaining clearly what happened to your money, or how to get support.',
        weights: { peopleCommunication: 5, organizationOps: 3 }
      }
    ]
  },
  {
    id: 'scenario-ideal-output',
    category: 'Daily Vibe',
    title: 'Work that feels most satisfying',
    scenario: 'At the end of a productive day, which tangible outcome would make you feel most proud?',
    options: [
      {
        text: 'A clean, aesthetic visual screen or polished brand graphics',
        description: 'A polished mobile screen, brand deck, flyer, or UI mockup that looks world-class.',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        text: 'A working backend REST API, database schema, or secure server script',
        description: 'Building server endpoints and database tables that process data accurately and handle thousands of requests.',
        weights: { logicalStructural: 5, analyticalDetail: 5, securityCuriosity: 3 }
      },
      {
        text: 'A complete full-stack web application with responsive UI and live database',
        description: 'Building a product from scratch where users can sign up, click buttons, and save data end-to-end.',
        weights: { logicalStructural: 5, organizationOps: 4, visualCreative: 3 }
      },
      {
        text: 'A clear spreadsheet or numbers breakdown with actionable business insights',
        description: 'Spotting sales trends, profit figures, or finding hidden patterns in messy numbers.',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      },
      {
        text: 'An organized, decluttered workspace and smooth operational system',
        description: 'Tidying up meeting schedules, email inboxes, and to-do lists so the whole team flows easily.',
        weights: { organizationOps: 5, peopleCommunication: 4 }
      }
    ]
  },
  {
    id: 'scenario-collaboration-style',
    category: 'Work Style',
    title: 'How you like to spend your hours',
    scenario: 'What kind of work rhythm feels most energizing and natural to your personality?',
    options: [
      {
        text: 'Deep, quiet focus solving technical backend logic, algorithms, and code syntax',
        description: 'Minimal meetings. Just you, your code editor, writing server functions and database queries.',
        weights: { logicalStructural: 5, analyticalDetail: 5, securityCuriosity: 3 }
      },
      {
        text: 'Building full digital products end-to-end and connecting design with code',
        description: 'Bridging user interfaces with server data to make complete software products come to life.',
        weights: { logicalStructural: 5, organizationOps: 4, visualCreative: 3 }
      },
      {
        text: 'Communicating, organizing, and helping clients or community learners',
        description: 'Liaising with clients, answering inquiries, teaching, and coordinating deliverables.',
        weights: { peopleCommunication: 5, organizationOps: 4 }
      },
      {
        text: 'Creative experimentation with visual layouts, brand styles, and user delight',
        description: 'Trying out typography, color palettes, and arranging screen elements for visual elegance.',
        weights: { visualCreative: 5, peopleCommunication: 3 }
      },
      {
        text: 'Investigating safety, auditing systems for vulnerabilities, and testing bugs',
        description: 'Spotting security holes, auditing passwords, and checking that software behaves securely.',
        weights: { securityCuriosity: 5, analyticalDetail: 4 }
      }
    ]
  },
  {
    id: 'scenario-friend-in-need',
    category: 'Friend in Need',
    title: 'Helping a Friend Start a Venture',
    scenario: 'A close friend is launching a new side business or brand and asks for your direct help. What role do you instinctively volunteer for?',
    options: [
      {
        text: 'Design their logo, brand guidelines, and visual showcase flyers',
        description: 'Create visual assets that make their new brand look trusted and established from day one.',
        weights: { visualCreative: 5, peopleCommunication: 2 }
      },
      {
        text: 'Build their backend database and payment gateway integration',
        description: 'Set up Paystack API webhooks, customer databases, and automated order confirmation scripts.',
        weights: { logicalStructural: 5, analyticalDetail: 5, securityCuriosity: 3 }
      },
      {
        text: 'Build their complete online store website end-to-end with shopping cart and checkout',
        description: 'Create both the responsive customer website and the database order management system.',
        weights: { logicalStructural: 5, organizationOps: 4, visualCreative: 3 }
      },
      {
        text: 'Run their digital advertising campaigns, SEO, and social growth funnels',
        description: 'Set up targeted Meta and TikTok ads to drive paying customers straight to their WhatsApp.',
        weights: { peopleCommunication: 5, analyticalDetail: 4, visualCreative: 3 }
      },
      {
        text: 'Set up an Excel/Google Sheet to track daily expenses, orders, and profit margins',
        description: 'Ensure every Naira is accounted for, tracking revenue trends and inventory counts.',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      },
      {
        text: 'Organize client orders, appointment calendars, and customer service messaging',
        description: 'Manage the day-to-day administrative flow so customer requests never get lost.',
        weights: { organizationOps: 5, peopleCommunication: 4 }
      }
    ]
  },
  {
    id: 'scenario-tech-curiosity',
    category: 'Curiosity Trigger',
    title: 'What makes you wonder "How does that work?"',
    scenario: 'When you encounter impressive modern technology, which dimension fascinates you the most?',
    options: [
      {
        text: 'How interactive website screens and animations look so fluid and responsive',
        description: 'The frontend code, CSS transitions, and component magic that make web layouts feel effortless.',
        weights: { visualCreative: 5, logicalStructural: 4, peopleCommunication: 2 }
      },
      {
        text: 'How cloud servers and backend APIs process millions of transactions in milliseconds',
        description: 'The database indexing, server clustering, and API architectures running in the background.',
        weights: { logicalStructural: 5, analyticalDetail: 5, securityCuriosity: 4 }
      },
      {
        text: 'How a software engineer builds a complete SaaS platform from database to browser',
        description: 'The full-stack integration connecting Next.js frontends to PostgreSQL cloud databases.',
        weights: { logicalStructural: 5, organizationOps: 4, visualCreative: 3 }
      },
      {
        text: 'How financial apps prevent fraud, secure passwords, and stop hacker attacks',
        description: 'The security shields and verification layers protecting user data and bank vaults.',
        weights: { securityCuriosity: 5, analyticalDetail: 4, logicalStructural: 3 }
      },
      {
        text: 'How algorithms calculate predictions, analyze trends, and visualize insights',
        description: 'The mathematics and data models turning raw user clicks into valuable business intelligence.',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
      }
    ]
  },
  {
    id: 'scenario-learning-project',
    category: 'Weekend Challenge',
    title: 'Free weekend mini-project',
    scenario: 'If you were given 2 completely free days and unlimited high-speed data to learn one thing, what would you choose?',
    options: [
      {
        text: 'Code a full-stack web application with user login and a live cloud database',
        description: 'Build an end-to-end web app using modern frameworks where users can sign in and create content.',
        weights: { logicalStructural: 5, organizationOps: 4, visualCreative: 3 }
      },
      {
        text: 'Build a secure backend REST API with authentication and database endpoints',
        description: 'Write server routes in Node.js or Python, test them in Postman, and deploy live to the cloud.',
        weights: { logicalStructural: 5, analyticalDetail: 5, securityCuriosity: 4 }
      },
      {
        text: 'Code a responsive, interactive web page with modern CSS and JavaScript',
        description: 'Build an interactive web interface with animations, dark mode, and mobile responsiveness.',
        weights: { logicalStructural: 4, visualCreative: 4, analyticalDetail: 3 }
      },
      {
        text: 'Design a distinctive brand visual identity, logo mark, and app UI mockup in Figma',
        description: 'Map out the color palette, typography hierarchy, logo mark, and clean user screens.',
        weights: { visualCreative: 5, peopleCommunication: 3 }
      },
      {
        text: 'Launch a digital growth campaign with targeted ads, viral hooks, and email funnels',
        description: 'Set up ad campaigns, write high-converting copy, and track conversion analytics.',
        weights: { peopleCommunication: 5, analyticalDetail: 4, visualCreative: 3 }
      },
      {
        text: 'Build an interactive online mini-course or video tutorial module for learners',
        description: 'Break down a complex topic into simple step-by-step modules, practical exercises, and quizzes.',
        weights: { peopleCommunication: 5, organizationOps: 4, logicalStructural: 3 }
      },
      {
        text: 'Analyze market food price variations across 3 Nigerian cities in a clean spreadsheet',
        description: 'Clean raw data, compute averages, and create visual bar charts showing the best deals.',
        weights: { analyticalDetail: 5, logicalStructural: 4 }
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
      if (niche.category === 'technical') {
        feasibility -= 26;
      } else {
        feasibility += 12;
      }
    } else if (constraints.codingAppetite === 'love_logic_math') {
      if (niche.category === 'technical') {
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
    edgeReason = `Your diagnostic responses demonstrated clear alignment with ${primary.niche.title} across all problem-solving scenarios.`;
    practicalDifferentiator = 'Uniquely suited to your daily workflow preferences and learning goals.';
    learningVelocityNote = 'High focus on a singular pathway accelerates your time-to-first-client.';
  } else {
    // Determine the key difference (hardware, cognitive spike, coding appetite, or market demand)
    if (!secondary.niche.supportedOnPhone && constraints.device === 'phone_only') {
      edgeReason = `${primary.niche.title} is prioritized over ${secondary.niche.title} because it can be started 100% on your current smartphone setup, removing hardware bottlenecks from Day One.`;
    } else if (primary.aptitudeFit > secondary.aptitudeFit + 4) {
      edgeReason = `${primary.niche.title} scored higher cognitive resonance (${primary.aptitudeFit}% vs ${secondary.aptitudeFit}%), indicating your natural instinct leans closer to this day-to-day problem space.`;
    } else if (constraints.earningUrgency === 'immediate_1_3_months' && (primary.niche.category !== 'technical' || primary.niche.id === 'niche-frontend')) {
      edgeReason = `${primary.niche.title} offers a shorter ramp-up to initial income (${primary.niche.earningHorizon}) compared to the deeper architecture required by ${secondary.niche.title}.`;
    } else {
      edgeReason = `${primary.niche.title} achieved an optimal balance between your cognitive aptitude (${primary.aptitudeFit}%), practical feasibility (${primary.feasibility}%), and local/remote market demand (${primary.marketDemand}%).`;
    }

    practicalDifferentiator = `In ${primary.niche.title}, your daily focus is centered on ${primary.niche.description.slice(0, 110)}... whereas ${secondary.niche.title} focuses more heavily on ${secondary.niche.description.slice(0, 110)}...`;
    
    learningVelocityNote = `Priority #1 (${primary.niche.title}) typically targets initial market readiness in ${primary.niche.earningHorizon}, while Alternative #${2} (${secondary.niche.title}) targets ${secondary.niche.earningHorizon}.`;
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

  const rationale = `Based on your diagnostic profile ${statusText}, ${primary.niche.title} is your highest-scoring realistic match (${primary.score}% fit). It works effectively with ${deviceText} and ${urgencyText}. Your diagnostic inputs demonstrated strong ${
    primary.niche.category === 'creative' 
      ? 'visual discernment and human-centered design instincts' 
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
