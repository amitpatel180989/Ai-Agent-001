import { CandidateProfile, JobApplication, RecruiterThread, SocialPost, AgentThoughtLog, DailyReport, AgentSettings } from "./types";

export const initialCandidateProfile: CandidateProfile = {
  name: "Alex Chen",
  title: "Staff / Senior Full Stack & AI Systems Engineer",
  email: "alex.chen.dev@gmail.com",
  phone: "+1 (415) 890-3421",
  location: "San Francisco, CA (Open to Worldwide Remote)",
  workMode: "Remote or Hybrid",
  salaryFloor: 155000,
  salaryTarget: 210000,
  yearsExp: 7,
  skills: [
    "TypeScript",
    "React 19",
    "Node.js",
    "Python",
    "Gemini / OpenAI APIs",
    "PostgreSQL",
    "Distributed Systems",
    "Tailwind CSS",
    "Docker & Kubernetes",
    "GraphQL / REST",
    "Redis",
    "Next.js",
    "System Architecture",
    "CI/CD Pipelines"
  ],
  bio: "Full Stack & AI Engineer with 7 years crafting high-throughput distributed systems, local-first reactive applications, and autonomous agent workflows. Passionate about developer tooling and seamless user experiences.",
  workExperience: [
    {
      id: "exp-1",
      company: "Apex Cloud Technologies",
      role: "Senior Software Engineer (Full Stack & Core Systems)",
      period: "2022 - Present",
      location: "San Francisco, CA",
      bullets: [
        "Architected distributed event-driven microservices in Node.js and TypeScript handling 3.2M daily transactions with 99.98% uptime.",
        "Engineered real-time collaboration canvas with optimistic UI updates, slashing perceived client latency from 320ms to under 25ms.",
        "Mentored a team of 6 engineers, introduced automated integration test suites that reduced regression bugs by 42%."
      ]
    },
    {
      id: "exp-2",
      company: "Vanguard Labs",
      role: "Full Stack Software Engineer",
      period: "2019 - 2022",
      location: "San Jose, CA",
      bullets: [
        "Rebuilt enterprise customer dashboard using React and Tailwind CSS, increasing page speed score from 58 to 96.",
        "Designed and implemented PostgreSQL query indexing and Redis caching architecture, cutting database I/O load by 50%.",
        "Built OAuth2 and SAML Single Sign-On integrations for over 120 enterprise client tenants."
      ]
    }
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. in Computer Science & Applied Mathematics",
      year: "2015 - 2019"
    }
  ],
  featuredProjects: [
    {
      name: "AgentFlow Autonomous Engine",
      tech: ["TypeScript", "Gemini 3.7", "Node.js", "Redis"],
      description: "Distributed autonomous worker framework orchestrating multi-step AI tool calling with self-correcting state machines.",
      metrics: "5.4k GitHub Stars, 120k monthly active agent loops"
    },
    {
      name: "PulseDB Local-First Engine",
      tech: ["React 19", "WebSockets", "IndexedDB", "Wasm"],
      description: "Zero-latency reactive data store enabling real-time multi-user syncing in offline-first progressive web apps.",
      metrics: "Sub-15ms sync resolution across 10k nodes"
    }
  ],
  blacklistCompanies: ["Meta Recruiting Spam Agency", "Revature", "Generic Offshore Outsource LLC"],
  targetRoles: [
    "Staff Software Engineer",
    "Senior Full Stack Engineer",
    "Founding Engineer / AI Lead",
    "Principal Product Engineer"
  ],
  targetLocations: ["Remote (US & Global)", "San Francisco, CA", "New York, NY", "Seattle, WA"],
  resumePdfName: "Alex_Chen_Staff_FullStack_AI_Resume.pdf",
  githubUrl: "https://github.com/alexchen-dev",
  linkedinUrl: "https://linkedin.com/in/alexchen-staff-engineer",
  portfolioUrl: "https://alexchen.dev"
};

