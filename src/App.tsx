import React, { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { LiveAgentDashboard } from "./components/LiveAgentDashboard";
import { ApplicationsPipeline } from "./components/ApplicationsPipeline";
import { RecruiterInbox } from "./components/RecruiterInbox";
import { ResumeTailorStudio } from "./components/ResumeTailorStudio";
import { SocialPresenceHub } from "./components/SocialPresenceHub";
import { DailyBriefings } from "./components/DailyBriefings";
import { CandidateSettings } from "./components/CandidateSettings";
import { JobDetailModal } from "./components/JobDetailModal";
import { SleepSimulationModal } from "./components/SleepSimulationModal";
import { NewJobModal } from "./components/NewJobModal";

import {
  AgentSettings,
  AgentThoughtStep,
  ApplicationStatus,
  CandidateProfile,
  DailyReport,
  JobApplication,
  NavigationTab,
  RecruiterThread,
  SocialPost
} from "./types";

import {
  initialAgentSettings,
  initialCandidateProfile,
  initialThoughtLogs,
  mockApplications,
  mockDailyReport,
  mockRecruiterThreads,
  mockSocialPosts
} from "./mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>("mission_control");

  // Core Data States
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(initialCandidateProfile);
  const [agentSettings, setAgentSettings] = useState<AgentSettings>(initialAgentSettings);
  const [applications, setApplications] = useState<JobApplication[]>(mockApplications);
  const [recruiterThreads, setRecruiterThreads] = useState<RecruiterThread[]>(mockRecruiterThreads);
  const [dailyReport, setDailyReport] = useState<DailyReport>(mockDailyReport);
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(mockSocialPosts);
  const [thoughtLogs, setThoughtLogs] = useState<AgentThoughtStep[]>(initialThoughtLogs);

  // UI Interactive States
  const [isAgentCycleRunning, setIsAgentCycleRunning] = useState<boolean>(false);
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobApplication | null>(null);
  const [isSleepModalOpen, setIsSleepModalOpen] = useState<boolean>(false);
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState<boolean>(false);
  const [activeInboxThreadId, setActiveInboxThreadId] = useState<string | null>(null);

  // Background Autonomous heartbeat
  useEffect(() => {
    if (!agentSettings.isAutonomousEnabled) return;

    const interval = setInterval(() => {
      // Add subtle autonomous thoughts every 20 seconds
      const simulatedThoughts: AgentThoughtStep[] = [
        {
          id: `pulse-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          phase: "PERCEPTION",
          message: "Checked YC WorkAtAStartup RSS and Ashby feeds. 3 new remote roles indexed matching profile.",
          companyTarget: "Ashby & YC Feed",
          actionTaken: "Filtered by candidate target floor $180k+."
        }
      ];
      setThoughtLogs((prev) => [...simulatedThoughts, ...prev.slice(0, 15)]);
    }, 25000);

    return () => clearInterval(interval);
  }, [agentSettings.isAutonomousEnabled]);

  // Execute full autonomous AI cycle via Gemini server API
  const handleRunAgentCycle = async () => {
    setIsAgentCycleRunning(true);
    try {
      const res = await fetch("/api/agent/run-cycle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateProfile,
          settings: agentSettings,
          recentJobs: applications.slice(0, 5)
        })
      });

      const result = await res.json();
      if (result.success && result.data) {
        const { thoughts, applicationCreated, dailyBriefUpdate } = result.data;

        if (thoughts && thoughts.length > 0) {
          setThoughtLogs((prev) => [...thoughts, ...prev]);
        }

        if (applicationCreated) {
          setApplications((prev) => [applicationCreated, ...prev]);
          // Also update daily report counter
          setDailyReport((prev) => ({
            ...prev,
            stats: {
              ...prev.stats,
              applied: prev.stats.applied + 1,
              scouted: prev.stats.scouted + 4
            }
          }));
        }

        if (dailyBriefUpdate) {
          setDailyReport((prev) => ({
            ...prev,
            executiveSummary: dailyBriefUpdate
          }));
        }
      }
    } catch (e) {
      console.error("Failed to run agent cycle:", e);
    } finally {
      setIsAgentCycleRunning(false);
    }
  };

  // Status Updater
  const handleUpdateJobStatus = (jobId: string, newStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, status: newStatus } : job))
    );
    if (selectedJobForModal && selectedJobForModal.id === jobId) {
      setSelectedJobForModal({ ...selectedJobForModal, status: newStatus });
    }
  };

  // Add custom job
  const handleJobAdded = (newJob: JobApplication) => {
    setApplications((prev) => [newJob, ...prev]);
    setDailyReport((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        applied: prev.stats.applied + 1
      }
    }));
  };

  // Handle sleep simulation completion
  const handleNightShiftComplete = (newJobs: JobApplication[]) => {
    if (newJobs && newJobs.length > 0) {
      setApplications((prev) => [...newJobs, ...prev]);
    }
    // Update daily report
    setDailyReport((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        applied: prev.stats.applied + 2,
        scouted: prev.stats.scouted + 42,
        recruiterChats: prev.stats.recruiterChats + 1
      },
      nightShiftHighlights: [
        `Overnight auto-applied to ${newJobs[0]?.company || "Vercel"} with 98% ATS match.`,
        "Handled inbound recruiter inquiry from Datadog for Staff Engineer role.",
        "Scouted 42 high-paying remote roles and filtered out below-floor offers.",
        ...prev.nightShiftHighlights
      ]
    }));
    setActiveTab("daily_briefings");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        candidateProfile={candidateProfile}
        settings={agentSettings}
        onOpenSleepModal={() => setIsSleepModalOpen(true)}
        onRunAgentCycle={handleRunAgentCycle}
        isAgentRunning={isAgentCycleRunning}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === "mission_control" && (
          <LiveAgentDashboard
            candidateProfile={candidateProfile}
            settings={agentSettings}
            applications={applications}
            recruiterThreads={recruiterThreads}
            dailyReport={dailyReport}
            thoughtLogs={thoughtLogs}
            onSelectApplication={(job) => setSelectedJobForModal(job)}
            onOpenSleepModal={() => setIsSleepModalOpen(true)}
            onRunAgentCycle={handleRunAgentCycle}
            isAgentRunning={isAgentCycleRunning}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "pipeline" && (
          <ApplicationsPipeline
            applications={applications}
            onSelectApplication={(job) => setSelectedJobForModal(job)}
            onUpdateJobStatus={handleUpdateJobStatus}
            onOpenNewJobModal={() => setIsNewJobModalOpen(true)}
            onRunAgentCycle={handleRunAgentCycle}
            isAgentRunning={isAgentCycleRunning}
          />
        )}

        {activeTab === "inbox" && (
          <RecruiterInbox
            threads={recruiterThreads}
            setThreads={setRecruiterThreads}
            candidateProfile={candidateProfile}
            settings={agentSettings}
            activeThreadId={activeInboxThreadId}
            setActiveThreadId={setActiveInboxThreadId}
          />
        )}

        {activeTab === "resume_tailor" && (
          <ResumeTailorStudio
            candidateProfile={candidateProfile}
            setCandidateProfile={setCandidateProfile}
          />
        )}

        {activeTab === "social_presence" && (
          <SocialPresenceHub
            posts={socialPosts}
            setPosts={setSocialPosts}
            candidateProfile={candidateProfile}
          />
        )}

        {activeTab === "daily_briefings" && (
          <DailyBriefings
            dailyReport={dailyReport}
            setDailyReport={setDailyReport}
            candidateProfile={candidateProfile}
            applications={applications}
            recruiterThreads={recruiterThreads}
          />
        )}

        {activeTab === "settings" && (
          <CandidateSettings
            candidateProfile={candidateProfile}
            setCandidateProfile={setCandidateProfile}
            settings={agentSettings}
            setSettings={setAgentSettings}
          />
        )}
      </main>

      {/* Global Modals */}
      <JobDetailModal
        job={selectedJobForModal}
        onClose={() => setSelectedJobForModal(null)}
        onUpdateStatus={handleUpdateJobStatus}
      />

      <SleepSimulationModal
        isOpen={isSleepModalOpen}
        onClose={() => setIsSleepModalOpen(false)}
        onNightShiftComplete={handleNightShiftComplete}
        candidateProfile={candidateProfile}
      />

      <NewJobModal
        isOpen={isNewJobModalOpen}
        onClose={() => setIsNewJobModalOpen(false)}
        onJobAdded={handleJobAdded}
        candidateProfile={candidateProfile}
      />
    </div>
  );
}
