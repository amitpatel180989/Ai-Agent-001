import React, { useEffect, useState } from "react";
import {
  Bell,
  Bot,
  CheckCircle2,
  Clock,
  Coffee,
  Moon,
  Sparkles,
  Sun,
  X,
  Zap
} from "lucide-react";
import { ApplicationStatus, CandidateProfile, DailyReport, JobApplication, RecruiterThread } from "../types";

interface SleepSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNightShiftComplete: (newJobs: JobApplication[], newThreadMsg: RecruiterThread) => void;
  candidateProfile: CandidateProfile;
}

export const SleepSimulationModal: React.FC<SleepSimulationModalProps> = ({
  isOpen,
  onClose,
  onNightShiftComplete,
  candidateProfile
}) => {
  if (!isOpen) return null;

  const [stepIndex, setStepIndex] = useState(0);
  const [clockTime, setClockTime] = useState("11:00 PM");
  const [isFinished, setIsFinished] = useState(false);

  const simulationEvents = [
    {
      time: "11:15 PM",
      title: "Scouting Multi-Platform Feeds",
      detail: "Screened 142 new senior & staff openings on Greenhouse, Ashby, YC WorkAtAStartup & LinkedIn."
    },
    {
      time: "01:30 AM",
      title: "Guardrails & Salary Verification",
      detail: `Filtered against $${(candidateProfile.salaryFloor / 1000)}k floor. Excluded blacklisted firms. Isolated 3 prime matches (92-98%).`
    },
    {
      time: "02:45 AM",
      title: "Gemini ATS Resume Tailoring",
      detail: "Injected local-first & distributed systems keywords, restructured metrics into STAR impact format."
    },
    {
      time: "03:50 AM",
      title: "Overnight Job Applications Dispatched",
      detail: "Auto-submitted tailored applications + executive cover letters to Linear, Vercel, and Figma."
    },
    {
      time: "05:10 AM",
      title: "Recruiter InMail Inbound & Auto-Reply",
      detail: "Datadog lead recruiter sent interview screen. Agent checked calendar and offered Tuesday 2:00 PM slots."
    },
    {
      time: "06:40 AM",
      title: "Social Presence Peak Booster",
      detail: "Scheduled technical thought leadership post on 'Distributed WebSockets' for morning recruiter traffic."
    },
    {
      time: "07:00 AM",
      title: "Good Morning! Night Shift Complete",
      detail: "Agent finalized comprehensive morning briefing and intelligence dashboard."
    }
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < simulationEvents.length) {
        setStepIndex(current);
        setClockTime(simulationEvents[current].time);
      } else {
        setIsFinished(true);
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const handleFinishAndWakeup = () => {
    // Generate new overnight application
    const overnightJob: JobApplication = {
      id: `app-overnight-${Date.now()}`,
      company: "Vercel",
      title: "Staff AI Infrastructure Engineer",
      salaryRange: "$210,000 - $260,000",
      workType: "Remote",
      matchScore: 98,
      status: "Applied (While Sleeping)",
      appliedAt: `Today at 03:50 AM (While Sleeping)`,
      jobUrl: "https://vercel.com/careers",
      tailoredResumeHighlight: "Quantified edge runtime caching and sub-10ms prompt compilation pipeline.",
      atsKeywordsMatched: ["Next.js", "Edge Compute", "Turbopack", "AI SDK", "Distributed Systems"],
      coverLetter: `Hi Vercel Engineering Team,\n\nI noticed your recent expansion in autonomous edge AI tooling. Over the past 6+ years, I have focused on high-concurrency real-time web applications with sub-10ms latencies. I would love to bring this velocity to Vercel's edge infrastructure.\n\nBest regards,\n${candidateProfile.name}`,
      matchReasons: [
        "100% Remote compatible",
        "Compensation exceeds $210k target",
        "Direct alignment with Next.js and distributed runtime systems"
      ]
    };

    onNightShiftComplete([overnightJob], {} as any);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-indigo-500/30 flex flex-col space-y-6 relative overflow-hidden">
        {/* Animated Night Sky Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center justify-center">
              {isFinished ? <Sun className="w-6 h-6 text-amber-400 animate-spin-slow" /> : <Moon className="w-6 h-6 text-indigo-400 animate-pulse" />}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-400">
                24/7 Autonomous Sleep Mode Fast-Forward
              </span>
              <h3 className="text-xl font-bold text-white">
                {isFinished ? "Good Morning! You're Awake." : "Agent Working While You Sleep..."}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Virtual Clock</span>
            <span className="text-lg font-black text-amber-400 font-mono flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {clockTime}
            </span>
          </div>
        </div>

        {/* Live Timeline of Night Shift Actions */}
        <div className="space-y-3 relative z-10 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
          {simulationEvents.slice(0, stepIndex + 1).map((evt, idx) => {
            const isCurrent = idx === stepIndex && !isFinished;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all duration-500 text-xs flex items-start gap-3 ${
                  isCurrent
                    ? "bg-indigo-950/80 border-indigo-400 text-white shadow-lg shadow-indigo-950"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-300"
                }`}
              >
                <div className="mt-0.5">
                  {idx < stepIndex || isFinished ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white">{evt.title}</span>
                    <span className="text-[10px] font-mono text-indigo-300">{evt.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{evt.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Action */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-4 relative z-10">
          <span className="text-xs text-slate-400">
            {isFinished ? "1 new job applied, 1 recruiter answered, briefing ready." : "Simulating 8-hour overnight cycle in 7 seconds..."}
          </span>

          {isFinished ? (
            <button
              onClick={handleFinishAndWakeup}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white shadow-lg transition cursor-pointer"
            >
              <Coffee className="w-4 h-4" />
              <span>Review Morning Report & Apps</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setStepIndex(simulationEvents.length - 1);
                setIsFinished(true);
                setClockTime("07:00 AM");
              }}
              className="text-xs text-indigo-400 hover:underline"
            >
              Fast Forward to Morning →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