export const initialAgentSettings: AgentSettings = {
  isAutonomousEnabled: true,
  isSleepModeActive: false,
  sleepScheduleStart: "23:00",
  sleepScheduleEnd: "07:00",
  speedIntensity: "Balanced (8-12/day)",
  autoReplyRecruiters: true,
  requireApprovalForVIP: false,
  toneOfVoice: "Assertive & High-EQ",
  customInstructions: "Highlight system architecture and AI agent tooling experience. If recruiter compensation is below $150k, politely decline while leaving the door open for higher-level roles. Always propose 2 specific meeting windows in PST timezone.",
  autoSocialPublish: true,
  minMatchScoreThreshold: 85
};

export const initialApplications: JobApplication[] = [
  {
    id: "job-1",
    company: "Anthropic",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    title: "Senior Full Stack Engineer, Developer Platform",
    location: "San Francisco, CA (Remote Friendly)",
    workType: "Remote",
    salaryRange: "$190,000 - $235,000 + Equity",
    matchScore: 97,
    matchReasons: [
      "Deep expertise in TypeScript & React reactive streaming",
      "Direct hands-on experience orchestrating LLM tool calling pipelines",
      "Strong background in developer ergonomics & API reliability"
    ],
    atsKeywordsMatched: ["TypeScript", "React 19", "LLM APIs", "Distributed Systems", "Developer Tooling", "CI/CD"],
    tailoredResumeHighlight: "Restructured Summary & Project 1 to prominently highlight autonomous agent state machines and latency-critical streaming.",
    coverLetter: `Dear Hiring Team at Anthropic,\n\nI am writing to express my strong enthusiasm for the Senior Full Stack Engineer role on Developer Platform. Having built scalable agentic systems and high-throughput real-time web applications, I have consistently focused on developer ergonomics and resilient API architectures.\n\nIn my previous projects, I architected reactive UI layers powered by modern TypeScript and Node.js microservices, cutting response latency by 38% and supporting thousands of simultaneous sessions. I admire Anthropic's commitment to frontier AI safety and reliable tool use.\n\nI would welcome the opportunity to discuss how my hands-on background in full-stack performance and AI agent workflows can accelerate your developer platform initiatives.\n\nWarm regards,\nAlex Chen`,
    status: "Screen Scheduled",
    appliedAt: "Today at 03:45 AM (While Sleeping)",
    jobUrl: "https://anthropic.com/careers/senior-fullstack",
    recruiterContact: {
      name: "Elena Rostova",
      title: "Staff Technical Recruiter, Core Engineering",
      email: "elena.rostova@anthropic.com"
    },
    notes: "AI Auto-applied at 3:45 AM. Recruiter responded at 7:15 AM with an interview invitation."
  },
  {
    id: "job-2",
    company: "Linear",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=80",
    title: "Staff Product Engineer - Realtime & Collaboration",
    location: "Remote (Global)",
    workType: "Remote",
    salaryRange: "$200,000 - $250,000 + Top Tier Equity",
    matchScore: 95,
    matchReasons: [
      "Obsessive attention to UI speed, micro-interactions, and 60fps animations",
      "Deep local-first architecture and optimistic UI synchronizer experience",
      "Autonomous async-first communication culture match"
    ],
    atsKeywordsMatched: ["Local-First", "WebSockets", "Optimistic UI", "React", "State Management", "Performance Profiling"],
    tailoredResumeHighlight: "Highlighted PulseDB sub-15ms sync resolution metrics and WebSockets real-time concurrency benchmarks.",
    coverLetter: `Dear Linear Team,\n\nLinear's obsession with fluid responsiveness and uncompromising craft aligns directly with my engineering philosophy. I am eager to contribute to the Realtime & Collaboration team as a Staff Product Engineer.\n\nOver the past 7 years, I have specialized in building local-first and optimistic UI architectures where every micro-interaction feels instantaneous. I have designed custom sync protocols and robust client caches that handle intermittent connectivity seamlessly.\n\nI'd love to bring this passion for high-speed software craftsmanship to Linear to help build the future of project tracking.\n\nSincerely,\nAlex Chen`,
    status: "Applied (While Sleeping)",
    appliedAt: "Today at 04:12 AM (While Sleeping)",
    jobUrl: "https://linear.app/careers/staff-product-engineer",
    recruiterContact: {
      name: "Marcus Vance",
      title: "Head of Talent",
      email: "marcus@linear.app"
    },
    notes: "Application dispatched via Linear Ashby portal with 95% ATS score."
  },
  {
    id: "job-3",
    company: "Datadog",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    title: "Staff Engineer - Observability & AI Telemetry",
    location: "San Francisco, CA / Remote",
    workType: "Hybrid",
    salaryRange: "$195,000 - $240,000",
    matchScore: 93,
    matchReasons: [
      "Demonstrated experience in distributed systems telemetry and metrics aggregation",
      "Expertise in Node.js, Python, and high-frequency time-series pipelines",
      "Strong cross-team technical leadership background"
    ],
    atsKeywordsMatched: ["Telemetry", "Distributed Systems", "PostgreSQL", "Node.js", "Docker", "Observability"],
    tailoredResumeHighlight: "Customized experience bullets to emphasize 3.2M daily transaction scaling and telemetry indexing.",
    coverLetter: `Dear Datadog Engineering Leadership,\n\nI am writing to apply for the Staff Engineer - Observability & AI Telemetry role. Datadog has long been the gold standard for cloud-scale observability, and I am excited about the opportunity to build the next generation of AI telemetry pipelines.\n\nIn my current role at Apex Cloud, I designed our real-time telemetry indexing pipelines that process gigabytes of distributed logs with sub-second query turnaround. I look forward to bringing this scalable systems background to Datadog.\n\nBest regards,\nAlex Chen`,
    status: "Technical Interview",
    appliedAt: "Yesterday at 02:18 AM (While Sleeping)",
    jobUrl: "https://careers.datadoghq.com/staff-observability",
    recruiterContact: {
      name: "Sarah Jenkins",
      title: "Lead Technical Recruiter",
      email: "sarah.jenkins@datadoghq.com"
    },
    notes: "Screen completed yesterday with flying colors. Technical architecture interview scheduled for this Friday."
  },
  {
    id: "job-4",
    company: "Stripe",
    logo: "https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=100&auto=format&fit=crop&q=80",
    title: "Senior Full Stack Engineer - AI Agent Integrations",
    location: "Seattle, WA / Remote",
    workType: "Remote",
    salaryRange: "$185,000 - $230,000 + RSUs",
    matchScore: 94,
    matchReasons: [
      "Extensive experience with payment APIs and mission-critical financial safety",
      "Expert TypeScript engineer with rigorous test-driven development habits",
      "Proven capability deploying autonomous agent tool calling systems"
    ],
    atsKeywordsMatched: ["Express", "TypeScript", "Idempotency", "Security", "OAuth 2.0", "Cloud Architecture"],
    tailoredResumeHighlight: "Added emphasis on financial transaction safety, defensive programming, and token security.",
    coverLetter: `Dear Stripe Talent Team,\n\nI am thrilled to apply for the Senior Full Stack Engineer position on the AI Agent Integrations team. As an engineer who relies on Stripe's developer-first APIs, I deeply appreciate the rigor, documentation quality, and security standards Stripe upholds.\n\nI have extensive experience building resilient API pipelines, implementing secure OAuth integrations, and orchestrating autonomous agent workflows with strict guardrails. I would be thrilled to bring these capabilities to Stripe.\n\nBest regards,\nAlex Chen`,
    status: "Recruiter Viewed",
    appliedAt: "Yesterday at 05:00 AM (While Sleeping)",
    jobUrl: "https://stripe.com/jobs/senior-fullstack-ai",
    recruiterContact: {
      name: "David Kim",
      title: "Senior Tech Recruiter",
      email: "dkim@stripe.com"
    },
    notes: "Recruiter viewed full profile and downloaded tailored PDF resume."
  },
  {
    id: "job-5",
    company: "Figma",
    logo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=100&auto=format&fit=crop&q=80",
    title: "Staff Software Engineer - Canvas Performance",
    location: "San Francisco, CA / Remote",
    workType: "Remote or Hybrid",
    salaryRange: "$210,000 - $265,000 + Equity",
    matchScore: 92,
    matchReasons: [
      "Deep understanding of browser rendering engines and WebGL/Canvas pipelines",
      "High performance JavaScript & WebAssembly tuning experience",
      "Track record in collaborative multiplayer applications"
    ],
    atsKeywordsMatched: ["Canvas", "Performance Profiling", "TypeScript", "React", "Multiplayer Sync"],
    tailoredResumeHighlight: "Emphasized real-time collaboration canvas latency reductions from 320ms to 25ms.",
    coverLetter: `Dear Figma Team,\n\nFigma redefined creative software on the web by pushing browser rendering to its absolute limit. I am excited to apply for the Staff Software Engineer role on Canvas Performance.\n\nThroughout my career, I have focused on eliminating frame drops and optimizing rendering loops for high-density reactive UIs. I would love the chance to contribute to Figma's core engine.\n\nSincerely,\nAlex Chen`,
    status: "Applied (While Sleeping)",
    appliedAt: "2 days ago at 04:30 AM (While Sleeping)",
    jobUrl: "https://figma.com/careers/canvas-staff",
    notes: "Auto-applied with custom cover letter and tailored portfolio link."
  },
  {
    id: "job-6",
    company: "OpenAI",
    logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80",
    title: "Founding Engineer - Applied Agent Platform",
    location: "San Francisco, CA",
    workType: "Hybrid",
    salaryRange: "$225,000 - $310,000 + Heavy Equity",
    matchScore: 98,
    matchReasons: [
      "Created open source agent frameworks with 5.4k+ stars",
      "Exceptional grasp of multi-agent orchestration and safety evaluation loops",
      "Rapid prototyping speed paired with production system rigor"
    ],
    atsKeywordsMatched: ["Agentic AI", "LLM Pipelines", "Python", "TypeScript", "Distributed Systems", "Kubernetes"],
    tailoredResumeHighlight: "Positioned AgentFlow Open Source framework as lead headline with real production metrics.",
    coverLetter: `Dear OpenAI Applied Team,\n\nI am applying for the Founding Engineer role on the Applied Agent Platform. Having developed open-source autonomous agent architectures that process hundreds of thousands of monthly workflows, I understand the challenges of reliable tool use, deterministic guardrails, and latency management.\n\nI would be honored to bring my full-stack engineering and agent systems experience to OpenAI.\n\nBest regards,\nAlex Chen`,
    status: "Offer Received",
    appliedAt: "5 days ago",
    jobUrl: "https://openai.com/careers/applied-agent",
    recruiterContact: {
      name: "Priya Sharma",
      title: "Principal Executive Recruiter",
      email: "psharma@openai.com"
    },
    notes: "Formal offer package received! Base $235k + $120k/yr Equity. AI Agent is assisting with negotiation strategy."
  }
];

