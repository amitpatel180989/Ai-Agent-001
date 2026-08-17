export interface CandidateProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "On-site" | "Remote or Hybrid";
  salaryFloor: number;
  salaryTarget: number;
  yearsExp: number;
  skills: string[];
  bio: string;
  workExperience: {
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    bullets: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  featuredProjects: {
    name: string;
    tech: string[];
    description: string;
    metrics: string;
  }[];
  blacklistCompanies: string[];
  targetRoles: string[];
  targetLocations: string[];
  resumePdfName: string;
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
}

export type ApplicationStatus =
  | "Scouted"
  | "Tailoring"
  | "Applied (While Sleeping)"
  | "Recruiter Viewed"
  | "Screen Scheduled"
  | "Technical Interview"
  | "Offer Received"
  | "Archived";

export interface JobApplication {
  id: string;
  company: string;
  logo?: string;
  title: string;
  location?: string;
  workType: "Remote" | "Hybrid" | "On-site" | "Remote or Hybrid";
  salaryRange: string;
  matchScore: number;
  matchReasons: string[];
  atsKeywordsMatched: string[];
  tailoredResumeHighlight: string;
  coverLetter: string;
  status: ApplicationStatus;
  appliedAt: string;
  jobUrl: string;
  recruiterContact?: {
    name: string;
    title: string;
    email?: string;
  };
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: "recruiter" | "ai_agent" | "candidate";
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
  reasoningNotes?: string[];
  suggestedSlots?: string[];
}

export interface RecruiterThread {
  id: string;
  recruiterName: string;
  recruiterTitle: string;
  company: string;
  avatar: string;
  channel: "LinkedIn InMail" | "Email" | "Wellfound" | "Direct Outreach";
  lastActive: string;
  status: "Action Required" | "Auto-Replied" | "Interview Booked" | "Under Review";
  messages: ChatMessage[];
  candidateMatchScore: number;
  roleDiscussed: string;
  offeredComp?: string;
}

export interface SocialPost {
  id: string;
  platform: "LinkedIn" | "Twitter / X" | "GitHub" | "Substack";
  title: string;
  content: string;
  status: "Scheduled" | "Published" | "Draft";
  scheduledTime: string;
  estimatedReach: string;
  recruiterVisibilityScore: number;
  engagementStats?: {
    likes: number;
    shares: number;
    comments: number;
    recruiterViews: number;
  };
  tags: string[];
}

export type AgentPhase =
  | "PERCEPTION"
  | "REASONING"
  | "TAILORING"
  | "DISPATCH"
  | "RECRUITER_CHAT"
  | "SOCIAL_SYNC"
  | "MEMORY";

export interface AgentThoughtLog {
  id: string;
  timestamp: string;
  phase: AgentPhase | string;
  message: string;
  companyTarget?: string;
  actionTaken?: string;
}

export type AgentThoughtStep = AgentThoughtLog;

export type NavigationTab =
  | "mission_control"
  | "pipeline"
  | "inbox"
  | "resume_tailor"
  | "social_presence"
  | "daily_briefings"
  | "settings";

export interface AgentSettings {
  isAutonomousEnabled: boolean;
  isSleepModeActive: boolean;
  sleepScheduleStart: string; // e.g. "23:00"
  sleepScheduleEnd: string;   // e.g. "07:00"
  speedIntensity: "Conservative (3-5/day)" | "Balanced (8-12/day)" | "Turbo (20-30/day)";
  autoReplyRecruiters: boolean;
  requireApprovalForVIP: boolean;
  toneOfVoice: "Assertive & High-EQ" | "Warm & Technical" | "Diplomatic Executive" | "Concise Professional";
  customInstructions: string;
  autoSocialPublish: boolean;
  minMatchScoreThreshold: number;
}

export interface DailyReport {
  date: string;
  greeting: string;
  executiveSummary: string;
  nightShiftHighlights: string[];
  actionItemsForUser: string[];
  marketInsight: string;
  agentStatus: string;
  stats: {
    scouted: number;
    applied: number;
    recruiterChats: number;
    interviewsScheduled: number;
    postsPublished: number;
  };
}
