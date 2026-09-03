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
        url: 'https://www.youtube.com/results?search_query=virtual+assistant+training+for+beginners',
        type: 'youtube',
        description: 'Straightforward video guide explaining essential digital tools for remote assistants in Nigeria without any complicated jargon.',
        lowDataFriendly: true
      },
      {
        name: 'ALX Virtual Assistant Pathway',
        url: 'https://www.alxafrica.com/',
        type: 'free_course',
        description: 'Top-tier free training covering professional communication, managing calendars, and supporting executives remotely.',
        lowDataFriendly: true
      },
      {
        name: 'Notion for Beginners (Free Guide)',
        url: 'https://www.notion.so/help/guides/notion-for-beginners',
        type: 'doc',
        description: 'Step-by-step reading guide to help you organize documents, client tasks, and team notes like a seasoned pro.',
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
        name: 'HubSpot Academy: Social Media Marketing Certification',
        url: 'https://academy.hubspot.com/courses/social-media',
        type: 'free_course',
        description: 'Globally recognized 100% free certificate course. Teaches you how to grow audience engagement, manage campaigns, and pitch paying brands.',
        lowDataFriendly: true
      },
      {
        name: 'Canva Design School for Beginners',
        url: 'https://www.canva.com/designschool/tutorials/',
        type: 'youtube',
        description: 'Learn quick visual design hacks directly on your phone or laptop. Great for creating eye-catching social banners and Instagram carousels.',
        lowDataFriendly: true
      },
      {
        name: 'Meta Business Suite Quick Guide',
        url: 'https://www.facebook.com/business/learn',
        type: 'doc',
        description: 'Free official guide on scheduling posts, checking analytics, and setting up automated replies for Facebook & Instagram pages.',
        lowDataFriendly: true
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
        url: 'https://developers.google.com/tech-writing/overview',
        type: 'free_course',
        description: 'Google’s legendary free tutorial on how to explain technical things in simple, active English without unnecessary grammar or confusion.',
        lowDataFriendly: true
      },
      {
        name: 'Write the Docs Community Guide',
        url: 'https://www.writethedocs.org/guide/',
        type: 'doc',
        description: 'Global handbook sharing step-by-step practices for writing developer guides, API docs, and user support manuals.',
        lowDataFriendly: true
      },
      {
        name: 'Markdown Crash Guide (Fast Syntax)',
        url: 'https://www.markdownguide.org/basic-syntax/',
        type: 'doc',
        description: 'The standard formatting language used across GitHub and technical blogs. You can learn the whole thing in 15 minutes.',
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
        name: 'Figma for Beginners (Official YouTube Series)',
        url: 'https://www.youtube.com/c/Figmadesign',
        type: 'youtube',
        description: 'The official step-by-step video lessons by Figma. Covers auto-layout, mobile screen sizing, components, and how to make clickable prototypes.',
        lowDataFriendly: false
      },
      {
        name: 'Refactoring UI (Practical Visual Rules)',
        url: 'https://www.refactoringui.com/',
        type: 'doc',
        description: 'No-nonsense visual design handbook. Gives you practical rules for spacing, colors, font hierarchy, and card layouts without guesswork.',
        lowDataFriendly: true
      },
      {
        name: 'Interaction Design Foundation Open Guides',
        url: 'https://www.interaction-design.org/literature/topics/ux-design',
        type: 'doc',
        description: 'Free articles on UX fundamentals, user research methods, and understanding how real people interact with digital products.',
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
        name: 'W3Schools: SQL Tutorial for Beginners',
        url: 'https://www.w3schools.com/sql/',
        type: 'free_course',
        description: 'The cleanest, easiest way to practice database queries right in your browser. No heavy setup needed, works with very little data, and explains everything in simple terms.',
        lowDataFriendly: true
      },
      {
        name: 'SQLBolt (Interactive Free In-Browser Practice)',
        url: 'https://sqlbolt.com/',
        type: 'free_course',
        description: 'Zero-stress interactive tutorial. You read a 1-minute lesson and immediately type SQL commands to solve real data problems.',
        lowDataFriendly: true
      },
      {
        name: 'Alex The Analyst YouTube Data Bootcamp',
        url: 'https://www.youtube.com/c/AlexTheAnalyst',
        type: 'youtube',
        description: 'Complete video blueprint covering Excel, SQL, Tableau, Power BI, and how to build portfolio projects that impress Nigerian and foreign recruiters.',
        lowDataFriendly: false
      },
      {
        name: 'Kaggle Learn Micro-Courses & Certificates',
        url: 'https://www.kaggle.com/learn',
        type: 'free_course',
        description: 'Bite-sized free certified tracks on Data Cleaning, Pandas, and Data Visualization that you can finish in a weekend.',
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
        name: 'W3Schools: Web Development for Beginners',
        url: 'https://www.w3schools.com/',
        type: 'free_course',
        description: 'The easiest, #1 beginner-friendly place to start coding. Practice HTML, CSS & JavaScript directly inside your browser without downloading any heavy software. Works smoothly with very low data.',
        lowDataFriendly: true
      },
      {
        name: 'freeCodeCamp Responsive Web Design Certification',
        url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
        type: 'free_course',
        description: '100% free hands-on coding curriculum. Build 5 real web projects and earn a globally recognized certificate without paying a kobo.',
        lowDataFriendly: true
      },
      {
        name: 'The Odin Project: Web Foundations',
        url: 'https://www.theodinproject.com/paths/foundations/courses/foundations',
        type: 'free_course',
        description: '100% free open-source guide that teaches you how real software developers think, work with Git, and deploy live websites.',
        lowDataFriendly: true
      },
      {
        name: 'MDN Web Docs (Mozilla Learn)',
        url: 'https://developer.mozilla.org/en-US/docs/Learn',
        type: 'doc',
        description: 'The official reference dictionary for the internet. Clear definitions, simple examples, and explanations that make sense for beginners.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Google Developer Groups (GDG) Nigeria', 'Consonance Club', 'She Code Africa Dev']
  },
  {
    id: 'niche-backend',
    title: 'Backend Software Engineering & APIs',
    category: 'technical',
    deviceRequirement: 'laptop_required',
    supportedOnPhone: false,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Build server logic, databases, secure authentication, and scalable REST/GraphQL APIs',
    description: 'Backend software engineers construct the server engine that powers modern applications. They design relational databases, secure payment gateways, build REST APIs, and manage server infrastructure using Node.js, Python, PostgreSQL, and cloud tools.',
    timeCommitment: '12-16 hrs/week',
    earningHorizon: '5-8 months',
    dayOneAction: 'Install Node.js or Python on your computer. Write a simple 12-line server script using Express or FastAPI that outputs a JSON response with status "API active" and user data when loaded in your browser at http://localhost:5000.',
    dayOneEstimatedMins: 25,
    typicalTools: ['Node.js / Express', 'Python / Django / FastAPI', 'PostgreSQL / Supabase', 'Postman', 'Git & GitHub', 'Docker'],
    traitProfile: {
      visualCreative: 1,
      logicalStructural: 5,
      peopleCommunication: 2,
      analyticalDetail: 5,
      organizationOps: 3,
      securityCuriosity: 4,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Server Basics & HTTP Requests',
        tasks: [
          'Understand how the internet works: Client-Server model, HTTP methods (GET, POST, PUT, DELETE)',
          'Build a basic REST API server with 3 endpoints using Node.js/Express or Python/FastAPI',
          'Test and debug endpoints using Postman or Thunder Client'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Databases & CRUD Operations',
        tasks: [
          'Connect your server to PostgreSQL or MongoDB',
          'Write database schemas, models, and queries for a functional store inventory or user system',
          'Implement user password hashing with bcrypt and JSON Web Tokens (JWT) for secure authentication'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Production APIs, Deployment & Cloud Integration',
        tasks: [
          'Integrate a Paystack / Flutterwave webhook to handle automated payment verification',
          'Deploy your backend live to Render, Railway, or AWS with environment variable secrets',
          'Build a public API documentation page using Swagger / Postman Docs to showcase to recruiters'
        ]
      }
    ],
    resources: [
      {
        name: 'W3Schools: Node.js & Server Tutorials',
        url: 'https://www.w3schools.com/nodejs/',
        type: 'free_course',
        description: 'Easy-to-follow backend beginner lessons. Learn how servers listen for requests, handle web files, and return data with zero hassle.',
        lowDataFriendly: true
      },
      {
        name: 'freeCodeCamp: Backend Development and APIs',
        url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
        type: 'free_course',
        description: 'Comprehensive hands-on training with Node.js, Express, MongoDB, and microservices. Build real projects and earn a certificate for free.',
        lowDataFriendly: true
      },
      {
        name: 'Roadmap.sh: Backend Developer Visual Guide',
        url: 'https://roadmap.sh/backend',
        type: 'doc',
        description: 'Clear visual checklist of what to learn next — from server basics and relational databases to deploying on the cloud.',
        lowDataFriendly: true
      },
      {
        name: 'The Odin Project: NodeJS Track',
        url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs',
        type: 'free_course',
        description: 'In-depth free guide covering Express, PostgreSQL, Prisma, user authentication, and deployment without cutting corners.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Python Nigeria', 'Node.js Africa Community', 'Backend Developers NG', 'GDG Lagos']
  },
  {
    id: 'niche-fullstack',
    title: 'Full-Stack Software Engineering',
    category: 'technical',
    deviceRequirement: 'laptop_required',
    supportedOnPhone: false,
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Build complete web platforms end-to-end—from sleek user interfaces to robust database backends',
    description: 'Full-stack engineers have the versatile superpower to build entire digital products from scratch. They seamlessly connect React / Next.js client frontends with Node/Python backend APIs, database schemas, and cloud deployment.',
    timeCommitment: '15-20 hrs/week',
    earningHorizon: '6-9 months',
    dayOneAction: 'Map out an end-to-end app architecture on paper: sketch the frontend screen (e.g. a student meal ordering form), list the JSON payload sent to the backend API, and draw the database table schema where orders will be stored.',
    dayOneEstimatedMins: 25,
    typicalTools: ['React / Next.js', 'Node.js / TypeScript', 'PostgreSQL / Prisma', 'Tailwind CSS', 'Git & GitHub', 'Vercel & Supabase'],
    traitProfile: {
      visualCreative: 3,
      logicalStructural: 5,
      peopleCommunication: 3,
      analyticalDetail: 4,
      organizationOps: 4,
      securityCuriosity: 3,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Connecting Frontend UI with Dynamic Server Data',
        tasks: [
          'Create a React interface that fetches and renders live records from a public API',
          'Implement full form submission with client-side validation and responsive loading states',
          'Deploy both parts on Vercel and check network requests in Chrome DevTools'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Complete End-to-End CRUD Application',
        tasks: [
          'Build a full web application with Next.js, Tailwind, and a PostgreSQL database (via Supabase or Neon)',
          'Implement complete Create, Read, Update, Delete functionality for user accounts and posts/products',
          'Secure route handlers with user session cookies and role-based permissions'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Production SaaS MVP & Junior Developer Portfolio',
        tasks: [
          'Build and launch a real-world SaaS MVP for a local Nigerian problem (e.g. apartment rental finder or artisan directory)',
          'Integrate payments via Paystack, automated emails, and image uploads',
          'Document the architecture on GitHub with clean READMEs, live demo links, and video walkthroughs'
        ]
      }
    ],
    resources: [
      {
        name: 'W3Schools: Full-Stack Web Development Basics',
        url: 'https://www.w3schools.com/whatis/',
        type: 'free_course',
        description: 'Understand how frontend (HTML/CSS/JS) talks to backend servers and databases. Try code examples directly in your browser with very low data and plain English.',
        lowDataFriendly: true
      },
      {
        name: 'The Odin Project: Full Stack JavaScript Track',
        url: 'https://www.theodinproject.com/paths/full-stack-javascript',
        type: 'free_course',
        description: 'World-renowned 100% free open-source curriculum taking you from zero to full-stack mastery with Node.js and React.',
        lowDataFriendly: true
      },
      {
        name: 'Full Stack Open (University of Helsinki)',
        url: 'https://fullstackopen.com/en/',
        type: 'free_course',
        description: 'Deep, production-grade deep dive into React, Redux, Node.js, MongoDB, GraphQL, and TypeScript. Completely free and highly respected by employers.',
        lowDataFriendly: true
      },
      {
        name: 'Next.js Official Interactive Tutorial',
        url: 'https://nextjs.org/learn',
        type: 'doc',
        description: 'Learn modern full-stack React and server-side rendering step-by-step directly from the creators of Next.js.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Consonance Club', 'ALX Alumni Nigeria', 'Google Developer Groups', 'DevCenter Square']
  },
  {
    id: 'niche-qa',
    title: 'Quality Assurance & Software Testing',
    category: 'technical',
    deviceRequirement: 'laptop_required',
    supportedOnPhone: false,
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Break software systematically before customers do and ensure high product quality',
    description: 'QA engineers test web and mobile applications for functional bugs, usability flaws, and edge cases. It is one of the most accessible entry points into technical engineering.',
    timeCommitment: '8-12 hrs/week',
    earningHorizon: '3-5 months',
    dayOneAction: 'Pick an e-commerce website (like Jumia or Konga). Try to add an item to the cart, apply an invalid coupon code, enter an incomplete phone number, and test what error message appears. Write a structured 4-line bug report (Steps to reproduce, Expected result, Actual result).',
    dayOneEstimatedMins: 25,
    typicalTools: ['Jira / Trello', 'Postman', 'Chrome DevTools', 'TestRail', 'Loom / Screen Recorder'],
    traitProfile: {
      visualCreative: 1,
      logicalStructural: 4,
      peopleCommunication: 2,
      analyticalDetail: 5,
      organizationOps: 3,
      securityCuriosity: 5,
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
        name: 'uTest Academy (Free Practical Testing Training)',
        url: 'https://www.utest.com/academy',
        type: 'free_course',
        description: 'World’s largest software tester network. Learn how to test real mobile and web apps, report bugs clearly, and earn real money participating in live paid test cycles.',
        lowDataFriendly: true
      },
      {
        name: 'Guru99 Software Testing Tutorial',
        url: 'https://www.guru99.com/software-testing.html',
        type: 'doc',
        description: 'Clear, text-first definitions of manual testing, regression checks, and writing test cases without confusing words.',
        lowDataFriendly: true
      },
      {
        name: 'Postman Student API Testing Guide',
        url: 'https://academy.postman.com/',
        type: 'free_course',
        description: 'Learn how to test backend APIs, check server status codes, and automate test runs with free badges for your CV.',
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
        url: 'https://tryhackme.com/path/outline/presecurity',
        type: 'free_course',
        description: 'Fun, game-like browser rooms that teach you how the internet works, computer networking, and basic security concepts safely without risking your laptop.',
        lowDataFriendly: true
      },
      {
        name: 'Professor Messer Security+ Training',
        url: 'https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-training-course/',
        type: 'youtube',
        description: 'World-renowned free video lessons for CompTIA Security+. High clarity, covers real attack types and defensive operations.',
        lowDataFriendly: false
      },
      {
        name: 'Cisco Skills For All (Cybersecurity Intro)',
        url: 'https://skillsforall.com/',
        type: 'free_course',
        description: 'Free beginner-friendly security modules from Cisco with self-paced digital badges.',
        lowDataFriendly: true
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
        name: 'Product School Free Templates & Micro-Courses',
        url: 'https://productschool.com/free-product-management-resources',
        type: 'doc',
        description: 'Free sample Product Requirements Documents (PRDs), roadmap templates, and video masterclasses used by top tech companies.',
        lowDataFriendly: true
      },
      {
        name: 'Lenny’s Newsletter (Free Archive)',
        url: 'https://www.lennysnewsletter.com/',
        type: 'doc',
        description: 'Goldmine of practical product breakdowns, startup growth playbooks, and career advice for modern product managers.',
        lowDataFriendly: true
      },
      {
        name: 'Atlassian Agile & Scrum Coach Guide',
        url: 'https://www.atlassian.com/agile',
        type: 'doc',
        description: 'Clear, text-first guide explaining sprint planning, backlog grooming, and managing team deliverables with zero confusion.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Product Dive Africa', 'Product Peoples Club NG', 'Treford Product School']
  },
  {
    id: 'niche-digital-marketing',
    title: 'Digital Marketing & Growth Strategy',
    category: 'non-technical',
    deviceRequirement: 'phone_only_possible',
    supportedOnPhone: true,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Run high-converting paid ads, optimize sales funnels, and scale customer acquisition',
    description: 'Digital marketers and growth specialists help startups and businesses acquire paying customers through targeted Meta & Google ads, search engine optimization (SEO), email marketing funnels, and analytics.',
    timeCommitment: '6-10 hrs/week',
    earningHorizon: '1-3 months',
    dayOneAction: 'Pick a popular local brand on Instagram. Use the Meta Ad Library (free website) to view all active ads they are running. Identify their top headline, offer, and write down 2 alternative copy hooks to improve their conversions.',
    dayOneEstimatedMins: 20,
    typicalTools: ['Meta Ads Manager', 'Google Ads', 'Google Analytics 4', 'Mailchimp / Brevo', 'Canva Mobile', 'Notion'],
    traitProfile: {
      visualCreative: 3,
      logicalStructural: 3,
      peopleCommunication: 5,
      analyticalDetail: 5,
      organizationOps: 4,
      securityCuriosity: 1,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Ad Strategy & Funnel Architecture',
        tasks: [
          'Study Meta Ads Manager setup and understand campaign objectives (Traffic, Leads, Sales)',
          'Learn the AIDA framework (Attention, Interest, Desire, Action) for copywriting',
          'Explore Google Analytics 4 basics to see how web visitors convert into buyers'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Run a Live Test Campaign & Build Case Study',
        tasks: [
          'Help an SME run a small test budget ad (₦5,000 - ₦10,000) targeting specific Lagos or Abuja interests',
          'Optimize ad creatives, reduce Cost Per Click (CPC), and set up automated WhatsApp click-to-chat links',
          'Document results in a 1-page PDF growth report showing return on ad spend (ROAS)'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Monthly Retainers & International Freelance Gigs',
        tasks: [
          'Pitch e-commerce and coaching brands on Upwork and LinkedIn for monthly ad management ($200 - $600/month)',
          'Create a 3-tier service package (Lead Gen, E-commerce Growth, Retargeting)',
          'Collect client video testimonials to attract higher-paying agency contracts'
        ]
      }
    ],
    resources: [
      {
        name: 'Google Digital Garage: Fundamentals of Digital Marketing',
        url: 'https://learndigital.withgoogle.com/digitalgarage',
        type: 'free_course',
        description: 'Google-accredited 100% free certification. Covers SEO, search ads, local Nigerian business listings, and social marketing from scratch.',
        lowDataFriendly: true
      },
      {
        name: 'Meta Blueprint: Facebook & Instagram Ads Academy',
        url: 'https://www.facebook.com/business/learn',
        type: 'free_course',
        description: 'Official free lessons from Meta on targeting audiences, budgeting ads, and driving direct WhatsApp sales.',
        lowDataFriendly: true
      },
      {
        name: 'HubSpot Inbound Marketing Certification',
        url: 'https://academy.hubspot.com/courses/inbound-marketing',
        type: 'free_course',
        description: 'Learn how to create content that attracts organic buyers, set up email newsletters, and close freelance clients without begging.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Digital Marketing Nigeria', 'Growth Africa Network', 'African Freelancers Club']
  },
  {
    id: 'niche-branding',
    title: 'Brand Identity & Visual Design Specialist',
    category: 'creative',
    deviceRequirement: 'phone_only_possible',
    supportedOnPhone: true,
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Design distinctive logos, color palettes, brand guidelines, and visual storytelling',
    description: 'Brand identity specialists shape how companies look and feel. They design memorable logos, select cohesive typography and color palettes, craft brand style guides, and ensure visual consistency across social media and packaging.',
    timeCommitment: '8-12 hrs/week',
    earningHorizon: '2-4 months',
    dayOneAction: 'Choose an unbranded Nigerian business (e.g. a local bakery, laundry service, or beauty salon). Create a cohesive 3-color palette on Coolors.co, pair two matching Google Fonts (one display, one body), and design a clean brand moodboard on Canva.',
    dayOneEstimatedMins: 25,
    typicalTools: ['Canva Mobile / Pro', 'Figma', 'Coolors.co', 'Pinterest', 'Adobe Illustrator', 'Notion Brand Kit'],
    traitProfile: {
      visualCreative: 5,
      logicalStructural: 2,
      peopleCommunication: 4,
      analyticalDetail: 3,
      organizationOps: 3,
      securityCuriosity: 1,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Brand Psychology, Color Theory & Typography',
        tasks: [
          'Study visual hierarchy, color psychology, and font pairing principles',
          'Analyze the visual identity of iconic global and African brands (Flutterwave, Apple, Nike)',
          'Create 3 complete brand color palettes with hex codes and typography pairings'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Design a Complete Brand Style Guide Deck',
        tasks: [
          'Design a fictional fintech or lifestyle startup brand kit: Primary logo, Secondary mark, Color hierarchy, Font rules, and Do/Don’t guidelines',
          'Package the deliverables into an 8-page brand presentation PDF in Canva or Figma',
          'Publish the project on Behance and LinkedIn as a case study'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Monetize Branding Kits for Startups & SMEs',
        tasks: [
          'Offer "Starter Brand Identity Packs" (Logo + Palette + Social Kit) for new Nigerian businesses ($150 - $400)',
          'Collaborate with web developers and social media managers who need client branding assets',
          'Showcase before-and-after brand redesigns on X (Twitter) and Instagram'
        ]
      }
    ],
    resources: [
      {
        name: 'The Futur: Building a Brand Identity (YouTube)',
        url: 'https://www.youtube.com/c/thefuturishere',
        type: 'youtube',
        description: 'World-renowned design masterclasses on client discovery, logo design, color selection, and delivering complete brand books.',
        lowDataFriendly: false
      },
      {
        name: 'Canva Design School: Graphic Design Basics',
        url: 'https://www.canva.com/designschool/',
        type: 'free_course',
        description: 'Understand composition, layout, typography pairing, and contrast right on your phone or laptop.',
        lowDataFriendly: true
      },
      {
        name: 'Brand New (UnderConsideration Archive)',
        url: 'https://www.underconsideration.com/brandnew/',
        type: 'doc',
        description: 'Top global archive reviewing real corporate and startup rebrands, explaining what worked and what flopped.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['Designers Guild Nigeria', 'Creative Nest Africa', 'African Brand Designers']
  },
  {
    id: 'niche-edtech',
    title: 'EdTech & Digital Learning Specialist',
    category: 'non-technical',
    deviceRequirement: 'phone_only_possible',
    supportedOnPhone: true,
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    shortTagline: 'Design digital learning experiences, build online curricula, and train future tech talent',
    description: 'EdTech specialists and instructional coordinators create engaging digital courses, structure curriculum pathways, build interactive student assessments, manage online classrooms, and facilitate cohorts for schools, academies, and tech programs.',
    timeCommitment: '6-10 hrs/week',
    earningHorizon: '2-4 months',
    dayOneAction: 'Pick one topic you understand well (e.g., how to use Canva, how to budget on PiggyVest, or English grammar). Draft a 3-lesson micro-course outline with lesson titles, 3 learning objectives, and a 2-question quiz.',
    dayOneEstimatedMins: 20,
    typicalTools: ['Google Classroom', 'Loom / Screen Recorder', 'Notion', 'Canva', 'YouTube Studio', 'Kahoot / Typeform'],
    traitProfile: {
      visualCreative: 3,
      logicalStructural: 4,
      peopleCommunication: 5,
      analyticalDetail: 4,
      organizationOps: 5,
      securityCuriosity: 1,
    },
    milestones: [
      {
        period: 'Week 1',
        goal: 'Instructional Design Basics & Micro-Learning',
        tasks: [
          'Learn Bloom’s Taxonomy for formulating clear student learning objectives',
          'Design an engaging 5-minute video script or visual slide lesson in Canva',
          'Test creating an interactive quiz on Google Forms or Typeform'
        ]
      },
      {
        period: 'Month 1',
        goal: 'Build and Host a Live Mini-Cohort',
        tasks: [
          'Set up a free Google Classroom or WhatsApp learning hub for 5-10 friends or campus peers',
          'Deliver a 3-day micro-training on a high-demand topic (e.g., smartphone productivity tools)',
          'Collect feedback ratings and learner completion testimonials'
        ]
      },
      {
        period: 'Month 3',
        goal: 'Contract with EdTech Startups & Training Academies',
        tasks: [
          'Apply for Community Manager, Course Coordinator, or Teaching Assistant roles at African EdTech startups (uLesson, AltSchool, Decagon, ALX)',
          'Package your course curriculum outlines as an instructional design portfolio',
          'Monetize private cohort-based workshops or corporate staff digital training'
        ]
      }
    ],
    resources: [
      {
        name: 'Instructional Design for Beginners (YouTube)',
        url: 'https://www.youtube.com/results?search_query=instructional+design+for+beginners',
        type: 'youtube',
        description: 'Comprehensive guide to building online courses and student-centered learning paths without confusing academic jargon.',
        lowDataFriendly: true
      },
      {
        name: 'Coursera: Learning How to Learn (Free Audit)',
        url: 'https://www.coursera.org/learn/learning-how-to-learn',
        type: 'free_course',
        description: 'World-famous course on cognitive science and effective teaching methodologies. Audit completely for free.',
        lowDataFriendly: true
      },
      {
        name: 'OpenLearn: Introduction to Instructional Design',
        url: 'https://www.open.edu/openlearn/education-development/introduction-instructional-design/content-section-0',
        type: 'doc',
        description: 'Free curriculum from Open University on designing digital educational content with clear learner milestones.',
        lowDataFriendly: true
      }
    ],
    relevantCommunities: ['EdTech Hub Africa', 'EduCreators Community', 'Tech4Dev Mentors']
  }
];
