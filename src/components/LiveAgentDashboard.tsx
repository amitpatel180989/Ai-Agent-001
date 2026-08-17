import React, { useState } from "react";
import {
  Activity,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Flame,
  Globe,
  MessageSquare,
  Moon,
  Play,
  Send,
  Sparkles,
  Zap,
  Sliders,
  TrendingUp,
  FileCheck2,
  ShieldCheck
} from "lucide-react";
import { AgentSettings, AgentThoughtLog, CandidateProfile, DailyReport, JobApplication, NavigationTab, RecruiterThread } from "../types";
import { getPhaseColor } from "../utils";

interface LiveAgentDashboardProps {
  settings: AgentSettings;
  setSettings?: React.Dispatch<React.SetStateAction<AgentSettings>>;
  candidateProfile: CandidateProfile;
  applications: JobApplication[];
  recruiterThreads: RecruiterThread[];
  thoughtLogs: AgentThoughtLog[];
  dailyReport: DailyReport;
  onRunAgentCycle: () => void;
  onOpenSleepModal: () => void;
  isAgentRunning: boolean;
  onSelectApplication: (job: JobApplication) => void;
  onSelectRecruiterThread?: (threadId: string) => void;
  setActiveTab?: (tab: NavigationTab) => void;
}

export const LiveAgentDashboard: React.FC<LiveAgentDashboardProps> = ({
  settings,
  setSettings,
  candidateProfile,
  applications,
  recruiterThreads,
  thoughtLogs,
  dailyReport,
  onRunAgentCycle,
  onOpenSleepModal,
  isAgentRunning,
  onSelectApplication,
  onSelectRecruiterThread,
  setActiveTab
}) => {

  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>("ALL");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [customPromptStatus, setCustomPromptStatus] = useState<string>("");

  const filteredLogs = selectedPhaseFilter === "ALL"
    ? thoughtLogs
    : thoughtLogs.filter((log) => log.phase === selectedPhaseFilter);

  const appliedWhileSleepingCount = applications.filter((j) =>
    j.appliedAt.toLowerCase().includes("sleeping") || j.status === "Applied (While Sleeping)"
  ).length;

  const interviewCount = applications.filter((j) =>
    j.status === "Screen Scheduled" || j.status === "Technical Interview" || j.status === "Offer Received"
  ).length;

  const handleCustomInstructionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    setCustomPromptStatus("Processing instructions...");
    setTimeout(() => {
      if (setSettings) {
        setSettings((prev) => ({
          ...prev,
          customInstructions: `${prev.customInstructions}\n[User Directive]: ${customPrompt}`
        }));
      }
      setCustomPromptStatus("✓ Agent updated directive: Priority applied immediately to 24/7 scheduler.");
      setCustomPrompt("");
      setTimeout(() => setCustomPromptStatus(""), 4000);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 24/7 Agent Autonomous Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                AUTONOMOUS 24/7 LOOP: ONLINE
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-200 border border-indigo-500/30">
                <Moon className="w-3.5 h-3.5 text-indigo-300" />
                Night Shift Auto-Apply Active (11:00 PM – 07:00 AM)
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30">
                <BrainCircuit className="w-3.5 h-3.5 text-purple-300" />
                Gemini 3.7 Cognitive Engine
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Autonomous Career Agent for {candidateProfile.name}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Your agent works around the clock: scouting 8 remote job boards, tailoring ATS resumes per job description, submitting applications at peak recruiter opening windows (06:30 AM), and conversing with HRs using human-like executive emotional intelligence.
            </p>
          </div>

          {/* Quick Simulation & Trigger Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <button
              id="hero-sleep-sim-btn"
              onClick={onOpenSleepModal}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition transform active:scale-98 cursor-pointer"
            >
              <Moon className="w-4 h-4" />
              <span>Simulate Night Sleep (8 Hours)</span>
            </button>

            <button
              id="hero-instant-cycle-btn"
              onClick={onRunAgentCycle}
              disabled={isAgentRunning}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 transition active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              <Zap className={`w-4 h-4 text-amber-400 ${isAgentRunning ? "animate-spin" : ""}`} />
              <span>{isAgentRunning ? "Executing Multi-Agent Loop..." : "Trigger Live Hunt Cycle Now"}</span>
            </button>
          </div>
        </div>

        {/* Live Step Progress Pipeline */}
        <div className="mt-8 pt-6 border-t border-indigo-900/60 grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { step: "1. Perception", desc: "Scan 8 Job Feeds & InMails", icon: Globe, active: true },
            { step: "2. Guardrails", desc: "Check Salary Floor & Culture", icon: ShieldCheck, active: true },
            { step: "3. Live Tailoring", desc: "ATS Resume & Cover Letter", icon: BrainCircuit, active: true },
            { step: "4. Auto-Apply", desc: "Submit via Ashby/Greenhouse", icon: Send, active: true },
            { step: "5. Recruiter Chat", desc: "Human-Like Replies & Booking", icon: MessageSquare, active: true }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex flex-col gap-1 text-left"
            >
              <div className="flex items-center justify-between text-xs text-indigo-300 font-semibold">
                <span className="flex items-center gap-1.5">
                  <item.icon className="w-3.5 h-3.5 text-indigo-400" />
                  {item.step}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <span className="text-xs text-slate-300 font-medium truncate">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 24/7 Intelligence Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-800/90 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Jobs Screened</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">42</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              +14 past night shift
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Applied While Asleep</span>
            <Moon className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">{appliedWhileSleepingCount}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Avg match: 95.2%
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Recruiter InMails</span>
            <MessageSquare className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600 dark:text-sky-400">{recruiterThreads.length}</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              100% Auto-replied &lt;8 min
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Interviews & Offers</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">{interviewCount}</div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-0.5">
              1 Active Offer (OpenAI)
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/90 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Social Recruiter Reach</span>
            <Sparkles className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">12.8k</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              193 recruiter views
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Night Shift Brief + Live Thought Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols): While You Were Sleeping Highlight & Quick Directives */}
        <div className="lg:col-span-5 space-y-6">
          {/* Night Shift Card */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">While You Were Sleeping</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Night shift activity briefing summary</p>
                </div>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                Completed 06:30 AM
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed">
              {dailyReport.executiveSummary}
            </p>

            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Key Night Shift Actions:</h4>
              {dailyReport.nightShiftHighlights.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Next Scheduled Sweep:</span>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> In 35 minutes
              </span>
            </div>
          </div>

          {/* Quick Directive to Agent */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Direct Agent Instruction</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Give natural language instructions to your 24/7 agent</p>
              </div>
            </div>

            <form onSubmit={handleCustomInstructionSubmit} className="space-y-3">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Prioritize Staff AI Engineer roles in SF offering >$200k. If Stripe or Anthropic recruiters reach out, accept interview immediately."
                rows={3}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />

              {customPromptStatus && (
                <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  {customPromptStatus}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Inject Directive into 24/7 Agent Memory</span>
              </button>
            </form>
          </div>

          {/* High Priority Active Inquiries */}
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-sky-500" />
                Live Recruiter Inquiries
              </h3>
              <span
                onClick={() => setActiveTab && setActiveTab("inbox")}
                className="text-xs text-indigo-600 font-semibold cursor-pointer hover:text-indigo-700"
              >
                View All ({recruiterThreads.length})
              </span>
            </div>

            <div className="space-y-2.5">
              {recruiterThreads.slice(0, 3).map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => {
                    if (onSelectRecruiterThread) onSelectRecruiterThread(thread.id);
                    if (setActiveTab) setActiveTab("inbox");
                  }}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-800 transition cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={thread.avatar}
                      alt={thread.recruiterName}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-300 dark:border-slate-700"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white truncate">{thread.recruiterName}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">({thread.company})</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 truncate">
                        {thread.messages[thread.messages.length - 1]?.text}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    thread.status === "Interview Booked"
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                  }`}>
                    {thread.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Live Agent Thought Stream Terminal */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col h-full min-h-[580px]">
            {/* Terminal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/70 dark:bg-slate-900/40 rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    Live Agent Cognitive Stream
                    <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Real-time Feed
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Perception → Reasoning → ATS Tailor → Dispatch → Memory
                  </p>
                </div>
              </div>

              {/* Phase Filter Buttons */}
              <div className="flex flex-wrap gap-1">
                {["ALL", "PERCEPTION", "REASONING", "TAILORING", "DISPATCH", "RECRUITER_CHAT"].map((phase) => (
                  <button
                    key={phase}
                    onClick={() => setSelectedPhaseFilter(phase)}
                    className={`text-[10px] px-2 py-1 rounded-md font-semibold transition ${
                      selectedPhaseFilter === phase
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300"
                    }`}
                  >
                    {phase}
                  </button>
                ))}
              </div>
            </div>

            {/* Log Stream Terminal */}
            <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3 font-mono text-xs max-h-[500px] scrollbar-thin">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1.5 transition hover:border-indigo-300 dark:hover:border-indigo-800"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getPhaseColor(log.phase)}`}>
                        {log.phase}
                      </span>
                      {log.companyTarget && (
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          @{log.companyTarget}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{log.timestamp}</span>
                  </div>

                  <p className="text-slate-800 dark:text-slate-200 font-sans text-xs leading-relaxed">
                    {log.message}
                  </p>

                  {log.actionTaken && (
                    <div className="pt-1 text-[11px] text-indigo-600 dark:text-indigo-400 font-sans font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{log.actionTaken}</span>
                    </div>
                  )}
                </div>
              ))}

              {isAgentRunning && (
                <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 animate-pulse flex items-center gap-3">
                  <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-bounce" />
                  <span className="text-xs font-sans font-semibold text-indigo-700 dark:text-indigo-300">
                    Agent executing autonomous cycle (Scouting → Tailoring → ATS Injection → Form Dispatch)...
                  </span>
                </div>
              )}
            </div>

            {/* Quick Applications Preview Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/40 rounded-b-2xl">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                <span>Recently Dispatched Applications (While Sleeping):</span>
                <span className="text-indigo-600 dark:text-indigo-400">Total: {applications.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {applications.slice(0, 3).map((job) => (
                  <div
                    key={job.id}
                    onClick={() => onSelectApplication(job)}
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 transition cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white truncate">{job.company}</span>
                      <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">{job.matchScore}%</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{job.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