export const initialRecruiterThreads: RecruiterThread[] = [
  {
    id: "thread-1",
    recruiterName: "Sarah Jenkins",
    recruiterTitle: "Lead Technical Recruiter @ Datadog",
    company: "Datadog",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    channel: "LinkedIn InMail",
    lastActive: "15m ago",
    status: "Interview Booked",
    roleDiscussed: "Staff Engineer - Observability & AI Telemetry",
    offeredComp: "$195k - $240k Base + Equity",
    candidateMatchScore: 93,
    messages: [
      {
        id: "m-1",
        sender: "recruiter",
        text: "Hi Alex! I saw your work on real-time event streaming and your open source AgentFlow repo. We have an open Staff Engineer role on our Observability team with base compensation up to $240k. Are you open to a quick 15-minute chat this week?",
        timestamp: "Yesterday, 07:15 AM"
      },
      {
        id: "m-2",
        sender: "ai_agent",
        isAiGenerated: true,
        text: "Hi Sarah,\n\nThanks for reaching out! The Staff role at Datadog aligns very well with my focus on scalable full-stack systems and high-throughput telemetry pipelines.\n\nI'd be glad to connect for a 15-minute introductory chat. Here are two slots that work well for me (PST):\n• Thursday at 2:30 PM PST\n• Friday at 11:00 AM PST\n\nFeel free to send a calendar invite for whichever suits you best!\n\nBest regards,\nAlex Chen",
        timestamp: "Yesterday, 07:22 AM (Auto-Replied in 7 mins)",
        reasoningNotes: [
          "Identified high-fit opportunity matching candidate experience level.",
          "Verified compensation exceeds user floor of $155k.",
          "Checked candidate calendar and autonomously offered 2 confirmed slots."
        ],
        suggestedSlots: ["Thursday 2:30 PM PST", "Friday 11:00 AM PST"]
      },
      {
        id: "m-3",
        sender: "recruiter",
        text: "Awesome! Thursday at 2:30 PM PST works perfectly. Just sent over the Google Meet invite to alex.chen.dev@gmail.com. Looking forward to our conversation!",
        timestamp: "Yesterday, 08:05 AM"
      }
    ]
  },
  {
    id: "thread-2",
    recruiterName: "Elena Rostova",
    recruiterTitle: "Staff Technical Recruiter @ Anthropic",
    company: "Anthropic",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    channel: "Email",
    lastActive: "1h ago",
    status: "Action Required",
    roleDiscussed: "Senior Full Stack Engineer, Developer Platform",
    offeredComp: "$190k - $235k + Equity",
    candidateMatchScore: 97,
    messages: [
      {
        id: "m-4",
        sender: "recruiter",
        text: "Hi Alex, thank you for your application to Anthropic! The team was very impressed by your background in developer tooling and AI agent workflows. We would love to invite you to a 30-minute initial video screen with our engineering hiring manager. What does your availability look like next Monday or Tuesday afternoon?",
        timestamp: "Today, 07:15 AM"
      }
    ]
  },
  {
    id: "thread-3",
    recruiterName: "Mark Harrison",
    recruiterTitle: "Head of Talent @ Stripe",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    channel: "LinkedIn InMail",
    lastActive: "3h ago",
    status: "Auto-Replied",
    roleDiscussed: "Senior Full Stack Engineer - AI Integrations",
    offeredComp: "$185k - $230k",
    candidateMatchScore: 94,
    messages: [
      {
        id: "m-5",
        sender: "recruiter",
        text: "Hey Alex, saw your recent LinkedIn breakdown on agentic orchestration state machines. Extremely sharp insights. We are staffing a brand new initiative around AI agent payments. Would love to send over some confidential specs if you're interested.",
        timestamp: "Yesterday, 04:30 PM"
      },
      {
        id: "m-6",
        sender: "ai_agent",
        isAiGenerated: true,
        text: "Hi Mark,\n\nThank you for the kind words on my post! Building safe financial rails for autonomous agents is one of the most exciting frontiers right now. I'd love to review the specs and explore how my background in distributed systems and agent tool-calling can contribute.\n\nPlease feel free to share them here or over email at alex.chen.dev@gmail.com.\n\nBest,\nAlex",
        timestamp: "Yesterday, 04:41 PM (Auto-Replied)",
        reasoningNotes: [
          "Recognized high-reputation inbound lead from Stripe talent leadership.",
          "Engaged conversationally while referencing technical alignment."
        ]
      }
    ]
  },
  {
    id: "thread-4",
    recruiterName: "Priya Sharma",
    recruiterTitle: "Executive Talent Partner @ OpenAI",
    company: "OpenAI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    channel: "Direct Outreach",
    lastActive: "4h ago",
    status: "Under Review",
    roleDiscussed: "Founding Engineer - Applied Agent Platform",
    offeredComp: "$235k Base + $120k/yr Equity",
    candidateMatchScore: 98,
    messages: [
      {
        id: "m-7",
        sender: "recruiter",
        text: "Alex, congratulations! The executive committee loved your technical system design debrief. We have officially generated your formal offer letter. Take a look at the attached package and let us know when you'd like to do a quick debrief with Sam and the team.",
        timestamp: "Yesterday, 06:00 PM"
      }
    ]
  }
];

