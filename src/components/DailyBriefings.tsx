import React, { useState } from "react";
import {
  Activity,
  AlertCircle,
  Award,
  Bot,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  Lightbulb,
  Moon,
  RefreshCw,
  Sparkles,
  Sun,
  TrendingUp,
  Zap
} from "lucide-react";
import { CandidateProfile, DailyReport, JobApplication, RecruiterThread } from "../types";

interface DailyBriefingsProps {
  dailyReport: DailyReport;
  setDailyReport: React.Dispatch<React.SetStateAction<DailyReport>>;
  candidateProfile: CandidateProfile;
  applications: JobApplication[];
  recruiterThreads: RecruiterThread[];
}

export const DailyBriefings: React.FC<DailyBriefingsProps> = ({
  dailyReport,
  setDailyReport,
  candidateProfile,
  applications,
  recruiterThreads
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshBriefing = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/reports/daily-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateProfile,
          stats: dailyReport.stats,
          recentActivity: {
            appliedJobs: applications.slice(0, 4).map((j) => j.company),
            recruiters: recruiterThreads.slice(0, 3).map((r) => r.recruiterName)
          }
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setDailyReport({
          ...dailyReport,
          ...data.data,
          date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
        });
      }
    } catch (e) {
      console.error("Failed to generate fresh daily report", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Morning Briefing Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/50 space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Daily Morning Executive Briefing
                </span>
                <span className="text-xs text-slate-400">• {dailyReport.date}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {dailyReport.greeting}
              </h2>
            </div>
          </div>

          <button
            onClick={handleRefreshBriefing}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Synthesizing AI Brief..." : "Re-generate Morning Brief"}</span>
          </button>
        </div>

        {/* Executive Summary */}
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
          {dailyReport.executiveSummary}
        </p>

        {/* 24/7 Night Shift Activity Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Jobs Screened</span>
            <span className="text-xl font-black text-white">{dailyReport.stats.scouted}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Applied Overnight</span>
            <span className="text-xl font-black text-emerald-400">+{dailyReport.stats.applied}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Recruiter InMails</span>
            <span className="text-xl font-black text-sky-400">{dailyReport.stats.recruiterChats}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Interviews Booked</span>
            <span className="text-xl font-black text-amber-400">{dailyReport.stats.interviewsScheduled}</span>
          </div>
          <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-center col-span-2 sm:col-span-1">
            <span className="text-[10px] uppercase font-bold text-slate-300 block">Social Posts</span>
            <span className="text-xl font-black text-purple-400">{dailyReport.stats.postsPublished}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Night Shift Accomplishments & Today's Action Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Night Shift Highlights */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Night Shift Actions Completed</h3>
              <p className="text-xs text-slate-500">Autonomous executions while you were sleeping</p>
            </div>
          </div>

          <div className="space-y-3">
            {dailyReport.nightShiftHighlights.map((highlight, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-800 dark:text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Action Items for Today */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Action Items for You Today</h3>
              <p className="text-xs text-slate-500">Decisions requiring human review</p>
            </div>
          </div>

          <div className="space-y-3">
            {dailyReport.actionItemsForUser.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200"
              >
                <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Intelligence Trends */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Market Demand & Salary Insights</h3>
            <p className="text-xs text-slate-500">Live industry hiring signals for your skill profile</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          {dailyReport.marketInsight}
        </p>
      </div>
    </div>
  );
};
