import { PathwayNiche } from '../types';

export const ALL_NICHES: PathwayNiche[] = [
  {
    id: 'niche-va',
    title: 'Virtual Assistance & Tech Operations',
    category: 'non-technical',
    deviceRequirement: 'phone_only_possible',
    supportedOnPhone: true,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Keep remote businesses, founders, and teams organized from anywhere',
    description: 'Tech VAs manage executive calendars, organize client communications, update Notion/Trello workspaces, coordinate meetings, and handle day-to-day digital operations for international founders and remote startups.',
    timeCommitment: '6-10 hrs/week',
    earningHorizon: '1-3 months (fastest freelance entry)',
    dayOneAction: 'Set up a free Google Keep or Notion workspace. Create a 5-item executive task board with color-coded tags (Urgent, Reads, Follow-ups) and draft a polite 3-line response rescheduling a mock client meeting.',
    dayOneEstimatedMins: 20,
    typicalTools: ['Google Workspace', 'Notion', 'Slack', 'Trello', 'Canva Mobile', 'Calendly'],
    traitProfile: {
      visualCreative: 2,
      logicalStructural: 3,
      peopleCommunication: 5,
      analyticalDetail: 4,
      organizationOps: 5,
      securityCuriosity: 2,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Master Digital Operations Tools',
        tasks: [
          'Create mock executive schedules on Google Calendar with timezone conversions (WAT to EST/GMT)',
          'Build a client resource database in Notion with tagged status columns',
          'Practice drafting professional, concise email responses using clear formatting'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Build Proof Portfolio (Notion Pack)',
        tasks: [
          'Assemble 3 client template samples: meeting minutes doc, travel itinerary, and email inbox management protocol',
          'Create a 1-page free portfolio site on Notion or Carrd showcasing your organizational systems',
          'Audit your LinkedIn profile to highlight remote operational skills'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Pitch for International Gigs & Paid Contracts',
        tasks: [
          'Apply for entry-level assistant roles on Upwork, Fiverr, and remote Twitter job boards',
          'Direct-pitch 10 busy agency founders on LinkedIn offering a free 3-day inbox organization audit',
          'Setup foreign payment receiving channels (Geegpay, Grey, Payoneer)'
        ]
      }
    ],
    resources: [
      {
        name: 'The Tech VA Starter Roadmap (YouTube)',
        type: 'youtube',
        description: 'Free comprehensive breakdown of essential digital tools for Nigerian remote assistants.',
        lowDataFriendly: true
      },
      {
        name: 'ALX Virtual Assistant Program Materials',
        type: 'free_course',
        description: 'World-class curriculum covering soft skills, calendar mastery, and executive support.',
        lowDataFriendly: true
      },
      {
        name: 'Notion for Beginners (Free Guide)',
        type: 'doc',
        description: 'Step-by-step documentation for building client databases and team dashboards.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Non-Tech in Tech Nigeria', 'Remote Worker Africa', 'ALX Community']
  },
  {
    id: 'niche-smm',
    title: 'Social Media & Community Management',
    category: 'non-technical',
    deviceRequirement: 'phone_only_possible',
    supportedOnPhone: true,
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Build brand presence, create viral hooks, and grow digital tribes',
    description: 'Plan editorial calendars, create visual graphics and short-form videos on mobile, write engaging copy, and foster community engagement across X (Twitter), LinkedIn, Instagram, and Telegram/Discord.',
    timeCommitment: '6-10 hrs/week',
    earningHorizon: '1-3 months',
    dayOneAction: 'Pick an active Nigerian SME or fintech on Instagram/X. Audit their last 3 posts and write 3 alternative high-converting hook headlines with a clearer Call-To-Action (CTA).',
    dayOneEstimatedMins: 25,
    typicalTools: ['Canva Mobile', 'CapCut', 'Notion', 'Buffer', 'X/Instagram Insights', 'Meta Business Suite'],
    traitProfile: {
      visualCreative: 4,
      logicalStructural: 2,
      peopleCommunication: 5,
      analyticalDetail: 3,
      organizationOps: 4,
      securityCuriosity: 1,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Learn Content Psychology & Mobile Design',
        tasks: [
          'Design 3 carousel templates on Canva Mobile following clean typography rules',
          'Study top viral Nigerian tech brand accounts (PiggyVest, Moniepoint) to deconstruct their tone',
          'Set up a 7-day content matrix on Google Sheets (Hooks, Body, CTAs)'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Manage a Test Page or Small Business Account',
        tasks: [
          'Volunteer to revamp social media presence for a campus club, church, or friend’s business',
          'Track weekly impressions, follower growth rate, and link clicks using free platform analytics',
          'Package before-and-after screenshots into a 2-page PDF case study'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Land Retainer Clients ($150 - $400/month)',
        tasks: [
          'Share daily breakdown threads of good vs bad brand marketing on LinkedIn/X',
          'Cold DM 15 local startup founders with a personalized 30-second video audit of their social page',
          'Negotiate first monthly retainer contract with clear deliverable milestones'
        ]
      }
    ],
    resources: [
      {
        name: 'HubSpot Academy: Social Media Certification',
        type: 'free_course',
        description: 'Globally recognized 100% free certification on organic social growth and strategy.',
        lowDataFriendly: true
      },
      {
        name: 'Canva Design School for Beginners',
        type: 'youtube',
        description: 'Visual balance, color theory, and mobile graphic design fundamentals.',
        lowDataFriendly: false
      }
    ],
    relevantCommunities: ['Naija Marketers & Creators Network', 'Product Dive', 'Tech Creatives NG']
  },
  {
    id: 'niche-tech-writing',
    title: 'Technical Content & Documentation',
    category: 'non-technical',
    deviceRequirement: 'phone_only_possible',
    supportedOnPhone: true,
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Translate complicated software, APIs, and tools into simple English',
    description: 'Technical writers create user manuals, developer documentation, product changelogs, and educational guides. You do not need to build software to explain how to use it with clarity.',
    timeCommitment: '6-10 hrs/week',
    earningHorizon: '2-4 months',
    dayOneAction: 'Write a 200-word step-by-step guide explaining "How to lock your WhatsApp with fingerprint or FaceID" in simple words that your grandmother or a non-tech parent could follow without getting stuck.',
    dayOneEstimatedMins: 20,
    typicalTools: ['Google Docs', 'Markdown', 'Grammarly', 'Hashnode', 'Medium', 'Notion'],
    traitProfile: {
      visualCreative: 2,
      logicalStructural: 4,
      peopleCommunication: 4,
      analyticalDetail: 5,
      organizationOps: 4,
      securityCuriosity: 2,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Learn Documentation Frameworks & Markdown',
        tasks: [
          'Read the Google Technical Writing free online mini-course',
          'Learn basic Markdown formatting (headers, bullet points, blockquotes, code blocks)',
          'Set up a free blog on Hashnode or Substack'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Publish 3 Problem-Solving Guides',
        tasks: [
          'Publish a guide explaining an everyday Nigerian tech feature (e.g., Paystack payment link setup)',
          'Write a comparison breakdown between two popular tools (e.g., Trello vs Notion for project tracking)',
          'Share your articles on Twitter and LinkedIn to gather feedback'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Submit to Paid Technical Writing Programs',
        tasks: [
          'Pitch article ideas to community-paid tech blogs (LogRocket, Draft.dev, freeCodeCamp, DigitalOcean)',
          'Apply for freelance content contracts paying $50 - $250 per published tutorial',
          'Create a portfolio page linking your published articles'
        ]
      }
    ],
    resources: [
      {
        name: 'Google Technical Writing Course I & II',
        type: 'free_course',
        description: 'Google’s legendary free course on punctuation, active voice, and clear tech communication.',
        lowDataFriendly: true
      },
      {
        name: 'Write the Docs Community Handbook',
        type: 'doc',
        description: 'Comprehensive global repository of technical documentation guidelines.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Technical Writers Nigeria', 'Write The Docs Africa', 'SheCodeAfrica Writers']
  },
  {
    id: 'niche-uiux',
    title: 'UI/UX & Product Design',
    category: 'creative',
    deviceRequirement: 'laptop_required',
    supportedOnPhone: false,
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Design intuitive, beautiful user interfaces that solve real everyday problems',
    description: 'Product designers map out user journeys, build wireframes, prototype interactions, and craft visual interfaces for mobile and web products using Figma.',
    timeCommitment: '8-12 hrs/week',
    earningHorizon: '3-6 months',
    dayOneAction: 'Open your phone and screenshot the transfer confirmation screen of your bank app (GTB, Access, Kuda, or OPay). Grab a sheet of paper and a pen: sketch a cleaner version that makes the transaction status, receipt download, and next steps immediately obvious.',
    dayOneEstimatedMins: 30,
    typicalTools: ['Figma', 'FigJam', 'Whimsical', 'Pen & Paper', 'Mobbin', 'Coolors'],
    traitProfile: {
      visualCreative: 5,
      logicalStructural: 3,
      peopleCommunication: 3,
      analyticalDetail: 4,
      organizationOps: 3,
      securityCuriosity: 2,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Master Visual Hierarchy & Figma Basics',
        tasks: [
          'Learn the fundamental principles: Spacing (8pt grid), Typography contrast, and Color accessibility',
          'Open Figma (free tier) and recreate 2 screens of an existing mobile app pixel-for-pixel (copywork)',
          'Study real-world mobile patterns on Mobbin.com'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Complete First End-to-End Case Study',
        tasks: [
          'Pick a local Nigerian problem (e.g., ordering gas cylinders, booking intercity bus seats)',
          'Interview 3 potential users to discover pain points',
          'Design wireframes and high-fidelity clickable prototype in Figma'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Publish Portfolio & Design Community Networking',
        tasks: [
          'Publish your detailed case study on Behance, Notion, or Medium',
          'Participate in weekly design challenges on Twitter (#UIUXNigeria, #DesignTwitter)',
          'Apply for junior/intern design positions or freelance UI contracts'
        ]
      }
    ],
    resources: [
      {
        name: 'Figma for Beginners (Official YouTube)',
        type: 'youtube',
        description: 'Complete official playlist covering auto-layout, components, and design systems.',
        lowDataFriendly: false
      },
      {
        name: 'Refactoring UI (Visual Guidelines)',
        type: 'doc',
        description: 'Practical visual design rules for clean borders, shadows, and contrast.',
        lowDataFriendly: true
      },
      {
        name: 'Interaction Design Foundation Open Guides',
        type: 'doc',
        description: 'Human psychology and user experience fundamentals.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Friends of Figma Lagos / Abuja', 'Uxury Community', 'She Code Africa Design']
  },
  {
    id: 'niche-data',
    title: 'Data Analysis & Business Intelligence',
    category: 'technical',
    deviceRequirement: 'laptop_required',
    supportedOnPhone: false,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Turn scattered numbers and spreadsheets into actionable business growth decisions',
    description: 'Data analysts clean messy data, calculate metrics, and build visual dashboards with Excel, Power BI, and SQL to help companies increase revenue and cut operational waste.',
    timeCommitment: '10-14 hrs/week',
    earningHorizon: '4-6 months',
    dayOneAction: 'Open Google Sheets or Microsoft Excel. Create a sheet with 15 rows tracking your own personal or household expenses from the last month. Use `=SUM()`, `=AVERAGE()`, and build a simple pie chart showing where 80% of your money went.',
    dayOneEstimatedMins: 30,
    typicalTools: ['Microsoft Excel / Google Sheets', 'Power BI / Tableau', 'SQL (PostgreSQL)', 'Python Basics (Pandas)'],
    traitProfile: {
      visualCreative: 3,
      logicalStructural: 5,
      peopleCommunication: 2,
      analyticalDetail: 5,
      organizationOps: 4,
      securityCuriosity: 2,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Advanced Excel Functions & Clean Datasets',
        tasks: [
          'Master VLOOKUP / XLOOKUP, INDEX-MATCH, and Pivot Tables in Excel',
          'Download a free open dataset from Kaggle or data.gov.ng',
          'Practice cleaning missing entries, date formats, and duplicate rows'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Learn SQL & Relational Queries',
        tasks: [
          'Learn SELECT, WHERE, GROUP BY, JOIN, and aggregate functions on SQLBolt',
          'Query a multi-table database to answer business questions (e.g., top 10 customers by revenue)',
          'Document your query code on GitHub or Google Drive'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Build Interactive Power BI Dashboards',
        tasks: [
          'Connect cleaned data to Power BI and build interactive KPI cards, filters, and charts',
          'Write a LinkedIn post summarizing your insights from analyzing a public Nigerian economic dataset',
          'Apply for entry-level data analyst and BI assistant roles'
        ]
      }
    ],
    resources: [
      {
        name: 'SQLBolt (Interactive Free Tutorial)',
        type: 'free_course',
        description: 'Best zero-data browser-based practice tool for learning SQL queries.',
        lowDataFriendly: true
      },
      {
        name: 'Alex The Analyst YouTube Bootcamp',
        type: 'youtube',
        description: 'Complete end-to-end data analytics roadmap from Excel to Portfolio projects.',
        lowDataFriendly: false
      },
      {
        name: 'Kaggle Learn Micro-Courses',
        type: 'free_course',
        description: 'Free certificates in Pandas, Data Cleaning, and Visualizations.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Data Community Africa', 'Python Nigeria', 'Ingressive For Good Data Track']
  },
  {
    id: 'niche-frontend',
    title: 'Frontend Web Development',
    category: 'technical',
    deviceRequirement: 'laptop_required',
    supportedOnPhone: false,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Code responsive, dynamic web applications that users touch and interact with',
    description: 'Frontend engineers turn UI designs into functioning websites using HTML, CSS, JavaScript, and modern frameworks like React and Tailwind CSS.',
    timeCommitment: '12-16 hrs/week',
    earningHorizon: '5-8 months',
    dayOneAction: 'Create a single file named `index.html` on your computer using Notepad or VS Code. Write your name, a short paragraph describing what you want to achieve in tech, and three links to websites you use daily. Double-click it to watch it load in your browser.',
    dayOneEstimatedMins: 25,
    typicalTools: ['VS Code', 'Git & GitHub', 'HTML5 & CSS3', 'JavaScript (ES6+)', 'Tailwind CSS', 'React'],
    traitProfile: {
      visualCreative: 4,
      logicalStructural: 5,
      peopleCommunication: 2,
      analyticalDetail: 4,
      organizationOps: 3,
      securityCuriosity: 2,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Semantic HTML & CSS Layouts',
        tasks: [
          'Build a basic personal profile card using semantic tags (header, section, footer)',
          'Learn CSS Flexbox and Grid to position elements responsively on desktop and mobile screens',
          'Deploy your first website live for free using Vercel or GitHub Pages'
        ]
      },
      {
        period: 'Month 1',
        goal: 'JavaScript Logic & DOM Manipulation',
        tasks: [
          'Learn variables, functions, loops, and event listeners (buttons, clicks, inputs)',
          'Build 3 mini-apps: a Tip/Split Calculator, a To-Do task manager, and a Currency Converter',
          'Push all your code commits to GitHub'
        ]
      },
      {
        period: 'Month 3',
        goal: 'React & API Integration',
        tasks: [
          'Learn component state, props, and fetching data from real public APIs (weather or movies)',
          'Build a responsive web app with Tailwind CSS and React',
          'Start contributing to open-source or building projects for local businesses'
        ]
      }
    ],
    resources: [
      {
        name: 'freeCodeCamp Responsive Web Design Certification',
        type: 'free_course',
        description: 'Interactive, self-paced, zero-cost curriculum with project-based certificates.',
        lowDataFriendly: true
      },
      {
        name: 'The Odin Project: Foundations',
        type: 'free_course',
        description: 'Rigorous open-source curriculum focusing on real command line tools and Git.',
        lowDataFriendly: true
      },
      {
        name: 'MDN Web Docs (Mozilla)',
        type: 'doc',
        description: 'The definitive web reference guide for HTML, CSS, and JavaScript.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Google Developer Groups (GDG) Nigeria', 'Consonance Club', 'She Code Africa Dev']
  },
  {
    id: 'niche-qa',
    title: 'Quality Assurance & Software Testing',
    category: 'technical',
    deviceRequirement: 'either',
    supportedOnPhone: true,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Break software systematically before customers do and ensure high product quality',
    description: 'QA engineers test web and mobile applications for functional bugs, usability flaws, and edge cases. It is one of the most accessible entry points into technical engineering.',
    timeCommitment: '8-12 hrs/week',
    earningHorizon: '3-5 months',
    dayOneAction: 'Pick an e-commerce website (like Jumia or Konga). Try to add an item to the cart, apply an invalid coupon code, enter an incomplete phone number, and test what error message appears. Write a structured 4-line bug report (Steps to reproduce, Expected result, Actual result).',
    dayOneEstimatedMins: 25,
    typicalTools: ['Jira / Trello', 'Postman', 'Chrome DevTools', 'TestRail', 'Loom / Screen Recorder'],
    traitProfile: {
      visualCreative: 2,
      logicalStructural: 4,
      peopleCommunication: 3,
      analyticalDetail: 5,
      organizationOps: 4,
      securityCuriosity: 4,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Manual Testing Fundamentals & Bug Reporting',
        tasks: [
          'Learn the Software Testing Life Cycle (STLC) and standard bug severity/priority levels',
          'Write professional test cases with test steps, preconditions, and expected outputs',
          'Practice testing mobile app responsiveness across different screen sizes'
        ]
      },
      {
        period: 'Month 1',
        goal: 'API Testing with Postman',
        tasks: [
          'Learn HTTP request methods: GET, POST, PUT, DELETE, and status codes (200, 400, 404, 500)',
          'Test free public APIs using Postman and write basic response assertion checks',
          'Document a complete test suite for a sample fintech registration flow'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Crowd Testing Platforms & Freelance Gigs',
        tasks: [
          'Sign up and pass tests on paid crowd-testing platforms (uTest, Testlio, Test IO)',
          'Earn your first paid rewards finding verified bugs in real company apps',
          'Apply for entry-level QA Analyst roles at Nigerian and global remote firms'
        ]
      }
    ],
    resources: [
      {
        name: 'uTest Academy (Free Hands-on Testing Training)',
        type: 'free_course',
        description: 'World largest community of testers with practical hands-on courses and paid cycles.',
        lowDataFriendly: true
      },
      {
        name: 'Guru99 Software Testing Tutorial',
        type: 'doc',
        description: 'Clear, text-first definitions of manual, regression, and functional testing.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['QA Community Africa', 'Test Tribe Global', 'Naija Tech Testers']
  },
  {
    id: 'niche-cyber',
    title: 'Cybersecurity Fundamentals & InfoSec',
    category: 'technical',
    deviceRequirement: 'laptop_required',
    supportedOnPhone: false,
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Defend systems, analyze network traffic, and protect users from digital threats',
    description: 'Security analysts safeguard digital networks, monitor unauthorized access, identify vulnerabilities, and help organizations comply with cybersecurity standards.',
    timeCommitment: '12-16 hrs/week',
    earningHorizon: '6-10 months',
    dayOneAction: 'Check your personal email address on haveibeenpwned.com to see if your credentials have been compromised in known data leaks. Then audit all your online accounts to ensure unique passwords and enable Authenticator-app-based 2FA.',
    dayOneEstimatedMins: 20,
    typicalTools: ['Wireshark', 'Linux (Ubuntu/Kali)', 'VirtualBox', 'Nmap', 'TryHackMe'],
    traitProfile: {
      visualCreative: 1,
      logicalStructural: 5,
      peopleCommunication: 2,
      analyticalDetail: 5,
      organizationOps: 3,
      securityCuriosity: 5,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Networking Foundations & Linux Basics',
        tasks: [
          'Understand IP addressing, DNS, ports, TCP/UDP, and how packets travel across the internet',
          'Install a Linux virtual machine (VirtualBox or WSL) and practice basic terminal navigation commands',
          'Create a TryHackMe account and complete the "Pre-Security" foundational rooms'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Threat Analysis & Security Defenses',
        tasks: [
          'Learn the OWASP Top 10 web vulnerabilities (SQL Injection, XSS, Broken Auth)',
          'Analyze sample network packet captures in Wireshark',
          'Complete hands-on beginner labs on TryHackMe or HackTheBox'
        ]
      },
      {
        period: 'Month 3',
        goal: 'CompTIA Security+ Study & Junior SOC Readiness',
        tasks: [
          'Work through Professor Messer’s free CompTIA Security+ video training course',
          'Write write-ups explaining how you solved beginner Capture-The-Flag (CTF) challenges',
          'Network with Nigerian cybersecurity professionals on LinkedIn and cybersecurity clubs'
        ]
      }
    ],
    resources: [
      {
        name: 'TryHackMe: Pre-Security Path',
        type: 'free_course',
        description: 'Gamified, interactive virtual labs teaching computer basics and networking safely.',
        lowDataFriendly: true
      },
      {
        name: 'Professor Messer Security+ Training',
        type: 'youtube',
        description: 'Complete high-quality free video course covering security concepts and operations.',
        lowDataFriendly: false
      }
    ],
    relevantCommunities: ['Cybersecurity Experts Association of Nigeria (CSEAN)', 'Naija Sec Force', 'SheSecures']
  },
  {
    id: 'niche-pm',
    title: 'Product Management & Delivery',
    category: 'non-technical',
    deviceRequirement: 'laptop_required',
    supportedOnPhone: false,
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Lead product strategy, define features, and coordinate cross-functional teams',
    description: 'Product managers sit at the intersection of business, technology, and user experience. They discover what features to build, write specifications, and ensure development stays aligned with company goals.',
    timeCommitment: '8-12 hrs/week',
    earningHorizon: '4-8 months',
    dayOneAction: 'Write a 1-page Product Requirement Document (PRD) for a mini-feature in WhatsApp: "Scheduled Messages". Specify why users need it, how the button looks, and what should happen if the phone is offline at the scheduled time.',
    dayOneEstimatedMins: 30,
    typicalTools: ['Notion / Jira', 'Whimsical / Miro', 'Loom', 'Google Docs', 'Mixpanel Basics'],
    traitProfile: {
      visualCreative: 3,
      logicalStructural: 4,
      peopleCommunication: 5,
      analyticalDetail: 4,
      organizationOps: 5,
      securityCuriosity: 2,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Product Thinking & Problem Definition',
        tasks: [
          'Understand Agile, Scrum, and Sprint cycles vs Waterfall methodologies',
          'Learn how to write clean user stories: "As a [user], I want to [action], so that [benefit]"',
          'Deconstruct how local apps prioritize features using MoSCoW (Must, Should, Could, Won’t)'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Write a Comprehensive PRD & Wireframe Flow',
        tasks: [
          'Select a real-world Nigerian problem and write a 4-section Product Requirements Document',
          'Map out user flow diagrams and low-fidelity wireframes in FigJam or Whimsical',
          'Conduct mock user interviews with 5 people to validate user assumptions'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Product Case Study Portfolio & APM Applications',
        tasks: [
          'Publish your product teardown on Medium or Substack',
          'Apply for Associate Product Manager (APM) cohorts or startup internships',
          'Engage with PM mentors on Twitter and ADPList for portfolio reviews'
        ]
      }
    ],
    resources: [
      {
        name: 'Product School Free Micro-Courses & Templates',
        type: 'doc',
        description: 'Industry standard PRD templates, roadmap guides, and video talks.',
        lowDataFriendly: true
      },
      {
        name: 'Lenny’s Newsletter (Free Archive)',
        type: 'doc',
        description: 'World-class product strategy, execution, and growth breakdowns.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Product Dive Africa', 'Product Peoples Club NG', 'Treford Product School']
  }
];