export const initialSocialPosts: SocialPost[] = [
  {
    id: "post-1",
    platform: "LinkedIn",
    title: "Why Autonomous AI Agents Need Deterministic State Machines",
    content: `Most autonomous AI systems fail not at the LLM level, but at the orchestration boundary.\n\nOver the past few weeks, I’ve been stress-testing agentic loops running 24/7 background tasks. Here are 3 non-obvious architecture lessons:\n\n1. Deterministic State Machines > Pure ReAct Loops\nGiving an LLM an open prompt loop causes drift. Ground your agent in a strict finite state machine (Perception → Guardrail → Action → Verification).\n\n2. Optimistic UI + Server Side Telemetry\nWhen an agent performs multi-step tasks, stream reasoning steps via SSE rather than waiting for full completion.\n\n3. Defensive Fallbacks are Mandatory\nAlways maintain a deterministic heuristic layer so transient network drops never break user workflows.\n\nWhat’s your biggest challenge when deploying production AI agents?\n\n#SoftwareEngineering #TypeScript #ArtificialIntelligence #SystemDesign #WebDev`,
    status: "Published",
    scheduledTime: "Yesterday at 08:30 AM",
    estimatedReach: "3,800 - 6,500 views",
    recruiterVisibilityScore: 96,
    engagementStats: {
      likes: 184,
      shares: 28,
      comments: 39,
      recruiterViews: 67
    },
    tags: ["AgenticAI", "SystemDesign", "TypeScript", "WebDev"]
  },
  {
    id: "post-2",
    platform: "Twitter / X",
    title: "10x Faster React 19 State Hydration Patterns",
    content: `Thread on optimizing client-side state in high-density web apps 🧵👇\n\n1/ Don't store server-derived data in React component state. Use URL params + lightweight memoized caches.\n2/ React 19 Action transitions prevent UI freezing during heavy background sync.\n3/ Web Workers for JSON parse & crypto operations keep the main thread locked at a silky 60fps.`,
    status: "Published",
    scheduledTime: "2 days ago at 11:00 AM",
    estimatedReach: "8,200 impressions",
    recruiterVisibilityScore: 91,
    engagementStats: {
      likes: 312,
      shares: 64,
      comments: 41,
      recruiterViews: 82
    },
    tags: ["React19", "JavaScript", "Frontend"]
  },
  {
    id: "post-3",
    platform: "LinkedIn",
    title: "Scaling Real-Time WebSockets to 50k Concurrent Sessions",
    content: `When scaling real-time collaboration engines, traditional polling quickly destroys server memory.\n\nHere's how we structured our Redis Pub/Sub cluster to handle 50k simultaneous clients with sub-25ms roundtrips:\n\n• Delta-only state broadcasting\n• Binary protobuf payloads over raw JSON\n• Client-side reconciliation loops with optimistic conflict resolution\n\nCurious how other teams approach high-concurrency multiplayer infrastructure!`,
    status: "Scheduled",
    scheduledTime: "Tomorrow at 08:30 AM EST (Optimal Recruiter Traffic)",
    estimatedReach: "4,000 - 7,000 views",
    recruiterVisibilityScore: 94,
    tags: ["DistributedSystems", "WebSockets", "Architecture"]
  },
  {
    id: "post-4",
    platform: "GitHub",
    title: "Release v2.4: AgentFlow Autonomous Memory Indexing",
    content: `Shipped v2.4 of AgentFlow with zero-dependency hierarchical memory indexing and support for Gemini 3.7 Flash structured tool outputs. Benchmarks show a 4x reduction in token overhead for multi-day continuous tasks.`,
    status: "Published",
    scheduledTime: "3 days ago",
    estimatedReach: "1.2k repo visits",
    recruiterVisibilityScore: 95,
    engagementStats: {
      likes: 95,
      shares: 12,
      comments: 8,
      recruiterViews: 45
    },
    tags: ["OpenSource", "AI", "GitHub"]
  }
];

