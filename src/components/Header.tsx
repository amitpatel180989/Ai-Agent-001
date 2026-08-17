import React from "react";
import { Bot, Moon, Sparkles, Zap, ShieldCheck, Activity, BrainCircuit } from "lucide-react";
import { AgentSettings, CandidateProfile, NavigationTab } from "../types";

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  candidateProfile: CandidateProfile;
  settings: AgentSettings;
  onOpenSleepModal: () => void;
  onRunAgentCycle?: () => void;
  isAgentRunning?: boolean;
  unreadMessagesCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  candidateProfile,
  settings,
  onOpenSleepModal,
  onRunAgentCycle,
  isAgentRunning = false,
  unreadMessagesCount = 1
}) => {
  const tabs: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "mission_control", label: "Mission Control", icon: Activity },
    { id: "pipeline", label: "Jobs Pipeline", icon: Zap, badge: "6 Active" },
    { id: "inbox", label: "Recruiter AI Chat", icon: Bot, badge: unreadMessagesCount > 0 ? `${unreadMessagesCount} Action` : undefined },
    { id: "resume_tailor", label: "Resume & ATS Tailor", icon: BrainCircuit },
    { id: "social_presence", label: "Social Autopilot", icon: Sparkles },
    { id: "daily_briefings", label: "Daily Briefings", icon: Moon, badge: "New" },
    { id: "settings", label: "Profile & Rules", icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo & Agent status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-200">
              A
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-slate-900 tracking-tight text-base sm:text-lg flex items-center gap-2">
                  <span>Aether Agent</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-normal">
                    ID: AG-8842-X
                  </span>
                  <span className="hidden sm:inline text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-100">
                    Mode: Nocturnal Hunt
                  </span>
                </h1>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  System Fully Operational (24/7)
                </span>
                <span className="hidden md:inline text-slate-300">•</span>
                <span className="hidden md:inline">
                  Night Window: {settings.sleepScheduleStart} - {settings.sleepScheduleEnd}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Execution Actions & User Profile info */}
          <div className="flex items-center gap-3">
            <button
              id="simulate-sleep-btn"
              onClick={onOpenSleepModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition shadow-xs cursor-pointer"
              title="Simulate candidate sleeping for 8 hours while the AI agent works autonomously"
            >
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden md:inline">Simulate Night Sleep (8h)</span>
              <span className="md:hidden">Sleep Sim</span>
            </button>

            {onRunAgentCycle && (
              <button
                id="run-agent-cycle-btn"
                onClick={onRunAgentCycle}
                disabled={isAgentRunning}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 active:scale-98 disabled:opacity-70 text-white shadow-sm shadow-indigo-600/30 transition cursor-pointer"
              >
                <Zap className={`w-3.5 h-3.5 ${isAgentRunning ? "animate-spin" : ""}`} />
                <span>{isAgentRunning ? "Agent Working..." : "Run Instant Hunt"}</span>
              </button>
            )}

            {/* Candidate avatar pill */}
            <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900 leading-tight">{candidateProfile.name}</p>
                <p className="text-xs text-slate-500 leading-tight truncate max-w-[140px]">{candidateProfile.title}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-slate-100">
                {candidateProfile.name.split(" ").map(n => n[0]).join("")}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-1.5 overflow-x-auto scrollbar-none py-1.5 border-t border-slate-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