export const initialThoughtLogs: AgentThoughtLog[] = [
  {
    id: "log-1",
    timestamp: "04:12:08 AM",
    phase: "PERCEPTION",
    message: "Night Shift Active (Candidate is asleep). Polling 8 remote job feeds (Greenhouse, Lever, Ashby, LinkedIn, YC Work).",
    actionTaken: "Scanned 42 newly listed engineering jobs in the last 4 hours."
  },
  {
    id: "log-2",
    timestamp: "04:12:35 AM",
    phase: "REASONING",
    message: "Filtering jobs against candidate criteria: Salary >= $155k, Remote/SF Hybrid, Tech Stack: TS/React/AI.",
    actionTaken: "Filtered out 36 postings (below comp threshold or out-of-scope stack). 6 VIP opportunities identified."
  },
  {
    id: "log-3",
    timestamp: "04:13:10 AM",
    phase: "TAILORING",
    message: "Executing deep ATS optimization for Anthropic & Linear postings. Aligning distributed systems & AI tool-calling keywords.",
    companyTarget: "Anthropic & Linear",
    actionTaken: "Synthesized customized resume bullets and tailored 3-paragraph executive cover letters."
  },
  {
    id: "log-4",
    timestamp: "04:14:42 AM",
    phase: "DISPATCH",
    message: "Autonomously populated multi-page application forms, uploaded tailored PDFs, and passed screening questionnaires.",
    companyTarget: "Anthropic, Linear, Stripe",
    actionTaken: "3 high-priority applications submitted successfully with confirmation receipts."
  },
  {
    id: "log-5",
    timestamp: "04:15:20 AM",
    phase: "RECRUITER_CHAT",
    message: "Detected new InMail message from Sarah Jenkins @ Datadog offering $240k Staff role.",
    companyTarget: "Datadog",
    actionTaken: "Analyzed schedule, verified PST time zones, and drafted/sent polite confirmation for Thursday 2:30 PM."
  },
  {
    id: "log-6",
    timestamp: "04:16:00 AM",
    phase: "SOCIAL_SYNC",
    message: "Scheduled high-engagement LinkedIn post on 'Autonomous State Machines' for 08:30 AM EST peak visibility.",
    actionTaken: "Queued post to elevate candidate recruiter feed presence."
  },
  {
    id: "log-7",
    timestamp: "04:16:30 AM",
    phase: "MEMORY",
    message: "Updated candidate application CRM, synced calendar slots, and compiled Morning Executive Briefing report.",
    actionTaken: "System idling until next scheduled scan at 05:00 AM."
  }
];

export const initialDailyReport: DailyReport = {
  date: "August 17, 2026",
  greeting: "Good morning, Alex! Your 24/7 Agent worked through the night while you were sleeping.",
  executiveSummary: "Between 11:00 PM and 06:30 AM, your AI Agent evaluated 42 new job postings, automatically submitted 3 hyper-tailored applications to top-tier teams, and booked a 15-minute introductory screen with Datadog.",
  nightShiftHighlights: [
    "Successfully applied to Anthropic (Senior Full Stack, Dev Platform) with 97% ATS match score.",
    "Submitted tailored application to Linear (Staff Product Engineer) highlighting sub-15ms sync architecture.",
    "Autonomously responded to Sarah Jenkins (Lead Recruiter @ Datadog) and confirmed initial call for Thursday at 2:30 PM PST.",
    "Scheduled viral LinkedIn engineering post timed for peak 8:30 AM EST recruiter feed traffic."
  ],
  actionItemsForUser: [
    "Review prep notes for Datadog introductory screen (Thursday 2:30 PM PST).",
    "Review and approve reply to Elena Rostova @ Anthropic regarding Monday/Tuesday interview availability.",
    "Inspect offer package details from OpenAI (Founding Engineer role)."
  ],
  marketInsight: "Staff & Lead AI Full Stack positions in SF and Remote saw a 24% week-over-week hiring surge. Hiring teams are heavily prioritizing hands-on agent orchestration and low-latency frontend architectures.",
  agentStatus: "Autonomous 24/7 Heartbeat Running (Active)",
  stats: {
    scouted: 42,
    applied: 6,
    recruiterChats: 4,
    interviewsScheduled: 2,
    postsPublished: 3
  }
};

// Aliases
export const mockApplications = initialApplications;
export const mockRecruiterThreads = initialRecruiterThreads;
export const mockSocialPosts = initialSocialPosts;
export const mockDailyReport = initialDailyReport;

